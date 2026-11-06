import { notFound } from "next/navigation";
import Link from "next/link";
import { Cormorant_Garamond } from "next/font/google";
import { catalog, getCatalogItem, productHref, shapeVariants } from "@/data/catalog";
import ProductGallery from "@/components/shop/ProductGallery";
import ProductPurchase from "@/components/shop/ProductPurchase";
import ProductPrice from "@/components/shop/ProductPrice";
import { MetalProvider } from "@/components/shop/MetalContext";
import { PAGE_BG } from "@/components/shop/ProductFrame";
import { productSerif } from "@/lib/fonts";
import { settingForSlug } from "@/data/ringDesign";
import { CUSTOM_POLICY, CUSTOM_TERMS } from "@/data/customOrderPolicy";

// Product page: gallery left, name / price / stone / metal / size / ADD TO BAG right,
// then short information sections. Text in [BRACKETS] is still to be provided.

const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["400"] });

const categoryHref: Record<string, string> = {
  Rings: "/rings",
  Bracelets: "/bracelets",
  Necklaces: "/necklaces",
  Earrings: "/earrings",
};

export function generateStaticParams() {
  return catalog.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getCatalogItem(slug);
  return { title: item ? item.name : "Piece Not Found" };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getCatalogItem(slug);
  if (!item) notFound();


  // Engagement settings are designed in Design Your Ring and ordered as custom pieces.
  const isSetting = !!settingForSlug(item.slug);

  const sections: { title: string; body: React.ReactNode }[] = [
    { title: "Details", body: <List lines={item.details} /> },
    { title: "Materials", body: <List lines={item.materials} /> },
    {
      title: "Made to Order",
      // Shared by every product page (current and future).
      body: <p>We make this piece after you order. Production time: 2–6 weeks.</p>,
    },
    {
      title: "Shipping",
      body: (
        <p>
          [Shipping information — to be provided.]{" "}
          <Link href="/shipping-returns" className="underline underline-offset-4 hover:text-[#1d1d1f]">
            Shipping
          </Link>
        </p>
      ),
    },
    {
      title: "Returns & Order Policy",
      body: isSetting ? (
        <div className="space-y-2">
          <ul className="list-disc space-y-1 pl-4">
            {[CUSTOM_POLICY.inquiry, ...CUSTOM_TERMS].map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <Link href="/shipping-returns#custom-orders" className="underline underline-offset-4 hover:text-[#1d1d1f]">
            Custom order policy
          </Link>
        </div>
      ) : (
        <p>
          [Returns and order policy for this piece — to be provided.]{" "}
          <Link href="/shipping-returns" className="underline underline-offset-4 hover:text-[#1d1d1f]">
            Returns &amp; Order Policy
          </Link>
        </p>
      ),
    },
  ];

  const eyebrow = item.shape ? `${item.shape} diamond` : item.type;
  const shapes = shapeVariants(item).map((v) => ({ shape: v.shape!, href: productHref(v) }));

  return (
    <div className={`${PAGE_BG} text-[#1d1d1f]`}>
      <MetalProvider initial={item.defaultMetal ?? item.metals[0] ?? ""} options={item.metals}>
      <div className="grid grid-cols-1 gap-10 px-5 pb-28 pt-5 sm:px-8 lg:grid-cols-[minmax(0,1.9fr)_minmax(0,1fr)] lg:gap-16 lg:px-0 lg:pb-24 lg:pt-5 lg:pl-4">
        {/* Gallery: two panels side by side on desktop, one on mobile */}
        <div className="min-w-0 lg:pt-1">
          <ProductGallery item={item} />
        </div>

        {/* Details */}
        <div className="lg:pr-[4vw] lg:pt-1 xl:pr-[5vw]">
          <nav className="text-[13px] uppercase tracking-[0.2em]">
            <Link
              href={categoryHref[item.type] ?? "/shop"}
              className="underline decoration-[#1d1d1f]/60 underline-offset-[5px] hover:decoration-[#1d1d1f]"
            >
              {item.type}
            </Link>
            {item.shape && (
              <>
                <span className="mx-2.5 text-[#1d1d1f]/60">/</span>
                <span className="underline decoration-[#1d1d1f]/60 underline-offset-[5px]">{item.shape}</span>
              </>
            )}
          </nav>

          <h1
            className={`${productSerif.className} mt-4 text-balance text-[1.9rem] font-normal leading-[1.1] tracking-[-0.015em] sm:text-[2.1rem] lg:text-[clamp(1.8rem,2.2vw,2.5rem)]`}
          >
            {item.name}
            {/* Pieces sold without a chain say so in the product page title only. */}
            {item.chainAddOn && " (Pendant Only)"}
          </h1>
          <p className="mt-2 text-[13px] uppercase leading-relaxed tracking-[0.2em] text-[#8a7358]">
            {eyebrow}
          </p>

          <div className="mt-4 flex items-baseline justify-between gap-6">
            <p className={`${serif.className} text-[1.25rem] tracking-[-0.005em]`}><ProductPrice item={item} /></p>
            {item.sizes?.length ? (
              <Link
                href="/size-guide"
                className="text-[14px] underline underline-offset-[5px] hover:text-[#1d1d1f]/70"
              >
                Size Guide
              </Link>
            ) : null}
          </div>

          <ProductPurchase item={item} shapes={shapes} />

          <p className="mt-5 text-[15px] leading-[1.6] text-[#1d1d1f]/80">{item.stone}</p>

          <div className="mt-5 border-t border-[#1d1d1f]/10">
            {sections.map((s) => (
              <details key={s.title} className="group border-b border-[#1d1d1f]/10">
                <summary className="flex cursor-pointer list-none items-center justify-between py-3.5 text-[13px] font-medium uppercase tracking-[0.2em] [&::-webkit-details-marker]:hidden">
                  {s.title}
                  <span aria-hidden className="text-[16px] font-light leading-none">
                    <span className="group-open:hidden">+</span>
                    <span className="hidden group-open:inline">&minus;</span>
                  </span>
                </summary>
                <div className="pb-6 text-[15px] leading-[1.75] text-[#6e6e73]">{s.body}</div>
              </details>
            ))}
          </div>
        </div>
      </div>
      </MetalProvider>
    </div>
  );
}

function List({ lines }: { lines: string[] }) {
  return (
    <ul className="space-y-1.5">
      {lines.map((l) => (
        <li key={l}>{l}</li>
      ))}
    </ul>
  );
}
