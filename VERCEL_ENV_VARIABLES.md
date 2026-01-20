# 🔧 Environment Variables ל-Vercel

## הוסף את ה-Variables הבאים ב-Vercel:

### 1. NEXT_PUBLIC_SUPABASE_URL
- **Key:** `NEXT_PUBLIC_SUPABASE_URL`
- **Value:** `https://uoydxjnbqbifcaigeexg.supabase.co`
- **Environments:** ✅ Production, ✅ Preview, ✅ Development

### 2. NEXT_PUBLIC_SUPABASE_ANON_KEY
- **Key:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value:** `sb_publishable_8jhHrDRVtby9oLoNwq9EIg_P7TWXWkh`
- **Environments:** ✅ Production, ✅ Preview, ✅ Development

### 3. SUPABASE_SERVICE_ROLE_KEY
- **Key:** `SUPABASE_SERVICE_ROLE_KEY`
- **Value:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVveWR4am5icWJpZmNhaWdlZXhnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODg5ODQyNywiZXhwIjoyMDg0NDc0NDI3fQ.UdMQPWN2TyAJXswwgHBiSKzHmDydLJTKA42Iu6h69FU`
- **Environments:** ✅ Production, ✅ Preview, ✅ Development
- **Sensitive:** ✅ Enable (מומלץ)

### 4. OPENAI_API_KEY (אם צריך)
- **Key:** `OPENAI_API_KEY`
- **Value:** ה-API key שלך מ-OpenAI
- **Environments:** ✅ Production, ✅ Preview, ✅ Development
- **Sensitive:** ✅ Enable

---

## איך להוסיף:

1. **לכל Variable:**
   - לחץ על "Add Another" (אם צריך)
   - הכנס את ה-Key ב-field השמאלי
   - הכנס את ה-Value ב-field הימני
   - בחר את ה-Environments (Production, Preview, Development)
   - אם זה Sensitive (כמו API keys) - הפעל את ה-toggle

2. **לחץ על "Save"** (או "Add" אם זה הראשון)

3. **Redeploy:**
   - לך ל-Deployments
   - לחץ על ה-deploy האחרון
   - לחץ על ה-3 נקודות (⋯)
   - בחר "Redeploy"

---

## בדיקה:

אחרי ה-Redeploy:
- לך ל-https://www.aipicks.co
- רענן את הדף (Cmd+Shift+R)
- בדוק שהמוצרים מופיעים

---

**זה אמור לפתור את הבעיה!** 🚀
