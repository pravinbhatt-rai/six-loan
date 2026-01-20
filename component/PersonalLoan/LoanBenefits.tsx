'use client';
import React from 'react';
import { Check } from 'lucide-react';

// --- 1. Data Definitions ---

interface BenefitData {
  id: string;
  title: string;
  description: string;
  benefitsHeader: string;
  benefits: string[];
}

// The Centralized Data Array
const LOAN_BENEFITS_DATA: BenefitData[] = [
  // 1. Personal Loan
  {
    id: 'personal-loan',
    title: "Why Apply for a Personal Loan on SIX Loan?",
    description: "SIX Loan provides personal loan offers from 30+ lenders, ranked in order of chances of approval. This helps borrowers compare offers and also apply for the best-suited loan with certainty. Through deep integrations with India's top banks & NBFCs, we facilitate a seamless experience.",
    benefitsHeader: "Benefits of Applying for Personal Loans",
    benefits: [
      "No need to visit multiple lender websites",
      "Compare offers from leading Banks & NBFCs",
      "Get curated loan offers based on your eligibility",
      "Know your chances of approval instantly",
      "Check pre-approved offers with zero documentation",
      "Seamless end-to-end digital processes",
    ]
  },
  // *** NEW ENTRY: Pre-approved Personal Loan ***
  {
    id: 'pre-approved-loan',
    title: "Why Choose a Pre-approved Personal Loan?",
    description: "Pre-approved loans are exclusive offers extended to select customers based on their creditworthiness and relationship with the bank. These loans bypass the lengthy verification process, offering instant funds when you need them most.",
    benefitsHeader: "Key Benefits of Pre-approved Offers",
    benefits: [
      "Instant disbursal (often in minutes)",
      "Zero physical documentation required",
      "No collateral or security needed",
      "Preferential interest rates for existing customers",
      "Flexible repayment tenures",
      "100% digital application process",
    ]
  },
  {
    id: 'medical-personal-loan',
    title: "Why Choose a Medical Personal Loan?",
    description: "Medical loans provide immediate financial relief during health emergencies, ensuring that a lack of funds never compromises the quality of treatment. Unlike insurance, which may have caps or waiting periods, these loans offer comprehensive coverage for all medical-related expenses.",
    benefitsHeader: "Key Benefits of Medical Loans",
    benefits: [
      "Quick disbursal (often within 24 hours)",
      "Covers costs not paid by insurance (e.g., co-pays)",
      "No collateral or security required",
      "Flexible tenures up to 60 months to lower EMIs",
      "Minimal documentation to speed up processing",
      "Funds can be used for surgery, medicines, or therapy",
    ]
  },
  // 2. Home Loan
  {
    id: 'home-loan',
    title: "Why Choose SIX Loan for Your Dream Home?",
    description: "Navigating home loans can be complex. We simplify it by aggregating offers from top mortgage lenders. We analyze your profile against property valuation and income to suggest lenders that offer the highest eligibility and lowest interest rates.",
    benefitsHeader: "Key Advantages of our Home Loan Process",
    benefits: [
      "Compare interest rates from 20+ Housing Finance Companies",
      "Doorstep service for document collection",
      "Expert legal and technical verification support",
      "Guidance on PMAY (Pradhan Mantri Awas Yojana) benefits",
      "Higher loan-to-value (LTV) ratio options",
      "Tenure options up to 30 years for lower EMIs",
    ]
  },
  // 3. Business Loan
  {
    id: 'business-loan',
    title: "Accelerate Your Business with SIX Loan",
    description: "Whether you are a startup or an established MSME, cash flow is king. We connect you with lenders who understand business models, not just credit scores. Our algorithm matches your GST and banking data to the right lender for maximum funding.",
    benefitsHeader: "Business Loan Highlights",
    benefits: [
      "Unsecured loans up to ₹75 Lakhs",
      "Collateral-free options for MSMEs",
      "Flexible repayment tenures from 12 to 60 months",
      "Overdraft limits to manage daily cash flow",
      "Minimal documentation based on GST returns",
      "Quick disbursement within 48 hours",
    ]
  },
  // 4. Transfer Personal Loan
  {
    id: 'transfer-personal-loan',
    title: "Why Switch Your Personal Loan?",
    description: "If your credit score has improved since you took your loan, you shouldn't be paying the old high rates. Our Balance Transfer calculator shows exactly how much you save by switching to a new lender, often accompanied by a top-up loan for extra needs.",
    benefitsHeader: "Balance Transfer Benefits",
    benefits: [
      "Reduce interest rates by up to 2-4%",
      "Consolidate multiple loans into one EMI",
      "Get an additional Top-Up loan instantly",
      "Zero foreclosure charges with select lenders",
      "Simplified paperwork for transfer process",
      "Reduce your monthly EMI burden immediately",
    ]
  },
  // 5. Professional Loan
  {
    id: 'professional-loan',
    title: "Exclusive Loans for Professionals",
    description: "We value your qualification. Doctors, CAs, and Engineers get preferential treatment in the lending market. SIX Loan brings you exclusive schemes that offer higher loan amounts without the need for collateral or guarantors.",
    benefitsHeader: "Privileges for Professionals",
    benefits: [
      "Higher loan limits up to ₹50 Lakhs",
      "No collateral or security required",
      "Lower interest rates than standard personal loans",
      "Special 'Green Channel' processing priority",
      "Part-payment flexibility options",
      "Minimal documentation based on certification",
    ]
  },
  // 6. Loan Against Property (LAP)
  {
    id: 'loan-against-property',
    title: "Unlock High-Value Capital with LAP",
    description: "Your property is a goldmine. Loan Against Property allows you to access large funds for business expansion, weddings, or medical needs at interest rates much lower than personal loans. We help you get the highest valuation for your property.",
    benefitsHeader: "Why Opt for Loan Against Property?",
    benefits: [
      "High loan amounts up to ₹5 Crores",
      "Low interest rates starting from 8.5%",
      "Long repayment tenure up to 15 years",
      "Continued usage of your property while funded",
      "Acceptance of residential and commercial properties",
      "Funding against plot/land available",
    ]
  },
  // 7. Transfer Home Loan
  {
    id: 'transfer-home-loan',
    title: "Slash Your Home Loan Interest",
    description: "A small drop in home loan rates can save you lakhs over 20 years. We analyze your existing loan and calculate the exact savings from a balance transfer. We handle the negotiation with new lenders to get you the lowest market rate.",
    benefitsHeader: "Home Loan Transfer Advantages",
    benefits: [
      "Significant reduction in total interest payable",
      "Option to reduce EMI or shorten loan tenure",
      "Avail substantial Top-Up on existing loan",
      "No hidden charges on transfer",
      "Switch from floating to fixed rates (or vice versa)",
      "Transparent comparison of savings",
    ]
  },
  // 8. Education Loan
  {
    id: 'education-loan',
    title: "Fund Your Global Ambitions",
    description: "Don't let finances limit your education. Whether it's a domestic MBA or a Master's abroad, we connect you with lenders covering 100% of the cost, including tuition, stay, and travel.",
    benefitsHeader: "Education Loan Features",
    benefits: [
      "Up to 100% financing of education costs",
      "Flexible moratorium (payment holiday) periods",
      "Covers tuition, hostel, books, and laptop",
      "Pre-visa disbursement for foreign universities",
      "Tax benefits under Section 80E",
      "Options for both secured and unsecured loans",
    ]
  },
  // 9. Loan Against Security
  {
    id: 'loan-against-security',
    title: "Liquidity Without Selling Investments",
    description: "Why sell your stocks when the market is down? Pledge them instead. We enable you to mark a lien on your shares or mutual funds digitally and get money in your bank account, keeping your portfolio intact.",
    benefitsHeader: "Benefits of Loan Against Securities",
    benefits: [
      "Pay interest only on the amount utilized",
      "Keep earning dividends and bonuses on stocks",
      "No foreclosure charges",
      "Instant digital lien marking",
      "High LTV ratios against approved securities",
      "Overdraft facility for emergency needs",
    ]
  },
  // 10. Used Car Loan
  {
    id: 'used-car-loan',
    title: "Drive Your Choice, Financing is Ours",
    description: "The pre-owned car market is booming. We ensure you aren't stuck with high-interest rates just because it's a second-hand car. We offer loans up to 90% of the car's valuation with quick verification.",
    benefitsHeader: "Used Car Loan Benefits",
    benefits: [
      "Funding up to 90% of car valuation",
      "Flexible tenure up to 5 years",
      "Competitive interest rates",
      "Quick RC verification and transfer support",
      "End-to-end assistance with ownership transfer",
      "Loans available for cars up to 10 years old",
    ]
  },
  // 11. Used Bike Loan
  {
    id: 'used-bike-loan',
    title: "Easy Finance for Two-Wheelers",
    description: "Need a reliable ride for your commute? Our Used Bike loans are designed for quick approval with minimal paperwork, ensuring you get on the road immediately.",
    benefitsHeader: "Why Apply for Used Bike Loan?",
    benefits: [
      "Low down payment options",
      "Minimum documentation required",
      "Instant approval for pre-verified customers",
      "Flexible EMIs suited for every pocket",
      "Funding for bikes up to 5 years old",
      "Quick disbursement",
    ]
  },
  // 12. New Car Loan
  {
    id: 'new-car-loan',
    title: "Bring Home Your New Car Today",
    description: "Skip the dealer's finance desk queue. Get pre-approved with SIX Loan before you enter the showroom. Negotiate better with the dealer as a cash buyer while we handle the financing backend.",
    benefitsHeader: "New Car Loan Advantages",
    benefits: [
      "Up to 100% On-Road funding",
      "Exclusive interest rates for high-cibil customers",
      "No income proof schemes available",
      "Longest tenure up to 7 years",
      "Tie-ups with all major car manufacturers",
      "Zero foreclosure charges after specific period",
    ]
  },
  // 13. New Bike Loan
  {
    id: 'new-bike-loan',
    title: "Ride Your Dream Bike",
    description: "From daily commuters to premium sports bikes, we finance them all. Our digital application process ensures you get the sanction letter before you even pick the color of your bike.",
    benefitsHeader: "New Bike Loan Features",
    benefits: [
      "Loans for all bike segments (Scooters to Superbikes)",
      "LTV up to 95% of vehicle cost",
      "Instant approval process",
      "Special rates for female applicants",
      "Minimal documentation",
      "Flexible repayment options",
    ]
  },
  {
    id: 'travel-personal-loan',
    title: "Explore the World on Your Terms",
    description: "Whether it's a solo backpacking trip through Europe or a luxury family vacation in the Maldives, our travel loans ensure you don't compromise on your experiences. Cover flights, stays, and shopping with ease.",
    benefitsHeader: "Key Features of Travel Loans",
    benefits: [
      "100% financing (No down payment required)",
      "Instant funds to lock in early-bird deals",
      "No usage restrictions (Flights, Visa, Shopping)",
      "Unsecured loan (No collateral needed)",
      "Repay comfortably over 12 to 60 months",
      "Quick digital approval process",
    ]
  },
  {
    id: 'debt-consolidation-loan',
    title: "Regain Control of Your Finances",
    description: "Stop juggling multiple credit card bills and high-interest payments. Combine all your debts into one manageable loan with a single, lower monthly EMI.",
    benefitsHeader: "Advantages of Debt Consolidation",
    benefits: [
      "One single EMI vs multiple due dates",
      "Lower interest rate than credit cards",
      "Fixed tenure to become debt-free faster",
      "Boost your credit score by clearing card utilization",
      "No collateral or security required",
      "Simplify your monthly financial planning",
    ]
  },
  {
    id: 'wedding-personal-loan',
    title: "Why Take a Wedding Loan?",
    description: "Don't compromise on your special day. Whether it's a destination wedding or a grand reception, a wedding loan ensures you have the cash flow to execute your vision.",
    benefitsHeader: "Features of Wedding Loans",
    benefits: [
      "High Loan Amount (Up to ₹40 Lakhs)",
      "No restriction on usage (Venue, Catering, Gold, Clothes)",
      "Flexible repayment up to 60-72 months",
      "Collateral-free (No need to pledge assets)",
      "Quick disbursal (Ideal for last-minute vendor payments)",
      "Overdraft facility available with select lenders",
    ]
  },
  {
    id: 'overdraft-personal-loan',
    title: "Why Choose a Personal Overdraft?",
    description: "Experience the ultimate financial freedom. Withdraw what you need, when you need it, and pay interest only on what you use.",
    benefitsHeader: "Key Advantages",
    benefits: [
      "Pay Interest Only on Utilized Amount",
      "Prepay & Re-borrow anytime (Revolving Credit)",
      "No Part-payment or Foreclosure charges",
      "24x7 Access to funds via Net Banking/ATM",
      "Ideal for fluctuating cash flow needs",
      "Interest calculated on daily basis",
    ]
  },
];

