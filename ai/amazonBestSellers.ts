// ai/amazonBestSellers.ts
// Guide to finding real products from Amazon Best Sellers
// Note: We cannot scrape Amazon directly, but we can guide users to Best Sellers pages

export const AMAZON_BEST_SELLERS_CATEGORIES = {
  "Kitchen & Dining": {
    url: "https://www.amazon.com/Best-Sellers-Kitchen-Dining/zgbs/kitchen",
    subcategories: [
      "Kitchen Storage & Organization",
      "Food Storage Containers",
      "Kitchen Tools & Gadgets",
      "Kitchen Utensils",
    ],
  },
  "Home & Kitchen": {
    url: "https://www.amazon.com/Best-Sellers-Home-Kitchen/zgbs/home-garden",
    subcategories: [
      "Home Storage & Organization",
      "Kitchen & Dining",
      "Home Décor",
    ],
  },
  "Home Improvement": {
    url: "https://www.amazon.com/Best-Sellers-Home-Improvement/zgbs/hi",
    subcategories: [
      "Storage & Organization",
      "Home Décor",
    ],
  },
};

export function getBestSellersUrls(): Array<{ category: string; url: string; description: string }> {
  return [
    {
      category: "Kitchen Organization",
      url: "https://www.amazon.com/Best-Sellers-Kitchen-Dining-Kitchen-Storage-Organization/zgbs/kitchen/289668",
      description: "Best selling kitchen storage and organization products",
    },
    {
      category: "Food Storage",
      url: "https://www.amazon.com/Best-Sellers-Kitchen-Dining-Food-Storage-Containers/zgbs/kitchen/289787",
      description: "Best selling food storage containers",
    },
    {
      category: "Home Storage",
      url: "https://www.amazon.com/Best-Sellers-Home-Kitchen-Home-Storage-Organization/zgbs/home-garden/1063306",
      description: "Best selling home storage products",
    },
  ];
}

/**
 * Generate instructions for finding real products from Amazon Best Sellers
 */
export function generateBestSellersInstructions(): string {
  const urls = getBestSellersUrls();
  
  let instructions = `
🎯 איך למצוא מוצרים אמיתיים מ-Amazon Best Sellers
==================================================

⚠️  חשוב: בלי PA-API, אין דרך אוטומטית לגשת למוצרים אמיתיים.
הדרך הטובה ביותר היא להשתמש ב-Amazon Best Sellers pages.

📋 Best Sellers Pages - מוצרים אמיתיים ופופולריים:

`;

  urls.forEach((item, index) => {
    instructions += `
${index + 1}. ${item.category}
   ${item.description}
   🔗 ${item.url}
`;
  });

  instructions += `

📝 תהליך:

1. פתח את הקישורים למעלה
2. עיין במוצרים הפופולריים
3. לחץ על מוצר שמעניין אותך
4. העתק את ה-ASIN מה-URL:
   https://www.amazon.com/dp/B08YZ5YF7M
                              ^^^^^^^^^^
                              זה ה-ASIN
5. בדוק שהמוצר אמיתי
6. הוסף ל-discoveryInput.json

💡 טיפ: Best Sellers הם מוצרים אמיתיים ופופולריים - זה המקום הטוב ביותר להתחיל!

`;

  return instructions;
}
