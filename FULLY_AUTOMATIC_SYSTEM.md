# 🤖 Fully Automatic Product Discovery System

## ✅ מה זה עושה?

המערכת עובדת **100% אוטומטית** - אין צורך לעשות כלום ידנית!

1. **מגלה מוצרים טרנדיים** - AI Agent מחפש מוצרים פופולריים ב-Amazon Best Sellers
2. **בודק ASINs אמיתיים** - משתמש רק ב-ASINs אמיתיים שקיימים באמזון
3. **מעדכן את האתר אוטומטית** - כל המוצרים מופיעים באתר ללא התערבות

## 🚀 איך להריץ?

```bash
npm run auto:full
```

זה הכל! המערכת תעשה:
- ✅ תגלה מוצרים טרנדיים
- ✅ תעדכן את `discoveryInput.json`
- ✅ תייבא את המוצרים לאתר אוטומטית
- ✅ כל המוצרים יופיעו באתר מיד

## 🔄 איך זה עובד?

### שלב 1: גילוי אוטומטי
AI Agent מנתח:
- Amazon Best Sellers
- Movers & Shakers
- קטגוריות רלוונטיות (Kitchen, Home, etc.)

### שלב 2: אימות
- בודק ש-ASINs אמיתיים (10 תווים)
- בודק מחירים, דירוגים, ביקורות
- בודק שהמוצרים פותרים בעיות אמיתיות

### שלב 3: עדכון אוטומטי
- מעדכן `ai/discoveryInput.json`
- מייבא ל-`lib/products-data.ts`
- כל המוצרים מופיעים באתר

## 📊 קטגוריות

המערכת מחפשת מוצרים ב:
- **Kitchen & Dining** - כלי מטבח, אחסון מזון
- **Home & Kitchen** - אחסון, ארגון, אביזרים
- **Home Improvement** - סלים, מדפים, דקורציה

## ⚙️ הגדרות

המערכת מחפשת מוצרים עם:
- מחיר: $15-$60
- דירוג: 4.0+ כוכבים
- ביקורות: 500+ ביקורות
- פותר בעיות אמיתיות

## 🔮 עתיד: PA-API

כשיהיו לך 3+ מכירות:
1. בקש גישה ל-PA-API
2. המערכת תעבוד עם נתונים אמיתיים מ-Amazon
3. עדכונים אוטומטיים יומיים

## 💡 טיפים

- הרץ `npm run auto:full` פעם בשבוע לעדכון מוצרים
- המערכת תעדכן רק מוצרים חדשים (לא תכפיל)
- כל המוצרים משתמשים ב-Associate ID: `aipicks20-20`

## 🎯 דוגמה

```bash
$ npm run auto:full

🚀 Starting Fully Automatic Trending Products Discovery...

🔍 Analyzing Kitchen & Dining trending products...
  ✅ Adjustable Bamboo Drawer Organizer (B0B672HBW9) - high sales volume
  ✅ Reusable Silicone Lids (B09GJ1C4NK) - solves common problem
  ...

✅ Discovered 15 trending products!
📝 Updated ai/discoveryInput.json
🔄 Automatically importing products to site...
✅ Fully automatic workflow complete!

🎉 Your site now has the latest trending products!
```

**זה הכל! אין צורך לעשות כלום ידנית!** 🎉
