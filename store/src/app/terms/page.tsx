import type { Metadata } from "next";
import PolicyPage, { POLICY_EMAIL, type PolicySection } from "@/components/PolicyPage";
import { CUSTOM_POLICY, CUSTOM_TERMS, SALE_POLICY } from "@/data/customOrderPolicy";

export const metadata: Metadata = {
  title: "Terms of Sale",
  description: "The terms that apply when you order from Elanora: made-to-order pieces, payment, shipping and order policy.",
};

const sections: PolicySection[] = [
  {
    title: "Made to Order",
    id: "made-to-order",
    blocks: [
      "Every Elanora piece is made to order for you after you place your order.",
      SALE_POLICY.production,
    ],
  },
  {
    title: "Placing Your Order",
    id: "final-approval",
    blocks: [
      "Before you order, please check every detail carefully, including:",
      {
        list: [
          "Metal type and color",
          "Carat weight and stone options",
          "Ring size or chain / bracelet length",
          "The spelling of any initials, names or other personalized details",
        ],
      },
      "Placing your order confirms these details and authorizes us to start making your piece. Once production has started, changes may not be possible.",
      `Not sure about a size or option? Email ${POLICY_EMAIL} before you order and we'll help you choose.`,
    ],
  },
  {
    title: "Prices & Payment",
    blocks: [
      "Prices are in US dollars. Payment is taken in full at checkout through Stripe. Applicable taxes are shown at checkout.",
      "If a price is shown incorrectly because of an error, we'll contact you before making your piece and you can choose to go ahead at the correct price or receive a full refund.",
    ],
  },
  {
    title: "Offers & Promo Codes",
    blocks: [
      "Sale prices and promo codes apply only while the offer runs, and we may end or change an offer at any time. One promo code per order; offers can't be combined unless we say so.",
    ],
  },
  {
    title: "Cancellations, Returns & Exchanges",
    id: "cancellations",
    blocks: [SALE_POLICY.noCancel, SALE_POLICY.noReturns],
  },
  {
    title: "Diamond Certification",
    blocks: [SALE_POLICY.certificate],
  },
  {
    title: "Final Inspection",
    blocks: [SALE_POLICY.preview],
  },
  {
    title: "Shipping & Delivery",
    blocks: [
      "We ship to the US, Canada, the UK and Australia. Shipping within the US is free when you join Elanora with your email at checkout; shipping to other countries is priced by destination.",
      "Every order ships with tracking. Please make sure your shipping address is correct: if a parcel is returned to us or lost because of an incorrect address, the cost of sending it again is yours.",
      "Delivery can be delayed by customs, carriers, weather or holidays, which are outside our control. If your tracking shows no progress or your parcel is marked delivered but hasn't arrived, contact us and we'll help you with the carrier.",
      "International orders may be subject to customs duties and import taxes, which are paid by the customer.",
    ],
  },
  {
    title: "Quality Concerns",
    blocks: [SALE_POLICY.quality],
  },
  {
    title: "Custom Orders",
    blocks: [
      `Pieces designed with us (including Design Your Ring) follow our custom order terms. ${CUSTOM_POLICY.inquiry}`,
      { list: [...CUSTOM_TERMS] },
    ],
  },
  {
    title: "Product Images",
    blocks: [
      "We make every effort to show our pieces accurately. Because each piece is made by hand and screens differ, the finished piece may vary slightly in color, sparkle and proportion from the photos.",
    ],
  },
  {
    title: "Customer Photos & Reviews",
    blocks: [
      "We won't publicly use photos, videos or reviews you send us without asking for your permission first.",
    ],
  },
  {
    title: "Privacy",
    blocks: ["How we handle your personal information is explained in our Privacy Policy."],
  },
  {
    title: "Changes to These Terms",
    blocks: [
      "We may update these terms from time to time. The terms in place when you placed your order apply to that order.",
    ],
  },
  {
    title: "Contact Us",
    blocks: [`Questions about an order or these terms? Email ${POLICY_EMAIL}.`],
  },
];

export default function TermsPage() {
  return (
    <PolicyPage
      title="Terms of Sale"
      updated="November 14, 2026"
      intro={[
        "These terms apply when you order from Elanora. Please read them before placing your order. By placing an order, you agree to them.",
      ]}
      sections={sections}
    />
  );
}
