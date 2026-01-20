// components/Header.tsx
import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-slate-900">
            AI Picks
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/guides" className="text-sm text-slate-600 hover:text-slate-900">
              Guides
            </Link>
            <Link href="/products" className="text-sm text-slate-600 hover:text-slate-900">
              Products
            </Link>
            <Link href="/about" className="text-sm text-slate-600 hover:text-slate-900">
              About
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
