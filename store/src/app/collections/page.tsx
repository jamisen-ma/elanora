import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { collections, getProductsByCollection } from "@/data/products";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Explore our curated jewelry collections — each one tells a unique story.",
};


export default function CollectionsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[40vh] sm:h-[50vh] flex items-center overflow-hidden mt-16 sm:mt-20">
        <Image src="/images/collection-flat-lay.jpg" alt="Collection flat lay of all jewelry pieces" fill className="object-cover object-center" sizes="100vw" unoptimized />
        <div className="absolute inset-0 bg-foreground/50" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
          <p className="text-[10px] sm:text-xs tracking-[0.4em] uppercase text-gold-light mb-3">
            Our Drops
          </p>
          <h1 className="text-3xl sm:text-5xl font-light text-white mb-4">Collections</h1>
          <p className="text-sm text-white/60 max-w-lg mx-auto">
            Each collection is a chapter in the Elanora story — curated around a
            mood, a season, and a feeling.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Current Drop */}
        {(() => {
          const current = collections.find((c) => c.slug === "summer-solstice");
          if (!current) return null;
          const currentProducts = getProductsByCollection(current.slug).filter((p) => !p.soldOut);
          const previewImage = currentProducts[0]?.images[0];
          return (
            <div className="mb-16">
              <Link href={`/collections/${current.slug}`} className="group block">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 overflow-hidden">
                  <div className="relative aspect-[4/3] md:aspect-auto bg-cream overflow-hidden min-h-[300px]">
                    {previewImage && (
                      <Image
                        src={previewImage}
                        alt={current.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute top-4 left-4">
                      <span className="bg-gold text-white text-[9px] tracking-[0.2em] uppercase px-4 py-1.5">
                        New
                      </span>
                    </div>
                  </div>
                  <div className="bg-white p-8 sm:p-10 md:p-14 flex flex-col justify-center">
                    <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-2">
                      {current.season}
                    </p>
                    <h2 className="text-2xl sm:text-3xl font-light mb-2 group-hover:text-gold transition-colors">
                      {current.name}
                    </h2>
                    <p className="text-sm italic text-warm-gray mb-4">
                      {current.tagline}
                    </p>
                    <p className="text-sm text-warm-gray leading-relaxed mb-6">
                      {current.description}
                    </p>
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-foreground border-b-2 border-foreground pb-0.5 group-hover:text-gold group-hover:border-gold transition-colors">
                        Shop Collection
                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </span>
                      <span className="text-xs text-warm-gray-light ml-4">
                        {currentProducts.length} pieces
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })()}

        {/* Browse all CTA */}
        <div className="text-center mt-12">
          <Link
            href="/shop"
            className="inline-flex items-center gap-3 border border-foreground text-foreground text-xs tracking-[0.2em] uppercase px-8 py-3.5 hover:bg-foreground hover:text-white transition-colors"
          >
            Shop All Jewelry
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
}
