import type { Metadata } from "next";
import { Outfit, Fraunces } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import CartDrawer from "@/components/CartDrawer";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import WhatsAppWidget from "@/components/WhatsAppWidget";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mepii Bites — Better Snacks. Bigger Cravings.",
  description:
    "Mepii Bites Healthy Snacks - Snack Happy Stay Mepii. Premium roasted makhana, quinoa fingers, ragi chips, and wholesome Indian supergrain bites delivered to your doorstep.",
  keywords: [
    "Mepii Bites",
    "healthy snacks",
    "makhana pudhina",
    "quinoa chips",
    "quinoa finger peri peri",
    "ragi chips",
    "quinoa straws chocolate",
    "roasted foxnuts",
    "snack happy stay mepii",
  ],
  openGraph: {
    title: "Mepii Bites — Healthy Snacks",
    description:
      "Snack Happy Stay Mepii. Wholesome roasted makhana, quinoa fingers, and supergrain crisps.",
    url: "https://mepiibites.com",
    siteName: "Mepii Bites",
    locale: "en_IN",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${outfit.variable} ${fraunces.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-[#FAF7F2] text-dark antialiased selection:bg-terracotta selection:text-white">
        <Preloader />
        <CartProvider>
          <WishlistProvider>
            <AnnouncementBar />
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <CartDrawer />
            <WhatsAppWidget />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
