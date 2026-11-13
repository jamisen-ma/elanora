import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Cormorant_Garamond } from "next/font/google";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Jewelry to keep: thoughtful design, lasting quality and accessible pricing, with lab-grown diamonds.",
};

const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["400"], style: ["normal", "italic"] });

// Our Story: why ELANORA exists — jewelry worth keeping, balancing design, quality and
// price, with lab-grown diamonds opening up the design. Short, plain copy; the photo
// shows real ELANORA pieces. The portrait's white backdrop is tinted
// to the page colour (#faf7f3) so it sits on the page without a box.

const STORY = [
  "We believe jewelry should be thoughtfully designed, made to last, and accessible to more people.",
  "At ELANORA, we bring together considered design, lasting quality, and accessible pricing to create pieces that feel special today and remain part of your life for years to come.",
  "With lab-grown diamonds, we see more possibilities for design — making room for creativity, individuality, and jewelry worth keeping.",
];

export default function AboutPage() {
  return (
    <div className="bg-[#faf7f3] text-[#1d1d1f]">
      <section className="px-6 pb-12 pt-16 text-center sm:pb-16 sm:pt-20 lg:pt-24">
        <p className="text-[13px] font-medium uppercase tracking-[0.32em] text-[#1d1d1f]/65">Our Story</p>
        <h1 className={`${serif.className} mt-5 text-balance text-[2.75rem] font-normal leading-[1.05] sm:text-[4rem] lg:text-[4.75rem]`}>
          Jewelry to Keep.
        </h1>
      </section>

      <section className="mx-auto grid max-w-[1200px] items-center justify-center gap-10 px-6 pb-16 sm:px-10 lg:grid-cols-[400px_30rem] lg:gap-16 lg:px-14 lg:pb-24">
        <div className="relative mx-auto aspect-[4/5] w-full max-w-[400px] overflow-hidden">
          <Image
            src="/images/story/pear-necklace-portrait.webp"
            alt="A woman with blonde waves in a cream satin dress wearing an ELANORA graduated pear diamond necklace"
            fill
            unoptimized
            sizes="400px"
            className="object-cover"
            style={{ objectPosition: "50% 30%" }}
          />
        </div>
        <div className="mx-auto max-w-[30rem] space-y-5 text-[17px] leading-[1.8] text-[#1d1d1f]/75 lg:mx-0">
          {STORY.map((p, i) => (
            <p key={i} className={i === 0 ? `${serif.className} text-[1.6rem] leading-[1.35] text-[#1d1d1f] sm:text-[1.8rem]` : ""}>
              {p}
            </p>
          ))}
        </div>
      </section>

      <section className="px-6 pb-20 pt-4 text-center sm:pb-24 sm:pt-6">
        <p className={`${serif.className} mx-auto max-w-3xl text-balance text-[1.9rem] leading-[1.2] sm:text-[2.5rem]`}>
          {/* one phrase per line on phones, flowing on wider screens */}
          <span className="block sm:inline">Thoughtful design.</span>{" "}
          <span className="block sm:inline">Lasting value.</span>{" "}
          <span className="block sm:inline">Jewelry to keep.</span>
        </p>
        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link href="/shop" className="inline-flex min-h-11 items-center justify-center bg-[#1d1d1f] px-7 text-[13px] font-medium uppercase tracking-[0.2em] text-white transition-opacity hover:opacity-85">
            Explore the collection
          </Link>
          <Link href="/custom" className="inline-flex min-h-11 items-center justify-center border border-[#1d1d1f]/35 px-7 text-[13px] font-medium uppercase tracking-[0.2em] transition-colors hover:border-[#1d1d1f]">
            Create a custom piece
          </Link>
        </div>
      </section>
    </div>
  );
}
