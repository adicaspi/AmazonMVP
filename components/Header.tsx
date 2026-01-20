// components/Header.tsx
import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent hover:from-slate-700 hover:to-slate-500 transition-all">
            AI Picks
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/guides" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors relative group">
              Guides
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-slate-900 group-hover:w-full transition-all duration-300" />
            </Link>
            <Link href="/products" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors relative group">
              Products
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-slate-900 group-hover:w-full transition-all duration-300" />
            </Link>
            <Link href="/about" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors relative group">
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-slate-900 group-hover:w-full transition-all duration-300" />
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
