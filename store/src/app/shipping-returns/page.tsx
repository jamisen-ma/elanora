import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shipping & Returns",
  description:
    "Elanora shipping information, return policy, and exchange details.",
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
                  <th className="text-left px-5 py-3 text-xs tracking-widest uppercase text-warm-gray font-medium">Delivery</th>
                  <th className="text-left px-5 py-3 text-xs tracking-widest uppercase text-warm-gray font-medium">Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-dark">
                <tr>
                  <td className="px-5 py-3.5">Domestic (US)</td>
                  <td className="px-5 py-3.5 text-warm-gray">5 &ndash; 10 business days</td>
                  <td className="px-5 py-3.5 text-warm-gray">$9.99</td>
                </tr>
                <tr>
                  <td className="px-5 py-3.5">International (CA, UK, AU)</td>
                  <td className="px-5 py-3.5 text-warm-gray">5 &ndash; 10 business days</td>
                  <td className="px-5 py-3.5 text-warm-gray">$9.99</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-5 space-y-3 text-sm text-warm-gray leading-relaxed">
            <p>
              <span className="text-gold font-medium">Free shipping</span> on
              all orders over $75 — domestic and international.
            </p>
            <p>
              All orders are processed within 1 &ndash; 2 business days.
              Orders placed on weekends or holidays will be processed on the
              next business day.
            </p>
            <p>
              Once your order has shipped, you will receive a confirmation
              email with a tracking number. Please allow up to 24 hours for
              tracking information to update.
            </p>
            <p>
              International orders may be subject to customs duties and import
              taxes, which are the responsibility of the customer.
            </p>
          </div>
        </section>

        <hr className="border-cream-dark" />

        {/* Returns */}
        <section>
          <h2 className="text-lg font-medium mb-5 flex items-center gap-2">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-gold">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182M21.015 4.356v4.992" />
            </svg>
            Return Policy
          </h2>
          <div className="space-y-3 text-sm text-warm-gray leading-relaxed">
            <p>
              We want you to love your Elanora purchase. If you&apos;re not
              completely satisfied, you may return any unworn item within
              <span className="text-foreground font-medium"> 30 days </span>
              of delivery for a full refund to your original payment method.
            </p>
            <p>To be eligible for a return, items must be:</p>
            <ul className="list-none space-y-2 ml-1">
              <li className="flex items-start gap-2">
                <span className="text-gold mt-0.5 text-[8px]">&#9670;</span>
                Unworn, undamaged, and in original condition
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold mt-0.5 text-[8px]">&#9670;</span>
                In original packaging with all tags attached
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold mt-0.5 text-[8px]">&#9670;</span>
                Accompanied by the original receipt or proof of purchase
              </li>
            </ul>
            <p>
              To initiate a return, please email us at{" "}
              <span className="text-foreground">hello@elanora.com</span> with
              your order number and reason for return. We&apos;ll provide you
              with a prepaid return shipping label within 1 &ndash; 2 business
              days.
            </p>
          </div>
        </section>

        {/* Exchanges */}
        <section>
          <h2 className="text-lg font-medium mb-5 flex items-center gap-2">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-gold">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
            </svg>
            Exchanges
          </h2>
          <div className="space-y-3 text-sm text-warm-gray leading-relaxed">
            <p>
              Need a different size or style? We&apos;re happy to help with
              exchanges. Email us at{" "}
              <span className="text-foreground">hello@elanora.com</span> and
              we&apos;ll arrange a one-time exchange at no additional shipping
              cost.
            </p>
            <p>
              Exchanges are subject to availability. If the requested item is
              out of stock, we&apos;ll issue a full refund instead.
            </p>
          </div>
        </section>

        {/* Refunds */}
        <section>
          <h2 className="text-lg font-medium mb-5 flex items-center gap-2">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-gold">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
            </svg>
            Refund Processing
          </h2>
          <div className="space-y-3 text-sm text-warm-gray leading-relaxed">
            <p>
              Once we receive your return, we&apos;ll inspect the item and
              process your refund within 3 &ndash; 5 business days. Refunds
              are issued to the original payment method.
            </p>
            <p>
              Please note that it may take an additional 5 &ndash; 10 business
              days for the refund to appear on your statement, depending on
              your bank or card issuer.
            </p>
          </div>
        </section>

        <hr className="border-cream-dark" />

        {/* Damaged */}
        <section>
          <h2 className="text-lg font-medium mb-5 flex items-center gap-2">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-gold">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            Damaged or Defective Items
          </h2>
          <div className="space-y-3 text-sm text-warm-gray leading-relaxed">
            <p>
              If your order arrives damaged or defective, please contact us
              within 48 hours of delivery at{" "}
              <span className="text-foreground">hello@elanora.com</span> with
              photos of the damage. We&apos;ll send a replacement or issue a
              full refund at no cost to you.
            </p>
          </div>
        </section>

        {/* Contact CTA */}
        <div className="bg-cream rounded-sm p-8 text-center">
          <h3 className="text-sm font-medium mb-2">Still have questions?</h3>
          <p className="text-sm text-warm-gray mb-5">
            Our team is here to help Monday &ndash; Friday, 9am &ndash; 5pm EST.
          </p>
          <a
            href="mailto:hello@elanora.com"
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
