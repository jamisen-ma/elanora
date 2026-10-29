"use client";

import { useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { productSerif } from "@/lib/fonts";
import ProductFrame from "@/components/shop/ProductFrame";
import ShapeIcon from "@/components/shop/ShapeIcon";
import { trackEvent } from "@/components/Analytics";
import {
  BUDGETS,
  PLACEHOLDER,
  RING_SIZES_QUARTER,
  SIZE_NOT_SURE,
  caratLabel,
  diamondTitle,
  getSetting,
  hasDiamond,
  isYellowStone,
  metalImage,
  onHandImage,
  quoteSummary,
  qualityLabel,
  ringTitle,
  settingPhoto,
  sizeLabel,
  type RingConfig,
  type Step,
} from "@/data/ringDesign";
import { ActionBar, MetalSwatches, PrimaryButton, metalLabel, type Update } from "./parts";
import { CUSTOM_POLICY, CUSTOM_TERMS } from "@/data/customOrderPolicy";

// Step 3: the ring summary (setting, diamond, metal, ring size, notes), share, and the
// quote request. The main button walks the customer through what is still missing,
// then opens the quote form. Nothing here takes payment.

const input =
  "w-full border-0 border-b border-[#1d1d1f]/25 bg-transparent px-0 py-2.5 text-[16px] text-[#1d1d1f] placeholder:text-[#86868b] focus:border-[#1d1d1f] focus:outline-none focus:ring-0";

export default function RingSummary({ config, update, goStep }: { config: RingConfig; update: Update; goStep: (s: Step) => void }) {
  const setting = getSetting(config.setting);
  const photo = setting ? settingPhoto(setting, config.shape) : undefined;
  const diamond = hasDiamond(config);
  const sizeRef = useRef<HTMLSelectElement>(null);
  const [notes, setNotes] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [shared, setShared] = useState(false);
  const [sent, setSent] = useState<string | null>(null);

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share && window.matchMedia("(max-width: 1023px)").matches) {
        await navigator.share({ title: "My Elanora ring", url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    } catch {
      /* dismissed */
    }
  };

  // The main button names the next thing to do.
  const action: { label: string; run: () => void } = !setting
    ? { label: "Choose a Setting", run: () => goStep("setting") }
    : !diamond
      ? { label: "Choose a Diamond", run: () => goStep("diamond") }
      : !config.size
        ? {
            label: "Select Ring Size",
            run: () => {
              sizeRef.current?.focus();
              sizeRef.current?.showPicker?.();
            },
          }
        : { label: "Request a Quote", run: () => setFormOpen(true) };

  const stoneNote = photo
    ? [
        config.shape && !photo.exact ? `Shown in ${photo.shownShape}. Made in ${config.shape} for you.` : "",
        config.colourType === "White" && isYellowStone(photo.item) ? "Shown with a yellow diamond." : "",
        config.colourType === "Yellow" && !isYellowStone(photo.item) ? "Shown with a white diamond." : "",
      ].filter(Boolean)
    : [];

  if (sent) return <Sent reference={sent} config={config} />;

  return (
    <section aria-labelledby="ring-step" className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-16">
      {/* Preview */}
      <div>
        {photo ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <ProductFrame
              src={metalImage(photo.item, config.metal)}
              alt={ringTitle(config)}
              bg="bg-white"
              className="aspect-square"
              sizes="(max-width: 1024px) 100vw, 30vw"
              priority
            />
            {onHandImage(photo.item, config.metal) && (
              <ProductFrame
                src={onHandImage(photo.item, config.metal)}
                alt={`${ringTitle(config)}, worn`}
                fill
                className="hidden aspect-square sm:block"
                sizes="30vw"
              />
            )}
          </div>
        ) : (
          <div className="flex aspect-square items-center justify-center bg-white text-[15px] text-[#1d1d1f]/55">
            Choose a setting to see your ring.
          </div>
        )}
        {stoneNote.map((n) => (
          <p key={n} className="mt-2 text-[14px] text-[#1d1d1f]/60">
            {n}
          </p>
        ))}
      </div>

      {/* Summary */}
      <div>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="ring-step" className={`${productSerif.className} text-[1.7rem] leading-tight sm:text-[2rem]`}>
              Your Ring
            </h2>
            <p className="mt-1 text-[15px] text-[#1d1d1f]/70">{ringTitle(config)}</p>
          </div>
          <button
            type="button"
            onClick={share}
            className="flex shrink-0 items-center gap-2 border border-[#1d1d1f]/20 px-3 py-2 text-[13px] uppercase tracking-[0.16em] hover:border-[#1d1d1f]/50"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M9 3h4v4M13 3 7 9M11 9.5V13H3V5h3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {shared ? "Link copied" : "Share"}
          </button>
        </div>

        <dl className="mt-6 border-t border-[#1d1d1f]/12">
          <Row
            icon={<RingIcon />}
            title={setting ? `${setting.name} Setting` : "Setting"}
            sub={setting ? [metalLabel(config.metal), config.shape, setting.name].filter(Boolean).join(" · ") : "Not chosen"}
            price={setting ? "Price on request" : undefined}
            actions={
              <TextButton onClick={() => goStep("setting")}>{setting ? "Edit" : "Choose"}</TextButton>
            }
          />
          <Row
            icon={config.shape && diamond ? <ShapeIcon shape={config.shape} size={22} /> : <ShapeIcon shape="Round" size={22} />}
            title={diamond ? diamondTitle(config) : "Diamond"}
            sub={diamond ? [config.colourType, caratLabel(config), qualityLabel(config)].filter(Boolean).join(" · ") : "Not chosen"}
            price={diamond ? "Price on request" : undefined}
            actions={
              diamond ? (
                <>
                  <TextButton onClick={() => goStep("diamond")}>Edit</TextButton>
                  <TextButton onClick={() => update({ diamondAdded: false })}>Remove</TextButton>
                </>
              ) : (
                <TextButton onClick={() => goStep("diamond")}>Choose</TextButton>
              )
            }
          />
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1d1d1f]/12 py-4">
            <dt className="text-[13px] font-medium uppercase tracking-[0.18em]">Metal</dt>
            <dd>
              <MetalSwatches value={config.metal} onChange={(metal) => update({ metal })} />
            </dd>
          </div>
          <div className="border-b border-[#1d1d1f]/12 py-4">
            <dt className="flex items-baseline justify-between gap-4">
              <label htmlFor="ring-size" className="text-[13px] font-medium uppercase tracking-[0.18em]">
                Ring size
              </label>
              <Link href="/size-guide" className="text-[14px] underline underline-offset-4 hover:text-[#1d1d1f]/70">
                Size guide
              </Link>
            </dt>
            <dd className="relative mt-2">
              <select
                id="ring-size"
                ref={sizeRef}
                value={config.size ?? ""}
                onChange={(e) => update({ size: e.target.value || undefined })}
                className={`h-11 w-full appearance-none border bg-white px-3 pr-9 text-[15px] focus:outline-none ${
                  config.size ? "border-[#1d1d1f]/30" : "border-[#1d1d1f]"
                }`}
              >
                <option value="">Select ring size</option>
                <option value={SIZE_NOT_SURE}>Not sure yet</option>
                {RING_SIZES_QUARTER.map((s) => (
                  <option key={s} value={s}>
                    US {s}
                  </option>
                ))}
              </select>
              <svg width="12" height="7" viewBox="0 0 12 7" fill="none" aria-hidden className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {config.size === SIZE_NOT_SURE && (
                <p className="mt-2 text-[14px] text-[#1d1d1f]/60">That&rsquo;s fine — you can tell us later.</p>
              )}
            </dd>
          </div>
          <div className="border-b border-[#1d1d1f]/12 py-4">
            <dt>
              <label htmlFor="ring-notes" className="text-[13px] font-medium uppercase tracking-[0.18em]">
                Notes <span className="font-normal normal-case tracking-normal text-[#1d1d1f]/55">(optional)</span>
              </label>
            </dt>
            <dd>
              <textarea
                id="ring-notes"
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Anything you'd like to change?"
                className={`${input} resize-none`}
              />
            </dd>
          </div>
          <div className="flex items-baseline justify-between py-5">
            <dt className="text-[13px] font-medium uppercase tracking-[0.18em]">Estimated price</dt>
            <dd className={`${productSerif.className} text-[1.15rem]`}>On request</dd>
          </div>
        </dl>

        {!formOpen && (
          <ActionBar note={`${CUSTOM_POLICY.inquiry} We'll confirm the design, diamond and total quote with you before anything is made.`}>
            <PrimaryButton onClick={action.run}>{action.label}</PrimaryButton>
          </ActionBar>
        )}

        {formOpen && <QuoteForm config={config} notes={notes} onSent={setSent} onCancel={() => setFormOpen(false)} />}

        <div className="mt-8 border-t border-[#1d1d1f]/10">
          <Info title="What happens next">
            <ol className="space-y-1.5">
              <li>01 We review your design and source your diamond.</li>
              <li>02 We email your total quote and the diamond details. {PLACEHOLDER.replyTime}</li>
              <li>03 You confirm the final design, specifications, production time and quote, then pay in full. We begin making your ring once payment is received.</li>
              <li>04 We ship your ring as soon as it&rsquo;s ready.</li>
            </ol>
          </Info>
          <Info title="Made to order">
            <p>Every ring is made after you confirm your quote and we receive your payment. {PLACEHOLDER.productionTime}</p>
          </Info>
          <Info title="Payment, cancellation & returns">
            <CustomTerms />
          </Info>
          <Info title="Your diamond">
            <p>Lab-grown diamond with a grading report. {PLACEHOLDER.gradingLab}</p>
          </Info>
        </div>
      </div>
    </section>
  );
}

