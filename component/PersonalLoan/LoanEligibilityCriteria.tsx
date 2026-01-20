import React from 'react';

// ==========================================
// 1. Data Definitions
// ==========================================

interface EligibilityItem {
  label: string;
  text: string;
}

interface EligibilityData {
  id: string;
  title: string;
  description: string;
  linkText?: string; // Optional: Text for the link (if any)
  criteriaList: EligibilityItem[];
}

// ==========================================
// 2. Centralized Data (The "Database")
// ==========================================

const ELIGIBILITY_DATA: EligibilityData[] = [
  // 1. Personal Loan
  {
    id: 'personal-loan',
    title: "Personal Loan Eligibility Criteria",
    description: "Eligibility criteria may vary across lenders. To give you a fair idea, here are some of the general requirements:",
    linkText: "Personal loan eligibility criteria",
    criteriaList: [
      { label: "Credit Score", text: "Preferably 750 and above" },
      { label: "Salary", text: "Usually Rs. 15,000–30,000 a month (Income eligibility may be lower for existing bank customers)" },
      { label: "Income", text: "Usually Rs. 3 lakh p.a. (varies for self-employed professionals)" },
      { label: "Employment Stability", text: "At least 1 to 2 years of total work experience with a stable current job" },
      { label: "Employer Profile", text: "Employees of Govt, PSUs, MNCs, and reputed corporates are favored." },
      { label: "Age Limit", text: "Usually 21–60 years (up to 65 for self-employed/pensioners)." },
    ]
  },
  // *** NEW ENTRY: Pre-approved Personal Loan ***
  {
    id: 'pre-approved-loan',
    title: "Pre-approved Loan Eligibility",
    description: "These offers are extended to select customers based on their relationship with the bank and repayment history.",
    linkText: "Check your pre-approved offer",
    criteriaList: [
      { label: "Existing Relationship", text: "Must have a Savings/Current account or Credit Card with the lender." },
      { label: "Repayment Track Record", text: "Clean history of timely payments on existing loans or credit cards." },
      { label: "Credit Score", text: "High credit score (750+) increases chances of getting instant offers." },
      { label: "Account Balance", text: "Consistent Average Monthly Balance (AMB) maintenance." },
      { label: "Income Credits", text: "Regular salary credits or business turnover in the bank account." },
      { label: "KYC Status", text: "Full KYC compliance with the bank is mandatory for instant disbursal." },
    ]
  },
  // 2. Home Loan
  {
    id: 'home-loan',
    title: "Home Loan Eligibility Criteria",
    description: "Lenders look for stability and property legality. Common requirements include:",
    linkText: "Home loan eligibility",
    criteriaList: [
      { label: "Age", text: "18–70 years (Loan must end before retirement age for salaried)" },
      { label: "Credit Score", text: "750+ is ideal for the lowest interest rates." },
      { label: "Minimum Income", text: "Net monthly income of at least Rs. 25,000 (varies by city)." },
      { label: "Work Experience", text: "At least 2 years for salaried; 3 years business continuity for self-employed." },
      { label: "Property Status", text: "Clear title with approved maps from local authority." },
      { label: "FOIR", text: "Fixed Obligation to Income Ratio should ideally be under 50%." },
    ]
  },
  // 3. Business Loan
  {
    id: 'business-loan',
    title: "Business Loan Eligibility Criteria",
    description: "Lenders assess the health of your business rather than just personal income:",
    linkText: "Business loan requirements",
    criteriaList: [
      { label: "Business Vintage", text: "Minimum 2-3 years of business continuity." },
      { label: "Annual Turnover", text: "Minimum turnover of Rs. 10 Lakhs to Rs. 40 Lakhs (varies by lender)." },
      { label: "Profitability", text: "Business should be profit-making for the last 2 years." },
      { label: "ITR Filing", text: "ITR filed for the last 2 years is mandatory for most unsecured loans." },
      { label: "Age Criteria", text: "Applicant should be between 21 and 65 years at loan maturity." },
      { label: "Bank Statements", text: "Primary bank account should show healthy average balance and no bounces." },
    ]
  },
  // 4. Transfer Personal Loan
  {
    id: 'transfer-personal-loan',
    title: "Balance Transfer Eligibility",
    description: "To switch your loan to a new lender, you must meet these criteria:",
    linkText: "Transfer eligibility",
    criteriaList: [
      { label: "Existing Loan Age", text: "At least 6 to 12 EMIs must have been paid on the existing loan." },
      { label: "Repayment Track", text: "Zero delays or bounces in the last 12 months." },
      { label: "Credit Score", text: "Should have improved or remained stable (750+) since taking the original loan." },
      { label: "Income Status", text: "Current income meets the new lender's minimum salary criteria." },
      { label: "Loan Amount", text: "Outstanding principal should be at least Rs. 50,000." },
    ]
  },
  // 5. Professional Loan
  {
    id: 'professional-loan',
    title: "Professional Loan Eligibility",
    description: "Exclusive criteria for Doctors, CAs, and CS:",
    criteriaList: [
      { label: "Qualification", text: "MBBS/BDS/MD for Doctors; COP for CAs/CS." },
      { label: "Post-Qualification Exp", text: "Minimum 2-3 years of practice or employment." },
      { label: "Age", text: "25–65 years." },
      { label: "Income/Receipts", text: "Gross receipts showing consistent practice income." },
      { label: "Residence", text: "Stability of residence/clinic address for at least 1-2 years." },
    ]
  },
  // 6. Loan Against Property (LAP)
  {
    id: 'loan-against-property',
    title: "LAP Eligibility Criteria",
    description: "Criteria depend heavily on the property value and usage:",
    criteriaList: [
      { label: "Property Ownership", text: "Applicant must be the owner/co-owner of the property." },
      { label: "Property Type", text: "Residential, Commercial, or Industrial properties with clear titles." },
      { label: "Market Value", text: "Loan amount is usually restricted to 60-70% of market value." },
      { label: "Income", text: "Regular income source to service the EMI." },
      { label: "Age", text: "21–65 years (up to 70 for self-employed)." },
    ]
  },
  // 7. Transfer Home Loan
  {
    id: 'transfer-home-loan',
    title: "Home Loan Transfer Criteria",
    description: "Switch your home loan easily if you meet these conditions:",
    criteriaList: [
      { label: "Payment History", text: "Clean track record with no EMI bounces in the last 12-18 months." },
      { label: "Property Status", text: "Possession should ideally be handed over (Under-construction transfers are harder)." },
      { label: "Credit Score", text: "750+ required to access the lowest transfer rates." },
      { label: "Employment", text: "Stable employment/business with steady income." },
      { label: "Occupancy", text: "Property should be occupied or ready to occupy." },
    ]
  },
  // 8. Education Loan
  {
    id: 'education-loan',
    title: "Education Loan Eligibility",
    description: "Eligibility focuses on the student's merit and co-applicant's income:",
    criteriaList: [
      { label: "Student Nationality", text: "Must be an Indian citizen." },
      { label: "Academic Record", text: "Admission confirmed in a recognized university/institute." },
      { label: "Co-applicant", text: "Parent/Spouse must have a stable income and good credit score." },
      { label: "Course Type", text: "Graduate/Post-graduate degrees, professional courses." },
      { label: "Collateral", text: "Required for loans above Rs. 7.5 Lakhs (usually)." },
    ]
  },
  // 9. Loan Against Security
  {
    id: 'loan-against-security',
    title: "LAS Eligibility Criteria",
    description: "Get funds against your investments:",
    criteriaList: [
      { label: "Ownership", text: "Shares/Mutual Funds must be in the name of the applicant." },
      { label: "Security Type", text: "Must be on the lender's 'Approved List' of securities." },
      { label: "Demat Account", text: "Must have an active Demat account." },
      { label: "Age", text: "18 years and above." },
      { label: "Nationality", text: "Resident Indian." },
    ]
  },
  // 10. Used Car Loan
  {
    id: 'used-car-loan',
    title: "Used Car Loan Eligibility",
    description: "Lenders check both the buyer and the car:",
    criteriaList: [
      { label: "Age", text: "21–65 years." },
      { label: "Income", text: "Minimum Rs. 15,000–20,000 per month." },
      { label: "Work Experience", text: "Minimum 1 year in current job." },
      { label: "Car Age", text: "Car should not be older than 8-10 years at loan maturity." },
      { label: "Documents", text: "Valid RC, Insurance, and seller's KYC." },
    ]
  },
  // 11. Used Bike Loan
  {
    id: 'used-bike-loan',
    title: "Used Bike Loan Eligibility",
    description: "Simple criteria for two-wheeler finance:",
    criteriaList: [
      { label: "Age", text: "18–60 years." },
      { label: "Income", text: "Minimum Rs. 10,000–12,000 per month." },
      { label: "Residence", text: "Stable residence proof (owned or rented)." },
      { label: "Bike Condition", text: "Vehicle valuation and physical verification are mandatory." },
      { label: "Credit Score", text: "650+ preferred." },
    ]
  },
  // 12. New Car Loan
  {
    id: 'new-car-loan',
    title: "New Car Loan Eligibility",
    description: "Drive your dream car with these requirements:",
    criteriaList: [
      { label: "Age", text: "21–65 years." },
      { label: "Income", text: "Net salary Rs. 2.5 Lakhs p.a. or IT Returns of similar value." },
      { label: "Credit Score", text: "750+ gets you the best 'prime' rates." },
      { label: "Employment", text: "2 years total experience, 1 year with current employer." },
      { label: "Documents", text: "KYC, Income Proof, Bank Statement (last 6 months)." },
    ]
  },
  // 13. New Bike Loan
  {
    id: 'new-bike-loan',
    title: "New Bike Loan Eligibility",
    description: "Quick approval criteria for new two-wheelers:",
    criteriaList: [
      { label: "Age", text: "18–60 years." },
      { label: "Income", text: "Salaried: Rs. 10k/month; Self-Employed: ITR not always mandatory." },
      { label: "Residence", text: "Proof of local address is crucial." },
      { label: "Employment", text: "At least 6 months to 1 year of stability." },
      { label: "CIBIL", text: "Required for low-down-payment schemes." },
    ]
  },
  {
    id: 'medical-personal-loan',
    title: "Medical Loan Eligibility",
    description: "Specialized personal loans designed for urgent medical expenses, offering quick processing to ensure treatment is not delayed.",
    linkText: "Check eligibility",
    criteriaList: [
      { label: "Age Criteria", text: "Typically between 21 to 60 years at the time of loan application." },
      { label: "Employment Type", text: "Salaried employees or Self-employed individuals with a stable income source." },
      { label: "Minimum Income", text: "Net monthly income of ₹15,000 to ₹25,000 depending on city of residence." },
      { label: "Credit Score", text: "A CIBIL score of 750+ is preferred for instant approval, though some lenders relax this for emergencies." },
      { label: "Work Experience", text: "Minimum 1 year of total work experience (for salaried) or business vintage (for self-employed)." },
      { label: "Nationality", text: "Must be a resident Indian citizen." },
    ]
  },
  {
    id: 'travel-personal-loan',
    title: "Travel Loan Eligibility",
    description: "Unsecured personal loans customized for funding domestic or international vacations, covering flights, hotels, and other travel-related expenses.",
    linkText: "Check eligibility",
    criteriaList: [
      { label: "Age Criteria", text: "Typically between 21 to 60 years at the time of loan maturity." },
      { label: "Employment Type", text: "Salaried employees in private/public sector or Self-employed professionals." },
      { label: "Minimum Income", text: "Minimum net monthly income of ₹15,000 to ₹20,000." },
      { label: "Credit Score", text: "A CIBIL score of 700+ is generally required for competitive interest rates." },
      { label: "Work Experience", text: "Minimum 2 years of total experience, with at least 1 year in current organization." },
      { label: "Documents", text: "Valid Passport (for international travel) and standard KYC documents." },
    ]
  },
  {
    id: 'debt-consolidation-loan',
    title: "Debt Consolidation Eligibility",
    description: "To qualify for a consolidation loan, lenders assess your ability to manage the single new EMI and your intent to become debt-free.",
    linkText: "Check eligibility",
    criteriaList: [
      { label: "Credit Score", text: "A score of 700+ is crucial to secure an interest rate lower than your current debts." },
      { label: "Debt-to-Income Ratio", text: "Your total EMI obligations (including the new loan) should ideally be less than 50% of your net income." },
      { label: "Repayment History", text: "Must have a clean record with no recent defaults or write-offs on existing credit cards/loans." },
      { label: "Employment Stability", text: "Minimum 2 years of employment history ensures lenders of your repayment capacity." },
      { label: "Minimum Income", text: "Net monthly income of ₹20,000+ (higher thresholds may apply for larger consolidation amounts)." },
      { label: "Existing Debt Age", text: "Current loans/cards should ideally have a vintage of at least 6-12 months." },
    ]
  },
  {
    id: 'wedding-personal-loan',
    title: "Wedding Loan Eligibility",
    description: "Lenders look for stability and repayment capacity, as wedding loans are often of higher value (₹5 Lakhs - ₹25 Lakhs).",
    linkText: "Check eligibility",
    criteriaList: [
      { label: "Minimum Age", text: "21 years at the time of application (Max 58-60 years at maturity)." },
      { label: "Net Monthly Income", text: "₹20,000+ for Tier-1 cities; ₹15,000+ for Tier-2 cities." },
      { label: "CIBIL Score", text: "Score of 700+ is recommended for quick approval of high-value amounts." },
      { label: "Employment Status", text: "Salaried with 2 years experience or Self-employed with 3 years business continuity." },
      { label: "FOIR Limit", text: "Fixed Obligations to Income Ratio should ideally be under 50%." },
      { label: "Documents", text: "Standard KYC + Bank Statements (Last 3-6 months) + Salary Slips/ITR." },
    ]
  },
  {
    id: 'overdraft-personal-loan',
    title: "Overdraft Facility Eligibility",
    description: "Banks are stricter with overdraft approvals compared to term loans because of the repayment flexibility offered.",
    linkText: "Check eligibility",
    criteriaList: [
      { label: "Credit Score", text: "Strict requirement of 750+ CIBIL score." },
      { label: "Employment", text: "Salaried (Min 2 years exp) or Self-Employed (Min 3 years vintage)." },
      { label: "Income Criteria", text: "Minimum net salary of ₹30,000 (often higher than term loans)." },
      { label: "Banking History", text: "Clean banking track record with no cheque bounces in the last 6 months." },
      { label: "Age Limit", text: "21 to 60 years (limit usually expires at retirement age)." },
      { label: "KYC", text: "Standard KYC + Income proof (Bank statements are crucial)." },
    ]
  },
];

