"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// Homepage hero images, cross-fading in a loop. Each slide can set its own crop for
// narrow screens (`mobilePosition`) so the subject stays in view. Pauses on reduced
// motion (first slide only) and while the tab is hidden. No controls: it just plays.

export interface HeroSlide {
  src: string;
  alt: string;
  /** object-position below lg, where the photo is cropped tall */
  mobilePosition?: string;
  /** object-position from lg up (default centre) */
  desktopPosition?: string;
}

const INTERVAL = 6000;

export default function HeroSlides({ slides }: { slides: HeroSlide[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (!document.hidden) setActive((i) => (i + 1) % slides.length);
    }, INTERVAL);
    return () => window.clearInterval(id);
  }, [slides.length]);

  return (
    <>
      {slides.map((s, i) => (
        <div
          key={s.src}
          aria-hidden={i !== active}
          className="absolute inset-0 transition-opacity duration-[1400ms] ease-in-out"
          style={{ opacity: i === active ? 1 : 0 }}
        >
          <Image
            src={s.src}
            alt={s.alt}
            fill
            unoptimized
            loading="eager"
            fetchPriority={i === 0 ? "high" : "auto"}
            sizes="100vw"
            className="object-cover [object-position:var(--mobile-pos)] lg:[object-position:var(--desktop-pos)]"
            style={{
              ["--mobile-pos" as string]: s.mobilePosition ?? "50% 50%",
              ["--desktop-pos" as string]: s.desktopPosition ?? "50% 50%",
            }}
          />
        </div>
      ))}

    </>
  );
}
