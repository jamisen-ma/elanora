import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllProducts, getProductBySlug, getCollectionBySlug, formatPrice } from "@/data/products";
import ImageGallery from "@/components/ImageGallery";
import AddToCartButton from "@/components/AddToCartButton";
import ProductCard from "@/components/ProductCard";

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getAllProducts()
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-warm-gray-light mb-8">
        <Link href="/" className="hover:text-gold transition-colors">Home</Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-gold transition-colors">Shop</Link>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      {/* Product section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Image gallery */}
        <ImageGallery images={product.images} productName={product.name} />

        {/* Product info */}
        <div className="lg:py-4">
          <div className="flex items-center gap-2 mb-2">
            <p className="text-xs tracking-[0.2em] uppercase text-gold">
              {product.category}
            </p>
            {product.collection && (() => {
              const col = getCollectionBySlug(product.collection);
              return col ? (
                <>
                  <span className="text-cream-dark">|</span>
                  <Link href={`/collections/${col.slug}`} className="text-xs tracking-[0.15em] uppercase text-warm-gray hover:text-gold transition-colors">
                    {col.name} Collection
                  </Link>
                </>
              ) : null;
            })()}
          </div>
          <h1 className="text-2xl sm:text-3xl font-light mb-3">
            {product.name}
          </h1>
          <p className="text-xl text-foreground mb-6">
            {formatPrice(product.price)}
          </p>

          <p className="text-warm-gray leading-relaxed mb-6">
            {product.description}
          </p>

          {/* Details */}
          <div className="border-t border-cream-dark pt-6 mb-8">
            <h3 className="text-xs tracking-[0.15em] uppercase text-warm-gray mb-3">
              Details
            </h3>
            <ul className="space-y-1.5">
              {product.details.map((detail) => (
                <li key={detail} className="text-sm text-warm-gray flex items-start gap-2">
                  <span className="text-gold mt-1 text-[8px]">&#9670;</span>
                  {detail}
                </li>
              ))}
            </ul>
          </div>

          {/* Add to cart */}
          <AddToCartButton product={product} />

          {/* Trust badges */}
          <div className="border-t border-cream-dark mt-8 pt-6 space-y-3">
            <div className="flex items-center gap-2 text-xs text-warm-gray">
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
              </svg>
              Free shipping on orders over $75
            </div>
            <div className="flex items-center gap-2 text-xs text-warm-gray">
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182M21.015 4.356v4.992" />
              </svg>
              30-day returns & exchanges
            </div>
            <div className="flex items-center gap-2 text-xs text-warm-gray">
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              Secure checkout with Stripe
            </div>
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section className="mt-20 sm:mt-28">
          <div className="text-center mb-10">
            <p className="text-xs tracking-[0.3em] uppercase text-gold mb-2">
              You May Also Like
            </p>
            <h2 className="text-xl sm:text-2xl font-light">
              More From Our Collection
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
