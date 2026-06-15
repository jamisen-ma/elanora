import Image from "next/image";
import CountdownTimer from "@/components/CountdownTimer";
import WaitlistForm from "@/components/WaitlistForm";

export default function HomePage() {
  // 5 teaser images from the available collection
  const teaserImages = [
    {
      src: "/images/products/moonstone-necklace/1.jpg",
      alt: "Piece from the upcoming collection",
      className: "col-span-2 row-span-2",
      aspect: "aspect-[3/4]",
    },
    {
      src: "/images/products/cross-border-jewelry/1.jpg",
      alt: "Piece from the upcoming collection",
      className: "col-span-1",
      aspect: "aspect-square",
    },
    {
      src: "/images/products/heart-shaped-zircon-necklace/1.jpg",
      alt: "Piece from the upcoming collection",
      className: "col-span-1",
      aspect: "aspect-square",
    },
    {
      src: "/images/products/star-diamond-necklace/1.jpg",
      alt: "Piece from the upcoming collection",
      className: "col-span-1",
      aspect: "aspect-[4/5]",
    },
    {
      src: "/images/products/aquaman-pearl-necklace/1.jpg",
      alt: "Piece from the upcoming collection",
      className: "col-span-1",
      aspect: "aspect-[4/5]",
    },
  ];

  return (
    <>
      {/* ============================================ */}
      {/* HERO — Above the fold                       */}
      {/* ============================================ */}
      <section className="relative bg-cream overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[90vh] lg:min-h-[92vh]">
            {/* Left — Copy + Signup */}
            <div className="pt-20 pb-8 sm:pt-24 lg:pt-0 lg:pb-0 order-2 lg:order-1">
              <p className="text-[10px] sm:text-xs tracking-[0.35em] uppercase text-gold mb-5">
                Launching July 15, 2026
              </p>
              <h1 className="text-[2.5rem] sm:text-5xl lg:text-[3.5rem] font-light text-foreground leading-[1.1] mb-6">
                Jewelry designed
                <br />
                to be worn every day
                <br />
                <span className="italic text-gold">and remembered</span>
                <br />
                forever.
              </h1>
              <p className="text-warm-gray text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
                Our first collection drops this summer. Join the Founding Members
                list for early access and launch-day pricing.
              </p>
              <WaitlistForm variant="hero" />
              <p className="text-[11px] text-warm-gray-light mt-3">
                No spam. Unsubscribe anytime. We respect your inbox.
              </p>
            </div>

            {/* Right — Hero visuals */}
            <div className="flex gap-4 sm:gap-5 justify-center items-stretch order-1 lg:order-2 pt-8 lg:pt-0">
              <div className="flex-1 rounded-2xl overflow-hidden shadow-xl max-h-[350px] sm:max-h-[450px] lg:max-h-none lg:h-[80vh]">
                <video
                  src="/videos/hero-1.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 rounded-2xl overflow-hidden shadow-xl max-h-[350px] sm:max-h-[450px] lg:max-h-none lg:h-[80vh]">
                <video
                  src="/videos/hero-2.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* TEASER GALLERY — Create curiosity            */}
      {/* ============================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="text-center mb-14">
          <p className="text-[10px] sm:text-xs tracking-[0.35em] uppercase text-gold mb-3">
            A First Look
          </p>
          <h2 className="text-2xl sm:text-3xl font-light mb-3">
            The Summer Solstice Collection
          </h2>
          <p className="text-sm text-warm-gray max-w-md mx-auto">
            Six carefully curated pieces — celestial motifs, moonstone shimmer,
            and romantic gold details. Just enough to spark your curiosity.
          </p>
        </div>

        {/* Asymmetric image grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {/* Large hero image */}
          <div className="col-span-2 row-span-2 relative aspect-[3/4] rounded-sm overflow-hidden group">
            <Image
              src={teaserImages[0].src}
              alt={teaserImages[0].alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
          </div>

          {/* Top right pair */}
          <div className="relative aspect-square rounded-sm overflow-hidden group">
            <Image
              src={teaserImages[1].src}
              alt={teaserImages[1].alt}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="relative aspect-square rounded-sm overflow-hidden group">
            <Image
              src={teaserImages[2].src}
              alt={teaserImages[2].alt}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* Bottom right pair */}
          <div className="relative aspect-[4/5] rounded-sm overflow-hidden group">
            <Image
              src={teaserImages[3].src}
              alt={teaserImages[3].alt}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="relative aspect-[4/5] rounded-sm overflow-hidden group">
            <Image
              src={teaserImages[4].src}
              alt={teaserImages[4].alt}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>

        <p className="text-center text-xs text-warm-gray-light mt-6 tracking-wide">
          6 pieces. Limited quantities. Full collection revealed at launch.
        </p>
      </section>

      {/* ============================================ */}
      {/* COUNTDOWN                                    */}
      {/* ============================================ */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[10px] sm:text-xs tracking-[0.35em] uppercase text-gold mb-3">
            Mark Your Calendar
          </p>
          <h2 className="text-2xl sm:text-3xl font-light mb-10">
            Launching July 15, 2026
          </h2>
          <CountdownTimer />
        </div>
      </section>

      {/* ============================================ */}
      {/* BRAND STORY — Short + personal               */}
      {/* ============================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative aspect-[4/5] rounded-sm overflow-hidden">
            <Image
              src="/images/products/moonstone-necklace/3.jpg"
              alt="Behind the scenes at Elanora"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="max-w-lg">
            <p className="text-[10px] sm:text-xs tracking-[0.35em] uppercase text-gold mb-4">
              Our Story
            </p>
            <h2 className="text-2xl sm:text-3xl font-light mb-6 leading-snug">
              We created Elanora for
              <br />
              women who want jewelry
              <br />
              that feels <span className="italic">effortless</span>.
            </h2>
            <div className="space-y-4 text-warm-gray leading-relaxed">
              <p>
                It started with a frustration: beautiful jewelry was either
                overpriced or fell apart after a few wears. We set out to build
                something in between — pieces that look and feel premium, crafted
                from 18K gold plating and titanium steel, at prices that actually
                make sense.
              </p>
              <p>
                Every piece in our first collection was hand-selected over eight
                months of testing, wearing, and refining. If it didn&apos;t pass
                our everyday wear test, it didn&apos;t make the cut.
              </p>
              <p className="text-foreground font-medium text-sm">
                Modern. Meaningful. Made to last.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SOCIAL PROOF — Authentic, not fake           */}
      {/* ============================================ */}
      <section className="bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-12 text-center">
            <div>
              <p className="text-3xl sm:text-4xl font-light text-foreground">8</p>
              <p className="text-[10px] sm:text-xs text-warm-gray mt-2 tracking-[0.15em] uppercase">
                Months of Design
              </p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-light text-foreground">6</p>
              <p className="text-[10px] sm:text-xs text-warm-gray mt-2 tracking-[0.15em] uppercase">
                Curated Pieces
              </p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-light text-foreground">18K</p>
              <p className="text-[10px] sm:text-xs text-warm-gray mt-2 tracking-[0.15em] uppercase">
                Gold Plated
              </p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-light text-foreground">Ltd.</p>
              <p className="text-[10px] sm:text-xs text-warm-gray mt-2 tracking-[0.15em] uppercase">
                First Release
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* FOUNDING MEMBERS — Create exclusivity        */}
      {/* ============================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[10px] sm:text-xs tracking-[0.35em] uppercase text-gold mb-3">
            Exclusive Perks
          </p>
          <h2 className="text-2xl sm:text-3xl font-light mb-4">
            Join the Founding Members List
          </h2>
          <p className="text-sm text-warm-gray max-w-lg mx-auto mb-12">
            Be part of the inner circle. Founding Members get benefits that
            won&apos;t be available after launch.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-left max-w-2xl mx-auto">
            <div className="border border-cream-dark rounded-sm p-6 hover:border-gold/30 transition-colors">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-cream flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-gold">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1">First Access</h3>
                  <p className="text-xs text-warm-gray leading-relaxed">
                    Shop the collection 24 hours before the public launch.
                  </p>
                </div>
              </div>
            </div>

            <div className="border border-cream-dark rounded-sm p-6 hover:border-gold/30 transition-colors">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-cream flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-gold">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1">Launch Pricing</h3>
                  <p className="text-xs text-warm-gray leading-relaxed">
                    Exclusive introductory prices for founding members only.
                  </p>
                </div>
              </div>
            </div>

            <div className="border border-cream-dark rounded-sm p-6 hover:border-gold/30 transition-colors">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-cream flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-gold">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1">Limited Editions</h3>
                  <p className="text-xs text-warm-gray leading-relaxed">
                    Access to members-only pieces not available to the public.
                  </p>
                </div>
              </div>
            </div>

            <div className="border border-cream-dark rounded-sm p-6 hover:border-gold/30 transition-colors">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-cream flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-gold">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1">Styling Content</h3>
                  <p className="text-xs text-warm-gray leading-relaxed">
                    Exclusive lookbooks and styling guides before launch day.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* BEHIND THE SCENES                            */}
      {/* ============================================ */}
      <section className="bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1">
              <p className="text-[10px] sm:text-xs tracking-[0.35em] uppercase text-gold mb-4">
                Behind the Scenes
              </p>
              <h2 className="text-2xl sm:text-3xl font-light mb-6 leading-snug">
                From Sketch to Finish
              </h2>
              <div className="space-y-4 text-warm-gray leading-relaxed">
                <p>
                  Every piece starts with inspiration — an afternoon light, a
                  celestial shape, a vintage detail caught in passing. We sketch,
                  prototype, and refine until each design feels right in the hand
                  and right on the skin.
                </p>
                <p>
                  We work directly with small-batch workshops, cutting out
                  middlemen so we can invest in better materials — 18K gold
                  plating, titanium steel cores, genuine moonstone and zircon
                  accents — while keeping prices fair.
                </p>
              </div>

              {/* Process steps */}
              <div className="mt-10 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-white border border-cream-dark flex items-center justify-center text-xs text-gold font-medium">
                    01
                  </div>
                  <div>
                    <p className="text-sm font-medium">Design & Inspiration</p>
                    <p className="text-xs text-warm-gray">Mood boards, sketches, material sourcing</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-white border border-cream-dark flex items-center justify-center text-xs text-gold font-medium">
                    02
                  </div>
                  <div>
                    <p className="text-sm font-medium">Prototype & Test</p>
                    <p className="text-xs text-warm-gray">Wear-tested for comfort, durability, and tarnish resistance</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-white border border-cream-dark flex items-center justify-center text-xs text-gold font-medium">
                    03
                  </div>
                  <div>
                    <p className="text-sm font-medium">Small-Batch Production</p>
                    <p className="text-xs text-warm-gray">Limited quantities, hand-finished details</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-white border border-cream-dark flex items-center justify-center text-xs text-gold font-medium">
                    04
                  </div>
                  <div>
                    <p className="text-sm font-medium">Gift-Ready Packaging</p>
                    <p className="text-xs text-warm-gray">Signature box, soft pouch, care card included</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Collage of close-up images */}
            <div className="order-1 lg:order-2 grid grid-cols-2 gap-3">
              <div className="relative aspect-[3/4] rounded-sm overflow-hidden">
                <Image
                  src="/images/products/star-diamond-necklace/2.jpg"
                  alt="Close-up detail"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[3/4] rounded-sm overflow-hidden mt-8">
                <Image
                  src="/images/products/moonstone-necklace/5.jpg"
                  alt="Close-up detail"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[3/4] rounded-sm overflow-hidden -mt-8">
                <Image
                  src="/images/products/aquaman-pearl-necklace/1.jpg"
                  alt="Close-up detail"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[3/4] rounded-sm overflow-hidden">
                <Image
                  src="/images/products/heart-shaped-zircon-necklace/3.jpg"
                  alt="Close-up detail"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* INSTAGRAM FOLLOW                             */}
      {/* ============================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
        <p className="text-[10px] sm:text-xs tracking-[0.35em] uppercase text-gold mb-3">
          Follow the Journey
        </p>
        <h2 className="text-2xl sm:text-3xl font-light mb-4">
          @elanorajewelry_2024
        </h2>
        <p className="text-sm text-warm-gray max-w-md mx-auto mb-6">
          Behind-the-scenes content, styling inspiration, and launch updates — all
          on Instagram.
        </p>
        <a
          href="https://www.instagram.com/elanorajewelry_2024/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border border-foreground text-foreground text-sm tracking-[0.15em] uppercase px-7 py-3 rounded-sm hover:bg-foreground hover:text-white transition-colors"
        >
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
          </svg>
          Follow on Instagram
        </a>
      </section>

      {/* ============================================ */}
      {/* FINAL CTA — Second signup                    */}
      {/* ============================================ */}
      <section className="bg-foreground text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
          <p className="text-[10px] sm:text-xs tracking-[0.35em] uppercase text-gold-light mb-4">
            Don&apos;t Miss Out
          </p>
          <h2 className="text-2xl sm:text-3xl font-light mb-4">
            Be first to know when we launch.
          </h2>
          <p className="text-sm text-white/60 mb-8 max-w-md mx-auto">
            Join the Founding Members list and get early access, exclusive
            pricing, and updates straight to your inbox.
          </p>
          <WaitlistForm variant="bottom" />
        </div>
      </section>
    </>
  );
}
