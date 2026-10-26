import { Cormorant_Garamond } from "next/font/google";

// Brand manifesto page — a quiet, editorial statement. Type only: no imagery,
// cards, icons, borders or CTA. The whitespace does the work.

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

export default function OurStory() {
  return (
    <section aria-labelledby="our-story-heading" className="bg-[#faf7f3] text-[#1d1d1f]">
      <div className="mx-auto flex min-h-[78svh] max-w-[1200px] flex-col justify-center px-8 py-32 sm:px-12 sm:py-40 lg:min-h-[88vh] lg:px-16 lg:py-48">
        <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-[#1d1d1f]/70">
          Our Story
        </p>
        <h2
          id="our-story-heading"
          className={`${serif.className} mt-8 max-w-[14ch] text-balance text-[2.75rem] font-normal leading-[1.04] tracking-[-0.015em] sm:text-[4rem] lg:mt-10 lg:text-[clamp(4.25rem,6vw,6.5rem)]`}
        >
          Jewelry for a life <em className="italic">well lived.</em>
        </h2>
        <p className="mt-10 max-w-[26rem] text-[14px] leading-[1.75] tracking-[0.005em] text-[#6e6e73] sm:text-[15px] lg:mt-14 lg:ml-[calc(50%-4rem)]">
          From custom diamonds to colorful gemstones and everyday pieces, ELANORA creates
          jewelry to be worn, loved, and lived in.
        </p>
      </div>
    </section>
  );
}
