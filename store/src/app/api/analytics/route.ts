import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { cookies, headers } from "next/headers";
import { ensureSchema, getSql } from "@/lib/db";
import { ADMIN_COOKIE, isValidSession } from "@/lib/adminAuth";

interface AnalyticsEvent {
  event: string;
  page?: string;
  timestamp: number;
  // Device info
  device?: string;
  screen?: string;
  language?: string;
  // Traffic source
  referrer?: string;
  referrer_source?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  // Custom data
  [key: string]: string | number | boolean | undefined;
}

const BOT_UA = /bot|crawl|spider|slurp|preview|facebookexternalhit|embedly|quora|pinterest\/|headless|lighthouse|pingdom|uptime|monitor|curl|wget|python|axios|node-fetch|go-http/i;
const RETENTION = "13 months";
const MAX_BODY = 4096;

const text = (v: unknown, max = 512) =>
  typeof v === "string" && v.length > 0 ? v.slice(0, max) : null;

// Vercel sends the city URL-encoded (e.g. "San%20Francisco").
const decode = (v: string | null) => {
  if (!v) return undefined;
  try {
    return decodeURIComponent(v);
  } catch {
    return v;
  }
};

export async function POST(req: Request) {
  try {
    const raw = await req.text();
    if (raw.length > MAX_BODY) return new NextResponse(null, { status: 204 });
    const body = JSON.parse(raw) as AnalyticsEvent;

    if (!body.event || typeof body.event !== "string") {
      return NextResponse.json({ error: "Event required" }, { status: 400 });
    }

    const headersList = await headers();

    // Not counted: preview builds, bots and link previews, the admin pages, and your own
    // visits (anyone signed in to the dashboard).
    if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production") {
      return new NextResponse(null, { status: 204 });
    }
    if (BOT_UA.test(headersList.get("user-agent") || "")) {
      return new NextResponse(null, { status: 204 });
    }
    if (typeof body.page === "string" && body.page.startsWith("/admin")) {
      return new NextResponse(null, { status: 204 });
    }
    if (isValidSession((await cookies()).get(ADMIN_COOKIE)?.value)) {
      return new NextResponse(null, { status: 204 });
    }

    // Location from Vercel's edge headers
    const geo = {
      country: headersList.get("x-vercel-ip-country") || undefined,
      region: headersList.get("x-vercel-ip-country-region") || undefined,
      city: decode(headersList.get("x-vercel-ip-city")),
    };
    const ip = headersList.get("x-forwarded-for")?.split(",")[0]?.trim();

    // Anonymous visitor id: a hash of the IP and today's date, so the same person is one
    // visitor for the day but can't be followed from day to day. Raw IPs are never stored.
    let visitorId: string | undefined;
    if (ip) {
      const encoder = new TextEncoder();
      const data = encoder.encode(ip + new Date().toISOString().slice(0, 10));
      const hashBuffer = await crypto.subtle.digest("SHA-256", data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      visitorId = hashArray
        .slice(0, 8)
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
    }

    const event = {
      ...body,
      ...geo,
      visitor_id: visitorId,
      server_timestamp: new Date().toISOString(),
    };

    const sql = getSql();
    if (sql) {
      await ensureSchema();
      const {
        event: name, page, device, referrer, referrer_source, utm_source, utm_medium, utm_campaign,
        timestamp: _t, ...props
      } = body;
      void _t;
      await sql`
        INSERT INTO analytics_events
          (event, page, visitor_id, country, region, city, device, referrer, referrer_source,
           utm_source, utm_medium, utm_campaign, props)
        VALUES
          (${text(name, 64)}, ${text(page)}, ${visitorId ?? null}, ${geo.country ?? null},
           ${geo.region ?? null}, ${geo.city ?? null}, ${text(device, 32)}, ${text(referrer)},
           ${text(referrer_source, 64)}, ${text(utm_source, 128)}, ${text(utm_medium, 128)},
           ${text(utm_campaign, 128)}, ${JSON.stringify(props)})`;
    } else {
      // No database connected yet: keep the event in Vercel's function logs.
      console.log(`[ANALYTICS] ${JSON.stringify(event)}`);
    }

    // On your own computer without a database, also save to a local file
    if (!sql && process.env.NODE_ENV === "development") {
      try {
        const dataDir = path.join(process.cwd(), "data");
        const filePath = path.join(dataDir, "analytics.json");

        await fs.mkdir(dataDir, { recursive: true });

        let events: typeof event[] = [];
        try {
          const existing = await fs.readFile(filePath, "utf-8");
          events = JSON.parse(existing);
        } catch {
          // File doesn't exist yet
        }

        events.push(event);

        // Keep only last 10,000 events to prevent file from growing too large
        if (events.length > 10000) {
          events = events.slice(-10000);
        }

        await fs.writeFile(filePath, JSON.stringify(events, null, 2));
      } catch (err) {
        console.error("Failed to save analytics locally:", err);
      }
    }

    return new NextResponse(null, { status: 204 });
  } catch (err) {
    console.error("Analytics error:", err);
    return new NextResponse(null, { status: 204 }); // Never fail on analytics
  }
}

