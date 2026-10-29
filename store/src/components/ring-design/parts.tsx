"use client";

import type { ReactNode } from "react";
import { METALS, type RingConfig } from "@/data/ringDesign";

// Small pieces shared by the ring designer steps.

export const metalLabel = (m: string) => m.replace(/^(\d+)k\b/i, (_, n) => `${n}K`);
export const swatchFor = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes("yellow")) return "#e3cb6e";
  if (n.includes("rose")) return "#ecc6ae";
  if (n.includes("platinum")) return "#cfd1d4";
  return "#dcdcdc";
};

export type Update = (patch: Partial<RingConfig>, opts?: { navigate?: boolean }) => void;

export function StepHeading({ title, sub }: { title: string; sub: string }) {
  return (
    <div>
      <h2 className="text-[13px] font-medium uppercase tracking-[0.24em]">{title}</h2>
      <p className="mt-2 max-w-xl text-[15px] leading-[1.6] text-[#1d1d1f]/70 sm:text-[16px]">{sub}</p>
    </div>
  );
}

export function MetalSwatches({ value, onChange }: { value: string; onChange: (m: string) => void }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[14px] text-[#1d1d1f]/70">{metalLabel(value)}</span>
      <ul className="flex gap-1">
        {METALS.map((m) => (
          <li key={m}>
            <button
              type="button"
              onClick={() => onChange(m)}
              aria-pressed={value === m}
              aria-label={metalLabel(m)}
              title={metalLabel(m)}
              className={`flex h-8 w-8 items-center justify-center rounded-full border transition-colors ${
                value === m ? "border-[#8a7358]" : "border-transparent hover:border-[#1d1d1f]/20"
              }`}
            >
              <span className="block h-[22px] w-[22px] rounded-full" style={{ background: swatchFor(m) }} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Sticky on phones (bottom of the screen), inline from lg up. */
export function ActionBar({ children, note }: { children: ReactNode; note?: ReactNode }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-[#1d1d1f]/10 bg-[#faf9f7]/95 px-5 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur lg:static lg:z-auto lg:border-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-none">
      {children}
      {note && <p className="mt-2 hidden text-[14px] leading-[1.6] text-[#1d1d1f]/65 lg:block">{note}</p>}
    </div>
  );
}

export function PrimaryButton({
  children,
  onClick,
  disabled,
  type = "button",
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="h-12 w-full bg-[#8a7358] text-[14px] font-medium uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#75604a] disabled:cursor-not-allowed disabled:bg-[#8a7358]/40"
    >
      {children}
    </button>
  );
}
