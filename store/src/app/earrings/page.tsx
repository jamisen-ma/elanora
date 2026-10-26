import CategoryCollection from "@/components/shop/CategoryCollection";
import { catalog } from "@/data/catalog";

export const metadata = {
  title: "Earrings",
  description: "Shop ELANORA earrings. Lab-grown diamonds and gemstones, made to order.",
};

export default function EarringsPage() {
  return (
    <CategoryCollection
      label="Earrings"
      items={catalog.filter((i) => i.type === "Earrings")}
    />
  );
}
