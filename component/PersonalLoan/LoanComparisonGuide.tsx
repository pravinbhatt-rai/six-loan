import React from 'react';

// ==========================================
// 1. Data Definitions
// ==========================================

interface ComparisonRow {
  parameter: string;
  col1Text: string;
  col2Text: string;
}

interface ComparisonGuideData {
  id: string; // Lookup ID
  productName: string; // Used for dynamic headers like "How to Calculate [Product] EMI"
  
  // EMI Section Data
  emiSectionTitle?: string;
  emiSectionIntro?: string; // If not provided, a default dynamic string is used
  
  // Comparison Section Data
  comparisonTitle: string;
  comparisonIntro: string;
  col1Header: string;
  col2Header: string;
  rows: ComparisonRow[];
}

// ==========================================
// 2. Centralized Data (The "Database")
// ==========================================

const COMPARISON_GUIDE_DATA: ComparisonGuideData[] = [
  // 1. Personal Loan
  {
    id: 'personal-loan',
    productName: "Personal Loan",
    comparisonTitle: "Personal Loan vs Credit Card Loan",
    comparisonIntro: "While both offer unsecured credit, the terms vary significantly. Understanding these differences helps in choosing the right tool for your financial needs.",
    col1Header: "Personal Loan",
    col2Header: "Credit Card Loan",
    rows: [
      { parameter: "Interest Rate", col1Text: "10.50% - 24% p.a.", col2Text: "36% - 42% p.a. (Finance charges)" },
      { parameter: "Loan Amount", col1Text: "Up to ₹ 40 Lakhs", col2Text: "Limited to available credit limit" },
      { parameter: "Repayment Tenure", col1Text: "12 to 60 months", col2Text: "3 to 24 months (usually)" },
      { parameter: "Processing Fee", col1Text: "0.5% - 2.5%", col2Text: "Often Nil or low processing fee" },
    ]
  },
  // 2. Business Loan (Using the user's specific text here as it fits perfectly)
  {
    id: 'business-loan',
    productName: "Business Loan",
    comparisonTitle: "Personal Loan or Business Loan - What should You Choose?",
    comparisonIntro: "Knowing whether you need a personal loan or a business loan can help you get the loan that suits your requirements the best.",
    col1Header: "Personal Loan",
    col2Header: "Business Loan",
    rows: [
      { parameter: "Purpose", col1Text: "Personal expenses (travel, medical, wedding)", col2Text: "Business needs (working capital, inventory, expansion)" },
      { parameter: "Eligibility", col1Text: "Based on individual income & credit score", col2Text: "Based on turnover, GST returns, & business vintage" },
      { parameter: "Documentation", col1Text: "Minimal (KYC, Salary Slips)", col2Text: "Extensive (GST, ITR, Financial Statements)" },
      { parameter: "Loan Amount", col1Text: "Rs. 25k to Rs. 40 Lakh", col2Text: "Rs. 1 Lakh to Rs. 2 Crore+" },
      { parameter: "Tax Benefits", col1Text: "None on interest", col2Text: "Interest is a tax-deductible expense" },
    ]
  },
  // 3. Home Loan
  {
    id: 'home-loan',
    productName: "Home Loan",
    comparisonTitle: "Fixed Rate vs Floating Rate Home Loan",
    comparisonIntro: "Choosing the right interest rate regime is the most critical decision for a long-term liability like a home loan.",
    col1Header: "Fixed Rate",
    col2Header: "Floating Rate",
    rows: [
      { parameter: "Interest Rate", col1Text: "Constant throughout the fixed period", col2Text: "Linked to Repo Rate (Changes with RBI policy)" },
      { parameter: "Cost", col1Text: "Usually 1-2% higher", col2Text: "Cheaper than fixed rates" },
      { parameter: "Prepayment Penalty", col1Text: "Up to 2-4% charges applicable", col2Text: "Nil (Zero charges for individuals)" },
      { parameter: "Risk", col1Text: "Protected from market rate hikes", col2Text: "Subject to market fluctuations" },
    ]
  },
  // 4. Transfer Personal Loan
  {
    id: 'transfer-personal-loan',
    productName: "Balance Transfer",
    comparisonTitle: "Balance Transfer vs Top-Up Loan",
    comparisonIntro: "Should you just move your loan or take extra money? Here is a comparison to help you decide.",
    col1Header: "Balance Transfer",
    col2Header: "Top-Up Loan",
    rows: [
      { parameter: "Primary Goal", col1Text: "Reduce Interest Rate", col2Text: "Get Additional Funds" },
      { parameter: "Interest Rate", col1Text: "New lower market rate", col2Text: "Usually same as existing loan rate" },
      { parameter: "Processing", col1Text: "Treats as a fresh application", col2Text: "Minimal documentation required" },
      { parameter: "Cost", col1Text: "Foreclosure charges on old loan", col2Text: "Processing fee on new amount" },
    ]
  },
  // 5. Professional Loan
  {
    id: 'professional-loan',
    productName: "Professional Loan",
    comparisonTitle: "Professional Loan vs Normal Business Loan",
    comparisonIntro: "Doctors and CAs have access to specialized credit. See why it's better than a standard business loan.",
    col1Header: "Professional Loan",
    col2Header: "Business Loan",
    rows: [
      { parameter: "Basis", col1Text: "Qualification (Degree/COP)", col2Text: "Business Turnover & Profit" },
      { parameter: "Collateral", col1Text: "Unsecured up to ₹ 50L - ₹ 75L", col2Text: "Usually secured for high amounts" },
      { parameter: "Rate of Interest", col1Text: "Starting 10.50%", col2Text: "Starting 13.00%+" },
      { parameter: "Processing", col1Text: "Green Channel (Fast)", col2Text: "Standard verification process" },
    ]
  },
  // 6. Loan Against Property
  {
    id: 'loan-against-property',
    productName: "Loan Against Property",
    comparisonTitle: "Loan Against Property vs Personal Loan",
    comparisonIntro: "Comparing a secured mortgage loan against an unsecured personal loan.",
    col1Header: "Loan Against Property",
    col2Header: "Personal Loan",
    rows: [
      { parameter: "Interest Rate", col1Text: "8.50% - 10.50%", col2Text: "10.50% - 16.00%" },
      { parameter: "Tenure", col1Text: "Up to 15 Years", col2Text: "Up to 5 Years" },
      { parameter: "LTV Ratio", col1Text: "60-70% of Property Value", col2Text: "Multiplier of Monthly Income" },
      { parameter: "Processing Time", col1Text: "10-15 Days (Legal check)", col2Text: "Instant / 2-3 Days" },
    ]
  },
  // 7. Transfer Home Loan
  {
    id: 'transfer-home-loan',
    productName: "Home Loan Transfer",
    comparisonTitle: "External Transfer vs Internal Repricing",
    comparisonIntro: "You can switch banks or ask your current bank to lower the rate. Which is better?",
    col1Header: "Balance Transfer (Switch)",
    col2Header: "Internal Repricing (Stay)",
    rows: [
      { parameter: "Interest Rate", col1Text: "Best market rate", col2Text: "Reduced rate (may not be best)" },
      { parameter: "Effort", col1Text: "Full documentation & KYC", col2Text: "Simple application letter" },
      { parameter: "Cost", col1Text: "Processing Fee + MODT Charges", col2Text: "Conversion Fee (approx 0.5%)" },
      { parameter: "Benchmark", col1Text: "Switches to Repo Rate (RLLR)", col2Text: "May remain on MCLR" },
    ]
  },
  // 8. Education Loan
  {
    id: 'education-loan',
    productName: "Education Loan",
    comparisonTitle: "Education Loan vs Personal Loan for Studies",
    comparisonIntro: "Why specialized education loans are preferred over using personal funds.",
    col1Header: "Education Loan",
    col2Header: "Personal Loan",
    rows: [
      { parameter: "Tax Benefit", col1Text: "Sec 80E (Interest Deductible)", col2Text: "No Tax Benefit" },
      { parameter: "Moratorium", col1Text: "Payment holiday during course", col2Text: "EMI starts immediately" },
      { parameter: "Tenure", col1Text: "Up to 15 Years", col2Text: "Up to 5 Years" },
      { parameter: "Co-Applicant", col1Text: "Mandatory", col2Text: "Not always required" },
    ]
  },
  // 9. Loan Against Security
  {
    id: 'loan-against-security',
    productName: "Loan Against Securities",
    comparisonTitle: "LAS vs Selling Investments",
    comparisonIntro: "Should you pledge your shares or sell them when you need cash?",
    col1Header: "Loan Against Security",
    col2Header: "Selling Investments",
    rows: [
      { parameter: "Ownership", col1Text: "Retain ownership & future gains", col2Text: "Ownership lost" },
      { parameter: "Taxation", col1Text: "No Capital Gains Tax", col2Text: "Capital Gains Tax applies" },
      { parameter: "Dividends/Bonus", col1Text: "You continue to receive them", col2Text: "You lose future income" },
      { parameter: "Cost", col1Text: "Interest on used amount", col2Text: "Opportunity cost of growth" },
    ]
  },
  // 10. Used Car Loan
  {
    id: 'used-car-loan',
    productName: "Used Car Loan",
    comparisonTitle: "Used Car Loan vs Personal Loan",
    comparisonIntro: "Financing a pre-owned car can be done via two routes.",
    col1Header: "Used Car Loan",
    col2Header: "Personal Loan",
    rows: [
      { parameter: "Collateral", col1Text: "Car is Hypothecated", col2Text: "Unsecured (No Hypothecation)" },
      { parameter: "Valuation", col1Text: "Mandatory by Bank", col2Text: "Not Required" },
      { parameter: "LTV", col1Text: "70-80% of Car Value", col2Text: "Based on Income Eligibility" },
      { parameter: "Interest Rate", col1Text: "12% - 16%", col2Text: "10.5% - 15% (Profile dependent)" },
    ]
  },
  // 11. Used Bike Loan
  {
    id: 'used-bike-loan',
    productName: "Used Bike Loan",
    comparisonTitle: "Financing vs Cash Purchase",
    comparisonIntro: "Used bikes are cheaper, but financing them attracts high costs.",
    col1Header: "Used Bike Loan",
    col2Header: "Cash / Personal Savings",
    rows: [
      { parameter: "Cost of Ownership", col1Text: "High (Interest 18-24%)", col2Text: "Lowest (No Interest)" },
      { parameter: "Ownership", col1Text: "Hypothecated to Bank", col2Text: "Direct Ownership" },
      { parameter: "Insurance", col1Text: "Comprehensive Mandatory", col2Text: "Third-Party Sufficient" },
      { parameter: "Documentation", col1Text: "KYC, Income & Asset Check", col2Text: "Immediate Transfer" },
    ]
  },
  // 12. New Car Loan
  {
    id: 'new-car-loan',
    productName: "New Car Loan",
    comparisonTitle: "Bank Loan vs Dealer Finance",
    comparisonIntro: "Where should you source your car funding from?",
    col1Header: "Direct Bank Loan",
    col2Header: "Dealer Finance",
    rows: [
      { parameter: "Transparency", col1Text: "High transparency on fees", col2Text: "May include hidden commissions" },
      { parameter: "Interest Rate", col1Text: "Often negotiable", col2Text: "Usually fixed standard rates" },
      { parameter: "Choices", col1Text: "Choice of any bank", col2Text: "Limited to dealer tie-ups" },
      { parameter: "Convenience", col1Text: "Moderate (Branch/Online)", col2Text: "High (One-stop shop)" },
    ]
  },
  // 13. New Bike Loan
  {
    id: 'new-bike-loan',
    productName: "Two-Wheeler Loan",
    comparisonTitle: "Bike Loan vs Credit Card EMI",
    comparisonIntro: "For smaller amounts like bike purchases, plastic money is a strong competitor.",
    col1Header: "Bike Loan",
    col2Header: "Credit Card EMI",
    rows: [
      { parameter: "Tenure", col1Text: "Up to 3-4 years", col2Text: "Up to 12-24 months" },
      { parameter: "Hypothecation", col1Text: "Yes (RC marked)", col2Text: "No (Unsecured)" },
      { parameter: "Processing Fee", col1Text: "Standard charges apply", col2Text: "Processing fee + GST on interest" },
      { parameter: "Documentation", col1Text: "KYC & Income Proof", col2Text: "Instant / No Documentation" },
    ]
  }
];

