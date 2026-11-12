"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import TrendChart from "@/components/admin/TrendChart";
import type { Dashboard, RangeKey } from "@/lib/analyticsQueries";

// Elanora analytics dashboard. Reads /api/analytics (signed-in only) for the chosen date range,
// in the viewer's own timezone, and refreshes every minute.

type Tab = "overview" | "products" | "traffic" | "locations" | "leads";
const TABS: { id: Tab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "products", label: "Products" },
  { id: "traffic", label: "Traffic" },
  { id: "locations", label: "Locations & devices" },
  { id: "leads", label: "Leads" },
];
const PRESETS: { id: Exclude<RangeKey, "custom">; label: string }[] = [
  { id: "today", label: "Today" },
  { id: "7d", label: "7 days" },
  { id: "30d", label: "30 days" },
  { id: "90d", label: "90 days" },
  { id: "12m", label: "12 months" },
];
const LEAD_LABELS: Record<string, string> = {
  waitlist_signup: "Waitlist signups",
  ring_quote_request: "Ring quote requests",
  custom_request: "Custom requests",
};
const LEAD_SHORT: Record<string, string> = {
  waitlist_signup: "Waitlist signup",
  ring_quote_request: "Ring quote",
  custom_request: "Custom request",
};
const SOURCE_LABELS: Record<string, string> = {
  direct: "Direct / typed in",
  google: "Google",
  instagram: "Instagram",
  tiktok: "TikTok",
  facebook: "Facebook",
  twitter: "X / Twitter",
  pinterest: "Pinterest",
  youtube: "YouTube",
  reddit: "Reddit",
  linkedin: "LinkedIn",
};
const STORAGE_KEY = "elanora-admin-view";

const fmt = (n: number) => n.toLocaleString("en-US");
const duration = (s: number) => (s <= 0 ? "—" : s < 60 ? `${s}s` : `${Math.floor(s / 60)}m ${String(s % 60).padStart(2, "0")}s`);
const sourceLabel = (s: string) => SOURCE_LABELS[s] ?? s;
const regionNames = typeof Intl !== "undefined" ? new Intl.DisplayNames(["en"], { type: "region" }) : null;
const countryName = (code: string | null) => {
  if (!code || code === "??") return "Unknown";
  try {
    return regionNames?.of(code) ?? code;
  } catch {
    return code;
  }
};
const flag = (code: string | null) =>
  code && /^[A-Z]{2}$/.test(code) ? String.fromCodePoint(...[...code].map((c) => 0x1f1a5 + c.charCodeAt(0))) : "🌐";
const ago = (iso: string) => {
  const s = Math.round((Date.now() - Date.parse(iso)) / 1000);
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
};
const today = () => new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD

interface View {
  range: RangeKey;
  from: string;
  to: string;
  tab: Tab;
}

function loadView(): View {
  const fallback: View = { range: "7d", from: "", to: "", tab: "overview" };
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null");
    return saved ? { ...fallback, ...saved } : fallback;
  } catch {
    return fallback;
  }
}

