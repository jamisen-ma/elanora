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
  sizePrices?: Record<string, number>; // USD price per size when sizes cost different amounts; `price` is then the lowest
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
  sizeLabel?: string; // label for the size selector when it chooses something other than a size (e.g. "Necklace")
  // Size options that put separate pieces in the bag (e.g. a set sold singly or together):
  // option -> the pieces added, each its own bag line at its own price.
  sizePieces?: Record<string, { name: string; price: number }[]>;
  // Personalised pieces sold by quote: the product page asks for the name to make and sends
  // a quote request instead of adding to the bag. Prices show as "Price on request".
  customName?: { maxLength: number };
  initials?: string[]; // letter options for initial pendants (Initial selector on the product page)
  caratPrices?: Record<string, number>; // USD price per centre-diamond carat option (Carat selector); `price` is then the lowest
  // USD price per metal and centre-diamond carat, when both change the price; `price` is then the lowest.
  metalCaratPrices?: Record<string, Record<string, number>>;
  metalPrices?: Record<string, number>; // USD price per metal, when only the metal changes the price; `price` is then the lowest
  // Optional chain sold only together with the pendant (its own bag line, at its own price).
  // `metalFor` maps a pendant metal to the chain metal when they differ (e.g. silver pendant -> white gold chain).
  chainAddOn?: { price: number; lengths: string[]; metalFor?: Record<string, string> };
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
const INITIALS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const NECKLACE_LENGTHS = ["16 in", "18 in", "20 in"]; // [Chain lengths offered — to be confirmed]

// Halo pendants (sold without a chain): the centre diamond is chosen by carat. 0.5 ct is the
// base price and every further 0.5 ct adds $100. The 14K gold chain is an optional add-on.
const HALO_PENDANT_CARATS = ["Approx. 0.5 ct", "Approx. 1.0 ct", "Approx. 1.5 ct", "Approx. 2.0 ct", "Approx. 2.5 ct"];
const HALO_PENDANT_BASE = 799;
const haloPendantCaratPrices = Object.fromEntries(HALO_PENDANT_CARATS.map((c, i) => [c, HALO_PENDANT_BASE + 100 * i]));
const HALO_PENDANT_METALS = ["14k White Gold", "14k Yellow Gold", "14k Rose Gold"];
const HALO_PENDANT_CHAIN = { price: 239, lengths: ["16 in", "18 in", "20 in"] };
const haloPendantDetails = (cut: string) => [
  "Pendant only, crafted in 14K gold — chain not included",
  `${cut} lab-grown diamond centre stone, approx. 0.5 ct to 2.5 ct`,
  "Optional 14K gold chain (16, 18 or 20 in) for $239, available only with the pendant",
];

// Snowflake layered necklaces: priced by metal (same design in 925 sterling silver or 14K yellow gold).
const SNOWFLAKE_METAL_PRICES: Record<string, number> = { "14k Yellow Gold": 1499, "925 Sterling Silver": 899 };

// Cocktail Collection necklaces: priced by centre-diamond carat (14K gold, chain included).
const COCKTAIL_CARAT_PRICES: Record<string, number> = { "2 ct": 1099, "3 ct": 1199 };
const COSMOPOLITAN_CARAT_PRICES: Record<string, number> = { "Approx. 1.5 ct": 1199 };

// Perfume bottle pendants: priced by metal and centre-diamond carat.
const PERFUME_METALS = ["14k White Gold", "14k Yellow Gold", "925 Sterling Silver"];
const PERFUME_CARATS = ["2 ct", "3 ct"];
const PERFUME_PRICES: Record<string, Record<string, number>> = {
  "14k White Gold": { "2 ct": 899, "3 ct": 1099 },
  "14k Yellow Gold": { "2 ct": 899, "3 ct": 1099 },
  "925 Sterling Silver": { "2 ct": 799, "3 ct": 999 },
};
// Prices are for the pendant only; the optional chain is always 14K gold (white gold with a silver pendant).
// Yellow gold: own main and on-body shots; the detail close-up stays the white gold one.
const perfumeYellowGold = (slug: string): Record<string, GalleryImage[]> => ({
  "14k Yellow Gold": [
    { src: `/images/catalog/${slug}/01-main-page-yellow-gold.webp`, kind: "detail" },
    { src: `/images/catalog/${slug}/05-on-body-yellow-gold.webp`, kind: "on-body" },
    { src: `/images/catalog/${slug}/02-detail.webp`, kind: "detail" },
  ],
});
const PERFUME_CHAIN = { ...HALO_PENDANT_CHAIN, metalFor: { "925 Sterling Silver": "14k White Gold" } };

// Pink teardrop pendant: priced by metal and centre-diamond carat; 14K gold is $100 over silver
// at every size. Pendant only; the optional chain is the 14K gold add-on (white gold with silver).
const TEARDROP_SILVER_PRICES: Record<string, number> = { "1 ct": 699, "1.5 ct": 799, "2 ct": 899, "3 ct": 1099 };
const TEARDROP_CARATS = Object.keys(TEARDROP_SILVER_PRICES);
const TEARDROP_PRICES: Record<string, Record<string, number>> = {
  "925 Sterling Silver": TEARDROP_SILVER_PRICES,
  "14k Yellow Gold": Object.fromEntries(TEARDROP_CARATS.map((c) => [c, TEARDROP_SILVER_PRICES[c] + 100])),
};

// Solitaire pendants (sold without a chain): the centre diamond is chosen by carat; the 14K gold
// chain is the same optional add-on as the halo pendants and is never sold on its own.
const SOLITAIRE_PENDANT_CARAT_PRICES: Record<string, number> = {
  "Approx. 0.3 ct": 379,
  "Approx. 0.5 ct": 399,
  "Approx. 1.0 ct": 469,
  "Approx. 1.5 ct": 539,
  "Approx. 2.0 ct": 609,
  "Approx. 2.5 ct": 679,
};
const SOLITAIRE_PENDANT_CARATS = Object.keys(SOLITAIRE_PENDANT_CARAT_PRICES);
const solitairePendantDetails = (cut: string) => [
  "Pendant only, crafted in 14K gold — chain not included",
  `${cut} lab-grown diamond centre stone, approx. 0.3 ct to 2.5 ct`,
  "Optional 14K gold chain (16, 18 or 20 in) for $239, available only with the pendant",
];

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
// Angel wing necklaces: offered in gold over sterling silver (金包银) or 14K gold, with a 2 ct or
// 3 ct centre pear. The price depends on both (no platinum).
const GOLD_OVER_SILVER = "Gold over Sterling Silver";
const WING_METALS = [GOLD_OVER_SILVER, "14k Yellow Gold", "14k White Gold", "14k Rose Gold"];
const WING_CARATS = ["2 ct", "3 ct"];
const WING_SILVER_PRICES = { "2 ct": 1099, "3 ct": 1299 };
const WING_GOLD_PRICES = { "2 ct": 1399, "3 ct": 1599 };
const wingMetalCaratPrices: Record<string, Record<string, number>> = Object.fromEntries(
  WING_METALS.map((m) => [m, m === GOLD_OVER_SILVER ? WING_SILVER_PRICES : WING_GOLD_PRICES]),
);
const wingDetails = (color: string) => [
  `Center stone: 2 ct or 3 ct pear-shaped ${color} lab-grown diamond`,
  "Angel wings pavé-set with white lab-grown diamonds",
  "Chain length: 16, 18 or 20 in",
];
const WING_MATERIALS = ["Gold over sterling silver or 14K gold", "Lab-grown diamonds"];
// Angel wing necklaces use the second round of on-body photos (05-on-body-v2…).
const onBodyV2 = (images: GalleryImage[]): GalleryImage[] =>
  images.map((i) => (i.kind === "on-body" ? { ...i, src: i.src.replace("05-on-body", "05-on-body-v2") } : i));
const onBodyV2Metals = (sets: Record<string, GalleryImage[]>): Record<string, GalleryImage[]> =>
  Object.fromEntries(Object.entries(sets).map(([metal, images]) => [metal, onBodyV2(images)]));

// One shared on-body photo for every metal (gold variants change only the main shot).
const sharedOnBody = (images: GalleryImage[], src: string): GalleryImage[] =>
  images.map((i) => (i.kind === "on-body" ? { ...i, src } : i));
