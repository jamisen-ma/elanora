import type { Metadata } from "next";
import CategoryCollection from "@/components/shop/CategoryCollection";
import { catalog } from "@/data/catalog";

export const metadata: Metadata = {
  title: "All Jewelry",
  description: "Shop all ELANORA jewelry. Lab-grown diamonds and gemstones, made to order.",
};

// Newest products first (Featured sort follows the order products were added).
export default function ShopPage() {
  return (
    <CategoryCollection
      label="All Jewelry"
      items={catalog.map((i) => ({ ...i, rank: i.addedRank }))}
      showTypeFilter
    />
  );
}
