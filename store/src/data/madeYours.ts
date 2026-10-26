// MADE YOURS — customizable starting designs.
// Each piece is a starting point; the customization flow (diamond, shape, carat,
// metal, setting details) will live on its product page later.
// Prices are placeholders ("Starting at").

export type MYCategory = "Rings" | "Necklaces" | "Bracelets" | "Earrings";
export type MYShape = "Round" | "Oval" | "Emerald" | "Pear" | "Marquise" | "Cushion";
export type MYSetting = "Solitaire" | "Pavé" | "Bezel" | "Three Stone" | "East-West";
export type MYMetal = "Yellow Gold" | "White Gold" | "Rose Gold" | "Platinum";

export interface MadeYoursProduct {
  slug: string;
  name: string;
  startingPrice: number; // USD
  category: MYCategory;
  shape: MYShape;
  setting: MYSetting;
  metal: MYMetal;
  featuredRank: number; // lower = earlier in "Featured"
  addedRank: number; // lower = newer
  description: string;
}

export const categories: MYCategory[] = ["Rings", "Necklaces", "Bracelets", "Earrings"];
export const shapes: MYShape[] = ["Round", "Oval", "Emerald", "Pear", "Marquise", "Cushion"];
export const settings: MYSetting[] = ["Solitaire", "Pavé", "Bezel", "Three Stone", "East-West"];
export const metals: MYMetal[] = ["Yellow Gold", "White Gold", "Rose Gold", "Platinum"];

export const priceRanges = [
  { id: "under-1000", label: "Under $1,000", min: 0, max: 999 },
  { id: "1000-1500", label: "$1,000 – $1,500", min: 1000, max: 1500 },
  { id: "1500-2000", label: "$1,500 – $2,000", min: 1501, max: 2000 },
  { id: "over-2000", label: "Over $2,000", min: 2001, max: Infinity },
] as const;

export const madeYoursProducts: MadeYoursProduct[] = [
  {
    slug: "the-oval-solitaire",
    name: "The Oval Solitaire",
    startingPrice: 1200,
    category: "Rings",
    shape: "Oval",
    setting: "Solitaire",
    metal: "Yellow Gold",
    featuredRank: 1,
    addedRank: 6,
    description: "An oval lab-grown diamond on a slim, polished band.",
  },
  {
    slug: "the-emerald-pave",
    name: "The Emerald Pavé",
    startingPrice: 1650,
    category: "Rings",
    shape: "Emerald",
    setting: "Pavé",
    metal: "Platinum",
    featuredRank: 2,
    addedRank: 3,
    description: "An emerald-cut lab-grown diamond on a fine pavé band.",
  },
  {
    slug: "the-east-west-marquise",
    name: "The East-West Marquise",
    startingPrice: 1350,
    category: "Rings",
    shape: "Marquise",
    setting: "East-West",
    metal: "Yellow Gold",
    featuredRank: 3,
    addedRank: 1,
    description: "A marquise lab-grown diamond, set sideways on a delicate band.",
  },
  {
    slug: "the-pear-bezel-pendant",
    name: "The Pear Bezel Pendant",
    startingPrice: 980,
    category: "Necklaces",
    shape: "Pear",
    setting: "Bezel",
    metal: "Yellow Gold",
    featuredRank: 4,
    addedRank: 4,
    description: "A pear lab-grown diamond in a fine bezel, on a delicate chain.",
  },
  {
    slug: "the-round-tennis-bracelet",
    name: "The Round Tennis Bracelet",
    startingPrice: 2400,
    category: "Bracelets",
    shape: "Round",
    setting: "Pavé",
    metal: "White Gold",
    featuredRank: 5,
    addedRank: 9,
    description: "A continuous line of round lab-grown diamonds.",
  },
  {
    slug: "the-round-solitaire-studs",
    name: "The Round Solitaire Studs",
    startingPrice: 1100,
    category: "Earrings",
    shape: "Round",
    setting: "Solitaire",
    metal: "Platinum",
    featuredRank: 6,
    addedRank: 10,
    description: "Round lab-grown diamond studs in a four-claw setting.",
  },
  {
    slug: "the-three-stone-round",
    name: "The Three Stone Round",
    startingPrice: 1900,
    category: "Rings",
    shape: "Round",
    setting: "Three Stone",
    metal: "White Gold",
    featuredRank: 7,
    addedRank: 7,
    description: "Three round lab-grown diamonds, side by side.",
  },
  {
    slug: "the-oval-solitaire-pendant",
    name: "The Oval Solitaire Pendant",
    startingPrice: 890,
    category: "Necklaces",
    shape: "Oval",
    setting: "Solitaire",
    metal: "White Gold",
    featuredRank: 8,
    addedRank: 8,
    description: "An oval lab-grown diamond pendant on a fine chain.",
  },
  {
    slug: "the-bezel-station-bracelet",
    name: "The Bezel Station Bracelet",
    startingPrice: 1150,
    category: "Bracelets",
    shape: "Oval",
    setting: "Bezel",
    metal: "Yellow Gold",
    featuredRank: 9,
    addedRank: 2,
    description: "Small oval lab-grown diamonds in bezels along a fine chain.",
  },
  {
    slug: "the-pear-drop-earrings",
    name: "The Pear Drop Earrings",
    startingPrice: 1250,
    category: "Earrings",
    shape: "Pear",
    setting: "Bezel",
    metal: "Rose Gold",
    featuredRank: 10,
    addedRank: 5,
    description: "Pear lab-grown diamonds in fine bezels, hanging from small hoops.",
  },
  {
    slug: "the-cushion-solitaire",
    name: "The Cushion Solitaire",
    startingPrice: 1300,
    category: "Rings",
    shape: "Cushion",
    setting: "Solitaire",
    metal: "Rose Gold",
    featuredRank: 11,
    addedRank: 11,
    description: "A cushion lab-grown diamond on a slim, polished band.",
  },
  {
    slug: "the-east-west-emerald-pendant",
    name: "The East-West Emerald Pendant",
    startingPrice: 1050,
    category: "Necklaces",
    shape: "Emerald",
    setting: "East-West",
    metal: "Yellow Gold",
    featuredRank: 12,
    addedRank: 12,
    description: "An emerald-cut lab-grown diamond, set sideways in a slim bezel.",
  },
];

export const productImage = (slug: string) => `/images/made-yours/products/${slug}.webp`;
export const wornImage = (slug: string) => `/images/made-yours/products/${slug}-worn.webp`;

export function getMadeYoursProduct(slug: string) {
  return madeYoursProducts.find((p) => p.slug === slug);
}

export const formatUSD = (n: number) =>
  `$${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
