'use client';
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
    question: string;
    answer: string;
}

const faqData: FAQItem[] = [
    {
        question: "How do I check my credit score?",
        answer: "Once you sign up, you can view your credit score instantly from your dashboard—completely free."
    },
    {
        question: "What loan options are available?",
        answer: "We offer a variety of loan options tailored to your needs, including personal loans, business loans, and debt consolidation plans. Each option comes with competitive rates and flexible terms."
    },
    {
        question: "How long does it take to get approved for a loan?",
        answer: "Approval times vary depending on the loan type and completeness of your application, but most users receive a decision within 24-48 hours."
    },
    {
        question: "Will checking my credit score affect my credit rating?",
        answer: "No, checking your own credit score through our platform is considered a soft inquiry and does not affect your credit rating or score in any way."
    },
    {
        question: "What are the repayment terms?",
        answer: "Repayment terms are flexible and depend on the loan amount and your financial situation. Typically, terms range from 12 to 60 months."
    }
];



export function FAQSection() {
    // State to track which index is currently open. 
    // Set to 0 to have the first item open by default (matching the screenshot), 
    // or set to null to start with all closed.
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFAQ = (index: number) => {
        // If the clicked index is already open, close it (set to null).
        // Otherwise, open the clicked index.
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="bg-white flex items-start justify-center font-serif">
            <div className="max-w-6xl w-full px-6">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-gray-500 max-w-lg mx-auto leading-relaxed">
                        Common questions about credit score checks, loan applications, repayment terms,
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
                                    <span className="text-lg font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
                                        {item.question}
                                    </span>
                                    <span className="ml-6 shrink-0 text-gray-900">
                                        {isOpen ? (
                                            <ChevronUp className="w-5 h-5" />
                                        ) : (
                                            <ChevronDown className="w-5 h-5" />
                                        )}
                                    </span>
                                </button>

                                {/* Answer Section with simple transition logic */}
                                <div
                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-40 opacity-100 pb-6' : 'max-h-0 opacity-0'
                                        }`}
                                >
                                    <p className="text-gray-500 leading-relaxed pr-8">
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