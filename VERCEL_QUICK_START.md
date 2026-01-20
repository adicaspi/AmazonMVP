# 🚀 Vercel Quick Start - מדריך מהיר

## 📋 מה אתה צריך להכניס ב-Vercel

### 1. כתובת ה-GitHub Repository:
```
https://github.com/adicaspi/AmazonMVP
```

או:
```
adicaspi/AmazonMVP
```

---

## 🎯 שלבים ב-Vercel

### שלב 1: Import Project
1. היכנס ל: https://vercel.com
2. לחץ **"Add New..."** → **"Project"**
3. בחר **"Import Git Repository"**
4. הכנס: `adicaspi/AmazonMVP`
5. לחץ **"Import"**

### שלב 2: הגדרת Project
- **Framework Preset:** Next.js (אוטומטי)
- **Root Directory:** `./` (ברירת מחדל)
- **Build Command:** `npm run build` (אוטומטי)
- **Output Directory:** `.next` (אוטומטי)

### שלב 3: Environment Variables
לפני ה-Deploy, לחץ על **"Environment Variables"** והוסף:

#### 1. NEXT_PUBLIC_SUPABASE_URL
```
https://uoydxjnbqbifcaigeexg.supabase.co
```

#### 2. NEXT_PUBLIC_SUPABASE_ANON_KEY
```
sb_publishable_8jhHrDRVtby9oLoNwq9EIg_P7TWXWkh
```

#### 3. SUPABASE_SERVICE_ROLE_KEY
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVveWR4am5icWJpZmNhaWdlZXhnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODg5ODQyNywiZXhwIjoyMDg0NDc0NDI3fQ.UdMQPWN2TyAJXswwgHBiSKzHmDydLJTKA42Iu6h69FU
```

#### 4. OPENAI_API_KEY
```
your-openai-api-key-here
```

**חשוב:** לכל variable, בחר:
- ✅ **Production**
- ✅ **Preview** 
- ✅ **Development**

### שלב 4: Deploy
- לחץ **"Deploy"**
- המתן 2-3 דקות
- תקבל URL: `https://amazon-mvp-xxx.vercel.app`

---

## ✅ אחרי Deploy

### 1. בדוק שהכל עובד:
- פתח את ה-URL שקיבלת
- בדוק שהמוצרים מוצגים
- בדוק שהאנליטיקס עובד

### 2. הגדר RLS ב-Supabase:
- היכנס ל-Supabase Dashboard
- SQL Editor
- הרץ את `supabase/rls-policies.sql`

---

## 🆘 בעיות?

אם יש בעיות, בדוק:
1. Vercel Logs (Deployments → View Function Logs)
2. Environment Variables (וודא שהוגדרו נכון)
3. RLS Policies (וודא שרץ ב-Supabase)

---

**רוצה עזרה?** תגיד לי מה לא עובד! 🚀
