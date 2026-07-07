"use client";

import { useState } from "react";

export default function PromoBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-foreground text-white text-center py-2.5 px-4 relative z-50">
      <p className="text-[10px] sm:text-xs tracking-[0.15em] uppercase">
        <span className="text-gold-light font-medium">30% off</span>
        {" "}for Founding Members —{" "}
        <span className="hidden sm:inline">Join the waitlist and get your exclusive code. </span>
        Launching August 20, 2026
      </p>
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
        aria-label="Dismiss"
      >
        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
