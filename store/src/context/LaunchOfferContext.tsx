"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

// Whether this visitor has entered the launch-offer code. Launch sale prices (src/data/promo.ts)
// are shown only when `unlocked`; everyone else sees the regular prices. A correct code is
// remembered on this device and checked with the server again on each visit, and checkout
// sends it along so the server charges sale prices only with a valid code.

const STORAGE_KEY = "elanora-launch-code";

interface LaunchOffer {
  unlocked: boolean;
  code: string | null;
  /** Checks a typed code; true if it was right (it is then remembered). */
  apply: (code: string) => Promise<boolean>;
  remove: () => void;
}

const LaunchOfferContext = createContext<LaunchOffer>({
  unlocked: false,
  code: null,
  apply: async () => false,
  remove: () => {},
});

async function check(code: string): Promise<boolean> {
  try {
    const res = await fetch("/api/launch-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });
    return res.ok && (await res.json()).ok === true;
  } catch {
    return false;
  }
}

function remember(code: string | null) {
  try {
    if (code) localStorage.setItem(STORAGE_KEY, code);
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    // private browsing: the code lasts for this visit only
  }
}

export function LaunchOfferProvider({ children }: { children: ReactNode }) {
  const [code, setCode] = useState<string | null>(null);

  // A code entered on an earlier visit: check it's still valid before showing sale prices.
  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch {
      return;
    }
    if (!saved) return;
    let live = true;
    check(saved).then((ok) => {
      if (!live) return;
      if (ok) setCode(saved);
      else remember(null);
    });
    return () => {
      live = false;
    };
  }, []);

  const apply = useCallback(async (typed: string) => {
    const clean = typed.replace(/\s+/g, "").toUpperCase();
    if (!clean) return false;
    const ok = await check(clean);
    if (ok) {
      setCode(clean);
      remember(clean);
    }
    return ok;
  }, []);

  const remove = useCallback(() => {
    setCode(null);
    remember(null);
  }, []);

  return (
    <LaunchOfferContext.Provider value={{ unlocked: code !== null, code, apply, remove }}>
      {children}
    </LaunchOfferContext.Provider>
  );
}

export const useLaunchOffer = () => useContext(LaunchOfferContext);
