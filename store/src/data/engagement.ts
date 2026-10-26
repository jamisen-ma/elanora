// Engagement & Bridal — options for "Build your engagement ring".

export const diamondShapes = [
  { id: "round", name: "Round" },
  { id: "oval", name: "Oval" },
  { id: "emerald", name: "Emerald" },
  { id: "pear", name: "Pear" },
  { id: "radiant", name: "Radiant" },
] as const;

export const settingFamilies = [
  { id: "classic-solitaire", name: "Classic Solitaire", note: "One diamond on a plain band." },
  { id: "pave-solitaire", name: "Pavé Solitaire", note: "One diamond on a band of small diamonds." },
  { id: "three-stone", name: "Three-Stone", note: "A center diamond with two side stones." },
  { id: "halo", name: "Halo", note: "A center diamond framed by small diamonds." },
  { id: "bezel", name: "Bezel", note: "The diamond is held by a thin metal rim." },
  { id: "hidden-halo", name: "Hidden Halo", note: "Small diamonds set just under the center stone." },
] as const;

export const ringMetals = ["14K Yellow Gold", "14K White Gold", "14K Rose Gold", "Platinum"] as const;

export const ringSizes = [
  "Not sure yet",
  ...["3", "3.5", "4", "4.5", "5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9"].map((s) => `US ${s}`),
];

export const shapeImage = (id: string) => `/images/engagement/shape-${id}.webp`;
export const settingImage = (id: string) => `/images/engagement/setting-${id}.webp`;
