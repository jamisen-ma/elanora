"use client";

import { useState } from "react";
import type { Product } from "@/data/products";
import ProductCard from "./ProductCard";

const categories = ["All", "Necklaces", "Earrings", "Rings"] as const;
type Category = (typeof categories)[number];

export default function ShopContent({ products }: { products: Product[] }) {
  const [active, setActive] = useState<Category>("All");

  const filtered =
    active === "All"
      ? products
      : products.filter((p) => p.category === active);

  const counts: Record<Category, number> = {
    All: products.length,
    Necklaces: products.filter((p) => p.category === "Necklaces").length,
    Earrings: products.filter((p) => p.category === "Earrings").length,
    Rings: products.filter((p) => p.category === "Rings").length,
  };

  return (
    <>
      {/* Filter tabs */}
      <div className="flex justify-center gap-1 sm:gap-2 mb-10 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`text-xs tracking-[0.2em] uppercase px-5 py-2.5 transition-all duration-200 ${
              active === cat
                ? "bg-foreground text-white"
                : "bg-transparent text-warm-gray hover:text-foreground"
            }`}
          >
            {cat}
            <span className="ml-1.5 text-[10px] opacity-50">
              ({counts[cat]})
            </span>
          </button>
        ))}
      </div>

      {/* Product count */}
      <p className="text-xs text-warm-gray-light tracking-wide mb-6">
        Showing {filtered.length}{" "}
        {filtered.length === 1 ? "piece" : "pieces"}
      </p>

      {/* Product grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-warm-gray">No products in this category yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </>
  );
}
