import Stripe from "stripe";
import { NextResponse } from "next/server";
import { ensureSchema, getSql } from "@/lib/db";
import { recordOrder, recordRefund, type OrderRecord } from "@/lib/orders";
import { getAllProducts } from "@/data/products";

// Stripe calls this when an order is paid or refunded (set up in Stripe → Developers → Webhooks,
// sending checkout.session.completed, checkout.session.async_payment_succeeded and
// charge.refunded to https://elanorajewelry.com/api/stripe/webhook). Every request is checked
// against STRIPE_WEBHOOK_SECRET, so nobody else can post fake orders.

const str = (v: unknown) => (typeof v === "string" && v.length > 0 ? v : null);

// Bag line id -> product slug ("<slug>|…" for catalogue pieces, a plain id for older products).
function slugFor(lineId: string | null) {
  if (!lineId) return null;
  if (lineId.includes("|")) return lineId.split("|")[0];
  return getAllProducts().find((p) => p.id === lineId)?.slug ?? null;
}

async function toOrder(stripe: Stripe, session: Stripe.Checkout.Session, at: number): Promise<OrderRecord> {
  const items = await stripe.checkout.sessions.listLineItems(session.id, {
    limit: 100,
    expand: ["data.price.product"],
  });
  const address =
    session.collected_information?.shipping_details?.address ?? session.customer_details?.address ?? null;
  const meta = session.metadata ?? {};
  return {
    sessionId: session.id,
    ts: new Date(at * 1000),
    livemode: session.livemode,
    currency: session.currency ?? "usd",
    amountTotal: session.amount_total ?? 0,
    amountSubtotal: session.amount_subtotal ?? 0,
    amountShipping: session.total_details?.amount_shipping ?? 0,
    amountDiscount: session.total_details?.amount_discount ?? 0,
    amountTax: session.total_details?.amount_tax ?? 0,
    paymentIntent:
      typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id ?? null,
    country: str(address?.country),
    region: str(address?.state),
    city: str(address?.city),
    source: str(meta.source),
    utmCampaign: str(meta.utm_campaign),
    utmMedium: str(meta.utm_medium),
    visitorId: str(meta.visitor_id),
    items: items.data.map((li) => {
      const product = li.price?.product;
      const lineId = product && typeof product === "object" && !("deleted" in product && product.deleted)
        ? str((product as Stripe.Product).metadata?.line_id)
        : null;
      return {
        lineId,
        slug: slugFor(lineId),
        name: li.description ?? "Item",
        quantity: li.quantity ?? 1,
        unitAmount: li.price?.unit_amount ?? 0,
        amountTotal: li.amount_total,
      };
    }),
  };
}

export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!secret || !key) {
    console.error("Stripe webhook: STRIPE_WEBHOOK_SECRET or STRIPE_SECRET_KEY is missing.");
    return NextResponse.json({ error: "Not configured" }, { status: 500 });
  }

  const stripe = new Stripe(key);
  const body = await request.text();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, request.headers.get("stripe-signature") ?? "", secret);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const handled = ["checkout.session.completed", "checkout.session.async_payment_succeeded", "charge.refunded"];
  if (!handled.includes(event.type)) return NextResponse.json({ received: true, ignored: event.type });

  const sql = getSql();
  if (!sql) {
    console.error("Stripe webhook: no database connected.");
    return NextResponse.json({ error: "Not configured" }, { status: 500 });
  }
  const run = (text: string, values: unknown[]) => sql.query(text, values) as Promise<Record<string, unknown>[]>;

  try {
    await ensureSchema();
    switch (event.type) {
      case "checkout.session.completed":
      case "checkout.session.async_payment_succeeded": {
        const session = event.data.object;
        // Bank transfers and some pay-later methods complete first and are paid later
        // (async_payment_succeeded): only count the order once the money is in.
        if (session.payment_status === "unpaid") break;
        await recordOrder(run, await toOrder(stripe, session, event.created));
        break;
      }
      case "charge.refunded": {
        const charge = event.data.object;
        const pi = typeof charge.payment_intent === "string" ? charge.payment_intent : charge.payment_intent?.id;
        if (pi) await recordRefund(run, pi, charge.amount_refunded);
        break;
      }
    }
    return NextResponse.json({ received: true });
  } catch (err) {
    // A 500 makes Stripe try again later, so a brief database hiccup doesn't lose an order.
    console.error("Stripe webhook error:", err);
    return NextResponse.json({ error: "Could not save" }, { status: 500 });
  }
}
