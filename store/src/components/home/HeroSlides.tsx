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
// runs along the bottom. Desktop shows the same headline and line in dark type in the empty
// wall on the left. Both cross-fade with their photo.

export interface HeroSlide {
  src: string;
  alt: string;
  /** object-position below lg, where the photo is cropped tall */
  mobilePosition?: string;
  /** object-position from lg up (default centre) */
  desktopPosition?: string;
  /** soft light fade over the left side (lg+) so the dark headline stays readable on busy photos */
  scrim?: boolean;
  /** this slide's headline and Explore link (over the photo below lg, beside it from lg); the line under the headline shows from lg only */
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

      {/* lg+: each slide's headline, line and Explore in the empty wall on the left, cross-fading
          with the photo. All slides share one grid cell so the block never changes height. */}
      <HeroCopyFade className="absolute inset-y-0 left-[7vw] hidden w-[26vw] min-w-[300px] max-w-[400px] flex-col justify-center pt-[calc(4rem+10vh)] text-[#1d1d1f] lg:flex">
        <div className="grid">
          {slides.map((s, i) =>
            s.title ? (
              <div
                key={s.src}
                aria-hidden={i !== active}
                className={`[grid-area:1/1] transition-[opacity,transform] duration-[1200ms] ease-out ${
                  i === active ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-2"
                }`}
              >
                {i === 0 ? (
                  <h1 className={`${didone.className} text-[clamp(1.6rem,2.6vw,2.75rem)] font-normal leading-[1.2] tracking-[-0.01em]`}><Lines text={s.title} /></h1>
                ) : (
                  <p className={`${didone.className} text-[clamp(1.6rem,2.6vw,2.75rem)] font-normal leading-[1.2] tracking-[-0.01em]`}><Lines text={s.title} /></p>
                )}
                {s.subtitle && (
                  <p className={`${didone.className} mt-3 max-w-[28ch] text-[clamp(16px,1.3vw,19px)] font-normal leading-snug tracking-[-0.01em]`}>{s.subtitle}</p>
                )}
                {s.href && (
                  <div className="mt-7">
                    <Link
                      href={s.href}
                      tabIndex={i === active ? 0 : -1}
                      className={`${didone.className} inline-flex h-10 items-center bg-[#1d1d1f] px-6 text-[14px] font-medium uppercase tracking-[0.2em] text-white transition-colors hover:bg-black`}
                    >
                      Explore
                    </Link>
                  </div>
                )}
              </div>
            ) : null,
          )}
        </div>
      </HeroCopyFade>

      {/* Below lg: each slide's headline and line, cross-fading with the photo */}
      <HeroCopyFade className="absolute inset-x-0 bottom-0 px-6 pb-12 text-white sm:px-10 lg:hidden">
        <div className="grid items-end">
          {slides.map((s, i) =>
            s.title ? (
              <div
                key={s.src}
                aria-hidden={i !== active}
                className={`[grid-area:1/1] transition-[opacity,transform] duration-[1200ms] ease-out ${
                  i === active ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-2"
                }`}
              >
                {i === 0 ? (
                  <h1 className={`${didone.className} max-w-[16ch] text-[2rem] font-normal leading-[1.1] tracking-[-0.01em] sm:text-[2.5rem]`}>
                    <Lines text={s.title} />
                  </h1>
                ) : (
                  <p className={`${didone.className} max-w-[16ch] text-[2rem] font-normal leading-[1.1] tracking-[-0.01em] sm:text-[2.5rem]`}>
                    <Lines text={s.title} />
                  </p>
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

// Headlines break after each sentence or comma ("Choose Your Stone. / Make It Yours.").
function Lines({ text }: { text: string }) {
  return text.split(/(?<=[.,])\s+/).map((line) => (
    <span key={line} className="block">
      {line}
    </span>
  ));
}
