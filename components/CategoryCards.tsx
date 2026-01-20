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
              className="group border border-slate-200 bg-white p-6 text-center hover:border-slate-300 hover:bg-slate-50 transition-colors"
            >
              <div className="text-2xl mb-2">🏠</div>
              <div className="text-sm font-medium text-slate-900 group-hover:text-slate-700">
                {roomLabels[room]}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