// --- 2. The Component ---

interface LoanBenefitsProps {
  id: string; // The ID to look up in the data array
  className?: string; // Optional custom styling
}

const LoanBenefits: React.FC<LoanBenefitsProps> = ({ id, className = "" }) => {
  // 1. Find the data that matches the passed ID
  const data = LOAN_BENEFITS_DATA.find((item) => item.id === id);

  // 2. Safety check: If ID doesn't exist, return null
  if (!data) {
    console.warn(`LoanBenefits: No data found for id "${id}"`);
    return null;
  }

  // 3. Render
  return (
    <div
      className={`
        max-w-6xl mx-auto mb-8 bg-white text-gray-800
        font-serif
        p-4 md:p-8
        border-0 md:border md:border-gray-200
        rounded-none md:rounded-3xl
        shadow-none md:shadow-sm
        ${className}
      `}
    >

      {/* Introduction Section */}
      <section className="mb-8 md:mb-10">
        <h2 className="mb-3 text-xl font-bold font-serif text-gray-900 md:mb-4 md:text-3xl">
          {data.title}
        </h2>
        <p className="text-sm leading-relaxed text-gray-700 md:text-lg">
          {data.description}
        </p>
      </section>

      {/* Benefits List Section */}
      <section>
        <h3 className="mb-4 text-lg font-bold font-serif text-gray-900 md:mb-6 md:text-2xl">
          {data.benefitsHeader}
        </h3>
        <ul className="space-y-4">
          {data.benefits.map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              {/* Check Icon with Teal-500 Background */}
              <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-500 shadow-sm md:mt-1 md:h-6 md:w-6">
                <Check className="h-3 w-3 text-white md:h-3.5 md:w-3.5" strokeWidth={4} />
              </div>
              {/* Benefit Text */}
              <span className="text-sm text-gray-700 md:text-lg">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </section>

    </div>
  );
};

export default LoanBenefits;