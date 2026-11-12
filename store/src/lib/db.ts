import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

// Postgres (Neon, created from Vercel → Storage). Vercel adds DATABASE_URL to the project
// when the database is connected; older integrations name it POSTGRES_URL.
const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;

let client: NeonQueryFunction<false, false> | null = null;
export function getSql() {
  if (!url) return null;
  client ??= neon(url);
  return client;
}

// Tables and indexes, created on first use. Visit events are deleted after 13 months; paid
// orders (written by the Stripe webhook, src/app/api/stripe/webhook) are kept.
export const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS analytics_events (
      id BIGSERIAL PRIMARY KEY,
      ts TIMESTAMPTZ NOT NULL DEFAULT now(),
      event TEXT NOT NULL,
      page TEXT,
      visitor_id TEXT,
      country TEXT,
      region TEXT,
      city TEXT,
      device TEXT,
      referrer TEXT,
      referrer_source TEXT,
      utm_source TEXT,
      utm_medium TEXT,
      utm_campaign TEXT,
      props JSONB NOT NULL DEFAULT '{}'::jsonb
    )`,
  `CREATE INDEX IF NOT EXISTS analytics_events_ts ON analytics_events (ts)`,
  `CREATE INDEX IF NOT EXISTS analytics_events_event_ts ON analytics_events (event, ts)`,
  `CREATE TABLE IF NOT EXISTS orders (
      session_id TEXT PRIMARY KEY,
      ts TIMESTAMPTZ NOT NULL,
      livemode BOOLEAN NOT NULL,
      currency TEXT NOT NULL,
      amount_total INTEGER NOT NULL,
      amount_subtotal INTEGER NOT NULL DEFAULT 0,
      amount_shipping INTEGER NOT NULL DEFAULT 0,
      amount_discount INTEGER NOT NULL DEFAULT 0,
      amount_tax INTEGER NOT NULL DEFAULT 0,
      amount_refunded INTEGER NOT NULL DEFAULT 0,
      payment_intent TEXT,
      country TEXT,
      region TEXT,
      city TEXT,
      source TEXT,
      utm_campaign TEXT,
      utm_medium TEXT,
      visitor_id TEXT
    )`,
  `CREATE INDEX IF NOT EXISTS orders_ts ON orders (ts)`,
  `CREATE INDEX IF NOT EXISTS orders_payment_intent ON orders (payment_intent)`,
  `CREATE TABLE IF NOT EXISTS order_items (
      session_id TEXT NOT NULL REFERENCES orders (session_id) ON DELETE CASCADE,
      line_id TEXT,
      slug TEXT,
      name TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      unit_amount INTEGER NOT NULL,
      amount_total INTEGER NOT NULL
    )`,
  `CREATE INDEX IF NOT EXISTS order_items_session ON order_items (session_id)`,
];

// Creates the tables the first time this server instance touches the database.
let schemaReady: Promise<void> | null = null;
export function ensureSchema() {
  const sql = getSql();
  if (!sql) return Promise.resolve();
  schemaReady ??= (async () => {
    for (const statement of SCHEMA) await sql.query(statement);
  })().catch((err) => {
    schemaReady = null; // try again on the next request
    throw err;
  });
  return schemaReady;
}
