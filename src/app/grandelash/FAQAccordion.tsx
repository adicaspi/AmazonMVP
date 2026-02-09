"use client";

import { useState } from "react";

interface FAQItem {
  q: string;
  a: string;
}

export function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3 md:space-y-4">
      {items.map((faq, i) => (
        <div key={i} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between p-4 md:p-6 text-left"
          >
            <h3 className="font-bold text-base md:text-lg text-gray-900 pr-4">{faq.q}</h3>
            <svg
              className={`w-5 h-5 flex-shrink-0 text-gray-400 transition-transform duration-200 ${openIndex === i ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div
            className={`overflow-hidden transition-all duration-200 ${
              openIndex === i ? "max-h-96 pb-4 md:pb-6" : "max-h-0"
            }`}
          >
            <p className="text-sm md:text-base text-gray-600 px-4 md:px-6">{faq.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
