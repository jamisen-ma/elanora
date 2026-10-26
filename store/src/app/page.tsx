import Image from "next/image";
import Link from "next/link";
import { HeroCopyFade, HeroParallax } from "@/components/ScrollEffects";
import { didone } from "@/lib/fonts";
import {
  AboutElanora,
  CustomJewelry,
  ElanoraEdit,
  Gemstones,
  MadeToOrder,
} from "@/components/home/HomeSections";

export default function HomePage() {
  return (
    <>
      {/* ============================================ */}
      {/* HERO — Campaign image                        */}
      {/* ============================================ */}
      {/* Full-bleed first screen: the image fills everything below the announcement
          bar (100svh − --promo-h, measured by PromoBanner) and the transparent header
          floats over it. Desktop (lg+): copy sits in the empty wall on the left, just
          below the visual centre and clear of the header. Mobile/tablet: copy follows
          below the image. */}
      <section className="relative bg-white">
        <div data-hero-frame className="relative h-[calc(100svh-var(--promo-h))] overflow-hidden bg-[#8b7460]">
          {/* Scroll: photo drifts and zooms slightly as the next screen arrives */}
          <HeroParallax>
            <Image
              src="/images/hero/hero-hand-v4.webp"
              alt="Hand wearing lab-grown diamond rings and tennis bracelets"
              fill
              unoptimized
              loading="eager"
              fetchPriority="high"
              sizes="100vw"
              className="object-cover object-center"
            />
          </HeroParallax>

          <HeroCopyFade className="hidden lg:flex absolute inset-y-0 left-[7vw] w-[26vw] max-w-[400px] flex-col justify-center pt-[calc(4rem+10vh)] text-[#1d1d1f]">
            <h1 className={`${didone.className} text-[clamp(2rem,2.6vw,2.75rem)] font-normal leading-[1.08] tracking-[-0.01em]`}>
              Jewelry,
              <br />
              made for you.
            </h1>
            <p className={`${didone.className} mt-3 whitespace-nowrap text-[clamp(16px,1.3vw,19px)] font-normal leading-snug tracking-[-0.01em]`}>
              Custom and made-to-order jewelry.
            </p>
            <div className="mt-7">
              <Link
                href="/shop"
                className={`${didone.className} inline-flex h-10 items-center bg-[#1d1d1f] px-6 text-[12px] font-medium uppercase tracking-[0.2em] text-white transition-colors hover:bg-black`}
              >
                Shop Jewelry
              </Link>
            </div>
          </HeroCopyFade>
        </div>

        <div className="lg:hidden px-6 pt-8 pb-10 sm:px-10 sm:pt-10 sm:pb-12 text-[#1d1d1f]">
          <h1 className={`${didone.className} text-[1.875rem] sm:text-[2.25rem] font-normal leading-[1.08] tracking-[-0.01em]`}>
            Jewelry, made for you.
          </h1>
          <p className={`${didone.className} mt-2 text-[16px] sm:text-[18px] font-normal leading-snug tracking-[-0.01em] text-[#1d1d1f]/75`}>
            Custom and made-to-order jewelry.
          </p>
          <div className="mt-6">
            <Link
              href="/shop"
              className={`${didone.className} inline-flex h-10 items-center bg-[#1d1d1f] px-6 text-[12px] font-medium uppercase tracking-[0.2em] text-white transition-colors hover:bg-black`}
            >
              Shop Jewelry
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 02 — CUSTOM JEWELRY                          */}
      {/* ============================================ */}
      <CustomJewelry />

      {/* ============================================ */}
      {/* 03 — GEMSTONES                               */}
      {/* ============================================ */}
      <Gemstones />

      {/* ============================================ */}
      {/* 04 — THE ELANORA EDIT                        */}
      {/* ============================================ */}
      <ElanoraEdit />

      {/* ============================================ */}
      {/* 05 — MADE TO ORDER                           */}
      {/* ============================================ */}
      <MadeToOrder />

      {/* ============================================ */}
      {/* 06 — ABOUT ELANORA                           */}
      {/* ============================================ */}
      <AboutElanora />
    </>
  );
}
