import Image from "next/image";
import Link from "next/link";
import { Cormorant_Garamond } from "next/font/google";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
});

// ------------------------------------------------------------------
// Edit these to change names, prices, photos and links.
// Photos are final 4:5 assets and are served as-is (no re-encoding).
// ------------------------------------------------------------------
type HeroProduct = {
  name: string;
  price: string;
  href: string;
  image: string;
  alt: string;
};

const products: HeroProduct[] = [
  {
    name: "Earrings",
    price: "$680",
    href: "/shop",
    image: "/images/hero-products/earrings.webp",
    alt: "Diamond hoop earrings on burgundy velvet",
  },
  {
    name: "Necklace",
    price: "$980",
    href: "/shop",
    image: "/images/hero-products/necklace.webp",
    alt: "Woman in a black evening top wearing a diamond necklace",
  },
  {
    name: "Bracelet",
    price: "$850",
    href: "/shop",
    image: "/images/hero-products/bracelet.webp",
    alt: "Diamond tennis bracelet on burgundy velvet",
  },
  {
    name: "Ring",
    price: "$720",
    href: "/shop",
    image: "/images/hero-products/ring.webp",
    alt: "Hand resting near a woman's chin wearing a diamond ring",
  },
];

export default function HeroProducts() {
  return (
    <section aria-label="Shop by category" className="bg-[#f4f0e8] text-[#2a211c]">
      <div className="pt-8 pb-12 sm:pb-14">
        {/* Tablet/desktop (md+): one row of four, all visible. Phone: swipe carousel showing ~1.2 items. */}
        <ul className="flex md:grid md:grid-cols-4 gap-3 md:gap-2.5 px-3 md:px-4 overflow-x-auto md:overflow-visible snap-x snap-mandatory scroll-px-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {products.map((p) => (
            <li key={p.name} className="snap-start shrink-0 w-[85%] md:w-auto">
              <Link href={p.href} className="group block cursor-pointer">
                <div className="relative aspect-[4/5] md:aspect-[5/6] overflow-hidden bg-[#2b0c10]">
                  <Image
                    src={p.image}
                    alt={p.alt}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 85vw, 25vw"
                    className="object-cover transition-transform duration-[350ms] ease-out group-hover:scale-[1.02]"
                  />
                </div>
                <div className="mt-3 text-center">
                  <h3 className={`${serif.className} text-[1.25rem] sm:text-[1.35rem] leading-tight font-normal`}>
                    {p.name}
                  </h3>
                  <p className="text-[13px] mt-0.5 text-[#7a6d63] font-light tracking-wide">
                    {p.price}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div className="text-center mt-12">
          <Link
            href="/shop"
            className="text-[11px] sm:text-xs tracking-[0.3em] uppercase text-[#2a211c] hover:text-[#7a6d63] transition-colors"
          >
            Shop All →
          </Link>
        </div>
      </div>
    </section>
  );
}
