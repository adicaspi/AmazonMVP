"use client";

import { useState, useMemo } from "react";
import { ProductCard } from "@/components/ProductCard";
import { products, Room, getAllRooms } from "@/lib/products-data";
import Link from "next/link";
import type { Metadata } from "next";

export default function ProductsPage() {
  const [selectedRoom, setSelectedRoom] = useState<Room | "all">("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const rooms = getAllRooms();
  const allTags = Array.from(new Set(products.flatMap(p => p.tags))).sort();

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Room filter
      if (selectedRoom !== "all" && product.room !== selectedRoom) {
        return false;
      }

      // Category/Tag filter
      if (selectedCategory !== "all" && !product.tags.includes(selectedCategory)) {
        return false;
      }

      // Price filter
      if (selectedPriceRange !== "all" && product.price) {
        const price = product.price;
        if (selectedPriceRange === "under-20" && price >= 20) return false;
        if (selectedPriceRange === "20-40" && (price < 20 || price > 40)) return false;
        if (selectedPriceRange === "40-60" && (price < 40 || price > 60)) return false;
        if (selectedPriceRange === "over-60" && price <= 60) return false;
      }

      // Search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = product.title.toLowerCase().includes(query);
        const matchesDescription = product.shortDescription.toLowerCase().includes(query);
        const matchesTags = product.tags.some(tag => tag.toLowerCase().includes(query));
        if (!matchesTitle && !matchesDescription && !matchesTags) {
          return false;
        }
      }

      return true;
    });
  }, [selectedRoom, selectedCategory, selectedPriceRange, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="mb-8 sm:mb-12">
        <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-full shadow-sm">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            Curated Products
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 mb-4 sm:mb-6">
          All Products
        </h1>
        <p className="text-lg sm:text-xl text-slate-600 max-w-3xl">
          Browse our curated selection of home accessories. Each product is carefully selected for quality, value, and design.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 sm:mb-12 space-y-4">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full px-4 py-3 pl-10 pr-4 text-sm sm:text-base border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Filter Row */}
        <div className="flex flex-wrap gap-4">
          {/* Room Filter */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Room
            </label>
            <select
              value={selectedRoom}
              onChange={(e) => setSelectedRoom(e.target.value as Room | "all")}
              className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
            >
              <option value="all">All Rooms</option>
              {rooms.map(room => (
                <option key={room} value={room}>
                  {room.replace("_", " ").replace(/\b\w/g, l => l.toUpperCase())}
                </option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
            >
              <option value="all">All Categories</option>
              {allTags.map(tag => (
                <option key={tag} value={tag}>
                  {tag.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}
                </option>
              ))}
            </select>
          </div>

          {/* Price Filter */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Price Range
            </label>
            <select
              value={selectedPriceRange}
              onChange={(e) => setSelectedPriceRange(e.target.value)}
              className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
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
                className="px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="text-sm text-slate-600">
          Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
          {selectedRoom !== "all" && ` in ${selectedRoom.replace("_", " ")}`}
          {selectedCategory !== "all" && ` in ${selectedCategory}`}
          {selectedPriceRange !== "all" && ` ${selectedPriceRange === "under-20" ? "under $20" : selectedPriceRange === "20-40" ? "$20-$40" : selectedPriceRange === "40-60" ? "$40-$60" : "over $60"}`}
          {searchQuery && ` matching "${searchQuery}"`}
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 sm:py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">No products found</h2>
          <p className="text-slate-600 mb-6">Try adjusting your filters or search query.</p>
          <button
            onClick={() => {
              setSelectedRoom("all");
              setSelectedCategory("all");
              setSelectedPriceRange("all");
              setSearchQuery("");
            }}
            className="px-6 py-3 bg-gradient-to-r from-slate-900 to-slate-800 text-white font-bold rounded-xl hover:from-slate-800 hover:to-slate-700 transition-all"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}
