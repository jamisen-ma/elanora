"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useCart } from "@/context/CartContext";
import { CARAT_LEAD_TIME, formatUSD, optionPrice, type CatalogItem } from "@/data/catalog";
import { percentOffFor, salePrice } from "@/data/promo";
import { useMetal } from "./MetalContext";
import ShapeSelector, { type ShapeOption } from "./ShapeSelector";
import Link from "next/link";
import { designHref, settingForSlug, SHAPES, type Shape } from "@/data/ringDesign";
import NecklaceLengthGuide from "./NecklaceLengthGuide";
import NameQuote from "./NameQuote";
import { trackEvent } from "@/components/Analytics";

// Option, summary and button prices show the sale price (the catalogue keeps the original).
const formatSale = (item: CatalogItem, usd: number, carat?: string) => formatUSD(salePrice(usd, percentOffFor(item, carat)));

// Piece configurator: Shape (for pieces made in several stone shapes), Metal swatches, Carat Weight (lab-grown, every size made to
// order), Ring Size, Bracelet Length or Chain Length, then ADD TO BAG. The bag line is one color / carat / size
// combination, or, for options listed in `sizePieces`, one line per piece. Until the piece has a price, ADD TO BAG stays off.

// Display form of a metal name, e.g. "14k Yellow Gold" -> "14K Yellow Gold".
const metalLabel = (m: string) => m.replace(/^(\d+)k\b/i, (_, n) => `${n}K`);

const swatchFor = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes("rose")) return "#ecc6ae"; // incl. rose gold over sterling silver
  if (n.includes("yellow") || n.includes("gold over")) return "#e3cb6e"; // gold over sterling silver reads as yellow gold
  if (n.includes("platinum")) return "#cfd1d4";
  if (n.includes("white")) return "#dcdcdc";
  if (n.includes("silver")) return "#c9ccd1";
  return "#d9d6d1"; // unconfirmed / placeholder option
};

