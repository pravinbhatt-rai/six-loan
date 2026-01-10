'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown, ExternalLink } from 'lucide-react';

const carLoanCards = [
    {
        bankName: 'HDFC Bank',
        category: 'Certified Pre-Owned',
        tag: '100% On-Road Funding',
        logo: (
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 50 L30 20 H70 L90 50 V80 H10 V50 Z" stroke="#14b8a6" strokeWidth="6" fill="none"/>
                <circle cx="25" cy="80" r="10" fill="#14b8a6"/>
                <circle cx="75" cy="80" r="10" fill="#14b8a6"/>
            </svg>
        ),
        maxLoan: '₹50 Lakhs',
        interest: '11.25% - 13.50%',
        tenure: 'Up to 84 Months',
        ltv: '100% of Value',
        fee: '0.50% + GST',
        feature: 'Instant Approval',
    },
    {
        bankName: 'Axis Bank',
        category: 'Private Seller / Direct',
        tag: 'Quick RC Transfer',
        logo: (
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="20" y="30" width="60" height="40" rx="4" stroke="#14b8a6" strokeWidth="6" />
                <path d="M50 30 V70 M20 50 H80" stroke="#0d9488" strokeWidth="4" strokeLinecap="round"/>
            </svg>
        ),
        maxLoan: '₹25 Lakhs',
        interest: '12.00% Onwards',
        tenure: 'Up to 60 Months',
        ltv: '85% of Valuation',
        fee: 'Flat ₹3,999',
        feature: 'Doorstep Service',
    },
];

const UsedCarBankCard = () => {
    const router = useRouter();

    return (
        <div className="w-full max-w-6xl mx-auto p-4 md:p-6 font-sans">
            {/* Header with Teal Accents */}
            <div className="mb-12">
                <div className="flex items-center gap-3 mb-2">
                    <div className="h-8 w-2 bg-teal-500"></div>
                    <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter uppercase">
                        Drive<span className="text-teal-500">Smart</span>
                    </h1>
                </div>
                <h2 className="text-xl font-bold text-slate-700 ml-5">Pre-Owned Car Financing</h2>
                <div className="ml-5 mt-2 max-w-2xl">
                    <p className="text-slate-500 font-medium text-sm tracking-wide mb-4">
                        Get up to 100% financing on the car's valuation. Compare offers for Hatchbacks, SUVs, and Luxury Sedans.
                    </p>
                    
                    {/* Visual Aid for Loan Process */}
                    <div className="hidden md:block my-6">
                        
                    </div>
                </div>
            </div>

            {/* Cards Mapping */}
            {carLoanCards.map((card) => (
                <div key={card.bankName} className="bg-white rounded-2xl border-b-4 border-teal-500/30 border-x border-t border-slate-200 shadow-sm hover:shadow-xl transition-all mb-8 overflow-hidden group">
                    {/* Upper Status Ribbon */}
                    <div className="bg-teal-50 px-6 py-2 flex justify-between items-center border-b border-teal-100">
                        <span className="text-[10px] font-black text-teal-700 uppercase tracking-[0.25em]">{card.tag}</span>
                        <div className="flex items-center gap-2">
                             <span className="h-1.5 w-1.5 rounded-full bg-teal-500 shadow-[0_0_8px_rgba(20,184,166,0.8)]"></span>
                             <span className="text-[10px] text-teal-600 font-extrabold uppercase tracking-widest">{card.feature}</span>
                        </div>
                    </div>

                    <div className="p-6 md:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
                        {/* 1. Brand Identity */}
                        <div className="flex items-center gap-6 min-w-[260px]">
                            <div className="w-16 h-16 bg-teal-500/10 rounded-2xl p-2.5 flex items-center justify-center border border-teal-500/20 group-hover:bg-teal-500 transition-colors duration-300">
                                <div className="group-hover:brightness-0 group-hover:invert transition-all">
                                    {card.logo}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-none">{card.bankName}</h3>
                                <p className="text-[11px] font-bold text-teal-600 tracking-[0.1em] uppercase mt-2">{card.category}</p>
                            </div>
                        </div>

                        {/* 2. Financial Metrics Grid */}
                        <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1.5">Interest Rate</p>
                                <p className="text-lg font-bold text-slate-900 leading-none">{card.interest}</p>
                                <p className="text-[10px] text-teal-500 font-bold mt-1 tracking-tighter">Reducing Balance</p>
                            </div>

                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1.5">Max Amount</p>
                                <p className="text-lg font-bold text-slate-900 leading-none">{card.maxLoan}</p>
                                <p className="text-[10px] text-slate-500 font-medium mt-1">Based on Valuation</p>
                            </div>

                            <div className="hidden md:block border-l border-slate-100 pl-6">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1.5">Funding (LTV)</p>
                                <p className="text-lg font-bold text-slate-900 leading-none">{card.ltv}</p>
                                <p className="text-[10px] text-slate-500 font-medium mt-1">On-Road Price</p>
                            </div>

                            <div className="hidden md:block">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1.5">Processing Fee</p>
                                <p className="text-lg font-bold text-slate-900 leading-none">{card.fee}</p>
                                <p className="text-[10px] text-teal-600 font-bold mt-1 uppercase">Limited Period</p>
                            </div>
                        </div>

                        {/* 3. Action Block */}
                        <div className="flex flex-row lg:flex-col gap-3 w-full lg:w-44">
                            <button 
                                className="flex-[2] bg-teal-500 hover:bg-teal-600 text-white text-[11px] font-black uppercase tracking-[0.15em] py-4 rounded-xl transition-all shadow-[0_10px_20px_-10px_rgba(20,184,166,0.5)] active:scale-95"
                                onClick={() => router.push('/loanDetail')}
                            >
                                Check Eligibility
                            </button>
                            <button className="flex-1 bg-white hover:bg-slate-50 text-slate-700 text-[10px] font-black uppercase tracking-[0.15em] py-4 rounded-xl border-2 border-slate-200 transition-all flex items-center justify-center gap-1">
                                View Terms
                            </button>
                        </div>
                    </div>

                    {/* Footer: Tech-Style Documentation bar */}
                    <div className="bg-slate-900 px-6 md:px-8 py-2.5 flex flex-wrap items-center gap-4 md:gap-6">
                        <span className="text-[9px] font-black text-teal-400 uppercase tracking-widest shrink-0">Required Docs:</span>
                        <div className="flex flex-wrap gap-4">
                            {['RC Copy', 'Car Valuation Report', 'Insurance', 'KYC & Income'].map((doc) => (
                                <div key={doc} className="flex items-center gap-1.5">
                                    <div className="h-1 w-1 bg-teal-500 rounded-full"></div>
                                    <span className="text-[9px] font-bold text-slate-300 uppercase">{doc}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}

            {/* --- NEW: Show More Offers Button --- */}
            <div className="mt-12 mb-8 flex justify-center">
                <button className="group flex items-center gap-3 bg-white hover:bg-teal-50 border-2 border-slate-200 hover:border-teal-200 px-10 py-4 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-lg active:scale-95">
                    <span className="text-[11px] font-black text-slate-500 group-hover:text-teal-600 uppercase tracking-[0.25em]">
                        Show 20+ More Offers
                    </span>
                    <div className="bg-slate-100 group-hover:bg-teal-100 p-1 rounded-full transition-colors">
                        <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-teal-600 group-hover:translate-y-0.5 transition-transform duration-300" />
                    </div>
                </button>
            </div>
        </div>
    );
};

export default UsedCarBankCard;