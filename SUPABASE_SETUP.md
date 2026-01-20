# 🗄️ Supabase Setup Guide

## שלב 1: יצירת Supabase Project

1. **היכנס ל-Supabase**: https://supabase.com
2. **צור Account** (אם אין לך) - חינם
3. **New Project**:
   - Name: `amazon-mvp` (או שם אחר)
   - Database Password: **שמור את זה!** (תצטרך את זה)
   - Region: בחר הכי קרוב אליך
   - Plan: **Free** (מספיק להתחלה)

4. **המתן** עד שה-project מוכן (2-3 דקות)

---

## שלב 2: קבלת Credentials

1. **ב-Supabase Dashboard** → **Project Settings** → **API**
2. **העתק את הערכים הבאים**:
   - `Project URL` → זה ה-`NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → זה ה-`NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → זה ה-`SUPABASE_SERVICE_ROLE_KEY` (⚠️ סודי!)

---

## שלב 3: יצירת Database Schema

1. **ב-Supabase Dashboard** → **SQL Editor**
2. **New Query**
3. **העתק את כל התוכן** מ-`supabase/schema.sql`
4. **Run** (Ctrl+Enter או כפתור Run)
5. **וודא** שהטבלאות נוצרו:
   - `products`
   - `events`
   - `creatives`

---

## שלב 4: הגדרת Environment Variables

### ב-Local (.env.local):
```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### ב-Vercel (Production):
1. **Vercel Dashboard** → **Project Settings** → **Environment Variables**
2. **הוסף את 3 המשתנים**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

---

## שלב 5: Row Level Security (RLS)

**ב-Supabase Dashboard** → **Authentication** → **Policies**:

### Products Table:
```sql
-- Allow public read access
CREATE POLICY "Public read access" ON products
  FOR SELECT USING (true);
```

### Events Table:
```sql
-- Allow public insert (for tracking)
CREATE POLICY "Public insert access" ON events
  FOR INSERT WITH CHECK (true);

-- Allow public read access
CREATE POLICY "Public read access" ON events
  FOR SELECT USING (true);
```

### Creatives Table:
```sql
-- Allow public read access
CREATE POLICY "Public read access" ON creatives
  FOR SELECT USING (true);
```

---

## שלב 6: Migration של נתונים קיימים

לאחר שהכל מוכן, תריץ:
```bash
npm run migrate:json-to-db
```

זה יעביר את כל הנתונים מ-JSON files ל-database.

---

## ✅ בדיקה

לאחר ההגדרה, בדוק:
1. ✅ Products נטענים מ-database
2. ✅ Events נשמרים ב-database
3. ✅ Analytics Dashboard עובד
4. ✅ AI Pipeline כותב ל-database

---

## 🆘 בעיות נפוצות

### "relation does not exist"
- **פתרון**: וודא שרצת את ה-schema.sql ב-SQL Editor

### "permission denied"
- **פתרון**: וודא שהוספת RLS policies

### "invalid API key"
- **פתרון**: וודא שהעתקת את ה-keys נכון מ-Supabase Dashboard

---

## 📞 עזרה

אם נתקלת בבעיה, בדוק:
1. Supabase Dashboard → Logs
2. Browser Console (F12)
3. Vercel Logs (אם ב-production)
