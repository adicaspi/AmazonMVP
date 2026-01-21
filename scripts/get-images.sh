#!/bin/bash
# Fetch Amazon product images using curl

declare -a asins=(
  "B09V5G395G"
  "B0B31C4XRM"
  "B08KXKVT4K"
  "B0B2NNNJXR"
  "B074817DK1"
  "B0FD7LSCTD"
  "B0DT5V24MS"
  "B0F8HFLNQG"
  "B0CXLK9PJ9"
  "B07XM8Y26Y"
  "B06X9NQ8GX"
  "B07S6F6LHQ"
)

echo "🚀 Fetching Amazon product images..."
echo ""

results_file="scripts/image-results.txt"
> "$results_file"  # Clear file

for asin in "${asins[@]}"; do
  echo "Fetching ASIN: $asin"
  url="https://www.amazon.com/dp/$asin"

  # Fetch the page HTML
  html=$(curl -s "$url" -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36")

  # Try multiple patterns to extract the image URL
  image=""

  # Pattern 1: hiRes
  image=$(echo "$html" | grep -oP '"hiRes":"https://m\.media-amazon\.com/images/I/[^"]+' | head -1 | sed 's/"hiRes":"//' | sed 's/\\u002F/\//g')

  if [ -z "$image" ]; then
    # Pattern 2: large
    image=$(echo "$html" | grep -oP '"large":"https://m\.media-amazon\.com/images/I/[^"]+' | head -1 | sed 's/"large":"//' | sed 's/\\u002F/\//g')
  fi

  if [ -z "$image" ]; then
    # Pattern 3: data-old-hires
    image=$(echo "$html" | grep -oP 'data-old-hires="https://m\.media-amazon\.com/images/I/[^"]+' | head -1 | sed 's/data-old-hires="//')
  fi

  if [ -z "$image" ]; then
    # Pattern 4: landingImage src
    image=$(echo "$html" | grep -oP 'id="landingImage"[^>]+src="https://m\.media-amazon\.com/images/I/[^"]+' | grep -oP 'src="[^"]+' | sed 's/src="//')
  fi

  if [ -n "$image" ]; then
    echo "✅ $asin: $image"
    echo "$asin|$image" >> "$results_file"
  else
    echo "❌ $asin: NOT FOUND"
    echo "$asin|NOT_FOUND" >> "$results_file"
  fi

  echo ""
  sleep 2  # Rate limiting
done

echo "💾 Results saved to: $results_file"
echo ""
echo "📊 Summary:"
found=$(grep -v "NOT_FOUND" "$results_file" | wc -l)
total=${#asins[@]}
echo "✅ Found: $found/$total"
echo "❌ Missing: $((total - found))/$total"
