// IN COLOR — gemstone jewelry, discovered by color first.
// Prices are placeholders.

export type ICColor = "Pink" | "Blue" | "Green" | "Yellow" | "Red" | "Neutral";
export type ICType = "Rings" | "Necklaces" | "Earrings" | "Bracelets";
export type ICMetal = "Yellow Gold" | "White Gold" | "Rose Gold" | "Sterling Silver";

export interface InColorProduct {
  slug: string;
  name: string;
  price: number; // USD
  color: ICColor;
  gemstone: string; // as shown on the product, e.g. "Pink Sapphire"
  gemFamily: string; // filter group, e.g. "Sapphire"
  type: ICType;
  metal: ICMetal;
  featuredRank: number;
  addedRank: number;
  description: string;
}

export const colors: ICColor[] = ["Pink", "Blue", "Green", "Yellow", "Red", "Neutral"];
export const types: ICType[] = ["Rings", "Necklaces", "Earrings", "Bracelets"];

export const metalLabel: Record<ICMetal, string> = {
  "Yellow Gold": "14K Gold",
  "White Gold": "14K White Gold",
  "Rose Gold": "14K Rose Gold",
  "Sterling Silver": "Sterling Silver",
};

export const priceRanges = [
  { id: "under-300", label: "Under $300", min: 0, max: 299 },
  { id: "300-500", label: "$300 – $500", min: 300, max: 500 },
  { id: "over-500", label: "Over $500", min: 501, max: Infinity },
] as const;

export const inColorProducts: InColorProduct[] = [
  {
    slug: "the-pink-sapphire-ring",
    name: "The Pink Sapphire Ring",
    price: 620,
    color: "Pink",
    gemstone: "Pink Sapphire",
    gemFamily: "Sapphire",
    type: "Rings",
    metal: "Yellow Gold",
    featuredRank: 1,
    addedRank: 4,
    description: "An oval pink sapphire on a slim, polished band.",
  },
  {
    slug: "the-aquamarine-drop",
    name: "The Aquamarine Drop",
    price: 280,
    color: "Blue",
    gemstone: "Aquamarine",
    gemFamily: "Aquamarine",
    type: "Necklaces",
    metal: "Sterling Silver",
    featuredRank: 2,
    addedRank: 2,
    description: "A pale blue aquamarine drop on a fine chain.",
  },
  {
    slug: "the-emerald-bar-necklace",
    name: "The Emerald Bar Necklace",
    price: 540,
    color: "Green",
    gemstone: "Emerald",
    gemFamily: "Emerald",
    type: "Necklaces",
    metal: "Yellow Gold",
    featuredRank: 3,
    addedRank: 6,
    description: "Small emeralds set in a slim horizontal bar.",
  },
  {
    slug: "the-citrine-cocktail-ring",
    name: "The Citrine Cocktail Ring",
    price: 390,
    color: "Yellow",
    gemstone: "Citrine",
    gemFamily: "Citrine",
    type: "Rings",
    metal: "Yellow Gold",
    featuredRank: 4,
    addedRank: 1,
    description: "A bold cushion-cut citrine, made to be noticed.",
  },
  {
    slug: "the-ruby-solitaire-pendant",
    name: "The Ruby Solitaire Pendant",
    price: 560,
    color: "Red",
    gemstone: "Ruby",
    gemFamily: "Ruby",
    type: "Necklaces",
    metal: "Yellow Gold",
    featuredRank: 5,
    addedRank: 8,
    description: "A round ruby in a fine claw setting.",
  },
  {
    slug: "the-champagne-sapphire-ring",
    name: "The Champagne Sapphire Ring",
    price: 580,
    color: "Neutral",
    gemstone: "Champagne Sapphire",
    gemFamily: "Sapphire",
    type: "Rings",
    metal: "Rose Gold",
    featuredRank: 6,
    addedRank: 5,
    description: "A warm champagne sapphire on a slim band.",
  },
  {
    slug: "the-morganite-drop-earrings",
    name: "The Morganite Drop Earrings",
    price: 340,
    color: "Pink",
    gemstone: "Morganite",
    gemFamily: "Morganite",
    type: "Earrings",
    metal: "Rose Gold",
    featuredRank: 7,
    addedRank: 3,
    description: "Soft pink morganite drops on small hoops.",
  },
  {
    slug: "the-blue-topaz-studs",
    name: "The Blue Topaz Studs",
    price: 260,
    color: "Blue",
    gemstone: "Blue Topaz",
    gemFamily: "Topaz",
    type: "Earrings",
    metal: "White Gold",
    featuredRank: 8,
    addedRank: 9,
    description: "Bright blue topaz studs for every day.",
  },
  {
    slug: "the-peridot-tennis-bracelet",
    name: "The Peridot Tennis Bracelet",
    price: 320,
    color: "Green",
    gemstone: "Peridot",
    gemFamily: "Peridot",
    type: "Bracelets",
    metal: "Sterling Silver",
    featuredRank: 9,
    addedRank: 7,
    description: "A bright line of fresh green peridot.",
  },
  {
    slug: "the-yellow-sapphire-studs",
    name: "The Yellow Sapphire Studs",
    price: 480,
    color: "Yellow",
    gemstone: "Yellow Sapphire",
    gemFamily: "Sapphire",
    type: "Earrings",
    metal: "Yellow Gold",
    featuredRank: 10,
    addedRank: 11,
    description: "Sunny yellow sapphire studs.",
  },
  {
    slug: "the-garnet-stacking-ring",
    name: "The Garnet Stacking Ring",
    price: 240,
    color: "Red",
    gemstone: "Garnet",
    gemFamily: "Garnet",
    type: "Rings",
    metal: "Rose Gold",
    featuredRank: 11,
    addedRank: 10,
    description: "A slim band of deep red garnets, made to stack.",
  },
  {
    slug: "the-white-topaz-bracelet",
    name: "The White Topaz Bracelet",
    price: 290,
    color: "Neutral",
    gemstone: "White Topaz",
    gemFamily: "Topaz",
    type: "Bracelets",
    metal: "Sterling Silver",
    featuredRank: 12,
    addedRank: 12,
    description: "Clear white topaz on a fine chain.",
  },
];

// Filter options that actually exist in the data, in a stable order.
export const gemFamilies = Array.from(new Set(inColorProducts.map((p) => p.gemFamily))).sort();
export const metals = (["Yellow Gold", "White Gold", "Rose Gold", "Sterling Silver"] as ICMetal[]).filter((m) =>
  inColorProducts.some((p) => p.metal === m),
);

export const productImage = (slug: string) => `/images/in-color/products/${slug}.webp`;
export const wornImage = (slug: string) => `/images/in-color/products/${slug}-worn.webp`;
export const colorImage = (color: ICColor) => `/images/in-color/products/color-${color.toLowerCase()}.webp`;

export function getInColorProduct(slug: string) {
  return inColorProducts.find((p) => p.slug === slug);
}

export const formatUSD = (n: number) => `$${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
