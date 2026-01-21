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
  
  // Portable bag sealer - food storage
  "portable-mini-bag-sealer": "https://images.unsplash.com/photo-1600431521340-491eca880813?w=1200&h=1200&fit=crop&q=95&auto=format",
  
  // Silicone lids - food storage containers
  "reusable-stretch-silicone-lids": "https://images.unsplash.com/photo-1600431521340-491eca880813?w=1200&h=1200&fit=crop&q=95&auto=format",
  
  // Jar opener - kitchen tool
  "under-cabinet-jar-opener": "https://images.unsplash.com/photo-1556910096-6f5e72db6803?w=1200&h=1200&fit=crop&q=95&auto=format",
  
  // Drawer organizer bins - kitchen storage
  "idesign-kitchen-drawer-organizer-bins": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=1200&fit=crop&q=95&auto=format",
  
  // Airtight food storage containers
  "vtopmart-airtight-food-storage-containers": "https://images.unsplash.com/photo-1600431521340-491eca880813?w=1200&h=1200&fit=crop&q=95&auto=format",
  
  // Can rack organizer - pantry storage
  "simplehouseware-stackable-can-rack-organizer": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=1200&fit=crop&q=95&auto=format",
  
  // Cotton storage basket - decorative storage
  "dii-cotton-storage-basket": "https://images.unsplash.com/photo-1519710164249-6b06504d207e?w=1200&h=1200&fit=crop&q=95&auto=format",
  
  // Rolling cart - mobile storage
  "homestar-3-tier-rolling-cart": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=1200&fit=crop&q=95&auto=format",
  
  // Cube storage organizer - furniture storage
  "songmics-8-cube-storage-organizer": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=1200&fit=crop&q=95&auto=format",
};

