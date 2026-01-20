# 🚀 הוראות להפיכת המערכת לאוטומטית לחלוטין

## שלב 1: קבלת Amazon PA-API Credentials

### 1.1. הירשם ל-Amazon Associates (אם אין לך)

1. לך ל: https://affiliate-program.amazon.com/
2. לחץ על "Join Now for Free"
3. הירשם עם החשבון שלך
4. מלא את כל הפרטים (שם, כתובת, וכו')
5. **חשוב**: בחר "Website" כסוג האתר שלך
6. הכנס את כתובת האתר: `https://www.aipicks.co`
7. תאר את האתר: "Product review and recommendation site"
8. שלח את הבקשה

**⏱️ זמן המתנה**: 1-3 ימים לאישור

### 1.2. קבל PA-API Credentials

לאחר שאושרת כ-Associate:

1. לך ל: https://affiliate-program.amazon.com/home/account/tag/manage
2. צור **Associate Tag** (למשל: `aipicks-20`)
3. שמור את ה-Tag הזה - תצטרך אותו!

4. לך ל: https://webservices.amazon.com/paapi5/documentation/register-for-product-advertising-api.html
5. לחץ על "Start Now"
6. התחבר עם החשבון שלך
7. מלא את הטופס:
   - **Application Name**: AI Picks
   - **Application URL**: https://www.aipicks.co
   - **Application Description**: Product discovery and recommendation system
8. שלח את הבקשה

**⏱️ זמן המתנה**: 1-2 ימים לאישור

### 1.3. קבל את ה-Credentials

לאחר שאושרת:

1. לך ל: https://webservices.amazon.com/paapi5/scratchpad/index.html
2. התחבר
3. תראה את ה-Credentials שלך:
   - **Access Key ID**: `AKIA...`
   - **Secret Access Key**: `...` (לחץ על "Show" כדי לראות)
   - **Partner Tag**: `aipicks-20` (או מה שיצרת)

4. **שמור את כל השלושה!**

---

## שלב 2: הוספת Credentials ל-`.env.local`

1. פתח את הקובץ `.env.local` בפרויקט
2. הוסף את השורות הבאות:

```bash
# Amazon PA-API Credentials
AMAZON_PAAPI_ACCESS_KEY=AKIA... (ההעתק שלך)
AMAZON_PAAPI_SECRET_KEY=... (ההעתק שלך)
AMAZON_PAAPI_PARTNER_TAG=aipicks-20 (התג שלך)
AMAZON_PAAPI_REGION=us-east-1
```

3. שמור את הקובץ

---

## שלב 3: התקנת PA-API SDK

פתח טרמינל והרץ:

```bash
cd /Users/raniophir/AmazonMVP
npm install @amzn/paapi5-nodejs-sdk
```

---

## שלב 4: אשלב את PA-API ב-Discovery Agent

אני אעדכן את הקוד אוטומטית אחרי שתסיים את השלבים הקודמים.

---

## שלב 5: בדיקה

לאחר שתסיים את כל השלבים, הרץ:

```bash
npm run ai:discover
```

אם הכל עובד, תראה:
- ✅ מוצרים אמיתיים עם ASINs אמיתיים
- ✅ לינקים לאמזון שעובדים
- ✅ כל המידע נכון

---

## ⚠️ הערות חשובות

1. **זמן המתנה**: תהליך האישור לוקח 1-3 ימים
2. **Rate Limits**: PA-API מוגבל ל-1 request/second (בחינם)
3. **Testing**: אפשר לבדוק ב-Scratchpad לפני השימוש בקוד

---

## 📞 אם יש בעיות

אם נתקעת בשלב כלשהו, תגיד לי ואני אעזור!
