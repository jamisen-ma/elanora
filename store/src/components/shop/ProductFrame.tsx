import Image from "next/image";

// One display frame for every ELANORA product image: a canvas (pure white in the grids;
// the product page passes its own page colour so the two read as one), the supplied
// image shown whole (object-contain, never cropped) inside a small inset, so the
// piece sits at roughly 45–50% of the frame width (catalogue scale, like Graff).
// On-body photos fill the frame instead.
// With no image yet, the frame stays empty — nothing is drawn in its place.
// `hoverSrc` (collection cards): an on-hand photo layered on top that fades in when the
// surrounding `group` link is hovered, settling gently from a slight zoom.

export const FRAME_BG = "bg-white";
// Product page background. The product page gallery uses it as the canvas so the
// photos sit directly on the page; the collection grids stay pure white.
export const PAGE_BG = "bg-[#faf9f7]";

export default function ProductFrame({
  src,
  alt,
  fill = false,
  priority = false,
  sizes = "(max-width: 1024px) 50vw, 25vw",
  className = "aspect-[4/5]",
  bg = FRAME_BG,
  hoverSrc,
}: {
  src?: string;
  alt: string;
  fill?: boolean; // on-body / lifestyle images
  priority?: boolean;
  sizes?: string;
  className?: string;
  bg?: string; // canvas colour class; white photo backgrounds multiply into it
  hoverSrc?: string; // shown on hover of the parent `group` (e.g. the on-hand photo)
}) {
  return (
    <div className={`relative overflow-hidden ${bg} ${className}`}>
      {src ? (
        <div className={`absolute ${fill ? "inset-0" : "inset-[8%]"}`}>
          <Image
            src={src}
            alt={alt}
            fill
            unoptimized
            loading={priority ? "eager" : "lazy"}
            sizes={sizes}
            className={fill ? "object-cover" : "object-contain mix-blend-multiply"}
          />
        </div>
      ) : null}
      {src && hoverSrc && (
        <Image
          src={hoverSrc}
          alt=""
          aria-hidden
          fill
          unoptimized
          loading="lazy"
          sizes={sizes}
          className="scale-[1.03] object-cover opacity-0 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-100 group-hover:opacity-100 motion-reduce:transition-none"
        />
      )}
      {!src && (
        <span className="absolute inset-x-0 bottom-4 text-center text-[10px] uppercase tracking-[0.22em] text-[#1d1d1f]/30">
          [Image pending]
        </span>
      )}
    </div>
  );
}
