"use client";

import { useState } from "react";
import Link from "next/link";
import type { CatalogItem } from "@/data/catalog";
import { CUSTOM_POLICY } from "@/data/customOrderPolicy";
import { trackEvent } from "@/components/Analytics";

// Quote request for personalised pieces (e.g. the Custom Name Necklace): the customer types
// the name, picks metal and chain length above, leaves an email, and we reply with a quote.
// Sent through the custom-request inbox, so it gets an ECJ reference like other custom work.

const NAME_PATTERN = /^[A-Za-z][A-Za-z '\-]*$/; // [allowed characters — to be confirmed]

const input =
  "h-10 w-full border border-[#1d1d1f]/25 bg-white px-3 text-[15px] placeholder:text-[#1d1d1f]/40 focus:border-[#1d1d1f] focus:outline-none";

export default function NameQuote({ item, metal, size }: { item: CatalogItem; metal: string; size: string }) {
  const maxLength = item.customName?.maxLength ?? 12;
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");

  const cleanName = name.trim();
  const nameOk = cleanName.length > 0 && NAME_PATTERN.test(cleanName);
  const ready = nameOk && (!item.sizes?.length || !!size);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!ready || status === "sending") return;
    setStatus("sending");
    setError("");
    const form = new FormData(e.currentTarget);
    form.set("itemType", item.name);
    form.set("product", item.slug);
    form.set("idea", `${item.name}: "${cleanName}"`);
    form.set("metal", metal);
    const notes = String(form.get("notes") ?? "").trim();
    form.set("details", [`Name: ${cleanName}`, size && `Chain length: ${size}`, notes && `Notes: ${notes}`].filter(Boolean).join("\n"));
    form.delete("notes");
    try {
      const res = await fetch("/api/custom-request", { method: "POST", body: form });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setReference(data.reference ?? "");
      setStatus("sent");
      trackEvent("custom_request");
    } catch {
      setError("Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="mt-3 border border-[#1d1d1f]/15 bg-[#faf7f3] px-4 py-4 text-[15px] leading-[1.6]" role="status">
        <p className="font-medium">Thank you — your request is in.</p>
        <p className="mt-1 text-[#1d1d1f]/75">
          We&rsquo;ll email your quote for &ldquo;{cleanName}&rdquo; soon.
          {reference && (
            <>
              {" "}
              Your reference is <span className="font-medium text-[#1d1d1f]">{reference}</span>.
            </>
          )}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="pt-3">
      <label htmlFor="custom-name" className="flex items-baseline justify-between text-[15px] leading-tight">
        <span>Name on Necklace</span>
        <span className="text-[13px] text-[#1d1d1f]/50">
          {cleanName.length}/{maxLength}
        </span>
      </label>
      <input
        id="custom-name"
        value={name}
        maxLength={maxLength}
        onChange={(e) => setName(e.target.value)}
        placeholder="e.g. Elanora"
        autoComplete="off"
        required
        className={`${input} mt-1.5`}
      />
      {cleanName && !nameOk && <p className="mt-1 text-[13px] text-[#a0493c]">Letters only, please.</p>}

      <div className="mt-3 grid grid-cols-2 gap-3">
        <div className="col-span-2">
          <label htmlFor="quote-email" className="text-[15px] leading-tight">
            Email
          </label>
          <input id="quote-email" name="email" type="email" required autoComplete="email" className={`${input} mt-1.5`} />
        </div>
        <div>
          <label htmlFor="quote-name" className="text-[15px] leading-tight">
            Full name <span className="text-[#1d1d1f]/50">(optional)</span>
          </label>
          <input id="quote-name" name="name" autoComplete="name" className={`${input} mt-1.5`} />
        </div>
        <div>
          <label htmlFor="quote-phone" className="text-[15px] leading-tight">
            Phone <span className="text-[#1d1d1f]/50">(optional)</span>
          </label>
          <input id="quote-phone" name="phone" type="tel" autoComplete="tel" className={`${input} mt-1.5`} />
        </div>
        <div className="col-span-2">
          <label htmlFor="quote-notes" className="text-[15px] leading-tight">
            Notes <span className="text-[#1d1d1f]/50">(optional)</span>
          </label>
          <textarea
            id="quote-notes"
            name="notes"
            rows={2}
            placeholder="Date you need it by, gift message, anything else"
            className={`${input} mt-1.5 h-auto py-2`}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={!ready || status === "sending"}
        className="mt-3 h-11 w-full bg-[#8a7358] text-[14px] font-medium uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#75604a] disabled:cursor-not-allowed disabled:bg-[#8a7358]/45"
      >
        {status === "sending" ? "Sending…" : "Request a Quote"}
      </button>
      {error && (
        <p className="mt-2 text-[14px] text-[#a0493c]" role="alert">
          {error}
        </p>
      )}
      <p className="mt-2 text-[14px] leading-[1.6] text-[#1d1d1f]/70">
        Made to order with your name. We&rsquo;ll email your price after you send your details. {CUSTOM_POLICY.inquiry}{" "}
        <Link href="/shipping-returns#custom-orders" className="underline underline-offset-2 hover:text-[#1d1d1f]">
          Custom order terms
        </Link>
      </p>
    </form>
  );
}
