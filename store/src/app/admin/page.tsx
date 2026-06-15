"use client";

import { useState, useEffect, useCallback } from "react";

interface AnalyticsData {
  overview: {
    totalPageViews: number;
    pageViews24h: number;
    pageViews7d: number;
    uniqueVisitors: number;
    uniqueVisitors24h: number;
    uniqueVisitors7d: number;
    totalSignups: number;
  };
  topPages: { page: string; views: number }[];
  trafficSources: { source: string; visits: number }[];
  devices: { device: string; count: number }[];
  countries: { country: string; count: number }[];
  scrollDepths: Record<number, number>;
  dailyViews: Record<string, number>;
  recentSignups: Record<string, unknown>[];
  recentEvents: Record<string, unknown>[];
  // Production message
  message?: string;
  tip?: string;
}

interface WaitlistData {
  count: number;
  entries: { email: string; timestamp: string }[];
}

const COUNTRY_NAMES: Record<string, string> = {
  US: "United States",
  GB: "United Kingdom",
  CA: "Canada",
  AU: "Australia",
  DE: "Germany",
  FR: "France",
  JP: "Japan",
  IN: "India",
  BR: "Brazil",
  MX: "Mexico",
  NL: "Netherlands",
  SE: "Sweden",
  unknown: "Unknown",
};

function StatCard({
  label,
  value,
  sublabel,
}: {
  label: string;
  value: string | number;
  sublabel?: string;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5">
      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
        {label}
      </p>
      <p className="text-2xl font-semibold text-gray-900">{value}</p>
      {sublabel && <p className="text-xs text-gray-400 mt-1">{sublabel}</p>}
    </div>
  );
}

