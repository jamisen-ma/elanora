import type { Metadata } from "next";
import PolicyPage, { POLICY_EMAIL, type PolicySection } from "@/components/PolicyPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Elanora collects, uses, shares and protects your personal information.",
};

// Written for what the site actually does (2026-11-14): Stripe checkout, Vercel hosting and
// analytics, a Postgres analytics/order store, Gmail for request and welcome emails, an IP-hash
// visitor id (no tracking cookies), UTM/referrer kept in session storage.
const sections: PolicySection[] = [
  {
    title: "Information We Collect",
    blocks: [
      "Depending on how you use our site, we may collect:",
      {
        list: [
          "Contact details: your name, email address and phone number",
          "Shipping and billing addresses",
          "Order details: the pieces you buy and the options you choose (metal, carat, size, initials or names)",
          "Custom requests: your design ideas, notes, and any photos you upload",
          "Your email address when you join Elanora for free shipping or sign up for our emails",
          "Messages you send us by email or social media",
        ],
      },
      "Please don't send us sensitive personal information that isn't needed for your order.",
    ],
  },
  {
    title: "Payment Information",
    blocks: [
      "Payments are processed by Stripe. Your card details go directly to Stripe and are never stored by Elanora.",
      "We keep limited payment records, such as the payment status, amount and transaction reference, for order management, accounting and fraud prevention.",
    ],
  },
  {
    title: "How We Use Your Information",
    blocks: [
      {
        list: [
          "To make, ship and deliver your order",
          "To answer questions and send quotes for custom pieces",
          "To send order updates, including photos or a video of your finished piece",
          "To provide customer service and review quality concerns",
          "To send emails about new pieces and offers, if you've joined our list",
          "To prevent fraud and keep our business and tax records",
          "To improve our website and products",
        ],
      },
    ],
  },
  {
    title: "How We Share Your Information",
    blocks: [
      "We don't sell your personal information. We share only what is needed with the services that help us run Elanora:",
      {
        list: [
          "Stripe, to process payments",
          "Shipping carriers, to deliver your order (your name, address, phone and email)",
          "Our jewelry production partners, to make your piece (only the order details they need)",
          "IGI, the gemological laboratory that certifies our diamonds",
          "Vercel, which hosts our website and provides website analytics",
          "Our email and database providers, to send emails and store order records",
        ],
      },
      "We may also share information when required by law.",
    ],
  },
  {
    title: "Cookies & Analytics",
    blocks: [
      "We measure how visitors use our site (pages viewed, approximate region, device and browser type, and how you found us) to improve it. We count visitors with an anonymous daily code made from your IP address, not with tracking cookies.",
      "Your browser keeps your bag and the source of your visit (for example, a campaign link) on your device. You can clear this at any time in your browser settings.",
      "Checkout runs on Stripe, which uses its own cookies to process payments securely.",
    ],
  },
  {
    title: "Marketing Emails",
    blocks: [
      "If you join Elanora with your email, we may send you news about new pieces, collections and offers. You can unsubscribe at any time by replying to any email or writing to us.",
      "Emails about an order you've placed are not marketing and are still sent when needed.",
    ],
  },
  {
    title: "International Transfers",
    blocks: [
      "We serve customers in the US, Canada, the UK and Australia, and our service providers may process information in other countries. Where the law requires it, we take reasonable steps to protect information transferred abroad.",
    ],
  },
  {
    title: "How Long We Keep Information",
    blocks: [
      "We keep personal information only as long as needed for the purposes above, and longer where needed for order history, accounting, tax, fraud prevention or legal claims. After that we delete or anonymize it.",
    ],
  },
  {
    title: "Security",
    blocks: [
      "We take reasonable steps to protect your information from loss, misuse and unauthorized access. No method of sending or storing information online is completely secure.",
    ],
  },
  {
    title: "Your Rights",
    blocks: [
      "Depending on where you live, you may have the right to:",
      {
        list: [
          "See the personal information we hold about you",
          "Correct information that is wrong",
          "Ask us to delete your information",
          "Object to or limit how we use it",
          "Withdraw your consent and unsubscribe from marketing",
        ],
      },
      `To make a request, email ${POLICY_EMAIL}. We may need to confirm your identity first. Some information may have to be kept for legal, tax or accounting reasons.`,
    ],
  },
  {
    title: "Customer Photos & Reviews",
    blocks: [
      "If you send us photos, videos or reviews, we won't use them publicly (on our website or social media) without asking for your permission first.",
    ],
  },
  {
    title: "Children",
    blocks: [
      "Our website is not intended for children, and we don't knowingly collect personal information from children. If we learn that we have, we'll delete it.",
    ],
  },
  {
    title: "Changes to This Policy",
    blocks: ["We may update this policy from time to time. The new version will be posted here with a new date."],
  },
  {
    title: "Contact Us",
    blocks: [`For any question or request about your personal information, email ${POLICY_EMAIL}.`],
  },
];

export default function PrivacyPage() {
  return (
    <PolicyPage
      title="Privacy Policy"
      updated="November 14, 2026"
      intro={[
        "At Elanora, we respect your privacy. This policy explains what personal information we collect when you visit our website, place an order, request a custom piece or contact us, and how we use, share and protect it.",
      ]}
      sections={sections}
    />
  );
}
