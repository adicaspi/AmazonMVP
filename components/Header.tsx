"use client";

// components/Header.tsx
import Link from "next/link";
import { useState } from "react";
import { SearchBar } from "./SearchBar";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          <Link href="/" className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent hover:from-slate-700 hover:to-slate-500 transition-all flex-shrink-0">
            AI Picks
          </Link>
          
          {/* Desktop Navigation + Search */}
          <div className="hidden md:flex items-center gap-4 flex-shrink-0">
            <nav className="flex items-center gap-6">
              <Link href="/products" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors relative group">
                Products
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-slate-900 group-hover:w-full transition-all duration-300" />
              </Link>
              <Link href="/guides" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors relative group">
                Guides
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-slate-900 group-hover:w-full transition-all duration-300" />
              </Link>
              <Link href="/about" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors relative group">
                About
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-slate-900 group-hover:w-full transition-all duration-300" />
              </Link>
              <Link href="/contact" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors relative group">
                Contact Us
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-slate-900 group-hover:w-full transition-all duration-300" />
              </Link>
            </nav>
            {/* Search Bar - Desktop (Icon only, expands on click) */}
            <div className="flex items-center">
              <SearchBar variant="icon" />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors flex-shrink-0"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white">
            {/* Search Bar - Mobile */}
            <div className="px-4 py-4 border-b border-slate-200">
              <SearchBar variant="full" />
            </div>
            <nav className="flex flex-col py-4 space-y-3">
              <Link
                href="/products"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 text-base font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
              >
                Products
              </Link>
              <Link
                href="/guides"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 text-base font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
              >
                Guides
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 text-base font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
              >
                About
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 text-base font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
              >
                Contact Us
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
