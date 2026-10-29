// The ELANORA catalogue: every piece shown in the collection grids (Rings, Bracelets,
// Necklaces, Earrings, Shop All, The Elanora Edit) and on its product page.
//
// Products are added here by hand once their images and information are approved.
// Anything in [BRACKETS] is a placeholder that still needs real information.
//
// Images live in public/images/catalog/<slug>/, in this order:
//   01 main SKU (collection grid only) · 02 three-quarter · 03 side · 05 on-hand
// There is no 04: the setting (front-through) view was dropped from every product.
// The product page gallery shows 02, 03 and 05.
// List only the images that exist. Missing images are left out, never filled in.

// Internal product numbers live in ./productCodes.ts (kept out of the site bundle).

export type JewelryType = "Rings" | "Bracelets" | "Necklaces" | "Earrings";

// Collections are curated shopping groups that sit ON TOP of the primary category —
// they never replace it. A product has exactly one `type` (its jewelry category) and
// any number of collections, and appears on every page that lists either. Pages filter
// the same `catalog` records, so a product is never duplicated.
//   e.g. an engagement ring: type "Rings", collections ["engagement-bridal"]
//        → shown on /rings AND /engagement
export type CollectionId = "engagement-bridal";

export const COLLECTIONS: Record<CollectionId, { name: string; href: string }> = {
  "engagement-bridal": { name: "Engagement & Bridal", href: "/engagement" },
};

export interface GalleryImage {
  src: string;
  kind: "sku" | "detail" | "on-body";
}

export interface CatalogItem {
  slug: string;
  name: string; // "[PRODUCT NAME]" until confirmed
  price: number | null; // USD "from" price; null shows "From $[PRICE]"
  type: JewelryType; // primary jewelry category (Rings / Bracelets / Necklaces / Earrings)
  collections?: CollectionId[]; // curated collections the piece also belongs to
  shapeGroup?: string; // pieces that are the same design in different stone shapes (Shape selector on the product page)
  stone: string; // stone information line
  shape?: string; // diamond shape tag for the Diamond Shape filter, e.g. "Oval"
  stoneGroup: string; // filter group, e.g. "Diamond"
  metal?: string; // metal filter group, once confirmed: "Yellow Gold" | "White Gold" | "Rose Gold" | "Platinum"
  metals: string[]; // metal selector options on the product page
  defaultMetal?: string; // metal shown in the main SKU image; the product page opens on it
  sizes?: string[]; // size selector options, when the piece has sizes
  carats?: string[]; // centre-stone carat options (lab-grown), when the piece is made to a chosen size
  images: GalleryImage[]; // default (white-metal) images
  metalImages?: Record<string, GalleryImage[]>; // per-metal image sets; metals without one use `images`
  details: string[];
  materials: string[];
  rank: number; // default order
  addedRank: number; // "Newest" order
}

// Centre-stone carat weights offered on the diamond rings; every one is made to order.
export const CARATS = ["1ct", "1.5ct", "2ct", "2.5ct", "3ct", "3.5ct", "4ct", "4.5ct"];
export const CARAT_LEAD_TIME = "Made to order (8-10 wks)";

// Metal options offered on the rings.
export const RING_METALS = ["14k Yellow Gold", "14k White Gold", "14k Rose Gold", "Platinum"];

// Recoloured gallery set for one metal: three-quarter, side, on-hand.
// White Gold and Platinum use the piece's default (white metal) images.
// `v` is an optional file-version suffix (e.g. "-v2") used when a product's images are
// replaced, so browsers don't keep showing the cached old files.
const metalSet = (slug: string, tone: "yellow-gold" | "rose-gold", v = ""): GalleryImage[] => [
  { src: `/images/catalog/${slug}/02-three-quarter-${tone}${v}.webp`, kind: "detail" },
  // side profiles were re-normalized to one scale and renamed (03-profile) — no version suffix
  { src: `/images/catalog/${slug}/03-profile-${tone}.webp`, kind: "detail" },
  { src: `/images/catalog/${slug}/05-on-hand-${tone}${v}.webp`, kind: "on-body" },
];
const ringMetalImages = (slug: string, v = ""): Record<string, GalleryImage[]> => ({
  "14k Yellow Gold": metalSet(slug, "yellow-gold", v),
  "14k Rose Gold": metalSet(slug, "rose-gold", v),
});

const RING_SIZES = ["3", "3.5", "4", "4.5", "5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9"].map((s) => `US ${s}`);
const BRACELET_LENGTHS = ["6 in", "6.5 in", "7 in", "7.5 in"]; // [Lengths offered — to be confirmed]
const NECKLACE_LENGTHS = ["16 in", "18 in", "20 in"]; // [Chain lengths offered — to be confirmed]

// Necklace image set: 01-main (collection grid; 01-main-page is the same shot on the page
// colour for the product page), 02-detail close-up, 05-on-body.
const necklaceImages = (slug: string): GalleryImage[] => [
  { src: `/images/catalog/${slug}/01-main.webp`, kind: "sku" },
  { src: `/images/catalog/${slug}/01-main-page.webp`, kind: "detail" },
  { src: `/images/catalog/${slug}/02-detail.webp`, kind: "detail" },
  { src: `/images/catalog/${slug}/05-on-body.webp`, kind: "on-body" },
];
const necklaceMetalImages = (slug: string): Record<string, GalleryImage[]> =>
  Object.fromEntries(
    (["yellow-gold", "rose-gold"] as const).map((tone) => [
      tone === "yellow-gold" ? "14k Yellow Gold" : "14k Rose Gold",
      [
        { src: `/images/catalog/${slug}/01-main-page-${tone}.webp`, kind: "detail" },
        { src: `/images/catalog/${slug}/02-detail-${tone}.webp`, kind: "detail" },
        { src: `/images/catalog/${slug}/05-on-body-${tone}.webp`, kind: "on-body" },
      ] as GalleryImage[],
    ]),
  );
// Earring image set: 01-main (the pair, collection grid; 01-main-page is the same shot on the
// page colour) and 05-on-ear. Rose gold originals; yellow gold and a shared white-metal set.
// `v` versions the product-page shot (e.g. "-v2" after it was rescaled) so browsers don't keep the cached file.
const earringImages = (slug: string, v = ""): GalleryImage[] => [
  { src: `/images/catalog/${slug}/01-main.webp`, kind: "sku" },
  { src: `/images/catalog/${slug}/01-main-page${v}.webp`, kind: "detail" },
  { src: `/images/catalog/${slug}/05-on-ear.webp`, kind: "on-body" },
];
const roseEarringMetalImages = (slug: string): Record<string, GalleryImage[]> => {
  const set = (tone: string): GalleryImage[] => [
    { src: `/images/catalog/${slug}/01-main-page-${tone}.webp`, kind: "detail" },
    { src: `/images/catalog/${slug}/05-on-ear-${tone}.webp`, kind: "on-body" },
  ];
  return { "14k Yellow Gold": set("yellow-gold"), "14k White Gold": set("white"), Platinum: set("white") };
};
// For earrings photographed in white metal (platinum / white gold use the default images):
// yellow gold and rose gold each have their own set.
const whiteEarringMetalImages = (slug: string, v = ""): Record<string, GalleryImage[]> => {
  const set = (tone: string): GalleryImage[] => [
    { src: `/images/catalog/${slug}/01-main-page-${tone}${v}.webp`, kind: "detail" },
    { src: `/images/catalog/${slug}/05-on-ear-${tone}.webp`, kind: "on-body" },
  ];
  return { "14k Yellow Gold": set("yellow-gold"), "14k Rose Gold": set("rose-gold") };
};
// For necklaces photographed in rose gold: yellow gold has its own set, and white gold and
// platinum share one white-metal set.
const roseNecklaceMetalImages = (slug: string): Record<string, GalleryImage[]> => {
  const set = (tone: string): GalleryImage[] => [
    { src: `/images/catalog/${slug}/01-main-page-${tone}.webp`, kind: "detail" },
    { src: `/images/catalog/${slug}/02-detail-${tone}.webp`, kind: "detail" },
    { src: `/images/catalog/${slug}/05-on-body-${tone}.webp`, kind: "on-body" },
  ];
  return { "14k Yellow Gold": set("yellow-gold"), "14k White Gold": set("white"), Platinum: set("white") };
};

