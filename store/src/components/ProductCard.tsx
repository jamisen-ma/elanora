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
      <div className="relative aspect-[3/4] overflow-hidden bg-cream mb-3">
        <Image
          src={product.images[imageIndex]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className={`object-cover transition-all duration-700 ease-out group-hover:scale-105 ${product.soldOut ? "opacity-60 grayscale" : ""}`}
        />
        {product.soldOut && (
          <span className="absolute top-3 left-3 bg-foreground text-white text-[9px] tracking-[0.15em] uppercase px-3 py-1">
            Sold Out
          </span>
        )}
        {!product.soldOut && (
          <>
            {/* Hover overlay */}
            <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <div className="bg-white/95 backdrop-blur-sm text-center py-2.5 text-[10px] tracking-[0.2em] uppercase text-foreground">
                View Details
              </div>
            </div>
          </>
        )}
      </div>
      <div className="space-y-1">
        <p className="text-[10px] tracking-[0.2em] uppercase text-warm-gray-light">{product.category}</p>
        <h3 className="text-sm font-medium text-foreground group-hover:text-gold transition-colors leading-snug">
          {product.name}
        </h3>
        <p className="text-sm text-foreground">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}
