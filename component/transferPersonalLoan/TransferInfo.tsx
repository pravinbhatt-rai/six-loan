'use client';
import React from 'react';
import { ArrowRightLeft, BarChart3, TrendingDown } from 'lucide-react';

// Reusable Icon Component (Now using teal to signify Optimization)
const CheckCircleIcon = () => (
  <svg 
    className="w-6 h-6 text-teal-600 shrink-0 mt-0.5" 
    fill="currentColor" 
    viewBox="0 0 20 20" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      fillRule="evenodd" 
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
      clipRule="evenodd" 
    />
  </svg>
);

const TransferInfo = () => {
  // Data for "5 Tips" Section - Tailored for Balance Transfer
  const transferTipsData = [
    "Ensure you have a clean repayment track of at least 12 months on your current loan to qualify for the best transfer rates.",
    "Obtain a foreclosure statement from your current bank to calculate the exact 'breakeven' point of the transfer.",
    "Negotiate for a 'Zero Processing Fee' deal, especially if your employer is part of the new lender's preferred corporate list.",
    "Only transfer if the interest rate difference is at least 1%–2%; otherwise, processing fees may eat into your savings.",
    "Consider a 'Top-up' loan during the transfer if you need extra funds, as it is usually cheaper than taking a fresh loan."
  ];

  // Data for "Quick Facts" Section - Updated for Refinancing/Transfer Trends
  const transferFactsData = [
    "Borrowers can save between 15% and 30% of their total interest outgo by transferring high-interest loans early in the tenure.",
    "As of 2025, 40% of balance transfer applicants specifically opt for 'Top-up' loans to consolidate multiple smaller debts.",
    "RBI guidelines ensure that banks cannot charge foreclosure penalties on floating-rate personal loans, making transfers significantly cheaper.",
    "Borrowers with a CIBIL score above 770 are often offered 'Instant Balance Transfer' with pre-approved digital disbursement.",
    "A balance transfer is most financially viable if the remaining loan tenure is more than 18 months.",
    "The average 'turnaround time' (TAT) for a digital loan balance transfer has dropped to 48 hours in the 2024-25 fiscal year."
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-12 font-sans text-gray-800">
      
      {/* SECTION 1: 5 Tips to Transfer */}
      <section>
        <div className="flex items-center gap-3 mb-4">
            <TrendingDown className="w-8 h-8 text-teal-600" />
            <h2 className="text-3xl font-bold text-gray-900">
            5 Tips for a Successful Personal Loan Balance Transfer
            </h2>
        </div>
        <p className="text-lg text-gray-700 mb-6">
          Optimize your debt and lower your EMI by following these strategic transfer tips:
        </p>
        <ul className="space-y-4">
          {transferTipsData.map((tip, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircleIcon />
              <span className="text-lg leading-relaxed">{tip}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Visual Instruction */}
      

      {/* Divider */}
      <hr className="border-gray-200" />

      {/* SECTION 2: Quick Facts */}
      <section>
        <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="w-8 h-8 text-teal-600" />
            <h2 className="text-3xl font-bold text-gray-900">
            Industry Facts: Loan Refinancing & Transfers
            </h2>
        </div>
        
        
        
        <ul className="grid md:grid-cols-2 gap-6 mb-8">
          {transferFactsData.map((fact, index) => (
            <li key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
              <CheckCircleIcon />
              <span className="text-base leading-relaxed text-gray-700">{fact}</span>
            </li>
          ))}
        </ul>
        
        {/* Footer Note */}
        <div className="flex items-center gap-2 p-4 bg-teal-50 rounded-lg">
            <ArrowRightLeft className="w-5 h-5 text-teal-500" />
            <p className="text-sm font-medium text-teal-900">
            Ready to switch? <a href="#" className="underline hover:text-teal-700">Check your potential savings with our Transfer Calculator</a>
            </p>
        </div>
      </section>

    </div>
  );
};

export default TransferInfo;