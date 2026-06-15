"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSignup = () => {
    // Scroll to the bottom CTA section
    const el = document.querySelector("section.bg-foreground:last-of-type");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
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

          {/* Desktop left nav */}
          <nav className="hidden sm:flex items-center gap-8">
            <Link href="/about" className="text-sm tracking-widest uppercase text-warm-gray hover:text-gold transition-colors">
              Our Story
            </Link>
            <a
              href="https://www.instagram.com/elanorajewelry_2024/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm tracking-widest uppercase text-warm-gray hover:text-gold transition-colors"
            >
              Instagram
            </a>
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

          {/* Right side — CTA button */}
          <div className="flex items-center">
            <button
              onClick={scrollToSignup}
              className="hidden sm:inline-block bg-foreground text-white text-xs tracking-[0.15em] uppercase px-5 py-2.5 rounded-sm hover:bg-gold transition-colors"
            >
              Join Waitlist
            </button>
            {/* Mobile: just the CTA */}
            <button
              onClick={scrollToSignup}
              className="sm:hidden text-xs tracking-[0.15em] uppercase text-gold font-medium"
            >
              Join
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-cream-dark bg-white">
          <nav className="flex flex-col px-4 py-4 gap-3">
            <Link
              href="/about"
              className="text-sm tracking-widest uppercase text-warm-gray hover:text-gold py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Our Story
            </Link>
            <a
              href="https://www.instagram.com/elanorajewelry_2024/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm tracking-widest uppercase text-warm-gray hover:text-gold py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Instagram
            </a>
            <button
              onClick={scrollToSignup}
              className="text-sm tracking-widest uppercase text-gold hover:text-gold-dark py-2 text-left"
            >
              Join the Waitlist
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
