import React from 'react';

interface DocumentRequirement {
  criteria: string;
  salaried: string;
  selfEmployed: string;
}

const TransferLoanDocuments: React.FC = () => {
  // SEO-Optimized Data: Includes specific "Transfer" documents like LOD and Loan Statements
  const requirementsData: DocumentRequirement[] = [
    {
      criteria: "KYC Documents (Identity & Residence)",
      salaried: "PAN Card, Aadhaar Card, Passport, Voter ID, or Driving License.",
      selfEmployed: "PAN Card, Aadhaar Card, Passport, Voter ID, or Driving License.",
    },
    {
      criteria: "Income Proof",
      salaried: "Last 3 months' Salary Slips and Form-16 for the last 2 years.",
      selfEmployed: "ITR for the last 3 years with computation of income, CA-certified Balance Sheet & P&L.",
    },
    {
      criteria: "Bank Statements",
      salaried: "Last 6 months' salary account statement.",
      selfEmployed: "Last 12 months' current account and savings account statements.",
    },
    {
      criteria: "Existing Loan Documents (Crucial for Transfer)",
      salaried: "Loan Account Statement (last 12 months) and Foreclosure Letter from the current lender.",
      selfEmployed: "Loan Account Statement (last 12 months) and Foreclosure Letter from the current lender.",
    },
    {
      criteria: "Property Documents",
      salaried: "Photocopy of Title Deeds (Originals held by current bank) and List of Documents (LOD) issued by the existing lender.",
      selfEmployed: "Photocopy of Title Deeds (Originals held by current bank) and List of Documents (LOD) issued by the existing lender.",
    },
  ];

  return (
    <section className="w-full max-w-6xl mx-auto p-10 bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 mb-8">
      
        {/* Header Section with Target Keywords */}
        <div className="p-6 md:p-8 pb-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Documents Required for Home Loan Balance Transfer
          </h2>
          <p className="text-gray-700 leading-relaxed text-base">
            To ensure a seamless <strong>home loan refinance</strong> process, you must provide documents verifying your identity, income, and the details of your <strong>existing loan repayment</strong>. Below is the checklist required to transfer your outstanding balance from your current lender to us.
          </p>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <caption className="sr-only">Table detailing document requirements for home loan balance transfer for salaried and self-employed individuals</caption>
            <thead>
              <tr className="bg-teal-50 border-b border-teal-100">
                <th scope="col" className="p-5 font-bold text-gray-900 w-1/4 min-w-[180px]">
                  Document Type
                </th>
                <th scope="col" className="p-5 font-bold text-gray-900 w-1/3 min-w-[250px]">
                  For Salaried Individuals
                </th>
                <th scope="col" className="p-5 font-bold text-gray-900 w-1/3 min-w-[250px]">
                  For Self-Employed / Business Owners
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {requirementsData.map((row, index) => (
                <tr 
                  key={index} 
                  className="hover:bg-teal-50/30 transition-colors duration-200"
                >
                  <th scope="row" className="p-5 font-semibold text-teal-700 align-top">
                    {row.criteria}
                  </th>
                  <td className="p-5 text-gray-700 align-top leading-relaxed">
                    {row.salaried}
                  </td>
                  <td className="p-5 text-gray-700 align-top leading-relaxed">
                    {row.selfEmployed}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-6 md:p-8 pt-2">
            <p className="text-sm text-gray-500 italic">
                * Additional documents may be requested based on the legal technicalities of the property or specific bank policies.
            </p>
        </div>
      
    </section>
  );
};

export default TransferLoanDocuments;