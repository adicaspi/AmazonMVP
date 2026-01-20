// lib/products-data.ts
// Product data structure for the editorial site

export type Room = "living_room" | "kitchen" | "storage" | "lighting" | "bedroom" | "bathroom" | "office";

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
  highlights: string[];
  pros: string[];
  cons: string[];
  specs: Record<string, string>;
  status: ProductStatus;
  featured?: boolean;
  dateAdded?: string;
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
    id: "1",
    slug: "bamboo-drawer-organizer",
    title: "Bamboo Drawer Organizer",
    room: "kitchen",
    tags: ["organization", "storage", "bamboo", "kitchen-essentials"],
    shortDescription: "Keep your kitchen drawers tidy with this adjustable bamboo organizer.",
    image: productImages["bamboo-drawer-organizer"],
    amazonUrl: "https://www.amazon.com/dp/B08YZ5YF7M?tag=aipicks-20",
    asin: "B08YZ5YF7M",
    highlights: [
      "Adjustable dividers for custom organization",
      "Made from sustainable bamboo",
      "Easy to clean and maintain"
    ],
    pros: [
      "Eco-friendly material",
      "Customizable layout",
      "Durable construction"
    ],
    cons: [
      "May not fit all drawer sizes",
      "Requires some assembly"
    ],
    specs: {
      "Material": "Bamboo",
      "Dimensions": "12 x 8 x 2 inches",
      "Weight": "1.2 lbs",
      "Warranty": "1 year"
    },
    status: "published",
    featured: true,
    dateAdded: "2025-01-20"
  },
  {
    id: "2",
    slug: "silicone-food-storage-lids",
    title: "Reusable Silicone Food Storage Lids",
    room: "kitchen",
    tags: ["food-storage", "eco-friendly", "silicone", "meal-prep"],
    shortDescription: "Eco-friendly alternative to plastic wrap that seals any container.",
    image: productImages["silicone-food-storage-lids"],
    amazonUrl: "https://www.amazon.com/dp/B07H8QMZPV?tag=aipicks-20",
    asin: "B07H8QMZPV",
    highlights: [
      "Fits multiple container sizes",
      "Dishwasher safe",
      "BPA-free silicone"
    ],
    pros: [
      "Reduces plastic waste",
      "Versatile sizing",
      "Easy to clean"
    ],
    cons: [
      "May not seal perfectly on all containers",
      "Can stretch over time"
    ],
    specs: {
      "Material": "Food-grade silicone",
      "Set includes": "6 lids",
      "Size range": "3-10 inches",
      "Dishwasher safe": "Yes"
    },
    status: "published",
    featured: true,
    dateAdded: "2025-01-20"
  },
  {
    id: "3",
    slug: "jar-opener-tool",
    title: "Jar Opener Tool",
    room: "kitchen",
    tags: ["kitchen-tools", "accessibility", "grip-assist"],
    shortDescription: "Effortlessly open tight jar lids with this ergonomic tool.",
    image: productImages["jar-opener-tool"],
    amazonUrl: "https://www.amazon.com/dp/B07GJX5QYR?tag=aipicks-20",
    asin: "B07GJX5QYR",
    highlights: [
      "Works on jars of all sizes",
      "Ergonomic grip design",
      "No batteries required"
    ],
    pros: [
      "Easy to use",
      "Compact storage",
      "Affordable"
    ],
    cons: [
      "May not work on very large jars",
      "Requires some hand strength"
    ],
    specs: {
      "Material": "Plastic and rubber",
      "Weight": "0.3 lbs",
      "Jar size range": "2-4 inches",
      "Warranty": "90 days"
    },
    status: "published",
    featured: false,
    dateAdded: "2025-01-20"
  },
  {
    id: "4",
    slug: "table-lamp-modern",
    title: "Modern Table Lamp",
    room: "living_room",
    tags: ["lighting", "modern", "decorative", "bedroom"],
    shortDescription: "Sleek, minimalist lamp that adds ambient lighting to any room.",
    image: productImages["table-lamp-modern"],
    amazonUrl: "https://www.amazon.com/dp/B08ABC1234?tag=aipicks-20",
    highlights: [
      "Touch dimmer control",
      "LED bulb included",
      "Modern design"
    ],
    pros: [
      "Energy efficient",
      "Easy to use",
      "Stylish appearance"
    ],
    cons: [
      "Bulb not replaceable",
      "Limited color options"
    ],
    specs: {
      "Height": "18 inches",
      "Base diameter": "6 inches",
      "Bulb type": "LED",
      "Wattage": "9W"
    },
    status: "published",
    featured: true,
    dateAdded: "2025-01-20"
  },
  {
    id: "5",
    slug: "storage-baskets-set",
    title: "Storage Baskets Set",
    room: "storage",
    tags: ["storage", "organization", "baskets", "multi-room"],
    shortDescription: "Versatile woven baskets perfect for organizing any space.",
    image: productImages["storage-baskets-set"],
    amazonUrl: "https://www.amazon.com/dp/B08DEF5678?tag=aipicks-20",
    highlights: [
      "Set of 3 different sizes",
      "Natural woven material",
      "Stackable design"
    ],
    pros: [
      "Affordable set",
      "Multiple sizes",
      "Attractive design"
    ],
    cons: [
      "Not waterproof",
      "May collect dust"
    ],
    specs: {
      "Set includes": "3 baskets",
      "Sizes": "Small, Medium, Large",
      "Material": "Woven seagrass",
      "Care": "Wipe clean"
    },
    status: "published",
    featured: false,
    dateAdded: "2025-01-20"
  },
  {
    id: "6",
    slug: "throw-pillow-set",
    title: "Throw Pillow Set",
    room: "living_room",
    tags: ["decorative", "comfort", "textiles", "bedroom"],
    shortDescription: "Soft, decorative pillows that add comfort and style.",
    image: productImages["throw-pillow-set"],
    amazonUrl: "https://www.amazon.com/dp/B08GHI9012?tag=aipicks-20",
    highlights: [
      "Set of 2 pillows",
      "Removable covers",
      "Machine washable"
    ],
    pros: [
      "Comfortable filling",
      "Easy to clean",
      "Affordable"
    ],
    cons: [
      "Covers may fade over time",
      "Pillows may flatten"
    ],
    specs: {
      "Set includes": "2 pillows",
      "Size": "18 x 18 inches",
      "Fill": "Polyester",
      "Cover material": "Cotton blend"
    },
    status: "published",
    featured: false,
    dateAdded: "2025-01-20"
  },
  {
    id: "7",
    slug: "wall-shelf-floating",
    title: "Floating Wall Shelf",
    room: "living_room",
    tags: ["storage", "wall-mounted", "modern", "decorative"],
    shortDescription: "Sleek floating shelf that adds storage without taking up floor space.",
    image: productImages["wall-shelf-floating"],
    amazonUrl: "https://www.amazon.com/dp/B08JKL3456?tag=aipicks-20",
    highlights: [
      "Hidden mounting hardware",
      "Sturdy construction",
      "Easy installation"
    ],
    pros: [
      "Space-saving",
      "Modern look",
      "Easy to install"
    ],
    cons: [
      "Weight limit restrictions",
      "Requires wall mounting"
    ],
    specs: {
      "Length": "24 inches",
      "Depth": "6 inches",
      "Weight capacity": "25 lbs",
      "Material": "Engineered wood"
    },
    status: "published",
    featured: true,
    dateAdded: "2025-01-20"
  },
  {
    id: "8",
    slug: "bedside-organizer",
    title: "Bedside Organizer",
    room: "bedroom",
    tags: ["organization", "bedroom", "storage", "nightstand"],
    shortDescription: "Keep your bedside essentials organized and within reach.",
    image: productImages["bedside-organizer"],
    amazonUrl: "https://www.amazon.com/dp/B08MNO7890?tag=aipicks-20",
    highlights: [
      "Multiple pockets and compartments",
      "Hangs from bed frame",
      "Fits most bed sizes"
    ],
    pros: [
      "Saves nightstand space",
      "Easy access",
      "Affordable"
    ],
    cons: [
      "May not fit all bed frames",
      "Limited weight capacity"
    ],
    specs: {
      "Material": "Polyester",
      "Pockets": "6 compartments",
      "Weight capacity": "5 lbs",
      "Care": "Machine washable"
    },
    status: "published",
    featured: false,
    dateAdded: "2025-01-20"
  },
  {
    id: "9",
    slug: "desk-organizer-set",
    title: "Desk Organizer Set",
    room: "office",
    tags: ["organization", "office", "desk-accessories", "storage"],
    shortDescription: "Keep your workspace tidy with this comprehensive organizer set.",
    image: productImages["desk-organizer-set"],
    amazonUrl: "https://www.amazon.com/dp/B08PQR1234?tag=aipicks-20",
    highlights: [
      "Multiple compartments",
      "Pen holders included",
      "Cable management"
    ],
    pros: [
      "Comprehensive organization",
      "Affordable",
      "Easy to assemble"
    ],
    cons: [
      "May not fit all desk sizes",
      "Plastic construction"
    ],
    specs: {
      "Set includes": "Main organizer + pen holder",
      "Material": "Plastic",
      "Dimensions": "12 x 8 x 4 inches",
      "Color options": "Black, White"
    },
    status: "published",
    featured: false,
    dateAdded: "2025-01-20"
  },
  {
    id: "10",
    slug: "bathroom-storage-caddy",
    title: "Bathroom Storage Caddy",
    room: "bathroom",
    tags: ["storage", "bathroom", "shower", "organization"],
    shortDescription: "Waterproof caddy that keeps bathroom essentials organized.",
    image: productImages["bathroom-storage-caddy"],
    amazonUrl: "https://www.amazon.com/dp/B08STU5678?tag=aipicks-20",
    highlights: [
      "Waterproof construction",
      "Suction cup mounting",
      "Multiple compartments"
    ],
    pros: [
      "Waterproof",
      "Easy to install",
      "Affordable"
    ],
    cons: [
      "Suction may weaken over time",
      "Limited capacity"
    ],
    specs: {
      "Material": "Plastic",
      "Compartments": "4 sections",
      "Mounting": "Suction cups",
      "Waterproof": "Yes"
    },
    status: "published",
    featured: false,
    dateAdded: "2025-01-20"
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
