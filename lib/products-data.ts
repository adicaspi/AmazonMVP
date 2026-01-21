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
  // Amazon Basics Cube Organizer Storage Bins - fabric storage cubes/baskets
  "amazon-basics-cube-organizer-storage-bins": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=1200&fit=crop&q=95&auto=format",
  
  // OIAHOMY Storage Basket - woven bathroom basket
  "oiahomy-storage-basket-bathroom": "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1200&h=1200&fit=crop&q=95&auto=format",
  
  // Vtopmart Drawer Organizers - clear plastic drawer organizers
  "vtopmart-drawer-organizers-25-pcs": "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200&h=1200&fit=crop&q=95&auto=format",
  
  // Jar Opener - kitchen tool for opening jars
  "jar-opener-weak-hands-seniors": "https://images.unsplash.com/photo-1556910096-6f5e72db6803?w=1200&h=1200&fit=crop&q=95&auto=format",
  
  // Amazon Basics Non-Stick Cookware Set - pots and pans
  "amazon-basics-non-stick-cookware-set": "https://images.unsplash.com/photo-1556910096-6f5e72db6803?w=1200&h=1200&fit=crop&q=95&auto=format",
  
  // Rubbermaid EasyStore Containers - food storage containers
  "rubbermaid-easystore-containers-18-piece": "https://images.unsplash.com/photo-1600431521340-491eca880813?w=1200&h=1200&fit=crop&q=95&auto=format",
  
  // BAYKA Floating Shelves - wall-mounted floating shelves
  "bayka-floating-shelves-rustic-brown": "https://images.unsplash.com/photo-1519710164249-6b06504d207e?w=1200&h=1200&fit=crop&q=95&auto=format",
  
  // Lifewit Silverware Drawer Organizer - utensil organizer
  "lifewit-silverware-drawer-organizer": "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200&h=1200&fit=crop&q=95&auto=format",
  
  // Vtopmart Stackable Organizer - stackable office organizer
  "vtopmart-stackable-organizer": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=1200&fit=crop&q=95&auto=format",
  
  // Amazon Basics Stackable Kitchen Shelves - metal kitchen shelves
  "amazon-basics-stackable-kitchen-shelves": "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200&h=1200&fit=crop&q=95&auto=format",
  
  // Amazon Basics Digital Kitchen Scale - kitchen scale
  "amazon-basics-digital-kitchen-scale": "https://images.unsplash.com/photo-1556910096-6f5e72db6803?w=1200&h=1200&fit=crop&q=95&auto=format",
  
  // Nicewell Food Scale - digital food scale
  "nicewell-food-scale-22lb": "https://images.unsplash.com/photo-1556910096-6f5e72db6803?w=1200&h=1200&fit=crop&q=95&auto=format",
};

