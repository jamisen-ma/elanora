import Image from "next/image";
import Link from "next/link";
import { catalog, fromPrice, onBodyImage, productHref } from "@/data/catalog";
import ProductFrame from "@/components/shop/ProductFrame";
import { cormorant as serif, productSerif } from "@/lib/fonts";

// Homepage theme window for the Angel Wing series ("Wings of Light"), right after Shop by Category:
// key visual (sets the mood) → three representative pieces → Shop the Collection.
// lg+: wide banner with the copy on the photo's empty white left side.
// Below lg: the photo is cropped tall toward the model (wings and stones stay whole) and the
// copy and button sit underneath it, so nothing covers the jewelry.

export const WINGS_HREF = "/wings-of-light";

const KEY_VISUAL = "/images/home/wings/wings-of-light-key-visual-v2.webp";

const PIECES: { slug: string; note: string }[] = [
  { slug: "blue-diamond-angel-wing-necklace", note: "The Signature" },
  { slug: "pink-diamond-angel-wing-drop-earrings", note: "Color in Motion" },
  { slug: "yellow-diamond-angel-wing-bracelet", note: "Everyday Light" },
];

function Copy({ headingId }: { headingId?: string }) {
  return (
    <>
      <h2
        id={headingId}
        className={`${serif.className} text-[2.25rem] uppercase leading-[1.05] tracking-[0.06em] text-[#1d1d1f] md:text-[2.75rem] lg:text-[3.25rem]`}
      >
        Wings of Light
      </h2>
      <p className={`${serif.className} mt-3 text-[1.35rem] italic leading-snug text-[#1d1d1f] md:text-[1.5rem]`}>
        Carry a little light with you.
      </p>
      <p className="mx-auto mt-4 max-w-[30rem] text-[15px] leading-[1.7] text-[#1d1d1f]/70 lg:mx-0 lg:max-w-[24rem]">
        Pavé diamond wings, finished with a pear-shaped color drop in pink, blue, or yellow.
      </p>
      <Link
        href={WINGS_HREF}
        className="mt-6 inline-flex h-11 items-center justify-center bg-[#1d1d1f] px-8 text-[13px] font-medium uppercase tracking-[0.2em] text-white transition-colors hover:bg-black md:mt-7"
      >
        Explore the Wings
      </Link>
    </>
  );
}

export default function WingsShowcase() {
  const pieces = PIECES.map((p) => ({ ...p, item: catalog.find((i) => i.slug === p.slug) })).filter(
    (p): p is typeof p & { item: NonNullable<typeof p.item> } => p.item !== undefined,
  );

  return (
    <section aria-labelledby="wings-heading" className="bg-white text-[#1d1d1f]">
      {/* Key visual */}
      <div className="relative">
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-white sm:aspect-[4/3] lg:aspect-[21/9]">
          <Image
            src={KEY_VISUAL}
            alt="A woman in a pink ribbed cami and blue jeans wearing the ELANORA pink diamond angel wing necklace, drop earrings and bracelet in rose gold"
            fill
            unoptimized
            sizes="100vw"
            className="object-cover [object-position:80%_50%] sm:[object-position:95%_50%] lg:[object-position:50%_50%]"
          />
        </div>
        {/* lg+: copy on the white space at the left of the photo */}
        <div className="pointer-events-none absolute inset-0 hidden items-center lg:flex">
          <div className="pointer-events-auto ml-[7vw] max-w-[26rem]">
            <Copy headingId="wings-heading" />
          </div>
        </div>
      </div>

      {/* Below lg: copy and button under the photo */}
      <div className="px-6 pt-9 text-center sm:pt-10 lg:hidden">
        <Copy />
      </div>

      {/* Three representative pieces */}
      <div className="px-6 pb-14 pt-12 sm:pb-16 md:px-10 lg:pb-20 lg:pt-14">
        <ul className="mx-auto grid max-w-[1100px] grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-3 lg:gap-x-8">
          {pieces.map(({ slug, note, item }, i) => (
            // phones: two across, the third centred underneath at the same width
            <li key={slug} className={i === 2 ? "col-span-2 mx-auto w-[calc(50%-0.5rem)] sm:w-[calc(50%-0.75rem)] md:col-span-1 md:w-full" : undefined}>
              <Link href={productHref(item)} className="group block">
                <ProductFrame
                  src={item.images[0]?.src}
                  alt={item.name}
                  hoverSrc={onBodyImage(item)}
                  sizes="(max-width: 767px) 50vw, 33vw"
                />
                <div className="mt-5 text-center">
                  <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-[#6e6e73]">{note}</p>
                  <h3 className={`${productSerif.className} mt-2 text-[16px] font-normal leading-snug tracking-[-0.01em] sm:text-[18px]`}>
                    {item.name}
                  </h3>
                  <p className="mt-1.5 text-[15px] text-[#6e6e73]">{fromPrice(item)}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-12 text-center">
          <Link
            href={WINGS_HREF}
            className="inline-flex h-11 items-center justify-center border border-[#1d1d1f] px-8 text-[13px] font-medium uppercase tracking-[0.2em] text-[#1d1d1f] transition-colors hover:bg-[#1d1d1f] hover:text-white"
          >
            Shop the Collection
          </Link>
        </div>
      </div>
    </section>
  );
}
