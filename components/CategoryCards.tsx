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
  "beauty-personal-care": "Beauty & Personal Care",
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
  "beauty-personal-care": "💄",
};

const roomColors: Record<Room, string> = {
  living_room: "from-orange-100 via-amber-100 to-yellow-100 border-orange-300 hover:border-orange-400",
  kitchen: "from-emerald-100 via-teal-100 to-cyan-100 border-emerald-300 hover:border-emerald-400",
  storage: "from-blue-100 via-indigo-100 to-purple-100 border-blue-300 hover:border-blue-400",
  lighting: "from-yellow-100 via-amber-100 to-orange-100 border-yellow-300 hover:border-yellow-400",
  bedroom: "from-purple-100 via-violet-100 to-pink-100 border-purple-300 hover:border-purple-400",
  bathroom: "from-cyan-100 via-sky-100 to-blue-100 border-cyan-300 hover:border-cyan-400",
  office: "from-slate-100 via-gray-100 to-zinc-100 border-slate-300 hover:border-slate-400",
  dining: "from-rose-100 via-pink-100 to-fuchsia-100 border-rose-300 hover:border-rose-400",
  outdoor: "from-green-100 via-lime-100 to-emerald-100 border-green-300 hover:border-green-400",
  entryway: "from-stone-100 via-neutral-100 to-amber-100 border-stone-300 hover:border-stone-400",
  laundry: "from-sky-100 via-blue-100 to-indigo-100 border-sky-300 hover:border-sky-400",
  kids_room: "from-fuchsia-100 via-pink-100 to-rose-100 border-fuchsia-300 hover:border-fuchsia-400",
  garage: "from-gray-100 via-slate-100 to-stone-100 border-gray-300 hover:border-gray-400",
  balcony: "from-lime-100 via-green-100 to-teal-100 border-lime-300 hover:border-lime-400",
  patio: "from-orange-100 via-red-100 to-rose-100 border-orange-300 hover:border-orange-400",
  basement: "from-indigo-100 via-purple-100 to-violet-100 border-indigo-300 hover:border-indigo-400",
  baby_care: "from-pink-100 via-rose-100 to-red-100 border-pink-300 hover:border-pink-400",
  "beauty-personal-care": "from-purple-100 via-fuchsia-100 to-pink-100 border-purple-300 hover:border-purple-400",
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
              className={`group relative border-2 bg-gradient-to-br ${roomColors[room]} p-4 sm:p-5 md:p-6 text-center rounded-xl sm:rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-110 overflow-hidden`}
            >
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/40 transition-colors duration-300" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                <div className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full" />
              </div>
              <div className="relative z-10">
                <div className="text-3xl sm:text-4xl md:text-5xl mb-2 sm:mb-3 transform group-hover:scale-125 group-hover:rotate-6 transition-all duration-300">
                  {roomIcons[room]}
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
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
