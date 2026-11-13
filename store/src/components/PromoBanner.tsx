"use client";

import { useEffect, useRef, useState } from "react";
import { LAUNCH_SALE } from "@/data/promo";

export default function PromoBanner() {
  const [dismissed, setDismissed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Publish the bar's height as --promo-h so the homepage hero can fill exactly the
  // rest of the viewport (it changes with wrapping, resizing and dismissing).
  useEffect(() => {
    const root = document.documentElement;
    const el = ref.current;
    if (!el) {
      root.style.setProperty("--promo-h", "0px");
      return;
    }
    const update = () => root.style.setProperty("--promo-h", `${el.getBoundingClientRect().height}px`);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [dismissed]);

  if (dismissed) return null;

  return (
    <div ref={ref} className="bg-foreground text-white text-center py-2 pl-4 pr-9 relative">
      <p className="text-[12px] sm:text-xs tracking-[0.15em] uppercase">
        {LAUNCH_SALE.banner}
      </p>
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
        aria-label="Dismiss"
      >
        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
