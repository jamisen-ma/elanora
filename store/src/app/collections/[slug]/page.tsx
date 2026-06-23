import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  collections,
  getCollectionBySlug,
  getProductsByCollection,
} from "@/data/products";
import ProductCard from "@/components/ProductCard";

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) return { title: "Collection Not Found" };
  return {
    title: `${collection.name} Collection`,
    description: collection.description,
  };
}


export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) notFound();

  const products = getProductsByCollection(slug).filter((p) => !p.soldOut);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[40vh] sm:h-[50vh] flex items-center overflow-hidden mt-16 sm:mt-20">
        <Image src="/images/collection-flat-lay.jpg" alt={`${collection.name} collection`} fill className="object-cover object-center" sizes="100vw" unoptimized />
        <div className="absolute inset-0 bg-foreground/50" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
          <p className="text-[10px] sm:text-xs tracking-[0.4em] uppercase text-gold-light mb-3">
            {collection.season}
          </p>
          <h1 className="text-3xl sm:text-5xl font-light text-white mb-2">
            {collection.name}
          </h1>
          <p className="text-sm italic text-white/60 mb-4">
            {collection.tagline}
          </p>
          <p className="text-sm text-white/50 max-w-xl mx-auto leading-relaxed">
            {collection.description}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-warm-gray-light mb-10">
          <Link href="/" className="hover:text-gold transition-colors">Home</Link>
          <span>/</span>
          <Link href="/collections" className="hover:text-gold transition-colors">Collections</Link>
          <span>/</span>
          <span className="text-foreground">{collection.name}</span>
        </nav>

        {/* Product count */}
        <p className="text-xs text-warm-gray-light tracking-wide mb-6">
          {products.length} {products.length === 1 ? "piece" : "pieces"} available
        </p>

        {/* Product grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Navigation */}
        <div className="text-center mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/collections"
            className="inline-flex items-center gap-3 border border-foreground text-foreground text-xs tracking-[0.2em] uppercase px-8 py-3.5 hover:bg-foreground hover:text-white transition-colors"
          >
            All Collections
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-gold hover:text-gold-dark transition-colors border-b border-gold pb-0.5"
          >
            Shop All Jewelry
          </Link>
        </div>
      </div>
    </>
  );
}
