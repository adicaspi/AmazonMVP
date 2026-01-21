# 🚀 התחלה מהירה - 3 שלבים פשוטים

## שלב 1: סרוק מוצרים (2 דקות)

```bash
npm run scan:products
```

**זה יסרוק מאות מוצרים ויצור קובץ עם המלצות.**

---

## שלב 2: בחר מוצרים טובים

1. פתח את הקובץ: `ai/recommended-products.json`
2. חפש מוצרים עם **ציון 75+**
3. העתק את ה-ASIN של המוצרים הטובים

**דוגמה למוצר טוב:**
```json
{
  "asin": "B08YZ5YF7M",
  "title": "Bamboo Drawer Organizer",
  "recommendationScore": 88,  ← ציון גבוה = מוצר טוב!
  "estimatedPrice": 24.99,
  "estimatedRating": 4.5
}
```

---

## שלב 3: הוסף מוצרים לאתר

### אופציה א: ערוך ידנית

פתח `ai/discoveryInput.json` והוסף מוצר:

```json
[
  {
    "asin": "B08YZ5YF7M",
    "title": "Bamboo Drawer Organizer",
    "price": 24.99,
    "rating": 4.5,
    "reviews": 8500,
    "vertical": "home_kitchen",
    "baseAmazonUrl": "https://www.amazon.com/dp/B08YZ5YF7M",
    "trackingId": "aipicks20-20",
    "mainProblem": "messy kitchen drawers",
    "targetUser": "busy people who cook at home"
  }
]
```

### אופציה ב: פקודה מהירה

```bash
npm run add:product B08YZ5YF7M "Bamboo Drawer Organizer" 24.99 4.5 8500 kitchen "organization,storage" "messy drawers" "busy people"
```

---

## שלב 4: ייבא לאתר

```bash
npm run import:discovery
```

**זה הכל!** המוצרים יופיעו באתר שלך.

---

## 📝 סיכום - 3 פקודות

```bash
# 1. סרוק
npm run scan:products

# 2. הוסף מוצרים ל-discoveryInput.json (ידנית או דרך add:product)

# 3. ייבא
npm run import:discovery
```

**זה הכל!** 🎉
