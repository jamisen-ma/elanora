import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Care Instructions",
  description:
    "Learn how to keep your Elanora jewelry looking beautiful for years to come.",
};

export default function CareInstructionsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      {/* Header */}
      <div className="text-center mb-14">
        <p className="text-xs tracking-[0.3em] uppercase text-gold mb-3">
          Jewelry Care
        </p>
        <h1 className="text-3xl sm:text-4xl font-light">Care Instructions</h1>
      </div>

      <div className="space-y-14">
        {/* General Care */}
        <section>
          <h2 className="text-lg font-medium mb-5 flex items-center gap-2">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-gold">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
            General Care Tips
          </h2>
          <div className="space-y-3 text-sm text-warm-gray leading-relaxed">
            <p>
              Your Elanora jewelry is crafted with care using high-quality
              materials. With a few simple steps, you can keep your pieces
              looking as stunning as the day you received them.
            </p>
            <ul className="list-none space-y-2.5 ml-1">
              <li className="flex items-start gap-2">
                <span className="text-gold mt-0.5 text-[8px]">&#9670;</span>
                <span><span className="text-foreground font-medium">Put jewelry on last</span> — apply perfume, lotion, and hairspray before wearing your pieces</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold mt-0.5 text-[8px]">&#9670;</span>
                <span><span className="text-foreground font-medium">Remove before water</span> — take jewelry off before showering, swimming, or exercising</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold mt-0.5 text-[8px]">&#9670;</span>
                <span><span className="text-foreground font-medium">Store properly</span> — keep pieces in the provided jewelry box or a soft pouch to prevent scratching</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold mt-0.5 text-[8px]">&#9670;</span>
                <span><span className="text-foreground font-medium">Avoid chemicals</span> — keep away from household cleaners, chlorine, and harsh chemicals</span>
              </li>
            </ul>
          </div>
        </section>

        <hr className="border-cream-dark" />

        {/* Gold-Plated */}
        <section>
          <h2 className="text-lg font-medium mb-5 flex items-center gap-2">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-gold">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
            </svg>
            18K Gold-Plated Pieces
          </h2>
          <div className="space-y-3 text-sm text-warm-gray leading-relaxed">
            <p>
              Our gold-plated jewelry features a generous layer of 18K gold
              over stainless steel or titanium. This gives you the look of solid
              gold at an accessible price.
            </p>
            <ul className="list-none space-y-2.5 ml-1">
              <li className="flex items-start gap-2">
                <span className="text-gold mt-0.5 text-[8px]">&#9670;</span>
                Gently wipe with a soft, lint-free cloth after each wear
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold mt-0.5 text-[8px]">&#9670;</span>
                Avoid abrasive materials and polishing cloths designed for solid gold
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold mt-0.5 text-[8px]">&#9670;</span>
                Store in a cool, dry place away from direct sunlight
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold mt-0.5 text-[8px]">&#9670;</span>
                Do not submerge in water or expose to salt water
              </li>
            </ul>
          </div>
        </section>

        {/* Gemstones & Pearls */}
        <section>
          <h2 className="text-lg font-medium mb-5 flex items-center gap-2">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-gold">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
            Gemstones &amp; Pearls
          </h2>
          <div className="space-y-3 text-sm text-warm-gray leading-relaxed">
            <p>
              Pieces featuring gemstones, zircon, or pearl accents require a
              little extra care to maintain their brilliance.
            </p>
            <ul className="list-none space-y-2.5 ml-1">
              <li className="flex items-start gap-2">
                <span className="text-gold mt-0.5 text-[8px]">&#9670;</span>
                Clean gently with a barely damp soft cloth — never use ultrasonic cleaners
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold mt-0.5 text-[8px]">&#9670;</span>
                Pearls are porous — keep them away from perfume and cosmetics
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold mt-0.5 text-[8px]">&#9670;</span>
                Store gemstone pieces separately to avoid scratching
              </li>
            </ul>
          </div>
        </section>

        <hr className="border-cream-dark" />

        {/* Storage */}
        <section>
          <h2 className="text-lg font-medium mb-5 flex items-center gap-2">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-gold">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
            </svg>
            Storage Tips
          </h2>
          <div className="space-y-3 text-sm text-warm-gray leading-relaxed">
            <p>
              Proper storage is the single best thing you can do to extend the
              life of your jewelry.
            </p>
            <ul className="list-none space-y-2.5 ml-1">
              <li className="flex items-start gap-2">
                <span className="text-gold mt-0.5 text-[8px]">&#9670;</span>
                Keep each piece in its own compartment or pouch
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold mt-0.5 text-[8px]">&#9670;</span>
                Hang necklaces to prevent tangling
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold mt-0.5 text-[8px]">&#9670;</span>
                Store in a low-humidity environment
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold mt-0.5 text-[8px]">&#9670;</span>
                Use anti-tarnish strips in your jewelry box for extra protection
              </li>
            </ul>
          </div>
        </section>

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
