"use client";
import React from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQItem[];
  title?: string;
}

export default function FAQSection({ faqs, title = "Frequently Asked Questions" }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 md:p-8">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
        {title}
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between px-5 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
              <svg
                className={`w-5 h-5 text-teal-600 shrink-0 transition-transform ${
                  openIndex === index ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openIndex === index && (
              <div className="px-5 py-4 bg-white border-t border-gray-200">
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
