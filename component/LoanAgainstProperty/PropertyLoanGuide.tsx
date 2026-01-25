import React from 'react';

const PropertyLoanGuide = ({ pageId }: { pageId: string }) => {
  // Data for Loan Against Property (LAP)
  const loanData = [
    { id: "5-lakh", amount: "5 Lakh" },
    { id: "10-lakh", amount: "10 Lakh" },
    { id: "20-lakh", amount: "20 Lakh" },
    { id: "30-lakh", amount: "30 Lakh" },
    { id: "40-lakh", amount: "40 Lakh" },
    { id: "50-lakh", amount: "50 Lakh" },
    { id: "75-lakh", amount: "75 Lakh" },
    { id: "1-cr", amount: "1 Crore" },
    { id: "2-cr", amount: "2 Crore" },
  ].map(loan => ({
    id: loan.id,
    sections: [
      {
        title: `Why Opt for a Loan Against Property of Rs. ${loan.amount}?`,
        description: `A Rs. ${loan.amount} LAP allows you to unlock the dormant value of your property for significant expenditures:`,
        items: [
          "Business Expansion: Funding working capital or purchasing new machinery",
          "Debt Consolidation: Paying off high-interest personal loans or credit card dues",
          "Education: Financing higher studies for children in India or abroad",
          "Medical Emergencies: Covering large-scale healthcare costs",
          "Wedding Expenses: Managing the costs of a destination wedding or grand celebrations"
        ]
      },
      {
        title: `Eligibility for a Rs. ${loan.amount} LAP`,
        description: "Lenders evaluate both your income stability and the property's market value:",
        items: [
          "Age: 21 to 65 years (Salaried) or up to 70 years (Self-employed)",
          "Employment: Salaried, Self-Employed Professionals (Doctors/CAs), or Business Owners",
          "Property Type: Residential, Commercial, or Industrial property with clear titles",
          "Credit Score: 700+ preferred for competitive interest rates",
          "LTV Ratio: Typically up to 60-70% of the property's market value"
        ]
      },
      {
        title: "Documents Required",
        description: "You will need to provide financial, personal, and property-related documents:",
        items: [
          "Identity Proof: Aadhaar, PAN Card, or Passport",
          "Income Proof (Salaried): Last 3 months' salary slips and Form 16",
          "Income Proof (Self-Employed): 2-3 years of audited financials and ITR",
          "Bank Statements: Last 6 months' statements of your primary account",
          "Property Documents: Copy of Title Deeds, approved plan, and latest tax receipts"
        ]
      },
      {
        title: "Interest Rates & Charges",
        description: "LAP rates are generally higher than home loans but significantly lower than personal loans:",
        items: [
          "Interest Rate: Typically starts from 9.00% to 11.00% p.a.",
          "Processing Fee: 0.5% to 2% of the loan amount",
          "Tenure: Flexible repayment options up to 15-20 years",
          "Prepayment: Zero penalty for floating-rate loans for individual borrowers"
        ]
      },
      {
        title: "Benefits of Loan Against Property",
        description: "Why this is a preferred choice for high-value funding:",
        items: [
          "Lower EMIs: Longer tenures result in smaller monthly outflows compared to personal loans",
          "High Loan Quantum: Access larger funds based on property value",
          "Retain Ownership: Continue using your property while the loan is active",
          "Usage Flexibility: No end-use restrictions (can be used for business or personal needs)"
        ]
      }
    ]
  }));

  const content = loanData.find((data) => data.id === pageId);

  if (!content) return null;

  return (
    <div className="max-w-6xl mx-auto mb-8 bg-white text-gray-800 font-serif p-4 md:p-8 border-0 md:border md:border-gray-200 rounded-none md:rounded-3xl shadow-none md:shadow-sm">
      <div className="space-y-10">
        {content.sections.map((section, index) => (
          <div key={index} className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              {section.title}
            </h2>

            {section.description && (
              <p className="text-lg text-gray-700">
                {section.description}
              </p>
            )}

            <ul className="space-y-3 mt-4">
              {section.items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="shrink-0 mt-1">
                    <svg 
                      className="w-6 h-6 text-teal-600 fill-current" 
                      viewBox="0 0 20 20" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                  </div>
                  
                  <span className="text-lg leading-relaxed text-gray-700">
                    {item.includes(':') ? (
                      <>
                        <span className="font-bold text-gray-900">
                          {item.split(':')[0]}:
                        </span>
                        {item.substring(item.indexOf(':') + 1)}
                      </>
                    ) : (
                      item
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyLoanGuide;