import { Fragment, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Cormorant_Garamond } from "next/font/google";
import { colorImage, type ICColor } from "@/data/inColor";
import { catalog, fromPrice, productHref, onBodyImage } from "@/data/catalog";
import ProductFrame from "@/components/shop/ProductFrame";
import { productSerif } from "@/lib/fonts";

// Homepage sections after the hero:
// Custom Jewelry → Gemstones → The Elanora Edit → Made to Order → About Elanora.
// Copy is deliberately short and literal. Palette: white / warm ivory / charcoal;
// the only color comes from the gemstone photography.

const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["400"], style: ["normal", "italic"] });

/* ---------- shared bits ---------- */

function Label({ children, as: Tag = "p" }: { children: ReactNode; as?: "p" | "h2" }) {
  return (
    <Tag className="text-[11px] font-medium uppercase tracking-[0.32em] text-[#1d1d1f]/70">{children}</Tag>
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
      className="group relative inline-block pb-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-[#1d1d1f]"
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

/** Numbered steps joined by hairlines; horizontal from md, stacked on mobile. */
function Steps({ steps }: { steps: { title: string; text?: string }[] }) {
  return (
    <ol className="flex flex-col items-center md:flex-row md:items-start md:justify-center">
      {steps.map((s, i) => (
        <Fragment key={s.title}>
          {i > 0 && (
            <li
              aria-hidden
              className="my-4 h-7 w-px bg-[#d2d2d7] md:mx-8 md:my-0 md:mt-[7px] md:h-px md:w-16 lg:mx-10 lg:w-24"
            />
          )}
          <li className="text-center md:min-w-[11rem]">
            <span className="block text-[10px] tracking-[0.2em] text-[#86868b]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="mt-2 block whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.26em]">
              {s.title}
            </span>
            {s.text && <span className="mt-2 block text-[13px] text-[#6e6e73]">{s.text}</span>}
          </li>
        </Fragment>
      ))}
    </ol>
  );
}

/* ---------- 02 — Custom jewelry ---------- */

export function CustomJewelry() {
  return (
    <section aria-labelledby="custom-heading" className="bg-[#faf7f3] px-6 pb-20 pt-14 text-center text-[#1d1d1f] sm:pb-24 sm:pt-16 lg:pb-28 lg:pt-20">
      <Label as="h2">
        <span id="custom-heading">Custom Jewelry</span>
      </Label>
      <Headline>
        Start with a design.
        <br />
        Make it yours.
      </Headline>
      <p className="mx-auto mt-5 max-w-md text-[14px] leading-[1.7] text-[#1d1d1f]/70">
        Choose one of our designs or tell us what you want.
      </p>
      <div className="mt-7 sm:mt-8">
        <TextLink href="/custom">Start Customizing &rarr;</TextLink>
      </div>

      {/* The photo's edges fade out so its linen backdrop melts into the section's
          warm off-white with no visible box. */}
      <div className="relative mx-auto mt-10 aspect-[4/3] max-w-[760px] overflow-hidden sm:mt-12 md:aspect-[16/9]">
        <Image
          src="/images/made-yours/products/editorial-your-way.webp"
          alt="Loose lab-grown diamonds in different shapes beside an empty ring setting"
          fill
          unoptimized
          sizes="(max-width: 800px) 100vw, 760px"
          className="object-cover brightness-[1.04] saturate-[0.9] [mask-image:linear-gradient(to_right,transparent,#000_18%,#000_82%,transparent),linear-gradient(to_bottom,transparent,#000_16%,#000_84%,transparent)] [mask-composite:intersect] [-webkit-mask-composite:source-in]"
        />
      </div>
    </section>
  );
}

/* ---------- 03 — Gemstones ---------- */

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
                <span className="mt-2 inline-block border-b border-transparent pb-1 text-[11px] font-medium uppercase tracking-[0.24em] transition-colors group-hover:border-[#1d1d1f]/30">
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

export function ElanoraEdit() {
  const items = catalog.slice(0, 4);
  return (
    <section aria-labelledby="edit-heading" className="bg-white px-6 py-24 text-[#1d1d1f] sm:py-28 md:px-10 lg:py-32">
      <div className="text-center">
        <Label as="h2">
          <span id="edit-heading">The Elanora Edit</span>
        </Label>
        <Headline>Our favorite pieces.</Headline>
      </div>

      <ul className="mx-auto mt-14 grid max-w-[1280px] grid-cols-2 gap-x-4 gap-y-12 sm:mt-16 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8">
        {items.map((p) => (
          <li key={p.slug}>
            <Link href={productHref(p)} className="group block">
              <ProductFrame src={p.images[0]?.src} alt={p.name} hoverSrc={onBodyImage(p)} />
              <div className="mt-5 text-center">
                <h3 className={`${productSerif.className} text-[16px] font-normal leading-snug tracking-[-0.01em] sm:text-[18px]`}>{p.name}</h3>
                <p className="mt-1.5 text-[13px] text-[#6e6e73]">{fromPrice(p)}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-14 text-center">
        <TextLink href="/shop">Shop All &rarr;</TextLink>
      </div>
    </section>
  );
}

/* ---------- 05 — Made to order ---------- */

export function MadeToOrder() {
  return (
    <section aria-labelledby="mto-heading" className="bg-[#faf7f3] px-6 py-24 text-center text-[#1d1d1f] sm:py-28 lg:py-32">
      <Label as="h2">
        <span id="mto-heading">Made to Order</span>
      </Label>
      <Headline>We make your jewelry after you order.</Headline>

      <div className="mt-14 sm:mt-16">
        <Steps
          steps={[
            { title: "You order", text: "Choose your options." },
            { title: "We make it", text: "Your piece is made for you." },
            { title: "We ship it", text: "Delivered to you when it’s ready." },
          ]}
        />
      </div>

      <div className="mt-14">
        <TextLink href="/faq">Learn More &rarr;</TextLink>
      </div>
    </section>
  );
}

/* ---------- 06 — About ---------- */

export function AboutElanora() {
  return (
    <section aria-labelledby="about-heading" className="bg-white px-6 py-24 text-center text-[#1d1d1f] sm:py-28 lg:py-32">
      <Label as="h2">
        <span id="about-heading">About Elanora</span>
      </Label>
      <Headline>Jewelry made to order, just for you.</Headline>
      <div className="mt-10">
        <TextLink href="/about">Our Story &rarr;</TextLink>
      </div>
    </section>
  );
}
