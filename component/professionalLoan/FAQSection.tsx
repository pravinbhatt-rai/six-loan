'use client';
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, GraduationCap } from 'lucide-react';

interface FAQItem {
    question: string;
    answer: string;
}

const professionalFaqData: FAQItem[] = [
    {
        question: "Who is eligible for a Professional Loan?",
        answer: "Professional loans are specifically designed for practicing Doctors (MBBS/MD/MS), Chartered Accountants (CA), Company Secretaries (CS), and Architects. Eligibility is based on your professional degree, valid practice certificate, and a minimum work experience/practice vintage of 2-3 years."
    },
    {
        question: "Can I use the loan for clinic or office expansion?",
        answer: "Yes, these are multi-purpose loans. You can use the funds for clinic renovation, purchasing high-end medical equipment, office automation, scaling your consultancy, or even for personal requirements like debt consolidation or travel."
    },
    {
        question: "Are there any collateral requirements for Professionals?",
        answer: "Professional loans are generally unsecured (collateral-free) up to ₹75 Lakhs, depending on your specialization and annual receipts. For higher amounts, such as for purchasing commercial premises or expensive diagnostic machinery, secured options are available."
    },
    {
        question: "What documents are required to prove professional practice?",
        answer: "You will need your Professional Degree certificate, Certificate of Practice (COP), last 6-12 months' bank statements, and ITR filings for the last 2 years. Doctors may also need to provide their registration with the Medical Council."
    },
    {
        question: "How do interest rates differ from standard business loans?",
        answer: "Because professionals are considered 'low-risk' borrowers, interest rates are typically more competitive than standard business loans. Rates are determined by your CIBIL score, years of practice, and your existing relationship with the lending institution."
    }
];

export function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="bg-white flex items-start justify-center font-serif py-12 ">
            <div className="max-w-6xl w-full px-6 bg-white shadow-sm rounded-2xl py-12 ">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center p-3 bg-indigo-50 rounded-full mb-4">
                        <GraduationCap className="w-8 h-8 text-teal-500" />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">
                        Professional Loan FAQs
                    </h2>
                    <p className="text-slate-500 max-w-lg mx-auto leading-relaxed">
                        Tailored financial solutions for Doctors, CAs, and Consultants. 
                        Get clarity on eligibility, documentation, and funding timelines.
                    </p>
                </div>

                {/* FAQ List */}
                <div className="space-y-2">
                    {professionalFaqData.map((item, index) => {
                        const isOpen = openIndex === index;

                        return (
                            <div 
                                key={index} 
                                className={`transition-all duration-200 rounded-xl border ${
                                    isOpen ? 'border-teal-100 bg-teal-50/30' : 'border-transparent hover:bg-slate-50'
                                }`}
                            >
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full flex justify-between items-center py-5 px-6 text-left focus:outline-none group"
                                    aria-expanded={isOpen}
                                >
                                    <span className={`text-lg font-semibold transition-colors ${
                                        isOpen ? 'text-teal-700' : 'text-slate-800'
                                    }`}>
                                        {item.question}
                                    </span>
                                    <span className="ml-6 shrink-0">
                                        {isOpen ? (
                                            <ChevronUp className="w-5 h-5 text-teal-600" />
                                        ) : (
                                            <ChevronDown className="w-5 h-5 text-slate-400" />
                                        )}
                                    </span>
                                </button>

                                {/* Answer Section */}
                                <div
                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                        isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                                >
                                    <div className="px-6 pb-6">
                                        <p className="text-slate-600 leading-relaxed border-l-2 border-indigo-200 pl-4">
                                            {item.answer}
                                        </p>
                                    </div>
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