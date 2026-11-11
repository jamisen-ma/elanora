import CategoryCollection from "@/components/shop/CategoryCollection";
import { catalog } from "@/data/catalog";

export const metadata = {
  title: "Bracelets",
  description: "Shop ELANORA bracelets. Lab-grown diamonds and gemstones, made to order.",
};

// First screen (user, 2026-11-11): a classic staple, a piece with a distinctive design, an easier price
// point and a visually striking piece, in that order; the rest follow newest first.
const LEAD = [
  "round-diamond-tennis-bracelet",
  "pink-diamond-angel-wing-bracelet",
  "pink-heart-diamond-bracelet",
  "emerald-cut-diamond-tennis-bracelet",
];

export default function BraceletsPage() {
  return (
    <CategoryCollection
      label="Bracelets"
      items={catalog
        .filter((i) => i.type === "Bracelets")
        .map((i) => ({ ...i, rank: i.addedRank }))
        .map((i) => (LEAD.includes(i.slug) ? { ...i, rank: -10000 + LEAD.indexOf(i.slug) } : i))}
    />
  );
}