// ==========================================
// 3. Sub-Components
// ==========================================

const TableRow = ({ row, isLast }: { row: ComparisonRow; isLast: boolean }) => (
  <tr className={`border-b border-gray-200 ${isLast ? 'border-none' : ''} hover:bg-teal-50/20 transition-colors`}>
    <td className="p-3 md:p-5 align-top font-semibold text-gray-900 w-1/4 min-w-[140px] bg-gray-50/50 text-sm md:text-base">
      {row.parameter}
    </td>
    <td className="p-3 md:p-5 align-top text-gray-700 w-[37.5%] leading-relaxed border-l border-gray-100 text-sm md:text-base">
      {row.col1Text}
    </td>
    <td className="p-3 md:p-5 align-top text-gray-700 w-[37.5%] leading-relaxed border-l border-gray-100 text-sm md:text-base">
      {row.col2Text}
    </td>
  </tr>
);

// ==========================================
// 4. The Presentation Component
// ==========================================

interface GuideProps {
  data: ComparisonGuideData;
  className?: string;
}

const LoanComparisonGuide: React.FC<GuideProps> = ({ data, className }) => {
  return (
    <div className={`
      max-w-6xl mx-auto mb-8 bg-white text-gray-800 font-serif
      p-4 md:p-8
      border-0 md:border md:border-gray-200
      rounded-none md:rounded-3xl
      shadow-none md:shadow-sm
      ${className || ''}
    `}>
      
      {/* Section 1: EMI Calculation Info */}
      <section className="mb-8 md:mb-12">
        <h2 className="text-2xl md:text-3xl font-bold font-serif text-gray-900 mb-4">
          {data.emiSectionTitle || `How to Calculate ${data.productName} EMI Online?`}
        </h2>
        <p className="text-gray-700 leading-relaxed text-sm md:text-base">
          {data.emiSectionIntro || (
            <>
              You can calculate your {data.productName.toLowerCase()} EMI using a free{' '}
              <span className="text-teal-500 cursor-pointer hover:underline font-medium">
                online {data.productName.toLowerCase()} EMI calculator
              </span>.
              You just need to enter your interest rate, loan amount and tenure in the calculator to get instant and accurate results.
            </>
          )}
        </p>
      </section>

      {/* Section 2: Comparison Intro */}
      <section className="mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-bold font-serif text-gray-900 mb-4">
          {data.comparisonTitle} 
        </h2>
        <p className="text-gray-700 leading-relaxed mb-6 text-sm md:text-base">
          {data.comparisonIntro}
        </p>
      </section>

      {/* Section 3: Comparison Table */}
      <section className="mb-8 overflow-hidden rounded-lg border border-gray-200 md:border-0 shadow-sm md:shadow-none">
        <div className="overflow-x-auto border-0 md:border md:border-gray-200 md:rounded-lg">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-teal-50 text-gray-900 border-b border-teal-100">
                <th className="p-3 md:p-5 font-bold w-1/4 text-sm md:text-base">Parameter</th>
                <th className="p-3 md:p-5 font-bold w-[37.5%] border-l border-teal-100 text-sm md:text-base">
                  {data.col1Header}
                </th>
                <th className="p-3 md:p-5 font-bold w-[37.5%] border-l border-teal-100 text-sm md:text-base">
                  {data.col2Header}
                </th>
              </tr>
            </thead>
            <tbody>
              {data.rows.map((row, index) => (
                <TableRow 
                  key={index} 
                  row={row} 
                  isLast={index === data.rows.length - 1} 
                />
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Footer Note */}
      <footer className="text-sm text-gray-500 italic border-t border-gray-100 pt-4">
        Note: Details may vary depending on the loan type, applicant’s profile and other factors.
      </footer>

    </div>
  );
};

// ==========================================
// 5. The Container Component (Use this)
// ==========================================

interface ComparisonContainerProps {
  id: string; // The ID to look up in the array
  className?: string;
}

export const LoanComparisonGuideContainer: React.FC<ComparisonContainerProps> = ({ id, className }) => {
  // 1. Find Data
  const data = COMPARISON_GUIDE_DATA.find((item) => item.id === id);

  // 2. Safety Check
  if (!data) {
    console.warn(`LoanComparisonGuideContainer: No data found for id "${id}"`);
    return null;
  }

  // 3. Render
  return <LoanComparisonGuide data={data} className={className} />;
};

export default LoanComparisonGuideContainer;