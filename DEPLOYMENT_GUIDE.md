# 🚀 מדריך Deployment - Amazon MVP

## שלבים לפרסום הפרויקט

### ⚠️ בעיה חשובה שצריך לפתור

הפרויקט הנוכחי משתמש ב-**JSON files** (`data/products.json`, `data/events.json`, `data/creatives.json`) לאחסון נתונים.

**Vercel (serverless)** לא תומך ב-write ל-filesystem - רק read-only.

### 📋 תוכנית הפעולה

---

## שלב 1: Deploy ל-Vercel (ללא דומיין)

### מה לעשות:
1. **הרשמה ל-Vercel** (אם אין לך): https://vercel.com
2. **חיבור GitHub**:
   - Vercel → Add New Project
   - בחר את ה-repo `AmazonMVP`
   - Vercel יזהה אוטומטית שזה Next.js

3. **Environment Variables**:
   - ב-Vercel Dashboard → Project Settings → Environment Variables
   - הוסף: `OPENAI_API_KEY` = `your-openai-api-key-here`

4. **Deploy**:
   - Vercel יבנה ויפרסם אוטומטית
   - תקבל URL: `https://amazon-mvp-xxx.vercel.app`

### ⚠️ מה לא יעבוד:
- **AI Pipeline Scripts** (`npm run ai:select`, `ai:pipeline`, `ai:creatives`) - צריכים לרוץ **locally** או על server עם filesystem
- **Writing events** - כרגע לא יעבוד ב-production (רק read)

---

## שלב 2: פתרון בעיית ה-Data Storage

### אפשרות A: Database (מומלץ)
- **Vercel Postgres** (חינם עד 256MB)
- או **Supabase** (חינם, PostgreSQL)
- או **PlanetScale** (MySQL, חינם)

### אפשרות B: Vercel KV (Redis)
- טוב ל-events tracking
- חינם עד 256MB

### אפשרות C: Keep JSON Files (זמני)
- להמשיך עם JSON files
- **AI scripts** ירוצו locally
- **Events** יישמרו רק locally (לא ב-production)

---

## שלב 3: קניית דומיין

### איפה לקנות:
1. **Namecheap** - זול וטוב ($10-15/שנה)
2. **Google Domains** - פשוט ($12/שנה)
3. **Cloudflare** - הכי זול ($8-10/שנה, ללא markup)

### דומיינים מומלצים:
- `productfinder.com`
- `smartdeals.io`
- `producttest.com`
- `finditnow.com`
- או משהו מותאם לנישה שלך

---

## שלב 4: חיבור דומיין ל-Vercel

1. **ב-Vercel Dashboard**:
   - Project Settings → Domains
   - Add Domain → הכנס את הדומיין

2. **ב-DNS Provider** (Namecheap/Cloudflare):
   - הוסף CNAME record:
     - Type: `CNAME`
     - Name: `@` (או `www`)
     - Value: `cname.vercel-dns.com`

3. **Vercel יוודא אוטומטית** (יכול לקחת עד 24 שעות)

---

## שלב 5: הגדרות נוספות

### Security:
- ✅ HTTPS (אוטומטי ב-Vercel)
- ✅ Security headers (ניתן להוסיף ב-`next.config.ts`)

### Performance:
- ✅ Image Optimization (Next.js Image)
- ✅ Automatic CDN (Vercel)

### Analytics:
- Vercel Analytics (חינם)
- או Google Analytics

---

## 📝 סיכום - מה לעשות עכשיו

### אפשרות 1: Deploy מהיר (ללא database)
1. ✅ Deploy ל-Vercel
2. ✅ קנה דומיין
3. ✅ חבר דומיין
4. ⚠️ AI scripts ירוצו locally
5. ⚠️ Events לא יישמרו ב-production

### אפשרות 2: Deploy מלא (עם database) - **מומלץ**
1. ✅ בחר database (Supabase/PlanetScale)
2. ✅ עדכן את הקוד להשתמש ב-database
3. ✅ Deploy ל-Vercel
4. ✅ קנה דומיין
5. ✅ חבר דומיין
6. ✅ הכל יעבוד ב-production

---

## 🎯 המלצה שלי

**לפני שתקנה דומיין**, בואו נפתור את בעיית ה-data storage:
1. נבחר database (Supabase מומלץ - חינם וקל)
2. נעדכן את הקוד
3. נבדוק שהכל עובד
4. **אז** נקנה דומיין ונחבר

---

## שאלות?

אם אתה רוצה, אני יכול:
- ✅ לעזור לך להגדיר Supabase
- ✅ לעדכן את הקוד להשתמש ב-database
- ✅ להכין הכל ל-production

מה אתה מעדיף?
