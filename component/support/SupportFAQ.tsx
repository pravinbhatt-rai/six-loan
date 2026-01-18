'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, FileText, CreditCard, Banknote, ShieldAlert } from 'lucide-react';

// Mock Data for FAQs
const faqData = [
  {
    category: "Personal Loan",
    question: "What is the minimum salary required for a personal loan?",
    answer: "Generally, a minimum monthly salary of ₹15,000 is required. However, this varies by lender and the city you reside in."
  },
  {
    category: "Personal Loan",
    question: "How long does it take for the loan amount to be disbursed?",
    answer: "Once your documents are verified and the agreement is signed, the amount is usually credited to your bank account within 24 to 48 hours."
  },
  {
    category: "Credit Score",
    question: "Will checking my credit score frequently lower it?",
    answer: "No. Checking your own credit score is considered a 'soft inquiry' and does not impact your score. Only hard inquiries from lenders affect it."
  },
  {
    category: "Credit Score",
    question: "How can I improve my CIBIL score quickly?",
    answer: "Pay your credit card bills on time, keep your credit utilization ratio under 30%, and avoid applying for multiple loans in a short span."
  },
  {
    category: "Credit Cards",
    question: "What are the annual charges for a premium credit card?",
    answer: "Annual fees vary from ₹500 to ₹10,000 depending on the card benefits. Many cards offer a waiver if you spend above a certain limit annually."
  },
  {
    category: "Security",
    question: "Is it safe to share my bank details on your platform?",
    answer: "Yes. We use 256-bit SSL encryption and do not share your sensitive data with third parties without your explicit consent."
  }
];

export default function SupportFAQ() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Filter logic
  const filteredFaqs = faqData.filter(item => 
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    // Responsive negative margin: -mt-6 on mobile, -mt-10 on desktop
    <div className="w-full max-w-4xl mx-auto -mt-6 md:-mt-10 relative z-20 px-4 mb-12">
      
      {/* Search Bar */}
      {/* Reduced padding on mobile (p-4) vs desktop (p-6) */}
      <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg border border-gray-100 mb-8">
        <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input 
                type="text" 
                placeholder="Search for topics (e.g., 'CIBIL', 'Interest Rate')"
                // Mobile Optimization: text-base prevents auto-zoom on iOS
                className="w-full pl-12 pr-4 py-3 md:py-4 rounded-lg bg-gray-50 border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition-all font-serif text-base md:text-lg text-gray-700"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
      </div>

      {/* Category Pills */}
      {/* Tighter gap on mobile (gap-2) */}
      <div className="flex flex-wrap gap-2 md:gap-4 justify-center mb-8 md:mb-12 font-serif">
        {[
            { label: "Personal Loans", icon: <Banknote size={16} /> },
            { label: "Credit Cards", icon: <CreditCard size={16} /> },
            { label: "CIBIL Score", icon: <FileText size={16} /> },
            { label: "Security", icon: <ShieldAlert size={16} /> },
        ].map((cat, idx) => (
            <button key={idx} className="flex items-center gap-2 px-4 md:px-6 py-2 bg-white border border-gray-200 rounded-full hover:border-teal-500 hover:text-teal-600 transition-all shadow-sm text-sm md:text-base">
                {cat.icon} {cat.label}
            </button>
        ))}
      </div>

      {/* FAQ List */}
      <div className="space-y-3 md:space-y-4">
        {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <button 
                    onClick={() => toggleAccordion(index)}
                    // Responsive padding: px-4 on mobile, px-6 on desktop
                    className="w-full px-4 py-4 md:px-6 md:py-5 flex items-start md:items-center justify-between bg-white hover:bg-gray-50 transition-colors text-left gap-4"
                >
                    <div className="flex-1">
                        <span className="text-[10px] md:text-xs font-bold text-teal-600 uppercase tracking-wider mb-1 block font-serif">{faq.category}</span>
                        {/* Responsive title size */}
                        <span className="text-base md:text-lg font-bold text-gray-900 font-serif leading-snug">{faq.question}</span>
                    </div>
                    {/* Icon wrapper to prevent shrinking */}
                    <div className="mt-1 md:mt-0 shrink-0">
                         {openIndex === index ? <ChevronUp className="text-teal-500" size={20} /> : <ChevronDown className="text-gray-400" size={20} />}
                    </div>
                </button>
                
                {/* Accordion Logic: Increased max-height to 500px to fit wrapped text on mobile */}
                <div 
                    className={`px-4 md:px-6 overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-[500px] py-4 md:py-5 opacity-100' : 'max-h-0 py-0 opacity-0'}`}
                >
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed font-serif border-t border-gray-100 pt-4">
                        {faq.answer}
                    </p>
                </div>
            </div>
            ))
        ) : (
            <div className="text-center py-10 text-gray-500 font-serif text-lg">
                No results found for "{searchTerm}".
            </div>
        )}
      </div>
    </div>
  );
}