export const catalog: CatalogItem[] = [
  {
    // PRODUCT 01
    slug: "oval-three-stone-diamond-ring",
    name: "Oval Three-Stone Diamond Ring",
    price: null,
    type: "Rings",
    collections: ["engagement-bridal"],
    shape: "Oval",
    stone: "Oval diamond with two pear side diamonds. [Carat, color, clarity — to be provided]",
    stoneGroup: "Diamond",
    metals: RING_METALS,
    defaultMetal: "Platinum",
    sizes: RING_SIZES,
    carats: CARATS,
    images: [
      { src: "/images/catalog/oval-three-stone-diamond-ring/01-sku-v7.webp", kind: "sku" },
      { src: "/images/catalog/oval-three-stone-diamond-ring/02-three-quarter-v3.webp", kind: "detail" },
      { src: "/images/catalog/oval-three-stone-diamond-ring/03-profile.webp", kind: "detail" },
      { src: "/images/catalog/oval-three-stone-diamond-ring/05-on-hand-v3.webp", kind: "on-body" },
    ],
    metalImages: ringMetalImages("oval-three-stone-diamond-ring"),
    details: ["[DETAILS — to be provided]"],
    materials: ["[MATERIALS — to be provided]"],
    rank: 1,
    addedRank: 2,
  },
  {
    // PRODUCT 02
    slug: "yellow-oval-halo-diamond-ring",
    name: "Yellow Oval Halo Diamond Ring",
    price: null,
    type: "Rings",
    collections: ["engagement-bridal"],
    shape: "Oval",
    stone: "Yellow oval diamond with a white diamond halo and diamond band. [Carat, color, clarity — to be provided]",
    stoneGroup: "Diamond",
    metals: RING_METALS,
    defaultMetal: "Platinum",
    sizes: RING_SIZES,
    carats: CARATS,
    images: [
      { src: "/images/catalog/yellow-oval-halo-diamond-ring/01-sku-v8.webp", kind: "sku" },
      { src: "/images/catalog/yellow-oval-halo-diamond-ring/02-three-quarter-v5.webp", kind: "detail" },
      { src: "/images/catalog/yellow-oval-halo-diamond-ring/03-profile-v5.webp", kind: "detail" },
      { src: "/images/catalog/yellow-oval-halo-diamond-ring/05-on-hand-v5.webp", kind: "on-body" },
    ],
    // Yellow stone re-toned to match the other yellow diamonds (-v5 files).
    metalImages: Object.fromEntries(
      (["yellow-gold", "rose-gold"] as const).map((tone) => [
        tone === "yellow-gold" ? "14k Yellow Gold" : "14k Rose Gold",
        [
          { src: `/images/catalog/yellow-oval-halo-diamond-ring/02-three-quarter-${tone}-v5.webp`, kind: "detail" },
          { src: `/images/catalog/yellow-oval-halo-diamond-ring/03-profile-${tone}-v5.webp`, kind: "detail" },
          { src: `/images/catalog/yellow-oval-halo-diamond-ring/05-on-hand-${tone}-v5.webp`, kind: "on-body" },
        ] as GalleryImage[],
      ]),
    ),
    details: ["[DETAILS — to be provided]"],
    materials: ["[MATERIALS — to be provided]"],
    rank: 2,
    addedRank: 1,
  },
  {
    // PRODUCT 03
    slug: "oval-solitaire-diamond-ring",
    name: "Oval Solitaire Diamond Ring",
    price: null,
    type: "Rings",
    collections: ["engagement-bridal"],
    shapeGroup: "solitaire-diamond-ring",
    shape: "Oval",
    stone: "Oval diamond solitaire in four claws. [Carat, color, clarity — to be provided]",
    stoneGroup: "Diamond",
    metals: RING_METALS,
    defaultMetal: "Platinum",
    sizes: RING_SIZES,
    carats: CARATS,
    images: [
      { src: "/images/catalog/oval-solitaire-diamond-ring/01-sku-v3.webp", kind: "sku" },
      { src: "/images/catalog/oval-solitaire-diamond-ring/02-three-quarter.webp", kind: "detail" },
      { src: "/images/catalog/oval-solitaire-diamond-ring/03-profile.webp", kind: "detail" },
      { src: "/images/catalog/oval-solitaire-diamond-ring/05-on-hand.webp", kind: "on-body" },
    ],
    metalImages: ringMetalImages("oval-solitaire-diamond-ring"),
    details: ["[DETAILS — to be provided]"],
    materials: ["[MATERIALS — to be provided]"],
    rank: 3,
    addedRank: 0,
  },
  {
    // PRODUCT 04
    slug: "oval-pave-diamond-ring",
    name: "Oval Pavé Diamond Ring",
    price: null,
    type: "Rings",
    collections: ["engagement-bridal"],
    shape: "Oval",
    stone: "Oval diamond in four claws on a band of graduated diamonds. [Carat, color, clarity — to be provided]",
    stoneGroup: "Diamond",
    metals: RING_METALS,
    defaultMetal: "Platinum",
    sizes: RING_SIZES,
    carats: CARATS,
    images: [
      { src: "/images/catalog/oval-pave-diamond-ring/01-sku.webp", kind: "sku" },
      { src: "/images/catalog/oval-pave-diamond-ring/02-three-quarter.webp", kind: "detail" },
      { src: "/images/catalog/oval-pave-diamond-ring/03-profile.webp", kind: "detail" },
      { src: "/images/catalog/oval-pave-diamond-ring/05-on-hand.webp", kind: "on-body" },
    ],
    metalImages: ringMetalImages("oval-pave-diamond-ring"),
    details: ["[DETAILS — to be provided]"],
    materials: ["[MATERIALS — to be provided]"],
    rank: 4,
    addedRank: -1,
  },
  {
    // PRODUCT 05
    slug: "round-solitaire-diamond-ring",
    name: "Round Solitaire Diamond Ring",
    price: null,
    type: "Rings",
    collections: ["engagement-bridal"],
    shapeGroup: "solitaire-diamond-ring",
    shape: "Round",
    stone: "Round diamond solitaire in four claws. [Carat, color, clarity — to be provided]",
    stoneGroup: "Diamond",
    metals: RING_METALS,
    defaultMetal: "Platinum",
    sizes: RING_SIZES,
    carats: CARATS,
    images: [
      { src: "/images/catalog/round-solitaire-diamond-ring/01-sku.webp", kind: "sku" },
      { src: "/images/catalog/round-solitaire-diamond-ring/02-three-quarter.webp", kind: "detail" },
      { src: "/images/catalog/round-solitaire-diamond-ring/03-profile.webp", kind: "detail" },
      { src: "/images/catalog/round-solitaire-diamond-ring/05-on-hand.webp", kind: "on-body" },
    ],
    metalImages: ringMetalImages("round-solitaire-diamond-ring"),
    details: ["[DETAILS — to be provided]"],
    materials: ["[MATERIALS — to be provided]"],
    rank: 5,
    addedRank: -2,
  },
  {
    // PRODUCT 06
    slug: "round-split-pave-diamond-ring",
    name: "Round Split Pavé Diamond Ring",
    price: null,
    type: "Rings",
    collections: ["engagement-bridal"],
    shape: "Round",
    stone: "Round diamond in four claws on a split pavé band with tapered baguette shoulders. [Carat, color, clarity — to be provided]",
    stoneGroup: "Diamond",
    metals: RING_METALS,
    defaultMetal: "Platinum",
    sizes: RING_SIZES,
    carats: CARATS,
    images: [
      { src: "/images/catalog/round-split-pave-diamond-ring/01-sku.webp", kind: "sku" },
      { src: "/images/catalog/round-split-pave-diamond-ring/02-three-quarter.webp", kind: "detail" },
      { src: "/images/catalog/round-split-pave-diamond-ring/03-profile.webp", kind: "detail" },
      { src: "/images/catalog/round-split-pave-diamond-ring/05-on-hand.webp", kind: "on-body" },
    ],
    metalImages: ringMetalImages("round-split-pave-diamond-ring"),
    details: ["[DETAILS — to be provided]"],
    materials: ["[MATERIALS — to be provided]"],
    rank: 6,
    addedRank: -3,
  },
  {
    // PRODUCT 07
    slug: "round-halo-diamond-ring",
    name: "Yellow Round Halo Diamond Ring",
    price: null,
    type: "Rings",
    collections: ["engagement-bridal"],
    shape: "Round",
    stone: "Yellow round diamond in six claws with a white diamond halo, on a band set with diamonds. [Carat, color, clarity — to be provided]",
    stoneGroup: "Diamond",
    metals: RING_METALS,
    defaultMetal: "Platinum",
    sizes: RING_SIZES,
    carats: CARATS,
    images: [
      { src: "/images/catalog/round-halo-diamond-ring/01-sku-v3.webp", kind: "sku" },
      { src: "/images/catalog/round-halo-diamond-ring/02-three-quarter-v3.webp", kind: "detail" },
      { src: "/images/catalog/round-halo-diamond-ring/03-profile.webp", kind: "detail" },
      { src: "/images/catalog/round-halo-diamond-ring/05-on-hand-v3.webp", kind: "on-body" },
    ],
    metalImages: ringMetalImages("round-halo-diamond-ring", "-v3"),
    details: ["[DETAILS — to be provided]"],
    materials: ["[MATERIALS — to be provided]"],
    rank: 7,
    addedRank: -4,
  },
  {
    // PRODUCT 08
    slug: "round-pave-diamond-ring",
    name: "Round Pavé Diamond Ring",
    price: null,
    type: "Rings",
    collections: ["engagement-bridal"],
    shape: "Round",
    stone: "Round diamond in four claws on a band set with a row of diamonds. [Carat, color, clarity — to be provided]",
    stoneGroup: "Diamond",
    metals: RING_METALS,
    defaultMetal: "Platinum",
    sizes: RING_SIZES,
    carats: CARATS,
    images: [
      { src: "/images/catalog/round-pave-diamond-ring/01-sku.webp", kind: "sku" },
      { src: "/images/catalog/round-pave-diamond-ring/02-three-quarter.webp", kind: "detail" },
      { src: "/images/catalog/round-pave-diamond-ring/03-profile.webp", kind: "detail" },
      { src: "/images/catalog/round-pave-diamond-ring/05-on-hand.webp", kind: "on-body" },
    ],
    metalImages: ringMetalImages("round-pave-diamond-ring"),
    details: ["[DETAILS — to be provided]"],
    materials: ["[MATERIALS — to be provided]"],
    rank: 8,
    addedRank: -5,
  },
  {
    // PRODUCT 09
    slug: "yellow-emerald-halo-diamond-ring",
    name: "Yellow Emerald-Cut Halo Diamond Ring",
    price: null,
    type: "Rings",
    collections: ["engagement-bridal"],
    shape: "Emerald",
    stone: "Yellow emerald-cut diamond in four claws with a white diamond halo, on a fully pavé-set diamond band. [Carat, color, clarity — to be provided]",
    stoneGroup: "Diamond",
    metals: RING_METALS,
    defaultMetal: "Platinum",
    sizes: RING_SIZES,
    carats: CARATS,
    images: [
      { src: "/images/catalog/yellow-emerald-halo-diamond-ring/01-sku-v2.webp", kind: "sku" },
      { src: "/images/catalog/yellow-emerald-halo-diamond-ring/02-three-quarter.webp", kind: "detail" },
      { src: "/images/catalog/yellow-emerald-halo-diamond-ring/03-profile.webp", kind: "detail" },
      { src: "/images/catalog/yellow-emerald-halo-diamond-ring/05-on-hand.webp", kind: "on-body" },
    ],
    metalImages: ringMetalImages("yellow-emerald-halo-diamond-ring"),
    details: ["[DETAILS — to be provided]"],
    materials: ["[MATERIALS — to be provided]"],
    rank: 9,
    addedRank: -6,
  },
  {
    // PRODUCT 10
    slug: "emerald-solitaire-diamond-ring",
    name: "Emerald-Cut Solitaire Diamond Ring",
    price: null,
    type: "Rings",
    collections: ["engagement-bridal"],
    shapeGroup: "solitaire-diamond-ring",
    shape: "Emerald",
    stone: "Emerald-cut diamond solitaire in four claws. [Carat, color, clarity — to be provided]",
    stoneGroup: "Diamond",
    metals: RING_METALS,
    defaultMetal: "Platinum",
    sizes: RING_SIZES,
    carats: CARATS,
    images: [
      { src: "/images/catalog/emerald-solitaire-diamond-ring/01-sku.webp", kind: "sku" },
      { src: "/images/catalog/emerald-solitaire-diamond-ring/02-three-quarter.webp", kind: "detail" },
      { src: "/images/catalog/emerald-solitaire-diamond-ring/03-profile.webp", kind: "detail" },
      { src: "/images/catalog/emerald-solitaire-diamond-ring/05-on-hand.webp", kind: "on-body" },
    ],
    metalImages: ringMetalImages("emerald-solitaire-diamond-ring"),
    details: ["[DETAILS — to be provided]"],
    materials: ["[MATERIALS — to be provided]"],
    rank: 10,
    addedRank: -7,
  },
  {
    // PRODUCT 11
    slug: "emerald-bezel-diamond-ring",
    name: "Emerald-Cut Bezel Diamond Ring",
    price: null,
    type: "Rings",
    collections: ["engagement-bridal"],
    shape: "Emerald",
    stone: "Emerald-cut diamond in a fully enclosed bezel on a slim plain band. [Carat, color, clarity — to be provided]",
    stoneGroup: "Diamond",
    metals: RING_METALS,
    defaultMetal: "14k Yellow Gold", // main SKU photo is yellow gold; the detail views below are the white-metal set
    sizes: RING_SIZES,
    carats: CARATS,
    images: [
      { src: "/images/catalog/emerald-bezel-diamond-ring/01-sku-v2.webp", kind: "sku" },
      { src: "/images/catalog/emerald-bezel-diamond-ring/02-three-quarter.webp", kind: "detail" },
      { src: "/images/catalog/emerald-bezel-diamond-ring/03-profile.webp", kind: "detail" },
      { src: "/images/catalog/emerald-bezel-diamond-ring/05-on-hand.webp", kind: "on-body" },
    ],
    metalImages: ringMetalImages("emerald-bezel-diamond-ring"),
    details: ["[DETAILS — to be provided]"],
    materials: ["[MATERIALS — to be provided]"],
    rank: 11,
    addedRank: -8,
  },
  {
    // PRODUCT 12
    slug: "emerald-split-pave-diamond-ring",
    name: "Emerald-Cut Split Pavé Diamond Ring",
    price: null,
    type: "Rings",
    collections: ["engagement-bridal"],
    shape: "Emerald",
    stone: "Emerald-cut diamond in four claws with a hidden diamond halo, on a split pavé band. [Carat, color, clarity — to be provided]",
    stoneGroup: "Diamond",
    metals: RING_METALS,
    defaultMetal: "Platinum",
    sizes: RING_SIZES,
    carats: CARATS,
    images: [
      { src: "/images/catalog/emerald-split-pave-diamond-ring/01-sku.webp", kind: "sku" },
      { src: "/images/catalog/emerald-split-pave-diamond-ring/02-three-quarter.webp", kind: "detail" },
      { src: "/images/catalog/emerald-split-pave-diamond-ring/03-profile.webp", kind: "detail" },
      { src: "/images/catalog/emerald-split-pave-diamond-ring/05-on-hand.webp", kind: "on-body" },
    ],
    metalImages: ringMetalImages("emerald-split-pave-diamond-ring"),
    details: ["[DETAILS — to be provided]"],
    materials: ["[MATERIALS — to be provided]"],
    rank: 12,
    addedRank: -9,
  },
  {
    // PRODUCT 13
    slug: "yellow-pear-halo-diamond-ring",
    name: "Yellow Pear Halo Diamond Ring",
    price: null,
    type: "Rings",
    collections: ["engagement-bridal"],
    shape: "Pear",
    stone: "Yellow pear-shaped diamond in yellow gold claws with a white diamond halo, on a diamond-set band. [Carat, color, clarity — to be provided]",
    stoneGroup: "Diamond",
    metals: RING_METALS,
    defaultMetal: "Platinum",
    sizes: RING_SIZES,
    carats: CARATS,
    images: [
      { src: "/images/catalog/yellow-pear-halo-diamond-ring/01-sku.webp", kind: "sku" },
      // 02 re-made (-v2): the old three-quarter had the pear lying along the band and oversized halo stones
      { src: "/images/catalog/yellow-pear-halo-diamond-ring/02-three-quarter-v2.webp", kind: "detail" },
      { src: "/images/catalog/yellow-pear-halo-diamond-ring/03-profile.webp", kind: "detail" },
      { src: "/images/catalog/yellow-pear-halo-diamond-ring/05-on-hand.webp", kind: "on-body" },
    ],
    metalImages: ringMetalImages("yellow-pear-halo-diamond-ring", "-v2"),
    details: ["[DETAILS — to be provided]"],
    materials: ["[MATERIALS — to be provided]"],
    rank: 13,
    addedRank: -10,
  },
  {
    // PRODUCT 14
    slug: "pear-three-stone-diamond-ring",
    name: "Pear Three-Stone Diamond Ring",
    price: null,
    type: "Rings",
    collections: ["engagement-bridal"],
    shape: "Pear",
    stone: "Pear diamond with two pear side diamonds. [Carat, color, clarity — to be provided]",
    stoneGroup: "Diamond",
    metals: RING_METALS,
    defaultMetal: "Platinum",
    sizes: RING_SIZES,
    carats: CARATS,
    images: [
      { src: "/images/catalog/pear-three-stone-diamond-ring/01-sku-v2.webp", kind: "sku" },
      { src: "/images/catalog/pear-three-stone-diamond-ring/02-three-quarter.webp", kind: "detail" },
      { src: "/images/catalog/pear-three-stone-diamond-ring/03-profile.webp", kind: "detail" },
      { src: "/images/catalog/pear-three-stone-diamond-ring/05-on-hand.webp", kind: "on-body" },
    ],
    metalImages: ringMetalImages("pear-three-stone-diamond-ring"),
    details: ["[DETAILS — to be provided]"],
    materials: ["[MATERIALS — to be provided]"],
    rank: 14,
    addedRank: -11,
  },
  {
    // PRODUCT 15
    slug: "pear-split-pave-diamond-ring",
    name: "Pear Split Pavé Diamond Ring",
    price: null,
    type: "Rings",
    collections: ["engagement-bridal"],
    shape: "Pear",
    stone: "Pear-shaped diamond in three claws on a split band set with diamonds. [Carat, color, clarity — to be provided]",
    stoneGroup: "Diamond",
    metals: RING_METALS,
    defaultMetal: "Platinum",
    sizes: RING_SIZES,
    carats: CARATS,
    images: [
      { src: "/images/catalog/pear-split-pave-diamond-ring/01-sku.webp", kind: "sku" },
      { src: "/images/catalog/pear-split-pave-diamond-ring/02-three-quarter-v2.webp", kind: "detail" },
      { src: "/images/catalog/pear-split-pave-diamond-ring/03-profile.webp", kind: "detail" },
      { src: "/images/catalog/pear-split-pave-diamond-ring/05-on-hand.webp", kind: "on-body" },
    ],
    metalImages: ringMetalImages("pear-split-pave-diamond-ring", "-v2"),
    details: ["[DETAILS — to be provided]"],
    materials: ["[MATERIALS — to be provided]"],
    rank: 15,
    addedRank: -12,
  },
  {
    // PRODUCT 16
    slug: "pear-solitaire-diamond-ring",
    name: "Pear Solitaire Diamond Ring",
    price: null,
    type: "Rings",
    collections: ["engagement-bridal"],
    shapeGroup: "solitaire-diamond-ring",
    shape: "Pear",
    stone: "Pear diamond solitaire in three claws on a tapered band. [Carat, color, clarity — to be provided]",
    stoneGroup: "Diamond",
    metals: RING_METALS,
    defaultMetal: "Platinum",
    sizes: RING_SIZES,
    carats: CARATS,
    images: [
      { src: "/images/catalog/pear-solitaire-diamond-ring/01-sku-v2.webp", kind: "sku" },
      { src: "/images/catalog/pear-solitaire-diamond-ring/02-three-quarter.webp", kind: "detail" },
      { src: "/images/catalog/pear-solitaire-diamond-ring/03-profile.webp", kind: "detail" },
      { src: "/images/catalog/pear-solitaire-diamond-ring/05-on-hand.webp", kind: "on-body" },
    ],
    metalImages: ringMetalImages("pear-solitaire-diamond-ring"),
    details: ["[DETAILS — to be provided]"],
    materials: ["[MATERIALS — to be provided]"],
    rank: 16,
    addedRank: -13,
  },
  {
    // PRODUCT 17 — first bracelet. Bracelets have three images: main, worn by a woman, worn by a man.
    slug: "round-diamond-tennis-bracelet",
    name: "Round Diamond Tennis Bracelet",
    price: null,
    type: "Bracelets",
    stone: "A continuous line of round diamonds, each in its own four-claw setting, with a hidden clasp. [Total carat, color, clarity — to be provided]",
    stoneGroup: "Diamond",
    metals: RING_METALS,
    defaultMetal: "Platinum",
    sizes: BRACELET_LENGTHS,
    images: [
      { src: "/images/catalog/round-diamond-tennis-bracelet/01-sku.webp", kind: "sku" },
      // the main image also opens the product page gallery (no separate studio views)
      { src: "/images/catalog/round-diamond-tennis-bracelet/01-sku.webp", kind: "detail" },
      { src: "/images/catalog/round-diamond-tennis-bracelet/05-on-body-women.webp", kind: "on-body" },
      { src: "/images/catalog/round-diamond-tennis-bracelet/06-on-body-men.webp", kind: "on-body" },
    ],
    metalImages: Object.fromEntries(
      (["yellow-gold", "rose-gold"] as const).map((tone) => [
        tone === "yellow-gold" ? "14k Yellow Gold" : "14k Rose Gold",
        [
          { src: `/images/catalog/round-diamond-tennis-bracelet/01-sku-${tone}.webp`, kind: "detail" },
          { src: `/images/catalog/round-diamond-tennis-bracelet/05-on-body-women-${tone}.webp`, kind: "on-body" },
          { src: `/images/catalog/round-diamond-tennis-bracelet/06-on-body-men-${tone}.webp`, kind: "on-body" },
        ] as GalleryImage[],
      ]),
    ),
    details: ["[DETAILS — to be provided]"],
    materials: ["[MATERIALS — to be provided]"],
    rank: 17,
    addedRank: -14,
  },
  {
    // PRODUCT 18
    slug: "pear-diamond-line-bracelet",
    name: "Pear Diamond Line Bracelet",
    price: null,
    type: "Bracelets",
    stone: "A line of pear-shaped diamonds, each in a fine three-claw setting, with a hidden clasp. [Total carat, color, clarity — to be provided]",
    stoneGroup: "Diamond",
    metals: RING_METALS,
    defaultMetal: "Platinum",
    sizes: BRACELET_LENGTHS,
    images: [
      { src: "/images/catalog/pear-diamond-line-bracelet/01-sku.webp", kind: "sku" },
      { src: "/images/catalog/pear-diamond-line-bracelet/01-sku.webp", kind: "detail" },
      { src: "/images/catalog/pear-diamond-line-bracelet/05-on-body-women.webp", kind: "on-body" },
      { src: "/images/catalog/pear-diamond-line-bracelet/06-on-body-men.webp", kind: "on-body" },
    ],
    metalImages: Object.fromEntries(
      (["yellow-gold", "rose-gold"] as const).map((tone) => [
        tone === "yellow-gold" ? "14k Yellow Gold" : "14k Rose Gold",
        [
          { src: `/images/catalog/pear-diamond-line-bracelet/01-sku-${tone}.webp`, kind: "detail" },
          { src: `/images/catalog/pear-diamond-line-bracelet/05-on-body-women-${tone}.webp`, kind: "on-body" },
          { src: `/images/catalog/pear-diamond-line-bracelet/06-on-body-men-${tone}.webp`, kind: "on-body" },
        ] as GalleryImage[],
      ]),
    ),
    details: ["[DETAILS — to be provided]"],
    materials: ["[MATERIALS — to be provided]"],
    rank: 18,
    addedRank: -15,
  },
  {
    // PRODUCT 19 — first necklace. Necklaces have three images: main, detail, worn.
    slug: "emerald-solitaire-diamond-necklace",
    name: "Emerald-Cut Solitaire Diamond Necklace",
    price: null,
    type: "Necklaces",
    shapeGroup: "solitaire-diamond-necklace",
    shape: "Emerald",
    stone: "Emerald-cut diamond in four claws, on a fine cable chain. [Carat, color, clarity — to be provided]",
    stoneGroup: "Diamond",
    metals: RING_METALS,
    defaultMetal: "Platinum",
    sizes: NECKLACE_LENGTHS,
    images: [
      { src: "/images/catalog/emerald-solitaire-diamond-necklace/01-main.webp", kind: "sku" },
      // the main image also opens the product page gallery (copy on the page colour)
      { src: "/images/catalog/emerald-solitaire-diamond-necklace/01-main-page.webp", kind: "detail" },
      { src: "/images/catalog/emerald-solitaire-diamond-necklace/02-detail.webp", kind: "detail" },
      { src: "/images/catalog/emerald-solitaire-diamond-necklace/05-on-body.webp", kind: "on-body" },
    ],
    metalImages: Object.fromEntries(
      (["yellow-gold", "rose-gold"] as const).map((tone) => [
        tone === "yellow-gold" ? "14k Yellow Gold" : "14k Rose Gold",
        [
          { src: `/images/catalog/emerald-solitaire-diamond-necklace/01-main-page-${tone}.webp`, kind: "detail" },
          { src: `/images/catalog/emerald-solitaire-diamond-necklace/02-detail-${tone}.webp`, kind: "detail" },
          { src: `/images/catalog/emerald-solitaire-diamond-necklace/05-on-body-${tone}.webp`, kind: "on-body" },
        ] as GalleryImage[],
      ]),
    ),
    details: ["[DETAILS — to be provided]"],
    materials: ["[MATERIALS — to be provided]"],
    rank: 19,
    addedRank: -16,
  },
  {
    // PRODUCT 20 — same pendant as 019, round stone
    slug: "round-solitaire-diamond-necklace",
    name: "Round Solitaire Diamond Necklace",
    price: null,
    type: "Necklaces",
    shapeGroup: "solitaire-diamond-necklace",
    shape: "Round",
    stone: "Round brilliant diamond in four claws, on a fine cable chain. [Carat, color, clarity — to be provided]",
    stoneGroup: "Diamond",
    metals: RING_METALS,
    defaultMetal: "Platinum",
    sizes: NECKLACE_LENGTHS,
    images: necklaceImages("round-solitaire-diamond-necklace"),
    metalImages: necklaceMetalImages("round-solitaire-diamond-necklace"),
    details: ["[DETAILS — to be provided]"],
    materials: ["[MATERIALS — to be provided]"],
    rank: 20,
    addedRank: -17,
  },
  {
    // PRODUCT 21 — same pendant as 019, oval stone
    slug: "oval-solitaire-diamond-necklace",
    name: "Oval Solitaire Diamond Necklace",
    price: null,
    type: "Necklaces",
    shapeGroup: "solitaire-diamond-necklace",
    shape: "Oval",
    stone: "Oval diamond in four claws, on a fine cable chain. [Carat, color, clarity — to be provided]",
    stoneGroup: "Diamond",
    metals: RING_METALS,
    defaultMetal: "Platinum",
    sizes: NECKLACE_LENGTHS,
    images: necklaceImages("oval-solitaire-diamond-necklace"),
    metalImages: necklaceMetalImages("oval-solitaire-diamond-necklace"),
    details: ["[DETAILS — to be provided]"],
    materials: ["[MATERIALS — to be provided]"],
    rank: 21,
    addedRank: -18,
  },
  {
    // PRODUCT 22 — same pendant as 019, pear stone
    slug: "pear-solitaire-diamond-necklace",
    name: "Pear-Shaped Solitaire Diamond Necklace",
    price: null,
    type: "Necklaces",
    shapeGroup: "solitaire-diamond-necklace",
    shape: "Pear",
    stone: "Pear-shaped diamond in three claws, on a fine cable chain. [Carat, color, clarity — to be provided]",
    stoneGroup: "Diamond",
    metals: RING_METALS,
    defaultMetal: "Platinum",
    sizes: NECKLACE_LENGTHS,
    images: necklaceImages("pear-solitaire-diamond-necklace"),
    metalImages: necklaceMetalImages("pear-solitaire-diamond-necklace"),
    details: ["[DETAILS — to be provided]"],
    materials: ["[MATERIALS — to be provided]"],
    rank: 22,
    addedRank: -19,
  },
  {
    // PRODUCT 23 — same pendant as 019, heart stone
    slug: "heart-solitaire-diamond-necklace",
    name: "Heart-Shaped Solitaire Diamond Necklace",
    price: null,
    type: "Necklaces",
    shapeGroup: "solitaire-diamond-necklace",
    shape: "Heart",
    stone: "Heart-shaped diamond in three claws, on a fine cable chain. [Carat, color, clarity — to be provided]",
    stoneGroup: "Diamond",
    metals: RING_METALS,
    defaultMetal: "Platinum",
    sizes: NECKLACE_LENGTHS,
    images: necklaceImages("heart-solitaire-diamond-necklace"),
    metalImages: necklaceMetalImages("heart-solitaire-diamond-necklace"),
    details: ["[DETAILS — to be provided]"],
    materials: ["[MATERIALS — to be provided]"],
    rank: 23,
    addedRank: -20,
  },
  {
    // PRODUCT 24 — angel wings in pavé with a pink pear drop (024 and 025 share the design)
    slug: "pink-diamond-angel-wing-necklace",
    name: "Pink Diamond Angel Wing Necklace",
    price: null,
    type: "Necklaces",
    shape: "Pear",
    stone: "Pink pear-shaped diamond drop under a round diamond, with pavé-set diamond wings. [Carat, color, clarity — to be provided]",
    stoneGroup: "Diamond",
    metals: RING_METALS,
    defaultMetal: "14k Rose Gold",
    sizes: NECKLACE_LENGTHS,
    images: necklaceImages("pink-diamond-angel-wing-necklace"),
    metalImages: roseNecklaceMetalImages("pink-diamond-angel-wing-necklace"),
    details: ["[DETAILS — to be provided]"],
    materials: ["[MATERIALS — to be provided]"],
    rank: 24,
    addedRank: -21,
  },
  {
    // PRODUCT 25 — angel wings in pavé with a canary yellow pear drop (024 and 025 share the design)
    slug: "yellow-diamond-angel-wing-necklace",
    name: "Yellow Diamond Angel Wing Necklace",
    price: null,
    type: "Necklaces",
    shape: "Pear",
    stone: "Yellow pear-shaped diamond drop under a round diamond, with pavé-set diamond wings. [Carat, color, clarity — to be provided]",
    stoneGroup: "Diamond",
    metals: RING_METALS,
    // Main image is yellow gold; the rose gold shots are kept as the Rose Gold set.
    defaultMetal: "14k Yellow Gold",
    sizes: NECKLACE_LENGTHS,
    images: [
      { src: "/images/catalog/yellow-diamond-angel-wing-necklace/01-main-yellow-gold.webp", kind: "sku" },
      { src: "/images/catalog/yellow-diamond-angel-wing-necklace/01-main-page-yellow-gold.webp", kind: "detail" },
      { src: "/images/catalog/yellow-diamond-angel-wing-necklace/02-detail-yellow-gold.webp", kind: "detail" },
      { src: "/images/catalog/yellow-diamond-angel-wing-necklace/05-on-body-yellow-gold.webp", kind: "on-body" },
    ],
    metalImages: {
      ...roseNecklaceMetalImages("yellow-diamond-angel-wing-necklace"),
      "14k Rose Gold": necklaceImages("yellow-diamond-angel-wing-necklace"),
    },
    details: ["[DETAILS — to be provided]"],
    materials: ["[MATERIALS — to be provided]"],
    rank: 25,
    addedRank: -22,
  },
  {
    // PRODUCT 27 — designed by ELANORA (no reference supplied)
    slug: "heart-diamond-tennis-bracelet",
    name: "Heart Diamond Tennis Bracelet",
    price: null,
    type: "Bracelets",
    stone: "A continuous line of heart-shaped diamonds, each in a three-claw setting, with a hidden clasp. [Total carat, color, clarity — to be provided]",
    stoneGroup: "Diamond",
    metals: RING_METALS,
    defaultMetal: "Platinum",
    sizes: BRACELET_LENGTHS,
    images: [
      { src: "/images/catalog/heart-diamond-tennis-bracelet/01-sku-v2.webp", kind: "sku" },
      { src: "/images/catalog/heart-diamond-tennis-bracelet/01-sku-v2.webp", kind: "detail" },
      { src: "/images/catalog/heart-diamond-tennis-bracelet/05-on-body-women-v2.webp", kind: "on-body" },
      { src: "/images/catalog/heart-diamond-tennis-bracelet/06-on-body-men-v2.webp", kind: "on-body" },
    ],
    metalImages: Object.fromEntries(
      (["yellow-gold", "rose-gold"] as const).map((tone) => [
        tone === "yellow-gold" ? "14k Yellow Gold" : "14k Rose Gold",
        [
          { src: `/images/catalog/heart-diamond-tennis-bracelet/01-sku-${tone}-v2.webp`, kind: "detail" },
          { src: `/images/catalog/heart-diamond-tennis-bracelet/05-on-body-women-${tone}-v2.webp`, kind: "on-body" },
          { src: `/images/catalog/heart-diamond-tennis-bracelet/06-on-body-men-${tone}-v2.webp`, kind: "on-body" },
        ] as GalleryImage[],
      ]),
    ),
    details: ["[DETAILS — to be provided]"],
    materials: ["[MATERIALS — to be provided]"],
    rank: 27,
    addedRank: -24,
  },
  {
    // PRODUCT 28 — first earring. Earrings have two images: main (the pair) and worn on the ear.
    slug: "marquise-diamond-ear-climber",
    name: "Marquise Diamond Ear Climber",
    price: null,
    type: "Earrings",
    shape: "Marquise",
    stone: "Six graduated marquise diamonds in a rising leaf-shaped line, each in a claw setting, with a slim bar that sits along the ear. Sold as a pair. [Total carat, color, clarity — to be provided]",
    stoneGroup: "Diamond",
    metals: ["14k White Gold"], // [Metal options — to be confirmed]
    defaultMetal: "14k White Gold",
    images: [
      { src: "/images/catalog/marquise-diamond-ear-climber/01-sku.webp", kind: "sku" },
      { src: "/images/catalog/marquise-diamond-ear-climber/01-sku.webp", kind: "detail" },
      { src: "/images/catalog/marquise-diamond-ear-climber/05-on-ear.webp", kind: "on-body" },
    ],
    details: ["[DETAILS — to be provided]"],
    materials: ["[MATERIALS — to be provided]"],
    rank: 28,
    addedRank: -25,
  },
  {
    // PRODUCT 29 — angel wing stud earrings, pink pear drop (matches necklaces 024/025)
    slug: "pink-diamond-angel-wing-stud-earrings",
    name: "Pink Diamond Angel Wing Stud Earrings",
    price: null,
    type: "Earrings",
    shape: "Pear",
    stone: "Pavé-set diamond wings with a round diamond at the centre and a pink pear-shaped diamond drop. Sold as a pair. [Carat, color, clarity — to be provided]",
    stoneGroup: "Diamond",
    metals: RING_METALS,
    defaultMetal: "14k Rose Gold",
    images: earringImages("pink-diamond-angel-wing-stud-earrings"),
    metalImages: roseEarringMetalImages("pink-diamond-angel-wing-stud-earrings"),
    details: ["[DETAILS — to be provided]"],
    materials: ["[MATERIALS — to be provided]"],
    rank: 29,
    addedRank: -26,
  },
  {
    // PRODUCT 30 — angel wing drop earrings, pink pear drop (matches necklaces 024/025)
    slug: "pink-diamond-angel-wing-drop-earrings",
    name: "Pink Diamond Angel Wing Drop Earrings",
    price: null,
    type: "Earrings",
    shape: "Pear",
    stone: "A round diamond stud and a bezel-set diamond on a fine chain, leading to pavé-set diamond wings with a pink pear-shaped diamond drop. Sold as a pair. [Carat, color, clarity — to be provided]",
    stoneGroup: "Diamond",
    metals: RING_METALS,
    defaultMetal: "14k Rose Gold",
    images: earringImages("pink-diamond-angel-wing-drop-earrings"),
    metalImages: roseEarringMetalImages("pink-diamond-angel-wing-drop-earrings"),
    details: ["[DETAILS — to be provided]"],
    materials: ["[MATERIALS — to be provided]"],
    rank: 30,
    addedRank: -27,
  },
  {
    // PRODUCT 31 — angel wing stud earrings, canary yellow pear drop (matches necklaces 024/025)
    slug: "yellow-diamond-angel-wing-stud-earrings",
    name: "Yellow Diamond Angel Wing Stud Earrings",
    price: null,
    type: "Earrings",
    shape: "Pear",
    stone: "Pavé-set diamond wings with a round diamond at the centre and a canary yellow pear-shaped diamond drop. Sold as a pair. [Carat, color, clarity — to be provided]",
    stoneGroup: "Diamond",
    metals: RING_METALS,
    defaultMetal: "14k Rose Gold",
    images: earringImages("yellow-diamond-angel-wing-stud-earrings"),
    metalImages: roseEarringMetalImages("yellow-diamond-angel-wing-stud-earrings"),
    details: ["[DETAILS — to be provided]"],
    materials: ["[MATERIALS — to be provided]"],
    rank: 31,
    addedRank: -28,
  },
  {
    // PRODUCT 32 — angel wing drop earrings, canary yellow pear drop (matches necklaces 024/025)
    slug: "yellow-diamond-angel-wing-drop-earrings",
    name: "Yellow Diamond Angel Wing Drop Earrings",
    price: null,
    type: "Earrings",
    shape: "Pear",
    stone: "A round diamond stud and a bezel-set diamond on a fine chain, leading to pavé-set diamond wings with a canary yellow pear-shaped diamond drop. Sold as a pair. [Carat, color, clarity — to be provided]",
    stoneGroup: "Diamond",
    metals: RING_METALS,
    defaultMetal: "14k Rose Gold",
    images: earringImages("yellow-diamond-angel-wing-drop-earrings"),
    metalImages: roseEarringMetalImages("yellow-diamond-angel-wing-drop-earrings"),
    details: ["[DETAILS — to be provided]"],
    materials: ["[MATERIALS — to be provided]"],
    rank: 32,
    addedRank: -29,
  },
  {
    // PRODUCT 33 — halo stud earrings (emerald, oval, round, pear, heart: one family)
    slug: "emerald-halo-diamond-stud-earrings",
    name: "Emerald-Cut Halo Diamond Stud Earrings",
    price: null,
    type: "Earrings",
    shape: "Emerald",
    stone: "Emerald-cut diamonds in four claws, each framed by a halo of round diamonds. Sold as a pair. [Carat, color, clarity — to be provided]",
    stoneGroup: "Diamond",
    metals: RING_METALS,
    defaultMetal: "Platinum",
    images: earringImages("emerald-halo-diamond-stud-earrings", "-v2"),
    metalImages: whiteEarringMetalImages("emerald-halo-diamond-stud-earrings", "-v2"),
    details: ["[DETAILS — to be provided]"],
    materials: ["[MATERIALS — to be provided]"],
    rank: 33,
    addedRank: -30,
  },
  {
    // PRODUCT 34 — halo stud earrings (same family as the emerald-cut halo studs)
    slug: "oval-halo-diamond-stud-earrings",
    name: "Oval Halo Diamond Stud Earrings",
    price: null,
    type: "Earrings",
    shape: "Oval",
    stone: "Oval diamonds in four claws, each framed by an oval halo of round diamonds. Sold as a pair. [Carat, color, clarity — to be provided]",
    stoneGroup: "Diamond",
    metals: RING_METALS,
    defaultMetal: "Platinum",
    images: earringImages("oval-halo-diamond-stud-earrings", "-v2"),
    metalImages: whiteEarringMetalImages("oval-halo-diamond-stud-earrings", "-v2"),
    details: ["[DETAILS — to be provided]"],
    materials: ["[MATERIALS — to be provided]"],
    rank: 34,
    addedRank: -31,
  },
  {
    // PRODUCT 35 — halo stud earrings (same family as the emerald-cut halo studs)
    slug: "round-halo-diamond-stud-earrings",
    name: "Round Halo Diamond Stud Earrings",
    price: null,
    type: "Earrings",
    shape: "Round",
    stone: "Round diamonds in four claws, each framed by a halo of round diamonds. Sold as a pair. [Carat, color, clarity — to be provided]",
    stoneGroup: "Diamond",
    metals: RING_METALS,
    defaultMetal: "Platinum",
    images: earringImages("round-halo-diamond-stud-earrings", "-v2"),
    metalImages: whiteEarringMetalImages("round-halo-diamond-stud-earrings", "-v2"),
    details: ["[DETAILS — to be provided]"],
    materials: ["[MATERIALS — to be provided]"],
    rank: 35,
    addedRank: -32,
  },
  {
    // PRODUCT 36 — halo stud earrings (same family as the emerald-cut halo studs)
    slug: "pear-halo-diamond-stud-earrings",
    name: "Pear Halo Diamond Stud Earrings",
    price: null,
    type: "Earrings",
    shape: "Pear",
    stone: "Pear-shaped diamonds in claw settings, each framed by a teardrop halo of round diamonds. Sold as a pair. [Carat, color, clarity — to be provided]",
    stoneGroup: "Diamond",
    metals: RING_METALS,
    defaultMetal: "Platinum",
    images: earringImages("pear-halo-diamond-stud-earrings", "-v2"),
    metalImages: whiteEarringMetalImages("pear-halo-diamond-stud-earrings", "-v2"),
    details: ["[DETAILS — to be provided]"],
    materials: ["[MATERIALS — to be provided]"],
    rank: 36,
    addedRank: -33,
  },
  {
    // PRODUCT 37 — halo stud earrings (same family as the emerald-cut halo studs)
    slug: "heart-halo-diamond-stud-earrings",
    name: "Heart Halo Diamond Stud Earrings",
    price: null,
    type: "Earrings",
    shape: "Heart",
    stone: "Heart-shaped diamonds in three claws, each framed by a heart-shaped halo of round diamonds. Sold as a pair. [Carat, color, clarity — to be provided]",
    stoneGroup: "Diamond",
    metals: RING_METALS,
    defaultMetal: "Platinum",
    images: earringImages("heart-halo-diamond-stud-earrings", "-v2"),
    metalImages: whiteEarringMetalImages("heart-halo-diamond-stud-earrings", "-v2"),
    details: ["[DETAILS — to be provided]"],
    materials: ["[MATERIALS — to be provided]"],
    rank: 37,
    addedRank: -34,
  },
  {
    // PRODUCT 38 — yellow-centre version of the pear halo studs
    slug: "yellow-pear-halo-diamond-stud-earrings",
    name: "Yellow Pear Halo Diamond Stud Earrings",
    price: null,
    type: "Earrings",
    shape: "Pear",
    stone: "Canary yellow pear-shaped diamonds in yellow gold claws, each framed by a teardrop halo of white round diamonds. Sold as a pair. [Carat, color, clarity — to be provided]",
    stoneGroup: "Diamond",
    metals: RING_METALS,
    defaultMetal: "Platinum",
    images: earringImages("yellow-pear-halo-diamond-stud-earrings"),
    metalImages: whiteEarringMetalImages("yellow-pear-halo-diamond-stud-earrings"),
    details: ["[DETAILS — to be provided]"],
    materials: ["[MATERIALS — to be provided]"],
    rank: 38,
    addedRank: -35,
  },
  {
    // PRODUCT 39 — yellow-centre version of the heart halo studs
    slug: "yellow-heart-halo-diamond-stud-earrings",
    name: "Yellow Heart Halo Diamond Stud Earrings",
    price: null,
    type: "Earrings",
    shape: "Heart",
    stone: "Canary yellow heart-shaped diamonds in yellow gold claws, each framed by a heart-shaped halo of white round diamonds. Sold as a pair. [Carat, color, clarity — to be provided]",
    stoneGroup: "Diamond",
    metals: RING_METALS,
    defaultMetal: "Platinum",
    images: earringImages("yellow-heart-halo-diamond-stud-earrings"),
    metalImages: whiteEarringMetalImages("yellow-heart-halo-diamond-stud-earrings"),
    details: ["[DETAILS — to be provided]"],
    materials: ["[MATERIALS — to be provided]"],
    rank: 39,
    addedRank: -36,
  },
  {
    // PRODUCT 40 — halo pendant necklace (user reference)
    slug: "emerald-halo-diamond-necklace",
    name: "Emerald-Cut Halo Diamond Necklace",
    price: null,
    type: "Necklaces",
    shapeGroup: "halo-diamond-necklace",
    shape: "Emerald",
    stone: "Emerald-cut diamond in four claws, framed by a halo of round diamonds; the chain attaches to the halo. [Carat, color, clarity — to be provided]",
    stoneGroup: "Diamond",
    metals: RING_METALS,
    defaultMetal: "Platinum",
    sizes: NECKLACE_LENGTHS,
    images: necklaceImages("emerald-halo-diamond-necklace"),
    metalImages: necklaceMetalImages("emerald-halo-diamond-necklace"),
    details: ["[DETAILS — to be provided]"],
    materials: ["[MATERIALS — to be provided]"],
    rank: 40,
    addedRank: -37,
  },
  {
    // PRODUCT 41 — halo pendant necklace (same design as 040, oval stone)
    slug: "oval-halo-diamond-necklace",
    name: "Oval Halo Diamond Necklace",
    price: null,
    type: "Necklaces",
    shapeGroup: "halo-diamond-necklace",
    shape: "Oval",
    stone: "Oval diamond in four claws, framed by an oval halo of round diamonds; the chain attaches to the halo. [Carat, color, clarity — to be provided]",
    stoneGroup: "Diamond",
    metals: RING_METALS,
    defaultMetal: "Platinum",
    sizes: NECKLACE_LENGTHS,
    images: necklaceImages("oval-halo-diamond-necklace"),
    metalImages: necklaceMetalImages("oval-halo-diamond-necklace"),
    details: ["[DETAILS — to be provided]"],
    materials: ["[MATERIALS — to be provided]"],
    rank: 41,
    addedRank: -38,
  },
  {
    // PRODUCT 42 — halo pendant necklace (same design as 040, round stone)
    slug: "round-halo-diamond-necklace",
    name: "Round Halo Diamond Necklace",
    price: null,
    type: "Necklaces",
    shapeGroup: "halo-diamond-necklace",
    shape: "Round",
    stone: "Round brilliant diamond in four claws, framed by a round halo of round diamonds; the chain attaches to the halo. [Carat, color, clarity — to be provided]",
    stoneGroup: "Diamond",
    metals: RING_METALS,
    defaultMetal: "Platinum",
    sizes: NECKLACE_LENGTHS,
    images: necklaceImages("round-halo-diamond-necklace"),
    metalImages: necklaceMetalImages("round-halo-diamond-necklace"),
    details: ["[DETAILS — to be provided]"],
    materials: ["[MATERIALS — to be provided]"],
    rank: 42,
    addedRank: -39,
  },
  {
    // PRODUCT 43 — halo pendant necklace (same design as 040, pear stone)
    slug: "pear-halo-diamond-necklace",
    name: "Pear-Shaped Halo Diamond Necklace",
    price: null,
    type: "Necklaces",
    shapeGroup: "halo-diamond-necklace",
    shape: "Pear",
    stone: "Pear-shaped diamond, framed by a pear-shaped halo of round diamonds; the chain attaches to the halo. [Carat, color, clarity — to be provided]",
    stoneGroup: "Diamond",
    metals: RING_METALS,
    defaultMetal: "Platinum",
    sizes: NECKLACE_LENGTHS,
    images: necklaceImages("pear-halo-diamond-necklace"),
    metalImages: necklaceMetalImages("pear-halo-diamond-necklace"),
    details: ["[DETAILS — to be provided]"],
    materials: ["[MATERIALS — to be provided]"],
    rank: 43,
    addedRank: -40,
  },
  {
    // PRODUCT 44 — halo pendant necklace (same design as 040, heart stone)
    slug: "heart-halo-diamond-necklace",
    name: "Heart-Shaped Halo Diamond Necklace",
    price: null,
    type: "Necklaces",
    shapeGroup: "halo-diamond-necklace",
    shape: "Heart",
    stone: "Heart-shaped diamond, framed by a heart-shaped halo of round diamonds; the chain attaches to the halo. [Carat, color, clarity — to be provided]",
    stoneGroup: "Diamond",
    metals: RING_METALS,
    defaultMetal: "Platinum",
    sizes: NECKLACE_LENGTHS,
    images: necklaceImages("heart-halo-diamond-necklace"),
    metalImages: necklaceMetalImages("heart-halo-diamond-necklace"),
    details: ["[DETAILS — to be provided]"],
    materials: ["[MATERIALS — to be provided]"],
    rank: 44,
    addedRank: -41,
  },
  {
    // PRODUCT 45 — round diamond tennis bracelet with east-west emerald cuts at intervals
    slug: "round-emerald-diamond-tennis-bracelet",
    name: "Round and Emerald-Cut Diamond Tennis Bracelet",
    price: null,
    type: "Bracelets",
    stone: "A line of round diamonds in four-claw settings, with an emerald-cut diamond set east-west at regular intervals, and a hidden clasp. [Total carat, color, clarity — to be provided]",
    stoneGroup: "Diamond",
    metals: RING_METALS,
    defaultMetal: "Platinum",
    sizes: BRACELET_LENGTHS,
    images: [
      { src: "/images/catalog/round-emerald-diamond-tennis-bracelet/01-sku.webp", kind: "sku" },
      { src: "/images/catalog/round-emerald-diamond-tennis-bracelet/01-sku.webp", kind: "detail" },
      { src: "/images/catalog/round-emerald-diamond-tennis-bracelet/05-on-body-women.webp", kind: "on-body" },
      { src: "/images/catalog/round-emerald-diamond-tennis-bracelet/06-on-body-men.webp", kind: "on-body" },
    ],
    metalImages: Object.fromEntries(
      (["yellow-gold", "rose-gold"] as const).map((tone) => [
        tone === "yellow-gold" ? "14k Yellow Gold" : "14k Rose Gold",
        [
          { src: `/images/catalog/round-emerald-diamond-tennis-bracelet/01-sku-${tone}.webp`, kind: "detail" },
          { src: `/images/catalog/round-emerald-diamond-tennis-bracelet/05-on-body-women-${tone}.webp`, kind: "on-body" },
          { src: `/images/catalog/round-emerald-diamond-tennis-bracelet/06-on-body-men-${tone}.webp`, kind: "on-body" },
        ] as GalleryImage[],
      ]),
    ),
    details: ["[DETAILS — to be provided]"],
    materials: ["[MATERIALS — to be provided]"],
    rank: 45,
    addedRank: -42,
  },
  {
    // PRODUCT 46 — dainty chain bracelet with a pink heart diamond in a halo (photographed in yellow gold)
    slug: "pink-heart-diamond-bracelet",
    name: "Pink Heart Diamond Bracelet",
    price: null,
    type: "Bracelets",
    shape: "Heart",
    stone: "A pink heart-shaped diamond framed by a halo of small white diamonds, on a fine cable chain. [Carat, color, clarity — to be provided]",
    stoneGroup: "Diamond",
    metals: RING_METALS,
    defaultMetal: "14k Yellow Gold",
    sizes: BRACELET_LENGTHS,
    images: [
      { src: "/images/catalog/pink-heart-diamond-bracelet/01-main.webp", kind: "sku" },
      { src: "/images/catalog/pink-heart-diamond-bracelet/01-main-page.webp", kind: "detail" },
      { src: "/images/catalog/pink-heart-diamond-bracelet/05-on-body.webp", kind: "on-body" },
    ],
    // yellow gold is the default set above; white gold and platinum share one white-metal set
    metalImages: Object.fromEntries(
      (
        [
          ["14k Rose Gold", "rose-gold"],
          ["14k White Gold", "white"],
          ["Platinum", "white"],
        ] as const
      ).map(([metal, tone]) => [
        metal,
        [
          { src: `/images/catalog/pink-heart-diamond-bracelet/01-main-page-${tone}.webp`, kind: "detail" },
          { src: `/images/catalog/pink-heart-diamond-bracelet/05-on-body-${tone}.webp`, kind: "on-body" },
        ] as GalleryImage[],
      ]),
    ),
    details: ["[DETAILS — to be provided]"],
    materials: ["[MATERIALS — to be provided]"],
    rank: 46,
    addedRank: -43,
  },
  {
    // PRODUCT 47 — solitaire family, shape variant of 010 (same tapered band and head)
    slug: "marquise-solitaire-diamond-ring",
    name: "Marquise Solitaire Diamond Ring",
    price: null,
    type: "Rings",
    collections: ["engagement-bridal"],
    shapeGroup: "solitaire-diamond-ring",
    shape: "Marquise",
    stone: "Marquise diamond solitaire, set north-south, with V-claws on both points and two side claws on a tapered band. [Carat, color, clarity — to be provided]",
    stoneGroup: "Diamond",
    metals: RING_METALS,
    defaultMetal: "Platinum",
    sizes: RING_SIZES,
    carats: CARATS,
    images: [
      { src: "/images/catalog/marquise-solitaire-diamond-ring/01-sku.webp", kind: "sku" },
      { src: "/images/catalog/marquise-solitaire-diamond-ring/02-three-quarter.webp", kind: "detail" },
      { src: "/images/catalog/marquise-solitaire-diamond-ring/03-profile.webp", kind: "detail" },
      { src: "/images/catalog/marquise-solitaire-diamond-ring/05-on-hand.webp", kind: "on-body" },
    ],
    metalImages: ringMetalImages("marquise-solitaire-diamond-ring"),
    details: ["[DETAILS — to be provided]"],
    materials: ["[MATERIALS — to be provided]"],
    rank: 47,
    addedRank: -44,
  },
  {
    // PRODUCT 48 — solitaire family, shape variant of 010 (same tapered band and head)
    slug: "radiant-solitaire-diamond-ring",
    name: "Radiant-Cut Solitaire Diamond Ring",
    price: null,
    type: "Rings",
    collections: ["engagement-bridal"],
    shapeGroup: "solitaire-diamond-ring",
    shape: "Radiant",
    stone: "Radiant-cut diamond solitaire in four claws on a tapered band. [Carat, color, clarity — to be provided]",
    stoneGroup: "Diamond",
    metals: RING_METALS,
    defaultMetal: "Platinum",
    sizes: RING_SIZES,
    carats: CARATS,
    images: [
      { src: "/images/catalog/radiant-solitaire-diamond-ring/01-sku.webp", kind: "sku" },
      { src: "/images/catalog/radiant-solitaire-diamond-ring/02-three-quarter.webp", kind: "detail" },
      { src: "/images/catalog/radiant-solitaire-diamond-ring/03-profile.webp", kind: "detail" },
      { src: "/images/catalog/radiant-solitaire-diamond-ring/05-on-hand.webp", kind: "on-body" },
    ],
    metalImages: ringMetalImages("radiant-solitaire-diamond-ring"),
    details: ["[DETAILS — to be provided]"],
    materials: ["[MATERIALS — to be provided]"],
    rank: 48,
    addedRank: -45,
  },
  {
    // PRODUCT 49 — solitaire family, shape variant of 010 (same tapered band and head)
    slug: "cushion-solitaire-diamond-ring",
    name: "Cushion-Cut Solitaire Diamond Ring",
    price: null,
    type: "Rings",
    collections: ["engagement-bridal"],
    shapeGroup: "solitaire-diamond-ring",
    shape: "Cushion",
    stone: "Cushion-cut diamond solitaire in four claws on a tapered band. [Carat, color, clarity — to be provided]",
    stoneGroup: "Diamond",
    metals: RING_METALS,
    defaultMetal: "Platinum",
    sizes: RING_SIZES,
    carats: CARATS,
    images: [
      { src: "/images/catalog/cushion-solitaire-diamond-ring/01-sku.webp", kind: "sku" },
      { src: "/images/catalog/cushion-solitaire-diamond-ring/02-three-quarter.webp", kind: "detail" },
      { src: "/images/catalog/cushion-solitaire-diamond-ring/03-profile.webp", kind: "detail" },
      { src: "/images/catalog/cushion-solitaire-diamond-ring/05-on-hand.webp", kind: "on-body" },
    ],
    metalImages: ringMetalImages("cushion-solitaire-diamond-ring"),
    details: ["[DETAILS — to be provided]"],
    materials: ["[MATERIALS — to be provided]"],
    rank: 49,
    addedRank: -46,
  },
  {
    // PRODUCT 50 — solitaire family, shape variant of 010 (same tapered band and head)
    slug: "asscher-solitaire-diamond-ring",
    name: "Asscher-Cut Solitaire Diamond Ring",
    price: null,
    type: "Rings",
    collections: ["engagement-bridal"],
    shapeGroup: "solitaire-diamond-ring",
    shape: "Asscher",
    stone: "Asscher-cut diamond solitaire in four claws on a tapered band. [Carat, color, clarity — to be provided]",
    stoneGroup: "Diamond",
    metals: RING_METALS,
    defaultMetal: "Platinum",
    sizes: RING_SIZES,
    carats: CARATS,
    images: [
      { src: "/images/catalog/asscher-solitaire-diamond-ring/01-sku.webp", kind: "sku" },
      { src: "/images/catalog/asscher-solitaire-diamond-ring/02-three-quarter.webp", kind: "detail" },
      { src: "/images/catalog/asscher-solitaire-diamond-ring/03-profile.webp", kind: "detail" },
      { src: "/images/catalog/asscher-solitaire-diamond-ring/05-on-hand.webp", kind: "on-body" },
    ],
    metalImages: ringMetalImages("asscher-solitaire-diamond-ring"),
    details: ["[DETAILS — to be provided]"],
    materials: ["[MATERIALS — to be provided]"],
    rank: 50,
    addedRank: -47,
  },
  {
    // PRODUCT 51 — solitaire family, shape variant of 010 (same tapered band and head)
    slug: "princess-solitaire-diamond-ring",
    name: "Princess-Cut Solitaire Diamond Ring",
    price: null,
    type: "Rings",
    collections: ["engagement-bridal"],
    shapeGroup: "solitaire-diamond-ring",
    shape: "Princess",
    stone: "Princess-cut diamond solitaire in four corner claws on a tapered band. [Carat, color, clarity — to be provided]",
    stoneGroup: "Diamond",
    metals: RING_METALS,
    defaultMetal: "Platinum",
    sizes: RING_SIZES,
    carats: CARATS,
    images: [
      { src: "/images/catalog/princess-solitaire-diamond-ring/01-sku.webp", kind: "sku" },
      { src: "/images/catalog/princess-solitaire-diamond-ring/02-three-quarter.webp", kind: "detail" },
      { src: "/images/catalog/princess-solitaire-diamond-ring/03-profile.webp", kind: "detail" },
      { src: "/images/catalog/princess-solitaire-diamond-ring/05-on-hand.webp", kind: "on-body" },
    ],
    metalImages: ringMetalImages("princess-solitaire-diamond-ring"),
    details: ["[DETAILS — to be provided]"],
    materials: ["[MATERIALS — to be provided]"],
    rank: 51,
    addedRank: -48,
  },
  {
    // PRODUCT 52 — solitaire family, shape variant of 010 (same tapered band and head)
    slug: "heart-solitaire-diamond-ring",
    name: "Heart Solitaire Diamond Ring",
    price: null,
    type: "Rings",
    collections: ["engagement-bridal"],
    shapeGroup: "solitaire-diamond-ring",
    shape: "Heart",
    stone: "Heart-shaped diamond solitaire with a V-claw at the point on a tapered band. [Carat, color, clarity — to be provided]",
    stoneGroup: "Diamond",
    metals: RING_METALS,
    defaultMetal: "Platinum",
    sizes: RING_SIZES,
    carats: CARATS,
    images: [
      { src: "/images/catalog/heart-solitaire-diamond-ring/01-sku.webp", kind: "sku" },
      { src: "/images/catalog/heart-solitaire-diamond-ring/02-three-quarter.webp", kind: "detail" },
      { src: "/images/catalog/heart-solitaire-diamond-ring/03-profile.webp", kind: "detail" },
      { src: "/images/catalog/heart-solitaire-diamond-ring/05-on-hand.webp", kind: "on-body" },
    ],
    metalImages: ringMetalImages("heart-solitaire-diamond-ring"),
    details: ["[DETAILS — to be provided]"],
    materials: ["[MATERIALS — to be provided]"],
    rank: 52,
    addedRank: -49,
  },
  {
    // PRODUCT 53 — angel wing bracelet, pink pear drop (matches necklace 024 and earrings 029/030)
    slug: "pink-diamond-angel-wing-bracelet",
    name: "Pink Diamond Angel Wing Bracelet",
    price: null,
    type: "Bracelets",
    stone: "Pink pear-shaped diamond drop under a round diamond, with pavé-set diamond wings, on a fine cable chain. [Carat, color, clarity — to be provided]",
    stoneGroup: "Diamond",
    metals: RING_METALS,
    defaultMetal: "14k Rose Gold",
    sizes: BRACELET_LENGTHS,
    images: [
      { src: "/images/catalog/pink-diamond-angel-wing-bracelet/01-main.webp", kind: "sku" },
      { src: "/images/catalog/pink-diamond-angel-wing-bracelet/01-main-page.webp", kind: "detail" },
      { src: "/images/catalog/pink-diamond-angel-wing-bracelet/05-on-body.webp", kind: "on-body" },
    ],
    // rose gold is the default set above; white gold and platinum share one white-metal set
    metalImages: Object.fromEntries(
      (
        [
          ["14k Yellow Gold", "yellow-gold"],
          ["14k White Gold", "white"],
          ["Platinum", "white"],
        ] as const
      ).map(([metal, tone]) => [
        metal,
        [
          { src: `/images/catalog/pink-diamond-angel-wing-bracelet/01-main-page-${tone}.webp`, kind: "detail" },
          { src: `/images/catalog/pink-diamond-angel-wing-bracelet/05-on-body-${tone}.webp`, kind: "on-body" },
        ] as GalleryImage[],
      ]),
    ),
    details: ["[DETAILS — to be provided]"],
    materials: ["[MATERIALS — to be provided]"],
    rank: 53,
    addedRank: -50,
  },
];

