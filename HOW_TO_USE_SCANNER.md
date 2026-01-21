# 📖 איך להשתמש במערכת הסריקה - מדריך פשוט

## שלב 1: הרצת הסריקה

פתח טרמינל והרץ:

```bash
npm run scan:products
```

**מה קורה?**
- המערכת סורקת 5 קטגוריות של אמזון
- מנתחת מאות מוצרים
- מדרגת אותם לפי פוטנציאל המרה (0-100)
- שומרת את ההמלצות בקובץ

**זמן: 2-3 דקות**

---

## שלב 2: צפייה בהמלצות

לאחר שהסריקה מסתיימת, פתח את הקובץ:

```
ai/recommended-products.json
```

**מה תראה?**
- רשימה של מוצרים מומלצים
- כל מוצר עם:
  - ASIN (קוד המוצר באמזון)
  - שם המוצר
  - מחיר, דירוג, ביקורות
  - ציון (0-100) - ככל שהציון גבוה יותר, המוצר טוב יותר
  - למה הוא מומלץ

**דוגמה:**
```json
{
  "asin": "B08YZ5YF7M",
  "title": "Bamboo Drawer Organizer",
  "recommendationScore": 88,
  "estimatedPrice": 24.99,
  "estimatedRating": 4.5,
  "whyGoodForAffiliate": "Solves common problem, high reviews, good price"
}
```

---

## שלב 3: בחירת מוצרים

1. **פתח את הקובץ** `ai/recommended-products.json`
2. **בחר מוצרים** עם ציון גבוה (75+)
3. **ודא שה-ASIN אמיתי** - פתח את הקישור באמזון:
   ```
   https://www.amazon.com/dp/[ASIN]
   ```

---

## שלב 4: הוספת מוצרים לאתר

יש לך 2 אפשרויות:

### אפשרות א: הוספה ידנית (מומלץ)

פתח את הקובץ `ai/discoveryInput.json` והוסף מוצרים בפורמט הזה:

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

### אפשרות ב: הוספה דרך פקודה

```bash
npm run add:product B08YZ5YF7M "Bamboo Drawer Organizer" 24.99 4.5 8500 kitchen "organization,storage" "messy drawers" "busy people"
```

---

## שלב 5: ייבוא לאתר

לאחר שהוספת מוצרים ל-`discoveryInput.json`:

```bash
npm run import:discovery
```

**מה קורה?**
- כל המוצרים מתווספים לאתר אוטומטית
- הם מופיעים בעמוד `/products`
- כל לינק עובד עם Associate ID שלך

---

## סיכום - תהליך מלא

```bash
# 1. סרוק מוצרים (2-3 דקות)
npm run scan:products

# 2. פתח את ai/recommended-products.json
# 3. בחר מוצרים טובים (ציון 75+)
# 4. הוסף אותם ל-ai/discoveryInput.json

# 5. ייבא לאתר
npm run import:discovery
```

**זה הכל!** המוצרים יופיעו באתר שלך.

---

## טיפים

✅ **בחר מוצרים עם ציון 75+** - אלה המוצרים הטובים ביותר  
✅ **ודא שה-ASIN אמיתי** - פתח את הקישור באמזון לפני הוספה  
✅ **הוסף 5-10 מוצרים בכל פעם** - לא צריך להוסיף הכל בבת אחת  
✅ **בדוק את המחיר** - ודא שהוא עדיין נכון באמזון  

---

## שאלות נפוצות

**Q: כמה זמן לוקח הסריקה?**  
A: 2-3 דקות, תלוי בכמות המוצרים.

**Q: כמה מוצרים המערכת מוצאת?**  
A: כ-100 מוצרים (20 לכל קטגוריה).

**Q: האם כל המוצרים מומלצים?**  
A: לא, רק אלה עם ציון 75+ מומלצים.

**Q: האם אני צריך לבדוק כל ASIN?**  
A: כן, מומלץ לבדוק שהמוצר אמיתי באמזון לפני הוספה.

**Q: כמה מוצרים להוסיף?**  
A: התחל עם 5-10 מוצרים, תראה איך זה עובד, ואז תוסיף עוד.
