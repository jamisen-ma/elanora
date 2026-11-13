"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { cormorant as serif } from "@/lib/fonts";
import { useLaunchOffer } from "@/context/LaunchOfferContext";
import { trackEvent } from "@/components/Analytics";

// Home page band under the hero: enter the launch-offer code to see (and pay) launch sale prices
// across the shop. The hero's Explore buttons and the announcement bar link here (#launch-code),
// so visitors can enter the code before they browse. On computers the code field is ready to type
// in on arrival (on phones it isn't focused, so the keyboard doesn't pop up uninvited). Visitors
// who already entered the code skip this box and go straight to Shop by Category.
export default function LaunchCodeBox() {
  const { unlocked, code, apply, remove } = useLaunchOffer();
  const [typed, setTyped] = useState("");
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const unlockedRef = useRef(unlocked);
  useEffect(() => {
    unlockedRef.current = unlocked;
  }, [unlocked]);

  useEffect(() => {
    // Ready to type once the page has scrolled here (smooth scroll), computers only.
    const focusSoon = () => {
      if (!window.matchMedia("(pointer: fine)").matches) return;
      window.setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 650);
    };
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.('a[href$="#launch-code"]');
      if (!link) return;
      if (unlockedRef.current) {
        // Code already entered: skip the box and go straight to the pieces.
        e.preventDefault();
        document.getElementById("popular-styles")?.scrollIntoView({ behavior: "smooth" });
        return;
      }
      focusSoon();
    };
    document.addEventListener("click", onClick, true);
    // Arrived from another page via the announcement bar (/#launch-code).
    if (window.location.hash === "#launch-code") focusSoon();
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!typed.trim() || checking) return;
    setChecking(true);
    setError("");
    const ok = await apply(typed);
    setChecking(false);
    if (ok) {
      setTyped("");
      trackEvent("launch_code_applied");
    } else {
      setError("That code isn't right. Check the spelling and try again.");
    }
  };

  return (
    <section
      id="launch-code"
      aria-labelledby="launch-code-heading"
      className="scroll-mt-24 bg-[#faf7f3] px-6 py-10 text-center text-[#1d1d1f] sm:py-12"
    >
      <div className="mx-auto max-w-[560px]">
        <h2 id="launch-code-heading" className="text-[13px] font-medium uppercase tracking-[0.32em] text-[#1d1d1f]/70">
          Launch Offer
        </h2>

        {unlocked ? (
          <>
            <p className={`${serif.className} mt-4 text-balance text-[1.75rem] leading-[1.15] sm:text-[2rem]`}>
              Your launch prices are on.
            </p>
            <p className="mt-3 text-[15px] text-[#1d1d1f]/70" role="status">
              Code <span className="font-medium text-[#1d1d1f]">{code}</span> is applied — sale prices now show across
              the shop and at checkout.
            </p>
            <div className="mt-6 flex items-center justify-center gap-6">
              <a
                href="#popular-styles"
                className="inline-flex h-11 items-center bg-[#1d1d1f] px-7 text-[13px] font-medium uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#8a7358]"
              >
                Shop now
              </a>
              <button
                type="button"
                onClick={remove}
                className="text-[13px] text-[#1d1d1f]/60 underline underline-offset-4 hover:text-[#1d1d1f]"
              >
                Remove code
              </button>
            </div>
          </>
        ) : (
          <>
            <p className={`${serif.className} mt-4 text-balance text-[1.75rem] leading-[1.15] sm:text-[2rem]`}>
              Up to 25% off, for a limited time.
            </p>
            <p className="mt-3 text-[15px] text-[#1d1d1f]/70">Enter your launch code to see sale prices across the shop.</p>
            <form onSubmit={submit} className="mx-auto mt-6 flex max-w-[420px] gap-2">
              <label htmlFor="launch-code-input" className="sr-only">
                Launch code
              </label>
              <input
                ref={inputRef}
                id="launch-code-input"
                value={typed}
                onChange={(e) => {
                  setTyped(e.target.value);
                  setError("");
                }}
                placeholder="Enter code"
                autoComplete="off"
                autoCapitalize="characters"
                spellCheck={false}
                aria-invalid={!!error}
                aria-describedby={error ? "launch-code-error" : undefined}
                className="h-11 min-w-0 flex-1 border border-[#1d1d1f]/20 bg-white px-4 text-[15px] uppercase tracking-[0.08em] placeholder:normal-case placeholder:tracking-normal placeholder:text-[#1d1d1f]/40 focus:border-[#1d1d1f] focus:outline-none"
              />
              <button
                type="submit"
                disabled={checking || !typed.trim()}
                className="h-11 shrink-0 bg-[#1d1d1f] px-6 text-[13px] font-medium uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#8a7358] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {checking ? "Checking…" : "Apply"}
              </button>
            </form>
            <p id="launch-code-error" role="alert" className="mt-2 min-h-[1.25rem] text-[13px] text-[#9a4a2b]">
              {error}
            </p>
          </>
        )}
      </div>
    </section>
  );
}
