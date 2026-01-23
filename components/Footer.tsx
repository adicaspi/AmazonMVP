// components/Footer.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();
  
  // Hide disclosure section on product pages (they have their own disclosure)
  const isProductPage = pathname?.startsWith("/products/") || pathname?.startsWith("/p/");

  return (
    <footer className="border-t border-slate-200 bg-gradient-to-b from-white to-slate-50 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className={`grid ${isProductPage ? 'md:grid-cols-3' : 'md:grid-cols-4'} gap-12`}>
          <div>
            <h3 className="font-bold text-xl text-slate-900 mb-4 bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
              AI Picks
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Curated home accessories and practical guides to upgrade your space.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Explore</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/guides" className="text-slate-600 hover:text-slate-900 transition-colors inline-block hover:translate-x-1 transform duration-200">
                  Guides →
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-slate-600 hover:text-slate-900 transition-colors inline-block hover:translate-x-1 transform duration-200">
                  Products →
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-600 hover:text-slate-900 transition-colors inline-block hover:translate-x-1 transform duration-200">
                  About →
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/privacy" className="text-slate-600 hover:text-slate-900 transition-colors inline-block hover:translate-x-1 transform duration-200">
                  Privacy Policy →
                </Link>
              </li>
              <li>
                <Link href="/disclosure" className="text-slate-600 hover:text-slate-900 transition-colors inline-block hover:translate-x-1 transform duration-200">
                  Disclosure →
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-600 hover:text-slate-900 transition-colors inline-block hover:translate-x-1 transform duration-200">
                  Contact →
                </Link>
              </li>
            </ul>
          </div>
          {!isProductPage && (
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Affiliate Disclosure</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                As an Amazon Associate I earn from qualifying purchases.
              </p>
            </div>
          )}
        </div>
        <div className="mt-12 pt-8 border-t border-slate-200 text-center">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} AI Picks. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
