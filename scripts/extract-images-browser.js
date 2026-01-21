/**
 * Extract Amazon Product Image - Browser Console Script
 *
 * HOW TO USE:
 * 1. Open each Amazon product URL in your browser
 * 2. Open the browser console (F12 → Console tab)
 * 3. Paste this entire script and press Enter
 * 4. Copy the output and save it
 * 5. Repeat for all 12 products
 *
 * The script will extract the high-resolution product image URL
 */

(function() {
  console.log('🔍 Extracting Amazon Product Image...\n');

  // Get ASIN from URL
  const asin = window.location.pathname.match(/\/dp\/([A-Z0-9]{10})/);
  if (!asin) {
    console.error('❌ Could not find ASIN in URL');
    return;
  }

  console.log(`ASIN: ${asin[1]}\n`);

  // Try to find the image in different ways
  let imageUrl = null;

  // Method 1: Look for landingImage element
  const landingImage = document.getElementById('landingImage');
  if (landingImage && landingImage.src && landingImage.src.includes('media-amazon.com')) {
    imageUrl = landingImage.src;
  }

  // Method 2: Look in the image data JSON
  if (!imageUrl) {
    const imageBlockScript = document.querySelector('script:not([src])');
    if (imageBlockScript) {
      const scriptText = imageBlockScript.textContent;
      const match = scriptText.match(/"hiRes":"(https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+)"/);
      if (match) {
        imageUrl = match[1].replace(/\\u002F/g, '/');
      }
    }
  }

  // Method 3: Look for any high-res image
  if (!imageUrl) {
    const images = Array.from(document.querySelectorAll('img[src*="media-amazon.com"]'));
    const productImage = images.find(img =>
      img.src.includes('/images/I/') &&
      (img.src.includes('_SL1500_') || img.src.includes('_SL1200_'))
    );
    if (productImage) {
      imageUrl = productImage.src;
    }
  }

  if (imageUrl) {
    // Clean up the URL - make sure it's high res
    imageUrl = imageUrl.split('?')[0]; // Remove query params
    if (!imageUrl.includes('_SL1500_')) {
      imageUrl = imageUrl.replace(/_[A-Z]{2}\d+_/, '_AC_SL1500_');
    }

    console.log('✅ Image URL found:\n');
    console.log(imageUrl);
    console.log('\n📋 Copy this line for the code:\n');
    console.log(`"${asin[1]}": "${imageUrl}",`);

    // Create a clickable link
    const link = document.createElement('a');
    link.href = imageUrl;
    link.target = '_blank';
    link.textContent = 'Open Image in New Tab';
    link.style.cssText = 'position:fixed;top:20px;right:20px;z-index:9999;background:green;color:white;padding:15px;font-size:16px;border-radius:8px;text-decoration:none;box-shadow:0 4px 8px rgba(0,0,0,0.3);';
    document.body.appendChild(link);

  } else {
    console.error('❌ Could not find product image');
    console.log('Please try refreshing the page or check if the product page loaded correctly.');
  }
})();
