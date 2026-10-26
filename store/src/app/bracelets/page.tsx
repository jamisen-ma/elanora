import CategoryCollection from "@/components/shop/CategoryCollection";
import { catalog } from "@/data/catalog";

export const metadata = {
  title: "Bracelets",
  description: "Shop ELANORA bracelets. Lab-grown diamonds and gemstones, made to order.",
};

// The heart bracelets lead this page (Featured sort); other pages keep the catalog rank.
const LEAD = ["pink-heart-diamond-bracelet", "heart-diamond-tennis-bracelet"];

export default function BraceletsPage() {
  return (
    <CategoryCollection
      label="Bracelets"
      items={catalog
        .filter((i) => i.type === "Bracelets")
        .map((i) => (LEAD.includes(i.slug) ? { ...i, rank: LEAD.indexOf(i.slug) - LEAD.length } : i))}
    />
  );
}
