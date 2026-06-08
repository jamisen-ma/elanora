import type { Metadata } from "next";
import { getAllProducts } from "@/data/products";
import ShopContent from "@/components/ShopContent";

export const metadata: Metadata = {
  title: "Shop All Jewelry",
  description:
    "Browse our curated collection of fine jewelry — necklaces, rings, and accessories.",
};

export default function ShopPage() {
  const products = getAllProducts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Header */}
      <div className="text-center mb-10">
        <p className="text-xs tracking-[0.3em] uppercase text-gold mb-3">
          The Collection
        </p>
        <h1 className="text-3xl sm:text-4xl font-light mb-4">
          Shop Jewelry
        </h1>
        <p className="text-sm text-warm-gray max-w-lg mx-auto">
          Every piece is thoughtfully selected and crafted with care. Find the
          perfect addition to your jewelry collection.
        </p>
      </div>

      <ShopContent products={products} />
    </div>
  );
}
