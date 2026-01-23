// components/CategoryCards.tsx
import Link from "next/link";
import { Room, getAllRooms } from "@/lib/products-data";

const roomLabels: Record<Room, string> = {
  living_room: "Living Room",
  kitchen: "Kitchen",
  storage: "Storage",
  lighting: "Lighting",
  bedroom: "Bedroom",
  bathroom: "Bathroom",
  office: "Office",
  dining: "Dining",
  outdoor: "Outdoor",
  entryway: "Entryway",
  laundry: "Laundry",
  kids_room: "Kids Room",
  garage: "Garage",
  balcony: "Balcony",
  patio: "Patio",
  basement: "Basement",
  baby_care: "Baby Care",
  beauty_personal_care: "Beauty & Personal Care",
};

const roomIcons: Record<Room, string> = {
  living_room: "🛋️",
  kitchen: "🍳",
  storage: "📦",
  lighting: "💡",
  bedroom: "🛏️",
  bathroom: "🚿",
  office: "💼",
  dining: "🍽️",
  outdoor: "🌳",
  entryway: "🚪",
  laundry: "🧺",
  kids_room: "🧸",
  garage: "🚗",
  balcony: "🌿",
  patio: "☀️",
  basement: "🏠",
  baby_care: "👶",
  beauty_personal_care: "💄",
};

const roomColors: Record<Room, string> = {
  living_room: "from-amber-50 to-orange-50 border-amber-200 hover:border-amber-300",
  kitchen: "from-emerald-50 to-teal-50 border-emerald-200 hover:border-emerald-300",
  storage: "from-blue-50 to-indigo-50 border-blue-200 hover:border-blue-300",
  lighting: "from-yellow-50 to-amber-50 border-yellow-200 hover:border-yellow-300",
  bedroom: "from-purple-50 to-pink-50 border-purple-200 hover:border-purple-300",
  bathroom: "from-cyan-50 to-blue-50 border-cyan-200 hover:border-cyan-300",
  office: "from-slate-50 to-gray-50 border-slate-200 hover:border-slate-300",
  dining: "from-rose-50 to-pink-50 border-rose-200 hover:border-rose-300",
  outdoor: "from-green-50 to-emerald-50 border-green-200 hover:border-green-300",
  entryway: "from-stone-50 to-neutral-50 border-stone-200 hover:border-stone-300",
  laundry: "from-sky-50 to-blue-50 border-sky-200 hover:border-sky-300",
  kids_room: "from-fuchsia-50 to-pink-50 border-fuchsia-200 hover:border-fuchsia-300",
  garage: "from-gray-50 to-slate-50 border-gray-200 hover:border-gray-300",
  balcony: "from-lime-50 to-green-50 border-lime-200 hover:border-lime-300",
  patio: "from-orange-50 to-amber-50 border-orange-200 hover:border-orange-300",
  basement: "from-indigo-50 to-purple-50 border-indigo-200 hover:border-indigo-300",
  baby_care: "from-pink-50 to-rose-50 border-pink-200 hover:border-pink-300",
  beauty_personal_care: "from-purple-50 to-pink-50 border-purple-200 hover:border-purple-300",
};

export function CategoryCards() {
  const rooms = getAllRooms();

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-b from-white via-slate-50/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center sm:text-left mb-6 sm:mb-8">
          <div className="inline-block mb-3 sm:mb-4 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-full shadow-sm">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="hidden sm:inline">Browse by Category</span>
              <span className="sm:hidden">Categories</span>
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900">
            Shop by Room
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl">
            Find the perfect accessories for every space in your home
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-3 sm:gap-4">
          {rooms.map((room) => (
            <Link
              key={room}
              href={`/products?room=${room}`}
              className={`group relative border-2 bg-gradient-to-br ${roomColors[room]} p-4 sm:p-5 md:p-6 text-center rounded-lg sm:rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 hover:scale-105 overflow-hidden`}
            >
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/60 transition-colors duration-300" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                <div className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full" />
              </div>
              <div className="relative z-10">
                <div className="text-3xl sm:text-4xl md:text-5xl mb-2 sm:mb-3 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  {roomIcons[room]}
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-slate-800 transition-colors">
                  {roomLabels[room]}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
