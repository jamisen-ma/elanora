import { getCatalogItem } from "@/data/catalog";

// Everything the /admin dashboard shows, worked out in Postgres for one date range.
// `run` executes one query with $1-style parameters (Neon's sql.query in production).

export type Run = (text: string, params: unknown[]) => Promise<Record<string, unknown>[]>;

export const RANGES = ["today", "7d", "30d", "90d", "12m", "custom"] as const;
export type RangeKey = (typeof RANGES)[number];

export const LEAD_EVENTS = ["waitlist_signup", "ring_quote_request", "custom_request"] as const;

export interface DashboardQuery {
  range: RangeKey;
  from?: string; // YYYY-MM-DD, custom range only
  to?: string;
  tz: string;
}

const num = (v: unknown) => (v === null || v === undefined ? 0 : Number(v));
const str = (v: unknown) => (v === null || v === undefined ? null : String(v));
const iso = (v: unknown) => (v instanceof Date ? v.toISOString() : String(v));

// Where a visit came from: the UTM source if the link had one, else the referring site's
// category, else "direct". Visits referred by the shop itself count as direct.
const SOURCE = `CASE
  WHEN coalesce(utm_source, '') <> '' THEN lower(utm_source)
  WHEN referrer IS NULL OR referrer = 'direct' OR referrer ILIKE '%elanora%' THEN 'direct'
  WHEN coalesce(referrer_source, 'other') <> 'other' THEN referrer_source
  ELSE regexp_replace(referrer, '^www\\.', '')
END`;

const LEADS = `event IN ('${LEAD_EVENTS.join("','")}')`;
const IN_RANGE = `ts >= $1 AND ts < $2`;

