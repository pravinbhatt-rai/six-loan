'use client';
import React from 'react';
import { Check, ArrowRightLeft } from 'lucide-react';

// --- Types ---
interface SectionProps {
  title: string;
  points: string[];
  intro?: string;
  isMainHeader?: boolean;
}

// --- Data Configuration updated for Transfer Intent ---
const contentData = {
  highInterestBorrowers: {
    title: "Balance Transfer for High-Interest Borrowers",
    points: [
      "Borrowers currently paying an interest rate of 14% or higher can save significantly by switching to lenders offering rates starting from 10.50%.",
      "Ideal for those who took a loan during a high-interest cycle or when their credit score was lower.",
      "A transfer is most effective when at least 50% of the loan tenure is remaining.",
      "Even a 1-2% reduction in interest can lead to savings of thousands over a 3-5 year period."
    ]
  },
  topUpSeekers: {
    title: "Balance Transfer with Top-up Facility",
    points: [
      "Most lenders offer an additional 'Top-up' loan along with the balance transfer to meet extra financial needs.",
      "Top-up interest rates are generally the same as the transfer rate, making it cheaper than taking a fresh personal loan.",
      "No extra documentation is required for the top-up amount, as it is processed based on your existing repayment track.",
      "Combined EMIs for both the transferred balance and top-up ensure easier monthly management."
    ]
  },
  segmentsHeader: "Transfer Solutions for Different Segments",
  salaried: {
    title: "Transfer Benefits for Salaried Employees",
    points: [
      "Salaried individuals with a consistent 6-12 month repayment track on their current loan are highly preferred for transfers.",
      "Employees of top MNCs and Government sectors can leverage their job stability to negotiate 'Zero Processing Fee' transfer deals.",
      "Quick digital verification of salary credits allows for a faster 'Switch-over' time, often within 48-72 hours."
    ]
  },
  selfEmployed: {
    title: "Transfer Benefits for Self-employed Borrowers",
    points: [
      "A balance transfer helps self-employed individuals reduce their business overhead costs by lowering personal debt outflows.",
      "Lenders evaluate the last 2 years of ITR and current loan track to offer higher top-up limits for business expansion.",
      "Documentation is simplified if the transfer is moved to a bank where the individual holds a Current Account."
    ]
  },
  steps: {
    title: "Critical Steps Before Initiating a Balance Transfer",
    intro: "Ensure a profitable switch by following these essential evaluation steps:",
    points: [
      "Obtain a Foreclosure Statement from your current bank to know the exact outstanding principal and penalty charges.",
      "Calculate the 'Net Benefit': Total Interest Saved minus (Foreclosure Charges + New Processing Fees).",
      "Ensure your remaining loan tenure is at least 12 months; shorter tenures might not cover the cost of switching fees.",
      "Check if the new lender requires a 'No Objection Certificate' (NOC) from your current bank before disbursement.",
      "Verify if the new lender offers the same or longer tenure to help further reduce your monthly EMI burden.",
      "Monitor your Credit Score; ensure no defaults in the last 6 months to qualify for the best 'Transfer' rates."
    ]
  }
};

// --- Sub-Components ---

const CheckIcon = () => (
  <div className="shrink-0 mt-1">
    <div className="bg-teal-600 rounded-full p-[3px] flex items-center justify-center">
      <Check size={12} className="text-white" strokeWidth={4} />
    </div>
  </div>
);

const ContentSection = ({ title, points, intro, isMainHeader = false }: SectionProps) => (
  <div className="mb-8">
    <h3 className={`${isMainHeader ? 'text-2xl' : 'text-xl'} font-bold font-serif text-gray-900 mb-4`}>
      {title}
    </h3>
    {intro && <p className="text-gray-700 mb-4 text-[15px] font-medium">{intro}</p>}
    <ul className="space-y-4">
      {points.map((point, index) => (
        <li key={index} className="flex items-start gap-3 group">
          <CheckIcon />
          <p className="text-gray-700 leading-relaxed text-[15px] group-hover:text-gray-900 transition-colors">{point}</p>
        </li>
      ))}
    </ul>
  </div>
);

// --- Main Component ---

export default function PersonalLoanTransferGuide() {
  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-8 bg-white text-gray-800">
      
      {/* Visual Indicator for Transfer */}
      <div className="flex items-center gap-3 mb-10 pb-6 border-b border-gray-100">
        <div className="p-3 bg-teal-50 rounded-full">
            <ArrowRightLeft className="text-teal-600 w-6 h-6" />
        </div>
        <div>
            <h1 className="text-2xl font-bold text-gray-900">Personal Loan Balance Transfer Guide</h1>
            <p className="text-sm text-gray-500">How to switch lenders and save on interest outgo</p>
        </div>
      </div>

      {/* Section 1: High Interest & Top Up */}
      <div className="space-y-2">
        <ContentSection {...contentData.highInterestBorrowers} />
        
        
        
        <ContentSection {...contentData.topUpSeekers} />
      </div>

      {/* Section 2: Segments Header & Content */}
      <div className="mt-12 mb-8 p-6 bg-gray-50 rounded-2xl border border-gray-100">
        <h2 className="text-2xl font-bold font-serif text-gray-900 mb-6">
          {contentData.segmentsHeader}
        </h2>
        <div className="space-y-8">
          <ContentSection {...contentData.salaried} />
          <ContentSection {...contentData.selfEmployed} />
        </div>
      </div>

      {/* Section 3: Steps */}
      <div className="mt-12 bg-teal-50/30 p-8 rounded-2xl border border-teal-100">
        <ContentSection 
          {...contentData.steps} 
          isMainHeader={true}
        />
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500 italic">
          *Savings vary based on individual loan profiles, current bank penalties, and new lender policies.
        </p>
      </div>

    </div>
  );
}