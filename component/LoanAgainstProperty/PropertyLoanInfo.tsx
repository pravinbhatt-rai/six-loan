'use client';
import React from 'react';
import { Info, Banknote, Calendar, CheckCircle } from 'lucide-react';

const PropertyLoanInfo = () => {
  return (
    <div className="w-full max-w-6xl mx-auto p-4 bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
      <div className="p-8">
        {/* Header Section */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-teal-50 rounded-lg">
            <Info className="w-6 h-6 text-[#1CBEA2]" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 font-serif">
            What is a Loan Against Property (LAP)?
          </h2>
        </div>

        {/* Content Section */}
        <div className="space-y-6 text-gray-600 leading-relaxed">
          
          {/* Definition */}
          <div className="flex gap-4">
            <Banknote className="w-5 h-5 text-gray-400 shrink-0 mt-1" />
            <p>
              A Loan Against Property (LAP) is a <span className="font-semibold text-gray-800">secured mortgage loan</span> where you pledge your residential, commercial, or industrial property as collateral. Unlike personal loans, LAP offers <strong>higher loan amounts and lower interest rates</strong> because the lender has the security of your property asset.
            </p>
          </div>

          {/* Repayment */}
          <div className="flex gap-4">
            <Calendar className="w-5 h-5 text-gray-400 shrink-0 mt-1" />
            <p>
              You can leverage the market value of your property to fund business expansion, education, or medical needs. These loans offer <span className="font-semibold text-gray-800">flexible repayment tenures</span> that typically range from <strong>5 to 15 years</strong>, ensuring lower EMIs.
            </p>
          </div>

          {/* Eligibility */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="flex gap-4">
              <CheckCircle className="w-5 h-5 text-[#1CBEA2] shrink-0 mt-1" />
              <div>
                <p className="mb-2 font-semibold text-gray-900">
                  Loan Eligibility & Property Factors:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-1 text-sm text-gray-700">
                  <li>Market value of the property (LTV ratio)</li>
                  <li>Clear property title and legal documentation</li>
                  <li>Income stability of the individual or business</li>
                  <li>Existing credit history and repayment track record</li>
                </ul>
                <p className="mt-3 text-sm italic">
                  With a Loan Against Property, you continue to own and use your property while accessing the funds needed to achieve your financial goals.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PropertyLoanInfo;