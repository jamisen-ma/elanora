import type { Metadata } from "next";
import Image from "next/image";
import WaitlistForm from "@/components/WaitlistForm";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "The story behind Elanora — jewelry designed to be worn every day and remembered forever.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
          <p className="text-[10px] sm:text-xs tracking-[0.35em] uppercase text-gold mb-4">
            Our Story
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light leading-tight mb-6">
            Elegance in Every Detail
          </h1>
          <p className="text-warm-gray text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Elanora was born from a simple belief — that beautiful jewelry
            shouldn&apos;t be reserved for special occasions. It should be part
            of your everyday confidence.
          </p>
        </div>
      </section>

      {/* Origin */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative aspect-[4/5] rounded-sm overflow-hidden">
            <Image
              src="/images/products/moonstone-necklace/4.jpg"
              alt="Elanora jewelry craftsmanship"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-[10px] sm:text-xs tracking-[0.35em] uppercase text-gold mb-4">
              Where It Began
            </p>
            <h2 className="text-2xl sm:text-3xl font-light mb-6 leading-snug">
              From a Passion Project
              <br />
              to a Growing Brand
            </h2>
            <div className="space-y-4 text-warm-gray leading-relaxed">
              <p>
                Elanora started in 2024 with a small collection and a big idea:
                make high-quality, design-forward jewelry accessible to every
                woman — without the traditional luxury markup.
              </p>
              <p>
                We noticed a gap in the market. On one side, fast-fashion
                jewelry that tarnished after a few wears. On the other,
                fine jewelry with price tags that felt out of reach. We set
                out to build something in between — pieces that look and
                feel premium, crafted from durable materials like titanium
                steel and 18K gold plating, at prices that make sense.
              </p>
              <p>
                Every piece in our first collection is hand-selected by our
                team. We work directly with skilled artisans and small
                workshops, cutting out middlemen so we can invest in better
                materials and pass the savings on to you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center mb-14">
            <p className="text-[10px] sm:text-xs tracking-[0.35em] uppercase text-gold mb-3">
              What We Stand For
            </p>
            <h2 className="text-2xl sm:text-3xl font-light">
              Built on Purpose
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 lg:gap-16">
            <div className="text-center">
              <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-white flex items-center justify-center shadow-sm">
                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-gold">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
              </div>
              <h3 className="text-sm font-medium mb-2 tracking-wide">Quality First</h3>
              <p className="text-sm text-warm-gray leading-relaxed max-w-xs mx-auto">
                18K gold plating, titanium steel, genuine stones, and
                hypoallergenic finishes — materials that last.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-white flex items-center justify-center shadow-sm">
                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-gold">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </div>
              <h3 className="text-sm font-medium mb-2 tracking-wide">Designed for You</h3>
              <p className="text-sm text-warm-gray leading-relaxed max-w-xs mx-auto">
                Versatile enough for a Monday meeting, elegant enough for a Friday
                evening, durable enough for everything in between.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-white flex items-center justify-center shadow-sm">
                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-gold">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A8.966 8.966 0 013 12c0-1.257.26-2.454.727-3.541" />
                </svg>
              </div>
              <h3 className="text-sm font-medium mb-2 tracking-wide">Honest Pricing</h3>
              <p className="text-sm text-warm-gray leading-relaxed max-w-xs mx-auto">
                Working directly with artisans and selling online-only means
                premium jewelry at a fraction of traditional prices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-foreground text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          <p className="text-[10px] sm:text-xs tracking-[0.35em] uppercase text-gold-light mb-4">
            Launching July 2026
          </p>
          <h2 className="text-2xl sm:text-3xl font-light mb-4">
            Be the first to shop the collection.
          </h2>
          <p className="text-sm text-white/60 mb-8 max-w-md mx-auto">
            Join the Founding Members list for early access and exclusive
            launch-day pricing.
          </p>
          <WaitlistForm variant="bottom" />
        </div>
      </section>
    </>
  );
}
