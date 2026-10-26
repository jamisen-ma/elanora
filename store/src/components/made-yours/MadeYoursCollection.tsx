"use client";

import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Cormorant_Garamond } from "next/font/google";
import {
  categories,
  formatUSD,
  madeYoursProducts,
  metals,
  priceRanges,
  productImage,
  settings,
  shapes,
  wornImage,
  type MadeYoursProduct,
} from "@/data/madeYours";
import { productSerif } from "@/lib/fonts";

// MADE YOURS collection page: compact intro → shop by category → toolbar →
// filters (sidebar on desktop, sheet on mobile) → product grid with one editorial
// break after the sixth piece. Palette: white, warm ivory, charcoal, light gray.

const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["400"], style: ["normal", "italic"] });

type GroupKey = "category" | "shape" | "setting" | "metal" | "price";
type Selected = Record<GroupKey, string[]>;

const GROUPS: { key: GroupKey; label: string; options: { value: string; label: string }[] }[] = [
  { key: "category", label: "Category", options: categories.map((v) => ({ value: v, label: v })) },
  { key: "shape", label: "Diamond Shape", options: shapes.map((v) => ({ value: v, label: v })) },
  { key: "setting", label: "Setting Style", options: settings.map((v) => ({ value: v, label: v })) },
  { key: "metal", label: "Metal", options: metals.map((v) => ({ value: v, label: v })) },
  { key: "price", label: "Price", options: priceRanges.map((r) => ({ value: r.id, label: r.label })) },
];

