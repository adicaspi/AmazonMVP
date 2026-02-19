/**
 * Amazon Creators API v2.1 Client
 *
 * Authenticates via OAuth2 (AWS Cognito) and fetches product data
 * including images, pricing, reviews, and descriptions.
 */

// Token endpoints per region/version (keys without 'v' prefix)
const TOKEN_ENDPOINTS: Record<string, string> = {
  "2.1": "https://creatorsapi.auth.us-east-1.amazoncognito.com/oauth2/token", // NA
  "2.2": "https://creatorsapi.auth.eu-south-2.amazoncognito.com/oauth2/token", // EU
  "2.3": "https://creatorsapi.auth.us-west-2.amazoncognito.com/oauth2/token", // FE
};

const API_BASE = "https://creatorsapi.amazon";
const SCOPE = "creatorsapi/default";
const REQUEST_TIMEOUT_MS = 3000; // 3 second timeout per request

// Cached token
let cachedToken: { token: string; expiresAt: number } | null = null;

function fetchWithTimeout(url: string, options: RequestInit, timeoutMs = REQUEST_TIMEOUT_MS): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  return fetch(url, { ...options, signal: controller.signal }).finally(() => clearTimeout(timeout));
}

function getConfig() {
  const credentialId = process.env.AMAZON_CREATORS_API_CREDENTIAL_ID;
  const credentialSecret = process.env.AMAZON_CREATORS_API_SECRET;
  // Normalize version: strip 'v' prefix (env may have "v2.1", API expects "2.1")
  const rawVersion = process.env.AMAZON_CREATORS_API_VERSION || "2.1";
  const version = rawVersion.replace(/^v/i, "");
  const partnerTag = process.env.NEXT_PUBLIC_AMAZON_TRACKING_ID || "aipicks20-20";

  if (!credentialId || !credentialSecret) {
    throw new Error("Missing Amazon Creators API credentials in environment variables");
  }

  const tokenEndpoint = TOKEN_ENDPOINTS[version];
  if (!tokenEndpoint) {
    throw new Error(`Unsupported API version: ${version}. Supported: ${Object.keys(TOKEN_ENDPOINTS).join(", ")}`);
  }

  return { credentialId, credentialSecret, version, partnerTag, tokenEndpoint };
}

async function getAccessToken(): Promise<string> {
  // Return cached token if still valid (with 30s buffer)
  if (cachedToken && Date.now() < cachedToken.expiresAt - 30_000) {
    return cachedToken.token;
  }

  const { credentialId, credentialSecret, tokenEndpoint } = getConfig();

  const body = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: credentialId,
    client_secret: credentialSecret,
    scope: SCOPE,
  });

  const res = await fetchWithTimeout(tokenEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  if (!res.ok) {
    const text = await res.text();
    cachedToken = null;
    throw new Error(`Token request failed (${res.status}): ${text}`);
  }

  const data = await res.json();
  cachedToken = {
    token: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000,
  };

  return data.access_token;
}

// Resources - Creators API uses lowerCamelCase (not PascalCase like old PA-API)
const ALL_IMAGE_RESOURCES = [
  "images.primary.small",
  "images.primary.medium",
  "images.primary.large",
  "images.variants.small",
  "images.variants.medium",
  "images.variants.large",
];

const ALL_ITEM_RESOURCES = [
  "itemInfo.title",
  "itemInfo.features",
  "itemInfo.productInfo",
  "itemInfo.byLineInfo",
];

const ALL_OFFER_RESOURCES = [
  "offersV2.listings.price",
  "offersV2.listings.availability",
  "offersV2.listings.merchantInfo",
];

const REVIEW_RESOURCES = [
  "customerReviews.starRating",
  "customerReviews.count",
];

export interface AmazonProductImage {
  small?: { url: string; width: number; height: number };
  medium?: { url: string; width: number; height: number };
  large?: { url: string; width: number; height: number };
}

