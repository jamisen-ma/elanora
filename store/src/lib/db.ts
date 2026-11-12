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

// Creates the events table the first time this server instance touches the database.
let schemaReady: Promise<void> | null = null;
export function ensureSchema() {
  const sql = getSql();
  if (!sql) return Promise.resolve();
  schemaReady ??= (async () => {
    await sql`
      CREATE TABLE IF NOT EXISTS analytics_events (
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
      )`;
    await sql`CREATE INDEX IF NOT EXISTS analytics_events_ts ON analytics_events (ts)`;
    await sql`CREATE INDEX IF NOT EXISTS analytics_events_event_ts ON analytics_events (event, ts)`;
  })().catch((err) => {
    schemaReady = null; // try again on the next request
    throw err;
  });
  return schemaReady;
}
