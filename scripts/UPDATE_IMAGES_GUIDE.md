# מדריך עדכון תמונות מוצרים

## הבעיה
התמונות באתר כרגע הן תמונות placeholder מ-Unsplash. אנחנו רוצים להחליף אותן בתמונות האמיתיות מאמזון.

## הפתרון - 3 שלבים פשוטים

### שלב 1: חילוץ קישורי התמונות מאמזון

1. פתח כל אחד מ-12 הקישורים האלה בדפדפן:
   - https://amzn.to/49OAnv4
   - https://amzn.to/4qB2Hs3
   - https://amzn.to/3YRLQoB
   - https://amzn.to/4qXI4WC
   - https://amzn.to/3NtyfkW
   - https://amzn.to/4jLWoz2
   - https://amzn.to/49RWDEn
   - https://amzn.to/45mslIx
   - https://amzn.to/49yiG44
   - https://amzn.to/4pND06g
   - https://amzn.to/4baZivg
   - https://amzn.to/49RdlUt

2. בכל עמוד מוצר:
   - לחץ F12 (או Cmd+Option+I במק) לפתיחת Developer Tools
   - לחץ על טאב Console
   - העתק והדבק את כל התוכן מהקובץ `scripts/extract-images-browser.js`
   - לחץ Enter
   - תקבל פלט כזה:
     ```
     ✅ Image URL found:
     https://m.media-amazon.com/images/I/81FjWAOY96L._AC_SL1500_.jpg

     📋 Copy this line for the code:
     "B0B31C4XRM": "https://m.media-amazon.com/images/I/81FjWAOY96L._AC_SL1500_.jpg",
     ```
   - העתק את השורה האחרונה (עם ה-ASIN וה-URL)

3. שמור את כל 12 השורות במקום בטוח (קובץ טקסט או notes)

### שלב 2: מילוי הקישורים בסקריפט

1. פתח את הקובץ `scripts/apply-image-urls.ts`
2. מלא את האובייקט `imageUrls` עם הקישורים שאספת:
   ```typescript
   const imageUrls: Record<string, string> = {
     "B09V5G395G": "https://m.media-amazon.com/images/I/61yVDDy1LRL._AC_SL1500_.jpg",
     "B0B31C4XRM": "https://m.media-amazon.com/images/I/81FjWAOY96L._AC_SL1500_.jpg",
     // ... המשך לכל 12 המוצרים
   };
   ```

### שלב 3: הרצת הסקריפט

```bash
npx tsx scripts/apply-image-urls.ts
```

הסקריפט יעדכן אוטומטית את `lib/products-data.ts` עם התמונות האמיתיות!

## חלופה מהירה (אם אתה לא רוצה להריץ סקריפט בדפדפן)

אם אתה רוצה, אתה יכול פשוט לשלוח לי את 12 קישורי התמונות ידנית ואני אעדכן את הקובץ בשבילך.

פשוט העתק את התמונה הראשית של כל מוצר (לחיצה ימנית → "Copy image address") ושלח לי.

## וידוא שהכל עובד

אחרי העדכון, תוכל לראות את התמונות החדשות על ידי:

```bash
npm run dev
```

ולגשת ל-http://localhost:3000/products

---

**טיפ**: המוצר הראשון (B09V5G395G) כבר מעודכן עם תמונה אמיתית, אז יש לך דוגמה איך זה צריך להיראות!
