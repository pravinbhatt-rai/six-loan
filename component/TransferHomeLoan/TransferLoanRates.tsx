import React from 'react';

interface TransferOffer {
  bankName: string;
  interestRate: string;
  processingFee: string; // Added this column as it's critical for transfer decisions
  link?: string;
}

const TransferLoanRates: React.FC = () => {
  // SEO-Optimized Data: Realistic Home Loan Transfer Rates (approximate market standards)
  const offersData: TransferOffer[] = [
    { 
      bankName: "HDFC Bank", 
      interestRate: "8.35% onwards", 
      processingFee: "₹3,000 + GST",
      link: "/hdfc-balance-transfer" 
    },
    { 
      bankName: "State Bank of India (SBI)", 
      interestRate: "8.40% onwards", 
      processingFee: "Nil (Campaign Offer)",
      link: "/sbi-balance-transfer" 
    },
    { 
      bankName: "ICICI Bank", 
      interestRate: "8.40% onwards", 
      processingFee: "0.50% of loan amount",
      link: "/icici-balance-transfer" 
    },
    { 
      bankName: "Kotak Mahindra Bank", 
      interestRate: "8.35% onwards", 
      processingFee: "₹4,999 + GST",
      link: "/kotak-balance-transfer" 
    },
    { 
      bankName: "Bajaj Housing Finance", 
      interestRate: "8.30% onwards", 
      processingFee: "₹4,999 onwards",
      link: "/bajaj-balance-transfer" 
    },
    { 
      bankName: "Axis Bank", 
      interestRate: "8.45% onwards", 
      processingFee: "₹2,500 + GST",
      link: "/axis-balance-transfer" 
    },
    { 
      bankName: "LIC Housing Finance", 
      interestRate: "8.35% onwards", 
      processingFee: "0.25% of loan amount",
      link: "/lic-balance-transfer" 
    },
  ];

  return (
    <section className="w-full max-w-6xl mx-auto p-10 bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 mb-8">
      
        {/* Content Header with High-Value Keywords */}
        <div className="p-6 md:p-8 pb-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Compare Best Home Loan Balance Transfer Rates
          </h2>
          <div className="space-y-4 text-gray-700 leading-relaxed text-base">
            <p>
              Switching your existing home loan to a new lender can help you save significantly on your EMI outgo. Below is a comparison of the 
              <strong className="text-gray-900"> lowest balance transfer interest rates</strong> from top banks and NBFCs in India.
            </p>
            <p>
              Review the interest rates and <span className="text-teal-600 font-medium">processing fees</span> carefully to ensure your total cost of transfer remains low.
            </p>
          </div>
        </div>

        {/* Table Section */}
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <caption className="sr-only">Comparison of Home Loan Balance Transfer Interest Rates and Processing Fees from top Indian Banks</caption>
            <thead>
              <tr className="bg-teal-50 border-y border-teal-100">
                <th scope="col" className="p-5 font-bold text-gray-900 w-1/3">
                  Bank / Lender
                </th>
                <th scope="col" className="p-5 font-bold text-gray-900 w-1/3">
                  New Interest Rate (p.a.)
                </th>
                <th scope="col" className="p-5 font-bold text-gray-900 w-1/3">
                  Processing Fees
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {offersData.map((offer, index) => (
                <tr 
                  key={index} 
                  className="hover:bg-teal-50/20 transition-colors duration-150 group"
                >
                  <td className="p-5 font-medium">
                    <a 
                      href={offer.link || "#"} 
                      title={`Apply for ${offer.bankName} Home Loan Transfer`}
                      className="text-teal-600 group-hover:text-teal-700 group-hover:underline font-semibold flex items-center gap-2"
                    >
                      {offer.bankName}
                      {/* External Link Icon for UX */}
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <path fillRule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z" clipRule="evenodd" />
                        <path fillRule="evenodd" d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </td>
                  <td className="p-5 text-gray-900 font-bold">
                    {offer.interestRate}
                  </td>
                  <td className="p-5 text-gray-600 text-sm">
                    {offer.processingFee}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-6 md:p-8 pt-2">
            <p className="text-xs text-gray-400">
                * Rates are subject to change based on RBI repo rate revisions and applicant's credit score.
            </p>
        </div>
      
    </section>
  );
};

export default TransferLoanRates;