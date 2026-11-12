import Link from "next/link";
import { HeroCopyFade } from "@/components/ScrollEffects";
import { didone } from "@/lib/fonts";
import HeroSlides from "@/components/home/HeroSlides";
import SeriesEntry from "@/components/home/SeriesEntry";
import {
  AboutElanora,
  CustomIdea,
  PopularStyles,
  TheEdit,
} from "@/components/home/HomeSections";

export default function HomePage() {
  return (
    <>
      {/* ============================================ */}
      {/* HERO — Campaign image                        */}
      {/* ============================================ */}
      {/* Full-bleed first screen: the image fills everything below the announcement
          bar (phones: 100lvh − --promo-h, so it also fills the space under the browser's floating
          toolbar; desktop: 100svh − --promo-h) and the transparent header floats over it.
          Desktop (lg+): copy sits in the empty wall on the left, just below the visual centre
          and clear of the header. Mobile/tablet: each slide's headline sits over the photo
          at the bottom left, with a progress line (HeroSlides). */}
      <section className="relative bg-white">
        <div data-hero-frame className="relative h-[calc(100lvh-var(--promo-h))] overflow-hidden bg-[#8b7460] lg:h-[calc(100svh-var(--promo-h))]">
          {/* Campaign images, cross-fading in a loop (parallax on scroll). Below lg each slide
              carries its own headline over the photo, Graff-style. */}
          <HeroSlides
            slides={[
              {
                src: "/images/hero/hero-blue-wing-lariat.webp",
                alt: "A woman in profile wearing the ELANORA blue diamond angel wing drop earrings and a diamond knot lariat necklace",
                mobilePosition: "69% 50%",
                desktopPosition: "72% 50%",
                title: "Wings of Light",
                href: "/earrings",
              },
              {
                src: "/images/hero/hero-pink-heart-satin.webp",
                alt: "A woman in profile in an ivory satin halter wearing the ELANORA pink heart halo diamond stud, a diamond ear cuff and the snowflake cluster diamond ring",
                mobilePosition: "83% 50%",
                desktopPosition: "90% 50%",
                scrim: true,
                title: "Love, Illuminated",
                href: "/earrings",
              },
              {
                src: "/images/hero/hero-hand-v5.webp",
                alt: "Hand wearing lab-grown diamond rings and tennis bracelets",
                title: "Made to Shine",
                href: "/rings",
              },
            ]}
          />

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

      </section>

      {/* ============================================ */}
      {/* 02 — SHOP BY CATEGORY, right after the hero  */}
      {/* ============================================ */}
      <PopularStyles />

      {/* ============================================ */}
      {/* 03 — WINGS OF LIGHT — Angel Wing theme window */}
      {/* ============================================ */}
      <SeriesEntry />

      {/* ============================================ */}
      {/* 04 — CUSTOM DESIGN ("Design your jewelry")   */}
      {/* ============================================ */}
      <CustomIdea />

      {/* "Our favorite pieces" (ElanoraEdit) removed from the homepage on 2026-11-12; the
          component is kept in HomeSections in case it comes back. */}

      {/* ============================================ */}
      {/* 05 — GEMSTONES                               */}
      {/* ============================================ */}
      {/* Gemstones (coloured stones) section hidden for now — <Gemstones /> from HomeSections, add back when needed */}

      {/* ============================================ */}
      {/* 06 — MADE TO ORDER                           */}
      {/* ============================================ */}

      {/* ============================================ */}
      {/* THE EDIT — newest videos (src/data/theEdit.ts) */}
      {/* ============================================ */}
      <TheEdit />

      {/* ============================================ */}
      {/* 07 — ABOUT ELANORA                           */}
      {/* ============================================ */}
      <AboutElanora />
    </>
  );
}
