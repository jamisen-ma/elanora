import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Cormorant_Garamond } from "next/font/google";
import {
  formatUSD,
  getInColorProduct,
  inColorProducts,
  metalLabel,
  productImage,
  wornImage,
} from "@/data/inColor";
import { productSerif } from "@/lib/fonts";

// Product page for an IN COLOR piece. Same layout as the MADE YOURS product page.

const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["400"] });

export function generateStaticParams() {
  return inColorProducts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getInColorProduct(slug);
  if (!p) return { title: "Piece Not Found" };
  return { title: `${p.name} — In Color`, description: p.description };
}

export default async function InColorProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getInColorProduct(slug);
  if (!p) notFound();

  return (
    <div className="bg-white px-6 pb-28 pt-8 text-[#1d1d1f] md:px-10 lg:pt-12">
      <div className="mx-auto max-w-[1280px]">
        <nav className="text-[11px] uppercase tracking-[0.2em] text-[#86868b]">
          <Link href="/in-color" className="hover:text-[#1d1d1f]">
            In Color
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[#1d1d1f]">{p.name}</span>
        </nav>

        <div className="mt-8 grid grid-cols-1 gap-12 lg:mt-10 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="relative aspect-[4/5] bg-[#fafaf8]">
              <Image
                src={productImage(p.slug)}
                alt={p.name}
                fill
                unoptimized
                priority
                sizes="(max-width: 640px) 100vw, 30vw"
                className="object-cover mix-blend-multiply"
              />
            </div>
            <div className="relative aspect-[4/5] bg-[#fafaf8]">
              <Image
                src={wornImage(p.slug)}
                alt={`${p.name}, worn`}
                fill
                unoptimized
                sizes="(max-width: 640px) 100vw, 30vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-[#1d1d1f]/70">In Color</p>
            <h1 className={`${productSerif.className} mt-4 text-[2.25rem] font-normal leading-[1.1] tracking-[-0.015em] sm:text-[2.75rem]`}>
              {p.name}
            </h1>
            <p className="mt-2 text-[13px] text-[#86868b]">
              {p.gemstone} &middot; {metalLabel[p.metal]}
            </p>
            <p className="mt-3 text-[15px]">{formatUSD(p.price)}</p>
            <p className="mt-6 max-w-md text-[14px] leading-[1.7] text-[#6e6e73]">{p.description}</p>

            <dl className="mt-10 border-t border-[#ececec] text-[13px]">
              {[
                ["Color", p.color],
                ["Gemstone", p.gemstone],
                ["Jewelry type", p.type],
                ["Metal", metalLabel[p.metal]],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between border-b border-[#ececec] py-3.5">
                  <dt className="text-[#86868b]">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-10 text-[10px] uppercase tracking-[0.24em] text-[#86868b]">Available at launch</p>

            <Link
              href="/in-color"
              className="mt-12 inline-block border-b border-[#1d1d1f]/20 pb-1.5 text-[11px] font-medium uppercase tracking-[0.2em] hover:border-[#1d1d1f]"
            >
              &larr; Back to In Color
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
