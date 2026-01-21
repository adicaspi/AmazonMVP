// scripts/apply-image-urls.ts
// Apply collected image URLs to products-data.ts

import fs from 'fs/promises';
import path from 'path';

/**
 * INSTRUCTIONS:
 * 1. Run the extract-images-browser.js script in your browser for each product
 * 2. Fill in the imageUrls object below with the URLs you collected
 * 3. Run: npx tsx scripts/apply-image-urls.ts
 */

const imageUrls: Record<string, string> = {
  // Fill these in with the actual image URLs from Amazon
  // You can get them by running extract-images-browser.js in your browser console

  "B09V5G395G": "https://m.media-amazon.com/images/I/61yVDDy1LRL._AC_SL1500_.jpg", // Already in code
  "B0B31C4XRM": "", // OIAHOMY Storage Basket - FILL THIS IN
  "B08KXKVT4K": "", // Vtopmart Drawer Organizers - FILL THIS IN
  "B0B2NNNJXR": "", // Jar Opener - FILL THIS IN
  "B074817DK1": "", // Amazon Basics Cookware - FILL THIS IN
  "B0FD7LSCTD": "", // Rubbermaid Containers - FILL THIS IN
  "B0DT5V24MS": "", // BAYKA Floating Shelves - FILL THIS IN
  "B0F8HFLNQG": "", // Lifewit Silverware Organizer - FILL THIS IN
  "B0CXLK9PJ9": "", // Vtopmart Stackable Organizer - FILL THIS IN
  "B07XM8Y26Y": "", // Amazon Basics Stackable Shelves - FILL THIS IN
  "B06X9NQ8GX": "", // Amazon Basics Kitchen Scale - FILL THIS IN
  "B07S6F6LHQ": "", // Nicewell Food Scale - FILL THIS IN
};

async function updateProductImages() {
  console.log('🚀 Updating product images in products-data.ts...\n');

  const filePath = path.join(process.cwd(), 'lib', 'products-data.ts');

  try {
    // Read the file
    let content = await fs.readFile(filePath, 'utf-8');

    let updatedCount = 0;
    let skippedCount = 0;

    // Update each product's image
    for (const [asin, imageUrl] of Object.entries(imageUrls)) {
      if (!imageUrl || imageUrl === '') {
        console.log(`⏭️  Skipping ${asin} (no image URL provided)`);
        skippedCount++;
        continue;
      }

      // Find the product with this ASIN and update its image
      const regex = new RegExp(
        `(id: "${asin}"[\\s\\S]*?image: )"[^"]*"`,
        'g'
      );

      const before = content;
      content = content.replace(regex, `$1"${imageUrl}"`);

      if (content !== before) {
        console.log(`✅ Updated ${asin}`);
        console.log(`   Image: ${imageUrl}`);
        updatedCount++;
      } else {
        console.log(`⚠️  Could not find product with ASIN ${asin} in the file`);
      }
    }

    // Write the updated content back
    await fs.writeFile(filePath, content, 'utf-8');

    console.log(`\n📊 Summary:`);
    console.log(`✅ Updated: ${updatedCount} products`);
    console.log(`⏭️  Skipped: ${skippedCount} products (no URL provided)`);
    console.log(`\n💾 File saved: ${filePath}`);
    console.log('\n✨ Done! Your products now have real Amazon images.');

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

updateProductImages();
