import React from 'react';

// ==========================================
// 1. Data Definitions
// ==========================================

interface LoanInfoData {
  id: string; // Lookup ID
  
  // Section 1: Tips
  tipsTitle: string;
  tipsIntro: string;
  tips: string[];

  // Section 2: Facts
  factsTitle: string;
  facts: string[];
  
  // Footer
  footerNote?: React.ReactNode; // Optional footer text/link
}

// ==========================================
// 2. Centralized Data (The "Database")
// ==========================================

const LOAN_INFO_DATA: LoanInfoData[] = [
  // 1. Personal Loan
  {
    id: 'personal-loan',
    tipsTitle: "5 Tips to Increase Your Chances of Getting a Personal Loan",
    tipsIntro: "Those planning to avail personal loan can improve their chances of approval through these tips:",
    tips: [
      "Maintain your credit/CIBIL score above 750.",
      "Check for inaccuracies in your credit report to avoid rejection.",
      "Compare the offers available from banks and NBFCs before finalising.",
      "Apply for the loan from a bank where you have an existing relationship.",
      "Avoid making multiple loan applications within a short span of time."
    ],
    factsTitle: "Quick Facts about Personal Loans",
    facts: [
      "Borrowers with income below Rs. 5 lakh opted for unsecured personal loans more.",
      "Largest share of outstanding loans is contributed by borrowers earning Rs. 5-15 Lakh.",
      "Almost 50% of the borrowers availing personal loans have an additional loan outstanding.",
      "Processing time is usually under 24 hours for pre-approved customers.",
      "No collateral or security is required for personal loans."
    ],
    footerNote: <>Note: <a href="#" className="text-teal-500 hover:underline">Data as per RBI’s Financial Stability Report</a></>
  },
  // 2. Home Loan
  {
    id: 'home-loan',
    tipsTitle: "Tips for a Smooth Home Loan Approval",
    tipsIntro: "A home loan is a long-term commitment. Ensure you get the best deal with these steps:",
    tips: [
      "Ensure your Credit Score is 750+ to access RLLR linked lower rates.",
      "Co-apply with a spouse to increase loan eligibility and tax benefits.",
      "Save up for a higher down payment (20%+) to reduce the loan burden.",
      "Check if the property project is pre-approved by the lender.",
      "Keep all property documents (Title Deed, OC, Plan) ready for legal verification."
    ],
    factsTitle: "Home Loan Facts",
    facts: [
      "Home loans offer the longest tenure (up to 30 years) among all loan products.",
      "Interest paid is tax-deductible under Section 24(b) up to Rs. 2 Lakhs.",
      "Principal repayment is deductible under Section 80C up to Rs. 1.5 Lakhs.",
      "LTV ratio is usually capped at 90% for loans up to Rs. 30 Lakhs.",
      "There are zero prepayment charges for individual borrowers on floating rates."
    ]
  },
  // 3. Business Loan
  {
    id: 'business-loan',
    tipsTitle: "How to Secure Business Funding",
    tipsIntro: "Lenders look for business stability. Improve your odds with these pointers:",
    tips: [
      "Ensure your ITR and GST returns match your bank statement turnover.",
      "Maintain a vintage of at least 3 years for unsecured loans.",
      "Avoid cash transactions; route business revenue through the current account.",
      "Prepare a solid business plan if applying for a term loan for expansion.",
      "Check eligibility for government schemes like CGTMSE for collateral-free loans."
    ],
    factsTitle: "Business Finance Insights",
    facts: [
      "Interest paid on business loans is a tax-deductible business expense.",
      "Unsecured business loans are capped typically at Rs. 50-75 Lakhs.",
      "Lenders heavily weigh the 'Average Bank Balance' (ABB) for eligibility.",
      "Disbursal time varies from 3 days (Unsecured) to 15 days (Secured).",
      "Startups less than 2 years old usually require a co-applicant or collateral."
    ]
  },
  // 4. Transfer Personal Loan
  {
    id: 'transfer-personal-loan',
    tipsTitle: "Checklist for Balance Transfer",
    tipsIntro: "Switching lenders? Make sure it's worth it:",
    tips: [
      "Only switch if the interest rate difference is at least 2-3%.",
      "Calculate the processing fee of the new loan vs interest saved.",
      "Ensure you have paid at least 6-12 EMIs on the existing loan.",
      "Negotiate for a waiver on processing fees with the new lender.",
      "Check for a Top-Up facility to consolidate other debts."
    ],
    factsTitle: "Transfer Facts",
    facts: [
      "Balance transfer treats your application as a fresh loan request.",
      "It allows you to reset the tenure (increase or decrease).",
      "Foreclosure charges on the old loan (if fixed rate) can eat into savings.",
      "Your credit score might dip slightly due to a new hard enquiry.",
      "Most beneficial in the first half of the loan tenure."
    ]
  },
  // 5. Professional Loan
  {
    id: 'professional-loan',
    tipsTitle: "Maximizing Professional Loans",
    tipsIntro: "Doctors and CAs get special privileges. Here is how to use them:",
    tips: [
      "Use your highest degree (MD/MS/FCA) to negotiate better rates.",
      "Keep your Certificate of Practice (COP) valid and updated.",
      "Apply through 'Green Channel' programs for faster processing.",
      "Separate your personal and clinic/office bank accounts.",
      "Ensure you have professional indemnity insurance if required."
    ],
    factsTitle: "Facts for Professionals",
    facts: [
      "Doctors can get up to Rs. 50 Lakhs without collateral.",
      "Interest rates are generally 1-2% lower than standard personal loans.",
      "Loan tenure can go up to 60 or 72 months.",
      "Gross Receipts are considered instead of Net Profit for eligibility.",
      "Part-disbursement options are available for clinic construction."
    ]
  },
  // 6. Loan Against Property
  {
    id: 'loan-against-property',
    tipsTitle: "Getting the Best LAP Deal",
    tipsIntro: "Mortgaging property is a big decision. Keep these in mind:",
    tips: [
      "Ensure the property has no legal disputes or encroachments.",
      "Self-occupied residential properties get the lowest interest rates.",
      "Apply for a Drop-line Overdraft (DOD) if you need working capital.",
      "Co-owners of the property must be co-applicants on the loan.",
      "Check the LTV ratio; commercial properties get lower funding."
    ],
    factsTitle: "LAP Quick Facts",
    facts: [
      "Cheaper than personal loans by 2% to 5%.",
      "Tenures extend up to 15 years, lowering the EMI burden.",
      "Funding is usually 60-70% of the property's market value.",
      "Processing takes longer (10-15 days) due to legal checks.",
      "Can be used for any purpose except speculative activities."
    ]
  },
  // 7. Transfer Home Loan
  {
    id: 'transfer-home-loan',
    tipsTitle: "Home Loan Switch Guidelines",
    tipsIntro: "Before moving your mortgage, verify these details:",
    tips: [
      "Ensure the new loan is linked to an external benchmark (Repo Rate).",
      "Collect the 'List of Documents' (LOD) from your current lender promptly.",
      "Factor in MODT (Memorandum of Deposit of Title Deed) charges.",
      "Avoid switching if you plan to sell the house soon.",
      "Check if your current lender will match the competitor's rate (Conversion)."
    ],
    factsTitle: "Transfer Realities",
    facts: [
      "Offers the opportunity to reduce tenure and save lakhs in interest.",
      "Top-up loans taken during transfer are usually unrestricted in usage.",
      "You must have a clear repayment track record of 12+ months.",
      "Stamp duty charges may apply again depending on the state.",
      "It is the best time to remove or add co-applicants."
    ]
  },
  // 8. Education Loan
  {
    id: 'education-loan',
    tipsTitle: "Student Loan Application Tips",
    tipsIntro: "Secure your funding for higher studies efficiently:",
    tips: [
      "Apply as soon as you receive the admission letter.",
      "If studying abroad, check for Pre-Visa Disbursement options.",
      "Ensure your co-applicant (parent) has a clean credit history.",
      "Compare secured (with collateral) vs unsecured loan rates.",
      "Check for scholarship adjustments in the loan amount."
    ],
    factsTitle: "Education Loan Facts",
    facts: [
      "Interest paid is 100% tax-deductible under Section 80E for 8 years.",
      "Moratorium period covers the course duration + 6 to 12 months.",
      "Govt schemes allow interest subsidy for EWS categories.",
      "Loans for premier institutes (IIM/IIT) usually need no collateral.",
      "Expenses covered include tuition, hostel, laptop, and travel."
    ]
  },
  // 9. Loan Against Security
  {
    id: 'loan-against-security',
    tipsTitle: "Pledging Shares Smartly",
    tipsIntro: "Don't sell your investments; pledge them. Here is how:",
    tips: [
      "Check the bank's 'Approved List' of shares and mutual funds.",
      "Prefer an Overdraft facility so you pay interest only on what you use.",
      "Ensure your Demat account is active and KYC compliant.",
      "Monitor the market; a crash might trigger a margin call.",
      "Use this for short-term liquidity, not long-term needs."
    ],
    factsTitle: "LAS Key Points",
    facts: [
      "Interest rates are lower (9-11%) compared to personal loans.",
      "You retain ownership and continue to earn dividends/bonuses.",
      "No foreclosure charges or prepayment penalties.",
      "LTV is capped at 50% for equity shares and 75% for debt funds.",
      "Lien marking is a fully digital process via NSDL/CDSL."
    ]
  },
  // 10. Used Car Loan
  {
    id: 'used-car-loan',
    tipsTitle: "Buying a Pre-Owned Car?",
    tipsIntro: "Financing a used car is different from a new one:",
    tips: [
      "Get the car valued by the bank before agreeing on a price with the seller.",
      "Ensure the car is not older than 8-10 years at loan maturity.",
      "Verify that the RC transfer to your name is part of the deal.",
      "Check if the previous owner has cleared their loan (NOC available).",
      "Compare interest rates; they are higher than new car loans."
    ],
    factsTitle: "Used Car Loan Facts",
    facts: [
      "Loan amount is 60-80% of the valuation price, not purchase price.",
      "Interest rates range between 12% to 18%.",
      "Tenure is usually restricted to 3-5 years.",
      "Comprehensive insurance is mandatory for financing.",
      "Loans are available for both dealer and private seller purchases."
    ]
  },
  // 11. Used Bike Loan
  {
    id: 'used-bike-loan',
    tipsTitle: "Financing a Used Two-Wheeler",
    tipsIntro: "Quick tips for getting a loan for a second-hand bike:",
    tips: [
      "Be ready with a down payment of at least 30-40%.",
      "Ensure the engine and chassis number match the RC.",
      "Check the validity of the insurance policy.",
      "A credit score of 700+ helps negotiation on interest rates.",
      "Keep address proof documents ready for verification."
    ],
    factsTitle: "Used Bike Loan Facts",
    facts: [
      "High interest rates (18-24%) due to higher risk.",
      "Short tenures of 12 to 36 months.",
      "Physical verification of the bike is mandatory.",
      "Some lenders may require a guarantor.",
      "Ownership transfer must be completed at the RTO."
    ]
  },
  // 12. New Car Loan
  {
    id: 'new-car-loan',
    tipsTitle: "Driving Home a New Car",
    tipsIntro: "Maximize your bargaining power with these tips:",
    tips: [
      "Negotiate on the 'On-Road' price funding, not Ex-Showroom.",
      "Compare dealer finance vs external bank offers.",
      "Ask for a waiver on processing fees (festive offers).",
      "Opt for a fixed interest rate to avoid market fluctuations.",
      "Check foreclosure charges if you plan to pay off early."
    ],
    factsTitle: "New Car Loan Facts",
    facts: [
      "LTV can go up to 100% of On-Road price for select profiles.",
      "Car is hypothecated to the bank until the loan is cleared.",
      "Tenures available up to 7 or 8 years.",
      "Credit score significantly impacts the interest rate offered.",
      "Pre-approved loans require zero income documentation."
    ]
  },
  // 13. New Bike Loan
  {
    id: 'new-bike-loan',
    tipsTitle: "Two-Wheeler Loan Tips",
    tipsIntro: "Buying a bike or scooter? Read this first:",
    tips: [
      "Look for Low Down Payment schemes if cash is tight.",
      "Check the 'Hypothecation Removal' process for later.",
      "Compare EMI schemes (some offer 'Buy Now Pay Later').",
      "Ensure you are not forced to buy bundled accessories.",
      "Apply online to get instant digital sanction."
    ],
    factsTitle: "Bike Loan Facts",
    facts: [
      "Interest rates vary widely (10% to 24%) based on profile.",
      "Loans available for amounts as low as Rs. 20,000.",
      "Students can apply with a parent as a co-applicant.",
      "Processing fees are usually a flat amount (e.g., Rs. 1000).",
      "Quick disbursal, often while you are at the showroom."
    ]
  }
];

