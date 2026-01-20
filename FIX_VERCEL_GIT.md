# 🔧 איך לתקן את ה-Vercel Git Connection

## הבעיה:
- Vercel מחובר ל-GitHub account: `raniop`
- אבל ה-repository הוא: `adicaspi/AmazonMVP`
- `raniop` לא רואה את ה-repository `adicaspi/AmazonMVP` ב-Vercel

---

## פתרונות:

### פתרון 1: עדי מוסיפה את raniop-Collaborator (מומלץ)

1. **עדי הולכת ל-GitHub:**
   - https://github.com/adicaspi/AmazonMVP/settings/access
   - לחץ על "Add people" או "Invite a collaborator"
   - הכנס: `raniop` (או את ה-username של רני ב-GitHub)
   - בחר הרשאות: "Write" (או "Admin" אם צריך)

2. **רני ב-Vercel:**
   - לך ל-Vercel Dashboard → Project Settings → Git
   - לחץ על "Disconnect" (אם יש)
   - לחץ על "Connect Git Repository"
   - בחר את `adicaspi/AmazonMVP` (עכשיו אמור להופיע!)

3. **Vercel י-deploy אוטומטית:**
   - אחרי החיבור, Vercel י-deploy את כל ה-commits
   - ה-link preview יתעדכן!

---

### פתרון 2: עדי יוצרת Vercel Project חדש

1. **עדי הולכת ל-Vercel:**
   - https://vercel.com/new
   - בחר "Import Git Repository"
   - בחר `adicaspi/AmazonMVP`
   - הגדר את ה-Environment Variables (Supabase, OpenAI)
   - Deploy!

2. **רני:**
   - עדי מוסיפה את רני כ-Team Member ב-Vercel project
   - או עדי מעבירה את ה-domain `aipicks.co` ל-project החדש

---

### פתרון 3: העבר את ה-Repository ל-raniop

1. **עדי ב-GitHub:**
   - Settings → Transfer ownership
   - העבר ל-`raniop`

2. **רני ב-Vercel:**
   - עכשיו אמור לראות את ה-repository
   - Connect!

---

## מה מומלץ?

**פתרון 1** - הכי פשוט ומהיר:
- עדי מוסיפה את רני כ-Collaborator
- רני מתחבר ב-Vercel
- הכל עובד!

---

## איך לבדוק שהכל עובד:

1. אחרי החיבור, לך ל-Vercel Dashboard → Deployments
2. אמור להיות deploy חדש עם commit `3edf920 Update metadata...`
3. אחרי שהדיפלוי יושלם, בדוק:
   ```bash
   curl https://www.aipicks.co | grep "<title>"
   ```
4. אמור להציג: `<title>AI Picks - Live Product Tests</title>`

---

**רוצה שאכין הוראות מפורטות יותר?** 🚀
