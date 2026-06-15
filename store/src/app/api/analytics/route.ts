import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { headers } from "next/headers";

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

export async function POST(req: Request) {
  try {
    const body: AnalyticsEvent = await req.json();

    if (!body.event) {
      return NextResponse.json({ error: "Event required" }, { status: 400 });
    }

    // Get IP-based geo info from headers (Vercel provides these)
    const headersList = await headers();
    const geo = {
      country: headersList.get("x-vercel-ip-country") || undefined,
      region: headersList.get("x-vercel-ip-country-region") || undefined,
      city: headersList.get("x-vercel-ip-city") || undefined,
    };
    const ip = headersList.get("x-forwarded-for")?.split(",")[0]?.trim();

    // Hash IP for privacy (don't store raw IPs)
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

    // Log to Vercel Function Logs (always available)
    console.log(`[ANALYTICS] ${JSON.stringify(event)}`);

    // In development, save to local file
    if (process.env.NODE_ENV === "development") {
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
  } catch {
    return new NextResponse(null, { status: 204 }); // Never fail on analytics
  }
}

// GET: Return analytics data for admin dashboard
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get("key");

  // Simple auth check — use admin key from env
  if (process.env.ADMIN_KEY && key !== process.env.ADMIN_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // In development, read from file
  if (process.env.NODE_ENV === "development") {
    try {
      const filePath = path.join(process.cwd(), "data", "analytics.json");
      const data = await fs.readFile(filePath, "utf-8");
      const events = JSON.parse(data);

      // Aggregate the data
      const summary = aggregateEvents(events);
      return NextResponse.json(summary);
    } catch {
      return NextResponse.json({
        totalPageViews: 0,
        uniqueVisitors: 0,
        events: [],
      });
    }
  }

  // In production, read from Vercel Logs API or return instructions
  return NextResponse.json({
    message:
      "Analytics data is available in the Vercel dashboard under Function Logs, or connect a database for persistent storage.",
    tip: "Search for [ANALYTICS] in your Vercel Function Logs to see all events.",
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
