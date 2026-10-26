import { Cormorant_Garamond } from "next/font/google";

// THE ELANORA STANDARD — a quiet brand promise between Our Story and the shopping
// content. Pure white (Our Story above is warm ivory), ~55–65vh, three short points
// separated only by space. Copy avoids claims that can't yet be verified.

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

const points = [
  {
    index: "01",
    title: "Materials",
    body: "Fine materials, thoughtfully selected.",
  },
  {
    index: "02",
    title: "Made with Intention",
    body: "Pieces chosen and made with care.",
  },
  {
    index: "03",
    title: "Here for You",
    body: "Support before, during and after your order.",
  },
];

export default function BrandStandard() {
  return (
    <section aria-labelledby="standard-heading" className="bg-white text-[#1d1d1f]">
      <div className="mx-auto flex max-w-[1200px] flex-col justify-center px-8 py-24 sm:px-12 sm:py-28 md:min-h-[55vh] lg:min-h-[60vh] lg:px-16 lg:py-24">
        <header className="text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-[#1d1d1f]/70">
            The Elanora Standard
          </p>
          <h2
            id="standard-heading"
            className={`${serif.className} mt-7 text-[2.25rem] font-normal leading-[1.1] tracking-[-0.01em] sm:text-[2.75rem] lg:mt-8 lg:text-[clamp(2.75rem,3.4vw,3.5rem)]`}
          >
            Made beautifully.
            <br />
            Considered <em className="italic">carefully.</em>
          </h2>
        </header>

        <ul className="mx-auto mt-16 grid w-full max-w-[960px] grid-cols-1 gap-y-14 text-center sm:mt-20 md:grid-cols-3 md:gap-x-12 lg:mt-20 lg:gap-x-16">
          {points.map((p) => (
            <li key={p.index}>
              <p className="text-[10px] tracking-[0.25em] text-[#1d1d1f]/45">{p.index}</p>
              <h3 className="mt-2 text-[12px] font-medium uppercase tracking-[0.28em]">
                {p.title}
              </h3>
              <p className="mx-auto mt-4 max-w-[17rem] text-balance text-[14px] leading-[1.6] text-[#6e6e73]">
                {p.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