export async function getDashboard(run: Run, q: DashboardQuery) {
  const tz = q.tz;

  // 1. The date range, and the same length of time just before it for comparison.
  const [bounds] = await run(
    `WITH b AS (
       SELECT CASE $1
         WHEN 'today' THEN date_trunc('day', now() AT TIME ZONE $2) AT TIME ZONE $2
         WHEN '7d'    THEN (date_trunc('day', now() AT TIME ZONE $2) - interval '6 days') AT TIME ZONE $2
         WHEN '30d'   THEN (date_trunc('day', now() AT TIME ZONE $2) - interval '29 days') AT TIME ZONE $2
         WHEN '90d'   THEN (date_trunc('day', now() AT TIME ZONE $2) - interval '89 days') AT TIME ZONE $2
         WHEN '12m'   THEN (date_trunc('month', now() AT TIME ZONE $2) - interval '11 months') AT TIME ZONE $2
         ELSE ($3::date)::timestamp AT TIME ZONE $2
       END AS start_ts,
       CASE $1 WHEN 'custom' THEN (($4::date) + 1)::timestamp AT TIME ZONE $2 ELSE now() END AS end_ts
     )
     SELECT start_ts, end_ts, start_ts - (end_ts - start_ts) AS prev_start,
            extract(epoch FROM end_ts - start_ts) AS seconds
     FROM b`,
    [q.range, tz, q.from ?? null, q.to ?? null]
  );
  const start = bounds.start_ts;
  const end = bounds.end_ts;
  const prevStart = bounds.prev_start;
  const spanDays = num(bounds.seconds) / 86400;
  const bucket = spanDays <= 2 ? "hour" : spanDays <= 120 ? "day" : "week";

  const totals = (from: unknown, to: unknown) =>
    run(
      `SELECT count(*) FILTER (WHERE event = 'page_view') AS views,
              count(DISTINCT visitor_id) FILTER (WHERE event = 'page_view') AS visitors,
              count(*) FILTER (WHERE ${LEADS}) AS leads,
              avg((props->>'seconds')::numeric) FILTER (
                WHERE event = 'time_on_page' AND props->>'seconds' ~ '^[0-9]+(\\.[0-9]+)?$'
                  AND (props->>'seconds')::numeric < 3600) AS avg_seconds
       FROM analytics_events WHERE ${IN_RANGE}`,
      [from, to]
    ).then(([r]) => ({
      views: num(r.views),
      visitors: num(r.visitors),
      leads: num(r.leads),
      avgSeconds: Math.round(num(r.avg_seconds)),
    }));

  const [
    current,
    previous,
    [live],
    series,
    pages,
    sources,
    campaigns,
    countries,
    cities,
    devices,
    leadTypes,
    recentLeads,
    recent,
  ] = await Promise.all([
    totals(start, end),
    totals(prevStart, start),
    run(
      `SELECT count(DISTINCT visitor_id) AS n FROM analytics_events
       WHERE ts > now() - interval '5 minutes' AND event = 'page_view'`,
      []
    ),
    // Views, visitors and leads per hour/day/week, with empty buckets filled in.
    run(
      `WITH slots AS (
         SELECT generate_series(
           date_trunc('${bucket}', $1::timestamptz AT TIME ZONE $3),
           date_trunc('${bucket}', ($2::timestamptz - interval '1 second') AT TIME ZONE $3),
           interval '1 ${bucket}') AS slot
       ), e AS (
         SELECT date_trunc('${bucket}', ts AT TIME ZONE $3) AS slot, event, visitor_id
         FROM analytics_events WHERE ${IN_RANGE}
       )
       SELECT to_char(s.slot, 'YYYY-MM-DD"T"HH24:MI') AS slot,
              count(e.*) FILTER (WHERE e.event = 'page_view') AS views,
              count(DISTINCT e.visitor_id) FILTER (WHERE e.event = 'page_view') AS visitors,
              count(e.*) FILTER (WHERE e.event IN ('${LEAD_EVENTS.join("','")}')) AS leads
       FROM slots s LEFT JOIN e ON e.slot = s.slot
       GROUP BY s.slot ORDER BY s.slot`,
      [start, end, tz]
    ),
    // Every page: views, visitors, average time on it.
    run(
      `SELECT page,
              count(*) FILTER (WHERE event = 'page_view') AS views,
              count(DISTINCT visitor_id) FILTER (WHERE event = 'page_view') AS visitors,
              avg((props->>'seconds')::numeric) FILTER (
                WHERE event = 'time_on_page' AND props->>'seconds' ~ '^[0-9]+(\\.[0-9]+)?$'
                  AND (props->>'seconds')::numeric < 3600) AS avg_seconds
       FROM analytics_events
       WHERE ${IN_RANGE} AND page IS NOT NULL AND event IN ('page_view', 'time_on_page')
       GROUP BY page
       HAVING count(*) FILTER (WHERE event = 'page_view') > 0
       ORDER BY views DESC LIMIT 300`,
      [start, end]
    ),
    run(
      `SELECT ${SOURCE} AS source,
              count(DISTINCT visitor_id) FILTER (WHERE event = 'page_view') AS visitors,
              count(*) FILTER (WHERE event = 'page_view') AS views,
              count(*) FILTER (WHERE ${LEADS}) AS leads
       FROM analytics_events WHERE ${IN_RANGE}
       GROUP BY 1 HAVING count(*) FILTER (WHERE event = 'page_view') > 0 OR count(*) FILTER (WHERE ${LEADS}) > 0
       ORDER BY visitors DESC, views DESC LIMIT 25`,
      [start, end]
    ),
    run(
      `SELECT utm_campaign AS campaign, lower(coalesce(utm_source, '')) AS source,
              lower(coalesce(utm_medium, '')) AS medium,
              count(DISTINCT visitor_id) FILTER (WHERE event = 'page_view') AS visitors,
              count(*) FILTER (WHERE event = 'page_view') AS views,
              count(*) FILTER (WHERE ${LEADS}) AS leads
       FROM analytics_events
       WHERE ${IN_RANGE} AND coalesce(utm_campaign, '') <> ''
       GROUP BY 1, 2, 3 ORDER BY visitors DESC LIMIT 25`,
      [start, end]
    ),
    run(
      `SELECT coalesce(country, '??') AS country,
              count(DISTINCT visitor_id) AS visitors, count(*) AS views
       FROM analytics_events WHERE ${IN_RANGE} AND event = 'page_view'
       GROUP BY 1 ORDER BY visitors DESC, views DESC LIMIT 25`,
      [start, end]
    ),
    run(
      `SELECT city, region, country,
              count(DISTINCT visitor_id) AS visitors, count(*) AS views
       FROM analytics_events WHERE ${IN_RANGE} AND event = 'page_view' AND city IS NOT NULL
       GROUP BY 1, 2, 3 ORDER BY visitors DESC, views DESC LIMIT 25`,
      [start, end]
    ),
    run(
      `SELECT coalesce(device, 'unknown') AS device,
              count(DISTINCT visitor_id) AS visitors, count(*) AS views
       FROM analytics_events WHERE ${IN_RANGE} AND event = 'page_view'
       GROUP BY 1 ORDER BY visitors DESC`,
      [start, end]
    ),
    run(
      `SELECT event, count(*) AS n FROM analytics_events
       WHERE ${IN_RANGE} AND ${LEADS} GROUP BY 1`,
      [start, end]
    ),
    run(
      `SELECT ts, event, page, country, city, ${SOURCE} AS source, props
       FROM analytics_events WHERE ${IN_RANGE} AND ${LEADS}
       ORDER BY ts DESC LIMIT 50`,
      [start, end]
    ),
    run(
      `SELECT ts, event, page, country, city, device, ${SOURCE} AS source
       FROM analytics_events WHERE event IN ('page_view', '${LEAD_EVENTS.join("','")}')
       ORDER BY ts DESC LIMIT 40`,
      []
    ),
  ]);

  // Product pages, named from the catalogue, and totals per jewellery type.
  const pageRows = pages.map((r) => ({
    page: String(r.page),
    views: num(r.views),
    visitors: num(r.visitors),
    avgSeconds: Math.round(num(r.avg_seconds)),
  }));
  const products = pageRows
    .map((p) => {
      const m = p.page.match(/^\/shop\/([^/?#]+)$/);
      const item = m ? getCatalogItem(m[1]) : undefined;
      return item ? { ...p, slug: item.slug, name: item.name, type: item.type } : null;
    })
    .filter((p): p is NonNullable<typeof p> => p !== null);
  const categoryTotals = new Map<string, { views: number; visitors: number }>();
  for (const p of products) {
    const c = categoryTotals.get(p.type) ?? { views: 0, visitors: 0 };
    categoryTotals.set(p.type, { views: c.views + p.views, visitors: c.visitors + p.visitors });
  }
  const categories = [...categoryTotals.entries()]
    .map(([type, v]) => ({ type, ...v }))
    .sort((a, b) => b.views - a.views);

  return {
    range: {
      key: q.range,
      start: iso(start),
      end: iso(end),
      previousStart: iso(prevStart),
      bucket,
      tz,
    },
    overview: {
      ...current,
      previous,
      liveVisitors: num(live?.n),
    },
    series: series.map((r) => ({
      slot: String(r.slot),
      views: num(r.views),
      visitors: num(r.visitors),
      leads: num(r.leads),
    })),
    pages: pageRows.slice(0, 50),
    products: products.slice(0, 50),
    categories,
    sources: sources.map((r) => ({
      source: String(r.source),
      visitors: num(r.visitors),
      views: num(r.views),
      leads: num(r.leads),
    })),
    campaigns: campaigns.map((r) => ({
      campaign: String(r.campaign),
      source: String(r.source),
      medium: String(r.medium),
      visitors: num(r.visitors),
      views: num(r.views),
      leads: num(r.leads),
    })),
    countries: countries.map((r) => ({ country: String(r.country), visitors: num(r.visitors), views: num(r.views) })),
    cities: cities.map((r) => ({
      city: String(r.city),
      region: str(r.region),
      country: str(r.country),
      visitors: num(r.visitors),
      views: num(r.views),
    })),
    devices: devices.map((r) => ({ device: String(r.device), visitors: num(r.visitors), views: num(r.views) })),
    leads: {
      byType: Object.fromEntries(LEAD_EVENTS.map((e) => [e, num(leadTypes.find((r) => r.event === e)?.n)])),
      recent: recentLeads.map((r) => ({
        ts: iso(r.ts),
        event: String(r.event),
        page: str(r.page),
        country: str(r.country),
        city: str(r.city),
        source: String(r.source),
        details: (r.props ?? {}) as Record<string, unknown>,
      })),
    },
    recent: recent.map((r) => ({
      ts: iso(r.ts),
      event: String(r.event),
      page: str(r.page),
      country: str(r.country),
      city: str(r.city),
      device: str(r.device),
      source: String(r.source),
    })),
  };
}

export type Dashboard = Awaited<ReturnType<typeof getDashboard>>;