// ==========================================
// 3. Reusable Icon Component
// ==========================================

const CheckCircleIcon = () => (
  <svg 
    className="w-5 h-5 md:w-6 md:h-6 text-teal-500 shrink-0 mt-0.5 md:mt-1" 
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

// ==========================================
// 4. The Presentation Component
// ==========================================

interface LoanInformationProps {
  data: LoanInfoData;
}

const LoanInformation: React.FC<LoanInformationProps> = ({ data }) => {
  return (
    <div className="w-full max-w-6xl mx-auto mb-8 bg-white text-gray-800 font-serif p-4 md:p-8 border-0 md:border md:border-gray-200 rounded-none md:rounded-3xl shadow-none md:shadow-sm">
      
      {/* SECTION 1: Tips */}
      <section className="mb-8 md:mb-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
          {data.tipsTitle}
        </h2>
        <p className="text-base md:text-lg text-gray-700 mb-6">
          {data.tipsIntro}
        </p>
        <ul className="space-y-3 md:space-y-4">
          {data.tips.map((tip, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircleIcon />
              <span className="text-sm md:text-lg leading-relaxed text-gray-700">
                {tip}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Divider */}
      <hr className="border-gray-200 mb-8 md:mb-12" />

      {/* SECTION 2: Quick Facts */}
      <section>
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">
          {data.factsTitle}
        </h2>
        <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8">
          {data.facts.map((fact, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircleIcon />
              <span className="text-sm md:text-lg leading-relaxed text-gray-700">
                {fact}
              </span>
            </li>
          ))}
        </ul>
        
        {/* Footer Note */}
        {data.footerNote && (
          <p className="text-xs md:text-base font-medium text-gray-600">
            {data.footerNote}
          </p>
        )}
      </section>

    </div>
  );
};

// ==========================================
// 5. The Container Component (Use this)
// ==========================================

interface LoanInfoContainerProps {
  id: string; // The ID to look up in the array
}

export const LoanInformationContainer: React.FC<LoanInfoContainerProps> = ({ id }) => {
  // 1. Find Data
  const data = LOAN_INFO_DATA.find((item) => item.id === id);

  // 2. Safety Check
  if (!data) {
    console.warn(`LoanInformationContainer: No data found for id "${id}"`);
    return null;
  }

  // 3. Render
  return <LoanInformation data={data} />;
};

export default LoanInformationContainer;