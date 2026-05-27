"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/products";

export default function CartDrawer() {
  const { items, removeItem, updateQuantity, subtotal, totalItems, isOpen, setIsOpen } = useCart();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-50 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 transform transition-transform duration-300 ease-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-cream-dark">
          <h2 className="text-sm tracking-[0.2em] uppercase">
            Your Bag ({totalItems})
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 text-warm-gray hover:text-foreground transition-colors"
            aria-label="Close cart"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24" className="text-cream-dark mb-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              <p className="text-sm text-warm-gray mb-4">Your bag is empty</p>
              <Link
                href="/shop"
                onClick={() => setIsOpen(false)}
                className="text-sm tracking-widest uppercase text-gold hover:text-gold-dark transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <ul className="space-y-6">
              {items.map((item) => (
                <li key={item.product.id} className="flex gap-4">
                  <Link
                    href={`/product/${item.product.slug}`}
                    onClick={() => setIsOpen(false)}
                    className="relative w-20 h-20 flex-shrink-0 bg-cream rounded-sm overflow-hidden"
                  >
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/product/${item.product.slug}`}
                      onClick={() => setIsOpen(false)}
                      className="text-sm font-medium hover:text-gold transition-colors block truncate"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-sm text-warm-gray mt-0.5">
                      {formatPrice(item.product.price)}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-cream-dark rounded-sm">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="px-2 py-1 text-xs text-warm-gray hover:text-foreground disabled:opacity-30 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          &minus;
                        </button>
                        <span className="px-2 py-1 text-xs min-w-[24px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-1 text-xs text-warm-gray hover:text-foreground transition-colors"
                          aria-label="Increase quantity"
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
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-cream-dark px-6 py-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm tracking-widest uppercase text-warm-gray">Subtotal</span>
              <span className="text-sm font-medium">{formatPrice(subtotal)}</span>
            </div>
            <p className="text-xs text-warm-gray-light">
              Shipping and taxes calculated at checkout
            </p>
            <Link
              href="/checkout"
              onClick={() => setIsOpen(false)}
              className="block w-full bg-foreground text-white text-center text-sm tracking-widest uppercase py-3.5 rounded-sm hover:bg-gold transition-colors"
            >
              Checkout
            </Link>
            <Link
              href="/shop"
              onClick={() => setIsOpen(false)}
              className="block text-center text-xs text-warm-gray hover:text-gold transition-colors tracking-widest uppercase"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
