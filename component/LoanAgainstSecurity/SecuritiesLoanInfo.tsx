'use client';
import React from 'react';
import { Info, Banknote, Calendar, CheckCircle } from 'lucide-react';

const SecuritiesLoanInfo = () => {
  return (
    <div className="w-full max-w-6xl mx-auto p-4 bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
      <div className="p-8">
        {/* Header Section */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-teal-50 rounded-lg">
            <Info className="w-6 h-6 text-teal-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            What is a Loan Against Securities?
          </h2>
        </div>

        {/* Content Section */}
        <div className="space-y-6 text-gray-600 leading-relaxed">
          
          {/* Definition */}
          <div className="flex gap-4">
            <Banknote className="w-5 h-5 text-gray-400 shrink-0 mt-1" />
            <p>
              Loan Against Securities (LAS) is a <span className="font-semibold text-gray-800">secured loan facility</span> where you pledge your investments (Shares, Mutual Funds, or Bonds) as collateral to get instant liquidity. Unlike selling your assets, LAS allows you to <strong>retain ownership</strong> and continue earning dividends and bonuses while accessing funds.
            </p>
          </div>

          {/* Repayment/Overdraft Explanation */}
          <div className="flex gap-4">
            <Calendar className="w-5 h-5 text-gray-400 shrink-0 mt-1" />
            <p>
              This facility typically functions as an <span className="font-semibold text-gray-800">Overdraft (OD) limit</span> rather than a term loan. You pay interest <strong>only on the amount utilized</strong> and for the duration it is used, making it a cheaper alternative to personal loans for short-term needs.
            </p>
          </div>

          {/* Eligibility/LTV */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="flex gap-4">
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-1" />
              <div>
                <p className="mb-2">
                  Loan eligibility and limit are determined by:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-1 text-sm text-gray-700">
                  <li>Current market value of portfolio</li>
                  <li>Type of securities (Equity vs. Debt)</li>
                  <li>Approved list of scrips/funds</li>
                  <li>Applicable LTV (Loan-to-Value) ratio</li>
                </ul>
                <p className="mt-3 text-sm italic">
                  With zero foreclosure charges and digital pledging, Loan Against Securities offers the ultimate flexibility for investors.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SecuritiesLoanInfo;