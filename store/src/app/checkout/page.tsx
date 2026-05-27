"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/products";
import { useState } from "react";

export default function CheckoutPage() {
  const { items, subtotal, removeItem, updateQuantity } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheckout = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            stripePriceId: item.product.stripePriceId,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Unable to connect to payment server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24" className="mx-auto text-cream-dark mb-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
        <h1 className="text-2xl font-light mb-3">Your bag is empty</h1>
        <p className="text-warm-gray text-sm mb-6">
          Looks like you haven&apos;t added anything yet.
        </p>
        <Link
          href="/shop"
          className="inline-block bg-foreground text-white text-sm tracking-[0.2em] uppercase px-8 py-3 rounded-sm hover:bg-gold transition-colors"
        >
          Browse Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <h1 className="text-2xl sm:text-3xl font-light mb-10 text-center">
        Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* Cart items */}
        <div className="lg:col-span-3">
          <h2 className="text-xs tracking-[0.2em] uppercase text-warm-gray mb-4">
            Order Summary
          </h2>
          <ul className="divide-y divide-cream-dark">
            {items.map((item) => (
              <li key={item.product.id} className="flex gap-4 py-5">
                <Link
                  href={`/product/${item.product.slug}`}
                  className="relative w-24 h-24 flex-shrink-0 bg-cream rounded-sm overflow-hidden"
                >
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/product/${item.product.slug}`}
                    className="text-sm font-medium hover:text-gold transition-colors"
                  >
                    {item.product.name}
                  </Link>
                  <p className="text-sm text-warm-gray mt-1">
                    {formatPrice(item.product.price)}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-cream-dark rounded-sm">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="px-2.5 py-1.5 text-xs text-warm-gray hover:text-foreground disabled:opacity-30"
                      >
                        &minus;
                      </button>
                      <span className="px-3 py-1.5 text-xs min-w-[28px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="px-2.5 py-1.5 text-xs text-warm-gray hover:text-foreground"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="text-xs text-warm-gray-light hover:text-red-500 transition-colors underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <p className="text-sm font-medium hidden sm:block whitespace-nowrap">
                  {formatPrice(item.product.price * item.quantity)}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Order total & checkout */}
        <div className="lg:col-span-2">
          <div className="bg-cream rounded-sm p-6 sticky top-24">
            <h2 className="text-xs tracking-[0.2em] uppercase text-warm-gray mb-4">
              Total
            </h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-warm-gray">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-warm-gray">Shipping</span>
                <span className="text-warm-gray-light">
                  {subtotal >= 7500 ? "Free" : "Calculated at checkout"}
                </span>
              </div>
            </div>
            <div className="border-t border-cream-dark pt-4 mb-6">
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-600 mb-4">{error}</p>
            )}

            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full bg-foreground text-white text-sm tracking-[0.2em] uppercase py-3.5 rounded-sm hover:bg-gold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Redirecting..." : "Pay with Stripe"}
            </button>

            <p className="text-[11px] text-warm-gray-light mt-3 text-center">
              You&apos;ll be redirected to Stripe&apos;s secure checkout
            </p>

            <div className="flex items-center justify-center gap-4 mt-4 text-warm-gray-light">
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
              <span className="text-[10px] tracking-wide uppercase">Secure 256-bit SSL</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
