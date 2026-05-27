import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-foreground text-white/80 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Image
              src="/images/logo/elanora-logo.png"
              alt="Elanora"
              width={100}
              height={50}
              className="h-12 w-auto brightness-200 mb-4"
            />
            <p className="text-sm text-white/50 leading-relaxed max-w-xs">
              Curated fine jewelry for the modern woman. Every piece tells a story of elegance, craftsmanship, and timeless beauty.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-xs tracking-[0.2em] uppercase text-white/40 mb-4">Shop</h3>
            <ul className="space-y-2.5">
              <li><Link href="/shop" className="text-sm hover:text-gold-light transition-colors">All Jewelry</Link></li>
              <li><Link href="/shop" className="text-sm hover:text-gold-light transition-colors">Necklaces</Link></li>
              <li><Link href="/shop" className="text-sm hover:text-gold-light transition-colors">Rings</Link></li>
              <li><Link href="/shop" className="text-sm hover:text-gold-light transition-colors">New Arrivals</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="text-xs tracking-[0.2em] uppercase text-white/40 mb-4">Customer Care</h3>
            <ul className="space-y-2.5">
              <li><span className="text-sm">Shipping & Returns</span></li>
              <li><span className="text-sm">Size Guide</span></li>
              <li><span className="text-sm">Care Instructions</span></li>
              <li><span className="text-sm">FAQ</span></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs tracking-[0.2em] uppercase text-white/40 mb-4">Contact</h3>
            <ul className="space-y-2.5">
              {/* UPDATE: Replace with your contact info */}
              <li><span className="text-sm">hello@elanora.com</span></li>
              <li><span className="text-sm">Mon - Fri, 9am - 5pm EST</span></li>
            </ul>
            <div className="flex gap-4 mt-5">
              {/* Social icons — UPDATE: Replace # with your social links */}
              <a href="#" aria-label="Instagram" className="text-white/40 hover:text-gold-light transition-colors">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a href="#" aria-label="Pinterest" className="text-white/40 hover:text-gold-light transition-colors">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                </svg>
              </a>
              <a href="#" aria-label="TikTok" className="text-white/40 hover:text-gold-light transition-colors">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.12v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.3a6.34 6.34 0 0010.86 4.48 6.34 6.34 0 001.86-4.49V8.76a8.28 8.28 0 004.86 1.57V6.88a4.84 4.84 0 01-1.14-.19z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Trust badges */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-wrap justify-center gap-8 mb-8 text-white/30">
            <div className="flex items-center gap-2 text-xs tracking-wide uppercase">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
              </svg>
              Free Shipping Over $75
            </div>
            <div className="flex items-center gap-2 text-xs tracking-wide uppercase">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              Secure Checkout
            </div>
            <div className="flex items-center gap-2 text-xs tracking-wide uppercase">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182M21.015 4.356v4.992" />
              </svg>
              30-Day Returns
            </div>
          </div>
          <p className="text-center text-xs text-white/25">
            &copy; {new Date().getFullYear()} Elanora. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
