import type { Metadata } from "next";
import Link from "next/link";
import { CUSTOM_POLICY, SALE_POLICY } from "@/data/customOrderPolicy";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about Elanora jewelry, orders, and shipping.",
};

const faqs = [
  {
    question: "What materials are your jewelry made from?",
    answer:
      "Materials vary by design. Please check the product page for the exact metal, finish, and stone details of the piece you’re considering. If you have a metal sensitivity, contact us before ordering and we’ll help you review the listed materials.",
  },
  {
    question: "Is your jewelry waterproof?",
    answer:
      "We recommend removing jewelry before showering, swimming, or exercising. Water, perspiration, and chemicals can affect some finishes and stones; see the product details and care instructions for guidance specific to your piece.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "Every piece is made to order. Production takes 2–8 weeks before it ships; this is an estimate, and more detailed pieces can take longer. Shipping within the US is free when you join Elanora with your email at checkout; shipping to other countries is priced by destination.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes! We currently ship to the US, Canada, UK, and Australia. International shipping is priced by destination. International orders may be subject to customs duties and import taxes, which are the responsibility of the customer.",
  },
  {
    question: "What is your return policy?",
    answer:
      `${SALE_POLICY.noReturns} See Shipping & Returns for details.`,
  },
  {
    question: "Can I cancel my order?",
    answer: `${SALE_POLICY.noCancel} Please check every detail before ordering.`,
  },
  {
    question: "Do your diamonds come with a certificate?",
    answer: SALE_POLICY.certificate,
  },
  {
    question: "Can I see my piece before it ships?",
    answer: SALE_POLICY.preview,
  },
  {
    question: "How can I track my order?",
    answer:
      "We email you a tracking number as soon as your piece ships. For an update before then, email elanorajewelry2024@gmail.com with your order email address. See Track Your Order for each stage.",
  },
  {
    question: "What if there's a problem with my piece?",
    answer: SALE_POLICY.quality,
  },
  {
    question: "How does payment work for a custom order?",
    answer: `${CUSTOM_POLICY.inquiry} ${CUSTOM_POLICY.payment} ${CUSTOM_POLICY.nonRefundable} ${CUSTOM_POLICY.shipping}`,
  },
  {
    question: "Can I cancel or return a custom order?",
    answer: `${CUSTOM_POLICY.inquiry} ${CUSTOM_POLICY.nonRefundable} ${CUSTOM_POLICY.finalSale} ${CUSTOM_POLICY.rights}`,
  },
  {
    question: "Can I exchange an item for a different size or style?",
    answer:
      "No. Every piece is made to order just for you, so we can't exchange it. Email us at elanorajewelry2024@gmail.com before you order if you'd like help choosing a size or option.",
  },
  {
    question: "Is the jewelry gift-ready?",
    answer:
      "Every order arrives in our signature Elanora gift box, beautifully presented and ready to give. No additional gift wrapping needed.",
  },
  {
    question: "How do I care for my jewelry?",
    answer:
      "Gently wipe with a soft cloth after each wear, store in the provided box, and avoid contact with water, perfume, and chemicals. Visit our Care Instructions page for detailed tips.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, Mastercard, American Express), Apple Pay, and Google Pay through our secure Stripe checkout.",
  },
];

export default function FAQPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      {/* Header */}
      <div className="text-center mb-14">
        <p className="text-xs tracking-[0.3em] uppercase text-gold mb-3">
          Help Center
        </p>
        <h1 className="text-3xl sm:text-4xl font-light">
          Frequently Asked Questions
        </h1>
      </div>

      {/* FAQ List */}
      <div className="divide-y divide-cream-dark">
        {faqs.map((faq, i) => (
          <div key={i} className="py-6">
            <h3 className="text-sm font-medium text-foreground mb-2">
              {faq.question}
            </h3>
            <p className="text-sm text-warm-gray leading-relaxed">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>

      {/* Contact CTA */}
      <div className="bg-cream rounded-sm p-8 text-center mt-14">
        <h3 className="text-sm font-medium mb-5">
          Didn&apos;t find your answer?
        </h3>
        <a
          href="mailto:elanorajewelry2024@gmail.com"
          className="inline-block border border-foreground text-foreground text-sm tracking-[0.2em] uppercase px-8 py-3 rounded-sm hover:bg-foreground hover:text-white transition-colors"
        >
          Contact Us
        </a>
      </div>

      {/* Back to shop */}
      <div className="text-center mt-10">
        <Link
          href="/shop"
          className="text-sm tracking-[0.2em] uppercase text-gold hover:text-gold-dark transition-colors border-b border-gold pb-0.5"
        >
          Back to Shopping
        </Link>
      </div>
    </div>
  );
}
