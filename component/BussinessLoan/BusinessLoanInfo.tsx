'use client';
import React from 'react';
import { Info, Briefcase, BarChart3, CheckCircle2 } from 'lucide-react';

const BusinessLoanInfo = () => {
  return (
    <div className="w-full max-w-6xl mx-auto p-4 bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-200">
      <div className="p-8">
        {/* Header Section */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-[#E9F6F1] rounded-xl">
            <Info className="w-6 h-6 text-[#1CBEA2]" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 font-serif">
              Understanding Business Loans
            </h2>
            <p className="text-sm text-gray-500">Fueling your enterprise's growth and operations</p>
          </div>
        </div>

        {/* Content Section */}
        <div className="space-y-8 text-gray-600 leading-relaxed">
          
          {/* Definition */}
          <div className="flex gap-4">
            <div className="mt-1 bg-gray-50 p-2 rounded-lg">
                <Briefcase className="w-5 h-5 text-[#1CBEA2] shrink-0" />
            </div>
            <p>
              A business loan is a targeted financial instrument designed to fund <span className="font-semibold text-gray-800">commercial operations</span>. It can be used for working capital, purchasing new machinery, office expansion, or increasing inventory. These loans can be <span className="font-semibold text-gray-800">unsecured</span> (based on business vintage) or <span className="font-semibold text-gray-800">secured</span> (against business assets).
            </p>
          </div>

          {/* Business Growth / Utilization */}
          <div className="flex gap-4">
            <div className="mt-1 bg-gray-50 p-2 rounded-lg">
                <BarChart3 className="w-5 h-5 text-[#1CBEA2] shrink-0" />
            </div>
            <p>
              Unlike personal credit, business loans are structured to help a company’s <span className="font-semibold text-gray-800">cash flow management</span>. Repayment is typically scheduled in monthly or quarterly installments, with tenures usually ranging from <strong>1 to 7 years</strong> depending on the loan type and amount.
            </p>
          </div>

          {/* Eligibility - Business Focused */}
          <div className="bg-[#F8FAFC] p-6 rounded-2xl border border-slate-100">
            <div className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-[#1CBEA2] shrink-0 mt-1" />
              <div className="w-full">
                <h3 className="text-gray-900 font-bold mb-3">Commercial Eligibility Criteria:</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#1CBEA2]" />
                        Business Vintage (Min. 2-3 years)
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#1CBEA2]" />
                        Annual Turnover & Profitability
                      </li>
                    </ul>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#1CBEA2]" />
                        Bank Statement (Last 6-12 months)
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#1CBEA2]" />
                        GST Returns & Financial Audits
                      </li>
                    </ul>
                </div>

                <p className="mt-5 text-sm font-medium text-[#1CBEA2] bg-[#E9F6F1] inline-block px-3 py-1 rounded-full">
                  Note: Business loans often provide tax benefits on the interest paid.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BusinessLoanInfo;