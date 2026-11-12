import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { cookies, headers } from "next/headers";
import { ensureSchema, getSql } from "@/lib/db";
import { visitorIdFrom } from "@/lib/visitor";
import { ADMIN_COOKIE, isValidSession } from "@/lib/adminAuth";
import { RANGES, getDashboard, type RangeKey } from "@/lib/analyticsQueries";

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
    const visitorId = await visitorIdFrom(headersList);

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
// ?range=today|7d|30d|90d|12m|custom (&from=YYYY-MM-DD&to=YYYY-MM-DD) &tz=<IANA zone>
export async function GET(req: Request) {
  const params = new URL(req.url).searchParams;
  const range = (RANGES as readonly string[]).includes(params.get("range") ?? "")
    ? (params.get("range") as RangeKey)
    : "7d";
  const tzParam = params.get("tz") ?? "";
  const tz = /^[A-Za-z]+(?:[/_+-][A-Za-z0-9]+)*$/.test(tzParam) && validTimeZone(tzParam) ? tzParam : "UTC";
  const from = params.get("from") ?? "";
  const to = params.get("to") ?? "";
  const isDate = (d: string) => /^\d{4}-\d{2}-\d{2}$/.test(d) && !Number.isNaN(Date.parse(d));
  if (range === "custom") {
    const days = (Date.parse(to) - Date.parse(from)) / 86400000;
    if (!isDate(from) || !isDate(to) || days < 0 || days > 400) {
      return NextResponse.json({ error: "Pick a start and end date up to 400 days apart." }, { status: 400 });
    }
  }

  const sql = getSql();
  if (!sql) {
    return NextResponse.json(
      { error: "No database connected. Create one in Vercel → Storage to start saving analytics." },
      { status: 503 }
    );
  }

  try {
    await ensureSchema();
    await sql`DELETE FROM analytics_events WHERE ts < now() - ${RETENTION}::interval`;
    const run = (text: string, values: unknown[]) =>
      sql.query(text, values) as Promise<Record<string, unknown>[]>;
    const orders = params.get("orders");
    const data = await getDashboard(run, {
      range,
      from,
      to,
      tz,
      orders: orders === "live" || orders === "test" ? orders : undefined,
    });
    return NextResponse.json(data, { headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    console.error("Analytics read error:", err);
    return NextResponse.json({ error: "Could not read analytics." }, { status: 500 });
  }
}

function validTimeZone(tz: string) {
  try {
    new Intl.DateTimeFormat("en-US", { timeZone: tz });
    return true;
  } catch {
    return false;
  }
}
