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

// Ring band styles (Rings page tiles + Band filter), in display order.
export const RING_BANDS = ["Plain Band", "Pavé Band", "Split Shank"] as const;
export type RingBand = (typeof RING_BANDS)[number];
// Ring styles (the tiles at the top of the Rings page + the Ring Style filter), in display order:
// a quick way for customers to see the kinds of rings we make.
export const RING_STYLES = ["Solitaire", "Halo", "Pavé", "Three-Stone & Side Stones", "Statement"] as const;
export type RingStyle = (typeof RING_STYLES)[number];
// Tile image for each style: the most typical ring of that style (round solitaire, heart halo,
// round pavé, oval three-stone, snowflake), cut from its SKU shot and re-framed so every ring
// is the same size on a white 4:3 tile (public/images/ring-styles/).
export const RING_STYLE_IMAGES: Record<RingStyle, string> = {
  Solitaire: "/images/ring-styles/solitaire.webp",
  Halo: "/images/ring-styles/halo.webp",
  "Pavé": "/images/ring-styles/pave.webp",
  "Three-Stone & Side Stones": "/images/ring-styles/three-stone.webp",
  Statement: "/images/ring-styles/statement.webp",
};

export interface GalleryImage {
  src: string;
  kind: "sku" | "detail" | "on-body" | "video"; // "video": a muted looping clip (mp4) in the product gallery
  poster?: string; // still shown before a video plays
  focus?: { x: number; y: number }; // videos: where the diamond is (0–1); the gallery crops so it sits a little above centre
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
  ringStyle?: RingStyle; // rings only: style group for the Rings page tiles and the Ring Style filter
  band?: RingBand; // rings only: band style, for the Band filter and the band tiles on the Rings page
  caratPrices?: Record<string, number>; // USD price per centre-diamond carat option (Carat selector); `price` is then the lowest
  // USD price per metal and centre-diamond carat, when both change the price; `price` is then the lowest.
  metalCaratPrices?: Record<string, Record<string, number>>;
  metalPrices?: Record<string, number>; // USD price per metal, when only the metal changes the price; `price` is then the lowest
  // USD added on top of the metal / carat price for each size (e.g. longer bracelets cost more).
  sizeSurcharges?: Record<string, number>;
  caratLabel?: string; // heading for the carat selector when it isn't a centre stone (e.g. "Average Carat Weight")
  // Length surcharge that depends on the chosen carat option: carat -> size -> USD added (replaces sizeSurcharges).
  caratSizeSurcharges?: Record<string, Record<string, number>>;
  hideCaratTotal?: boolean; // don't show an estimated total carat weight in the selection summary
  optionsNote?: string; // short note shown under the carat / size selectors
  // Estimated total carat weight per carat option and size, from supplier data only. Without an
  // entry the page shows the carat option itself and notes that the total varies with size.
  caratWeights?: Record<string, Record<string, string>>;
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
  /** limited-time discount for this series instead of the sitewide 10% (see data/promo.ts) */
  salePercentOff?: number;
  /** limited-time discount for particular carat weights, e.g. { "5 ctw": 15 } (see data/promo.ts) */
  caratSalePercentOff?: Record<string, number>;
  /** what one unit of the price buys, shown beside the price and in the bag, e.g. "single earring" */
  priceUnit?: string;
  hideInShop?: boolean; // left off the shop / category listings; the product page stays reachable via its Shape selector
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

// Standard US ring sizes, 3 to 10 in half sizes — used by every ring.
const RING_SIZES = ["3", "3.5", "4", "4.5", "5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10"].map((s) => `US ${s}`);
const BRACELET_LENGTHS = ["6 in", "6.5 in", "7 in", "7.5 in"]; // [Lengths offered — to be confirmed]

// Round Diamond Tennis Bracelet (user, 2026-11-07): 14K or 18K gold, approx. 0.05 ct round
// diamonds. Lengths run from 5.5 in through 7.5 in, in 0.25 in steps.
const TENNIS_LENGTHS = Array.from({ length: 9 }, (_, i) => `${5.5 + 0.25 * i} in`);
// Diamond tennis bracelets: priced by Average Carat Weight (ctw). Prices below are 14K for the
// 5.5 / 5.75 in bracelet; longer lengths add $50 per half inch (tennisLengthSurcharge). 18K adds $200.
// During the limited-time sale, 5 ctw and up are 15% off (the rest 10%). Repriced 2026-11-13 (then all lowered $100
// the same day): 5 ct = 4 ct + $200, 7 = 5 + $300, 9 = 7 + $400, 10 = 9 + $200, 12 = 10 + $500, 15 = 12 + $300.
// Supplier reference weights (not shown on the site, not guaranteed): 2.08, 3.06, 4.36, 5.59, 7.33,
// 8.99, 9.69, 12.09 and 15.36 ctw.
const ROUND_TENNIS_SIZES: [string, number][] = [
  // [average carat weight, 14K price at 5.5 / 5.75 in]
  ["2 ctw", 1399],
  ["3 ctw", 1499],
  ["4 ctw", 1599],
  ["5 ctw", 1799],
  ["7 ctw", 2099],
  ["9 ctw", 2499],
  ["10 ctw", 2699],
  ["12 ctw", 3199],
  ["15 ctw", 3499],
];
const ROUND_TENNIS_CARATS = ROUND_TENNIS_SIZES.map(([c]) => c);
const ROUND_TENNIS_PRICES: Record<string, Record<string, number>> = Object.fromEntries(
  ["14k White Gold", "14k Yellow Gold", "14k Rose Gold", "18k White Gold", "18k Yellow Gold", "18k Rose Gold"].map((m) => [m, Object.fromEntries(ROUND_TENNIS_SIZES.map(([c, p]) => [c, p + (m.startsWith("18k") ? 200 : 0)]))]),
);
// Length surcharge in half-inch pairs (the options keep their 0.25 in steps): 5.5 and 5.75 in are the
// base price, 6 and 6.25 in add $50, 6.5 and 6.75 in add $100, and so on (2026-11-13).
const tennisLengthSurcharge = (length: string) => Math.floor((parseFloat(length) - 5.5) / 0.5 + 1e-9) * 50;
const ROUND_TENNIS_LENGTH_SURCHARGES = Object.fromEntries(
  ROUND_TENNIS_CARATS.map((c) => [c, Object.fromEntries(TENNIS_LENGTHS.map((l) => [l, tennisLengthSurcharge(l)]))]),
);

// Every diamond tennis bracelet (round, pear, heart, round and emerald-cut) uses the Round Diamond
// Tennis Bracelet's metals, diamond sizes, lengths and prices (user, 2026-11-08).
const TENNIS_OPTIONS = {
  price: ROUND_TENNIS_PRICES["14k White Gold"]["2 ctw"], // shown as "From $1,399"
  metals: ["14k White Gold", "14k Yellow Gold", "14k Rose Gold", "18k White Gold", "18k Yellow Gold", "18k Rose Gold"],
  defaultMetal: "14k White Gold",
  sizes: TENNIS_LENGTHS,
  carats: ROUND_TENNIS_CARATS,
  caratLabel: "Average Carat Weight (ctw)",
  hideCaratTotal: true,
  optionsNote: "Carat weight is approximate and may vary slightly by bracelet length.",
  metalCaratPrices: ROUND_TENNIS_PRICES,
  caratSizeSurcharges: ROUND_TENNIS_LENGTH_SURCHARGES,
  // 15% off from 5 ctw during the limited-time sale (smaller weights get the sitewide 10%)
  caratSalePercentOff: Object.fromEntries(["5 ctw", "7 ctw", "9 ctw", "10 ctw", "12 ctw", "15 ctw"].map((c) => [c, 15])),
};
// On-body photos of the round tennis bracelet in white gold, from slim to bold (studio, no face). Shown
// for every metal; the size of each bracelet isn't labelled.
// The first one was re-done on a pure white background (05-on-body-00-v2, 2026-11-11).
const TENNIS_ROUND_ON_BODY: GalleryImage[] = ["00-v2", "01", "06", "03"].map((n) => ({
  src: `/images/catalog/round-diamond-tennis-bracelet/05-on-body-${n}.webp`,
  kind: "on-body",
}));
const tennisDetails = (stones: string[]) => [
  "Sold as a complete bracelet",
  ...stones,
  "Made in your choice of 14K or 18K gold",
  "Average carat weight from approx. 2 ctw to 15 ctw",
  "Bracelet length from 5.5 in to 7.5 in, in 0.25 in steps",
  "Carat weight is approximate and may vary slightly by bracelet length",
];
const tennisStone = (diamonds: string) =>
  `Crafted in your choice of 14K or 18K gold, this tennis bracelet features ${diamonds}. Choose its average carat weight (ctw) and length; carat weight is approximate and may vary slightly by bracelet length.`;
const INITIALS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const NECKLACE_LENGTHS = ["16 in", "18 in", "20 in"]; // [Chain lengths offered — to be confirmed]

// Solitaire diamond rings (oval, round, emerald-cut, pear): 14K or 18K gold, lab-grown centre
// diamond from 1 ct. 1 ct is $799 in 14K and $999 in 18K (18K raised $100 on 2026-11-07);
// every further 0.5 ct adds $100.
const SOLITAIRE_RING_METALS = [
  "14k White Gold", "14k Yellow Gold", "14k Rose Gold",
  "18k White Gold", "18k Yellow Gold", "18k Rose Gold",
];
const solitaireRingCaratPrices = (base: number) => Object.fromEntries(CARATS.map((c, i) => [c, base + 100 * i]));
const SOLITAIRE_RING_PRICES: Record<string, Record<string, number>> = Object.fromEntries(
  SOLITAIRE_RING_METALS.map((m) => [m, solitaireRingCaratPrices(m.startsWith("18k") ? 999 : 799)]),
);
// Same recoloured images for 14K and 18K of each gold colour; white gold uses the default images.
const solitaireRingMetalImages = (slug: string): Record<string, GalleryImage[]> => {
  const set = ringMetalImages(slug);
  return { ...set, "18k Yellow Gold": set["14k Yellow Gold"], "18k Rose Gold": set["14k Rose Gold"] };
};
const solitaireRingDetails = (shape: string) => [
  "Material: 14K or 18K gold",
  "Center stone: lab-grown diamond",
  `Center stone shape: ${shape}`,
  "Number of center stones: 1",
  "Center stone size: selectable, from 1 ct",
  "Center stone color: D–E",
  "Certificate: IGI",
  "Prices may vary with the current gold price and ring size.",
];

// Pavé diamond rings (oval, round): same metals as the solitaires, one lab-grown centre diamond
// from 1 ct plus approx. 0.40 ct of pavé side diamonds (not part of the carat choice).
// 1 ct is $899 in 14K and $1,099 in 18K; every further 0.5 ct of centre stone adds $100.
const PAVE_RING_PRICES: Record<string, Record<string, number>> = Object.fromEntries(
  SOLITAIRE_RING_METALS.map((m) => [m, solitaireRingCaratPrices(m.startsWith("18k") ? 1099 : 899)]),
);
const paveRingDetails = (shape: string) => [
  "Made in your choice of 14K or 18K gold",
  `One IGI-certified lab-grown center diamond, ${shape.toLowerCase()} shape, from 1 ct`,
  "Center stone color D–E, clarity VVS2",
  "Approx. 0.40 ct total weight of pavé-set lab-grown side diamonds",
  "Prices may vary with the current gold price and ring size.",
];

// Halo diamond rings (all ten shapes): the pavé-ring prices + $100 (2026-11-13) — 1 ct is $999 in 14K
// and $1,199 in 18K, +$100 per further 0.5 ct of centre stone; approx. 0.40 ct of side diamonds in the
// halo and band. 15% off during the limited-time sale (HALO_RING_SALE) instead of the sitewide 10%.
const HALO_RING_PRICES: Record<string, Record<string, number>> = Object.fromEntries(
  SOLITAIRE_RING_METALS.map((m) => [m, solitaireRingCaratPrices(m.startsWith("18k") ? 1199 : 999)]),
);
const HALO_RING_SALE = 15;
const haloRingDetails = (shape: string, color = "D–E") => [
  "Made in your choice of 14K or 18K gold",
  `One IGI-certified lab-grown center diamond, ${shape.toLowerCase()} shape, from 1 ct`,
  `Center stone color ${color}, clarity VVS2`,
  "Approx. 0.40 ct total weight of lab-grown side diamonds in the halo and band",
  "Prices may vary with the current gold price and ring size.",
];
// 18K gold shows the same recoloured images as 14K of the same colour.
const with18k = (set: Record<string, GalleryImage[]>): Record<string, GalleryImage[]> => ({
  ...set,
  "18k Yellow Gold": set["14k Yellow Gold"],
  "18k Rose Gold": set["14k Rose Gold"],
});

// Three-stone diamond rings: 14K or 18K gold, lab-grown centre diamond from 1 ct. Priced at the
// pavé-ring price + $200 for every metal and carat (2026-11-07): 1 ct is $1,099 in 14K and
// $1,299 in 18K; every further 0.5 ct of centre stone adds $100.
const THREE_STONE_RING_PRICES: Record<string, Record<string, number>> = Object.fromEntries(
  Object.entries(PAVE_RING_PRICES).map(([metal, prices]) => [
    metal,
    Object.fromEntries(Object.entries(prices).map(([carat, price]) => [carat, price + 200])),
  ]),
);
const threeStoneRingDetails = (shape: string, sides: string) => [
  "Made in your choice of 14K or 18K gold",
  `One lab-grown center diamond, ${shape.toLowerCase()} shape, from 1 ct`,
  `Two ${sides}`,
  "Prices may vary with the current gold price and ring size.",
];

// Bezel diamond rings: 1 ct is $899 in 14K and $1,099 in 18K (14K lowered $100 on 2026-11-13;
// 18K is 14K + $200); every further 0.5 ct adds $100. Same stone details as the solitaires.
const BEZEL_RING_PRICES: Record<string, Record<string, number>> = Object.fromEntries(
  SOLITAIRE_RING_METALS.map((m) => [m, solitaireRingCaratPrices(m.startsWith("18k") ? 1099 : 899)]),
);

// Real ring videos (customer clips, 2026-11-07): a gallery item for the metal the video shows.
const ringVideo = (slug: string, tone: string, focus: { x: number; y: number }): GalleryImage => ({
  src: `/images/catalog/${slug}/06-video${tone}.mp4`,
  poster: `/images/catalog/${slug}/06-video-poster${tone}.webp`,
  kind: "video",
  focus, // where the diamond is in the clip; the gallery crops so it sits a little above centre
});
// Adds a video to the given metals' image sets (yellow-gold clips go on the yellow gold metals).
const withMetalVideo = (sets: Record<string, GalleryImage[]>, metals: string[], video: GalleryImage) => ({
  ...sets,
  ...Object.fromEntries(metals.map((m) => [m, [...(sets[m] ?? []), video]])),
});

// Halo pendants (sold without a chain): the centre diamond is chosen by carat. 0.5 ct is the
// base price and every further 0.5 ct adds $100. The 14K gold chain is an optional add-on.
const HALO_PENDANT_CARATS = ["Approx. 0.5 ct", "Approx. 1.0 ct", "Approx. 1.5 ct", "Approx. 2.0 ct", "Approx. 2.5 ct"];
const HALO_PENDANT_BASE = 799;
const haloPendantCaratPrices = Object.fromEntries(HALO_PENDANT_CARATS.map((c, i) => [c, HALO_PENDANT_BASE + 100 * i]));
// Pink round halo necklace (065): the same carat steps as the white halo pendants, $300 over them,
// sold with its 14K gold chain (16, 18 or 20 in).
const PINK_HALO_PENDANT_CARAT_PRICES = Object.fromEntries(HALO_PENDANT_CARATS.map((c, i) => [c, HALO_PENDANT_BASE + 300 + 100 * i]));
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
const COCKTAIL_CARAT_PRICES: Record<string, number> = { "2 ct": 1299, "3 ct": 1399 }; // +$200 on 2026-11-13
const COSMOPOLITAN_CARAT_PRICES: Record<string, number> = { "Approx. 1.5 ct": 1399 }; // +$200 on 2026-11-13

// Perfume bottle pendants: priced by metal and centre-diamond carat.
const PERFUME_METALS = ["14k White Gold", "14k Yellow Gold"]; // silver dropped on 2026-11-13
const PERFUME_CARATS = ["2 ct", "3 ct"];
const PERFUME_PRICES: Record<string, Record<string, number>> = {
  "14k White Gold": { "2 ct": 1099, "3 ct": 1299 }, // +$200 on 2026-11-13
  "14k Yellow Gold": { "2 ct": 1099, "3 ct": 1299 },
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

// Pink teardrop necklace: priced by metal and centre-diamond carat; 14K gold is $100 over silver
// at every size. Sold with its chain (in the same metal), 16, 18 or 20 in. Raised $200 on 2026-11-13
// when the chain was included.
const TEARDROP_SILVER_PRICES: Record<string, number> = { "1 ct": 899, "1.5 ct": 999, "2 ct": 1099, "3 ct": 1299 };
const TEARDROP_CARATS = Object.keys(TEARDROP_SILVER_PRICES);
const TEARDROP_PRICES: Record<string, Record<string, number>> = {
  "925 Sterling Silver": TEARDROP_SILVER_PRICES,
  "14k Yellow Gold": Object.fromEntries(TEARDROP_CARATS.map((c) => [c, TEARDROP_SILVER_PRICES[c] + 100])),
};

// Solitaire pendants (sold without a chain): the centre diamond is chosen by carat; the 14K gold
// chain is the same optional add-on as the halo pendants and is never sold on its own.
// 0.5 ct $539, 1.0 ct $599, then +$100 per half carat (0.3 ct dropped on 2026-11-13).
const SOLITAIRE_PENDANT_CARAT_PRICES: Record<string, number> = {
  "Approx. 0.5 ct": 539,
  "Approx. 1.0 ct": 599,
  "Approx. 1.5 ct": 699,
  "Approx. 2.0 ct": 799,
  "Approx. 2.5 ct": 899,
};
const SOLITAIRE_PENDANT_CARATS = Object.keys(SOLITAIRE_PENDANT_CARAT_PRICES);
const solitairePendantDetails = (cut: string) => [
  "Pendant only, crafted in 14K gold — chain not included",
  `${cut} lab-grown diamond centre stone, approx. 0.5 ct to 2.5 ct`,
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
// Angel wing earrings use the new on-ear photos (05-on-ear-v3: cream wall, coloured cami, no face).
const onEarV3 = (images: GalleryImage[]): GalleryImage[] =>
  images.map((i) => (i.kind === "on-body" ? { ...i, src: i.src.replace("05-on-ear.webp", "05-on-ear-v3.webp") } : i));
// For earrings photographed in white metal (platinum / white gold use the default images):
// yellow gold and rose gold each have their own set.
const whiteEarringMetalImages = (slug: string, v = ""): Record<string, GalleryImage[]> => {
  const set = (tone: string): GalleryImage[] => [
    { src: `/images/catalog/${slug}/01-main-page-${tone}${v}.webp`, kind: "detail" },
    { src: `/images/catalog/${slug}/05-on-ear-${tone}.webp`, kind: "on-body" },
  ];
  return { "14k Yellow Gold": set("yellow-gold"), "14k Rose Gold": set("rose-gold") };
};
// Halo stud earrings (round, oval, emerald, pear, heart, yellow pear, yellow heart — user,
// 2026-11-08): priced per pair by the carat of each stud, in 14K or 18K gold (sterling silver dropped
// 2026-11-13). 0.5 ct each is $1,099 in 14K and $1,299 in 18K (raised $100 on 2026-11-13); 1.0 ct each
// is $1,199 / $1,399, and every further 0.5 ct each adds $200. 18K is 14K + $200.
// 15% off during the limited-time sale instead of the sitewide 10%.
const HALO_STUD_CARATS = ["Approx. 0.5 ct each", "Approx. 1.0 ct each", "Approx. 1.5 ct each", "Approx. 2.0 ct each", "Approx. 2.5 ct each"]; // [Largest size offered — to be confirmed]
const HALO_STUD_METALS = [
  "14k White Gold", "14k Yellow Gold", "14k Rose Gold",
  "18k White Gold", "18k Yellow Gold", "18k Rose Gold",
];
const HALO_STUD_PRICES: Record<string, Record<string, number>> = Object.fromEntries(
  HALO_STUD_METALS.map((m) => {
    const base = m.startsWith("18k") ? 1199 : 999;
    // 0.5 ct each (i = 0) is $100 above the base; from 1.0 ct each the $200 steps are unchanged.
    return [m, Object.fromEntries(HALO_STUD_CARATS.map((c, i) => [c, base + 200 * i + (i === 0 ? 100 : 0)]))];
  }),
);
const HALO_STUD_OPTIONS = {
  price: HALO_STUD_PRICES["14k White Gold"][HALO_STUD_CARATS[0]], // lowest option (14K, 0.5 ct each)
  metals: HALO_STUD_METALS,
  defaultMetal: "14k White Gold",
  carats: HALO_STUD_CARATS,
  caratLabel: "Carat Weight",
  metalCaratPrices: HALO_STUD_PRICES,
  salePercentOff: 15,
};
// 18K white gold uses the white images; 18K yellow / rose use the 14K sets.
const haloStudMetalImages = (slug: string, v = ""): Record<string, GalleryImage[]> => {
  const set = whiteEarringMetalImages(slug, v);
  return { ...set, "18k Yellow Gold": set["14k Yellow Gold"], "18k Rose Gold": set["14k Rose Gold"] };
};
const haloStudDetails = (shape: string) => [
  `${shape} lab-grown diamond centre stones, each framed by a halo of round lab-grown diamonds`,
  "Sold as a pair",
  "Centre stones from approx. 0.5 ct to 2.5 ct each",
  "Made in 14K or 18K gold",
];

// Angel wing pieces (necklaces, bracelets, earrings) come in 14K gold only (silver dropped on
// 2026-11-13): pink pieces in rose gold, yellow pieces in yellow gold, blue pieces in white gold; the
// pink and yellow necklaces add 14K white gold. Each has a 2 ct or 3 ct centre pear.
const WING_CARATS = ["2 ct", "3 ct"];
// Necklaces also come in 14K white gold (white-metal photos).
const wingWhiteMetalImages = (slug: string): Record<string, GalleryImage[]> => {
  const white: GalleryImage[] = [
    { src: `/images/catalog/${slug}/01-main-page-white.webp`, kind: "detail" },
    { src: `/images/catalog/${slug}/02-detail-white.webp`, kind: "detail" },
    { src: `/images/catalog/${slug}/05-on-body-v2-white.webp`, kind: "on-body" },
  ];
  return { "14k White Gold": white };
};
const wingDetails = (color: string) => [
  `Center stone: 2 ct or 3 ct pear-shaped ${color} lab-grown diamond`,
  "Angel wings pavé-set with white lab-grown diamonds",
  "Chain length: 16, 18 or 20 in",
];
// Price per metal for the 2 ct pear; 3 ct is $200 more.
const wingCaratPrices = (metalPrices: Record<string, number>): Record<string, Record<string, number>> =>
  Object.fromEntries(Object.entries(metalPrices).map(([m, p]) => [m, { "2 ct": p, "3 ct": p + 200 }]));
// Angel wing necklaces use the second round of on-body photos (05-on-body-v2…).
const onBodyV2 = (images: GalleryImage[]): GalleryImage[] =>
  images.map((i) => (i.kind === "on-body" ? { ...i, src: i.src.replace("05-on-body", "05-on-body-v2") } : i));

// One shared on-body photo for every metal (gold variants change only the main shot).
const sharedOnBody = (images: GalleryImage[], src: string): GalleryImage[] =>
  images.map((i) => (i.kind === "on-body" ? { ...i, src } : i));
const sharedOnBodyMetals = (sets: Record<string, GalleryImage[]>, src: string): Record<string, GalleryImage[]> =>
  Object.fromEntries(Object.entries(sets).map(([metal, images]) => [metal, sharedOnBody(images, src)]));

// Emerald-cut three-stone necklaces (054 yellow, 055 blue): 1.5 ct colored emerald-cut centre
// between a 1 ct white pear and a 1 ct white round; white gold, 14K or 18K.
const THREE_STONE_NECKLACE_PRICES = { "14k White Gold": 1499, "18k White Gold": 1699 };
const threeStoneNecklaceStone = (color: string) =>
  `A ${color} emerald-cut lab-grown diamond of approx. 1.5 ct, set on a diagonal between a white pear diamond and a white round diamond of approx. 1 ct each, on a cable chain.`;
const threeStoneNecklaceDetails = (color: string) => [
  `Centre stone: ${color} emerald-cut lab-grown diamond, approx. 1.5 ct`,
  "Side stones: one white pear and one white round lab-grown diamond, approx. 1 ct each",
  "Claw settings, cable chain",
  "14K or 18K white gold",
  "Price may vary slightly with the current gold price",
];

export const catalog: CatalogItem[] = [
  {
    // PRODUCT 01
    slug: "oval-three-stone-diamond-ring",
    name: "Oval Three-Stone Diamond Ring",
    price: THREE_STONE_RING_PRICES["14k White Gold"]["1ct"], // lowest option (14K, 1 ct) — shown as "From $1,099"
    type: "Rings",
    ringStyle: "Three-Stone & Side Stones",
    band: "Plain Band",
    collections: ["engagement-bridal"],
    shape: "Oval",
    stone: "An oval lab-grown diamond from 1 ct between two pear-shaped lab-grown side diamonds of approx. 0.40 ct each, on a plain polished band.",
    stoneGroup: "Diamond",
    metals: SOLITAIRE_RING_METALS,
    defaultMetal: "14k White Gold",
    sizes: RING_SIZES,
    carats: CARATS,
    metalCaratPrices: THREE_STONE_RING_PRICES,
    images: [
      { src: "/images/catalog/oval-three-stone-diamond-ring/01-sku-v7.webp", kind: "sku" },
      { src: "/images/catalog/oval-three-stone-diamond-ring/02-three-quarter-v3.webp", kind: "detail" },
      { src: "/images/catalog/oval-three-stone-diamond-ring/03-profile.webp", kind: "detail" },
      { src: "/images/catalog/oval-three-stone-diamond-ring/05-on-hand-lux.webp", kind: "on-body" },
    ],
    metalImages: with18k(ringMetalImages("oval-three-stone-diamond-ring")),
    details: threeStoneRingDetails("Oval", "pear-shaped lab-grown side diamonds, approx. 0.40 ct each"),
    materials: ["14K or 18K gold", "Lab-grown diamonds"],
    rank: 1,
    addedRank: 2,
  },
  {
    // PRODUCT 02
    slug: "yellow-oval-halo-diamond-ring",
    name: "Yellow Oval Halo Diamond Ring",
    price: HALO_RING_PRICES["14k White Gold"]["1ct"], // lowest option — shown as "From $999"
    type: "Rings",
    ringStyle: "Halo",
    band: "Pavé Band",
    collections: ["engagement-bridal"],
    shapeGroup: "halo-diamond-ring",
    shape: "Oval",
    stone: "Yellow oval diamond with a white diamond halo and diamond band. Lab-grown, center stone from 1 ct (fancy yellow, VVS2, IGI), approx. 0.40 ct side stones.",
    stoneGroup: "Diamond",
    metals: SOLITAIRE_RING_METALS,
    metalCaratPrices: HALO_RING_PRICES,
    salePercentOff: HALO_RING_SALE,
    defaultMetal: "14k White Gold",
    sizes: RING_SIZES,
    carats: CARATS,
    images: [
      { src: "/images/catalog/yellow-oval-halo-diamond-ring/01-sku-v8.webp", kind: "sku" },
      { src: "/images/catalog/yellow-oval-halo-diamond-ring/02-three-quarter-v5.webp", kind: "detail" },
      { src: "/images/catalog/yellow-oval-halo-diamond-ring/03-profile-v5.webp", kind: "detail" },
      { src: "/images/catalog/yellow-oval-halo-diamond-ring/05-on-hand-lux.webp", kind: "on-body" },
    ],
    // Yellow stone re-toned to match the other yellow diamonds (-v5 files).
    metalImages: with18k(
      Object.fromEntries(
        (["yellow-gold", "rose-gold"] as const).map((tone) => [
          tone === "yellow-gold" ? "14k Yellow Gold" : "14k Rose Gold",
          [
            { src: `/images/catalog/yellow-oval-halo-diamond-ring/02-three-quarter-${tone}-v5.webp`, kind: "detail" },
            { src: `/images/catalog/yellow-oval-halo-diamond-ring/03-profile-${tone}-v5.webp`, kind: "detail" },
            { src: `/images/catalog/yellow-oval-halo-diamond-ring/05-on-hand-${tone}-v5.webp`, kind: "on-body" },
          ] as GalleryImage[],
        ]),
      )),
    details: haloRingDetails("Oval", "fancy yellow"),
    materials: ["14K or 18K gold", "Lab-grown diamonds: IGI-certified center stone and approx. 0.40 ct side stones"],
    rank: 2,
    addedRank: 1,
  },
  {
    // PRODUCT 03
    slug: "oval-solitaire-diamond-ring",
    name: "Oval Solitaire Diamond Ring",
    price: SOLITAIRE_RING_PRICES["14k White Gold"]["1ct"], // lowest option — shown as "From $799"
    type: "Rings",
    ringStyle: "Solitaire",
    band: "Plain Band",
    collections: ["engagement-bridal"],
    shapeGroup: "solitaire-diamond-ring",
    shape: "Oval",
    stone: "Oval diamond solitaire in four claws. Lab-grown, D–E color, IGI certified, from 1 ct.",
    stoneGroup: "Diamond",
    metals: SOLITAIRE_RING_METALS,
    metalCaratPrices: SOLITAIRE_RING_PRICES,
    defaultMetal: "14k White Gold",
    sizes: RING_SIZES,
    carats: CARATS,
    images: [
      { src: "/images/catalog/oval-solitaire-diamond-ring/01-sku-v3.webp", kind: "sku" },
      { src: "/images/catalog/oval-solitaire-diamond-ring/02-three-quarter.webp", kind: "detail" },
      { src: "/images/catalog/oval-solitaire-diamond-ring/03-profile.webp", kind: "detail" },
      { src: "/images/catalog/oval-solitaire-diamond-ring/05-on-hand-lux.webp", kind: "on-body" },
    ],
    metalImages: withMetalVideo(solitaireRingMetalImages("oval-solitaire-diamond-ring"), ["14k Yellow Gold", "18k Yellow Gold"], ringVideo("oval-solitaire-diamond-ring", "-yellow-gold", { x: 0.57, y: 0.52 })),
    details: solitaireRingDetails("Oval"),
    materials: ["14K or 18K gold", "Lab-grown diamond, D–E color, IGI certified"],
    rank: 3,
    addedRank: 0,
  },
  {
    // PRODUCT 04
    slug: "oval-pave-diamond-ring",
    name: "Oval Pavé Diamond Ring",
    price: PAVE_RING_PRICES["14k White Gold"]["1ct"], // lowest option — shown as "From $899"
    type: "Rings",
    ringStyle: "Pavé",
    band: "Pavé Band",
    collections: ["engagement-bridal"],
    shape: "Oval",
    stone: "Oval diamond in four claws on a band of graduated diamonds. Lab-grown, center stone from 1 ct (D–E, VVS2, IGI), approx. 0.40 ct pavé side stones.",
    stoneGroup: "Diamond",
    metals: SOLITAIRE_RING_METALS,
    metalCaratPrices: PAVE_RING_PRICES,
    defaultMetal: "14k White Gold",
    sizes: RING_SIZES,
    carats: CARATS,
    images: [
      { src: "/images/catalog/oval-pave-diamond-ring/01-sku.webp", kind: "sku" },
      { src: "/images/catalog/oval-pave-diamond-ring/02-three-quarter.webp", kind: "detail" },
      { src: "/images/catalog/oval-pave-diamond-ring/03-profile.webp", kind: "detail" },
      { src: "/images/catalog/oval-pave-diamond-ring/05-on-hand-lux.webp", kind: "on-body" },
    ],
    metalImages: solitaireRingMetalImages("oval-pave-diamond-ring"),
    details: paveRingDetails("Oval"),
    materials: ["14K or 18K gold", "Lab-grown diamonds: IGI-certified center stone (D–E, VVS2) and approx. 0.40 ct pavé side stones"],
    rank: 4,
    addedRank: -1,
  },
  {
    // PRODUCT 05
    slug: "round-solitaire-diamond-ring",
    name: "Round Solitaire Diamond Ring",
    price: SOLITAIRE_RING_PRICES["14k White Gold"]["1ct"], // lowest option — shown as "From $799"
    type: "Rings",
    ringStyle: "Solitaire",
    band: "Plain Band",
    collections: ["engagement-bridal"],
    shapeGroup: "solitaire-diamond-ring",
    shape: "Round",
    stone: "Round diamond solitaire in four claws. Lab-grown, D–E color, IGI certified, from 1 ct.",
    stoneGroup: "Diamond",
    metals: SOLITAIRE_RING_METALS,
    metalCaratPrices: SOLITAIRE_RING_PRICES,
    defaultMetal: "14k White Gold",
    sizes: RING_SIZES,
    carats: CARATS,
    images: [
      { src: "/images/catalog/round-solitaire-diamond-ring/01-sku.webp", kind: "sku" },
      { src: "/images/catalog/round-solitaire-diamond-ring/02-three-quarter.webp", kind: "detail" },
      { src: "/images/catalog/round-solitaire-diamond-ring/03-profile.webp", kind: "detail" },
      { src: "/images/catalog/round-solitaire-diamond-ring/05-on-hand-lux.webp", kind: "on-body" },
      ringVideo("round-solitaire-diamond-ring", "", { x: 0.6, y: 0.56 }), // real video of the ring (white metal)
    ],
    metalImages: withMetalVideo(solitaireRingMetalImages("round-solitaire-diamond-ring"), ["14k Yellow Gold", "18k Yellow Gold"], ringVideo("round-solitaire-diamond-ring", "-yellow-gold", { x: 0.6, y: 0.44 })),
    details: solitaireRingDetails("Round"),
    materials: ["14K or 18K gold", "Lab-grown diamond, D–E color, IGI certified"],
    rank: 5,
    addedRank: -2,
  },

  {
    // PRODUCT 07
    slug: "round-halo-diamond-ring",
    name: "Yellow Round Halo Diamond Ring",
    price: HALO_RING_PRICES["14k White Gold"]["1ct"], // lowest option — shown as "From $999"
    type: "Rings",
    ringStyle: "Halo",
    band: "Pavé Band",
    collections: ["engagement-bridal"],
    shapeGroup: "halo-diamond-ring",
    shape: "Round",
    stone: "Yellow round diamond in six claws with a white diamond halo, on a band set with diamonds. Lab-grown, center stone from 1 ct (fancy yellow, VVS2, IGI), approx. 0.40 ct side stones.",
    stoneGroup: "Diamond",
    metals: SOLITAIRE_RING_METALS,
    metalCaratPrices: HALO_RING_PRICES,
    salePercentOff: HALO_RING_SALE,
    defaultMetal: "14k White Gold",
    sizes: RING_SIZES,
    carats: CARATS,
    images: [
      { src: "/images/catalog/round-halo-diamond-ring/01-sku-v3.webp", kind: "sku" },
      { src: "/images/catalog/round-halo-diamond-ring/02-three-quarter-v3.webp", kind: "detail" },
      { src: "/images/catalog/round-halo-diamond-ring/03-profile.webp", kind: "detail" },
      { src: "/images/catalog/round-halo-diamond-ring/05-on-hand-lux.webp", kind: "on-body" },
      ringVideo("round-halo-diamond-ring", "", { x: 0.54, y: 0.54 }), // real video of the ring (white metal)
    ],
    metalImages: with18k(ringMetalImages("round-halo-diamond-ring", "-v3")),
    details: haloRingDetails("Round", "fancy yellow"),
    materials: ["14K or 18K gold", "Lab-grown diamonds: IGI-certified center stone and approx. 0.40 ct side stones"],
    rank: 7,
    addedRank: -4,
  },
  {
    // PRODUCT 08
    slug: "round-pave-diamond-ring",
    name: "Round Pavé Diamond Ring",
    price: PAVE_RING_PRICES["14k White Gold"]["1ct"], // lowest option — shown as "From $899"
    type: "Rings",
    ringStyle: "Pavé",
    band: "Pavé Band",
    collections: ["engagement-bridal"],
    shape: "Round",
    stone: "Round diamond in four claws on a band set with a row of diamonds. Lab-grown, center stone from 1 ct (D–E, VVS2, IGI), approx. 0.40 ct pavé side stones.",
    stoneGroup: "Diamond",
    metals: SOLITAIRE_RING_METALS,
    metalCaratPrices: PAVE_RING_PRICES,
    defaultMetal: "14k White Gold",
    sizes: RING_SIZES,
    carats: CARATS,
    images: [
      { src: "/images/catalog/round-pave-diamond-ring/01-sku.webp", kind: "sku" },
      { src: "/images/catalog/round-pave-diamond-ring/02-three-quarter.webp", kind: "detail" },
      { src: "/images/catalog/round-pave-diamond-ring/03-profile.webp", kind: "detail" },
      { src: "/images/catalog/round-pave-diamond-ring/05-on-hand-lux.webp", kind: "on-body" },
    ],
    metalImages: solitaireRingMetalImages("round-pave-diamond-ring"),
    details: paveRingDetails("Round"),
    materials: ["14K or 18K gold", "Lab-grown diamonds: IGI-certified center stone (D–E, VVS2) and approx. 0.40 ct pavé side stones"],
    rank: 8,
    addedRank: -5,
  },
  {
    // PRODUCT 09
    slug: "yellow-emerald-halo-diamond-ring",
    name: "Yellow Emerald-Cut Halo Diamond Ring",
    price: HALO_RING_PRICES["14k White Gold"]["1ct"], // lowest option — shown as "From $999"
    type: "Rings",
    ringStyle: "Halo",
    band: "Pavé Band",
    collections: ["engagement-bridal"],
    shapeGroup: "halo-diamond-ring",
    shape: "Emerald",
    stone: "Yellow emerald-cut diamond in four claws with a white diamond halo, on a fully pavé-set diamond band. Lab-grown, center stone from 1 ct (fancy yellow, VVS2, IGI), approx. 0.40 ct side stones.",
    stoneGroup: "Diamond",
    metals: SOLITAIRE_RING_METALS,
    metalCaratPrices: HALO_RING_PRICES,
    salePercentOff: HALO_RING_SALE,
    defaultMetal: "14k White Gold",
    sizes: RING_SIZES,
    carats: CARATS,
    images: [
      { src: "/images/catalog/yellow-emerald-halo-diamond-ring/01-sku-v2.webp", kind: "sku" },
      { src: "/images/catalog/yellow-emerald-halo-diamond-ring/02-three-quarter.webp", kind: "detail" },
      { src: "/images/catalog/yellow-emerald-halo-diamond-ring/03-profile.webp", kind: "detail" },
      { src: "/images/catalog/yellow-emerald-halo-diamond-ring/05-on-hand-lux.webp", kind: "on-body" },
    ],
    metalImages: with18k(ringMetalImages("yellow-emerald-halo-diamond-ring")),
    details: haloRingDetails("Emerald-cut", "fancy yellow"),
    materials: ["14K or 18K gold", "Lab-grown diamonds: IGI-certified center stone and approx. 0.40 ct side stones"],
    rank: 9,
    addedRank: -6,
  },
  {
    // PRODUCT 10
    slug: "emerald-solitaire-diamond-ring",
    name: "Emerald-Cut Solitaire Diamond Ring",
    price: SOLITAIRE_RING_PRICES["14k White Gold"]["1ct"], // lowest option — shown as "From $799"
    type: "Rings",
    ringStyle: "Solitaire",
    band: "Plain Band",
    collections: ["engagement-bridal"],
    shapeGroup: "solitaire-diamond-ring",
    shape: "Emerald",
    stone: "Emerald-cut diamond solitaire in four claws. Lab-grown, D–E color, IGI certified, from 1 ct.",
    stoneGroup: "Diamond",
    metals: SOLITAIRE_RING_METALS,
    metalCaratPrices: SOLITAIRE_RING_PRICES,
    defaultMetal: "14k White Gold",
    sizes: RING_SIZES,
    carats: CARATS,
    images: [
      { src: "/images/catalog/emerald-solitaire-diamond-ring/01-sku.webp", kind: "sku" },
      { src: "/images/catalog/emerald-solitaire-diamond-ring/02-three-quarter.webp", kind: "detail" },
      { src: "/images/catalog/emerald-solitaire-diamond-ring/03-profile.webp", kind: "detail" },
      { src: "/images/catalog/emerald-solitaire-diamond-ring/05-on-hand-v2.webp", kind: "on-body" },
      ringVideo("emerald-solitaire-diamond-ring", "", { x: 0.47, y: 0.55 }), // real video of the ring (white metal)
    ],
    metalImages: solitaireRingMetalImages("emerald-solitaire-diamond-ring"),
    details: solitaireRingDetails("Emerald-cut"),
    materials: ["14K or 18K gold", "Lab-grown diamond, D–E color, IGI certified"],
    rank: 10,
    addedRank: -7,
  },
  {
    // PRODUCT 11
    slug: "emerald-bezel-diamond-ring",
    name: "Emerald-Cut Bezel Diamond Ring",
    price: BEZEL_RING_PRICES["14k Yellow Gold"]["1ct"], // lowest option — shown as "From $899"
    type: "Rings",
    ringStyle: "Solitaire",
    band: "Plain Band",
    collections: ["engagement-bridal"],
    shape: "Emerald",
    stone: "Emerald-cut diamond in a fully enclosed bezel on a slim plain band. Lab-grown, D–E color, IGI certified, from 1 ct.",
    stoneGroup: "Diamond",
    metals: SOLITAIRE_RING_METALS,
    metalCaratPrices: BEZEL_RING_PRICES,
    defaultMetal: "14k Yellow Gold", // main SKU photo is yellow gold; the detail views below are the white-metal set
    sizes: RING_SIZES,
    carats: CARATS,
    images: [
      { src: "/images/catalog/emerald-bezel-diamond-ring/01-sku-v2.webp", kind: "sku" },
      { src: "/images/catalog/emerald-bezel-diamond-ring/02-three-quarter.webp", kind: "detail" },
      { src: "/images/catalog/emerald-bezel-diamond-ring/03-profile.webp", kind: "detail" },
      { src: "/images/catalog/emerald-bezel-diamond-ring/05-on-hand.webp", kind: "on-body" },
    ],
    // Yellow gold (the default) has the new on-hand photo; 18K yellow shares it.
    metalImages: (() => {
      const sets = with18k(ringMetalImages("emerald-bezel-diamond-ring"));
      const yellow = sharedOnBody(sets["14k Yellow Gold"], "/images/catalog/emerald-bezel-diamond-ring/05-on-hand-yellow-gold-v2.webp");
      return { ...sets, "14k Yellow Gold": yellow, "18k Yellow Gold": yellow };
    })(),
    details: solitaireRingDetails("Emerald-cut"),
    materials: ["14K or 18K gold", "Lab-grown diamond, D–E color, IGI certified"],
    rank: 11,
    addedRank: -8,
  },
  {
    // PRODUCT 12
    slug: "emerald-split-pave-diamond-ring",
    name: "Emerald-Cut Split Pavé Diamond Ring",
    price: PAVE_RING_PRICES["14k White Gold"]["1ct"], // lowest option — shown as "From $899"
    type: "Rings",
    ringStyle: "Pavé",
    band: "Split Shank",
    collections: ["engagement-bridal"],
    shape: "Emerald",
    stone: "Emerald-cut diamond in four claws with a hidden diamond halo, on a split pavé band. Lab-grown, center stone from 1 ct (D–E, VVS2, IGI), approx. 0.40 ct pavé side stones.",
    stoneGroup: "Diamond",
    metals: SOLITAIRE_RING_METALS,
    metalCaratPrices: PAVE_RING_PRICES,
    defaultMetal: "14k White Gold",
    sizes: RING_SIZES,
    carats: CARATS,
    images: [
      { src: "/images/catalog/emerald-split-pave-diamond-ring/01-sku.webp", kind: "sku" },
      { src: "/images/catalog/emerald-split-pave-diamond-ring/02-three-quarter.webp", kind: "detail" },
      { src: "/images/catalog/emerald-split-pave-diamond-ring/03-profile.webp", kind: "detail" },
      { src: "/images/catalog/emerald-split-pave-diamond-ring/05-on-hand-v2.webp", kind: "on-body" },
    ],
    metalImages: with18k(ringMetalImages("emerald-split-pave-diamond-ring")),
    details: paveRingDetails("Emerald-cut"),
    materials: ["14K or 18K gold", "Lab-grown diamonds: IGI-certified center stone (D–E, VVS2) and approx. 0.40 ct pavé side stones"],
    rank: 12,
    addedRank: -9,
  },
  {
    // PRODUCT 13
    slug: "yellow-pear-halo-diamond-ring",
    name: "Yellow Pear Halo Diamond Ring",
    price: HALO_RING_PRICES["14k White Gold"]["1ct"], // lowest option — shown as "From $999"
    type: "Rings",
    ringStyle: "Halo",
    band: "Pavé Band",
    collections: ["engagement-bridal"],
    shapeGroup: "halo-diamond-ring",
    shape: "Pear",
    stone: "Yellow pear-shaped diamond in yellow gold claws with a white diamond halo, on a diamond-set band. Lab-grown, center stone from 1 ct (fancy yellow, VVS2, IGI), approx. 0.40 ct side stones.",
    stoneGroup: "Diamond",
    metals: SOLITAIRE_RING_METALS,
    metalCaratPrices: HALO_RING_PRICES,
    salePercentOff: HALO_RING_SALE,
    defaultMetal: "14k White Gold",
    sizes: RING_SIZES,
    carats: CARATS,
    images: [
      { src: "/images/catalog/yellow-pear-halo-diamond-ring/01-sku.webp", kind: "sku" },
      // 02 re-made (-v2): the old three-quarter had the pear lying along the band and oversized halo stones
      { src: "/images/catalog/yellow-pear-halo-diamond-ring/02-three-quarter-v2.webp", kind: "detail" },
      { src: "/images/catalog/yellow-pear-halo-diamond-ring/03-profile.webp", kind: "detail" },
      { src: "/images/catalog/yellow-pear-halo-diamond-ring/05-on-hand-v2.webp", kind: "on-body" },
    ],
    metalImages: with18k(ringMetalImages("yellow-pear-halo-diamond-ring", "-v2")),
    details: haloRingDetails("Pear", "fancy yellow"),
    materials: ["14K or 18K gold", "Lab-grown diamonds: IGI-certified center stone and approx. 0.40 ct side stones"],
    rank: 13,
    addedRank: -10,
  },
  {
    // PRODUCT 14
    slug: "pear-three-stone-diamond-ring",
    name: "Pear Three-Stone Diamond Ring",
    price: THREE_STONE_RING_PRICES["14k White Gold"]["1ct"], // lowest option (14K, 1 ct) — shown as "From $1,099"
    type: "Rings",
    ringStyle: "Three-Stone & Side Stones",
    band: "Plain Band",
    collections: ["engagement-bridal"],
    shape: "Pear",
    stone: "A pear-shaped lab-grown diamond from 1 ct between two pear-shaped lab-grown side diamonds, on a plain polished band. [Side stone weight — to be provided]",
    stoneGroup: "Diamond",
    metals: SOLITAIRE_RING_METALS,
    defaultMetal: "14k White Gold",
    sizes: RING_SIZES,
    carats: CARATS,
    metalCaratPrices: THREE_STONE_RING_PRICES,
    images: [
      { src: "/images/catalog/pear-three-stone-diamond-ring/01-sku-v2.webp", kind: "sku" },
      { src: "/images/catalog/pear-three-stone-diamond-ring/02-three-quarter.webp", kind: "detail" },
      { src: "/images/catalog/pear-three-stone-diamond-ring/03-profile.webp", kind: "detail" },
      { src: "/images/catalog/pear-three-stone-diamond-ring/05-on-hand-v2.webp", kind: "on-body" },
      ringVideo("pear-three-stone-diamond-ring", "", { x: 0.53, y: 0.58 }), // real video of the ring (white metal)
    ],
    metalImages: with18k(ringMetalImages("pear-three-stone-diamond-ring")),
    details: threeStoneRingDetails("Pear", "pear-shaped lab-grown side diamonds [weight — to be provided]"),
    materials: ["14K or 18K gold", "Lab-grown diamonds"],
    rank: 14,
    addedRank: -11,
  },
  {
    // PRODUCT 15
    slug: "pear-split-pave-diamond-ring",
    name: "Pear Split Pavé Diamond Ring",
    price: PAVE_RING_PRICES["14k White Gold"]["1ct"], // pavé-ring pricing (halo rings were raised $100 on 2026-11-13) — shown as "From $899"
    type: "Rings",
    ringStyle: "Pavé",
    band: "Split Shank",
    collections: ["engagement-bridal"],
    shape: "Pear",
    stone: "Pear-shaped diamond in three claws on a split band set with pavé diamonds. Lab-grown, center stone from 1 ct (D–E, VVS2, IGI), approx. 0.40 ct pavé side stones.",
    stoneGroup: "Diamond",
    metals: SOLITAIRE_RING_METALS,
    metalCaratPrices: PAVE_RING_PRICES,
    defaultMetal: "14k White Gold",
    sizes: RING_SIZES,
    carats: CARATS,
    images: [
      { src: "/images/catalog/pear-split-pave-diamond-ring/01-sku.webp", kind: "sku" },
      { src: "/images/catalog/pear-split-pave-diamond-ring/02-three-quarter-v2.webp", kind: "detail" },
      { src: "/images/catalog/pear-split-pave-diamond-ring/03-profile.webp", kind: "detail" },
      { src: "/images/catalog/pear-split-pave-diamond-ring/05-on-hand-v2.webp", kind: "on-body" },
    ],
    metalImages: with18k(ringMetalImages("pear-split-pave-diamond-ring", "-v2")),
    details: paveRingDetails("Pear"),
    materials: ["14K or 18K gold", "Lab-grown diamonds: IGI-certified center stone (D–E, VVS2) and approx. 0.40 ct pavé side stones"],
    rank: 15,
    addedRank: -12,
  },
  {
    // PRODUCT 16
    slug: "pear-solitaire-diamond-ring",
    name: "Pear Solitaire Diamond Ring",
    price: SOLITAIRE_RING_PRICES["14k White Gold"]["1ct"], // lowest option — shown as "From $799"
    type: "Rings",
    ringStyle: "Solitaire",
    band: "Plain Band",
    collections: ["engagement-bridal"],
    shapeGroup: "solitaire-diamond-ring",
    shape: "Pear",
    stone: "Pear diamond solitaire in three claws on a tapered band. Lab-grown, D–E color, IGI certified, from 1 ct.",
    stoneGroup: "Diamond",
    metals: SOLITAIRE_RING_METALS,
    metalCaratPrices: SOLITAIRE_RING_PRICES,
    defaultMetal: "14k White Gold",
    sizes: RING_SIZES,
    carats: CARATS,
    images: [
      { src: "/images/catalog/pear-solitaire-diamond-ring/01-sku-v2.webp", kind: "sku" },
      { src: "/images/catalog/pear-solitaire-diamond-ring/02-three-quarter.webp", kind: "detail" },
      { src: "/images/catalog/pear-solitaire-diamond-ring/03-profile.webp", kind: "detail" },
      { src: "/images/catalog/pear-solitaire-diamond-ring/05-on-hand-v2.webp", kind: "on-body" },
    ],
    metalImages: solitaireRingMetalImages("pear-solitaire-diamond-ring"),
    details: solitaireRingDetails("Pear"),
    materials: ["14K or 18K gold", "Lab-grown diamond, D–E color, IGI certified"],
    rank: 16,
    addedRank: -13,
  },
  {
    // PRODUCT 17 — first bracelet. Bracelets have three images: main, worn by a woman, worn by a man.
    slug: "round-diamond-tennis-bracelet",
    name: "Round Diamond Tennis Bracelet",
    type: "Bracelets",
    stone: tennisStone("round lab-grown diamonds, each in a four-prong setting"),
    stoneGroup: "Diamond",
    ...TENNIS_OPTIONS,
    images: [
      { src: "/images/catalog/round-diamond-tennis-bracelet/01-sku.webp", kind: "sku" },
      // the main image also opens the product page gallery (no separate studio views)
      { src: "/images/catalog/round-diamond-tennis-bracelet/01-sku.webp", kind: "detail" },
      ...TENNIS_ROUND_ON_BODY,
    ],
    // same recoloured images for 14K and 18K of each gold colour
    metalImages: Object.fromEntries(
      (["yellow-gold", "rose-gold"] as const).flatMap((tone) => ["14k", "18k"].map((k) => [k, tone] as const)).map(([k, tone]) => [
        `${k} ${tone === "yellow-gold" ? "Yellow Gold" : "Rose Gold"}`,
        [
          { src: `/images/catalog/round-diamond-tennis-bracelet/01-sku-${tone}.webp`, kind: "detail" },
          ...TENNIS_ROUND_ON_BODY,
        ] as GalleryImage[],
      ]),
    ),
    details: tennisDetails(["Round lab-grown diamonds, each in a four-prong setting"]),
    materials: ["14K or 18K gold", "Lab-grown diamonds"],
    rank: 17,
    addedRank: -14,
  },
  {
    // PRODUCT 18
    slug: "pear-diamond-line-bracelet",
    name: "Pear Diamond Line Bracelet",
    type: "Bracelets",
    stone: tennisStone("pear-shaped lab-grown diamonds, each in a three-prong setting"),
    stoneGroup: "Diamond",
    ...TENNIS_OPTIONS,
    images: [
      { src: "/images/catalog/pear-diamond-line-bracelet/01-sku.webp", kind: "sku" },
      { src: "/images/catalog/pear-diamond-line-bracelet/01-sku.webp", kind: "detail" },
      { src: "/images/catalog/pear-diamond-line-bracelet/05-on-body-women-v4.webp", kind: "on-body" },
      { src: "/images/catalog/pear-diamond-line-bracelet/06-on-body-men-v2.webp", kind: "on-body" },
    ],
    metalImages: Object.fromEntries(
      (["yellow-gold", "rose-gold"] as const).flatMap((tone) => ["14k", "18k"].map((k) => [k, tone] as const)).map(([k, tone]) => [
        `${k} ${tone === "yellow-gold" ? "Yellow Gold" : "Rose Gold"}`,
        [
          { src: `/images/catalog/pear-diamond-line-bracelet/01-sku-${tone}.webp`, kind: "detail" },
          { src: `/images/catalog/pear-diamond-line-bracelet/05-on-body-women-${tone}-v2.webp`, kind: "on-body" },
          { src: `/images/catalog/pear-diamond-line-bracelet/06-on-body-men-${tone}-v2.webp`, kind: "on-body" },
        ] as GalleryImage[],
      ]),
    ),
    details: tennisDetails(["Pear-shaped lab-grown diamonds, each in a three-prong setting"]),
    materials: ["14K or 18K gold", "Lab-grown diamonds"],
    rank: 18,
    addedRank: -15,
  },
  {
    // PRODUCT 19 — first necklace. Necklaces have three images: main, detail, worn.
    slug: "emerald-solitaire-diamond-necklace",
    name: "Emerald-Cut Solitaire Diamond Necklace",
    price: SOLITAIRE_PENDANT_CARAT_PRICES["Approx. 0.5 ct"], // lowest carat option — shown as "From $539"
    type: "Necklaces",
    shapeGroup: "solitaire-diamond-necklace",
    shape: "Emerald",
    stone: "Emerald-cut lab-grown diamond in four claws, crafted in 14K gold and sold as the pendant; add a matching 14K gold chain if you like.",
    stoneGroup: "Diamond",
    metals: HALO_PENDANT_METALS, // 14K gold only
    defaultMetal: "14k White Gold",
    carats: SOLITAIRE_PENDANT_CARATS,
    caratPrices: SOLITAIRE_PENDANT_CARAT_PRICES,
    salePercentOff: 15, // 15% off during the limited-time sale instead of the sitewide 10%
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
    price: SOLITAIRE_PENDANT_CARAT_PRICES["Approx. 0.5 ct"], // lowest carat option — shown as "From $539"
    type: "Necklaces",
    shapeGroup: "solitaire-diamond-necklace",
    shape: "Round",
    stone: "Round brilliant lab-grown diamond in four claws, crafted in 14K gold and sold as the pendant; add a matching 14K gold chain if you like.",
    stoneGroup: "Diamond",
    metals: HALO_PENDANT_METALS, // 14K gold only
    defaultMetal: "14k White Gold",
    carats: SOLITAIRE_PENDANT_CARATS,
    caratPrices: SOLITAIRE_PENDANT_CARAT_PRICES,
    salePercentOff: 15, // 15% off during the limited-time sale instead of the sitewide 10%
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
    price: SOLITAIRE_PENDANT_CARAT_PRICES["Approx. 0.5 ct"], // lowest carat option — shown as "From $539"
    type: "Necklaces",
    shapeGroup: "solitaire-diamond-necklace",
    shape: "Oval",
    stone: "Oval lab-grown diamond in four claws, crafted in 14K gold and sold as the pendant; add a matching 14K gold chain if you like.",
    stoneGroup: "Diamond",
    metals: HALO_PENDANT_METALS, // 14K gold only
    defaultMetal: "14k White Gold",
    carats: SOLITAIRE_PENDANT_CARATS,
    caratPrices: SOLITAIRE_PENDANT_CARAT_PRICES,
    salePercentOff: 15, // 15% off during the limited-time sale instead of the sitewide 10%
    chainAddOn: HALO_PENDANT_CHAIN, // the chain is never sold on its own
    images: necklaceImages("oval-solitaire-diamond-necklace").map((i) =>
      i.kind === "on-body" ? { ...i, src: "/images/catalog/oval-solitaire-diamond-necklace/05-on-body-v2.webp" } : i,
    ), // white-background on-body shot (2026-11-13)
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
    price: SOLITAIRE_PENDANT_CARAT_PRICES["Approx. 0.5 ct"], // lowest carat option — shown as "From $539"
    type: "Necklaces",
    shapeGroup: "solitaire-diamond-necklace",
    shape: "Pear",
    stone: "Pear-shaped lab-grown diamond in three claws, crafted in 14K gold and sold as the pendant; add a matching 14K gold chain if you like.",
    stoneGroup: "Diamond",
    metals: HALO_PENDANT_METALS, // 14K gold only
    defaultMetal: "14k White Gold",
    carats: SOLITAIRE_PENDANT_CARATS,
    caratPrices: SOLITAIRE_PENDANT_CARAT_PRICES,
    salePercentOff: 15, // 15% off during the limited-time sale instead of the sitewide 10%
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
    price: SOLITAIRE_PENDANT_CARAT_PRICES["Approx. 0.5 ct"], // lowest carat option — shown as "From $539"
    type: "Necklaces",
    shapeGroup: "solitaire-diamond-necklace",
    shape: "Heart",
    stone: "Heart-shaped lab-grown diamond in three claws, crafted in 14K gold and sold as the pendant; add a matching 14K gold chain if you like.",
    stoneGroup: "Diamond",
    metals: HALO_PENDANT_METALS, // 14K gold only
    defaultMetal: "14k White Gold",
    carats: SOLITAIRE_PENDANT_CARATS,
    caratPrices: SOLITAIRE_PENDANT_CARAT_PRICES,
    salePercentOff: 15, // 15% off during the limited-time sale instead of the sitewide 10%
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
    price: 1699, // 14K gold, 2 ct — shown as "From $1,699" (silver dropped, +$200 on 2026-11-13)
    type: "Necklaces",
    shape: "Pear",
    stone: "Pavé-set angel wings in white lab-grown diamonds, with a 2 ct or 3 ct pink pear-shaped lab-grown diamond drop.",
    stoneGroup: "Diamond",
    metals: ["14k Rose Gold", "14k White Gold"], // 14K gold only (silver dropped 2026-11-13)
    defaultMetal: "14k Rose Gold",
    sizes: NECKLACE_LENGTHS,
    carats: WING_CARATS,
    metalCaratPrices: wingCaratPrices({ "14k Rose Gold": 1699, "14k White Gold": 1699 }),
    salePercentOff: 25, // 25% off during the limited-time sale instead of the sitewide 10%
    images: onBodyV2(necklaceImages("pink-diamond-angel-wing-necklace")),
    metalImages: wingWhiteMetalImages("pink-diamond-angel-wing-necklace"),
    details: wingDetails("pink"),
    materials: ["14K rose or white gold", "Lab-grown diamonds"],
    rank: 24,
    addedRank: -21,
  },
  {
    // PRODUCT 25 — angel wings in pavé with a canary yellow pear drop (024 and 025 share the design)
    slug: "yellow-diamond-angel-wing-necklace",
    name: "Yellow Diamond Angel Wing Necklace",
    price: 1699, // 14K gold, 2 ct — shown as "From $1,699" (silver dropped, +$200 on 2026-11-13)
    type: "Necklaces",
    shape: "Pear",
    stone: "Pavé-set angel wings in white lab-grown diamonds, with a 2 ct or 3 ct yellow pear-shaped lab-grown diamond drop.",
    stoneGroup: "Diamond",
    metals: ["14k Yellow Gold", "14k White Gold"], // 14K gold only (silver dropped 2026-11-13)
    // Main image is yellow gold.
    defaultMetal: "14k Yellow Gold",
    sizes: NECKLACE_LENGTHS,
    carats: WING_CARATS,
    metalCaratPrices: wingCaratPrices({ "14k Yellow Gold": 1699, "14k White Gold": 1699 }),
    salePercentOff: 25, // 25% off during the limited-time sale instead of the sitewide 10%
    images: [
      { src: "/images/catalog/yellow-diamond-angel-wing-necklace/01-main-yellow-gold.webp", kind: "sku" },
      { src: "/images/catalog/yellow-diamond-angel-wing-necklace/01-main-page-yellow-gold.webp", kind: "detail" },
      { src: "/images/catalog/yellow-diamond-angel-wing-necklace/02-detail-yellow-gold.webp", kind: "detail" },
      { src: "/images/catalog/yellow-diamond-angel-wing-necklace/05-on-body-v2-yellow-gold.webp", kind: "on-body" },
    ],
    metalImages: wingWhiteMetalImages("yellow-diamond-angel-wing-necklace"),
    details: wingDetails("yellow"),
    materials: ["14K yellow or white gold", "Lab-grown diamonds"],
    rank: 25,
    addedRank: -22,
  },
  {
    // PRODUCT 27 — designed by ELANORA (no reference supplied)
    slug: "heart-diamond-tennis-bracelet",
    name: "Heart Diamond Tennis Bracelet",
    type: "Bracelets",
    stone: tennisStone("heart-shaped lab-grown diamonds, each in a three-prong setting"),
    stoneGroup: "Diamond",
    ...TENNIS_OPTIONS,
    images: [
      { src: "/images/catalog/heart-diamond-tennis-bracelet/01-sku-v2.webp", kind: "sku" },
      { src: "/images/catalog/heart-diamond-tennis-bracelet/01-sku-v2.webp", kind: "detail" },
      { src: "/images/catalog/heart-diamond-tennis-bracelet/05-on-body-women-v3.webp", kind: "on-body" },
      { src: "/images/catalog/heart-diamond-tennis-bracelet/06-on-body-men-v3.webp", kind: "on-body" },
    ],
    metalImages: Object.fromEntries(
      (["yellow-gold", "rose-gold"] as const).flatMap((tone) => ["14k", "18k"].map((k) => [k, tone] as const)).map(([k, tone]) => [
        `${k} ${tone === "yellow-gold" ? "Yellow Gold" : "Rose Gold"}`,
        [
          { src: `/images/catalog/heart-diamond-tennis-bracelet/01-sku-${tone}-v2.webp`, kind: "detail" },
          { src: `/images/catalog/heart-diamond-tennis-bracelet/05-on-body-women-${tone}-v3.webp`, kind: "on-body" },
          { src: `/images/catalog/heart-diamond-tennis-bracelet/06-on-body-men-${tone}-v3.webp`, kind: "on-body" },
        ] as GalleryImage[],
      ]),
    ),
    details: tennisDetails(["Heart-shaped lab-grown diamonds, each in a three-prong setting"]),
    materials: ["14K or 18K gold", "Lab-grown diamonds"],
    rank: 27,
    addedRank: -24,
  },
  {
    // PRODUCT 28 — first earring. Earrings have two images: main (the pair) and worn on the ear.
    slug: "marquise-diamond-ear-climber",
    name: "Marquise Diamond Ear Climber",
    // Priced by total diamond weight (user, 2026-11-08): 4 ct is $1,399 in 14K and $1,599 in 18K
    // (18K is 14K + $200, 2026-11-13); each further 1 ct adds $200.
    price: 1399,
    type: "Earrings",
    shape: "Marquise",
    stone: "Six graduated marquise diamonds in a rising leaf-shaped line, each in a claw setting, with a slim bar that sits along the ear. Sold as a pair, in approx. 4, 5 or 6 ct total diamond weight. [Color, clarity — to be provided]",
    stoneGroup: "Diamond",
    metals: ["14k White Gold", "18k White Gold"],
    defaultMetal: "14k White Gold",
    carats: ["4 ct (2 ct each)", "5 ct (2.5 ct each)", "6 ct (3 ct each)"],
    caratLabel: "Total Diamond Weight",
    metalCaratPrices: {
      "14k White Gold": { "4 ct (2 ct each)": 1399, "5 ct (2.5 ct each)": 1599, "6 ct (3 ct each)": 1799 },
      "18k White Gold": { "4 ct (2 ct each)": 1599, "5 ct (2.5 ct each)": 1799, "6 ct (3 ct each)": 1999 },
    },
    images: [
      { src: "/images/catalog/marquise-diamond-ear-climber/01-sku.webp", kind: "sku" },
      { src: "/images/catalog/marquise-diamond-ear-climber/01-sku.webp", kind: "detail" },
      { src: "/images/catalog/marquise-diamond-ear-climber/05-on-ear-v2.webp", kind: "on-body" },
    ],
    details: [
      "Six graduated marquise lab-grown diamonds per earring, each in a claw setting",
      "Total diamond weight approx. 4, 5 or 6 ct for the pair",
      "Made in 14K or 18K white gold, approx. 4.3 g of gold",
      "Sold as a pair",
    ],
    materials: ["14K or 18K white gold", "Lab-grown diamonds"],
    rank: 28,
    addedRank: -25,
  },
  {
    // PRODUCT 29 — angel wing stud earrings, pink pear drop (matches necklaces 024/025)
    slug: "pink-diamond-angel-wing-stud-earrings",
    name: "Pink Diamond Angel Wing Stud Earrings",
    price: 1499, // 14K gold, 2 ct — shown as "From $1,499" (silver dropped, +$100 on 2026-11-13)
    type: "Earrings",
    shape: "Pear",
    stone: "Pavé-set angel wings in white lab-grown diamonds with a round diamond at the centre and a 2 ct or 3 ct pink pear-shaped lab-grown diamond drop on each earring. The price is for a single earring; add two for a pair.",
    stoneGroup: "Diamond",
    metals: ["14k Rose Gold"], // 14K gold only (silver dropped 2026-11-13)
    carats: WING_CARATS,
    metalCaratPrices: wingCaratPrices({ "14k Rose Gold": 1499 }),
    priceUnit: "single earring", // priced per earring, not per pair
    salePercentOff: 25, // 25% off during the limited-time sale instead of the sitewide 10%
    defaultMetal: "14k Rose Gold",
    images: onEarV3(earringImages("pink-diamond-angel-wing-stud-earrings")),
    details: [
      "Center stone: 2 ct or 3 ct pear-shaped pink lab-grown diamond on each earring",
      "Angel wings pavé-set with white lab-grown diamonds",
      "Price is for a single earring (add 2 for a pair)",
    ],
    materials: ["14K rose gold", "Lab-grown diamonds"],
    rank: 29,
    addedRank: -26,
  },
  {
    // PRODUCT 30 — angel wing drop earrings, pink pear drop (matches necklaces 024/025)
    slug: "pink-diamond-angel-wing-drop-earrings",
    name: "Pink Diamond Angel Wing Drop Earrings",
    price: 1599, // 14K gold, 2 ct — shown as "From $1,599" (silver dropped 2026-11-13)
    type: "Earrings",
    shape: "Pear",
    stone: "A round lab-grown diamond stud and a bezel-set diamond on a fine chain, leading to pavé-set angel wings in white lab-grown diamonds with a 2 ct or 3 ct pink pear-shaped lab-grown diamond drop on each earring. The price is for a single earring; add two for a pair.",
    stoneGroup: "Diamond",
    metals: ["14k Rose Gold"], // 14K gold only (silver dropped 2026-11-13)
    carats: WING_CARATS,
    metalCaratPrices: wingCaratPrices({ "14k Rose Gold": 1599 }),
    priceUnit: "single earring", // priced per earring, not per pair
    salePercentOff: 25, // 25% off during the limited-time sale instead of the sitewide 10%
    defaultMetal: "14k Rose Gold",
    images: onEarV3(earringImages("pink-diamond-angel-wing-drop-earrings")),
    details: [
      "Center stone: 2 ct or 3 ct pear-shaped pink lab-grown diamond on each earring",
      "Angel wings pavé-set with white lab-grown diamonds",
      "Round diamond stud with a bezel-set diamond on a fine chain",
      "Price is for a single earring (add 2 for a pair)",
    ],
    materials: ["14K rose gold", "Lab-grown diamonds"],
    rank: 30,
    addedRank: -27,
  },
  {
    // PRODUCT 31 — angel wing stud earrings, canary yellow pear drop (matches necklaces 024/025)
    slug: "yellow-diamond-angel-wing-stud-earrings",
    name: "Yellow Diamond Angel Wing Stud Earrings",
    price: 1499, // 14K gold, 2 ct — shown as "From $1,499" (silver dropped, +$100 on 2026-11-13)
    type: "Earrings",
    shape: "Pear",
    stone: "Pavé-set angel wings in white lab-grown diamonds with a round diamond at the centre and a 2 ct or 3 ct yellow pear-shaped lab-grown diamond drop on each earring. The price is for a single earring; add two for a pair.",
    stoneGroup: "Diamond",
    metals: ["14k Yellow Gold"], // 14K gold only (silver dropped 2026-11-13)
    carats: WING_CARATS,
    metalCaratPrices: wingCaratPrices({ "14k Yellow Gold": 1499 }),
    priceUnit: "single earring", // priced per earring, not per pair
    salePercentOff: 25, // 25% off during the limited-time sale instead of the sitewide 10%
    defaultMetal: "14k Yellow Gold",
    images: [
      { src: "/images/catalog/yellow-diamond-angel-wing-stud-earrings/01-main-yellow-gold.webp", kind: "sku" },
      { src: "/images/catalog/yellow-diamond-angel-wing-stud-earrings/01-main-page-yellow-gold.webp", kind: "detail" },
      { src: "/images/catalog/yellow-diamond-angel-wing-stud-earrings/05-on-ear-v3.webp", kind: "on-body" },
    ],
    details: [
      "Center stone: 2 ct or 3 ct pear-shaped yellow lab-grown diamond on each earring",
      "Angel wings pavé-set with white lab-grown diamonds",
      "Price is for a single earring (add 2 for a pair)",
    ],
    materials: ["14K yellow gold", "Lab-grown diamonds"],
    rank: 31,
    addedRank: -28,
  },
  {
    // PRODUCT 32 — angel wing drop earrings, canary yellow pear drop (matches necklaces 024/025)
    slug: "yellow-diamond-angel-wing-drop-earrings",
    name: "Yellow Diamond Angel Wing Drop Earrings",
    price: 1599, // 14K gold, 2 ct — shown as "From $1,599" (silver dropped 2026-11-13)
    type: "Earrings",
    shape: "Pear",
    stone: "A round lab-grown diamond stud and a bezel-set diamond on a fine chain, leading to pavé-set angel wings in white lab-grown diamonds with a 2 ct or 3 ct yellow pear-shaped lab-grown diamond drop on each earring. The price is for a single earring; add two for a pair.",
    stoneGroup: "Diamond",
    metals: ["14k Yellow Gold"], // 14K gold only (silver dropped 2026-11-13)
    carats: WING_CARATS,
    metalCaratPrices: wingCaratPrices({ "14k Yellow Gold": 1599 }),
    priceUnit: "single earring", // priced per earring, not per pair
    salePercentOff: 25, // 25% off during the limited-time sale instead of the sitewide 10%
    defaultMetal: "14k Yellow Gold",
    images: [
      { src: "/images/catalog/yellow-diamond-angel-wing-drop-earrings/01-main-yellow-gold.webp", kind: "sku" },
      { src: "/images/catalog/yellow-diamond-angel-wing-drop-earrings/01-main-page-yellow-gold.webp", kind: "detail" },
      { src: "/images/catalog/yellow-diamond-angel-wing-drop-earrings/05-on-ear-v3.webp", kind: "on-body" },
    ],
    details: [
      "Center stone: 2 ct or 3 ct pear-shaped yellow lab-grown diamond on each earring",
      "Angel wings pavé-set with white lab-grown diamonds",
      "Round diamond stud with a bezel-set diamond on a fine chain",
      "Price is for a single earring (add 2 for a pair)",
    ],
    materials: ["14K yellow gold", "Lab-grown diamonds"],
    rank: 32,
    addedRank: -29,
  },
  {
    // PRODUCT 33 — halo stud earrings (emerald, oval, round, pear, heart: one family)
    slug: "emerald-halo-diamond-stud-earrings",
    name: "Emerald-Cut Halo Diamond Stud Earrings",
    type: "Earrings",
    shape: "Emerald",
    stone: "Emerald-cut diamonds in four claws, each framed by a halo of round diamonds. Sold as a pair. [Color, clarity — to be provided]",
    shapeGroup: "halo-diamond-studs",
    stoneGroup: "Diamond",
    ...HALO_STUD_OPTIONS,
    // on-ear photo re-shot on a pure white background (2026-11-11)
    images: earringImages("emerald-halo-diamond-stud-earrings", "-v2").map((i) =>
      i.kind === "on-body" ? { ...i, src: i.src.replace("05-on-ear.webp", "05-on-ear-v2.webp") } : i,
    ),
    metalImages: haloStudMetalImages("emerald-halo-diamond-stud-earrings", "-v2"),
    details: haloStudDetails("Emerald-cut"),
    materials: ["14K or 18K gold", "Lab-grown diamonds"],
    rank: 33,
    addedRank: -30,
  },
  {
    // PRODUCT 34 — halo stud earrings (same family as the emerald-cut halo studs)
    slug: "oval-halo-diamond-stud-earrings",
    name: "Oval Halo Diamond Stud Earrings",
    type: "Earrings",
    shape: "Oval",
    stone: "Oval diamonds in four claws, each framed by an oval halo of round diamonds. Sold as a pair. [Color, clarity — to be provided]",
    shapeGroup: "halo-diamond-studs",
    stoneGroup: "Diamond",
    ...HALO_STUD_OPTIONS,
    images: earringImages("oval-halo-diamond-stud-earrings", "-v2"),
    metalImages: haloStudMetalImages("oval-halo-diamond-stud-earrings", "-v2"),
    details: haloStudDetails("Oval"),
    materials: ["14K or 18K gold", "Lab-grown diamonds"],
    rank: 34,
    addedRank: -31,
  },
  {
    // PRODUCT 35 — halo stud earrings (same family as the emerald-cut halo studs)
    slug: "round-halo-diamond-stud-earrings",
    name: "Round Halo Diamond Stud Earrings",
    type: "Earrings",
    shape: "Round",
    stone: "Round diamonds in four claws, each framed by a halo of round diamonds. Sold as a pair. [Color, clarity — to be provided]",
    shapeGroup: "halo-diamond-studs",
    stoneGroup: "Diamond",
    ...HALO_STUD_OPTIONS,
    // One on-ear photo for every metal (gold variants change only the main shot).
    images: sharedOnBody(earringImages("round-halo-diamond-stud-earrings", "-v2"), "/images/catalog/round-halo-diamond-stud-earrings/05-on-ear-new.webp"),
    metalImages: sharedOnBodyMetals(haloStudMetalImages("round-halo-diamond-stud-earrings", "-v2"), "/images/catalog/round-halo-diamond-stud-earrings/05-on-ear-new.webp"),
    details: haloStudDetails("Round"),
    materials: ["14K or 18K gold", "Lab-grown diamonds"],
    rank: 35,
    addedRank: -32,
  },
  {
    // PRODUCT 36 — halo stud earrings (same family as the emerald-cut halo studs)
    slug: "pear-halo-diamond-stud-earrings",
    name: "Pear Halo Diamond Stud Earrings",
    type: "Earrings",
    shape: "Pear",
    stone: "Pear-shaped diamonds in claw settings, each framed by a teardrop halo of round diamonds. Sold as a pair. [Color, clarity — to be provided]",
    shapeGroup: "halo-diamond-studs",
    stoneGroup: "Diamond",
    ...HALO_STUD_OPTIONS,
    // One on-ear photo for every metal (gold variants change only the main shot).
    images: sharedOnBody(earringImages("pear-halo-diamond-stud-earrings", "-v2"), "/images/catalog/pear-halo-diamond-stud-earrings/05-on-ear-v2.webp"),
    metalImages: sharedOnBodyMetals(haloStudMetalImages("pear-halo-diamond-stud-earrings", "-v2"), "/images/catalog/pear-halo-diamond-stud-earrings/05-on-ear-v2.webp"),
    details: haloStudDetails("Pear-shaped"),
    materials: ["14K or 18K gold", "Lab-grown diamonds"],
    rank: 36,
    addedRank: -33,
  },
  {
    // PRODUCT 37 — halo stud earrings (same family as the emerald-cut halo studs)
    slug: "heart-halo-diamond-stud-earrings",
    name: "Heart Halo Diamond Stud Earrings",
    type: "Earrings",
    shape: "Heart",
    stone: "Heart-shaped diamonds in three claws, each framed by a heart-shaped halo of round diamonds. Sold as a pair. [Color, clarity — to be provided]",
    shapeGroup: "halo-diamond-studs",
    stoneGroup: "Diamond",
    ...HALO_STUD_OPTIONS,
    // One on-ear photo for every metal (gold variants change only the main shot).
    images: sharedOnBody(earringImages("heart-halo-diamond-stud-earrings", "-v2"), "/images/catalog/heart-halo-diamond-stud-earrings/05-on-ear-v2.webp"),
    metalImages: sharedOnBodyMetals(haloStudMetalImages("heart-halo-diamond-stud-earrings", "-v2"), "/images/catalog/heart-halo-diamond-stud-earrings/05-on-ear-v2.webp"),
    details: haloStudDetails("Heart-shaped"),
    materials: ["14K or 18K gold", "Lab-grown diamonds"],
    rank: 37,
    addedRank: -34,
  },
  {
    // PRODUCT 84 — marquise shape of the halo stud earrings (2026-11-08); one image so far
    slug: "marquise-halo-diamond-stud-earrings",
    name: "Marquise Halo Diamond Stud Earrings",
    type: "Earrings",
    shape: "Marquise",
    shapeGroup: "halo-diamond-studs",
    stone: "Marquise diamonds held at both points, each framed by a pointed marquise halo of round diamonds. Sold as a pair. [Color, clarity — to be provided]",
    stoneGroup: "Diamond",
    ...HALO_STUD_OPTIONS,
    // One on-ear photo for every metal (gold variants change only the main shot).
    images: [
      { src: "/images/catalog/marquise-halo-diamond-stud-earrings/01-main.webp", kind: "sku" },
      { src: "/images/catalog/marquise-halo-diamond-stud-earrings/01-main-page.webp", kind: "detail" },
      { src: "/images/catalog/marquise-halo-diamond-stud-earrings/05-on-ear-new.webp", kind: "on-body" },
    ],
    details: haloStudDetails("Marquise"),
    materials: ["14K or 18K gold", "Lab-grown diamonds"],
    rank: 84,
    addedRank: -82,
  },
  {
    // PRODUCT 85 — radiant shape of the halo stud earrings (2026-11-08); one image so far
    slug: "radiant-halo-diamond-stud-earrings",
    name: "Radiant-cut Halo Diamond Stud Earrings",
    type: "Earrings",
    shape: "Radiant",
    shapeGroup: "halo-diamond-studs",
    stone: "Radiant-cut diamonds in four claws, each framed by a rectangular halo of round diamonds. Sold as a pair. [Color, clarity — to be provided]",
    stoneGroup: "Diamond",
    ...HALO_STUD_OPTIONS,
    // One on-ear photo for every metal (gold variants change only the main shot).
    images: [
      { src: "/images/catalog/radiant-halo-diamond-stud-earrings/01-main.webp", kind: "sku" },
      { src: "/images/catalog/radiant-halo-diamond-stud-earrings/01-main-page.webp", kind: "detail" },
      { src: "/images/catalog/radiant-halo-diamond-stud-earrings/05-on-ear-new.webp", kind: "on-body" },
    ],
    details: haloStudDetails("Radiant-cut"),
    materials: ["14K or 18K gold", "Lab-grown diamonds"],
    rank: 85,
    addedRank: -83,
  },
  {
    // PRODUCT 86 — cushion shape of the halo stud earrings (2026-11-08); one image so far
    slug: "cushion-halo-diamond-stud-earrings",
    name: "Cushion-cut Halo Diamond Stud Earrings",
    type: "Earrings",
    shape: "Cushion",
    shapeGroup: "halo-diamond-studs",
    stone: "Cushion-cut diamonds in four claws, each framed by a cushion-shaped halo of round diamonds. Sold as a pair. [Color, clarity — to be provided]",
    stoneGroup: "Diamond",
    ...HALO_STUD_OPTIONS,
    // One on-ear photo for every metal (gold variants change only the main shot).
    images: [
      { src: "/images/catalog/cushion-halo-diamond-stud-earrings/01-main.webp", kind: "sku" },
      { src: "/images/catalog/cushion-halo-diamond-stud-earrings/01-main-page.webp", kind: "detail" },
      { src: "/images/catalog/cushion-halo-diamond-stud-earrings/05-on-ear-new.webp", kind: "on-body" },
    ],
    details: haloStudDetails("Cushion-cut"),
    materials: ["14K or 18K gold", "Lab-grown diamonds"],
    rank: 86,
    addedRank: -84,
  },
  {
    // PRODUCT 87 — asscher shape of the halo stud earrings (2026-11-08); one image so far
    slug: "asscher-halo-diamond-stud-earrings",
    name: "Asscher-cut Halo Diamond Stud Earrings",
    type: "Earrings",
    shape: "Asscher",
    shapeGroup: "halo-diamond-studs",
    stone: "Asscher-cut diamonds in four claws, each framed by a square halo of round diamonds. Sold as a pair. [Color, clarity — to be provided]",
    stoneGroup: "Diamond",
    ...HALO_STUD_OPTIONS,
    // One on-ear photo for every metal (gold variants change only the main shot).
    images: [
      { src: "/images/catalog/asscher-halo-diamond-stud-earrings/01-main.webp", kind: "sku" },
      { src: "/images/catalog/asscher-halo-diamond-stud-earrings/01-main-page.webp", kind: "detail" },
      { src: "/images/catalog/asscher-halo-diamond-stud-earrings/05-on-ear-new.webp", kind: "on-body" },
    ],
    details: haloStudDetails("Asscher-cut"),
    materials: ["14K or 18K gold", "Lab-grown diamonds"],
    rank: 87,
    addedRank: -85,
  },
  {
    // PRODUCT 88 — princess shape of the halo stud earrings (2026-11-08); one image so far
    slug: "princess-halo-diamond-stud-earrings",
    name: "Princess-cut Halo Diamond Stud Earrings",
    type: "Earrings",
    shape: "Princess",
    shapeGroup: "halo-diamond-studs",
    stone: "Princess-cut diamonds in four corner claws, each framed by a square halo of round diamonds. Sold as a pair. [Color, clarity — to be provided]",
    stoneGroup: "Diamond",
    ...HALO_STUD_OPTIONS,
    // One on-ear photo for every metal (gold variants change only the main shot).
    images: [
      { src: "/images/catalog/princess-halo-diamond-stud-earrings/01-main.webp", kind: "sku" },
      { src: "/images/catalog/princess-halo-diamond-stud-earrings/01-main-page.webp", kind: "detail" },
      { src: "/images/catalog/princess-halo-diamond-stud-earrings/05-on-ear-new.webp", kind: "on-body" },
    ],
    details: haloStudDetails("Princess-cut"),
    materials: ["14K or 18K gold", "Lab-grown diamonds"],
    rank: 88,
    addedRank: -86,
  },
  {
    // PRODUCT 38 — yellow-centre version of the pear halo studs
    slug: "yellow-pear-halo-diamond-stud-earrings",
    name: "Yellow Pear Halo Diamond Stud Earrings",
    type: "Earrings",
    shape: "Pear",
    stone: "Canary yellow pear-shaped diamonds in yellow gold claws, each framed by a teardrop halo of white round diamonds. Sold as a pair. [Color, clarity — to be provided]",
    stoneGroup: "Diamond",
    ...HALO_STUD_OPTIONS,
    // One on-ear photo for every metal (gold variants change only the main shot).
    images: sharedOnBody(earringImages("yellow-pear-halo-diamond-stud-earrings"), "/images/catalog/yellow-pear-halo-diamond-stud-earrings/05-on-ear-v5.webp"),
    metalImages: sharedOnBodyMetals(haloStudMetalImages("yellow-pear-halo-diamond-stud-earrings"), "/images/catalog/yellow-pear-halo-diamond-stud-earrings/05-on-ear-v5.webp"),
    details: haloStudDetails("Yellow pear-shaped"),
    materials: ["14K or 18K gold", "Lab-grown diamonds"],
    rank: 38,
    addedRank: -35,
  },
  {
    // PRODUCT 39 — yellow-centre version of the heart halo studs
    slug: "yellow-heart-halo-diamond-stud-earrings",
    name: "Yellow Heart Halo Diamond Stud Earrings",
    type: "Earrings",
    shape: "Heart",
    stone: "Canary yellow heart-shaped diamonds in yellow gold claws, each framed by a heart-shaped halo of white round diamonds. Sold as a pair. [Color, clarity — to be provided]",
    stoneGroup: "Diamond",
    ...HALO_STUD_OPTIONS,
    images: earringImages("yellow-heart-halo-diamond-stud-earrings"),
    metalImages: haloStudMetalImages("yellow-heart-halo-diamond-stud-earrings"),
    details: haloStudDetails("Yellow heart-shaped"),
    materials: ["14K or 18K gold", "Lab-grown diamonds"],
    rank: 39,
    addedRank: -36,
  },
  {
    // PRODUCT 95 — pink-centre version of the heart halo studs (2026-11-08); white metal only
    slug: "pink-heart-halo-diamond-stud-earrings",
    name: "Pink Heart Halo Diamond Stud Earrings",
    type: "Earrings",
    shape: "Heart",
    stone: "Vivid pink heart-shaped lab-grown diamonds in claw settings, each framed by a heart-shaped halo of white round diamonds. Sold as a pair. [Color, clarity — to be provided]",
    stoneGroup: "Diamond",
    ...HALO_STUD_OPTIONS,
    metals: ["14k White Gold", "18k White Gold"],
    defaultMetal: "14k White Gold",
    images: [
      { src: "/images/catalog/pink-heart-halo-diamond-stud-earrings/01-main-v2.webp", kind: "sku" },
      { src: "/images/catalog/pink-heart-halo-diamond-stud-earrings/01-main-page-v2.webp", kind: "detail" },
      { src: "/images/catalog/pink-heart-halo-diamond-stud-earrings/05-on-ear.webp", kind: "on-body" },
    ],
    details: haloStudDetails("Pink heart-shaped"),
    materials: ["14K or 18K white gold", "Lab-grown diamonds"],
    rank: 95,
    addedRank: -93,
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
    // PRODUCT 89 — emerald-cut diamonds set north-south (user reference, 2026-11-08); yellow gold only
    slug: "emerald-cut-diamond-tennis-bracelet",
    name: "Emerald-Cut Diamond Tennis Bracelet",
    type: "Bracelets",
    shape: "Emerald",
    stone: "A continuous line of emerald-cut lab-grown diamonds set north-south, each in a four-prong setting, with a hidden clasp. [Color, clarity — to be provided]",
    stoneGroup: "Diamond",
    ...TENNIS_OPTIONS,
    metals: ["14k Yellow Gold", "18k Yellow Gold"],
    defaultMetal: "14k Yellow Gold",
    images: [
      { src: "/images/catalog/emerald-cut-diamond-tennis-bracelet/01-sku.webp", kind: "sku" },
      { src: "/images/catalog/emerald-cut-diamond-tennis-bracelet/01-sku.webp", kind: "detail" },
      { src: "/images/catalog/emerald-cut-diamond-tennis-bracelet/05-on-body-women-v2.webp", kind: "on-body" },
    ],
    details: tennisDetails(["Emerald-cut lab-grown diamonds set north-south, each in a four-prong setting"]),
    materials: ["14K or 18K gold", "Lab-grown diamonds"],
    rank: 89,
    addedRank: -87,
  },
  {
    // PRODUCT 45 — round diamond tennis bracelet with east-west emerald cuts at intervals
    slug: "round-emerald-diamond-tennis-bracelet",
    name: "Round and Emerald-Cut Diamond Tennis Bracelet",
    type: "Bracelets",
    stone: tennisStone("round lab-grown diamonds in four-prong settings, with emerald-cut lab-grown diamonds set east-west at regular intervals"),
    stoneGroup: "Diamond",
    ...TENNIS_OPTIONS,
    images: [
      { src: "/images/catalog/round-emerald-diamond-tennis-bracelet/01-sku.webp", kind: "sku" },
      { src: "/images/catalog/round-emerald-diamond-tennis-bracelet/01-sku.webp", kind: "detail" },
      { src: "/images/catalog/round-emerald-diamond-tennis-bracelet/05-on-body-women-v3.webp", kind: "on-body" },
      { src: "/images/catalog/round-emerald-diamond-tennis-bracelet/06-on-body-men.webp", kind: "on-body" },
    ],
    metalImages: Object.fromEntries(
      (["yellow-gold", "rose-gold"] as const).flatMap((tone) => ["14k", "18k"].map((k) => [k, tone] as const)).map(([k, tone]) => [
        `${k} ${tone === "yellow-gold" ? "Yellow Gold" : "Rose Gold"}`,
        [
          { src: `/images/catalog/round-emerald-diamond-tennis-bracelet/01-sku-${tone}.webp`, kind: "detail" },
          { src: `/images/catalog/round-emerald-diamond-tennis-bracelet/05-on-body-women-${tone}.webp`, kind: "on-body" },
          { src: `/images/catalog/round-emerald-diamond-tennis-bracelet/06-on-body-men-${tone}.webp`, kind: "on-body" },
        ] as GalleryImage[],
      ]),
    ),
    details: tennisDetails(["Round lab-grown diamonds in four-prong settings", "Emerald-cut lab-grown diamonds set east-west at regular intervals"]),
    materials: ["14K or 18K gold", "Lab-grown diamonds"],
    rank: 45,
    addedRank: -42,
  },
  {
    // PRODUCT 46 — dainty chain bracelet with a pink heart diamond in a halo (photographed in yellow gold)
    slug: "pink-heart-diamond-bracelet",
    name: "Pink Heart Diamond Bracelet",
    // Priced by the pink heart diamond (user, 2026-11-08): 1 ct $899, 2 ct $1,159 in 14K gold.
    price: 899,
    type: "Bracelets",
    shape: "Heart",
    stone: "A pink heart-shaped lab-grown diamond, 1 ct or 2 ct, framed by a halo of small white diamonds, on a fine cable chain. [Color, clarity — to be provided]",
    stoneGroup: "Diamond",
    metals: ["14k Yellow Gold", "14k White Gold", "14k Rose Gold"],
    defaultMetal: "14k Yellow Gold",
    sizes: BRACELET_LENGTHS,
    carats: ["1ct", "2ct"],
    caratLabel: "Pink Diamond",
    caratPrices: { "1ct": 899, "2ct": 1159 },
    salePercentOff: 15, // 15% off during the limited-time sale instead of the sitewide 10%
    images: [
      { src: "/images/catalog/pink-heart-diamond-bracelet/01-main-v3.webp", kind: "sku" },
      { src: "/images/catalog/pink-heart-diamond-bracelet/01-main-page-v3.webp", kind: "detail" },
      { src: "/images/catalog/pink-heart-diamond-bracelet/05-on-body-v4.webp", kind: "on-body" },
    ],
    // yellow gold is the default set above
    metalImages: Object.fromEntries(
      (
        [
          ["14k Rose Gold", "rose-gold"],
          ["14k White Gold", "white"],
        ] as const
      ).map(([metal, tone]) => [
        metal,
        [
          { src: `/images/catalog/pink-heart-diamond-bracelet/01-main-page-${tone}-v3.webp`, kind: "detail" },
          { src: `/images/catalog/pink-heart-diamond-bracelet/05-on-body-${tone}-v3.webp`, kind: "on-body" },
        ] as GalleryImage[],
      ]),
    ),
    details: [
      "Pink heart-shaped lab-grown diamond, 1 ct or 2 ct",
      "Framed by a halo of small white lab-grown diamonds",
      "Fine cable chain in 14K yellow, white or rose gold",
    ],
    materials: ["14K gold", "Lab-grown diamonds"],
    rank: 46,
    addedRank: -43,
  },
  {
    // PRODUCT 47 — solitaire family, shape variant of 010 (same tapered band and head)
    slug: "marquise-solitaire-diamond-ring",
    name: "Marquise Solitaire Diamond Ring",
    price: SOLITAIRE_RING_PRICES["14k White Gold"]["1ct"], // lowest option — shown as "From $799"
    type: "Rings",
    ringStyle: "Solitaire",
    band: "Plain Band",
    collections: ["engagement-bridal"],
    shapeGroup: "solitaire-diamond-ring",
    shape: "Marquise",
    stone: "Marquise diamond solitaire, set north-south, with V-claws on both points and two side claws on a tapered band. Lab-grown, D–E color, IGI certified, from 1 ct.",
    stoneGroup: "Diamond",
    metals: SOLITAIRE_RING_METALS,
    metalCaratPrices: SOLITAIRE_RING_PRICES,
    defaultMetal: "14k White Gold",
    sizes: RING_SIZES,
    carats: CARATS,
    images: [
      { src: "/images/catalog/marquise-solitaire-diamond-ring/01-sku.webp", kind: "sku" },
      { src: "/images/catalog/marquise-solitaire-diamond-ring/02-three-quarter.webp", kind: "detail" },
      { src: "/images/catalog/marquise-solitaire-diamond-ring/03-profile.webp", kind: "detail" },
      { src: "/images/catalog/marquise-solitaire-diamond-ring/05-on-hand-v2.webp", kind: "on-body" },
    ],
    metalImages: solitaireRingMetalImages("marquise-solitaire-diamond-ring"),
    details: solitaireRingDetails("Marquise"),
    materials: ["14K or 18K gold", "Lab-grown diamond, D–E color, IGI certified"],
    rank: 47,
    addedRank: -44,
  },
  {
    // PRODUCT 48 — solitaire family, shape variant of 010 (same tapered band and head)
    slug: "radiant-solitaire-diamond-ring",
    name: "Radiant-Cut Solitaire Diamond Ring",
    price: SOLITAIRE_RING_PRICES["14k White Gold"]["1ct"], // lowest option — shown as "From $799"
    type: "Rings",
    ringStyle: "Solitaire",
    band: "Plain Band",
    collections: ["engagement-bridal"],
    shapeGroup: "solitaire-diamond-ring",
    shape: "Radiant",
    stone: "Radiant-cut diamond solitaire in four claws on a tapered band. Lab-grown, D–E color, IGI certified, from 1 ct.",
    stoneGroup: "Diamond",
    metals: SOLITAIRE_RING_METALS,
    metalCaratPrices: SOLITAIRE_RING_PRICES,
    defaultMetal: "14k White Gold",
    sizes: RING_SIZES,
    carats: CARATS,
    images: [
      { src: "/images/catalog/radiant-solitaire-diamond-ring/01-sku.webp", kind: "sku" },
      { src: "/images/catalog/radiant-solitaire-diamond-ring/02-three-quarter.webp", kind: "detail" },
      { src: "/images/catalog/radiant-solitaire-diamond-ring/03-profile.webp", kind: "detail" },
      { src: "/images/catalog/radiant-solitaire-diamond-ring/05-on-hand-v2.webp", kind: "on-body" },
    ],
    metalImages: solitaireRingMetalImages("radiant-solitaire-diamond-ring"),
    details: solitaireRingDetails("Radiant"),
    materials: ["14K or 18K gold", "Lab-grown diamond, D–E color, IGI certified"],
    rank: 48,
    addedRank: -45,
  },
  {
    // PRODUCT 49 — solitaire family, shape variant of 010 (same tapered band and head)
    slug: "cushion-solitaire-diamond-ring",
    name: "Cushion-Cut Solitaire Diamond Ring",
    price: SOLITAIRE_RING_PRICES["14k White Gold"]["1ct"], // lowest option — shown as "From $799"
    type: "Rings",
    ringStyle: "Solitaire",
    band: "Plain Band",
    collections: ["engagement-bridal"],
    shapeGroup: "solitaire-diamond-ring",
    shape: "Cushion",
    stone: "Cushion-cut diamond solitaire in four claws on a tapered band. Lab-grown, D–E color, IGI certified, from 1 ct.",
    stoneGroup: "Diamond",
    metals: SOLITAIRE_RING_METALS,
    metalCaratPrices: SOLITAIRE_RING_PRICES,
    defaultMetal: "14k White Gold",
    sizes: RING_SIZES,
    carats: CARATS,
    images: [
      { src: "/images/catalog/cushion-solitaire-diamond-ring/01-sku.webp", kind: "sku" },
      { src: "/images/catalog/cushion-solitaire-diamond-ring/02-three-quarter.webp", kind: "detail" },
      { src: "/images/catalog/cushion-solitaire-diamond-ring/03-profile.webp", kind: "detail" },
      { src: "/images/catalog/cushion-solitaire-diamond-ring/05-on-hand-v2.webp", kind: "on-body" },
    ],
    metalImages: solitaireRingMetalImages("cushion-solitaire-diamond-ring"),
    details: solitaireRingDetails("Cushion"),
    materials: ["14K or 18K gold", "Lab-grown diamond, D–E color, IGI certified"],
    rank: 49,
    addedRank: -46,
  },
  {
    // PRODUCT 50 — solitaire family, shape variant of 010 (same tapered band and head)
    slug: "asscher-solitaire-diamond-ring",
    name: "Asscher-Cut Solitaire Diamond Ring",
    price: SOLITAIRE_RING_PRICES["14k White Gold"]["1ct"], // lowest option — shown as "From $799"
    type: "Rings",
    ringStyle: "Solitaire",
    band: "Plain Band",
    collections: ["engagement-bridal"],
    shapeGroup: "solitaire-diamond-ring",
    shape: "Asscher",
    stone: "Asscher-cut diamond solitaire in four claws on a tapered band. Lab-grown, D–E color, IGI certified, from 1 ct.",
    stoneGroup: "Diamond",
    metals: SOLITAIRE_RING_METALS,
    metalCaratPrices: SOLITAIRE_RING_PRICES,
    defaultMetal: "14k White Gold",
    sizes: RING_SIZES,
    carats: CARATS,
    images: [
      { src: "/images/catalog/asscher-solitaire-diamond-ring/01-sku.webp", kind: "sku" },
      { src: "/images/catalog/asscher-solitaire-diamond-ring/02-three-quarter.webp", kind: "detail" },
      { src: "/images/catalog/asscher-solitaire-diamond-ring/03-profile.webp", kind: "detail" },
      { src: "/images/catalog/asscher-solitaire-diamond-ring/05-on-hand-v2.webp", kind: "on-body" },
    ],
    metalImages: solitaireRingMetalImages("asscher-solitaire-diamond-ring"),
    details: solitaireRingDetails("Asscher"),
    materials: ["14K or 18K gold", "Lab-grown diamond, D–E color, IGI certified"],
    rank: 50,
    addedRank: -47,
  },
  {
    // PRODUCT 51 — solitaire family, shape variant of 010 (same tapered band and head)
    slug: "princess-solitaire-diamond-ring",
    name: "Princess-Cut Solitaire Diamond Ring",
    price: SOLITAIRE_RING_PRICES["14k White Gold"]["1ct"], // lowest option — shown as "From $799"
    type: "Rings",
    ringStyle: "Solitaire",
    band: "Plain Band",
    collections: ["engagement-bridal"],
    shapeGroup: "solitaire-diamond-ring",
    shape: "Princess",
    stone: "Princess-cut diamond solitaire in four corner claws on a tapered band. Lab-grown, D–E color, IGI certified, from 1 ct.",
    stoneGroup: "Diamond",
    metals: SOLITAIRE_RING_METALS,
    metalCaratPrices: SOLITAIRE_RING_PRICES,
    defaultMetal: "14k White Gold",
    sizes: RING_SIZES,
    carats: CARATS,
    images: [
      { src: "/images/catalog/princess-solitaire-diamond-ring/01-sku.webp", kind: "sku" },
      { src: "/images/catalog/princess-solitaire-diamond-ring/02-three-quarter.webp", kind: "detail" },
      { src: "/images/catalog/princess-solitaire-diamond-ring/03-profile.webp", kind: "detail" },
      { src: "/images/catalog/princess-solitaire-diamond-ring/05-on-hand-v2.webp", kind: "on-body" },
    ],
    metalImages: solitaireRingMetalImages("princess-solitaire-diamond-ring"),
    details: solitaireRingDetails("Princess"),
    materials: ["14K or 18K gold", "Lab-grown diamond, D–E color, IGI certified"],
    rank: 51,
    addedRank: -48,
  },
  {
    // PRODUCT 52 — solitaire family, shape variant of 010 (same tapered band and head)
    slug: "heart-solitaire-diamond-ring",
    name: "Heart Solitaire Diamond Ring",
    price: SOLITAIRE_RING_PRICES["14k White Gold"]["1ct"], // lowest option — shown as "From $799"
    type: "Rings",
    ringStyle: "Solitaire",
    band: "Plain Band",
    collections: ["engagement-bridal"],
    shapeGroup: "solitaire-diamond-ring",
    shape: "Heart",
    stone: "Heart-shaped diamond solitaire with a V-claw at the point on a tapered band. Lab-grown, D–E color, IGI certified, from 1 ct.",
    stoneGroup: "Diamond",
    metals: SOLITAIRE_RING_METALS,
    metalCaratPrices: SOLITAIRE_RING_PRICES,
    defaultMetal: "14k White Gold",
    sizes: RING_SIZES,
    carats: CARATS,
    images: [
      { src: "/images/catalog/heart-solitaire-diamond-ring/01-sku.webp", kind: "sku" },
      { src: "/images/catalog/heart-solitaire-diamond-ring/02-three-quarter.webp", kind: "detail" },
      { src: "/images/catalog/heart-solitaire-diamond-ring/03-profile.webp", kind: "detail" },
      { src: "/images/catalog/heart-solitaire-diamond-ring/05-on-hand-lux.webp", kind: "on-body" },
    ],
    metalImages: solitaireRingMetalImages("heart-solitaire-diamond-ring"),
    details: solitaireRingDetails("Heart"),
    materials: ["14K or 18K gold", "Lab-grown diamond, D–E color, IGI certified"],
    rank: 52,
    addedRank: -49,
  },
  {
    // PRODUCT 53 — angel wing bracelet, pink pear drop (matches necklace 024 and earrings 029/030)
    slug: "pink-diamond-angel-wing-bracelet",
    name: "Pink Diamond Angel Wing Bracelet",
    price: 1599, // 14K rose gold, 2 ct — shown as "From $1,599" (silver dropped 2026-11-13)
    type: "Bracelets",
    stone: "Pavé-set angel wings in white lab-grown diamonds, with a 2 ct or 3 ct pink pear-shaped lab-grown diamond drop under a round diamond, on a fine cable chain.",
    stoneGroup: "Diamond",
    metals: ["14k Rose Gold"], // 14K rose gold only (silver dropped 2026-11-13)
    carats: WING_CARATS,
    metalCaratPrices: wingCaratPrices({ "14k Rose Gold": 1599 }),
    salePercentOff: 25, // 25% off during the limited-time sale instead of the sitewide 10%
    defaultMetal: "14k Rose Gold",
    sizes: BRACELET_LENGTHS,
    images: [
      { src: "/images/catalog/pink-diamond-angel-wing-bracelet/01-main.webp", kind: "sku" },
      { src: "/images/catalog/pink-diamond-angel-wing-bracelet/01-main-page.webp", kind: "detail" },
      { src: "/images/catalog/pink-diamond-angel-wing-bracelet/05-on-body-v3.webp", kind: "on-body" },
    ],
    details: [
      "Center stone: 2 ct or 3 ct pear-shaped pink lab-grown diamond",
      "Angel wings pavé-set with white lab-grown diamonds",
      "Fine cable chain with a spring-ring clasp",
    ],
    materials: ["14K rose gold", "Lab-grown diamonds"],
    rank: 53,
    addedRank: -50,
  },
  {
    // PRODUCT 54 — three stones side by side: white pear, yellow emerald-cut centre set on a diagonal, white round (054 and 055 share the design)
    slug: "yellow-emerald-three-stone-diamond-necklace",
    name: "Yellow Emerald Three-Stone Diamond Necklace",
    price: THREE_STONE_NECKLACE_PRICES["14k White Gold"], // 14K — shown as "From $1,499"
    type: "Necklaces",
    shape: "Emerald",
    stone: threeStoneNecklaceStone("yellow"),
    stoneGroup: "Diamond",
    metals: ["14k White Gold", "18k White Gold"], // white gold as shown; 14K or 18K
    metalPrices: THREE_STONE_NECKLACE_PRICES,
    defaultMetal: "14k White Gold",
    sizes: NECKLACE_LENGTHS,
    images: [
      { src: "/images/catalog/yellow-emerald-three-stone-diamond-necklace/01-main.webp", kind: "sku" },
      { src: "/images/catalog/yellow-emerald-three-stone-diamond-necklace/01-main-page.webp", kind: "detail" },
      { src: "/images/catalog/yellow-emerald-three-stone-diamond-necklace/02-detail.webp", kind: "detail" },
      { src: "/images/catalog/yellow-emerald-three-stone-diamond-necklace/05-on-body-v4.webp", kind: "on-body" },
    ],
    details: threeStoneNecklaceDetails("yellow"),
    materials: ["14K or 18K white gold", "Lab-grown diamonds"],
    rank: 54,
    addedRank: -51,
  },
  {
    // PRODUCT 55 — three stones side by side: white pear, blue emerald-cut centre set on a diagonal, white round (054 and 055 share the design)
    slug: "blue-emerald-three-stone-diamond-necklace",
    name: "Blue Emerald Three-Stone Diamond Necklace",
    price: THREE_STONE_NECKLACE_PRICES["14k White Gold"], // 14K — shown as "From $1,499"
    type: "Necklaces",
    shape: "Emerald",
    stone: threeStoneNecklaceStone("blue"),
    stoneGroup: "Diamond",
    metals: ["14k White Gold", "18k White Gold"], // white gold as shown; 14K or 18K
    metalPrices: THREE_STONE_NECKLACE_PRICES,
    defaultMetal: "14k White Gold",
    sizes: NECKLACE_LENGTHS,
    images: [
      { src: "/images/catalog/blue-emerald-three-stone-diamond-necklace/01-main.webp", kind: "sku" },
      { src: "/images/catalog/blue-emerald-three-stone-diamond-necklace/01-main-page.webp", kind: "detail" },
      { src: "/images/catalog/blue-emerald-three-stone-diamond-necklace/02-detail.webp", kind: "detail" },
      { src: "/images/catalog/blue-emerald-three-stone-diamond-necklace/05-on-body-v4.webp", kind: "on-body" },
    ],
    details: threeStoneNecklaceDetails("blue"),
    materials: ["14K or 18K white gold", "Lab-grown diamonds"],
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
    price: 1099,
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
    price: 899, // lowest metal (yellow gold over silver) — shown as "From $899"
    type: "Necklaces",
    shape: "Round",
    stone: "Three layers in one: a paperclip chain with five lab-grown diamonds, a plain paperclip chain, and a fine chain with a snowflake pendant around a pink lab-grown diamond.",
    stoneGroup: "Diamond",
    metals: ["14k Yellow Gold", "Yellow Gold over Sterling Silver"], // the silver version is yellow gold plated
    defaultMetal: "14k Yellow Gold",
    metalPrices: { "14k Yellow Gold": SNOWFLAKE_METAL_PRICES["14k Yellow Gold"], "Yellow Gold over Sterling Silver": SNOWFLAKE_METAL_PRICES["925 Sterling Silver"] },
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
      "Available in 14K yellow gold ($1,499) or yellow gold plated 925 sterling silver ($899)",
    ],
    materials: ["14K yellow gold or yellow gold plated 925 sterling silver", "Lab-grown diamonds"],
    rank: 60,
    addedRank: -57,
  },
  {
    // PRODUCT 61 — custom script nameplate necklace (shown with the name "Elanora"); the name is made to order. 14k yellow gold
    slug: "elanora-name-necklace",
    name: "Custom Name Necklace",
    price: null,
    type: "Necklaces",
    stone: "A polished nameplate in flowing cursive script with a swash underneath, on a fine cable chain. Shown with the name \"Elanora\" — made with the name of your choice. Send us your name first and we'll email your price.",
    stoneGroup: "Gold",
    customName: { maxLength: 12 }, // [name length limit — to be confirmed]
    // Sterling silver, 14K or 18K gold, each in a yellow or white tone (user, 2026-11-13); priced by quote.
    metals: ["14k Yellow Gold", "14k White Gold", "18k Yellow Gold", "18k White Gold", "Yellow Gold over Sterling Silver", "925 Sterling Silver"],
    defaultMetal: "14k Yellow Gold",
    sizes: NECKLACE_LENGTHS,
    images: [
      { src: "/images/catalog/elanora-name-necklace/01-main.webp", kind: "sku" },
      { src: "/images/catalog/elanora-name-necklace/01-main-page.webp", kind: "detail" },
      { src: "/images/catalog/elanora-name-necklace/02-detail.webp", kind: "detail" },
      { src: "/images/catalog/elanora-name-necklace/05-on-body-v3.webp", kind: "on-body" },
    ],
    details: [
      "Your name in cursive script, made to order",
      "Available in 925 sterling silver, 14K gold or 18K gold, each in yellow or white",
      "Cable chain in 16, 18 or 20 inches",
      "Price by quote: send your name and we'll email your price",
    ],
    materials: ["925 sterling silver (yellow gold plated or white), 14K gold or 18K gold, in yellow or white"],
    rank: 61,
    addedRank: -58,
  },
  {
    // PRODUCT 62 — pavé diamond initial pendant (shown as "R"), 14k yellow gold
    slug: "diamond-initial-necklace",
    name: "Lab-Grown Diamond Initial Necklace",
    price: 999, // any letter A–Z, same price, chain included (2026-11-13)
    type: "Necklaces",
    shape: "Round",
    stone: "A capital initial pendant fully paved with round lab-grown diamonds, edged in polished 14K yellow gold, on a fine cable chain. Available in every letter from A to Z; shown with the letter R.",
    initials: INITIALS,
    stoneGroup: "Diamond",
    metals: ["14k Yellow Gold"], // 14K yellow gold
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
      "Choose any initial from A to Z",
      "Chain included: cable chain in 16, 18 or 20 inches",
    ],
    materials: ["14K yellow gold", "Lab-grown diamonds"],
    rank: 62,
    addedRank: -59,
  },
  {
    // PRODUCT 63 — two-layer set: fine chain with five dangling bezel diamonds + chain with a bezel diamond and a pavé letter R; 14k yellow gold
    slug: "initial-r-layered-diamond-necklace",
    name: "Layered Initial Diamond Necklace",
    price: 899, // any letter A–Z, same price (2026-11-13)
    type: "Necklaces",
    shape: "Round",
    stone: "Two layers in one: a fine chain with five dangling lab-grown diamond drops, and a chain with a bezel-set lab-grown diamond beside a pavé initial of your choice, A to Z. Shown with the letter R.",
    initials: INITIALS, // customer picks the letter
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
      "Bottom layer: 1 bezel-set white lab-grown diamond, 0.05 ct, beside the pavé initial pendant",
      "Initial (any letter A–Z): pavé-set with white lab-grown diamonds, 0.03 ct each",
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
    price: 1099, // chain included (2026-11-13)
    type: "Necklaces",
    shape: "Marquise",
    stone: "A small butterfly of four lab-grown diamonds — two marquise-cut upper wings and two pear-shaped lower wings — set in fine claws on a delicate cable chain.",
    stoneGroup: "Diamond",
    metals: ["14k White Gold", "14k Yellow Gold", "14k Rose Gold"],
    defaultMetal: "14k White Gold",
    carats: ["Approx. 3 ct total"],
    caratPrices: { "Approx. 3 ct total": 1099 }, // one price, chain included
    salePercentOff: 15, // 15% off during the limited-time sale instead of the sitewide 10%
    sizes: NECKLACE_LENGTHS,
    images: necklaceImages("marquise-butterfly-diamond-necklace"),
    metalImages: necklaceMetalImages("marquise-butterfly-diamond-necklace"),
    details: [
      "Upper wings: 2 marquise-cut lab-grown diamonds, approx. 1 ct each",
      "Lower wings: 2 pear-shaped lab-grown diamonds, approx. 0.5 ct each",
      "Total diamond weight: approx. 3 ct",
      "Claw setting",
      "[Pendant size — to be provided]",
      "Chain included: cable chain in 16, 18 or 20 inches",
    ],
    materials: ["14K white, yellow or rose gold", "Lab-grown diamonds"],
    rank: 64,
    addedRank: -61,
  },  {
    // PRODUCT 65 — round pink lab-grown diamond in a white-diamond halo, on a bail as a pendant; 14k white / yellow / rose gold
    slug: "pink-round-halo-diamond-necklace",
    name: "Pink Round Halo Diamond Necklace",
    // Priced by carat like the 044 halo pendants, chain included
    price: PINK_HALO_PENDANT_CARAT_PRICES["Approx. 0.5 ct"], // lowest carat option — shown as "From $1,099"
    type: "Necklaces",
    shape: "Round",
    stone: "A round pink lab-grown diamond in four claws, framed by a halo of white lab-grown diamonds and hung from a polished bail, on a fine cable chain in 14K gold.",
    stoneGroup: "Diamond",
    metals: HALO_PENDANT_METALS, // 14K gold only
    defaultMetal: "14k White Gold",
    carats: HALO_PENDANT_CARATS,
    caratPrices: PINK_HALO_PENDANT_CARAT_PRICES,
    salePercentOff: 15, // 15% off during the limited-time sale instead of the sitewide 10%
    sizes: NECKLACE_LENGTHS, // chain included
    images: necklaceImages("pink-round-halo-diamond-necklace"),
    metalImages: necklaceMetalImages("pink-round-halo-diamond-necklace"),
    details: [
      "Round pink lab-grown centre diamond, approx. 0.5 ct to 2.5 ct",
      "Halo of round white lab-grown diamonds [stone count and total weight — to be provided]",
      "14K gold cable chain included: 16, 18 or 20 in",
    ],
    materials: ["14K white, yellow or rose gold", "Lab-grown diamonds"],
    rank: 65,
    addedRank: -62,
  },  {
    // PRODUCT 66 — "Cosmopolitan" martini-glass pendant: triangular pink lab-grown diamond as the drink, pavé rim, lime-twist curl with a diamond drop; 14k white gold only
    slug: "pink-cosmopolitan-diamond-necklace",
    name: "Pink Diamond Cosmopolitan Necklace",
    price: 1399, // lowest carat option
    type: "Necklaces",
    // no shape tag: trillion is not one of the Diamond Shape filter options
    stone: "A martini glass in polished 14K white gold, filled with a triangular pink lab-grown diamond, with a pavé diamond rim and a curled lime twist holding a small diamond drop. A toast to the city, on a fine cable chain.",
    stoneGroup: "Diamond",
    metals: ["14k White Gold"], // 14K gold only
    defaultMetal: "14k White Gold",
    carats: Object.keys(COSMOPOLITAN_CARAT_PRICES),
    caratPrices: COSMOPOLITAN_CARAT_PRICES,
    salePercentOff: 20, // 20% off during the limited-time sale instead of the sitewide 10%
    sizes: NECKLACE_LENGTHS,
    images: [
      { src: "/images/catalog/pink-cosmopolitan-diamond-necklace/01-main.webp", kind: "sku" },
      { src: "/images/catalog/pink-cosmopolitan-diamond-necklace/01-main-page.webp", kind: "detail" },
      { src: "/images/catalog/pink-cosmopolitan-diamond-necklace/02-detail.webp", kind: "detail" },
      { src: "/images/catalog/pink-cosmopolitan-diamond-necklace/05-on-body-v4.webp", kind: "on-body" },
    ],
    details: [
      "Triangular pink lab-grown diamond, approx. 1.5 ct",
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
    price: 1299, // lowest carat option
    type: "Necklaces",
    shape: "Pear",
    stone: "A champagne flute in polished 14K white gold, filled with a pear-shaped yellow lab-grown diamond and finished with a pavé diamond rim. A companion to the Cosmopolitan, on a fine cable chain.",
    stoneGroup: "Diamond",
    metals: ["14k White Gold"], // 14K gold only
    defaultMetal: "14k White Gold",
    carats: Object.keys(COCKTAIL_CARAT_PRICES),
    caratPrices: COCKTAIL_CARAT_PRICES,
    salePercentOff: 20, // 20% off during the limited-time sale instead of the sitewide 10%
    sizes: NECKLACE_LENGTHS,
    images: [
      { src: "/images/catalog/yellow-champagne-diamond-necklace/01-main.webp", kind: "sku" },
      { src: "/images/catalog/yellow-champagne-diamond-necklace/01-main-page.webp", kind: "detail" },
      { src: "/images/catalog/yellow-champagne-diamond-necklace/02-detail.webp", kind: "detail" },
      { src: "/images/catalog/yellow-champagne-diamond-necklace/05-on-body-v4.webp", kind: "on-body" },
    ],
    details: [
      "Pear-shaped yellow lab-grown diamond: 2 ct or 3 ct",
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
    price: 1299, // lowest carat option
    type: "Necklaces",
    shape: "Emerald",
    stone: "A highball glass in polished 14K white gold, filled with an emerald-cut blue lab-grown diamond, with a pavé diamond rim and a slim straw. Joins the Cosmopolitan and the Champagne, on a fine cable chain.",
    stoneGroup: "Diamond",
    metals: ["14k White Gold"], // 14K gold only
    defaultMetal: "14k White Gold",
    carats: Object.keys(COCKTAIL_CARAT_PRICES),
    caratPrices: COCKTAIL_CARAT_PRICES,
    salePercentOff: 20, // 20% off during the limited-time sale instead of the sitewide 10%
    sizes: NECKLACE_LENGTHS,
    images: [
      { src: "/images/catalog/blue-lagoon-diamond-necklace/01-main.webp", kind: "sku" },
      { src: "/images/catalog/blue-lagoon-diamond-necklace/01-main-page.webp", kind: "detail" },
      { src: "/images/catalog/blue-lagoon-diamond-necklace/02-detail.webp", kind: "detail" },
      { src: "/images/catalog/blue-lagoon-diamond-necklace/05-on-body-v2.webp", kind: "on-body" },
    ],
    details: [
      "Emerald-cut blue lab-grown diamond: 2 ct or 3 ct",
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
    price: 1099, // 14K gold, 2 ct, pendant only — shown as "From $1,099"
    type: "Necklaces",
    shape: "Oval",
    stone: "A vintage perfume bottle in polished 14K white gold: an oval pink lab-grown diamond for the bottle, a pavé diamond neck and a round diamond stopper, on a fine cable chain.",
    stoneGroup: "Diamond",
    metals: PERFUME_METALS, // 14K white or yellow gold
    defaultMetal: "14k White Gold",
    carats: PERFUME_CARATS,
    metalCaratPrices: PERFUME_PRICES, // pendant only
    salePercentOff: 20, // 20% off during the limited-time sale instead of the sitewide 10%
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
      "Pendant available in 14K white gold or 14K yellow gold",
      "Round white lab-grown diamond stopper and pavé neck [stone count and total weight — to be provided]",
      "[Pendant size — to be provided]",
      "Pendant only — chain not included",
      "Optional 14K gold chain (16, 18 or 20 in) for $239, available only with the pendant",
    ],
    materials: ["14K white or yellow gold", "Lab-grown diamonds"],
    rank: 69,
    addedRank: -66,
  },  {
    // PRODUCT 70 — perfume-bottle series no. 2: cushion-cut blue lab-grown diamond as the bottle, pavé neck, round diamond stopper; 14k white gold only
    slug: "blue-perfume-bottle-diamond-necklace",
    name: "Blue Diamond Perfume Bottle Necklace",
    price: 1099, // 14K gold, 2 ct, pendant only — shown as "From $1,099"
    type: "Necklaces",
    shape: "Cushion",
    stone: "A classic square-shouldered perfume bottle in polished 14K white gold: a cushion-cut blue lab-grown diamond for the bottle, a pavé diamond neck and a round diamond stopper, on a fine cable chain.",
    stoneGroup: "Diamond",
    metals: PERFUME_METALS, // 14K white or yellow gold
    defaultMetal: "14k White Gold",
    carats: PERFUME_CARATS,
    metalCaratPrices: PERFUME_PRICES, // pendant only
    salePercentOff: 20, // 20% off during the limited-time sale instead of the sitewide 10%
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
      "Pendant available in 14K white gold or 14K yellow gold",
      "Round white lab-grown diamond stopper and pavé neck [stone count and total weight — to be provided]",
      "[Pendant size — to be provided]",
      "Pendant only — chain not included",
      "Optional 14K gold chain (16, 18 or 20 in) for $239, available only with the pendant",
    ],
    materials: ["14K white or yellow gold", "Lab-grown diamonds"],
    rank: 70,
    addedRank: -67,
  },  {
    // PRODUCT 71 — perfume-bottle series no. 3: pear-shaped yellow lab-grown diamond (point up) as a teardrop bottle, pavé neck, round diamond stopper; 14k white gold only
    slug: "yellow-perfume-bottle-diamond-necklace",
    name: "Yellow Diamond Perfume Bottle Necklace",
    price: 1099, // 14K gold, 2 ct, pendant only — shown as "From $1,099"
    type: "Necklaces",
    shape: "Pear",
    stone: "A teardrop perfume bottle in polished 14K white gold: a pear-shaped yellow lab-grown diamond for the bottle, a pavé diamond neck and a round diamond stopper, on a fine cable chain.",
    stoneGroup: "Diamond",
    metals: PERFUME_METALS, // 14K white or yellow gold
    defaultMetal: "14k White Gold",
    carats: PERFUME_CARATS,
    metalCaratPrices: PERFUME_PRICES, // pendant only
    salePercentOff: 20, // 20% off during the limited-time sale instead of the sitewide 10%
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
      "Pendant available in 14K white gold or 14K yellow gold",
      "Round white lab-grown diamond stopper and pavé neck [stone count and total weight — to be provided]",
      "[Pendant size — to be provided]",
      "Pendant only — chain not included",
      "Optional 14K gold chain (16, 18 or 20 in) for $239, available only with the pendant",
    ],
    materials: ["14K white or yellow gold", "Lab-grown diamonds"],
    rank: 71,
    addedRank: -68,
  },  {
    // PRODUCT 73 — cocktail series, rosé champagne: the 067 champagne flute with a pear-shaped pink lab-grown diamond; 14k yellow gold only
    slug: "pink-champagne-diamond-necklace",
    name: "Pink Diamond Champagne Necklace",
    price: 1299, // lowest carat option
    type: "Necklaces",
    shape: "Pear",
    stone: "A champagne flute in polished 14K yellow gold, filled with a pear-shaped pink lab-grown diamond for a glass of rosé, finished with a pavé diamond rim, on a fine cable chain.",
    stoneGroup: "Diamond",
    metals: ["14k Yellow Gold"], // 14K gold only
    defaultMetal: "14k Yellow Gold",
    carats: Object.keys(COCKTAIL_CARAT_PRICES),
    caratPrices: COCKTAIL_CARAT_PRICES,
    salePercentOff: 20, // 20% off during the limited-time sale instead of the sitewide 10%
    sizes: NECKLACE_LENGTHS,
    images: [
      { src: "/images/catalog/pink-champagne-diamond-necklace/01-main-v2.webp", kind: "sku" },
      { src: "/images/catalog/pink-champagne-diamond-necklace/01-main-page-v2.webp", kind: "detail" },
      { src: "/images/catalog/pink-champagne-diamond-necklace/02-detail-v2.webp", kind: "detail" },
      { src: "/images/catalog/pink-champagne-diamond-necklace/05-on-body-v2.webp", kind: "on-body" },
    ],
    details: [
      "Pear-shaped pink lab-grown diamond: 2 ct or 3 ct",
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
    price: 899, // lowest option (silver, 1 ct) — shown as "From $899"
    type: "Necklaces",
    shape: "Round",
    stone: "A slim open teardrop cradling a round pink lab-grown diamond at its base, on a fine cable chain, in 925 sterling silver or 14K yellow gold.",
    stoneGroup: "Diamond",
    metals: ["14k Yellow Gold", "925 Sterling Silver"],
    defaultMetal: "14k Yellow Gold",
    carats: TEARDROP_CARATS,
    metalCaratPrices: TEARDROP_PRICES, // chain included
    salePercentOff: 15, // 15% off during the limited-time sale instead of the sitewide 10%
    sizes: NECKLACE_LENGTHS,
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
      "One round pink lab-grown diamond: 1 ct, 1.5 ct, 2 ct or 3 ct",
      "925 sterling silver or 14K yellow gold",
      "Cable chain included, in the same metal: 16, 18 or 20 in",
      "[Pendant size — to be provided]",
    ],
    materials: ["925 sterling silver or 14K yellow gold", "Lab-grown diamond"],
    rank: 74,
    addedRank: -71,
  },  {
    // PRODUCT 75 — snowflake cluster ring: round centre diamond ringed by eight outward-pointing pear diamonds, split pavé band
    slug: "snowflake-cluster-diamond-ring",
    name: "Snowflake Cluster Diamond Ring",
    price: 1299, // 14K — shown as "From $1,499"
    type: "Rings",
    ringStyle: "Statement",
    band: "Split Shank",
    collections: ["engagement-bridal"],
    shape: "Round",
    stone: "A round brilliant lab-grown diamond at the centre of eight pear-shaped lab-grown diamonds, their points turned outward like a snowflake, on a split pavé band. 1 ct centre diamond and approx. 1.46 ct of side diamonds, in 14K or 18K gold.",
    stoneGroup: "Diamond",
    metals: SOLITAIRE_RING_METALS, // 14K or 18K, white / yellow / rose gold
    metalPrices: Object.fromEntries(SOLITAIRE_RING_METALS.map((m) => [m, m.startsWith("18k") ? 1499 : 1299])),
    defaultMetal: "14k White Gold",
    salePercentOff: 15, // 15% off during the limited-time sale instead of the sitewide 10%
    sizes: RING_SIZES,
    images: [
      { src: "/images/catalog/snowflake-cluster-diamond-ring/01-sku-v3.webp", kind: "sku" },
      { src: "/images/catalog/snowflake-cluster-diamond-ring/02-three-quarter-v2.webp", kind: "detail" },
      // the customer's video of the real ring (white metal), shown in place of a side view; cropped by the 4:5 frame
      {
        src: "/videos/snowflake-cluster-diamond-ring.mp4",
        kind: "video",
        focus: { x: 0.5, y: 0.49 },
        poster: "/images/catalog/snowflake-cluster-diamond-ring/04-video-poster-v2.webp",
      },
      { src: "/images/catalog/snowflake-cluster-diamond-ring/05-on-hand-v2.webp", kind: "on-body" },
    ],
    // No side views. Gold metals swap the three-quarter and on-hand shots; the video shows the white metal ring.
    metalImages: with18k(Object.fromEntries(
      (["yellow-gold", "rose-gold"] as const).map((tone) => [
        tone === "yellow-gold" ? "14k Yellow Gold" : "14k Rose Gold",
        [
          { src: `/images/catalog/snowflake-cluster-diamond-ring/02-three-quarter-${tone}-v2.webp`, kind: "detail" },
          { src: `/images/catalog/snowflake-cluster-diamond-ring/05-on-hand-${tone}.webp`, kind: "on-body" },
        ] as GalleryImage[],
      ]),
    )), // 18K shows the same photos as 14K of each colour
    details: [
      "Made in your choice of 14K or 18K gold",
      "Round brilliant lab-grown centre diamond, 1 ct",
      "Eight pear-shaped lab-grown diamonds in a snowflake cluster and a split pavé band: approx. 1.46 ct total side stones",
      "Prices may vary with the current gold price and ring size.",
    ],
    materials: ["14K or 18K gold", "Lab-grown diamonds"],
    rank: 75,
    addedRank: -74,
  },  {
    // PRODUCT 77 — round centre diamond in six claws, a round side diamond and a tiny-diamond cluster on each shoulder, plain band; 14k or 18k white gold
    slug: "cluster-accent-round-diamond-ring",
    name: "Round Diamond Ring with Cluster Accents",
    price: THREE_STONE_RING_PRICES["14k White Gold"]["1ct"], // priced like the three-stone rings — shown as "From $1,099"
    type: "Rings",
    ringStyle: "Three-Stone & Side Stones",
    band: "Plain Band",
    collections: ["engagement-bridal"],
    shape: "Round",
    stone: "A round brilliant lab-grown diamond in six claws, flanked on each side by a round lab-grown diamond and a small flower-like cluster of tiny diamonds, on a plain polished band. Center stone from 1 ct; made in 14K or 18K white gold. [Side stone weights — to be provided]",
    stoneGroup: "Diamond",
    // the colour shown in the reference video, in both golds the three-stone pricing covers
    metals: ["14k White Gold", "18k White Gold"],
    metalCaratPrices: THREE_STONE_RING_PRICES,
    defaultMetal: "14k White Gold",
    sizes: RING_SIZES,
    carats: CARATS,
    // New-ring standard: SKU shot (also first in the product-page gallery) + on-hand shot only.
    images: [
      { src: "/images/catalog/cluster-accent-round-diamond-ring/01-sku-v2.webp", kind: "sku" },
      { src: "/images/catalog/cluster-accent-round-diamond-ring/01-sku-v2.webp", kind: "detail" },
      // Real video of the ring (the customer's 86_raw clip, uncut); the 4:5 gallery frame crops it.
      {
        src: "/images/catalog/cluster-accent-round-diamond-ring/06-video-v2.mp4",
        poster: "/images/catalog/cluster-accent-round-diamond-ring/06-video-poster-v3.webp",
        kind: "video",
        focus: { x: 0.55, y: 0.58 },
      },
      { src: "/images/catalog/cluster-accent-round-diamond-ring/05-on-hand.webp", kind: "on-body" },
    ],
    details: [
      "Round brilliant lab-grown centre diamond in six claws, from 1 ct",
      "A round lab-grown side diamond and a cluster of tiny lab-grown diamonds on each shoulder",
      "Plain polished band",
      "Prices may vary with the current gold price and ring size.",
    ],
    materials: ["14K or 18K white gold", "Lab-grown diamonds"],
    rank: 77,
    addedRank: -75,
  },













  {
    // PRODUCT 76 — V-shaped (chevron) pavé diamond band crowned with five graduated white pearls, a diamond at each end; 14k white gold
    slug: "pearl-chevron-diamond-ring",
    name: "Pearl Chevron Diamond Ring",
    price: 799, // 14K — shown as "From $799"
    type: "Rings",
    ringStyle: "Statement",
    band: "Pavé Band",
    stone: "A gently pointed V band set with pavé lab-grown diamonds, crowned with five graduated white pearls and finished with a diamond at each end. [Pearl size and diamond weight — to be provided]",
    stoneGroup: "Pearl",
    metals: ["14k White Gold", "18k White Gold"], // white gold as shown; 14K or 18K
    metalPrices: { "14k White Gold": 799, "18k White Gold": 999 },
    defaultMetal: "14k White Gold",
    sizes: RING_SIZES,
    images: [
      { src: "/images/catalog/pearl-chevron-diamond-ring/01-sku.webp", kind: "sku" },
      { src: "/images/catalog/pearl-chevron-diamond-ring/02-three-quarter.webp", kind: "detail" },
      // Real video of the ring (cropped, original colour); shows third, after the on-hand photo.
      {
        src: "/images/catalog/pearl-chevron-diamond-ring/06-video-v3.mp4",
        poster: "/images/catalog/pearl-chevron-diamond-ring/06-video-poster-v4.webp",
        kind: "video",
        focus: { x: 0.42, y: 0.5 },
      },
      { src: "/images/catalog/pearl-chevron-diamond-ring/05-on-hand-v2.webp", kind: "on-body" },
    ],
    details: ["[DETAILS — to be provided]"],
    materials: ["14K or 18K white gold", "Cultured pearls", "Lab-grown diamonds"],
    rank: 76,
    addedRank: -73,
  },
  {
    // PRODUCT 78 — halo family, white centre diamond, same halo and pavé band as 007; grid SKU + three-quarter only
    slug: "marquise-halo-diamond-ring",
    name: "Marquise Halo Diamond Ring",
    price: HALO_RING_PRICES["14k White Gold"]["1ct"], // lowest option — shown as "From $999"
    type: "Rings",
    ringStyle: "Halo",
    band: "Pavé Band",
    collections: ["engagement-bridal"],
    shapeGroup: "halo-diamond-ring",
    shape: "Marquise",
    stone: "Marquise diamond, set north-south with V-claws on both points, framed by a halo of diamonds on a pavé band. Lab-grown, center stone from 1 ct (D–E, VVS2, IGI), approx. 0.40 ct side stones.",
    stoneGroup: "Diamond",
    metals: SOLITAIRE_RING_METALS,
    metalCaratPrices: HALO_RING_PRICES,
    salePercentOff: HALO_RING_SALE,
    defaultMetal: "14k White Gold",
    sizes: RING_SIZES,
    carats: CARATS,
    images: [
      { src: "/images/catalog/marquise-halo-diamond-ring/01-sku.webp", kind: "sku" },
      { src: "/images/catalog/marquise-halo-diamond-ring/02-three-quarter-v2.webp", kind: "detail" },
      { src: "/images/catalog/marquise-halo-diamond-ring/05-on-hand-lux.webp", kind: "on-body" },
    ],
    details: haloRingDetails("Marquise"),
    materials: ["14K or 18K gold", "Lab-grown diamonds: IGI-certified center stone and approx. 0.40 ct side stones"],
    hideInShop: true, // only via the Shape selector on the other halo rings (user, 2026-11-11)
    rank: 78,
    addedRank: -76,
  },
  {
    // PRODUCT 79 — halo family, white centre diamond, same halo and pavé band as 007; grid SKU + three-quarter only
    slug: "radiant-halo-diamond-ring",
    name: "Radiant-Cut Halo Diamond Ring",
    price: HALO_RING_PRICES["14k White Gold"]["1ct"], // lowest option — shown as "From $999"
    type: "Rings",
    ringStyle: "Halo",
    band: "Pavé Band",
    collections: ["engagement-bridal"],
    shapeGroup: "halo-diamond-ring",
    shape: "Radiant",
    stone: "Radiant-cut diamond in four claws, framed by a halo of diamonds on a pavé band. Lab-grown, center stone from 1 ct (D–E, VVS2, IGI), approx. 0.40 ct side stones.",
    stoneGroup: "Diamond",
    metals: SOLITAIRE_RING_METALS,
    metalCaratPrices: HALO_RING_PRICES,
    salePercentOff: HALO_RING_SALE,
    defaultMetal: "14k White Gold",
    sizes: RING_SIZES,
    carats: CARATS,
    images: [
      { src: "/images/catalog/radiant-halo-diamond-ring/01-sku.webp", kind: "sku" },
      { src: "/images/catalog/radiant-halo-diamond-ring/02-three-quarter-v2.webp", kind: "detail" },
      { src: "/images/catalog/radiant-halo-diamond-ring/05-on-hand-lux.webp", kind: "on-body" },
    ],
    details: haloRingDetails("Radiant"),
    materials: ["14K or 18K gold", "Lab-grown diamonds: IGI-certified center stone and approx. 0.40 ct side stones"],
    hideInShop: true, // only via the Shape selector on the other halo rings (user, 2026-11-11)
    rank: 79,
    addedRank: -77,
  },
  {
    // PRODUCT 80 — halo family, white centre diamond, same halo and pavé band as 007; grid SKU + three-quarter only
    slug: "cushion-halo-diamond-ring",
    name: "Cushion-Cut Halo Diamond Ring",
    price: HALO_RING_PRICES["14k White Gold"]["1ct"], // lowest option — shown as "From $999"
    type: "Rings",
    ringStyle: "Halo",
    band: "Pavé Band",
    collections: ["engagement-bridal"],
    shapeGroup: "halo-diamond-ring",
    shape: "Cushion",
    stone: "Cushion-cut diamond in four claws, framed by a halo of diamonds on a pavé band. Lab-grown, center stone from 1 ct (D–E, VVS2, IGI), approx. 0.40 ct side stones.",
    stoneGroup: "Diamond",
    metals: SOLITAIRE_RING_METALS,
    metalCaratPrices: HALO_RING_PRICES,
    salePercentOff: HALO_RING_SALE,
    defaultMetal: "14k White Gold",
    sizes: RING_SIZES,
    carats: CARATS,
    images: [
      { src: "/images/catalog/cushion-halo-diamond-ring/01-sku.webp", kind: "sku" },
      { src: "/images/catalog/cushion-halo-diamond-ring/02-three-quarter-v2.webp", kind: "detail" },
      { src: "/images/catalog/cushion-halo-diamond-ring/05-on-hand-lux.webp", kind: "on-body" },
    ],
    details: haloRingDetails("Cushion"),
    materials: ["14K or 18K gold", "Lab-grown diamonds: IGI-certified center stone and approx. 0.40 ct side stones"],
    hideInShop: true, // only via the Shape selector on the other halo rings (user, 2026-11-11)
    rank: 80,
    addedRank: -78,
  },
  {
    // PRODUCT 81 — halo family, white centre diamond, same halo and pavé band as 007; grid SKU + three-quarter only
    slug: "asscher-halo-diamond-ring",
    name: "Asscher-Cut Halo Diamond Ring",
    price: HALO_RING_PRICES["14k White Gold"]["1ct"], // lowest option — shown as "From $999"
    type: "Rings",
    ringStyle: "Halo",
    band: "Pavé Band",
    collections: ["engagement-bridal"],
    shapeGroup: "halo-diamond-ring",
    shape: "Asscher",
    stone: "Asscher-cut diamond in four claws, framed by a halo of diamonds on a pavé band. Lab-grown, center stone from 1 ct (D–E, VVS2, IGI), approx. 0.40 ct side stones.",
    stoneGroup: "Diamond",
    metals: SOLITAIRE_RING_METALS,
    metalCaratPrices: HALO_RING_PRICES,
    salePercentOff: HALO_RING_SALE,
    defaultMetal: "14k White Gold",
    sizes: RING_SIZES,
    carats: CARATS,
    images: [
      { src: "/images/catalog/asscher-halo-diamond-ring/01-sku.webp", kind: "sku" },
      { src: "/images/catalog/asscher-halo-diamond-ring/02-three-quarter-v2.webp", kind: "detail" },
      { src: "/images/catalog/asscher-halo-diamond-ring/05-on-hand.webp", kind: "on-body" },
    ],
    details: haloRingDetails("Asscher"),
    materials: ["14K or 18K gold", "Lab-grown diamonds: IGI-certified center stone and approx. 0.40 ct side stones"],
    hideInShop: true, // only via the Shape selector on the other halo rings (user, 2026-11-11)
    rank: 81,
    addedRank: -79,
  },
  {
    // PRODUCT 82 — halo family, white centre diamond, same halo and pavé band as 007; grid SKU + three-quarter only
    slug: "princess-halo-diamond-ring",
    name: "Princess-Cut Halo Diamond Ring",
    price: HALO_RING_PRICES["14k White Gold"]["1ct"], // lowest option — shown as "From $999"
    type: "Rings",
    ringStyle: "Halo",
    band: "Pavé Band",
    collections: ["engagement-bridal"],
    shapeGroup: "halo-diamond-ring",
    shape: "Princess",
    stone: "Princess-cut diamond in four corner claws, framed by a halo of diamonds on a pavé band. Lab-grown, center stone from 1 ct (D–E, VVS2, IGI), approx. 0.40 ct side stones.",
    stoneGroup: "Diamond",
    metals: SOLITAIRE_RING_METALS,
    metalCaratPrices: HALO_RING_PRICES,
    salePercentOff: HALO_RING_SALE,
    defaultMetal: "14k White Gold",
    sizes: RING_SIZES,
    carats: CARATS,
    images: [
      { src: "/images/catalog/princess-halo-diamond-ring/01-sku.webp", kind: "sku" },
      { src: "/images/catalog/princess-halo-diamond-ring/02-three-quarter-v2.webp", kind: "detail" },
      { src: "/images/catalog/princess-halo-diamond-ring/05-on-hand-v2.webp", kind: "on-body" },
    ],
    details: haloRingDetails("Princess"),
    materials: ["14K or 18K gold", "Lab-grown diamonds: IGI-certified center stone and approx. 0.40 ct side stones"],
    rank: 82,
    addedRank: -80,
  },
  {
    // PRODUCT 83 — halo family, white centre diamond, same halo and pavé band as 007; grid SKU + three-quarter only
    slug: "heart-halo-diamond-ring",
    name: "Heart Halo Diamond Ring",
    price: HALO_RING_PRICES["14k White Gold"]["1ct"], // lowest option — shown as "From $999"
    type: "Rings",
    ringStyle: "Halo",
    band: "Pavé Band",
    collections: ["engagement-bridal"],
    shapeGroup: "halo-diamond-ring",
    shape: "Heart",
    stone: "Heart-shaped diamond with a V-claw at the point, framed by a halo of diamonds on a pavé band. Lab-grown, center stone from 1 ct (D–E, VVS2, IGI), approx. 0.40 ct side stones.",
    stoneGroup: "Diamond",
    metals: SOLITAIRE_RING_METALS,
    metalCaratPrices: HALO_RING_PRICES,
    salePercentOff: HALO_RING_SALE,
    defaultMetal: "14k White Gold",
    sizes: RING_SIZES,
    carats: CARATS,
    images: [
      { src: "/images/catalog/heart-halo-diamond-ring/01-sku.webp", kind: "sku" },
      { src: "/images/catalog/heart-halo-diamond-ring/02-three-quarter-v2.webp", kind: "detail" },
      // clean white studio bridal on-hand shot (white gold ring)
      { src: "/images/catalog/heart-halo-diamond-ring/05-on-hand.webp", kind: "on-body" },
    ],
    details: haloRingDetails("Heart"),
    materials: ["14K or 18K gold", "Lab-grown diamonds: IGI-certified center stone and approx. 0.40 ct side stones"],
    rank: 83,
    addedRank: -81,
  },
  {
    // PRODUCT 90 — angel wing bracelet, yellow pear drop (the pink bracelet's photos with the stone recoloured)
    slug: "yellow-diamond-angel-wing-bracelet",
    name: "Yellow Diamond Angel Wing Bracelet",
    price: 1599, // 14K yellow gold, 2 ct — shown as "From $1,599" (silver dropped 2026-11-13)
    type: "Bracelets",
    stone: "Pavé-set angel wings in white lab-grown diamonds, with a 2 ct or 3 ct yellow pear-shaped lab-grown diamond drop under a round diamond, on a fine cable chain.",
    stoneGroup: "Diamond",
    metals: ["14k Yellow Gold"], // 14K yellow gold only (silver dropped 2026-11-13)
    carats: WING_CARATS,
    metalCaratPrices: wingCaratPrices({ "14k Yellow Gold": 1599 }),
    salePercentOff: 25, // 25% off during the limited-time sale instead of the sitewide 10%
    defaultMetal: "14k Yellow Gold",
    sizes: BRACELET_LENGTHS,
    images: [
      { src: "/images/catalog/yellow-diamond-angel-wing-bracelet/01-main-yellow-gold.webp", kind: "sku" },
      { src: "/images/catalog/yellow-diamond-angel-wing-bracelet/01-main-page-yellow-gold.webp", kind: "detail" },
      { src: "/images/catalog/yellow-diamond-angel-wing-bracelet/05-on-body-v2.webp", kind: "on-body" },
    ],
    details: [
      "Center stone: 2 ct or 3 ct pear-shaped yellow lab-grown diamond",
      "Angel wings pavé-set with white lab-grown diamonds",
      "Fine cable chain with a spring-ring clasp",
    ],
    materials: ["14K yellow gold", "Lab-grown diamonds"],
    rank: 90,
    addedRank: -88,
  },
  {
    // PRODUCT 91 — angel wing necklace, light blue pear drop, white metals only (the pink necklace's
    // white-metal photos with the stone recoloured)
    slug: "blue-diamond-angel-wing-necklace",
    name: "Blue Diamond Angel Wing Necklace",
    price: 1699, // 14K white gold, 2 ct — shown as "From $1,699" (silver dropped, +$200 on 2026-11-13)
    type: "Necklaces",
    shape: "Pear",
    stone: "Pavé-set angel wings in white lab-grown diamonds, with a 2 ct or 3 ct light blue pear-shaped lab-grown diamond drop.",
    stoneGroup: "Diamond",
    metals: ["14k White Gold"], // blue pieces: white metal only (silver dropped 2026-11-13)
    defaultMetal: "14k White Gold",
    sizes: NECKLACE_LENGTHS,
    carats: WING_CARATS,
    metalCaratPrices: wingCaratPrices({ "14k White Gold": 1699 }),
    salePercentOff: 25, // 25% off during the limited-time sale instead of the sitewide 10%
    images: [
      { src: "/images/catalog/blue-diamond-angel-wing-necklace/01-main.webp", kind: "sku" },
      { src: "/images/catalog/blue-diamond-angel-wing-necklace/01-main-page.webp", kind: "detail" },
      { src: "/images/catalog/blue-diamond-angel-wing-necklace/02-detail.webp", kind: "detail" },
      { src: "/images/catalog/blue-diamond-angel-wing-necklace/05-on-body.webp", kind: "on-body" },
    ],
    details: wingDetails("light blue"),
    materials: ["14K white gold", "Lab-grown diamonds"],
    rank: 91,
    addedRank: -89,
  },
  {
    // PRODUCT 92 — angel wing bracelet, light blue pear drop, white metals only
    slug: "blue-diamond-angel-wing-bracelet",
    name: "Blue Diamond Angel Wing Bracelet",
    price: 1599, // 14K white gold, 2 ct — shown as "From $1,599" (silver dropped 2026-11-13)
    type: "Bracelets",
    stone: "Pavé-set angel wings in white lab-grown diamonds, with a 2 ct or 3 ct light blue pear-shaped lab-grown diamond drop under a round diamond, on a fine cable chain.",
    stoneGroup: "Diamond",
    metals: ["14k White Gold"], // 14K white gold only (silver dropped 2026-11-13)
    defaultMetal: "14k White Gold",
    sizes: BRACELET_LENGTHS,
    carats: WING_CARATS,
    metalCaratPrices: wingCaratPrices({ "14k White Gold": 1599 }),
    salePercentOff: 25, // 25% off during the limited-time sale instead of the sitewide 10%
    images: [
      { src: "/images/catalog/blue-diamond-angel-wing-bracelet/01-main.webp", kind: "sku" },
      { src: "/images/catalog/blue-diamond-angel-wing-bracelet/01-main-page.webp", kind: "detail" },
      { src: "/images/catalog/blue-diamond-angel-wing-bracelet/05-on-body.webp", kind: "on-body" },
    ],
    details: [
      "Center stone: 2 ct or 3 ct pear-shaped light blue lab-grown diamond",
      "Angel wings pavé-set with white lab-grown diamonds",
      "Fine cable chain with a spring-ring clasp",
    ],
    materials: ["14K white gold", "Lab-grown diamonds"],
    rank: 92,
    addedRank: -90,
  },
  {
    // PRODUCT 93 — angel wing stud earrings, light blue pear drop, white metals only
    slug: "blue-diamond-angel-wing-stud-earrings",
    name: "Blue Diamond Angel Wing Stud Earrings",
    price: 1499, // 14K gold, 2 ct — shown as "From $1,499" (silver dropped, +$100 on 2026-11-13)
    type: "Earrings",
    shape: "Pear",
    stone: "Pavé-set angel wings in white lab-grown diamonds with a round diamond at the centre and a 2 ct or 3 ct light blue pear-shaped lab-grown diamond drop on each earring. The price is for a single earring; add two for a pair.",
    stoneGroup: "Diamond",
    metals: ["14k White Gold"], // 14K gold only (silver dropped 2026-11-13)
    defaultMetal: "14k White Gold",
    carats: WING_CARATS,
    metalCaratPrices: wingCaratPrices({ "14k White Gold": 1499 }),
    priceUnit: "single earring", // priced per earring, not per pair
    salePercentOff: 25, // 25% off during the limited-time sale instead of the sitewide 10%
    images: [
      { src: "/images/catalog/blue-diamond-angel-wing-stud-earrings/01-main.webp", kind: "sku" },
      { src: "/images/catalog/blue-diamond-angel-wing-stud-earrings/01-main-page.webp", kind: "detail" },
      { src: "/images/catalog/blue-diamond-angel-wing-stud-earrings/05-on-ear-v3.webp", kind: "on-body" },
    ],
    details: [
      "Center stone: 2 ct or 3 ct pear-shaped light blue lab-grown diamond on each earring",
      "Angel wings pavé-set with white lab-grown diamonds",
      "Price is for a single earring (add 2 for a pair)",
    ],
    materials: ["14K white gold", "Lab-grown diamonds"],
    rank: 93,
    addedRank: -91,
  },
  {
    // PRODUCT 94 — angel wing drop earrings, light blue pear drop, white metals only
    slug: "blue-diamond-angel-wing-drop-earrings",
    name: "Blue Diamond Angel Wing Drop Earrings",
    price: 1599, // 14K gold, 2 ct — shown as "From $1,599" (silver dropped 2026-11-13)
    type: "Earrings",
    shape: "Pear",
    stone: "A round lab-grown diamond stud and a bezel-set diamond on a fine chain, leading to pavé-set angel wings in white lab-grown diamonds with a 2 ct or 3 ct light blue pear-shaped lab-grown diamond drop on each earring. The price is for a single earring; add two for a pair.",
    stoneGroup: "Diamond",
    metals: ["14k White Gold"], // 14K gold only (silver dropped 2026-11-13)
    defaultMetal: "14k White Gold",
    carats: WING_CARATS,
    metalCaratPrices: wingCaratPrices({ "14k White Gold": 1599 }),
    priceUnit: "single earring", // priced per earring, not per pair
    salePercentOff: 25, // 25% off during the limited-time sale instead of the sitewide 10%
    images: [
      { src: "/images/catalog/blue-diamond-angel-wing-drop-earrings/01-main.webp", kind: "sku" },
      { src: "/images/catalog/blue-diamond-angel-wing-drop-earrings/01-main-page.webp", kind: "detail" },
      { src: "/images/catalog/blue-diamond-angel-wing-drop-earrings/05-on-ear-v3.webp", kind: "on-body" },
    ],
    details: [
      "Center stone: 2 ct or 3 ct pear-shaped light blue lab-grown diamond on each earring",
      "Angel wings pavé-set with white lab-grown diamonds",
      "Round diamond stud with a bezel-set diamond on a fine chain",
      "Price is for a single earring (add 2 for a pair)",
    ],
    materials: ["14K white gold", "Lab-grown diamonds"],
    rank: 94,
    addedRank: -92,
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
/** The on-hand photo shown on hover in the grids: the default metal's own photo when it has one
 *  (so it matches the metal of the grid SKU shot), otherwise the default images' on-body photo. */
export const onBodyImage = (item: CatalogItem) =>
  (item.defaultMetal && item.metalImages?.[item.defaultMetal]?.find((i) => i.kind === "on-body")?.src) ??
  item.images.find((i) => i.kind === "on-body")?.src;
export const getCatalogItem = (slug: string) => catalog.find((i) => i.slug === slug);

export const formatUSD = (n: number) => `$${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
// Price of a piece for the chosen metal / carat / size, following whichever option prices it.
// A size surcharge (sizeSurcharges) is added on top.
export const optionPrice = (item: CatalogItem, metal: string, carat: string, size: string): number | null => {
  const base =
    item.metalCaratPrices?.[metal]?.[carat] ??
    item.caratPrices?.[carat] ??
    item.metalPrices?.[metal] ??
    (size ? item.sizePrices?.[size] : undefined) ??
    item.price;
  const surcharge = size ? (item.caratSizeSurcharges?.[carat]?.[size] ?? item.sizeSurcharges?.[size] ?? 0) : 0;
  return base === null ? null : base + surcharge;
};

export const fromPrice = (item: CatalogItem) => {
  if (item.customName) return "Price on request";
  if (item.price === null) return "From $[PRICE]";
  return hasSinglePrice(item) ? formatUSD(item.price) : `From ${formatUSD(item.price)}`;
};

// A piece whose options never change the price (at most one carat price, no metal, size or
// chain prices) has one price, so it is shown without "From".
export const hasSinglePrice = (item: CatalogItem) =>
  (!item.caratPrices || Object.keys(item.caratPrices).length === 1) &&
  !item.sizePrices && !item.metalCaratPrices && !item.metalPrices &&
  !item.sizeSurcharges && !item.caratSizeSurcharges && !item.chainAddOn;

// Gallery images for the chosen metal: that metal's own set when there is one,
// otherwise the default images. The collection SKU shot is never part of the gallery.
// Every product page shows the first on-body photo second, right after the main shot.
// A product video, when there is one, goes second instead (the on-body photo then follows it).
const moveTo = (imgs: GalleryImage[], kind: GalleryImage["kind"], at: number): GalleryImage[] => {
  const i = imgs.findIndex((img) => img.kind === kind);
  if (i <= at) return imgs; // missing, or already at / before that position
  const rest = imgs.filter((_, j) => j !== i);
  return [...rest.slice(0, at), imgs[i], ...rest.slice(at)];
};
const onBodySecond = (imgs: GalleryImage[]): GalleryImage[] =>
  imgs.some((img) => img.kind === "video") ? moveTo(moveTo(imgs, "video", 1), "on-body", 2) : moveTo(imgs, "on-body", 1);
// Every metal shows the on-body photos of the main (SKU) image's metal — the default metal's set —
// even when they are in another colour (user, 2026-11-11); each metal keeps its own product shots.
const skuOnBody = (item: CatalogItem): GalleryImage[] => {
  const skuSet = (item.defaultMetal && item.metalImages?.[item.defaultMetal]) || item.images;
  const onBody = skuSet.filter((i) => i.kind === "on-body");
  return onBody.length ? onBody : item.images.filter((i) => i.kind === "on-body");
};
export const galleryFor = (item: CatalogItem, metal: string): GalleryImage[] => {
  const pick = (imgs: GalleryImage[]) => imgs.filter((i) => i.kind !== "sku");
  const own = pick(item.metalImages?.[metal] ?? []);
  const base = pick(item.images);
  const chosen = own.length ? own : base.length ? base : item.images;
  const onBody = skuOnBody(item);
  const images = onBody.length ? [...chosen.filter((i) => i.kind !== "on-body"), ...onBody] : chosen;
  return withBorrowedVideo(item, metal, onBodySecond(images));
};

// Videos show the real piece, so one is worth showing even in another metal colour (user,
// 2026-11-07): a metal with its own video keeps only that one; a metal without one borrows the
// piece's video in the same colour family if there is one, otherwise any of its videos.
const toneOf = (s: string) => (/yellow/i.test(s) ? "yellow" : /rose/i.test(s) ? "rose" : "white");
const withBorrowedVideo = (item: CatalogItem, metal: string, gallery: GalleryImage[]): GalleryImage[] => {
  if (gallery.some((i) => i.kind === "video")) return gallery;
  const videos = [item.images, ...Object.values(item.metalImages ?? {})]
    .flat()
    .filter((i, n, all) => i.kind === "video" && all.findIndex((j) => j.src === i.src) === n);
  if (!videos.length) return gallery;
  const video = videos.find((v) => toneOf(v.src) === toneOf(metal)) ?? videos[0];
  return [...gallery, video];
};
