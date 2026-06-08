import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about Elanora jewelry, orders, and shipping.",
};

const faqs = [
  {
    question: "What materials are your jewelry made from?",
    answer:
      "Our pieces are crafted from premium materials including 18K gold-plated stainless steel, titanium steel, and genuine gemstones. All metals are hypoallergenic and tarnish-resistant, making them safe for sensitive skin.",
  },
  {
    question: "Is your jewelry waterproof?",
    answer:
      "While our stainless steel and titanium pieces are water-resistant, we recommend removing jewelry before showering, swimming, or exercising to preserve the gold plating and extend its lifespan.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "Domestic (US) and international orders to Canada, UK, and Australia ship within 1–2 business days and arrive in 5–10 business days. Shipping is a flat $9.99, or free on orders over $75.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes! We currently ship to the US, Canada, UK, and Australia. International orders may be subject to customs duties and import taxes, which are the responsibility of the customer.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy. Items must be unworn, undamaged, and in original packaging with tags attached. Email us at hello@elanora.com with your order number to start a return.",
  },
  {
    question: "Can I exchange an item for a different size or style?",
    answer:
      "Absolutely! We offer one-time exchanges at no additional shipping cost. Email us at hello@elanora.com and we'll arrange it. Exchanges are subject to availability.",
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
