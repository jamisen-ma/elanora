"use client";

import { useEffect, useRef, useState } from "react";
import { galleryFor, type CatalogItem, type GalleryImage } from "@/data/catalog";
import { useMetal } from "./MetalContext";
import ProductFrame, { PAGE_BG } from "./ProductFrame";
import FocusVideo from "./FocusVideo";

// Product page gallery: a wide strip showing two panels side by side on desktop (one on
// mobile), paged with thin chevrons, swipe or the ← → keys. Shows only the images
// supplied; controls appear when there are more panels than fit.

export default function ProductGallery({ item }: { item: CatalogItem }) {
  const name = item.name;
  const { metal } = useMetal();
  const images = galleryFor(item, metal);
  const [active, setActive] = useState(0);
  const [perView, setPerView] = useState(1);
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setPerView(mq.matches ? 2 : 1);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const count = Math.max(images.length, 1);
  const last = Math.max(count - perView, 0);
  const index = Math.min(active, last);
  const many = last > 0;
  const altFor = (img: GalleryImage) => (img.kind === "on-body" ? `${name}, worn` : `${name}, detail`);

  const step = (d: number) => setActive(Math.min(Math.max(index + d, 0), last));

  return (
    <div
      className="group relative overflow-hidden outline-none"
      role="region"
      aria-roledescription="carousel"
      aria-label={`${name} images`}
      tabIndex={many ? 0 : undefined}
      onKeyDown={(e) => {
        if (!many) return;
        if (e.key === "ArrowLeft") step(-1);
        if (e.key === "ArrowRight") step(1);
      }}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (!many || touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      <ul
        className="flex transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ transform: `translateX(-${(index * 100) / perView}%)` }}
      >
        {(images.length ? images : [undefined]).map((img, i) => (
          <li
            key={img?.src ?? "empty"}
            className="w-full shrink-0 lg:w-1/2"
            aria-hidden={i < index || i >= index + perView}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${images.length}`}
          >
            {img?.kind === "video" ? (
              <div className={`relative aspect-square overflow-hidden lg:aspect-[1/1.02] ${PAGE_BG}`}>
                <FocusVideo
                  src={img.src}
                  poster={img.poster}
                  focus={img.focus}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label={`${name}, video`}
                />
              </div>
            ) : (
              <ProductFrame
                src={img?.src}
                alt={img ? altFor(img) : name}
                fill={img?.kind === "on-body"}
                priority // few images; load all so slides never flash blank
                sizes="(max-width: 1024px) 100vw, 32vw"
                // mobile: square slides (less empty canvas above and below), piece at catalogue scale like Graff
                className="aspect-square lg:aspect-[1/1.02]"
                insetClass="inset-[17%] lg:inset-[8%]"
                bg={PAGE_BG}
              />
            )}
          </li>
        ))}
      </ul>

      {many && (
        <>
          <Chevron side="left" onClick={() => step(-1)} disabled={index === 0} />
          <Chevron side="right" onClick={() => step(1)} disabled={index === last} />
        </>
      )}
    </div>
  );
}

function Chevron({ side, onClick, disabled }: { side: "left" | "right"; onClick: () => void; disabled: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={side === "left" ? "Previous image" : "Next image"}
      // soft light disc so the chevron stays visible over dark on-body photos
      className={`absolute top-1/2 ${side === "left" ? "left-1 sm:left-3" : "right-1 sm:right-3"} flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/75 text-[#1d1d1f] backdrop-blur-sm transition-opacity duration-300 hover:bg-white/90 disabled:pointer-events-none disabled:opacity-0`}
    >
      <svg width="12" height="22" viewBox="0 0 12 22" fill="none" aria-hidden className="drop-shadow-[0_0_6px_rgba(255,255,255,0.7)]">
        <path
          d={side === "left" ? "M10 1 2 11l8 10" : "M2 1l8 10-8 10"}
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
