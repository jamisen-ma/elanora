"use client";

import { useEffect, useRef, useState } from "react";
import type { CatalogItem } from "@/data/catalog";
import type { EditVideo } from "@/data/theEdit";
import { CUSTOM_POLICY } from "@/data/customOrderPolicy";
import { trackEvent } from "@/components/Analytics";

// "Request a Quote" for a piece seen in a THE EDIT video: the customer picks the diamond size and
// color, ring size, metal and a budget range, leaves a name and email, and we reply with a quote. Sent through
// the custom-request inbox (/api/custom-request), so it gets an ECJ reference like other custom work.

const DIAMOND_SIZES = [
  "1 ct",
  "1.5 ct",
  "2 ct",
  "2.5 ct",
  "3 ct",
  "3.5 ct",
  "4 ct",
  "4.5 ct",
  "5 ct +",
  "Not sure",
];
const DIAMOND_COLORS = [
  "White",
  "Yellow",
  "Pink",
  "Blue",
  "Green",
  "Champagne",
  "Purple",
  "Orange",
  "Black",
  "Other",
  "Not sure",
];
const RING_SIZES = [
  ...[
    "3",
    "3.5",
    "4",
    "4.5",
    "5",
    "5.5",
    "6",
    "6.5",
    "7",
    "7.5",
    "8",
    "8.5",
    "9",
    "9.5",
    "10",
  ].map((s) => `US ${s}`),
  "Not sure",
];
const METALS = [
  "14K White Gold",
  "14K Yellow Gold",
  "14K Rose Gold",
  "18K White Gold",
  "18K Yellow Gold",
  "18K Rose Gold",
  "Platinum",
  "Not sure",
];
// Budget: $500-wide ranges from $299 up to $4,999, then "Above $4,999".
const usd = (n: number) => `$${n.toLocaleString("en-US")}`;
const BUDGETS = [
  `${usd(299)} – ${usd(499)}`,
  ...Array.from(
    { length: 9 },
    (_, i) => `${usd(500 * (i + 1))} – ${usd(500 * (i + 2) - 1)}`,
  ), // $500 – $999 … $4,500 – $4,999
  `Above ${usd(4999)}`,
];

const input =
  "h-10 w-full border border-[#1d1d1f]/25 bg-white px-3 text-[15px] placeholder:text-[#1d1d1f]/40 focus:border-[#1d1d1f] focus:outline-none";
const label =
  "mb-1.5 block text-[12px] font-medium uppercase tracking-[0.18em] text-[#1d1d1f]/70";

