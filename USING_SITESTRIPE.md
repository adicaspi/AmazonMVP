# How to Use Amazon SiteStripe to Get Real Product Links

## What is SiteStripe?
SiteStripe is a browser extension from Amazon Associates that lets you create affiliate links directly from any Amazon product page.

## Setup Instructions

### Step 1: Install SiteStripe
1. Go to Amazon Associates Central: https://affiliate-program.amazon.com/
2. Sign in with your account
3. Go to **Tools** → **SiteStripe**
4. Click **Get SiteStripe**
5. Follow the instructions to install the browser extension/bookmarklet

### Step 2: Find Real Products
1. Go to Amazon.com
2. Search for products that match your product descriptions
3. For example, search "bamboo drawer organizer" for the first product

### Step 3: Get the ASIN and Link
1. On any product page, you'll see the SiteStripe bar at the top
2. Click **Text** or **Image** link
3. Copy the **ASIN** from the URL (the 10-character code after `/dp/`)
4. Copy the full affiliate link

### Step 4: Update Products in Code
1. Open `lib/products-data.ts`
2. Find the product you want to update
3. Replace:
   - `asin: "B08YZ5YF7M"` → `asin: "REAL_ASIN_HERE"`
   - `amazonUrl: "https://www.amazon.com/dp/B08YZ5YF7M?tag=aipicks20-20"` → `amazonUrl: "https://www.amazon.com/dp/REAL_ASIN_HERE?tag=aipicks20-20"`

### Step 5: Verify
1. Save the file
2. Test the link on your site
3. Make sure it goes to the correct Amazon product page

## Product Mapping Guide

Here's what to search for each product:

1. **Bamboo Drawer Organizer** → Search: "bamboo drawer organizer kitchen"
2. **Silicone Food Storage Lids** → Search: "silicone food storage lids reusable"
3. **Jar Opener Tool** → Search: "jar opener tool kitchen"
4. **Modern Table Lamp** → Search: "modern table lamp LED"
5. **Storage Baskets Set** → Search: "storage baskets set woven"
6. **Throw Pillow Set** → Search: "throw pillows decorative set"
7. **Floating Wall Shelf** → Search: "floating wall shelf modern"
8. **Bedside Organizer** → Search: "bedside organizer hanging"
9. **Desk Organizer Set** → Search: "desk organizer set"
10. **Bathroom Storage Caddy** → Search: "bathroom storage caddy shower"

## Tips
- Choose products with 4+ star ratings
- Look for products with 500+ reviews
- Make sure the product matches your description
- Price should be reasonable ($15-$60 range)

## After You Get 3+ Sales
Once you have qualifying sales, you can:
1. Request PA-API access
2. Set up automatic product discovery
3. Let the system find products automatically
