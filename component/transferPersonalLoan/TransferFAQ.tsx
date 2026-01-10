'use client';
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FAQItem {
    question: string;
    answer: string;
}

const faqData: FAQItem[] = [
    {
        question: "Will a balance transfer affect my credit score?",
        answer: "When you transfer a loan, the old account is closed and a new one is opened. While this may cause a temporary minor dip due to a hard inquiry, a consistent repayment track on the new, lower-interest loan will improve your credit score significantly over time."
    },
    {
        question: "Do I need to inform my current bank about the transfer?",
        answer: "Yes, you will need to request a 'Foreclosure Letter' and 'Statement of Account' (SOA) from your current bank. Once your new lender approves the transfer, they will typically issue a cheque or electronic transfer to pay off your outstanding balance at the old bank."
    },
    {
        question: "Can I get extra funds during a balance transfer?",
        answer: "Absolutely. Most lenders offer a 'Top-up Loan' facility during a balance transfer. This allows you to borrow additional money at the same low interest rate as the transferred balance, without needing separate documentation."
    },
    {
        question: "Are there any hidden charges in the transfer process?",
        answer: "The primary costs are the foreclosure charges from your current bank (if any) and the processing fee from the new lender. We recommend ensuring that your total interest savings are at least double these combined costs to make the transfer profitable."
    },
    {
        question: "How long does the entire transfer process take?",
        answer: "With our digital-first process, it typically takes 3–5 working days. This includes the time for verifying your current loan documents and the final disbursement to your previous lender."
    },
    {
        question: "Can I transfer a loan if I have missed previous EMIs?",
        answer: "Lenders generally require a clean repayment track for the last 6–12 months. If you have multiple defaults or delays in your current loan, it may be difficult to secure a balance transfer until your repayment history stabilizes."
    }
];

export function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFAQ = (index: number) => {
      setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="bg-white flex items-start justify-center py-12">
            <div className="max-w-3xl w-full px-6">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="flex justify-center mb-4">
                        <div className="p-3 bg-teal-50 rounded-full">
                            <HelpCircle className="w-8 h-8 text-teal-600" />
                        </div>
                    </div>
                    <h2 className="text-4xl font-bold text-gray-900 mb-4 font-serif">
                        Balance Transfer FAQs
                    </h2>
                    <p className="text-gray-500 max-w-lg mx-auto leading-relaxed">
                        Clear your doubts about switching lenders, saving on interest, and the technicalities of loan refinancing.
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
                                    className="w-full flex justify-between items-center py-6 text-left focus:outline-none group"
                                    aria-expanded={isOpen}
                                >
                                    <span className={`text-lg font-bold transition-colors ${isOpen ? 'text-teal-600' : 'text-gray-900 group-hover:text-teal-500'}`}>
                                        {item.question}
                                    </span>
                                    <span className={`ml-6 shrink-0 transition-transform duration-300 ${isOpen ? 'text-teal-600 rotate-180' : 'text-gray-400'}`}>
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
                                        isOpen ? 'max-h-60 opacity-100 pb-6' : 'max-h-0 opacity-0'
                                    }`}
                                >
                                    <p className="text-gray-600 leading-relaxed pr-8 border-l-2 border-teal-500 pl-4 ml-1">
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

export default FAQSection;