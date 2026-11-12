// "Design Your Ring" — the engagement ring builder (quote mode).
//
// Six setting styles, each made in all ten diamond shapes. Photos come from the existing
// engagement ring products; where a style has no photo in the chosen shape, the nearest
// photo is shown with a note. There is no diamond inventory or live pricing yet: the
// customer chooses a diamond *preference* and requests a quote. Everything here is shaped
// so a priced / in-stock version can slot in later (see PRICING_MODE and DiamondChoice).

import { RING_METALS, galleryFor, getCatalogItem, productHref, type CatalogItem } from "./catalog";

/** "quote" today. Later: "partial" (setting prices shown) and "live" (full price + Add to Bag). */
export const PRICING_MODE: "quote" | "partial" | "live" = "quote";

export const SHAPES = [
  "Round",
  "Oval",
  "Emerald",
  "Pear",
  "Radiant",
  "Cushion",
  "Marquise",
  "Princess",
  "Asscher",
  "Heart",
] as const;
export type Shape = (typeof SHAPES)[number];

export const SETTINGS = [
  {
    id: "classic-solitaire",
    name: "Classic Solitaire",
    note: "One diamond on a plain band.",
    photos: {
      Round: "round-solitaire-diamond-ring",
      Oval: "oval-solitaire-diamond-ring",
      Emerald: "emerald-solitaire-diamond-ring",
      Pear: "pear-solitaire-diamond-ring",
      Radiant: "radiant-solitaire-diamond-ring",
      Cushion: "cushion-solitaire-diamond-ring",
      Marquise: "marquise-solitaire-diamond-ring",
      Princess: "princess-solitaire-diamond-ring",
      Asscher: "asscher-solitaire-diamond-ring",
      Heart: "heart-solitaire-diamond-ring",
    },
  },
  {
    id: "pave",
    name: "Pavé",
    note: "One diamond on a band set with small diamonds.",
    photos: { Oval: "oval-pave-diamond-ring", Round: "round-pave-diamond-ring" },
  },
  {
    id: "split-pave",
    name: "Split Pavé",
    note: "A band that splits in two, set with small diamonds.",
    photos: {
      Emerald: "emerald-split-pave-diamond-ring",
      Pear: "pear-split-pave-diamond-ring",
    },
  },
  {
    id: "halo",
    name: "Halo",
    note: "The center diamond is framed by small diamonds.",
    photos: {
      Oval: "yellow-oval-halo-diamond-ring",
      Round: "round-halo-diamond-ring",
      Emerald: "yellow-emerald-halo-diamond-ring",
      Pear: "yellow-pear-halo-diamond-ring",
      Marquise: "marquise-halo-diamond-ring",
      Radiant: "radiant-halo-diamond-ring",
      Cushion: "cushion-halo-diamond-ring",
      Asscher: "asscher-halo-diamond-ring",
      Princess: "princess-halo-diamond-ring",
      Heart: "heart-halo-diamond-ring",
    },
  },
  {
    id: "three-stone",
    name: "Three-Stone",
    note: "A center diamond with a side stone on each side.",
    photos: { Oval: "oval-three-stone-diamond-ring", Pear: "pear-three-stone-diamond-ring" },
  },
  {
    id: "bezel",
    name: "Bezel",
    note: "The diamond is held by a thin rim of metal.",
    photos: { Emerald: "emerald-bezel-diamond-ring" },
  },
] as const satisfies readonly { id: string; name: string; note: string; photos: Partial<Record<Shape, string>> }[];
export type SettingId = (typeof SETTINGS)[number]["id"];
type SettingDef = (typeof SETTINGS)[number];

export const getSetting = (id?: string | null) => SETTINGS.find((s) => s.id === id);

/** The setting style a product belongs to, if it is one of the builder's photos. */
export const settingForSlug = (slug: string): SettingDef | undefined =>
  SETTINGS.find((s) => (Object.values(s.photos) as string[]).includes(slug));

// Shapes to fall back on, in order, when a style has no photo in the chosen shape.
const NEAREST: Record<Shape, Shape[]> = {
  Round: ["Round", "Cushion", "Oval"],
  Oval: ["Oval", "Pear", "Round"],
  Emerald: ["Emerald", "Radiant", "Asscher", "Oval"],
  Pear: ["Pear", "Oval", "Marquise"],
  Radiant: ["Radiant", "Emerald", "Cushion", "Oval"],
  Cushion: ["Cushion", "Round", "Radiant", "Oval"],
  Marquise: ["Marquise", "Pear", "Oval"],
  Princess: ["Princess", "Asscher", "Cushion", "Round"],
  Asscher: ["Asscher", "Princess", "Emerald", "Round"],
  Heart: ["Heart", "Pear", "Round", "Oval"],
};

