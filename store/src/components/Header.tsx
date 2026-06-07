"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import CartDrawer from "./CartDrawer";

export default function Header() {
  const { totalItems, setIsOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-cream-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Mobile menu button */}
            <button
              className="sm:hidden p-2 -ml-2 text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>

            {/* Navigation - Desktop */}
            <nav className="hidden sm:flex items-center gap-8">
              <Link href="/shop" className="text-sm tracking-widest uppercase text-warm-gray hover:text-gold transition-colors">
                Shop
              </Link>
              <Link href="/shop" className="text-sm tracking-widest uppercase text-warm-gray hover:text-gold transition-colors">
                Collections
              </Link>
            </nav>

            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/images/logo/elanora-logo.png"
                alt="Elanora"
                width={120}
                height={60}
                className="h-10 sm:h-14 w-auto"
                priority
              />
            </Link>

            {/* Right side */}
            <div className="flex items-center gap-4">
              <Link href="/about" className="hidden sm:block text-sm tracking-widest uppercase text-warm-gray hover:text-gold transition-colors">
                About
              </Link>
              <button
                onClick={() => setIsOpen(true)}
                className="relative p-2 text-foreground hover:text-gold transition-colors"
                aria-label="Open cart"
              >
                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-gold text-white text-[10px] font-medium w-4.5 h-4.5 flex items-center justify-center rounded-full">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-cream-dark bg-white">
            <nav className="flex flex-col px-4 py-4 gap-3">
              <Link
                href="/shop"
                className="text-sm tracking-widest uppercase text-warm-gray hover:text-gold py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                href="/shop"
                className="text-sm tracking-widest uppercase text-warm-gray hover:text-gold py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Collections
              </Link>
              <Link
                href="/about"
                className="text-sm tracking-widest uppercase text-warm-gray hover:text-gold py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
            </nav>
          </div>
        )}
      </header>
      <CartDrawer />
    </>
  );
}
