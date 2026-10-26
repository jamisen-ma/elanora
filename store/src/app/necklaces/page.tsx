import CategoryCollection from "@/components/shop/CategoryCollection";
import { catalog } from "@/data/catalog";

export const metadata = {
  title: "Necklaces",
  description: "Shop ELANORA necklaces. Lab-grown diamonds and gemstones, made to order.",
};

// The angel wing necklaces lead this page (Featured sort); other pages keep the catalog rank.
const LEAD = ["pink-diamond-angel-wing-necklace", "yellow-diamond-angel-wing-necklace"];

export default function NecklacesPage() {
  return (
    <CategoryCollection
      label="Necklaces"
      items={catalog
        .filter((i) => i.type === "Necklaces")
        .map((i) => (LEAD.includes(i.slug) ? { ...i, rank: LEAD.indexOf(i.slug) - LEAD.length } : i))}
    />
  );
}
