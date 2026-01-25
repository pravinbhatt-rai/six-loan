import React, { memo, useMemo } from 'react';

const CarLoanGuide = memo(({ pageId }: { pageId: string }) => {
  // Helper to generate the large dataset dynamically - Memoized
  const loanData = useMemo(() => {
    const generateLoanData = () => {
      const amounts = [3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 30, 35, 40, 45, 50, 75, 100];
      const types = ['new', 'used'];

      return types.flatMap((type) =>
        amounts.map((amt) => {
          const isCr = amt === 100;
          const label = isCr ? "1 Crore" : `${amt} Lakh`;
          const id = `${type}-car-loan-${amt}${isCr ? 'cr' : 'lakh'}`;

          return {
            id: id,
            sections: [
              {
                title: `Why Opt for a ${type === 'new' ? 'New' : 'Used'} Car Loan of Rs. ${label}?`,
                description: `A Rs. ${label} ${type} car loan allows you to drive home your ${type === 'new' ? 'latest dream model' : 'premium pre-owned vehicle'} with affordable monthly payments.`,
                items: [
                  type === 'new' 
                    ? `Funding for latest models from top brands` 
                    : `Quick valuation and funding for certified pre-owned cars`,
                  `Flexible repayment tenures up to ${type === 'new' ? '7' : '5'} years`,
                  `Competitive interest rates starting from ${type === 'new' ? '8.75%' : '11.50%'} p.a.`,
                  `Minimal down payment options available`
                ]
              },
              {
                title: "Eligibility Criteria",
                description: "Repayment capacity and credit history are key factors:",
                items: [
                  "Age: 21 to 65 years",
                  `Minimum Income: Rs. ${amt > 10 ? '40,000' : '20,000'} per month`,
                  "Employment: Minimum 1 year with current employer/business",
                  `Credit Score: ${type === 'new' ? '700+' : '720+'} recommended for best rates`,
                  type === 'used' ? "Car Age: Vehicle should not be older than 8-10 years at loan maturity" : "Model: Available for all RTO-registered new car models"
                ]
              },
              {
                title: "Documents Required",
                description: "Keep these documents ready for faster processing:",
                items: [
                  "KYC: PAN Card, Aadhaar, Passport, or Voter ID",
                  "Income Proof: Last 3 months' salary slips or 2 years' ITR",
                  "Bank Statements: Last 6 months reflecting salary/business income",
                  type === 'used' ? "Vehicle Docs: RC Copy, Insurance, and Valuation Report" : "Vehicle Docs: Pro-forma Invoice from the car dealer"
                ]
              },
              {
                title: "Fees & Charges",
                description: "Standard costs associated with the loan:",
                items: [
                  "Processing Fee: 0.5% to 2% of loan amount",
                  "Documentation Charges: Nominal one-time fee",
                  type === 'used' ? "Valuation Fee: Fees for car health & price check" : "Stamp Duty: As per state government norms",
                  "Foreclosure Charges: Nil for floating-rate loans (varies by bank)"
                ]
              },
              {
                title: "Benefits of this Loan",
                description: "Financial advantages of choosing this bracket:",
                items: [
                  "Fixed Interest Rates for stable monthly planning",
                  "100% On-Road Funding options (on select new models)",
                  "Quick Disbursal often within 24-48 hours",
                  "Balance Transfer facility to move to lower rates later"
                ]
              }
            ]
          };
        })
      );
    };
    
    return generateLoanData();
  }, []);
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
});

CarLoanGuide.displayName = 'CarLoanGuide';

export default CarLoanGuide;