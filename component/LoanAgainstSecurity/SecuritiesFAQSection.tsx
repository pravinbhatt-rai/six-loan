'use client';
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is a Loan Against Securities (LAS)?",
    answer: "LAS is a secured loan facility where you pledge your financial assets—such as Shares, Mutual Funds, Bonds, or Insurance policies—as collateral to get an instant overdraft limit. This allows you to meet liquidity needs without selling your long-term investments."
  },
  {
    question: "How is the loan amount (LTV) calculated?",
    answer: "The loan limit depends on the Loan-to-Value (LTV) ratio prescribed by the RBI. Typically, you can get up to 50% of the market value for Equity Shares and Equity Mutual Funds, and up to 80-85% for Debt Funds, Bonds, and Govt. Securities."
  },
  {
    question: "Will I continue to receive dividends on pledged shares?",
    answer: "Yes! Even though your securities are pledged, you retain ownership benefits. You will continue to receive all corporate benefits like dividends, bonuses, rights issues, and stock splits directly in your bank/demat account."
  },
  {
    question: "How is interest charged on this loan?",
    answer: "Unlike a personal loan where interest is charged on the full amount, LAS functions as an Overdraft. You are charged interest only on the amount you actually withdraw and for the number of days you use it, making it a highly cost-effective option."
  },
  {
    question: "What happens if the market value of my shares falls?",
    answer: "If the value of your pledged portfolio drops significantly, the lender may issue a 'Margin Call'. You will be asked to either pledge additional securities or pay the difference in cash to restore the required margin. If unmet, the lender may liquidate a portion of the shares."
  },
  {
    question: "Can I release or sell my pledged securities anytime?",
    answer: "Yes, you can un-pledge your securities anytime by repaying the utilized amount. Partial release is also possible if your current drawing power allows it. The process is usually digital and processed within 24 hours."
  }
];

export function SecuritiesFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white flex items-start justify-center font-sans py-8 md:py-12">
      <div className="max-w-6xl w-full px-5 md:px-10">
        
        {/* Header Section */}
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed text-base md:text-lg">
            Everything you need to know about unlocking value from your portfolio with <span className="text-teal-600 font-medium">Loan Against Securities</span>.
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
                  className="w-full flex justify-between items-center py-5 md:py-6 text-left focus:outline-none group"
                  aria-expanded={isOpen}
                >
                  <span className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-teal-600 transition-colors pr-4">
                    {item.question}
                  </span>
                  <span className={`ml-4 shrink-0 text-gray-400 group-hover:text-teal-600 transition-colors duration-300 ${isOpen ? 'rotate-180' : ''}`}>
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
                    isOpen ? 'max-h-60 opacity-100 pb-6' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-gray-600 leading-relaxed pr-4 text-base md:text-lg text-justify md:text-left">
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

export default SecuritiesFAQSection;