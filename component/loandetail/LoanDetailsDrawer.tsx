// components/LoanDetailsDrawer.tsx
'use client';
import React, { useEffect, useState } from 'react';

export interface LoanDetailsSummaryCharge {
    id?: number;
    label: string;
    mainText: string;
    subText?: string | null;
}

export interface LoanDetailsRequiredDocument {
    id?: number;
    title: string;
    description?: string | null;
}

export interface LoanDetailsProcessStep {
    id?: number;
    title: string;
    description?: string | null;
}

export interface LoanDetailsData {
    id: number;
    bankName: string;
    bankLogoUrl: string;
    emiExample: string;
    interestRateText: string;
    summaryCharges?: LoanDetailsSummaryCharge[];
    requiredDocuments?: LoanDetailsRequiredDocument[];
    processSteps?: LoanDetailsProcessStep[];
    keyStatement?: string | null;
    emiAmount?: string;
    categoryName?: string;
}

interface LoanDetailsDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    loan: LoanDetailsData | null;
    onApply: () => void;
    categoryName?: string;
}

const LoanDetailsDrawer: React.FC<LoanDetailsDrawerProps> = ({ isOpen, onClose, loan, onApply, categoryName }) => {
    // Internal state to manage delayed unmounting for animations
    const [isVisible, setIsVisible] = useState(isOpen);
    const [shouldRender, setShouldRender] = useState(isOpen);

    useEffect(() => {
        if (isOpen) {
            setShouldRender(true);
        } else {
            const timer = setTimeout(() => {
                setShouldRender(false);
            }, 400);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    useEffect(() => {
        setIsVisible(isOpen);
    }, [isOpen]);

    // Only return null if it's fully closed and finished animating
    if (!shouldRender || !loan) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end overflow-hidden">
            {/* DEFINING ENTRY AND EXIT ANIMATIONS */}
            <style jsx>{`
        /* Entry Keyframes */
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* Exit Keyframes */
        @keyframes slideOutRight {
          from { transform: translateX(0); }
          to { transform: translateX(100%); }
        }
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }

        /* Animation Classes */
        /* Using cubic-bezier for snappy entrance, ease-in for smooth exit */
        .animate-slide-in {
          animation: slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-slide-out {
          animation: slideOutRight 0.4s ease-in forwards;
        }
        
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
        .animate-fade-out {
          animation: fadeOut 0.4s ease-in forwards;
        }
      `}</style>

            {/* Backdrop: Applies fade-in if isOpen is true, otherwise fade-out */}
            <div
                className={`absolute inset-0 bg-black/30 backdrop-blur-[2px] ${isOpen ? 'animate-fade-in' : 'animate-fade-out'}`}
                onClick={onClose}
            />

            {/* Drawer Panel: Applies slide-in if isOpen is true, otherwise slide-out */}
            <div className={`relative w-full max-w-[450px] h-full bg-white shadow-2xl flex flex-col ${isOpen ? 'animate-slide-in' : 'animate-slide-out'}`}>

                {/* 1. Header */}
                <div className="flex justify-between items-center p-5 border-b border-gray-100 bg-white">
                    <h2 className="text-2xl font-serif font-bold text-gray-900">More Details</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors group"
                    >
                        <svg
                            width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                            className="text-gray-500 group-hover:text-gray-900 transition-colors"
                        >
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                {/* 2. Key Info Strip */}
                <div className="bg-[#fdf4ff] px-6 py-4 flex items-center justify-between border-b border-purple-100">
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-500 mb-1">Lender</span>
                        <div className="flex items-center gap-2">
                            <img src={loan.bankLogoUrl} alt={loan.bankName} className="w-6 h-6 object-contain" />
                            <span className="font-semibold text-sm text-gray-800">{loan.bankName}</span>
                        </div>
                        <span className="text-[10px] text-gray-500">{categoryName || 'Loan'}</span>
                    </div>

                    <div className="w-px h-8 bg-gray-300 mx-2"></div>

                    <div className="flex flex-col">
                        <span className="text-xs text-gray-500 mb-1">Loan Amount</span>
                        {/* Note: This 4 Lakhs is hardcoded. If you have amount in props, replace here */}
                        <span className="font-semibold text-sm text-gray-800">₹ 4 Lakhs</span>
                    </div>

                    <div className="w-px h-8 bg-gray-300 mx-2"></div>

                    <div className="flex flex-col">
                        <span className="text-xs text-gray-500 mb-1">EMI</span>
                        <span className="font-semibold text-sm text-gray-800">{loan.emiAmount}</span>
                    </div>
                </div>

                {/* 3. Scrollable Content Area */}
                <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-gray-50 scrollbar-thin scrollbar-thumb-gray-200">

                    {/* Card: Summary of Charge */}
                    <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
                        <h3 className="text-center text-black font-serif font-bold text-lg mb-6">Summary of Charge</h3>

                        <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                            {/* FIXED: Added optional chaining check and map logic */}
                            {loan.summaryCharges && loan.summaryCharges.length > 0 ? (
                                loan.summaryCharges.map((item, index) => (
                                    <div key={item.id || index}>
                                        <p className="text-gray-500 text-sm mb-1">{item.label}</p>
                                        <p className="font-bold text-gray-900">{item.mainText}</p>
                                        {item.subText && (
                                            <p className="text-[10px] text-gray-400">{item.subText}</p>
                                        )}
                                    </div>
                                ))
                            ) : (
                                /* Fallback if no data is present (optional) */
                                <div className="col-span-2 text-center text-gray-400 text-sm">
                                    No summary charges available.
                                </div>
                            )}
                        </div>

                        <div className="mt-6 pt-4 border-t border-gray-100">
                            <p className="text-gray-500 text-sm mb-1">Annual Percentage Rate</p>
                            <p className="font-bold text-gray-900 text-lg">20.13%</p>
                        </div>

                        <p className="text-[10px] text-gray-400 mt-4 leading-tight">
                            For more details of charges and other loan terms, kindly refer to <span className="text-teal-500 cursor-pointer hover:underline">provisional kfs</span> below.
                        </p>
                    </div>

                    {/* Card: List of Documents */}
                    <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
                        <h3 className="text-center font-serif font-bold text-lg mb-6 text-black">List of Documents (Indicative)</h3>
                        <ul className="space-y-4">
                            {/* If you want this dynamic as well, use loan.requiredDocuments?.map here */}
                            <li className="flex flex-col">
                                <span className="font-semibold text-gray-800 text-sm flex items-center">
                                    <span className="w-1.5 h-1.5 rounded-full bg-black mr-2"></span>
                                    Identity Proof
                                </span>
                                <span className="text-gray-500 text-xs ml-3.5 mt-0.5">PAN Card, Aadhaar Card</span>
                            </li>
                            <li className="flex flex-col">
                                <span className="font-semibold text-gray-800 text-sm flex items-center">
                                    <span className="w-1.5 h-1.5 rounded-full bg-black mr-2"></span>
                                    Business Proof
                                </span>
                                <span className="text-gray-500 text-xs ml-3.5 mt-0.5">GST Certificate, Udyam Certificate, Ownership Proof</span>
                            </li>
                            <li className="flex flex-col">
                                <span className="font-semibold text-gray-800 text-sm flex items-center">
                                    <span className="w-1.5 h-1.5 rounded-full bg-black mr-2"></span>
                                    Income Proof
                                </span>
                                <span className="text-gray-500 text-xs ml-3.5 mt-0.5">Bank Statement (1 Year)</span>
                            </li>
                        </ul>
                    </div>

                    {/* Card: Loan Process */}
                    <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
                        <h3 className="text-center font-serif font-bold text-lg mb-6 text-black">Loan Process</h3>
                        <ul className="space-y-5">
                            {/* If you have processSteps in props, use that, otherwise use this static list */}
                            {(loan.processSteps && loan.processSteps.length > 0 ? loan.processSteps : [
                                { title: 'Complete Your Profile', description: 'Submit your details with necessary documents' },
                                { title: 'KYC & Bank A/C Verification', description: 'Validate your KYC documents and bank A/C details' },
                                { title: 'Address Verification', description: 'Lender will visit your residence and workplace to verify details' },
                                { title: 'Eligibility Check', description: 'The lender will evaluate your loan eligibility' },
                                { title: 'Agreement Signing & Final Disbursement', description: 'Receive funds once you sign your loan agreement' },
                            ]).map((item, idx) => (
                                <li key={idx} className="flex gap-3">
                                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-black shrink-0"></div>
                                    <div>
                                        <p className="font-medium text-gray-900 text-sm">{item.title}</p>
                                        <p className="text-gray-500 text-xs mt-0.5">{item.description}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Card: Key Facts Statement */}
                    <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm text-center">
                        <h3 className="font-serif font-bold text-lg mb-4 text-black">Key Facts Statement</h3>
                        <p className="text-sm text-gray-600 leading-relaxed mb-4">
                            The values mentioned in this KFS are indicative and might change as loan application progresses and additional details about customer&apos;s profile/eligibility are updated.
                        </p>
                        <p className="font-bold text-gray-900 text-sm">
                            Provisional KFS can be found <button className="text-teal-600 cursor-pointer hover:underline ml-1">here.</button>
                        </p>
                    </div>

                </div>

                {/* 4. Footer Action */}
                <div className="p-4 border-t border-gray-200 bg-white">
                    <button
                        onClick={onApply}
                        className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 rounded-lg transition-colors shadow-lg shadow-teal-200"
                    >
                        Apply Now
                    </button>
                </div>

            </div>
        </div>
    );
};

export default LoanDetailsDrawer;