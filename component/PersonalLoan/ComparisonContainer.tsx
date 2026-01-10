import React from 'react';

// ==========================================
// 1. Data Definitions
// ==========================================

interface ComparisonRow {
  col1: string;
  col2: string;
}

interface ComparisonData {
  id: string; // The lookup key
  title: string;
  description: string;
  col1Header: string;
  col2Header: string;
  rows: ComparisonRow[];
}

// ==========================================
// 2. Centralized Data (The "Database")
// ==========================================

const COMPARISON_DATA: ComparisonData[] = [
  // 1. Personal Loan (Instant vs Regular)
  {
    id: 'personal-loan',
    title: "Instant vs Regular Personal Loan",
    description: "Understanding the difference between pre-approved instant loans and standard personal loans.",
    col1Header: "Instant Personal Loan",
    col2Header: "Regular Personal Loan",
    rows: [
      { col1: "Disbursed in minutes/seconds", col2: "Disbursal takes 2-4 days" },
      { col1: "No documentation (KYC based)", col2: "Requires income proofs & bank statements" },
      { col1: "Offer amount is fixed/capped", col2: "Higher amounts based on eligibility" },
      { col1: "Existing customers only", col2: "Open to new & existing customers" }
    ]
  },
  // *** NEW ENTRY: Pre-approved Personal Loan ***
  {
    id: 'pre-approved-loan',
    title: "Pre-approved vs Regular Personal Loan",
    description: "Pre-approved loans offer speed and convenience, but how do they stack up against standard loans?",
    col1Header: "Pre-approved Loan",
    col2Header: "Regular Personal Loan",
    rows: [
      { col1: "Instant Disbursal (0-24 hrs)", col2: "Standard Processing (2-7 Days)" },
      { col1: "Zero Physical Documentation", col2: "Requires Salary Slips/ITR & KYC" },
      { col1: "Interest Rates often lower/preferential", col2: "Standard market interest rates" },
      { col1: "Invite-only (Basis relationship)", col2: "Open to all eligible applicants" },
      { col1: "Loan Amount is non-negotiable", col2: "Loan Amount can be negotiated" }
    ]
  },
  // 2. Home Loan (Fixed vs Floating)
  {
    id: 'home-loan',
    title: "Fixed Rate vs Floating Rate Home Loan",
    description: "Choosing the right interest rate regime is crucial for long-term savings.",
    col1Header: "Fixed Rate Loan",
    col2Header: "Floating Rate Loan",
    rows: [
      { col1: "Interest rate remains constant", col2: "Rate changes with RBI Repo Rate" },
      { col1: "Protection against market rate hikes", col2: "Benefit from future rate cuts" },
      { col1: "Usually 1-2% higher than floating", col2: "Cheaper than fixed rates" },
      { col1: "Prepayment penalty applies", col2: "Zero prepayment penalty" }
    ]
  },
  // 3. Business Loan (Secured vs Unsecured)
  {
    id: 'business-loan',
    title: "Secured vs Unsecured Business Loan",
    description: "Deciding whether to pledge assets or go collateral-free.",
    col1Header: "Unsecured Business Loan",
    col2Header: "Secured Business Loan",
    rows: [
      { col1: "No collateral required", col2: "Requires property/asset pledge" },
      { col1: "Higher interest rates (14%+)", col2: "Lower interest rates (9-12%)" },
      { col1: "Loan amount capped (up to 75L)", col2: "High loan amounts (up to 5Cr+)" },
      { col1: "Based on turnover & banking", col2: "Based on property value & income" }
    ]
  },
  // 4. Transfer Personal Loan (Transfer vs Top-Up)
  {
    id: 'transfer-personal-loan',
    title: "Balance Transfer vs Top-Up Loan",
    description: "Two ways to manage your existing personal loan.",
    col1Header: "Balance Transfer",
    col2Header: "Top-Up Loan",
    rows: [
      { col1: "Shifting loan to new bank", col2: "Taking extra money on existing loan" },
      { col1: "Reduces interest rate", col2: "Rate usually same as existing loan" },
      { col1: "Used to reduce EMI burden", col2: "Used for new financial needs" },
      { col1: "Foreclosure charges apply on old loan", col2: "Processing fee applies on extra amount" }
    ]
  },
  // 5. Professional Loan (Professional vs Business)
  {
    id: 'professional-loan',
    title: "Professional Loan vs Business Loan",
    description: "Why doctors and CAs should opt for specialized professional loans.",
    col1Header: "Professional Loan",
    col2Header: "Normal Business Loan",
    rows: [
      { col1: "Based on Degree/Qualification", col2: "Based on Business Turnover" },
      { col1: "Lower interest rates", col2: "Higher interest rates" },
      { col1: "Minimal documentation", col2: "Requires extensive financials/audits" },
      { col1: "No collateral (up to 50L)", col2: "Collateral needed for high amounts" }
    ]
  },
  // 6. Loan Against Property (LAP vs Personal Loan)
  {
    id: 'loan-against-property',
    title: "Loan Against Property vs Personal Loan",
    description: "Comparing secured property loans against unsecured personal loans.",
    col1Header: "Loan Against Property",
    col2Header: "Personal Loan",
    rows: [
      { col1: "Interest Rate: 8.5% - 10%", col2: "Interest Rate: 10.5% - 16%" },
      { col1: "Tenure: Up to 15 Years", col2: "Tenure: Up to 5 Years" },
      { col1: "Loan Amount: High (Crores)", col2: "Loan Amount: Capped (Lakhs)" },
      { col1: "Processing: 10-15 Days", col2: "Processing: 24-48 Hours" }
    ]
  },
  // 7. Transfer Home Loan (External Transfer vs Internal Repricing)
  {
    id: 'transfer-home-loan',
    title: "Balance Transfer vs Internal Repricing",
    description: "Should you switch banks or negotiate with your current one?",
    col1Header: "Balance Transfer",
    col2Header: "Internal Repricing",
    rows: [
      { col1: "Switch to a new lender", col2: "Stay with current lender" },
      { col1: "Get lowest market rate", col2: "Rate reduced but maybe not lowest" },
      { col1: "Requires full documentation", col2: "Requires just a request letter" },
      { col1: "Cost: Processing Fee + MODT", col2: "Cost: Conversion Fee only" }
    ]
  },
  // 8. Education Loan (Secured vs Unsecured)
  {
    id: 'education-loan',
    title: "Secured vs Unsecured Education Loan",
    description: "Funding your studies with or without collateral.",
    col1Header: "Secured (With Collateral)",
    col2Header: "Unsecured (Without Collateral)",
    rows: [
      { col1: "Interest Rate: 8.5% - 10%", col2: "Interest Rate: 11% - 14%" },
      { col1: "Loan Amount: No limit (based on value)", col2: "Loan Amount: Capped (e.g., 40L)" },
      { col1: "Parent income less critical", col2: "Co-applicant income is critical" },
      { col1: "Processing takes time (Legal)", col2: "Faster processing" }
    ]
  },
  // 9. Loan Against Security (LAS vs Personal Loan)
  {
    id: 'loan-against-security',
    title: "Loan Against Securities vs Personal Loan",
    description: "Why pledging assets is cheaper than an unsecured loan.",
    col1Header: "Loan Against Securities",
    col2Header: "Personal Loan",
    rows: [
      { col1: "Rate: 9% - 11%", col2: "Rate: 11% - 16%" },
      { col1: "Pay interest only on used amount", col2: "Pay interest on full loan amount" },
      { col1: "No foreclosure charges", col2: "Foreclosure charges apply" },
      { col1: "Requires Shares/MFs", col2: "Requires Income Proof" }
    ]
  },
  // 10. Used Car Loan (Used Car Loan vs Personal Loan)
  {
    id: 'used-car-loan',
    title: "Used Car Loan vs Personal Loan",
    description: "How to fund your second-hand car purchase.",
    col1Header: "Used Car Loan",
    col2Header: "Personal Loan",
    rows: [
      { col1: "Secured (Car is hypothecated)", col2: "Unsecured (Car not hypothecated)" },
      { col1: "LTV: 70-80% of valuation", col2: "Amount based on salary eligibility" },
      { col1: "Rate: 12% - 16%", col2: "Rate: 10.5% - 15% (can be lower)" },
      { col1: "Rc Transfer mandatory for loan", col2: "Rc Transfer is independent" }
    ]
  },
  // 11. Used Bike Loan (Finance vs Cash)
  {
    id: 'used-bike-loan',
    title: "Used Bike Loan vs Personal Loan",
    description: "Comparing financing options for two-wheelers.",
    col1Header: "Used Bike Loan",
    col2Header: "Personal Loan",
    rows: [
      { col1: "Very high interest (18-24%)", col2: "Moderate interest (11-16%)" },
      { col1: "Vehicle is collateral", col2: "No collateral" },
      { col1: "Physical verification required", col2: "Digital verification" },
      { col1: "Down payment required", col2: "100% funding possible" }
    ]
  },
  // 12. New Car Loan (Bank vs Dealer)
  {
    id: 'new-car-loan',
    title: "Bank Loan vs Dealer Finance",
    description: "Where should you get your new car loan from?",
    col1Header: "Direct Bank Loan",
    col2Header: "Dealer Finance",
    rows: [
      { col1: "Transparent charges", col2: "Convenient but may hide costs" },
      { col1: "Negotiable interest rates", col2: "Rates often fixed/higher" },
      { col1: "No obligation to buy accessories", col2: "Might bundle insurance/accessories" },
      { col1: "Pre-approved options available", col2: "Instant approval at showroom" }
    ]
  },
  // 13. New Bike Loan (Secured vs Credit Card EMI)
  {
    id: 'new-bike-loan',
    title: "Bike Loan vs Credit Card EMI",
    description: "Two popular ways to buy a new two-wheeler.",
    col1Header: "Two-Wheeler Loan",
    col2Header: "Credit Card EMI",
    rows: [
      { col1: "Tenure up to 3-4 years", col2: "Tenure up to 12-24 months" },
      { col1: "Hypothecation on RC", col2: "No Hypothecation on RC" },
      { col1: "Processing fee applies", col2: "Processing fee + GST on interest" },
      { col1: "Lower interest rate (usually)", col2: "Higher effective rate" }
    ]
  }
];

