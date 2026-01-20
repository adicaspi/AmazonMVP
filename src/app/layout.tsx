import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Picks - Live Product Tests",
  description: "Meta ads → landing page → Amazon affiliate links. Discover products currently in testing.",
  openGraph: {
    title: "AI Picks - Live Product Tests",
    description: "Meta ads → landing page → Amazon affiliate links. Discover products currently in testing.",
    url: "https://www.aipicks.co",
    siteName: "AI Picks",
    type: "website",
    images: [
      {
        url: "https://www.aipicks.co/og-image.png", // You can add an image later
        width: 1200,
        height: 630,
        alt: "AI Picks - Live Product Tests",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Picks - Live Product Tests",
    description: "Meta ads → landing page → Amazon affiliate links. Discover products currently in testing.",
    images: ["https://www.aipicks.co/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
