"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { trackEvent } from "@/components/Analytics";

// "Start your custom piece" button that opens a short inquiry form in place.
// Only email and "what would you like to make?" are required.

const input =
  "w-full border-0 border-b border-[#1d1d1f]/25 bg-transparent px-0 py-2.5 text-[14px] text-[#1d1d1f] placeholder:text-[#86868b] focus:border-[#1d1d1f] focus:outline-none focus:ring-0";

export default function CustomRequest() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (open) formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [open]);

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
    <section aria-label="Custom request" className="px-6 pb-24 text-center sm:pb-28 lg:pb-32">
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="bg-[#1d1d1f] px-10 py-4 text-[11px] font-medium uppercase tracking-[0.22em] text-white transition-opacity hover:opacity-85"
        >
          Start your custom piece
        </button>
      )}

      {open && status === "sent" && (
        <div className="mx-auto max-w-md scroll-mt-28">
          <p ref={doneRef} tabIndex={-1} className="text-[11px] font-medium uppercase tracking-[0.24em] outline-none">
            Request sent
          </p>
          <p className="mt-4 text-[14px] leading-[1.7] text-[#1d1d1f]/70">
            Thank you. We&rsquo;ll reply by email to talk through your piece.
          </p>
        </div>
      )}

      {open && status !== "sent" && (
        <form ref={formRef} onSubmit={submit} className="mx-auto max-w-xl scroll-mt-28 text-left">
          <h2 className="text-center text-[11px] font-medium uppercase tracking-[0.32em]">Your custom piece</h2>

          <div className="mt-12 grid gap-9 sm:grid-cols-2 sm:gap-x-10">
            <Field label="Name" htmlFor="cr-name">
              <input id="cr-name" name="name" autoComplete="name" className={input} />
            </Field>
            <Field label="Email" htmlFor="cr-email" required>
              <input id="cr-email" name="email" type="email" required autoComplete="email" className={input} />
            </Field>
          </div>

          <div className="mt-9 grid gap-9">
            <Field label="What would you like to make?" htmlFor="cr-idea" required>
              <textarea
                id="cr-idea"
                name="idea"
                required
                rows={3}
                placeholder="For example: the Oval Solitaire in yellow gold, with a bigger stone."
                className={`${input} resize-none`}
              />
            </Field>

            <Field label="Upload a reference image" htmlFor="cr-ref">
              <label
                htmlFor="cr-ref"
                className="flex cursor-pointer items-center justify-between gap-4 border-b border-[#1d1d1f]/25 py-2.5 text-[14px] focus-within:border-[#1d1d1f]"
              >
                <span className={fileName ? "truncate text-[#1d1d1f]" : "text-[#86868b]"}>
                  {fileName || "JPG, PNG or HEIC, up to 10 MB"}
                </span>
                <span className="shrink-0 text-[11px] font-medium uppercase tracking-[0.2em]">Choose file</span>
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
          </div>

          <div className="mt-9 grid gap-9 sm:grid-cols-2 sm:gap-x-10">
            <Field label="Diamond / gemstone preference" htmlFor="cr-stone">
              <input id="cr-stone" name="stone" placeholder="For example: oval diamond, about 2 ct" className={input} />
            </Field>
            <Field label="Metal preference" htmlFor="cr-metal">
              <select id="cr-metal" name="metal" defaultValue="" className={`${input} appearance-none`}>
                <option value="">Not sure yet</option>
                <option>Platinum</option>
                <option>Yellow gold</option>
                <option>White gold</option>
                <option>Rose gold</option>
              </select>
            </Field>
            <Field label="Budget" htmlFor="cr-budget">
              <input id="cr-budget" name="budget" placeholder="For example: $3,000" className={input} />
            </Field>
          </div>

          <div className="mt-9">
            <Field label="Additional details" htmlFor="cr-details">
              <textarea
                id="cr-details"
                name="details"
                rows={3}
                placeholder="Ring size, timing, or anything else."
                className={`${input} resize-none`}
              />
            </Field>
          </div>

          {error && (
            <p role="alert" className="mt-8 text-center text-[13px] text-[#b42318]">
              {error}
            </p>
          )}

          <div className="mt-12 text-center">
            <button
              type="submit"
              disabled={status === "sending"}
              className="bg-[#1d1d1f] px-10 py-4 text-[11px] font-medium uppercase tracking-[0.22em] text-white transition-opacity hover:opacity-85 disabled:opacity-50"
            >
              {status === "sending" ? "Sending…" : "Submit request"}
            </button>
            <p className="mt-5 text-[12px] text-[#86868b]">* Required</p>
          </div>
        </form>
      )}
    </section>
  );
}

function Field({ label, htmlFor, required, children }: { label: string; htmlFor: string; required?: boolean; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-[10px] font-medium uppercase tracking-[0.22em] text-[#1d1d1f]/70">
        {label}
        {required && <span aria-hidden> *</span>}
      </label>
      <div className="mt-1">{children}</div>
    </div>
  );
}
