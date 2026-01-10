'use client';
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
    question: string;
    answer: string;
}

const faqData: FAQItem[] = [
    {
        question: "When does the repayment of an education loan start?",
        answer: "Repayment typically starts after the 'Moratorium Period', which is the duration of your course plus a grace period of 6 to 12 months. This allows students to secure a job before their EMIs begin."
    },
    {
        question: "Can I get an education loan without collateral?",
        answer: "Yes, unsecured (non-collateral) loans are available for up to ₹75 Lakhs for premier institutes (like IITs, IIMs) and top-ranked international universities, depending on the student's academic profile."
    },
    {
        question: "What expenses are covered under an education loan?",
        answer: "Most lenders offer 100% financing that covers tuition fees, examination fees, library charges, travel expenses (for study abroad), accommodation, and cost of books/equipment."
    },
    {
        question: "Is a co-applicant mandatory for a student loan?",
        answer: "Yes, a co-applicant (usually a parent, guardian, or spouse) is mandatory for full-time courses. Lenders evaluate the co-applicant's credit score and income to determine the loan eligibility."
    },
    {
        question: "Are there tax benefits on education loans?",
        answer: "Absolutely. The interest paid on an education loan is eligible for a 100% tax deduction under Section 80E of the Income Tax Act of India for up to 8 years."
    }
];

export function EducationFAQSection() {
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
                        Get answers to common queries about study abroad funding, interest rates, moratorium periods, and repayment rules.
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
                                    <span className="text-base md:text-lg font-bold text-gray-900 group-hover:text-teal-600 transition-colors pr-4">
                                        {item.question}
                                    </span>
                                    <span className="ml-4 shrink-0 text-gray-900 group-hover:text-teal-600">
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

export default EducationFAQSection;