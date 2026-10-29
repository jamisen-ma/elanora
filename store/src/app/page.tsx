import Link from "next/link";
import { HeroCopyFade, HeroParallax } from "@/components/ScrollEffects";
import { didone } from "@/lib/fonts";
import HeroSlides from "@/components/home/HeroSlides";
import {
  AboutElanora,
  CustomIdea,
  ElanoraEdit,
  PopularStyles,
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
            {/* Campaign images, cross-fading in a loop */}
            <HeroSlides
              slides={[
                { src: "/images/hero/hero-hand-v5.webp", alt: "Hand wearing lab-grown diamond rings and tennis bracelets" },
                {
                  src: "/images/hero/hero-angel-wing-v2.webp",
                  alt: "A woman with blonde curls wearing the ELANORA pink diamond angel wing necklace and earrings, a round diamond tennis bracelet and a pavé diamond ring",
                  mobilePosition: "77% 30%",
                },
              ]}
            />
          </HeroParallax>

          <HeroCopyFade className="hidden lg:flex absolute inset-y-0 left-[7vw] w-[26vw] min-w-[300px] max-w-[400px] flex-col justify-center pt-[calc(4rem+10vh)] text-[#1d1d1f]">
            <h1 className={`${didone.className} text-[clamp(2rem,2.6vw,2.75rem)] font-normal leading-[1.2] tracking-[-0.01em]`}>
              Dream it with us.
              <br />
              Let’s make it shine.
            </h1>
            <p className={`${didone.className} mt-3 text-[clamp(16px,1.3vw,19px)] font-normal leading-snug tracking-[-0.01em]`}>
              Choose the stone you’ve imagined, and we’ll set it into a piece made only for you.
            </p>
            <div className="mt-7">
              <Link
                href="#popular-styles"
                className={`${didone.className} inline-flex h-10 items-center bg-[#1d1d1f] px-6 text-[14px] font-medium uppercase tracking-[0.2em] text-white transition-colors hover:bg-black`}
              >
                Explore
              </Link>
            </div>
          </HeroCopyFade>
        </div>

        <div className="lg:hidden px-6 pt-8 pb-10 sm:px-10 sm:pt-10 sm:pb-12 text-[#1d1d1f]">
          <h1 className={`${didone.className} text-[1.875rem] sm:text-[2.25rem] font-normal leading-[1.2] tracking-[-0.01em]`}>
            Dream it with us. Let’s make it shine.
          </h1>
          <p className={`${didone.className} mt-2 text-[16px] sm:text-[18px] font-normal leading-snug tracking-[-0.01em] text-[#1d1d1f]/75`}>
            Choose the stone you’ve imagined, and we’ll set it into a piece made only for you.
          </p>
          <div className="mt-6">
            <Link
              href="#popular-styles"
              className={`${didone.className} inline-flex h-10 items-center bg-[#1d1d1f] px-6 text-[14px] font-medium uppercase tracking-[0.2em] text-white transition-colors hover:bg-black`}
            >
              Explore
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 02 — POPULAR CUSTOMIZABLE STYLES             */}
      {/* ============================================ */}
      <PopularStyles />

      {/* ============================================ */}
      {/* 03 — CUSTOM IDEA                             */}
      {/* ============================================ */}
      <CustomIdea />

      {/* ============================================ */}
      {/* 04 — FEATURED PRODUCTS                       */}
      {/* ============================================ */}
      <ElanoraEdit />

      {/* ============================================ */}
      {/* 05 — GEMSTONES                               */}
      {/* ============================================ */}
      {/* Gemstones (coloured stones) section hidden for now — <Gemstones /> from HomeSections, add back when needed */}

      {/* ============================================ */}
      {/* 06 — MADE TO ORDER                           */}
      {/* ============================================ */}

      {/* ============================================ */}
      {/* 07 — ABOUT ELANORA                           */}
      {/* ============================================ */}
      <AboutElanora />
    </>
  );
}
