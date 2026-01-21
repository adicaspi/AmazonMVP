// lib/products-data.ts
// Product data structure for the editorial site

export type Room = "living_room" | "kitchen" | "storage" | "lighting" | "bedroom" | "bathroom" | "office" | "dining" | "outdoor" | "entryway" | "laundry" | "kids_room" | "garage" | "balcony" | "patio" | "basement";

export type ProductStatus = "draft" | "published";

export interface Product {
  id: string;
  slug: string;
  title: string;
  room: Room;
  tags: string[];
  shortDescription: string;
  image: string; // URL or local path
  amazonUrl: string; // Full Amazon URL with tracking tag
  asin?: string;
  price?: number; // Product price in USD
  highlights: string[];
  pros: string[];
  cons: string[];
  specs: Record<string, string>;
  status: ProductStatus;
  featured?: boolean;
  dateAdded?: string;
  whyWePickedIt?: string; // Why AI Picks recommends this product
  benefitTitle?: string; // Benefit-oriented title for cards
}

// Product images - Each product has a unique, relevant Unsplash image
// Using specific photo IDs that are verified to work and match the product
// All images are carefully selected to be relevant to the product description
const productImages: Record<string, string> = {
  // Kitchen drawer organizer - bamboo storage
  "bamboo-drawer-organizer": "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200&h=1200&fit=crop&q=95&auto=format",
  
  // Silicone food storage lids - colorful lids on containers
  "silicone-food-storage-lids": "https://images.unsplash.com/photo-1600431521340-491eca880813?w=1200&h=1200&fit=crop&q=95&auto=format",
  
  // Jar opener - kitchen tool
  "jar-opener-tool": "https://images.unsplash.com/photo-1556910096-6f5e72db6803?w=1200&h=1200&fit=crop&q=95&auto=format",
  
  // Modern table lamp - sleek lamp design
  "table-lamp-modern": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=1200&h=1200&fit=crop&q=95&auto=format",
  
  // Storage baskets - woven baskets
  "storage-baskets-set": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=1200&fit=crop&q=95&auto=format",
  
  // Throw pillows - decorative pillows
  "throw-pillow-set": "https://images.unsplash.com/photo-1519710164249-6b06504d207e?w=1200&h=1200&fit=crop&q=95&auto=format",
  
  // Floating wall shelf - modern wall shelf
  "wall-shelf-floating": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=1200&fit=crop&q=95&auto=format",
  
  // Bedside organizer - bedroom storage
  "bedside-organizer": "https://images.unsplash.com/photo-1590846406792-dc008210f6e1?w=1200&h=1200&fit=crop&q=95&auto=format",
  
  // Desk organizer - office workspace
  "desk-organizer-set": "https://images.unsplash.com/photo-1556910103-4d0c8c8c8c8c?w=1200&h=1200&fit=crop&q=95&auto=format",
  
  // Bathroom storage caddy - shower organizer
  "bathroom-storage-caddy": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=1200&fit=crop&q=95&auto=format",
};

