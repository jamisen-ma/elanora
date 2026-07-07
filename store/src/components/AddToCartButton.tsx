"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/data/products";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [selectedColor, setSelectedColor] = useState(
    product.colors?.[0]?.name
  );

  if (product.soldOut) {
    return (
      <button
        disabled
        className="w-full py-3.5 text-sm tracking-[0.2em] uppercase rounded-sm bg-warm-gray/20 text-warm-gray cursor-not-allowed"
      >
        Sold Out
      </button>
    );
  }

  const handleAdd = () => {
    addItem(product, quantity, selectedColor);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Color selector */}
      {product.colors && product.colors.length > 0 && (
        <div>
          <label className="text-xs tracking-[0.15em] uppercase text-warm-gray block mb-2">
            Color — {selectedColor}
          </label>
          <div className="flex gap-3">
            {product.colors.map((color) => (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color.name)}
                className={`w-8 h-8 rounded-full border-2 transition-all ${
                  selectedColor === color.name
                    ? "border-foreground scale-110"
                    : "border-cream-dark hover:border-warm-gray"
                }`}
                style={{ backgroundColor: color.hex }}
                aria-label={color.name}
                title={color.name}
              />
            ))}
          </div>
        </div>
      )}

      {/* Quantity selector */}
      <div>
        <label className="text-xs tracking-[0.15em] uppercase text-warm-gray block mb-2">
          Quantity
        </label>
        <div className="inline-flex items-center border border-cream-dark rounded-sm">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
            className="px-4 py-2.5 text-sm text-warm-gray hover:text-foreground disabled:opacity-30 transition-colors"
            aria-label="Decrease quantity"
          >
            &minus;
          </button>
          <span className="px-4 py-2.5 text-sm min-w-[48px] text-center border-x border-cream-dark">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-4 py-2.5 text-sm text-warm-gray hover:text-foreground transition-colors"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      {/* Add to cart button */}
      <button
        onClick={handleAdd}
        className={`w-full py-3.5 text-sm tracking-[0.2em] uppercase rounded-sm transition-all duration-300 ${
          added
            ? "bg-green-700 text-white"
            : "bg-foreground text-white hover:bg-gold"
        }`}
      >
        {added ? "Added to Bag" : "Add to Bag"}
      </button>
    </div>
  );
}
