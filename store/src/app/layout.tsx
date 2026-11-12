import type { Metadata } from "next";
import { Alegreya_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PromoBanner from "@/components/PromoBanner";
import SiteChrome from "@/components/SiteChrome";
import CustomAnalytics from "@/components/Analytics";
import "./globals.css";

// Fallback body font where Optima isn't installed (Windows, Android).
const bodySans = Alegreya_Sans({
  variable: "--font-alegreya-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Elanora — Jewelry Made for You",
    template: "%s | Elanora",
  },
  description:
    "Explore thoughtfully selected jewelry, colorful gemstones, and custom pieces made to order by Elanora.",
  keywords: [
    "jewelry",
    "custom jewelry",
    "gemstone jewelry",
    "engagement rings",
    "made to order jewelry",
  ],
  openGraph: {
    title: "Elanora — Jewelry Made for You",
    description:
      "Explore thoughtfully selected jewelry, colorful gemstones, and custom pieces made to order by Elanora.",
    type: "website",
    url: "https://elanora.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bodySans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <CartProvider>
          <SiteChrome banner={<PromoBanner />} header={<Header />} footer={<Footer />}>
            {children}
          </SiteChrome>
        </CartProvider>
        <Analytics />
        <SpeedInsights />
        <CustomAnalytics />
      </body>
    </html>
  );
}
