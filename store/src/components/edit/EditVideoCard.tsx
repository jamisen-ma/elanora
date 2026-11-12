"use client";

import { useEffect, useRef } from "react";
import { catalog } from "@/data/catalog";
import { productSerif } from "@/lib/fonts";
import type { EditVideo } from "@/data/theEdit";
import EditQuote from "./EditQuote";
import FocusVideo from "@/components/shop/FocusVideo";

// One THE EDIT video: plays muted and looping on its own while on screen (cover shown until it
// starts); tapping the video pauses or resumes it. Every video has a
// "Request a Quote" form (EditQuote) for the piece in it; there is no "Shop" link.

const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

export default function EditVideoCard({ video }: { video: EditVideo }) {
  const ref = useRef<HTMLVideoElement>(null);
  const paused = useRef(false); // the visitor paused it: don't restart it on scroll

  // Autoplay (muted, looping) while the card is on screen; pause it once it scrolls away.
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !paused.current) void v.play().catch(() => {});
        else if (!entry.isIntersecting) v.pause();
      },
      { threshold: 0.35 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);
  const products = (video.products ?? [])
    .map((slug) => catalog.find((p) => p.slug === slug))
    .filter((p) => p !== undefined);

  return (
    <article className="text-left">
      <div className="relative aspect-[4/5] overflow-hidden bg-[#f5f4f2]">
        {/* Cropped so the diamond sits a little above centre (focus); tap the video to pause / play. */}
        <FocusVideo
          ref={ref}
          src={video.video}
          poster={video.poster}
          focus={video.focus}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={`${video.title}, video`}
          onClick={(e) => {
            const v = e.currentTarget;
            paused.current = !v.paused;
            if (v.paused) void v.play();
            else v.pause();
          }}
          className="cursor-pointer"
        />
      </div>

      <div className="mt-4">
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#1d1d1f]/55">
          {video.category} <span aria-hidden>·</span> <time dateTime={video.date}>{formatDate(video.date)}</time>
        </p>
        <h3 className={`${productSerif.className} mt-2 text-[17px] font-normal leading-snug tracking-[-0.01em] sm:text-[19px]`}>
          {video.title}
        </h3>
        {video.description && <p className="mt-1.5 text-[14px] leading-[1.6] text-[#6e6e73]">{video.description}</p>}
        <EditQuote video={video} products={products} />
      </div>
    </article>
  );
}
