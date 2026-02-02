import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";
import { CookieConsent } from "@/components/CookieConsent";

const META_PIXEL_ID = "876318711699041";

const inter = Inter({ subsets: ["latin"] });

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
        {/* Meta Pixel Code */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
      </head>
      <body className={inter.className}>
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