// GET: analytics for the admin dashboard (signed-in only — see src/proxy.ts)
export async function GET() {
  const sql = getSql();

  if (sql) {
    try {
      await ensureSchema();
      await sql`DELETE FROM analytics_events WHERE ts < now() - ${RETENTION}::interval`;
      const rows = await sql`
        SELECT event, page, visitor_id, country, region, city, device, referrer, referrer_source,
               utm_source, utm_medium, utm_campaign, props,
               (extract(epoch FROM ts) * 1000)::bigint AS ms
        FROM analytics_events
        WHERE ts > now() - interval '30 days'
        ORDER BY ts
        LIMIT 200000`;
      const events: AnalyticsEvent[] = rows.map((r) => {
        const { props, ms, ...cols } = r as Record<string, unknown>;
        const clean = Object.fromEntries(Object.entries(cols).filter(([, v]) => v !== null));
        return { ...(props as object), ...clean, timestamp: Number(ms) } as AnalyticsEvent;
      });
      return NextResponse.json(aggregateEvents(events));
    } catch (err) {
      console.error("Analytics read error:", err);
      return NextResponse.json({ error: "Could not read analytics" }, { status: 500 });
    }
  }

  // On your own computer without a database, read the local file
  if (process.env.NODE_ENV === "development") {
    try {
      const filePath = path.join(process.cwd(), "data", "analytics.json");
      const data = await fs.readFile(filePath, "utf-8");
      const events = JSON.parse(data);
      return NextResponse.json(aggregateEvents(events));
    } catch {
      return NextResponse.json({
        totalPageViews: 0,
        uniqueVisitors: 0,
        events: [],
      });
    }
  }

  return NextResponse.json({
    message: "No database connected. Create one in Vercel → Storage to start saving analytics.",
  });
}

function aggregateEvents(events: AnalyticsEvent[]) {
  const now = Date.now();
  const oneDayAgo = now - 24 * 60 * 60 * 1000;
  const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;
  const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000;

  const recentEvents = events.filter(
    (e) => e.timestamp && e.timestamp > thirtyDaysAgo
  );

  // Page views
  const pageViews = recentEvents.filter((e) => e.event === "page_view");
  const pageViews24h = pageViews.filter(
    (e) => e.timestamp && e.timestamp > oneDayAgo
  );
  const pageViews7d = pageViews.filter(
    (e) => e.timestamp && e.timestamp > sevenDaysAgo
  );

  // Unique visitors
  const uniqueVisitors = new Set(pageViews.map((e) => e.visitor_id)).size;
  const uniqueVisitors24h = new Set(pageViews24h.map((e) => e.visitor_id))
    .size;
  const uniqueVisitors7d = new Set(pageViews7d.map((e) => e.visitor_id)).size;

  // Top pages
  const pageCounts: Record<string, number> = {};
  for (const e of pageViews) {
    if (e.page) pageCounts[e.page] = (pageCounts[e.page] || 0) + 1;
  }
  const topPages = Object.entries(pageCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([page, views]) => ({ page, views }));

  // Traffic sources
  const sourceCounts: Record<string, number> = {};
  for (const e of pageViews) {
    const source =
      (e.utm_source as string) ||
      (e.referrer_source as string) ||
      (e.referrer as string) ||
      "direct";
    sourceCounts[source] = (sourceCounts[source] || 0) + 1;
  }
  const trafficSources = Object.entries(sourceCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([source, visits]) => ({ source, visits }));

  // Devices
  const deviceCounts: Record<string, number> = {};
  for (const e of pageViews) {
    const device = (e.device as string) || "unknown";
    deviceCounts[device] = (deviceCounts[device] || 0) + 1;
  }
  const devices = Object.entries(deviceCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([device, count]) => ({ device, count }));

  // Countries
  const countryCounts: Record<string, number> = {};
  for (const e of pageViews) {
    const country = (e.country as string) || "unknown";
    countryCounts[country] = (countryCounts[country] || 0) + 1;
  }
  const countries = Object.entries(countryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([country, count]) => ({ country, count }));

  // Waitlist signups
  const signups = recentEvents.filter((e) => e.event === "waitlist_signup");

  // Scroll depth
  const scrollEvents = recentEvents.filter((e) => e.event === "scroll_depth");
  const scrollDepths: Record<number, number> = {};
  for (const e of scrollEvents) {
    const depth = e.depth as number;
    if (depth) scrollDepths[depth] = (scrollDepths[depth] || 0) + 1;
  }

  // Daily page views for chart (last 30 days)
  const dailyViews: Record<string, number> = {};
  for (const e of pageViews) {
    if (e.timestamp) {
      const day = new Date(e.timestamp).toISOString().slice(0, 10);
      dailyViews[day] = (dailyViews[day] || 0) + 1;
    }
  }

  return {
    overview: {
      totalPageViews: pageViews.length,
      pageViews24h: pageViews24h.length,
      pageViews7d: pageViews7d.length,
      uniqueVisitors,
      uniqueVisitors24h,
      uniqueVisitors7d,
      totalSignups: signups.length,
    },
    topPages,
    trafficSources,
    devices,
    countries,
    scrollDepths,
    dailyViews,
    recentSignups: signups.slice(-20).reverse(),
    recentEvents: recentEvents.slice(-50).reverse(),
  };
}
