import { notFound } from "next/navigation";
import CategoryCollection from "@/components/shop/CategoryCollection";
import { SERIES } from "@/data/series";

// One themed collection's shop page (Wings of Light has its own page at /wings-of-light).

const themes = SERIES.filter((s) => s.href.startsWith("/series/"));

export function generateStaticParams() {
  return themes.map((s) => ({ theme: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ theme: string }> }) {
  const { theme } = await params;
  const s = themes.find((t) => t.slug === theme);
  return s ? { title: s.title, description: s.line } : {};
}

export default async function ThemePage({ params }: { params: Promise<{ theme: string }> }) {
  const { theme } = await params;
  const s = themes.find((t) => t.slug === theme);
  if (!s) notFound();
  const items = s.items();
  return (
    <CategoryCollection
      label={s.title}
      items={items}
      showTypeFilter={new Set(items.map((i) => i.type)).size > 1}
      hero={{
        src: s.cover,
        alt: s.coverAlt,
        eyebrow: "The Collections",
        headline: s.title,
        subline: s.line,
        desktopPosition: "50% 45%",
        mobilePosition: "50% 40%",
      }}
    />
  );
}
