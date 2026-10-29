import Image from "next/image";

// On-body comparison of the chain lengths: one photo of three identical fine gold chains.
// Each label sits level with the lowest point of its chain (fraction of the photo height), in a
// column right of the chains where the skin is clear.
const MARKS: Record<string, { top: string; note: string }> = {
  "16 in": { top: "48%", note: "At the base of the neck" },
  "18 in": { top: "58%", note: "Just below the collarbone" },
  "20 in": { top: "67.1%", note: "On the upper chest" },
};

export default function NecklaceLengthGuide({ lengths, selected }: { lengths: string[]; selected: string }) {
  const shown = lengths.filter((l) => MARKS[l]);
  if (!shown.length) return null;
  return (
    <figure>
      <div className="relative aspect-square w-full overflow-hidden bg-[#efebe6]">
        <Image
          src="/images/guides/necklace-lengths-1x1.webp"
          alt="The same fine gold chain worn at 16, 18 and 20 inches"
          fill
          unoptimized
          loading="eager"
          sizes="(min-width: 1024px) 420px, 100vw"
          className="object-cover"
        />
        {shown.map((l) => (
          <span
            key={l}
            style={{ top: MARKS[l].top }}
            className={`absolute left-[58%] -translate-y-1/2 whitespace-nowrap px-1.5 py-0.5 text-[13px] leading-none tracking-[0.04em] transition-colors ${
              l === selected ? "bg-[#1d1d1f] text-white" : "bg-white/85 text-[#1d1d1f]"
            }`}
          >
            {l}
          </span>
        ))}
      </div>
      <figcaption className="mt-2 grid gap-0.5 text-[14px] text-[#1d1d1f]/70">
        {shown.map((l) => (
          <span key={l} className={l === selected ? "text-[#1d1d1f]" : ""}>
            {l} — {MARKS[l].note}
          </span>
        ))}
      </figcaption>
    </figure>
  );
}
