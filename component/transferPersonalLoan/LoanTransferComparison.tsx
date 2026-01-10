'use client';
import React from 'react';
import { ArrowRightLeft, Calculator, Percent } from 'lucide-react';

// --- Types ---
interface ComparisonRow {
  parameter: string;
  existingLoan: string;
  transferLoan: string;
  highlight?: boolean;
}

// --- Data: Tailored for Balance Transfer Comparison ---
const comparisonData: ComparisonRow[] = [
  {
    parameter: "Interest Rate",
    existingLoan: "Higher (Typically 13% – 18% p.a.)",
    transferLoan: "Lower (Starting from 10.50% p.a.)",
    highlight: true
  },
  {
    parameter: "Monthly EMI",
    existingLoan: "Higher monthly burden on cash flow",
    transferLoan: "Reduced EMI, providing more monthly savings"
  },
  {
    parameter: "Total Interest Outgo",
    existingLoan: "Maximum interest paid over the full tenure",
    transferLoan: "Significant reduction in the total cost of debt",
    highlight: true
  },
  {
    parameter: "Top-up Facility",
    existingLoan: "Usually not available on existing terms",
    transferLoan: "Get extra funds at the same low interest rate"
  },
  {
    parameter: "Repayment Tenure",
    existingLoan: "Fixed as per original agreement",
    transferLoan: "Flexible; option to reset or reduce tenure"
  },
  {
    parameter: "Digital Experience",
    existingLoan: "Old-school banking/Limited tracking",
    transferLoan: "End-to-end digital management via Six Loan"
  }
];

// --- Sub-Components ---

const TableRow = ({ row, isLast }: { row: ComparisonRow; isLast: boolean }) => (
  <tr className={`border-b border-gray-200 ${isLast ? 'border-none' : ''} hover:bg-teal-50/30 transition-colors`}>
    <td className="p-4 align-top font-semibold text-gray-900 w-1/4 min-w-[140px] bg-gray-50/30">
      {row.parameter}
    </td>
    <td className="p-4 align-top text-gray-600 w-[37.5%] leading-relaxed border-l border-gray-100 italic">
      {row.existingLoan}
    </td>
    <td className={`p-4 align-top w-[37.5%] leading-relaxed border-l border-gray-100 ${row.highlight ? 'font-bold text-teal-500' : 'text-gray-900'}`}>
      {row.transferLoan}
    </td>
  </tr>
);

// --- Main Component ---

export default function LoanTransferComparison() {
  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-8 bg-white min-h-screen font-sans">
      
      {/* Section 1: EMI Savings Info */}
      <section className="mb-12 p-6 bg-teal-50/50 rounded-2xl border border-teal-100">
        <div className="flex items-center gap-3 mb-4">
          <Calculator className="text-teal-500 w-6 h-6" />
          <h2 className="text-2xl font-bold text-gray-900">
            How much can you save by transferring?
          </h2>
        </div>
        <p className="text-gray-700 leading-relaxed max-w-4xl">
          A 2% drop in interest rates can save you thousands in interest over a 3-year period. Use our 
          <span className="text-teal-600 font-semibold cursor-pointer hover:underline mx-1">Balance Transfer Calculator</span> 
          to compare your current EMI with the potential new EMI. Simply enter your outstanding principal, current rate, and the new offered rate.
        </p>
      </section>

      {/* Section 2: Comparison Intro */}
      <section className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <ArrowRightLeft className="text-teal-600 w-6 h-6" />
          <h2 className="text-2xl font-bold text-gray-900">
            Existing Loan vs. Balance Transfer
          </h2>
        </div>
        <p className="text-gray-700 leading-relaxed mb-6">
          Is a balance transfer worth the effort? Compare the parameters below to see how a switch optimizes your financial health and reduces your debt burden.
        </p>
      </section>

      

      {/* Section 3: Comparison Table */}
      <section className="mb-8 overflow-hidden rounded-xl border border-gray-200 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-teal-500 text-white border-b border-teal-500">
                <th className="p-5 font-bold w-1/4">Feature Parameter</th>
                <th className="p-5 font-bold w-[37.5%] border-l border-teal-500">Your Current Loan</th>
                <th className="p-5 font-bold w-[37.5%] border-l border-teal-500 flex items-center gap-2">
                  <Percent size={18} /> New Transfer Offer
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, index) => (
                <TableRow 
                  key={index} 
                  row={row} 
                  isLast={index === comparisonData.length - 1} 
                />
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Footer Note */}
      <footer className="flex items-start gap-2 text-sm text-gray-500 italic bg-gray-50 p-4 rounded-lg">
        <div className="mt-0.5">•</div>
        <p>Savings are subject to the outstanding principal amount and the remaining tenure of your existing loan. Processing fees of the new lender and foreclosure charges of the old lender should be factored into the final decision.</p>
      </footer>

    </div>
  );
}