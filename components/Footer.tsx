// components/Footer.tsx
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">AI Picks</h3>
            <p className="text-sm text-slate-600">
              Curated home accessories and practical guides to upgrade your space.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/guides" className="text-slate-600 hover:text-slate-900">
                  Guides
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-slate-600 hover:text-slate-900">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-600 hover:text-slate-900">
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-slate-600 hover:text-slate-900">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/disclosure" className="text-slate-600 hover:text-slate-900">
                  Disclosure
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-600 hover:text-slate-900">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Affiliate Disclosure</h4>
            <p className="text-sm text-slate-600">
              As an Amazon Associate I earn from qualifying purchases.
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-slate-200 text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} AI Picks. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
