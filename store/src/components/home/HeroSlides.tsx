"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HeroCopyFade, HeroParallax } from "@/components/ScrollEffects";
import { didone } from "@/lib/fonts";

// Homepage hero images, cross-fading in a loop. Each slide can set its own crop for
// narrow screens (`mobilePosition`) so the subject stays in view. Pauses on reduced
// motion (first slide only) and while the tab is hidden.
// Phones and tablets (below lg) follow a campaign layout: the photo fills the screen, each
// slide's headline and line sit over it in white at the bottom left, and a thin progress line
// runs along the bottom. Desktop keeps its own copy beside the photo (in the page).

export interface HeroSlide {
  src: string;
  alt: string;
  /** object-position below lg, where the photo is cropped tall */
  mobilePosition?: string;
  /** object-position from lg up (default centre) */
  desktopPosition?: string;
  /** soft light fade over the left side (lg+) so the dark headline stays readable on busy photos */
  scrim?: boolean;
  /** below lg: this slide's headline, line and link, shown over the photo */
  title?: string;
  subtitle?: string;
  href?: string;
}

const INTERVAL = 6000;

export default function HeroSlides({ slides }: { slides: HeroSlide[] }) {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(false);

  useEffect(() => {
    if (slides.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setAuto(true);
  }, [slides.length]);

  // One timer per slide, restarted whenever the slide changes (also when a segment is tapped),
  // so the progress line and the change of photo stay in step.
  useEffect(() => {
    if (!auto) return;
    const id = window.setTimeout(() => setActive((i) => (i + 1) % slides.length), INTERVAL);
    return () => window.clearTimeout(id);
  }, [active, auto, slides.length]);

  return (
    <>
      {/* Scroll: photo drifts and zooms slightly as the next screen arrives */}
      <HeroParallax>
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
            {s.scrim && (
              <div
                aria-hidden
                className="absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(255,250,244,0.78)_0%,rgba(255,250,244,0.55)_28%,rgba(255,250,244,0)_52%)] lg:block"
              />
            )}
          </div>
        ))}
      </HeroParallax>

      {/* Below lg: soft dark fade at the top so the white logo and icons read on any photo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[linear-gradient(180deg,rgba(0,0,0,0.32)_0%,rgba(0,0,0,0)_100%)] lg:hidden"
      />

      {/* Below lg: soft dark fade at the bottom so the white copy reads on any photo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[30%] bg-[linear-gradient(0deg,rgba(0,0,0,0.38)_0%,rgba(0,0,0,0.12)_55%,rgba(0,0,0,0)_100%)] lg:hidden"
      />

      {/* Below lg: each slide's headline and line, cross-fading with the photo */}
      <HeroCopyFade className="absolute inset-x-0 bottom-0 px-6 pb-12 text-white sm:px-10 lg:hidden">
        <div className="relative min-h-[5.5rem]">
          {slides.map((s, i) =>
            s.title ? (
              <div
                key={s.src}
                aria-hidden={i !== active}
                className={`absolute inset-x-0 bottom-0 transition-[opacity,transform] duration-[1200ms] ease-out ${
                  i === active ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-2"
                }`}
              >
                {i === 0 ? (
                  <h1 className={`${didone.className} max-w-[18ch] text-[2rem] font-normal leading-[1.1] tracking-[-0.01em] sm:text-[2.5rem]`}>
                    {s.title}
                  </h1>
                ) : (
                  <p className={`${didone.className} max-w-[18ch] text-[2rem] font-normal leading-[1.1] tracking-[-0.01em] sm:text-[2.5rem]`}>
                    {s.title}
                  </p>
                )}
                {s.subtitle && (
                  <p className={`${didone.className} mt-3 max-w-[30ch] text-[17px] leading-snug text-white/90`}>{s.subtitle}</p>
                )}
                {s.href && (
                  <Link
                    href={s.href}
                    tabIndex={i === active ? 0 : -1}
                    className="mt-3 inline-block border-b border-white/70 pb-0.5 text-[12px] font-medium uppercase tracking-[0.22em] text-white"
                  >
                    Explore
                  </Link>
                )}
              </div>
            ) : null,
          )}
        </div>
      </HeroCopyFade>

      {/* Below lg: thin progress line, one segment per slide; tap a segment to jump to it */}
      {slides.length > 1 && (
        <div className="absolute inset-x-6 bottom-5 flex gap-2 sm:inset-x-10 lg:hidden">
          {slides.map((s, i) => (
            <button
              key={s.src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show slide ${i + 1}`}
              aria-current={i === active}
              className="relative h-6 flex-1"
            >
              <span className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 bg-white/35" />
              <span
                key={i === active ? `on-${active}` : "off"}
                className="absolute left-0 top-1/2 h-[2px] -translate-y-1/2 bg-white"
                style={{
                  width: i < active || (i === active && !auto) ? "100%" : "0%",
                  animation: i === active && auto ? `hero-progress ${INTERVAL}ms linear forwards` : undefined,
                }}
              />
            </button>
          ))}
        </div>
      )}
    </>
  );
}
