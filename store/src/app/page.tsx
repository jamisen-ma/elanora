import Image from "next/image";
import Link from "next/link";
import CountdownTimer from "@/components/CountdownTimer";
import WaitlistForm from "@/components/WaitlistForm";
import { getFeaturedProducts, formatPrice } from "@/data/products";


export default function HomePage() {
  const featured = getFeaturedProducts().slice(0, 4);

  return (
    <>
      {/* ============================================ */}
      {/* HERO — Full-bleed lifestyle visual           */}
      {/* ============================================ */}
      <section className="relative min-h-[100svh] flex items-center overflow-hidden">
        {/* Background — lifestyle image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-background.png"
            alt="Model wearing gold jewelry in golden hour light"
            fill
            priority
            className="object-cover object-top"
            sizes="100vw"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 via-foreground/30 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-xl pt-24 pb-16 lg:py-0">
            <p className="text-[10px] sm:text-xs tracking-[0.4em] uppercase text-gold-light mb-5 font-sans">
              Launching August 20, 2026
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white leading-[1.1] mb-6">
              Jewelry designed
              <br />
              to be worn every day
              <br />
              <span className="italic text-gold-light">and remembered</span>
              <br />
              forever.
            </h1>
            <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-8 max-w-md font-sans">
              Our debut collection drops this summer. Sign up now and get
              <span className="text-gold-light font-medium"> 30% off </span>
              your first order as a Founding Member.
            </p>
            <WaitlistForm variant="hero" />
            <p className="text-[11px] text-white/30 mt-3 font-sans">
              No spam. Unsubscribe anytime. We respect your inbox.
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-white/30" />
        </div>
      </section>

      {/* ============================================ */}
      {/* FEATURED PRODUCTS — Grid with hover          */}
      {/* ============================================ */}
      <section className="bg-white py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-[10px] sm:text-xs tracking-[0.4em] uppercase text-gold mb-3 font-sans">
                Curated for You
              </p>
              <h2 className="text-3xl sm:text-4xl font-light">
                The Collection
              </h2>
            </div>
            <Link
              href="/shop"
              className="hidden sm:inline-flex items-center gap-2 text-sm tracking-[0.15em] uppercase text-warm-gray hover:text-gold transition-colors font-sans"
            >
              View All
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {featured.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                className="group block"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-cream mb-4">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Hover overlay with quick-view */}
                  <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <div className="bg-white/95 backdrop-blur-sm text-center py-3 text-xs tracking-[0.2em] uppercase text-foreground font-sans">
                      View Details
                    </div>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-warm-gray-light font-sans">{product.category}</p>
                  <h3 className="text-sm font-medium text-foreground group-hover:text-gold transition-colors font-sans">
                    {product.name}
                  </h3>
                  <p className="text-sm text-foreground font-sans">{formatPrice(product.price)}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10 sm:hidden">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-sm tracking-[0.15em] uppercase text-warm-gray hover:text-gold transition-colors font-sans"
            >
              View All Pieces
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* LOOKBOOK — Editorial lifestyle grid           */}
      {/* ============================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="text-center mb-14">
          <p className="text-[10px] sm:text-xs tracking-[0.4em] uppercase text-gold mb-3 font-sans">
            The Lookbook
          </p>
          <h2 className="text-3xl sm:text-4xl font-light">
            Styled for Real Life
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div className="col-span-2 row-span-2 relative aspect-[3/4] overflow-hidden group cursor-pointer">
            <Image src="/images/lookbook-hero.jpg" alt="Model in ivory dress wearing layered necklaces" fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 50vw" unoptimized />
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-500" />
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
              <p className="text-white text-xs tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transition-opacity font-sans">Shop This Look</p>
            </div>
          </div>
          <div className="relative aspect-square overflow-hidden group cursor-pointer">
            <Image src="/images/bracelet-detail.jpg" alt="Gold bracelet detail shot" fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 50vw, 25vw" />
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-500" />
          </div>
          <div className="relative aspect-square overflow-hidden group cursor-pointer">
            <Image src="/images/lookbook-flat-lay.jpg" alt="Elanora jewelry flat lay on cream marble" fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 50vw, 25vw" unoptimized />
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-500" />
          </div>
          <div className="relative aspect-[4/5] overflow-hidden group cursor-pointer">
            <Image src="/images/hand-jewelry.jpg" alt="Hand with gold rings and bracelets" fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 50vw, 25vw" />
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-500" />
          </div>
          <div className="relative aspect-[4/5] overflow-hidden group cursor-pointer">
            <Image src="/images/neckline-moonstone.jpg" alt="Moonstone necklace on cream silk neckline" fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 50vw, 25vw" unoptimized />
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-500" />
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* VIDEO MOMENT — Full-width ambient             */}
      {/* ============================================ */}
      <section className="relative h-[60vh] sm:h-[70vh] overflow-hidden">
        <Image src="/images/ambient-banner.jpg" alt="Woman getting ready with jewelry at sunlit mirror" fill className="object-cover object-center" sizes="100vw" unoptimized />
        <div className="absolute inset-0 bg-foreground/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-3xl sm:text-5xl font-light mb-4 leading-tight">
              Made to Be
              <br />
              <span className="italic">Worn Every Day</span>
            </h2>
            <p className="text-white/60 text-sm sm:text-base max-w-md mx-auto mb-8 font-sans">
              18K gold plating. Titanium steel cores. Tarnish-resistant.
              Hypoallergenic. Built for real life.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 border border-white/40 text-white text-xs tracking-[0.2em] uppercase px-8 py-3.5 hover:bg-white hover:text-foreground transition-colors font-sans"
            >
              Our Process
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* COUNTDOWN — Urgency section                  */}
      {/* ============================================ */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[10px] sm:text-xs tracking-[0.4em] uppercase text-gold mb-3 font-sans">
            Mark Your Calendar
          </p>
          <h2 className="text-3xl sm:text-4xl font-light mb-4">
            Launching August 20, 2026
          </h2>
          <p className="text-sm text-warm-gray max-w-md mx-auto mb-10 font-sans">
            The Summer Solstice collection drops in limited quantities.
            Once it&apos;s gone, it&apos;s gone.
          </p>
          <CountdownTimer />
        </div>
      </section>

      {/* ============================================ */}
      {/* BRAND STORY — Split with image               */}
      {/* ============================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0 items-stretch">
          <div className="flex items-center p-4 sm:p-8 lg:p-16 order-2 lg:order-1">
            <div className="max-w-md">
              <p className="text-[10px] sm:text-xs tracking-[0.4em] uppercase text-gold mb-4 font-sans">
                Our Story
              </p>
              <h2 className="text-3xl sm:text-4xl font-light mb-6 leading-snug">
                We created Elanora
                <br />
                for women who want
                <br />
                jewelry that feels
                <br />
                <span className="italic">effortless.</span>
              </h2>
              <div className="space-y-4 text-warm-gray leading-relaxed font-sans">
                <p>
                  Beautiful jewelry was either overpriced or fell apart after a few
                  wears. We built something in between — pieces that look and feel
                  premium, at prices that actually make sense.
                </p>
                <p>
                  Every piece was hand-selected over eight months of testing,
                  wearing, and refining. If it didn&apos;t pass our everyday wear
                  test, it didn&apos;t make the cut.
                </p>
              </div>
              <Link
                href="/about"
                className="inline-flex items-center gap-3 text-sm tracking-[0.2em] uppercase text-foreground border-b-2 border-foreground pb-1 hover:text-gold hover:border-gold transition-colors mt-8 font-sans"
              >
                Read Our Story
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/5] lg:aspect-auto overflow-hidden order-1 lg:order-2 min-h-[400px]">
            <Image src="/images/craftsmanship.jpg" alt="Artisan hands inspecting gold necklaces on workbench" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" unoptimized />
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* FOUNDING MEMBERS — Exclusive perks            */}
      {/* ============================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[10px] sm:text-xs tracking-[0.4em] uppercase text-gold mb-3 font-sans">
              Exclusive Perks
            </p>
            <h2 className="text-3xl sm:text-4xl font-light mb-4">
              Join the Founding Members
            </h2>
            <p className="text-sm text-warm-gray max-w-lg mx-auto font-sans">
              Sign up and instantly get your 30% off promo code. Founding Members
              also get perks that won&apos;t be available after launch.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
            {[
              { icon: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z", title: "First Access", desc: "Shop the collection 24 hours before the public launch." },
              { icon: "M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z", title: "30% Off Launch Day", desc: "Get an exclusive 30% discount code the moment you sign up." },
              { icon: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z", title: "Limited Editions", desc: "Access to members-only pieces not available to the public." },
              { icon: "M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75", title: "Styling Content", desc: "Exclusive lookbooks and styling guides before launch day." },
            ].map((perk) => (
              <div key={perk.title} className="bg-white border border-cream-dark p-6 hover:border-gold/30 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-cream flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-gold">
                      <path strokeLinecap="round" strokeLinejoin="round" d={perk.icon} />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-1 font-sans">{perk.title}</h3>
                    <p className="text-xs text-warm-gray leading-relaxed font-sans">{perk.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* FINAL CTA — Dark signup                      */}
      {/* ============================================ */}
      <section className="bg-foreground text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
          <p className="text-[10px] sm:text-xs tracking-[0.4em] uppercase text-gold-light mb-4 font-sans">
            Don&apos;t Miss Out
          </p>
          <h2 className="text-3xl sm:text-4xl font-light mb-4">
            Get 30% off when we launch.
          </h2>
          <p className="text-sm text-white/50 mb-10 max-w-md mx-auto font-sans">
            Sign up now and we&apos;ll send you an exclusive promo code for
            30% off your first order. Founding Members only.
          </p>
          <WaitlistForm variant="bottom" />
        </div>
      </section>
    </>
  );
}
