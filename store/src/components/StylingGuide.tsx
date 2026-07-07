import Image from "next/image";
import type { StylingGuide as StylingGuideType } from "@/data/stylingGuides";

export default function StylingGuide({
  guide,
  productName,
  lifestyleImage,
}: {
  guide: StylingGuideType;
  productName: string;
  lifestyleImage?: string;
}) {
  return (
    <section className="mt-16 sm:mt-24">
      {/* Hero */}
      {lifestyleImage && (
        <div className="relative h-[45vh] overflow-hidden">
          <Image
            src={lifestyleImage}
            alt={`${productName} styled in context`}
            fill
            className="object-cover object-center"
            sizes="100vw"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/20 to-transparent" />
          <div className="absolute inset-0 flex items-end justify-center pb-10 sm:pb-14 text-center px-4">
            <div>
              <p className="text-white/60 text-xs tracking-[0.3em] uppercase mb-2">
                How to Style
              </p>
              <h2 className="text-2xl sm:text-4xl font-light text-white mb-3">
                {productName}
              </h2>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Intro */}
        <div className="max-w-2xl mx-auto text-center py-12 sm:py-16">
          <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-4">
            Styling Guide
          </p>
          <p className="text-warm-gray leading-relaxed text-base sm:text-lg">
            {guide.intro}
          </p>
        </div>

        {/* Styling Tips */}
        <div className="space-y-16 sm:space-y-24 pb-16">
          {guide.tips.map((tip, i) => (
            <div
              key={tip.title}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                i % 2 === 1 ? "lg:direction-rtl" : ""
              }`}
            >
              <div
                className={`relative aspect-[4/5] overflow-hidden bg-cream ${
                  i % 2 === 1 ? "lg:order-2" : ""
                }`}
              >
                <Image
                  src={tip.image}
                  alt={tip.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
              <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                <span className="text-gold text-xs tracking-[0.3em] uppercase">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-xl sm:text-2xl font-light mt-2 mb-4">
                  {tip.title}
                </h3>
                <p className="text-warm-gray leading-relaxed">
                  {tip.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Perfect For */}
        <div className="border-t border-cream-dark py-12 sm:py-16">
          <div className="text-center mb-8">
            <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-2">
              Perfect For
            </p>
            <h3 className="text-xl sm:text-2xl font-light">
              Wear It To
            </h3>
          </div>
          <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
            {guide.occasions.map((occasion) => (
              <span
                key={occasion}
                className="px-5 py-2.5 border border-cream-dark text-xs tracking-[0.15em] uppercase text-warm-gray hover:border-gold hover:text-gold transition-colors cursor-default"
              >
                {occasion}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
