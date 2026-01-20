# 🖥️ שימוש בשרת שלך במקום Vercel

## ✅ כן, זה יכול לעבוד!

אם יש לך שרת משלך, אתה יכול להשתמש בו במקום Vercel.

---

## מה יש לך?

- **IP:** 109.226.23.217
- **Username:** Yaniv
- **Password:** 180900

---

## מה צריך לעשות?

### שלב 1: התחברות לשרת
```bash
ssh Yaniv@109.226.23.217
# Password: 180900
```

### שלב 2: התקנת Node.js
```bash
# בדוק אם Node.js מותקן
node --version

# אם לא, התקן:
# (תלוי ב-OS של השרת)
```

### שלב 3: התקנת Git
```bash
# בדוק אם Git מותקן
git --version

# אם לא, התקן:
# (תלוי ב-OS של השרת)
```

### שלב 4: Clone הפרויקט
```bash
git clone https://github.com/adicaspi/AmazonMVP.git
cd AmazonMVP
```

### שלב 5: התקנת Dependencies
```bash
npm install
```

### שלב 6: הגדרת Environment Variables
```bash
# צור .env.local
nano .env.local

# הוסף:
NEXT_PUBLIC_SUPABASE_URL=https://uoydxjnbqbifcaigeexg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_8jhHrDRVtby9oLoNwq9EIg_P7TWXWkh
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVveWR4am5icWJpZmNhaWdlZXhnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODg5ODQyNywiZXhwIjoyMDg0NDc0NDI3fQ.UdMQPWN2TyAJXswwgHBiSKzHmDydLJTKA42Iu6h69FU
OPENAI_API_KEY=your-openai-api-key-here
```

### שלב 7: Build
```bash
npm run build
```

### שלב 8: הרצה
```bash
npm start
# או עם PM2 (מומלץ):
npm install -g pm2
pm2 start npm --name "amazon-mvp" -- start
```

### שלב 9: הגדרת Reverse Proxy (Nginx)
```bash
# התקן Nginx
sudo apt install nginx  # Ubuntu/Debian
# או
sudo yum install nginx  # CentOS/RHEL

# הגדר Nginx להצביע על localhost:3000
```

---

## השוואה: שרת שלך vs Vercel

### ✅ שרת שלך:
- ✅ שליטה מלאה
- ✅ יכול לכתוב קבצים (לא צריך Database!)
- ✅ יכול להריץ AI scripts
- ✅ יותר גמיש
- ❌ יותר מורכב להגדרה
- ❌ צריך לתחזק (updates, security)
- ❌ צריך להגדיר HTTPS בעצמך
- ❌ צריך להגדיר Domain בעצמך

### ✅ Vercel:
- ✅ פשוט מאוד (לחיצה אחת)
- ✅ HTTPS אוטומטי
- ✅ CDN אוטומטי
- ✅ Auto-deploy מ-GitHub
- ✅ חינם
- ❌ Serverless (read-only filesystem)
- ❌ פחות שליטה

---

## המלצה

### אם אתה רוצה פשוט:
→ **Vercel** (5 דקות, חינם)

### אם אתה רוצה שליטה:
→ **שרת שלך** (יותר מורכב, אבל יותר גמיש)

---

## מה אתה מעדיף?

1. **Vercel** - פשוט ומהיר
2. **שרת שלך** - יותר מורכב, אבל יותר שליטה

איזה אפשרות תרצה?
