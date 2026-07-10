"use client";

import WaitlistForm from "./WaitlistForm";

export default function ProductWaitlistCTA() {
  return (
    <div className="border border-gold/20 bg-cream/50 p-6">
      <div className="flex items-center gap-2 mb-2">
        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-gold">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-xs tracking-[0.2em] uppercase text-gold font-sans">
          Launching August 20, 2026
        </p>
      </div>
      <h3 className="text-base font-medium mb-1">
        Get 30% off this piece
      </h3>
      <p className="text-sm text-warm-gray mb-4">
        Join the Founding Members list and receive an exclusive 30% discount code for launch day.
      </p>
      <WaitlistForm variant="product" />
    </div>
  );
}
