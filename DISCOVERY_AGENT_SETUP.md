# Discovery Agent Setup - Fully Automatic Product Discovery

## הבעיה הנוכחית

ה-Discovery Agent יוצר **placeholder ASINs** (כמו `BXXXXXXXXX`) במקום ASINs אמיתיים מאמזון.

## הפתרון המלא

כדי שהמערכת תהיה **100% אוטומטית**, צריך לשלב **Amazon Product Advertising API (PA-API)**.

### שלב 1: קבלת Amazon PA-API Credentials

1. היכנס ל-[Amazon Associates Central](https://affiliate-program.amazon.com/)
2. צור Associate Account (אם אין לך)
3. לך ל-[Product Advertising API](https://webservices.amazon.com/paapi5/documentation/register-for-product-advertising-api.html)
4. הירשם ל-PA-API 5.0
5. קבל:
   - `Access Key ID`
   - `Secret Access Key`
   - `Partner Tag` (Associate Tag)

### שלב 2: הוספת Credentials ל-`.env.local`

```bash
AMAZON_PAAPI_ACCESS_KEY=your_access_key
AMAZON_PAAPI_SECRET_KEY=your_secret_key
AMAZON_PAAPI_PARTNER_TAG=your_tag-20
AMAZON_PAAPI_REGION=us-east-1
```

### שלב 3: התקנת PA-API Client

```bash
npm install @amzn/paapi5-nodejs-sdk
```

### שלב 4: עדכון Discovery Agent

עדכן את `ai/discoveryAgent.ts` להשתמש ב-PA-API במקום placeholder ASINs.

## פתרון זמני (ללא PA-API)

אם אין לך PA-API credentials, ה-Discovery Agent:
1. יוצר שמות מוצרים ריאליסטיים
2. **אבל לא יכול למצוא ASINs אמיתיים**
3. צריך לעדכן ידנית את `ai/raw_candidates.json` עם ASINs אמיתיים

## Workflow המלא (עם PA-API)

```bash
# 1. Discovery Agent מוצא מוצרים אוטומטית עם ASINs אמיתיים
npm run ai:discover

# 2. Selection Agent בוחר את המוצרים הטובים ביותר
npm run ai:select

# 3. Pipeline יוצר landing pages
npm run ai:pipeline

# 4. Update products עם תמונות ולינקים
npm run update:products
```

## Workflow זמני (ללא PA-API)

```bash
# 1. Discovery Agent יוצר שמות מוצרים
npm run ai:discover

# 2. עדכן ידנית את ai/raw_candidates.json עם ASINs אמיתיים
# (חפש כל מוצר באמזון וקח את ה-ASIN)

# 3. Selection Agent בוחר את המוצרים הטובים ביותר
npm run ai:select

# 4. Pipeline יוצר landing pages
npm run ai:pipeline

# 5. Update products עם תמונות ולינקים
npm run update:products
```

## הערות

- **PA-API הוא חינמי** אבל דורש Associate Account
- **Rate Limits**: PA-API מוגבל ל-1 request/second (בחינם)
- **Alternatives**: SerpAPI, ScraperAPI (שירותים בתשלום)
