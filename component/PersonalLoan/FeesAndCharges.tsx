import React from 'react';

// ==========================================
// 1. Data Definitions
// ==========================================

interface FeeRow {
  particulars: string;
  charges: React.ReactNode; // ReactNode allows strings or JSX (like bold text/divs)
}

interface FeeData {
  id: string; // Lookup ID
  title: string;
  description: string;
  linkText?: string; // Text for the link in the description
  rows: FeeRow[];
  footerNote?: string;
}

// ==========================================
// 2. Centralized Data (The "Database")
// ==========================================

const FEES_DATA: FeeData[] = [
  // 1. Personal Loan
  {
    id: 'personal-loan',
    title: "Personal Loan Processing Fees and Charges",
    description: "While fees vary by lender and credit profile, here is a broad range of standard charges:",
    linkText: "personal loan fees",
    rows: [
      { particulars: "Processing Fees", charges: "0.5% to 4% of loan amount + GST" },
      { 
        particulars: "Foreclosure Charges", 
        charges: (
          <div className="space-y-1">
            <p><span className="font-semibold text-gray-700">Floating Rate:</span> Nil</p>
            <p><span className="font-semibold text-gray-700">Fixed Rate:</span> 2% – 5% of principal outstanding</p>
          </div>
        )
      },
      { particulars: "Penal Interest", charges: "2% per month on overdue amount" },
      { particulars: "Duplicate Statement", charges: "₹ 200 - ₹ 500 per instance" },
      { particulars: "Cheque Bounce Charges", charges: "₹ 400 - ₹ 800 per bounce" },
    ],
    footerNote: "Other charges may include stamp duty and verification charges as per actuals."
  },
  // *** NEW ENTRY: Pre-approved Personal Loan ***
  {
    id: 'pre-approved-loan',
    title: "Fees for Pre-approved Personal Loans",
    description: "Since these loans are offered to existing customers, the fee structure is often subsidized or waived entirely:",
    linkText: "pre-approved loan charges",
    rows: [
      { particulars: "Processing Fees", charges: "Nil to 1.5% (Often waived during offers)" },
      { particulars: "Foreclosure Charges", charges: "Nil (after 6-12 EMIs)" },
      { particulars: "Documentation Charges", charges: "Nil (Digital Process)" },
      { particulars: "Stamp Duty", charges: "As per state actuals (deducted from loan amount)" },
      { particulars: "Part-Payment Charges", charges: "Nil" },
    ],
    footerNote: "Note: Some banks may charge a nominal 'Convenience Fee' for instant digital disbursement."
  },
  // 2. Home Loan
  {
    id: 'home-loan',
    title: "Home Loan Fees & Charges",
    description: "Home loans involve legal and technical costs in addition to standard banking fees:",
    linkText: "home loan charges",
    rows: [
      { particulars: "Processing Fees", charges: "0.25% to 1.00% of loan amount (often capped at ₹10k-₹25k)" },
      { particulars: "MODT / MOE Charges", charges: "0.2% to 0.5% of loan amount (State Govt Levy)" },
      { particulars: "Legal & Technical Fee", charges: "₹ 3,000 - ₹ 10,000 (As per actuals)" },
      { particulars: "Prepayment Charges", charges: "Nil for Floating Rate loans (Individual borrowers)" },
      { particulars: "Conversion Fees", charges: "0.5% of outstanding principal (to switch rates)" },
      { particulars: "CERSAI Charges", charges: "₹ 50 - ₹ 100" },
    ]
  },
  // 3. Business Loan
  {
    id: 'business-loan',
    title: "Business Loan Charges",
    description: "Business loans generally have higher processing fees due to the complexity of assessment:",
    rows: [
      { particulars: "Processing Fees", charges: "1.5% to 3.5% of loan amount" },
      { particulars: "Foreclosure Charges", charges: "4% to 6% of principal outstanding" },
      { particulars: "Documentation Charges", charges: "₹ 2,000 - ₹ 5,000" },
      { particulars: "Bounce Charges", charges: "₹ 750 - ₹ 1,500 per instance" },
      { particulars: "Renewal Fees", charges: "0.5% to 1% (For Cash Credit/Overdraft limits)" },
    ]
  },
  // 4. Transfer Personal Loan
  {
    id: 'transfer-personal-loan',
    title: "Balance Transfer Fees",
    description: "When switching lenders, factor in the costs of the new loan versus the savings:",
    rows: [
      { particulars: "Processing Fees", charges: "0.5% to 1.5% (Often waived for high credit scores)" },
      { particulars: "Foreclosure of Old Loan", charges: "Dependent on previous lender (0% to 4%)" },
      { particulars: "Stamp Duty", charges: "As per state laws" },
      { particulars: "Part-Payment Charges", charges: "Usually Nil if paid from own sources" },
    ]
  },
  // 5. Professional Loan
  {
    id: 'professional-loan',
    title: "Professional Loan Fees",
    description: "Doctors and CAs often enjoy concessional charges:",
    rows: [
      { particulars: "Processing Fees", charges: "Flat fee (₹ 1,999 to ₹ 5,000) or 0.5% to 1%" },
      { particulars: "Prepayment Penalty", charges: "Usually Nil after 6-12 months" },
      { particulars: "Insurance Premium", charges: "Optional (Loan Shield Insurance)" },
      { particulars: "Penal Charges", charges: "24% p.a. on overdue amount" },
    ]
  },
  // 6. Loan Against Property (LAP)
  {
    id: 'loan-against-property',
    title: "LAP Fees and Charges",
    description: "Secured loans like LAP have a detailed fee structure:",
    rows: [
      { particulars: "Processing Fees", charges: "0.5% to 1.5% of loan amount" },
      { particulars: "Valuation Charges", charges: "₹ 2,500 - ₹ 5,000 (paid to external valuer)" },
      { particulars: "Legal Scrutiny", charges: "₹ 3,000 - ₹ 6,000" },
      { particulars: "Foreclosure", charges: "Nil for individual borrowers on floating rates" },
      { particulars: "Statement Charges", charges: "₹ 500 for physical copy" },
    ]
  },
  // 7. Transfer Home Loan
  {
    id: 'transfer-home-loan',
    title: "Home Loan Transfer Costs",
    description: "Optimizing your home loan involves these one-time transfer costs:",
    rows: [
      { particulars: "Processing Fees", charges: "Flat ₹ 5,000 to 0.5% of loan amount" },
      { particulars: "MODT Charges", charges: "Payable again to register new mortgage (0.2%-0.5%)" },
      { particulars: "Legal/Title Search", charges: "As per actuals (approx ₹ 3,000)" },
      { particulars: "Franking Charges", charges: "Varies by state" },
    ]
  },
  // 8. Education Loan
  {
    id: 'education-loan',
    title: "Education Loan Tariffs",
    description: "Charges differ significantly for domestic vs foreign study loans:",
    rows: [
      { particulars: "Processing Fees (India)", charges: "Nil for most PSU banks" },
      { particulars: "Processing Fees (Abroad)", charges: "1% to 1.5% (Max cap usually ₹ 15,000)" },
      { particulars: "Prepayment Penalty", charges: "Nil" },
      { particulars: "Foreclosure Charges", charges: "Nil" },
      { particulars: "Legal/Valuation", charges: "As per actuals (if collateral is provided)" },
    ]
  },
  // 9. Loan Against Security
  {
    id: 'loan-against-security',
    title: "LAS Fees",
    description: "Since this is often an overdraft, fees are minimal:",
    rows: [
      { particulars: "Processing Fees", charges: "Flat ₹ 500 to 0.5% of limit" },
      { particulars: "Pledge Creation", charges: "₹ 50 - ₹ 100 per ISIN (Depository Charge)" },
      { particulars: "Pledge Invocation", charges: "As per DP tariff" },
      { particulars: "Annual Renewal Fee", charges: "₹ 1,000 - ₹ 2,000 p.a." },
      { particulars: "Foreclosure", charges: "Nil" },
    ]
  },
  // 10. Used Car Loan
  {
    id: 'used-car-loan',
    title: "Used Car Loan Charges",
    description: "Includes costs for vehicle verification and transfer:",
    rows: [
      { particulars: "Processing Fees", charges: "2% to 3% of loan amount" },
      { particulars: "Valuation Charges", charges: "₹ 500 - ₹ 800" },
      { particulars: "Stamp Duty", charges: "As per state actuals" },
      { particulars: "RC Transfer Charges", charges: "₹ 500 - ₹ 2,000 (Agent/RTO fees)" },
      { particulars: "Foreclosure", charges: "5% to 6% of principal outstanding" },
    ]
  },
  // 11. Used Bike Loan
  {
    id: 'used-bike-loan',
    title: "Used Bike Finance Fees",
    description: "Charges for financing pre-owned two-wheelers:",
    rows: [
      { particulars: "Processing Fees", charges: "3% of loan amount or min ₹ 1,000" },
      { particulars: "Documentation", charges: "₹ 500" },
      { particulars: "Valuation Fee", charges: "₹ 300 - ₹ 500" },
      { particulars: "Stamp Duty", charges: "As per state actuals" },
      { particulars: "Foreclosure", charges: "4% to 5% of outstanding" },
    ]
  },
  // 12. New Car Loan
  {
    id: 'new-car-loan',
    title: "New Car Loan Fees",
    description: "Standard charges for new vehicle financing:",
    rows: [
      { particulars: "Processing Fees", charges: "0.5% to 1% (Often waived during festivals)" },
      { particulars: "Documentation Charges", charges: "₹ 500 - ₹ 700" },
      { particulars: "Stamp Duty", charges: "As per state actuals" },
      { particulars: "Foreclosure (Fixed Rate)", charges: "5% of principal outstanding" },
      { particulars: "Part-Payment", charges: "Allowed after 12 months (charges apply)" },
    ]
  },
  // 13. New Bike Loan
  {
    id: 'new-bike-loan',
    title: "New Bike Loan Charges",
    description: "Minimal fees for new two-wheelers:",
    rows: [
      { particulars: "Processing Fees", charges: "1% to 3% of loan amount" },
      { particulars: "Hypothecation Charges", charges: "₹ 500 (Paid to RTO)" },
      { particulars: "Stamp Duty", charges: "₹ 100 - ₹ 300" },
      { particulars: "Bounce Charges", charges: "₹ 500 per bounce" },
      { particulars: "Foreclosure", charges: "4% of outstanding principal" },
    ]
  }
];

