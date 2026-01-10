import React from 'react';

// Reusable Icon Component
const CheckCircleIcon = () => (
  <svg 
    className="w-6 h-6 text-teal-500 shrink-0 mt-0.5" 
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

const TransferTipsAndFacts = () => {
  // SEO Data: "How to get approved for transfer"
  const tipsData = [
    "Ensure your CIBIL Score is 750+ to unlock the lowest 'Repo-Linked' interest rates.",
    "Clear any recent EMI bounces on your existing home loan before applying (clean repayment track record of 12 months is mandatory).",
    "Obtain the 'List of Documents' (LOD) and Foreclosure Letter from your current lender in advance.",
    "Negotiate for a 'Processing Fee Waiver'—many banks waive this for balance transfer cases.",
    "Check if the new lender offers a 'Top-Up Loan' at the same home loan rate to consolidate other high-interest debts."
  ];

  // SEO Data: "Why transfer now?" (Market Trends)
  const factsData = [
    "Borrowers switching from 'Fixed Rate' to 'Floating Rate' (Repo Linked) loans often save up to 2-3% on interest rates.",
    "As per RBI guidelines, individual borrowers paying a floating interest rate are NOT charged any foreclosure penalties.",
    "A 0.5% reduction in interest rate on a ₹50 Lakh loan (20 years) can save you approximately ₹3.5 Lakhs in total interest.",
    "Home Loan Top-Ups are currently 40-50% cheaper than Personal Loans, making them the preferred choice for renovation funding.",
    "Most banks now offer 'Digital Sanction' for balance transfers, reducing approval time from weeks to just 3-5 days."
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-12 font-sans text-gray-800 bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
      
      {/* SECTION 1: Actionable Tips */}
      <section>
        <h2 className="text-3xl font-bold mb-4 text-gray-900">
          5 Tips to Fast-Track Your Home Loan Transfer
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Refinancing involves technical verification. Ensure a smooth switch by following these expert guidelines:
        </p>
        <ul className="space-y-4">
          {tipsData.map((tip, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircleIcon />
              <span className="text-lg leading-relaxed text-gray-700 font-medium">{tip}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Divider */}
      <hr className="border-gray-200" />

      {/* SECTION 2: Market Insights / Facts */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-gray-900">
          Did You Know? Home Loan Transfer Facts
        </h2>
        <ul className="space-y-4 mb-8">
          {factsData.map((fact, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="shrink-0 mt-1">
                {/* Lightbulb Icon for "Insights" */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-yellow-500">
                  <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-1.125 3.125c-.622.84-1.125 1.909-1.125 3.025v.6a.75.75 0 01-1.5 0v-.6c0-1.875 1.125-3.375 2.25-4.5.613-.613.875-1.338.875-2.25a3 3 0 00-6 0c0 .912.262 1.637.875 2.25a.75.75 0 01-1.06 1.06A4.483 4.483 0 017.5 12z" />
                  <path d="M11.25 19.5h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 010-1.5z" />
                  <path d="M6.375 5.375a.75.75 0 00.75.75h2.25a.75.75 0 000-1.5H7.125a.75.75 0 00-.75.75zM16.875 5.375a.75.75 0 00.75.75h2.25a.75.75 0 000-1.5h-2.25a.75.75 0 00-.75.75z" />
                </svg>
              </div>
              <span className="text-lg leading-relaxed text-gray-700">{fact}</span>
            </li>
          ))}
        </ul>
        
        {/* Footer Note */}
        <p className="text-sm font-medium bg-gray-50 p-4 rounded-lg text-gray-600 border border-gray-100">
          <strong>Source:</strong> <span className="text-teal-600">RBI Financial Stability Reports</span> & Market Analysis (2024-25).
        </p>
      </section>

    </div>
  );
};

export default TransferTipsAndFacts;