/** Product photographed for a style in (or nearest to) a shape. `exact` is false when it
 *  is a stand-in shape. */
export function settingPhoto(setting: SettingDef, shape?: Shape | null) {
  const photos = setting.photos as Partial<Record<Shape, string>>;
  const order = shape ? [...NEAREST[shape], ...SHAPES] : (["Oval", "Round", ...SHAPES] as Shape[]);
  for (const s of order) {
    const slug = photos[s];
    const item = slug ? getCatalogItem(slug) : undefined;
    if (item) return { item, shownShape: s, exact: !shape || s === shape };
  }
  return undefined;
}

/** First gallery image of a product in a metal (three-quarter view, white background). */
export const metalImage = (item: CatalogItem, metal: Metal) => galleryFor(item, metal)[0]?.src ?? item.images[0]?.src;
export const onHandImage = (item: CatalogItem, metal: Metal) =>
  galleryFor(item, metal).find((i) => i.kind === "on-body")?.src;
export const isYellowStone = (item: CatalogItem) => /yellow/i.test(item.name);

export const METALS = RING_METALS as unknown as readonly string[];
export type Metal = string;
export const DEFAULT_METAL: Metal = "Platinum";
const metalKey = (m: Metal) => m.toLowerCase().replace(/^14k /, "").replace(/\s+/g, "-");
const metalFromKey = (k?: string | null) => METALS.find((m) => metalKey(m) === k);

// Carat is a range picked on a slider, 0–10ct in 0.1ct steps. Unset means no preference.
export const CARAT_MIN = 0;
export const CARAT_MAX = 10;
export const CARAT_STEP = 0.1;
export const fmtCarat = (n: number) => n.toFixed(1);

export const COLOUR_TYPES = ["White", "Yellow"] as const;
export type ColourType = (typeof COLOUR_TYPES)[number];

export const QUALITY_COLOURS = ["D", "E", "F", "G", "H", "Any"] as const;
export const QUALITY_CLARITIES = ["FL–IF", "VVS", "VS", "Any"] as const;
export const QUALITY_CUTS = ["Ideal", "Excellent", "Any"] as const;

/** US ring sizes 3–9 in quarter sizes. */
export const RING_SIZES_QUARTER = Array.from({ length: 29 }, (_, i) => (3 + i * 0.25).toFixed(2)); // US 3 to 10
export const SIZE_NOT_SURE = "not-sure";
export const sizeLabel = (s?: string | null) => (!s ? "" : s === SIZE_NOT_SURE ? "Not sure yet" : `US ${s}`);

export const BUDGETS = ["Under $3,000", "$3,000–$5,000", "$5,000–$8,000", "$8,000–$12,000", "$12,000+", "Not sure"];

// Placeholders until confirmed.
export const PLACEHOLDER = {
  replyTime: "[Reply time — to be confirmed]",
  productionTime: "[Production time — to be confirmed]",
  gradingLab: "[Grading lab — to be confirmed]",
};

/** A diamond preference today; a specific stone once inventory is connected. */
export type DiamondChoice =
  | {
      kind: "preference";
      shape: Shape;
      carat?: string;
      colourType: ColourType;
      quality: "recommend" | { colour?: string; clarity?: string; cut?: string };
    }
  | {
      kind: "stone";
      stoneId: string;
      shape: Shape;
      carat: string;
      colour: string;
      clarity: string;
      cut: string;
      certificate: string;
      price: number;
    };

export type Step = "setting" | "diamond" | "ring";
export const STEPS: { id: Step; label: string; title: string }[] = [
  { id: "setting", label: "Choose a", title: "Setting" },
  { id: "diamond", label: "Choose a", title: "Diamond" },
  { id: "ring", label: "Complete your", title: "Ring" },
];

/** Everything the customer has chosen; mirrored in the URL so a design can be shared. */
export interface RingConfig {
  step: Step;
  setting?: SettingId;
  metal: Metal;
  shape?: Shape;
  diamondAdded: boolean; // the diamond step was confirmed
  /** carat range; both set or both unset */
  caratMin?: number;
  caratMax?: number;
  colourType: ColourType;
  qualityMode: "recommend" | "custom";
  qColour?: string;
  qClarity?: string;
  qCut?: string;
  size?: string;
}

export const EMPTY_CONFIG: RingConfig = {
  step: "setting",
  metal: DEFAULT_METAL,
  diamondAdded: false,
  colourType: "White",
  qualityMode: "recommend",
};

const pick = <T extends string>(list: readonly T[], v?: string | null) =>
  list.find((x) => x.toLowerCase() === v?.toLowerCase());

