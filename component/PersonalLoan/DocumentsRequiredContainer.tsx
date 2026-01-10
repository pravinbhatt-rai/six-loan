import React from 'react';

// ==========================================
// 1. Data Definitions
// ==========================================

interface DocumentRow {
  criteria: string;
  col1Text: string;
  col2Text: string;
}

interface DocumentData {
  id: string;           // Lookup ID
  title: string;
  description: string;
  col1Header: string;   // Dynamic header (e.g., "Salaried Individuals")
  col2Header: string;   // Dynamic header (e.g., "Self-Employed")
  rows: DocumentRow[];
}

// ==========================================
// 2. Centralized Data (The "Database")
// ==========================================

const DOCUMENTS_DATA: DocumentData[] = [
  // 1. Personal Loan
  {
    id: 'personal-loan',
    title: "Documents Required for a Personal Loan",
    description: "Lenders ask applicants for certain documents to establish their identity, income, repayment capacity and place of residence.",
    col1Header: "Salaried Individuals",
    col2Header: "Self-employed Professionals / Non-Professionals",
    rows: [
      {
        criteria: "Proof of Identity",
        col1Text: "Passport, Voter ID, Driving License, Aadhaar Card or PAN Card",
        col2Text: "Passport, Voter ID, Driving License, Aadhaar Card or PAN Card",
      },
      {
        criteria: "Proof of Residence",
        col1Text: "Aadhaar Card, Voter ID, Passport or Utility Bills",
        col2Text: "Aadhaar Card, Voter ID, Passport or Utility Bills",
      },
      {
        criteria: "Proof of Income",
        col1Text: "Salary Slips (last 3 months), Bank Statements (last 6 months)",
        col2Text: "ITR (last 2 years), P&L Statement, Balance Sheet, Bank Statements",
      },
    ]
  },
  // 2. Home Loan
  {
    id: 'home-loan',
    title: "Home Loan Documents Checklist",
    description: "Apart from KYC and income proofs, property documents are crucial for home loan processing.",
    col1Header: "Salaried Applicants",
    col2Header: "Self-Employed Applicants",
    rows: [
      {
        criteria: "KYC Documents",
        col1Text: "PAN Card, Aadhaar, Passport, Voter ID",
        col2Text: "PAN Card, Aadhaar, Business Proof (GST/Udyam)",
      },
      {
        criteria: "Income Proof",
        col1Text: "Form 16, Last 3 months Salary Slips",
        col2Text: "ITR (3 Years), Computation of Income, CA Attested Financials",
      },
      {
        criteria: "Property Documents",
        col1Text: "Agreement to Sell, Chain Deeds, OC/CC, Approved Plan",
        col2Text: "Agreement to Sell, Chain Deeds, OC/CC, Approved Plan",
      },
      {
        criteria: "Bank Statements",
        col1Text: "Salary Account statement (last 6 months)",
        col2Text: "Current Account & Savings Account statements (last 12 months)",
      }
    ]
  },
  // 3. Business Loan
  {
    id: 'business-loan',
    title: "Paperwork for Business Loans",
    description: "Documentation focuses heavily on business vintage, turnover, and profitability.",
    col1Header: "Sole Proprietorship",
    col2Header: "Partnership / Pvt Ltd",
    rows: [
      {
        criteria: "Business Proof",
        col1Text: "GST Registration, Shop & Establishment Certificate",
        col2Text: "Partnership Deed, MOA, AOA, Certificate of Incorporation",
      },
      {
        criteria: "Financial Documents",
        col1Text: "Last 2 years ITR, Projected Turnover Letter",
        col2Text: "Audited Balance Sheet & P&L for last 2 years",
      },
      {
        criteria: "Identity Proof",
        col1Text: "KYC of the Proprietor",
        col2Text: "KYC of all Partners/Directors and the Firm",
      },
      {
        criteria: "Bank Records",
        col1Text: "6 months Current/Savings account statement",
        col2Text: "12 months Current account statement of the entity",
      }
    ]
  },
  // 4. Education Loan
  {
    id: 'education-loan',
    title: "Education Loan Documents",
    description: "Documents are required for both the student (applicant) and the parent/guardian (co-applicant).",
    col1Header: "Student (Applicant)",
    col2Header: "Co-Applicant (Parent/Guardian)",
    rows: [
      {
        criteria: "Identity & Address",
        col1Text: "Aadhaar, PAN, Passport (mandatory for study abroad)",
        col2Text: "Aadhaar, PAN, Voter ID, Utility Bills",
      },
      {
        criteria: "Academic Proof",
        col1Text: "10th/12th Marksheets, Degree Certificates, Entrance Exam Result",
        col2Text: "N/A",
      },
      {
        criteria: "Admission Proof",
        col1Text: "Offer Letter/Admission Letter from University with fee breakdown",
        col2Text: "N/A",
      },
      {
        criteria: "Income Proof",
        col1Text: "N/A (if student is not working)",
        col2Text: "Salary Slips / ITR, Form 16, Bank Statements",
      }
    ]
  },
  // 5. Loan Against Property (LAP)
  {
    id: 'loan-against-property',
    title: "Documents for LAP",
    description: "Since this is a secured loan, property papers are as important as income papers.",
    col1Header: "Salaried",
    col2Header: "Self-Employed",
    rows: [
      {
        criteria: "Property Papers",
        col1Text: "Title Deeds, Prior Chain Deeds, Property Tax Receipts",
        col2Text: "Title Deeds, Prior Chain Deeds, Property Tax Receipts",
      },
      {
        criteria: "Income Proof",
        col1Text: "Last 3 months Salary Slips, Form 16",
        col2Text: "Last 3 years ITR, P&L, Balance Sheet",
      },
      {
        criteria: "Bank Statements",
        col1Text: "6 months salary account statement",
        col2Text: "6 months current account statement",
      }
    ]
  },
  // 6. Used Car Loan
  {
    id: 'used-car-loan',
    title: "Used Car Loan Documents",
    description: "Requires documents from the buyer as well as vehicle details.",
    col1Header: "Buyer (Applicant)",
    col2Header: "Vehicle / Seller Docs",
    rows: [
      {
        criteria: "Identity/Address",
        col1Text: "PAN, Aadhaar, Voter ID, Driving License",
        col2Text: "Seller's KYC (if buying from individual)",
      },
      {
        criteria: "Income Proof",
        col1Text: "ITR or Salary Slips (2-3 months)",
        col2Text: "N/A",
      },
      {
        criteria: "Vehicle Documents",
        col1Text: "N/A",
        col2Text: "Copy of RC, Valid Insurance Policy, Pollution Certificate",
      },
      {
        criteria: "Transfer Docs",
        col1Text: "Signed Form 29 & 30",
        col2Text: "NOC from Seller's Bank (if previously hypothecated)",
      }
    ]
  },
  // 7. Transfer Personal Loan
  {
    id: 'transfer-personal-loan',
    title: "Balance Transfer Documentation",
    description: "In addition to standard KYC, you need documents related to your existing loan.",
    col1Header: "Salaried",
    col2Header: "Self-Employed",
    rows: [
      {
        criteria: "Existing Loan",
        col1Text: "Loan Account Statement (last 12 months), Foreclosure Letter",
        col2Text: "Loan Account Statement (last 12 months), Foreclosure Letter",
      },
      {
        criteria: "Income Proof",
        col1Text: "Current Salary Slips, Bank Statement showing EMI deductions",
        col2Text: "ITR, Bank Statement showing EMI deductions",
      },
      {
        criteria: "KYC",
        col1Text: "PAN, Aadhaar",
        col2Text: "PAN, Aadhaar, Business Proof",
      }
    ]
  },
  // 8. New Car Loan
  {
    id: 'new-car-loan',
    title: "New Car Loan Documents",
    description: "Straightforward documentation for purchasing a new vehicle.",
    col1Header: "Salaried",
    col2Header: "Self-Employed",
    rows: [
      {
        criteria: "Proforma Invoice",
        col1Text: "Quotation from the Dealer detailing car price and taxes",
        col2Text: "Quotation from the Dealer detailing car price and taxes",
      },
      {
        criteria: "Income Proof",
        col1Text: "Form 16 / Salary Slips",
        col2Text: "ITR (2 Years) with computation",
      },
      {
        criteria: "Bank Proof",
        col1Text: "Last 6 months statement",
        col2Text: "Last 6 months statement",
      }
    ]
  },
  // 9. New Bike Loan
  {
    id: 'new-bike-loan',
    title: "New Bike Loan Documents",
    description: "Minimal documentation is required for two-wheeler loans.",
    col1Header: "Salaried",
    col2Header: "Self-Employed",
    rows: [
      {
        criteria: "KYC",
        col1Text: "Aadhaar, PAN, Passport size photo",
        col2Text: "Aadhaar, PAN, Passport size photo",
      },
      {
        criteria: "Income Proof",
        col1Text: "Salary Slip or Bank Statement (optional for small loans)",
        col2Text: "ITR (optional for small loans)",
      },
      {
        criteria: "Address Proof",
        col1Text: "Utility Bill / Rent Agreement",
        col2Text: "Utility Bill / Shop Act License",
      }
    ]
  },
  // 10. Loan Against Security
  {
    id: 'loan-against-security',
    title: "Docs for Loan Against Securities",
    description: "Focuses on the ownership proof of the pledged assets.",
    col1Header: "Individual Applicant",
    col2Header: "Non-Individual (HUF/Company)",
    rows: [
      {
        criteria: "Identity Proof",
        col1Text: "PAN, Aadhaar",
        col2Text: "Deed/MOA, PAN of Entity, Karta/Director KYC",
      },
      {
        criteria: "Security Proof",
        col1Text: "Demat Holding Statement, Mutual Fund Statement",
        col2Text: "Demat Holding Statement, Board Resolution to pledge",
      },
      {
        criteria: "Bank Proof",
        col1Text: "Cancelled Cheque of account where dividend is received",
        col2Text: "Cancelled Cheque of account where dividend is received",
      }
    ]
  },
  // 11. Used Bike Loan
  {
    id: 'used-bike-loan',
    title: "Used Bike Loan Docs",
    description: "Documents required to finance a pre-owned two-wheeler.",
    col1Header: "Buyer",
    col2Header: "Vehicle Details",
    rows: [
      {
        criteria: "Identity",
        col1Text: "PAN, Aadhaar, Current Address Proof",
        col2Text: "Copy of RC Book",
      },
      {
        criteria: "Income",
        col1Text: "Bank Statement / Salary Slip (if loan > 50k)",
        col2Text: "Valid Insurance Copy",
      },
      {
        criteria: "Transfer",
        col1Text: "Passport Size Photos",
        col2Text: "RTO Transfer Forms",
      }
    ]
  },
  // 12. Professional Loan
  {
    id: 'professional-loan',
    title: "Documents for Professional Loans",
    description: "Specific requirements for Doctors, CAs, and Engineers.",
    col1Header: "Doctors",
    col2Header: "CAs / CS / Architects",
    rows: [
      {
        criteria: "Qualification",
        col1Text: "MBBS/MD/MS Degree Certificate, IMA Registration",
        col2Text: "COP (Certificate of Practice), Degree Certificate",
      },
      {
        criteria: "Income Proof",
        col1Text: "Salary Slips (if employed) / ITR (if practice)",
        col2Text: "ITR for last 2 years, Computation of Income",
      },
      {
        criteria: "Bank Stmt",
        col1Text: "6 months statement",
        col2Text: "6 months statement",
      }
    ]
  },
  // 13. Transfer Home Loan
  {
    id: 'transfer-home-loan',
    title: "Home Loan Transfer Documents",
    description: "Requires a list of documents held by your current lender.",
    col1Header: "Salaried",
    col2Header: "Self-Employed",
    rows: [
      {
        criteria: "LOD",
        col1Text: "List of Documents (LOD) from current bank",
        col2Text: "List of Documents (LOD) from current bank",
      },
      {
        criteria: "Repayment",
        col1Text: "Loan Statement (12 months), Foreclosure letter",
        col2Text: "Loan Statement (12 months), Foreclosure letter",
      },
      {
        criteria: "Income",
        col1Text: "Current Salary Slips, Form 16",
        col2Text: "Latest ITR, P&L, Balance Sheet",
      }
    ]
  }
];

