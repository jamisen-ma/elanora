import CategoryCollection from "@/components/shop/CategoryCollection";
import { catalog } from "@/data/catalog";

// Wings of Light: the Angel Wing series (necklaces, earrings, bracelets in pink, blue and
// yellow), reached from the homepage theme window. Filter by jewelry type and stone color.

export const metadata = {
  title: "Wings of Light",
  description:
    "The ELANORA Angel Wing collection: pavé diamond wings finished with a pear-shaped color drop in pink, blue or yellow.",
};

const COLORS = ["Pink", "Blue", "Yellow"];
const items = catalog.filter((i) => i.slug.includes("angel-wing"));
// Keyed in COLORS order, which is also the order of the Stone Color filter options.
const colorBySlug = Object.fromEntries(
  COLORS.flatMap((c) => items.filter((i) => i.slug.startsWith(c.toLowerCase())).map((i) => [i.slug, c])),
);

export default function WingsOfLightPage() {
  return (
    <CategoryCollection
      label="Wings of Light"
      items={items}
      showTypeFilter
      colorBySlug={colorBySlug}
      hero={{
        src: "/images/home/wings/wings-of-light-key-visual-v2.webp",
        alt: "A woman in a pink ribbed cami and blue jeans wearing the ELANORA pink diamond angel wing necklace, drop earrings and bracelet in rose gold",
        eyebrow: "The Angel Wing Collection",
        headline: "Wings of Light",
        subline: "Pavé diamond wings, finished with a pear-shaped color drop in pink, blue, or yellow.",
        desktopPosition: "70% 30%",
        mobilePosition: "85% 30%",
      }}
    />
  );
}
