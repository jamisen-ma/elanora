import CategoryCollection from "@/components/shop/CategoryCollection";
import { inCollection } from "@/data/catalog";

// Engagement & Bridal is a collection, not a jewelry category: it lists every product
// tagged "engagement-bridal" (rings today; bands, earrings etc. later), using the same
// product records the category pages use.

export const metadata = {
  title: "Engagement & Bridal",
  description: "ELANORA engagement and bridal rings. Lab-grown diamonds, made to order.",
};

export default function EngagementPage() {
  return (
    <CategoryCollection
      label="Engagement & Bridal"
      items={inCollection("engagement-bridal")}
      showTypeFilter
      hero={{
        src: "/images/heroes/engagement-bridal-v5.webp",
        alt: "A bride in an ivory silk dress with a small bow at the waist, holding a bouquet of white roses and wearing an ELANORA round diamond engagement ring",
        headline: "Engagement & Bridal Rings.",
        subline: "Lab-grown diamonds. Made to order.",
        desktopPosition: "60% 50%",
        mobilePosition: "64% 62%",
      }}
    />
  );
}