// ==========================================
// 3. The Presentational Component
// ==========================================

interface LoanEligibilityCriteriaProps {
  data: EligibilityData;
}

const LoanEligibilityCriteria: React.FC<LoanEligibilityCriteriaProps> = ({ data }) => {
  return (
    <div className={`
      max-w-6xl mx-auto mb-8 bg-white text-gray-800
      font-serif
      p-4 md:p-8
      border-0 md:border md:border-gray-200
      rounded-none md:rounded-3xl
      shadow-none md:shadow-sm
    `}>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">
        {data.title}
      </h2>

      <p className="text-base md:text-lg mb-8 text-gray-700">
        {data.linkText ? (
          <a href="#" className="text-teal-500 font-semibold hover:underline">
            {data.linkText}
          </a>
        ) : (
          <span className="font-semibold text-teal-500">Eligibility criteria</span>
        )}{" "}
        {data.description}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        {data.criteriaList.map((item, index) => (
          <div key={index} className="flex items-start gap-3">
            {/* Checkmark Icon */}
            <div className="shrink-0 mt-1">
              <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-3.5 h-3.5 text-white"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            </div>

            {/* Content */}
            <p className="text-base leading-relaxed">
              <span className="font-bold text-gray-900">{item.label}:</span>{" "}
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

// ==========================================
// 4. The Container Component (Use this one)
// ==========================================

interface LoanEligibilityContainerProps {
  id: string; // The ID to look up in the array
}

export const LoanEligibilityContainer: React.FC<LoanEligibilityContainerProps> = ({ id }) => {
  // 1. Find Data
  const data = ELIGIBILITY_DATA.find((item) => item.id === id);

  // 2. Safety Check
  if (!data) {
    console.warn(`LoanEligibilityContainer: No data found for id "${id}"`);
    return null;
  }

  // 3. Render
  return <LoanEligibilityCriteria data={data} />;
};

export default LoanEligibilityContainer;