function DataTable({
  title,
  headers,
  rows,
}: {
  title: string;
  headers: string[];
  rows: (string | number)[][];
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100">
        <h3 className="text-sm font-medium text-gray-900">{title}</h3>
      </div>
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-100">
            {headers.map((h) => (
              <th
                key={h}
                className="px-5 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={headers.length}
                className="px-5 py-4 text-sm text-gray-400 text-center"
              >
                No data yet
              </td>
            </tr>
          ) : (
            rows.map((row, i) => (
              <tr key={i} className="border-b border-gray-50 last:border-0">
                {row.map((cell, j) => (
                  <td key={j} className="px-5 py-2.5 text-sm text-gray-700">
                    {cell}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

function BarChart({
  data,
  maxBars = 10,
}: {
  data: { label: string; value: number }[];
  maxBars?: number;
}) {
  const sorted = data.slice(0, maxBars);
  const max = Math.max(...sorted.map((d) => d.value), 1);

  return (
    <div className="space-y-2">
      {sorted.map((d) => (
        <div key={d.label} className="flex items-center gap-3">
          <span className="text-xs text-gray-600 w-24 truncate text-right">
            {d.label}
          </span>
          <div className="flex-1 bg-gray-100 rounded-full h-5 overflow-hidden">
            <div
              className="bg-amber-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${(d.value / max) * 100}%` }}
            />
          </div>
          <span className="text-xs font-medium text-gray-700 w-10">
            {d.value}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [waitlist, setWaitlist] = useState<WaitlistData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "overview" | "traffic" | "signups" | "events"
  >("overview");

  const fetchData = useCallback(async () => {
    try {
      const [analyticsRes, waitlistRes] = await Promise.all([
        fetch("/api/analytics"),
        fetch("/api/waitlist"),
      ]);

      if (analyticsRes.ok) {
        setAnalytics(await analyticsRes.json());
      }
      if (waitlistRes.ok) {
        setWaitlist(await waitlistRes.json());
      }
    } catch (err) {
      console.error("Failed to fetch analytics:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [fetchData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading analytics...</div>
      </div>
    );
  }

  const overview = analytics?.overview;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                Elanora Analytics
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Website metrics & waitlist dashboard
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={fetchData}
                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded transition-colors"
              >
                Refresh
              </button>
              <a
                href="/"
                className="text-xs text-gray-500 hover:text-gray-700"
              >
                &larr; Back to site
              </a>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-6 mt-6">
            {(
              ["overview", "traffic", "signups", "events"] as const
            ).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-sm pb-2 border-b-2 transition-colors capitalize ${
                  activeTab === tab
                    ? "border-amber-500 text-gray-900 font-medium"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <StatCard
                label="Page Views (24h)"
                value={overview?.pageViews24h || 0}
                sublabel={`${overview?.totalPageViews || 0} total`}
              />
              <StatCard
                label="Unique Visitors (24h)"
                value={overview?.uniqueVisitors24h || 0}
                sublabel={`${overview?.uniqueVisitors || 0} total`}
              />
              <StatCard
                label="Waitlist Signups"
                value={waitlist?.count || overview?.totalSignups || 0}
              />
              <StatCard
                label="Conversion Rate"
                value={
                  overview && overview.uniqueVisitors > 0
                    ? `${Math.round(((waitlist?.count || overview.totalSignups) / overview.uniqueVisitors) * 100)}%`
                    : "—"
                }
                sublabel="Visitors → Signups"
              />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-lg p-5">
                <h3 className="text-sm font-medium text-gray-900 mb-4">
                  Top Pages
                </h3>
                <BarChart
                  data={(analytics?.topPages || []).map((p) => ({
                    label: p.page,
                    value: p.views,
                  }))}
                />
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-5">
                <h3 className="text-sm font-medium text-gray-900 mb-4">
                  Traffic Sources
                </h3>
                <BarChart
                  data={(analytics?.trafficSources || []).map((s) => ({
                    label: s.source,
                    value: s.visits,
                  }))}
                />
              </div>
            </div>

            {/* Secondary Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <DataTable
                title="Devices"
                headers={["Device", "Visits"]}
                rows={(analytics?.devices || []).map((d) => [
                  d.device.charAt(0).toUpperCase() + d.device.slice(1),
                  d.count,
                ])}
              />
              <DataTable
                title="Countries"
                headers={["Country", "Visits"]}
                rows={(analytics?.countries || []).map((c) => [
                  COUNTRY_NAMES[c.country] || c.country,
                  c.count,
                ])}
              />
              <DataTable
                title="Scroll Depth"
                headers={["Depth", "Users"]}
                rows={Object.entries(analytics?.scrollDepths || {})
                  .sort(([a], [b]) => Number(a) - Number(b))
                  .map(([depth, count]) => [`${depth}%`, count])}
              />
            </div>
          </div>
        )}

        {/* Traffic Tab */}
        {activeTab === "traffic" && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <StatCard
                label="Page Views (7d)"
                value={overview?.pageViews7d || 0}
              />
              <StatCard
                label="Unique Visitors (7d)"
                value={overview?.uniqueVisitors7d || 0}
              />
              <StatCard
                label="Total Page Views"
                value={overview?.totalPageViews || 0}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-lg p-5">
                <h3 className="text-sm font-medium text-gray-900 mb-4">
                  Traffic Sources
                </h3>
                <BarChart
                  data={(analytics?.trafficSources || []).map((s) => ({
                    label: s.source,
                    value: s.visits,
                  }))}
                />
              </div>
              <DataTable
                title="Pages by Views"
                headers={["Page", "Views"]}
                rows={(analytics?.topPages || []).map((p) => [
                  p.page,
                  p.views,
                ])}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DataTable
                title="Countries"
                headers={["Country", "Visits"]}
                rows={(analytics?.countries || []).map((c) => [
                  COUNTRY_NAMES[c.country] || c.country,
                  c.count,
                ])}
              />
              <DataTable
                title="Devices"
                headers={["Device", "Visits"]}
                rows={(analytics?.devices || []).map((d) => [
                  d.device.charAt(0).toUpperCase() + d.device.slice(1),
                  d.count,
                ])}
              />
            </div>

            {/* Daily Views */}
            {analytics?.dailyViews &&
              Object.keys(analytics.dailyViews).length > 0 && (
                <div className="bg-white border border-gray-200 rounded-lg p-5">
                  <h3 className="text-sm font-medium text-gray-900 mb-4">
                    Daily Page Views (Last 30 Days)
                  </h3>
                  <BarChart
                    maxBars={30}
                    data={Object.entries(analytics.dailyViews)
                      .sort(([a], [b]) => a.localeCompare(b))
                      .map(([date, views]) => ({
                        label: date.slice(5), // MM-DD
                        value: views,
                      }))}
                  />
                </div>
              )}
          </div>
        )}

        {/* Signups Tab */}
        {activeTab === "signups" && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <StatCard
                label="Total Signups"
                value={waitlist?.count || 0}
              />
              <StatCard
                label="Tracked Signups"
                value={overview?.totalSignups || 0}
                sublabel="With analytics data"
              />
              <StatCard
                label="Conversion Rate"
                value={
                  overview && overview.uniqueVisitors > 0
                    ? `${Math.round(((waitlist?.count || 0) / overview.uniqueVisitors) * 100)}%`
                    : "—"
                }
              />
            </div>

            {/* Waitlist emails */}
            <DataTable
              title="Waitlist Signups"
              headers={["Email", "Date"]}
              rows={(waitlist?.entries || [])
                .slice()
                .reverse()
                .map((e) => [
                  e.email,
                  new Date(e.timestamp).toLocaleString(),
                ])}
            />

            {/* Recent tracked signups with source */}
            {(analytics?.recentSignups?.length || 0) > 0 && (
              <DataTable
                title="Signup Sources (Tracked)"
                headers={["Time", "Source", "Campaign", "Variant"]}
                rows={(analytics?.recentSignups || []).map((e) => [
                  e.server_timestamp
                    ? new Date(e.server_timestamp as string).toLocaleString()
                    : "—",
                  (e.utm_source as string) ||
                    (e.referrer as string) ||
                    "direct",
                  (e.utm_campaign as string) || "—",
                  (e.variant as string) || "—",
                ])}
              />
            )}
          </div>
        )}

        {/* Events Tab */}
        {activeTab === "events" && (
          <div className="space-y-8">
            <DataTable
              title="Recent Events"
              headers={["Time", "Event", "Page", "Device", "Source"]}
              rows={(analytics?.recentEvents || []).map((e) => [
                e.server_timestamp
                  ? new Date(e.server_timestamp as string).toLocaleString()
                  : "—",
                e.event as string,
                (e.page as string) || "—",
                (e.device as string) || "—",
                (e.utm_source as string) ||
                  (e.referrer as string) ||
                  "direct",
              ])}
            />

            {analytics?.message && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-5">
                <p className="text-sm text-amber-800">{analytics.message}</p>
                {analytics.tip && (
                  <p className="text-sm text-amber-600 mt-2">
                    {analytics.tip}
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Vercel Analytics Note */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-gray-100 rounded-lg p-5 text-center">
          <p className="text-xs text-gray-500">
            Detailed traffic analytics (visitors, countries, referrers,
            browsers) are also available in your{" "}
            <a
              href="https://vercel.com/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-600 hover:underline"
            >
              Vercel Dashboard
            </a>{" "}
            under Analytics. This dashboard tracks custom events and waitlist
            signups.
          </p>
        </div>
      </div>
    </div>
  );
}
