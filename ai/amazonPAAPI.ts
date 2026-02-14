// ai/amazonPAAPI.ts
// Amazon Product Advertising API 5.0 integration
// Uses direct HTTP requests with AWS Signature V4 (no external SDK needed)

import crypto from "crypto";

// ─── Types ───────────────────────────────────────────────────────────────────

type PAAPIConfig = {
  accessKey: string;
  secretKey: string;
  partnerTag: string;
  region: string;
  host: string;
};

export type PAAPIProduct = {
  asin: string;
  title: string;
  url: string;
  price?: number;
  currency?: string;
  rating?: number;
  reviewCount?: number;
  imageUrl?: string;
  isPrime?: boolean;
  category?: string;
};

type PAAPISearchParams = {
  keywords: string;
  searchIndex?: string;
  minPrice?: number;
  maxPrice?: number;
  maxResults?: number;
};

// ─── Region to Host mapping ──────────────────────────────────────────────────

const REGION_HOSTS: Record<string, string> = {
  "us-east-1": "webservices.amazon.com",
  "eu-west-1": "webservices.amazon.co.uk",
  "us-west-2": "webservices.amazon.com",
  "ap-southeast-1": "webservices.amazon.sg",
  "ap-northeast-1": "webservices.amazon.co.jp",
};

// ─── Configuration ───────────────────────────────────────────────────────────

/**
 * Check if PA-API credentials are available
 */
export function isPAAPIAvailable(): boolean {
  return !!(
    process.env.AMAZON_PAAPI_ACCESS_KEY &&
    process.env.AMAZON_PAAPI_SECRET_KEY &&
    process.env.AMAZON_PAAPI_PARTNER_TAG
  );
}

/**
 * Get PA-API configuration from environment variables
 */
export function getPAAPIConfig(): PAAPIConfig | null {
  if (!isPAAPIAvailable()) {
    return null;
  }

  const region = process.env.AMAZON_PAAPI_REGION || "us-east-1";
  const host = REGION_HOSTS[region] || "webservices.amazon.com";

  return {
    accessKey: process.env.AMAZON_PAAPI_ACCESS_KEY!,
    secretKey: process.env.AMAZON_PAAPI_SECRET_KEY!,
    partnerTag: process.env.AMAZON_PAAPI_PARTNER_TAG!,
    region,
    host,
  };
}

// ─── AWS Signature V4 Signing ────────────────────────────────────────────────

function hmacSHA256(key: Buffer | string, data: string): Buffer {
  return crypto.createHmac("sha256", key).update(data, "utf8").digest();
}

function sha256(data: string): string {
  return crypto.createHash("sha256").update(data, "utf8").digest("hex");
}

function getSignatureKey(
  secretKey: string,
  dateStamp: string,
  region: string,
  service: string
): Buffer {
  const kDate = hmacSHA256(`AWS4${secretKey}`, dateStamp);
  const kRegion = hmacSHA256(kDate, region);
  const kService = hmacSHA256(kRegion, service);
  const kSigning = hmacSHA256(kService, "aws4_request");
  return kSigning;
}

function signRequest(
  config: PAAPIConfig,
  operation: string,
  payload: string
): { headers: Record<string, string> } {
  const service = "ProductAdvertisingAPI";
  const path = "/paapi5/" + getOperationPath(operation);
  const target = `com.amazon.paapi5.v1.ProductAdvertisingAPIv1.${operation}`;

  const now = new Date();
  const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, "");
  const dateStamp = amzDate.slice(0, 8);

  const credentialScope = `${dateStamp}/${config.region}/${service}/aws4_request`;
  const payloadHash = sha256(payload);

  const headers: Record<string, string> = {
    "content-encoding": "amz-1.0",
    "content-type": "application/json; charset=utf-8",
    host: config.host,
    "x-amz-date": amzDate,
    "x-amz-target": target,
  };

  // Create canonical request
  const signedHeaderKeys = Object.keys(headers).sort().join(";");
  const canonicalHeaders = Object.keys(headers)
    .sort()
    .map((k) => `${k}:${headers[k]}`)
    .join("\n");

  const canonicalRequest = [
    "POST",
    path,
    "", // query string (empty)
    canonicalHeaders + "\n",
    signedHeaderKeys,
    payloadHash,
  ].join("\n");

  // Create string to sign
  const stringToSign = [
    "AWS4-HMAC-SHA256",
    amzDate,
    credentialScope,
    sha256(canonicalRequest),
  ].join("\n");

  // Calculate signature
  const signingKey = getSignatureKey(
    config.secretKey,
    dateStamp,
    config.region,
    service
  );
  const signature = hmacSHA256(signingKey, stringToSign).toString("hex");

  // Build authorization header
  const authorization = `AWS4-HMAC-SHA256 Credential=${config.accessKey}/${credentialScope}, SignedHeaders=${signedHeaderKeys}, Signature=${signature}`;

  return {
    headers: {
      ...headers,
      Authorization: authorization,
    },
  };
}