export default function AdminDashboard() {
  const [view, setView] = useState<View>({ range: "7d", from: "", to: "", tab: "overview" });
  const [tick, setTick] = useState(0);
  const [result, setResult] = useState<{ key: string; data?: Dashboard; error?: string } | null>(null);

  // Restore the last range and tab used on this device.
  useEffect(() => {
    const id = requestAnimationFrame(() => setView(loadView()));
    return () => cancelAnimationFrame(id);
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(view));
    } catch {
      // private mode: nothing to remember
    }
  }, [view]);

  const tz = useMemo(() => Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC", []);
  const customReady = view.range !== "custom" || (!!view.from && !!view.to && view.from <= view.to);
  const query = useMemo(() => {
    const p = new URLSearchParams({ range: view.range, tz });
    if (view.range === "custom") {
      p.set("from", view.from);
      p.set("to", view.to);
    }
    return p.toString();
  }, [view.range, view.from, view.to, tz]);

  useEffect(() => {
    if (!customReady) return;
    let live = true;
    const key = query;
    fetch(`/api/analytics?${query}`, { cache: "no-store" })
      .then(async (res) => {
        if (res.status === 401) {
          window.location.href = "/admin/login?next=/admin";
          return;
        }
        const body = await res.json();
        if (live) setResult(res.ok ? { key, data: body } : { key, error: body.error ?? "Something went wrong." });
      })
      .catch(() => live && setResult({ key, error: "Couldn't reach the server. Check your connection." }));
    return () => {
      live = false;
    };
  }, [query, tick, customReady]);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 60000);
    return () => clearInterval(id);
  }, []);

  const data = result?.data;
  const stale = result?.key !== query;
  const set = (patch: Partial<View>) => setView((v) => ({ ...v, ...patch }));

  return (
    <div className="min-h-screen bg-[#f7f6f4] text-gray-900">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-xl font-semibold">Elanora Analytics</h1>
              <p className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm text-gray-500">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                {data ? `${fmt(data.overview.liveVisitors)} on the site now` : result?.error ? "No data" : "Loading…"}
                <span className="hidden text-gray-300 sm:inline">·</span>
                <span className="w-full sm:w-auto">Times in {tz.replace(/_/g, " ")}</span>
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <Link href="/admin/links" className="text-gray-500 hover:text-gray-900">
                Tracking links
              </Link>
              <Link href="/" className="text-gray-500 hover:text-gray-900">
                View site
              </Link>
              <form method="post" action="/api/admin/logout">
                <button type="submit" className="text-gray-500 hover:text-gray-900">
                  Sign out
                </button>
              </form>
            </div>
          </div>

          {/* Date range */}
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <div className="flex flex-wrap rounded-lg bg-gray-100 p-0.5">
              {PRESETS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => set({ range: p.id })}
                  className={`rounded-md px-3 py-1.5 text-xs transition-colors ${
                    view.range === p.id ? "bg-white font-medium shadow-sm" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {p.label}
                </button>
              ))}
              <button
                onClick={() =>
                  set({
                    range: "custom",
                    from: view.from || data?.range.start.slice(0, 10) || today(),
                    to: view.to || today(),
                  })
                }
                className={`rounded-md px-3 py-1.5 text-xs transition-colors ${
                  view.range === "custom" ? "bg-white font-medium shadow-sm" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Custom
              </button>
            </div>
            {view.range === "custom" && (
              <div className="flex items-center gap-1.5 text-xs">
                <input
                  type="date"
                  value={view.from}
                  max={view.to || today()}
                  onChange={(e) => set({ from: e.target.value })}
                  className="rounded-md border border-gray-300 bg-white px-2 py-1"
                  aria-label="Start date"
                />
                <span className="text-gray-400">to</span>
                <input
                  type="date"
                  value={view.to}
                  min={view.from}
                  max={today()}
                  onChange={(e) => set({ to: e.target.value })}
                  className="rounded-md border border-gray-300 bg-white px-2 py-1"
                  aria-label="End date"
                />
              </div>
            )}
            <button
              onClick={() => setTick((t) => t + 1)}
              className="ml-auto rounded-md border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-600 hover:text-gray-900"
            >
              Refresh
            </button>
          </div>

          {/* Tabs */}
          <div className="-mb-5 mt-5 flex gap-5 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => set({ tab: t.id })}
                className={`whitespace-nowrap border-b-2 pb-3 text-sm transition-colors ${
                  view.tab === t.id ? "border-gray-900 font-medium" : "border-transparent text-gray-500 hover:text-gray-800"
                }`}
              >
                {t.label}
                {t.id === "leads" && data && data.overview.leads > 0 && (
                  <span className="ml-1.5 rounded-full bg-emerald-100 px-1.5 py-0.5 text-[10px] font-medium text-emerald-800">
                    {data.overview.leads}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={`mx-auto max-w-7xl px-4 py-6 transition-opacity sm:px-6 lg:px-8 ${stale && data ? "opacity-60" : ""}`}>
        {!customReady ? (
          <Notice>Pick a start and end date.</Notice>
        ) : result?.error && !stale ? (
          <Notice tone="error">{result.error}</Notice>
        ) : !data ? (
          <Notice>Loading analytics…</Notice>
        ) : (
          <>
            {view.tab === "overview" && <Overview d={data} />}
            {view.tab === "products" && <Products d={data} />}
            {view.tab === "traffic" && <Traffic d={data} />}
            {view.tab === "locations" && <Locations d={data} />}
            {view.tab === "leads" && <Leads d={data} />}
          </>
        )}
      </div>
    </div>
  );
}

/* ---------- Tabs ---------- */

function Overview({ d }: { d: Dashboard }) {
  const o = d.overview;
  const perVisitor = o.visitors ? o.views / o.visitors : 0;
  const prevPerVisitor = o.previous.visitors ? o.previous.views / o.previous.visitors : 0;
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        <Stat label="Visitors" value={fmt(o.visitors)} now={o.visitors} before={o.previous.visitors} />
        <Stat label="Page views" value={fmt(o.views)} now={o.views} before={o.previous.views} />
        <Stat label="Pages per visitor" value={perVisitor ? perVisitor.toFixed(1) : "—"} now={perVisitor} before={prevPerVisitor} />
        <Stat label="Avg. time on page" value={duration(o.avgSeconds)} now={o.avgSeconds} before={o.previous.avgSeconds} />
        <Stat label="Leads" value={fmt(o.leads)} now={o.leads} before={o.previous.leads} accent />
      </div>

      <Card title="Visitors over time">
        {o.views === 0 && o.previous.views === 0 ? (
          <Empty>No visits in this period yet.</Empty>
        ) : (
          <TrendChart points={d.series} bucket={d.range.bucket} />
        )}
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Top pages">
          <BarList
            rows={[...d.pages]
              .sort((a, b) => b.visitors - a.visitors || b.views - a.views)
              .slice(0, 8)
              .map((p) => ({ label: pageLabel(p.page, d), value: p.visitors, sub: `${fmt(p.views)} views` }))}
            unit="visitors"
          />
        </Card>
        <Card title="Where visitors come from">
          <BarList rows={d.sources.slice(0, 8).map((s) => ({ label: sourceLabel(s.source), value: s.visitors }))} unit="visitors" />
        </Card>
        <Card title="Countries">
          <BarList
            rows={d.countries.slice(0, 8).map((c) => ({ label: `${flag(c.country)}  ${countryName(c.country)}`, value: c.visitors }))}
            unit="visitors"
          />
        </Card>
        <Card title="Devices">
          <BarList rows={d.devices.map((x) => ({ label: deviceLabel(x.device), value: x.visitors }))} unit="visitors" />
        </Card>
      </div>

      <Card title="Latest activity" note="Most recent 40, any date">
        {d.recent.length === 0 ? (
          <Empty>Nothing yet.</Empty>
        ) : (
          <ul className="divide-y divide-gray-100">
            {d.recent.map((e, i) => (
              <li key={i} className="flex items-center gap-3 py-2 text-sm">
                <span className="w-16 shrink-0 text-xs text-gray-400">{ago(e.ts)}</span>
                <span className="shrink-0" title={countryName(e.country)}>
                  {flag(e.country)}
                </span>
                <span className="min-w-0 flex-1 truncate">
                  {e.event === "page_view" ? (
                    <span className="text-gray-700">{pageLabel(e.page ?? "/", d)}</span>
                  ) : (
                    <span className="font-medium text-emerald-700">{LEAD_SHORT[e.event] ?? e.event}</span>
                  )}
                  <span className="text-gray-400">
                    {e.city ? ` · ${e.city}` : ""} · {sourceLabel(e.source)}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}

function Products({ d }: { d: Dashboard }) {
  return (
    <div className="space-y-6">
      <Card title="By category" note="Views of product pages">
        <BarList rows={d.categories.map((c) => ({ label: c.type, value: c.views, sub: `${fmt(c.visitors)} visitors` }))} unit="views" />
      </Card>
      <Card title="Product pages">
        <Table
          head={["Piece", "Category", "Visitors", "Views", "Avg. time"]}
          empty="No product pages viewed in this period."
          rows={d.products.map((p) => [
            <a key="n" href={`/shop/${p.slug}`} target="_blank" rel="noreferrer" className="hover:underline">
              {p.name}
            </a>,
            p.type,
            fmt(p.visitors),
            fmt(p.views),
            duration(p.avgSeconds),
          ])}
        />
      </Card>
      <Card title="All pages">
        <Table
          head={["Page", "Visitors", "Views", "Avg. time"]}
          empty="No pages viewed in this period."
          rows={d.pages.map((p) => [
            <span key="p" className="font-mono text-xs">
              {p.page}
            </span>,
            fmt(p.visitors),
            fmt(p.views),
            duration(p.avgSeconds),
          ])}
        />
      </Card>
    </div>
  );
}

function Traffic({ d }: { d: Dashboard }) {
  return (
    <div className="space-y-6">
      <Card title="Sources" note="Leads = signups and requests from visitors who came this way">
        <Table
          head={["Source", "Visitors", "Views", "Leads", "Lead rate"]}
          empty="No visits in this period."
          rows={d.sources.map((s) => [
            sourceLabel(s.source),
            fmt(s.visitors),
            fmt(s.views),
            fmt(s.leads),
            s.visitors ? `${((s.leads / s.visitors) * 100).toFixed(1)}%` : "—",
          ])}
        />
      </Card>
      <Card title="Campaigns" note="Visits from links with utm_campaign">
        {d.campaigns.length === 0 ? (
          <Empty>
            No campaign visits yet. Use{" "}
            <Link href="/admin/links" className="underline">
              Tracking links
            </Link>{" "}
            to make a link for each post, bio or ad, then see here which one brings people in.
          </Empty>
        ) : (
          <Table
            head={["Campaign", "Source", "Medium", "Visitors", "Views", "Leads"]}
            rows={d.campaigns.map((c) => [c.campaign, sourceLabel(c.source), c.medium || "—", fmt(c.visitors), fmt(c.views), fmt(c.leads)])}
          />
        )}
      </Card>
    </div>
  );
}

function Locations({ d }: { d: Dashboard }) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card title="Countries">
        <Table
          head={["Country", "Visitors", "Views"]}
          empty="No visits in this period."
          rows={d.countries.map((c) => [`${flag(c.country)}  ${countryName(c.country)}`, fmt(c.visitors), fmt(c.views)])}
        />
      </Card>
      <Card title="Cities">
        <Table
          head={["City", "Visitors", "Views"]}
          empty="No visits in this period."
          rows={d.cities.map((c) => [
            `${flag(c.country)}  ${c.city}${c.region && c.country === "US" ? `, ${c.region}` : c.country ? `, ${countryName(c.country)}` : ""}`,
            fmt(c.visitors),
            fmt(c.views),
          ])}
        />
      </Card>
      <Card title="Devices">
        <BarList rows={d.devices.map((x) => ({ label: deviceLabel(x.device), value: x.visitors, sub: `${fmt(x.views)} views` }))} unit="visitors" />
      </Card>
    </div>
  );
}

function Leads({ d }: { d: Dashboard }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {Object.entries(LEAD_LABELS).map(([k, label]) => (
          <div key={k} className="rounded-lg border border-gray-200 bg-white p-5">
            <p className="text-xs uppercase tracking-wider text-gray-500">{label}</p>
            <p className="mt-1 text-2xl font-semibold">{fmt(d.leads.byType[k] ?? 0)}</p>
          </div>
        ))}
      </div>
      <Card title="Leads over time">
        {d.overview.leads === 0 ? <Empty>No leads in this period yet.</Empty> : <TrendChart points={d.series} bucket={d.range.bucket} mode="leads" />}
      </Card>
      <Card title="Recent leads" note="Contact details are in your email inbox, not stored here">
        {d.leads.recent.length === 0 ? (
          <Empty>No leads in this period yet.</Empty>
        ) : (
          <ul className="divide-y divide-gray-100">
            {d.leads.recent.map((l, i) => {
              const extra = ["variant", "setting", "shape"]
                .map((k) => l.details[k])
                .filter((v): v is string => typeof v === "string" && v.length > 0);
              return (
                <li key={i} className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 py-2.5 text-sm">
                  <span className="font-medium text-emerald-700">{LEAD_SHORT[l.event] ?? l.event}</span>
                  {extra.length > 0 && <span className="text-gray-700">{extra.join(" · ")}</span>}
                  <span className="text-gray-400">
                    on {pageLabel(l.page ?? "/", d)} · {flag(l.country)} {l.city ?? countryName(l.country)} · via {sourceLabel(l.source)}
                  </span>
                  <span className="ml-auto text-xs text-gray-400">
                    {new Date(l.ts).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </Card>
    </div>
  );
}

/* ---------- Pieces ---------- */

function pageLabel(page: string, d: Dashboard) {
  if (page === "/") return "Home";
  const product = d.products.find((p) => p.page === page);
  return product ? product.name : page;
}

function deviceLabel(device: string) {
  return device === "mobile" ? "Phone" : device === "desktop" ? "Computer" : device === "tablet" ? "Tablet" : "Unknown";
}

function Stat({
  label,
  value,
  now,
  before,
  accent,
}: {
  label: string;
  value: string;
  now: number;
  before: number;
  accent?: boolean;
}) {
  const change = before > 0 ? ((now - before) / before) * 100 : null;
  return (
    <div className={`rounded-lg border bg-white p-4 sm:p-5 ${accent ? "border-emerald-200" : "border-gray-200"}`}>
      <p className="text-[11px] uppercase tracking-wider text-gray-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold tabular-nums">{value}</p>
      <p className="mt-1 text-xs text-gray-400">
        {change === null ? (
          now > 0 ? "new this period" : "—"
        ) : (
          <>
            <span className={change > 0 ? "text-emerald-600" : change < 0 ? "text-rose-600" : ""}>
              {change > 0 ? "▲" : change < 0 ? "▼" : ""} {Math.abs(change).toFixed(0)}%
            </span>{" "}
            vs previous
          </>
        )}
      </p>
    </div>
  );
}

function Card({ title, note, children }: { title: string; note?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-lg border border-gray-200 bg-white">
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-gray-100 px-5 py-3">
        <h2 className="text-sm font-medium">{title}</h2>
        {note && <p className="text-xs text-gray-400">{note}</p>}
      </div>
      <div className="px-5 py-4">{children}</div>
    </section>
  );
}

function BarList({ rows, unit }: { rows: { label: string; value: number; sub?: string }[]; unit: string }) {
  if (rows.length === 0) return <Empty>No data in this period.</Empty>;
  const max = Math.max(1, ...rows.map((r) => r.value));
  return (
    <ul className="space-y-1.5" aria-label={`By ${unit}`}>
      {rows.map((r, i) => (
        <li key={i} className="relative flex items-center justify-between gap-3 rounded px-2 py-1.5 text-sm">
          <span className="absolute inset-y-0 left-0 rounded bg-[#f3ede4]" style={{ width: `${(r.value / max) * 100}%` }} />
          <span className="relative min-w-0 truncate">{r.label}</span>
          <span className="relative shrink-0 tabular-nums text-gray-700">
            {fmt(r.value)}
            {r.sub && <span className="ml-2 hidden text-xs text-gray-400 sm:inline">{r.sub}</span>}
          </span>
        </li>
      ))}
    </ul>
  );
}

function Table({ head, rows, empty }: { head: string[]; rows: React.ReactNode[][]; empty?: string }) {
  if (rows.length === 0) return <Empty>{empty ?? "No data in this period."}</Empty>;
  return (
    <div className="-mx-5 overflow-x-auto">
      <table className="w-full min-w-[480px] text-sm">
        <thead>
          <tr className="text-left text-[11px] uppercase tracking-wider text-gray-500">
            {head.map((h, i) => (
              <th key={h} className={`px-5 pb-2 font-medium ${i > 0 ? "text-right" : ""}`}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((c, j) => (
                <td key={j} className={`px-5 py-2 ${j > 0 ? "text-right tabular-nums text-gray-700" : ""}`}>
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Empty({ children }: { children: React.ReactNode }) {
  return <p className="py-6 text-center text-sm text-gray-400">{children}</p>;
}

function Notice({ children, tone }: { children: React.ReactNode; tone?: "error" }) {
  return (
    <div className={`rounded-lg border p-6 text-center text-sm ${tone === "error" ? "border-rose-200 bg-rose-50 text-rose-700" : "border-gray-200 bg-white text-gray-500"}`}>
      {children}
    </div>
  );
}
