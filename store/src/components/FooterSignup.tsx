"use client";

import { useState } from "react";
import { trackEvent } from "@/components/Analytics";

// Minimal email signup for the footer. Uses the same /api/waitlist endpoint as the
// rest of the site, so signups land in the same list.
export default function FooterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === "loading") return;
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("success");
      trackEvent("waitlist_signup", { variant: "footer" });
    } catch {
      setError("Unable to connect. Please try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return <p className="text-[13px] text-[#1d1d1f]">You&rsquo;re on the list. Check your inbox.</p>;
  }

  return (
    <form onSubmit={submit} className="w-full max-w-sm">
      <label htmlFor="footer-email" className="sr-only">
        Email address
      </label>
      <div className="flex items-end gap-4 border-b border-[#1d1d1f]/25 focus-within:border-[#1d1d1f]">
        <input
          id="footer-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          className="min-w-0 flex-1 bg-transparent py-2.5 text-[13px] text-[#1d1d1f] placeholder:text-[#86868b] focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="pb-2.5 text-[11px] font-medium uppercase tracking-[0.2em] text-[#1d1d1f] disabled:opacity-50"
        >
          {status === "loading" ? "…" : "Sign Up"}
        </button>
      </div>
      {status === "error" && <p className="mt-2 text-[12px] text-[#b42318]">{error}</p>}
    </form>
  );
}
