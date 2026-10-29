"use client";

import { useState } from "react";
import { trackEvent } from "@/components/Analytics";

interface WaitlistFormProps {
  variant?: "hero" | "bottom";
}

export default function WaitlistForm({ variant = "hero" }: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
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

  // Success state
  if (status === "success") {
    return (
      <div className="mx-auto max-w-md text-center">
        <p className="text-sm font-medium text-foreground">You&apos;re on the list.</p>
        <p className="mt-2 text-sm text-warm-gray">Look out for new pieces and notes from Elanora.</p>
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
              "Sign Up"
            )}
          </button>
        </form>
        {status === "error" && (
          <p className="text-sm text-red-400 mt-2 text-center">{errorMsg}</p>
        )}
      </div>
    );
  }

  // Hero variant (light background)
  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="flex-1 bg-white border border-cream-dark text-foreground placeholder:text-warm-gray-light text-sm px-5 py-3.5 rounded-sm focus:outline-none focus:border-gold transition-colors shadow-sm"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="bg-foreground text-white text-sm tracking-[0.15em] uppercase px-7 py-3.5 rounded-sm hover:bg-gold transition-colors disabled:opacity-60 whitespace-nowrap shadow-sm"
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
            "Sign Up"
          )}
        </button>
      </form>
      {status === "error" && (
        <p className="text-sm text-red-500 mt-2">{errorMsg}</p>
      )}
    </div>
  );
}
