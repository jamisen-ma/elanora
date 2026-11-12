import { catalog, type CatalogItem } from "@/data/catalog";

// Themed collections ("The Collections"), Graff-style: the homepage shows one entry to the
// overview at /series; the overview lists each theme as a large image tile; each theme opens
// its own shop page. Wings of Light keeps its existing page at /wings-of-light.

export interface Series {
  slug: string;
  title: string;
  /** one short line for the theme page hero */
  line: string;
  href: string;
  cover: string;
  coverAlt: string;
  /** product slugs in display order */
  items: () => CatalogItem[];
}

const bySlugs = (slugs: string[]) => () =>
  slugs.map((s) => catalog.find((i) => i.slug === s)).filter((i): i is CatalogItem => !!i);

export const SERIES_HREF = "/series";
export const SERIES_COVER = "/images/series/overview-v4.webp";

export const SERIES: Series[] = [
  {
    slug: "wings-of-light",
    title: "Wings of Light",
    line: "Pavé diamond wings, finished with a pear-shaped color drop in pink, blue, or yellow.",
    href: "/wings-of-light",
    cover: "/images/series/wings.webp",
    coverAlt: "The ELANORA angel wing necklace with a blue pear drop on a white plaster plinth",
    items: () => catalog.filter((i) => i.slug.includes("angel-wing")),
  },
  {
    slug: "le-parfum",
    title: "Le Parfum",
    line: "A perfume bottle in pink, blue or yellow, with a diamond stopper.",
    href: "/series/le-parfum",
    cover: "/images/series/parfum.webp",
    coverAlt: "The ELANORA pink perfume bottle diamond necklace on a white plaster pedestal",
    items: bySlugs([
      "pink-perfume-bottle-diamond-necklace",
      "blue-perfume-bottle-diamond-necklace",
      "yellow-perfume-bottle-diamond-necklace",
    ]),
  },
  {
    slug: "cocktail-hour",
    title: "Cocktail Hour",
    line: "A cocktail glass in colored diamonds, for the evening that starts at six.",
    href: "/series/cocktail-hour",
    cover: "/images/series/cocktail.webp",
    coverAlt: "The ELANORA pink cosmopolitan diamond necklace beside a crystal coupe",
    items: bySlugs([
      "pink-cosmopolitan-diamond-necklace",
      "yellow-champagne-diamond-necklace",
      "blue-lagoon-diamond-necklace",
      "pink-champagne-diamond-necklace",
    ]),
  },
  {
    slug: "snowfall",
    title: "Snowfall",
    line: "Diamond snowflakes, layered and clustered, no two alike.",
    href: "/series/snowfall",
    cover: "/images/series/snowfall.webp",
    coverAlt: "The ELANORA layered snowflake diamond necklace on a white plaster surface",
    items: bySlugs([
      "snowflake-layered-diamond-necklace",
      "pink-snowflake-layered-diamond-necklace",
      "snowflake-cluster-diamond-ring",
    ]),
  },
];
