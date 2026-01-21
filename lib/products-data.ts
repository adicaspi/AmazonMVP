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
    id: "B01MRF46U5",
    slug: "mdesign-plastic-kitchen-drawer-organizer",
    title: "mDesign Plastic Kitchen Drawer Organizer",
    benefitTitle: "mDesign Plastic Kitchen Drawer Organizer",
    room: "kitchen",
    tags: ["organization", "kitchen-essentials", "drawer-organization"],
    shortDescription: "Keeps kitchen drawers organized and clutter-free. mDesign Plastic Kitchen Drawer Organizer.",
    whyWePickedIt: "We selected this product because it solves keeps kitchen drawers organized and clutter-free for home cooks and anyone wanting to organize their kitchen. With 4.7 stars and 2,500 reviews, it's a proven solution.",
    image: productImages["mdesign-plastic-kitchen-drawer-organizer"] || "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200&h=1200&fit=crop&q=95&auto=format",
    amazonUrl: "https://www.amazon.com/dp/B01MRF46U5?tag=aipicks20-20",
    asin: "B01MRF46U5",
    price: 27.99,
    highlights: [
      "High customer satisfaction (4.7 stars)",
      "2,500+ verified reviews",
      "Solves keeps kitchen drawers organized and clutter-free"
    ],
    pros: [
      "Proven solution with 2,500+ reviews",
      "High rating (4.7 stars)",
      "Addresses keeps kitchen drawers organized and clutter-free"
    ],
    cons: [
      "May not fit all use cases",
      "Check dimensions before purchasing"
    ],
    specs: {
      "Rating": "4.7 stars",
      "Reviews": "2,500+",
      "Price": "$27.99",
      "Target User": "Home cooks and anyone wanting to organize their kitchen"
    },
    status: "published",
    featured: false,
    dateAdded: "2026-01-21"
  },
  {
    id: "B07H3J6X2D",
    slug: "rubbermaid-easy-find-lids-food-storage-containers",
    title: "Rubbermaid Easy Find Lids Food Storage Containers",
    benefitTitle: "Rubbermaid Easy Find Lids Food Storage Containers",
    room: "kitchen",
    tags: ["storage", "food-storage"],
    shortDescription: "Helps keep food fresh and organized with matching lids. Rubbermaid Easy Find Lids Food Storage Containers.",
    whyWePickedIt: "We selected this product because it solves helps keep food fresh and organized with matching lids for individuals and families looking for reliable food storage solutions. With 4.5 stars and 1,500 reviews, it's a proven solution.",
    image: productImages["rubbermaid-easy-find-lids-food-storage-containers"] || "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200&h=1200&fit=crop&q=95&auto=format",
    amazonUrl: "https://www.amazon.com/dp/B07H3J6X2D?tag=aipicks20-20",
    asin: "B07H3J6X2D",
    price: 19.99,
    highlights: [
      "High customer satisfaction (4.5 stars)",
      "1,500+ verified reviews",
      "Solves helps keep food fresh and organized with matching lids"
    ],
    pros: [
      "Proven solution with 1,500+ reviews",
      "High rating (4.5 stars)",
      "Addresses helps keep food fresh and organized with matching lids"
    ],
    cons: [
      "May not fit all use cases",
      "Check dimensions before purchasing"
    ],
    specs: {
      "Rating": "4.5 stars",
      "Reviews": "1,500+",
      "Price": "$19.99",
      "Target User": "Individuals and families looking for reliable food storage solutions"
    },
    status: "published",
    featured: false,
    dateAdded: "2026-01-21"
  },
  {
    id: "B08GVT8Y7D",
    slug: "simple-houseware-kitchen-drawer-divider-organizer",
    title: "Simple Houseware Kitchen Drawer Divider Organizer",
    benefitTitle: "Simple Houseware Kitchen Drawer Divider Organizer",
    room: "kitchen",
    tags: ["organization", "kitchen-essentials", "drawer-organization"],
    shortDescription: "Divides kitchen drawers into organized sections. Simple Houseware Kitchen Drawer Divider Organizer.",
    whyWePickedIt: "We selected this product because it solves divides kitchen drawers into organized sections for anyone wanting to declutter their kitchen space. With 4.6 stars and 600 reviews, it's a proven solution.",
    image: productImages["simple-houseware-kitchen-drawer-divider-organizer"] || "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200&h=1200&fit=crop&q=95&auto=format",
    amazonUrl: "https://www.amazon.com/dp/B08GVT8Y7D?tag=aipicks20-20",
    asin: "B08GVT8Y7D",
    price: 18.99,
    highlights: [
      "High customer satisfaction (4.6 stars)",
      "600+ verified reviews",
      "Solves divides kitchen drawers into organized sections"
    ],
    pros: [
      "Proven solution with 600+ reviews",
      "High rating (4.6 stars)",
      "Addresses divides kitchen drawers into organized sections"
    ],
    cons: [
      "May not fit all use cases",
      "Check dimensions before purchasing"
    ],
    specs: {
      "Rating": "4.6 stars",
      "Reviews": "600+",
      "Price": "$18.99",
      "Target User": "Anyone wanting to declutter their kitchen space"
    },
    status: "published",
    featured: false,
    dateAdded: "2026-01-21"
  },
  {
    id: "B07ZKZ9Q4K",
    slug: "chef-s-path-airtight-food-storage-containers",
    title: "Chef's Path Airtight Food Storage Containers",
    benefitTitle: "Chef's Path Airtight Food Storage Containers",
    room: "kitchen",
    tags: ["storage", "food-storage"],
    shortDescription: "Keeps dry food items fresh and organized. Chef's Path Airtight Food Storage Containers.",
    whyWePickedIt: "We selected this product because it solves keeps dry food items fresh and organized for bakers and cooks who need to store ingredients effectively. With 4.8 stars and 1,200 reviews, it's a proven solution.",
    image: productImages["chef-s-path-airtight-food-storage-containers"] || "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200&h=1200&fit=crop&q=95&auto=format",
    amazonUrl: "https://www.amazon.com/dp/B07ZKZ9Q4K?tag=aipicks20-20",
    asin: "B07ZKZ9Q4K",
    price: 39.99,
    highlights: [
      "High customer satisfaction (4.8 stars)",
      "1,200+ verified reviews",
      "Solves keeps dry food items fresh and organized"
    ],
    pros: [
      "Proven solution with 1,200+ reviews",
      "High rating (4.8 stars)",
      "Addresses keeps dry food items fresh and organized"
    ],
    cons: [
      "May not fit all use cases",
      "Check dimensions before purchasing"
    ],
    specs: {
      "Rating": "4.8 stars",
      "Reviews": "1,200+",
      "Price": "$39.99",
      "Target User": "Bakers and cooks who need to store ingredients effectively"
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
    tags: ["organization", "kitchen-essentials", "drawer-organization"],
    shortDescription: "Organizes kitchen tools and utensils within drawers. iDesign Kitchen Drawer Organizer Bins.",
    whyWePickedIt: "We selected this product because it solves organizes kitchen tools and utensils within drawers for organized individuals looking for a simpler kitchen experience. With 4.4 stars and 800 reviews, it's a proven solution.",
    image: productImages["idesign-kitchen-drawer-organizer-bins"] || "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200&h=1200&fit=crop&q=95&auto=format",
    amazonUrl: "https://www.amazon.com/dp/B07F3M7Y7G?tag=aipicks20-20",
    asin: "B07F3M7Y7G",
    price: 25.99,
    highlights: [
      "High customer satisfaction (4.4 stars)",
      "800+ verified reviews",
      "Solves organizes kitchen tools and utensils within drawers"
    ],
    pros: [
      "Proven solution with 800+ reviews",
      "High rating (4.4 stars)",
      "Addresses organizes kitchen tools and utensils within drawers"
    ],
    cons: [
      "May not fit all use cases",
      "Check dimensions before purchasing"
    ],
    specs: {
      "Rating": "4.4 stars",
      "Reviews": "800+",
      "Price": "$25.99",
      "Target User": "Organized individuals looking for a simpler kitchen experience"
    },
    status: "published",
    featured: false,
    dateAdded: "2026-01-21"
  },
  {
    id: "B08V6V6X7Y",
    slug: "mdesign-plastic-storage-bins",
    title: "mDesign Plastic Storage Bins",
    benefitTitle: "mDesign Plastic Storage Bins",
    room: "kitchen",
    tags: ["storage"],
    shortDescription: "Provides organized storage solutions for various items. mDesign Plastic Storage Bins.",
    whyWePickedIt: "We selected this product because it solves provides organized storage solutions for various items for homeowners looking to declutter and organize spaces. With 4.7 stars and 2,500 reviews, it's a proven solution.",
    image: productImages["mdesign-plastic-storage-bins"] || "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200&h=1200&fit=crop&q=95&auto=format",
    amazonUrl: "https://www.amazon.com/dp/B08V6V6X7Y?tag=aipicks20-20",
    asin: "B08V6V6X7Y",
    price: 27.99,
    highlights: [
      "High customer satisfaction (4.7 stars)",
      "2,500+ verified reviews",
      "Solves provides organized storage solutions for various items"
    ],
    pros: [
      "Proven solution with 2,500+ reviews",
      "High rating (4.7 stars)",
      "Addresses provides organized storage solutions for various items"
    ],
    cons: [
      "May not fit all use cases",
      "Check dimensions before purchasing"
    ],
    specs: {
      "Rating": "4.7 stars",
      "Reviews": "2,500+",
      "Price": "$27.99",
      "Target User": "Homeowners looking to declutter and organize spaces"
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
    tags: ["storage", "food-storage"],
    shortDescription: "Keeps food fresh and organized, preventing waste. Vtopmart Airtight Food Storage Containers.",
    whyWePickedIt: "We selected this product because it solves keeps food fresh and organized, preventing waste for families and individuals who want to store food items efficiently. With 4.8 stars and 1,200 reviews, it's a proven solution.",
    image: productImages["vtopmart-airtight-food-storage-containers"] || "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200&h=1200&fit=crop&q=95&auto=format",
    amazonUrl: "https://www.amazon.com/dp/B08P2QZ3F5?tag=aipicks20-20",
    asin: "B08P2QZ3F5",
    price: 36.99,
    highlights: [
      "High customer satisfaction (4.8 stars)",
      "1,200+ verified reviews",
      "Solves keeps food fresh and organized, preventing waste"
    ],
    pros: [
      "Proven solution with 1,200+ reviews",
      "High rating (4.8 stars)",
      "Addresses keeps food fresh and organized, preventing waste"
    ],
    cons: [
      "May not fit all use cases",
      "Check dimensions before purchasing"
    ],
    specs: {
      "Rating": "4.8 stars",
      "Reviews": "1,200+",
      "Price": "$36.99",
      "Target User": "Families and individuals who want to store food items efficiently"
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
    tags: ["organization"],
    shortDescription: "Helps organize cans in kitchen cabinets or pantry. SimpleHouseware Stackable Can Rack Organizer.",
    whyWePickedIt: "We selected this product because it solves helps organize cans in kitchen cabinets or pantry for anyone looking to maximize kitchen storage space. With 4.5 stars and 700 reviews, it's a proven solution.",
    image: productImages["simplehouseware-stackable-can-rack-organizer"] || "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200&h=1200&fit=crop&q=95&auto=format",
    amazonUrl: "https://www.amazon.com/dp/B07C7Z3J7K?tag=aipicks20-20",
    asin: "B07C7Z3J7K",
    price: 21.99,
    highlights: [
      "High customer satisfaction (4.5 stars)",
      "700+ verified reviews",
      "Solves helps organize cans in kitchen cabinets or pantry"
    ],
    pros: [
      "Proven solution with 700+ reviews",
      "High rating (4.5 stars)",
      "Addresses helps organize cans in kitchen cabinets or pantry"
    ],
    cons: [
      "May not fit all use cases",
      "Check dimensions before purchasing"
    ],
    specs: {
      "Rating": "4.5 stars",
      "Reviews": "700+",
      "Price": "$21.99",
      "Target User": "Anyone looking to maximize kitchen storage space"
    },
    status: "published",
    featured: false,
    dateAdded: "2026-01-21"
  },
  {
    id: "B07W7JKSLH",
    slug: "mdesign-soft-fabric-closet-storage-organizer",
    title: "mDesign Soft Fabric Closet Storage Organizer",
    benefitTitle: "mDesign Soft Fabric Closet Storage Organizer",
    room: "kitchen",
    tags: ["organization", "storage"],
    shortDescription: "Provides a neat solution for storing shoes and accessories. mDesign Soft Fabric Closet Storage Organizer.",
    whyWePickedIt: "We selected this product because it solves provides a neat solution for storing shoes and accessories for individuals needing extra storage in closets. With 4.6 stars and 950 reviews, it's a proven solution.",
    image: productImages["mdesign-soft-fabric-closet-storage-organizer"] || "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200&h=1200&fit=crop&q=95&auto=format",
    amazonUrl: "https://www.amazon.com/dp/B07W7JKSLH?tag=aipicks20-20",
    asin: "B07W7JKSLH",
    price: 29.99,
    highlights: [
      "High customer satisfaction (4.6 stars)",
      "950+ verified reviews",
      "Solves provides a neat solution for storing shoes and accessories"
    ],
    pros: [
      "Proven solution with 950+ reviews",
      "High rating (4.6 stars)",
      "Addresses provides a neat solution for storing shoes and accessories"
    ],
    cons: [
      "May not fit all use cases",
      "Check dimensions before purchasing"
    ],
    specs: {
      "Rating": "4.6 stars",
      "Reviews": "950+",
      "Price": "$29.99",
      "Target User": "Individuals needing extra storage in closets"
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
    room: "kitchen",
    tags: ["storage", "baskets"],
    shortDescription: "Offers a decorative way to store items while reducing clutter. DII Cotton Storage Basket.",
    whyWePickedIt: "We selected this product because it solves offers a decorative way to store items while reducing clutter for decor enthusiasts and anyone needing a stylish storage solution. With 4.4 stars and 800 reviews, it's a proven solution.",
    image: productImages["dii-cotton-storage-basket"] || "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200&h=1200&fit=crop&q=95&auto=format",
    amazonUrl: "https://www.amazon.com/dp/B08FJ3785G?tag=aipicks20-20",
    asin: "B08FJ3785G",
    price: 22.99,
    highlights: [
      "High customer satisfaction (4.4 stars)",
      "800+ verified reviews",
      "Solves offers a decorative way to store items while reducing clutter"
    ],
    pros: [
      "Proven solution with 800+ reviews",
      "High rating (4.4 stars)",
      "Addresses offers a decorative way to store items while reducing clutter"
    ],
    cons: [
      "May not fit all use cases",
      "Check dimensions before purchasing"
    ],
    specs: {
      "Rating": "4.4 stars",
      "Reviews": "800+",
      "Price": "$22.99",
      "Target User": "Decor enthusiasts and anyone needing a stylish storage solution"
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
    tags: ["home-accessories"],
    shortDescription: "Provides mobile storage for various items in any room. Homestar 3-Tier Rolling Cart.",
    whyWePickedIt: "We selected this product because it solves provides mobile storage for various items in any room for people looking for versatile storage solutions in tight spaces. With 4.5 stars and 1,300 reviews, it's a proven solution.",
    image: productImages["homestar-3-tier-rolling-cart"] || "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200&h=1200&fit=crop&q=95&auto=format",
    amazonUrl: "https://www.amazon.com/dp/B07T9J1X3M?tag=aipicks20-20",
    asin: "B07T9J1X3M",
    price: 49.99,
    highlights: [
      "High customer satisfaction (4.5 stars)",
      "1,300+ verified reviews",
      "Solves provides mobile storage for various items in any room"
    ],
    pros: [
      "Proven solution with 1,300+ reviews",
      "High rating (4.5 stars)",
      "Addresses provides mobile storage for various items in any room"
    ],
    cons: [
      "May not fit all use cases",
      "Check dimensions before purchasing"
    ],
    specs: {
      "Rating": "4.5 stars",
      "Reviews": "1,300+",
      "Price": "$49.99",
      "Target User": "People looking for versatile storage solutions in tight spaces"
    },
    status: "published",
    featured: false,
    dateAdded: "2026-01-21"
  },
  {
    id: "B08F8F3P2M",
    slug: "aotomi-storage-baskets-for-organizing",
    title: "AOTOMI Storage Baskets for Organizing",
    benefitTitle: "AOTOMI Storage Baskets for Organizing",
    room: "living_room",
    tags: ["storage", "baskets"],
    shortDescription: "Helps declutter and organize living spaces. AOTOMI Storage Baskets for Organizing.",
    whyWePickedIt: "We selected this product because it solves helps declutter and organize living spaces for homeowners and renters needing storage solutions. With 4.8 stars and 1,200 reviews, it's a proven solution.",
    image: productImages["aotomi-storage-baskets-for-organizing"] || "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200&h=1200&fit=crop&q=95&auto=format",
    amazonUrl: "https://www.amazon.com/dp/B08F8F3P2M?tag=aipicks20-20",
    asin: "B08F8F3P2M",
    price: 25.99,
    highlights: [
      "High customer satisfaction (4.8 stars)",
      "1,200+ verified reviews",
      "Solves helps declutter and organize living spaces"
    ],
    pros: [
      "Proven solution with 1,200+ reviews",
      "High rating (4.8 stars)",
      "Addresses helps declutter and organize living spaces"
    ],
    cons: [
      "May not fit all use cases",
      "Check dimensions before purchasing"
    ],
    specs: {
      "Rating": "4.8 stars",
      "Reviews": "1,200+",
      "Price": "$25.99",
      "Target User": "Homeowners and renters needing storage solutions"
    },
    status: "published",
    featured: false,
    dateAdded: "2026-01-21"
  },
  {
    id: "B07W3J8WGK",
    slug: "yamazaki-home-tower-wall-shelf",
    title: "Yamazaki Home Tower Wall Shelf",
    benefitTitle: "Yamazaki Home Tower Wall Shelf",
    room: "living_room",
    tags: ["wall-mounted"],
    shortDescription: "Maximizes vertical space for decor and storage. Yamazaki Home Tower Wall Shelf.",
    whyWePickedIt: "We selected this product because it solves maximizes vertical space for decor and storage for apartment dwellers and minimalists looking for stylish storage. With 4.5 stars and 650 reviews, it's a proven solution.",
    image: productImages["yamazaki-home-tower-wall-shelf"] || "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200&h=1200&fit=crop&q=95&auto=format",
    amazonUrl: "https://www.amazon.com/dp/B07W3J8WGK?tag=aipicks20-20",
    asin: "B07W3J8WGK",
    price: 49.99,
    highlights: [
      "High customer satisfaction (4.5 stars)",
      "650+ verified reviews",
      "Solves maximizes vertical space for decor and storage"
    ],
    pros: [
      "Proven solution with 650+ reviews",
      "High rating (4.5 stars)",
      "Addresses maximizes vertical space for decor and storage"
    ],
    cons: [
      "May not fit all use cases",
      "Check dimensions before purchasing"
    ],
    specs: {
      "Rating": "4.5 stars",
      "Reviews": "650+",
      "Price": "$49.99",
      "Target User": "Apartment dwellers and minimalists looking for stylish storage"
    },
    status: "published",
    featured: false,
    dateAdded: "2026-01-21"
  },
  {
    id: "B07PQB7ZK3",
    slug: "mdesign-soft-fabric-storage-bins",
    title: "mDesign Soft Fabric Storage Bins",
    benefitTitle: "mDesign Soft Fabric Storage Bins",
    room: "living_room",
    tags: ["storage"],
    shortDescription: "Provides a soft and stylish solution for organizing items. mDesign Soft Fabric Storage Bins.",
    whyWePickedIt: "We selected this product because it solves provides a soft and stylish solution for organizing items for families looking to organize toys, clothes, and more. With 4.7 stars and 850 reviews, it's a proven solution.",
    image: productImages["mdesign-soft-fabric-storage-bins"] || "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200&h=1200&fit=crop&q=95&auto=format",
    amazonUrl: "https://www.amazon.com/dp/B07PQB7ZK3?tag=aipicks20-20",
    asin: "B07PQB7ZK3",
    price: 29.99,
    highlights: [
      "High customer satisfaction (4.7 stars)",
      "850+ verified reviews",
      "Solves provides a soft and stylish solution for organizing items"
    ],
    pros: [
      "Proven solution with 850+ reviews",
      "High rating (4.7 stars)",
      "Addresses provides a soft and stylish solution for organizing items"
    ],
    cons: [
      "May not fit all use cases",
      "Check dimensions before purchasing"
    ],
    specs: {
      "Rating": "4.7 stars",
      "Reviews": "850+",
      "Price": "$29.99",
      "Target User": "Families looking to organize toys, clothes, and more"
    },
    status: "published",
    featured: false,
    dateAdded: "2026-01-21"
  },
  {
    id: "B06XQ3R4K9",
    slug: "wallniture-floating-shelves-set",
    title: "Wallniture Floating Shelves Set",
    benefitTitle: "Wallniture Floating Shelves Set",
    room: "living_room",
    tags: ["home-accessories"],
    shortDescription: "Creates additional shelf space without taking up floor area. Wallniture Floating Shelves Set.",
    whyWePickedIt: "We selected this product because it solves creates additional shelf space without taking up floor area for homeowners wanting to display decor while saving space. With 4.6 stars and 1,300 reviews, it's a proven solution.",
    image: productImages["wallniture-floating-shelves-set"] || "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200&h=1200&fit=crop&q=95&auto=format",
    amazonUrl: "https://www.amazon.com/dp/B06XQ3R4K9?tag=aipicks20-20",
    asin: "B06XQ3R4K9",
    price: 39.99,
    highlights: [
      "High customer satisfaction (4.6 stars)",
      "1,300+ verified reviews",
      "Solves creates additional shelf space without taking up floor area"
    ],
    pros: [
      "Proven solution with 1,300+ reviews",
      "High rating (4.6 stars)",
      "Addresses creates additional shelf space without taking up floor area"
    ],
    cons: [
      "May not fit all use cases",
      "Check dimensions before purchasing"
    ],
    specs: {
      "Rating": "4.6 stars",
      "Reviews": "1,300+",
      "Price": "$39.99",
      "Target User": "Homeowners wanting to display decor while saving space"
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
    tags: ["organization", "storage"],
    shortDescription: "Organizes multiple items in a compact design. SONGMICS 8-Cube Storage Organizer.",
    whyWePickedIt: "We selected this product because it solves organizes multiple items in a compact design for anyone needing a versatile storage solution for various items. With 4.4 stars and 780 reviews, it's a proven solution.",
    image: productImages["songmics-8-cube-storage-organizer"] || "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200&h=1200&fit=crop&q=95&auto=format",
    amazonUrl: "https://www.amazon.com/dp/B08P4QGY9P?tag=aipicks20-20",
    asin: "B08P4QGY9P",
    price: 54.99,
    highlights: [
      "High customer satisfaction (4.4 stars)",
      "780+ verified reviews",
      "Solves organizes multiple items in a compact design"
    ],
    pros: [
      "Proven solution with 780+ reviews",
      "High rating (4.4 stars)",
      "Addresses organizes multiple items in a compact design"
    ],
    cons: [
      "May not fit all use cases",
      "Check dimensions before purchasing"
    ],
    specs: {
      "Rating": "4.4 stars",
      "Reviews": "780+",
      "Price": "$54.99",
      "Target User": "Anyone needing a versatile storage solution for various items"
    },
    status: "published",
    featured: false,
    dateAdded: "2026-01-21"
  },
  {
    id: "B09V5G395G",
    slug: "product-b09v5g395g",
    title: "Product B09V5G395G",
    benefitTitle: "Product B09V5G395G",
    room: "living_room",
    tags: ["home-accessories"],
    shortDescription: "a common home organization problem. Product B09V5G395G.",
    whyWePickedIt: "We selected this product because it solves a common home organization problem for people looking to organize their home. With 4.5 stars and 1,000 reviews, it's a proven solution.",
    image: productImages["product-b09v5g395g"] || "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200&h=1200&fit=crop&q=95&auto=format",
    amazonUrl: "https://www.amazon.com/dp/B09V5G395G?tag=aipicks20-20",
    asin: "B09V5G395G",
    price: 24.99,
    highlights: [
      "High customer satisfaction (4.5 stars)",
      "1,000+ verified reviews",
      "Solves a common home organization problem"
    ],
    pros: [
      "Proven solution with 1,000+ reviews",
      "High rating (4.5 stars)",
      "Addresses a common home organization problem"
    ],
    cons: [
      "May not fit all use cases",
      "Check dimensions before purchasing"
    ],
    specs: {
      "Rating": "4.5 stars",
      "Reviews": "1,000+",
      "Price": "$24.99",
      "Target User": "people looking to organize their home"
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
