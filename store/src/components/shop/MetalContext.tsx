"use client";

import { createContext, useContext, useEffect, useState } from "react";

// The selected metal/color is shared between the gallery (which swaps to that metal's
// photos) and the purchase panel (which holds the swatches). A ?metal= query (set when
// switching shape) opens the page on that metal if the piece offers it.

const Ctx = createContext<{ metal: string; setMetal: (m: string) => void }>({
  metal: "",
  setMetal: () => {},
});

export function MetalProvider({
  initial,
  options = [],
  children,
}: {
  initial: string;
  options?: string[];
  children: React.ReactNode;
}) {
  const [metal, setMetal] = useState(initial);
  useEffect(() => {
    const wanted = new URLSearchParams(window.location.search).get("metal");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- read once from the URL after hydration
    if (wanted && options.includes(wanted)) setMetal(wanted);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <Ctx.Provider value={{ metal, setMetal }}>{children}</Ctx.Provider>;
}

export const useMetal = () => useContext(Ctx);
