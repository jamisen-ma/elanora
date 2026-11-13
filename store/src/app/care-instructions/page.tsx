import type { Metadata } from "next";
import Link from "next/link";
import { SALE_POLICY } from "@/data/customOrderPolicy";

export const metadata: Metadata = {
  title: "Materials & Care",
  description:
    "What Elanora jewelry is made of — IGI-certified lab-grown diamonds, solid 14K and 18K gold, platinum and sterling silver — and how to care for it.",
};

// Materials as sold in the catalogue (2026-11-14): lab-grown diamonds (all IGI certified), solid
// 14K / 18K gold in yellow, white and rose, platinum (Design Your Ring settings), 925 sterling
// silver and yellow gold over sterling silver on a few pieces, and pearls on one ring.

const Diamond = () => <span className="text-gold mt-0.5 text-[8px]">&#9670;</span>;

function Section({ title, intro, items }: { title: string; intro?: string; items: (string | [string, string])[] }) {
  return (
    <section>
      <h2 className="text-lg font-medium mb-5">{title}</h2>
      <div className="space-y-3 text-sm text-warm-gray leading-relaxed">
        {intro && <p>{intro}</p>}
        <ul className="list-none space-y-2.5 ml-1">
          {items.map((it) => (
            <li key={typeof it === "string" ? it : it[0]} className="flex items-start gap-2">
              <Diamond />
              {typeof it === "string" ? (
                <span>{it}</span>
              ) : (
                <span>
                  <span className="text-foreground font-medium">{it[0]}</span> — {it[1]}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function CareInstructionsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <div className="text-center mb-14">
        <p className="text-xs tracking-[0.3em] uppercase text-gold mb-3">Materials</p>
        <h1 className="text-3xl sm:text-4xl font-light">Materials &amp; Care</h1>
      </div>

      <div className="space-y-14">
        <Section
          title="Our Materials"
          intro="Every Elanora piece is made to order in fine materials. The exact metal and stones of each piece are listed on its product page."
          items={[
            ["Lab-grown diamonds", `Real diamonds, with the same hardness, sparkle and chemistry as mined diamonds, grown in a lab. ${SALE_POLICY.certificate}`],
            ["Solid 14K and 18K gold", "In yellow, white and rose gold. 14K is 58.5% pure gold and especially durable for everyday wear; 18K is 75% pure gold, with a richer color."],
            ["Platinum", "A naturally white, dense and durable metal, offered for engagement ring settings."],
            ["925 sterling silver", "Offered on a few pieces, in white or with a yellow gold finish. Each product page shows which metals that piece comes in."],
            ["Pearls", "Featured on selected designs."],
          ]}
        />

        <hr className="border-cream-dark" />

        <Section
          title="Everyday Care"
          items={[
            ["Put jewelry on last", "apply perfume, lotion and hairspray before wearing your pieces"],
            ["Take it off for hard work", "remove jewelry for the gym, gardening, cleaning and sports, where it can be knocked or scratched"],
            ["Avoid chemicals", "keep away from chlorine, household cleaners and harsh chemicals; take it off before pools and hot tubs"],
            ["Check the settings", "now and then, check that stones are secure and clasps close properly"],
          ]}
        />

        <Section
          title="Diamonds"
          items={[
            "Lotion and natural skin oils dull a diamond's sparkle over time",
            "Soak in warm water with a little mild dish soap, brush gently with a soft toothbrush, rinse and pat dry with a lint-free cloth",
            "Diamonds are very hard but can chip from a sharp knock, and they can scratch other jewelry: store them apart",
          ]}
        />

        <Section
          title="Gold & Platinum"
          items={[
            "Clean with the same warm, soapy water and a soft brush, then dry with a soft cloth",
            "White gold usually has a bright rhodium finish that can soften with wear, letting a warmer tone show through; this is normal",
            "Gold and platinum can pick up fine scratches over time, which gives them a soft, worn-in sheen",
          ]}
        />

        <Section
          title="Sterling Silver & Gold over Silver"
          items={[
            "Silver naturally tarnishes with air and moisture: wipe it with a silver polishing cloth to bring back the shine",
            "For gold over silver, wipe gently with a soft cloth only; polishing cloths and abrasives can wear the gold layer",
            "Keep silver dry and store it in an airtight pouch",
          ]}
        />

        <Section
          title="Pearls"
          items={[
            "Pearls are soft and porous: put them on after perfume and cosmetics",
            "Wipe with a soft, slightly damp cloth after wearing; never soak them or use ultrasonic cleaners",
          ]}
        />

        <hr className="border-cream-dark" />

        <Section
          title="Storage"
          items={[
            "Keep each piece in its own pouch or compartment so pieces don't scratch each other",
            "Fasten necklace and bracelet clasps before storing to prevent tangling",
            "Store in a cool, dry place",
          ]}
        />

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
