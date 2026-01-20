# סיכום העבודה - Amazon Affiliate MVP

## מה בנינו עד עכשיו

### 🎯 מטרת הפרויקט
מערכת אוטומטית ליצירת דפי נחיתה למוצרי Amazon עם AI, כולל tracking ו-analytics.

---

## 🤖 AI Agents (3 מתוך 8)

### ✅ Agent 1 - Product Selection (`ai/runSelection.ts`)
**מה הוא עושה:**
- קורא מועמדים מ-`ai/raw_candidates.json`
- מבצע hard filters (מחיר, בעיות, קהל יעד)
- מדרג מוצרים עם LLM (GPT-4.1-mini) - ציון 0-100
- בוחר את המוצרים הטובים ביותר
- יוצר 3 variants לכל מוצר עם angles שונים (A/B testing)

**איך להריץ:**
```bash
npm run ai:select
```

**פלט:** `ai/candidates.json` - מועמדים מובנים עם metadata

---

### ✅ Agent 2 - Landing Page Generator (`ai/runPipeline.ts`)
**מה הוא עושה:**
- קורא מועמדים מ-`ai/candidates.json`
- יוצר תוכן לדפי נחיתה עם AI:
  - Headline & Subheadline
  - Pain Bullets (3-4)
  - How It Works
  - Who It's For / Not For
  - FAQ
  - CTA Text
- מותאם ל-angle של כל variant
- שומר ל-`data/products.json`

**איך להריץ:**
```bash
npm run ai:pipeline
```

**פלט:** `data/products.json` - מוצרים מוכנים עם תוכן מלא

---

### ✅ Agent 3 - Creative Angle Generator (`ai/runCreativeGenerator.ts`)
**מה הוא עושה:**
- יוצר 5-10 ad angles לכל מוצר
- כל angle כולל:
  - Hook line (2-3 שניות ראשונות)
  - Primary text (2-3 משפטים)
  - Shot list (3-5 תיאורי צילומים)
  - Target audience
  - Emotional trigger
- שמירה ב-`data/creatives.json`

**איך להריץ:**
```bash
npm run ai:creatives
```

**פלט:** `data/creatives.json` - רעיונות לפרסומות Meta

---

## 🎨 Frontend (Next.js)

### ✅ דף ראשי (`/`)
- Grid של product cards
- כפתור ל-Analytics Dashboard
- Hover effects ו-animations
- Responsive design

**URL:** `http://localhost:3000/`

---

### ✅ דף מוצר - Landing Page (`/p/[slug]`)
**מה יש בדף:**
- Hero Section עם headline גדול
- Pain Points - כרטיסים אדומים עם hover effects
- How It Works - שלבים ממוספרים עם gradient
- Who It's For / Not For - שתי עמודות
- Price Note
- CTA Button - gradient כחול, sticky על mobile
- FAQ Section

**עיצוב:**
- Dark theme עם gradients
- Animations ו-transitions
- Mobile-first responsive
- Modern UI/UX

**URL:** `http://localhost:3000/p/[slug]`

**דוגמה:** `http://localhost:3000/p/organize-your-cutlery-drawer`

---

### ✅ Analytics Dashboard (`/analytics`)
**מה יש בדשבורד:**
- Summary Cards: Total Views, Total Clicks, Overall CTR
- Product Variants Comparison - השוואה בין v1, v2, v3
- All Products Table - טבלה מפורטת
- Progress bars ל-CTR
- Color coding: ירוק (CTR > 5%), צהוב (2-5%), אפור (< 2%)

**URL:** `http://localhost:3000/analytics`

---

## 📊 Tracking & Analytics System

### ✅ Event Tracking API (`/api/event`)
**מה הוא עושה:**
- POST: שמירת אירועים (view, click, conversion)
- GET: קריאת אירועים לניתוח
- שמירת UTM parameters
- שמירת user agent, IP, referer

**Storage:** `data/events.json`

---

### ✅ Tracking Redirect (`/out/[offerId]`)
**מה הוא עושה:**
- Redirect עם tracking לפני Amazon
- שומר click event אוטומטית
- מעביר UTM parameters
- מוסיף tracking ID ל-Amazon URL

