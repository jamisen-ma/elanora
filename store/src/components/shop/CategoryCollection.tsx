"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Cormorant_Garamond } from "next/font/google";
import { fromPrice, jewelryTypes, onBodyImage, productHref, type CatalogItem } from "@/data/catalog";
import ProductFrame from "./ProductFrame";
import CollectionHero, { type CollectionHeroProps } from "./CollectionHero";
import { productSerif } from "@/lib/fonts";

// Category / Shop All page: large centred title → breadcrumb + FILTER / SORT → filters
// (sidebar on desktop, sheet on mobile) → grid. Pages with an editorial hero show it
// instead of the title.
// Filter options are built from the items on the page, so nothing empty is offered.
// Desktop grid is always 4 across; the filter sidebar opens on demand.

const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["400"], style: ["normal", "italic"] });

type GroupKey = "type" | "shape" | "stone" | "metal" | "price";
type Selected = Record<GroupKey, string[]>;
const EMPTY: Selected = { type: [], shape: [], stone: [], metal: [], price: [] };

const SHAPE_ORDER = ["Round", "Oval", "Emerald", "Pear", "Radiant", "Cushion", "Marquise", "Princess"];

const PRICE_RANGES = [
  { id: "under-500", label: "Under $500", min: 0, max: 499 },
  { id: "500-1000", label: "$500 – $1,000", min: 500, max: 1000 },
  { id: "1000-1500", label: "$1,000 – $1,500", min: 1001, max: 1500 },
  { id: "over-1500", label: "Over $1,500", min: 1501, max: Infinity },
];

const METAL_ORDER = ["Yellow Gold", "White Gold", "Rose Gold", "Platinum", "Sterling Silver"];

