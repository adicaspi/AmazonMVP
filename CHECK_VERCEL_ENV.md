# 🔍 בדיקת Environment Variables ב-Vercel

## הבעיה:
המוצרים לא מופיעים ב-production (aipicks.co) אבל עובדים ב-localhost.

## הפתרון:

### שלב 1: בדוק Environment Variables ב-Vercel

1. **לך ל-Vercel Dashboard:**
   - https://vercel.com/ranis-projects-7f7129ce/amazonmvp/settings/environment-variables

2. **ודא שיש את ה-Variables הבאים:**
   - `NEXT_PUBLIC_SUPABASE_URL` = `https://uoydxjnbqbifcaigeexg.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `;  
   1;; םגהיבנ שיעעעעעעעעעעעעעעעעעעעזעשעס`
   - `SUPABASE_SERVICE_ROLE_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (ה-service role key המלא)

3. **ודא שהם מוגדרים ל:**
   - ✅ Production
   - ✅ Preview
   - ✅ Development

### שלב 2: אם חסרים - הוסף אותם

1. לחץ על "Add New"
2. הכנס את ה-Name וה-Value
3. בחר את כל ה-Environments (Production, Preview, Development)
4. לחץ "Save"

### שלב 3: Redeploy

אחרי שהוספת/עדכנת את ה-Variables:
1. לך ל-Deployments
2. לחץ על ה-deploy האחרון
3. לחץ על ה-3 נקודות (⋯)
4. בחר "Redeploy"

או פשוט תעשה push חדש ל-GitHub - Vercel י-deploy אוטומטית.

---

## בדיקה מהירה:

אחרי ה-Redeploy, בדוק:
```bash
curl https://www.aipicks.co | grep "No products yet"
```

אם עדיין מציג "No products yet" → יש בעיה עם ה-Database connection או RLS policies.

---

**זה אמור לפתור את הבעיה!** 🚀
