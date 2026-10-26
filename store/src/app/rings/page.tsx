import CategoryCollection from "@/components/shop/CategoryCollection";
import { byType } from "@/data/catalog";

export const metadata = {
  title: "Rings",
  description: "Shop ELANORA rings. Lab-grown diamonds and gemstones, made to order.",
};

export default function RingsPage() {
  return (
    <CategoryCollection
      label="Rings"
      items={byType("Rings")}
    />
  );
}
