'use client';
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

// --- SEO Optimized Content for Used Bike Loans ---
const faqData: FAQItem[] = [
  {
    question: "What is the interest rate for a used bike loan?",
    answer: "Interest rates for used bike loans typically start from 10.99% p.a. and can vary based on your credit score, the age of the two-wheeler, and the loan amount. We compare offers from multiple banks to get you the lowest possible rate."
  },
  {
    question: "How much of the bike's value can I get as a loan?",
    answer: "You can get up to 100% funding on the bike's market valuation price, depending on your eligibility and the vehicle's condition. For premium superbikes, LTV (Loan-to-Value) ratios may vary slightly."
  },
  {
    question: "Can I get a loan to buy a bike from a private seller?",
    answer: "Yes, we provide loans for purchasing pre-owned bikes from both dealerships and private sellers (friends, family, or online listings). We also assist with the RC transfer process."
  },
  {
    question: "Is there an age limit for the used bike?",
    answer: "Generally, the bike should not be more than 7-10 years old at the time of loan maturity. However, some lenders offer flexibility for specific premium motorcycle models."
  },
  {
    question: "What documents are required for a second-hand bike loan?",
    answer: "Standard KYC documents (PAN/Aadhaar), income proof (Bank statements/Salary Slips), and vehicle documents (Copy of RC, Insurance, and Valuation Report) are required for processing the loan."
  },
  {
    question: "How long does the loan approval take?",
    answer: "With our digital-first process, approval is instant for pre-approved offers. For other cases, loan sanction typically takes 24-48 hours after document submission and vehicle valuation."
  }
];

export function UsedBikeFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white flex items-start justify-center font-serif py-8 md:py-12">
      <div className="max-w-4xl w-full px-4 md:px-6">
        
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto leading-relaxed text-sm md:text-base">
            Everything you need to know about financing your pre-owned two-wheeler, interest rates, and ownership transfer.
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
                  className="w-full flex justify-between items-center py-4 md:py-6 text-left focus:outline-none group"
                  aria-expanded={isOpen}
                >
                  <span className={`text-base md:text-lg font-bold transition-colors pr-4 ${isOpen ? 'text-teal-600' : 'text-gray-900 group-hover:text-gray-700'}`}>
                    {item.question}
                  </span>
                  <span className="shrink-0 text-gray-500">
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </span>
                </button>

                {/* Answer Section */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-60 opacity-100 pb-4 md:pb-6' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base pr-2 md:pr-8 text-justify md:text-left">
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

export default UsedBikeFAQSection;