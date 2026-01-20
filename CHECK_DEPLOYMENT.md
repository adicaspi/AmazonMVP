# 🔍 איך לבדוק שהדיפלוי הושלם

## מה לעשות:

### 1. ב-Vercel Dashboard:

1. **לך ל-Deployments:**
   - Vercel Dashboard → Project → Deployments

2. **בדוק אם יש deploy חדש:**
   - אמור להיות deploy עם commit message: "Update metadata for link previews"
   - Status: "Ready" (ירוק ✅)

3. **אם אין deploy חדש:**
   - לחץ על "Redeploy" או "Deploy"
   - או המתן 2-3 דקות (Vercel י-deploy אוטומטית)

---

### 2. בדוק את ה-HTML:

אחרי שהדיפלוי הושלם, בדוק:

```bash
curl https://www.aipicks.co | grep "<title>"
```

**אמור להציג:**
```html
<title>AI Picks - Live Product Tests</title>
```

**אם עדיין מציג:**
```html
<title>Create Next App</title>
```
→ הדיפלוי עדיין לא הושלם

---

### 3. Clear Cache של Link Preview:

אחרי שהדיפלוי הושלם, אפשר לרענן את ה-cache:

#### Facebook/Meta:
- https://developers.facebook.com/tools/debug/
- הכנס: `https://www.aipicks.co`
- לחץ "Scrape Again"

#### Twitter/X:
- https://cards-dev.twitter.com/validator
- הכנס: `https://www.aipicks.co`

#### WhatsApp/Telegram:
- לא ניתן לנקות cache ידנית
- צריך להמתין (עד 24 שעות)
- או לנסות עם URL קצת שונה: `https://www.aipicks.co/?v=2`

---

## סיכום:

1. ✅ בדוק ב-Vercel Dashboard שהדיפלוי הושלם
2. ✅ בדוק את ה-HTML (אמור להציג "AI Picks")
3. ✅ Clear cache עם Facebook Debugger
4. ✅ נסה לשלוח את ה-link שוב

---

**רוצה שאבדוק את ה-HTML עכשיו?** תגיד לי ואבדוק! 🚀
