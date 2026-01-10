import React from 'react';

interface TipPoint {
  text: string;
  subPoints?: string[];
}

interface TipSection {
  title: string;
  points: TipPoint[];
}

const HomeLoanTransferTips: React.FC = () => {
  // SEO-Optimized Data: Focuses on "Is Transfer Worth It?" keywords
  const sections: TipSection[] = [
    {
      title: "Check the Interest Rate Difference",
      points: [
        { text: "Ensure the new rate is significantly lower (at least 0.25% - 0.50%) than your current rate." },
        { text: "Even a small reduction can save lakhs in interest over a long tenure like 15-20 years." },
      ],
    },
    {
      title: "Calculate the 'Total Cost of Transfer'",
      points: [
        { text: "A lower interest rate isn't the only factor." },
        { 
          text: "Account for one-time switchover costs:",
          subPoints: [
            "Processing Fees (usually 0.5% - 1% of loan amount)",
            "Legal & Technical Verification Charges",
            "Foreclosure charges (if applicable on fixed-rate loans)"
          ]
        },
      ],
    },
    {
      title: "Timing Matters: Remaining Tenure",
      points: [
        { text: "Balance transfer is most beneficial during the early years of your loan." },
        { text: "If you have less than 5 years remaining or have already paid off most of the interest component, switching might not yield high savings." },
      ],
    },
    {
      title: "Credit Score & Top-Up Eligibility",
      points: [
        { text: "Lenders offer the best transfer rates only to borrowers with a CIBIL Score of 750+." },
        { text: "Check if the new lender offers a 'Top-Up Loan' facility at the same home loan rate for your renovation or personal needs." },
      ],
    },
  ];

  // Schema Markup for FAQ/Q&A - High SEO Value
  // This helps this content appear in "People Also Ask" in Google
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": sections.map(section => ({
      "@type": "Question",
      "name": section.title,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": section.points.map(p => p.text + (p.subPoints ? ' ' + p.subPoints.join(', ') : '')).join(' ')
      }
    }))
  };

  return (
    <section className="w-full max-w-6xl mx-auto p-10 bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 mb-8">
      {/* Inject SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <h2 className="text-3xl font-bold text-gray-900 mb-2">
        Things to Consider Before Transferring Your Home Loan
      </h2>
      <p className="text-gray-600 mb-8 pb-4 border-b border-gray-100 max-w-3xl">
        Refinancing your home loan is a smart financial move, but it requires calculation. Review these critical factors to ensure your savings outweigh the transfer costs.
      </p>

      <div className="grid gap-10 md:grid-cols-2">
        {sections.map((section, index) => (
          <div key={index} className="flex flex-col">
            <h3 className="text-xl font-bold text-teal-700 mb-4 h-auto md:h-14 flex items-center">
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
                    <span className="text-gray-700 text-sm md:text-base font-medium">
                      {point.text}
                    </span>
                  </div>

                  {/* Render Sub-points if they exist */}
                  {point.subPoints && (
                    <ul className="pl-10 space-y-2 mt-1 border-l-2 border-teal-100 ml-2.5">
                      {point.subPoints.map((sub, sIndex) => (
                        <li key={sIndex} className="flex items-start gap-2">
                          <span className="text-teal-400 text-xs mt-1.5">●</span>
                          <span className="text-gray-600 text-sm">
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
    </section>
  );
};

export default HomeLoanTransferTips;