import { type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { colorImage, type ICColor } from "@/data/inColor";
import { catalog, fromPrice, productHref, onBodyImage } from "@/data/catalog";
import ProductFrame from "@/components/shop/ProductFrame";
import AboutLetter from "./AboutLetter";
import EditVideoCard from "@/components/edit/EditVideoCard";
import { editVideosNewestFirst } from "@/data/theEdit";
import { cormorant as serif, productSerif } from "@/lib/fonts";

// Homepage sections after the hero:
// Popular styles → custom idea → The Elanora Edit → About. (Gemstones is kept
// below but not shown on the homepage for now.)
// Copy is deliberately short and literal. Palette: white / warm ivory / charcoal;
// the only color comes from the gemstone photography.

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

/* ---------- 02 — Shop by category ---------- */

// One card per jewelry category, each with a representative piece's photo (on-body photo on
// hover) and a link to the category page. Change `slug` to show a different piece.
const CATEGORY_CARDS = [
  { label: "Necklaces", href: "/necklaces", slug: "pink-round-halo-diamond-necklace" },
  { label: "Rings", href: "/rings", slug: "yellow-pear-halo-diamond-ring" },
  { label: "Earrings", href: "/earrings", slug: "heart-halo-diamond-stud-earrings" },
  { label: "Bracelets", href: "/bracelets", slug: "round-diamond-tennis-bracelet" },
];

export function PopularStyles() {
  const cards = CATEGORY_CARDS.map((c) => ({ ...c, item: catalog.find((p) => p.slug === c.slug) }));

  return (
    <section id="popular-styles" aria-labelledby="popular-styles-heading" className="bg-white px-6 py-10 text-[#1d1d1f] sm:py-12 lg:py-14">
      <div className="mx-auto max-w-[1280px]">
        <div className="text-center">
          <Label as="h2"><span id="popular-styles-heading">Shop by Category</span></Label>
        </div>

        {/* phones and tablets: a 2 × 2 grid; desktop: one row of four */}
        <ul className="mx-auto mt-8 grid max-w-[1200px] grid-cols-2 gap-x-3 gap-y-7 sm:gap-x-6 md:grid-cols-4 md:gap-y-0">
          {cards.map((c) => (
            <li key={c.href}>
              <Link href={c.href} className="group block">
                <ProductFrame
                  src={c.item?.images[0]?.src}
                  alt={c.label}
                  hoverSrc={c.item ? onBodyImage(c.item) : undefined}
                  sizes="(max-width: 767px) 50vw, 25vw"
                />
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className={`${productSerif.className} text-[17px] font-normal leading-snug tracking-[-0.01em] sm:text-[20px]`}>{c.label}</h3>
                  <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.16em] text-[#6e6e73] transition-colors group-hover:text-[#1d1d1f] sm:mt-1.5 sm:text-[12px] sm:tracking-[0.2em]">
                    Shop {c.label} &rarr;
                  </p>
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
            Dream it. We’ll make it.
          </p>
          <p className="mx-auto mt-4 max-w-md text-[16px] leading-[1.75] text-[#1d1d1f]/70 md:mx-0">
            Choose your stone, your metal and your design. We’ll craft a piece made only for you.
          </p>
          <div className="mt-7">
            <Link href="/custom" className="inline-flex min-h-11 items-center bg-[#1d1d1f] px-7 text-[13px] font-medium uppercase tracking-[0.2em] text-white transition-opacity hover:opacity-85">
              Design Your Jewelry
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
  "pink-perfume-bottle-diamond-necklace",
  "emerald-cut-diamond-tennis-bracelet",
  "blue-diamond-angel-wing-drop-earrings",
  "snowflake-cluster-diamond-ring",
];
// Pieces shown here in a metal other than their default: grid photo, hover photo and
// the metal pre-selected on the product page.
// (None right now: the yellow angel wing drops default to yellow gold, so their own photos are used
// and the hover photo follows the product's current on-body image.)
const EDIT_METAL: Record<string, { metal: string; src: string; hoverSrc: string }> = {};

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

/* ---------- 05 — THE EDIT: newest videos ---------- */

// Newest four videos from src/data/theEdit.ts; the section hides itself until there is one.
export function TheEdit() {
  const videos = editVideosNewestFirst().slice(0, 4);
  if (!videos.length) return null;
  return (
    <section aria-labelledby="the-edit-heading" className="bg-white px-6 py-14 text-[#1d1d1f] sm:py-16 md:px-10 lg:py-20">
      <div className="text-center">
        <Label as="h2">
          <span id="the-edit-heading">The Edit</span>
        </Label>
        <Headline>Jewelry, up close.</Headline>
        <div className="mt-6">
          <TextLink href="/the-edit">View All &rarr;</TextLink>
        </div>
      </div>

      <ul className="mx-auto mt-8 grid max-w-[1280px] grid-cols-2 gap-x-4 gap-y-10 sm:mt-10 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8">
        {videos.map((v) => (
          <li key={v.id}>
            <EditVideoCard video={v} />
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ---------- 06 — About ---------- */

export function AboutElanora() {
  // Brand story as a sealed letter that opens on scroll (see AboutLetter).
  return <AboutLetter />;
}
