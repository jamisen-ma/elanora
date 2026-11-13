import { formatUSD, hasSinglePrice, type CatalogItem } from "@/data/catalog";
import { percentOffFor, salePrice } from "@/data/promo";

// A price during the launch sale: the sale price in a warm red, the original price struck through
// in grey, then a small "10% OFF" tag (or the series' own discount), all in the site sans (Optima).
export function SalePrice({ usd, percentOff = percentOffFor() }: { usd: number; percentOff?: number }) {
  return (
    <span className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 font-sans tracking-normal">
      <span className="text-[1.1em] font-normal text-[#9a4a2b]">
        <span className="sr-only">Sale price </span>
        {formatUSD(salePrice(usd, percentOff))}
      </span>
      <s className="font-normal text-[#86868b]">
        <span className="sr-only">Original price </span>
        {formatUSD(usd)}
      </s>
      <SaleTag percentOff={percentOff} />
    </span>
  );
}

export function SaleTag({ percentOff }: { percentOff: number }) {
  return (
    <span className="rounded-[3px] bg-[#3f5560] px-1.5 py-[0.3em] font-sans text-[0.7em] font-medium uppercase leading-none tracking-[0.06em] text-white">
      {percentOff}% off
    </span>
  );
}

// What one price buys, when it isn't the whole piece (e.g. "single earring"), after the price.
export function PriceUnit({ unit }: { unit?: string }) {
  return unit ? <span className="text-[0.8em] text-[#86868b]">({unit})</span> : null;
}

// The "From $…" price on cards and at the top of product pages, with the sale applied.
export function FromSalePrice({ item }: { item: CatalogItem }) {
  if (item.customName) return <>Price on request</>;
  if (item.price === null) return <>From $[PRICE]</>;
  const single = hasSinglePrice(item);
  return (
    <span className="inline-flex flex-wrap items-center justify-center gap-x-2">
      {!single && <span>From</span>}
      <SalePrice usd={item.price} percentOff={percentOffFor(item, item.carats?.[0])} />
      <PriceUnit unit={item.priceUnit} />
    </span>
  );
}
