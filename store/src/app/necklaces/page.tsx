import CategoryCollection from "@/components/shop/CategoryCollection";
import { catalog } from "@/data/catalog";

export const metadata = {
  title: "Necklaces",
  description: "Shop ELANORA necklaces. Lab-grown diamonds and gemstones, made to order.",
};

// First screen (user, 2026-11-11): a classic staple, a piece with a distinctive design, an easier price
// point and a visually striking piece, in that order; the rest follow newest first.
const LEAD = [
  "round-solitaire-diamond-necklace",
  "pink-perfume-bottle-diamond-necklace",
  "pink-teardrop-diamond-necklace",
  "blue-lagoon-diamond-necklace",
];

export default function NecklacesPage() {
  return (
    <CategoryCollection
      label="Necklaces"
      items={catalog
        .filter((i) => i.type === "Necklaces")
        .map((i) => ({ ...i, rank: LEAD.includes(i.slug) ? -10000 + LEAD.indexOf(i.slug) : i.addedRank }))}
    />
  );
}
