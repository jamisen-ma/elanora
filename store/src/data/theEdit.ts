// THE EDIT — the brand's short jewelry videos (the same clips posted on social media).
//
// To add a video, add one entry at the top of EDIT_VIDEOS. The homepage shows the newest four
// (by `date`); /the-edit shows them all, newest first, with category filters.
//
//   - Put the video file (mp4, H.264, ideally 4:5 or 3:4, a few MB) in public/videos/the-edit/
//     and its cover image (webp/jpg, same aspect) next to it — then use "/videos/the-edit/…".
//     A full https:// link to an .mp4 on a CDN works too.
//   - `products` (optional) links the video to product pages: use the product's slug from
//     src/data/catalog.ts (the last part of its /shop/… address).

export const EDIT_CATEGORIES = ["Product Details", "Styling", "Diamond Education", "Behind the Design"] as const;
export type EditCategory = (typeof EDIT_CATEGORIES)[number];

export interface EditVideo {
  id: string; // unique, used in the page (e.g. "2026-11-06-pearl-chevron-ring")
  title: string;
  description?: string;
  video: string; // mp4 file under /public or a full https:// link to an mp4
  poster: string; // cover image (a real frame from the video or a real product photo)
  focus?: { x: number; y: number }; // where the diamond is in the video (0–1); the card crops so it sits a little above centre
  date: string; // publish date, YYYY-MM-DD
  category: EditCategory;
  products?: string[]; // optional product slugs from catalog.ts
  // What the piece is, when no product is linked (the quote form asks for a ring size only for rings).
  // Linked videos use the product's type; anything else counts as a ring.
  jewelry?: "Rings" | "Necklaces" | "Earrings" | "Bracelets";
}

