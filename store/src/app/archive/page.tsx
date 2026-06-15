import type { Metadata } from "next";
import Image from "next/image";
import { getAllProducts } from "@/data/products";

export const metadata: Metadata = {
  title: "Archive",
  description: "Archived products — not currently listed on the site.",
  robots: { index: false, follow: false }, // Hidden from search engines
};

export default function ArchivePage() {
  const archivedProducts = getAllProducts().filter((p) => p.soldOut);
  const availableProducts = getAllProducts().filter((p) => !p.soldOut);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs tracking-[0.3em] uppercase text-gold mb-2">
          Internal Archive
        </p>
        <h1 className="text-2xl sm:text-3xl font-light mb-3">
          Product Archive
        </h1>
        <p className="text-sm text-warm-gray max-w-xl">
          These products are currently not shown on the public site. They can be
          re-activated if 1688/Alibaba restocks them. This page is not linked
          from the navigation and is hidden from search engines.
        </p>
      </div>

      {/* Archived (Sold Out) Products */}
      <div className="mb-16">
        <h2 className="text-lg font-medium mb-6 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-400" />
          Archived Products ({archivedProducts.length})
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {archivedProducts.map((product) => (
            <div
              key={product.id}
              className="border border-cream-dark rounded-sm overflow-hidden"
            >
              <div className="relative aspect-square bg-cream">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover opacity-60"
                />
                <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] tracking-[0.15em] uppercase px-3 py-1 rounded-sm">
                  Archived
                </span>
              </div>
              <div className="p-4">
                <p className="text-xs text-warm-gray-light mb-1">
                  ID: {product.id} &middot; {product.category}
                </p>
                <h3 className="text-sm font-medium mb-1">{product.name}</h3>
                <p className="text-xs text-warm-gray mb-2">
                  Slug: {product.slug}
                </p>
                <p className="text-xs text-warm-gray mb-2">
                  Folder: {product.imageFolder}
                </p>
                <p className="text-xs text-warm-gray">
                  {product.images.length} image{product.images.length !== 1 ? "s" : ""}
                  {product.collection && ` · Collection: ${product.collection}`}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Products for reference */}
      <div>
        <h2 className="text-lg font-medium mb-6 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400" />
          Active Products ({availableProducts.length})
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableProducts.map((product) => (
            <div
              key={product.id}
              className="border border-cream-dark rounded-sm overflow-hidden"
            >
              <div className="relative aspect-square bg-cream">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
                <span className="absolute top-3 left-3 bg-green-500 text-white text-[10px] tracking-[0.15em] uppercase px-3 py-1 rounded-sm">
                  Active
                </span>
              </div>
              <div className="p-4">
                <p className="text-xs text-warm-gray-light mb-1">
                  ID: {product.id} &middot; {product.category}
                </p>
                <h3 className="text-sm font-medium mb-1">{product.name}</h3>
                <p className="text-xs text-warm-gray mb-2">
                  Slug: {product.slug}
                </p>
                <p className="text-xs text-warm-gray">
                  {product.images.length} image{product.images.length !== 1 ? "s" : ""}
                  {product.collection && ` · Collection: ${product.collection}`}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
