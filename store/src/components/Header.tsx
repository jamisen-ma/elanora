"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import CartDrawer from "./CartDrawer";
import PromoBanner from "./PromoBanner";

export default function Header() {
  const { totalItems, setIsOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSignup = () => {
    const el = document.querySelector("section.bg-foreground:last-of-type");
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const headerBg = isHome && !scrolled && !mobileMenuOpen
    ? "bg-transparent"
    : "bg-background/95 backdrop-blur-md border-b border-cream-dark";

  const textColor = isHome && !scrolled && !mobileMenuOpen
    ? "text-white"
    : "text-foreground";

  const mutedColor = isHome && !scrolled && !mobileMenuOpen
    ? "text-white/70 hover:text-white"
    : "text-warm-gray hover:text-gold";

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-40">
      {(!isHome || scrolled) && <PromoBanner />}
      <header className={`transition-all duration-300 ${headerBg}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Mobile menu button */}
            <button
              className={`sm:hidden p-2 -ml-2 ${textColor}`}
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

            {/* Desktop left nav */}
            <nav className="hidden sm:flex items-center gap-8">
              <Link href="/" className={`text-xs tracking-[0.2em] uppercase ${mutedColor} transition-colors`}>
                Home
              </Link>
              <Link href="/shop" className={`text-xs tracking-[0.2em] uppercase ${mutedColor} transition-colors`}>
                Shop
              </Link>
              <Link href="/collections" className={`text-xs tracking-[0.2em] uppercase ${mutedColor} transition-colors`}>
                Collections
              </Link>
              <Link href="/about" className={`text-xs tracking-[0.2em] uppercase ${mutedColor} transition-colors`}>
                Our Story
              </Link>
            </nav>

            {/* Logo */}
            <Link href="/" className="absolute left-1/2 -translate-x-1/2">
              <Image
                src="/images/logo.png"
                alt="Elanora Jewelry"
                width={120}
                height={120}
                className={`h-12 sm:h-14 w-auto transition-all duration-300 ${isHome && !scrolled ? "brightness-0 invert" : ""}`}
                priority
              />
            </Link>

            {/* Right side */}
            <div className="flex items-center gap-3 sm:gap-5">
              <button
                onClick={scrollToSignup}
                className="hidden sm:inline-block bg-gold text-white text-[10px] tracking-[0.2em] uppercase px-5 py-2.5 hover:bg-gold-dark transition-colors"
              >
                Join Waitlist
              </button>
              <button
                onClick={() => setIsOpen(true)}
                className={`relative p-2 ${textColor} hover:text-gold transition-colors`}
                aria-label="Open cart"
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
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
          <div className="sm:hidden border-t border-cream-dark bg-background">
            <nav className="flex flex-col px-4 py-6 gap-1">
              {[
                { href: "/", label: "Home" },
                { href: "/shop", label: "Shop" },
                { href: "/collections", label: "Collections" },
                { href: "/about", label: "Our Story" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm tracking-[0.15em] uppercase text-foreground hover:text-gold py-3 border-b border-cream-dark"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://www.instagram.com/elanorajewelry_2024/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm tracking-[0.15em] uppercase text-foreground hover:text-gold py-3 border-b border-cream-dark"
                onClick={() => setMobileMenuOpen(false)}
              >
                Instagram
              </a>
              <button
                onClick={scrollToSignup}
                className="mt-4 bg-gold text-white text-xs tracking-[0.2em] uppercase px-6 py-3.5 hover:bg-gold-dark transition-colors w-full"
              >
                Join the Waitlist — 30% Off
              </button>
            </nav>
          </div>
        )}
      </header>
      </div>
      <CartDrawer />
    </>
  );
}