// ==========================================
// 3. The Presentational Component
// ==========================================

interface ComparisonProps {
  data: ComparisonData;
  className?: string;
}

const LoanComparisonTable: React.FC<ComparisonProps> = ({ data, className }) => {
  return (
    <div className={`
      max-w-6xl mx-auto mb-8 bg-white text-gray-800 font-serif
      p-4 md:p-8
      border-0 md:border md:border-gray-200
      rounded-none md:rounded-3xl
      shadow-none md:shadow-sm
      ${className || ''}
    `}>
      
      {/* Header Section */}
      <div className="mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          {data.title}
        </h2>
        <p className="text-gray-700 leading-relaxed text-sm md:text-base">
          {data.description}
        </p>
      </div>

      {/* Table Section */}
      <div className="w-full overflow-x-auto rounded-lg border border-gray-100 md:border-0">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-teal-50 border-b border-teal-100">
              <th className="p-3 md:p-5 font-bold text-gray-900 w-1/2 text-sm md:text-base">
                {data.col1Header}
              </th>
              <th className="p-3 md:p-5 font-bold text-gray-900 w-1/2 text-sm md:text-base">
                {data.col2Header}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.rows.map((row, index) => (
              <tr 
                key={index} 
                className="hover:bg-teal-50/20 transition-colors duration-150"
              >
                <td className="p-3 md:p-5 text-gray-700 align-top leading-relaxed text-sm md:text-base">
                  {row.col1}
                </td>
                <td className="p-3 md:p-5 text-gray-700 align-top leading-relaxed text-sm md:text-base">
                  {row.col2}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    </div>
  );
};

// ==========================================
// 4. The Container Component (Use this)
// ==========================================

interface ComparisonContainerProps {
  id: string; // The ID to look up in the array
  className?: string;
}

export const ComparisonContainer: React.FC<ComparisonContainerProps> = ({ id, className }) => {
  // 1. Find Data
  const data = COMPARISON_DATA.find((item) => item.id === id);

  // 2. Safety Check
  if (!data) {
    console.warn(`ComparisonContainer: No data found for id "${id}"`);
    return null;
  }

  // 3. Render
  return <LoanComparisonTable data={data} className={className} />;
};

export default ComparisonContainer;