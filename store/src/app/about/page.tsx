import type { Metadata } from "next";
import Image from "next/image";
import WaitlistForm from "@/components/WaitlistForm";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "The story behind Elanora — jewelry designed to be worn every day and remembered forever.",
};


export default function AboutPage() {
  return (
    <>
      {/* Hero — Full-bleed image */}
      <section className="relative h-[60vh] sm:h-[70vh] flex items-center overflow-hidden">
        <Image src="/images/about-hero.jpg" alt="Elanora jewelry designer at her sunlit studio" fill className="object-cover object-center" sizes="100vw" unoptimized />
        <div className="absolute inset-0 bg-foreground/50" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
          <p className="text-[10px] sm:text-xs tracking-[0.4em] uppercase text-gold-light mb-4">
            Our Story
          </p>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light text-white leading-tight mb-6">
            Elegance in
            <br />
            <span className="italic">Every Detail</span>
          </h1>
          <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Elanora was born from a simple belief — that beautiful jewelry
            shouldn&apos;t be reserved for special occasions.
          </p>
        </div>
      </section>

      {/* Origin — Split */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0 items-stretch">
          <div className="relative aspect-[4/5] lg:aspect-auto overflow-hidden min-h-[400px]">
            <Image src="/images/founder-portrait.jpg" alt="Elanora founder holding moonstone necklace at her workspace" fill className="object-cover object-center" sizes="(max-width: 1024px) 100vw, 50vw" unoptimized />
          </div>
          <div className="flex items-center p-4 sm:p-8 lg:p-16 bg-white">
            <div>
              <p className="text-[10px] sm:text-xs tracking-[0.4em] uppercase text-gold mb-4">
                Where It Began
              </p>
              <h2 className="text-2xl sm:text-3xl font-light mb-6 leading-snug">
                From a Passion Project
                <br />
                to a <span className="italic">Growing Brand</span>
              </h2>
              <div className="space-y-4 text-warm-gray leading-relaxed">
                <p>
                  Elanora started in 2024 with a small collection and a big idea:
                  make high-quality, design-forward jewelry accessible to every
                  woman — without the traditional luxury markup.
                </p>
                <p>
                  We noticed a gap in the market. On one side, fast-fashion
                  jewelry that tarnished after a few wears. On the other,
                  fine jewelry with price tags that felt out of reach. We set
                  out to build something in between.
                </p>
                <p>
                  Every piece in our first collection is hand-selected by our
                  team. We work directly with skilled artisans and small
                  workshops, cutting out middlemen so we can invest in better
                  materials and pass the savings on to you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process — Visual */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="text-center mb-16">
            <p className="text-[10px] sm:text-xs tracking-[0.4em] uppercase text-gold mb-3">
              Our Process
            </p>
            <h2 className="text-3xl sm:text-4xl font-light">
              From Sketch to <span className="italic">Finish</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { num: "01", title: "Design & Inspiration", desc: "Mood boards, sketches, material sourcing from around the world.", img: "/images/process-design.jpg", alt: "Jewelry sketches and Mediterranean mood board with moonstone and star necklaces" },
              { num: "02", title: "Prototype & Test", desc: "Wear-tested for comfort, durability, and tarnish resistance.", img: "/images/process-prototype.jpg", alt: "Artisan hands checking clasp and chain of pearl necklace" },
              { num: "03", title: "Small-Batch Production", desc: "Limited quantities, hand-finished details by skilled artisans.", img: "/images/process-production.jpg", alt: "Elanora pieces being hand-finished at workshop bench" },
              { num: "04", title: "Gift-Ready Packaging", desc: "Signature box, soft pouch, care card — ready to gift or keep.", img: "/images/process-packaging.jpg", alt: "Pearl necklace in cream jewelry box with soft pouch" },
            ].map((step) => (
              <div key={step.num}>
                <div className="relative aspect-[4/5] overflow-hidden mb-5">
                  <Image src={step.img} alt={step.alt} fill className="object-cover object-center" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" unoptimized />
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-gold text-sm font-light">{step.num}</span>
                  <div>
                    <h3 className="text-sm font-medium mb-1">{step.title}</h3>
                    <p className="text-xs text-warm-gray leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="text-center mb-14">
          <p className="text-[10px] sm:text-xs tracking-[0.4em] uppercase text-gold mb-3">
            What We Stand For
          </p>
          <h2 className="text-3xl sm:text-4xl font-light">
            Built on <span className="italic">Purpose</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 lg:gap-16">
          {[
            {
              icon: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z",
              title: "Quality First",
              desc: "18K gold plating, titanium steel, genuine stones, and hypoallergenic finishes — materials that last.",
            },
            {
              icon: "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z",
              title: "Designed for You",
              desc: "Versatile enough for a Monday meeting, elegant enough for a Friday evening, durable enough for everything in between.",
            },
            {
              icon: "M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A8.966 8.966 0 013 12c0-1.257.26-2.454.727-3.541",
              title: "Honest Pricing",
              desc: "Working directly with artisans and selling online-only means premium jewelry at a fraction of traditional prices.",
            },
          ].map((value) => (
            <div key={value.title} className="text-center">
              <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-white flex items-center justify-center border border-cream-dark">
                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-gold">
                  <path strokeLinecap="round" strokeLinejoin="round" d={value.icon} />
                </svg>
              </div>
              <h3 className="text-sm font-medium mb-2 tracking-wide">{value.title}</h3>
              <p className="text-sm text-warm-gray leading-relaxed max-w-xs mx-auto">
                {value.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-foreground text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
          <p className="text-[10px] sm:text-xs tracking-[0.4em] uppercase text-gold-light mb-4">
            Launching July 2026
          </p>
          <h2 className="text-3xl sm:text-4xl font-light mb-4">
            Get 30% off your first order.
          </h2>
          <p className="text-sm text-white/50 mb-10 max-w-md mx-auto">
            Sign up now and get an exclusive promo code for 30% off when
            the collection drops. Founding Members only.
          </p>
          <WaitlistForm variant="bottom" />
        </div>
      </section>
    </>
  );
}