export default function EditQuote({
  video,
  products,
}: {
  video: EditVideo;
  products: CatalogItem[];
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");
  const piece = products[0]?.name ?? video.title;
  const isRing = (products[0]?.type ?? video.jewelry ?? "Rings") === "Rings";

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setError("");
    const form = new FormData(e.currentTarget);
    const get = (k: string) => String(form.get(k) ?? "").trim();
    const budget = get("budget");
    form.set("itemType", piece);
    form.set("product", products[0]?.slug ?? `the-edit:${video.id}`);
    form.set(
      "idea",
      `Quote from THE EDIT video "${video.title}"${products.length ? ` — ${products.map((p) => p.name).join(", ")}` : ""}`,
    );
    form.set(
      "details",
      [
        `Video: ${video.title} (${video.id})`,
        `Diamond size: ${get("diamondSize")}`,
        `Diamond color: ${get("diamondColor")}`,
        isRing && `Ring size: ${get("ringSize")}`,
        `Metal: ${get("metal")}`,
        `Budget: ${budget}`,
        get("notes") && `Notes: ${get("notes")}`,
      ]
        .filter(Boolean)
        .join("\n"),
    );
    form.delete("notes");
    form.delete("ringSize");
    try {
      const res = await fetch("/api/custom-request", {
        method: "POST",
        body: form,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setReference(data.reference ?? "");
      setStatus("sent");
      trackEvent("edit_quote_request", { video: video.id });
    } catch {
      setError("Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-3 block border-b border-[#1d1d1f]/25 pb-0.5 text-[12px] font-medium uppercase tracking-[0.18em] text-[#1d1d1f] transition-colors hover:border-[#1d1d1f]"
      >
        Request a Quote &rarr;
      </button>

      <dialog
        ref={dialog}
        onClose={() => setOpen(false)}
        onClick={(e) => e.target === dialog.current && setOpen(false)}
        aria-labelledby={`quote-${video.id}`}
        className="m-auto max-h-[92dvh] w-[calc(100%-2rem)] max-w-lg overflow-y-auto bg-white p-0 text-[#1d1d1f] backdrop:bg-black/40"
      >
        <div className="px-5 py-6 sm:px-8 sm:py-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#1d1d1f]/55">
                Request a Quote
              </p>
              <h2
                id={`quote-${video.id}`}
                className="mt-1.5 text-[20px] leading-snug"
              >
                {piece}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="-mr-2 -mt-1 p-2 text-[22px] leading-none"
            >
              &times;
            </button>
          </div>

          {status === "sent" ? (
            <div
              className="mt-6 border border-[#1d1d1f]/15 bg-[#faf7f3] px-4 py-4 text-[15px] leading-[1.6]"
              role="status"
            >
              <p className="font-medium">Thank you — your request is in.</p>
              <p className="mt-1 text-[#1d1d1f]/75">
                We&rsquo;ll reply by email with your quote.
                {reference && (
                  <>
                    {" "}
                    Your reference is{" "}
                    <span className="font-medium text-[#1d1d1f]">
                      {reference}
                    </span>
                    .
                  </>
                )}
              </p>
            </div>
          ) : (
            <form onSubmit={submit} className="mt-6 space-y-4">
              <p className="text-[14px] leading-[1.6] text-[#1d1d1f]/70">
                Tell us how you&rsquo;d like it made and we&rsquo;ll send you a
                quote.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor={`${video.id}-size`} className={label}>
                    Diamond Size
                  </label>
                  <select
                    id={`${video.id}-size`}
                    name="diamondSize"
                    required
                    defaultValue=""
                    className={input}
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    {DIAMOND_SIZES.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor={`${video.id}-color`} className={label}>
                    Diamond Color
                  </label>
                  <select
                    id={`${video.id}-color`}
                    name="diamondColor"
                    required
                    defaultValue=""
                    className={input}
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    {DIAMOND_COLORS.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </div>
                {isRing && (
                  <div>
                    <label htmlFor={`${video.id}-ring`} className={label}>
                      Ring Size
                    </label>
                    <select
                      id={`${video.id}-ring`}
                      name="ringSize"
                      required
                      defaultValue=""
                      className={input}
                    >
                      <option value="" disabled>
                        Select
                      </option>
                      {RING_SIZES.map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                )}
                <div>
                  <label htmlFor={`${video.id}-metal`} className={label}>
                    Metal
                  </label>
                  <select
                    id={`${video.id}-metal`}
                    name="metal"
                    required
                    defaultValue=""
                    className={input}
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    {METALS.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor={`${video.id}-budget`} className={label}>
                  Budget *
                </label>
                <select
                  id={`${video.id}-budget`}
                  name="budget"
                  required
                  defaultValue=""
                  className={input}
                >
                  <option value="" disabled>
                    Select
                  </option>
                  {BUDGETS.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor={`${video.id}-name`} className={label}>
                    Name *
                  </label>
                  <input
                    id={`${video.id}-name`}
                    name="name"
                    required
                    autoComplete="name"
                    className={input}
                  />
                </div>
                <div>
                  <label htmlFor={`${video.id}-email`} className={label}>
                    Email *
                  </label>
                  <input
                    id={`${video.id}-email`}
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className={input}
                  />
                </div>
              </div>
              <div>
                <label htmlFor={`${video.id}-notes`} className={label}>
                  Anything else?
                </label>
                <textarea
                  id={`${video.id}-notes`}
                  name="notes"
                  rows={3}
                  placeholder="Engraving, timing, anything we should know…"
                  className="w-full border border-[#1d1d1f]/25 bg-white px-3 py-2 text-[15px] placeholder:text-[#1d1d1f]/40 focus:border-[#1d1d1f] focus:outline-none"
                />
              </div>

              {error && (
                <p role="alert" className="text-[14px] text-[#b42318]">
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={status === "sending"}
                className="flex h-11 w-full items-center justify-center bg-[#1d1d1f] text-[13px] font-medium uppercase tracking-[0.2em] text-white transition-colors hover:bg-black disabled:opacity-60"
              >
                {status === "sending" ? "Sending…" : "Request My Quote"}
              </button>
              <p className="text-[13px] leading-[1.5] text-[#1d1d1f]/55">
                {CUSTOM_POLICY.inquiry}
              </p>
            </form>
          )}
        </div>
      </dialog>
    </>
  );
}
