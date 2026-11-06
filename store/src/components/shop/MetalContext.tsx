"use client";

import { createContext, useContext, useEffect, useState } from "react";

// The selected metal/color is shared between the gallery (which swaps to that metal's
// photos) and the purchase panel (which holds the swatches). A ?metal= query (set when
// switching shape) opens the page on that metal if the piece offers it. The chosen size
// and carat are shared the same way, so the price at the top can follow sizes or carats
// priced differently.

const Ctx = createContext<{
  metal: string;
  setMetal: (m: string) => void;
  size: string;
  setSize: (s: string) => void;
  carat: string;
  setCarat: (c: string) => void;
}>({
  metal: "",
  setMetal: () => {},
  size: "",
  setSize: () => {},
  carat: "",
  setCarat: () => {},
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
  const [size, setSize] = useState("");
  const [carat, setCarat] = useState("");
  useEffect(() => {
    const wanted = new URLSearchParams(window.location.search).get("metal");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- read once from the URL after hydration
    if (wanted && options.includes(wanted)) setMetal(wanted);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <Ctx.Provider value={{ metal, setMetal, size, setSize, carat, setCarat }}>{children}</Ctx.Provider>;
}

export const useMetal = () => useContext(Ctx);
