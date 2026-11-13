// Limited-time launch sale: 10% off every piece, no code needed. Some pieces carry a deeper
// discount of their own: `salePercentOff` on the catalogue item (e.g. 15% on the halo rings), or
// `caratSalePercentOff` for particular carat weights (e.g. 15% on tennis bracelets from 5 ctw).
// Shared by the announcement bar, every price on the site, the bag, the checkout page and the
// Stripe checkout route, so the maths lives in one place. Catalogue prices stay the original
// prices; the sale is applied on top. Sale prices are rounded down to whole dollars.

import { getCatalogItem } from "./catalog";

export const LAUNCH_SALE = {
  percentOff: 10,
  banner: "Limited-time offer — 10% off sitewide",
} as const;

type SaleTerms = { salePercentOff?: number; caratSalePercentOff?: Record<string, number> };

/** The discount on a piece (for the chosen carat, when it has one): the carat's own discount,
 *  the piece's own discount, or the sitewide 10%. */
export function percentOffFor(item?: SaleTerms | null, carat?: string): number {
  return (carat && item?.caratSalePercentOff?.[carat]) || item?.salePercentOff || LAUNCH_SALE.percentOff;
}

/** The discount on a bag line, from its line id ("<slug>|<initial>|<metal>|<carat>|<size>",
 *  "<slug>|chain|…", "<slug>|<piece>", or an older product id). */
export function percentOffForLine(lineId: string): number {
  const parts = lineId.split("|");
  return percentOffFor(getCatalogItem(parts[0]), parts.length === 5 ? parts[3] : undefined);
}

/** Sale price in whole dollars for an original price in dollars. */
export function salePrice(usd: number, percentOff: number = LAUNCH_SALE.percentOff): number {
  return Math.floor((usd * (100 - percentOff)) / 100);
}

/** Sale price in cents for an original price in cents (bag lines and Stripe). Whole-dollar
 *  prices stay whole dollars; older cent-priced pieces get exactly the discount, rounded. */
export function salePriceCents(cents: number, percentOff: number = LAUNCH_SALE.percentOff): number {
  return cents % 100 === 0
    ? salePrice(cents / 100, percentOff) * 100
    : Math.round((cents * (100 - percentOff)) / 100);
}