export interface AmazonProductData {
  asin: string;
  title?: string;
  features?: string[];
  primaryImage?: AmazonProductImage;
  variantImages?: AmazonProductImage[];
  price?: {
    amount: number;
    currency: string;
    displayAmount: string;
  };
  availability?: string;
  starRating?: number;
  reviewCount?: number;
  detailPageURL?: string;
}

/**
 * Fetch product data from Amazon Creators API by ASIN(s)
 */
export async function getProductsByASIN(
  asins: string[],
  marketplace: string = "www.amazon.com"
): Promise<AmazonProductData[]> {
  if (asins.length === 0) return [];
  if (asins.length > 10) {
    throw new Error("Maximum 10 ASINs per request");
  }

  const token = await getAccessToken();
  const { partnerTag, version } = getConfig();

  const requestBody = {
    itemIds: asins,
    itemIdType: "ASIN",
    partnerTag,
    partnerType: "Associates",
    resources: [
      ...ALL_IMAGE_RESOURCES,
      ...ALL_ITEM_RESOURCES,
      ...ALL_OFFER_RESOURCES,
      ...REVIEW_RESOURCES,
    ],
  };

  const res = await fetchWithTimeout(`${API_BASE}/catalog/v1/getItems`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Accept: "application/json",
      Authorization: `Bearer ${token}, Version ${version}`,
      "User-Agent": "creatorsapi-client/1.0",
      "x-marketplace": marketplace,
    },
    body: JSON.stringify(requestBody),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GetItems failed (${res.status}): ${text}`);
  }

  const data = await res.json();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const items = data.itemsResult?.items || data.ItemsResult?.Items || [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return items.map((item: any) => parseItem(item));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseImageSize(img: any): { url: string; width: number; height: number } | undefined {
  if (!img) return undefined;
  return {
    url: img.url || img.URL,
    width: img.width || img.Width || 0,
    height: img.height || img.Height || 0,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseImage(img: any): AmazonProductImage {
  return {
    small: parseImageSize(img?.small || img?.Small),
    medium: parseImageSize(img?.medium || img?.Medium),
    large: parseImageSize(img?.large || img?.Large),
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseItem(item: any): AmazonProductData {
  const images = item.images || item.Images;
  const itemInfo = item.itemInfo || item.ItemInfo;
  const offers = item.offersV2 || item.offers || item.OffersV2 || item.Offers;
  const reviews = item.customerReviews || item.CustomerReviews;

  // Parse variant images
  const variants = images?.variants || images?.Variants || [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const variantImages = variants.map((v: any) => parseImage(v));

  // Parse price from offers
  let price: AmazonProductData["price"];
  const listings = offers?.listings || offers?.Listings || [];
  if (listings.length > 0) {
    const listing = listings[0];
    const priceData = listing.price || listing.Price;
    if (priceData) {
      price = {
        amount: priceData.amount || priceData.Amount || 0,
        currency: priceData.currency || priceData.Currency || "USD",
        displayAmount: priceData.displayAmount || priceData.DisplayAmount || "",
      };
    }
  }

  // Parse features
  const featuresData = itemInfo?.features || itemInfo?.Features;
  const features = featuresData?.displayValues || featuresData?.DisplayValues;

  return {
    asin: item.asin || item.ASIN,
    title: itemInfo?.title?.displayValue || itemInfo?.Title?.DisplayValue,
    features: features || undefined,
    primaryImage: images?.primary || images?.Primary
      ? parseImage(images.primary || images.Primary)
      : undefined,
    variantImages,
    price,
    availability: listings[0]?.availability?.message ||
      listings[0]?.Availability?.Message,
    starRating: reviews?.starRating?.value || reviews?.StarRating?.Value,
    reviewCount: reviews?.count || reviews?.Count,
    detailPageURL: item.detailPageURL || item.DetailPageURL,
  };
}
