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
};

const roomIcons: Record<Room, string> = {
  living_room: "🛋️",
  kitchen: "🍳",
  storage: "📦",
  lighting: "💡",
  bedroom: "🛏️",
  bathroom: "🚿",
  office: "💼",
};

const roomColors: Record<Room, string> = {
  living_room: "from-amber-50 to-orange-50 border-amber-200 hover:border-amber-300",
  kitchen: "from-emerald-50 to-teal-50 border-emerald-200 hover:border-emerald-300",
  storage: "from-blue-50 to-indigo-50 border-blue-200 hover:border-blue-300",
  lighting: "from-yellow-50 to-amber-50 border-yellow-200 hover:border-yellow-300",
  bedroom: "from-purple-50 to-pink-50 border-purple-200 hover:border-purple-300",
  bathroom: "from-cyan-50 to-blue-50 border-cyan-200 hover:border-cyan-300",
  office: "from-slate-50 to-gray-50 border-slate-200 hover:border-slate-300",
};

export function CategoryCards() {
  const rooms = getAllRooms();

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">
          Shop by Room
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {rooms.map((room) => (
            <Link
              key={room}
              href={`/products?room=${room}`}
              className={`group relative border-2 bg-gradient-to-br ${roomColors[room]} p-6 text-center rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden`}
            >
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/50 transition-colors duration-300" />
              <div className="relative z-10">
                <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                  {roomIcons[room]}
                </div>
                <div className="text-sm font-bold text-slate-900 group-hover:text-slate-800">
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