// ==========================================
// 3. The Logic Wrapper (Component)
// ==========================================

interface DocumentsRequiredContainerProps {
  id: string; // The ID to look up
  className?: string;
}

const DocumentsRequiredContainer: React.FC<DocumentsRequiredContainerProps> = ({ id, className }) => {
  // 1. Find Data
  const data = DOCUMENTS_DATA.find((item) => item.id === id);

  // 2. Safety Check
  if (!data) {
    console.warn(`DocumentsRequiredContainer: No data found for id "${id}"`);
    return null;
  }

  // 3. Render
  return (
    <div className={`
      max-w-6xl mx-auto mb-8 bg-white text-gray-800
      font-serif
      p-4 md:p-8
      border-0 md:border md:border-gray-200
      rounded-none md:rounded-3xl
      shadow-none md:shadow-sm
      ${className || ''}
    `}>
      
      {/* Header Section */}
      <div className="mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          {data.title} 
        </h2>
        <p className="text-gray-700 leading-relaxed text-base md:text-lg">
          {data.description}
        </p>
      </div>

      {/* Table Section - Wrapped in overflow-x-auto for mobile responsiveness */}
      <div className="overflow-x-auto border border-gray-100 rounded-xl md:border-0 md:rounded-none">
        <table className="w-full text-left border-collapse min-w-[600px] md:min-w-0">
          <thead>
            <tr className="bg-teal-50 border-b border-teal-100">
              <th className="p-4 md:p-5 font-bold text-gray-900 w-1/4 min-w-[140px]">
                Requirements
              </th>
              {/* Dynamic Header 1 */}
              <th className="p-4 md:p-5 font-bold text-gray-900 w-1/3 min-w-[200px]">
                {data.col1Header}
              </th>
              {/* Dynamic Header 2 */}
              <th className="p-4 md:p-5 font-bold text-gray-900 w-1/3 min-w-[200px]">
                {data.col2Header}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.rows.map((row, index) => (
              <tr 
                key={index} 
                className="hover:bg-teal-50/30 transition-colors duration-200"
              >
                <td className="p-4 md:p-5 font-semibold text-teal-700 align-top">
                  {row.criteria}
                </td>
                <td className="p-4 md:p-5 text-gray-700 align-top leading-relaxed">
                  {row.col1Text}
                </td>
                <td className="p-4 md:p-5 text-gray-700 align-top leading-relaxed">
                  {row.col2Text}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    </div>
  );
};

export default DocumentsRequiredContainer;