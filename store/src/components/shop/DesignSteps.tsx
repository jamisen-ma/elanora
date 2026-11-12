import { type ReactNode } from "react";
import Link from "next/link";
import { cormorant } from "@/lib/fonts";

// Engagement & Bridal: the three Design Your Ring steps (setting → diamond → price), shown after
// the page hero and before the filters and grid. It carries the page's only Design Your Ring
// button, so the hero above it has none.

const STEPS: { word: string; icon: ReactNode }[] = [
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

export default function DesignSteps() {
  return (
    <section aria-labelledby="design-steps-heading" className="px-6 pb-10 text-center text-[#1d1d1f] sm:pb-12">
      <h2 id="design-steps-heading" className="text-[13px] font-medium uppercase tracking-[0.32em] text-[#1d1d1f]/70">
        How It Works
      </h2>
      <ol className="mx-auto mt-5 grid max-w-[880px] grid-cols-3 gap-2 sm:mt-6 md:gap-6">
        {STEPS.map((s, i) => (
          <li key={s.word} className="flex flex-col items-center gap-1.5 text-center md:flex-row md:justify-center md:gap-3 md:text-left">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center bg-[#f0efed] text-[16px] font-semibold text-[#1d1d1f]">
              {i + 1}
            </span>
            <span className={`${cormorant.className} flex items-center justify-center gap-1 text-[17px] leading-tight md:justify-start`}>
              {s.icon}
              {s.word}
            </span>
          </li>
        ))}
      </ol>
      <div className="mt-7">
        <Link
          href="/engagement/design"
          className="inline-flex min-h-11 items-center bg-[#1d1d1f] px-8 text-[13px] font-medium uppercase tracking-[0.2em] text-white transition-opacity hover:opacity-85"
        >
          Design Your Ring
        </Link>
      </div>
    </section>
  );
}
