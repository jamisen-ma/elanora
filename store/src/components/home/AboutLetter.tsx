"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Cormorant_Garamond } from "next/font/google";

// About Elanora as a sealed envelope. When it scrolls into view (or the wax seal is
// clicked) the flap folds back and a letter rises out with the brand line and a link to
// the full story. Pure CSS shapes; with reduced motion it simply shows the open letter.

const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["400"], style: ["normal", "italic"] });

const PAPER = "#f3ede4"; // envelope
const PAPER_DARK = "#e9e1d4"; // flap / inside
const LETTER = "#fffdf9";

export default function AboutLetter() {
  const root = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- show the open letter at once
      setOpen(true);
      return;
    }
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOpen(true);
          io.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const ease = "cubic-bezier(.65,0,.35,1)";

  return (
    <section aria-labelledby="about-heading" className="overflow-hidden bg-white px-6 pb-16 pt-[clamp(7rem,22vw,12rem)] text-[#1d1d1f] sm:pb-20">
      <div ref={root} className="relative mx-auto aspect-[4/3] w-full max-w-[560px] sm:aspect-[16/10]" style={{ perspective: "1400px" }}>
        {/* inside of the envelope */}
        <div className="absolute inset-0 rounded-[3px]" style={{ background: PAPER_DARK }} />

        {/* the letter: hidden in the envelope, rises out when opened */}
        <div
          className={`absolute inset-x-[5%] bottom-[4%] top-[4%] flex flex-col items-center rounded-[2px] px-5 pt-[6%] text-center shadow-[0_2px_18px_rgba(29,29,31,0.08)] sm:px-10 sm:pt-[7%] ${
            open ? "-translate-y-[54%] sm:-translate-y-[44%]" : "translate-y-0"
          }`}
          style={{
            background: LETTER,
            zIndex: 2,
            transition: `transform 1.1s ${ease} ${open ? "0.55s" : "0s"}`,
          }}
        >
          <h2 id="about-heading" className="text-[12px] font-medium uppercase tracking-[0.32em] text-[#1d1d1f]/65">
            About Elanora
          </h2>
          <p className={`${serif.className} mt-2 text-balance text-[1.45rem] leading-[1.15] tracking-[-0.01em] sm:mt-4 sm:text-[2.1rem]`}>
            Jewelry made to order, just for you.
          </p>
          <Link
            href="/about"
            tabIndex={open ? 0 : -1}
            className="mt-3 inline-block border-b border-[#1d1d1f]/30 pb-1 text-[13px] font-medium uppercase tracking-[0.22em] transition-colors hover:border-[#1d1d1f] sm:mt-6"
          >
            Read our story &rarr;
          </Link>
          <p className={`${serif.className} mt-auto hidden pb-[8%] text-[1.1rem] italic text-[#1d1d1f]/55 sm:block`}>With love, Elanora</p>
        </div>

        {/* front pocket: covers the lower part of the letter */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[3px]"
          style={{
            zIndex: 3,
            background: PAPER,
            clipPath: "polygon(0 0, 50% 56%, 100% 0, 100% 100%, 0 100%)",
            boxShadow: "inset 0 -1px 0 rgba(29,29,31,0.06)",
          }}
        />
        {/* the two side folds, a hair darker, so the pocket reads as folded paper */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ zIndex: 3, background: "rgba(29,29,31,0.035)", clipPath: "polygon(0 0, 50% 56%, 0 100%)" }}
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ zIndex: 3, background: "rgba(29,29,31,0.02)", clipPath: "polygon(100% 0, 50% 56%, 100% 100%)" }}
        />

        {/* flap: folds back over the top edge; drops behind the letter once open */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[58%]"
          style={{
            zIndex: open ? 1 : 4,
            transformOrigin: "top",
            transform: open ? "rotateX(180deg)" : "rotateX(0deg)",
            transition: `transform 0.7s ${ease}, z-index 0s linear ${open ? "0.35s" : "0.7s"}`,
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: PAPER_DARK,
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              filter: "drop-shadow(0 1px 1px rgba(29,29,31,0.08))",
            }}
          />
        </div>

        {/* wax seal: holds the flap; click to open */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open the letter"
          aria-expanded={open}
          className={`${serif.className} absolute left-1/2 top-[58%] flex h-14 w-14 items-center justify-center rounded-full text-[1.6rem] italic text-[#f6ead7] shadow-[0_2px_6px_rgba(60,30,20,0.35)] sm:h-16 sm:w-16`}
          style={{
            zIndex: 5,
            background: "radial-gradient(circle at 35% 30%, #a0493c, #7c2f25 60%, #5f2119)",
            opacity: open ? 0 : 1,
            transform: `translate(-50%, -50%) scale(${open ? 0.6 : 1})`,
            transition: "opacity 0.35s ease, transform 0.35s ease",
            pointerEvents: open ? "none" : "auto",
          }}
        >
          E
        </button>
      </div>
    </section>
  );
}
