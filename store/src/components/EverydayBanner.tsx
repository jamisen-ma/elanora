import Image from "next/image";
import Link from "next/link";
import { Cormorant_Garamond } from "next/font/google";

// Third product line — EVERYDAY.
// Derived from the supplied campaign image with its baked-in copy removed (copy is
// live HTML here, set in the same serif as the In Color screen):
//   everyday-desktop.webp  1300×743  left 65% of the original, sweater edge intact
//   everyday-mobile.webp   1000×743  tighter crop that keeps earrings, necklace,
//                                    ring and bracelet large on a phone
// The section background (#f4f1eb) is sampled from the photo's wall, so the
// photo's right edge meets the copy column with no visible seam.

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

export default function EverydayBanner() {
  return (
    <section aria-labelledby="everyday-heading" className="bg-[#f4f1eb] text-[#1d1d1f]">
      <div className="lg:grid lg:grid-cols-[minmax(0,1.9fr)_minmax(0,1fr)] lg:items-center">
        <div>
          <Image
            src="/images/everyday/everyday-mobile.webp"
            alt="Woman in a camel sweater carrying a tote, wearing a diamond tennis necklace, bracelet, ring and stud earrings"
            width={1000}
            height={743}
            unoptimized
            sizes="100vw"
            className="block h-auto w-full lg:hidden"
          />
          <Image
            src="/images/everyday/everyday-desktop.webp"
            alt="Woman in a camel sweater carrying a tote, wearing a diamond tennis necklace, bracelet, ring and stud earrings"
            width={1300}
            height={743}
            unoptimized
            sizes="66vw"
            className="hidden h-auto w-full lg:block"
          />
        </div>

        <div className="px-8 pb-24 pt-14 text-center sm:pb-28 lg:px-0 lg:pb-0 lg:pt-0 lg:pl-[1vw] lg:pr-[7vw] lg:text-left">
          <p className="text-[13px] font-medium uppercase tracking-[0.32em] text-[#1d1d1f]/70">
            Everyday
          </p>
          <h2
            id="everyday-heading"
            className={`${serif.className} mt-5 text-balance text-[2.5rem] font-normal leading-[1.05] tracking-[-0.01em] sm:text-[3.25rem] lg:text-[clamp(2.75rem,3.9vw,4.25rem)]`}
          >
            Fine jewelry,
            <br />
            minus the <em className="italic">occasion.</em>
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed tracking-[0.01em] text-[#6e6e73] sm:text-[16px]">
            Designed to wear often.
            <br />
            Priced to make that easy.
          </p>
          <Link
            href="/shop"
            className="group relative mt-10 inline-block pb-1.5 text-[14px] font-medium uppercase tracking-[0.2em] sm:mt-12"
          >
            Shop everyday &rarr;
            <span aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-[#1d1d1f]/25" />
            <span
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-[#1d1d1f] transition-transform duration-500 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