export const jewelryTypes: JewelryType[] = ["Rings", "Bracelets", "Necklaces", "Earrings"];

/** Products whose primary category is `type`. */
export const byType = (type: JewelryType) => catalog.filter((i) => i.type === type);
/** Products in a curated collection (any primary category). */
export const inCollection = (id: CollectionId) => catalog.filter((i) => i.collections?.includes(id));

export const productHref = (item: CatalogItem) => `/shop/${item.slug}`;

// Display order for the Shape selector.
export const SHAPE_ORDER = ["Round", "Oval", "Emerald", "Marquise", "Pear", "Radiant", "Cushion", "Asscher", "Princess", "Heart"];
/** The same design in other stone shapes (including the piece itself), in SHAPE_ORDER. */
export const shapeVariants = (item: CatalogItem) =>
  item.shapeGroup
    ? catalog
        .filter((i) => i.shapeGroup === item.shapeGroup && i.shape)
        .sort((a, b) => SHAPE_ORDER.indexOf(a.shape!) - SHAPE_ORDER.indexOf(b.shape!))
    : [item];
/** The default-metal on-hand photo, used as the hover image on collection cards. */
export const onBodyImage = (item: CatalogItem) => item.images.find((i) => i.kind === "on-body")?.src;
export const getCatalogItem = (slug: string) => catalog.find((i) => i.slug === slug);

export const formatUSD = (n: number) => `$${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
export const fromPrice = (item: CatalogItem) => `From ${item.price === null ? "$[PRICE]" : formatUSD(item.price)}`;

// Gallery images for the chosen metal: that metal's own set when there is one,
// otherwise the default images. The collection SKU shot is never part of the gallery.
export const galleryFor = (item: CatalogItem, metal: string): GalleryImage[] => {
  const pick = (imgs: GalleryImage[]) => imgs.filter((i) => i.kind !== "sku");
  const own = pick(item.metalImages?.[metal] ?? []);
  if (own.length) return own;
  const base = pick(item.images);
  return base.length ? base : item.images;
};
