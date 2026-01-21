// scripts/update-product-images.ts
// Update product images from Amazon URLs

/**
 * List of Amazon URLs to update
 */
const amazonUrls = [
  "https://amzn.to/49OAnv4",
  "https://amzn.to/4qB2Hs3",
  "https://amzn.to/3YRLQoB",
  "https://amzn.to/4qXI4WC",
  "https://amzn.to/3NtyfkW",
  "https://amzn.to/4jLWoz2",
  "https://amzn.to/49RWDEn",
  "https://amzn.to/45mslIx",
  "https://amzn.to/49yiG44",
  "https://amzn.to/4pND06g",
  "https://amzn.to/4baZivg",
  "https://amzn.to/49RdlUt",
];

/**
 * Resolve short Amazon URL to get ASIN
 */
async function resolveAmazonUrl(shortUrl: string): Promise<{ asin: string; fullUrl: string } | null> {
  try {
    console.log(`🔍 Resolving: ${shortUrl}`);

    const response = await fetch(shortUrl, {
      redirect: 'manual', // Don't follow redirects automatically
    });

    const location = response.headers.get('location');
    if (!location) {
      console.error(`❌ No redirect found for ${shortUrl}`);
      return null;
    }

    console.log(`   → ${location}`);

    // Extract ASIN from URL
    const asinMatch = location.match(/\/dp\/([A-Z0-9]{10})/i);
    if (!asinMatch) {
      console.error(`❌ Could not extract ASIN from ${location}`);
      return null;
    }

    const asin = asinMatch[1].toUpperCase();
    console.log(`   ✅ ASIN: ${asin}`);

    return { asin, fullUrl: location };
  } catch (error) {
    console.error(`❌ Error resolving ${shortUrl}:`, error);
    return null;
  }
}

/**
 * Get product image URL from Amazon page
 */
async function getProductImage(asin: string): Promise<string | null> {
  try {
    const url = `https://www.amazon.com/dp/${asin}`;
    console.log(`🖼️  Fetching product page: ${url}`);

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    const html = await response.text();

    // Try to find the main product image
    // Amazon uses different patterns, try multiple
    const patterns = [
      /"hiRes":"(https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+)"/,
      /"large":"(https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+)"/,
      /data-old-hires="(https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+)"/,
      /id="landingImage"[^>]*src="(https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+)"/,
    ];

    for (const pattern of patterns) {
      const match = html.match(pattern);
      if (match && match[1]) {
        console.log(`   ✅ Image found: ${match[1]}`);
        return match[1];
      }
    }

    console.error(`   ❌ Could not find image for ASIN ${asin}`);
    return null;
  } catch (error) {
    console.error(`❌ Error fetching product page for ${asin}:`, error);
    return null;
  }
}

/**
 * Main function
 */
async function main() {
  console.log('🚀 Starting image update process...\n');

  const results: Array<{ url: string; asin: string | null; imageUrl: string | null }> = [];

  for (const url of amazonUrls) {
    const resolved = await resolveAmazonUrl(url);

    if (!resolved) {
      results.push({ url, asin: null, imageUrl: null });
      continue;
    }

    const imageUrl = await getProductImage(resolved.asin);
    results.push({ url, asin: resolved.asin, imageUrl });

    // Add delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('');
  }

  console.log('\n📊 Summary:');
  console.log('='.repeat(80));

  results.forEach((result, index) => {
    console.log(`\n${index + 1}. ${result.url}`);
    console.log(`   ASIN: ${result.asin || 'NOT FOUND'}`);
    console.log(`   Image: ${result.imageUrl ? '✅' : '❌'}`);
    if (result.imageUrl) {
      console.log(`   ${result.imageUrl}`);
    }
  });

  console.log('\n' + '='.repeat(80));
  console.log(`\n✅ Successfully resolved: ${results.filter(r => r.imageUrl).length}/${results.length}`);
  console.log(`❌ Failed: ${results.filter(r => !r.imageUrl).length}/${results.length}`);

  // Save results to JSON for manual review
  const fs = await import('fs/promises');
  const path = await import('path');
  const outputFile = path.join(process.cwd(), 'scripts', 'image-update-results.json');
  await fs.writeFile(outputFile, JSON.stringify(results, null, 2));
  console.log(`\n💾 Results saved to: ${outputFile}`);
}

main().catch(console.error);