const SORTS = [
  { id: "featured", label: "Featured" },
  { id: "newest", label: "Newest" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
] as const;
type SortId = (typeof SORTS)[number]["id"];

export default function CategoryCollection({
  label,
  items,
  showTypeFilter = false,
  hero,
}: {
  label: string;
  items: CatalogItem[];
  showTypeFilter?: boolean;
  /** Optional editorial hero shown in place of the title. */
  hero?: CollectionHeroProps;
}) {
  const [selected, setSelected] = useState<Selected>(EMPTY);
  const [sort, setSort] = useState<SortId>("featured");
  const [sortOpen, setSortOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  const groups = useMemo(() => {
    const present = (pick: (i: CatalogItem) => string) => Array.from(new Set(items.map(pick)));
    const stones = present((i) => i.stoneGroup).sort((a, b) =>
      a === "Diamond" ? -1 : b === "Diamond" ? 1 : a.localeCompare(b),
    );
    const metals = METAL_ORDER.filter((m) => items.some((i) => i.metal === m));
    const shapes = present((i) => i.shape ?? "")
      .filter(Boolean)
      .sort((a, b) => (SHAPE_ORDER.indexOf(a) + 1 || 99) - (SHAPE_ORDER.indexOf(b) + 1 || 99));
    const prices = PRICE_RANGES.filter((r) => items.some((i) => i.price !== null && i.price >= r.min && i.price <= r.max));
    const out: { key: GroupKey; label: string; options: { value: string; label: string }[] }[] = [];
    if (showTypeFilter)
      out.push({
        key: "type",
        label: "Jewelry Type",
        options: jewelryTypes.filter((t) => items.some((i) => i.type === t)).map((v) => ({ value: v, label: v })),
      });
    out.push({ key: "shape", label: "Diamond Shape", options: shapes.map((v) => ({ value: v, label: v })) });
    out.push({ key: "stone", label: "Stone", options: stones.map((v) => ({ value: v, label: v })) });
    out.push({ key: "metal", label: "Metal", options: metals.map((v) => ({ value: v, label: v })) });
    out.push({ key: "price", label: "Price", options: prices.map((r) => ({ value: r.id, label: r.label })) });
    return out.filter((g) => g.options.length > 0);
  }, [items, showTypeFilter]);

  const results = useMemo(() => {
    const s = selected;
    const list = items.filter((i) => {
      if (s.type.length && !s.type.includes(i.type)) return false;
      if (s.shape.length && !(i.shape && s.shape.includes(i.shape))) return false;
      if (s.stone.length && !s.stone.includes(i.stoneGroup)) return false;
      if (s.metal.length && !(i.metal && s.metal.includes(i.metal))) return false;
      if (s.price.length) {
        const ok = s.price.some((id) => {
          const r = PRICE_RANGES.find((x) => x.id === id);
          return r && i.price !== null ? i.price >= r.min && i.price <= r.max : false;
        });
        if (!ok) return false;
      }
      return true;
    });
    if (sort === "featured") list.sort((a, b) => a.rank - b.rank);
    if (sort === "newest") list.sort((a, b) => a.addedRank - b.addedRank);
    if (sort === "price-asc") list.sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
    if (sort === "price-desc") list.sort((a, b) => (b.price ?? -Infinity) - (a.price ?? -Infinity));
    return list;
  }, [items, selected, sort]);

  const optionLabel = (key: GroupKey, value: string) =>
    groups.find((g) => g.key === key)?.options.find((o) => o.value === value)?.label ?? value;

  const active = (Object.keys(selected) as GroupKey[]).flatMap((key) =>
    selected[key].map((value) => ({ key, value })),
  );

  const toggle = (key: GroupKey, value: string) =>
    setSelected((s) => ({
      ...s,
      [key]: s[key].includes(value) ? s[key].filter((v) => v !== value) : [...s[key], value],
    }));
  const clearAll = () => setSelected(EMPTY);

  useEffect(() => {
    document.body.style.overflow = sheetOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sheetOpen]);

  const sortLabel = SORTS.find((s) => s.id === sort)?.label ?? "Featured";
  const pieces = (n: number) => `${n} ${n === 1 ? "Piece" : "Pieces"}`;

  return (
    <div className="bg-white text-[#1d1d1f]">
      {/* Intro: editorial hero when the page has one, otherwise the large title */}
      {hero ? (
        <div className="mb-10 sm:mb-12">
          <CollectionHero {...hero} />
        </div>
      ) : (
        <header className="px-6 pb-12 pt-12 text-center sm:pb-14 sm:pt-16 lg:pb-16 lg:pt-20">
          <h1
            className={`${serif.className} text-[2.6rem] uppercase leading-none tracking-[0.04em] sm:text-[3.4rem] lg:text-[4.25rem]`}
          >
            {label}
          </h1>
        </header>
      )}

      {/* Breadcrumb + filter / sort */}
      <div className="px-6 md:px-10">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6">
          <nav aria-label="Breadcrumb" className="min-w-0 truncate whitespace-nowrap text-[10px] uppercase tracking-[0.16em] sm:text-[12px] sm:tracking-[0.24em]">
            {label === "All Jewelry" ? (
              <span className="text-[#6e6e73]">All Jewelry</span>
            ) : (
              <>
                <Link href="/shop" className="hover:text-[#6e6e73]">
                  All Jewelry
                </Link>
                <span aria-hidden className="mx-2 text-[#86868b] sm:mx-3">
                  &rsaquo;
                </span>
                <span className="text-[#6e6e73]">{label}</span>
              </>
            )}
          </nav>
          <div className="flex shrink-0 items-center gap-5 text-[10px] uppercase tracking-[0.16em] sm:gap-8 sm:text-[12px] sm:tracking-[0.24em] [&_button]:uppercase">
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
                aria-label={`Sort: ${sortLabel}`}
                className="flex items-center gap-2.5"
              >
                Sort
                <svg width="11" height="7" viewBox="0 0 11 7" fill="none" aria-hidden className={sortOpen ? "rotate-180" : ""}>
                  <path d="M1 1l4.5 4.5L10 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
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

      {/* Active filters */}
      {active.length > 0 && (
        <div className="px-6 md:px-10">
          <div className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-x-6 gap-y-2 pt-5 text-[11px] uppercase tracking-[0.18em] [&_button]:uppercase">
            {active.map((f) => (
              <button
                key={`${f.key}-${f.value}`}
                type="button"
                onClick={() => toggle(f.key, f.value)}
                className="hover:text-[#86868b]"
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

      {/* Filters + grid */}
      <div className="px-6 pb-28 pt-10 md:px-10 lg:pt-12">
        <div className={`mx-auto grid max-w-[1440px] grid-cols-1 gap-x-14 ${sidebarOpen ? "lg:grid-cols-[220px_1fr]" : ""}`}>
          {sidebarOpen && (
            <aside className="hidden lg:block" aria-label="Filters">
              <FilterGroups groups={groups} selected={selected} onToggle={toggle} />
            </aside>
          )}
          <div>
            {items.length === 0 ? (
              <p className="py-24 text-center text-[14px] text-[#6e6e73]">New pieces coming soon.</p>
            ) : results.length === 0 ? (
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
                className="grid grid-cols-2 gap-x-2 gap-y-12 sm:gap-x-3 lg:grid-cols-4 lg:gap-x-3 lg:gap-y-16"
              >
                {results.map((p, i) => (
                  <li key={p.slug}>
                    <Tile item={p} priority={i < 3} />
                  </li>
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
            <button type="button" onClick={() => setSheetOpen(false)} className="text-[11px] uppercase tracking-[0.2em]">
              Close
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-6 pb-6">
            <FilterGroups groups={groups} selected={selected} onToggle={toggle} startOpen />
          </div>
          <div className="flex items-center justify-between border-t border-[#ececec] px-6 py-5 text-[11px] uppercase tracking-[0.2em] [&_button]:uppercase">
            <button type="button" onClick={clearAll} className="text-[#86868b]">
              Clear All
            </button>
            <button type="button" onClick={() => setSheetOpen(false)} className="font-medium">
              Show {pieces(results.length)} &rarr;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterGroups({
  groups,
  selected,
  onToggle,
  startOpen = false,
}: {
  groups: { key: GroupKey; label: string; options: { value: string; label: string }[] }[];
  selected: Selected;
  onToggle: (key: GroupKey, value: string) => void;
  startOpen?: boolean;
}) {
  const [open, setOpen] = useState<Record<string, boolean>>({ [groups[0]?.key ?? "stone"]: true });
  return (
    <div>
      {groups.map((g) => {
        const isOpen = startOpen || open[g.key];
        const count = selected[g.key].length;
        return (
          <div key={g.key} className="border-b border-[#ececec]">
            <button
              type="button"
              onClick={() => setOpen((o) => ({ ...o, [g.key]: !isOpen }))}
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
                        className="flex items-center gap-3 text-[13px]"
                      >
                        <span
                          aria-hidden
                          className={`h-[11px] w-[11px] border ${on ? "border-[#1d1d1f] bg-[#1d1d1f]" : "border-[#c7c7cc]"}`}
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

function Tile({ item, priority }: { item: CatalogItem; priority?: boolean }) {
  return (
    <Link href={productHref(item)} className="group block">
      <ProductFrame src={item.images[0]?.src} alt={item.name} priority={priority} hoverSrc={onBodyImage(item)} />
      <div className="mt-5 text-center">
        <h3 className={`${productSerif.className} text-[16px] font-normal leading-snug tracking-[-0.01em] sm:text-[18px]`}>{item.name}</h3>
        <p className="mt-1.5 text-[13px] text-[#6e6e73]">{fromPrice(item)}</p>
      </div>
    </Link>
  );
}
