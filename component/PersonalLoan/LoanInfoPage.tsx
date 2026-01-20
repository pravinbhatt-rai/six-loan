import React from 'react';

// ==========================================
// 1. Type Definitions
// ==========================================

export interface TipItem {
  id: string | number;
  title: string;
  description: string;
}

export interface GuidanceData {
  id: string; // The lookup key
  mainTitle: string;
  introText?: string;
  sectionTitle?: string;
  sectionDescription?: string;
  items: TipItem[];
}

// ==========================================
// 2. Centralized Data (The "Database")
// ==========================================

const LOAN_GUIDANCE_DATA: GuidanceData[] = [
  // 1. Personal Loan
  {
    id: 'personal-loan',
    mainTitle: "Personal Loan Interest Rates",
    introText: "Personal loan interest rate offers on Six Loan start from 9.98% p.a. The interest rate is determined on the basis of an applicant's credit profile, income, and employer reputation.",
    sectionTitle: "5 Tips to Choose the Best Personal Loan",
    sectionDescription: "Choosing the best personal loan requires careful consideration of costs and flexibility. Here's how to choose right:",
    items: [
      { id: 1, title: "Compare APR, not just Interest Rate", description: "Look at the Annual Percentage Rate (APR) which includes processing fees and insurance, giving you the true cost of the loan." },
      { id: 2, title: "Check Pre-approved Offers", description: "Banks where you have a savings account often provide pre-approved offers with faster disbursal and minimal documentation." },
      { id: 3, title: "Understand Foreclosure Charges", description: "Some lenders charge up to 4% if you close the loan early. Look for lenders with zero or low foreclosure charges." },
      { id: 4, title: "Assess Affordability", description: "Use an EMI calculator. Ideally, your total EMI outgo (including the new loan) should not exceed 40-50% of your net monthly income." },
      { id: 5, title: "Read the Fine Print", description: "Check for hidden costs like bounce charges, penal interest, and duplicate statement charges." }
    ]
  },
  // 2. Home Loan
  {
    id: 'home-loan',
    mainTitle: "Home Loan Interest Rates",
    introText: "Home loan rates currently range between 8.35% to 9.50% p.a. A higher credit score (750+) can significantly reduce the spread charged by the bank.",
    sectionTitle: "Guide to Selecting a Home Loan",
    sectionDescription: "A home loan is a long-term commitment (15-30 years). A small difference in rates can save lakhs. Consider these factors:",
    items: [
      { id: 1, title: "Repo Rate Linked Loans (RLLR)", description: "Opt for loans linked to the Repo Rate (RLLR) rather than MCLR, as they offer greater transparency and faster transmission of rate cuts." },
      { id: 2, title: "Check LTV (Loan to Value) Ratio", description: "Banks fund 75-90% of the property cost. Ensure you have the down payment ready for the remaining amount plus registration charges." },
      { id: 3, title: "Processing Fees & Legal Charges", description: "Compare processing fees. Many lenders waive these during festive offers. Also, check for legal and technical verification charges." },
      { id: 4, title: "Prepayment Flexibility", description: "Ensure there are no penalties for part-prepayment on floating rate loans. This allows you to reduce tenure when you have surplus funds." },
      { id: 5, title: "Project Approval", description: "Check if your property project is pre-approved by the lender. This speeds up the legal verification process significantly." }
    ]
  },
  // 3. Business Loan
  {
    id: 'business-loan',
    mainTitle: "Business Loan Interest Rates",
    introText: "Unsecured business loan rates typically start from 14% p.a., while secured options can start as low as 9%. Rates depend heavily on business turnover and vintage.",
    sectionTitle: "How to Secure the Best Business Funding",
    sectionDescription: "Lenders look for business stability and cash flow. Improve your approval chances with these steps:",
    items: [
      { id: 1, title: "Maintain Healthy Cash Flow", description: "Lenders analyze your bank statements. Avoid frequent overdrafts or cheque bounces in your primary business account." },
      { id: 2, title: "Vintage Matters", description: "Most lenders prefer businesses with at least 2-3 years of operations. Ensure your registration documents reflect this vintage." },
      { id: 3, title: "GST Returns Consistency", description: "Ensure your declared turnover in GST returns matches your bank credits. Discrepancies here are a major reason for rejection." },
      { id: 4, title: "Check Collateral-Free Limits", description: "For loans up to ₹2 Crores, check if you are eligible under the CGTMSE scheme which requires no collateral." },
      { id: 5, title: "Purpose of Loan", description: "Be clear whether you need a Term Loan (for expansion/machinery) or Working Capital (for inventory/operations)." }
    ]
  },
  // 4. Transfer Personal Loan
  {
    id: 'transfer-personal-loan',
    mainTitle: "Balance Transfer Interest Rates",
    introText: "Balance transfer rates can start as low as 10.99%, often significantly lower than your original personal loan rate if your credit score has improved.",
    sectionTitle: "Checklist for Balance Transfer",
    sectionDescription: "Switching lenders is only profitable if the net savings exceed the transfer costs. Keep this in mind:",
    items: [
      { id: 1, title: "Calculate Net Savings", description: "Deduct the processing fee of the new loan and foreclosure charges of the old loan from the total interest saved. Proceed only if the result is positive." },
      { id: 2, title: "Check Remaining Tenure", description: "Transferring is most beneficial in the early years of the loan. If less than 12 months are left, the savings might be negligible." },
      { id: 3, title: "Top-Up Facility", description: "Most lenders offer a top-up loan along with the transfer. Use this to consolidate other expensive debts (like credit card dues)." },
      { id: 4, title: "Negotiate Processing Fees", description: "Since you already have a repayment track record, negotiate with the new lender to waive off the processing fee." },
      { id: 5, title: "Read Foreclosure Terms", description: "Ensure the new lender does not have a long lock-in period, so you retain the flexibility to close this loan early too." }
    ]
  },
  // 5. Professional Loan
  {
    id: 'professional-loan',
    mainTitle: "Professional Loan Rates",
    introText: "Designed specifically for Doctors, CAs, and Engineers, these loans start from 10.50% p.a. and often feature higher loan amounts than standard personal loans.",
    sectionTitle: "Maximizing Professional Loan Benefits",
    sectionDescription: "Your degree is your collateral. Use your professional status to get premium terms:",
    items: [
      { id: 1, title: "Qualification Proof", description: "Keep your degree certificates and practice registration (e.g., IMA for doctors, ICAI for CAs) ready for the 'Green Channel' approval." },
      { id: 2, title: "Compare Specific Schemes", description: "Banks have specific products like 'Doctor Plus' or 'CA Loans'. Don't apply for a generic personal loan; ask for the professional variant." },
      { id: 3, title: "Part-Disbursement Option", description: "Some professional loans allow you to withdraw funds in tranches and pay interest only on the used amount." },
      { id: 4, title: "Check Gross Receipts", description: "For self-employed professionals, loan eligibility is often calculated based on Gross Receipts rather than Net Profit." },
      { id: 5, title: "Tenure Flexibility", description: "Professional loans often offer longer tenures (up to 60-72 months) compared to standard unsecured loans." }
    ]
  },
  // 6. Loan Against Property
  {
    id: 'loan-against-property',
    mainTitle: "LAP Interest Rates",
    introText: "Loan Against Property rates start from 8.75% to 10.50% p.a. Since it is a secured loan, the rates are much cheaper than personal loans.",
    sectionTitle: "Tips for Loan Against Property",
    sectionDescription: " unlocking the value of your real estate requires understanding valuation and usage:",
    items: [
      { id: 1, title: "Property Legal Status", description: "Ensure your property has a clear title, approved map plans, and OC (Occupancy Certificate). Illegal constructions reduce loan eligibility." },
      { id: 2, title: "LTV Restrictions", description: "Unlike home loans (90%), LAP usually funds only 60-70% of the property's market value. Plan your requirements accordingly." },
      { id: 3, title: "Residential vs Commercial", description: "Interest rates and LTV ratios are generally better for residential properties compared to commercial or industrial plots." },
      { id: 4, title: "Tenure Selection", description: "LAP offers tenures up to 15 years. While this reduces EMI, it increases total interest. Choose the shortest affordable tenure." },
      { id: 5, title: "End-Use Declaration", description: "You must declare the end-use of funds (business expansion, marriage, medical). It cannot be used for speculative purposes." }
    ]
  },
  // 7. Transfer Home Loan
  {
    id: 'transfer-home-loan',
    mainTitle: "Home Loan Transfer Rates",
    introText: "Balance transfer rates are generally the lowest prevailing market rates, starting around 8.35% p.a. for eligible borrowers.",
    sectionTitle: "Smart Moves for Home Loan Transfer",
    sectionDescription: "Don't just switch for the sake of it. Optimize your mortgage with these tips:",
    items: [
      { id: 1, title: "Benchmark Check", description: "Ensure the new loan is linked to an external benchmark (Repo Rate) so you get the benefit of future rate cuts automatically." },
      { id: 2, title: "MODT Charges", description: "Remember that transferring involves paying Stamp Duty and MODT charges again in some states. Factor this into your cost-benefit analysis." },
      { id: 3, title: "Document Retrieval", description: "The timeline depends on how fast your current lender releases property documents. Follow up aggressively for the 'List of Documents' (LOD)." },
      { id: 4, title: "Credit Score Impact", description: "Ensure you have been regular with your EMIs for the last 12 months. One late payment can lead to rejection of the transfer request." },
      { id: 5, title: "Top-Up vs Personal Loan", description: "If you need extra cash, a Top-Up on your home loan is far cheaper (approx 9-10%) than taking a separate personal loan." }
    ]
  },
  // 8. Education Loan
  {
    id: 'education-loan',
    mainTitle: "Education Loan Interest Rates",
    introText: "Rates for premier institutes (IIMs/IITs) start as low as 8.5%, while study abroad loans range from 10% to 14% depending on collateral.",
    sectionTitle: "Planning Your Education Finance",
    sectionDescription: "Education is an investment. Ensure the liability doesn't burden your early career:",
    items: [
      { id: 1, title: "Moratorium Period", description: "Check if the lender offers a 'payment holiday' during the course duration plus 6-12 months after graduation." },
      { id: 2, title: "Tax Benefits (Sec 80E)", description: "The interest paid on education loans is deductible under Section 80E for 8 years. The borrower or co-borrower can claim this." },
      { id: 3, title: "Co-applicant Profile", description: "For unsecured loans or study abroad, the financial profile (CIBIL/Income) of the co-applicant (parent/spouse) is crucial." },
      { id: 4, title: "Pre-Visa Disbursement", description: "For foreign universities, ensure the lender provides a sanction letter or pre-visa disbursement as required for the Visa interview." },
      { id: 5, title: "Collateral vs Non-Collateral", description: "Collateralized loans (offering a house/FD) are significantly cheaper than non-collateral loans. Use assets if available." }
    ]
  },
  // 9. Loan Against Security
  {
    id: 'loan-against-security',
    mainTitle: "Loan Against Securities Rates",
    introText: "Interest rates range between 9% to 12% p.a. You pay interest only on the amount you utilize, not the entire limit sanctioned.",
    sectionTitle: "Leveraging Your Portfolio",
    sectionDescription: "Get liquidity without selling your long-term investments:",
    items: [
      { id: 1, title: "Approved List of Securities", description: "Lenders have a specific list of approved shares and mutual funds. Check if your portfolio matches their approved list." },
      { id: 2, title: "LTV Ratios", description: "RBI caps LTV at 50% for equity shares and 75% for debt mutual funds. You won't get funding on the full value." },
      { id: 3, title: "Digital Lien Marking", description: "Opt for lenders offering digital lien marking via NSDL/CDSL for a paperless and instant process." },
      { id: 4, title: "Margin Call Risks", description: "If the market crashes, the lender may ask you to pledge more shares or pay cash (Margin Call). Be prepared for volatility." },
      { id: 5, title: "Overdraft Facility", description: "This is usually an overdraft. Interest is calculated daily on the utilized amount. Use it for short-term needs only." }
    ]
  },
  // 10. Used Car Loan
  {
    id: 'used-car-loan',
    mainTitle: "Used Car Loan Rates",
    introText: "Used car loan rates are higher than new cars, typically starting from 12% to 16% p.a., depending on the age and model of the car.",
    sectionTitle: "Buying a Pre-Owned Car?",
    sectionDescription: "Financing a second-hand car involves valuation and transfer checks:",
    items: [
      { id: 1, title: "Valuation is Key", description: "Lenders will fund based on their internal valuation, not the seller's asking price. Be prepared to pay the difference." },
      { id: 2, title: "Age of Vehicle", description: "Most lenders do not finance cars older than 8-10 years at the time of loan maturity. Check age restrictions." },
      { id: 3, title: "RC Transfer", description: "The loan is usually disbursed to the seller, but RC transfer to your name is mandatory within a specific timeframe." },
      { id: 4, title: "Insurance Validity", description: "Ensure the car has valid insurance. Lenders require comprehensive insurance with their hypothecation marked." },
      { id: 5, title: "Compare with Personal Loan", description: "If the used car loan rate is very high (15%+), compare it with a Personal Loan which might be cheaper and hassle-free." }
    ]
  },
  // 11. Used Bike Loan
  {
    id: 'used-bike-loan',
    mainTitle: "Used Bike Loan Rates",
    introText: "Interest rates for used two-wheelers are generally high, ranging from 18% to 24% p.a. due to higher risk.",
    sectionTitle: "Tips for Used Bike Finance",
    sectionDescription: "Getting a loan for a used bike is quick but check the terms:",
    items: [
      { id: 1, title: "Down Payment", description: "Expect to pay 30-40% of the bike's value as a down payment. 100% funding is rare for used bikes." },
      { id: 2, title: "Short Tenure", description: "Tenures are usually capped at 2-3 years. Ensure the EMI fits your monthly budget." },
      { id: 3, title: "Documentation", description: "Keep address proof and income proof ready. Some lenders offer loans based on KYC only but at higher rates." },
      { id: 4, title: "Condition Check", description: "Lenders may physically verify the bike's condition. Ensure the engine and chassis number match the RC." },
      { id: 5, title: "Hypothecation Removal", description: "Check if the previous owner had a loan. Ensure they have the NOC and the previous hypothecation is removed from the RC." }
    ]
  },
  // 12. New Car Loan
  {
    id: 'new-car-loan',
    mainTitle: "New Car Loan Interest Rates",
    introText: "New car loan rates are competitive, starting from 8.65% to 10% p.a. Some manufacturers offer subvention schemes with even lower rates.",
    sectionTitle: "Driving Your Dream Car Home",
    sectionDescription: "Maximize your car buying power with these financing tips:",
    items: [
      { id: 1, title: "On-Road vs Ex-Showroom", description: "Look for lenders providing 'On-Road' funding which covers registration and insurance, not just the Ex-Showroom price." },
      { id: 2, title: "Fixed vs Floating Rate", description: "Car loans are mostly fixed-rate loans. Ensure you lock in a good rate as it won't change for the tenure." },
      { id: 3, title: "No Prepayment Penalty", description: "Some PSU banks offer car loans with zero prepayment penalties. This is great if you plan to close the loan early." },
      { id: 4, title: "Dealer Finance vs External", description: "Dealers often have tie-ups, but their rates might include commissions. Always compare with an external bank offer." },
      { id: 5, title: "Tenure Impact", description: "A 7-year tenure reduces EMI but increases total interest cost significantly compared to a 3 or 5-year tenure." }
    ]
  },
  // 13. New Bike Loan
  {
    id: 'new-bike-loan',
    mainTitle: "New Two-Wheeler Loan Rates",
    introText: "Interest rates start from 10% to 24% p.a. Rates vary significantly based on the bike model (commuter vs superbike) and your profile.",
    sectionTitle: "Checklist for New Bike Loans",
    sectionDescription: "Funding your two-wheeler is easy, but watch out for these aspects:",
    items: [
      { id: 1, title: "LTV Ratio", description: "Lenders offer up to 95% funding. However, a higher down payment reduces your interest burden and EMI." },
      { id: 2, title: "Processing Fees", description: "Processing fees can range from 1% to 3%. Look for festive waivers or flat-fee offers." },
      { id: 3, title: "Hypothecation Charge", description: "There is a cost to mark the lender's name on the RC (Hypothecation). Ask if this is included in the loan or paid separately." },
      { id: 4, title: "Bundled Insurance", description: "Lenders may force you to buy insurance from them. You have the right to buy insurance externally if it's cheaper." },
      { id: 5, title: "Credit Score", description: "Even for small bike loans, CIBIL matters. A score above 700 ensures you get the lower end of the interest rate band." }
    ]
  },
  // 14. Medical Personal Loan
  {
    id: 'medical-personal-loan',
    mainTitle: "Medical Loan Interest Rates",
    introText: "Medical loan interest rates typically start from 10.49% p.a. Given the urgency, many lenders offer specialized 'Instant Approval' tracks for medical emergencies with minimal documentation.",
    sectionTitle: "Navigating Medical Emergency Finance",
    sectionDescription: "When a health crisis strikes, time is the most critical asset. Here is how to secure funds instantly without falling into a debt trap:",
    items: [
      { id: 1, title: "Prioritize Disbursal Speed", description: "In an emergency, speed beats interest rate. Pre-approved offers from your existing bank can often be disbursed in minutes, whereas new applications take 24-48 hours." },
      { id: 2, title: "Check Insurance Coverage", description: "Use the loan only for the 'gap' amount—costs not covered by your health insurance (like room rent limits, co-pay, or consumables)." },
      { id: 3, title: "Digital KYC Process", description: "Opt for lenders offering Video KYC and digital signing. Physical document collection is too slow for emergency situations." },
      { id: 4, title: "No Collateral Needed", description: "Medical loans are unsecured. Do not waste time arranging assets for collateral unless your credit score is too low for an unsecured loan." },
      { id: 5, title: "Tenure for Recovery", description: "Select a longer tenure (e.g., 60 months) to keep EMIs low during the recovery period. You can always prepay the loan once you are back to work." }
    ]
  },
  // 15. Travel Personal Loan
  {
    id: 'travel-personal-loan',
    mainTitle: "Travel Loan Interest Rates",
    introText: "Travel loan interest rates generally start from 10.99% p.a. Many lenders offer seasonal 'Holiday Loan' schemes with lower processing fees during peak travel months.",
    sectionTitle: "Smart Financing for Your Travels",
    sectionDescription: "A vacation should relieve stress, not create financial anxiety. Use these tips to fund your trip without lingering debt:",
    items: [
      { id: 1, title: "Personal Loan vs. Credit Card", description: "Avoid using credit cards for large expenses like flights unless you can pay the full bill immediately. Personal loans (11-14%) are much cheaper than revolving credit card debt (36-42%)." },
      { id: 2, title: "The Early Bird Savings", description: "Use the loan disbursement to book flights and hotels 3-4 months in advance. The savings on early bookings often offset the interest paid on the loan." },
      { id: 3, title: "Keep Tenure Short", description: "Don't drag a vacation loan for 5 years. Ideally, aim to repay the cost of a holiday within 12 to 24 months to avoid paying excessive interest on a leisure expense." },
      { id: 4, title: "Include a Buffer", description: "When calculating the loan amount, add a 10-15% buffer for unforeseen expenses like currency fluctuations, visa rejection fees, or emergency transfers." },
      { id: 5, title: "Check for Travel Insurance", description: "Some travel-specific personal loans come with complimentary travel insurance. Check the policy details to see if it covers medical emergencies abroad." }
    ]
  },
  // 16. Debt Consolidation Loan
  {
    id: 'debt-consolidation-loan',
    mainTitle: "Debt Consolidation Interest Rates",
    introText: "Consolidation loan rates typically range from 10.50% to 14.00% p.a. This is significantly lower than credit card interest rates (APR), which can be as high as 36-42%.",
    sectionTitle: "Strategies for Effective Consolidation",
    sectionDescription: "Combining multiple debts into one can save money and reduce stress, but only if done correctly. Follow these guidelines to become debt-free faster:",
    items: [
      { id: 1, title: "The 'Weighted Average' Rule", description: "Ensure the interest rate of your new consolidation loan is lower than the average interest rate of all your current debts combined. If it's higher, you will lose money." },
      { id: 2, title: "Avoid the 'Double Jeopardy' Trap", description: "Once you pay off your credit cards with the loan, do not use those cards again until the loan is repaid. Racking up new debt while paying off the old one is a financial disaster." },
      { id: 3, title: "Calculate Break-Even Costs", description: "Factor in the processing fee of the new loan and the foreclosure charges of your old loans. Proceed only if the interest savings outweigh these one-time costs." },
      { id: 4, title: "Shorten the Tenure", description: "Don't just lower the EMI; try to keep the tenure as short as possible. Extending a 2-year debt to 5 years might lower the monthly payment but will increase the total interest paid." },
      { id: 5, title: "Check for Balance Transfer Options", description: "Instead of a fresh loan, check if you can transfer your credit card balance to a personal loan or another card with a lower interest rate, often available at 0% interest for a few months." }
    ]
  },
  // 17. Wedding Personal Loan
  {
    id: 'wedding-personal-loan',
    mainTitle: "Wedding Loan Interest Rates",
    introText: "Wedding loan rates typically range from 10.75% to 15% p.a. Since these are unsecured loans, the rate heavily depends on your income-to-debt ratio and credit score.",
    sectionTitle: "Planning Your Dream Wedding Finance",
    sectionDescription: "A wedding is an emotional event, but funding it requires logic. Here is how to manage the expenses without starting your married life in debt distress:",
    items: [
      { id: 1, title: "Budget First, Borrow Later", description: "Create a detailed wedding budget before applying. Only borrow what you absolutely need to cover the gap between your savings and the total cost." },
      { id: 2, title: "Disburse in Tranches", description: "Some lenders offer a 'Flexi-Loan' or Overdraft facility where you withdraw funds as you pay vendors. You pay interest only on the amount withdrawn, not the full sanction." },
      { id: 3, title: "Joint Application", description: "Applying jointly with your partner or parent can significantly increase your loan eligibility, allowing you to cover larger expenses like the venue or gold." },
      { id: 4, title: "Vendor Advances", description: "Ensure the loan is disbursed at least 1-2 months before the wedding date so you have liquid cash ready for immediate vendor advances and bookings." },
      { id: 5, title: "Prepayment Plan", description: "Plan to prepay part of the loan using the cash gifts (Shagun) received during the wedding. This drastically reduces the interest burden." }
    ]
  },
  // 18. Overdraft Personal Loan
{
  id: 'overdraft-personal-loan',
  mainTitle: "Overdraft Interest Rates",
  introText: "Overdraft interest rates are typically 1-2% higher than standard term loans, starting around 12-14% p.a. However, the effective cost is often lower because interest is calculated on a daily reducing balance.",
  sectionTitle: "Mastering the Credit Line",
  sectionDescription: "An overdraft facility offers immense flexibility but requires financial discipline. Here is how to use it effectively:",
  items: [
    { id: 1, title: "Pay Principal When Possible", description: "Don't just pay the interest every month. Whenever you have surplus cash (bonus, incentives), park it in the overdraft account to reduce the outstanding principal and interest burden." },
    { id: 2, title: "Emergency Buffer", description: "Treat this facility as an emergency fund. Keep the limit sanctioned but unutilized; you won't pay a penny in interest until you actually withdraw the money." },
    { id: 3, title: "Watch the Annual Fees", description: "Unlike term loans, overdraft accounts often have an annual renewal fee. Ensure the utility of the flexibility justifies this recurring cost." },
    { id: 4, title: "Avoid Maxing Out", description: "Regularly utilizing 100% of your overdraft limit indicates credit hunger to bureaus and can negatively impact your credit score over time." },
    { id: 5, title: "Daily Interest Calculation", description: "Interest is calculated daily. If you borrow ₹1 Lakh for just 5 days and repay it, you only pay interest for those 5 days. It's perfect for very short-term needs." }
  ]
}

];

