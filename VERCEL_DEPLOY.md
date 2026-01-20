# 🚀 מדריך Deploy ל-Vercel

## ✅ מה כבר מוכן:
- ✅ הקוד ב-GitHub
- ✅ Database (Supabase) מוגדר
- ✅ כל הקבצים מעודכנים

---

## שלב 1: Deploy ב-Vercel

### 1. היכנס ל-Vercel:
https://vercel.com

### 2. Import Project:
- לחץ על **"Add New..."** → **"Project"**
- בחר **"Import Git Repository"**
- בחר את ה-repo: `adicaspi/AmazonMVP`
- לחץ **"Import"**

### 3. הגדר את ה-Project:
- **Framework Preset:** Next.js (אוטומטי)
- **Root Directory:** `./` (ברירת מחדל)
- **Build Command:** `npm run build` (אוטומטי)
- **Output Directory:** `.next` (אוטומטי)

### 4. הוסף Environment Variables:
לפני ה-Deploy, לחץ על **"Environment Variables"** והוסף:

```
NEXT_PUBLIC_SUPABASE_URL=https://uoydxjnbqbifcaigeexg.supabase.co
```

```
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_8jhHrDRVtby9oLoNwq9EIg_P7TWXWkh
```

```
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVveWR4am5icWJpZmNhaWdlZXhnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODg5ODQyNywiZXhwIjoyMDg0NDc0NDI3fQ.UdMQPWN2TyAJXswwgHBiSKzHmDydLJTKA42Iu6h69FU
```

```
OPENAI_API_KEY=your-openai-api-key-here
```

**חשוב:** לכל variable, בחר:
- ✅ **Production**
- ✅ **Preview** 
- ✅ **Development**

### 5. Deploy:
- לחץ **"Deploy"**
- המתן 2-3 דקות לבנייה
- תקבל URL: `https://amazon-mvp-xxx.vercel.app`

---

## שלב 2: בדיקה

### בדוק שהכל עובד:
1. **פתח את ה-URL** שקיבלת
2. **בדוק:**
   - ✅ דף ראשי נטען
   - ✅ מוצרים מוצגים (מ-database!)
   - ✅ Analytics Dashboard עובד
   - ✅ Landing pages עובדים

### אם יש בעיות:
- בדוק את **Vercel Logs** (Deployments → View Function Logs)
- וודא שה-Environment Variables הוגדרו נכון

---

## שלב 3: Row Level Security (RLS) ב-Supabase

**חשוב!** צריך להגדיר RLS ב-Supabase כדי שהאתר יוכל לקרוא/לכתוב:

### ב-Supabase Dashboard → Authentication → Policies:

#### Products Table:
```sql
-- Allow public read access
CREATE POLICY "Public read access" ON products
  FOR SELECT USING (true);
```

#### Events Table:
```sql
-- Allow public insert (for tracking)
CREATE POLICY "Public insert access" ON events
  FOR INSERT WITH CHECK (true);

-- Allow public read access
CREATE POLICY "Public read access" ON events
  FOR SELECT USING (true);
```

#### Creatives Table:
```sql
-- Allow public read access
CREATE POLICY "Public read access" ON creatives
  FOR SELECT USING (true);
```

**הרץ את ה-SQL הזה ב-Supabase SQL Editor!**

---

## ✅ סיכום

לאחר ה-Deploy:
- ✅ האתר יעבוד ב-production
- ✅ Database יעבוד
- ✅ Analytics יעבוד
- ✅ Events יישמרו

**השלב הבא:** קניית דומיין! 🌐

---

## 🆘 בעיות נפוצות

### "Database not available"
- **פתרון:** וודא שה-Environment Variables הוגדרו ב-Vercel

### "Permission denied"
- **פתרון:** הוסף RLS policies ב-Supabase (ראה למעלה)

### "Build failed"
- **פתרון:** בדוק את Vercel Logs - בדרך כלל זה dependency issue

---

**רוצה עזרה?** תגיד לי מה לא עובד! 🚀
