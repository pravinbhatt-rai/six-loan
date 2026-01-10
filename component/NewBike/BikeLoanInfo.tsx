'use client';
import React from 'react';
import { Info, Banknote, Calendar, CheckCircle, Bike } from 'lucide-react';

const BikeLoanInfo = () => {
  return (
    <div className="w-full max-w-6xl mx-auto p-4 bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 font-sans">
      <div className="p-6 sm:p-8">
        {/* Header Section */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-teal-50 rounded-lg shrink-0">
            <Bike className="w-6 h-6 text-teal-600" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            What is a New Bike Loan?
          </h2>
        </div>

        {/* Content Section */}
        <div className="space-y-6 text-gray-600 leading-relaxed text-sm sm:text-base">
          
          {/* Definition */}
          <div className="flex gap-4">
            <Banknote className="w-5 h-5 text-gray-400 shrink-0 mt-1" />
            <p>
              A <span className="font-semibold text-gray-800">Two-Wheeler Loan</span> is a secured financing option offered by banks and lenders to help you purchase a motorcycle or scooter. Unlike personal loans, these are specifically designed for vehicle purchase, often covering up to <strong>100% of the on-road price</strong>.
            </p>
          </div>

          {/* Collateral & Hypothecation */}
          <div className="flex gap-4">
            <Info className="w-5 h-5 text-gray-400 shrink-0 mt-1" />
            <p>
              The bike itself serves as security for the loan (a process known as <span className="font-semibold text-gray-800">Hypothecation</span>). This security allows lenders to offer lower interest rates compared to unsecured loans, making your dream bike more affordable.
            </p>
          </div>

          {/* Repayment */}
          <div className="flex gap-4">
            <Calendar className="w-5 h-5 text-gray-400 shrink-0 mt-1" />
            <p>
              Repayment is made through flexible <span className="font-semibold text-gray-800">Equated Monthly Installments (EMIs)</span>. You can choose a tenure that suits your budget, typically ranging from <strong>12 to 60 months</strong> (1 to 5 years).
            </p>
          </div>

          {/* Eligibility & Features */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 mt-2">
            <div className="flex gap-4">
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-1" />
              <div>
                <p className="mb-2 font-medium text-gray-900">
                  Why choose a Bike Loan?
                </p>
                <ul className="list-disc list-inside space-y-1.5 ml-1 text-sm text-gray-700">
                  <li><strong>Minimal Down Payment:</strong> Drive home with zero or low initial payment.</li>
                  <li><strong>Quick Disbursal:</strong> Instant approvals for eligible customers.</li>
                  <li><strong>Tax Benefits:</strong> Available for electric vehicles under Section 80EEB.</li>
                  <li><strong>Simplified Documentation:</strong> Basic KYC and income proof required.</li>
                </ul>
                <p className="mt-3 text-xs sm:text-sm italic text-gray-500">
                  *Interest rates and loan-to-value (LTV) ratios depend on your credit profile and the bike model chosen.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BikeLoanInfo;