// components/LoanCard.tsx
'use client';
import React from 'react';
import { LoanProduct } from '../../public/mockdata/data';

interface LoanCardProps {
  loan: LoanProduct;
  onApply: () => void;
  onShowDetails?: () => void;
}

const LoanCard: React.FC<LoanCardProps> = ({ loan, onApply, onShowDetails }) => {

  return (
    <>
      <div className="group bg-white rounded-2xl border-b-4 border-teal-500/30 border-x border-t border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 mb-6 overflow-hidden">
        
        {/* Top Status Ribbon - Styled like the reference */}
        <div className="bg-teal-50 px-4 md:px-6 py-2 flex justify-between items-center border-b border-teal-100">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-500 shadow-[0_0_8px_rgba(20,184,166,0.8)] animate-pulse"></span>
            <span className="text-[10px] font-black text-teal-700 uppercase tracking-[0.2em]">
              Approval Chance
            </span>
          </div>
          <span className="text-[10px] font-bold text-teal-600 uppercase tracking-widest bg-teal-100/50 px-2 py-0.5 rounded-md">
            {loan.chanceOfApproval}
          </span>
        </div>

        <div className="p-6 md:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          
          {/* 1. Brand Identity */}
          <div className="flex items-center gap-5 min-w-full lg:min-w-[240px]">
            <div className="w-16 h-16 bg-teal-500/5 rounded-2xl p-3 flex items-center justify-center border border-teal-500/20 group-hover:border-teal-500/50 transition-colors duration-300 shrink-0">
              <img
                src={loan.logoUrl}
                alt={`${loan.bankName} logo`}
                className="w-full h-full object-contain mix-blend-multiply"
              />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight leading-none">
                {loan.bankName}
              </h3>
              <p className="text-[10px] font-bold text-slate-400 tracking-[0.1em] uppercase mt-2">
                Verified Lender
              </p>
            </div>
          </div>

          {/* 2. Data Grid - Styled with Slate/Teal typography */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-8 border-t md:border-t-0 border-slate-100 pt-6 md:pt-0 md:border-l md:pl-8">
            
            {/* Interest Rate */}
            <div>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1.5">Interest Rate</p>
              <p className="text-lg font-bold text-slate-900 leading-none">{loan.interestRateText}</p>
              <p className="text-[10px] text-teal-600 font-bold mt-1 tracking-tight">{loan.aprText}</p>
            </div>

            {/* EMI Amount */}
            <div>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1.5">Est. EMI</p>
              <p className="text-lg font-bold text-slate-900 leading-none">{loan.emiAmount}</p>
              <p className="text-[10px] text-slate-500 font-medium mt-1">Onwards</p>
            </div>

            {/* Process Time */}
            <div>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1.5">Processing</p>
              <p className="text-lg font-bold text-slate-900 leading-none">{loan.processTimeLabel}</p>
              <p className="text-[10px] text-teal-600 font-bold mt-1 uppercase">Speed</p>
            </div>
          </div>

          {/* 3. Action Buttons - High contrast teal & outline styles */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 w-full lg:w-40 mt-2 lg:mt-0">
            <button
              onClick={onApply}
              className="flex-1 bg-teal-500 hover:bg-teal-600 text-white text-[10px] font-black uppercase tracking-[0.15em] py-3.5 rounded-xl transition-all shadow-[0_10px_20px_-10px_rgba(20,184,166,0.5)] active:scale-95 active:shadow-none"
            >
              Apply Now
            </button>
            
            <button
              onClick={onShowDetails || (() => {})}
              className="flex-1 bg-white hover:bg-slate-50 text-slate-700 hover:text-teal-600 text-[10px] font-black uppercase tracking-[0.15em] py-3.5 rounded-xl border-2 border-slate-200 hover:border-teal-500/30 transition-all"
            >
              Details
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoanCard;