import Image from "next/image";
import Link from "next/link";
import { cormorant as serif } from "@/lib/fonts";
import { SERIES } from "@/data/series";

// The Collections overview: every themed collection as a large image tile with its title and
// Discover, Graff-style. One full-width tile per row on phones, two per row from md up.

export const metadata = {
  title: "The Collections",
  description: "ELANORA themed collections: Wings of Light, Le Parfum, Cocktail Hour and Snowfall.",
};

export default function SeriesPage() {
  return (
    <main className="bg-white text-[#1d1d1f]">
      <header className="px-6 pb-8 pt-12 text-center md:pb-12 md:pt-16">
        <h1 className={`${serif.className} text-[2.25rem] uppercase leading-[1.08] tracking-[0.06em] md:text-[3rem]`}>
          The Collections
        </h1>
        <p className={`${serif.className} mt-3 text-[1.25rem] italic text-[#1d1d1f]/75 md:text-[1.4rem]`}>
          Stories told in diamonds.
        </p>
      </header>

      <ul className="grid gap-1 md:grid-cols-2 md:gap-2 md:px-2 md:pb-2">
        {SERIES.map((s, i) => (
          <li key={s.slug}>
            <Link href={s.href} className="group relative block aspect-[4/5] overflow-hidden bg-[#f4f3f1]">
              <Image
                src={s.cover}
                alt={s.coverAlt}
                fill
                unoptimized
                loading={i < 2 ? "eager" : "lazy"}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
              />
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-[35%] bg-[linear-gradient(0deg,rgba(0,0,0,0.38)_0%,rgba(0,0,0,0)_100%)]"
              />
              <div className="absolute inset-x-0 bottom-0 px-6 pb-7 text-white md:px-8 md:pb-9">
                <h2 className={`${serif.className} text-[2rem] leading-[1.1] md:text-[2.4rem]`}>{s.title}</h2>
                <span className="mt-2 inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.22em]">
                  Discover
                  <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
