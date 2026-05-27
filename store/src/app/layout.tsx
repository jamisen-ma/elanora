import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Elanora — Shop, Style, Elevate",
    template: "%s | Elanora",
  },
  description:
    "Curated fine jewelry for the modern woman. Discover elegant necklaces, rings, and accessories crafted with timeless beauty.",
  keywords: ["jewelry", "necklaces", "rings", "gold jewelry", "fine jewelry", "luxury accessories"],
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
      </body>
    </html>
  );
}
