import type { Metadata } from "next";
import Image from "next/image";
import { Cormorant_Garamond } from "next/font/google";
import CustomRequest from "@/components/custom/CustomRequest";

export const metadata: Metadata = {
  title: "Custom Jewelry",
  description: "Start with one of our designs, share a reference, or describe your idea. Made to order.",
};

const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["400"] });

// Custom jewelry: a short four-step explanation and an inquiry form. Not a configurator —
// customers start from an ELANORA design or their own idea and we confirm the details.

const STEPS = [
  { title: "Choose a starting point", text: ["Choose an ELANORA design or share your own idea."] },
  { title: "Tell us what you want", text: ["Tell us the stone, metal, size, and any changes you want."] },
  { title: "We confirm the details", text: ["We’ll confirm the design, price, and details with you before production."] },
  { title: "We make it", text: ["Your piece is made to order.", "Please allow 4–8 weeks for production."] },
];

export default function CustomPage() {
  return (
    <div className="bg-[#faf9f7] text-[#1d1d1f]">
      <section className="px-6 pb-14 pt-16 text-center sm:pb-16 sm:pt-20 lg:pt-24">
        <h1 className="text-[11px] font-medium uppercase tracking-[0.32em] text-[#1d1d1f]/75">Custom Jewelry</h1>
        <p
          className={`${serif.className} mt-5 text-balance text-[2.25rem] leading-[1.08] tracking-[-0.01em] md:mt-6 md:text-[2.75rem] lg:text-[3.25rem]`}
        >
          Tell us what you want.
        </p>
        <p className="mx-auto mt-5 max-w-md text-[14px] leading-[1.7] text-[#1d1d1f]/70">
          Start with one of our designs, share a reference, or describe your idea.
        </p>
      </section>

      <div className="relative mx-auto aspect-[4/5] w-full max-w-[1120px] overflow-hidden sm:aspect-[3/2] lg:aspect-[16/8]">
        <Image
          src="/images/catalog/oval-three-stone-diamond-ring/05-on-hand-v3.webp"
          alt="An ELANORA oval three-stone diamond ring worn on the hand"
          fill
          priority
          unoptimized
          sizes="(max-width: 1120px) 100vw, 1120px"
          className="object-cover"
          style={{ objectPosition: "50% 55%" }}
        />
      </div>

      <section aria-label="How it works" className="mx-auto max-w-[1232px] px-6 py-20 sm:py-24 lg:px-14">
        <ol className="grid gap-12 sm:grid-cols-2 sm:gap-x-12 sm:gap-y-14 lg:grid-cols-4 lg:gap-10">
          {STEPS.map((s, i) => (
            <li key={s.title} className="border-t border-[#d2d2d7] pt-6">
              <span className="block text-[10px] tracking-[0.2em] text-[#86868b]">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="mt-3 text-[11px] font-medium uppercase tracking-[0.24em]">{s.title}</h2>
              {s.text.map((t) => (
                <p key={t} className="mt-3 text-[14px] leading-[1.7] text-[#1d1d1f]/70">
                  {t}
                </p>
              ))}
            </li>
          ))}
        </ol>
      </section>

      <CustomRequest />
    </div>
  );
}