// ==========================================
// 3. Reusable Component (Presentation)
// ==========================================

interface GuidanceSectionProps {
  data: GuidanceData;
  className?: string;
}

const LoanGuidanceSection: React.FC<GuidanceSectionProps> = ({
  data,
  className = "",
}) => {
  return (
    <div className={`w-full ${className}`}>
      {/* --- Top Section: Header & Context --- */}
      <div className="border-b border-gray-100 pb-6 mb-6 md:pb-10 md:mb-10">
        <div className="inline-block px-3 py-1 mb-4 text-[10px] md:text-xs font-semibold tracking-wider text-teal-700 uppercase bg-teal-50 rounded-full border border-teal-100">
          Financial Guide
        </div>

        <h1 className="text-2xl md:text-5xl font-serif font-bold text-gray-900 mb-4 md:mb-6 tracking-tight leading-tight">
          {data.mainTitle}
        </h1>

        {data.introText && (
          <p className="text-sm md:text-xl text-gray-600 leading-relaxed max-w-4xl">
            {data.introText}
          </p>
        )}
      </div>

      {/* --- Bottom Section: Actionable Tips --- */}
      <section>
        {data.sectionTitle && (
          <h2 className="text-lg md:text-3xl font-serif font-bold text-gray-900 mb-3 md:mb-5">
            {data.sectionTitle}
          </h2>
        )}

        {data.sectionDescription && (
          <p className="text-gray-500 mb-6 md:mb-12 text-sm md:text-lg leading-relaxed border-l-4 border-teal-500 pl-4 md:pl-5 max-w-4xl">
            {data.sectionDescription}
          </p>
        )}

        {/* List Layout */}
        <div className="flex flex-col gap-4 md:gap-6">
          {data.items.map((item, index) => (
            <div
              key={item.id}
              className="flex flex-row gap-4 md:gap-6 p-4 md:p-8 rounded-2xl border border-gray-200 bg-white items-start"
            >
              {/* Number Badge */}
              <div className="shrink-0">
                <span className="flex items-center justify-center w-8 h-8 md:w-12 md:h-12 rounded-full bg-white border-2 border-teal-100 text-teal-600 font-bold text-xs md:text-xl">
                  {index + 1}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-base md:text-xl font-serif font-bold text-gray-900 mb-1 md:mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-lg">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

// ==========================================
// 4. The Logic Wrapper (Use this in your pages)
// ==========================================

interface LoanGuidanceContainerProps {
  id: string; // The ID to look up in the array (e.g., 'personal-loan', 'home-loan')
  className?: string;
}

const LoanGuidanceContainer: React.FC<LoanGuidanceContainerProps> = ({ id, className }) => {
  // 1. Find Data
  const data = LOAN_GUIDANCE_DATA.find((item) => item.id === id);

  // 2. Safety Check
  if (!data) {
    console.warn(`LoanGuidanceContainer: No data found for id "${id}"`);
    return null;
  }

  // 3. Render Wrapper with Responsive Styles
  return (
    <div className="w-full bg-white">
      {/* Main Container with Responsive Padding/Shadows */}
      <div className={`
        w-full max-w-6xl mx-auto bg-white mb-8
        /* Mobile Styles */
        p-5 border-0 shadow-none
        /* Desktop Styles */
        md:p-12 md:border md:border-gray-200 md:rounded-3xl md:shadow-sm
        ${className || ''}
      `}>
        <LoanGuidanceSection data={data} />
      </div>
    </div>
  );
};

export default LoanGuidanceContainer;