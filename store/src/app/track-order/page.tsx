import type { Metadata } from "next";
import Link from "next/link";
import { SALE_POLICY } from "@/data/customOrderPolicy";
import { POLICY_EMAIL } from "@/components/PolicyPage";

export const metadata: Metadata = {
  title: "Track Your Order",
  description: "Where your Elanora order is: production, final inspection and shipping.",
};

// No order lookup yet: explains each stage and how to ask for an update by email.
const STEPS = [
  { title: "Order placed", text: "You'll receive a receipt by email straight after checkout." },
  { title: "Made for you", text: SALE_POLICY.production },
  { title: "Final inspection", text: SALE_POLICY.preview },
  { title: "Shipped", text: "We email you a tracking number as soon as your piece ships. Tracking can take up to 24 hours to update." },
];

export default function TrackOrderPage() {
  const subject = encodeURIComponent("Order update");
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <div className="text-center mb-14">
        <p className="text-xs tracking-[0.3em] uppercase text-gold mb-3">Customer Care</p>
        <h1 className="text-3xl sm:text-4xl font-light">Track Your Order</h1>
      </div>

      <ol className="space-y-6">
        {STEPS.map((s, i) => (
          <li key={s.title} className="flex gap-4">
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gold text-xs text-gold">
              {i + 1}
            </span>
            <div>
              <h2 className="text-sm font-medium">{s.title}</h2>
              <p className="mt-1 text-sm text-warm-gray leading-relaxed">{s.text}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="bg-cream rounded-sm p-8 text-center mt-14">
        <h3 className="text-sm font-medium mb-2">Want an update on your order?</h3>
        <p className="text-sm text-warm-gray mb-5">
          Email us with your order email address and we&apos;ll let you know where your piece is.
        </p>
        <a
          href={`mailto:${POLICY_EMAIL}?subject=${subject}`}
          className="inline-block border border-foreground text-foreground text-sm tracking-[0.2em] uppercase px-8 py-3 rounded-sm hover:bg-foreground hover:text-white transition-colors"
        >
          Email Us
        </a>
      </div>

      <div className="text-center mt-10">
        <Link
          href="/shipping-returns"
          className="text-sm tracking-[0.2em] uppercase text-gold hover:text-gold-dark transition-colors border-b border-gold pb-0.5"
        >
          Shipping &amp; Returns
        </Link>
      </div>
    </div>
  );
}
