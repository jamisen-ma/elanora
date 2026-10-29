"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { trackEvent } from "@/components/Analytics";
import { getMadeYoursProduct } from "@/data/madeYours";
import { CUSTOM_POLICY } from "@/data/customOrderPolicy";
import ShapeIcon from "@/components/shop/ShapeIcon";

// Custom inquiry form. An inquiry starts a conversation; the final design and quote
// are confirmed with the customer before production.

const input =
  "w-full border-0 border-b border-[#1d1d1f]/25 bg-transparent px-0 py-2.5 text-[16px] text-[#1d1d1f] placeholder:text-[#86868b] focus:border-[#1d1d1f] focus:outline-none focus:ring-0";

// What we make — the form offers only these, so every request is something we can quote.
// [Ranges to confirm with the owner: sizes and budgets.]
const NOT_SURE = "Not sure yet";
// Diamond colors and the fill of their little diamond icon ("Other" gets a rainbow).
const DIAMOND_COLORS: Record<string, string> = {
  White: "#f4f6f9",
  Yellow: "#f3d34a",
  Pink: "#f2a9c4",
  Blue: "#8db7e6",
  Green: "#9cd3a3",
};
const SHAPES = ["Round", "Oval", "Emerald", "Pear", "Heart", "Radiant", "Cushion", "Marquise", "Princess", "Asscher"];
const SIZES = ["Under 1 ct", "1–2 ct", "2–3 ct", "3–4 ct", "4–5 ct", "5 ct or more"];
const BUDGETS = ["$1,000–$2,500", "$2,500–$5,000", "$5,000–$10,000", "$10,000 or more"];
const VIBES = ["Classic", "Minimal", "Romantic", "Bold"];
// Product-page metals plus 18K gold (custom only), with their swatch colours.
const METALS = [
  { name: "Platinum", swatch: "#cfd1d4" },
  { name: "14K Yellow Gold", swatch: "#e3cb6e" },
  { name: "14K White Gold", swatch: "#dcdcdc" },
  { name: "14K Rose Gold", swatch: "#ecc6ae" },
  { name: "18K Yellow Gold", swatch: "#dcbc55" },
  { name: "18K White Gold", swatch: "#dcdcdc" },
  { name: "18K Rose Gold", swatch: "#e6b89c" },
];

