'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

const personalCards = [
    {
        bankName: 'HDFC Bank',
        category: 'Salaried Employees',
        tag: 'Instant Approval',
        logo: (
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="20" y="20" width="60" height="60" rx="4" fill="#14b8a6" />
                <path d="M20 50 H80" stroke="white" strokeWidth="8" />
                <path d="M50 20 V80" stroke="white" strokeWidth="8" />
            </svg>
        ),
        maxLoan: '₹40 Lakhs',
        interest: '10.50% Onwards',
        tenure: 'Up to 72 Mo',
        eligibility: 'Salaried > 25k', // Replaced Vintage
        fee: 'Start @ ₹1,999',
        feature: '10 Sec Disbursal',
    },
    {
        bankName: 'ICICI Bank',
        category: 'Prime Borrowers',
        tag: 'Pre-Approved',
        logo: (
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="35" stroke="#14b8a6" strokeWidth="8" />
                <path d="M50 25 V50 L70 65" stroke="#0d9488" strokeWidth="6" strokeLinecap="round" />
            </svg>
        ),
        maxLoan: '₹50 Lakhs',
        interest: '10.80% - 15.00%',
        tenure: 'Up to 60 Mo',
        eligibility: 'CIBIL > 750', // Replaced Vintage
        fee: '1.50% + GST',
        feature: 'No Physical Docs',
    },
    {
        bankName: 'Bajaj Finserv',
        category: 'Flexi Personal Loan',
        tag: 'Hybrid Flexi',
        logo: (
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 10 L90 90 H10 L50 10Z" fill="#14b8a6" />
                <circle cx="50" cy="60" r="15" fill="white" fillOpacity="0.4" />
            </svg>
        ),
        maxLoan: '₹35 Lakhs',
        interest: '11.00% Onwards',
        tenure: '84 Months',
        eligibility: 'Age 23-55 Yrs',
        fee: 'Variable',
        feature: 'Reduce EMI by 45%',
    },
];

