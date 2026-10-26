import Image from "next/image";
import { Cormorant_Garamond } from "next/font/google";

// Full-width editorial hero for a collection page (used in place of the plain intro).
// lg and up: the copy sits directly on the photo's clean left side, no box behind it.
// Below lg: the copy sits above the photo, and the photo is cropped toward the subject
// (set per image with `mobilePosition`) so text never covers the face, hand or ring.

const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["400"] });

export interface CollectionHeroProps {
  src: string;
  alt: string;
  /** optional small label above the headline */
  eyebrow?: string;
  headline: string;
  subline?: string;
  /** object-position from md up (keep the subject on the right, free space on the left) */
  desktopPosition?: string;
  /** object-position for the mobile crop */
  mobilePosition?: string;
}

export default function CollectionHero({
  src,
  alt,
  eyebrow,
  headline,
  subline,
  desktopPosition = "70% 40%",
  mobilePosition = "86% 50%",
}: CollectionHeroProps) {
  return (
    <section aria-label={eyebrow ?? headline} className="relative">
      {/* Copy: above the photo below lg, over the photo's left side from lg up */}
      <div className="px-6 pb-8 pt-12 text-center md:pb-10 md:pt-14 lg:absolute lg:inset-0 lg:z-10 lg:flex lg:items-center lg:p-0 lg:pt-16 lg:text-left">
        <div className="mx-auto w-full max-w-[1440px] lg:px-14">
          <div className="lg:max-w-[26rem]">
            {eyebrow && (
              <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.32em] text-[#1d1d1f]/75 md:mb-6">{eyebrow}</p>
            )}
            <h1
              className={`${serif.className} text-balance text-[2.25rem] leading-[1.08] tracking-[-0.01em] text-[#1d1d1f] md:text-[2.75rem] lg:text-[3rem] xl:text-[3.25rem]`}
            >
              {headline}
            </h1>
            {subline && <p className="mt-4 text-[14px] leading-[1.7] text-[#1d1d1f]/70 md:mt-5">{subline}</p>}
          </div>
        </div>
      </div>

      {/* lg+: the transparent site header floats over the top 4rem of the photo, so the
          frame is 4rem taller and the copy is nudged down by the same amount. */}
      <div
        data-hero-frame
        className="relative aspect-square w-full overflow-hidden bg-[#f4f1ee] md:aspect-[2/1] lg:aspect-auto lg:h-[calc(clamp(380px,34vw,500px)+4rem)]"
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover md:hidden"
          style={{ objectPosition: mobilePosition }}
        />
        <Image
          src={src}
          alt={alt}
          fill
          priority
          unoptimized
          sizes="100vw"
          className="hidden object-cover md:block"
          style={{ objectPosition: desktopPosition }}
        />
      </div>
    </section>
  );
}
