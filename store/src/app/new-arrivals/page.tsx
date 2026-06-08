import type { Metadata } from "next";
import { getAllProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export const metadata: Metadata = {
  title: "New Arrivals",
  description:
    "Discover the latest additions to the Elanora jewelry collection.",
};

export default function NewArrivalsPage() {
  const products = getAllProducts().filter((p) => !p.soldOut);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-xs tracking-[0.3em] uppercase text-gold mb-3">
          Just Dropped
        </p>
        <h1 className="text-3xl sm:text-4xl font-light mb-4">New Arrivals</h1>
        <p className="text-sm text-warm-gray max-w-lg mx-auto">
          Fresh pieces added to our collection — be the first to wear them.
        </p>
      </div>

      {/* Product count */}
      <p className="text-xs text-warm-gray-light tracking-wide mb-6">
        {products.length} {products.length === 1 ? "piece" : "pieces"}
      </p>

      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
