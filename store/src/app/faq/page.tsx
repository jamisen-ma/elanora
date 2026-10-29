import type { Metadata } from "next";
import Link from "next/link";
import { CUSTOM_POLICY } from "@/data/customOrderPolicy";

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
      "In-stock orders are usually processed within 1–2 business days. Made-to-order pieces need production time before dispatch; the product page lists the estimated lead time. Once shipped, delivery usually takes 5–10 business days. Shipping is $9.99, or free on orders over $75.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes! We currently ship to the US, Canada, UK, and Australia. International orders may be subject to customs duties and import taxes, which are the responsibility of the customer.",
  },
  {
    question: "What is your return policy?",
    answer:
      `Eligible unworn, non-custom items may be returned within 30 days of delivery in their original condition and packaging. ${CUSTOM_POLICY.finalSale} ${CUSTOM_POLICY.rights} See Shipping & Returns for details.`,
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
      `Eligible non-custom items may be exchanged once at no additional shipping cost, subject to availability. Email us at hello@elanora.com for help. ${CUSTOM_POLICY.finalSale}`,
  },
  {
    question: "How do I find my ring size?",
    answer:
      "Check our Size Guide for detailed instructions. Most of our rings feature an adjustable open-band design that fits sizes 5–9, so exact sizing isn't always necessary.",
  },
  {
    question: "Do your necklaces come with an extender?",
    answer:
      "Yes! Most of our necklaces include a 2-inch extender chain so you can adjust the length to suit different necklines and styles.",
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
  {
    question: "My order arrived damaged. What do I do?",
    answer:
      "We're sorry to hear that! Please contact us at hello@elanora.com within 48 hours of delivery with photos of the damage. We'll send a replacement or issue a full refund at no cost to you.",
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
        <h3 className="text-sm font-medium mb-2">
          Didn&apos;t find your answer?
        </h3>
        <p className="text-sm text-warm-gray mb-5">
          We&apos;re here to help Monday &ndash; Friday, 9am &ndash; 5pm EST.
        </p>
        <a
          href="mailto:hello@elanora.com"
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