export const products: Product[] = [
  {
    id: "B09V5G395G",
    slug: "amazon-basics-cube-organizer-storage-bins",
    title: "Amazon Basics Cube Organizer Storage Bins with Handles",
    benefitTitle: "6-pack collapsible fabric cubes for any space",
    room: "storage",
    tags: ["storage", "organization", "collapsible", "cubes", "baskets"],
    shortDescription: "Pack of 6 collapsible fabric storage cubes with handles, perfect for cube organizers, closets, shelves, and any storage need. 13\"x13\"x13\" each.",
    whyWePickedIt: "With 116,129 reviews and a 4.7-star rating, this is Amazon's #1 Best Seller in Open Home Storage Bins. The collapsible design saves space when not in use, and the fabric handles make them easy to carry. Perfect for organizing toys, clothes, accessories, or any items in cube storage systems.",
    image: "https://m.media-amazon.com/images/I/61yVDDy1LRL._AC_SL1500_.jpg",
    amazonUrl: "https://www.amazon.com/dp/B09V5G395G?tag=aipicks20-20",
    asin: "B09V5G395G",
    price: 15.56,
    highlights: [
      "4.7 out of 5 stars (116,129 reviews)",
      "#1 Best Seller in Open Home Storage Bins",
      "Pack of 6 cubes",
      "Collapsible fabric design",
      "Sewn-in fabric handles for easy carrying"
    ],
    pros: [
      "Excellent value - 6 cubes in one set",
      "Collapsible saves space when not in use",
      "Handles make them easy to carry",
      "Sturdy yet lightweight fabric",
      "Multifunctional - use as open-top bins or drawers"
    ],
    cons: [
      "Fabric material may not be as durable as plastic",
      "May not hold very heavy items"
    ],
    specs: {
      "Rating": "4.7 out of 5 stars",
      "Reviews": "116,129",
      "Price": "$15.56",
      "Dimensions": "13\"L x 13\"W x 13\"H each",
      "Material": "Fabric",
      "Quantity": "Pack of 6",
      "Features": "Collapsible, handles included",
      "Target User": "People looking to organize items in cube storage systems, closets, or shelves"
    },
    status: "published",
    featured: true,
    dateAdded: "2026-01-21"
  },
  {
    id: "B0B31C4XRM",
    slug: "oiahomy-storage-basket-bathroom",
    title: "OIAHOMY Storage Basket for Bathroom",
    benefitTitle: "Woven storage baskets for organized spaces",
    room: "bathroom",
    tags: ["bathroom", "storage", "baskets", "organization", "woven"],
    shortDescription: "Woven storage baskets perfect for bathroom organization, keeping toiletries, towels, and essentials neatly organized.",
    whyWePickedIt: "These woven storage baskets offer a stylish and practical solution for bathroom organization. The natural woven design adds warmth to any space while keeping essentials organized and easily accessible.",
    image: "https://m.media-amazon.com/images/I/81FjWAOY96L._AC_SL1500_.jpg",
    amazonUrl: "https://www.amazon.com/dp/B0B31C4XRM?tag=aipicks20-20",
    asin: "B0B31C4XRM",
    price: 24.99,
    highlights: [
      "Woven design for natural look",
      "Perfect for bathroom organization",
      "Durable construction",
      "Multiple size options available"
    ],
    pros: [
      "Stylish woven design",
      "Versatile storage solution",
      "Easy to clean",
      "Good value"
    ],
    cons: [
      "May not be waterproof",
      "Check dimensions before purchasing"
    ],
    specs: {
      "Price": "$24.99",
      "Material": "Woven",
      "Use": "Bathroom organization",
      "Target User": "People looking to organize bathroom essentials with stylish storage"
    },
    status: "published",
    featured: true,
    dateAdded: "2026-01-21"
  },
  {
    id: "B08KXKVT4K",
    slug: "vtopmart-drawer-organizers-25-pcs",
    title: "Vtopmart 25 PCS Clear Plastic Drawer Organizers Set",
    benefitTitle: "Versatile drawer organization for any room",
    room: "bathroom",
    tags: ["bathroom", "kitchen", "organization", "drawer-organizers"],
    shortDescription: "25-piece clear plastic drawer organizer set with 4 different sizes, perfect for organizing makeup, kitchen utensils, office supplies, and more.",
    whyWePickedIt: "With 39,823 reviews and a 4.7-star rating, this set offers incredible value. The 4 different sizes allow you to customize your drawer organization, and the clear design lets you see what's inside. Includes 100 silicone pads to prevent sliding.",
    image: "https://m.media-amazon.com/images/I/81yj+PUYVxL._AC_SL1500_.jpg",
    amazonUrl: "https://www.amazon.com/dp/B08KXKVT4K?tag=aipicks20-20",
    asin: "B08KXKVT4K",
    price: 18.99,
    highlights: [
      "4.7 out of 5 stars (39,823 reviews)",
      "25 pieces in 4 different sizes",
      "Includes 100 silicone pads for non-slip",
      "Clear design for easy visibility",
      "Stackable for space-saving storage"
    ],
    pros: [
      "Excellent value with 25 pieces",
      "Multiple sizes for versatile organization",
      "Non-slip silicone pads included",
      "Clear plastic for easy identification",
      "Stackable design saves space"
    ],
    cons: [
      "Smaller sizes may be too small for some items",
      "Plastic material may not be as durable as other options"
    ],
    specs: {
      "Rating": "4.7 out of 5 stars",
      "Reviews": "39,823",
      "Price": "$18.99",
      "Sizes": "9 x 6 x 2 inches (3pcs), 9 x 3 x 2 inches (6pcs), 6 x 3 x 2 inches (8pcs), 3 x 3 x 2 inches (8pcs)",
      "Material": "Clear plastic",
      "Target User": "People looking to organize drawers in bathroom, kitchen, bedroom, or office"
    },
    status: "published",
    featured: true,
    dateAdded: "2026-01-21"
  },
  {
    id: "B0B2NNNJXR",
    slug: "jar-opener-weak-hands-seniors",
    title: "Jar Opener for Weak Hands, Seniors with Arthritis",
    benefitTitle: "Easy jar opening for everyone",
    room: "kitchen",
    tags: ["kitchen", "accessibility", "tools", "seniors"],
    shortDescription: "5-in-1 multi-function bottle opener and jar opener set designed for people with weak hands, arthritis, or limited hand strength.",
    whyWePickedIt: "This set solves a real problem for many people - opening jars and bottles can be difficult or painful. With 5,708 reviews and a 4.3-star rating, it's proven to help seniors and those with arthritis maintain independence in the kitchen. The ergonomic design and multiple tools make it versatile for various container sizes.",
    image: "https://m.media-amazon.com/images/I/71TKkjJC2JL._AC_SL1500_.jpg",
    amazonUrl: "https://www.amazon.com/dp/B0B2NNNJXR?tag=aipicks20-20",
    asin: "B0B2NNNJXR",
    price: 11.99,
    highlights: [
      "4.3 out of 5 stars (5,708 reviews)",
      "5-in-1 multi-function design",
      "Ergonomic handles for easy grip",
      "Non-slip rubber gripper pad included",
      "Opens jars, bottles, and cans"
    ],
    pros: [
      "Designed specifically for weak hands",
      "Multiple tools in one set",
      "Non-slip grip for safety",
      "Affordable price point",
      "Works on various container sizes"
    ],
    cons: [
      "May not fit very large jars",
      "Requires some hand strength to operate the opener"
    ],
    specs: {
      "Rating": "4.3 out of 5 stars",
      "Reviews": "5,708",
      "Price": "$11.99",
      "Includes": "4-in-1 jar opener, 5-in-1 bottle opener, non-slip gripper pad",
      "Material": "Plastic with rubber grips",
      "Target User": "Seniors, people with arthritis, or anyone with limited hand strength"
    },
    status: "published",
    featured: false,
    dateAdded: "2026-01-21"
  },
  {
    id: "B074817DK1",
    slug: "amazon-basics-non-stick-cookware-set",
    title: "Amazon Basics 8-Piece Non-Stick Kitchen Cookware Set",
    benefitTitle: "Complete cookware set for everyday cooking",
    room: "kitchen",
    tags: ["kitchen", "cookware", "non-stick", "pots", "pans"],
    shortDescription: "8-piece non-stick cookware set including pots and pans, perfect for everyday cooking needs.",
    whyWePickedIt: "This comprehensive cookware set provides everything you need for daily cooking. The non-stick coating makes cooking and cleaning easier, and the set includes essential pieces for a complete kitchen.",
    image: "https://m.media-amazon.com/images/I/71mDTOYtDSL._AC_SL1500_.jpg",
    amazonUrl: "https://www.amazon.com/dp/B074817DK1?tag=aipicks20-20",
    asin: "B074817DK1",
    price: 24.99,
    highlights: [
      "8-piece cookware set",
      "Non-stick coating",
      "Complete kitchen solution",
      "Easy to clean"
    ],
    pros: [
      "Complete set for everyday cooking",
      "Non-stick surface for easy cooking",
      "Dishwasher safe",
      "Good value for 8 pieces"
    ],
    cons: [
      "Non-stick coating may wear over time",
      "Check included pieces before purchasing"
    ],
    specs: {
      "Price": "$24.99",
      "Pieces": "8",
      "Coating": "Non-stick",
      "Target User": "People looking for a complete cookware set for everyday cooking"
    },
    status: "published",
    featured: false,
    dateAdded: "2026-01-21"
  },
  {
    id: "B0FD7LSCTD",
    slug: "rubbermaid-easystore-containers-18-piece",
    title: "Rubbermaid EasyStore Large Containers, 18-Piece Set",
    benefitTitle: "Stackable food storage made in USA",
    room: "kitchen",
    tags: ["kitchen", "food-storage", "meal-prep", "containers"],
    shortDescription: "18-piece set of food storage containers with lids, designed for easy stacking and organization. Made in the USA with vented lids for microwave use.",
    whyWePickedIt: "With 20,055 reviews and a 4.8-star rating, Rubbermaid is America's #1 food storage brand. These containers are 20% more durable, stack perfectly, and the vented lids make reheating food safe and easy. Made in the USA, they're built to last.",
    image: "https://m.media-amazon.com/images/I/71U7SEX345L._AC_SL1500_.jpg",
    amazonUrl: "https://www.amazon.com/dp/B0FD7LSCTD?tag=aipicks20-20",
    asin: "B0FD7LSCTD",
    price: 19.99,
    highlights: [
      "4.8 out of 5 stars (20,055 reviews)",
      "Made in the USA",
      "20% more durable than standard containers",
      "Vented lids for safe microwave reheating",
      "Ridged lids for sturdier stacking"
    ],
    pros: [
      "Excellent durability",
      "Stackable design saves space",
      "Vented lids prevent spills when reheating",
      "SecureGrip lids ensure tight seal",
      "Made in USA quality"
    ],
    cons: [
      "Lids can be difficult to close for some users",
      "May stain with certain foods (tomato sauce, turmeric)"
    ],
    specs: {
      "Rating": "4.8 out of 5 stars",
      "Reviews": "20,055",
      "Price": "$19.99",
      "Includes": "Four 0.77-cup containers, two 3.57-cup containers, two 5.26-cup containers, one 14.9-cup container, all with lids",
      "Material": "BPA-free plastic",
      "Features": "Microwave safe, dishwasher safe, stackable",
      "Target User": "People who meal prep, store leftovers, or need organized food storage"
    },
    status: "published",
    featured: false,
    dateAdded: "2026-01-21"
  },
  {
    id: "B0DT5V24MS",
    slug: "bayka-floating-shelves-rustic-brown",
    title: "BAYKA Floating Shelves Bathroom for Wall - Set of 3",
    benefitTitle: "Modern floating shelves for any room",
    room: "bathroom",
    tags: ["bathroom", "bedroom", "living-room", "decor", "shelves"],
    shortDescription: "Set of 3 rustic brown floating shelves with invisible brackets, perfect for bathroom, bedroom, kitchen, or living room decor. Each shelf supports up to 22 lbs.",
    whyWePickedIt: "With 6,696 reviews and a 4.4-star rating, these floating shelves offer a modern, clean look with invisible brackets. The rustic brown finish adds warmth to any space, and they're easy to install in just 15 minutes. Perfect for displaying decor, books, or organizing essentials.",
    image: "https://m.media-amazon.com/images/I/81vcpoC1YwL._AC_SL1500_.jpg",
    amazonUrl: "https://www.amazon.com/dp/B0DT5V24MS?tag=aipicks20-20",
    asin: "B0DT5V24MS",
    price: 25.58,
    highlights: [
      "4.4 out of 5 stars (6,696 reviews)",
      "Set of 3 shelves",
      "Invisible bracket design",
      "22 lbs weight capacity per shelf",
      "15.7 inches long each"
    ],
    pros: [
      "Clean, modern floating look",
      "Easy installation (15 minutes)",
      "Includes level tool",
      "Multiple color options available",
      "Good value for 3 shelves"
    ],
    cons: [
      "Some users report shelves can tilt forward",
      "Drywall anchors may need upgrading for heavy items",
      "Not solid wood (MDF material)"
    ],
    specs: {
      "Rating": "4.4 out of 5 stars",
      "Reviews": "6,696",
      "Price": "$25.58",
      "Dimensions": "6.7\"D x 15.7\"W x 1.2\"H each",
      "Weight Capacity": "22 lbs per shelf",
      "Material": "Engineered wood (MDF)",
      "Includes": "3 shelves, mounting hardware, level tool",
      "Target User": "People looking to add storage and decor to bathroom, bedroom, kitchen, or living room"
    },
    status: "published",
    featured: false,
    dateAdded: "2026-01-21"
  },
  {
    id: "B0F8HFLNQG",
    slug: "lifewit-silverware-drawer-organizer",
    title: "Lifewit Silverware Drawer Organizer, Expandable Utensil Tray",
    benefitTitle: "Adjustable drawer organization for cutlery",
    room: "kitchen",
    tags: ["kitchen", "drawer-organizer", "silverware", "cutlery"],
    shortDescription: "Expandable silverware drawer organizer that adjusts from 8.5\" to 14\" wide, with 7 compartments for organizing spoons, forks, knives, and utensils.",
    whyWePickedIt: "With 25,840 reviews and a 4.7-star rating, this expandable organizer is perfect for drawers of various sizes. The BPA-free design is food-safe, and the unique groove design makes it easy to access your cutlery. At under $6, it's an incredible value.",
    image: "https://m.media-amazon.com/images/I/61+heXD7SeL._AC_SL1500_.jpg",
    amazonUrl: "https://www.amazon.com/dp/B0F8HFLNQG?tag=aipicks20-20",
    asin: "B0F8HFLNQG",
    price: 5.98,
    highlights: [
      "4.7 out of 5 stars (25,840 reviews)",
      "Expandable from 8.5\" to 14\" wide",
      "7 compartments for easy sorting",
      "BPA-free and food-safe",
      "Contains 95% recycled material"
    ],
    pros: [
      "Adjustable width fits various drawer sizes",
      "Excellent value under $6",
      "BPA-free and food-safe",
      "Easy to clean",
      "Prevents partition displacement with buckle design"
    ],
    cons: [
      "Designed for standard cutlery, not oversized utensils",
      "Plastic material may not be as durable as metal"
    ],
    specs: {
      "Rating": "4.7 out of 5 stars",
      "Reviews": "25,840",
      "Price": "$5.98 (Prime price)",
      "Dimensions": "8.5-14\"W x 12\"D x 1.5\"H",
      "Compartments": "7",
      "Material": "BPA-free PP plastic (95% recycled)",
      "Target User": "People looking to organize silverware and cutlery in kitchen drawers"
    },
    status: "published",
    featured: false,
    dateAdded: "2026-01-21"
  },
  {
    id: "B0CXLK9PJ9",
    slug: "vtopmart-stackable-organizer",
    title: "Vtopmart Stackable Organizer for Supplies",
    benefitTitle: "Stackable storage for office and home supplies",
    room: "office",
    tags: ["office", "storage", "stackable", "organization", "supplies"],
    shortDescription: "Stackable organizer perfect for organizing office supplies, craft materials, and home essentials with multiple compartments.",
    whyWePickedIt: "This stackable organizer offers versatile storage for various items. The stackable design maximizes vertical space, making it perfect for desks, shelves, or any area where you need organized storage.",
    image: "https://m.media-amazon.com/images/I/71A1QQMJjgL._AC_SL1500_.jpg",
    amazonUrl: "https://www.amazon.com/dp/B0CXLK9PJ9?tag=aipicks20-20",
    asin: "B0CXLK9PJ9",
    price: 24.99,
    highlights: [
      "Stackable design saves space",
      "Multiple compartments",
      "Versatile storage solution",
      "Perfect for office or home"
    ],
    pros: [
      "Maximizes vertical space",
      "Multiple compartments for organization",
      "Stackable for flexible arrangement",
      "Durable construction"
    ],
    cons: [
      "May require assembly",
      "Check dimensions before purchasing"
    ],
    specs: {
      "Price": "$24.99",
      "Design": "Stackable",
      "Use": "Office supplies, craft materials, home organization",
      "Target User": "People looking to organize supplies in office or home spaces"
    },
    status: "published",
    featured: false,
    dateAdded: "2026-01-21"
  },
  {
    id: "B07XM8Y26Y",
    slug: "amazon-basics-stackable-kitchen-shelves",
    title: "Amazon Basics Stackable Metal Kitchen Storage Shelves",
    benefitTitle: "Double your cabinet space instantly",
    room: "kitchen",
    tags: ["kitchen", "storage", "shelves", "cabinet-organizer"],
    shortDescription: "Set of 2 stackable metal wire racks for kitchen and cabinet organization. Perfect for dishes, coffee cups, small cans, and seasonings.",
    whyWePickedIt: "With 11,969 reviews and a 4.4-star rating, these shelves effectively double your cabinet space. The tool-free assembly makes setup instant, and they can be used side-by-side or stacked. The plastic-coated wire prevents damage to delicate items.",
    image: "https://m.media-amazon.com/images/I/61AnB4vPuAL._AC_SL1500_.jpg",
    amazonUrl: "https://www.amazon.com/dp/B07XM8Y26Y?tag=aipicks20-20",
    asin: "B07XM8Y26Y",
    price: 19.09,
    highlights: [
      "4.4 out of 5 stars (11,969 reviews)",
      "Set of 2 shelves",
      "Tool-free assembly",
      "Stackable or side-by-side use",
      "Plastic-coated wire prevents damage"
    ],
    pros: [
      "Doubles cabinet space",
      "No tools required for assembly",
      "Versatile - stack or use separately",
      "Works great in pantries and freezers",
      "Affordable price"
    ],
    cons: [
      "Some users find them smaller than expected",
      "Legs may be wobbly on some units",
      "Fixed size (not expandable)"
    ],
    specs: {
      "Rating": "4.4 out of 5 stars",
      "Reviews": "11,969",
      "Price": "$19.09",
      "Dimensions": "12.5\"L x 8\"D x 4.5\"H each",
      "Material": "Alloy steel with plastic coating",
      "Assembly": "Tool-free",
      "Target User": "People looking to maximize cabinet, pantry, or freezer space"
    },
    status: "published",
    featured: false,
    dateAdded: "2026-01-21"
  },
  {
    id: "B06X9NQ8GX",
    slug: "amazon-basics-digital-kitchen-scale",
    title: "Amazon Basics Digital Kitchen Scale with LCD Display",
    benefitTitle: "Precise measurements for better cooking",
    room: "kitchen",
    tags: ["kitchen", "baking", "cooking", "scale", "measuring"],
    shortDescription: "Digital kitchen scale with stainless steel platform and LCD display. Weighs up to 11 pounds with tare function. Batteries included.",
    whyWePickedIt: "With 111,028 reviews and a 4.7-star rating, this is Amazon's #1 best-selling digital kitchen scale. It's accurate to the gram, easy to use, and comes with batteries ready to go. Perfect for baking, meal prep, and portion control.",
    image: "https://m.media-amazon.com/images/I/71eiII6MS-L._AC_SL1500_.jpg",
    amazonUrl: "https://www.amazon.com/dp/B06X9NQ8GX?tag=aipicks20-20",
    asin: "B06X9NQ8GX",
    price: 6.81,
    highlights: [
      "4.7 out of 5 stars (111,028 reviews)",
      "#1 Best Seller in Digital Kitchen Scales",
      "Weighs up to 11 pounds (5000g)",
      "Tare function for container weight",
      "Batteries included"
    ],
    pros: [
      "Extremely accurate measurements",
      "Large, easy-to-read display",
      "Tare function for multiple ingredients",
      "Compact size fits in drawer",
      "Excellent value for money"
    ],
    cons: [
      "Minimum weight is 2 grams (may not work for very small amounts)",
      "Some users report issues with accuracy at low weights"
    ],
    specs: {
      "Rating": "4.7 out of 5 stars",
      "Reviews": "111,028",
      "Price": "$6.81",
      "Weight Capacity": "Up to 11 lbs (5000g)",
      "Minimum Weight": "2 grams",
      "Display": "LCD",
      "Units": "Pounds, ounces, grams, fluid ounces, ml",
      "Batteries": "2 AAA (included)",
      "Target User": "Home cooks, bakers, and people tracking food portions"
    },
    status: "published",
    featured: false,
    dateAdded: "2026-01-21"
  },
  {
    id: "B07S6F6LHQ",
    slug: "nicewell-food-scale-22lb",
    title: "Nicewell Food Scale, 22lb Digital Kitchen Scale",
    benefitTitle: "Sleek design with precise measurements",
    room: "kitchen",
    tags: ["kitchen", "baking", "cooking", "scale", "measuring"],
    shortDescription: "22lb digital kitchen scale with tempered glass and stainless steel platform. Large 9\"x6.3\" platform with backlit LCD display. Measures in 5 units.",
    whyWePickedIt: "With 63,208 reviews and a 4.7-star rating, this scale offers a sleek, iPad-like design with excellent accuracy. The large platform accommodates bowls easily, and the tempered glass surface is easy to clean. Perfect for serious bakers and home cooks.",
    image: "https://m.media-amazon.com/images/I/61hEtbJv3YL._AC_SL1500_.jpg",
    amazonUrl: "https://www.amazon.com/dp/B07S6F6LHQ?tag=aipicks20-20",
    asin: "B07S6F6LHQ",
    price: 23.99,
    highlights: [
      "4.7 out of 5 stars (63,208 reviews)",
      "22lb (10kg) capacity",
      "Large 9\"x6.3\" platform",
      "Tempered glass and stainless steel",
      "5 measurement units"
    ],
    pros: [
      "Sleek, modern design",
      "Large platform for bowls",
      "Easy to clean glass surface",
      "Accurate to 1g/0.1oz",
      "Backlit display for easy reading"
    ],
    cons: [
      "Glass surface can scratch easily",
      "Higher price point than basic scales",
      "Minimum weight is 3g (0.1oz)"
    ],
    specs: {
      "Rating": "4.7 out of 5 stars",
      "Reviews": "63,208",
      "Price": "$23.99",
      "Weight Capacity": "Up to 22 lbs (10kg)",
      "Minimum Weight": "3g (0.1oz)",
      "Platform Size": "9\" x 6.3\"",
      "Display": "Backlit LCD",
      "Units": "g, kg, lb:oz, fl.oz, ml",
      "Batteries": "2 AAA (included)",
      "Material": "Tempered glass and stainless steel",
      "Target User": "Serious bakers, home cooks, and people who need precise measurements"
    },
    status: "published",
    featured: false,
    dateAdded: "2026-01-21"
  },
  {
    id: "B000EOEAW6",
    slug: "melissa-doug-pets-wooden-chunky-puzzle",
    title: "Melissa & Doug Pets Wooden Chunky Puzzle - 8 Pieces",
    benefitTitle: "Educational wooden puzzle for toddlers",
    room: "kids_room",
    tags: ["toys", "kids", "melissa-doug", "educational", "puzzle", "wooden"],
    shortDescription: "8-piece wooden chunky puzzle featuring adorable pet animals. Perfect for developing motor skills and hand-eye coordination in toddlers ages 2+.",
    whyWePickedIt: "Melissa & Doug's chunky puzzles are beloved by parents for their durability and educational value. The thick wooden pieces are easy for little hands to grasp, and each piece can stand upright for pretend play. FSC-certified wood ensures quality and sustainability.",
    image: "https://m.media-amazon.com/images/I/71EgKAe11PL._AC_SL1500_.jpg",
    amazonUrl: "https://www.amazon.com/Melissa-Doug-Wooden-Chunky-Puzzle/dp/B000EOEAW6?tag=aipicks20-20",
    asin: "B000EOEAW6",
    price: 8.99,
    highlights: [
      "8 chunky wooden puzzle pieces",
      "FSC-certified sustainable wood",
      "Ages 2+ years",
      "Pieces stand upright for pretend play",
      "Full-color matching pictures underneath"
    ],
    pros: [
      "Extremely durable - lasts for years",
      "Perfect size for toddler hands",
      "Educational and entertaining",
      "Pieces double as play figures",
      "High-quality Melissa & Doug construction"
    ],
    cons: [
      "Only 8 pieces - may be too simple for older kids",
      "Paint may chip with very rough play"
    ],
    specs: {
      "Brand": "Melissa & Doug",
      "Age Range": "2+ years",
      "Pieces": "8 wooden pieces",
      "Material": "FSC-certified wood",
      "Dimensions": "11.75\" x 8.75\" x 1.25\"",
      "Target User": "Toddlers and preschoolers learning motor skills and animal recognition"
    },
    status: "published",
    featured: false,
    dateAdded: "2026-01-21"
  },
  {
    id: "B00CPHX6YI",
    slug: "melissa-doug-stainless-steel-pots-pans",
    title: "Melissa & Doug Stainless Steel Pots & Pans Pretend Play Kitchen Set",
    benefitTitle: "Realistic pretend play cookware for kids",
    room: "kids_room",
    tags: ["toys", "kids", "melissa-doug", "pretend-play", "kitchen", "cookware"],
    shortDescription: "8-piece stainless steel play cookware set including pots, pans, and lids. Realistic kitchen play for children ages 3+.",
    whyWePickedIt: "Unlike plastic play sets, this stainless steel cookware looks and feels realistic, making pretend play more engaging. The durable metal construction means it can withstand years of play and even be passed down to siblings. Perfect for encouraging imagination and role-play.",
    image: "https://m.media-amazon.com/images/I/61NN1xU+ZML._AC_SL1500_.jpg",
    amazonUrl: "https://www.amazon.com/Melissa-Doug-Stainless-Pretend-Kitchen/dp/B00CPHX6YI?tag=aipicks20-20",
    asin: "B00CPHX6YI",
    price: 24.99,
    highlights: [
      "8-piece stainless steel set",
      "Realistic metal construction",
      "Ages 3+ years",
      "Includes pots, pans, and lids",
      "Encourages imaginative play"
    ],
    pros: [
      "Real stainless steel - very durable",
      "Looks and feels authentic",
      "Great for teaching kitchen skills",
      "Compatible with other play kitchen sets",
      "Easy to clean"
    ],
    cons: [
      "Can be noisy during play",
      "Metal may have sharp edges (supervision recommended)"
    ],
    specs: {
      "Brand": "Melissa & Doug",
      "Age Range": "3+ years",
      "Pieces": "8 pieces (pots, pans, lids)",
      "Material": "Stainless steel",
      "Set Includes": "2 pots with lids, 1 colander, 1 pan, 1 lid",
      "Target User": "Children who enjoy pretend cooking and kitchen play"
    },
    status: "published",
    featured: false,
    dateAdded: "2026-01-21"
  },
  {
    id: "B00MYL7L9G",
    slug: "melissa-doug-slice-serve-wooden-kitchen-set",
    title: "Melissa & Doug Slice & Serve Wooden Play Food & Kitchen Accessories Set",
    benefitTitle: "Complete wooden food and utensils play set",
    room: "kids_room",
    tags: ["toys", "kids", "melissa-doug", "pretend-play", "kitchen", "wooden", "food"],
    shortDescription: "Deluxe wooden play food set with sliceable items and kitchen utensils. Includes 61 pieces for endless pretend cooking fun.",
    whyWePickedIt: "This comprehensive set provides everything kids need for realistic kitchen play. The wooden food pieces have self-stick tabs that make a satisfying 'crunch' when sliced, teaching cause-and-effect while developing fine motor skills. The included storage crate keeps everything organized.",
    image: "https://m.media-amazon.com/images/I/61DJztu5EzL._AC_SL1500_.jpg",
    amazonUrl: "https://www.amazon.com/Melissa-Doug-Serve-Cooking-Utensils/dp/B00MYL7L9G?tag=aipicks20-20",
    asin: "B00MYL7L9G",
    price: 29.99,
    highlights: [
      "61-piece wooden play food set",
      "Self-stick tabs for slicing action",
      "Wooden storage crate included",
      "Ages 3+ years",
      "Food, utensils, and serving pieces"
    ],
    pros: [
      "Huge variety - 61 pieces total",
      "Satisfying slicing action",
      "Storage crate for organization",
      "Durable wooden construction",
      "Great for social play and sharing"
    ],
    cons: [
      "Self-stick tabs may wear out over time",
      "Small pieces - not suitable for children under 3"
    ],
    specs: {
      "Brand": "Melissa & Doug",
      "Age Range": "3+ years",
      "Pieces": "61 total pieces",
      "Material": "Wood",
      "Includes": "Play food, wooden knife, tongs, plates, cups, utensils, storage crate",
      "Target User": "Children who love pretend cooking and serving food"
    },
    status: "published",
    featured: false,
    dateAdded: "2026-01-21"
  },
  {
    id: "B011PZUPYO",
    slug: "melissa-doug-condiments-set",
    title: "Melissa & Doug Wooden Condiments Set - Play Food Kitchen Accessories",
    benefitTitle: "Add realistic condiments to play kitchen",
    room: "kids_room",
    tags: ["toys", "kids", "melissa-doug", "pretend-play", "kitchen", "food"],
    shortDescription: "Wooden condiment set including ketchup, mustard, salt, pepper, and more. Perfect addition to any play kitchen or restaurant setup.",
    whyWePickedIt: "This condiment set adds authentic details to pretend play meals. Kids love the realistic squeeze bottles and shaker tops that actually work. Great for teaching table manners and meal preparation while encouraging imaginative play.",
    image: "https://m.media-amazon.com/images/I/81RH59GYNdL._AC_SL1500_.jpg",
    amazonUrl: "https://www.amazon.com/Melissa-Doug-Condiments-Set-pcs/dp/B011PZUPYO?tag=aipicks20-20",
    asin: "B011PZUPYO",
    price: 14.99,
    highlights: [
      "Wooden condiment bottles and shakers",
      "Realistic details and colors",
      "Ages 3+ years",
      "Complements other play food sets",
      "Durable wooden construction"
    ],
    pros: [
      "Adds realism to pretend meals",
      "Well-crafted wooden pieces",
      "Compatible with all play kitchens",
      "Great for restaurant role-play",
      "Encourages creative storytelling"
    ],
    cons: [
      "Small set - may want additional play food",
      "Pieces can't actually dispense (decorative only)"
    ],
    specs: {
      "Brand": "Melissa & Doug",
      "Age Range": "3+ years",
      "Material": "Wood",
      "Includes": "Ketchup, mustard, salt, pepper, and condiment holders",
      "Target User": "Children with play kitchens who want to add realistic details"
    },
    status: "published",
    featured: false,
    dateAdded: "2026-01-21"
  },
  {
    id: "B072M2PGX9",
    slug: "melissa-doug-favorite-condiments-play-set",
    title: "Melissa & Doug Favorite Condiments Wooden Play Food Set",
    benefitTitle: "Favorite condiments for pretend play meals",
    room: "kids_room",
    tags: ["toys", "kids", "melissa-doug", "pretend-play", "kitchen", "food", "wooden"],
    shortDescription: "Wooden play food set featuring favorite condiments and toppings. Perfect for adding detail to pretend restaurant and kitchen play.",
    whyWePickedIt: "This set brings pretend meals to life with recognizable condiments kids see at home and in restaurants. The wooden construction ensures durability, and the realistic details help children learn about meal preparation and serving.",
    image: "https://m.media-amazon.com/images/I/61M1NFAceNL._AC_SL1500_.jpg",
    amazonUrl: "https://www.amazon.com/Melissa-Doug-Favorite-Condiments-Play/dp/B072M2PGX9?tag=aipicks20-20",
    asin: "B072M2PGX9",
    price: 16.99,
    highlights: [
      "Wooden condiment play set",
      "Realistic painted details",
      "Ages 3+ years",
      "Enhances pretend play scenarios",
      "Quality Melissa & Doug construction"
    ],
    pros: [
      "Realistic and recognizable items",
      "Solid wooden pieces",
      "Great for teaching meal concepts",
      "Works with other play food sets",
      "Encourages imaginative play"
    ],
    cons: [
      "Items don't open or pour",
      "May need other food items for complete play"
    ],
    specs: {
      "Brand": "Melissa & Doug",
      "Age Range": "3+ years",
      "Material": "Wood with painted details",
      "Target User": "Children who enjoy detailed pretend play cooking and serving"
    },
    status: "published",
    featured: false,
    dateAdded: "2026-01-21"
  },
  {
    id: "B07HM95PP1",
    slug: "melissa-doug-taco-tortilla-sliceable-set",
    title: "Melissa & Doug Taco & Tortilla Sliceable Wooden Play Food Set",
    benefitTitle: "Make pretend tacos with sliceable ingredients",
    room: "kids_room",
    tags: ["toys", "kids", "melissa-doug", "pretend-play", "kitchen", "food", "wooden", "sliceable"],
    shortDescription: "Wooden taco and tortilla play food set with sliceable ingredients. Includes everything needed to make pretend tacos and burritos.",
    whyWePickedIt: "This interactive food set lets kids 'prepare' tacos with sliceable toppings that stick together and come apart. It's perfect for teaching sequencing, following recipes, and developing fine motor skills. The tortillas and shells look amazingly realistic.",
    image: "https://m.media-amazon.com/images/I/61Z61ZcNvdL._AC_SL1500_.jpg",
    amazonUrl: "https://www.amazon.com/Melissa-Doug-Tortilla-Sliceable-Multicolor/dp/B07HM95PP1?tag=aipicks20-20",
    asin: "B07HM95PP1",
    price: 19.99,
    highlights: [
      "Sliceable wooden play food",
      "Includes tacos, tortillas, and toppings",
      "Self-stick tabs for assembly",
      "Ages 3+ years",
      "Wooden cutting tool included"
    ],
    pros: [
      "Interactive slicing and assembly",
      "Very realistic food items",
      "Teaches food preparation",
      "Satisfying cutting action",
      "Great for pretend restaurant play"
    ],
    cons: [
      "Self-stick tabs may weaken over time",
      "Smaller pieces require supervision for young children"
    ],
    specs: {
      "Brand": "Melissa & Doug",
      "Age Range": "3+ years",
      "Material": "Wood",
      "Includes": "Tortillas, taco shells, toppings, wooden knife",
      "Features": "Sliceable pieces with self-stick tabs",
      "Target User": "Children who love interactive pretend cooking and food play"
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
