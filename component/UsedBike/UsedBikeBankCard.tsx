'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

const usedBikeCards = [
    {
        bankName: 'Tata Capital',
        category: 'Premium Bikes',
        tag: '100% On Road',
        logo: (
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="45" fill="#14b8a6" fillOpacity="0.1" />
                <path d="M30 50 L50 30 L70 50 L50 70 L30 50" fill="#14b8a6" />
            </svg>
        ),
        maxLoan: '₹2 Lakhs',
        interest: '12.99% Onwards',
        tenure: 'Up to 36 Mo',
        eligibility: 'Credit Score > 700',
        fee: '2.00%',
        feature: 'Doorstep Service',
    },
    {
        bankName: 'Bajaj Finserv',
        category: 'Used Scooters',
        tag: 'Instant Approval',
        logo: (
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="15" y="35" width="40" height="40" rx="2" fill="#14b8a6" />
                <path d="M60 35 L85 35 L85 75 L60 75" stroke="#14b8a6" strokeWidth="6" />
            </svg>
        ),
        maxLoan: '90% of Valuation',
        interest: '13.50% - 17%',
        tenure: '48 Months',
        eligibility: 'No Income Proof',
        fee: 'Flat ₹750',
        feature: 'Minimal Docs',
    },
];

const UsedBikeBankCard = () => {
    const router = useRouter();

    return (
        <div className="w-full max-w-6xl mx-auto p-4 md:p-6 font-sans">
            {/* Header with Teal Accents */}
            <div className="mb-8 md:mb-12">
                <div className="flex items-center gap-3 mb-2">
                    <div className="h-6 md:h-8 w-1.5 md:w-2 bg-teal-500"></div>
                    <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter uppercase">
                        Moto<span className="text-teal-500">Corp</span>
                    </h1>
                </div>
                <h2 className="text-lg md:text-xl font-bold text-slate-700 ml-4 md:ml-5">Second Hand Bike Loans</h2>
                <p className="text-slate-500 font-medium ml-4 md:ml-5 mt-1 text-xs md:text-sm tracking-wide max-w-lg">
                    Low interest rates for used motorcycles and scooters. Get up to 100% funding on vehicle valuation.
                </p>
            </div>

            {usedBikeCards.map((card) => (
                <div key={card.bankName} className="bg-white rounded-2xl border-b-4 border-teal-500/30 border-x border-t border-slate-200 shadow-sm hover:shadow-xl transition-all mb-6 overflow-hidden group">
                    {/* Upper Status Ribbon */}
                    <div className="bg-teal-50 px-4 md:px-6 py-2 flex justify-between items-center border-b border-teal-100">
                        <span className="text-[9px] md:text-[10px] font-black text-teal-700 uppercase tracking-[0.25em]">{card.tag}</span>
                        <div className="flex items-center gap-2">
                             <span className="h-1.5 w-1.5 rounded-full bg-teal-500 shadow-[0_0_8px_rgba(20,184,166,0.8)]"></span>
                             <span className="text-[9px] md:text-[10px] text-teal-600 font-extrabold uppercase tracking-widest hidden sm:block">{card.feature}</span>
                             <span className="text-[9px] text-teal-600 font-extrabold uppercase tracking-widest sm:hidden">Verified</span>
                        </div>
                    </div>

                    <div className="p-5 md:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 md:gap-10">
                        {/* 1. Brand Identity */}
                        <div className="flex items-center gap-4 md:gap-6 min-w-[200px] md:min-w-[260px]">
                            <div className="w-14 h-14 md:w-16 md:h-16 bg-teal-500/10 rounded-2xl p-2.5 flex items-center justify-center border border-teal-500/20 group-hover:bg-teal-500 transition-colors duration-300 shrink-0">
                                <div className="group-hover:brightness-0 group-hover:invert transition-all w-full h-full">
                                    {card.logo}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight leading-none">{card.bankName}</h3>
                                <p className="text-[10px] md:text-[11px] font-bold text-teal-600 tracking-[0.1em] uppercase mt-1 md:mt-2">{card.category}</p>
                            </div>
                        </div>

                        {/* 2. Financial Metrics Grid - Responsive 2x2 Layout */}
                        <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4 md:gap-8">
                            <div>
                                <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1.5">Interest</p>
                                <p className="text-base md:text-lg font-bold text-slate-900 leading-none">{card.interest}</p>
                                <p className="text-[9px] md:text-[10px] text-teal-500 font-bold mt-1 tracking-tighter">Fixed Rate</p>
                            </div>

                            <div>
                                <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1.5">Max Amount</p>
                                <p className="text-base md:text-lg font-bold text-slate-900 leading-none">{card.maxLoan}</p>
                                <p className="text-[9px] md:text-[10px] text-slate-500 font-medium mt-1">On Valuation</p>
                            </div>

                            <div className="md:border-l md:border-slate-100 md:pl-6">
                                <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1.5">Tenure</p>
                                <p className="text-base md:text-lg font-bold text-slate-900 leading-none">{card.tenure}</p>
                                <p className="text-[9px] md:text-[10px] text-slate-500 font-medium mt-1">Flexible Terms</p>
                            </div>

                            <div>
                                <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1.5">Proc. Fee</p>
                                <p className="text-base md:text-lg font-bold text-slate-900 leading-none">{card.fee}</p>
                                <p className="text-[9px] md:text-[10px] text-teal-600 font-bold mt-1 uppercase">Limited Deal</p>
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
                                Terms
                            </button>
                        </div>
                    </div>

                    {/* Footer: Tech-Style Documentation bar */}
                    <div className="bg-slate-900 px-5 md:px-8 py-2.5 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6">
                        <span className="text-[9px] font-black text-teal-400 uppercase tracking-widest shrink-0">Checklist:</span>
                        <div className="flex flex-wrap gap-x-4 gap-y-1">
                            {['RC Smart Card', 'Insurance Copy', 'Valid PUC', 'KYC Docs'].map((doc) => (
                                <div key={doc} className="flex items-center gap-1.5">
                                    <div className="h-1 w-1 bg-teal-500 rounded-full"></div>
                                    <span className="text-[9px] font-bold text-slate-300 uppercase whitespace-nowrap">{doc}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default UsedBikeBankCard;