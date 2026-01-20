# Amazon Associates Program Compliance

## ✅ דרישות שהוטמעו באתר

### 1. Affiliate Disclosure (חובה!)

**✅ היכן מופיע:**
- **Footer** - בכל עמוד בתחתית
- **Disclosure Page** (`/disclosure`) - עמוד מפורט
- **Product Cards** - תחת כל כפתור CTA
- **Product Detail Pages** - תחת כפתור Amazon

**✅ הטקסט:**
```
As an Amazon Associate, I earn from qualifying purchases.
```

**✅ מיקום:**
- גלוי וברור
- לא מוסתר או קטן מדי
- מופיע לפני/תחת כל affiliate link

### 2. Link Attributes (חובה!)

**✅ כל הלינקים לאמזון כוללים:**
```html
rel="sponsored nofollow noopener"
target="_blank"
```

**✅ מימוש:**
- `components/ProductCard.tsx` - כל product cards
- `src/app/products/[slug]/page.tsx` - product detail pages
- כל קומפוננט שמכיל affiliate links

### 3. Content Requirements

**✅ תוכן איכותי:**
- Product descriptions מפורטים
- Pros/Cons לכל מוצר
- Specifications table
- "Who it's for" sections
- Editorial voice (לא רק מכירה)

**✅ אין:**
- ❌ Fake reviews או ratings
- ❌ Misleading information
- ❌ Price guarantees
- ❌ "Best price" claims

### 4. Website Structure

**✅ עמודים חוקיים:**
- `/about` - About page
- `/contact` - Contact information
- `/privacy` - Privacy policy
- `/disclosure` - Full affiliate disclosure

**✅ Navigation:**
- Header עם links ברורים
- Footer עם כל העמודים החוקיים
- Breadcrumbs (אם רלוונטי)

### 5. Technical Requirements

**✅ SEO:**
- Proper metadata לכל עמוד
- Open Graph tags
- Clean URLs
- Fast loading

**✅ Accessibility:**
- Semantic HTML
- ARIA labels
- Keyboard navigation
- Good contrast

### 6. Prohibited Practices (לא עושים!)

**❌ אסור:**
- שימוש ב-Amazon logos ללא אישור
- העתקת תוכן מ-Amazon
- Price comparison claims
- "Click here" links without context
- Pop-ups או interstitials

**✅ מה כן עושים:**
- "Check price on Amazon" - ברור ומובן
- Product descriptions מקוריים
- Editorial recommendations
- Clear value proposition

## 📋 Checklist לפני הגשת בקשה

- [x] Affiliate disclosure בכל עמוד
- [x] Disclosure page מפורט
- [x] `rel="sponsored nofollow noopener"` על כל הלינקים
- [x] תוכן איכותי ומקורי
- [x] About page
- [x] Contact page
- [x] Privacy policy
- [x] אין fake reviews
- [x] אין misleading information
- [x] Navigation ברור
- [x] Mobile responsive
- [x] Fast loading

## 🔗 קישורים חשובים

- [Amazon Associates Operating Agreement](https://affiliate-program.amazon.com/help/node/topic/G8TW5AE9XL2VX9VM)
- [Disclosure Requirements](https://affiliate-program.amazon.com/help/node/topic/G8TW5AE9XL2VX9VM)
- [Link Requirements](https://affiliate-program.amazon.com/help/node/topic/G8TW5AE9XL2VX9VM)

## 📝 הערות

האתר עומד בכל הדרישות הבסיסיות של Amazon Associates Program. 
לפני הגשת בקשה, ודא:
1. יש לך תוכן מספיק (לפחות 10-15 מוצרים)
2. כל המוצרים עם ASINs אמיתיים
3. התוכן מקורי ואיכותי
4. האתר עובד טוב על mobile
