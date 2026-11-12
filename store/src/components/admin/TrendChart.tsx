"use client";

import { useState } from "react";

// Bars for page views, a line for visitors (and optionally leads), one point per hour / day / week.

export interface Point {
  slot: string; // "YYYY-MM-DDTHH:MM", wall-clock time in the dashboard's timezone
  views: number;
  visitors: number;
  leads: number;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function slotLabel(slot: string, bucket: string, long = false) {
  const [date, time] = slot.split("T");
  const [y, m, d] = date.split("-").map(Number);
  const day = `${MONTHS[m - 1]} ${d}`;
  if (bucket === "hour") {
    const h = Number(time.slice(0, 2));
    const hour = `${h % 12 === 0 ? 12 : h % 12}${h < 12 ? "am" : "pm"}`;
    return long ? `${day}, ${hour}` : hour;
  }
  if (bucket === "week") return long ? `Week of ${day}, ${y}` : day;
  return long ? `${day}, ${y}` : day;
}

const W = 720;
const H = 220;
const PAD = { top: 12, right: 8, bottom: 26, left: 36 };

function niceMax(n: number) {
  if (n <= 4) return 4;
  const pow = 10 ** Math.floor(Math.log10(n));
  const step = [1, 2, 2.5, 5, 10].find((s) => s * pow * 4 >= n)! * pow;
  return step * 4;
}

export default function TrendChart({
  points,
  bucket,
  mode = "traffic",
}: {
  points: Point[];
  bucket: string;
  mode?: "traffic" | "leads";
}) {
  const [hover, setHover] = useState<number | null>(null);
  const n = points.length;
  if (n === 0) return null;

  const barKey = mode === "traffic" ? "views" : "leads";
  const max = niceMax(Math.max(1, ...points.map((p) => Math.max(p[barKey], mode === "traffic" ? p.visitors : 0))));
  const iw = W - PAD.left - PAD.right;
  const ih = H - PAD.top - PAD.bottom;
  const slotW = iw / n;
  const barW = Math.max(1, Math.min(28, slotW * 0.62));
  const x = (i: number) => PAD.left + slotW * i + slotW / 2;
  const y = (v: number) => PAD.top + ih - (v / max) * ih;
  const ticks = [0, 1, 2, 3, 4].map((i) => (max / 4) * i);
  const labelEvery = Math.ceil(n / 8);
  const line = points.map((p, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(p.visitors).toFixed(1)}`).join(" ");
  const h = hover !== null ? points[hover] : null;

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto select-none"
        role="img"
        aria-label={mode === "traffic" ? "Page views and visitors over time" : "Leads over time"}
        onMouseLeave={() => setHover(null)}
      >
        {ticks.map((t) => (
          <g key={t}>
            <line x1={PAD.left} x2={W - PAD.right} y1={y(t)} y2={y(t)} stroke="#f0f0f0" />
            <text x={PAD.left - 6} y={y(t) + 3} textAnchor="end" fontSize="10" fill="#9ca3af">
              {t >= 1000 ? `${t / 1000}k` : t}
            </text>
          </g>
        ))}
        {points.map((p, i) => (
          <g key={p.slot}>
            <rect
              x={x(i) - barW / 2}
              y={y(p[barKey])}
              width={barW}
              height={Math.max(0, PAD.top + ih - y(p[barKey]))}
              rx={Math.min(3, barW / 3)}
              fill={mode === "traffic" ? (hover === i ? "#b8976b" : "#e7dccb") : hover === i ? "#047857" : "#a7f3d0"}
            />
            {i % labelEvery === 0 && (
              <text x={x(i)} y={H - 8} textAnchor="middle" fontSize="10" fill="#9ca3af">
                {slotLabel(p.slot, bucket)}
              </text>
            )}
            {/* full-height hover target */}
            <rect
              x={PAD.left + slotW * i}
              y={PAD.top}
              width={slotW}
              height={ih}
              fill="transparent"
              onMouseEnter={() => setHover(i)}
              onTouchStart={() => setHover(i)}
            />
          </g>
        ))}
        {mode === "traffic" && (
          <>
            <path d={line} fill="none" stroke="#1f2937" strokeWidth="1.75" strokeLinejoin="round" pointerEvents="none" />
            {n <= 40 &&
              points.map((p, i) => (
                <circle key={p.slot} cx={x(i)} cy={y(p.visitors)} r={hover === i ? 3.5 : 2} fill="#1f2937" pointerEvents="none" />
              ))}
          </>
        )}
      </svg>

      {h && (
        <div
          className="pointer-events-none absolute top-0 -translate-x-1/2 rounded-md bg-gray-900 px-2.5 py-1.5 text-[11px] leading-4 text-white shadow"
          style={{ left: `${(x(hover!) / W) * 100}%` }}
        >
          <div className="font-medium">{slotLabel(h.slot, bucket, true)}</div>
          {mode === "traffic" ? (
            <>
              <div>{h.visitors.toLocaleString()} visitors</div>
              <div>{h.views.toLocaleString()} page views</div>
              {h.leads > 0 && <div>{h.leads} leads</div>}
            </>
          ) : (
            <div>{h.leads} leads</div>
          )}
        </div>
      )}

      <div className="mt-2 flex items-center gap-4 text-[11px] text-gray-500">
        {mode === "traffic" ? (
          <>
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-2.5 rounded-sm bg-[#e7dccb]" /> Page views
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-0.5 w-3 bg-gray-800" /> Visitors
            </span>
          </>
        ) : (
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-sm bg-emerald-200" /> Leads
          </span>
        )}
      </div>
    </div>
  );
}
