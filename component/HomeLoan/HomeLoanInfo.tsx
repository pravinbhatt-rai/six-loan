'use client';
import React from 'react';
import { Info, Home, Landmark, CheckCircle, Percent } from 'lucide-react';

const HomeLoanInfo = () => {
  return (
    <div className="w-full max-w-6xl mx-auto p-4 bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
      <div className="p-8">
        {/* Header Section */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-teal-50 rounded-lg">
            <Info className="w-6 h-6 text-teal-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            What is a Home Loan?
          </h2>
        </div>

        {/* Content Section */}
        <div className="space-y-6 text-gray-600 leading-relaxed">
          
          {/* Definition */}
          <div className="flex gap-4">
            <Home className="w-5 h-5 text-gray-400 shrink-0 mt-1" />
            <p>
              A home loan is a <span className="font-semibold text-gray-800">secured loan</span> used to purchase, construct, or renovate a property. The lender holds the property as <span className="font-semibold text-gray-800">collateral</span> until the loan is fully repaid, making it one of the most affordable long-term financing options.
            </p>
          </div>

          {/* Repayment */}
          <div className="flex gap-4">
            <Landmark className="w-5 h-5 text-gray-400 shrink-0 mt-1" />
            <p>
              Repayment is structured through <span className="font-semibold text-gray-800">EMIs</span> over a flexible tenure, typically ranging from <strong>15 to 30 years</strong>, allowing for manageable monthly payments even for large loan amounts.
            </p>
          </div>

          {/* Benefits/Interest Section */}
          <div className="flex gap-4">
            <Percent className="w-5 h-5 text-gray-400 shrink-0 mt-1" />
            <p>
              Home loans offer significantly <span className="text-teal-600 font-medium">lower interest rates</span> compared to personal loans and provide substantial <span className="text-green-600 font-medium">tax benefits</span> on both principal and interest repayments under the Income Tax Act.
            </p>
          </div>

          {/* Eligibility */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
            <div className="flex gap-4">
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-1" />
              <div>
                <p className="mb-2 font-semibold text-gray-800">
                  Key Eligibility & Property Factors:
                </p>
                <ul className="list-disc list-inside grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-700">
                  <li>Steady monthly income (Salaried/Self-employed)</li>
                  <li>Good credit history (CIBIL score)</li>
                  <li>Age of the applicant (typically 21–65 years)</li>
                  <li>Legal and technical valuation of the property</li>
                  <li>Loan-to-Value (LTV) ratio compliance</li>
                </ul>
                <p className="mt-4 text-sm italic border-t border-gray-200 pt-3">
                  Home loans bridge the gap between your savings and the total cost of your dream home, including registration and stamp duty in many cases.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeLoanInfo;