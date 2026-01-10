'use client';
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
    question: string;
    answer: string;
}

const faqData: FAQItem[] = [
    {
        question: "What is the maximum loan amount I can get against my property?",
        answer: "You can typically avail up to 60-75% of your property's market value, depending on the Loan-to-Value (LTV) ratio and your income eligibility. Our valuation experts ensure you get the best possible sanction."
    },
    {
        question: "Can I get a loan against both residential and commercial properties?",
        answer: "Yes, we offer Loan Against Property for self-occupied residential houses, commercial office spaces, and industrial plots. The property must be free from legal disputes."
    },
    {
        question: "How do interest rates for Loan Against Property compare to personal loans?",
        answer: "Since a Loan Against Property is a secured loan, the interest rates are significantly lower than unsecured personal loans, making it a cost-effective option for large funding requirements."
    },
    {
        question: "What documents are required for a property loan application?",
        answer: "Standard documents include ID proof, income proof (ITR/Salary slips), and property ownership papers (Title Deed, recent tax receipts). Additional documents may be needed based on the property type."
    },
    {
        question: "What is the repayment tenure for a Loan Against Property?",
        answer: "We offer flexible repayment tenures ranging from 5 to 15 years, allowing you to choose an EMI plan that fits your monthly budget comfortably."
    }
];

export function PropertyFAQSection() {
    // State to track which index is currently open. 
    // Set to 0 to have the first item open by default.
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="bg-white flex items-start justify-center font-serif">
            <div className="max-w-6xl w-full px-6">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Loan Against Property FAQs
                    </h2>
                    <p className="text-gray-500 max-w-lg mx-auto leading-relaxed">
                        Find answers about eligibility, interest rates, property valuation, 
                        and documentation for your secured loan application.
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

                                {/* Answer Section */}
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

export default PropertyFAQSection;