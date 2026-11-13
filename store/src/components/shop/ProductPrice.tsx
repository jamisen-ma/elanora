"use client";

import { optionPrice, type CatalogItem } from "@/data/catalog";
import { FromSalePrice, PriceUnit, SalePrice } from "@/components/SalePrice";
import { percentOffFor } from "@/data/promo";
import { useMetal } from "./MetalContext";

// Price at the top of the product page: "From $…" until a size is chosen; for pieces whose
// sizes are priced differently (sizePrices), the chosen size's price after that. Pieces priced
// by centre-diamond carat (caratPrices, or metal + carat via metalCaratPrices) show the selected
// option's price (the first carat by default). During the launch sale the original price is
// struck through beside the sale price.
export default function ProductPrice({ item }: { item: CatalogItem }) {
  const { metal, size, carat } = useMetal();
  const chosen =
    item.caratPrices || item.metalCaratPrices || item.metalPrices
      ? optionPrice(item, metal, carat || item.carats?.[0] || "", size)
      : size
        ? item.sizePrices?.[size]
        : undefined;
  return chosen !== undefined && chosen !== null ? (
    <span className="inline-flex flex-wrap items-center gap-x-2">
      <SalePrice usd={chosen} percentOff={percentOffFor(item, carat || item.carats?.[0])} />
      <PriceUnit unit={item.priceUnit} />
    </span>
  ) : (
    <FromSalePrice item={item} />
  );
}
