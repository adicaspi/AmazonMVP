"use client";

import { useState, useMemo } from "react";
import { ProductCard } from "@/components/ProductCard";
import { products, Room, getAllRooms } from "@/lib/products-data";

export default function ProductsPage() {
  const [selectedRoom, setSelectedRoom] = useState<Room | "all">("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const rooms = getAllRooms();
  const allTags = (() => {
    const allTagsRaw = products.flatMap(p => p.tags || []);
    const seen = new Set<string>();
    const unique: string[] = [];

    for (const tag of allTagsRaw) {
      const trimmed = tag.trim();
      if (!trimmed) continue;
      const lower = trimmed.toLowerCase();
      if (!seen.has(lower)) {
        seen.add(lower);
        const titleCased = trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
        unique.push(titleCased);
      }
    }

    return unique.sort();
  })();

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      if (selectedRoom !== "all" && product.room !== selectedRoom) return false;
      if (selectedCategory !== "all" && !product.tags.includes(selectedCategory)) return false;
      if (selectedPriceRange !== "all" && product.price) {
        const price = product.price;
        if (selectedPriceRange === "under-20" && price >= 20) return false;
        if (selectedPriceRange === "20-40" && (price < 20 || price > 40)) return false;
        if (selectedPriceRange === "40-60" && (price < 40 || price > 60)) return false;
        if (selectedPriceRange === "over-60" && price <= 60) return false;
      }
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = product.title.toLowerCase().includes(query);
        const matchesDescription = product.shortDescription.toLowerCase().includes(query);
        const matchesTags = product.tags.some(tag => tag.toLowerCase().includes(query));
        const matchesRoom = product.room.toLowerCase().includes(query);
        const matchesBenefitTitle = product.benefitTitle?.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDescription && !matchesTags && !matchesRoom && !matchesBenefitTitle) {
          return false;
        }
      }
      return true;
    });
  }, [selectedRoom, selectedCategory, selectedPriceRange, searchQuery]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner - Grandlash style */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 text-white text-center py-2.5 px-4">
        <div className="flex items-center justify-center gap-2 text-sm md:text-base font-bold animate-pulse">
          <span>&#11088;</span>
          <span>CURATED BY AI PICKS - Only the Best Products</span>
          <span>&#11088;</span>
        </div>
      </div>

      <section className="bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-bold mb-4">
              <span>&#127942;</span>
              Curated Collection
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              All Products
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Browse our curated selection of home accessories, kids' toys, and family products. Each product is carefully selected for quality, value, and design.
            </p>
          </div>

          {/* Social Proof Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 text-center max-w-4xl mx-auto mb-8 md:mb-12">
            <div className="flex flex-col items-center bg-white rounded-xl p-3 shadow-sm border border-emerald-100">
              <span className="text-xl md:text-2xl mb-1">&#11088;</span>
              <div className="text-base md:text-xl font-bold text-emerald-600">{products.length}+</div>
              <div className="text-xs text-gray-600">Products</div>
            </div>
            <div className="flex flex-col items-center bg-white rounded-xl p-3 shadow-sm border border-emerald-100">
              <span className="text-xl md:text-2xl mb-1">&#127942;</span>
              <div className="text-base md:text-xl font-bold text-emerald-600">Curated</div>
              <div className="text-xs text-gray-600">By AI Picks</div>
            </div>
            <div className="flex flex-col items-center bg-white rounded-xl p-3 shadow-sm border border-emerald-100">
              <span className="text-xl md:text-2xl mb-1">&#128666;</span>
              <div className="text-base md:text-xl font-bold text-emerald-600">Free</div>
              <div className="text-xs text-gray-600">Prime Shipping</div>
            </div>
            <div className="flex flex-col items-center bg-white rounded-xl p-3 shadow-sm border border-emerald-100">
              <span className="text-xl md:text-2xl mb-1">&#128176;</span>
              <div className="text-base md:text-xl font-bold text-emerald-600">30 Days</div>
              <div className="text-xs text-gray-600">Money Back</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="bg-white border-b border-gray-200 py-6 md:py-8 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          {/* Search */}
          <div className="relative group">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full px-4 py-3 pl-12 pr-4 text-sm border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white shadow-sm hover:shadow-md transition-all"
            />
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-1 transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Filter Row */}
          <div className="flex flex-wrap gap-3 sm:gap-4">
            {/* Room Filter */}
            <div className="flex-1 min-w-[160px]">
              <label className="block text-xs font-bold text-gray-700 mb-1.5">Room</label>
              <select
                value={selectedRoom}
                onChange={(e) => setSelectedRoom(e.target.value as Room | "all")}
                className="w-full px-3 py-2.5 text-sm border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white cursor-pointer"
              >
                <option value="all">All Rooms</option>
                {rooms.map(room => {
                  let displayName: string;
                  if (room === "beauty-personal-care") {
                    displayName = "Beauty & Personal Care";
                  } else {
                    displayName = room.replace(/_/g, " ").replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
                  }
                  return (
                    <option key={room} value={room}>{displayName}</option>
                  );
                })}
              </select>
            </div>

            {/* Category Filter */}
            <div className="flex-1 min-w-[160px]">
              <label className="block text-xs font-bold text-gray-700 mb-1.5">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2.5 text-sm border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white cursor-pointer"
              >
                <option value="all">All Categories</option>
                {allTags.map(tag => (
                  <option key={tag} value={tag}>
                    {tag.replace(/-/g, " ").replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Filter */}
            <div className="flex-1 min-w-[160px]">
              <label className="block text-xs font-bold text-gray-700 mb-1.5">Price Range</label>
              <select
                value={selectedPriceRange}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
                className="w-full px-3 py-2.5 text-sm border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white cursor-pointer"
              >
                <option value="all">All Prices</option>
                <option value="under-20">Under $20</option>
                <option value="20-40">$20 - $40</option>
                <option value="40-60">$40 - $60</option>
                <option value="over-60">Over $60</option>
              </select>
            </div>

            {/* Clear Filters */}
            {(selectedRoom !== "all" || selectedCategory !== "all" || selectedPriceRange !== "all" || searchQuery) && (
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setSelectedRoom("all");
                    setSelectedCategory("all");
                    setSelectedPriceRange("all");
                    setSearchQuery("");
                  }}
                  className="px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-gray-700 to-gray-600 rounded-xl hover:from-gray-600 hover:to-gray-500 transition-all shadow-md"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>

          {/* Results Count */}
          <div className="text-sm text-gray-600">
            Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
            {selectedRoom !== "all" && ` in ${selectedRoom === "beauty-personal-care" ? "Beauty & Personal Care" : selectedRoom.replace(/_/g, " ").replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())}`}
            {selectedCategory !== "all" && ` in ${selectedCategory.replace(/-/g, " ").replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}`}
            {selectedPriceRange !== "all" && ` ${selectedPriceRange === "under-20" ? "under $20" : selectedPriceRange === "20-40" ? "$20-$40" : selectedPriceRange === "40-60" ? "$40-$60" : "over $60"}`}
            {searchQuery && ` matching "${searchQuery}"`}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-8 md:py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 items-stretch">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 sm:py-24 bg-white rounded-2xl border border-gray-200 shadow-sm">
              <div className="text-6xl mb-6">&#128269;</div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">No products found</h2>
              <p className="text-base text-gray-600 mb-8 max-w-md mx-auto">
                Try adjusting your filters or search query to discover more products.
              </p>
              <button
                onClick={() => {
                  setSelectedRoom("all");
                  setSelectedCategory("all");
                  setSelectedPriceRange("all");
                  setSearchQuery("");
                }}
                className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Trust Footer */}
      <section className="bg-white py-6 md:py-8 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-center">
            <div className="flex items-center gap-2 text-gray-700">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-sm font-medium">Secure Checkout via Amazon</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-sm font-medium">Fast Prime Shipping</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium">30-Day Money Back Guarantee</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
