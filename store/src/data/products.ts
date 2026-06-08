export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number; // in cents
  description: string;
  details: string[];
  category: string;
  imageFolder: string;
  images: string[];
  featured: boolean;
  soldOut?: boolean;
  stripePriceId: string; // UPDATE: Replace with your Stripe Price ID
}

// UPDATE: Add your product descriptions, prices, and Stripe Price IDs below.
// To add a new product:
//   1. Create a folder in public/images/products/<your-product-slug>/
//   2. Add numbered images (1.jpg, 2.jpg, etc.)
//   3. Add a new entry to this array
const products: Product[] = [
  {
    id: "1",
    slug: "layered-cross-pendant-necklace",
    name: "Layered Cross Pendant Necklace",
    price: 2499,
    description:
      "A stunning multi-layered gold necklace featuring turquoise accents, a diamond-encrusted cross pendant, and a delicate lotus medallion. Each layer catches the light differently, creating a mesmerizing cascade of texture and brilliance.",
    details: [
      "Multi-layered design with 4 distinct chains",
      "Turquoise stone accents",
      "Diamond-encrusted cross pendant",
      "Hollowed lotus medallion",
      "18K gold plated",
      "Adjustable length: 14-18 inches",
    ],
    category: "Necklaces",
    imageFolder: "cross-border-jewelry",
    images: [
      "/images/products/cross-border-jewelry/1.jpg",
      "/images/products/cross-border-jewelry/2.jpg",
      "/images/products/cross-border-jewelry/3.jpg",
    ],
    featured: true,
    stripePriceId: "price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID_1", // UPDATE
  },
  {
    id: "2",
    slug: "heart-diamond-ring",
    name: "Heart Diamond Ring",
    price: 2399,
    description:
      "An exquisite heart-shaped aquamarine ring set in 18K gold, surrounded by a halo of sparkling pavé diamonds. The open-band design adds a modern twist to this timeless romantic piece.",
    details: [
      "Heart-shaped aquamarine center stone",
      "Pavé diamond halo setting",
      "18K gold band",
      "Open adjustable band design",
      "Comes in a luxury gift box",
    ],
    category: "Rings",
    imageFolder: "diamond-ring",
    images: [
      "/images/products/diamond-ring/1.jpg",
      "/images/products/diamond-ring/2.jpg",
      "/images/products/diamond-ring/3.jpg",
      "/images/products/diamond-ring/4.jpg",
      "/images/products/diamond-ring/5.jpg",
    ],
    featured: false,
    soldOut: true,
    stripePriceId: "price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID_2", // UPDATE
  },
  {
    id: "3",
    slug: "gold-coin-pendant-necklace",
    name: "Gold Coin Pendant Necklace",
    price: 2299,
    description:
      "A refined double-layer necklace featuring classic coin pendants with portrait engravings. Crafted from titanium steel with an 18K gold finish, this piece brings timeless elegance to any outfit.",
    details: [
      "Double-layered chain design",
      "Queen portrait coin pendants",
      "Titanium steel construction",
      "18K gold finish",
      "Hypoallergenic & tarnish-resistant",
      "Chain length: 16-20 inches",
    ],
    category: "Necklaces",
    imageFolder: "gold-coin-necklace",
    images: [
      "/images/products/gold-coin-necklace/1.jpg",
      "/images/products/gold-coin-necklace/2.jpg",
      "/images/products/gold-coin-necklace/3.jpg",
      "/images/products/gold-coin-necklace/4.jpg",
      "/images/products/gold-coin-necklace/5.jpg",
    ],
    featured: false,
    soldOut: true,
    stripePriceId: "price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID_3", // UPDATE
  },
  {
    id: "4",
    slug: "palm-tree-pendant-necklace",
    name: "Palm Tree Pendant Necklace",
    price: 1999,
    description:
      "A playful yet elegant palm tree pendant necklace available in silver, gold, and rose gold finishes. The minimalist tropical design makes it the perfect everyday piece or vacation accessory.",
    details: [
      "Palm tree silhouette pendant",
      "Available in 3 finishes: silver, gold, rose gold",
      "Stainless steel construction",
      "18K plated finish",
      "Hypoallergenic",
      "Chain length: 18 inches with 2-inch extender",
    ],
    category: "Necklaces",
    imageFolder: "palm-tree-necklace",
    images: [
      "/images/products/palm-tree-necklace/1.jpg",
      "/images/products/palm-tree-necklace/2.jpg",
      "/images/products/palm-tree-necklace/3.jpg",
      "/images/products/palm-tree-necklace/4.jpg",
      "/images/products/palm-tree-necklace/5.jpg",
    ],
    featured: false,
    soldOut: true,
    stripePriceId: "price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID_4", // UPDATE
  },
  {
    id: "5",
    slug: "acrylic-water-drop-pendant-earrings",
    name: "Acrylic Water Drop Pendant Earrings",
    price: 2199,
    description:
      "Statement drop earrings with glossy blue acrylic tops, polished silver-tone links, and deep red water-drop pendants for a bold color-blocked finish.",
    details: [
      "Blue acrylic square studs",
      "Polished silver-tone drop links",
      "Deep red water-drop pendants",
      "Lightweight statement design",
      "Ideal for evening styling",
    ],
    category: "Earrings",
    imageFolder: "acrylic-water-drop-earrings",
    images: ["/images/products/acrylic-water-drop-earrings/1.jpg"],
    featured: true,
    stripePriceId: "price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID_5", // UPDATE
  },
  {
    id: "6",
    slug: "gold-heart-pendant-necklace",
    name: "Gold Heart Pendant Necklace",
    price: 2399,
    description:
      "A layered gold necklace pairing a polished box chain with a beaded strand and a textured heart pendant finished with a sparkling center accent.",
    details: [
      "Layered double-chain design",
      "Textured heart pendant",
      "Sparkling center stone accent",
      "Gold-tone finish",
      "Easy everyday statement piece",
    ],
    category: "Necklaces",
    imageFolder: "heart-necklace",
    images: [
      "/images/products/heart-necklace/1.jpg",
      "/images/products/heart-necklace/2.jpg",
      "/images/products/heart-necklace/3.jpg",
      "/images/products/heart-necklace/4.jpg",
      "/images/products/heart-necklace/5.jpg",
    ],
    featured: false,
    soldOut: true,
    stripePriceId: "price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID_6", // UPDATE
  },
  {
    id: "7",
    slug: "moonstone-drop-necklace",
    name: "Moonstone Drop Necklace",
    price: 2199,
    description:
      "A delicate gold station chain finished with an iridescent oval moonstone-style pendant, designed for subtle shimmer and effortless layering.",
    details: [
      "Oval moonstone-style pendant",
      "Gold station chain with bead accents",
      "Adjustable extender chain",
      "Minimal layered styling",
      "Soft iridescent finish",
    ],
    category: "Necklaces",
    imageFolder: "moonstone-necklace",
    images: [
      "/images/products/moonstone-necklace/1.jpg",
      "/images/products/moonstone-necklace/2.jpg",
      "/images/products/moonstone-necklace/3.jpg",
      "/images/products/moonstone-necklace/4.jpg",
      "/images/products/moonstone-necklace/5.jpg",
      "/images/products/moonstone-necklace/6.jpg",
    ],
    featured: true,
    stripePriceId: "price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID_7", // UPDATE
  },
  {
    id: "8",
    slug: "heart-shaped-zircon-necklace",
    name: "Heart Shaped Zircon Necklace",
    price: 2599,
    description:
      "A romantic gold heart pendant necklace with pink zircon-style accents and a bright chain that catches the light from every angle.",
    details: [
      "Open heart pendant design",
      "Pink zircon-style stones",
      "Gold-tone chain and pendant",
      "Polished reflective finish",
      "Gift-ready romantic style",
    ],
    category: "Necklaces",
    imageFolder: "heart-shaped-zircon-necklace",
    images: [
      "/images/products/heart-shaped-zircon-necklace/1.jpg",
      "/images/products/heart-shaped-zircon-necklace/2.jpg",
      "/images/products/heart-shaped-zircon-necklace/3.jpg",
      "/images/products/heart-shaped-zircon-necklace/4.jpg",
    ],
    featured: true,
    stripePriceId: "price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID_8", // UPDATE
  },
  {
    id: "9",
    slug: "star-diamond-necklace",
    name: "Star Diamond Necklace",
    price: 2499,
    description:
      "A gold link necklace with star-inspired charms and a sparkling center accent, blending celestial detail with modern chain styling.",
    details: [
      "Starburst charm with crystal accent",
      "Gold paperclip-link detail",
      "Delicate drop charm",
      "Layer-friendly chain design",
      "Polished gold-tone finish",
    ],
    category: "Necklaces",
    imageFolder: "star-diamond-necklace",
    images: [
      "/images/products/star-diamond-necklace/1.jpg",
      "/images/products/star-diamond-necklace/2.jpg",
      "/images/products/star-diamond-necklace/3.jpg",
      "/images/products/star-diamond-necklace/4.jpg",
      "/images/products/star-diamond-necklace/5.jpg",
    ],
    featured: false,
    stripePriceId: "price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID_9", // UPDATE
  },
  {
    id: "10",
    slug: "aquaman-pearl-necklace",
    name: "Aquaman Pearl Necklace",
    price: 2299,
    description:
      "A delicate multi-layer gold necklace with tiny station beads and small white pearls arranged across airy, feminine chain layers.",
    details: [
      "Multi-layer gold chain design",
      "Small white pearl accents",
      "Tiny gold station beads",
      "Long lower draped strand",
      "Lightweight layered look",
    ],
    category: "Necklaces",
    imageFolder: "aquaman-pearl-necklace",
    images: [
      "/images/products/aquaman-pearl-necklace/1.jpg",
      "/images/products/aquaman-pearl-necklace/2.png",
      "/images/products/aquaman-pearl-necklace/3.png",
      "/images/products/aquaman-pearl-necklace/4.png",
      "/images/products/aquaman-pearl-necklace/5.png",
      "/images/products/aquaman-pearl-necklace/6.png",
    ],
    featured: false,
    stripePriceId: "price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID_10", // UPDATE
  },
  {
    id: "11",
    slug: "pear-pearl-necklace",
    name: "Pear Pearl Necklace",
    price: 2099,
    description:
      "A refined pendant necklace featuring a soft pear-shaped pearl-style charm on a fine gold chain for a clean, understated finish.",
    details: [
      "Pear-shaped pearl-style pendant",
      "Fine gold-tone chain",
      "Minimal everyday silhouette",
      "Soft luminous pendant finish",
      "Pairs easily with blazers and knits",
    ],
    category: "Necklaces",
    imageFolder: "pear-pearl-necklace",
    images: [
      "/images/products/pear-pearl-necklace/1.jpg",
      "/images/products/pear-pearl-necklace/2.jpg",
    ],
    featured: false,
    soldOut: true,
    stripePriceId: "price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID_11", // UPDATE
  },
];

export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}
