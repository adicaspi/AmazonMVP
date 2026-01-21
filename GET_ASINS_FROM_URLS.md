# 📋 איך לקבל ASINs מהלינקים?

## הבעיה

הקישורים המקוצרים (amzn.to) לא מאפשרים חילוץ ASIN ישירות.

## הפתרון

**פתח כל קישור באמזון והעתק את ה-ASIN מה-URL.**

### איך?

1. **פתח את הקישור** באמזון (למשל: https://amzn.to/49OAnv4)
2. **חכה שהעמוד יטען** - תראה את המוצר
3. **הסתכל על ה-URL** - הוא יהיה משהו כמו:
   ```
   https://www.amazon.com/dp/B09V5G395G
                              ^^^^^^^^^^
                              זה ה-ASIN
   ```
4. **העתק את ה-ASIN** (10 תווים)

---

## רשימת הלינקים שלך

1. https://amzn.to/49OAnv4
2. https://amzn.to/4qB2Hs3
3. https://amzn.to/3YRLQoB
4. https://amzn.to/4qXI4WC
5. https://amzn.to/3NtyfkW
6. https://amzn.to/4jLWoz2
7. https://amzn.to/49RWDEn
8. https://amzn.to/45mslIx
9. https://amzn.to/49yiG44
10. https://amzn.to/4pND06g
11. https://amzn.to/4baZivg
12. https://amzn.to/49RdlUt

---

## מה לעשות?

**פתח כל קישור והעתק את ה-ASIN**, ואז שלח לי את הרשימה:

```
B09V5G395G
B08YZ5YF7M
B09GJ1C4NK
...
(12 ASINs)
```

ואז אני אריץ:
```bash
npm run replace:asins B09V5G395G B08YZ5YF7M ...
```

---

## או - שלח לי את ה-ASINs ישירות

אם אתה רוצה, פשוט שלח לי את ה-ASINs (לא את הלינקים), ואני אעדכן הכל מיד!

---

## טיפ

**השתמש ב-Amazon SiteStripe** - כשאתה על עמוד מוצר, SiteStripe מציג את ה-ASIN ישירות!
