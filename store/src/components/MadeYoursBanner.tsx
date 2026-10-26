import Image from "next/image";
import Link from "next/link";

// The banner's copy (MADE YOURS / A diamond, made yours. / CREATE YOURS) is part of
// the image itself. The only HTML on top is a transparent link placed exactly over
// "CREATE YOURS", plus a thin line that draws over the image's own underline on hover.
//
// Image: 4116×1528 HD version of the original 2000×742 banner (same proportions).
// Coordinates below are in original 2000×742 px: "CREATE YOURS" box ≈ x 1330–1580,
// y 525–572; its underline sits at y≈564, x 1338–1572.
//
// Desktop (lg+): full image, original ratio, nothing cropped.
// Mobile/tablet: a crop of the same image from x 560 to 1840 (1280×742), which keeps
// the diamond, MADE YOURS and the headline large enough to read.

export default function MadeYoursBanner() {
  return (
    <section aria-label="Made Yours" className="bg-white">
      <div className="relative w-full aspect-[1280/742] lg:aspect-[2000/742] overflow-hidden">
        <Image
          src="/images/made-yours/made-yours-banner-hd.webp"
          alt="Made Yours. A diamond, made yours. Choose your diamond. Choose your setting. A cushion-cut lab-grown diamond held in tweezers."
          fill
          unoptimized
          sizes="100vw"
          className="object-cover object-[78%_center] lg:object-center"
        />

        <Link
          href="/made-yours"
          aria-label="Create yours: design a custom lab-grown diamond"
          className="group absolute left-[60.16%] top-[70.75%] h-[6.33%] w-[19.53%] lg:left-[66.5%] lg:w-[12.5%] before:absolute before:-inset-3 before:content-['']"
        >
          <span
            aria-hidden
            className="absolute left-[3.2%] top-[83%] h-px w-[93.6%] origin-left scale-x-0 bg-[#4a4340] transition-transform duration-500 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
          />
        </Link>
      </div>
    </section>
  );
}
