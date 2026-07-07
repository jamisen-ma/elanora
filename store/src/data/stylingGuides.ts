export interface StylingTip {
  title: string;
  description: string;
  image: string;
}

export interface StylingGuide {
  intro: string;
  tips: StylingTip[];
  occasions: string[];
}

const guides: Record<string, StylingGuide> = {
  "layered-cross-pendant-necklace": {
    intro:
      "This multi-layered statement piece does the styling work for you. Four distinct chains create depth and movement — the key is letting them breathe with the right neckline and keeping the rest of your look clean.",
    tips: [
      {
        title: "Deep V-Neck Pairing",
        description:
          "Let the layers cascade naturally over a deep V-neck blouse or silk camisole. The turquoise accents pop against warm skin tones and neutral fabrics like ivory, tan, and blush. Keep your décolletage clear of scarves so every chain has room to shine.",
        image: "/images/styling/cross-pendant/1.jpg",
      },
      {
        title: "Bohemian Layering",
        description:
          "Stack with a simple thin choker or delicate chain just above the turquoise layer. The multi-layer design already has dimension — one extra piece above takes it to festival-ready. Pair with flowing maxi dresses, suede, and earth tones.",
        image: "/images/styling/cross-pendant/2.jpg",
      },
      {
        title: "Office to Evening",
        description:
          "Tuck the longer pendant chains under a structured blazer during the day, showing just the turquoise choker layer for subtle polish. After hours, unbutton and let all four layers show over a simple black top for instant evening drama.",
        image: "/images/styling/cross-pendant/3.jpg",
      },
    ],
    occasions: [
      "Date Night",
      "Festival Season",
      "Beach Vacation",
      "Evening Out",
      "Sunday Brunch",
      "Music Concert",
    ],
  },

  "heart-diamond-ring": {
    intro:
      "The Heart Diamond Ring is a conversation starter that pairs beautifully with both minimal and layered hand jewelry. The open-band design and aquamarine stone give you endless options for color coordination and stacking.",
    tips: [
      {
        title: "The Stacking Story",
        description:
          "Place two thin gold bands on either side of the heart ring. The open-band gap creates a natural window that makes stacking look intentional and editorial. Stick to the same metal tone across all rings for a cohesive finish.",
        image: "/images/styling/heart-ring/1.jpg",
      },
      {
        title: "Solo Statement",
        description:
          "Let this ring speak for itself on your ring finger or middle finger. Skip other hand jewelry entirely and match with simple gold stud earrings. The heart-shaped aquamarine becomes the focal point of your entire look — less is more.",
        image: "/images/styling/heart-ring/2.jpg",
      },
      {
        title: "Color Coordination",
        description:
          "Echo the aquamarine center stone with blue or teal accents in your outfit — a silk scarf, handbag, nail color, or shoe detail creates a pulled-together color story. Pair with white, cream, or navy clothing to let the stone's color sing.",
        image: "/images/styling/heart-ring/3.jpg",
      },
    ],
    occasions: [
      "Date Night",
      "Anniversary",
      "Gift-Giving",
      "Everyday Luxury",
      "Engagement",
      "Special Occasion",
    ],
  },

  "palm-tree-pendant-necklace": {
    intro:
      "Available in gold, silver, and rose gold, this tropical pendant is your most versatile vacation piece. The minimalist silhouette plays well with bold prints or simple solids — switch metals to match your mood and wardrobe.",
    tips: [
      {
        title: "Beach Day Essential",
        description:
          "Wear the gold version against sun-kissed skin with a linen cover-up or open button-down over a swimsuit. The pendant sits perfectly at the collarbone with an open neckline. This is the necklace you forget you're wearing — until everyone asks about it.",
        image: "/images/styling/palm-tree/1.jpg",
      },
      {
        title: "Casual Summer Stack",
        description:
          "Layer with a dainty chain or shell necklace just above the palm pendant. The minimalist silhouette plays well with other vacation-inspired pieces without looking cluttered. Try mixing metals — rose gold palm tree with a thin silver chain creates an on-trend contrast.",
        image: "/images/styling/palm-tree/2.jpg",
      },
      {
        title: "Resort Evening",
        description:
          "Switch to the silver version for a cooler tone against a white sundress or linen jumpsuit. Add medium gold hoops and a woven clutch — you're sunset-dinner ready without looking like you tried. The pendant catches candlelight beautifully.",
        image: "/images/styling/palm-tree/3.jpg",
      },
    ],
    occasions: [
      "Beach Vacation",
      "Summer BBQ",
      "Resort Dining",
      "Weekend Brunch",
      "Tropical Wedding",
      "Pool Party",
    ],
  },

  "acrylic-water-drop-pendant-earrings": {
    intro:
      "These are your go-to statement earrings — the kind that replace a necklace entirely. The blue, silver, and deep red color-blocked design reads as modern art you can wear. Style them with confidence and keep everything else simple.",
    tips: [
      {
        title: "The LBD Power Move",
        description:
          "These earrings were made for a black dress. The blue acrylic tops, polished silver links, and deep red water-drop pendants create a striking triple contrast against dark fabric. Pull your hair back or up to let them be the undeniable star of the outfit.",
        image: "/images/styling/water-drop-earrings/1.jpg",
      },
      {
        title: "Gallery Opening",
        description:
          "Pair with a structured white blouse and wide-leg trousers or a tailored midi skirt. The artistic color-blocked design reads as modern and curated — perfect for creative events. Skip the necklace and let your earrings do the talking.",
        image: "/images/styling/water-drop-earrings/2.jpg",
      },
      {
        title: "Color Blocking",
        description:
          "Match the blue acrylic tops with blue in your outfit for a tone-on-tone editorial look, or go bold with complementary warm tones like mustard, terracotta, or burnt orange. The red water-drop pendants tie warm-palette outfits together unexpectedly well.",
        image: "/images/styling/water-drop-earrings/3.jpg",
      },
    ],
    occasions: [
      "Evening Event",
      "Gallery Opening",
      "Date Night",
      "Cocktail Party",
      "Creative Dinner",
      "Birthday Celebration",
    ],
  },

  "moonstone-drop-necklace": {
    intro:
      "The Moonstone Drop Necklace is pure understated magic. The iridescent pendant shifts between lavender, blue, and pink depending on the light — pair it with pieces that let the stone's natural glow take center stage.",
    tips: [
      {
        title: "Minimalist Layering",
        description:
          "Add one thin gold chain above and one longer pendant below the moonstone. The station bead chain adds texture between layers, while the iridescent pendant becomes the focal point. Keep all metals warm gold for a cohesive, effortless look.",
        image: "/images/styling/moonstone/1.jpg",
      },
      {
        title: "Golden Hour Style",
        description:
          "This necklace catches natural light beautifully — it was made for outdoor events. Wear it with a flowing off-shoulder top, wrap dress, or anything with a gentle drape. The iridescent shimmer intensifies at sunset, making it the ultimate golden-hour accessory.",
        image: "/images/styling/moonstone/2.jpg",
      },
      {
        title: "Bridal & Special Occasion",
        description:
          "The soft iridescent shimmer makes this a stunning bridal accessory or wedding guest piece. Pair with a V-neck or sweetheart neckline and delicate drop earrings. The ethereal quality of the moonstone complements lace, tulle, and satin.",
        image: "/images/styling/moonstone/3.jpg",
      },
    ],
    occasions: [
      "Wedding",
      "Garden Party",
      "Romantic Dinner",
      "Everyday Elegance",
      "Bridal Shower",
      "Anniversary",
    ],
  },

  "star-diamond-necklace": {
    intro:
      "Celestial jewelry is always in — and this star pendant combines crystal sparkle with modern paperclip-link chain for a look that's both whimsical and sophisticated. It's the kind of piece that starts conversations.",
    tips: [
      {
        title: "Celestial Stacking",
        description:
          "Layer with a moon pendant, constellation necklace, or simple crescent charm for a full celestial story. The paperclip-link detail adds visual interest between layers. Keep all pendants on different chain lengths so each symbol is visible.",
        image: "/images/styling/star-necklace/1.jpg",
      },
      {
        title: "Day-to-Night Transition",
        description:
          "Wear under a crew neck sweater or turtleneck by day with just the chain peeking out. At night, swap for a scoop-neck or off-shoulder top and let the starburst charm catch every light. The crystal accent transforms under dim lighting.",
        image: "/images/styling/star-necklace/2.jpg",
      },
      {
        title: "The Perfect Gift",
        description:
          "This is a go-to gift piece — universally flattering and meaningful. For gifting, style it in the box with the chain draped naturally around the starburst. Pair with a handwritten note about wishing on stars. It works for birthdays, holidays, or just because.",
        image: "/images/styling/star-necklace/3.jpg",
      },
    ],
    occasions: [
      "Birthday Gift",
      "Night Out",
      "Casual Friday",
      "Holiday Party",
      "Stargazing Date",
      "Graduation",
    ],
  },

  "pear-pearl-necklace": {
    intro:
      "The Pear Pearl Necklace is quiet luxury at its best — a single luminous pendant on a fine gold chain that elevates anything you wear without ever competing for attention. This is the piece your friends will borrow and never return.",
    tips: [
      {
        title: "Blazer & Pearl",
        description:
          "Drape the necklace over a fitted blazer's lapel for an editorial look that reads confident and polished. The pear-shaped pendant adds softness to structured tailoring. Works with both open-front and single-button styles — just ensure the pendant falls between the lapels.",
        image: "/images/styling/pear-pearl/1.jpg",
      },
      {
        title: "Effortless Layering",
        description:
          "This is the perfect base layer for any necklace stack. Wear it closest to the neck at its shortest length, then add one longer pendant necklace below. The pearl's soft glow contrasts beautifully with harder geometric or metallic pendants below it.",
        image: "/images/styling/pear-pearl/2.jpg",
      },
      {
        title: "Weekend Polish",
        description:
          "Pair with a simple white tee, relaxed jeans, and clean sneakers. The pearl pendant elevates the simplest outfits without feeling overdressed — the ultimate quiet luxury piece. Add sunglasses and a tote, and you look intentionally styled with zero effort.",
        image: "/images/styling/pear-pearl/3.jpg",
      },
    ],
    occasions: [
      "Office Style",
      "Brunch",
      "Weekend Casual",
      "Wedding Guest",
      "Everyday Elegance",
      "Coffee Date",
    ],
  },
};

export function getStylingGuide(slug: string): StylingGuide | undefined {
  return guides[slug];
}
