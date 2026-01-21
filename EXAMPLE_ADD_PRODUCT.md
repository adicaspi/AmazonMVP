# 📝 דוגמה: איך להוסיף מוצר

## שלב 1: פתח את ai/discoveryInput.json

## שלב 2: הוסף מוצר חדש

**לפני:**
```json
[
  {
    "asin": "B01MRF46U5",
    "title": "mDesign Plastic Kitchen Drawer Organizer",
    ...
  }
]
```

**אחרי (הוספת מוצר חדש):**
```json
[
  {
    "asin": "B01MRF46U5",
    "title": "mDesign Plastic Kitchen Drawer Organizer",
    ...
  },
  {
    "asin": "B07C7D6H8F",
    "title": "New Product Name",
    "price": 24.99,
    "rating": 4.5,
    "reviews": 8500,
    "vertical": "home_kitchen",
    "baseAmazonUrl": "https://www.amazon.com/dp/B07C7D6H8F",
    "trackingId": "aipicks20-20",
    "mainProblem": "מה הבעיה שהמוצר פותר",
    "targetUser": "מי צריך את המוצר"
  }
]
```

## שלב 3: שמור את הקובץ

## שלב 4: הרץ
```bash
npm run import:discovery
```

**זה הכל!** המוצר יופיע באתר.
