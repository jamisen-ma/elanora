"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Scroll-linked motion for the hero → product lines transition.
// Styles are written straight to the DOM inside requestAnimationFrame, so scrolling
// never triggers React re-renders. Everything is tied to scroll position (reversible,
// never "stuck" half way) and is switched off for prefers-reduced-motion.

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
export const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

export function useScrollFrame(onFrame: () => void) {
  const cb = useRef(onFrame);
  useEffect(() => {
    cb.current = onFrame;
  });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const tick = () => {
      raf = 0;
      cb.current();
    };
    const request = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    request();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
    };
  }, []);
}

/** How far an element has scrolled out of the top of the viewport: 0 → 1. */
export function exitProgress(el: Element) {
  const r = el.getBoundingClientRect();
  return clamp(-r.top / Math.max(r.height, 1));
}

/** How far an element has travelled into the viewport from the bottom: 0 → 1. */
export function enterProgress(el: Element, distance = 0.55, offset = 0) {
  const r = el.getBoundingClientRect();
  const vh = window.innerHeight;
  return clamp((vh - r.top - offset) / (vh * distance));
}

/**
 * Hero image layer: drifts down at ~30% of scroll speed and zooms in slightly as
 * the hero leaves, so the photo appears to recede behind the next screen.
 * Progress is measured on the parent element (the hero frame).
 */
export function HeroParallax({ children }: { children: ReactNode }) {
  const layer = useRef<HTMLDivElement>(null);

  useScrollFrame(() => {
    const el = layer.current;
    const frame = el?.parentElement;
    if (!el || !frame) return;
    const p = exitProgress(frame);
    el.style.transform = `translate3d(0, ${(p * 30).toFixed(2)}%, 0) scale(${(1 + p * 0.08).toFixed(4)})`;
  });

  return (
    <div ref={layer} className="absolute inset-0 will-change-transform">
      {children}
    </div>
  );
}

/** Hero copy: fades and drifts upward a little faster than the page as you scroll. */
export function HeroCopyFade({ children, className }: { children: ReactNode; className?: string }) {
  const el = useRef<HTMLDivElement>(null);

  useScrollFrame(() => {
    const node = el.current;
    const frame = node?.closest("[data-hero-frame]");
    if (!node || !frame) return;
    const p = exitProgress(frame);
    node.style.opacity = String(clamp(1 - p * 2.2));
    node.style.transform = `translate3d(0, ${(-p * 90).toFixed(1)}px, 0)`;
  });

  return (
    <div ref={el} className={className}>
      {children}
    </div>
  );
}
