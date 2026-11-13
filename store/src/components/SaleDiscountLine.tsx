"use client";

import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/products";

/** "Limited-time discount  −$X" in the bag and checkout totals (10%, or a series' own discount). */
export default function SaleDiscountLine({ className = "" }: { className?: string }) {
  const { discount } = useCart();
  if (discount <= 0) return null;
  return (
    <div className={`flex items-baseline justify-between gap-4 text-sm ${className}`}>
      <span className="text-warm-gray">Limited-time discount</span>
      <span className="whitespace-nowrap">&minus;{formatPrice(discount)}</span>
    </div>
  );
}