function Row({ icon, title, sub, price, actions }: { icon: ReactNode; title: string; sub: string; price?: string; actions: ReactNode }) {
  return (
    <div className="flex gap-4 border-b border-[#1d1d1f]/12 py-4">
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center text-[#1d1d1f]/70">{icon}</span>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-4">
          <dt className={`${productSerif.className} text-[1.05rem] leading-snug`}>{title}</dt>
          {price && <dd className="shrink-0 text-[14px] text-[#8a7358]">{price}</dd>}
        </div>
        <dd className="mt-1 text-[14px] leading-[1.6] text-[#1d1d1f]/65">{sub}</dd>
        <dd className="mt-1.5 flex gap-4">{actions}</dd>
      </div>
    </div>
  );
}

function TextButton({ children, onClick }: { children: ReactNode; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="text-[14px] underline underline-offset-4 hover:text-[#1d1d1f]/60">
      {children}
    </button>
  );
}

function RingIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="15" r="6.5" stroke="currentColor" strokeWidth="1" />
      <path d="M9.5 5.5 12 3l2.5 2.5L12 8.5 9.5 5.5Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
    </svg>
  );
}

function Info({ title, children }: { title: string; children: ReactNode }) {
  return (
    <details className="group border-b border-[#1d1d1f]/10">
      <summary className="flex cursor-pointer list-none items-center justify-between py-3.5 text-[13px] font-medium uppercase tracking-[0.2em] [&::-webkit-details-marker]:hidden">
        {title}
        <span aria-hidden className="text-[16px] font-light leading-none">
          <span className="group-open:hidden">+</span>
          <span className="hidden group-open:inline">&minus;</span>
        </span>
      </summary>
      <div className="pb-5 text-[15px] leading-[1.75] text-[#6e6e73]">{children}</div>
    </details>
  );
}

