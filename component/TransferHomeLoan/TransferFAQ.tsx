'use client';
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "When is the right time to transfer my home loan?",
    answer: "You should consider a balance transfer if your current interest rate is at least 0.50% higher than the market rate, or if your credit score has improved (750+) since you first took the loan. It is most beneficial in the early years of the tenure when the interest component is high."
  },
  {
    question: "Can I get a Top-Up loan along with the balance transfer?",
    answer: "Yes, most lenders (like HDFC, SBI, and ICICI) offer a 'Top-Up' facility on the transferred loan amount. You can use these extra funds for home renovation, personal needs, or debt consolidation at the same low home loan interest rate."
  },
  {
    question: "Does checking my eligibility affect my CIBIL score?",
    answer: "No. checking your transfer eligibility on our platform is a 'Soft Inquiry' and does not impact your credit score. However, once you submit a formal application to a bank, a 'Hard Inquiry' will be made."
  },
  {
    question: "Are there foreclosure charges for closing my old loan?",
    answer: "As per RBI guidelines, there are NIL foreclosure charges for individual borrowers on floating-rate home loans. However, if you have a fixed-rate loan or a business loan, a penalty of 2% to 4% might apply."
  },
  {
    question: "What documents are needed from my existing bank?",
    answer: "You strictly need two documents: 1) A Foreclosure Letter (stating the outstanding amount) and 2) A List of Documents (LOD) held by them. Without these, the new lender cannot process your transfer."
  },
  {
    question: "How long does the home loan transfer process take?",
    answer: "The entire process typically takes 7 to 15 days. This includes technical verification of the property and the coordination between the two banks to hand over the original property papers."
  }
];

export function TransferFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Generate FAQ Schema dynamically
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
    <section className="bg-white flex items-start justify-center font-sans py-12">
      {/* Inject Schema for Google Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-4xl w-full px-6">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-serif">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto leading-relaxed text-lg">
            Everything you need to know about <span className="text-teal-600 font-medium">Refinancing</span> your home loan.
          </p>
        </div>

        

        {/* FAQ List */}
        <div className="border-t border-gray-100">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={index} className="border-b border-gray-100">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-start md:items-center py-6 text-left focus:outline-none group bg-transparent"
                  aria-expanded={isOpen}
                >
                  <span className={`text-lg font-bold transition-colors duration-200 ${isOpen ? 'text-teal-600' : 'text-gray-800 group-hover:text-teal-600'}`}>
                    {item.question}
                  </span>
                  <span className="ml-6 shrink-0 text-teal-500 mt-1 md:mt-0">
                    {isOpen ? (
                      <ChevronUp className="w-6 h-6" />
                    ) : (
                      <ChevronDown className="w-6 h-6" />
                    )}
                  </span>
                </button>

                {/* Answer Section */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100 pb-6' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-gray-600 leading-relaxed text-base pr-4 md:pr-12">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default TransferFAQ;