function getOperationPath(operation: string): string {
  const paths: Record<string, string> = {
    SearchItems: "searchitems",
    GetItems: "getitems",
    GetBrowseNodes: "getbrowsenodes",
  };
  return paths[operation] || operation.toLowerCase();
}

// ─── API Request Helper ──────────────────────────────────────────────────────

async function makeRequest<T>(
  config: PAAPIConfig,
  operation: string,
  payload: object
): Promise<T> {
  const body = JSON.stringify(payload);
  const { headers } = signRequest(config, operation, body);
  const path = "/paapi5/" + getOperationPath(operation);
  const url = `https://${config.host}${path}`;

  const response = await fetch(url, {
    method: "POST",
    headers,
    body,
  });

  if (!response.ok) {
    const errorBody = await response.text();
    let errorMessage = `PA-API ${operation} failed (${response.status})`;
    try {
      const errorJson = JSON.parse(errorBody);
      errorMessage += `: ${errorJson.Errors?.[0]?.Message || errorBody}`;
    } catch {
      errorMessage += `: ${errorBody}`;
    }
    throw new Error(errorMessage);
  }

  return response.json() as Promise<T>;
}

// ─── Parse PA-API Response ───────────────────────────────────────────────────

function parseItem(item: any): PAAPIProduct {
  const itemInfo = item.ItemInfo || {};
  const offers = item.Offers?.Listings?.[0];
  const images = item.Images?.Primary?.Large;

  return {
    asin: item.ASIN,
    title: itemInfo.Title?.DisplayValue || "Unknown Product",
    url: item.DetailPageURL || `https://www.amazon.com/dp/${item.ASIN}`,
    price: offers?.Price?.Amount,
    currency: offers?.Price?.Currency,
    rating: undefined, // PA-API v5 doesn't return ratings in SearchItems
    reviewCount: undefined,
    imageUrl: images?.URL,
    isPrime: offers?.DeliveryInfo?.IsPrimeEligible,
    category: itemInfo.Classifications?.Binding?.DisplayValue,
  };
}

// ─── Public API Functions ────────────────────────────────────────────────────

/**
 * Search for products on Amazon using PA-API v5
 */
