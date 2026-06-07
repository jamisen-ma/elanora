"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/data/products";
import { formatPrice } from "@/data/products";

export default function ProductCard({ product }: { product: Product }) {
  const [imageIndex, setImageIndex] = useState(0);

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block"
      onMouseEnter={() => {
        if (product.images.length > 1) setImageIndex(1);
      }}
      onMouseLeave={() => setImageIndex(0)}
    >
      <div className="relative aspect-square overflow-hidden rounded-sm bg-cream mb-3">
        <Image
          src={product.images[imageIndex]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className={`object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${product.soldOut ? "opacity-70" : ""}`}
        />
        {product.soldOut && (
          <span className="absolute top-3 left-3 bg-foreground text-white text-[10px] tracking-[0.15em] uppercase px-3 py-1 rounded-sm">
            Sold Out
          </span>
        )}
      </div>
      <div className="space-y-1">
        <p className="text-xs tracking-widest uppercase text-warm-gray-light">{product.category}</p>
        <h3 className="text-sm font-medium text-foreground group-hover:text-gold transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-warm-gray">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}
