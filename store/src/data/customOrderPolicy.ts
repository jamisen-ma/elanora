// Custom order terms, worded once and shown everywhere they apply: the custom page and its
// inquiry form, Design Your Ring (summary, quote form, confirmation), product pages of ring
// settings, the FAQ and Shipping & Returns. Change the wording here, not on the pages.
//
// Rules: an inquiry is free and is not an order. After the customer confirms the final
// design, specifications, production time and total quote, the full price is paid and work
// starts once it is received (changed from a 50% deposit on 2026-10-29). Payment is
// non-refundable except where the law requires a refund or Elanora cannot fulfill the order.
// Nothing more is due before shipment. Custom pieces are final sale (no standard 30-day return or exchange), without affecting rights
// regarding a confirmed quality issue or under applicable law.
// Standard (non-custom) returns and exchanges are on /shipping-returns and are unchanged.

export const CUSTOM_POLICY = {
  inquiry: "Sending a request is free and does not place an order.",
  payment:
    "Once you confirm the final design, specifications, production time and total quote, full payment is due. We begin making your piece after we receive it.",
  nonRefundable:
    "Payment is non-refundable once made, except where a refund is required by law or Elanora cannot fulfill your order.",
  shipping: "Nothing more is due — we ship your piece as soon as it’s ready.",
  finalSale:
    "Custom pieces are final sale and are not eligible for our standard 30-day returns or exchanges.",
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