export default function CustomRequest() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");
  const [diamondColor, setDiamondColor] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const ideaRef = useRef<HTMLTextAreaElement>(null);
  const doneRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (open) formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [open]);

  useEffect(() => {
    if (!open || !ideaRef.current || ideaRef.current.value) return;
    const styleSlug = new URLSearchParams(window.location.search).get("style");
    if (!styleSlug) return;
    const style = getMadeYoursProduct(styleSlug);
    if (style) {
      ideaRef.current.value = `I’d like to customize the ${style.name}. Here are the changes I have in mind: `;
    }
  }, [open]);

  useEffect(() => {
    const openFromAnchor = () => {
      if (window.location.hash === "#custom-request") setOpen(true);
    };
    openFromAnchor();
    window.addEventListener("hashchange", openFromAnchor);
    return () => window.removeEventListener("hashchange", openFromAnchor);
  }, []);

  useEffect(() => {
    if (status === "sent") doneRef.current?.focus();
  }, [status]);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/custom-request", { method: "POST", body: new FormData(e.currentTarget) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("sent");
      trackEvent("custom_request");
    } catch {
      setError("Unable to connect. Please try again.");
      setStatus("error");
    }
  };

  return (
    <section aria-label="Custom request" className="px-6 pb-24 pt-4 text-center sm:pb-28 lg:pb-32">
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="bg-[#1d1d1f] px-10 py-4 text-[13px] font-medium uppercase tracking-[0.22em] text-white transition-opacity hover:opacity-85"
        >
          Share your idea
        </button>
      )}

      {open && status === "sent" && (
        <div className="mx-auto max-w-md scroll-mt-28">
          <p ref={doneRef} tabIndex={-1} className="text-[13px] font-medium uppercase tracking-[0.24em] outline-none">
            Request sent
          </p>
          <p className="mt-4 text-[16px] leading-[1.7] text-[#1d1d1f]/70">
            Thank you. We&rsquo;ll email you soon.
          </p>
        </div>
      )}

      {open && status !== "sent" && (
        <form ref={formRef} onSubmit={submit} className="mx-auto max-w-xl scroll-mt-28 text-left">
          <h2 className="text-center text-[13px] font-medium uppercase tracking-[0.32em]">Tell us your idea</h2>
          <p className="mx-auto mt-4 max-w-md text-center text-[15px] leading-[1.7] text-[#1d1d1f]/65">
            Pick what you already know &mdash; we&rsquo;ll help with the rest. Only budget, a few words and your email are required.
          </p>

          <div className="mt-12 grid gap-9">
            <Choice label="Where to start" name="startingPoint" options={["Change one of your designs", "Something completely new"]} />
            <Field label="Type of piece" htmlFor="cr-type">
              <select id="cr-type" name="itemType" defaultValue="" className={`${input} appearance-none`}>
                <option value="">Choose a piece</option>
                <option>Engagement ring</option>
                <option>Wedding band</option>
                <option>Everyday ring</option>
                <option>Necklace or pendant</option>
                <option>Bracelet</option>
                <option>Earrings</option>
              </select>
            </Field>
          </div>

          <div className="mt-9">
            <Choice
              label="Diamond color"
              name="diamondColor"
              options={[NOT_SURE, ...Object.keys(DIAMOND_COLORS), "Other"]}
              icon={(o) => (o === NOT_SURE ? null : <ColorDiamond color={DIAMOND_COLORS[o]} />)}
              onChange={setDiamondColor}
            />
            {diamondColor === "Other" && (
              <input
                name="diamondColorOther"
                aria-label="Which diamond color?"
                placeholder="Which color?"
                autoFocus
                className={`${input} mt-3 max-w-xs`}
              />
            )}
          </div>

          <div className="mt-9">
            <Choice
              label="Shape"
              name="diamondShape"
              options={[NOT_SURE, ...SHAPES]}
              icon={(o) => (o === NOT_SURE ? null : <ShapeIcon shape={o} size={20} className="shrink-0 opacity-80" />)}
            />
          </div>

          <div className="mt-9">
            <Choice label="Metal" name="metal" options={METALS.map((m) => m.name)} swatches={Object.fromEntries(METALS.map((m) => [m.name, m.swatch]))} />
          </div>

          <div className="mt-9 grid gap-9 sm:grid-cols-2 sm:gap-x-10">
            <Field label="Diamond size" htmlFor="cr-size">
              <select id="cr-size" name="diamondSize" defaultValue="" className={`${input} appearance-none`}>
                <option value="">Not sure yet</option>
                {SIZES.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </Field>
            <Field label="Budget" htmlFor="cr-budget" required>
              <select id="cr-budget" name="budget" required defaultValue="" className={`${input} appearance-none`}>
                <option value="" disabled>
                  Choose a range
                </option>
                {BUDGETS.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </Field>
          </div>

          <div className="mt-9 grid gap-9">
            <Choice label="A gift? Pick a vibe" name="vibe" options={VIBES} />
            <Field label="A few words" htmlFor="cr-idea" required>
              <textarea
                id="cr-idea"
                ref={ideaRef}
                name="idea"
                required
                rows={3}
                placeholder="e.g. a pink oval, simple band, for my sister’s birthday."
                className={`${input} resize-none`}
              />
            </Field>

            <Field label="Photo (optional)" htmlFor="cr-ref">
              <label
                htmlFor="cr-ref"
                className="flex cursor-pointer items-center justify-between gap-4 border-b border-[#1d1d1f]/25 py-2.5 text-[16px] focus-within:border-[#1d1d1f]"
              >
                <span className={fileName ? "truncate text-[#1d1d1f]" : "text-[#86868b]"}>
                  {fileName || "A piece you love — JPG, PNG or HEIC, up to 10 MB"}
                </span>
                <span className="shrink-0 text-[13px] font-medium uppercase tracking-[0.2em]">Choose file</span>
                <input
                  id="cr-ref"
                  name="reference"
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
                  className="sr-only"
                  onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
                />
              </label>
            </Field>
            <Field label="Needed by" htmlFor="cr-needed-by">
              <input id="cr-needed-by" name="neededBy" placeholder="Date or occasion" className={input} />
            </Field>
          </div>

          <div className="mt-9 grid gap-9 sm:grid-cols-2 sm:gap-x-10">
            <Field label="Name" htmlFor="cr-name">
              <input id="cr-name" name="name" autoComplete="name" className={input} />
            </Field>
            <Field label="Email" htmlFor="cr-email" required>
              <input id="cr-email" name="email" type="email" required autoComplete="email" className={input} />
            </Field>
            <Field label="Phone (optional)" htmlFor="cr-phone">
              <input id="cr-phone" name="phone" type="tel" autoComplete="tel" className={input} />
            </Field>
          </div>

          <div className="mt-9">
            <Field label="Anything else" htmlFor="cr-details">
              <textarea
                id="cr-details"
                name="details"
                rows={2}
                placeholder="Ring size, engraving, links…"
                className={`${input} resize-none`}
              />
            </Field>
          </div>

          {error && (
            <p role="alert" className="mt-8 text-center text-[15px] text-[#b42318]">
              {error}
            </p>
          )}

          <div className="mt-12 text-center">
            <button
              type="submit"
              disabled={status === "sending"}
              className="bg-[#1d1d1f] px-10 py-4 text-[13px] font-medium uppercase tracking-[0.22em] text-white transition-opacity hover:opacity-85 disabled:opacity-50"
            >
              {status === "sending" ? "Sending…" : "Send"}
            </button>
            <p className="mx-auto mt-5 max-w-xl text-[14px] leading-[1.7] text-[#86868b]">
              {CUSTOM_POLICY.inquiry}
            </p>
          </div>
        </form>
      )}
    </section>
  );
}

