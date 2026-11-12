import CategoryCollection from "@/components/shop/CategoryCollection";
import { byType } from "@/data/catalog";

export const metadata = {
  title: "Rings",
  description: "Shop ELANORA rings. Lab-grown diamonds and gemstones, made to order.",
};

// First screen (user, 2026-11-11): a classic staple, a piece with a distinctive design, an easier price
// point and a visually striking piece, in that order; the rest follow newest first.
const LEAD = [
  "radiant-solitaire-diamond-ring",
  "snowflake-cluster-diamond-ring",
  "pearl-chevron-diamond-ring",
  "yellow-pear-halo-diamond-ring",
];

export default function RingsPage() {
  return (
    <CategoryCollection
      label="Rings"
      showStyleTiles
      items={byType("Rings").map((i) => ({ ...i, rank: LEAD.includes(i.slug) ? -10000 + LEAD.indexOf(i.slug) : i.addedRank }))}
    />
  );
}
