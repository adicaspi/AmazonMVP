import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Picks - Curated Home Accessories & Guides",
  description: "Minimal, well-designed home accessories that upgrade your space. Curated recommendations and practical guides. As an Amazon Associate I earn from qualifying purchases.",
  openGraph: {
    title: "AI Picks - Curated Home Accessories & Guides",
    description: "Minimal, well-designed home accessories that upgrade your space. Curated recommendations and practical guides.",
    url: "https://www.aipicks.co",
    siteName: "AI Picks",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen bg-white">
          {children}
        </main>
        <AffiliateDisclosure />
        <Footer />
      </body>
    </html>
  );
}
