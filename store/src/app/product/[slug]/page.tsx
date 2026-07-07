import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getAllProducts, getProductBySlug, getCollectionBySlug, formatPrice } from "@/data/products";
import { getStylingGuide } from "@/data/stylingGuides";
import ImageGallery from "@/components/ImageGallery";
import AddToCartButton from "@/components/AddToCartButton";
import ProductCard from "@/components/ProductCard";
import StylingGuideSection from "@/components/StylingGuide";

export function generateStaticParams() {
  return getAllProducts()
    .filter((p) => !p.soldOut)
    .map((p) => ({ slug: p.slug }));
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
    openGraph: {
      title: `${product.name} | Elanora`,
      description: product.description,
      images: [{ url: product.images[0], width: 800, height: 800, alt: product.name }],
    },
    twitter: {
      card: "summary_large_image" as const,
      title: `${product.name} | Elanora`,
      description: product.description,
      images: [product.images[0]],
    },
  };
}


export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product || product.soldOut) notFound();

  const related = getAllProducts()
    .filter((p) => p.id !== product.id && !p.soldOut)
    .slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images.map((img) => `https://elanora-beta.vercel.app${img}`),
    brand: { "@type": "Brand", name: "Elanora" },
    offers: {
      "@type": "Offer",
      price: (product.price / 100).toFixed(2),
      priceCurrency: "USD",
      availability: "https://schema.org/PreOrder",
      url: `https://elanora-beta.vercel.app/product/${product.slug}`,
    },
  };

  const shareUrl = `https://elanora-beta.vercel.app/product/${product.slug}`;
  const shareText = `Check out ${product.name} by Elanora — ${formatPrice(product.price)}`;

  return (
    <div className="pt-20 sm:pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex items-center gap-2 text-xs text-warm-gray-light">
          <Link href="/" className="hover:text-gold transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-gold transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>
      </nav>

      {/* Product section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Image gallery */}
          <ImageGallery images={product.images} productName={product.name} />

          {/* Product info */}
          <div className="lg:py-4">
            <div className="flex items-center gap-2 mb-2">
              <p className="text-[10px] tracking-[0.2em] uppercase text-gold">
                {product.category}
              </p>
              {product.collection && (() => {
                const col = getCollectionBySlug(product.collection);
                return col ? (
                  <>
                    <span className="text-cream-dark">|</span>
                    <Link href={`/collections/${col.slug}`} className="text-[10px] tracking-[0.15em] uppercase text-warm-gray hover:text-gold transition-colors">
                      {col.name} Collection
                    </Link>
                  </>
                ) : null;
              })()}
            </div>
            <h1 className="text-2xl sm:text-3xl font-light mb-3">
              {product.name}
            </h1>
            <p className="text-xl text-foreground mb-1">
              {formatPrice(product.price)}
            </p>
            <p className="text-warm-gray leading-relaxed mb-6 mt-6">
              {product.description}
            </p>

            {/* Details */}
            <div className="border-t border-cream-dark pt-6 mb-8">
              <h3 className="text-[10px] tracking-[0.2em] uppercase text-warm-gray mb-3">
                Details
              </h3>
              <ul className="space-y-1.5">
                {product.details.map((detail) => (
                  <li key={detail} className="text-sm text-warm-gray flex items-start gap-2">
                    <span className="text-gold mt-1.5 text-[6px]">&#9670;</span>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>

            {/* Add to cart */}
            <AddToCartButton product={product} />

            {/* Share */}
            <div className="border-t border-cream-dark mt-6 pt-6">
              <p className="text-[10px] tracking-[0.2em] uppercase text-warm-gray mb-3">
                Share
              </p>
              <div className="flex gap-3">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center bg-cream text-warm-gray hover:bg-gold hover:text-white transition-colors"
                  aria-label="Share on Facebook"
                >
                  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}&media=${encodeURIComponent(`https://elanora-beta.vercel.app${product.images[0]}`)}&description=${encodeURIComponent(shareText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center bg-cream text-warm-gray hover:bg-gold hover:text-white transition-colors"
                  aria-label="Pin on Pinterest"
                >
                  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                  </svg>
                </a>
                <a
                  href={`https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center bg-cream text-warm-gray hover:bg-gold hover:text-white transition-colors"
                  aria-label="Share on X"
                >
                  <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Styling Guide */}
        {(() => {
          const guide = getStylingGuide(product.slug);
          return guide ? (
            <StylingGuideSection
              guide={guide}
              productName={product.name}
              lifestyleImage={product.lifestyleImage}
            />
          ) : product.lifestyleImage ? (
            <section className="mt-16 sm:mt-24">
              <div className="relative h-[40vh] overflow-hidden">
                <Image src={product.lifestyleImage} alt={`${product.name} styled in context`} fill className="object-cover object-center" sizes="100vw" unoptimized />
                <div className="absolute inset-0 bg-foreground/30" />
                <div className="absolute inset-0 flex items-center justify-center text-center">
                  <div>
                    <p className="text-white/60 text-xs tracking-[0.2em] uppercase mb-2">How to Style</p>
                    <h3 className="text-2xl sm:text-3xl font-light text-white">{product.name}</h3>
                  </div>
                </div>
              </div>
            </section>
          ) : null;
        })()}

        {/* Related products */}
        {related.length > 0 && (
          <section className="mt-16 sm:mt-24 mb-16">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-2">
                  You May Also Like
                </p>
                <h2 className="text-2xl sm:text-3xl font-light">
                  More From Our Collection
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