function Field({ label, htmlFor, required, children }: { label: string; htmlFor: string; required?: boolean; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-[12px] font-medium uppercase tracking-[0.22em] text-[#1d1d1f]/70">
        {label}
        {required && <span aria-hidden> *</span>}
      </label>
      <div className="mt-1">{children}</div>
    </div>
  );
}

/** A row of pill options (single choice, optional). */
function Choice({
  label,
  name,
  options,
  swatches,
  icon,
  onChange,
}: {
  label: string;
  name: string;
  options: string[];
  swatches?: Record<string, string>;
  icon?: (option: string) => ReactNode;
  onChange?: (value: string) => void;
}) {
  return (
    <fieldset>
      <legend className="block text-[12px] font-medium uppercase tracking-[0.22em] text-[#1d1d1f]/70">{label}</legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((o) => (
          <label key={o} className="cursor-pointer">
            <input type="radio" name={name} value={o} onChange={() => onChange?.(o)} className="peer sr-only" />
            <span className="inline-flex items-center gap-2 border border-[#1d1d1f]/25 px-4 py-2 text-[15px] text-[#1d1d1f]/80 transition-colors hover:border-[#1d1d1f] peer-checked:border-[#1d1d1f] peer-checked:bg-[#1d1d1f] peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-offset-2">
              {icon?.(o)}
              {swatches?.[o] && <span aria-hidden className="h-3 w-3 rounded-full ring-1 ring-black/10" style={{ background: swatches[o] }} />}
              {o}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

/** A small face-up round diamond in the given color; no color = a rainbow for "Other". */
function ColorDiamond({ color }: { color?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 32 32" aria-hidden className="shrink-0">
      {!color && (
        <defs>
          <linearGradient id="cr-other-diamond" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f2a9c4" />
            <stop offset="0.35" stopColor="#f3d34a" />
            <stop offset="0.65" stopColor="#9cd3a3" />
            <stop offset="1" stopColor="#8db7e6" />
          </linearGradient>
        </defs>
      )}
      <circle cx="16" cy="16" r="13" fill={color ?? "url(#cr-other-diamond)"} stroke="#1d1d1f" strokeOpacity="0.35" strokeWidth="1" />
      <g
        fill="none"
        stroke={color === DIAMOND_COLORS.White ? "#1d1d1f" : "#fff"}
        strokeOpacity={color === DIAMOND_COLORS.White ? 0.3 : 0.85}
        strokeWidth="1"
        strokeLinejoin="round"
      >
        <polygon points="16,9 21,11 23,16 21,21 16,23 11,21 9,16 11,11" />
        <path d="M16 3v6M25.2 6.8 21 11M29 16h-6M25.2 25.2 21 21M16 29v-6M6.8 25.2 11 21M3 16h6M6.8 6.8 11 11" />
      </g>
    </svg>
  );
}