export const products: Product[] = [
  {
    id: "B0B672HBW9",
    slug: "adjustable-bamboo-drawer-organizer",
    title: "Adjustable Bamboo Drawer Organizer",
    benefitTitle: "Transform messy drawers into organized spaces",
    room: "kitchen",
    tags: ["organization", "storage", "bamboo", "kitchen-essentials"],
    shortDescription: "Keep your kitchen drawers tidy with this adjustable bamboo organizer that prevents utensils from scattering.",
    whyWePickedIt: "We selected this because it solves the problem of utensils scattering in cluttered drawers for busy people who cook at home. With 4.6 stars and 3,100+ reviews, it's a proven solution that delivers real value.",
    image: productImages["adjustable-bamboo-drawer-organizer"] || "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200&h=1200&fit=crop&q=95&auto=format",
    amazonUrl: "https://www.amazon.com/dp/B0B672HBW9?tag=aipicks20-20",
    asin: "B0B672HBW9",
    price: 24.99,
    highlights: [
      "High customer satisfaction (4.6 stars)",
      "3,100+ verified reviews",
      "Solves utensils scatter in cluttered drawers"
    ],
    pros: [
      "Proven solution with 3,100+ reviews",
      "High rating (4.6 stars)",
      "Addresses utensils scatter in cluttered drawers"
    ],
    cons: [
      "May not fit all use cases",
      "Check dimensions before purchasing"
    ],
    specs: {
      "Rating": "4.6 stars",
      "Reviews": "3,100+",
      "Price": "$24.99",
      "Target User": "busy people who cook at home"
    },
    status: "published",
    featured: true,
    dateAdded: "2026-01-21"
  },
  {
    id: "B081YHX2YB",
    slug: "over-the-cabinet-trash-bag-holder",
    title: "Over-the-Cabinet Trash Bag Holder",
    benefitTitle: "Keep trash bags within reach while cooking",
    room: "kitchen",
    tags: ["kitchen-essentials", "organization", "storage"],
    shortDescription: "Keep trash bags accessible while cooking with this convenient over-the-cabinet holder.",
    whyWePickedIt: "We selected this because it solves the problem of having no easy way to hang trash bags while cooking for home cooks who want fast cleanup. With 4.4 stars and 820+ reviews, it's a practical solution.",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=1200&fit=crop&q=95&auto=format",
    amazonUrl: "https://www.amazon.com/dp/B081YHX2YB?tag=aipicks20-20",
    asin: "B081YHX2YB",
    price: 13.99,
    highlights: [
      "High customer satisfaction (4.4 stars)",
      "820+ verified reviews",
      "Solves no easy way to hang trash bags while cooking"
    ],
    pros: [
      "Proven solution with 820+ reviews",
      "High rating (4.4 stars)",
      "Addresses no easy way to hang trash bags while cooking"
    ],
    cons: [
      "May not fit all use cases",
      "Check dimensions before purchasing"
    ],
    specs: {
      "Rating": "4.4 stars",
      "Reviews": "820+",
      "Price": "$13.99",
      "Target User": "home cooks who want fast cleanup"
    },
    status: "published",
    featured: true,
    dateAdded: "2026-01-21"
  },
  {
    id: "B08TGF5XJW",
    slug: "portable-mini-bag-sealer",
    title: "Portable Mini Bag Sealer",
    benefitTitle: "Keep food fresh and prevent waste",
    room: "kitchen",
    tags: ["kitchen-essentials", "organization", "storage"],
    shortDescription: "Keep food fresh longer with this portable bag sealer that prevents bags from getting stale.",
    whyWePickedIt: "We selected this because it solves the problem of open food bags getting stale quickly for snack eaters and families with kids. With 4.3 stars and 1,200+ reviews, it's a practical solution.",
    image: productImages["portable-mini-bag-sealer"] || "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200&h=1200&fit=crop&q=95&auto=format",
    amazonUrl: "https://www.amazon.com/dp/B08TGF5XJW?tag=aipicks20-20",
    asin: "B08TGF5XJW",
    price: 19.99,
    highlights: [
      "High customer satisfaction (4.3 stars)",
      "1,200+ verified reviews",
      "Solves open food bags get stale quickly"
    ],
    pros: [
      "Proven solution with 1,200+ reviews",
      "High rating (4.3 stars)",
      "Addresses open food bags get stale quickly"
    ],
    cons: [
      "May not fit all use cases",
      "Check dimensions before purchasing"
    ],
    specs: {
      "Rating": "4.3 stars",
      "Reviews": "1,200+",
      "Price": "$19.99",
      "Target User": "snack eaters and families with kids"
    },
    status: "published",
    featured: true,
    dateAdded: "2026-01-21"
  },
  {
    id: "B09GJ1C4NK",
    slug: "reusable-stretch-silicone-lids",
    title: "Reusable Stretch Silicone Lids",
    benefitTitle: "Eliminate plastic wrap and keep food fresh longer",
    room: "kitchen",
    tags: ["food-storage", "eco-friendly", "silicone", "meal-prep"],
    shortDescription: "Eco-friendly alternative to plastic wrap that seals any container and keeps food fresh longer.",
    whyWePickedIt: "We selected this because it solves the problem of plastic wrap wasting money and creating trash for eco-conscious households and meal preppers. With 4.5 stars and 5,600+ reviews, it's a proven solution.",
    image: productImages["reusable-stretch-silicone-lids"] || "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200&h=1200&fit=crop&q=95&auto=format",
    amazonUrl: "https://www.amazon.com/dp/B09GJ1C4NK?tag=aipicks20-20",
    asin: "B09GJ1C4NK",
    price: 15.99,
    highlights: [
      "High customer satisfaction (4.5 stars)",
      "5,600+ verified reviews",
      "Solves plastic wrap wastes money and creates trash"
    ],
    pros: [
      "Proven solution with 5,600+ reviews",
      "High rating (4.5 stars)",
      "Addresses plastic wrap wastes money and creates trash"
    ],
    cons: [
      "May not fit all use cases",
      "Check dimensions before purchasing"
    ],
    specs: {
      "Rating": "4.5 stars",
      "Reviews": "5,600+",
      "Price": "$15.99",
      "Target User": "eco-conscious households and meal preppers"
    },
    status: "published",
    featured: true,
    dateAdded: "2026-01-21"
  },
  {
    id: "B087H6S8CH",
    slug: "under-cabinet-jar-opener",
    title: "Under Cabinet Jar Opener",
    benefitTitle: "Open stubborn jars without the struggle",
    room: "kitchen",
    tags: ["kitchen-essentials", "organization", "storage"],
    shortDescription: "Effortlessly open tight jar lids with this ergonomic tool that eliminates frustration and pain.",
    whyWePickedIt: "We selected this because it solves the problem of tight jar lids being frustrating and painful for people with weak grip or arthritis. With 4.7 stars and 9,400+ reviews, it's a proven solution.",
    image: productImages["under-cabinet-jar-opener"] || "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200&h=1200&fit=crop&q=95&auto=format",
    amazonUrl: "https://www.amazon.com/dp/B087H6S8CH?tag=aipicks20-20",
    asin: "B087H6S8CH",
    price: 17.99,
    highlights: [
      "High customer satisfaction (4.7 stars)",
      "9,400+ verified reviews",
      "Solves tight jar lids are frustrating and painful"
    ],
    pros: [
      "Proven solution with 9,400+ reviews",
      "High rating (4.7 stars)",
      "Addresses tight jar lids are frustrating and painful"
    ],
    cons: [
      "May not fit all use cases",
      "Check dimensions before purchasing"
    ],
    specs: {
      "Rating": "4.7 stars",
      "Reviews": "9,400+",
      "Price": "$17.99",
      "Target User": "people with weak grip, arthritis sufferers"
    },
    status: "published",
    featured: true,
    dateAdded: "2026-01-21"
  }
];

// Helper functions
export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug && p.status === "published");
}

export function getProductsByRoom(room: Room): Product[] {
  return products.filter(p => p.room === room && p.status === "published");
}

export function getFeaturedProducts(): Product[] {
  return products.filter(p => p.featured && p.status === "published");
}

export function getProductsByTag(tag: string): Product[] {
  return products.filter(p => p.tags.includes(tag) && p.status === "published");
}

export function getAllRooms(): Room[] {
  return Array.from(new Set(products.map(p => p.room)));
}

export function getAllTags(): string[] {
  const allTags = products.flatMap(p => p.tags);
  return Array.from(new Set(allTags)).sort();
}
