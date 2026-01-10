import React from 'react';

// ==========================================
// 1. Data Definitions
// ==========================================

interface TipPoint {
  text: string;
  subPoints?: string[];
}

interface TipSection {
  title: string;
  points: TipPoint[];
}

interface ThingsToKnowData {
  id: string; // The lookup key
  mainTitle: string;
  sections: TipSection[];
}

// ==========================================
// 2. Centralized Data (The "Database")
// ==========================================

const THINGS_TO_KNOW_DATA: ThingsToKnowData[] = [
  // 1. Personal Loan
  {
    id: 'personal-loan',
    mainTitle: "Things to Know before You Apply",
    sections: [
      {
        title: "Pre-approved Loan Offers",
        points: [
          { text: "Many banks prefer providing instant loans to existing customers." },
          { text: "Require minimal to no documentation." },
          { text: "Quick disbursal process.", subPoints: ["Often come with lower interest rates for relationship customers."] },
        ],
      },
      {
        title: "Credit Score Impact",
        points: [
          { text: "A score of 750+ is preferred by lenders." },
          { text: "Higher scores mean better chances of approval and lower interest rates." },
        ],
      },
      {
        title: "Tenure vs EMI",
        points: [
          { text: "Longer tenure means lower EMIs but higher total interest payout." },
          { text: "Choose a tenure that balances monthly cash flow and interest cost." },
        ],
      },
      {
        title: "Foreclosure Rules",
        points: [
          { text: "No charges on floating rate loans (RBI mandate)." },
          { text: "Fixed-rate loans may attract foreclosure charges up to 4%." },
        ],
      },
    ]
  },
  // 2. Home Loan
  {
    id: 'home-loan',
    mainTitle: "Essential Home Loan Facts",
    sections: [
      {
        title: "LTV Ratio (Loan to Value)",
        points: [
          { text: "Banks usually fund only 75-90% of the property value." },
          { text: "You must arrange the remaining 10-25% as a down payment." },
          { text: "Registration and Stamp Duty charges are usually not funded." },
        ],
      },
      {
        title: "RLLR vs MCLR",
        points: [
          { text: "Repo Linked Loan Rates (RLLR) are more transparent." },
          { text: "Interest rates change immediately when RBI changes the Repo Rate." },
        ],
      },
      {
        title: "Tax Benefits",
        points: [
          { text: "Principal repayment eligible for deduction under Sec 80C." },
          { text: "Interest payment eligible for deduction under Sec 24(b)." },
        ],
      },
      {
        title: "Property Legality",
        points: [
          { text: "Ensure the project is RERA approved." },
          { text: "Banks conduct legal verification; a rejection often indicates property issues." },
        ],
      },
    ]
  },
  // 3. Business Loan
  {
    id: 'business-loan',
    mainTitle: "Business Loan Prerequisites",
    sections: [
      {
        title: "Business Vintage",
        points: [
          { text: "Most lenders require a business existence of at least 3 years." },
          { text: "Startups less than 1 year old may face difficulty getting unsecured loans." },
        ],
      },
      {
        title: "Cash Flow vs Profit",
        points: [
          { text: "Lenders look at banking turnover more than just net profit." },
          { text: "Avoid cash transactions; route everything through the current account." },
        ],
      },
      {
        title: "Collateral Requirements",
        points: [
          { text: "Unsecured loans have higher interest rates." },
          { text: "Secured loans (against property/machinery) offer lower rates and higher amounts." },
        ],
      },
      {
        title: "GST Compliance",
        points: [
          { text: "Regular GST filing is mandatory for most lenders." },
          { text: "Discrepancies between GST returns and Bank Statements can lead to rejection." },
        ],
      },
    ]
  },
  // 4. Transfer Personal Loan
  {
    id: 'transfer-personal-loan',
    mainTitle: "Balance Transfer Checklist",
    sections: [
      {
        title: "Cost Benefit Analysis",
        points: [
          { text: "Calculate the processing fee of the new loan." },
          { text: "Add the foreclosure charges of the old loan." },
          { text: "Only proceed if the interest saving is higher than these costs." },
        ],
      },
      {
        title: "Timing Matters",
        points: [
          { text: "Transfer is beneficial in the early years of the loan." },
          { text: "If you have paid more than 50% of EMIs, the interest saving is negligible." },
        ],
      },
      {
        title: "Top-Up Facility",
        points: [
          { text: "Most transfers come with a Top-Up loan option." },
          { text: "This is cheaper than taking a separate second personal loan." },
        ],
      },
      {
        title: "Credit Score Check",
        points: [
          { text: "Ensure you haven't missed any EMIs on the existing loan." },
          { text: "A drop in credit score can lead to rejection of the transfer request." },
        ],
      },
    ]
  },
  // 5. Professional Loan
  {
    id: 'professional-loan',
    mainTitle: "For Doctors & CAs",
    sections: [
      {
        title: "Degree is Key",
        points: [
          { text: "Your highest qualification determines the loan limit." },
          { text: "MD/MS doctors usually get higher limits than MBBS." },
        ],
      },
      {
        title: "Practice Vintage",
        points: [
          { text: "Post-qualification experience is crucial." },
          { text: "Minimum 2-3 years of practice is preferred by most banks." },
        ],
      },
      {
        title: "End Use Flexibility",
        points: [
          { text: "Funds can be used for clinic expansion or personal needs." },
          { text: "Some lenders may ask for quotations if buying medical equipment." },
        ],
      },
      {
        title: "Processing Speed",
        points: [
          { text: "These are often processed under 'Green Channel' schemes." },
          { text: "Expect approvals faster than standard business loans." },
        ],
      },
    ]
  },
  // 6. Loan Against Property
  {
    id: 'loan-against-property',
    mainTitle: "LAP Critical Points",
    sections: [
      {
        title: "Valuation vs Disbursement",
        points: [
          { text: "Loan amount is based on the bank's valuation, not market asking price." },
          { text: "LTV is capped at 60-70% for LAP (lower than Home Loans)." },
        ],
      },
      {
        title: "Property Usage",
        points: [
          { text: "Self-occupied residential properties get the best rates." },
          { text: "Commercial or rented properties may attract higher interest rates." },
        ],
      },
      {
        title: "Processing Time",
        points: [
          { text: "Takes longer than personal loans due to legal & technical verification." },
          { text: "Expect 7-15 days for disbursement." },
        ],
      },
      {
        title: "Tenure",
        points: [
          { text: "Available for up to 15 years." },
          { text: "Longer tenure reduces EMI but increases total interest cost." },
        ],
      },
    ]
  },
  // 7. Transfer Home Loan
  {
    id: 'transfer-home-loan',
    mainTitle: "Switching Home Loans",
    sections: [
      {
        title: "MODT Charges",
        points: [
          { text: "Transfer involves re-registering the mortgage (MODT)." },
          { text: "Factor in stamp duty charges (0.2% - 0.5%) in your savings calculation." },
        ],
      },
      {
        title: "List of Documents (LOD)",
        points: [
          { text: "Your current bank must issue a precise list of documents held by them." },
          { text: "Delays in receiving LOD is the biggest bottleneck in transfers." },
        ],
      },
      {
        title: "External Benchmark",
        points: [
          { text: "Ensure the new loan is Repo-linked." },
          { text: "Avoid switching to a bank offering MCLR based rates." },
        ],
      },
      {
        title: "Foreclosure Letter",
        points: [
          { text: "Obtain a tentative foreclosure letter to know exact outstanding." },
          { text: "Check if there are any hidden penalties (usually zero for floating rates)." },
        ],
      },
    ]
  },
  // 8. Education Loan
  {
    id: 'education-loan',
    mainTitle: "Student Loan Facts",
    sections: [
      {
        title: "Moratorium Period",
        points: [
          { text: "You don't pay Principal during the course." },
          { text: "Simple interest is charged during the study period." },
        ],
      },
      {
        title: "Co-applicant Role",
        points: [
          { text: "For loans > 4-7.5 Lakhs, a co-applicant is mandatory." },
          { text: "Co-applicant's CIBIL score affects approval chances." },
        ],
      },
      {
        title: "Tax Benefits",
        points: [
          { text: "Interest paid is 100% deductible under Sec 80E." },
          { text: "Benefit is available for 8 years." },
        ],
      },
      {
        title: "Margin Money",
        points: [
          { text: "For foreign studies, banks fund 85-90% of costs." },
          { text: "You must show proof of funds for the remaining margin money." },
        ],
      },
    ]
  },
  // 9. Loan Against Security
  {
    id: 'loan-against-security',
    mainTitle: "Pledging Investments",
    sections: [
      {
        title: "Approved List",
        points: [
          { text: "Banks only lend against securities on their approved list." },
          { text: "Penny stocks or illiquid funds are not accepted." },
        ],
      },
      {
        title: "LTV Ratios",
        points: [
          { text: "50% of value for Equity Shares." },
          { text: "Up to 80-90% for Debt Funds and Bonds." },
        ],
      },
      {
        title: "Margin Call",
        points: [
          { text: "If stock market crashes, value of pledged assets drops." },
          { text: "Bank may ask you to pledge more shares or pay cash immediately." },
        ],
      },
      {
        title: "Digital Process",
        points: [
          { text: "Lien marking is done digitally via NSDL/CDSL." },
          { text: "Funds are often available as an Overdraft." },
        ],
      },
    ]
  },
  // 10. Used Car Loan
  {
    id: 'used-car-loan',
    mainTitle: "Buying Pre-Owned",
    sections: [
      {
        title: "Valuation Check",
        points: [
          { text: "Loan is based on Bank's valuation, not Seller's price." },
          { text: "If seller asks 5L but bank values at 4L, you get loan on 4L." },
        ],
      },
      {
        title: "Interest Rates",
        points: [
          { text: "Rates are 2-5% higher than new car loans." },
          { text: "Compare with Personal Loan rates before deciding." },
        ],
      },
      {
        title: "Age of Vehicle",
        points: [
          { text: "Car age + Loan Tenure should usually not exceed 8-10 years." },
          { text: "Older cars attract higher interest rates." },
        ],
      },
      {
        title: "RC Transfer",
        points: [
          { text: "Transferring RC to your name is mandatory." },
          { text: "Bank holds the RC copy until loan closure." },
        ],
      },
    ]
  },
  // 11. Used Bike Loan
  {
    id: 'used-bike-loan',
    mainTitle: "Used Two-Wheeler Tips",
    sections: [
      {
        title: "High Interest Rates",
        points: [
          { text: "Often range between 18% to 24%." },
          { text: "Check if a credit card EMI is cheaper." },
        ],
      },
      {
        title: "Condition Verification",
        points: [
          { text: "Physical verification of engine/chassis number is done." },
          { text: "Insurance must be valid and transferred." },
        ],
      },
      {
        title: "Hypothecation Removal",
        points: [
          { text: "Ensure previous owner has cleared their loan." },
          { text: "Check for NOC if the bike was previously financed." },
        ],
      },
      {
        title: "Loan Amount",
        points: [
          { text: "Banks fund 60-70% of the valuation." },
          { text: "Be ready with a substantial down payment." },
        ],
      },
    ]
  },
  // 12. New Car Loan
  {
    id: 'new-car-loan',
    mainTitle: "New Car Finance",
    sections: [
      {
        title: "On-Road vs Ex-Showroom",
        points: [
          { text: "Prefer banks that fund 'On-Road' price." },
          { text: "This covers insurance and registration costs." },
        ],
      },
      {
        title: "Fixed vs Floating",
        points: [
          { text: "Car loans are usually fixed rate." },
          { text: "Prepayment penalties apply on fixed rate loans." },
        ],
      },
      {
        title: "Dealer vs Bank",
        points: [
          { text: "Dealer finance is convenient but may have hidden commissions." },
          { text: "Always compare with an external bank offer." },
        ],
      },
      {
        title: "Depreciation Cover",
        points: [
          { text: "Take Zero-Depreciation insurance." },
          { text: "It protects the car's value in case of total loss/theft claims." },
        ],
      },
    ]
  },
  // 13. New Bike Loan
  {
    id: 'new-bike-loan',
    mainTitle: "New Bike Loan Tips",
    sections: [
      {
        title: "Hypothecation",
        points: [
          { text: "Bank's name will be on the RC." },
          { text: "You need to pay a fee to remove this after loan closure." },
        ],
      },
      {
        title: "CIBIL Impact",
        points: [
          { text: "Small loans also impact credit score." },
          { text: "Defaulting on a small bike loan can ruin future home loan chances." },
        ],
      },
      {
        title: "Down Payment",
        points: [
          { text: "Low down payment schemes exist but have higher rates." },
          { text: "Paying 15-20% upfront gets you a better deal." },
        ],
      },
      {
        title: "Processing Fees",
        points: [
          { text: "Look for festive offers." },
          { text: "Many banks waive processing fees during festivals." },
        ],
      },
    ]
  }
];