/* ---------------------------------------------------------------- quote form */

function QuoteForm({
  config,
  notes,
  onSent,
  onCancel,
}: {
  config: RingConfig;
  notes: string;
  onSent: (ref: string) => void;
  onCancel: () => void;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setError("");
    const fd = new FormData(e.currentTarget);
    const s = quoteSummary(config);
    fd.set("ring", JSON.stringify(s));
    fd.set("idea", `Engagement ring: ${ringTitle(config)}`);
    fd.set("stone", `${s.shape}, ${s.carat}, lab-grown ${s.colourType.toLowerCase()} — ${s.quality}`);
    fd.set("metal", s.metal);
    if (notes) fd.set("details", notes);
    try {
      const res = await fetch("/api/custom-request", { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      trackEvent("ring_quote_request", { setting: s.setting, shape: s.shape });
      onSent(data.reference || "");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError("Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  return (
    <form onSubmit={submit} className="mt-2 border-t border-[#1d1d1f] pt-6" aria-label="Request a quote">
      <div className="flex items-baseline justify-between">
        <h3 className="text-[13px] font-medium uppercase tracking-[0.24em]">Request a quote</h3>
        <button type="button" onClick={onCancel} className="text-[14px] underline underline-offset-4">
          Back
        </button>
      </div>
      <p className="mt-2 text-[15px] text-[#1d1d1f]/70">For: {ringTitle(config)} · {metalLabel(config.metal)} · {sizeLabel(config.size)}</p>

      <div className="mt-6 grid gap-7 sm:grid-cols-2">
        <Field label="Email" required htmlFor="q-email">
          <input id="q-email" name="email" type="email" required autoComplete="email" className={input} />
        </Field>
        <Field label="Name" htmlFor="q-name">
          <input id="q-name" name="name" autoComplete="name" className={input} />
        </Field>
        <Field label="Phone" htmlFor="q-phone" hint="Prefer a call or text?">
          <input id="q-phone" name="phone" type="tel" autoComplete="tel" className={input} />
        </Field>
        <Field label="Budget" htmlFor="q-budget">
          <select id="q-budget" name="budget" defaultValue="" className={`${input} appearance-none`}>
            <option value="">Not sure</option>
            {BUDGETS.filter((b) => b !== "Not sure").map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </Field>
        <Field label="When do you need it?" htmlFor="q-date" hint="Leave empty if there's no rush.">
          <input id="q-date" name="neededBy" type="date" className={input} />
        </Field>
        <Field label="Reference image" htmlFor="q-ref">
          <label
            htmlFor="q-ref"
            className="flex cursor-pointer items-center justify-between gap-4 border-b border-[#1d1d1f]/25 py-2.5 text-[16px] focus-within:border-[#1d1d1f]"
          >
            <span className={fileName ? "truncate" : "text-[#86868b]"}>{fileName || "JPG, PNG or HEIC, up to 10 MB"}</span>
            <span className="shrink-0 text-[13px] font-medium uppercase tracking-[0.2em]">Choose</span>
            <input
              id="q-ref"
              name="reference"
              type="file"
              accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
              className="sr-only"
              onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
            />
          </label>
        </Field>
      </div>

      {error && (
        <p role="alert" className="mt-6 text-[15px] text-[#b42318]">
          {error}
        </p>
      )}

      <div className="mt-8 border border-[#1d1d1f]/12 bg-white/60 px-4 py-4 text-[14px] leading-[1.6] text-[#1d1d1f]/75">
        <p className="text-[13px] font-medium uppercase tracking-[0.18em] text-[#1d1d1f]">If you go ahead with your quote</p>
        <div className="mt-2">
          <CustomTerms />
        </div>
      </div>

      <div className="mt-6">
        <ActionBar note={`${CUSTOM_POLICY.inquiry} We'll reply by email with your quote.`}>
          <PrimaryButton type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Send My Request"}
          </PrimaryButton>
        </ActionBar>
      </div>
    </form>
  );
}

function Field({ label, required, htmlFor, hint, children }: { label: string; required?: boolean; htmlFor: string; hint?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-[12px] font-medium uppercase tracking-[0.22em] text-[#1d1d1f]/70">
        {label}
        {required && <span aria-hidden> *</span>}
      </label>
      <div className="mt-1">{children}</div>
      {hint && <p className="mt-1.5 text-[13px] text-[#1d1d1f]/55">{hint}</p>}
    </div>
  );
}

/* ---------------------------------------------------------------- sent */

function Sent({ reference, config }: { reference: string; config: RingConfig }) {
  const s = quoteSummary(config);
  return (
    <section className="mx-auto max-w-xl py-6 text-center" aria-live="polite">
      <p className="text-[13px] font-medium uppercase tracking-[0.24em]">Request sent</p>
      <h2 className={`${productSerif.className} mt-4 text-[2rem] leading-tight`}>Thank you.</h2>
      <p className="mt-3 text-[16px] leading-[1.7] text-[#1d1d1f]/70">
        We have your ring details and will reply by email with your quote. {PLACEHOLDER.replyTime}
      </p>
      {reference && (
        <p className="mt-4 text-[15px]">
          Your reference: <span className="font-medium tracking-[0.08em]">{reference}</span>
        </p>
      )}

      <dl className="mx-auto mt-8 max-w-sm border-t border-[#1d1d1f]/12 text-left text-[15px]">
        {(
          [
            ["Setting", s.setting],
            ["Diamond", `${s.shape} · ${s.carat} · ${s.colourType}`],
            ["Quality", s.quality],
            ["Metal", metalLabel(s.metal)],
            ["Ring size", s.size],
          ] as const
        ).map(([k, v]) => (
          <div key={k} className="flex justify-between gap-6 border-b border-[#1d1d1f]/12 py-3">
            <dt className="text-[#1d1d1f]/60">{k}</dt>
            <dd className="text-right">{v}</dd>
          </div>
        ))}
      </dl>

      <div className="mx-auto mt-10 max-w-sm text-left">
        <p className="text-[13px] font-medium uppercase tracking-[0.24em]">What happens next</p>
        <ol className="mt-3 space-y-2 text-[15px] leading-[1.6] text-[#1d1d1f]/75">
          <li>01 We review your design and source your diamond.</li>
          <li>02 We email your total quote and the diamond details.</li>
          <li>03 You confirm the final design, specifications, production time and quote, then pay in full. We begin making your ring once payment is received.</li>
          <li>04 We ship your ring as soon as it&rsquo;s ready.</li>
        </ol>
        <p className="mt-4 text-[14px] leading-[1.6] text-[#1d1d1f]/60">
          {CUSTOM_POLICY.inquiry} {CUSTOM_POLICY.nonRefundable} {CUSTOM_POLICY.finalSale} {CUSTOM_POLICY.rights}
        </p>
      </div>

      <Link
        href="/engagement"
        className="mt-10 inline-block border-b border-[#1d1d1f]/30 pb-1 text-[13px] font-medium uppercase tracking-[0.22em] hover:border-[#1d1d1f]"
      >
        Back to Engagement &amp; Bridal
      </Link>
    </section>
  );
}

/** The custom order terms as a short list, with a link to the full policy. */
function CustomTerms() {
  return (
    <>
      <ul className="list-disc space-y-1 pl-4">
        {CUSTOM_TERMS.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <Link href="/shipping-returns#custom-orders" className="mt-2 inline-block underline underline-offset-4 hover:text-[#1d1d1f]">
        Custom order policy
      </Link>
    </>
  );
}
