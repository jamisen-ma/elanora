import { type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Cormorant_Garamond } from "next/font/google";
import { colorImage, type ICColor } from "@/data/inColor";
import { catalog, fromPrice, productHref, onBodyImage } from "@/data/catalog";
import ProductFrame from "@/components/shop/ProductFrame";
import AboutLetter from "./AboutLetter";
import { productSerif } from "@/lib/fonts";

// Homepage sections after the hero:
// Popular styles → custom idea → The Elanora Edit → About. (Gemstones is kept
// below but not shown on the homepage for now.)
// Copy is deliberately short and literal. Palette: white / warm ivory / charcoal;
// the only color comes from the gemstone photography.

const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["400"], style: ["normal", "italic"] });

/* ---------- shared bits ---------- */

function Label({ children, as: Tag = "p" }: { children: ReactNode; as?: "p" | "h2" }) {
  return (
    <Tag className="text-[13px] font-medium uppercase tracking-[0.32em] text-[#1d1d1f]/70">{children}</Tag>
  );
}

function Headline({ children }: { children: ReactNode }) {
  return (
    <p
      className={`${serif.className} mt-5 text-balance text-[2rem] leading-[1.12] tracking-[-0.01em] sm:text-[2.5rem] lg:text-[2.75rem]`}
    >
      {children}
    </p>
  );
}

function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="group relative inline-block pb-1.5 text-[13px] font-medium uppercase tracking-[0.22em] text-[#1d1d1f]"
    >
      {children}
      <span aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-[#1d1d1f]/25" />
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-[#1d1d1f] transition-transform duration-500 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
      />
    </Link>
  );
}

/* ---------- How it works: setting → diamond → quote (same steps as Design Your Ring) ---------- */

