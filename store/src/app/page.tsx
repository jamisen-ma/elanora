import Image from "next/image";
import Link from "next/link";
import { getFeaturedProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import NewsletterForm from "@/components/NewsletterForm";

export default function HomePage() {
  const featured = getFeaturedProducts();

  return (
    <>
      {/* Hero */}
      <section className="relative bg-cream overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left — Text */}
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-gold mb-4">
                Shop &middot; Style &middot; Elevate
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-foreground leading-tight mb-6">
                Jewelry That
                <br />
                <span className="italic">Speaks</span> for You
              </h1>
              <p className="text-warm-gray text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
                Discover our curated collection of fine jewelry — timeless pieces
                designed to complement every moment and elevate your personal style.
              </p>
              <Link
                href="/shop"
                className="inline-block bg-foreground text-white text-sm tracking-[0.2em] uppercase px-8 py-3.5 rounded-sm hover:bg-gold transition-colors"
              >
                Shop the Collection
              </Link>
            </div>

            {/* Right — Videos */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="rounded-lg overflow-hidden shadow-lg aspect-[9/16]">
                <video
                  src="/videos/hero-1.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg aspect-[9/16] mt-8">
                <video
                  src="/videos/hero-2.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.3em] uppercase text-gold mb-3">
            Curated for You
          </p>
          <h2 className="text-2xl sm:text-3xl font-light">
            Featured Collection
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            href="/shop"
            className="inline-block border border-foreground text-foreground text-sm tracking-[0.2em] uppercase px-8 py-3 rounded-sm hover:bg-foreground hover:text-white transition-colors"
          >
            View All Pieces
          </Link>
        </div>
      </section>

      {/* Brand Story */}
      <section className="bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden">
              <Image
                src="/images/products/gold-coin-necklace/1.jpg"
                alt="Elanora jewelry"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="max-w-lg">
              <p className="text-xs tracking-[0.3em] uppercase text-gold mb-4">
                Our Story
              </p>
              <h2 className="text-2xl sm:text-3xl font-light mb-6 leading-snug">
                Crafted With Purpose,
                <br />
                Worn With Confidence
              </h2>
              <p className="text-warm-gray leading-relaxed mb-4">
                At Elanora, we believe that jewelry is more than adornment — it&apos;s
                an expression of identity. Each piece in our collection is thoughtfully
                selected to bring together quality craftsmanship, modern design, and
                timeless appeal.
              </p>
              <p className="text-warm-gray leading-relaxed mb-8">
                From layered necklaces to statement rings, every item is made to be
                worn daily, gifted with love, and treasured for years to come.
              </p>
              <Link
                href="/shop"
                className="text-sm tracking-[0.2em] uppercase text-gold hover:text-gold-dark transition-colors border-b border-gold pb-0.5"
              >
                Discover More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
          <div>
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-cream flex items-center justify-center">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-gold">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
              </svg>
            </div>
            <h3 className="text-sm font-medium mb-2">Beautifully Packaged</h3>
            <p className="text-sm text-warm-gray leading-relaxed">
              Every order arrives in our signature gift box, ready to give or keep.
            </p>
          </div>
          <div>
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-cream flex items-center justify-center">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-gold">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
              </svg>
            </div>
            <h3 className="text-sm font-medium mb-2">Quality Materials</h3>
            <p className="text-sm text-warm-gray leading-relaxed">
              18K gold plating, titanium steel, and genuine stones in every piece.
            </p>
          </div>
          <div>
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-cream flex items-center justify-center">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-gold">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </div>
            <h3 className="text-sm font-medium mb-2">Made With Love</h3>
            <p className="text-sm text-warm-gray leading-relaxed">
              Thoughtfully curated and designed for the modern, confident woman.
            </p>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-foreground text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-gold-light mb-4">
            Stay in Touch
          </p>
          <h2 className="text-2xl sm:text-3xl font-light mb-4">
            Join the Elanora World
          </h2>
          <p className="text-sm text-white/60 mb-8 max-w-md mx-auto">
            Be the first to know about new arrivals, exclusive offers, and styling inspiration.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
