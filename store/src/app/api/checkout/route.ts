import Stripe from "stripe";
import { NextResponse } from "next/server";

function getStripe() {
  // UPDATE: Set STRIPE_SECRET_KEY in your .env.local file
  return new Stripe(process.env.STRIPE_SECRET_KEY!);
}

interface CheckoutItem {
  stripePriceId: string;
  quantity: number;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items } = body as { items: CheckoutItem[] };

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "No items provided" },
        { status: 400 }
      );
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        {
          error:
            "Stripe is not configured. Add STRIPE_SECRET_KEY to your .env.local file.",
        },
        { status: 500 }
      );
    }

    const stripe = getStripe();
    const origin = request.headers.get("origin") || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: items.map((item) => ({
        price: item.stripePriceId,
        quantity: item.quantity,
      })),
      success_url: `${origin}/checkout?success=true`,
      cancel_url: `${origin}/checkout?canceled=true`,
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "GB", "AU"],
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
