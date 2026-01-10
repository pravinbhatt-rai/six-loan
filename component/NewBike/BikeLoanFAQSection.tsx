'use client';
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "How much down payment is required for a new bike loan?",
    answer: "Most lenders offer funding up to 95% of the on-road price. However, eligible customers with a strong credit profile can also avail 'Zero Down Payment' schemes, meaning you can ride your bike home without paying anything upfront."
  },
  {
    question: "What is the minimum CIBIL score for a two-wheeler loan?",
    answer: "A CIBIL score of 700 or above is considered ideal for quick approval and lower interest rates. However, first-time borrowers (New to Credit) can also get approvals based on their income proof or by adding a co-applicant with a good score."
  },
  {
    question: "Does the loan cover vehicle insurance and registration costs?",
    answer: "Yes, 'On-Road Funding' covers the ex-showroom price, RTO registration charges, and mandatory insurance costs. Some lenders also include the cost of accessories and extended warranty in the loan amount."
  },
  {
    question: "Can I pre-close my bike loan before the tenure ends?",
    answer: "Yes, you can foreclose your loan usually after paying the first 6 EMIs. Foreclosure charges typically range between 2% to 5% of the outstanding principal amount, depending on the lender's policy."
  },
  {
    question: "What documents are needed for a bike loan?",
    answer: "For salaried/self-employed individuals, standard KYC (Aadhaar/PAN), bank statements (last 3-6 months), and income proof are required. Existing bank customers may get 'Pre-Approved' offers with zero documentation."
  }
];

export function BikeLoanFAQSection() {
  // State to track which index is currently open. 
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white flex items-start justify-center font-serif py-10 px-4">
      <div className="max-w-4xl w-full">
        {/* Header Section */}
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto leading-relaxed text-sm md:text-base">
            Get answers to common queries about interest rates, down payments, documentation, and foreclosure rules for your new two-wheeler.
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
                  className="w-full flex justify-between items-start py-5 md:py-6 text-left focus:outline-none group"
                  aria-expanded={isOpen}
                >
                  <span className="text-base md:text-lg font-bold text-gray-900 group-hover:text-teal-600 transition-colors pr-4 leading-snug">
                    {item.question}
                  </span>
                  <span className="ml-4 shrink-0 text-gray-900 group-hover:text-teal-600 mt-1">
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
                  <p className="text-gray-600 leading-relaxed pr-4 text-sm md:text-base">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default BikeLoanFAQSection;