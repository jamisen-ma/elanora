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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Header */}
      <div className="text-center mb-14">
        <p className="text-xs tracking-[0.3em] uppercase text-gold mb-3">
          Our Drops
        </p>
        <h1 className="text-3xl sm:text-4xl font-light mb-4">Collections</h1>
        <p className="text-sm text-warm-gray max-w-lg mx-auto">
          Each collection is a chapter in the Elanora story — curated around a
          mood, a season, and a feeling.
        </p>
      </div>

      {/* Current Drop */}
      {(() => {
        const current = collections.find((c) => c.slug === "summer-solstice");
        if (!current) return null;
        const currentProducts = getProductsByCollection(current.slug).filter((p) => !p.soldOut);
        const previewImage = currentProducts[0]?.images[0];
        return (
          <div className="mb-16">
            <p className="text-xs tracking-[0.3em] uppercase text-gold mb-6 text-center">
              Latest Drop
            </p>
            <Link href={`/collections/${current.slug}`} className="group block">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-2 border-gold/30 rounded-sm overflow-hidden hover:border-gold/60 transition-colors">
                <div className="relative aspect-[4/3] md:aspect-auto bg-cream overflow-hidden">
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
                    <span className="bg-gold text-white text-[10px] tracking-[0.2em] uppercase px-4 py-1.5 rounded-sm">
                      New
                    </span>
                  </div>
                </div>
                <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-center">
                  <p className="text-xs tracking-[0.2em] uppercase text-gold mb-2">
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
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-warm-gray-light tracking-wide">
                      {currentProducts.length} pieces
                    </span>
                    <span className="text-xs text-gold tracking-wide">
                      {currentProducts.length} available
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        );
      })()}

      {/* Browse all */}
      <div className="text-center mt-12">
        <Link
          href="/shop"
          className="inline-block border border-foreground text-foreground text-sm tracking-[0.2em] uppercase px-8 py-3 rounded-sm hover:bg-foreground hover:text-white transition-colors"
        >
          Shop All Jewelry
        </Link>
      </div>
    </div>
  );
}
