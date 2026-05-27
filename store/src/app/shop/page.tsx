import type { Metadata } from "next";
import { getAllProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export const metadata: Metadata = {
  title: "Shop All Jewelry",
  description: "Browse our curated collection of fine jewelry — necklaces, rings, and accessories.",
};

export default function ShopPage() {
  const products = getAllProducts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-xs tracking-[0.3em] uppercase text-gold mb-3">
          The Collection
        </p>
        <h1 className="text-3xl sm:text-4xl font-light mb-4">
          All Jewelry
        </h1>
        <p className="text-sm text-warm-gray max-w-lg mx-auto">
          Every piece is thoughtfully selected and crafted with care.
          Find the perfect addition to your jewelry collection.
        </p>
      </div>

      {/* Product count */}
      <p className="text-xs text-warm-gray-light tracking-wide mb-6">
        {products.length} {products.length === 1 ? "piece" : "pieces"}
      </p>

      {/* Product grid */}
      {products.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-warm-gray">No products yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
