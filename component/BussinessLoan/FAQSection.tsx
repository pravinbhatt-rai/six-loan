'use client';
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
    question: string;
    answer: string;
}

const businessFaqData: FAQItem[] = [
    {
        question: "What is the minimum business vintage required for a loan?",
        answer: "Most of our lending partners require a minimum business vintage of 2 to 3 years. However, we also have specialized startup funding programs for businesses that have been operational for at least 1 year with strong revenue growth."
    },
    {
        question: "Do I need to provide collateral for a business loan?",
        answer: "We offer both secured and unsecured business loans. Unsecured loans (collateral-free) are available up to ₹50 Lakhs based on your business turnover and GST returns. Larger amounts may require machinery, property, or liquid assets as security."
    },
    {
        question: "How is my business loan eligibility calculated?",
        answer: "Eligibility is primarily determined by your annual business turnover, net profit (as per audited financials), business credit score (CIBIL MSME Rank), and your repayment history of existing commercial or personal credits."
    },
    {
        question: "Can I get a loan if my business is not GST registered?",
        answer: "While GST registration is preferred and helps in securing lower interest rates, we do have lending partners who provide loans to small businesses based on 12 months of bank statements and alternative income proofs."
    },
    {
        question: "How long does the disbursal process take for commercial loans?",
        answer: "For unsecured business loans, approval can happen within 24 hours, and disbursal typically takes 3-5 working days. Secured loans involving property valuation may take 10-15 working days."
    }
];

export function FAQSection() {
    // Set to 0 to have the first item open by default
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="bg-white flex items-start justify-center font-serif py-12">
            <div className="max-w-3xl w-full px-6">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Business Loan FAQs
                    </h2>
                    <p className="text-gray-500 max-w-lg mx-auto leading-relaxed">
                        Find answers to common questions regarding commercial credit lines, 
                        eligibility criteria, and the funding process for your enterprise.
                    </p>
                </div>

                {/* FAQ List */}
                <div className="border-t border-gray-200">
                    {businessFaqData.map((item, index) => {
                        const isOpen = openIndex === index;

                        return (
                            <div key={index} className="border-b border-gray-200">
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full flex justify-between items-center py-6 text-left focus:outline-none group"
                                    aria-expanded={isOpen}
                                >
                                    <span className="text-lg font-bold text-gray-900 group-hover:text-teal-600 transition-colors">
                                        {item.question}
                                    </span>
                                    <span className="ml-6 shrink-0 text-gray-900">
                                        {isOpen ? (
                                            <ChevronUp className="w-5 h-5 text-teal-600" />
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