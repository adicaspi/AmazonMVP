import { ProductCard } from "@/components/ProductCard";
import { products, Room, getAllRooms, getAllTags } from "@/lib/products-data";
import { Suspense } from "react";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface ProductsPageProps {
  searchParams: Promise<{ room?: string; tag?: string }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const selectedRoom = params.room as Room | undefined;
  const selectedTag = params.tag;

  let filteredProducts = products.filter(p => p.status === "published");

  if (selectedRoom) {
    filteredProducts = filteredProducts.filter(p => p.room === selectedRoom);
  }

  if (selectedTag) {
    filteredProducts = filteredProducts.filter(p => p.tags.includes(selectedTag));
  }

  const rooms = getAllRooms();
  const tags = getAllTags();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
          Product Directory
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl">
          Browse our curated selection of home accessories, organized by room and category.
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <div className="sticky top-20 space-y-8">
            <div>
              <h2 className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wide">
                Filter by Room
              </h2>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/products"
                    className={`text-sm block py-2 ${
                      !selectedRoom
                        ? "text-slate-900 font-medium"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    All Rooms
                  </a>
                </li>
                {rooms.map((room) => (
                  <li key={room}>
                    <a
                      href={`/products?room=${room}`}
                      className={`text-sm block py-2 ${
                        selectedRoom === room
                          ? "text-slate-900 font-medium"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      {room.replace("_", " ")}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wide">
                Filter by Tag
              </h2>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/products"
                    className={`text-sm block py-2 ${
                      !selectedTag
                        ? "text-slate-900 font-medium"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    All Tags
                  </a>
                </li>
                {tags.slice(0, 10).map((tag) => (
                  <li key={tag}>
                    <a
                      href={`/products?tag=${tag}`}
                      className={`text-sm block py-2 ${
                        selectedTag === tag
                          ? "text-slate-900 font-medium"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      {tag}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>

        <div className="lg:col-span-3">
          <div className="mb-6 text-sm text-slate-600">
            Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
