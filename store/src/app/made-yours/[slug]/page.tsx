import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Cormorant_Garamond } from "next/font/google";
import {
  formatUSD,
  getMadeYoursProduct,
  madeYoursProducts,
  productImage,
  wornImage,
} from "@/data/madeYours";
import { productSerif } from "@/lib/fonts";

// Product page for a MADE YOURS starting design. The customization flow (diamond,
// shape, carat, metal, setting details) is not built yet; this page introduces the
// piece and lists what will be customizable.

const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["400"] });

export function generateStaticParams() {
  return madeYoursProducts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getMadeYoursProduct(slug);
  if (!p) return { title: "Piece Not Found" };
  return { title: `${p.name} — Made Yours`, description: p.description };
}

const CUSTOMIZE = ["Diamond", "Diamond shape", "Carat", "Metal", "Setting details"];

export default async function MadeYoursProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getMadeYoursProduct(slug);
  if (!p) notFound();

  return (
    <div className="bg-white px-6 pb-28 pt-8 text-[#1d1d1f] md:px-10 lg:pt-12">
      <div className="mx-auto max-w-[1280px]">
        <nav className="text-[13px] uppercase tracking-[0.2em] text-[#86868b]">
          <Link href="/made-yours" className="hover:text-[#1d1d1f]">
            Made Yours
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[#1d1d1f]">{p.name}</span>
        </nav>

        <div className="mt-8 grid grid-cols-1 gap-12 lg:mt-10 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          {/* Images */}
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

          {/* Details */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-[13px] font-medium uppercase tracking-[0.32em] text-[#1d1d1f]/70">Made Yours</p>
            <h1 className={`${productSerif.className} mt-4 text-[2.25rem] font-normal leading-[1.1] tracking-[-0.015em] sm:text-[2.75rem]`}>
              {p.name}
            </h1>
            <p className="mt-3 text-[16px] text-[#6e6e73]">Starting at {formatUSD(p.startingPrice)}</p>
            <p className="mt-6 max-w-md text-[16px] leading-[1.7] text-[#6e6e73]">{p.description}</p>

            <dl className="mt-10 border-t border-[#ececec] text-[15px]">
              {[
                ["Category", p.category],
                ["Diamond shape", p.shape],
                ["Setting style", p.setting],
                ["Shown in", p.metal],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between border-b border-[#ececec] py-3.5">
                  <dt className="text-[#86868b]">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-10">
              <p className="text-[13px] font-medium uppercase tracking-[0.24em]">Make it yours</p>
              <p className="mt-3 text-[16px] leading-[1.7] text-[#6e6e73]">
                You&rsquo;ll be able to choose your {CUSTOMIZE.join(", ").toLowerCase()}.
              </p>
              <p className="mt-6 text-[12px] uppercase tracking-[0.24em] text-[#86868b]">Customization coming soon</p>
            </div>

            <Link
              href="/made-yours"
              className="mt-12 inline-block border-b border-[#1d1d1f]/20 pb-1.5 text-[13px] font-medium uppercase tracking-[0.2em] hover:border-[#1d1d1f]"
            >
              &larr; Back to Made Yours
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
