import CategoryCollection from "@/components/shop/CategoryCollection";
import { catalog } from "@/data/catalog";

export const metadata = {
  title: "Earrings",
  description: "Shop ELANORA earrings. Lab-grown diamonds and gemstones, made to order.",
};

// The halo studs added with a single image so far go last (user, 2026-11-08); the rest are newest first.
const LAST = [
  "princess-halo-diamond-stud-earrings",
  "asscher-halo-diamond-stud-earrings",
  "cushion-halo-diamond-stud-earrings",
  "radiant-halo-diamond-stud-earrings",
  "marquise-halo-diamond-stud-earrings",
];

// First screen (user, 2026-11-11): a classic staple, a piece with a distinctive design, an easier price
// point and a visually striking piece, in that order; the rest follow newest first.
const LEAD = [
  "round-halo-diamond-stud-earrings",
  "marquise-diamond-ear-climber",
  "pink-heart-halo-diamond-stud-earrings",
  "blue-diamond-angel-wing-drop-earrings",
];

export default function EarringsPage() {
  return (
    <CategoryCollection
      label="Earrings"
      items={catalog
        .filter((i) => i.type === "Earrings")
        .map((i) => ({ ...i, rank: LEAD.includes(i.slug) ? -10000 + LEAD.indexOf(i.slug) : LAST.includes(i.slug) ? 10000 + LAST.indexOf(i.slug) : i.addedRank }))}
    />
  );
}
