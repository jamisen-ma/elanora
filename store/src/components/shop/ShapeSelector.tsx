"use client";

import { useState } from "react";
import Link from "next/link";
import { useMetal } from "./MetalContext";

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
        <span className="text-[11px] font-medium uppercase leading-tight tracking-[0.18em]">Shape</span>
        <span className="flex items-center gap-3">
          <span className="rounded-full bg-[#f0ede8] px-3 py-1 text-[12px]">{current}</span>
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
                  className={`flex aspect-[6/5] flex-col items-center justify-center gap-1.5 border text-[12px] transition-colors ${
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

// Fine line drawings of each cut, seen face-up.
function ShapeIcon({ shape }: { shape: string }) {
  const common = {
    width: 26,
    height: 26,
    viewBox: "0 0 32 32",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 0.8,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    className: "text-[#1d1d1f]/70",
  };
  switch (shape) {
    case "Round":
      return (
        <svg {...common}>
          <circle cx="16" cy="16" r="12" />
          <polygon points="16,9 21,11 23,16 21,21 16,23 11,21 9,16 11,11" />
          <path d="M16 4v5M24.5 7.5 21 11M28 16h-5M24.5 24.5 21 21M16 28v-5M7.5 24.5 11 21M4 16h5M7.5 7.5 11 11" />
        </svg>
      );
    case "Oval":
      return (
        <svg {...common}>
          <ellipse cx="16" cy="16" rx="9" ry="13" />
          <polygon points="16,8 20,11 21,16 20,21 16,24 12,21 11,16 12,11" />
          <path d="M16 3v5M22.4 6.8 20 11M25 16h-4M22.4 25.2 20 21M16 29v-5M9.6 25.2 12 21M7 16h4M9.6 6.8 12 11" />
        </svg>
      );
    case "Emerald":
      return (
        <svg {...common}>
          <polygon points="11,3 21,3 25,7 25,25 21,29 11,29 7,25 7,7" />
          <polygon points="12.5,6 19.5,6 22,8.5 22,23.5 19.5,26 12.5,26 10,23.5 10,8.5" />
          <rect x="13" y="9.5" width="6" height="13" />
        </svg>
      );
    case "Pear":
      return (
        <svg {...common}>
          <path d="M16 29C10 29 7 25 7 20.5 7 14 12 8 16 3c4 5 9 11 9 17.5 0 4.5-3 8.5-9 8.5Z" />
          <path d="M16 25c-3 0-5-2-5-4.5 0-3.5 2.5-7 5-10 2.5 3 5 6.5 5 10 0 2.5-2 4.5-5 4.5Z" />
          <path d="M16 3v7.5M16 29v-4M7 20.5h4M25 20.5h-4" />
        </svg>
      );
    case "Heart":
      return (
        <svg {...common}>
          <path d="M16 28 5.5 16C3 13 3.5 7.5 8 6c3.5-1.2 6.5.8 8 3.5C17.5 6.8 20.5 4.8 24 6c4.5 1.5 5 7 2.5 10Z" />
          <path d="M16 23.5 9 15.5c-1.5-2-1-5 1.5-5.6 2.2-.5 4.2.8 5.5 3 1.3-2.2 3.3-3.5 5.5-3 2.5.6 3 3.6 1.5 5.6Z" />
          <path d="M16 9.5v3.4M16 28v-4.5" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <rect x="6" y="6" width="20" height="20" />
        </svg>
      );
  }
}
