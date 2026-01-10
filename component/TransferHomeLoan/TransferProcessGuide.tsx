import React from 'react';
import { Check } from 'lucide-react';

// --- Types ---
interface SectionProps {
  title: string;
  points: string[];
  intro?: string;
  isMainHeader?: boolean;
}

// --- Data Configuration ---
const transferContent = {
  // SEO Strategy: Target "Eligibility" keywords
  eligibility: {
    title: "Who is Eligible for Home Loan Balance Transfer?",
    intro: "Not every borrower qualifies for a refinance. Lenders look for the following criteria before approving a transfer request:",
    points: [
      "No default on existing home loan EMIs in the last 12-24 months.",
      "The property must be ready-to-occupy or already possessed (under-construction property transfers depend on specific lender policies).",
      "A credit score (CIBIL) of 750+ is preferred for the lowest transfer rates.",
      "Stable income history to support the revised EMI structure."
    ]
  },
  // SEO Strategy: Target "Salaried vs Self Employed" refinancing benefits
  salaried: {
    title: "Balance Transfer for Salaried Employees",
    points: [
      "Salaried individuals working in MNCs, PSUs, or Government sectors often get the lowest 'repo-linked' interest rates.",
      "Option to avail a 'Top-Up Loan' (additional funding) at the same time as the transfer for home renovation or personal needs.",
      "Minimal documentation is required if the salary account is moved to the new lender."
    ]
  },
  selfEmployed: {
    title: "Balance Transfer for Self-employed / Business Owners",
    points: [
      "Ideal for business owners looking to reduce high-interest burdens from older loans.",
      "Lenders may assess the 'Banking Surrogate' (bank statement analysis) rather than just ITRs for transfer approval.",
      "Excellent opportunity to consolidate multiple business debts into one long-term home loan account via the Top-Up facility."
    ]
  },
  // SEO Strategy: Target "Process" and "Steps" keywords (mapped to Schema below)
  steps: {
    title: "Step-by-Step Process to Transfer Your Home Loan",
    intro: "Switching your loan involves coordination between your current and new lender. Follow these steps:",
    points: [
      "Request a 'Foreclosure Letter' and 'List of Documents (LOD)' from your current lender.",
      "Apply with the new lender and submit your KYC, Income Proof, and Property Papers.",
      "Once sanctioned, the new lender issues a cheque to your current lender to close the old account.",
      "Your old lender releases the 'Original Title Deeds', which are then handed over to the new lender.",
      "The new loan starts, and you begin paying the reduced EMI."
    ]
  }
};

// --- Sub-Components ---

const CheckIcon = () => (
  <div className="shrink-0 mt-1">
    <div className="bg-teal-500 rounded-full p-[3px] flex items-center justify-center">
      <Check size={12} className="text-white" strokeWidth={4} />
    </div>
  </div>
);

const ContentSection = ({ title, points, intro, isMainHeader = false }: SectionProps) => (
  <section className="mb-10">
    <h3 className={`${isMainHeader ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'} font-bold font-serif text-gray-900 mb-4`}>
      {title}
    </h3>
    {intro && <p className="text-gray-700 mb-5 text-[15px] leading-relaxed">{intro}</p>}
    <ul className="space-y-4">
      {points.map((point, index) => (
        <li key={index} className="flex items-start gap-3 group">
          <CheckIcon />
          <p className="text-gray-700 leading-relaxed text-[15px] group-hover:text-gray-900 transition-colors">
            {point}
          </p>
        </li>
      ))}
    </ul>
  </section>
);

// --- Main Component ---

export default function TransferProcessGuide() {
  
  // JSON-LD Schema for "HowTo" - High SEO Impact
  const howToSchema = {
    "@context": "http://schema.org",
    "@type": "HowTo",
    "name": "How to Transfer Home Loan",
    "description": "A step-by-step guide to switching your home loan to a new lender for lower interest rates.",
    "step": transferContent.steps.points.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "text": step
    }))
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 md:p-10 bg-white text-gray-800 rounded-xl shadow-sm border border-gray-100">
      
      {/* Injecting Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <h2 className="text-3xl md:text-4xl font-bold font-serif text-gray-900 mb-8 border-b pb-6">
        Guide to Home Loan Refinancing
      </h2>
      
      {/* Section 1: Eligibility */}
      <div className="bg-teal-50/50 p-6 rounded-lg mb-10 border border-teal-100">
        <ContentSection {...transferContent.eligibility} />
      </div>

      {/* Section 2: Borrower Segments */}
      <div className="mb-12 grid md:grid-cols-1 gap-8">
        <div>
            <h3 className="text-xl font-bold text-gray-500 uppercase tracking-wide mb-6">
                Borrower Segments
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
                 <ContentSection {...transferContent.salaried} />
                 <ContentSection {...transferContent.selfEmployed} />
            </div>
        </div>
      </div>

      {/* Section 3: The Process Steps */}
      <div className="bg-gray-50 p-6 md:p-8 rounded-xl border border-gray-200">
        <ContentSection 
          {...transferContent.steps} 
          isMainHeader={true}
        />
      </div>

    </div>
  );
}