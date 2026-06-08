import { notFound } from "next/navigation";
import Link from "next/link";
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

  const products = getProductsByCollection(slug);
  const availableCount = products.filter((p) => !p.soldOut).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-warm-gray-light mb-10">
        <Link href="/" className="hover:text-gold transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/collections" className="hover:text-gold transition-colors">
          Collections
        </Link>
        <span>/</span>
        <span className="text-foreground">{collection.name}</span>
      </nav>

      {/* Header */}
      <div className="text-center mb-14">
        <p className="text-xs tracking-[0.3em] uppercase text-gold mb-3">
          {collection.season}
        </p>
        <h1 className="text-3xl sm:text-4xl font-light mb-2">
          {collection.name}
        </h1>
        <p className="text-sm italic text-warm-gray mb-4">
          {collection.tagline}
        </p>
        <p className="text-sm text-warm-gray max-w-xl mx-auto leading-relaxed">
          {collection.description}
        </p>
      </div>

      {/* Stats */}
      <div className="flex justify-center gap-8 mb-10 text-xs text-warm-gray-light tracking-wide">
        <span>
          {products.length} {products.length === 1 ? "piece" : "pieces"}
        </span>
        <span>
          {availableCount > 0
            ? `${availableCount} available`
            : "Sold out"}
        </span>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Browse other collections */}
      <div className="text-center mt-16 space-y-4">
        <Link
          href="/collections"
          className="inline-block border border-foreground text-foreground text-sm tracking-[0.2em] uppercase px-8 py-3 rounded-sm hover:bg-foreground hover:text-white transition-colors"
        >
          All Collections
        </Link>
        <div>
          <Link
            href="/shop"
            className="text-sm tracking-[0.2em] uppercase text-gold hover:text-gold-dark transition-colors border-b border-gold pb-0.5"
          >
            Shop All Jewelry
          </Link>
        </div>
      </div>
    </div>
  );
}
