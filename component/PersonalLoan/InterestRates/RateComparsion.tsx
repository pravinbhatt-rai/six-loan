'use client';
import React from 'react';
import { TrendingUp, Info, AlertCircle, BookOpen } from 'lucide-react';

// ==========================================
// 1. Data Definitions
// ==========================================

// A single row in the table
type TableRowData = (string | React.ReactNode)[];

interface AdditionalContent {
  heading: string;
  text: React.ReactNode; // Allows passing JSX (paragraphs, bold text)
}

interface RateTableData {
  id: string;              // Unique ID to select this table
  title: string;           // Section Title
  description: string;     // Section Description
  headers: string[];       // Table Column Headers
  rows: TableRowData[];    // Array of rows
  footerNote?: string;     // Optional disclaimer inside the table card
  bottomContent?: AdditionalContent; // content to show AFTER the table
}

// ==========================================
// 2. Centralized Data (The "Database")
// ==========================================

const RATE_DATA: RateTableData[] = [
  // --- 1. Personal Loan Interest Rates ---
  {
    id: 'personal-loan-rates',
    title: "Compare Personal Loan Interest Rates from Top Banks and NBFCs",
    description: "Interest rates vary based on your credit score, income, and employer profile. Compare offers from India's leading lenders below.",
    headers: ["Bank / NBFC", "Interest Rate (p.a.)", "Processing Fee"],
    rows: [
      ["HDFC Bank", "10.50% - 24.00%", "Up to ₹4,999 + GST"],
      ["SBI (State Bank of India)", "11.15% - 15.30%", "Nil to 1.5% + GST"],
      ["ICICI Bank", "10.75% Onwards", "Up to 2.50% of Loan Amount"],
      ["Axis Bank", "10.49% - 22.00%", "Up to 2% + GST"],
      ["Kotak Mahindra Bank", "10.99% Onwards", "Up to 3% + GST"],
      ["Bajaj Finserv", "11.00% - 35.00%", "Up to 3.93% of Loan Amount"],
      ["Tata Capital", "10.99% Onwards", "Up to 2.75% + GST"],
      ["IndusInd Bank", "10.49% Onwards", "Up to 3% + GST"]
    ],
    footerNote: "*Rates are subject to change by the lender at their sole discretion.",
    // THE NEW TEXT CONTENT ADDED HERE
    bottomContent: {
      heading: "Understanding Personal Loan Eligibility & Rates",
      text: (
        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p>
            If you are applying for a personal loan, do note that your eligibility for the loan along with the interest rate offered to you post your application would depend on your <strong>credit profile</strong>. Consumers with a strong credit history and excellent repayment record are likely to get a lower interest rate. Factors like income, profession, and employer also determine your eligibility for a personal loan. Most Banks and large NBFCs usually prefer salaried individuals with a stable employment history and a strong credit profile.
          </p>
          <p>
            Those with a damaged credit profile, which is reflected in their credit report, are likely to get rejected by Banks and NBFCs (especially those with a credit score lower than 700). There are a few NBFCs that may cater to some of these consumers, albeit at higher interest rates and for lower loan amounts.
          </p>
        </div>
      )
    }
  },
  // --- 2. Home Loan Interest Rates (Example) ---
  {
    id: 'home-loan-rates',
    title: "Current Home Loan Interest Rates",
    description: "Secure your dream home with the most competitive rates in the market.",
    headers: ["Lender", "Floating Rate (p.a.)", "Fixed Rate", "Max Tenure"],
    rows: [
      ["SBI Home Loans", "8.50% - 9.65%", "NA", "30 Years"],
      ["HDFC Bank", "8.55% Onwards", "NA", "30 Years"],
      ["LIC Housing Finance", "8.50% - 10.75%", "Available", "30 Years"],
      ["Bajaj Housing Finance", "8.50% Onwards", "NA", "25 Years"]
    ],
    footerNote: "*Home loan rates are linked to Repo Linked Lending Rate (RLLR)."
  }
];

// ==========================================
// 3. The Presentational Components
// ==========================================

// Sub-component: The Table Card
const TableCard: React.FC<{ data: RateTableData }> = ({ data }) => (
  <div className="w-full bg-white rounded-2xl md:rounded-3xl shadow-sm border border-gray-100 overflow-hidden font-sans mb-8">
    {/* Header */}
    <div className="p-6 md:p-8 border-b border-gray-100 bg-gradient-to-r from-teal-50/50 to-white">
      <div className="flex items-start gap-3 mb-3">
        <div className="p-2 bg-teal-100 text-teal-600 rounded-lg shrink-0 mt-1">
          <TrendingUp size={20} />
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 font-serif leading-tight">
            {data.title}
          </h2>
          <p className="mt-2 text-gray-600 leading-relaxed text-sm md:text-base max-w-3xl">
            {data.description}
          </p>
        </div>
      </div>
    </div>

    {/* Table */}
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[700px]">
        <thead>
          <tr className="bg-gray-50/80 border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500 font-semibold">
            {data.headers.map((header, idx) => (
              <th key={idx} className="p-4 md:p-5 whitespace-nowrap">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.rows.map((row, rowIndex) => (
            <tr 
              key={rowIndex} 
              className="group hover:bg-teal-50/30 transition-colors duration-150"
            >
              {row.map((cell, cellIndex) => (
                <td 
                  key={cellIndex} 
                  className={`
                    p-4 md:p-5 text-sm md:text-base
                    ${cellIndex === 0 ? 'font-bold text-gray-900' : 'text-gray-700 font-medium'}
                  `}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Footer Note */}
    <div className="p-4 md:px-8 md:py-5 bg-gray-50 border-t border-gray-100 flex items-start gap-2">
      <Info size={16} className="text-gray-400 shrink-0 mt-0.5" />
      <p className="text-xs text-gray-500 italic">
        {data.footerNote || "Data is indicative and subject to change."}
      </p>
    </div>
  </div>
);

// Sub-component: The Additional Info Text Block
const InfoBlock: React.FC<{ content: AdditionalContent }> = ({ content }) => (
  <div className="w-full p-6 md:p-8 relative">
     <div className="flex gap-4">
        <div className="hidden md:block p-3 bg-white rounded-full shadow-sm border border-slate-100 h-fit text-teal-600">
           <BookOpen size={24} />
        </div>
        <div>
           <h3 className="text-xl font-bold text-gray-900 mb-4 font-serif">
             {content.heading}
           </h3>
           <div className="text-sm md:text-base text-gray-700">
             {content.text}
           </div>
        </div>
     </div>
  </div>
);

// ==========================================
// 4. The Container Component (Exported)
// ==========================================

interface RateComparisonContainerProps {
  id: string; // e.g., 'personal-loan-rates'
  className?: string;
}

export const RateComparisonContainer: React.FC<RateComparisonContainerProps> = ({ id, className }) => {
  // 1. Find Data
  const data = RATE_DATA.find((item) => item.id === id);

  // 2. Safety Check
  if (!data) {
    console.warn(`RateComparisonContainer: No data found for id "${id}"`);
    return null;
  }

  // 3. Render
  return (
    <section className={`max-w-6xl mx-auto mb-12 ${className || ''}`}>
      {/* The Data Table */}
      <TableCard data={data} />
      
      {/* The Additional Text Content (Only renders if bottomContent exists) */}
      {data.bottomContent && (
        <InfoBlock content={data.bottomContent} />
      )}
    </section>
  );
};

export default RateComparisonContainer;