// "carat=1.5-2.5" -> [1.5, 2.5], clamped to the slider and rounded to its step.
function caratFromParam(v?: string | null): [number, number] | undefined {
  const m = v?.match(/^(\d+(?:\.\d+)?)-(\d+(?:\.\d+)?)$/);
  if (!m) return undefined;
  const fit = (n: number) => Math.min(CARAT_MAX, Math.max(CARAT_MIN, Math.round(n * 10) / 10));
  const a = fit(Number(m[1]));
  const b = fit(Number(m[2]));
  return [Math.min(a, b), Math.max(a, b)];
}

export function configFromParams(p: URLSearchParams): RingConfig {
  const step = pick(["setting", "diamond", "ring"] as const, p.get("step")) ?? EMPTY_CONFIG.step;
  const size = p.get("size");
  const carat = caratFromParam(p.get("carat"));
  return {
    step,
    setting: getSetting(p.get("setting"))?.id,
    metal: metalFromKey(p.get("metal")) ?? DEFAULT_METAL,
    shape: pick(SHAPES, p.get("shape")),
    diamondAdded: p.get("diamond") === "1",
    caratMin: carat?.[0],
    caratMax: carat?.[1],
    colourType: pick(COLOUR_TYPES, p.get("colour")) ?? "White",
    qualityMode: p.get("quality") === "custom" ? "custom" : "recommend",
    qColour: pick(QUALITY_COLOURS, p.get("qc")),
    qClarity: pick(QUALITY_CLARITIES, p.get("ql")),
    qCut: pick(QUALITY_CUTS, p.get("qu")),
    size: size === SIZE_NOT_SURE || RING_SIZES_QUARTER.includes(size ?? "") ? (size as string) : undefined,
  };
}

export function paramsFromConfig(c: RingConfig): URLSearchParams {
  const p = new URLSearchParams();
  p.set("step", c.step);
  if (c.setting) p.set("setting", c.setting);
  if (c.metal !== DEFAULT_METAL) p.set("metal", metalKey(c.metal));
  if (c.shape) p.set("shape", c.shape.toLowerCase());
  if (c.diamondAdded) p.set("diamond", "1");
  if (c.caratMin !== undefined && c.caratMax !== undefined)
    p.set("carat", `${fmtCarat(c.caratMin)}-${fmtCarat(c.caratMax)}`);
  if (c.colourType !== "White") p.set("colour", c.colourType.toLowerCase());
  if (c.qualityMode === "custom") {
    p.set("quality", "custom");
    if (c.qColour) p.set("qc", c.qColour);
    if (c.qClarity) p.set("ql", c.qClarity);
    if (c.qCut) p.set("qu", c.qCut);
  }
  if (c.size) p.set("size", c.size);
  return p;
}

/** Link into the builder, e.g. from a setting's product page. */
export const designHref = (c: Partial<RingConfig>) =>
  `/engagement/design?${paramsFromConfig({ ...EMPTY_CONFIG, ...c }).toString()}`;

export const hasDiamond = (c: RingConfig) => c.diamondAdded && !!c.shape;

export const qualityLabel = (c: RingConfig) => {
  if (c.qualityMode === "recommend") return "Elanora recommends the grade";
  const parts = [
    c.qColour && c.qColour !== "Any" && `Colour ${c.qColour}`,
    c.qClarity && c.qClarity !== "Any" && `Clarity ${c.qClarity}`,
    c.qCut && c.qCut !== "Any" && `Cut ${c.qCut}`,
  ].filter(Boolean);
  return parts.length ? parts.join(", ") : "No grade preference";
};

export const caratLabel = (c: RingConfig) =>
  c.caratMin === undefined || c.caratMax === undefined
    ? ""
    : c.caratMin === c.caratMax
      ? `${fmtCarat(c.caratMin)}ct`
      : `${fmtCarat(c.caratMin)}–${fmtCarat(c.caratMax)}ct`;

export const diamondTitle = (c: RingConfig) =>
  [caratLabel(c), c.shape, "Lab-Grown", c.colourType === "Yellow" ? "Yellow Diamond" : "Diamond"].filter(Boolean).join(" ");

export const ringTitle = (c: RingConfig) => {
  const s = getSetting(c.setting);
  if (!s) return "Your Ring";
  return hasDiamond(c) ? `${s.name} Ring with a ${diamondTitle(c).replace(" Lab-Grown", "")}` : `${s.name} Ring`;
};

/** Structured summary sent with the quote request. */
export const quoteSummary = (c: RingConfig) => ({
  setting: getSetting(c.setting)?.name ?? "",
  metal: c.metal,
  shape: c.shape ?? "",
  carat: caratLabel(c) || "No preference",
  colourType: c.colourType,
  quality: qualityLabel(c),
  size: sizeLabel(c.size) || "Not sure yet",
});

export const settingProductHref = (setting: SettingDef, shape?: Shape | null) => {
  const photo = settingPhoto(setting, shape);
  return photo ? productHref(photo.item) : "/engagement";
};
