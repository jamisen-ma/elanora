"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useCart } from "@/context/CartContext";
import { CARAT_LEAD_TIME, type CatalogItem } from "@/data/catalog";
import { useMetal } from "./MetalContext";
import ShapeSelector, { type ShapeOption } from "./ShapeSelector";

// Piece configurator: Shape (for pieces made in several stone shapes), Metal swatches, Carat Weight (lab-grown, every size made to
// order), Ring Size, Bracelet Length or Chain Length, then ADD TO BAG. The bag line is one color / carat / size
// combination. Until the piece has a price, ADD TO BAG stays off.

// Display form of a metal name, e.g. "14k Yellow Gold" -> "14K Yellow Gold".
const metalLabel = (m: string) => m.replace(/^(\d+)k\b/i, (_, n) => `${n}K`);

const swatchFor = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes("yellow")) return "#e3cb6e";
  if (n.includes("rose")) return "#ecc6ae";
  if (n.includes("platinum")) return "#cfd1d4";
  if (n.includes("white")) return "#dcdcdc";
  return "#d9d6d1"; // unconfirmed / placeholder option
};

export default function ProductPurchase({ item, shapes = [] }: { item: CatalogItem; shapes?: ShapeOption[] }) {
  const { addItem } = useCart();
  const { metal, setMetal } = useMetal();
  const [carat, setCarat] = useState(item.carats?.[0] ?? "");
  const [size, setSize] = useState("");
  const [added, setAdded] = useState(false);

  const needsSize = !!item.sizes?.length;
  const ready = item.price !== null && (!needsSize || !!size);

  const add = () => {
    if (!ready || item.price === null) return;
    const variant = [metal, carat, size].filter(Boolean).join(" / ");
    addItem({
      id: `${item.slug}|${metal}|${carat}|${size}`,
      slug: item.slug,
      name: variant ? `${item.name} — ${variant}` : item.name,
      price: item.price * 100,
      description: "",
      details: [],
      category: item.type,
      imageFolder: "",
      images: item.images.map((i) => i.src),
      featured: false,
      stripePriceId: "",
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const hasCarats = !!item.carats?.length;
  const sizeLabel =
    item.type === "Bracelets" ? "Bracelet Length" : item.type === "Necklaces" ? "Chain Length" : "Ring Size";

  return (
    <div className="mt-4 border-t border-[#1d1d1f]/15">
      {shapes.length > 1 && item.shape && <ShapeSelector current={item.shape} options={shapes} />}

      {item.metals.length > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-[#1d1d1f]/15 py-3">
          <div>
            <p className="text-[11px] font-medium uppercase leading-tight tracking-[0.18em]">Metal</p>
            <p className="mt-1 text-[13px] leading-tight" aria-live="polite">
              {metalLabel(metal)}
            </p>
          </div>
          <ul className="flex gap-1">
            {item.metals.map((m) => (
              <li key={m}>
                <button
                  type="button"
                  onClick={() => setMetal(m)}
                  aria-pressed={metal === m}
                  aria-label={metalLabel(m)}
                  title={metalLabel(m)}
                  className={`flex h-8 w-8 items-center justify-center rounded-full border transition-colors ${
                    metal === m ? "border-[#8a7358]" : "border-transparent hover:border-[#1d1d1f]/20"
                  }`}
                >
                  <span className="block h-[22px] w-[22px] rounded-full" style={{ background: swatchFor(m) }} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {(hasCarats || needsSize) && (
        <div className="grid grid-cols-2 gap-3 border-b border-[#1d1d1f]/15 py-3">
          {hasCarats && (
            <div>
              <p className="mb-1.5 text-[13px] leading-tight">Carat Weight</p>
              <Listbox
                label="Carat weight"
                value={carat}
                options={item.carats!}
                note={CARAT_LEAD_TIME}
                onChange={setCarat}
              />
            </div>
          )}
          {needsSize && (
            <div className={hasCarats ? "" : "col-span-2"}>
              <p className="mb-1.5 text-[13px] leading-tight">{sizeLabel}</p>
              <div className="relative">
                <select
                  id="size"
                  aria-label={sizeLabel}
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="h-10 w-full appearance-none border border-[#1d1d1f] bg-transparent px-3 pr-9 text-[13px] focus:outline-none"
                >
                  <option value="">Select</option>
                  {item.sizes!.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
                <Chevron className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          )}
        </div>
      )}

      <button
        type="button"
        onClick={add}
        disabled={!ready}
        className="mt-3 h-11 w-full bg-[#8a7358] text-[12px] font-medium uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#75604a] disabled:cursor-not-allowed disabled:bg-[#8a7358]/45"
      >
        {added ? "Added to Bag" : "Add to Bag"}
      </button>
      <p className="mt-2 text-[12px] text-[#1d1d1f]/70">
        Made to order.
        {item.price === null && <span className="ml-2 text-[#86868b]">[Add to bag turns on once the price is set.]</span>}
      </p>
    </div>
  );
}

function Chevron({ className = "", up = false }: { className?: string; up?: boolean }) {
  return (
    <svg width="16" height="9" viewBox="0 0 16 9" fill="none" aria-hidden className={className}>
      <path d={up ? "M1 8l7-7 7 7" : "M1 1l7 7 7-7"} stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Custom dropdown so each option can carry its lead-time note on the right.
function Listbox({
  label,
  value,
  options,
  note,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  note: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  const choose = (v: string) => {
    onChange(v);
    setOpen(false);
  };

  return (
    <div ref={root} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={id}
        aria-label={label}
        onClick={() => {
          setHover(Math.max(options.indexOf(value), 0));
          setOpen((o) => !o);
        }}
        onKeyDown={(e) => {
          if (e.key === "Escape") setOpen(false);
          if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            e.preventDefault();
            if (!open) {
              setHover(Math.max(options.indexOf(value), 0));
              setOpen(true);
            } else setHover((h) => Math.min(Math.max(h + (e.key === "ArrowDown" ? 1 : -1), 0), options.length - 1));
          }
          if (e.key === "Enter" && open) {
            e.preventDefault();
            choose(options[hover]);
          }
        }}
        className="flex h-10 w-full items-center justify-between border border-[#1d1d1f] bg-[#faf9f7] px-3 text-[13px]"
      >
        {value}
        <Chevron />
      </button>

      {open && (
        <ul
          id={id}
          role="listbox"
          aria-label={label}
          className="absolute left-0 top-0 z-20 w-[calc(200%+0.75rem)] border border-[#1d1d1f] bg-white py-1"
        >
          {options.map((o, i) => (
            <li
              key={o}
              role="option"
              aria-selected={o === value}
              onMouseEnter={() => setHover(i)}
              onClick={() => choose(o)}
              className={`flex cursor-pointer items-center justify-between px-4 py-2.5 text-[13px] ${
                i === hover ? "bg-[#f6f6f1]" : ""
              }`}
            >
              <span>{o}</span>
              <span className="text-[12px] text-[#1d1d1f]/80">{note}</span>
            </li>
          ))}
          <li role="presentation" className="mt-1">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex h-10 w-full items-center justify-between px-4 text-[13px]"
              aria-label="Close carat weight list"
            >
              {value}
              <Chevron up />
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
