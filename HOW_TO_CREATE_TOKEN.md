# איך ליצור Personal Access Token ב-GitHub

## שלב 1: כניסה ל-GitHub
1. עדי נכנסת ל-https://github.com
2. לוחצת על התמונה שלך בפינה הימנית העליונה
3. בוחרת **Settings**

## שלב 2: גישה ל-Developer Settings
1. בתפריט השמאלי, גלול למטה
2. לחצי על **Developer settings** (בתחתית התפריט)

## שלב 3: יצירת Token
1. בתפריט השמאלי, לחצי על **Personal access tokens**
2. לחצי על **Tokens (classic)** או **Fine-grained tokens**
3. לחצי על **Generate new token** (או **Generate new token (classic)**)

## שלב 4: הגדרת Token
1. **Note** (שם): תני שם כמו "AmazonMVP - רני" או "Token for רני"
2. **Expiration**: בחרי תאריך תפוגה (או "No expiration" אם את רוצה)
3. **Select scopes** - חשוב! סמני:
   - ✅ **repo** (כל התת-קטגוריות יתסמנו אוטומטית)
     - זה נותן גישה מלאה ל-repositories

## שלב 5: יצירה והעתקה
1. לחצי על **Generate token** (בתחתית)
2. ⚠️ **חשוב מאוד**: העתיקי את ה-token מיד! 
   - זה היחיד שתצטרכי - GitHub לא יציג אותו שוב
   - זה יראה כמו: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

## שלב 6: העברת ה-Token
1. שלחי את ה-token לרני (בטוח - דרך WhatsApp, Signal, או אפליקציה מאובטחת)
2. רני ישתמש בו כדי לדחוף את השינויים

---

## איך רני ישתמש ב-Token

אחרי שרני מקבל את ה-token, הוא יריץ:

```bash
git push https://TOKEN_HERE@github.com/adicaspi/AmazonMVP.git main
git push https://TOKEN_HERE@github.com/adicaspi/AmazonMVP.git v0.2.0-רני
```

או שיכול להגדיר את זה ב-credential helper.

---

## אבטחה

- ⚠️ **אל תשתפי את ה-token בפומבי**
- ⚠️ **אם ה-token נחשף, מחקי אותו מיד ויצרי חדש**
- ✅ אפשר למחוק token בכל עת מ-Settings → Developer settings → Personal access tokens
