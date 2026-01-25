import React from 'react';

const SecuritiesLoanGuide = ({ pageId }: { pageId: string }) => {
  // Data for Loan Against Securities (LAS)
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
        title: `Why Opt for a Loan Against Securities of Rs. ${loan.amount}?`,
        description: `A Rs. ${loan.amount} LAS provides instant liquidity without the need to sell your long-term investments:`,
        items: [
          "Wealth Preservation: Stay invested and continue to earn dividends, interest, and capital appreciation",
          "Seizing Opportunities: Quickly fund new investment opportunities or market dips",
          "Business Working Capital: Ideal for short-term business cycles or urgent inventory purchases",
          "Tax Efficiency: Avoid capital gains tax that would be triggered by selling your securities",
          "Contingency Fund: Use it as an emergency credit line for medical or personal needs"
        ]
      },
      {
        title: `Eligibility for a Rs. ${loan.amount} LAS`,
        description: "Approval is primarily based on the quality and value of your pledged portfolio:",
        items: [
          "Eligible Assets: Equity shares (Group A), Equity/Debt Mutual Funds, LIC Policies, or NSC/KVP",
          "Investor Profile: Individual residents, HUFs, and Sole Proprietors",
          "Age: 21 to 70 years",
          "LTV Ratio: Up to 50% for Equity Shares/MFs and up to 80-90% for Debt Funds/Life Insurance",
          "Demat Account: Securities must be held in electronic form for seamless lien marking"
        ]
      },
      {
        title: "Documents Required",
        description: "The process is mostly digital, requiring minimal paperwork compared to property loans:",
        items: [
          "KYC Documents: Aadhaar, PAN Card, and a photograph",
          "Holding Statement: Latest CAS (Combined Account Statement) or Demat holding statement",
          "Lien Marking: Online acceptance of pledge request via NSDL/CDSL",
          "Bank Proof: Cancelled cheque of the account where the credit line will be linked",
          "Income Proof: Required for higher ticket sizes (ITR or Form 16)"
        ]
      },
      {
        title: "Interest Rates & Operational Charges",
        description: "LAS is one of the most cost-effective ways to borrow, as interest is usually charged on a daily reducing balance:",
        items: [
          "Interest Rate: Typically ranges from 8.50% to 10.50% p.a.",
          "Overdraft Facility: Pay interest only on the amount utilized, not the total sanctioned limit",
          "Processing Fee: Flat fee or up to 0.5% of the credit limit",
          "Pledge Charges: Small fee charged by the depository (NSDL/CDSL) for lien marking",
          "Renewal: Limits are typically renewed annually based on portfolio performance"
        ]
      },
      {
        title: "Key Benefits of LAS",
        description: "Why smart investors prefer pledging over selling:",
        items: [
          "No EMI Pressure: Pay only the interest monthly; the principal can be managed flexibly",
          "Instant Disbursal: Digital end-to-end processing often leads to same-day funding",
          "Retain Corporate Actions: You continue to receive Dividends, Bonuses, and Rights Issues",
          "Zero Foreclosure Charges: Close the credit line anytime without penalties",
          "High Flexibility: Pledge or unpledge securities as per your changing fund requirements"
        ]
      }
    ]
  }));

  const content = loanData.find((data) => data.id === pageId);

  if (!content) return null;

  return (
    <div className="max-w-6xl mx-auto mb-8 bg-white text-gray-800 font-sans p-4 md:p-8 border-0 md:border md:border-slate-200 rounded-none md:rounded-3xl shadow-none md:shadow-sm">
      <div className="space-y-10">
        {content.sections.map((section, index) => (
          <div key={index} className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
              {section.title}
            </h2>

            {section.description && (
              <p className="text-lg text-slate-600">
                {section.description}
              </p>
            )}

            <ul className="grid grid-cols-1 gap-3 mt-4">
              {section.items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
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
                  
                  <span className="text-lg leading-relaxed text-slate-700">
                    {item.includes(':') ? (
                      <>
                        <span className="font-bold text-slate-900">
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

export default SecuritiesLoanGuide;