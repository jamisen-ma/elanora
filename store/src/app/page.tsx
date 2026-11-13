import HeroSlides from "@/components/home/HeroSlides";
import SeriesEntry from "@/components/home/SeriesEntry";
import LaunchCodeBox from "@/components/home/LaunchCodeBox";
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
          at the bottom left, with a progress line. Each slide has its own headline and line,
          cross-fading with its photo, and Explore leads to the launch-code box first, so visitors
          can enter the code before browsing (once it's entered, straight to Shop by Category). */}
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
                title: "Modern Jewelry, Made for You",
                subtitle: "Made-to-order jewelry with lab-grown diamonds in every shade.",
                href: "#launch-code",
              },
              {
                src: "/images/hero/hero-pink-heart-satin.webp",
                alt: "A woman in profile in an ivory satin halter wearing the ELANORA pink heart halo diamond stud, a diamond ear cuff and the snowflake cluster diamond ring",
                mobilePosition: "83% 50%",
                desktopPosition: "90% 50%",
                title: "Choose Your Stone. Make It Yours.",
                subtitle: "Select a lab-grown diamond and setting. We’ll craft your piece to order.",
                href: "#launch-code",
              },
              {
                src: "/images/hero/hero-hand-v5.webp",
                alt: "Hand wearing lab-grown diamond rings and tennis bracelets",
                title: "A Little Vintage. A Lot You.",
                subtitle: "Discover distinctive designs made for everyday wear and special moments.",
                href: "#launch-code",
              },
            ]}
          />

        </div>

      </section>

      {/* ============================================ */}
      {/* LAUNCH OFFER — code box (sale prices show    */}
      {/* only after the launch code is entered)        */}
      {/* ============================================ */}
      <LaunchCodeBox />

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
