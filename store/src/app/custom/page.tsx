import type { Metadata } from "next";
import Image from "next/image";
import { Cormorant_Garamond } from "next/font/google";
import CustomRequest from "@/components/custom/CustomRequest";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Custom Jewelry",
  description: "Any diamond color, size, metal or style — share a photo or describe a feeling, and we’ll make it real together. Made to order.",
};

const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["400"] });

// Kept deliberately short: the whole business in four lines. Full terms live on
// /shipping-returns#custom-orders (src/data/customOrderPolicy.ts).
const STEPS = [
  { number: "01", title: "Tell us your idea", text: "Free. It’s not an order." },
  { number: "02", title: "Get your price", text: "We send the design and total price." },
  { number: "03", title: "Pay to start", text: "We make your piece in about 2–8 weeks." },
  { number: "04", title: "We ship it", text: "Nothing more to pay — it’s on its way." },
];

export default function CustomPage() {
  return (
    <div className="bg-[#faf9f7] text-[#1d1d1f]">
      <section className="px-6 pb-8 pt-10 text-center sm:pt-12 lg:pt-12">
        <h1 className="text-[13px] font-medium uppercase tracking-[0.32em] text-[#1d1d1f]/75">Custom Jewelry</h1>
        <p
          className={`${serif.className} mt-4 text-balance text-[2.25rem] leading-[1.08] tracking-[-0.01em] md:text-[2.75rem] lg:text-[3.25rem]`}
        >
          Dream it. We&rsquo;ll make it shine.
        </p>
        <p className="mx-auto mt-3 max-w-md text-[16px] leading-[1.7] text-[#1d1d1f]/70">
          Any color, any size, any metal, any style &mdash; or just a photo or a feeling. Tell us, and we&rsquo;ll make it real together.
        </p>
        <a href="#custom-request" className="mt-6 inline-flex bg-[#1d1d1f] px-8 py-3.5 text-[13px] font-medium uppercase tracking-[0.22em] text-white transition-opacity hover:opacity-85">
          Begin your piece
        </a>
      </section>

      <div className="px-6">
        {/* soft, feathered edges so the photo melts into the page background */}
        <div
          className="relative mx-auto aspect-[2/1] w-full max-w-[760px] overflow-hidden sm:aspect-[3/1]"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent, #000 7%, #000 93%, transparent), linear-gradient(to bottom, transparent, #000 14%, #000 86%, transparent)",
            WebkitMaskComposite: "source-in",
            maskImage:
              "linear-gradient(to right, transparent, #000 7%, #000 93%, transparent), linear-gradient(to bottom, transparent, #000 14%, #000 86%, transparent)",
            maskComposite: "intersect",
          }}
        >
          <Image
            src="/images/custom/loose-diamonds-row.webp"
            alt="A row of loose diamonds in sunlight: white round, pink cushion, white oval, yellow radiant, white pear and blue emerald cut"
            fill
            priority
            unoptimized
            sizes="(max-width: 808px) 100vw, 760px"
            className="object-cover"
            style={{ objectPosition: "50% 52%" }}
          />
        </div>
      </div>

      <section aria-label="How custom works" className="mx-auto max-w-[1232px] px-6 pb-14 pt-8 sm:pb-16 sm:pt-10 lg:px-14">
        <h2 className={`${serif.className} text-center text-4xl leading-tight sm:text-5xl`}>How it works</h2>
        {/* small cue to scroll on to the steps */}
        <svg width="18" height="10" viewBox="0 0 18 10" fill="none" aria-hidden className="mx-auto mb-10 mt-3 text-[#1d1d1f]/45 motion-safe:animate-bounce sm:mb-12">
          <path d="M1 1l8 8 8-8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <ol className="grid gap-10 sm:grid-cols-2 sm:gap-x-12 sm:gap-y-14 lg:grid-cols-4 lg:gap-x-10 lg:gap-y-12">
          {STEPS.map((s) => (
            <li key={s.title} className="border-t border-[#d2d2d7] pt-5">
              <span className="block text-[12px] tracking-[0.2em] text-[#86868b]">{s.number}</span>
              <h3 className="mt-3 text-[13px] font-medium uppercase tracking-[0.2em]">{s.title}</h3>
              <p className="mt-3 text-[16px] leading-[1.7] text-[#1d1d1f]/70">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <p className="mx-auto mb-12 max-w-xl px-6 text-center text-[15px] leading-[1.7] text-[#1d1d1f]/60">
        Payment is non-refundable once made, and custom pieces can&rsquo;t be returned or exchanged. Your legal rights still apply.{" "}
        <Link href="/shipping-returns#custom-orders" className="underline underline-offset-4 hover:text-[#1d1d1f]">
          Full policy
        </Link>
      </p>
      <div id="custom-request" className="scroll-mt-20">
        <CustomRequest />
      </div>
    </div>
  );
}