// ==========================================
// 3. The Presentational Component
// ==========================================

interface FeesAndChargesProps {
  data: FeeData;
  className?: string;
}

const FeesAndCharges: React.FC<FeesAndChargesProps> = ({ data, className }) => {
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
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          {data.title}
        </h2>
        <p className="text-gray-700 leading-relaxed text-sm md:text-base">
          {data.description}
          {data.linkText && (
             <>
               {' '}For a detailed breakdown of{' '}
               <a href="#" className="text-teal-500 font-medium hover:underline hover:text-teal-600 transition-colors">
                 {data.linkText}
               </a>
               , see below:
             </>
          )}
        </p>
      </div>

      

      {/* Table Section */}
      <div className="w-full overflow-x-auto rounded-lg border border-gray-100 md:border-0">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-teal-50 border-b border-teal-100">
              <th className="p-3 md:p-5 font-bold text-gray-900 w-2/5 text-sm md:text-base">
                Particulars
              </th>
              <th className="p-3 md:p-5 font-bold text-gray-900 w-3/5 text-sm md:text-base">
                Charges
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.rows.map((item, index) => (
              <tr 
                key={index} 
                className="hover:bg-teal-50/20 transition-colors duration-150"
              >
                <td className="p-3 md:p-5 text-gray-800 font-medium align-top text-sm md:text-base">
                  {item.particulars}
                </td>
                <td className="p-3 md:p-5 text-gray-600 align-top text-sm md:text-base">
                  {item.charges}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Note */}
      <div className="mt-6 pt-6 bg-white text-sm text-gray-600 italic border-t border-gray-100">
        {data.footerNote || "Other fees and charges levied by the lenders include documentation charges, verification charges, duplicate statement charges and NOC certificate charges."}
      </div>
    </div>
  );
};

// ==========================================
// 4. The Container Component (Use this)
// ==========================================

interface FeesContainerProps {
  id: string; // The ID to look up in the array
  className?: string;
}

export const FeesContainer: React.FC<FeesContainerProps> = ({ id, className }) => {
  // 1. Find Data
  const data = FEES_DATA.find((item) => item.id === id);

  // 2. Safety Check
  if (!data) {
    console.warn(`FeesContainer: No data found for id "${id}"`);
    return null;
  }

  // 3. Render
  return <FeesAndCharges data={data} className={className} />;
};

export default FeesContainer;