import Link from "next/link";

// Shared layout for long policy pages (Privacy Policy, Terms): a header, numbered sections of
// paragraphs and bullet lists, and a contact box. Same type styles as Shipping & Returns.

export type PolicyBlock = string | { list: string[] };
export type PolicySection = { title: string; id?: string; blocks: PolicyBlock[] };

export const POLICY_EMAIL = "elanorajewelry2024@gmail.com";

export default function PolicyPage({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  updated: string;
  intro: string[];
  sections: PolicySection[];
}) {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <div className="text-center mb-14">
        <p className="text-xs tracking-[0.3em] uppercase text-gold mb-3">Customer Care</p>
        <h1 className="text-3xl sm:text-4xl font-light">{title}</h1>
        <p className="mt-3 text-sm text-warm-gray">Last updated: {updated}</p>
      </div>

      <div className="space-y-3 text-sm text-warm-gray leading-relaxed mb-12">
        {intro.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>

      <div className="space-y-10">
        {sections.map((s, i) => (
          <section key={s.title} id={s.id} className="scroll-mt-24">
            <h2 className="text-lg font-medium mb-4">
              {i + 1}. {s.title}
            </h2>
            <div className="space-y-3 text-sm text-warm-gray leading-relaxed">
              {s.blocks.map((b, j) =>
                typeof b === "string" ? (
                  <p key={j}>{b}</p>
                ) : (
                  <ul key={j} className="list-none space-y-2 ml-1">
                    {b.list.map((li) => (
                      <li key={li} className="flex items-start gap-2">
                        <span className="text-gold mt-0.5 text-[8px]">&#9670;</span>
                        {li}
                      </li>
                    ))}
                  </ul>
                ),
              )}
            </div>
          </section>
        ))}
      </div>

      <div className="bg-cream rounded-sm p-8 text-center mt-14">
        <h3 className="text-sm font-medium mb-2">Questions?</h3>
        <p className="text-sm text-warm-gray mb-5">
          Email us at <span className="text-foreground">{POLICY_EMAIL}</span>.
        </p>
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
