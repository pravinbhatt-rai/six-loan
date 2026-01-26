import React from 'react';

const BikeLoanGuide = ({ pageId }: { pageId: string }) => {
  const loanData = [
    // ==================================================================================
    // NEW BIKE LOAN DATA (IDs: new-bike-50k, new-bike-1lakh, ..., new-bike-20lakh)
    // ==================================================================================
    {
      id: "new-bike-50k",
      sections: [
        {
          title: "Why Opt for a New Bike Loan of ₹50,000?",
          description: "A ₹50,000 loan is ideal for entry-level commuters and scooters. It offers:",
          items: [
            "Affordable Ownership: Lowest entry point for owning a brand-new two-wheeler.",
            "Quick Commute: Perfect for budget-friendly models with high fuel efficiency.",
            "Minimal EMI: Monthly payments that fit easily into a student or entry-level salary.",
            "100% On-Road Funding: Some lenders cover the full cost including insurance."
          ]
        },
        {
          title: "Eligibility for New Bike Loans",
          description: "Basic criteria for standard bikes:",
          items: [
            "Age: 18 to 65 years.",
            "Income: Minimum monthly income of ₹12,000 - ₹15,000.",
            "Credit Score: 600+ is usually sufficient for smaller amounts.",
            "Employment: Minimum 6 months in current job."
          ]
        }
      ]
    },
    // Pattern repeated for all amounts... 
    // (I'll provide the comprehensive data structure below for New and Used)
  ];

  // Helper to generate full data for New & Used Bike Loans
  const generateBikeData = () => {
    const amounts = ["50k", "1lakh", "2lakh", "3lakh", "4lakh", "5lakh", "10lakh", "15lakh", "20lakh"];
    const labels = ["50 Thousand", "1 Lakh", "2 Lakh", "3 Lakh", "4 Lakh", "5 Lakh", "10 Lakh", "15 Lakh", "20 Lakh"];
    
    const fullData: { id: string; sections: ({ title: string; description: string; items: string[]; } | { title: string; items: string[]; })[] | ({ title: string; description: string; items: string[]; } | { title: string; items: string[]; })[]; }[] = [];

    amounts.forEach((amt, index) => {
      // NEW BIKE DATA
      fullData.push({
        id: `new-bike-${amt}`,
        sections: [
          {
            title: `Benefits of a New Bike Loan of ₹${labels[index]}`,
            description: `Financing a new motorcycle for ₹${labels[index]} provides several advantages:`,
            items: [
              "Manufacturer Warranty: Peace of mind with full coverage.",
              "Lower Interest Rates: New vehicles attract better ROI than used ones.",
              "Flexible Tenure: Choose between 12 to 60 months repayment.",
              "Latest Tech: Access to the newest safety features and BS6 engines."
            ]
          },
          {
            title: "Documents Required (New)",
            items: [
              "KYC: Aadhaar, PAN Card, and Address Proof.",
              "Income: Last 3 months' bank statement and salary slips.",
              "Showroom Invoice: Proforma invoice of the selected bike.",
              "Photographs: Recent passport size photos."
            ]
          }
        ]
      });

      // USED BIKE DATA
      fullData.push({
        id: `used-bike-${amt}`,
        sections: [
          {
            title: `Why Finance a Used Bike for ₹${labels[index]}?`,
            description: `Get a premium pre-owned bike at a fraction of the cost:`,
            items: [
              "Higher Segment: Buy a 300cc+ bike at the price of a new 150cc bike.",
              "Lower Depreciation: The first owner has already absorbed the major value drop.",
              "Valuation Support: Banks provide expert valuation of the used vehicle.",
              "Immediate Delivery: No waiting periods; ride home the same day."
            ]
          },
          {
            title: "Used Bike Special Requirements",
            items: [
              "RC Copy: Registration Certificate of the pre-owned vehicle.",
              "Insurance: Valid insurance policy of the bike.",
              "Ownership Transfer: Assistance in RC transfer and hypothecation.",
              "Bike Age: Usually, the bike should not be more than 5-7 years old."
            ]
          }
        ]
      });
    });

    return [...loanData, ...fullData];
  };

  const finalData = generateBikeData();
  const content = finalData.find((data) => data.id === pageId);

  if (!content) return null;

  return (
    <div className="max-w-6xl mx-auto mb-8 bg-white text-gray-800 font-serif p-4 md:p-8 border-0 md:border md:border-gray-200 rounded-none md:rounded-3xl shadow-none md:shadow-sm">
      <div className="space-y-10">
        {content.sections.map((section, index) => (
          <div key={index} className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              {section.title}
            </h2>

            {'description' in section && section.description && (
              <p className="text-lg text-gray-700">
                {section.description}
              </p>
            )}

            <ul className="space-y-3 mt-4">
              {section.items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="shrink-0 mt-1">
                    <svg className="w-6 h-6 text-teal-600 fill-current" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
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

export default BikeLoanGuide;