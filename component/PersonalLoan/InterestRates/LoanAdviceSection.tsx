import React from 'react';

// 1. Data Structure
interface AdviceSectionData {
  id: string;
  title: string;
  description: string;
  points: string[];
}

// 2. Data Store
const ADVICE_DATA: AdviceSectionData[] = [
  {
    id: 'loan-interest-tips',
    title: 'How to Get a Personal Loan with Low Interest Rate?',
    description: 'The interest rates of personal loans can significantly impact your overall borrowing costs. Here are five tips you can follow to improve your chances of availing a personal loan at a lower interest rate:',
    points: [
      'Maintain a good credit score of 750 or above – by timely repayment of credit card bills and/or EMIs, avoid frequent multiple credit card applications or loans, etc.',
      'Consider checking with the lender(s) where you hold a deposit/loan account/credit card. These lenders usually offer loans at preferential interest rates or extend pre-approved offers.',
      'Maintain job stability and avoid frequent employment changes, as it would reflect income instability.',
      'Visit Paisabazaar to compare personal loan offers from multiple lenders based on their interest rates, loan tenure, amounts, disbursal times, fees and other charges.',
      'Avoid making multiple personal loan applications within a short duration as it would reduce your credit scores, thus making it harder to get your personal loan approved at lower interest rates.'
    ]
  }
];

// 3. Icon Component (Updated to Teal-500)
const CheckIcon = () => (
  <div className="flex-shrink-0 mt-1 text-teal-500">
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* "fill='currentColor'" allows the SVG to take the color from the parent's text-teal-500 class */}
      <circle cx="12" cy="12" r="12" fill="currentColor" />
      <path 
        d="M7 12L10.5 15.5L17 9" 
        stroke="white" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </svg>
  </div>
);

// 4. Props Interface
interface LoanAdviceSectionProps {
  sectionId: string;
}

// 5. Main Component
const LoanAdviceSection: React.FC<LoanAdviceSectionProps> = ({ sectionId }) => {
  const content = ADVICE_DATA.find((item) => item.id === sectionId);

  if (!content) return null;

  return (
    <div className="max-w-6xl mx-auto mb-8 bg-white text-gray-800 font-serif p-4 md:p-8 border-0 md:border md:border-gray-200 rounded-none md:rounded-3xl shadow-none md:shadow-sm">
      
      {/* Title */}
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
        {content.title}
      </h2>

      {/* Description - Added font-sans to keep body text readable/modern */}
      <p className="font-sans text-base md:text-lg mb-6 leading-relaxed text-gray-700">
        {content.description}
      </p>

      {/* Points List */}
      <ul className="space-y-5 font-sans">
        {content.points.map((point, index) => (
          <li key={index} className="flex items-start gap-3 md:gap-4">
            <CheckIcon />
            <span className="text-base md:text-[17px] leading-relaxed text-gray-800">
              {/* If you have specific highlighting logic (like the blue text in the image), 
                  you can parse the string here. For now, it renders the full text. */}
              {point}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LoanAdviceSection;