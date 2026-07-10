"use client";

import { useState } from "react";
import { trackEvent } from "@/components/Analytics";

interface WaitlistFormProps {
  variant?: "hero" | "bottom" | "product";
}

const PROMO_CODE = "FOUNDING30";

export default function WaitlistForm({ variant = "hero" }: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(PROMO_CODE);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const input = document.createElement("input");
      input.value = PROMO_CODE;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === "loading") return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");

      // Track signup event with source info
      const utm = JSON.parse(sessionStorage.getItem("elanora_utm") || "{}");
      const referrer = sessionStorage.getItem("elanora_referrer") || "direct";
      trackEvent("waitlist_signup", {
        variant,
        referrer,
        ...utm,
      });
    } catch {
      setErrorMsg("Unable to connect. Please try again.");
      setStatus("error");
    }
  };

  // Success state — show promo code
  if (status === "success") {
    const isDark = variant === "bottom" || variant === "hero";

    return (
      <div className={`text-center max-w-md mx-auto ${isDark ? "" : ""}`}>
        <div className="inline-flex items-center gap-2 mb-3">
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24" className="text-gold">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className={`text-sm font-medium ${isDark ? "text-white" : "text-foreground"}`}>
            You&apos;re on the Founding Members list!
          </span>
        </div>

        <p className={`text-sm mb-4 ${isDark ? "text-white/60" : "text-warm-gray"}`}>
          Here&apos;s your exclusive 30% off code for launch day:
        </p>

        {/* Promo code display */}
        <div
          className={`inline-flex items-center gap-3 px-6 py-3 rounded-sm border-2 border-dashed mb-3 ${
            isDark ? "border-gold/50 bg-white/5" : "border-gold/40 bg-cream"
          }`}
        >
          <span
            className={`text-lg sm:text-xl font-mono font-semibold tracking-[0.15em] ${
              isDark ? "text-gold-light" : "text-gold"
            }`}
          >
            {PROMO_CODE}
          </span>
          <button
            onClick={copyCode}
            className={`text-xs uppercase tracking-wide px-3 py-1.5 rounded-sm transition-colors ${
              copied
                ? isDark
                  ? "bg-gold text-white"
                  : "bg-gold text-white"
                : isDark
                ? "bg-white/10 text-white/70 hover:bg-white/20"
                : "bg-foreground/10 text-foreground/70 hover:bg-foreground/20"
            }`}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        <p className={`text-xs ${isDark ? "text-white/40" : "text-warm-gray-light"}`}>
          Save this code — use it when the collection drops August 20, 2026.
        </p>
      </div>
    );
  }

  // Product variant (light background, inline)
  if (variant === "product") {
    return (
      <div>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            required
            className="flex-1 bg-white border border-cream-dark text-foreground placeholder:text-warm-gray-light text-sm px-4 py-3 focus:outline-none focus:border-gold transition-colors"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="bg-foreground text-white text-xs tracking-[0.15em] uppercase px-6 py-3 hover:bg-gold transition-colors disabled:opacity-60 whitespace-nowrap"
          >
            {status === "loading" ? "Joining..." : "Get 30% Off"}
          </button>
        </form>
        {status === "error" && (
          <p className="text-sm text-red-500 mt-2">{errorMsg}</p>
        )}
      </div>
    );
  }

  // Bottom variant (dark background)
  if (variant === "bottom") {
    return (
      <div>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            required
            className="flex-1 bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-sm px-4 py-3.5 rounded-sm focus:outline-none focus:border-gold-light transition-colors"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="bg-gold text-white text-sm tracking-[0.15em] uppercase px-6 py-3.5 rounded-sm hover:bg-gold-light transition-colors disabled:opacity-60"
          >
            {status === "loading" ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Joining...
              </span>
            ) : (
              "Get 30% Off"
            )}
          </button>
        </form>
        {status === "error" && (
          <p className="text-sm text-red-400 mt-2 text-center">{errorMsg}</p>
        )}
      </div>
    );
  }

  // Hero variant (over dark background/image)
  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="flex-1 bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-sm px-5 py-3.5 focus:outline-none focus:border-gold-light transition-colors backdrop-blur-sm"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="bg-gold text-white text-sm tracking-[0.15em] uppercase px-7 py-3.5 hover:bg-gold-light transition-colors disabled:opacity-60 whitespace-nowrap"
        >
          {status === "loading" ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Joining...
            </span>
          ) : (
            "Get 30% Off"
          )}
        </button>
      </form>
      {status === "error" && (
        <p className="text-sm text-red-400 mt-2">{errorMsg}</p>
      )}
    </div>
  );
}
