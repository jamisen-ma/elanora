"use client";

import { useState, useEffect } from "react";

interface WaitlistFormProps {
  variant?: "hero" | "bottom";
}

export default function WaitlistForm({ variant = "hero" }: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [alreadyJoined, setAlreadyJoined] = useState(false);

  useEffect(() => {
    const joined = localStorage.getItem("elanora-waitlist-joined");
    if (joined) setAlreadyJoined(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === "loading") return;

    setStatus("loading");

    // Simulate a brief delay for UX (replace with real API call)
    // TODO: Connect to your email service (Mailchimp, Formspree, etc.)
    // Example: await fetch("https://formspree.io/f/YOUR_ID", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ email }),
    // });
    await new Promise((resolve) => setTimeout(resolve, 800));

    localStorage.setItem("elanora-waitlist-joined", "true");
    localStorage.setItem("elanora-waitlist-email", email);
    setStatus("success");
    setAlreadyJoined(true);
  };

  if (alreadyJoined || status === "success") {
    return (
      <div className={`text-center ${variant === "bottom" ? "text-white" : ""}`}>
        <div className="inline-flex items-center gap-2 mb-2">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" className="text-gold">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className={`text-sm font-medium ${variant === "bottom" ? "text-white" : "text-foreground"}`}>
            You&apos;re on the list!
          </span>
        </div>
        <p className={`text-sm ${variant === "bottom" ? "text-white/60" : "text-warm-gray"}`}>
          We&apos;ll notify you before anyone else when we launch.
        </p>
      </div>
    );
  }

  if (variant === "bottom") {
    return (
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
            "Join the Waitlist"
          )}
        </button>
      </form>
    );
  }

  // Hero variant
  return (
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
          "Get Early Access"
        )}
      </button>
    </form>
  );
}
