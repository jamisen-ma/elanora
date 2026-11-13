import type { Metadata } from "next";
import Link from "next/link";
import { CUSTOM_POLICY, CUSTOM_TERMS, SALE_POLICY } from "@/data/customOrderPolicy";

export const metadata: Metadata = {
  title: "Shipping & Returns",
  description:
    "Elanora production time, shipping and order policy: every piece is made to order.",
};

export default function ShippingReturnsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      {/* Header */}
      <div className="text-center mb-14">
        <p className="text-xs tracking-[0.3em] uppercase text-gold mb-3">
          Customer Care
        </p>
        <h1 className="text-3xl sm:text-4xl font-light">
          Shipping &amp; Returns
        </h1>
      </div>

      <div className="space-y-14">
        {/* Shipping */}
        <section>
          <h2 className="text-lg font-medium mb-5 flex items-center gap-2">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-gold">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
            </svg>
            Shipping
          </h2>

          <div className="border border-cream-dark rounded-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-cream">
                  <th className="text-left px-5 py-3 text-xs tracking-widest uppercase text-warm-gray font-medium">Destination</th>
                  <th className="text-left px-5 py-3 text-xs tracking-widest uppercase text-warm-gray font-medium">Production time</th>
                  <th className="text-left px-5 py-3 text-xs tracking-widest uppercase text-warm-gray font-medium">Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-dark">
                <tr>
                  <td className="px-5 py-3.5">Domestic (US)</td>
                  <td className="px-5 py-3.5 text-warm-gray">2 &ndash; 8 weeks</td>
                  <td className="px-5 py-3.5 text-warm-gray">Free for members</td>
                </tr>
                <tr>
                  <td className="px-5 py-3.5">International (CA, UK, AU)</td>
                  <td className="px-5 py-3.5 text-warm-gray">2 &ndash; 8 weeks</td>
                  <td className="px-5 py-3.5 text-warm-gray">Based on destination</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-5 space-y-3 text-sm text-warm-gray leading-relaxed">
            <p>
              <span className="text-gold font-medium">Free shipping for members</span> —
              join Elanora with your email at checkout and your order ships free within the US.
              Shipping to Canada, the UK and Australia is priced by destination.
            </p>
            <p>
              Every Elanora piece is made to order. We start making your piece once you order;
              production takes
              <span className="text-foreground font-medium"> 2 &ndash; 8 weeks </span>
              before it ships. This is an estimate: more detailed pieces can take longer, and
              we&apos;ll email you if your piece needs more time.
            </p>
            <p>{SALE_POLICY.preview} {SALE_POLICY.certificate}</p>
            <p>
              Once your order has shipped, you will receive a confirmation
              email with a tracking number.
              Please allow up to 24 hours for
              tracking information to update. You can also see each stage on{" "}
              <Link href="/track-order" className="text-foreground underline underline-offset-4">Track Your Order</Link>.
            </p>
            <p>
              Please make sure your shipping address is correct: if a parcel is returned or lost
              because of an incorrect address, the cost of sending it again is yours. Delivery can be
              delayed by customs, carriers, weather or holidays; if your parcel seems stuck or is marked
              delivered but hasn&apos;t arrived, contact us and we&apos;ll help you with the carrier.
            </p>
            <p>
              International orders may be subject to customs duties and import
              taxes, which are the responsibility of the customer.
            </p>
          </div>
        </section>

        <hr className="border-cream-dark" />

        {/* Custom order payment and returns */}
        <section id="custom-orders" className="scroll-mt-24">
          <h2 className="text-lg font-medium mb-5">Custom Orders: Payment, Cancellation &amp; Returns</h2>
          <div className="space-y-3 text-sm text-warm-gray leading-relaxed">
            <p>
              These terms apply to custom pieces, including engagement rings designed with Design Your Ring.
              {" "}{CUSTOM_POLICY.inquiry}
            </p>
            <ul className="list-none space-y-2 ml-1">
              {CUSTOM_TERMS.map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <span className="text-gold mt-0.5 text-[8px]">&#9670;</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <hr className="border-cream-dark" />

        {/* Returns */}
        <section id="returns" className="scroll-mt-24">
          <h2 className="text-lg font-medium mb-5 flex items-center gap-2">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-gold">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182M21.015 4.356v4.992" />
            </svg>
            Cancellations, Returns &amp; Exchanges
          </h2>
          <div className="space-y-3 text-sm text-warm-gray leading-relaxed">
            <p>{SALE_POLICY.noCancel}</p>
            <p>{SALE_POLICY.noReturns}</p>
            <p>
              Not sure about a size or option? Email us at{" "}
              <span className="text-foreground">elanorajewelry2024@gmail.com</span>{" "}before you order and we&apos;ll help you choose.
            </p>
            <p>{SALE_POLICY.quality}</p>
            <p>
              Full terms:{" "}
              <Link href="/terms" className="text-foreground underline underline-offset-4">Terms of Sale</Link>.
            </p>
          </div>
        </section>

        {/* Contact CTA */}
        <div className="bg-cream rounded-sm p-8 text-center">
          <h3 className="text-sm font-medium mb-5">Still have questions?</h3>
          <a
            href="mailto:elanorajewelry2024@gmail.com"
            className="inline-block border border-foreground text-foreground text-sm tracking-[0.2em] uppercase px-8 py-3 rounded-sm hover:bg-foreground hover:text-white transition-colors"
          >
            Contact Us
          </a>
        </div>

        {/* Back to shop */}
        <div className="text-center">
          <Link
            href="/shop"
            className="text-sm tracking-[0.2em] uppercase text-gold hover:text-gold-dark transition-colors border-b border-gold pb-0.5"
          >
            Back to Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
