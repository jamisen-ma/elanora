"use client";

import { formatUSD, fromPrice, optionPrice, type CatalogItem } from "@/data/catalog";
import { useMetal } from "./MetalContext";

// Price at the top of the product page: "From $…" until a size is chosen; for pieces whose
// sizes are priced differently (sizePrices), the chosen size's price after that. Pieces priced
// by centre-diamond carat (caratPrices, or metal + carat via metalCaratPrices) show the selected
// option's price (the first carat by default).
export default function ProductPrice({ item }: { item: CatalogItem }) {
  const { metal, size, carat } = useMetal();
  const chosen =
    item.caratPrices || item.metalCaratPrices || item.metalPrices
      ? optionPrice(item, metal, carat || item.carats?.[0] || "", size)
      : size
        ? item.sizePrices?.[size]
        : undefined;
  return <>{chosen !== undefined && chosen !== null ? formatUSD(chosen) : fromPrice(item)}</>;
}
