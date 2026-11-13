// Custom order terms, worded once and shown everywhere they apply: the custom page and its
// inquiry form, Design Your Ring (summary, quote form, confirmation), product pages of ring
// settings, the FAQ and Shipping & Returns. Change the wording here, not on the pages.
//
// Rules: an inquiry is free and is not an order. After the customer confirms the final
// design, specifications, production time and total quote, the full price is paid and work
// starts once it is received (changed from a 50% deposit on 2026-10-29). Payment is
// non-refundable except where the law requires a refund or Elanora cannot fulfill the order.
// Nothing more is due before shipment. Custom pieces are final sale, without affecting rights
// regarding a confirmed quality issue or under applicable law.
// Every piece in the shop is also made to order, so no piece can be returned or exchanged
// (user, 2026-11-14). Repairs for damaged or faulty pieces are not described for now (user, 2026-11-14).

export const CUSTOM_POLICY = {
  inquiry: "Sending a request is free and does not place an order.",
  payment:
    "Once you confirm the final design, specifications, production time and total quote, full payment is due. We begin making your piece after we receive it.",
  nonRefundable:
    "Payment is non-refundable once made, except where a refund is required by law or Elanora cannot fulfill your order.",
  shipping: "Nothing more is due — we ship your piece as soon as it’s ready.",
  finalSale:
    "Custom pieces are final sale and cannot be returned or exchanged.",
  rights: "This does not affect your rights regarding a confirmed quality issue or under applicable law.",
} as const;

/** The terms a customer agrees to when paying, in order. */
export const CUSTOM_TERMS = [
  CUSTOM_POLICY.payment,
  CUSTOM_POLICY.nonRefundable,
  CUSTOM_POLICY.shipping,
  CUSTOM_POLICY.finalSale,
  CUSTOM_POLICY.rights,
] as const;

/** Everything in one paragraph, for short notices under a form. */
export const CUSTOM_TERMS_TEXT = [CUSTOM_POLICY.inquiry, ...CUSTOM_TERMS].join(" ");

// Every piece is made to order for its customer, so the shop takes no returns or exchanges and
// orders cannot be cancelled (user, 2026-11-14). Shown on product pages, the FAQ, Shipping & Returns
// and the Terms. Change the wording here, not on the pages.
export const SALE_POLICY = {
  noReturns:
    "Every Elanora piece is made to order just for you, so we can't accept returns or exchanges. Please check your size, metal and options before ordering.",
  noCancel:
    "Orders can't be cancelled once placed: we start preparing materials and production for your piece as soon as you order.",
  production:
    "Production takes 2–8 weeks. This is an estimate: more detailed pieces can take longer, and we'll email you if your piece needs more time.",
  certificate: "Every Elanora diamond comes with an IGI certificate.",
  preview: "Before your piece ships, we inspect it and send you photos or a short video of the finished piece.",
  // Quality concerns are reviewed, with no promised outcome (user, 2026-11-14).
  quality:
    "If you believe your piece has a manufacturing issue, email us photos or a video and we'll review it. Any solution is decided case by case.",
} as const;
