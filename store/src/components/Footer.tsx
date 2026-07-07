import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-foreground text-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-12 py-14 sm:py-16 border-b border-white/10">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <div className="mb-4">
              <Image
                src="/images/logo.png"
                alt="Elanora Jewelry"
                width={120}
                height={120}
                className="h-14 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-sm text-white/40 leading-relaxed mb-5 max-w-[240px]">
              Jewelry designed to be worn every day and remembered forever.
            </p>
            {/* Social */}
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/elanorajewelry_2024/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-white/30 hover:text-gold-light transition-colors"
              >
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a href="#" aria-label="TikTok" className="text-white/30 hover:text-gold-light transition-colors">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.12v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.3a6.34 6.34 0 0010.86 4.48 6.34 6.34 0 001.86-4.49V8.76a8.28 8.28 0 004.86 1.57V6.88a4.84 4.84 0 01-1.14-.19z" />
                </svg>
              </a>
              <a href="#" aria-label="Pinterest" className="text-white/30 hover:text-gold-light transition-colors">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-[10px] tracking-[0.2em] uppercase text-white/60 mb-4">Shop</h4>
            <ul className="space-y-2.5">
              <li><Link href="/shop" className="text-sm text-white/40 hover:text-gold-light transition-colors">All Jewelry</Link></li>
              <li><Link href="/collections" className="text-sm text-white/40 hover:text-gold-light transition-colors">Collections</Link></li>
              <li><Link href="/new-arrivals" className="text-sm text-white/40 hover:text-gold-light transition-colors">New Arrivals</Link></li>
              <li><Link href="/shop" className="text-sm text-white/40 hover:text-gold-light transition-colors">Necklaces</Link></li>
              <li><Link href="/shop" className="text-sm text-white/40 hover:text-gold-light transition-colors">Earrings</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-[10px] tracking-[0.2em] uppercase text-white/60 mb-4">Help</h4>
            <ul className="space-y-2.5">
              <li><Link href="/faq" className="text-sm text-white/40 hover:text-gold-light transition-colors">FAQ</Link></li>
              <li><Link href="/shipping-returns" className="text-sm text-white/40 hover:text-gold-light transition-colors">Shipping & Returns</Link></li>
              <li><Link href="/size-guide" className="text-sm text-white/40 hover:text-gold-light transition-colors">Size Guide</Link></li>
              <li><Link href="/care-instructions" className="text-sm text-white/40 hover:text-gold-light transition-colors">Care Instructions</Link></li>
              <li><a href="mailto:elanorajewelry2024@gmail.com" className="text-sm text-white/40 hover:text-gold-light transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="text-[10px] tracking-[0.2em] uppercase text-white/60 mb-4">About</h4>
            <ul className="space-y-2.5">
              <li><Link href="/about" className="text-sm text-white/40 hover:text-gold-light transition-colors">Our Story</Link></li>
              <li><a href="https://www.instagram.com/elanorajewelry_2024/" target="_blank" rel="noopener noreferrer" className="text-sm text-white/40 hover:text-gold-light transition-colors">Instagram</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20">
            &copy; {new Date().getFullYear()} Elanora. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-[10px] text-white/20 tracking-wide uppercase">Secure payments</span>
            <div className="flex items-center gap-3 text-white/20">
              <svg width="28" height="18" viewBox="0 0 38 24" fill="currentColor"><rect width="38" height="24" rx="3" opacity="0.3"/><text x="19" y="15" textAnchor="middle" fontSize="8" fill="white" opacity="0.6">VISA</text></svg>
              <svg width="28" height="18" viewBox="0 0 38 24" fill="currentColor"><rect width="38" height="24" rx="3" opacity="0.3"/><text x="19" y="15" textAnchor="middle" fontSize="6" fill="white" opacity="0.6">MC</text></svg>
              <svg width="28" height="18" viewBox="0 0 38 24" fill="currentColor"><rect width="38" height="24" rx="3" opacity="0.3"/><text x="19" y="15" textAnchor="middle" fontSize="6" fill="white" opacity="0.6">AMEX</text></svg>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
