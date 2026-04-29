import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";

export const metadata: Metadata = {
  title: {
    default: "Dragon Market | Premium Chinese Artisan Goods",
    template: "%s | Dragon Market",
  },
  description: "Discover authentic Chinese craftsmanship — silk, tea, ceramics, jade, and more. Sourced directly from China's finest artisans.",
  keywords: ["chinese crafts", "silk", "tea", "jade", "ceramics", "dragon market"],
  openGraph: {
    title: "Dragon Market",
    description: "Premium Chinese Artisan Goods",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <CartDrawer />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "var(--color-ink)",
              color: "#fff",
              fontFamily: "var(--font-body)",
              borderRadius: "var(--radius-md)",
              border: "1px solid rgba(212,175,55,0.3)",
            },
          }}
        />
      </body>
    </html>
  );
}
