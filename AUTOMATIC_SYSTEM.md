# Fully Automatic Product Discovery & Update System

## Current Status
✅ System reads from `ai/discoveryInput.json`  
✅ Automatically imports products with real ASINs  
✅ Updates `lib/products-data.ts` automatically  
✅ All links use correct Associate ID: `aipicks20-20`

## How It Works

### Step 1: Add Products to discoveryInput.json
Add products with real ASINs to `ai/discoveryInput.json`:

```json
[
  {
    "asin": "B0B672HBW9",
    "title": "Product Name",
    "price": 24.99,
    "rating": 4.6,
    "reviews": 3100,
    "vertical": "home_kitchen",
    "baseAmazonUrl": "https://www.amazon.com/dp/B0B672HBW9",
    "trackingId": "aipicks20-20",
    "mainProblem": "what problem it solves",
    "targetUser": "who needs this"
  }
]
```

### Step 2: Run Automatic Import
```bash
npm run import:discovery
```

This will:
- ✅ Read all products from `discoveryInput.json`
- ✅ Validate ASINs are real (10 characters)
- ✅ Generate slugs, tags, and descriptions automatically
- ✅ Build correct Amazon affiliate links with `aipicks20-20`
- ✅ Update `lib/products-data.ts` automatically
- ✅ Add new products or update existing ones

### Step 3: Products Appear on Site
After running the script, products automatically appear on:
- Homepage (if `featured: true`)
- `/products` page
- Individual product pages

## Getting Real ASINs

### Option A: Manual (Using SiteStripe)
1. Install Amazon SiteStripe
2. Browse Amazon for products
3. Copy ASIN from product URL
4. Add to `discoveryInput.json`

### Option B: Automatic (After 3+ Sales)
Once you have 3+ qualifying sales:
1. Request PA-API access
2. Set up credentials
3. Run `npm run ai:discover` for automatic discovery

## Current Products
The system has imported 5 products with real ASINs:
- ✅ B0B672HBW9 - Adjustable Bamboo Drawer Organizer
- ✅ B081YHX2YB - Over-the-Cabinet Trash Bag Holder
- ✅ B08TGF5XJW - Portable Mini Bag Sealer
- ✅ B09GJ1C4NK - Reusable Stretch Silicone Lids
- ✅ B087H6S8CH - Under Cabinet Jar Opener

All links are now working and point to real Amazon products!

## Next Steps
1. Add more products to `discoveryInput.json`
2. Run `npm run import:discovery`
3. Products automatically appear on site
4. All links work correctly with Associate ID

## Future: Full Automation
Once PA-API is available:
- `npm run ai:discover` - Finds products automatically
- `npm run ai:select` - Selects best products
- `npm run ai:pipeline` - Generates content
- `npm run import:discovery` - Updates site

Everything will be 100% automatic!
