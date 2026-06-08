import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Size Guide",
  description: "Find your perfect fit with our ring and necklace sizing guide.",
};

export default function SizeGuidePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      {/* Header */}
      <div className="text-center mb-14">
        <p className="text-xs tracking-[0.3em] uppercase text-gold mb-3">
          Perfect Fit
        </p>
        <h1 className="text-3xl sm:text-4xl font-light">Size Guide</h1>
      </div>

      <div className="space-y-14">
        {/* Ring Sizes */}
        <section>
          <h2 className="text-lg font-medium mb-5 flex items-center gap-2">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-gold">
              <circle cx="12" cy="12" r="9" />
              <circle cx="12" cy="12" r="4" />
            </svg>
            Ring Sizing
          </h2>

          <div className="border border-cream-dark rounded-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-cream">
                  <th className="text-left px-5 py-3 text-xs tracking-widest uppercase text-warm-gray font-medium">US Size</th>
                  <th className="text-left px-5 py-3 text-xs tracking-widest uppercase text-warm-gray font-medium">Inner Diameter</th>
                  <th className="text-left px-5 py-3 text-xs tracking-widest uppercase text-warm-gray font-medium">Circumference</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-dark">
                {[
                  ["5", "15.7 mm", "49.3 mm"],
                  ["6", "16.5 mm", "51.8 mm"],
                  ["7", "17.3 mm", "54.4 mm"],
                  ["8", "18.1 mm", "57.0 mm"],
                  ["9", "18.9 mm", "59.5 mm"],
                ].map(([size, diameter, circumference]) => (
                  <tr key={size}>
                    <td className="px-5 py-3.5 font-medium">{size}</td>
                    <td className="px-5 py-3.5 text-warm-gray">{diameter}</td>
                    <td className="px-5 py-3.5 text-warm-gray">{circumference}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-5 space-y-3 text-sm text-warm-gray leading-relaxed">
            <p>
              <span className="text-foreground font-medium">How to measure:</span>{" "}
              Wrap a thin strip of paper or string around the base of your finger.
              Mark where it overlaps, then measure the length in millimeters.
              Match the circumference to the chart above.
            </p>
            <p>
              <span className="text-foreground font-medium">Tip:</span>{" "}
              Our adjustable rings are designed to fit sizes 5 &ndash; 9.
              Measure at the end of the day when fingers are slightly larger for the most accurate fit.
            </p>
          </div>
        </section>

        <hr className="border-cream-dark" />

        {/* Necklace Lengths */}
        <section>
          <h2 className="text-lg font-medium mb-5 flex items-center gap-2">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-gold">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-4.97 0-9 2.686-9 6v6c0 3.314 4.03 6 9 6s9-2.686 9-6V9c0-3.314-4.03-6-9-6z" />
            </svg>
            Necklace Lengths
          </h2>

          <div className="border border-cream-dark rounded-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-cream">
                  <th className="text-left px-5 py-3 text-xs tracking-widest uppercase text-warm-gray font-medium">Length</th>
                  <th className="text-left px-5 py-3 text-xs tracking-widest uppercase text-warm-gray font-medium">Style</th>
                  <th className="text-left px-5 py-3 text-xs tracking-widest uppercase text-warm-gray font-medium">Sits At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-dark">
                {[
                  ["14\"", "Choker", "Base of neck"],
                  ["16\"", "Collar", "Just below collarbone"],
                  ["18\"", "Princess", "At the collarbone"],
                  ["20\"", "Matinee", "Below the collarbone"],
                  ["24\"", "Opera", "Center of chest"],
                ].map(([length, style, sits]) => (
                  <tr key={length}>
                    <td className="px-5 py-3.5 font-medium">{length}</td>
                    <td className="px-5 py-3.5 text-warm-gray">{style}</td>
                    <td className="px-5 py-3.5 text-warm-gray">{sits}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-5 text-sm text-warm-gray leading-relaxed">
            Most of our necklaces include a 2-inch extender chain so you can
            adjust the length to suit your style and neckline.
          </p>
        </section>

        <hr className="border-cream-dark" />

        {/* Earring Sizes */}
        <section>
          <h2 className="text-lg font-medium mb-5 flex items-center gap-2">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-gold">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33" />
            </svg>
            Earring Sizes
          </h2>
          <div className="space-y-3 text-sm text-warm-gray leading-relaxed">
            <p>
              Our earrings are designed for standard pierced ears. Drop earrings
              are measured from the top of the ear wire to the bottom of the
              pendant.
            </p>
            <ul className="list-none space-y-2 ml-1">
              <li className="flex items-start gap-2">
                <span className="text-gold mt-0.5 text-[8px]">&#9670;</span>
                <span><span className="text-foreground font-medium">Studs:</span> 6 &ndash; 10mm</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold mt-0.5 text-[8px]">&#9670;</span>
                <span><span className="text-foreground font-medium">Drop earrings:</span> 40 &ndash; 65mm total length</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold mt-0.5 text-[8px]">&#9670;</span>
                <span><span className="text-foreground font-medium">Hoops:</span> 15 &ndash; 30mm diameter</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Contact CTA */}
        <div className="bg-cream rounded-sm p-8 text-center">
          <h3 className="text-sm font-medium mb-2">Not sure about your size?</h3>
          <p className="text-sm text-warm-gray mb-5">
            Our team is happy to help you find the perfect fit.
          </p>
          <a
            href="mailto:hello@elanora.com"
            className="inline-block border border-foreground text-foreground text-sm tracking-[0.2em] uppercase px-8 py-3 rounded-sm hover:bg-foreground hover:text-white transition-colors"
          >
            Contact Us
          </a>
        </div>

        {/* Back to shop */}
        <div className="text-center">
          <Link
            href="/shop"
            className="text-sm tracking-[0.2em] uppercase text-gold hover:text-gold-dark transition-colors border-b border-gold pb-0.5"
          >
            Back to Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
