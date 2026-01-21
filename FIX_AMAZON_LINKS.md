# Fix Amazon Links - Get Real Products

## Current Problem
The products in `lib/products-data.ts` use **fake ASINs** (like B08YZ5YF7M) that don't exist on Amazon. This causes links to go to invalid Amazon pages.

## Solution Options

### Option 1: Manual Update (Quick Fix)
Replace fake ASINs with real ones:

1. **Find Real Products on Amazon:**
   - Go to Amazon.com
   - Search for products matching your descriptions
   - Copy the real ASIN from the product URL

2. **Update `lib/products-data.ts`:**
   - Replace each `asin` and `amazonUrl` with real values
   - Example:
     ```typescript
     asin: "B0B672HBW9", // Real ASIN from Amazon
     amazonUrl: "https://www.amazon.com/dp/B0B672HBW9?tag=aipicks20-20",
     ```

### Option 2: Automatic Discovery (Recommended)
Set up Amazon Product Advertising API (PA-API) to automatically find real products:

#### Step 1: Get PA-API Credentials
1. Go to https://affiliate-program.amazon.com/associates/
2. Sign in to Associates Central
3. Go to **Tools** → **Product Advertising API**
4. Click **Register for Product Advertising API**
5. Create Access Key and Secret Key
6. Copy your **Partner Tag** (should be `aipicks20-20`)

#### Step 2: Add Credentials to Environment
Add to `.env.local`:
```
AMAZON_PAAPI_ACCESS_KEY=your_access_key_here
AMAZON_PAAPI_SECRET_KEY=your_secret_key_here
AMAZON_PAAPI_PARTNER_TAG=aipicks20-20
AMAZON_PAAPI_REGION=us-east-1
```

Also add to Vercel Environment Variables.

#### Step 3: Install PA-API SDK
```bash
npm install @amzn/paapi5-nodejs-sdk
```

#### Step 4: Implement PA-API Integration
The code in `ai/amazonPAAPI.ts` needs to be completed. Once PA-API is set up, run:
```bash
npm run ai:discover
```

This will automatically find real products and update ASINs.

### Option 3: Use Amazon SiteStripe (Temporary)
1. Install Amazon Associates SiteStripe browser extension
2. Browse Amazon and find products you want
3. Use SiteStripe to generate affiliate links
4. Copy the ASINs and URLs to `lib/products-data.ts`

## Current Status
- ✅ Associate ID updated: `aipicks20-20`
- ✅ Link building function fixed
- ❌ Products still use fake ASINs
- ❌ PA-API not configured yet

## Next Steps
1. **Immediate:** Manually update at least 3-5 products with real ASINs for testing
2. **Short-term:** Set up PA-API for automatic product discovery
3. **Long-term:** Build automated pipeline that discovers and updates products weekly

## Testing Links
After updating ASINs, test each link:
1. Click the product CTA
2. Verify it goes to a real Amazon product page
3. Check that the `tag=aipicks20-20` parameter is in the URL
4. Verify the product matches the description
