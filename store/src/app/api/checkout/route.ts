import Stripe from "stripe";
import { NextResponse } from "next/server";
import { getCatalogItem, optionPrice } from "@/data/catalog";
import { getAllProducts } from "@/data/products";
import { settingForSlug } from "@/data/ringDesign";
import { sourceOf, visitorIdFrom } from "@/lib/visitor";

// Stripe Checkout. The browser sends only bag line ids and quantities; every price is worked out
// here from the catalogue, so a tampered bag can never change what the customer is charged.
// Line items use inline `price_data`, so no products or prices need to be created in Stripe.

const FREE_SHIPPING_FROM = 7500; // cents — "free on orders over $75"
const SHIPPING_RATE = 999; // cents — "$9.99"
const MAX_QTY = 10;

interface CheckoutItem {
  id: string;
  quantity: number;
}

interface PricedLine {
  id: string;
  name: string;
  unitAmount: number; // cents
  image?: string;
}

const metalLabel = (m: string) => m.replace(/^(\d+)k\b/i, (_, n) => `${n}K`);
const has = (list: string[] | undefined, v: string) => !list?.length ? v === "" : list.includes(v);

// Resolve one bag line id (as built in ProductPurchase / AddToCartButton) to its name and price.
function priceLine(id: string): PricedLine | null {
  const parts = id.split("|");
  const item = getCatalogItem(parts[0]);

  if (!item) {
    // Older storefront products (src/data/products.ts), keyed by their plain id.
    const p = getAllProducts().find((x) => x.id === id && !x.soldOut);
    return p ? { id, name: p.name, unitAmount: p.price, image: p.images[0] } : null;
  }

  // Engagement settings and personalised pieces are quoted, never sold through the bag.
  if (item.customName || settingForSlug(item.slug) || item.price === null) return null;
  const image = item.images[0]?.src;

  // Pendant chain add-on: slug|chain|<metal>|<length>
  if (parts[1] === "chain" && parts.length === 4) {
    const chain = item.chainAddOn;
    const [, , chainMetal, length] = parts;
    const chainMetals = new Set([...item.metals, ...Object.values(chain?.metalFor ?? {})]);
    if (!chain || !chain.lengths.includes(length) || !chainMetals.has(chainMetal)) return null;
    return { id, name: `${metalLabel(chainMetal)} Chain, ${length} — for the ${item.name}`, unitAmount: chain.price * 100, image };
  }

  // One piece of a set: slug|<piece name>
  if (parts.length === 2) {
    const piece = Object.values(item.sizePieces ?? {}).flat().find((p) => p.name === parts[1]);
    return piece ? { id, name: `${item.name} — ${piece.name}`, unitAmount: piece.price * 100, image } : null;
  }

  // Standard piece: slug|<initial>|<metal>|<carat>|<size>
  if (parts.length !== 5) return null;
  const [, initial, metal, carat, size] = parts;
  if (!has(item.initials, initial) || !has(item.metals, metal) || !has(item.sizes, size)) return null;
  if (item.carats?.length ? !item.carats.includes(carat) : carat !== "") return null;
  const price = optionPrice(item, metal, carat, size);
  if (price === null) return null;
  const variant = [initial && `Initial ${initial}`, metal, carat, size].filter(Boolean).join(" / ");
  return { id, name: variant ? `${item.name} — ${variant}` : item.name, unitAmount: price * 100, image };
}

export async function POST(request: Request) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: "Payments are not set up yet. Add STRIPE_SECRET_KEY to the environment." },
        { status: 500 }
      );
    }

    const { items, attribution } = (await request.json()) as {
      items?: CheckoutItem[];
      attribution?: Record<string, unknown>;
    };
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Your bag is empty." }, { status: 400 });
    }

    const lines: { line: PricedLine; quantity: number }[] = [];
    for (const it of items) {
      const quantity = Math.floor(Number(it?.quantity));
      const line = typeof it?.id === "string" ? priceLine(it.id) : null;
      if (!line || !(quantity >= 1 && quantity <= MAX_QTY)) {
        return NextResponse.json(
          { error: "One of the pieces in your bag is no longer available as chosen. Please remove it and add it again." },
          { status: 400 }
        );
      }
      lines.push({ line, quantity });
    }

    // A chain add-on is sold only with its pendant: never more chains than pendants of that piece.
    const count = (pred: (id: string) => boolean) =>
      lines.filter((l) => pred(l.line.id)).reduce((n, l) => n + l.quantity, 0);
    for (const slug of new Set(lines.map((l) => l.line.id.split("|")[0]))) {
      const chains = count((id) => id.startsWith(`${slug}|chain|`));
      const pendants = count((id) => id.startsWith(`${slug}|`) && !id.startsWith(`${slug}|chain|`));
      if (chains > pendants) {
        return NextResponse.json({ error: "A chain in your bag needs its pendant. Please add the pendant again." }, { status: 400 });
      }
    }

    const subtotal = lines.reduce((s, l) => s + l.line.unitAmount * l.quantity, 0);
    const origin = process.env.NEXT_PUBLIC_SITE_URL || request.headers.get("origin") || "http://localhost:3000";
    const publicOrigin = origin.startsWith("https://") ? origin : null; // Stripe can only show images it can reach

    // Kept on the Stripe session so the order can be credited to how the buyer found the shop.
    const a = attribution && typeof attribution === "object" ? attribution : {};
    const s = (k: string) => (typeof a[k] === "string" ? (a[k] as string).slice(0, 100) : "");
    const metadata: Record<string, string> = {
      source: sourceOf(s("utm_source"), s("referrer")),
      utm_campaign: s("utm_campaign"),
      utm_medium: s("utm_medium"),
      visitor_id: (await visitorIdFrom(request.headers)) ?? "",
    };

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      metadata,
      line_items: lines.map(({ line, quantity }) => ({
        quantity,
        price_data: {
          currency: "usd",
          unit_amount: line.unitAmount,
          product_data: {
            name: line.name,
            metadata: { line_id: line.id },
            ...(publicOrigin && line.image ? { images: [new URL(line.image, publicOrigin).toString()] } : {}),
          },
        },
      })),
      shipping_address_collection: { allowed_countries: ["US", "CA", "GB", "AU"] },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            display_name: subtotal >= FREE_SHIPPING_FROM ? "Free shipping" : "Standard shipping",
            fixed_amount: { amount: subtotal >= FREE_SHIPPING_FROM ? 0 : SHIPPING_RATE, currency: "usd" },
          },
        },
      ],
      phone_number_collection: { enabled: true },
      allow_promotion_codes: true,
      // Turn on once Stripe Tax is activated in the Dashboard (Settings → Tax).
      automatic_tax: { enabled: process.env.STRIPE_AUTOMATIC_TAX === "true" },
      success_url: `${origin}/checkout?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout?canceled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json({ error: "We couldn't start checkout. Please try again." }, { status: 500 });
  }
}
