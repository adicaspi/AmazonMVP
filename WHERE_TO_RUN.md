# 📍 איפה להריץ את הפקודות?

## מיקום הפרויקט

הפרויקט שלך נמצא ב:
```
/Users/raniophir/AmazonMVP
```

## איך להריץ את הפקודות?

### אופציה 1: טרמינל ב-VS Code / Cursor

1. **פתח את Cursor** (או VS Code)
2. **פתח את הפרויקט** - `/Users/raniophir/AmazonMVP`
3. **פתח טרמינל**:
   - לחץ על `Terminal` בתפריט העליון
   - או לחץ `Ctrl + ~` (Windows/Linux) או `Cmd + ~` (Mac)
4. **ודא שאתה בתיקיית הפרויקט**:
   ```bash
   pwd
   ```
   צריך להציג: `/Users/raniophir/AmazonMVP`
5. **הרץ את הפקודה**:
   ```bash
   npm run scan:products
   ```

---

### אופציה 2: טרמינל רגיל (Terminal.app)

1. **פתח את Terminal** (Terminal.app ב-Mac)
2. **נווט לתיקיית הפרויקט**:
   ```bash
   cd /Users/raniophir/AmazonMVP
   ```
3. **ודא שאתה במקום הנכון**:
   ```bash
   pwd
   ```
4. **הרץ את הפקודה**:
   ```bash
   npm run scan:products
   ```

---

## איך לדעת שאתה במקום הנכון?

כשאתה מריץ `pwd`, אתה צריך לראות:
```
/Users/raniophir/AmazonMVP
```

אם אתה רואה משהו אחר, תעשה:
```bash
cd /Users/raniophir/AmazonMVP
```

---

## דוגמה - איך זה נראה:

```bash
$ cd /Users/raniophir/AmazonMVP
$ pwd
/Users/raniophir/AmazonMVP

$ npm run scan:products
> amazon-affiliate-mvp@0.1.0 scan:products
> tsx ai/runProductScanner.ts

🤖 Amazon Product Scanner & Recommender
========================================
...
```

---

## טיפים

✅ **תמיד ודא שאתה בתיקיית הפרויקט** לפני הרצת פקודות  
✅ **אם יש שגיאה** - בדוק שאתה בתיקייה הנכונה  
✅ **ב-Cursor/VS Code** - הטרמינל נפתח אוטומטית בתיקיית הפרויקט  

---

## אם יש בעיה

אם אתה מקבל שגיאה כמו:
```
npm: command not found
```

זה אומר ש-npm לא מותקן. תצטרך להתקין Node.js.

אם אתה מקבל:
```
Cannot find module
```

זה אומר שאתה לא בתיקיית הפרויקט. תעשה:
```bash
cd /Users/raniophir/AmazonMVP
```
