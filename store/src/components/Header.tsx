"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import CartDrawer from "./CartDrawer";
import { didone } from "@/lib/fonts";

// Main navigation: the four jewelry categories, then the Engagement & Bridal collection.
const navLinks = [
  { label: "Rings", href: "/rings" },
  { label: "Bracelets", href: "/bracelets" },
  { label: "Necklaces", href: "/necklaces" },
  { label: "Earrings", href: "/earrings" },
  { label: "Engagement & Bridal", href: "/engagement" },
];

const navItem = `${didone.className} text-[12px] font-medium uppercase tracking-[0.12em] xl:text-[13px] xl:tracking-[0.16em] text-[#1d1d1f]/85 transition-colors hover:text-[#1d1d1f]`;

// Next.js only scrolls to the top of the page content, which sits below the announcement
// bar — so the bar would scroll out of view (and the homepage hero leave a white strip).
// Header links scroll the window to the very top instead.
const toTop = () => window.scrollTo({ top: 0, behavior: "instant" });

export default function Header() {
  const { totalItems, setIsOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Homepage: the header floats transparently over the hero (a negative bottom margin
  // equal to its height means it takes no space, so the hero starts right under the
  // announcement bar). Once the hero has scrolled away it turns back into the usual
  // white sticky header. Collection pages with an editorial hero (Engagement & Bridal) do the same
  // from lg up; on smaller screens their copy sits above the photo, so the header stays
  // white there. Every other page keeps the white header throughout.
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isHeroCollection = pathname === "/engagement";
  const overlays = isHome || isHeroCollection;
  const [overHero, setOverHero] = useState(true);

  useEffect(() => {
    if (!overlays) return;
    const update = () => {
      const hero = document.querySelector("[data-hero-frame]");
      const header = document.querySelector("header");
      if (!hero || !header) return setOverHero(false);
      setOverHero(hero.getBoundingClientRect().bottom > header.offsetHeight);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [overlays]);

  const transparent = overlays && overHero && !mobileMenuOpen;
  const background = !transparent
    ? "bg-white/90 backdrop-blur-md"
    : isHome
      ? "bg-transparent"
      : "bg-white/90 backdrop-blur-md lg:bg-transparent lg:backdrop-blur-none";

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-[background-color,backdrop-filter] duration-300 ease-out ${background} ${
          isHome ? "-mb-14 lg:-mb-16" : isHeroCollection ? "lg:-mb-16" : ""
        }`}
      >
        <div className="relative mx-auto flex h-14 max-w-[1440px] items-center justify-between px-5 md:px-8 lg:h-16 lg:px-10">
          {/* Mobile: Menu */}
          <button
            className="-ml-1 p-1 text-[#1d1d1f] lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 20 20">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" d="M5 5l10 10M15 5L5 15" />
              ) : (
                <path strokeLinecap="round" d="M3 7.5h14M3 12.5h14" />
              )}
            </svg>
          </button>

          {/* Desktop: left nav */}
          {/* Desktop: the four jewelry categories sit left of the logo; Engagement &
              Bridal sits on the right, next to search and bag. */}
          <nav className="hidden items-center gap-5 xl:gap-8 lg:flex" aria-label="Main">
            {navLinks.slice(0, 4).map((l) => (
              <Link key={l.label} href={l.href} scroll={false} onClick={toTop} className={navItem}>
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Center: wordmark */}
          <Link
            href="/"
            scroll={false}
            className={`${didone.className} absolute left-1/2 -translate-x-1/2 pl-[0.38em] text-[18px] font-normal tracking-[0.38em] text-[#1d1d1f] lg:text-[21px]`}
            onClick={() => {
              setMobileMenuOpen(false);
              toTop();
            }}
          >
            ELANORA
          </Link>

          {/* Right: Search (desktop) + Bag */}
          <div className="flex items-center gap-5">
            <Link href={navLinks[4].href} scroll={false} onClick={toTop} className={`hidden lg:mr-3 lg:inline xl:mr-5 ${navItem}`}>
              {navLinks[4].label}
            </Link>
            <Link
              href="/shop"
              className="hidden p-1 text-[#1d1d1f]/80 transition-colors hover:text-[#1d1d1f] lg:block"
              aria-label="Search"
            >
              <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 20 20">
                <circle cx="8.5" cy="8.5" r="5.75" />
                <path strokeLinecap="round" d="M12.75 12.75L17 17" />
              </svg>
            </Link>
            <button
              onClick={() => setIsOpen(true)}
              className="relative -mr-1 p-1 text-[#1d1d1f]/80 transition-colors hover:text-[#1d1d1f]"
              aria-label={totalItems > 0 ? `Open bag, ${totalItems} items` : "Open bag"}
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 20 20">
                <path strokeLinejoin="round" d="M3.5 7h13l-1 10.5h-11L3.5 7z" />
                <path strokeLinecap="round" d="M7 7V5.5a3 3 0 016 0V7" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -right-1 -top-0.5 text-[12px] leading-none text-[#1d1d1f]">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <nav className="flex max-h-[calc(100svh-7rem)] flex-col overflow-y-auto bg-white px-5 pb-8 pt-2 md:px-8 lg:hidden" aria-label="Main">
            {[
              ...navLinks,
              { label: "Search", href: "/shop" },
            ].map((l) => (
              <Link
                key={l.label}
                href={l.href}
                scroll={false}
                className={`${didone.className} py-2.5 text-[22px] font-normal tracking-[-0.01em] ${
                  l.label === "Search" ? "text-[#1d1d1f]/60" : "text-[#1d1d1f]"
                }`}
                onClick={() => {
                  setMobileMenuOpen(false);
                  toTop();
                }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        )}
      </header>
      <CartDrawer />
    </>
  );
}