**URL:** `http://localhost:3000/out/[offerId]`

---

### ✅ Product View Tracker
**מה הוא עושה:**
- Client component שעוקב אחרי views
- שומר UTM parameters מהקישור
- עובד אוטומטית בכל דף מוצר

---

## 📁 מבנה הקבצים

### AI Agents
```
ai/
├── runSelection.ts          # Agent 1 - Product Selection
├── runPipeline.ts            # Agent 2 - Landing Page Generator
├── runCreativeGenerator.ts   # Agent 3 - Creative Angle Generator
├── creativeAngleAgent.ts     # Creative angle generation logic
├── landingPageAgent.ts       # Landing page generation logic
├── client.ts                 # OpenAI client
├── types.ts                  # Type definitions
├── candidates.json           # מועמדים שנבחרו
└── raw_candidates.json       # מועמדים גולמיים
```

### Frontend
```
src/app/
├── page.tsx                  # דף ראשי
├── analytics/page.tsx         # Analytics Dashboard
├── p/[slug]/page.tsx         # דף מוצר
├── p/[slug]/ProductViewTracker.tsx  # View tracking
├── api/event/route.ts        # Event tracking API
└── out/[offerId]/route.ts    # Tracking redirect
```

### Data
```
data/
├── products.json             # כל המוצרים עם תוכן
├── events.json               # כל האירועים (tracking)
└── creatives.json            # כל ה-creative angles
```

---

## 🚀 איך להשתמש במערכת

### Workflow מלא:

1. **הוסף מועמדים:**
   - ערוך `ai/raw_candidates.json`
   - הוסף מוצרים עם: name, problem, targetUser, Amazon URL

2. **בחר מוצרים:**
   ```bash
   npm run ai:select
   ```
   - בוחר מוצרים טובים
   - יוצר 3 variants עם angles

3. **צור דפי נחיתה:**
   ```bash
   npm run ai:pipeline
   ```
   - יוצר תוכן AI לכל variant
   - שומר ל-`data/products.json`

4. **צור creative angles:**
   ```bash
   npm run ai:creatives
   ```
   - יוצר 5-10 ad angles לכל מוצר
   - שומר ל-`data/creatives.json`

5. **הרץ את השרת:**
   ```bash
   npm run dev
   ```
   - פתח `http://localhost:3000`
   - בדוק את הדפים

6. **עקוב אחרי ביצועים:**
   - פתח `http://localhost:3000/analytics`
   - ראה views, clicks, CTR

---

## 📈 מה יש לנו עכשיו

### ✅ מוכן לשימוש:
- 3 AI Agents (Selection, Landing Page, Creative Angles)
- Frontend מלא עם UI/UX משופר
- Tracking system מלא
- Analytics Dashboard
- A/B testing support (3 variants לכל מוצר)

### ⏳ חסר (אופציונלי):
- Agent 4 - Performance Analytics (ניתוח אוטומטי)
- Agent 5 - Decision Engine (Kill/Keep/Scale)
- Agent 6 - Optimization Agent
- Agent 7 - Compliance Agent
- Agent 8 - Orchestrator (Supervisor)

---

## 🎯 מה זה נותן

1. **אוטומציה מלאה:**
   - מועמד → מוצר → דף נחיתה → creative angles
   - הכל עם AI

2. **A/B Testing:**
   - 3 variants לכל מוצר
   - השוואה ב-Analytics Dashboard

3. **Tracking מלא:**
   - Views, Clicks, CTR
   - UTM parameters
   - Product-level metrics

4. **Ready for Meta Ads:**
   - Creative angles מוכנים
   - Landing pages מותאמים
   - Tracking מוכן

---

## 📝 טאגים ב-Git

- `v0.2.0-רני` - כל השינויים הנוכחיים
  - שיפורי UI/UX
  - Analytics Dashboard
  - Creative Angle Generator
  - Tracking System

---

## 🔗 קישורים חשובים

- **דף ראשי:** `http://localhost:3000`
- **Analytics:** `http://localhost:3000/analytics`
- **דף מוצר:** `http://localhost:3000/p/[slug]`
- **GitHub:** https://github.com/adicaspi/AmazonMVP

---

**נוצר על ידי רני - ינואר 2026**
