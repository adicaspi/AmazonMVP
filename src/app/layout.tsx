import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";
import { CookieConsent } from "@/components/CookieConsent";
import { MetaPixelInit } from "@/components/MetaPixelInit";

const inter = localFont({
  src: [
    {
      path: "./fonts/Inter-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Inter-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Inter-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/Inter-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/Inter-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-inter",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
});

export const metadata: Metadata = {
  title: "AI Picks - Curated Home Accessories & Guides",
  description: "Minimal, well-designed home accessories that upgrade your space. Curated recommendations and practical guides. As an Amazon Associate I earn from qualifying purchases.",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "AI Picks - Curated Home Accessories & Guides",
    description: "Minimal, well-designed home accessories that upgrade your space. Curated recommendations and practical guides.",
    url: "https://www.aipicks.co",
    siteName: "AI Picks",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AiPicks Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Picks - Curated Home Accessories & Guides",
    description: "Minimal, well-designed home accessories that upgrade your space. Curated recommendations and practical guides.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    'fb:app_id': process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || '',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Facebook Domain Verification */}
        <meta name="facebook-domain-verification" content="qkdw9hd6ey3pr7msoevv0byie4ls6i" />

        {/* Meta Pixel Base Code - loads fbevents.js, init is handled per-page */}
        {/* beforeInteractive ensures fbq stub is defined before React hydration */}
        <Script id="meta-pixel" strategy="beforeInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
          `}
        </Script>
        {/* noscript fallbacks are handled per-page by each pixel component */}
      </head>
      <body className={inter.className}>
        <MetaPixelInit />
        <Header />
        <main className="min-h-screen bg-white">
          {children}
        </main>
        <AffiliateDisclosure />
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