const sharedOnBodyMetals = (sets: Record<string, GalleryImage[]>, src: string): Record<string, GalleryImage[]> =>
  Object.fromEntries(Object.entries(sets).map(([metal, images]) => [metal, sharedOnBody(images, src)]));

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
      { src: "/images/catalog/round-diamond-tennis-bracelet/05-on-body-women-v2.webp", kind: "on-body" },
      { src: "/images/catalog/round-diamond-tennis-bracelet/06-on-body-men-v2.webp", kind: "on-body" },
    ],
    metalImages: Object.fromEntries(
      (["yellow-gold", "rose-gold"] as const).map((tone) => [
        tone === "yellow-gold" ? "14k Yellow Gold" : "14k Rose Gold",
        [
          { src: `/images/catalog/round-diamond-tennis-bracelet/01-sku-${tone}.webp`, kind: "detail" },
          { src: `/images/catalog/round-diamond-tennis-bracelet/05-on-body-women-${tone}-v2.webp`, kind: "on-body" },
          { src: `/images/catalog/round-diamond-tennis-bracelet/06-on-body-men-${tone}-v2.webp`, kind: "on-body" },
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
      { src: "/images/catalog/pear-diamond-line-bracelet/05-on-body-women-v2.webp", kind: "on-body" },
      { src: "/images/catalog/pear-diamond-line-bracelet/06-on-body-men-v2.webp", kind: "on-body" },
    ],
    metalImages: Object.fromEntries(
      (["yellow-gold", "rose-gold"] as const).map((tone) => [
        tone === "yellow-gold" ? "14k Yellow Gold" : "14k Rose Gold",
        [
          { src: `/images/catalog/pear-diamond-line-bracelet/01-sku-${tone}.webp`, kind: "detail" },
          { src: `/images/catalog/pear-diamond-line-bracelet/05-on-body-women-${tone}-v2.webp`, kind: "on-body" },
          { src: `/images/catalog/pear-diamond-line-bracelet/06-on-body-men-${tone}-v2.webp`, kind: "on-body" },
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
    price: SOLITAIRE_PENDANT_CARAT_PRICES["Approx. 0.3 ct"], // lowest carat option — shown as "From $379"
    type: "Necklaces",
    shapeGroup: "solitaire-diamond-necklace",
    shape: "Emerald",
    stone: "Emerald-cut lab-grown diamond in four claws, crafted in 14K gold and sold as the pendant; add a matching 14K gold chain if you like.",
    stoneGroup: "Diamond",
    metals: HALO_PENDANT_METALS, // 14K gold only
    defaultMetal: "14k White Gold",
    carats: SOLITAIRE_PENDANT_CARATS,
    caratPrices: SOLITAIRE_PENDANT_CARAT_PRICES,
    chainAddOn: HALO_PENDANT_CHAIN, // the chain is never sold on its own
    images: [
      { src: "/images/catalog/emerald-solitaire-diamond-necklace/01-main.webp", kind: "sku" },
      // the main image also opens the product page gallery (copy on the page colour)
      { src: "/images/catalog/emerald-solitaire-diamond-necklace/01-main-page.webp", kind: "detail" },
      { src: "/images/catalog/emerald-solitaire-diamond-necklace/02-detail.webp", kind: "detail" },
      { src: "/images/catalog/emerald-solitaire-diamond-necklace/05-on-body-v2.webp", kind: "on-body" },
    ],
    metalImages: Object.fromEntries(
      (["yellow-gold", "rose-gold"] as const).map((tone) => [
        tone === "yellow-gold" ? "14k Yellow Gold" : "14k Rose Gold",
        [
          { src: `/images/catalog/emerald-solitaire-diamond-necklace/01-main-page-${tone}.webp`, kind: "detail" },
          { src: `/images/catalog/emerald-solitaire-diamond-necklace/02-detail-${tone}.webp`, kind: "detail" },
          { src: `/images/catalog/emerald-solitaire-diamond-necklace/05-on-body-${tone}-v2.webp`, kind: "on-body" },
        ] as GalleryImage[],
      ]),
    ),
    details: solitairePendantDetails("Emerald-cut"),
    materials: ["14K gold", "Lab-grown diamond"],
    rank: 19,
    addedRank: -16,
  },
  {
    // PRODUCT 20 — same pendant as 019, round stone
    slug: "round-solitaire-diamond-necklace",
    name: "Round Solitaire Diamond Necklace",
    price: SOLITAIRE_PENDANT_CARAT_PRICES["Approx. 0.3 ct"], // lowest carat option — shown as "From $379"
    type: "Necklaces",
    shapeGroup: "solitaire-diamond-necklace",
    shape: "Round",
    stone: "Round brilliant lab-grown diamond in four claws, crafted in 14K gold and sold as the pendant; add a matching 14K gold chain if you like.",
    stoneGroup: "Diamond",
    metals: HALO_PENDANT_METALS, // 14K gold only
    defaultMetal: "14k White Gold",
    carats: SOLITAIRE_PENDANT_CARATS,
    caratPrices: SOLITAIRE_PENDANT_CARAT_PRICES,
    chainAddOn: HALO_PENDANT_CHAIN, // the chain is never sold on its own
    // on-body re-shot (-v2): winter Y2K snapshot
    images: [
      { src: "/images/catalog/round-solitaire-diamond-necklace/01-main.webp", kind: "sku" },
      { src: "/images/catalog/round-solitaire-diamond-necklace/01-main-page.webp", kind: "detail" },
      { src: "/images/catalog/round-solitaire-diamond-necklace/02-detail.webp", kind: "detail" },
      { src: "/images/catalog/round-solitaire-diamond-necklace/05-on-body-v2.webp", kind: "on-body" },
    ],
    metalImages: Object.fromEntries(
      (["yellow-gold", "rose-gold"] as const).map((tone) => [
        tone === "yellow-gold" ? "14k Yellow Gold" : "14k Rose Gold",
        [
          { src: `/images/catalog/round-solitaire-diamond-necklace/01-main-page-${tone}.webp`, kind: "detail" },
          { src: `/images/catalog/round-solitaire-diamond-necklace/02-detail-${tone}.webp`, kind: "detail" },
          { src: `/images/catalog/round-solitaire-diamond-necklace/05-on-body-${tone}-v2.webp`, kind: "on-body" },
        ] as GalleryImage[],
      ]),
    ),
    details: solitairePendantDetails("Round brilliant"),
    materials: ["14K gold", "Lab-grown diamond"],
    rank: 20,
    addedRank: -17,
  },
  {
    // PRODUCT 21 — same pendant as 019, oval stone
    slug: "oval-solitaire-diamond-necklace",
    name: "Oval Solitaire Diamond Necklace",
    price: SOLITAIRE_PENDANT_CARAT_PRICES["Approx. 0.3 ct"], // lowest carat option — shown as "From $379"
    type: "Necklaces",
    shapeGroup: "solitaire-diamond-necklace",
    shape: "Oval",
    stone: "Oval lab-grown diamond in four claws, crafted in 14K gold and sold as the pendant; add a matching 14K gold chain if you like.",
    stoneGroup: "Diamond",
    metals: HALO_PENDANT_METALS, // 14K gold only
    defaultMetal: "14k White Gold",
    carats: SOLITAIRE_PENDANT_CARATS,
    caratPrices: SOLITAIRE_PENDANT_CARAT_PRICES,
    chainAddOn: HALO_PENDANT_CHAIN, // the chain is never sold on its own
    images: necklaceImages("oval-solitaire-diamond-necklace"),
    metalImages: necklaceMetalImages("oval-solitaire-diamond-necklace"),
    details: solitairePendantDetails("Oval"),
    materials: ["14K gold", "Lab-grown diamond"],
    rank: 21,
    addedRank: -18,
  },
  {
    // PRODUCT 22 — same pendant as 019, pear stone
    slug: "pear-solitaire-diamond-necklace",
    name: "Pear-Shaped Solitaire Diamond Necklace",
    price: SOLITAIRE_PENDANT_CARAT_PRICES["Approx. 0.3 ct"], // lowest carat option — shown as "From $379"
    type: "Necklaces",
    shapeGroup: "solitaire-diamond-necklace",
    shape: "Pear",
    stone: "Pear-shaped lab-grown diamond in three claws, crafted in 14K gold and sold as the pendant; add a matching 14K gold chain if you like.",
    stoneGroup: "Diamond",
    metals: HALO_PENDANT_METALS, // 14K gold only
    defaultMetal: "14k White Gold",
    carats: SOLITAIRE_PENDANT_CARATS,
    caratPrices: SOLITAIRE_PENDANT_CARAT_PRICES,
    chainAddOn: HALO_PENDANT_CHAIN, // the chain is never sold on its own
    images: sharedOnBody(necklaceImages("pear-solitaire-diamond-necklace"), "/images/catalog/pear-solitaire-diamond-necklace/05-on-body-v2.webp"),
    metalImages: sharedOnBodyMetals(necklaceMetalImages("pear-solitaire-diamond-necklace"), "/images/catalog/pear-solitaire-diamond-necklace/05-on-body-v2.webp"),
    details: solitairePendantDetails("Pear-shaped"),
    materials: ["14K gold", "Lab-grown diamond"],
    rank: 22,
    addedRank: -19,
  },
  {
    // PRODUCT 23 — same pendant as 019, heart stone
    slug: "heart-solitaire-diamond-necklace",
    name: "Heart-Shaped Solitaire Diamond Necklace",
    price: SOLITAIRE_PENDANT_CARAT_PRICES["Approx. 0.3 ct"], // lowest carat option — shown as "From $379"
    type: "Necklaces",
    shapeGroup: "solitaire-diamond-necklace",
    shape: "Heart",
    stone: "Heart-shaped lab-grown diamond in three claws, crafted in 14K gold and sold as the pendant; add a matching 14K gold chain if you like.",
    stoneGroup: "Diamond",
    metals: HALO_PENDANT_METALS, // 14K gold only
    defaultMetal: "14k White Gold",
    carats: SOLITAIRE_PENDANT_CARATS,
    caratPrices: SOLITAIRE_PENDANT_CARAT_PRICES,
    chainAddOn: HALO_PENDANT_CHAIN, // the chain is never sold on its own
    images: sharedOnBody(necklaceImages("heart-solitaire-diamond-necklace"), "/images/catalog/heart-solitaire-diamond-necklace/05-on-body-v2.webp"),
    metalImages: sharedOnBodyMetals(necklaceMetalImages("heart-solitaire-diamond-necklace"), "/images/catalog/heart-solitaire-diamond-necklace/05-on-body-v2.webp"),
    details: solitairePendantDetails("Heart-shaped"),
    materials: ["14K gold", "Lab-grown diamond"],
    rank: 23,
    addedRank: -20,
  },
  {
    // PRODUCT 24 — angel wings in pavé with a pink pear drop (024 and 025 share the design)
    slug: "pink-diamond-angel-wing-necklace",
    name: "Pink Diamond Angel Wing Necklace",
    price: 1099, // lowest option (gold over silver, 2 ct) — shown as "From $1,099"
    type: "Necklaces",
    shape: "Pear",
    stone: "Pavé-set angel wings in white lab-grown diamonds, with a 2 ct or 3 ct pink pear-shaped lab-grown diamond drop.",
    stoneGroup: "Diamond",
    metals: WING_METALS,
    defaultMetal: "14k Rose Gold",
    sizes: NECKLACE_LENGTHS,
    carats: WING_CARATS,
    metalCaratPrices: wingMetalCaratPrices,
    images: onBodyV2(necklaceImages("pink-diamond-angel-wing-necklace")),
    metalImages: onBodyV2Metals({
      ...roseNecklaceMetalImages("pink-diamond-angel-wing-necklace"),
      [GOLD_OVER_SILVER]: roseNecklaceMetalImages("pink-diamond-angel-wing-necklace")["14k Yellow Gold"], // shown in yellow gold tone
    }),
    details: wingDetails("pink"),
    materials: WING_MATERIALS,
    rank: 24,
    addedRank: -21,
  },
  {
    // PRODUCT 25 — angel wings in pavé with a canary yellow pear drop (024 and 025 share the design)
    slug: "yellow-diamond-angel-wing-necklace",
    name: "Yellow Diamond Angel Wing Necklace",
    price: 1099, // lowest option (gold over silver, 2 ct) — shown as "From $1,099"
    type: "Necklaces",
    shape: "Pear",
    stone: "Pavé-set angel wings in white lab-grown diamonds, with a 2 ct or 3 ct yellow pear-shaped lab-grown diamond drop.",
    stoneGroup: "Diamond",
    metals: WING_METALS, // gold over silver uses the yellow gold (default) images
    // Main image is yellow gold; the rose gold shots are kept as the Rose Gold set.
    defaultMetal: "14k Yellow Gold",
    sizes: NECKLACE_LENGTHS,
    carats: WING_CARATS,
    metalCaratPrices: wingMetalCaratPrices,
    images: [
      { src: "/images/catalog/yellow-diamond-angel-wing-necklace/01-main-yellow-gold.webp", kind: "sku" },
      { src: "/images/catalog/yellow-diamond-angel-wing-necklace/01-main-page-yellow-gold.webp", kind: "detail" },
      { src: "/images/catalog/yellow-diamond-angel-wing-necklace/02-detail-yellow-gold.webp", kind: "detail" },
      { src: "/images/catalog/yellow-diamond-angel-wing-necklace/05-on-body-v2-yellow-gold.webp", kind: "on-body" },
    ],
    metalImages: onBodyV2Metals({
      ...roseNecklaceMetalImages("yellow-diamond-angel-wing-necklace"),
      "14k Rose Gold": necklaceImages("yellow-diamond-angel-wing-necklace"),
    }),
    details: wingDetails("yellow"),
    materials: WING_MATERIALS,
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
      { src: "/images/catalog/heart-diamond-tennis-bracelet/05-on-body-women-v3.webp", kind: "on-body" },
      { src: "/images/catalog/heart-diamond-tennis-bracelet/06-on-body-men-v3.webp", kind: "on-body" },
    ],
    metalImages: Object.fromEntries(
      (["yellow-gold", "rose-gold"] as const).map((tone) => [
        tone === "yellow-gold" ? "14k Yellow Gold" : "14k Rose Gold",
        [
          { src: `/images/catalog/heart-diamond-tennis-bracelet/01-sku-${tone}-v2.webp`, kind: "detail" },
          { src: `/images/catalog/heart-diamond-tennis-bracelet/05-on-body-women-${tone}-v3.webp`, kind: "on-body" },
          { src: `/images/catalog/heart-diamond-tennis-bracelet/06-on-body-men-${tone}-v3.webp`, kind: "on-body" },
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
    price: HALO_PENDANT_BASE, // lowest carat option — shown as "From $799"
    type: "Necklaces",
    shapeGroup: "halo-diamond-necklace",
    shape: "Emerald",
    stone: "An emerald-cut lab-grown diamond in four claws, framed by a halo of round diamonds and hung from a pavé diamond bail. Crafted in 14K gold and sold as the pendant; add a matching 14K gold chain if you like.",
    stoneGroup: "Diamond",
    metals: HALO_PENDANT_METALS, // 14K gold only
    defaultMetal: "14k White Gold",
    carats: HALO_PENDANT_CARATS,
    caratPrices: haloPendantCaratPrices,
    chainAddOn: HALO_PENDANT_CHAIN, // the chain is never sold on its own
    // Pendant on a pavé diamond bail (-v2). Gold metals change only the main shot;
    // the on-body and detail photos are the white gold ones for every metal.
    images: [
      { src: "/images/catalog/emerald-halo-diamond-necklace/01-main-v2.webp", kind: "sku" },
      { src: "/images/catalog/emerald-halo-diamond-necklace/01-main-page-v2.webp", kind: "detail" },
      { src: "/images/catalog/emerald-halo-diamond-necklace/05-on-body-v2.webp", kind: "on-body" },
      { src: "/images/catalog/emerald-halo-diamond-necklace/02-detail-v2.webp", kind: "detail" },
    ],
    metalImages: Object.fromEntries(
      (["yellow-gold", "rose-gold"] as const).map((tone) => [
        tone === "yellow-gold" ? "14k Yellow Gold" : "14k Rose Gold",
        [
          { src: `/images/catalog/emerald-halo-diamond-necklace/01-main-page-v2-${tone}.webp`, kind: "detail" },
          { src: "/images/catalog/emerald-halo-diamond-necklace/05-on-body-v2.webp", kind: "on-body" },
          { src: "/images/catalog/emerald-halo-diamond-necklace/02-detail-v2.webp", kind: "detail" },
        ] as GalleryImage[],
      ]),
    ),
    details: haloPendantDetails("Emerald-cut"),
    materials: ["14K white, yellow or rose gold", "Lab-grown diamond centre stone"],
    rank: 40,
    addedRank: -37,
  },
  {
    // PRODUCT 41 — halo pendant necklace (same design as 040, oval stone)
    slug: "oval-halo-diamond-necklace",
    name: "Oval Halo Diamond Necklace",
    price: HALO_PENDANT_BASE, // lowest carat option — shown as "From $799"
    type: "Necklaces",
    shapeGroup: "halo-diamond-necklace",
    shape: "Oval",
    stone: "An oval lab-grown diamond in four claws, framed by a halo of round diamonds and hung from a pavé diamond bail. Crafted in 14K gold and sold as the pendant; add a matching 14K gold chain if you like.",
    stoneGroup: "Diamond",
    metals: HALO_PENDANT_METALS, // 14K gold only
    defaultMetal: "14k White Gold",
    carats: HALO_PENDANT_CARATS,
    caratPrices: haloPendantCaratPrices,
    chainAddOn: HALO_PENDANT_CHAIN, // the chain is never sold on its own
    // Pendant on a pavé diamond bail (-v2). Gold metals change only the main shot;
    // the on-body and detail photos are the white gold ones for every metal.
    images: [
      { src: "/images/catalog/oval-halo-diamond-necklace/01-main-v2.webp", kind: "sku" },
      { src: "/images/catalog/oval-halo-diamond-necklace/01-main-page-v2.webp", kind: "detail" },
      { src: "/images/catalog/oval-halo-diamond-necklace/05-on-body-v2.webp", kind: "on-body" },
      { src: "/images/catalog/oval-halo-diamond-necklace/02-detail-v2.webp", kind: "detail" },
    ],
    metalImages: Object.fromEntries(
      (["yellow-gold", "rose-gold"] as const).map((tone) => [
        tone === "yellow-gold" ? "14k Yellow Gold" : "14k Rose Gold",
        [
          { src: `/images/catalog/oval-halo-diamond-necklace/01-main-page-v2-${tone}.webp`, kind: "detail" },
          { src: "/images/catalog/oval-halo-diamond-necklace/05-on-body-v2.webp", kind: "on-body" },
          { src: "/images/catalog/oval-halo-diamond-necklace/02-detail-v2.webp", kind: "detail" },
        ] as GalleryImage[],
      ]),
    ),
    details: haloPendantDetails("Oval"),
    materials: ["14K white, yellow or rose gold", "Lab-grown diamond centre stone"],
    rank: 41,
    addedRank: -38,
  },
  {
    // PRODUCT 42 — halo pendant necklace (same design as 040, round stone)
    slug: "round-halo-diamond-necklace",
    name: "Round Halo Diamond Necklace",
    price: HALO_PENDANT_BASE, // lowest carat option — shown as "From $799"
    type: "Necklaces",
    shapeGroup: "halo-diamond-necklace",
    shape: "Round",
    stone: "A round-cut lab-grown diamond in four claws, framed by a halo of round diamonds and hung from a pavé diamond bail. Crafted in 14K gold and sold as the pendant; add a matching 14K gold chain if you like.",
    stoneGroup: "Diamond",
    metals: HALO_PENDANT_METALS, // 14K gold only
    defaultMetal: "14k White Gold",
    carats: HALO_PENDANT_CARATS,
    caratPrices: haloPendantCaratPrices,
    chainAddOn: HALO_PENDANT_CHAIN, // the chain is never sold on its own
    // Pendant on a pavé diamond bail (-v2). Gold metals change only the main shot;
    // the on-body and detail photos are the white gold ones for every metal.
    images: [
      { src: "/images/catalog/round-halo-diamond-necklace/01-main-v2.webp", kind: "sku" },
      { src: "/images/catalog/round-halo-diamond-necklace/01-main-page-v2.webp", kind: "detail" },
      { src: "/images/catalog/round-halo-diamond-necklace/05-on-body-v2.webp", kind: "on-body" },
      { src: "/images/catalog/round-halo-diamond-necklace/02-detail-v2.webp", kind: "detail" },
    ],
    metalImages: Object.fromEntries(
      (["yellow-gold", "rose-gold"] as const).map((tone) => [
        tone === "yellow-gold" ? "14k Yellow Gold" : "14k Rose Gold",
        [
          { src: `/images/catalog/round-halo-diamond-necklace/01-main-page-v2-${tone}.webp`, kind: "detail" },
          { src: "/images/catalog/round-halo-diamond-necklace/05-on-body-v2.webp", kind: "on-body" },
          { src: "/images/catalog/round-halo-diamond-necklace/02-detail-v2.webp", kind: "detail" },
        ] as GalleryImage[],
      ]),
    ),
    details: haloPendantDetails("Round-cut"),
    materials: ["14K white, yellow or rose gold", "Lab-grown diamond centre stone"],
    rank: 42,
    addedRank: -39,
  },
  {
    // PRODUCT 43 — halo pendant necklace (same design as 040, pear stone)
    slug: "pear-halo-diamond-necklace",
    name: "Pear-Shaped Halo Diamond Necklace",
    price: HALO_PENDANT_BASE, // lowest carat option — shown as "From $799"
    type: "Necklaces",
    shapeGroup: "halo-diamond-necklace",
    shape: "Pear",
    stone: "A pear-cut lab-grown diamond framed by a halo of round diamonds and hung from a pavé diamond bail. Crafted in 14K gold and sold as the pendant; add a matching 14K gold chain if you like.",
    stoneGroup: "Diamond",
    metals: HALO_PENDANT_METALS, // 14K gold only
    defaultMetal: "14k White Gold",
    carats: HALO_PENDANT_CARATS,
    caratPrices: haloPendantCaratPrices,
    chainAddOn: HALO_PENDANT_CHAIN, // the chain is never sold on its own
    // Second round of photos (pendant on a pavé diamond bail): -v2 files.
    images: [
      { src: "/images/catalog/pear-halo-diamond-necklace/01-main-v2.webp", kind: "sku" },
      { src: "/images/catalog/pear-halo-diamond-necklace/01-main-page-v2.webp", kind: "detail" },
      { src: "/images/catalog/pear-halo-diamond-necklace/05-on-body-v4.webp", kind: "on-body" }, // white tank, cream backdrop
      { src: "/images/catalog/pear-halo-diamond-necklace/05-on-body-v3.webp", kind: "on-body" }, // Y2K lilac
      { src: "/images/catalog/pear-halo-diamond-necklace/02-detail-v2.webp", kind: "detail" },
    ],
    metalImages: Object.fromEntries(
      (["yellow-gold", "rose-gold"] as const).map((tone) => [
        tone === "yellow-gold" ? "14k Yellow Gold" : "14k Rose Gold",
        [
          { src: `/images/catalog/pear-halo-diamond-necklace/01-main-page-v2-${tone}.webp`, kind: "detail" },
          { src: `/images/catalog/pear-halo-diamond-necklace/05-on-body-v4-${tone}.webp`, kind: "on-body" },
          { src: `/images/catalog/pear-halo-diamond-necklace/05-on-body-v3-${tone}.webp`, kind: "on-body" },
          { src: `/images/catalog/pear-halo-diamond-necklace/02-detail-v2-${tone}.webp`, kind: "detail" },
        ] as GalleryImage[],
      ]),
    ),
    details: haloPendantDetails("Pear-cut"),
    materials: ["14K white, yellow or rose gold", "Lab-grown diamond centre stone"],
    rank: 43,
    addedRank: -40,
  },
  {
    // PRODUCT 44 — halo pendant necklace (same design as 040, heart stone)
    slug: "heart-halo-diamond-necklace",
    name: "Heart-Shaped Halo Diamond Necklace",
    price: HALO_PENDANT_BASE, // lowest carat option — shown as "From $799"
    type: "Necklaces",
    shapeGroup: "halo-diamond-necklace",
    shape: "Heart",
    stone: "A heart-cut lab-grown diamond framed by a halo of round diamonds and hung from a pavé diamond bail. Crafted in 14K gold and sold as the pendant; add a matching 14K gold chain if you like.",
    stoneGroup: "Diamond",
    metals: HALO_PENDANT_METALS, // 14K gold only
    defaultMetal: "14k White Gold",
    carats: HALO_PENDANT_CARATS,
    caratPrices: haloPendantCaratPrices,
    chainAddOn: HALO_PENDANT_CHAIN, // the chain is never sold on its own
    // Pendant on a pavé diamond bail (-v2). Gold metals change only the main shot;
    // the on-body and detail photos are the white gold ones for every metal.
    images: [
      { src: "/images/catalog/heart-halo-diamond-necklace/01-main-v2.webp", kind: "sku" },
      { src: "/images/catalog/heart-halo-diamond-necklace/01-main-page-v2.webp", kind: "detail" },
      { src: "/images/catalog/heart-halo-diamond-necklace/05-on-body-v2.webp", kind: "on-body" },
      { src: "/images/catalog/heart-halo-diamond-necklace/02-detail-v2.webp", kind: "detail" },
    ],
    metalImages: Object.fromEntries(
      (["yellow-gold", "rose-gold"] as const).map((tone) => [
        tone === "yellow-gold" ? "14k Yellow Gold" : "14k Rose Gold",
        [
          { src: `/images/catalog/heart-halo-diamond-necklace/01-main-page-v2-${tone}.webp`, kind: "detail" },
          { src: "/images/catalog/heart-halo-diamond-necklace/05-on-body-v2.webp", kind: "on-body" },
          { src: "/images/catalog/heart-halo-diamond-necklace/02-detail-v2.webp", kind: "detail" },
        ] as GalleryImage[],
      ]),
    ),
    details: haloPendantDetails("Heart-cut"),
    materials: ["14K white, yellow or rose gold", "Lab-grown diamond centre stone"],
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
  {
    // PRODUCT 54 — three stones side by side: white pear, yellow emerald-cut centre set on a diagonal, white round (054 and 055 share the design)
    slug: "yellow-emerald-three-stone-diamond-necklace",
    name: "Yellow Emerald Three-Stone Diamond Necklace",
    price: null,
    type: "Necklaces",
    shape: "Emerald",
    stone: "Yellow emerald-cut diamond between a white pear diamond and a white round diamond, on a cable chain. [Carat, color, clarity — to be provided]",
    stoneGroup: "Diamond",
    metals: ["14k White Gold", "Platinum"], // white metal only
    defaultMetal: "Platinum",
    sizes: NECKLACE_LENGTHS,
    images: [
      { src: "/images/catalog/yellow-emerald-three-stone-diamond-necklace/01-main.webp", kind: "sku" },
      { src: "/images/catalog/yellow-emerald-three-stone-diamond-necklace/01-main-page.webp", kind: "detail" },
      { src: "/images/catalog/yellow-emerald-three-stone-diamond-necklace/02-detail.webp", kind: "detail" },
      { src: "/images/catalog/yellow-emerald-three-stone-diamond-necklace/05-on-body-v3.webp", kind: "on-body" },
    ],
    details: ["[DETAILS — to be provided]"],
    materials: ["[MATERIALS — to be provided]"],
    rank: 54,
    addedRank: -51,
  },
  {
    // PRODUCT 55 — three stones side by side: white pear, blue emerald-cut centre set on a diagonal, white round (054 and 055 share the design)
    slug: "blue-emerald-three-stone-diamond-necklace",
    name: "Blue Emerald Three-Stone Diamond Necklace",
    price: null,
    type: "Necklaces",
    shape: "Emerald",
    stone: "Blue emerald-cut diamond between a white pear diamond and a white round diamond, on a cable chain. [Carat, color, clarity — to be provided]",
    stoneGroup: "Diamond",
    metals: ["14k White Gold", "Platinum"], // white metal only
    defaultMetal: "Platinum",
    sizes: NECKLACE_LENGTHS,
    images: [
      { src: "/images/catalog/blue-emerald-three-stone-diamond-necklace/01-main.webp", kind: "sku" },
      { src: "/images/catalog/blue-emerald-three-stone-diamond-necklace/01-main-page.webp", kind: "detail" },
      { src: "/images/catalog/blue-emerald-three-stone-diamond-necklace/02-detail.webp", kind: "detail" },
      { src: "/images/catalog/blue-emerald-three-stone-diamond-necklace/05-on-body-v3.webp", kind: "on-body" },
    ],
    details: ["[DETAILS — to be provided]"],
    materials: ["[MATERIALS — to be provided]"],
    rank: 55,
    addedRank: -52,
  },
  {
    // PRODUCT 56 — 11 round diamonds in a cross on a very fine chain, yellow and white gold only
    slug: "diamond-cross-necklace",
    name: "Lab-Grown Diamond Cross Necklace",
    price: 979, // lowest of sizePrices — shown as "From $979"
    sizePrices: { "16 in": 979, "18 in": 999, "20 in": 1029 },
    type: "Necklaces",
    shape: "Round",
    stone: "Eleven round lab-grown diamonds form a timeless cross pendant, finished in polished 14K gold and paired with an 18-inch cable chain.",
    stoneGroup: "Diamond",
    metals: ["14k Yellow Gold", "14k White Gold"],
    defaultMetal: "14k Yellow Gold",
    sizes: NECKLACE_LENGTHS,
    images: [
      { src: "/images/catalog/diamond-cross-necklace/01-main.webp", kind: "sku" },
      { src: "/images/catalog/diamond-cross-necklace/01-main-page.webp", kind: "detail" },
      { src: "/images/catalog/diamond-cross-necklace/02-detail.webp", kind: "detail" },
      { src: "/images/catalog/diamond-cross-necklace/05-on-body.webp", kind: "on-body" },
    ],
    metalImages: {
      "14k White Gold": [
        { src: "/images/catalog/diamond-cross-necklace/01-main-page-white.webp", kind: "detail" },
        { src: "/images/catalog/diamond-cross-necklace/02-detail-white.webp", kind: "detail" },
        { src: "/images/catalog/diamond-cross-necklace/05-on-body-white.webp", kind: "on-body" },
      ],
    },
    details: [
      "11 round lab-grown diamonds, approx. 0.40 ct total weight",
      "Shared-prong setting",
      "Pendant approx. 15 mm wide × 21 mm high",
      "Cable chain in 16, 18 or 20 inches, with lobster clasp",
      "Polished finish",
    ],
    materials: ["14K yellow gold or 14K white gold", "Lab-grown diamonds"],
    rank: 56,
    addedRank: -53,
  },
  {
    // PRODUCT 57 — two stones in the chain: a sideways canary yellow pear (point to the left) and a small white round in a bezel; 14k yellow gold only
    slug: "yellow-pear-two-stone-diamond-necklace",
    name: "Yellow Pear Two-Stone Diamond Necklace",
    price: 1199,
    type: "Necklaces",
    shape: "Pear",
    stone: "A pear-shaped yellow lab-grown diamond of approx. 1.50 ct in three claws, linked to a 0.25 ct round white lab-grown diamond in a bezel, set in a fine 14K yellow gold cable chain.",
    stoneGroup: "Diamond",
    metals: ["14k Yellow Gold"], // yellow gold only
    defaultMetal: "14k Yellow Gold",
    sizes: NECKLACE_LENGTHS,
    images: [
      { src: "/images/catalog/yellow-pear-two-stone-diamond-necklace/01-main.webp", kind: "sku" },
      { src: "/images/catalog/yellow-pear-two-stone-diamond-necklace/01-main-page.webp", kind: "detail" },
      { src: "/images/catalog/yellow-pear-two-stone-diamond-necklace/02-detail.webp", kind: "detail" },
      { src: "/images/catalog/yellow-pear-two-stone-diamond-necklace/05-on-body.webp", kind: "on-body" },
    ],
    details: [
      "One pear-shaped yellow lab-grown diamond, approx. 1.50 ct, claw set",
      "One round white lab-grown diamond, 0.25 ct, bezel set",
      "Approx. 1.75 ct total diamond weight",
      "Cable chain in 16, 18 or 20 inches",
    ],
    materials: ["14K yellow gold", "Lab-grown diamonds"],
    rank: 57,
    addedRank: -54,
  },
  {
    // PRODUCT 58 — three-strand layered set: diamond-station paperclip chain, plain paperclip chain, and a snowflake pendant with a canary yellow centre; 14k yellow gold only
    slug: "snowflake-layered-diamond-necklace",
    name: "Snowflake Layered Diamond Necklace",
    price: 899, // lowest metal (silver) — shown as "From $899"
    type: "Necklaces",
    shape: "Round",
    stone: "Three layers in one: a paperclip chain with five lab-grown diamonds, a plain paperclip chain, and a fine chain with a snowflake pendant around a yellow lab-grown diamond.",
    stoneGroup: "Diamond",
    metals: ["14k Yellow Gold", "925 Sterling Silver"],
    defaultMetal: "14k Yellow Gold",
    metalPrices: SNOWFLAKE_METAL_PRICES,
    // No length selector: the three layers are fixed at 16, 18 and 20 in (see details).
    images: [
      { src: "/images/catalog/snowflake-layered-diamond-necklace/01-main-v2.webp", kind: "sku" },
      { src: "/images/catalog/snowflake-layered-diamond-necklace/01-main-page-v2.webp", kind: "detail" },
      { src: "/images/catalog/snowflake-layered-diamond-necklace/02-detail-v2.webp", kind: "detail" },
      { src: "/images/catalog/snowflake-layered-diamond-necklace/05-on-body-v5.webp", kind: "on-body" },
    ],
    details: [
      "Top layer: paperclip chain with 5 white lab-grown diamonds, 0.05 ct each",
      "Middle layer: plain paperclip chain",
      "Snowflake pendant: 6 outer white lab-grown diamonds, 0.10 ct each, and 6 inner, 0.03 ct each",
      "Center stone: 1 yellow lab-grown diamond, 0.10 ct",
      "18 diamonds, approx. 1.13 ct total diamond weight",
      "Layer lengths: 16 in, 18 in and 20 in",
      "Available in 14K yellow gold ($1,499) or 925 sterling silver ($899)",
    ],
    materials: ["14K yellow gold or 925 sterling silver", "Lab-grown diamonds"],
    rank: 58,
    addedRank: -55,
  },
  {
    // PRODUCT 59 — two-necklace layering set: yellow gold crescent-moon bezel solitaire + white gold four-diamond flower pendant
    slug: "moon-flower-layered-diamond-necklace",
    name: "Moon & Flower Layered Diamond Necklace",
    price: 699, // lowest of sizePrices — shown as "From $699"
    sizePrices: { "Moon necklace": 699, "Flower necklace": 899, "Both necklaces": 1499 }, // set price: $99 off buying the two separately
    type: "Necklaces",
    shape: "Round",
    stone: "Wear them together or on their own: a 14K yellow gold crescent-moon bezel necklace with a 1 ct lab-grown diamond, and a 14K white gold flower necklace featuring four 0.5 ct lab-grown diamonds.",
    stoneGroup: "Diamond",
    // Each necklace has its own fixed metal (moon: yellow gold, flower: white gold), so no metal selector.
    metals: [],
    sizes: ["Moon necklace", "Flower necklace", "Both necklaces"],
    sizeLabel: "Necklace",
    sizePieces: {
      "Moon necklace": [{ name: "Moon Necklace — 14K Yellow Gold", price: 699 }],
      "Flower necklace": [{ name: "Flower Necklace — 14K White Gold", price: 899 }],
      // The set is one bag line at the set price.
      "Both necklaces": [{ name: "Moon & Flower Set — both necklaces", price: 1499 }],
    },
    images: [
      { src: "/images/catalog/moon-flower-layered-diamond-necklace/01-main.webp", kind: "sku" },
      { src: "/images/catalog/moon-flower-layered-diamond-necklace/01-main-page.webp", kind: "detail" },
      { src: "/images/catalog/moon-flower-layered-diamond-necklace/02-detail.webp", kind: "detail" },
      { src: "/images/catalog/moon-flower-layered-diamond-necklace/05-on-body.webp", kind: "on-body" },
    ],
    details: [
      "Moon necklace: crescent-moon bezel with 1 round white lab-grown diamond, approx. 1 ct",
      "Flower necklace: flower pendant with 4 round white lab-grown diamonds, 0.5 ct each, approx. 2.00 ct total",
      "Buy either necklace on its own, or both as a set for $1,499 (save $99)",
    ],
    materials: ["Moon necklace: 14K yellow gold", "Flower necklace: 14K white gold", "Lab-grown diamonds"],
    rank: 59,
    addedRank: -56,
  },
  {
    // PRODUCT 60 — pink version of 058: same three-strand snowflake set, pink centre diamond; 14k yellow gold only
    slug: "pink-snowflake-layered-diamond-necklace",
    name: "Pink Snowflake Layered Diamond Necklace",
    price: 899, // lowest metal (silver) — shown as "From $899"
    type: "Necklaces",
    shape: "Round",
    stone: "Three layers in one: a paperclip chain with five lab-grown diamonds, a plain paperclip chain, and a fine chain with a snowflake pendant around a pink lab-grown diamond.",
    stoneGroup: "Diamond",
    metals: ["14k Yellow Gold", "925 Sterling Silver"],
    defaultMetal: "14k Yellow Gold",
    metalPrices: SNOWFLAKE_METAL_PRICES,
    // No length selector: the three layers are fixed at 16, 18 and 20 in (see details).
    images: [
      { src: "/images/catalog/pink-snowflake-layered-diamond-necklace/01-main-v3.webp", kind: "sku" },
      { src: "/images/catalog/pink-snowflake-layered-diamond-necklace/01-main-page-v3.webp", kind: "detail" },
      { src: "/images/catalog/pink-snowflake-layered-diamond-necklace/02-detail-v3.webp", kind: "detail" },
      { src: "/images/catalog/pink-snowflake-layered-diamond-necklace/05-on-body-v7.webp", kind: "on-body" },
    ],
    details: [
      "Top layer: paperclip chain with 5 white lab-grown diamonds, 0.05 ct each",
      "Middle layer: plain paperclip chain",
      "Snowflake pendant: 6 outer white lab-grown diamonds, 0.10 ct each, and 6 inner, 0.03 ct each",
      "Center stone: 1 pink lab-grown diamond, 0.10 ct",
      "18 diamonds, approx. 1.13 ct total diamond weight",
      "Layer lengths: 16 in, 18 in and 20 in",
      "Available in 14K yellow gold ($1,499) or 925 sterling silver ($899)",
    ],
    materials: ["14K yellow gold or 925 sterling silver", "Lab-grown diamonds"],
    rank: 60,
    addedRank: -57,
  },
  {
    // PRODUCT 61 — custom script nameplate necklace (shown with the name "Elanora"); the name is made to order. 14k yellow gold
    slug: "elanora-name-necklace",
    name: "Custom Name Necklace",
    price: null,
    type: "Necklaces",
    stone: "A polished 14K yellow gold nameplate in flowing cursive script with a swash underneath, on a fine cable chain. Shown with the name \"Elanora\" — made with the name of your choice. [Name length and size limits — to be provided]",
    stoneGroup: "Gold",
    customName: { maxLength: 12 }, // [name length limit — to be confirmed]
    metals: ["14k Yellow Gold"], // [other metals — to be confirmed]
    defaultMetal: "14k Yellow Gold",
    sizes: NECKLACE_LENGTHS,
    images: [
      { src: "/images/catalog/elanora-name-necklace/01-main.webp", kind: "sku" },
      { src: "/images/catalog/elanora-name-necklace/01-main-page.webp", kind: "detail" },
      { src: "/images/catalog/elanora-name-necklace/02-detail.webp", kind: "detail" },
      { src: "/images/catalog/elanora-name-necklace/05-on-body-v3.webp", kind: "on-body" },
    ],
    details: ["[DETAILS — to be provided]"],
    materials: ["[MATERIALS — to be provided]"],
    rank: 61,
    addedRank: -58,
  },
  {
    // PRODUCT 62 — pavé diamond initial pendant (shown as "R"), 14k yellow gold
    slug: "diamond-initial-necklace",
    name: "Lab-Grown Diamond Initial Necklace",
    price: null,
    type: "Necklaces",
    shape: "Round",
    stone: "A capital initial pendant fully paved with round lab-grown diamonds, edged in polished 14K yellow gold, on a fine cable chain. Available in every letter from A to Z; shown with the letter R.",
    initials: INITIALS,
    stoneGroup: "Diamond",
    metals: ["14k Yellow Gold"], // [other metals — to be confirmed]
    defaultMetal: "14k Yellow Gold",
    sizes: NECKLACE_LENGTHS,
    images: [
      { src: "/images/catalog/diamond-initial-necklace/01-main.webp", kind: "sku" },
      { src: "/images/catalog/diamond-initial-necklace/01-main-page.webp", kind: "detail" },
      { src: "/images/catalog/diamond-initial-necklace/02-detail.webp", kind: "detail" },
      { src: "/images/catalog/diamond-initial-necklace/05-on-body-v3.webp", kind: "on-body" },
    ],
    details: [
      "Round lab-grown diamonds, pavé set [stone count and total carat weight — to be provided]",
      "[Pendant size — to be provided]",
      "Cable chain in 16, 18 or 20 inches",
    ],
    materials: ["14K yellow gold", "Lab-grown diamonds"],
    rank: 62,
    addedRank: -59,
  },
  {
    // PRODUCT 63 — two-layer set: fine chain with five dangling bezel diamonds + chain with a bezel diamond and a pavé letter R; 14k yellow gold
    slug: "initial-r-layered-diamond-necklace",
    name: "Initial R Layered Diamond Necklace",
    price: 1299,
    type: "Necklaces",
    shape: "Round",
    stone: "Two layers in one: a fine chain with five dangling lab-grown diamond drops, and a chain with a bezel-set lab-grown diamond beside a pavé letter R.",
    stoneGroup: "Diamond",
    metals: ["14k Yellow Gold"], // yellow gold only
    defaultMetal: "14k Yellow Gold",
    sizes: NECKLACE_LENGTHS,
    images: [
      { src: "/images/catalog/initial-r-layered-diamond-necklace/01-main.webp", kind: "sku" },
      { src: "/images/catalog/initial-r-layered-diamond-necklace/01-main-page.webp", kind: "detail" },
      { src: "/images/catalog/initial-r-layered-diamond-necklace/02-detail.webp", kind: "detail" },
      { src: "/images/catalog/initial-r-layered-diamond-necklace/05-on-body-v2.webp", kind: "on-body" },
    ],
    details: [
      "Top layer: fine chain with 5 bezel-set white lab-grown diamonds, 0.03 ct each",
      "Bottom layer: 1 bezel-set white lab-grown diamond, 0.05 ct, beside the pavé letter R pendant",
      "Letter R: pavé-set with white lab-grown diamonds, 0.03 ct each",
      "Approx. 0.50 ct total diamond weight",
      "Necklace length: 16, 18 or 20 in",
    ],
    materials: ["14K yellow gold", "Lab-grown diamonds"],
    rank: 63,
    addedRank: -60,
  },  {
    // PRODUCT 64 — butterfly of four lab-grown diamonds (two marquise upper wings, two pear lower wings) set in the chain; 14k white / yellow / rose gold
    slug: "marquise-butterfly-diamond-necklace",
    name: "Lab-Grown Diamond Butterfly Necklace",
    price: null,
    type: "Necklaces",
    shape: "Marquise",
    stone: "A small butterfly of four lab-grown diamonds — two marquise-cut upper wings and two pear-shaped lower wings — set in fine claws on a delicate cable chain.",
    stoneGroup: "Diamond",
    metals: ["14k White Gold", "14k Yellow Gold", "14k Rose Gold"],
    defaultMetal: "14k White Gold",
    sizes: NECKLACE_LENGTHS,
    images: necklaceImages("marquise-butterfly-diamond-necklace"),
    metalImages: necklaceMetalImages("marquise-butterfly-diamond-necklace"),
    details: [
      "2 marquise-cut and 2 pear-shaped lab-grown diamonds [carat weights — to be provided]",
      "Claw setting",
      "[Pendant size — to be provided]",
      "Cable chain in 16, 18 or 20 inches",
    ],
    materials: ["14K white, yellow or rose gold", "Lab-grown diamonds"],
    rank: 64,
    addedRank: -61,
  },  {
    // PRODUCT 65 — round pink lab-grown diamond in a white-diamond halo, on a bail as a pendant; 14k white / yellow / rose gold
    slug: "pink-round-halo-diamond-necklace",
    name: "Pink Round Halo Diamond Pendant",
    price: null,
    type: "Necklaces",
    shape: "Round",
    stone: "A round pink lab-grown diamond in four claws, framed by a halo of white lab-grown diamonds, hanging from a polished bail on a fine cable chain.",
    stoneGroup: "Diamond",
    metals: ["14k White Gold", "14k Yellow Gold", "14k Rose Gold"],
    defaultMetal: "14k White Gold",
    sizes: NECKLACE_LENGTHS,
    images: necklaceImages("pink-round-halo-diamond-necklace"),
    metalImages: necklaceMetalImages("pink-round-halo-diamond-necklace"),
    details: [
      "Round pink lab-grown centre diamond [carat weight — to be provided]",
      "Halo of round white lab-grown diamonds [stone count and total weight — to be provided]",
      "[Pendant size — to be provided]",
      "Cable chain in 16, 18 or 20 inches",
    ],
    materials: ["14K white, yellow or rose gold", "Lab-grown diamonds"],
    rank: 65,
    addedRank: -62,
  },  {
    // PRODUCT 66 — "Cosmopolitan" martini-glass pendant: triangular pink lab-grown diamond as the drink, pavé rim, lime-twist curl with a diamond drop; 14k white gold only
    slug: "pink-cosmopolitan-diamond-necklace",
    name: "Pink Diamond Cosmopolitan Necklace",
    price: 1199, // lowest carat option
    type: "Necklaces",
    // no shape tag: trillion is not one of the Diamond Shape filter options
    stone: "A martini glass in polished 14K white gold, filled with a triangular pink lab-grown diamond, with a pavé diamond rim and a curled lime twist holding a small diamond drop. A toast to the city, on a fine cable chain.",
    stoneGroup: "Diamond",
    metals: ["14k White Gold"], // 14K gold only
    defaultMetal: "14k White Gold",
    carats: Object.keys(COSMOPOLITAN_CARAT_PRICES),
    caratPrices: COSMOPOLITAN_CARAT_PRICES,
    sizes: NECKLACE_LENGTHS,
    images: [
      { src: "/images/catalog/pink-cosmopolitan-diamond-necklace/01-main.webp", kind: "sku" },
      { src: "/images/catalog/pink-cosmopolitan-diamond-necklace/01-main-page.webp", kind: "detail" },
      { src: "/images/catalog/pink-cosmopolitan-diamond-necklace/02-detail.webp", kind: "detail" },
      { src: "/images/catalog/pink-cosmopolitan-diamond-necklace/05-on-body-v4.webp", kind: "on-body" },
    ],
    details: [
      "Triangular pink lab-grown diamond, approx. 1.5 ct — $1,199",
      "Pavé white lab-grown diamond rim and a round diamond drop [stone count and total weight — to be provided]",
      "[Pendant size — to be provided]",
      "Cable chain in 16, 18 or 20 inches",
    ],
    materials: ["14K white gold", "Lab-grown diamonds"],
    rank: 66,
    addedRank: -63,
  },  {
    // PRODUCT 67 — cocktail series no. 2, champagne flute pendant: pear-shaped yellow lab-grown diamond as the champagne, pavé rim; 14k white gold only
    slug: "yellow-champagne-diamond-necklace",
    name: "Yellow Diamond Champagne Necklace",
    price: 1099, // lowest carat option
    type: "Necklaces",
    shape: "Pear",
    stone: "A champagne flute in polished 14K white gold, filled with a pear-shaped yellow lab-grown diamond and finished with a pavé diamond rim. A companion to the Cosmopolitan, on a fine cable chain.",
    stoneGroup: "Diamond",
    metals: ["14k White Gold"], // 14K gold only
    defaultMetal: "14k White Gold",
    carats: Object.keys(COCKTAIL_CARAT_PRICES),
    caratPrices: COCKTAIL_CARAT_PRICES,
    sizes: NECKLACE_LENGTHS,
    images: [
      { src: "/images/catalog/yellow-champagne-diamond-necklace/01-main.webp", kind: "sku" },
      { src: "/images/catalog/yellow-champagne-diamond-necklace/01-main-page.webp", kind: "detail" },
      { src: "/images/catalog/yellow-champagne-diamond-necklace/02-detail.webp", kind: "detail" },
      { src: "/images/catalog/yellow-champagne-diamond-necklace/05-on-body-v4.webp", kind: "on-body" },
    ],
    details: [
      "Pear-shaped yellow lab-grown diamond: 2 ct ($1,099) or 3 ct ($1,199)",
      "Pavé white lab-grown diamond rim [stone count and total weight — to be provided]",
      "[Pendant size — to be provided]",
      "Cable chain in 16, 18 or 20 inches",
    ],
    materials: ["14K white gold", "Lab-grown diamonds"],
    rank: 67,
    addedRank: -64,
  },  {
    // PRODUCT 68 — cocktail series no. 3, "Blue Lagoon" highball pendant: emerald-cut blue lab-grown diamond as the drink, pavé rim, slim straw; 14k white gold only
    slug: "blue-lagoon-diamond-necklace",
    name: "Blue Diamond Blue Lagoon Necklace",
    price: 1099, // lowest carat option
    type: "Necklaces",
    shape: "Emerald",
    stone: "A highball glass in polished 14K white gold, filled with an emerald-cut blue lab-grown diamond, with a pavé diamond rim and a slim straw. Joins the Cosmopolitan and the Champagne, on a fine cable chain.",
    stoneGroup: "Diamond",
    metals: ["14k White Gold"], // 14K gold only
    defaultMetal: "14k White Gold",
    carats: Object.keys(COCKTAIL_CARAT_PRICES),
    caratPrices: COCKTAIL_CARAT_PRICES,
    sizes: NECKLACE_LENGTHS,
    images: [
      { src: "/images/catalog/blue-lagoon-diamond-necklace/01-main.webp", kind: "sku" },
      { src: "/images/catalog/blue-lagoon-diamond-necklace/01-main-page.webp", kind: "detail" },
      { src: "/images/catalog/blue-lagoon-diamond-necklace/02-detail.webp", kind: "detail" },
      { src: "/images/catalog/blue-lagoon-diamond-necklace/05-on-body-v2.webp", kind: "on-body" },
    ],
    details: [
      "Emerald-cut blue lab-grown diamond: 2 ct ($1,099) or 3 ct ($1,199)",
      "Pavé white lab-grown diamond rim [stone count and total weight — to be provided]",
      "[Pendant size — to be provided]",
      "Cable chain in 16, 18 or 20 inches",
    ],
    materials: ["14K white gold", "Lab-grown diamonds"],
    rank: 68,
    addedRank: -65,
  },  {
    // PRODUCT 69 — perfume-bottle series no. 1: oval pink lab-grown diamond as the bottle, pavé neck, round diamond stopper; 14k white gold only
    slug: "pink-perfume-bottle-diamond-necklace",
    name: "Pink Diamond Perfume Bottle Necklace",
    price: 799, // lowest metal / carat option, pendant only — shown as "From $799"
    type: "Necklaces",
    shape: "Oval",
    stone: "A vintage perfume bottle in polished 14K white gold: an oval pink lab-grown diamond for the bottle, a pavé diamond neck and a round diamond stopper, on a fine cable chain.",
    stoneGroup: "Diamond",
    metals: PERFUME_METALS, // 14K gold or 925 sterling silver
    defaultMetal: "14k White Gold",
    carats: PERFUME_CARATS,
    metalCaratPrices: PERFUME_PRICES, // pendant only
    chainAddOn: PERFUME_CHAIN, // optional 14K gold chain, never sold on its own
    images: [
      { src: "/images/catalog/pink-perfume-bottle-diamond-necklace/01-main.webp", kind: "sku" },
      { src: "/images/catalog/pink-perfume-bottle-diamond-necklace/01-main-page.webp", kind: "detail" },
      { src: "/images/catalog/pink-perfume-bottle-diamond-necklace/02-detail.webp", kind: "detail" },
      { src: "/images/catalog/pink-perfume-bottle-diamond-necklace/05-on-body-v4.webp", kind: "on-body" },
    ],
    metalImages: perfumeYellowGold("pink-perfume-bottle-diamond-necklace"),
    details: [
      "Bottle-shaped centre stone: lab-grown diamond, 2 ct or 3 ct",
      "Pendant available in 14K white gold, 14K yellow gold or 925 sterling silver",
      "Round white lab-grown diamond stopper and pavé neck [stone count and total weight — to be provided]",
      "[Pendant size — to be provided]",
      "Pendant only — chain not included",
      "Optional 14K gold chain (16, 18 or 20 in) for $239, available only with the pendant",
    ],
    materials: ["14K white or yellow gold, or 925 sterling silver", "Lab-grown diamonds"],
    rank: 69,
    addedRank: -66,
  },  {
    // PRODUCT 70 — perfume-bottle series no. 2: cushion-cut blue lab-grown diamond as the bottle, pavé neck, round diamond stopper; 14k white gold only
    slug: "blue-perfume-bottle-diamond-necklace",
    name: "Blue Diamond Perfume Bottle Necklace",
    price: 799, // lowest metal / carat option, pendant only — shown as "From $799"
    type: "Necklaces",
    shape: "Cushion",
    stone: "A classic square-shouldered perfume bottle in polished 14K white gold: a cushion-cut blue lab-grown diamond for the bottle, a pavé diamond neck and a round diamond stopper, on a fine cable chain.",
    stoneGroup: "Diamond",
    metals: PERFUME_METALS, // 14K gold or 925 sterling silver
    defaultMetal: "14k White Gold",
    carats: PERFUME_CARATS,
    metalCaratPrices: PERFUME_PRICES, // pendant only
    chainAddOn: PERFUME_CHAIN, // optional 14K gold chain, never sold on its own
    images: [
      { src: "/images/catalog/blue-perfume-bottle-diamond-necklace/01-main.webp", kind: "sku" },
      { src: "/images/catalog/blue-perfume-bottle-diamond-necklace/01-main-page.webp", kind: "detail" },
      { src: "/images/catalog/blue-perfume-bottle-diamond-necklace/02-detail.webp", kind: "detail" },
      { src: "/images/catalog/blue-perfume-bottle-diamond-necklace/05-on-body-v3.webp", kind: "on-body" },
    ],
    metalImages: perfumeYellowGold("blue-perfume-bottle-diamond-necklace"),
    details: [
      "Bottle-shaped centre stone: lab-grown diamond, 2 ct or 3 ct",
      "Pendant available in 14K white gold, 14K yellow gold or 925 sterling silver",
      "Round white lab-grown diamond stopper and pavé neck [stone count and total weight — to be provided]",
      "[Pendant size — to be provided]",
      "Pendant only — chain not included",
      "Optional 14K gold chain (16, 18 or 20 in) for $239, available only with the pendant",
    ],
    materials: ["14K white or yellow gold, or 925 sterling silver", "Lab-grown diamonds"],
    rank: 70,
    addedRank: -67,
  },  {
    // PRODUCT 71 — perfume-bottle series no. 3: pear-shaped yellow lab-grown diamond (point up) as a teardrop bottle, pavé neck, round diamond stopper; 14k white gold only
    slug: "yellow-perfume-bottle-diamond-necklace",
    name: "Yellow Diamond Perfume Bottle Necklace",
    price: 799, // lowest metal / carat option, pendant only — shown as "From $799"
    type: "Necklaces",
    shape: "Pear",
    stone: "A teardrop perfume bottle in polished 14K white gold: a pear-shaped yellow lab-grown diamond for the bottle, a pavé diamond neck and a round diamond stopper, on a fine cable chain.",
    stoneGroup: "Diamond",
    metals: PERFUME_METALS, // 14K gold or 925 sterling silver
    defaultMetal: "14k White Gold",
    carats: PERFUME_CARATS,
    metalCaratPrices: PERFUME_PRICES, // pendant only
    chainAddOn: PERFUME_CHAIN, // optional 14K gold chain, never sold on its own
    images: [
      { src: "/images/catalog/yellow-perfume-bottle-diamond-necklace/01-main.webp", kind: "sku" },
      { src: "/images/catalog/yellow-perfume-bottle-diamond-necklace/01-main-page.webp", kind: "detail" },
      { src: "/images/catalog/yellow-perfume-bottle-diamond-necklace/02-detail.webp", kind: "detail" },
      { src: "/images/catalog/yellow-perfume-bottle-diamond-necklace/05-on-body.webp", kind: "on-body" },
    ],
    metalImages: perfumeYellowGold("yellow-perfume-bottle-diamond-necklace"),
    details: [
      "Bottle-shaped centre stone: lab-grown diamond, 2 ct or 3 ct",
      "Pendant available in 14K white gold, 14K yellow gold or 925 sterling silver",
      "Round white lab-grown diamond stopper and pavé neck [stone count and total weight — to be provided]",
      "[Pendant size — to be provided]",
      "Pendant only — chain not included",
      "Optional 14K gold chain (16, 18 or 20 in) for $239, available only with the pendant",
    ],
    materials: ["14K white or yellow gold, or 925 sterling silver", "Lab-grown diamonds"],
    rank: 71,
    addedRank: -68,
  },  {
    // PRODUCT 73 — cocktail series, rosé champagne: the 067 champagne flute with a pear-shaped pink lab-grown diamond; 14k yellow gold only
    slug: "pink-champagne-diamond-necklace",
    name: "Pink Diamond Champagne Necklace",
    price: 1099, // lowest carat option
    type: "Necklaces",
    shape: "Pear",
    stone: "A champagne flute in polished 14K yellow gold, filled with a pear-shaped pink lab-grown diamond for a glass of rosé, finished with a pavé diamond rim, on a fine cable chain.",
    stoneGroup: "Diamond",
    metals: ["14k Yellow Gold"], // 14K gold only
    defaultMetal: "14k Yellow Gold",
    carats: Object.keys(COCKTAIL_CARAT_PRICES),
    caratPrices: COCKTAIL_CARAT_PRICES,
    sizes: NECKLACE_LENGTHS,
    images: [
      { src: "/images/catalog/pink-champagne-diamond-necklace/01-main-v2.webp", kind: "sku" },
      { src: "/images/catalog/pink-champagne-diamond-necklace/01-main-page-v2.webp", kind: "detail" },
      { src: "/images/catalog/pink-champagne-diamond-necklace/02-detail-v2.webp", kind: "detail" },
      { src: "/images/catalog/pink-champagne-diamond-necklace/05-on-body-v2.webp", kind: "on-body" },
    ],
    details: [
      "Pear-shaped pink lab-grown diamond: 2 ct ($1,099) or 3 ct ($1,199)",
      "Pavé white lab-grown diamond rim [stone count and total weight — to be provided]",
      "[Pendant size — to be provided]",
      "Cable chain in 16, 18 or 20 inches",
    ],
    materials: ["14K yellow gold", "Lab-grown diamonds"],
    rank: 73,
    addedRank: -70,
  },  {
    // PRODUCT 74 — open teardrop loop pendant holding a round pink lab-grown diamond (approx. 1 ct) at the bottom, fine cable chain; 14k yellow gold only
    slug: "pink-teardrop-diamond-necklace",
    name: "Pink Diamond Teardrop Necklace",
    price: 699, // lowest option (silver, 1 ct) — shown as "From $699"
    type: "Necklaces",
    shape: "Round",
    stone: "A slim open teardrop cradling a round pink lab-grown diamond at its base, in 925 sterling silver or 14K yellow gold. Sold as the pendant; add a 14K gold chain if you like.",
    stoneGroup: "Diamond",
    metals: ["14k Yellow Gold", "925 Sterling Silver"],
    defaultMetal: "14k Yellow Gold",
    carats: TEARDROP_CARATS,
    metalCaratPrices: TEARDROP_PRICES, // pendant only
    chainAddOn: PERFUME_CHAIN, // 14K gold chain, $239; white gold with the silver pendant; never sold on its own
    images: [
      { src: "/images/catalog/pink-teardrop-diamond-necklace/01-main.webp", kind: "sku" },
      { src: "/images/catalog/pink-teardrop-diamond-necklace/01-main-page.webp", kind: "detail" },
      { src: "/images/catalog/pink-teardrop-diamond-necklace/02-detail.webp", kind: "detail" },
      { src: "/images/catalog/pink-teardrop-diamond-necklace/05-on-body.webp", kind: "on-body" },
    ],
    metalImages: {
      "925 Sterling Silver": [
        { src: "/images/catalog/pink-teardrop-diamond-necklace/01-main-page-silver.webp", kind: "detail" },
        { src: "/images/catalog/pink-teardrop-diamond-necklace/02-detail-silver.webp", kind: "detail" },
        { src: "/images/catalog/pink-teardrop-diamond-necklace/05-on-body-silver.webp", kind: "on-body" },
      ],
    },
    details: [
      "Pendant only — chain not included",
      "One round pink lab-grown diamond: 1 ct, 1.5 ct, 2 ct or 3 ct",
      "925 sterling silver or 14K yellow gold",
      "Optional 14K gold chain (16, 18 or 20 in) for $239, available only with the pendant",
      "[Pendant size — to be provided]",
    ],
    materials: ["925 sterling silver or 14K yellow gold", "Lab-grown diamond"],
    rank: 74,
    addedRank: -71,
  },  {
    // PRODUCT 75 — snowflake cluster ring: round centre diamond ringed by eight outward-pointing pear diamonds, split pavé band
    slug: "snowflake-cluster-diamond-ring",
    name: "Snowflake Cluster Diamond Ring",
    price: null,
    type: "Rings",
    collections: ["engagement-bridal"],
    shape: "Round",
    stone: "A round brilliant lab-grown diamond at the centre of eight pear-shaped lab-grown diamonds, their points turned outward like a snowflake, on a split pavé band. [Carat weights — to be provided]",
    stoneGroup: "Diamond",
    metals: RING_METALS,
    defaultMetal: "Platinum",
    sizes: RING_SIZES,
    images: [
      { src: "/images/catalog/snowflake-cluster-diamond-ring/01-sku.webp", kind: "sku" },
      { src: "/images/catalog/snowflake-cluster-diamond-ring/02-three-quarter.webp", kind: "detail" },
      { src: "/images/catalog/snowflake-cluster-diamond-ring/03-profile.webp", kind: "detail" },
      { src: "/images/catalog/snowflake-cluster-diamond-ring/05-on-hand.webp", kind: "on-body" },
    ],
    metalImages: ringMetalImages("snowflake-cluster-diamond-ring"),
    details: [
      "Round brilliant lab-grown centre diamond [carat weight — to be provided]",
      "Eight pear-shaped lab-grown diamonds in a snowflake cluster",
      "Split band set with pavé lab-grown diamonds",
    ],
    materials: ["14K gold or platinum", "Lab-grown diamonds"],
    rank: 75,
    addedRank: -72,
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
// Price of a piece for the chosen metal / carat / size, following whichever option prices it.
export const optionPrice = (item: CatalogItem, metal: string, carat: string, size: string): number | null =>
  item.metalCaratPrices?.[metal]?.[carat] ??
  item.caratPrices?.[carat] ??
  item.metalPrices?.[metal] ??
  (size ? item.sizePrices?.[size] : undefined) ??
  item.price;

export const fromPrice = (item: CatalogItem) => {
  if (item.customName) return "Price on request";
  if (item.price === null) return "From $[PRICE]";
  // A piece with a single carat price and no other priced options has one price: no "From".
  const single =
    item.caratPrices && Object.keys(item.caratPrices).length === 1 && !item.sizePrices && !item.metalCaratPrices && !item.metalPrices;
  return single ? formatUSD(item.price) : `From ${formatUSD(item.price)}`;
};

// Gallery images for the chosen metal: that metal's own set when there is one,
// otherwise the default images. The collection SKU shot is never part of the gallery.
// Every product page shows the first on-body photo second, right after the main shot.
const onBodySecond = (imgs: GalleryImage[]): GalleryImage[] => {
  const i = imgs.findIndex((img) => img.kind === "on-body");
  if (i <= 1) return imgs;
  const rest = imgs.filter((_, j) => j !== i);
  return [rest[0], imgs[i], ...rest.slice(1)];
};
export const galleryFor = (item: CatalogItem, metal: string): GalleryImage[] => {
  const pick = (imgs: GalleryImage[]) => imgs.filter((i) => i.kind !== "sku");
  const own = pick(item.metalImages?.[metal] ?? []);
  if (own.length) return onBodySecond(own);
  const base = pick(item.images);
  return onBodySecond(base.length ? base : item.images);
};
