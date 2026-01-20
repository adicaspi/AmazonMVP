# 🏠 Editorial Site - Complete Guide

## ✅ מה נבנה

יצרנו אתר Amazon Affiliate מינימליסטי ונקי עם:

### 📁 מבנה הפרויקט

```
src/app/
├── layout.tsx          # Root layout עם Header & Footer
├── page.tsx            # Homepage
├── products/
│   ├── page.tsx        # Product directory עם filters
│   └── [slug]/
│       └── page.tsx    # Product detail page
├── guides/
│   ├── page.tsx        # Guides list
│   └── [slug]/
│       └── page.tsx    # Guide detail (MDX ready)
├── about/page.tsx
├── contact/page.tsx
├── privacy/page.tsx
└── disclosure/page.tsx

components/
├── Header.tsx
├── Footer.tsx
├── HeroSection.tsx
├── CategoryCards.tsx
├── ProductCard.tsx
├── ProsCons.tsx
└── SpecsTable.tsx

lib/
├── products-data.ts    # 10 מוצרים לדוגמה
└── amazon-links.ts     # Helper functions ל-affiliate links
```

### 🎨 עיצוב

- **מינימליסטי ונקי**: רקע לבן, הרבה whitespace
- **טיפוגרפיה**: Inter font, scale נקי
- **צבעים**: שחור/אפור, borders עדינים
- **Responsive**: Mobile-first
- **Accessible**: Semantic HTML, good contrast

### 📦 תוכן

- **10 מוצרים לדוגמה** ב-`lib/products-data.ts`
- **5 מדריכים** (placeholder - מוכן ל-MDX)
- **כל העמודים** (Home, Products, Guides, About, Contact, Privacy, Disclosure)

## 🚀 איך להריץ

```bash
# Development
npm run dev

# Build
npm run build

# Production
npm start
```

## ✏️ איך לערוך תוכן

### מוצרים

ערוך את `lib/products-data.ts`:

```typescript
export const products: Product[] = [
  {
    id: "1",
    slug: "product-slug",
    title: "Product Name",
    room: "kitchen",
    tags: ["tag1", "tag2"],
    // ... שאר השדות
  },
  // ...
];
```

### מדריכים (MDX)

מדריכים יטענו מ-MDX files. כרגע יש placeholder, אבל המבנה מוכן.

יצירת מדריך חדש:
1. צור קובץ `content/guides/my-guide.mdx`
2. הוסף frontmatter:
```mdx
---
title: "My Guide Title"
slug: "my-guide"
room: "kitchen"
tags: ["organization"]
datePublished: "2025-01-20"
dateUpdated: "2025-01-20"
---
```

### Amazon Tracking ID

הוסף ל-`.env.local`:

```bash
NEXT_PUBLIC_AMAZON_TRACKING_ID=aipicks-20
```

או ערוך את `lib/amazon-links.ts`:

```typescript
const DEFAULT_TRACKING_ID = "your-tag-20";
```

## 🔗 Affiliate Links

כל הלינקים לאמזון נבנים אוטומטית עם:
- Tracking tag
- `rel="sponsored nofollow noopener"`
- Disclosure text

## 📝 SEO & Trust

- ✅ Metadata לכל עמוד
- ✅ Open Graph tags
- ✅ Affiliate disclosure בכל עמוד
- ✅ Schema markup ready
- ✅ Clean URLs
- ✅ Fast loading (Next.js Image optimization)

## 🎯 מה עוד צריך?

### MDX Guides (אופציונלי)

להשלמת המדריכים:
1. התקן Contentlayer או MDX loader
2. צור `content/guides/` directory
3. עדכן את `guides/[slug]/page.tsx` לטעון MDX

### תמונות

כרגע המוצרים משתמשים ב-placeholder images. החלף ב:
- תמונות מקומיות ב-`public/images/`
- או URLs מ-Amazon/Unsplash

### Analytics

הוסף Google Analytics או Plausible לפי הצורך.

## 📞 Support

אם יש בעיות או שאלות, תגיד לי!
