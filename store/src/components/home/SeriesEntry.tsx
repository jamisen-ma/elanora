import Image from "next/image";
import Link from "next/link";
import { cormorant as serif } from "@/lib/fonts";
import { SERIES_COVER, SERIES_HREF } from "@/data/series";

// Homepage entry to the themed collections (Graff "Diamond Collections" style): one large
// photo, then the title and Discover under it; the overview page lists each theme.

export default function SeriesEntry() {
  return (
    <section aria-labelledby="series-heading" className="bg-white text-[#1d1d1f]">
      <Link href={SERIES_HREF} className="group block">
        <div className="relative mx-auto aspect-[3/2] w-full overflow-hidden bg-white lg:aspect-[16/9] lg:max-w-[1200px]">
          <Image
            src={SERIES_COVER}
            alt="ELANORA blue angel wing necklace between pink heart halo stud earrings and a pink perfume bottle necklace laid on white"
            fill
            unoptimized
            sizes="(min-width: 1024px) 1200px, 100vw"
            className="object-cover [object-position:50%_50%] transition-transform duration-[1400ms] ease-out group-hover:scale-[1.02]"
          />
        </div>
        <div className="px-6 pb-14 pt-8 text-center sm:pb-16 sm:pt-10 lg:pb-20">
          <h2
            id="series-heading"
            className={`${serif.className} text-[2.1rem] uppercase leading-[1.05] tracking-[0.06em] sm:text-[2.6rem] lg:text-[3rem]`}
          >
            The Collections
          </h2>
          <span className="mt-5 inline-flex h-11 items-center justify-center gap-2 bg-[#1d1d1f] px-8 text-[13px] font-medium uppercase tracking-[0.2em] text-white transition-colors group-hover:bg-black">
            Discover
          </span>
        </div>
      </Link>
    </section>
  );
}
