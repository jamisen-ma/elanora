import Image from "next/image";
import Link from "next/link";
import { cormorant as serif } from "@/lib/fonts";

// Homepage theme window for the Angel Wing series ("Wings of Light"), right after Shop by Category:
// key visual (sets the mood) with its Explore the Collection button. (The three-piece row and Shop the
// Collection button below it were removed on 2026-11-12.)
// lg+: wide banner with the copy on the photo's empty white left side.
// Below lg: the photo is cropped tall toward the model (wings and stones stay whole) and the
// copy and button sit underneath it, so nothing covers the jewelry.

export const WINGS_HREF = "/wings-of-light";

const KEY_VISUAL = "/images/home/wings/wings-of-light-key-visual-v2.webp";

function Copy({ headingId }: { headingId?: string }) {
  return (
    <>
      <h2
        id={headingId}
        className={`${serif.className} whitespace-nowrap text-[1.9rem] uppercase leading-[1.05] tracking-[0.06em] text-[#1d1d1f] sm:text-[2.4rem] md:text-[2.75rem] lg:text-[3.25rem]`}
      >
        Wings of Light
      </h2>
      <p className={`${serif.className} mt-3 text-[1.35rem] italic leading-snug text-[#1d1d1f] md:text-[1.5rem]`}>
        Carry a little light with you.
      </p>
      <Link
        href={WINGS_HREF}
        className="mt-6 inline-flex h-11 items-center justify-center bg-[#1d1d1f] px-8 text-[13px] font-medium uppercase tracking-[0.2em] text-white transition-colors hover:bg-black md:mt-7"
      >
        Explore the Collection
      </Link>
    </>
  );
}

export default function WingsShowcase() {
  return (
    <section aria-labelledby="wings-heading" className="bg-white text-[#1d1d1f]">
      {/* Key visual */}
      <div className="relative">
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-white sm:aspect-[4/3] lg:aspect-[21/9]">
          <Image
            src={KEY_VISUAL}
            alt="A woman in a pink ribbed cami and blue jeans wearing the ELANORA pink diamond angel wing necklace, drop earrings and bracelet in rose gold"
            fill
            unoptimized
            sizes="100vw"
            className="object-cover [object-position:80%_50%] sm:[object-position:95%_50%] lg:[object-position:50%_50%]"
          />
        </div>
        {/* lg+: copy on the white space at the left of the photo */}
        <div className="pointer-events-none absolute inset-0 hidden items-center lg:flex">
          <div className="pointer-events-auto ml-[7vw] max-w-[34rem]">
            <Copy headingId="wings-heading" />
          </div>
        </div>
      </div>

      {/* Below lg: copy and button under the photo */}
      <div className="px-6 pb-14 pt-9 text-center sm:pb-16 sm:pt-10 lg:hidden">
        <Copy />
      </div>

    </section>
  );
}
