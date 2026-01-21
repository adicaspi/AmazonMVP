// scripts/fetch-amazon-images.ts
// Fetch product images from Amazon using ASINs

const asins = [
  "B09V5G395G",
  "B0B31C4XRM",
  "B08KXKVT4K",
  "B0B2NNNJXR",
  "B074817DK1",
  "B0FD7LSCTD",
  "B0DT5V24MS",
  "B0F8HFLNQG",
  "B0CXLK9PJ9",
  "B07XM8Y26Y",
  "B06X9NQ8GX",
  "B07S6F6LHQ",
];

async function fetchProductImage(asin: string): Promise<string | null> {
  try {
    const url = `https://www.amazon.com/dp/${asin}`;
    console.log(`Fetching: ${url}`);

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
    });

    const html = await response.text();

    // Try multiple patterns to find the image
    const patterns = [
      /"hiRes":"(https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+)"/,
      /"large":"(https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+)"/,
      /data-old-hires="(https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+)"/,
      /data-a-dynamic-image="[^"]*?(https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+?)"/,
      /<img[^>]+id="landingImage"[^>]+src="(https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+)"/,
    ];

    for (const pattern of patterns) {
      const match = html.match(pattern);
      if (match && match[1]) {
        let imageUrl = match[1];
        // Clean up the URL - remove any JSON escaping
        imageUrl = imageUrl.replace(/\\u002F/g, '/').replace(/\\/g, '');
        console.log(`✅ Found image: ${imageUrl}\n`);
        return imageUrl;
      }
    }

    console.log(`❌ No image found for ASIN ${asin}\n`);
    return null;
  } catch (error) {
    console.error(`❌ Error fetching ${asin}:`, error);
    return null;
  }
}

async function main() {
  console.log('🚀 Fetching Amazon product images...\n');

  const results: Record<string, string | null> = {};

  for (const asin of asins) {
    const imageUrl = await fetchProductImage(asin);
    results[asin] = imageUrl;

    // Add delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  console.log('\n📊 Results Summary:');
  console.log('='.repeat(80));

  const found = Object.values(results).filter(v => v !== null).length;
  console.log(`✅ Found: ${found}/${asins.length}`);
  console.log(`❌ Missing: ${asins.length - found}/${asins.length}`);

  console.log('\n📋 Image URLs:');
  console.log('='.repeat(80));
  for (const [asin, imageUrl] of Object.entries(results)) {
    console.log(`${asin}: ${imageUrl || 'NOT FOUND'}`);
  }

  // Save results
  const fs = await import('fs/promises');
  const outputFile = 'scripts/amazon-images.json';
  await fs.writeFile(outputFile, JSON.stringify(results, null, 2));
  console.log(`\n💾 Results saved to: ${outputFile}`);
}

main().catch(console.error);
