import type { Metadata } from "next";
import Image from "next/image";
import { getAllProducts } from "@/data/products";
import ShopContent from "@/components/ShopContent";

export const metadata: Metadata = {
  title: "Preview the Collection",
  description:
    "Preview our debut collection of fine jewelry — launching August 20, 2026. Join the waitlist for 30% off.",
};


export default function ShopPage() {
  const products = getAllProducts().filter((p) => !p.soldOut);

  return (
    <>
      {/* Shop Hero Banner */}
      <section className="relative h-[40vh] sm:h-[50vh] flex items-center overflow-hidden mt-16 sm:mt-20">
        <Image src="/images/collection-flat-lay.jpg" alt="Collection flat lay of all jewelry pieces" fill className="object-cover object-center" sizes="100vw" unoptimized />
        <div className="absolute inset-0 bg-foreground/50" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
          <p className="text-[10px] sm:text-xs tracking-[0.4em] uppercase text-gold-light mb-3">
            The Collection
          </p>
          <h1 className="text-3xl sm:text-5xl font-light text-white mb-4">
            Preview the Collection
          </h1>
          <p className="text-sm text-white/60 max-w-md mx-auto">
            Our debut collection launches August 20, 2026. Browse every piece
            and sign up for 30% off your first order.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <ShopContent products={products} />
      </div>
    </>
  );
}
