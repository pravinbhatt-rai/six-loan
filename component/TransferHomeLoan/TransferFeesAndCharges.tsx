import React from 'react';

interface FeeItem {
  particulars: string;
  charges: React.ReactNode; 
}

const TransferFeesAndCharges: React.FC = () => {
  // SEO-Optimized Data: Specific to "Home Loan Transfer" costs
  const feesData: FeeItem[] = [
    {
      particulars: "Processing Fee (Balance Transfer)",
      charges: "Usually lower than fresh loans: 0.25% to 0.50% of loan amount or a flat fee (e.g., ₹5,000 + GST).",
    },
    {
      particulars: "Foreclosure / Pre-closure Charges",
      charges: (
        <div className="space-y-1">
          <p><span className="font-semibold text-teal-700">Floating Rate Loans:</span> <span className="font-bold">NIL</span> (As per RBI guidelines for individuals).</p>
          <p><span className="font-semibold text-gray-700">Fixed Rate Loans:</span> 2% – 4% of the principal outstanding.</p>
        </div>
      ),
    },
    {
      particulars: "MODT / MOE Charges",
      charges: (
        <span>
           0.2% to 0.5% of the loan amount (State-specific). <br />
           <span className="text-xs text-gray-500">*Memorandum of Deposit of Title Deed</span>
        </span>
      ),
    },
    {
      particulars: "Legal & Technical Verification",
      charges: "₹3,000 – ₹5,000 (Charged by the new lender to re-verify property documents).",
    },
    {
      particulars: "CERSAI Charges",
      charges: "₹50 – ₹100 (Regulatory fee for security interest registration).",
    },
    {
      particulars: "Franking / Stamp Duty",
      charges: "As per the Stamp Act of the respective State Government.",
    },
    {
      particulars: "EMI Bounce Charges",
      charges: "₹400 – ₹500 per bounce.",
    },
  ];

  return (
    <section className="w-full max-w-6xl mx-auto p-10 bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 mb-8">
      
        {/* Header Section with Long-tail Keywords */}
        <div className="p-6 pb-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Fees and Charges for Home Loan Balance Transfer
          </h2>
          <p className="text-gray-700 leading-relaxed">
            While transferring your home loan reduces your interest burden, it is important to calculate the <strong>cost of transfer</strong>. Below is a breakdown of the processing fees, administrative costs, and government levies involved in the <strong>refinancing process</strong>.
          </p>
        </div>

        {/* Table Section */}
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <caption className="sr-only">Table of fees associated with home loan balance transfer including processing fees and MODT charges</caption>
            <thead>
              <tr className="bg-teal-50 border-y border-teal-100">
                <th scope="col" className="p-5 font-bold text-gray-900 w-2/5">
                  Fee Type
                </th>
                <th scope="col" className="p-5 font-bold text-gray-900 w-3/5">
                  Estimated Charges
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {feesData.map((item, index) => (
                <tr 
                  key={index} 
                  className="hover:bg-teal-50/20 transition-colors duration-150"
                >
                  <th scope="row" className="p-5 text-gray-800 font-medium align-top">
                    {item.particulars}
                  </th>
                  <td className="p-5 text-gray-600 align-top">
                    {item.charges}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Note - High Trust Signal */}
        <div className="p-6 bg-gray-50 text-sm md:text-base text-gray-600 italic border-t border-gray-100">
            <strong>Note:</strong> All fees are subject to <span className="text-teal-600 font-medium">18% GST</span>. The "Cost of Transfer" should be compared against your total interest savings to determine if refinancing is profitable.
        </div>
      
    </section>
  );
};

export default TransferFeesAndCharges;