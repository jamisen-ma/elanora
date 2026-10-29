"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Cormorant_Garamond } from "next/font/google";
import { easeOut, enterProgress, useScrollFrame } from "./ScrollEffects";

// Overview of the three product lines, on pure white with generous space.
//
// Photos: the three thirds of product-lines-4k.webp (2000×1600 each), cropped above
// the captions that were baked into that image, with only near-white pixels (≥240)
// lifted to pure #FFF so the background and tile seams disappear into the page.
// The stray piece of necklace chain in the Everyday third was whitened out, and the
// chain leaving the In Color third fades into white. Products and their soft shadows
// are otherwise untouched.
//
// Scroll motion (from the hero): each column rises into place and its photo settles
// from a slight zoom, staggered left → right; tied to scroll position, so it reverses
// when scrolling back up. Disabled for prefers-reduced-motion.

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
});

const lines = [
  {
    index: "01",
    name: "Made Yours",
    description: ["Custom diamonds,", "made your way."],
    cta: "Discover Made Yours",
    href: "/made-yours",
    image: "/images/product-lines/pl-made-yours-v2.webp",
    alt: "Oval lab-grown diamond ring with a pavé band",
  },
  {
    index: "02",
    name: "In Color",
    description: ["Gemstones in", "colors you love."],
    cta: "Explore Color",
    href: "/in-color",
    image: "/images/product-lines/pl-in-color-v2.webp",
    alt: "Blue heart gemstone pendant with a diamond halo on a tennis chain",
  },
  {
    index: "03",
    name: "Everyday",
    description: ["Fine jewelry,", "made easier to own."],
    cta: "Shop Everyday",
    href: "/shop",
    image: "/images/product-lines/pl-everyday-v2.webp",
    alt: "Diamond tennis bracelet",
  },
];

export default function ProductLines() {
  const cols = useRef<(HTMLLIElement | null)[]>([]);

  useScrollFrame(() => {
    const row = window.matchMedia("(min-width: 48rem)").matches;
    cols.current.forEach((col, i) => {
      if (!col) return;
      const photo = col.querySelector<HTMLElement>("[data-photo]");
      // In the row the columns enter together, so stagger them; stacked, each has its own timing.
      const e = easeOut(enterProgress(col, row ? 0.75 : 0.6, row ? i * 70 : 0));
      col.style.transform = `translate3d(0, ${((1 - e) * 110).toFixed(1)}px, 0)`;
      col.style.opacity = (0.15 + 0.85 * e).toFixed(3);
      if (photo) photo.style.transform = `scale(${(1.16 - 0.16 * e).toFixed(4)})`;
    });
  });

  return (
    <section
      aria-labelledby="product-lines-heading"
      className="relative z-10 bg-white text-[#1d1d1f]"
    >
      <div className="mx-auto flex max-w-[1440px] flex-col justify-center px-6 py-28 sm:px-10 sm:py-32 md:min-h-[85vh] lg:min-h-[92vh] lg:px-16 lg:py-24">
        {/* Intro */}
        <header className="text-center">
          <h2
            id="product-lines-heading"
            className="text-[13px] font-medium uppercase tracking-[0.32em] text-[#1d1d1f]/70"
          >
            Three ways to make it yours
          </h2>
          <p
            className={`${serif.className} mt-7 text-[1.75rem] leading-[1.25] tracking-[-0.005em] sm:text-[2rem] lg:mt-8 lg:text-[clamp(1.875rem,2.3vw,2.375rem)]`}
          >
            <span className="block md:inline">Made your way.</span>
            <span className="block md:ml-[0.9em] md:inline">Chosen in color.</span>
            <span className="block md:ml-[0.9em] md:inline">Made for every day.</span>
          </p>
        </header>

        {/* Product lines */}
        <ul className="mt-20 grid grid-cols-1 gap-y-24 sm:mt-24 md:grid-cols-3 md:gap-x-10 lg:mt-20 lg:gap-x-16">
          {lines.map((l, i) => (
            <li
              key={l.name}
              ref={(el) => {
                cols.current[i] = el;
              }}
              className="will-change-transform"
            >
              <Link href={l.href} className="group block text-center">
                <div className="relative aspect-[5/4] overflow-hidden">
                  <div data-photo className="absolute inset-0 will-change-transform">
                    <Image
                      src={l.image}
                      alt={l.alt}
                      fill
                      unoptimized
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                </div>

                <p className="mt-8 text-[12px] tracking-[0.25em] text-[#1d1d1f]/45 sm:mt-10">
                  {l.index}
                </p>
                <h3 className="mt-2 text-[14px] font-medium uppercase tracking-[0.28em]">
                  {l.name}
                </h3>
                <p className="mt-4 text-[16px] leading-[1.6] text-[#6e6e73]">
                  {l.description[0]}
                  <br />
                  {l.description[1]}
                </p>
                <span className="relative mt-7 inline-block pb-1.5 text-[13px] font-medium uppercase tracking-[0.2em]">
                  {l.cta} &rarr;
                  <span aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-[#1d1d1f]/20" />
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-[#1d1d1f] transition-transform duration-500 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