export async function searchAmazonProducts(
  keywords: string,
  maxResults: number = 10
): Promise<PAAPIProduct[]>;
export async function searchAmazonProducts(
  params: PAAPISearchParams
): Promise<PAAPIProduct[]>;
export async function searchAmazonProducts(
  keywordsOrParams: string | PAAPISearchParams,
  maxResults: number = 10
): Promise<PAAPIProduct[]> {
  const config = getPAAPIConfig();
  if (!config) {
    throw new Error(
      "PA-API credentials not found. Set AMAZON_PAAPI_ACCESS_KEY, AMAZON_PAAPI_SECRET_KEY, and AMAZON_PAAPI_PARTNER_TAG in .env.local"
    );
  }

  const params: PAAPISearchParams =
    typeof keywordsOrParams === "string"
      ? { keywords: keywordsOrParams, maxResults }
      : keywordsOrParams;

  const payload: any = {
    Keywords: params.keywords,
    SearchIndex: params.searchIndex || "All",
    ItemCount: Math.min(params.maxResults || maxResults, 10), // PA-API max is 10
    PartnerTag: config.partnerTag,
    PartnerType: "Associates",
    Marketplace: "www.amazon.com",
    Resources: [
      "ItemInfo.Title",
      "ItemInfo.Classifications",
      "Offers.Listings.Price",
      "Offers.Listings.DeliveryInfo.IsPrimeEligible",
      "Images.Primary.Large",
    ],
  };

  if (params.minPrice !== undefined) {
    payload.MinPrice = Math.round(params.minPrice * 100); // cents
  }
  if (params.maxPrice !== undefined) {
    payload.MaxPrice = Math.round(params.maxPrice * 100); // cents
  }

  console.log(`🔍 PA-API: Searching Amazon for "${params.keywords}"...`);

  const data = await makeRequest<any>(config, "SearchItems", payload);

  if (!data.SearchResult?.Items) {
    console.log(`⚠️  No results found for "${params.keywords}"`);
    return [];
  }

  const products = data.SearchResult.Items.map(parseItem);
  console.log(`✅ PA-API: Found ${products.length} products`);
  return products;
}

/**
 * Get product details by ASIN(s)
 */
export async function getProductByASIN(
  asin: string
): Promise<PAAPIProduct | null>;
export async function getProductByASIN(
  asins: string[]
): Promise<PAAPIProduct[]>;
export async function getProductByASIN(
  asinOrAsins: string | string[]
): Promise<PAAPIProduct | PAAPIProduct[] | null> {
  const config = getPAAPIConfig();
  if (!config) {
    return Array.isArray(asinOrAsins) ? [] : null;
  }

  const asins = Array.isArray(asinOrAsins) ? asinOrAsins : [asinOrAsins];

  // PA-API allows max 10 ASINs per request
  const batches: string[][] = [];
  for (let i = 0; i < asins.length; i += 10) {
    batches.push(asins.slice(i, i + 10));
  }

  const allProducts: PAAPIProduct[] = [];

  for (const batch of batches) {
    const payload = {
      ItemIds: batch,
      PartnerTag: config.partnerTag,
      PartnerType: "Associates",
      Marketplace: "www.amazon.com",
      Resources: [
        "ItemInfo.Title",
        "ItemInfo.Classifications",
        "ItemInfo.Features",
        "Offers.Listings.Price",
        "Offers.Listings.DeliveryInfo.IsPrimeEligible",
        "Images.Primary.Large",
      ],
    };

    console.log(`🔍 PA-API: Getting details for ${batch.length} ASIN(s)...`);

    try {
      const data = await makeRequest<any>(config, "GetItems", payload);

      if (data.ItemsResult?.Items) {
        const products = data.ItemsResult.Items.map(parseItem);
        allProducts.push(...products);
        console.log(`✅ PA-API: Got details for ${products.length} product(s)`);
      }
    } catch (error) {
      console.error(`❌ PA-API GetItems error for batch:`, error);
    }

    // Rate limiting: 1 request per second for PA-API
    if (batches.length > 1) {
      await new Promise((resolve) => setTimeout(resolve, 1100));
    }
  }

  if (Array.isArray(asinOrAsins)) {
    return allProducts;
  }
  return allProducts[0] || null;
}

/**
 * Verify PA-API credentials by making a test search
 */
export async function verifyPAAPICredentials(): Promise<{
  success: boolean;
  message: string;
  partnerTag?: string;
}> {
  const config = getPAAPIConfig();
  if (!config) {
    return {
      success: false,
      message:
        "PA-API credentials not configured. Set AMAZON_PAAPI_ACCESS_KEY, AMAZON_PAAPI_SECRET_KEY, and AMAZON_PAAPI_PARTNER_TAG in .env.local",
    };
  }

  try {
    const results = await searchAmazonProducts("kitchen organizer", 1);
    return {
      success: true,
      message: `PA-API is working! Found ${results.length} result(s). Partner tag: ${config.partnerTag}`,
      partnerTag: config.partnerTag,
    };
  } catch (error: any) {
    return {
      success: false,
      message: `PA-API error: ${error.message}`,
    };
  }
}
