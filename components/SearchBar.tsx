"use client";

// components/SearchBar.tsx
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { products } from "@/lib/products-data";

interface SearchBarProps {
  variant?: "icon" | "full";
}

export function SearchBar({ variant = "full" }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        if (variant === "icon") {
          setIsExpanded(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [variant]);

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 0) {
      const categories = ["kitchen", "living room", "bedroom", "bathroom", "office", "storage", "lighting", "dining", "outdoor", "entryway", "laundry", "kids room"];
      
      const productMatches = products
        .filter(p => 
          p.title.toLowerCase().includes(value.toLowerCase()) ||
          p.shortDescription.toLowerCase().includes(value.toLowerCase()) ||
          p.tags.some(tag => tag.toLowerCase().includes(value.toLowerCase()))
        )
        .slice(0, 5)
        .map(p => p.title);
      
      const categoryMatches = categories
        .filter(cat => cat.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 3);
      
      setSuggestions([...productMatches, ...categoryMatches]);
      setIsOpen(true);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/products?search=${encodeURIComponent(query.trim())}`);
      setIsOpen(false);
      setQuery("");
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    const product = products.find(p => p.title === suggestion);
    
    if (product) {
      router.push(`/products/${product.slug}`);
    } else {
      router.push(`/products?room=${suggestion.toLowerCase().replace(" ", "_")}`);
    }
    
    setIsOpen(false);
    setQuery("");
  };

  // Icon-only variant for desktop
  if (variant === "icon" && !isExpanded) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className="p-2.5 rounded-full hover:bg-slate-100 transition-colors text-slate-600 hover:text-slate-900"
        aria-label="Search"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    );
  }

  return (
    <div ref={searchRef} className={`relative ${variant === "icon" ? "w-80" : "w-full max-w-md"} transition-all duration-300`}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleSearch}
            onFocus={() => {
              if (suggestions.length > 0) setIsOpen(true);
            }}
            placeholder="Search products..."
            className="w-full px-4 py-2.5 pl-11 pr-10 text-sm bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-400 focus:bg-white transition-all placeholder:text-slate-400"
          />
          <svg
            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setSuggestions([]);
                setIsOpen(false);
                if (variant === "icon") {
                  setIsExpanded(false);
                }
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors"
              aria-label="Clear search"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          {variant === "icon" && isExpanded && (
            <button
              type="button"
              onClick={() => {
                setIsExpanded(false);
                setQuery("");
                setSuggestions([]);
                setIsOpen(false);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors"
              aria-label="Close search"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </form>

      {isOpen && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-2xl max-h-64 overflow-y-auto backdrop-blur-sm">
          {suggestions.map((suggestion, idx) => (
            <button
              key={idx}
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full px-4 py-3 text-left text-sm hover:bg-emerald-50/50 transition-colors border-b border-slate-100 last:border-b-0 first:rounded-t-xl last:rounded-b-xl"
            >
              <div className="flex items-center gap-3">
                <svg className="w-4 h-4 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="text-slate-700 truncate">{suggestion}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
