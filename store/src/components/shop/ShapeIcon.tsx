// Fine line drawings of the ten diamond cuts, seen face-up. Shared by the product page
// Shape selector and the ring designer.

export default function ShapeIcon({
  shape,
  size = 26,
  className = "text-[#1d1d1f]/70",
}: {
  shape: string;
  size?: number;
  className?: string;
}) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 32 32",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 0.8,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    className,
  };
  switch (shape) {
    case "Round":
      return (
        <svg {...common}>
          <circle cx="16" cy="16" r="12" />
          <polygon points="16,9 21,11 23,16 21,21 16,23 11,21 9,16 11,11" />
          <path d="M16 4v5M24.5 7.5 21 11M28 16h-5M24.5 24.5 21 21M16 28v-5M7.5 24.5 11 21M4 16h5M7.5 7.5 11 11" />
        </svg>
      );
    case "Oval":
      return (
        <svg {...common}>
          <ellipse cx="16" cy="16" rx="9" ry="13" />
          <polygon points="16,8 20,11 21,16 20,21 16,24 12,21 11,16 12,11" />
          <path d="M16 3v5M22.4 6.8 20 11M25 16h-4M22.4 25.2 20 21M16 29v-5M9.6 25.2 12 21M7 16h4M9.6 6.8 12 11" />
        </svg>
      );
    case "Emerald":
      return (
        <svg {...common}>
          <polygon points="11,3 21,3 25,7 25,25 21,29 11,29 7,25 7,7" />
          <polygon points="12.5,6 19.5,6 22,8.5 22,23.5 19.5,26 12.5,26 10,23.5 10,8.5" />
          <rect x="13" y="9.5" width="6" height="13" />
        </svg>
      );
    case "Pear":
      return (
        <svg {...common}>
          <path d="M16 29C10 29 7 25 7 20.5 7 14 12 8 16 3c4 5 9 11 9 17.5 0 4.5-3 8.5-9 8.5Z" />
          <path d="M16 25c-3 0-5-2-5-4.5 0-3.5 2.5-7 5-10 2.5 3 5 6.5 5 10 0 2.5-2 4.5-5 4.5Z" />
          <path d="M16 3v7.5M16 29v-4M7 20.5h4M25 20.5h-4" />
        </svg>
      );
    case "Heart":
      return (
        <svg {...common}>
          <path d="M16 28 5.5 16C3 13 3.5 7.5 8 6c3.5-1.2 6.5.8 8 3.5C17.5 6.8 20.5 4.8 24 6c4.5 1.5 5 7 2.5 10Z" />
          <path d="M16 23.5 9 15.5c-1.5-2-1-5 1.5-5.6 2.2-.5 4.2.8 5.5 3 1.3-2.2 3.3-3.5 5.5-3 2.5.6 3 3.6 1.5 5.6Z" />
          <path d="M16 9.5v3.4M16 28v-4.5" />
        </svg>
      );
    case "Radiant":
      return (
        <svg {...common}>
          <polygon points="10,3 22,3 25,6 25,26 22,29 10,29 7,26 7,6" />
          <polygon points="12,7 20,7 22,9 22,23 20,25 12,25 10,23 10,9" />
          <path d="M10 3l2 4M22 3l-2 4M25 6l-3 3M25 26l-3-3M22 29l-2-4M10 29l2-4M7 26l3-3M7 6l3 3M12 7l8 18M20 7l-8 18" />
        </svg>
      );
    case "Cushion":
      return (
        <svg {...common}>
          <rect x="5" y="5" width="22" height="22" rx="6" />
          <rect x="10" y="10" width="12" height="12" rx="3" />
          <path d="M7 7l4.5 4.5M25 7l-4.5 4.5M25 25l-4.5-4.5M7 25l4.5-4.5M16 5v5M16 27v-5M5 16h5M27 16h-5" />
        </svg>
      );
    case "Marquise":
      return (
        <svg {...common}>
          <path d="M16 2C22 8 24 12 24 16s-2 8-8 14C10 24 8 20 8 16s2-8 8-14Z" />
          <path d="M16 8c3 3 4 5.5 4 8s-1 5-4 8c-3-3-4-5.5-4-8s1-5 4-8Z" />
          <path d="M16 2v6M16 30v-6M8 16h4M24 16h-4" />
        </svg>
      );
    case "Princess":
      return (
        <svg {...common}>
          <rect x="5" y="5" width="22" height="22" />
          <rect x="10" y="10" width="12" height="12" />
          <path d="M5 5l22 22M27 5L5 27M16 5v5M16 27v-5M5 16h5M27 16h-5" />
        </svg>
      );
    case "Asscher":
      return (
        <svg {...common}>
          <polygon points="10,4 22,4 28,10 28,22 22,28 10,28 4,22 4,10" />
          <polygon points="12,8 20,8 24,12 24,20 20,24 12,24 8,20 8,12" />
          <polygon points="14,12 18,12 20,14 20,18 18,20 14,20 12,18 12,14" />
          <path d="M10 4l2 4M22 4l-2 4M28 10l-4 2M28 22l-4-2M22 28l-2-4M10 28l2-4M4 22l4-2M4 10l4 2" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <rect x="6" y="6" width="20" height="20" />
        </svg>
      );
  }
}
