"use client";

import { useEffect, useState } from "react";
import { CARAT_MAX, CARAT_MIN, CARAT_STEP, fmtCarat } from "@/data/ringDesign";

// Carat range: two number boxes (min / max) above a two-handle slider, 0–10ct in 0.1ct
// steps. The handles move freely while dragging and the range is committed on release,
// so the URL is not rewritten on every pixel. The full 0–10 range counts as no preference.

const round = (n: number) => Math.round(n / CARAT_STEP) * CARAT_STEP;
const clamp = (n: number) => Math.min(CARAT_MAX, Math.max(CARAT_MIN, round(n)));

export default function CaratRange({
  min,
  max,
  onChange,
}: {
  min?: number;
  max?: number;
  onChange: (range: { caratMin?: number; caratMax?: number }) => void;
}) {
  const [lo, setLo] = useState(min ?? CARAT_MIN);
  const [hi, setHi] = useState(max ?? CARAT_MAX);
  const [loText, setLoText] = useState(fmtCarat(lo));
  const [hiText, setHiText] = useState(fmtCarat(hi));

  // Follow outside changes (Start over, a shared link, Back).
  useEffect(() => {
    const a = min ?? CARAT_MIN;
    const b = max ?? CARAT_MAX;
    /* eslint-disable react-hooks/set-state-in-effect -- mirror the committed range */
    setLo(a);
    setHi(b);
    setLoText(fmtCarat(a));
    setHiText(fmtCarat(b));
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [min, max]);

  const commit = (a: number, b: number) => {
    const x = clamp(Math.min(a, b));
    const y = clamp(Math.max(a, b));
    setLo(x);
    setHi(y);
    setLoText(fmtCarat(x));
    setHiText(fmtCarat(y));
    const full = x <= CARAT_MIN && y >= CARAT_MAX;
    onChange(full ? { caratMin: undefined, caratMax: undefined } : { caratMin: x, caratMax: y });
  };

  const pct = (n: number) => ((n - CARAT_MIN) / (CARAT_MAX - CARAT_MIN)) * 100;
  const commitSlider = () => commit(lo, hi);

  const box = (label: string, text: string, setText: (v: string) => void, apply: (n: number) => void) => (
    <label className="flex h-10 flex-1 items-center border border-[#1d1d1f]/20 bg-white px-3 text-[15px] focus-within:border-[#1d1d1f]">
      <span className="sr-only">{label}</span>
      <input
        type="text"
        inputMode="decimal"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={() => {
          const n = Number(text);
          if (Number.isFinite(n) && text.trim() !== "") apply(n);
          else commit(lo, hi);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") (e.target as HTMLInputElement).blur();
        }}
        className="w-full min-w-0 bg-transparent focus:outline-none"
      />
      <span className="text-[#1d1d1f]/50">ct</span>
    </label>
  );

  return (
    <div>
      <div className="flex items-center gap-3">
        {box("Minimum carat", loText, setLoText, (n) => commit(n, hi))}
        <span aria-hidden className="text-[#1d1d1f]/40">
          –
        </span>
        {box("Maximum carat", hiText, setHiText, (n) => commit(lo, n))}
      </div>

      <div className="carat-range relative mt-5 h-5">
        <div className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 bg-[#1d1d1f]/15" />
        <div
          className="absolute top-1/2 h-[2px] -translate-y-1/2 bg-[#1d1d1f]"
          style={{ left: `${pct(lo)}%`, right: `${100 - pct(hi)}%` }}
        />
        <input
          type="range"
          aria-label="Minimum carat"
          min={CARAT_MIN}
          max={CARAT_MAX}
          step={CARAT_STEP}
          value={lo}
          onChange={(e) => {
            const v = Math.min(Number(e.target.value), hi);
            setLo(v);
            setLoText(fmtCarat(v));
          }}
          onPointerUp={commitSlider}
          onKeyUp={commitSlider}
          // keep the low handle reachable when both sit at the top end
          style={{ zIndex: lo > CARAT_MAX - 1 ? 3 : 2 }}
        />
        <input
          type="range"
          aria-label="Maximum carat"
          min={CARAT_MIN}
          max={CARAT_MAX}
          step={CARAT_STEP}
          value={hi}
          onChange={(e) => {
            const v = Math.max(Number(e.target.value), lo);
            setHi(v);
            setHiText(fmtCarat(v));
          }}
          onPointerUp={commitSlider}
          onKeyUp={commitSlider}
          style={{ zIndex: 2 }}
        />
      </div>
      <div className="mt-1.5 flex justify-between text-[13px] text-[#1d1d1f]/50">
        <span>{CARAT_MIN}ct</span>
        <span>{CARAT_MAX}ct</span>
      </div>
    </div>
  );
}
