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
// "Where to start" options. Changing an existing design only needs a photo, the changes and an email.
const START_CHANGE = "Change one of your designs";
const START_NEW = "Something completely new";
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
  const [start, setStart] = useState("");
  const isChange = start === START_CHANGE;
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
    if (isChange && !fileName) {
      setError("Please upload a photo of the design you’d like to change.");
      setStatus("error");
      return;
    }
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
            {isChange
              ? "Upload a photo of the design and tell us what you’d like to change. We’ll email you a quote."
              : start === START_NEW
                ? "Pick what you already know — we’ll help with the rest. Only budget, a few words and your email are required."
                : "How would you like to begin?"}
          </p>

          <div className="mt-10">
            <StartCards
              value={start}
              onChange={(v) => {
                // the two forms have their own file inputs, so start each with no file shown
                setStart(v);
                setFileName("");
                setError("");
              }}
            />
          </div>

          {isChange ? (
            /* Changing one of our designs: photo + the changes + contact details, then a quote */
            <>
              <div className="mt-9 grid gap-9">
                <Field label="Photo of the design" htmlFor="cr-ref" required>
                  <label
                    htmlFor="cr-ref"
                    className="flex cursor-pointer items-center justify-between gap-4 border-b border-[#1d1d1f]/25 py-2.5 text-[16px] focus-within:border-[#1d1d1f]"
                  >
                    <span className={fileName ? "truncate text-[#1d1d1f]" : "text-[#86868b]"}>
                      {fileName || "A screenshot or photo — JPG, PNG or HEIC, up to 10 MB"}
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
                <Field label="What would you like to change?" htmlFor="cr-idea" required>
                  <textarea
                    id="cr-idea"
                    ref={ideaRef}
                    name="idea"
                    required
                    rows={4}
                    placeholder="e.g. a pink center stone instead of white, 18K yellow gold, a thinner band."
                    className={`${input} resize-none`}
                  />
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
            </>
          ) : start === START_NEW ? (
            <>
          <div className="mt-9 grid gap-9">
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
            </>
          ) : null}

          {/* Nothing below "Where to start" until one of the two is chosen */}
          {start && (
            <>
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
              {status === "sending" ? "Sending…" : isChange ? "Request a Quote" : "Send"}
            </button>
            <p className="mx-auto mt-5 max-w-xl text-[14px] leading-[1.7] text-[#86868b]">
              {CUSTOM_POLICY.inquiry}
            </p>
          </div>
            </>
          )}
        </form>
      )}
    </section>
  );
}

// The two ways to start, as cards: an icon, a title and one line each.
const START_CARDS = [
  {
    value: START_CHANGE,
    title: "Change one of our designs",
    text: "Send a photo of a piece you like and tell us what to change.",
    icon: (
      // photo with a pencil
      <svg width="26" height="26" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
        <rect x="3" y="6" width="17" height="15" rx="1" />
        <path d="M3 17.5l4.5-4.5 4 4 2.5-2.5 6 6" strokeLinejoin="round" />
        <path d="M18.5 4.5l5 5L16 17l-5.5 1 1-5.5z" fill="#faf9f7" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    value: START_NEW,
    title: "Something completely new",
    text: "Share your idea and we’ll design the piece with you from scratch.",
    icon: (
      // sparkle
      <svg width="26" height="26" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
        <path d="M14 3c.6 5.4 2.6 7.4 8 8-5.4.6-7.4 2.6-8 8-.6-5.4-2.6-7.4-8-8 5.4-.6 7.4-2.6 8-8z" strokeLinejoin="round" />
        <path d="M22 18c.3 2.2 1.1 3 3.3 3.3-2.2.3-3 1.1-3.3 3.3-.3-2.2-1.1-3-3.3-3.3 2.2-.3 3-1.1 3.3-3.3z" strokeLinejoin="round" />
      </svg>
    ),
  },
];

function StartCards({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <fieldset>
      <legend className="sr-only">Where to start</legend>
      <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
        {START_CARDS.map((c) => {
          const on = value === c.value;
          return (
            <label key={c.value} className="cursor-pointer">
              <input
                type="radio"
                name="startingPoint"
                value={c.value}
                checked={on}
                onChange={() => onChange(c.value)}
                className="peer sr-only"
              />
              <span
                className={`relative flex h-full items-start gap-4 border px-5 py-5 text-left transition-[border-color,background-color,box-shadow] duration-200 peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-offset-2 sm:flex-col sm:gap-3 sm:px-6 sm:py-6 ${
                  on
                    ? "border-[#1d1d1f] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
                    : "border-[#1d1d1f]/15 bg-white/60 hover:border-[#1d1d1f]/50 hover:bg-white"
                }`}
              >
                <span className={`shrink-0 ${on ? "text-[#1d1d1f]" : "text-[#8a7358]"}`}>{c.icon}</span>
                <span className="min-w-0 pr-6">
                  <span className="block text-[17px] leading-snug text-[#1d1d1f]">{c.title}</span>
                  <span className="mt-1 block text-[14px] leading-[1.6] text-[#1d1d1f]/60">{c.text}</span>
                </span>
                {/* selection circle */}
                <span
                  aria-hidden
                  className={`absolute right-4 top-4 flex h-5 w-5 items-center justify-center rounded-full border transition-colors ${
                    on ? "border-[#1d1d1f] bg-[#1d1d1f]" : "border-[#1d1d1f]/30"
                  }`}
                >
                  {on && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none" stroke="white" strokeWidth="1.6">
                      <path d="M1 4l2.6 2.6L9 1" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
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
