import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story behind Elanora — curated fine jewelry for the modern woman.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero banner */}
      <section className="bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-gold mb-4">
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

      {/* Origin story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative aspect-[4/5] rounded-sm overflow-hidden">
            <Image
              src="/images/products/gold-coin-necklace/1.jpg"
              alt="Elanora jewelry craftsmanship"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-gold mb-4">
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
                Every piece in our collection is hand-selected by our
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
            <p className="text-xs tracking-[0.3em] uppercase text-gold mb-3">
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
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
                </svg>
              </div>
              <h3 className="text-sm font-medium mb-2 tracking-wide">Quality First</h3>
              <p className="text-sm text-warm-gray leading-relaxed max-w-xs mx-auto">
                We use 18K gold plating, titanium steel, genuine stones, and
                hypoallergenic finishes — materials that last, not just look
                good on day one.
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
                Our pieces are curated for real life — versatile enough for
                a Monday meeting, elegant enough for a Friday evening, and
                durable enough for everything in between.
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
                By working directly with artisans and selling online-only,
                we skip the retail markups. You get premium jewelry at a
                fraction of traditional luxury prices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="order-2 lg:order-1">
            <p className="text-xs tracking-[0.3em] uppercase text-gold mb-4">
              Our Process
            </p>
            <h2 className="text-2xl sm:text-3xl font-light mb-6 leading-snug">
              Curated, Not Mass-Produced
            </h2>
            <div className="space-y-4 text-warm-gray leading-relaxed">
              <p>
                Every product in the Elanora collection goes through a careful
                selection process. We evaluate dozens of designs before choosing
                the ones that meet our standards for aesthetics, durability, and
                wearability.
              </p>
              <p>
                We test each piece ourselves — wearing it daily, checking for
                tarnish resistance, comfort, and how it pairs with real
                outfits. If it doesn&apos;t pass, it doesn&apos;t make the collection.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-6 mt-10">
              <div>
                <p className="text-2xl sm:text-3xl font-light text-gold">50+</p>
                <p className="text-xs text-warm-gray mt-1 tracking-wide uppercase">
                  Pieces Curated
                </p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-light text-gold">4.9</p>
                <p className="text-xs text-warm-gray mt-1 tracking-wide uppercase">
                  Avg. Rating
                </p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-light text-gold">30</p>
                <p className="text-xs text-warm-gray mt-1 tracking-wide uppercase">
                  Day Returns
                </p>
              </div>
            </div>
          </div>
          <div className="relative aspect-[4/5] rounded-sm overflow-hidden order-1 lg:order-2">
            <Image
              src="/images/products/heart-necklace/1.jpg"
              alt="Elanora curation process"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Promise */}
      <section className="bg-foreground text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs tracking-[0.3em] uppercase text-gold-light mb-4">
              Our Promise
            </p>
            <h2 className="text-2xl sm:text-3xl font-light mb-6">
              What You Can Always Expect
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10 text-left">
              <div className="border border-white/10 rounded-sm p-6">
                <div className="flex items-center gap-3 mb-3">
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-gold-light flex-shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                  </svg>
                  <h3 className="text-sm font-medium">Free Shipping Over $75</h3>
                </div>
                <p className="text-sm text-white/50 leading-relaxed">
                  Every order over $75 ships free within the US. International
                  shipping available at checkout.
                </p>
              </div>
              <div className="border border-white/10 rounded-sm p-6">
                <div className="flex items-center gap-3 mb-3">
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-gold-light flex-shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182M21.015 4.356v4.992" />
                  </svg>
                  <h3 className="text-sm font-medium">30-Day Returns</h3>
                </div>
                <p className="text-sm text-white/50 leading-relaxed">
                  Not the right fit? Return any unworn piece within 30 days for
                  a full refund — no questions asked.
                </p>
              </div>
              <div className="border border-white/10 rounded-sm p-6">
                <div className="flex items-center gap-3 mb-3">
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-gold-light flex-shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                  </svg>
                  <h3 className="text-sm font-medium">Gift-Ready Packaging</h3>
                </div>
                <p className="text-sm text-white/50 leading-relaxed">
                  Every order arrives in our signature box with a soft pouch —
                  ready to gift or treat yourself.
                </p>
              </div>
              <div className="border border-white/10 rounded-sm p-6">
                <div className="flex items-center gap-3 mb-3">
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-gold-light flex-shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                  <h3 className="text-sm font-medium">Secure Checkout</h3>
                </div>
                <p className="text-sm text-white/50 leading-relaxed">
                  All payments are processed securely through Stripe with
                  256-bit SSL encryption.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-gold mb-3">
          Ready to Explore?
        </p>
        <h2 className="text-2xl sm:text-3xl font-light mb-4">
          Find Your Next Favorite Piece
        </h2>
        <p className="text-warm-gray text-sm max-w-md mx-auto mb-8">
          Browse our full collection of necklaces, rings, and earrings — all
          under $130, all built to last.
        </p>
        <Link
          href="/shop"
          className="inline-block bg-foreground text-white text-sm tracking-[0.2em] uppercase px-10 py-3.5 rounded-sm hover:bg-gold transition-colors"
        >
          Shop the Collection
        </Link>
      </section>
    </>
  );
}