export const EDIT_VIDEOS: EditVideo[] = [
  {
    id: "2026-11-07-round-halo-pave-ring",
    title: "A round halo, pavé all the way",
    description: "A round diamond framed by a halo of small diamonds, on a pavé-set band.",
    video: "/videos/the-edit/round-halo-pave-ring.mp4",
    poster: "/videos/the-edit/round-halo-pave-ring.webp",
    date: "2026-11-07",
    category: "Product Details",
  },
  {
    id: "2026-11-07-pear-three-stone-ring",
    title: "Pear, with two side stones",
    description: "A pear-shaped diamond between two smaller pear-shaped diamonds.",
    video: "/videos/the-edit/pear-three-stone-ring.mp4",
    poster: "/videos/the-edit/pear-three-stone-ring.webp",
    date: "2026-11-07",
    category: "Product Details",
    products: ["pear-three-stone-diamond-ring"],
  },
  {
    id: "2026-11-07-vintage-round-halo-ring",
    title: "A round diamond, vintage halo",
    description: "A round diamond in a floral halo with beaded edges, on a pavé band.",
    video: "/videos/the-edit/vintage-round-halo-ring.mp4",
    poster: "/videos/the-edit/vintage-round-halo-ring.webp",
    date: "2026-11-07",
    category: "Product Details",
  },
  {
    id: "2026-11-07-cluster-accent-round-ring",
    title: "Clusters, catching the light",
    description: "The round diamond with a small cluster of diamonds on each side, in the light.",
    video: "/videos/the-edit/cluster-accent-round-ring.mp4",
    poster: "/videos/the-edit/cluster-accent-round-ring.webp",
    date: "2026-11-07",
    category: "Product Details",
    products: ["cluster-accent-round-diamond-ring"],
  },
  {
    id: "2026-11-07-marquise-gold-necklace",
    title: "A marquise on a fine chain",
    description: "A single marquise diamond on a fine gold chain.",
    video: "/videos/the-edit/marquise-gold-necklace.mp4",
    poster: "/videos/the-edit/marquise-gold-necklace.webp",
    date: "2026-11-07",
    category: "Product Details",
    jewelry: "Necklaces",
  },
  {
    id: "2026-11-07-open-band-round-halo-ring",
    title: "Round halo, open band",
    description: "A round halo diamond on an open, looping band with small diamonds.",
    video: "/videos/the-edit/open-band-round-halo-ring.mp4",
    poster: "/videos/the-edit/open-band-round-halo-ring.webp",
    date: "2026-11-07",
    category: "Product Details",
  },
  {
    id: "2026-11-07-pave-wrap-ring",
    title: "A pavé wrap",
    description: "Two pavé-set ends that wrap around the finger.",
    video: "/videos/the-edit/pave-wrap-ring.mp4",
    poster: "/videos/the-edit/pave-wrap-ring.webp",
    date: "2026-11-07",
    category: "Product Details",
  },
  {
    id: "2026-11-07-twisted-band-round-ring",
    title: "A round diamond, twisted band",
    description: "A six-claw round diamond on a twisted pavé band.",
    video: "/videos/the-edit/twisted-band-round-ring.mp4",
    poster: "/videos/the-edit/twisted-band-round-ring.webp",
    date: "2026-11-07",
    category: "Product Details",
  },
  {
    id: "2026-11-07-rose-gold-stack",
    title: "A rose gold stack",
    description: "A small pear diamond ring stacked with a pavé band, in rose gold.",
    video: "/videos/the-edit/rose-gold-stack.mp4",
    poster: "/videos/the-edit/rose-gold-stack.webp",
    date: "2026-11-07",
    category: "Styling",
  },
  {
    id: "2026-11-07-crossed-gold-round-ring",
    title: "Round diamond, crossed gold",
    description: "A round diamond between crossed yellow gold details.",
    video: "/videos/the-edit/crossed-gold-round-ring.mp4",
    poster: "/videos/the-edit/crossed-gold-round-ring.webp",
    date: "2026-11-07",
    category: "Product Details",
  },
  {
    id: "2026-11-07-kite-diamond-gold-ring",
    title: "A kite-set diamond",
    description: "A square diamond set on its point, on an engraved yellow gold band.",
    video: "/videos/the-edit/kite-diamond-gold-ring.mp4",
    poster: "/videos/the-edit/kite-diamond-gold-ring.webp",
    date: "2026-11-07",
    category: "Product Details",
  },
  {
    id: "2026-11-06-cluster-accent-round-ring",
    title: "A round diamond, with clusters",
    description: "Six claws, a round centre stone and a little cluster of diamonds on each side.",
    video: "/images/catalog/cluster-accent-round-diamond-ring/06-video-v2.mp4",
    focus: { x: 0.55, y: 0.58 },
    poster: "/images/catalog/cluster-accent-round-diamond-ring/06-video-poster-v3.webp",
    date: "2026-11-06",
    category: "Product Details",
    products: ["cluster-accent-round-diamond-ring"],
  },
  {
    id: "2026-11-06-pearl-chevron-ring",
    title: "Pearls on a pavé V",
    description: "Five graduated pearls resting on a diamond chevron band.",
    video: "/images/catalog/pearl-chevron-diamond-ring/06-video-v3.mp4",
    focus: { x: 0.42, y: 0.5 },
    poster: "/images/catalog/pearl-chevron-diamond-ring/06-video-poster-v4.webp",
    date: "2026-11-06",
    category: "Product Details",
    products: ["pearl-chevron-diamond-ring"],
  },
  {
    id: "2026-11-05-snowflake-cluster-ring",
    title: "The Snowflake, up close",
    description: "A round diamond ringed by eight pear-shaped diamonds.",
    video: "/videos/snowflake-cluster-diamond-ring.mp4",
    focus: { x: 0.5, y: 0.49 },
    poster: "/images/catalog/snowflake-cluster-diamond-ring/04-video-poster-v2.webp",
    date: "2026-11-05",
    category: "Product Details",
    products: ["snowflake-cluster-diamond-ring"],
  },
];

/** All videos, newest first (ties keep the order they are listed in). */
export const editVideosNewestFirst = () =>
  EDIT_VIDEOS.map((v, i) => ({ v, i }))
    .sort((a, b) => b.v.date.localeCompare(a.v.date) || a.i - b.i)
    .map(({ v }) => v);
