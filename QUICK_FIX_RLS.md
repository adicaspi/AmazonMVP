# 🚀 Quick Fix - RLS Policies

## הבעיה:
המוצרים לא מופיעים כי ה-RLS policies לא מוגדרים.

## הפתרון (2 דקות):

### שלב 1: לך ל-Supabase SQL Editor
🔗 **קישור ישיר:**
https://supabase.com/dashboard/project/uoydxjnbqbifcaigeexg/sql/new

### שלב 2: העתק והדבק את ה-SQL הזה:

```sql
-- Enable RLS on all tables
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE creatives ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid errors)
DROP POLICY IF EXISTS "Public read access" ON products;
DROP POLICY IF EXISTS "Public insert access" ON events;
DROP POLICY IF EXISTS "Public read access" ON events;
DROP POLICY IF EXISTS "Public read access" ON creatives;

-- Products: Allow public read access
CREATE POLICY "Public read access" ON products
  FOR SELECT USING (true);

-- Events: Allow public insert (for tracking)
CREATE POLICY "Public insert access" ON events
  FOR INSERT WITH CHECK (true);

-- Events: Allow public read access
CREATE POLICY "Public read access" ON events
  FOR SELECT USING (true);

-- Creatives: Allow public read access
CREATE POLICY "Public read access" ON creatives
  FOR SELECT USING (true);
```

### שלב 3: לחץ על "Run" (או Cmd+Enter)

### שלב 4: רענן את הדף
- Ctrl+Shift+R (Windows/Linux)
- Cmd+Shift+R (Mac)

---

## ✅ אחרי זה:
- המוצרים יופיעו בדף הראשי
- Analytics יעבוד
- הכל יעבוד!

---

**זה יקח 2 דקות!** 🚀
