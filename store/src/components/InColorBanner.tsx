import Image from "next/image";
import Link from "next/link";
import { Cormorant_Garamond } from "next/font/google";

// Second product line — IN COLOR.
// Images are derived from the supplied "Affordable Gemstones" key visual with its
// baked-in tagline removed (copy is live HTML here):
//   in-color-desktop.webp  1677×725  the original wide composition
//   in-color-mobile.webp   1000×1040 necklace above, both rings below, so all three
//                                    pieces stay large on a phone (not a crop)
// Colour comes only from the gemstones; the section background matches the photo's
// warm white (#faf7f3) and the photo's edges are masked into it. Copy sits centred
// below the image at every breakpoint.

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

export default function InColorBanner() {
  return (
    <section aria-labelledby="in-color-heading" className="bg-[#faf7f3] text-[#1d1d1f]">
      <div>
        {/* Jewelry */}
        <div className="relative">
          <Image
            src="/images/in-color/in-color-mobile.webp"
            alt="A blue pear-cut gemstone necklace above a yellow oval gemstone ring and a pink pear-cut gemstone ring"
            width={1000}
            height={1040}
            unoptimized
            sizes="100vw"
            className="block h-auto w-full lg:hidden"
          />
          <Image
            src="/images/in-color/in-color-desktop.webp"
            alt="A blue pear-cut gemstone necklace between a yellow oval gemstone ring and a pink pear-cut gemstone ring"
            width={1677}
            height={725}
            unoptimized
            sizes="100vw"
            className="hidden h-auto w-full lg:block [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent),linear-gradient(to_bottom,transparent,#000_10%,#000_84%,transparent)] [mask-composite:intersect] [-webkit-mask-composite:source-in]"
          />
        </div>

        {/* Copy */}
        <div className="px-8 pb-24 pt-6 text-center sm:pb-28 lg:pb-32 lg:pt-4">
          <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-[#1d1d1f]/70">
            In Color
          </p>
          <h2
            id="in-color-heading"
            className={`${serif.className} mt-5 text-balance text-[2.5rem] font-normal leading-[1.05] tracking-[-0.01em] sm:text-[3.25rem] lg:text-[clamp(3rem,3.8vw,4.25rem)]`}
          >
            A little <em className="italic">more color.</em>
          </h2>
          <p className="mt-5 text-[14px] leading-relaxed tracking-[0.01em] text-[#6e6e73] sm:text-[15px]">
            Gemstones made to stand out.
          </p>
          <Link
            href="/in-color"
            className="group relative mt-10 inline-block pb-1.5 text-[12px] font-medium uppercase tracking-[0.2em] sm:mt-12"
          >
            Explore color &rarr;
            <span
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-px bg-[#1d1d1f]/25"
            />
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