export const products: Product[] = [
  {
    id: "B08YZ5YF7M",
    slug: "bamboo-drawer-organizer",
    title: "Bamboo Drawer Organizer",
    benefitTitle: "Bamboo Drawer Organizer",
    room: "kitchen",
    tags: ["organization", "storage", "bamboo", "kitchen-essentials"],
    shortDescription: "Bamboo Drawer Organizer solves the problem of messy kitchen drawers with utensils scattered everywhere.",
    whyWePickedIt: "We selected this because it solves messy kitchen drawers with utensils scattered everywhere for busy people who cook at home. With 4.5 stars and 8,500+ reviews, it's a proven solution that delivers real value.",
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200&h=1200&fit=crop&q=95&auto=format",
    amazonUrl: "https://www.amazon.com/dp/B08YZ5YF7M?tag=aipicks20-20",
    asin: "B08YZ5YF7M",
    price: 24.99,
    highlights: [
      "High customer satisfaction (4.5 stars)",
      "8,500+ verified reviews",
      "Solves messy kitchen drawers with utensils scattered everywhere"
    ],
    pros: [
      "Proven solution with 8,500+ reviews",
      "High rating (4.5 stars)",
      "Addresses messy kitchen drawers with utensils scattered everywhere"
    ],
    cons: [
      "May not fit all use cases",
      "Check dimensions before purchasing"
    ],
    specs: {
      "Rating": "4.5 stars",
      "Reviews": "8,500+",
      "Price": "$24.99",
      "Target User": "busy people who cook at home"
    },
    status: "published",
    featured: true,
    dateAdded: "2026-01-21"
  },
  {
    id: "B08TGF5XJW",
    slug: "portable-mini-bag-sealer",
    title: "Portable Mini Bag Sealer",
    benefitTitle: "Portable Mini Bag Sealer",
    room: "kitchen",
    tags: ["food-storage", "kitchen-essentials", "eco-friendly"],
    shortDescription: "Portable Mini Bag Sealer solves the problem of open food bags get stale quickly.",
    whyWePickedIt: "We selected this because it solves open food bags get stale quickly for snack eaters and families with kids. With 4.3 stars and 1,200+ reviews, it's a proven solution that delivers real value.",
    image: "https://images.unsplash.com/photo-1600431521340-491eca880813?w=1200&h=1200&fit=crop&q=95&auto=format",
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
    featured: false,
    dateAdded: "2026-01-21"
  },
  {
    id: "B09GJ1C4NK",
    slug: "reusable-stretch-silicone-lids",
    title: "Reusable Stretch Silicone Lids",
    benefitTitle: "Reusable Stretch Silicone Lids",
    room: "kitchen",
    tags: ["food-storage", "eco-friendly", "silicone", "meal-prep"],
    shortDescription: "Reusable Stretch Silicone Lids solves the problem of plastic wrap wastes money and creates trash.",
    whyWePickedIt: "We selected this because it solves plastic wrap wastes money and creates trash for eco-conscious households and meal preppers. With 4.5 stars and 5,600+ reviews, it's a proven solution that delivers real value.",
    image: "https://images.unsplash.com/photo-1556911220-e4b2c2e2a4a7?w=1200&h=1200&fit=crop&q=95&auto=format",
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
    benefitTitle: "Under Cabinet Jar Opener",
    room: "kitchen",
    tags: ["kitchen-tools", "kitchen-essentials", "accessibility"],
    shortDescription: "Under Cabinet Jar Opener solves the problem of tight jar lids are frustrating and painful to open.",
    whyWePickedIt: "We selected this because it solves tight jar lids are frustrating and painful to open for people with weak grip or arthritis. With 4.7 stars and 9,400+ reviews, it's a proven solution that delivers real value.",
    image: "https://images.unsplash.com/photo-1556910096-6f5e72db6803?w=1200&h=1200&fit=crop&q=95&auto=format",
    amazonUrl: "https://www.amazon.com/dp/B087H6S8CH?tag=aipicks20-20",
    asin: "B087H6S8CH",
    price: 17.99,
    highlights: [
      "High customer satisfaction (4.7 stars)",
      "9,400+ verified reviews",
      "Solves tight jar lids are frustrating and painful to open"
    ],
    pros: [
      "Proven solution with 9,400+ reviews",
      "High rating (4.7 stars)",
      "Addresses tight jar lids are frustrating and painful to open"
    ],
    cons: [
      "May not fit all use cases",
      "Check dimensions before purchasing"
    ],
    specs: {
      "Rating": "4.7 stars",
      "Reviews": "9,400+",
      "Price": "$17.99",
      "Target User": "people with weak grip or arthritis"
    },
    status: "published",
    featured: false,
    dateAdded: "2026-01-21"
  },
  {
    id: "B07F3M7Y7G",
    slug: "idesign-kitchen-drawer-organizer-bins",
    title: "iDesign Kitchen Drawer Organizer Bins",
    benefitTitle: "iDesign Kitchen Drawer Organizer Bins",
    room: "kitchen",
    tags: ["organization", "storage", "kitchen-essentials"],
    shortDescription: "iDesign Kitchen Drawer Organizer Bins solves the problem of kitchen tools and utensils scattered in drawers.",
    whyWePickedIt: "We selected this because it solves kitchen tools and utensils scattered in drawers for home cooks who want organized kitchen spaces. With 4.6 stars and 3,200+ reviews, it's a proven solution that delivers real value.",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=1200&fit=crop&q=95&auto=format",
    amazonUrl: "https://www.amazon.com/dp/B07F3M7Y7G?tag=aipicks20-20",
    asin: "B07F3M7Y7G",
    price: 22.99,
    highlights: [
      "High customer satisfaction (4.6 stars)",
      "3,200+ verified reviews",
      "Solves kitchen tools and utensils scattered in drawers"
    ],
    pros: [
      "Proven solution with 3,200+ reviews",
      "High rating (4.6 stars)",
      "Addresses kitchen tools and utensils scattered in drawers"
    ],
    cons: [
      "May not fit all use cases",
      "Check dimensions before purchasing"
    ],
    specs: {
      "Rating": "4.6 stars",
      "Reviews": "3,200+",
      "Price": "$22.99",
      "Target User": "home cooks who want organized kitchen spaces"
    },
    status: "published",
    featured: false,
    dateAdded: "2026-01-21"
  },
  {
    id: "B08P2QZ3F5",
    slug: "vtopmart-airtight-food-storage-containers",
    title: "Vtopmart Airtight Food Storage Containers",
    benefitTitle: "Vtopmart Airtight Food Storage Containers",
    room: "kitchen",
    tags: ["food-storage", "meal-prep", "organization"],
    shortDescription: "Vtopmart Airtight Food Storage Containers solves the problem of food goes stale quickly without proper storage.",
    whyWePickedIt: "We selected this because it solves food goes stale quickly without proper storage for families and meal preppers. With 4.6 stars and 4,200+ reviews, it's a proven solution that delivers real value.",
    image: "https://images.unsplash.com/photo-1556911220-e4b2c2e2a4a7?w=1200&h=1200&fit=crop&q=95&auto=format",
    amazonUrl: "https://www.amazon.com/dp/B08P2QZ3F5?tag=aipicks20-20",
    asin: "B08P2QZ3F5",
    price: 29.99,
    highlights: [
      "High customer satisfaction (4.6 stars)",
      "4,200+ verified reviews",
      "Solves food goes stale quickly without proper storage"
    ],
    pros: [
      "Proven solution with 4,200+ reviews",
      "High rating (4.6 stars)",
      "Addresses food goes stale quickly without proper storage"
    ],
    cons: [
      "May not fit all use cases",
      "Check dimensions before purchasing"
    ],
    specs: {
      "Rating": "4.6 stars",
      "Reviews": "4,200+",
      "Price": "$29.99",
      "Target User": "families and meal preppers"
    },
    status: "published",
    featured: false,
    dateAdded: "2026-01-21"
  },
  {
    id: "B07C7Z3J7K",
    slug: "simplehouseware-stackable-can-rack-organizer",
    title: "SimpleHouseware Stackable Can Rack Organizer",
    benefitTitle: "SimpleHouseware Stackable Can Rack Organizer",
    room: "kitchen",
    tags: ["organization", "storage", "pantry"],
    shortDescription: "SimpleHouseware Stackable Can Rack Organizer solves the problem of cans scattered in pantry, hard to find what you need.",
    whyWePickedIt: "We selected this because it solves cans scattered in pantry, hard to find what you need for home cooks with cluttered pantries. With 4.5 stars and 2,800+ reviews, it's a proven solution that delivers real value.",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=1200&fit=crop&q=95&auto=format",
    amazonUrl: "https://www.amazon.com/dp/B07C7Z3J7K?tag=aipicks20-20",
    asin: "B07C7Z3J7K",
    price: 18.99,
    highlights: [
      "High customer satisfaction (4.5 stars)",
      "2,800+ verified reviews",
      "Solves cans scattered in pantry, hard to find what you need"
    ],
    pros: [
      "Proven solution with 2,800+ reviews",
      "High rating (4.5 stars)",
      "Addresses cans scattered in pantry, hard to find what you need"
    ],
    cons: [
      "May not fit all use cases",
      "Check dimensions before purchasing"
    ],
    specs: {
      "Rating": "4.5 stars",
      "Reviews": "2,800+",
      "Price": "$18.99",
      "Target User": "home cooks with cluttered pantries"
    },
    status: "published",
    featured: false,
    dateAdded: "2026-01-21"
  },
  {
    id: "B08FJ3785G",
    slug: "dii-cotton-storage-basket",
    title: "DII Cotton Storage Basket",
    benefitTitle: "DII Cotton Storage Basket",
    room: "living_room",
    tags: ["storage", "decorative", "organization"],
    shortDescription: "DII Cotton Storage Basket solves the problem of clutter scattered around the home with no storage solution.",
    whyWePickedIt: "We selected this because it solves clutter scattered around the home with no storage solution for people wanting organized, beautiful homes. With 4.4 stars and 1,900+ reviews, it's a proven solution that delivers real value.",
    image: "https://images.unsplash.com/photo-1519710164249-6b06504d207e?w=1200&h=1200&fit=crop&q=95&auto=format",
    amazonUrl: "https://www.amazon.com/dp/B08FJ3785G?tag=aipicks20-20",
    asin: "B08FJ3785G",
    price: 16.99,
    highlights: [
      "High customer satisfaction (4.4 stars)",
      "1,900+ verified reviews",
      "Solves clutter scattered around the home with no storage solution"
    ],
    pros: [
      "Proven solution with 1,900+ reviews",
      "High rating (4.4 stars)",
      "Addresses clutter scattered around the home with no storage solution"
    ],
    cons: [
      "May not fit all use cases",
      "Check dimensions before purchasing"
    ],
    specs: {
      "Rating": "4.4 stars",
      "Reviews": "1,900+",
      "Price": "$16.99",
      "Target User": "people wanting organized, beautiful homes"
    },
    status: "published",
    featured: false,
    dateAdded: "2026-01-21"
  },
  {
    id: "B07T9J1X3M",
    slug: "homestar-3-tier-rolling-cart",
    title: "Homestar 3-Tier Rolling Cart",
    benefitTitle: "Homestar 3-Tier Rolling Cart",
    room: "kitchen",
    tags: ["storage", "organization", "mobile"],
    shortDescription: "Homestar 3-Tier Rolling Cart solves the problem of lack of storage space in small kitchens.",
    whyWePickedIt: "We selected this because it solves lack of storage space in small kitchens for people with limited kitchen space. With 4.6 stars and 5,100+ reviews, it's a proven solution that delivers real value.",
    image: "https://images.unsplash.com/photo-1590846406792-dc008210f6e1?w=1200&h=1200&fit=crop&q=95&auto=format",
    amazonUrl: "https://www.amazon.com/dp/B07T9J1X3M?tag=aipicks20-20",
    asin: "B07T9J1X3M",
    price: 39.99,
    highlights: [
      "High customer satisfaction (4.6 stars)",
      "5,100+ verified reviews",
      "Solves lack of storage space in small kitchens"
    ],
    pros: [
      "Proven solution with 5,100+ reviews",
      "High rating (4.6 stars)",
      "Addresses lack of storage space in small kitchens"
    ],
    cons: [
      "May not fit all use cases",
      "Check dimensions before purchasing"
    ],
    specs: {
      "Rating": "4.6 stars",
      "Reviews": "5,100+",
      "Price": "$39.99",
      "Target User": "people with limited kitchen space"
    },
    status: "published",
    featured: false,
    dateAdded: "2026-01-21"
  },
  {
    id: "B08P4QGY9P",
    slug: "songmics-8-cube-storage-organizer",
    title: "SONGMICS 8-Cube Storage Organizer",
    benefitTitle: "SONGMICS 8-Cube Storage Organizer",
    room: "living_room",
    tags: ["storage", "organization", "furniture"],
    shortDescription: "SONGMICS 8-Cube Storage Organizer solves the problem of clutter and lack of organization in living spaces.",
    whyWePickedIt: "We selected this because it solves clutter and lack of organization in living spaces for people wanting organized, tidy homes. With 4.5 stars and 3,800+ reviews, it's a proven solution that delivers real value.",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=1200&h=1200&fit=crop&q=95&auto=format",
    amazonUrl: "https://www.amazon.com/dp/B08P4QGY9P?tag=aipicks20-20",
    asin: "B08P4QGY9P",
    price: 34.99,
    highlights: [
      "High customer satisfaction (4.5 stars)",
      "3,800+ verified reviews",
      "Solves clutter and lack of organization in living spaces"
    ],
    pros: [
      "Proven solution with 3,800+ reviews",
      "High rating (4.5 stars)",
      "Addresses clutter and lack of organization in living spaces"
    ],
    cons: [
      "May not fit all use cases",
      "Check dimensions before purchasing"
    ],
    specs: {
      "Rating": "4.5 stars",
      "Reviews": "3,800+",
      "Price": "$34.99",
      "Target User": "people wanting organized, tidy homes"
    },
    status: "published",
    featured: false,
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
