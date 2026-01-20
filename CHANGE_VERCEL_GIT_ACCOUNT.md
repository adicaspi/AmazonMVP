# 🔄 איך לשנות את ה-GitHub Account ב-Vercel

## הבעיה:
- Vercel מחפש ב-account: `raniop`
- אבל ה-repository הוא ב-account: `adicaspi`
- לכן Vercel לא מוצא את ה-repository

---

## פתרונות:

### פתרון 1: שנה את ה-GitHub Account ב-Vercel (מומלץ)

1. **ב-Vercel Dashboard → Project Settings → Git:**
   - לחץ על ה-dropdown של "raniop" (ליד ה-GitHub icon)
   - חפש אם יש אפשרות לבחור `adicaspi`
   - או לחץ על "Add GitHub Account" / "Connect another account"

2. **אם יש אפשרות:**
   - בחר `adicaspi` מה-dropdown
   - עכשיו חפש: `AmazonMVP`
   - אמור להופיע!

---

### פתרון 2: Import Manual של Repository

1. **ב-Vercel Dashboard:**
   - לך ל-Project Settings → Git
   - לחץ על "Disconnect" (אם יש)
   - לחץ על "Import Git Repository"

2. **הכנס את ה-URL:**
   - הכנס: `https://github.com/adicaspi/AmazonMVP`
   - או: `adicaspi/AmazonMVP`
   - Vercel אמור לזהות את ה-repository

---

### פתרון 3: הוסף את adicaspi כ-Organization ב-Vercel

1. **ב-Vercel Dashboard:**
   - לך ל-Account Settings → Teams / Organizations
   - לחץ על "Create Team" או "Add Organization"
   - חבר את `adicaspi` GitHub organization

2. **אחרי החיבור:**
   - חזור ל-Project Settings → Git
   - עכשיו תוכל לבחור `adicaspi` מה-dropdown
   - חפש: `AmazonMVP`

---

### פתרון 4: עדי יוצרת Vercel Project (אם כלום לא עובד)

1. **עדי הולכת ל-Vercel:**
   - https://vercel.com/new
   - Import Git Repository
   - בחר `adicaspi/AmazonMVP`
   - הגדר Environment Variables
   - Deploy!

2. **רני:**
   - עדי מוסיפה את רני כ-Team Member
   - או מעבירה את ה-domain `aipicks.co` ל-project החדש

---

## מה לנסות קודם:

1. ✅ **פתרון 1** - שנה את ה-GitHub Account (הכי פשוט)
2. ✅ **פתרון 2** - Import Manual
3. ✅ **פתרון 3** - הוסף Organization
4. ✅ **פתרון 4** - עדי יוצרת Project חדש

---

## איך לבדוק שהכל עובד:

אחרי החיבור:
1. לך ל-Vercel Dashboard → Deployments
2. אמור להיות deploy חדש עם commit `3edf920 Update metadata...`
3. אחרי שהדיפלוי יושלם, בדוק:
   ```bash
   curl https://www.aipicks.co | grep "<title>"
   ```
4. אמור להציג: `<title>AI Picks - Live Product Tests</title>`

---

**נסה את פתרון 1 קודם - לחץ על ה-dropdown של "raniop" ובדוק אם יש אפשרות לבחור account אחר!** 🚀
