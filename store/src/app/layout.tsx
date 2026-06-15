import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomAnalytics from "@/components/Analytics";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Elanora — Launching July 2026",
    template: "%s | Elanora",
  },
  description:
    "Jewelry designed to be worn every day and remembered forever. Join the Founding Members list for early access to our first collection.",
  keywords: [
    "jewelry",
    "gold jewelry",
    "necklaces",
    "earrings",
    "launch",
    "pre-order",
    "waitlist",
    "fine jewelry",
  ],
  openGraph: {
    title: "Elanora — Launching July 2026",
    description:
      "Jewelry designed to be worn every day and remembered forever. Join the waitlist for early access.",
    type: "website",
    url: "https://elanora-beta.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
        <Analytics />
        <SpeedInsights />
        <CustomAnalytics />
      </body>
    </html>
  );
}
