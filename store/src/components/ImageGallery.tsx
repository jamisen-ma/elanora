"use client";

import Image from "next/image";
import { useState } from "react";

export default function ImageGallery({
  images,
  productName,
}: {
  images: string[];
  productName: string;
}) {
  const [selected, setSelected] = useState(0);

  return (
    <div className="flex flex-col-reverse sm:flex-row gap-3">
      {/* Thumbnails */}
      <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-y-auto sm:max-h-[600px]">
        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => setSelected(i)}
            className={`relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-sm overflow-hidden border-2 transition-colors ${
              selected === i ? "border-gold" : "border-transparent hover:border-cream-dark"
            }`}
          >
            <Image
              src={src}
              alt={`${productName} ${i + 1}`}
              fill
              sizes="80px"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main image */}
      <div className="relative aspect-square flex-1 bg-cream rounded-sm overflow-hidden">
        <Image
          src={images[selected]}
          alt={productName}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          priority
        />
        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => setSelected((selected - 1 + images.length) % images.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-foreground hover:bg-white transition-colors"
              aria-label="Previous image"
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              onClick={() => setSelected((selected + 1) % images.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-foreground hover:bg-white transition-colors"
              aria-label="Next image"
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
