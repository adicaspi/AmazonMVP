# 🌐 חיבור דומיין GoDaddy ל-Vercel

## ✅ מה יש לך:
- דומיין: `aipicks.co`
- Provider: GoDaddy
- Vercel Project: https://amazonmvp.vercel.app/

---

## שלב 1: הוסף דומיין ב-Vercel

### 1. היכנס ל-Vercel Dashboard:
https://vercel.com/dashboard

### 2. בחר את ה-Project:
- לחץ על `AmazonMVP` (או השם של ה-project שלך)

### 3. הוסף דומיין:
- לחץ על **Settings** (בתפריט העליון)
- לחץ על **Domains** (בתפריט השמאלי)
- לחץ על **Add Domain**
- הכנס: `aipicks.co`
- לחץ **Add**

### 4. Vercel יראה לך את ה-DNS Records הנדרשים:
תראה משהו כמו:
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**שמור את זה!** תצטרך את זה לשלב הבא.

---

## שלב 2: הגדר DNS ב-GoDaddy

### 1. היכנס ל-GoDaddy:
https://www.godaddy.com/

### 2. לך ל-DNS Management:
- לחץ על **My Products**
- מצא את `aipicks.co`
- לחץ על **DNS** (או **Manage DNS**)

### 3. מחק Records קיימים (אם יש):
- מחק את כל ה-A Records וה-CNAME Records הקיימים
- השאר רק את ה-MX Records (אם יש email)

### 4. הוסף Records חדשים:

#### Option A: A Record (מומלץ)
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 600 (או Auto)
```

#### Option B: CNAME (חלופה)
```
Type: CNAME
Name: @
Value: cname.vercel-dns.com
TTL: 600 (או Auto)
```

**חשוב:** GoDaddy לא תמיד תומך ב-CNAME על root (@), אז עדיף להשתמש ב-A Record.

#### הוסף גם www:
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 600 (או Auto)
```

### 5. שמור:
- לחץ **Save** (או **Add Record**)

---

## שלב 3: המתן ל-DNS Propagation

### זמן המתנה:
- **מינימום:** 5-10 דקות
- **מקסימום:** 24-48 שעות
- **בדרך כלל:** 1-2 שעות

### איך לבדוק:
1. **ב-Vercel Dashboard:**
   - לך ל-Settings → Domains
   - תראה סטטוס: "Valid Configuration" (ירוק) = עובד!

2. **בדפדפן:**
   - נסה לפתוח: `https://aipicks.co`
   - אם זה עובד = הכל תקין!

---

## שלב 4: וודא HTTPS

Vercel יוסיף HTTPS אוטומטית, אבל זה יכול לקחת כמה דקות.

### איך לבדוק:
- פתח: `https://aipicks.co`
- בדוק שיש 🔒 (lock icon) בשורת הכתובת

---

## 🆘 בעיות נפוצות:

### "Invalid Configuration" ב-Vercel:
- **פתרון:** וודא שה-DNS Records הוגדרו נכון ב-GoDaddy
- **פתרון:** המתן עוד 10-15 דקות

### הדומיין לא עובד:
- **פתרון:** בדוק שה-DNS Records נכונים
- **פתרון:** השתמש ב-A Record במקום CNAME (אם GoDaddy לא תומך)
- **פתרון:** המתן עוד זמן (DNS propagation)

### "DNS Propagation" לוקח זמן:
- **פתרון:** זה נורמלי! המתן 1-2 שעות
- **פתרון:** אפשר לבדוק עם: https://dnschecker.org/

---

## ✅ סיכום - צעדים מהירים:

1. ✅ Vercel → Settings → Domains → Add Domain → `aipicks.co`
2. ✅ GoDaddy → DNS Management → הוסף A Record: `@` → `76.76.21.21`
3. ✅ GoDaddy → הוסף CNAME: `www` → `cname.vercel-dns.com`
4. ✅ המתן 1-2 שעות
5. ✅ בדוק: `https://aipicks.co`

---

## 📝 הערות חשובות:

- **A Record vs CNAME:** GoDaddy לא תמיד תומך ב-CNAME על root (@), אז עדיף A Record
- **TTL:** השאר 600 (או Auto) - זה בסדר
- **Propagation:** זה לוקח זמן - אל תדאג אם זה לא עובד מיד

---

**רוצה עזרה?** תגיד לי אם נתקלת בבעיה! 🚀