export default function ProductPurchase({ item, shapes = [] }: { item: CatalogItem; shapes?: ShapeOption[] }) {
  const { addItem } = useCart();
  const { metal, setMetal, size, setSize, carat: chosenCarat, setCarat } = useMetal();
  const carat = chosenCarat || item.carats?.[0] || "";
  // Optional chain add-on (pendants sold without a chain): its own bag line, never sold alone.
  const chain = item.chainAddOn;
  const chainMetal = chain?.metalFor?.[metal] ?? metal;
  const [withChain, setWithChain] = useState(false);
  const [chainLength, setChainLength] = useState("");
  const [initial, setInitial] = useState("");
  const [added, setAdded] = useState(false);

  const needsSize = !!item.sizes?.length;
  // Price of the chosen carat or size when those are priced differently (e.g. chain lengths).
  const unitPrice = optionPrice(item, metal, carat, size);
  const needsInitial = !!item.initials?.length;
  const ready =
    item.price !== null && (!needsSize || !!size) && (!needsInitial || !!initial) && (!withChain || !!chainLength);

  const add = () => {
    if (!ready || unitPrice === null) return;
    // Options that stand for separate pieces add each piece as its own bag line.
    const pieces = item.sizePieces?.[size];
    if (pieces) {
      for (const piece of pieces)
        addItem({
          id: `${item.slug}|${piece.name}`,
          slug: item.slug,
          name: `${item.name} — ${piece.name}`,
          price: piece.price * 100,
          description: "",
          details: [],
          category: item.type,
          imageFolder: "",
          images: item.images.map((i) => i.src),
          featured: false,
          stripePriceId: "",
        });
      trackEvent("add_to_bag", { product: item.slug, value: pieces.reduce((s, p) => s + p.price, 0), option: size });
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
      return;
    }
    const variant = [initial && `Initial ${initial}`, metal, carat, size, item.priceUnit].filter(Boolean).join(" / ");
    addItem({
      id: `${item.slug}|${initial}|${metal}|${carat}|${size}`,
      slug: item.slug,
      name: variant ? `${item.name} — ${variant}` : item.name,
      price: unitPrice * 100,
      description: "",
      details: [],
      category: item.type,
      imageFolder: "",
      images: item.images.map((i) => i.src),
      featured: false,
      stripePriceId: "",
    });
    if (chain && withChain && chainLength)
      addItem({
        id: `${item.slug}|chain|${chainMetal}|${chainLength}`,
        slug: item.slug,
        name: `${metalLabel(chainMetal)} Chain, ${chainLength} — for the ${item.name}`,
        price: chain.price * 100,
        description: "",
        details: [],
        category: item.type,
        imageFolder: "",
        images: item.images.map((i) => i.src),
        featured: false,
        stripePriceId: "",
      });
    trackEvent("add_to_bag", {
      product: item.slug,
      value: unitPrice + (chain && withChain && chainLength ? chain.price : 0),
      ...(chain && withChain && chainLength ? { with_chain: true } : {}),
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  // Engagement settings are not sold from the product page: the diamond, carat and size
  // are chosen in Design Your Ring, which ends in a quote request. Settings that have their own
  // metal + carat prices (the solitaires) are sold here directly instead.
  const setting = item.metalCaratPrices ? undefined : settingForSlug(item.slug);
  const hasCarats = !setting && !!item.carats?.length;
  const caratPriced = !!(item.caratPrices || item.metalCaratPrices);
  const sizeLabel =
    item.sizeLabel ??
    (item.type === "Bracelets" ? "Bracelet Length" : item.type === "Necklaces" ? "Chain Length" : "Ring Size");
  // Necklaces show an on-body length comparison inside the open Chain Length menu.
  // Longer carat labels (e.g. "Average Carat Weight") get full-width selectors, one above the other.
  const stacked = !!item.caratLabel;
  const hasLengthGuide = item.type === "Necklaces" && needsSize && !item.sizeLabel;

  return (
    <div className="mt-4 border-t border-[#1d1d1f]/15">
      {shapes.length > 1 && item.shape && <ShapeSelector current={item.shape} options={shapes} />}

      {item.metals.length > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-[#1d1d1f]/15 py-3">
          <div>
            <p className="text-[13px] font-medium uppercase leading-tight tracking-[0.18em]">Metal</p>
            <p className="mt-1 text-[15px] leading-tight" aria-live="polite">
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

      {setting ? (
        <>
          <Link
            href={designHref({
              step: "diamond",
              setting: setting.id,
              metal,
              shape: (SHAPES as readonly string[]).includes(item.shape ?? "") ? (item.shape as Shape) : undefined,
            })}
            className="mt-3 flex h-11 w-full items-center justify-center bg-[#8a7358] text-[14px] font-medium uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#75604a]"
          >
            Choose Your Diamond
          </Link>
          <p className="mt-2 text-[14px] leading-[1.6] text-[#1d1d1f]/70">
            Choose your diamond preferences and ring size, then request a quote. Made to order.
          </p>
        </>
      ) : (
        <>
      {needsInitial && (
        <div className="border-b border-[#1d1d1f]/15 py-3">
          <div className="flex items-baseline justify-between">
            <p className="text-[13px] font-medium uppercase leading-tight tracking-[0.18em]">Initial</p>
            <p className="text-[15px] leading-tight" aria-live="polite">
              {initial || "Select a letter"}
            </p>
          </div>
          <div role="radiogroup" aria-label="Initial" className="mt-2.5 grid grid-cols-9 gap-1 sm:grid-cols-13">
            {item.initials!.map((l) => (
              <button
                key={l}
                type="button"
                role="radio"
                aria-checked={initial === l}
                onClick={() => setInitial(l)}
                className={`flex h-9 items-center justify-center border text-[15px] transition-colors ${
                  initial === l
                    ? "border-[#8a7358] bg-[#8a7358] text-white"
                    : "border-[#1d1d1f]/15 hover:border-[#1d1d1f]/60"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      )}
      {(hasCarats || needsSize) && (
        <div className="grid grid-cols-2 gap-3 border-b border-[#1d1d1f]/15 py-3">
          {hasCarats && (
            <div className={needsSize && !stacked ? "" : "col-span-2"}>
              <p className="mb-1.5 text-[15px] leading-tight">{item.caratLabel ?? (caratPriced ? "Center Diamond" : "Carat Weight")}</p>
              <Listbox
                label={item.caratLabel ?? (caratPriced ? "Center diamond carat weight" : "Carat weight")}
                value={carat}
                options={item.carats!}
                note={caratPriced ? (o) => formatSale(item, optionPrice(item, metal, o, size) ?? 0, o) : CARAT_LEAD_TIME}
                full={!needsSize || stacked}
                onChange={setCarat}
              />
            </div>
          )}
          {needsSize && (
            <div className={hasCarats && !stacked ? "" : "col-span-2"}>
              <p className="mb-1.5 text-[15px] leading-tight">{sizeLabel}</p>
              {hasLengthGuide ? (
                <LengthListbox label={sizeLabel} value={size} options={item.sizes!} prices={item.sizePrices && Object.fromEntries(Object.entries(item.sizePrices).map(([k, v]) => [k, salePrice(v, percentOffFor(item))]))} onChange={setSize} />
              ) : (
                <div className="relative">
                  <select
                    id="size"
                    aria-label={sizeLabel}
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    className="h-10 w-full appearance-none border border-[#1d1d1f] bg-transparent px-3 pr-9 text-[15px] focus:outline-none"
                  >
                    <option value="">Select</option>
                    {item.sizes!.map((s) => (
                      <option key={s} value={s}>
                        {item.sizeSurcharges || item.caratSizeSurcharges
                          ? `${s} — ${formatSale(item, optionPrice(item, metal, carat, s) ?? 0, carat)}`
                          : item.sizePrices?.[s] !== undefined
                            ? `${s} — ${formatSale(item, item.sizePrices[s])}`
                            : s}
                      </option>
                    ))}
                  </select>
                  <Chevron className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
                </div>
              )}
            </div>
          )}
          {item.optionsNote && <p className="col-span-2 text-[13px] leading-[1.5] text-[#1d1d1f]/60">{item.optionsNote}</p>}
        </div>
      )}

      {item.customName ? (
        <NameQuote item={item} metal={metal} size={size} />
      ) : (
        <>
      {item.caratLabel && (item.sizeSurcharges || item.caratSizeSurcharges) && (
        // Selection summary for pieces priced by metal, carat weight and length together.
        <dl className="border-b border-[#1d1d1f]/15 py-3 text-[15px] leading-[1.5]" aria-live="polite">
          <div className="flex justify-between gap-4">
            <dt className="text-[#1d1d1f]/70">Metal</dt>
            <dd>{metalLabel(metal)}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-[#1d1d1f]/70">{item.caratLabel}</dt>
            <dd>{carat}</dd>
          </div>
          {needsSize && (
            <div className="flex justify-between gap-4">
              <dt className="text-[#1d1d1f]/70">{sizeLabel}</dt>
              <dd>{size || "Select a length"}</dd>
            </div>
          )}
          {!item.hideCaratTotal && (
            <div className="flex justify-between gap-4">
              <dt className="text-[#1d1d1f]/70">Est. Total Carat Weight</dt>
              <dd className="text-right">{(size && item.caratWeights?.[carat]?.[size]) || carat}</dd>
            </div>
          )}
          <div className="mt-1 flex justify-between gap-4 font-medium">
            <dt>Price</dt>
            <dd>{unitPrice !== null ? formatSale(item, unitPrice, carat) : "—"}</dd>
          </div>
          {!item.hideCaratTotal && !(size && item.caratWeights?.[carat]?.[size]) && (
            <p className="mt-1.5 text-[13px] text-[#1d1d1f]/60">Total carat weight varies with bracelet length.</p>
          )}
        </dl>
      )}
      {chain && (
        <div className="border-b border-[#1d1d1f]/15 py-3">
          <label className="flex cursor-pointer items-center justify-between gap-3 text-[15px] leading-tight">
            <span className="flex items-center gap-2.5">
              <input
                type="checkbox"
                checked={withChain}
                onChange={(e) => setWithChain(e.target.checked)}
                className="h-4 w-4 accent-[#8a7358]"
              />
              Add a {metalLabel(chainMetal)} chain
            </span>
            <span className="text-[#1d1d1f]/70">+{formatSale(item, chain.price)}</span>
          </label>
          {withChain && (
            <div className="mt-2.5">
              {/* same menu as Chain Length on other necklaces, with the on-body length comparison */}
              <LengthListbox label="Chain length" value={chainLength} options={chain.lengths} onChange={setChainLength} />
            </div>
          )}
          <p className="mt-2 text-[13px] text-[#1d1d1f]/60">Pendant only unless you add the chain. The chain is available only with the pendant.</p>
        </div>
      )}

      <button
        type="button"
        onClick={add}
        disabled={!ready}
        className="mt-3 h-11 w-full bg-[#8a7358] text-[14px] font-medium uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#75604a] disabled:cursor-not-allowed disabled:bg-[#8a7358]/45"
      >
        {added
          ? "Added to Bag"
          : chain && withChain && unitPrice !== null
            ? `Add to Bag — ${formatUSD(salePrice(unitPrice, percentOffFor(item, carat)) + salePrice(chain.price, percentOffFor(item)))}`
            : "Add to Bag"}
      </button>
      <p className="mt-2 text-[14px] text-[#1d1d1f]/70">
        Made to order. Production time: 2–8 weeks.
        {item.price === null && <span className="ml-2 text-[#86868b]">[Add to bag turns on once the price is set.]</span>}
      </p>
        </>
      )}
        </>
      )}
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
  full = false,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  note: string | ((option: string) => string); // shown beside every option (lead time, or that option's price)
  full?: boolean; // the menu spans the whole row (no second column beside it)
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
        className="flex h-10 w-full items-center justify-between border border-[#1d1d1f] bg-[#faf9f7] px-3 text-[15px]"
      >
        {value}
        <Chevron />
      </button>

      {open && (
        <ul
          id={id}
          role="listbox"
          aria-label={label}
          className={`absolute left-0 top-0 z-20 ${full ? "w-full" : "w-[calc(200%+0.75rem)]"} border border-[#1d1d1f] bg-white py-1`}
        >
          {options.map((o, i) => (
            <li
              key={o}
              role="option"
              aria-selected={o === value}
              onMouseEnter={() => setHover(i)}
              onClick={() => choose(o)}
              className={`flex cursor-pointer items-center justify-between px-4 py-2.5 text-[15px] ${
                i === hover ? "bg-[#f6f6f1]" : ""
              }`}
            >
              <span>{o}</span>
              <span className="text-[14px] text-[#1d1d1f]/80">{typeof note === "function" ? note(o) : note}</span>
            </li>
          ))}
          <li role="presentation" className="mt-1">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex h-10 w-full items-center justify-between px-4 text-[15px]"
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

// Chain Length dropdown for necklaces: the open menu floats over the page and shows the
// on-body length comparison under the options, so the closed state takes no extra space.
function LengthListbox({
  label,
  value,
  options,
  prices,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  prices?: Record<string, number>;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState("");
  const root = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", esc);
    };
  }, [open]);

  return (
    <div ref={root} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={id}
        aria-label={label}
        onClick={() => setOpen((o) => !o)}
        className="flex h-10 w-full items-center justify-between border border-[#1d1d1f] bg-transparent px-3 text-[15px]"
      >
        {value || "Select"}
        <Chevron up={open} />
      </button>

      {/* Kept mounted (hidden when closed) so the guide photo is already loaded when the menu opens. */}
      <div
        hidden={!open}
        className="absolute left-0 right-0 top-full z-30 -mt-px border border-[#1d1d1f] bg-white shadow-[0_12px_32px_rgba(0,0,0,0.08)]"
      >
        <ul id={id} role="listbox" aria-label={label} className="py-1">
          {options.map((o) => (
            <li
              key={o}
              role="option"
              aria-selected={o === value}
              onMouseEnter={() => setHover(o)}
              onMouseLeave={() => setHover("")}
              onClick={() => {
                onChange(o);
                setOpen(false);
              }}
              className={`flex cursor-pointer items-center justify-between px-3 py-2.5 text-[15px] ${o === value || o === hover ? "bg-[#f6f6f1]" : ""}`}
            >
              <span>{o}</span>
              {prices?.[o] !== undefined && <span className="text-[14px] text-[#1d1d1f]/70">{formatUSD(prices[o])}</span>}
            </li>
          ))}
        </ul>
        <div className="border-t border-[#1d1d1f]/10 p-3">
          <NecklaceLengthGuide lengths={options} selected={hover || value} />
        </div>
      </div>
    </div>
  );
}
