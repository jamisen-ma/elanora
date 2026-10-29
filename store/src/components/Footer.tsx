import Link from "next/link";
import FooterSignup from "./FooterSignup";

// Light footer: four link groups and an email signup on warm ivory.

const groups: { title: string; links: { label: string; href: string; external?: boolean }[] }[] = [
  {
    title: "Shop",
    links: [
      { label: "Shop All", href: "/shop" },
      { label: "Rings", href: "/rings" },
      { label: "Bracelets", href: "/bracelets" },
      { label: "Necklaces", href: "/necklaces" },
      { label: "Earrings", href: "/earrings" },
      { label: "Engagement & Bridal", href: "/engagement" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Shipping", href: "/shipping-returns" },
      { label: "Returns & Order Policy", href: "/shipping-returns" },
      { label: "Size Guide", href: "/size-guide" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "mailto:hello@elanora.com", external: true },
    ],
  },
  {
    title: "About",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "Materials", href: "/care-instructions" },
      { label: "Made to Order", href: "/faq" },
    ],
  },
  {
    title: "Follow",
    links: [
      { label: "Instagram", href: "https://www.instagram.com/elanorajewelry_2024/", external: true },
      { label: "TikTok", href: "#", external: true },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-auto bg-[#faf7f3] text-[#1d1d1f]">
      <div className="mx-auto max-w-[1280px] px-6 pb-10 pt-16 md:px-10 lg:pt-20">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4 lg:grid-cols-[repeat(4,minmax(0,1fr))_1.4fr] lg:gap-x-10">
          {groups.map((g) => (
            <div key={g.title}>
              <p className="text-[13px] font-medium uppercase tracking-[0.24em]">{g.title}</p>
              <ul className="mt-5 space-y-3">
                {g.links.map((l) => (
                  <li key={l.label}>
                    {l.external ? (
                      <a
                        href={l.href}
                        {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="text-[15px] text-[#6e6e73] transition-colors hover:text-[#1d1d1f]"
                      >
                        {l.label}
                      </a>
                    ) : (
                      <Link href={l.href} className="text-[15px] text-[#6e6e73] transition-colors hover:text-[#1d1d1f]">
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <p className="text-[13px] font-medium uppercase tracking-[0.24em]">Stay in touch</p>
            <p className="mt-5 text-[15px] text-[#6e6e73]">New pieces, gemstone stories, and notes from Elanora.</p>
            <div className="mt-4">
              <FooterSignup />
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-[#1d1d1f]/10 pt-6 text-[13px] tracking-[0.04em] text-[#86868b] sm:flex-row sm:items-center">
          <span className="pl-[0.42em] text-[15px] font-light tracking-[0.42em] text-[#1d1d1f]">ELANORA</span>
          <span>&copy; {new Date().getFullYear()} Elanora. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
