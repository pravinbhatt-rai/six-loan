'use client';
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
    question: string;
    answer: string;
}

const faqData: FAQItem[] = [
    {
        question: "How is my home loan eligibility calculated?",
        answer: "Your home loan eligibility is primarily determined by your monthly income, age, credit score, and existing financial obligations. Our experts help you optimize these factors to secure the maximum loan amount possible."
    },
    {
        question: "What are the benefits of a home loan balance transfer?",
        answer: "A home loan balance transfer allows you to move your existing high-interest loan to another bank offering a lower interest rate. This helps reduce your monthly EMI and total interest outgo, potentially saving you lakhs over the loan tenure."
    },
    {
        question: "How long does the home loan approval process take?",
        answer: "With Six Loan, the digital Sanction Letter is often issued within 24 hours. The final disbursement typically takes 7-10 working days, depending on the speed of legal and technical property verification."
    },
    {
        question: "Can I get a top-up loan on my existing home loan?",
        answer: "Yes, if you have an existing home loan and a clean repayment track record, you can apply for a top-up loan. This is often the cheapest way to get funds for home renovation, weddings, or business expansion."
    },
    {
        question: "What documents are required for a home loan application?",
        answer: "Basic requirements include KYC (Aadhar/PAN), income proof (salary slips or ITR), bank statements for the last 6 months, and property-related documents like the allotment letter or sale deed."
    }
];

export function HomeFAQSection() {
    // State to track which index is currently open. 
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    // JSON-LD Schema for FAQ SEO
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
        <div className="bg-white flex items-start justify-center font-serif py-12 ">
            {/* SEO Script */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            
            <div className="max-w-6xl w-full px-6">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Home Loan FAQs
                    </h2>
                    <p className="text-gray-500 max-w-lg mx-auto leading-relaxed">
                        Find answers to common questions about <strong>home loan interest rates</strong>, 
                        eligibility criteria, and the <strong>balance transfer process</strong>.
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
                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-60 opacity-100 pb-6' : 'max-h-0 opacity-0'
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

export default HomeFAQSection;