const HOW_IT_WORKS: { word: string; icon: ReactNode }[] = [
  {
    word: "Choose a Setting",
    icon: (
      // ring with a stone
      <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden>
        <path d="M8 2.5h4l1.5 2L10 7.5 6.5 4.5z" strokeLinejoin="round" />
        <ellipse cx="10" cy="12.5" rx="6.5" ry="5" />
      </svg>
    ),
  },
  {
    word: "Choose a Diamond",
    icon: (
      // faceted diamond
      <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden>
        <path d="M5 3.5h10l3 4-8 9-8-9z M2 7.5h16 M7.5 3.5 6 7.5l4 9 4-9-1.5-4" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    word: "Get Your Price",
    icon: (
      // envelope
      <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden>
        <rect x="2.5" y="4.5" width="15" height="11" rx="0.5" />
        <path d="M2.5 5l7.5 6 7.5-6" strokeLinejoin="round" />
      </svg>
    ),
  },
];

function HowItWorks() {
  return (
    <ol aria-label="How it works" className="mx-auto mt-5 grid max-w-[880px] grid-cols-3 gap-2 sm:mt-6 md:gap-6">
      {HOW_IT_WORKS.map((s, i) => (
        <li key={s.word} className="flex flex-col items-center gap-1.5 text-center md:flex-row md:justify-center md:gap-3 md:text-left">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center bg-[#f0efed] text-[16px] font-semibold text-[#1d1d1f]">
            {i + 1}
          </span>
          <span className="min-w-0">
            <span className={`${serif.className} flex items-center justify-center gap-1 text-[17px] leading-tight text-[#1d1d1f] md:justify-start`}>
              {s.icon}
              {s.word}
            </span>
          </span>
        </li>
      ))}
    </ol>
  );
}

/* ---------- 02 — Popular styles to customize ---------- */

// The four starting points shown on the homepage, in this order. Each opens its own
// product page, where the stone size, metal and size can be chosen.
const POPULAR_SLUGS = [
  "round-solitaire-diamond-ring",
  "yellow-pear-halo-diamond-ring",
  "heart-halo-diamond-necklace",
  "round-diamond-tennis-bracelet",
];
// Homepage-only lifestyle shots shown on hover (the product pages keep their own on-body images).
const POPULAR_HOVER: Record<string, string> = {
  "yellow-pear-halo-diamond-ring": "/images/home/popular/yellow-pear-halo-diamond-ring.webp",
  "heart-halo-diamond-necklace": "/images/home/popular/heart-halo-diamond-necklace.webp",
  "round-diamond-tennis-bracelet": "/images/home/popular/round-diamond-tennis-bracelet.webp",
};

export function PopularStyles() {
  const items = POPULAR_SLUGS.map((slug) => catalog.find((p) => p.slug === slug)).filter((p) => p !== undefined);

  return (
    <section id="popular-styles" aria-labelledby="popular-styles-heading" className="bg-white px-6 py-10 text-[#1d1d1f] sm:py-12 lg:py-14">
      <div className="mx-auto max-w-[1280px]">
        <div className="text-center">
          <Label as="h2"><span id="popular-styles-heading">The Classics</span></Label>
          <Headline>Start with a favorite.</Headline>
        </div>

        <HowItWorks />

        <div className="mt-6 text-center sm:mt-7">
          <Link
            href="/shop"
            className="inline-flex min-h-11 items-center bg-[#1d1d1f] px-8 text-[13px] font-medium uppercase tracking-[0.2em] text-white transition-opacity hover:opacity-85"
          >
            Shop All &rarr;
          </Link>
        </div>

        <ul className="mx-auto mt-6 flex max-w-[1200px] snap-x snap-mandatory gap-4 overflow-x-auto pb-3 [scrollbar-width:none] sm:mt-8 sm:gap-6 md:grid md:grid-cols-4 md:overflow-visible md:pb-0 [&::-webkit-scrollbar]:hidden">
          {items.map((p) => (
            <li key={p.slug} className="w-[76%] shrink-0 snap-start sm:w-[45%] md:w-auto">
              <Link href={productHref(p)} className="group block">
                <ProductFrame src={p.images[0]?.src} alt={p.name} hoverSrc={POPULAR_HOVER[p.slug] ?? onBodyImage(p)} sizes="(max-width: 767px) 76vw, 25vw" />
                <div className="mt-5 text-center">
                  <h3 className={`${productSerif.className} text-[16px] font-normal leading-snug tracking-[-0.01em] sm:text-[18px]`}>{p.name}</h3>
                  <p className="mt-1.5 text-[15px] text-[#6e6e73]">{fromPrice(p)}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>

      </div>
    </section>
  );
}

/* ---------- 03 — Start with your own idea ---------- */

export function CustomIdea() {
  return (
    <section aria-labelledby="custom-idea-heading" className="bg-[#faf7f3] px-6 py-16 text-[#1d1d1f] sm:py-20 lg:py-24">
      <div className="mx-auto grid max-w-[1120px] items-center gap-8 md:grid-cols-[1fr_1fr] md:gap-14 lg:gap-20">
        <div className="relative mx-auto aspect-[4/3] w-full max-w-[560px] overflow-hidden md:order-2 md:aspect-[5/4]">
          <Image
            src="/images/made-yours/products/editorial-your-way.webp"
            alt="Loose diamonds and a ring setting ready to inspire a custom design"
            fill
            unoptimized
            sizes="(max-width: 767px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div className="text-center md:order-1 md:text-left">
          <Label as="h2"><span id="custom-idea-heading">Custom design</span></Label>
          <p className={`${serif.className} mt-5 text-balance text-[2rem] leading-[1.12] tracking-[-0.01em] sm:text-[2.5rem] lg:text-[2.75rem]`}>
            Have your own idea?
          </p>
          <p className="mx-auto mt-4 max-w-md text-[16px] leading-[1.75] text-[#1d1d1f]/70 md:mx-0">
            Any stone, any metal, any idea — let’s make it real together.
          </p>
          <div className="mt-7">
            <Link href="/custom" className="inline-flex min-h-11 items-center bg-[#1d1d1f] px-7 text-[13px] font-medium uppercase tracking-[0.2em] text-white transition-opacity hover:opacity-85">
              Share your idea
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 04 — Gemstones ---------- */

const GEM_COLORS: ICColor[] = ["Pink", "Blue", "Green", "Yellow"];

export function Gemstones() {
  return (
    <section aria-labelledby="gemstones-heading" className="bg-[#faf7f3] pb-24 text-center text-[#1d1d1f] sm:pb-28 lg:pb-32">
      {/* Existing IN COLOR photography; its warm white matches the section. */}
      <div className="relative mx-auto max-w-[1120px]">
        <Image
          src="/images/in-color/in-color-mobile.webp"
          alt="A blue pear-cut gemstone necklace above a yellow oval gemstone ring and a pink pear-cut gemstone ring"
          width={1000}
          height={1040}
          unoptimized
          sizes="100vw"
          className="block h-auto w-full lg:hidden"
        />
        <Image
          src="/images/in-color/in-color-desktop.webp"
          alt="A blue pear-cut gemstone necklace between a yellow oval gemstone ring and a pink pear-cut gemstone ring"
          width={1677}
          height={725}
          unoptimized
          sizes="100vw"
          className="hidden h-auto w-full lg:block [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent),linear-gradient(to_bottom,transparent,#000_10%,#000_84%,transparent)] [mask-composite:intersect] [-webkit-mask-composite:source-in]"
        />
      </div>

      <div className="px-6 pt-6 lg:pt-2">
        <Label as="h2">
          <span id="gemstones-heading">Gemstones</span>
        </Label>
        <Headline>Choose your favorite color.</Headline>

        <ul className="mx-auto mt-12 grid max-w-[560px] grid-cols-4 gap-2 sm:mt-14 sm:gap-6">
          {GEM_COLORS.map((c) => (
            <li key={c}>
              <Link href={`/in-color?color=${c.toLowerCase()}`} className="group block">
                <div className="relative mx-auto aspect-square w-full max-w-[110px]">
                  {/* Stone shot is on pure white; multiply melts it into the ivory. */}
                  <Image
                    src={colorImage(c)}
                    alt=""
                    fill
                    unoptimized
                    sizes="110px"
                    className="object-contain mix-blend-multiply transition-transform duration-500 ease-out group-hover:scale-[1.06]"
                  />
                </div>
                <span className="mt-2 inline-block border-b border-transparent pb-1 text-[13px] font-medium uppercase tracking-[0.24em] transition-colors group-hover:border-[#1d1d1f]/30">
                  {c}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-12">
          <TextLink href="/in-color">Shop Gemstones &rarr;</TextLink>
        </div>
      </div>
    </section>
  );
}

/* ---------- 04 — The Elanora Edit ---------- */

// Hand-picked, in this order.
const EDIT_SLUGS = [
  "pink-diamond-angel-wing-necklace",
  "pink-heart-diamond-bracelet",
  "yellow-diamond-angel-wing-drop-earrings",
  "oval-three-stone-diamond-ring",
];
// Pieces shown here in a metal other than their default: grid photo, hover photo and
// the metal pre-selected on the product page.
const EDIT_METAL: Record<string, { metal: string; src: string; hoverSrc: string }> = {
  "yellow-diamond-angel-wing-drop-earrings": {
    metal: "14k Yellow Gold",
    src: "/images/catalog/yellow-diamond-angel-wing-drop-earrings/01-main-yellow-gold.webp",
    hoverSrc: "/images/catalog/yellow-diamond-angel-wing-drop-earrings/05-on-ear-yellow-gold.webp",
  },
};

export function ElanoraEdit() {
  const items = EDIT_SLUGS.map((slug) => catalog.find((p) => p.slug === slug)).filter((p) => p !== undefined);
  return (
    <section aria-labelledby="edit-heading" className="bg-white px-6 py-14 text-[#1d1d1f] sm:py-16 md:px-10 lg:py-20">
      <div className="text-center">
        <Label as="h2">
          <span id="edit-heading">The Elanora Edit</span>
        </Label>
        <Headline>Our favorite pieces.</Headline>
      </div>

      <ul className="mx-auto mt-8 grid max-w-[1280px] grid-cols-2 gap-x-4 gap-y-12 sm:mt-10 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8">
        {items.map((p) => (
          <li key={p.slug}>
            <Link
              href={EDIT_METAL[p.slug] ? `${productHref(p)}?metal=${encodeURIComponent(EDIT_METAL[p.slug].metal)}` : productHref(p)}
              className="group block"
            >
              <ProductFrame
                src={EDIT_METAL[p.slug]?.src ?? p.images[0]?.src}
                alt={p.name}
                hoverSrc={EDIT_METAL[p.slug]?.hoverSrc ?? onBodyImage(p)}
              />
              <div className="mt-5 text-center">
                <h3 className={`${productSerif.className} text-[16px] font-normal leading-snug tracking-[-0.01em] sm:text-[18px]`}>{p.name}</h3>
                <p className="mt-1.5 text-[15px] text-[#6e6e73]">{fromPrice(p)}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-10 text-center">
        <TextLink href="/shop">Shop All &rarr;</TextLink>
      </div>
    </section>
  );
}

/* ---------- 06 — About ---------- */

export function AboutElanora() {
  // Brand story as a sealed letter that opens on scroll (see AboutLetter).
  return <AboutLetter />;
}
