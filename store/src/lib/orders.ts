import type { Run } from "@/lib/analyticsQueries";

// Saving paid Stripe orders. `run` executes one query with $1-style parameters.

export interface OrderRecord {
  sessionId: string;
  ts: Date;
  livemode: boolean;
  currency: string;
  amountTotal: number; // cents, what the customer paid
  amountSubtotal: number;
  amountShipping: number;
  amountDiscount: number;
  amountTax: number;
  paymentIntent: string | null;
  country: string | null;
  region: string | null;
  city: string | null;
  source: string | null;
  utmCampaign: string | null;
  utmMedium: string | null;
  visitorId: string | null;
  items: {
    lineId: string | null;
    slug: string | null;
    name: string;
    quantity: number;
    unitAmount: number;
    amountTotal: number;
  }[];
}

// Saves the order and its items in one statement. Stripe may send the same event more than
// once: the second time nothing is written. Returns true if the order was new.
export async function recordOrder(run: Run, o: OrderRecord): Promise<boolean> {
  const rows = await run(
    `WITH o AS (
       INSERT INTO orders (session_id, ts, livemode, currency, amount_total, amount_subtotal,
         amount_shipping, amount_discount, amount_tax, payment_intent, country, region, city,
         source, utm_campaign, utm_medium, visitor_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
       ON CONFLICT (session_id) DO NOTHING
       RETURNING session_id
     ), i AS (
       INSERT INTO order_items (session_id, line_id, slug, name, quantity, unit_amount, amount_total)
       SELECT o.session_id, x.line_id, x.slug, x.name, x.quantity, x.unit_amount, x.amount_total
       FROM o, jsonb_to_recordset($18::jsonb) AS x(line_id text, slug text, name text,
         quantity int, unit_amount int, amount_total int)
       RETURNING 1
     )
     SELECT (SELECT count(*) FROM o) AS inserted, (SELECT count(*) FROM i) AS items`,
    [
      o.sessionId, o.ts, o.livemode, o.currency, o.amountTotal, o.amountSubtotal, o.amountShipping,
      o.amountDiscount, o.amountTax, o.paymentIntent, o.country, o.region, o.city, o.source,
      o.utmCampaign, o.utmMedium, o.visitorId,
      JSON.stringify(
        o.items.map((i) => ({
          line_id: i.lineId,
          slug: i.slug,
          name: i.name,
          quantity: i.quantity,
          unit_amount: i.unitAmount,
          amount_total: i.amountTotal,
        }))
      ),
    ]
  );
  return Number(rows[0]?.inserted ?? 0) > 0;
}

// A refund (full or partial) on an order's payment. `amountRefunded` is the running total.
export async function recordRefund(run: Run, paymentIntent: string, amountRefunded: number) {
  await run(`UPDATE orders SET amount_refunded = $2 WHERE payment_intent = $1`, [paymentIntent, amountRefunded]);
}