const PersonalBankCard = () => {
    const router = useRouter();

    return (
        <div className="w-full max-w-6xl mx-auto p-4 md:p-6 font-sans">
            {/* Header with Teal Accents */}
            <div className="mb-8 md:mb-12">
                <div className="flex items-center gap-3 mb-2">
                    <div className="h-6 md:h-8 w-1.5 md:w-2 bg-teal-500"></div>
                    <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter uppercase">
                        Personal<span className="text-teal-500">Credit</span>
                    </h1>
                </div>
                <h2 className="text-lg md:text-xl font-bold text-slate-700 ml-4 md:ml-5">Instant Personal Financing</h2>
                <p className="text-slate-500 font-medium ml-4 md:ml-5 mt-1 text-xs md:text-sm tracking-wide">
                    Quick approvals for Salaried & Self-Employed individuals.
                </p>
            </div>

            {personalCards.map((card) => (
                <div key={card.bankName} className="bg-white rounded-2xl border-b-4 border-teal-500/30 border-x border-t border-slate-200 shadow-sm hover:shadow-xl transition-all mb-6 md:mb-8 overflow-hidden group">
                    {/* Upper Status Ribbon */}
                    <div className="bg-teal-50 px-4 md:px-6 py-2 flex justify-between items-center border-b border-teal-100">
                        <span className="text-[9px] md:text-[10px] font-black text-teal-700 uppercase tracking-[0.2em] md:tracking-[0.25em] truncate mr-2">
                            {card.tag}
                        </span>
                        <div className="flex items-center gap-2 whitespace-nowrap">
                            <span className="h-1.5 w-1.5 rounded-full bg-teal-500 shadow-[0_0_8px_rgba(20,184,166,0.8)]"></span>
                            <span className="text-[9px] md:text-[10px] text-teal-600 font-extrabold uppercase tracking-widest">
                                {card.feature}
                            </span>
                        </div>
                    </div>

                    <div className="p-6 md:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-8 md:gap-10">
                        {/* 1. Brand Identity */}
                        <div className="flex items-center gap-4 md:gap-6 min-w-full lg:min-w-[260px]">
                            <div className="w-14 h-14 md:w-16 md:h-16 bg-teal-500/10 rounded-2xl p-2.5 flex items-center justify-center border border-teal-500/20 group-hover:bg-teal-500 transition-colors duration-300 shrink-0">
                                <div className="group-hover:brightness-0 group-hover:invert transition-all w-full h-full">
                                    {card.logo}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight leading-none">{card.bankName}</h3>
                                <p className="text-[10px] md:text-[11px] font-bold text-teal-600 tracking-[0.1em] uppercase mt-1 md:mt-2">
                                    {card.category}
                                </p>
                            </div>
                        </div>

                        {/* 2. Financial Metrics Grid */}
                        <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4 md:gap-8 border-t md:border-t-0 border-slate-100 pt-6 md:pt-0">
                            <div>
                                <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1.5">Interest</p>
                                <p className="text-base md:text-lg font-bold text-slate-900 leading-none">{card.interest}</p>
                                <p className="text-[9px] md:text-[10px] text-teal-500 font-bold mt-1 tracking-tighter">Reducing Rate</p>
                            </div>

                            <div>
                                <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1.5">Max Amount</p>
                                <p className="text-base md:text-lg font-bold text-slate-900 leading-none">{card.maxLoan}</p>
                                <p className="text-[9px] md:text-[10px] text-slate-500 font-medium mt-1">Collateral Free</p>
                            </div>

                            <div className="md:border-l md:border-slate-100 md:pl-6">
                                <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1.5">Eligibility</p>
                                <p className="text-base md:text-lg font-bold text-slate-900 leading-none">{card.eligibility}</p>
                                <p className="text-[9px] md:text-[10px] text-slate-500 font-medium mt-1">Min Criteria</p>
                            </div>

                            <div>
                                <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1.5">Fees</p>
                                <p className="text-base md:text-lg font-bold text-slate-900 leading-none">{card.fee}</p>
                                <p className="text-[9px] md:text-[10px] text-teal-600 font-bold mt-1 uppercase">Process Chg.</p>
                            </div>
                        </div>

                        {/* 3. Action Block */}
                        <div className="flex flex-row lg:flex-col gap-3 w-full lg:w-44 mt-2 lg:mt-0">
                            <button
                                className="flex-[2] bg-teal-500 hover:bg-teal-600 text-white text-[10px] md:text-[11px] font-black uppercase tracking-[0.15em] py-3 md:py-4 rounded-xl transition-all shadow-[0_10px_20px_-10px_rgba(20,184,166,0.5)] active:scale-95"
                                onClick={() => router.push('/loanDetail')}
                            >
                                Apply Now
                            </button>
                            <button className="flex-1 bg-white hover:bg-slate-50 text-slate-700 text-[9px] md:text-[10px] font-black uppercase tracking-[0.15em] py-3 md:py-4 rounded-xl border-2 border-slate-200 transition-all">
                                Details
                            </button>
                        </div>
                    </div>

                    {/* Footer: Tech-Style Documentation bar */}
                    <div className="bg-slate-900 px-4 md:px-8 py-2.5 flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
                        <span className="text-[9px] font-black text-teal-400 uppercase tracking-widest hidden md:inline">Required Stack:</span>
                        <span className="text-[9px] font-black text-teal-400 uppercase tracking-widest md:hidden">Required Docs:</span>
                        
                        <div className="flex flex-wrap gap-x-4 gap-y-2">
                            {['3 Months Payslip', 'KYC Documents', '6M Bank Stmt'].map((doc) => (
                                <div key={doc} className="flex items-center gap-1.5">
                                    <div className="h-1 w-1 bg-teal-500 rounded-full"></div>
                                    <span className="text-[8px] md:text-[9px] font-bold text-slate-300 uppercase">{doc}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}

            {/* --- SHOW MORE OFFERS BUTTON --- */}
            <div className="flex justify-center mt-8 md:mt-12 pb-8">
                <button className="group relative flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-white border-2 border-slate-200 hover:border-teal-500 rounded-full transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1">
                    <span className="text-[10px] md:text-[11px] font-black text-slate-600 group-hover:text-teal-600 uppercase tracking-[0.2em]">
                        View All Lenders
                    </span>
                    <div className="bg-slate-100 group-hover:bg-teal-50 rounded-full p-1 transition-colors">
                        <svg 
                            className="w-3 h-3 md:w-4 md:h-4 text-slate-400 group-hover:text-teal-500 transition-colors" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </button>
            </div>

        </div>
    );
};

export default PersonalBankCard;