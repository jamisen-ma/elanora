"use client";

import { useState } from "react";
import Link from "next/link";
import { useMetal } from "./MetalContext";
import ShapeIcon from "./ShapeIcon";

// Shape selector for pieces made as the same design in several stone shapes. Each tile
// is a link to that shape's own product page; the chosen metal carries over (?metal=).

export interface ShapeOption {
  shape: string;
  href: string;
}

export default function ShapeSelector({ current, options }: { current: string; options: ShapeOption[] }) {
  const [open, setOpen] = useState(true);
  const { metal } = useMetal();

  return (
    <div className="border-b border-[#1d1d1f]/15 py-3">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="shape-options"
        className="flex w-full items-center justify-between gap-4 text-left"
      >
        <span className="text-[13px] font-medium uppercase leading-tight tracking-[0.18em]">Shape</span>
        <span className="flex items-center gap-3">
          <span className="rounded-full bg-[#f0ede8] px-3 py-1 text-[14px]">{current}</span>
          <svg width="14" height="8" viewBox="0 0 14 8" fill="none" aria-hidden className={open ? "" : "rotate-180"}>
            <path d="M1 7l6-6 6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>

      {open && (
        <ul id="shape-options" className="mt-3 grid grid-cols-5 gap-1.5">
          {options.map((o) => {
            const selected = o.shape === current;
            return (
              <li key={o.shape}>
                <Link
                  href={metal ? `${o.href}?metal=${encodeURIComponent(metal)}` : o.href}
                  scroll={false}
                  aria-current={selected ? "page" : undefined}
                  aria-label={`${o.shape} diamond`}
                  className={`flex aspect-[6/5] flex-col items-center justify-center gap-1.5 border text-[14px] transition-colors ${
                    selected
                      ? "border-[#1d1d1f] bg-[#faf9f7]"
                      : "border-transparent bg-[#f0ede8] hover:border-[#1d1d1f]/30"
                  }`}
                >
                  <ShapeIcon shape={o.shape} />
                  {o.shape}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
