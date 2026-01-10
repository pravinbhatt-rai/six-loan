'use client';
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "How much funding can I get for a new car?",
    answer: "We offer up to 100% on-road funding for eligible customers. This covers the ex-showroom price, car insurance, and RTO registration charges, ensuring you don't have to pay a hefty down payment upfront."
  },
  {
    question: "What is the maximum tenure for a new car loan?",
    answer: "You can choose a flexible repayment tenure ranging from 12 months (1 year) to 84 months (7 years). A longer tenure reduces your monthly EMI, while a shorter tenure helps you save on total interest payout."
  },
  {
    question: "Are car loan interest rates fixed or floating?",
    answer: "Most new car loans come with a Fixed Interest Rate. This means your EMI amount remains constant throughout the loan tenure, protecting you from market fluctuations and making monthly budgeting easier."
  },
  {
    question: "Can I foreclose or prepay my car loan early?",
    answer: "Yes, you can foreclose your loan after a lock-in period (usually 6 months). Foreclosure charges typically range between 3% to 5% of the outstanding principal amount, depending on the bank's policy."
  },
  {
    question: "What is the minimum CIBIL score required for a car loan?",
    answer: "A CIBIL score of 720 or above is recommended for instant approval and the lowest interest rates. However, applicants with scores between 650-700 can still get funded, though at slightly higher interest rates."
  },
  {
    question: "Is a hypothecation removal required after closing the loan?",
    answer: "Yes. Once you repay the loan in full, the bank issues a No Objection Certificate (NOC). You must submit this to the RTO to remove the bank's hypothecation from your RC (Registration Certificate) to become the full legal owner."
  }
];

export function CarLoanFAQSection() {
  // State to track which index is currently open. 
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // SEO: JSON-LD Structure for Google FAQ Snippets
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <section className="bg-white flex items-start justify-center font-serif py-8 md:py-16 px-4">
      {/* Inject Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-4xl w-full">
        {/* Header Section */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto leading-relaxed text-sm md:text-base px-2">
            Get clarity on down payments, <span className="text-teal-600 font-medium">on-road funding</span>, foreclosure charges, and RTO processes for your new vehicle.
          </p>
        </div>

        {/* FAQ List */}
        <div className="border-t border-gray-200">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={index} className="border-b border-gray-200">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-start md:items-center py-5 md:py-6 text-left focus:outline-none group"
                  aria-expanded={isOpen}
                >
                  <span className={`text-base md:text-lg font-bold transition-colors pr-4 leading-snug ${isOpen ? 'text-teal-600' : 'text-gray-900 group-hover:text-teal-600'}`}>
                    {item.question}
                  </span>
                  <span className="ml-4 shrink-0 mt-1 md:mt-0 text-gray-400 group-hover:text-teal-500 transition-colors">
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 md:w-6 md:h-6" />
                    ) : (
                      <ChevronDown className="w-5 h-5 md:w-6 md:h-6" />
                    )}
                  </span>
                </button>

                {/* Answer Section */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-gray-600 leading-relaxed pr-4 text-sm md:text-base font-sans">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default CarLoanFAQSection;