const SORTS = [
  { id: "featured", label: "Featured" },
  { id: "newest", label: "Newest" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
] as const;
type SortId = (typeof SORTS)[number]["id"];

const STEPS = ["Choose your stone", "Choose your setting", "Make it yours"];

const EMPTY: Selected = { category: [], shape: [], setting: [], metal: [], price: [] };

// One isolated piece per category for "Shop by category".
const CATEGORY_TILES = [
  { category: "Rings", slug: "the-oval-solitaire" },
  { category: "Necklaces", slug: "the-pear-bezel-pendant" },
  { category: "Bracelets", slug: "the-round-tennis-bracelet" },
  { category: "Earrings", slug: "the-round-solitaire-studs" },
] as const;

function matches(p: MadeYoursProduct, s: Selected) {
  if (s.category.length && !s.category.includes(p.category)) return false;
  if (s.shape.length && !s.shape.includes(p.shape)) return false;
  if (s.setting.length && !s.setting.includes(p.setting)) return false;
  if (s.metal.length && !s.metal.includes(p.metal)) return false;
  if (s.price.length) {
    const ok = s.price.some((id) => {
      const r = priceRanges.find((x) => x.id === id);
      return r ? p.startingPrice >= r.min && p.startingPrice <= r.max : false;
    });
    if (!ok) return false;
  }
  return true;
}

function sortProducts(list: MadeYoursProduct[], sort: SortId) {
  const out = [...list];
  if (sort === "featured") out.sort((a, b) => a.featuredRank - b.featuredRank);
  if (sort === "newest") out.sort((a, b) => a.addedRank - b.addedRank);
  if (sort === "price-asc") out.sort((a, b) => a.startingPrice - b.startingPrice);
  if (sort === "price-desc") out.sort((a, b) => b.startingPrice - a.startingPrice);
  return out;
}

const optionLabel = (key: GroupKey, value: string) =>
  GROUPS.find((g) => g.key === key)?.options.find((o) => o.value === value)?.label ?? value;

export default function MadeYoursCollection() {
  const [selected, setSelected] = useState<Selected>(EMPTY);
  const [sort, setSort] = useState<SortId>("featured");
  const [sortOpen, setSortOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true); // desktop
  const [sheetOpen, setSheetOpen] = useState(false); // mobile
  const toolbarRef = useRef<HTMLDivElement>(null);

  const results = useMemo(
    () => sortProducts(madeYoursProducts.filter((p) => matches(p, selected)), sort),
    [selected, sort],
  );

  const active = (Object.keys(selected) as GroupKey[]).flatMap((key) =>
    selected[key].map((value) => ({ key, value })),
  );

  const toggle = (key: GroupKey, value: string) =>
    setSelected((s) => ({
      ...s,
      [key]: s[key].includes(value) ? s[key].filter((v) => v !== value) : [...s[key], value],
    }));

  const clearAll = () => setSelected(EMPTY);

  const pickCategory = (category: string) => {
    setSelected((s) => ({
      ...s,
      category: s.category.length === 1 && s.category[0] === category ? [] : [category],
    }));
    toolbarRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Lock page scroll while the mobile filter sheet is open.
  useEffect(() => {
    document.body.style.overflow = sheetOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sheetOpen]);

  const sortLabel = SORTS.find((s) => s.id === sort)?.label ?? "Featured";

  return (
    <div className="bg-white text-[#1d1d1f]">
      {/* 01 — Intro */}
      <header className="px-6 pt-16 pb-14 text-center sm:pt-20 sm:pb-16 lg:pt-24">
        <h1 className="text-[11px] font-medium uppercase tracking-[0.32em] text-[#1d1d1f]/70">
          Made Yours
        </h1>
        <p
          className={`${serif.className} mt-6 text-[2.25rem] leading-[1.08] tracking-[-0.01em] sm:text-[2.75rem] lg:text-[3.25rem]`}
        >
          Custom diamonds,
          <br />
          made <em className="italic">your way.</em>
        </p>
        <p className="mx-auto mt-5 max-w-[22rem] text-balance text-[14px] md:max-w-none leading-[1.7] text-[#6e6e73]">
          Choose your stone, find your setting, and make it yours.
        </p>

        {/* How it works: three steps joined by hairlines (stacked on mobile) */}
        <ol className="mt-12 flex flex-col items-center sm:mt-14 md:flex-row md:justify-center">
          {STEPS.map((step, i) => (
            <Fragment key={step}>
              {i > 0 && (
                <li
                  aria-hidden
                  className="h-6 w-px bg-[#d2d2d7] my-3 md:my-0 md:mx-6 md:h-px md:w-12 lg:mx-8 lg:w-20"
                />
              )}
              <li className="flex items-baseline gap-3 whitespace-nowrap">
                <span className="text-[10px] tracking-[0.2em] text-[#86868b]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[11px] font-medium uppercase tracking-[0.26em]">{step}</span>
              </li>
            </Fragment>
          ))}
        </ol>
      </header>

      {/* 02 — Shop by category */}
      <section aria-labelledby="shop-by-category" className="pb-16 sm:pb-20">
        <h2
          id="shop-by-category"
          className="px-6 text-center text-[11px] font-medium uppercase tracking-[0.32em] text-[#1d1d1f]/70"
        >
          Shop by Category
        </h2>
        <ul className="mx-auto mt-8 flex max-w-[1200px] snap-x snap-mandatory gap-5 overflow-x-auto px-6 [scrollbar-width:none] sm:mt-10 md:grid md:grid-cols-4 md:gap-8 md:overflow-visible md:px-10 [&::-webkit-scrollbar]:hidden">
          {CATEGORY_TILES.map((t) => {
            const on = selected.category.length === 1 && selected.category[0] === t.category;
            return (
              <li key={t.category} className="w-[44%] shrink-0 snap-start md:w-auto">
                <button
                  type="button"
                  onClick={() => pickCategory(t.category)}
                  aria-pressed={on}
                  className="group block w-full text-center"
                >
                  <div className="relative aspect-square overflow-hidden bg-white">
                    <Image
                      src={productImage(t.slug)}
                      alt=""
                      fill
                      unoptimized
                      sizes="(max-width: 768px) 44vw, 25vw"
                      className="object-contain transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                  <span
                    className={`mt-3 inline-block border-b pb-1 text-[11px] font-medium uppercase tracking-[0.24em] transition-colors ${
                      on ? "border-[#1d1d1f]" : "border-transparent group-hover:border-[#1d1d1f]/30"
                    }`}
                  >
                    {t.category}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      {/* 03 — Toolbar */}
      <div ref={toolbarRef} className="scroll-mt-20 px-6 md:px-10">
        <div className="mx-auto flex max-w-[1440px] items-end justify-between border-b border-[#ececec] pb-4">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.24em]">Made Yours</p>
            <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-[#86868b]">
              {results.length} {results.length === 1 ? "Piece" : "Pieces"}
            </p>
          </div>
          <div className="flex items-center gap-6 text-[11px] uppercase tracking-[0.2em] sm:gap-8 [&_button]:uppercase">
            {/* Filter: toggles the sidebar on desktop, opens the sheet on mobile */}
            <button
              type="button"
              onClick={() => setSidebarOpen((o) => !o)}
              className="hidden lg:inline"
              aria-expanded={sidebarOpen}
            >
              {sidebarOpen ? "Hide Filter" : "Filter"}
            </button>
            <button type="button" onClick={() => setSheetOpen(true)} className="lg:hidden">
              Filter{active.length ? ` (${active.length})` : ""}
            </button>
            <div className="relative">
              <button
                type="button"
                onClick={() => setSortOpen((o) => !o)}
                aria-haspopup="listbox"
                aria-expanded={sortOpen}
              >
                <span className="hidden sm:inline">Sort by: </span>
                <span className="sm:hidden">Sort: </span>
                {sortLabel}
              </button>
              {sortOpen && (
                <>
                  <button
                    type="button"
                    aria-label="Close sort menu"
                    className="fixed inset-0 z-20 cursor-default"
                    onClick={() => setSortOpen(false)}
                  />
                  <ul
                    role="listbox"
                    className="absolute right-0 top-full z-30 mt-3 w-56 bg-white py-2 text-left shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
                  >
                    {SORTS.map((s) => (
                      <li key={s.id}>
                        <button
                          type="button"
                          role="option"
                          aria-selected={sort === s.id}
                          onClick={() => {
                            setSort(s.id);
                            setSortOpen(false);
                          }}
                          className={`block w-full px-5 py-2.5 text-left text-[11px] uppercase tracking-[0.2em] ${
                            sort === s.id ? "text-[#1d1d1f]" : "text-[#86868b] hover:text-[#1d1d1f]"
                          }`}
                        >
                          {s.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 05 — Active filters */}
      {active.length > 0 && (
        <div className="px-6 md:px-10">
          <div className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-x-6 gap-y-2 pt-5 text-[11px] uppercase tracking-[0.18em] [&_button]:uppercase">
            {active.map((f) => (
              <button
                key={`${f.key}-${f.value}`}
                type="button"
                onClick={() => toggle(f.key, f.value)}
                className="text-[#1d1d1f] hover:text-[#86868b]"
                aria-label={`Remove ${optionLabel(f.key, f.value)}`}
              >
                {optionLabel(f.key, f.value)} <span aria-hidden className="ml-1">&times;</span>
              </button>
            ))}
            <button type="button" onClick={clearAll} className="text-[#86868b] underline underline-offset-4 hover:text-[#1d1d1f]">
              Clear All
            </button>
          </div>
        </div>
      )}

      {/* 04 + 06 — Filters and grid */}
      <div className="px-6 pb-28 pt-10 md:px-10 lg:pt-12">
        <div
          className={`mx-auto grid max-w-[1440px] grid-cols-1 gap-x-14 ${
            sidebarOpen ? "lg:grid-cols-[220px_1fr]" : "lg:grid-cols-1"
          }`}
        >
          {sidebarOpen && (
            <aside className="hidden lg:block" aria-label="Filters">
              <FilterGroups selected={selected} onToggle={toggle} />
            </aside>
          )}

          <div>
            {results.length === 0 ? (
              <div className="py-24 text-center">
                <p className="text-[14px] text-[#6e6e73]">No pieces match these filters.</p>
                <button
                  type="button"
                  onClick={clearAll}
                  className="mt-5 text-[11px] uppercase tracking-[0.2em] underline underline-offset-4"
                >
                  Clear All
                </button>
              </div>
            ) : (
              <ul
                className={`grid grid-cols-2 gap-x-4 gap-y-14 sm:gap-x-6 lg:gap-x-10 lg:gap-y-20 ${
                  sidebarOpen ? "lg:grid-cols-3" : "lg:grid-cols-4"
                }`}
              >
                {results.map((p, i) => (
                  <Fragment key={p.slug}>
                    <li>
                      <ProductTile product={p} priority={i < 3} />
                    </li>
                    {i === 5 && results.length > 6 && (
                      <li className="col-span-full">
                        <EditorialBreak />
                      </li>
                    )}
                  </Fragment>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter sheet */}
      {sheetOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white lg:hidden" role="dialog" aria-modal="true" aria-label="Filters">
          <div className="flex h-14 items-center justify-between border-b border-[#ececec] px-6">
            <p className="text-[11px] font-medium uppercase tracking-[0.24em]">Filter</p>
            <button
              type="button"
              onClick={() => setSheetOpen(false)}
              className="text-[11px] uppercase tracking-[0.2em]"
            >
              Close
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-6 pb-6">
            <FilterGroups selected={selected} onToggle={toggle} startOpen />
          </div>
          <div className="flex items-center justify-between border-t border-[#ececec] px-6 py-5 text-[11px] uppercase tracking-[0.2em] [&_button]:uppercase">
            <button type="button" onClick={clearAll} className="text-[#86868b]">
              Clear All
            </button>
            <button type="button" onClick={() => setSheetOpen(false)} className="font-medium">
              Show {results.length} {results.length === 1 ? "Piece" : "Pieces"} &rarr;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterGroups({
  selected,
  onToggle,
  startOpen = false,
}: {
  selected: Selected;
  onToggle: (key: GroupKey, value: string) => void;
  startOpen?: boolean;
}) {
  const [open, setOpen] = useState<Record<GroupKey, boolean>>({
    category: true,
    shape: startOpen,
    setting: startOpen,
    metal: startOpen,
    price: startOpen,
  });

  return (
    <div>
      {GROUPS.map((g) => {
        const isOpen = open[g.key];
        const count = selected[g.key].length;
        return (
          <div key={g.key} className="border-b border-[#ececec]">
            <button
              type="button"
              onClick={() => setOpen((o) => ({ ...o, [g.key]: !o[g.key] }))}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between py-4 text-left text-[11px] font-medium uppercase tracking-[0.22em]"
            >
              <span>
                {g.label}
                {count > 0 && <span className="ml-2 text-[#86868b]">{count}</span>}
              </span>
              <span aria-hidden className="text-[14px] font-light leading-none">
                {isOpen ? "−" : "+"}
              </span>
            </button>
            {isOpen && (
              <ul className="space-y-3 pb-5">
                {g.options.map((o) => {
                  const on = selected[g.key].includes(o.value);
                  return (
                    <li key={o.value}>
                      <button
                        type="button"
                        role="checkbox"
                        aria-checked={on}
                        onClick={() => onToggle(g.key, o.value)}
                        className="flex items-center gap-3 text-[13px] text-[#1d1d1f]"
                      >
                        <span
                          aria-hidden
                          className={`h-[11px] w-[11px] border ${
                            on ? "border-[#1d1d1f] bg-[#1d1d1f]" : "border-[#c7c7cc]"
                          }`}
                        />
                        <span className={on ? "" : "text-[#1d1d1f]/80"}>{o.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}

function ProductTile({ product, priority }: { product: MadeYoursProduct; priority?: boolean }) {
  return (
    <Link href={`/made-yours/${product.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-[#fafaf8]">
        {/* Product shot is on pure white; multiply blends it into the ivory tile. */}
        <Image
          src={productImage(product.slug)}
          alt={product.name}
          fill
          unoptimized
          loading={priority ? "eager" : "lazy"}
          sizes="(max-width: 1024px) 50vw, 25vw"
          className="object-cover mix-blend-multiply"
        />
        <Image
          src={wornImage(product.slug)}
          alt=""
          aria-hidden
          fill
          unoptimized
          sizes="(max-width: 1024px) 50vw, 25vw"
          className="object-cover opacity-0 transition-opacity duration-[350ms] ease-out group-hover:opacity-100"
        />
      </div>
      <div className="mt-4 sm:mt-5">
        <h3 className={`${productSerif.className} text-[16px] font-normal leading-snug tracking-[-0.01em] sm:text-[18px]`}>
          {product.name}
        </h3>
        <p className="mt-1.5 text-[13px] text-[#6e6e73]">Starting at {formatUSD(product.startingPrice)}</p>
        <p className="mt-2 text-[9px] uppercase tracking-[0.24em] text-[#86868b] sm:text-[10px]">Customizable</p>
      </div>
    </Link>
  );
}

function EditorialBreak() {
  return (
    <div className="grid grid-cols-1 items-center gap-8 py-4 md:grid-cols-[3fr_2fr] md:gap-12 lg:py-8">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#fafaf8]">
        <Image
          src="/images/made-yours/products/editorial-your-way.webp"
          alt="Loose lab-grown diamonds in different shapes beside a ring setting"
          fill
          unoptimized
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
      <div className="md:pr-6">
        <p className={`${serif.className} text-[2rem] uppercase leading-[1.1] tracking-[0.04em] sm:text-[2.25rem]`}>
          Your piece,
          <br />
          your way.
        </p>
        <p className="mt-4 text-[14px] leading-[1.7] text-[#6e6e73]">
          Choose the details that make it yours.
        </p>
        <Link
          href={`/made-yours/${madeYoursProducts[0].slug}`}
          className="group relative mt-8 inline-block pb-1.5 text-[11px] font-medium uppercase tracking-[0.2em]"
        >
          Explore Customization &rarr;
          <span aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-[#1d1d1f]/20" />
          <span
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-[#1d1d1f] transition-transform duration-500 ease-out group-hover:scale-x-100"
          />
        </Link>
      </div>
    </div>
  );
}

