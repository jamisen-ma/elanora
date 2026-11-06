import CategoryCollection from "@/components/shop/CategoryCollection";
import { catalog } from "@/data/catalog";

export const metadata = {
  title: "Necklaces",
  description: "Shop ELANORA necklaces. Lab-grown diamonds and gemstones, made to order.",
};

// Newest necklaces first (Featured sort follows the order products were added).
export default function NecklacesPage() {
  return (
    <CategoryCollection
      label="Necklaces"
      items={catalog
        .filter((i) => i.type === "Necklaces")
        .map((i) => ({ ...i, rank: i.addedRank }))}
    />
  );
}