// ==========================================
// 3. The Presentational Component
// ==========================================

interface ThingsToKnowContainerProps {
  id: string; // The ID to look up in the array
  className?: string;
}

const ThingsToKnowContainer: React.FC<ThingsToKnowContainerProps> = ({ id, className }) => {
  // 1. Find Data
  const data = THINGS_TO_KNOW_DATA.find((item) => item.id === id);

  // 2. Safety Check
  if (!data) {
    console.warn(`ThingsToKnowContainer: No data found for id "${id}"`);
    return null;
  }

  // 3. Render
  return (
    <div className={`
      max-w-6xl mx-auto mb-8 bg-white text-gray-800 font-serif
      p-4 md:p-8
      border-0 md:border md:border-gray-200
      rounded-none md:rounded-3xl
      shadow-none md:shadow-sm
      ${className || ''}
    `}>
      
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8 border-b pb-4">
        {data.mainTitle}
      </h2>

      <div className="grid gap-6 md:gap-10 grid-cols-1 md:grid-cols-2">
        {data.sections.map((section, index) => (
          <div key={index} className="flex flex-col">
            {/* Height constraint logic preserved from original code */}
            <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3 md:mb-4 min-h-auto md:h-14 flex items-center">
              {section.title}
            </h3>
            
            <ul className="space-y-4">
              {section.points.map((point, pIndex) => (
                <li key={pIndex} className="flex flex-col gap-2">
                  <div className="flex items-start gap-3">
                    {/* Main Bullet Icon */}
                    <div className="shrink-0 mt-1">
                      <div className="w-5 h-5 rounded-full bg-teal-500 flex items-center justify-center">
                        <svg 
                          className="w-3 h-3 text-white" 
                          fill="none" 
                          strokeWidth="3" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </div>
                    </div>
                    {/* Main Bullet Text */}
                    <span className="text-gray-700 text-sm md:text-base font-medium leading-relaxed">
                      {point.text}
                    </span>
                  </div>

                  {/* Render Sub-points if they exist */}
                  {point.subPoints && (
                    <ul className="pl-10 space-y-2 mt-1">
                      {point.subPoints.map((sub, sIndex) => (
                        <li key={sIndex} className="flex items-start gap-2">
                          {/* Sub-bullet Icon */}
                          <div className="shrink-0 mt-1.5">
                            <div className="w-4 h-4 rounded-full bg-teal-100 flex items-center justify-center">
                              <svg 
                                className="w-2.5 h-2.5 text-teal-600" 
                                fill="none" 
                                strokeWidth="3" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                              </svg>
                            </div>
                          </div>
                          <span className="text-gray-600 text-sm leading-relaxed">
                            {sub}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThingsToKnowContainer;