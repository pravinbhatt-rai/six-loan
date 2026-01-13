import React from 'react';

// 1. Complex Data Structure to handle Text, Tables, and Analysis
interface SectionData {
  id: string;
  title: string;
  description: string[]; // Array of paragraphs
  subSection?: {
    title: string;
    description: string; // Text immediately before table
    highlightLink?: string; // The blue link text seen in screenshot
  };
  table: {
    headers: string[];
    rows: string[][]; // Array of arrays representing rows -> cells
  };
  footerAnalysis?: {
    title: string;
    content: Array<{
      heading?: string; // Optional bold heading (e.g. "Key Takeaway")
      text: string;
    }>;
  };
}

// 2. The Data Store
const LOAN_DATA: SectionData[] = [
  {
    id: 'tenure-impact',
    title: 'How Interest Rates Affect Your Loan Tenure and EMIs?',
    description: [
      'Personal loan tenures usually range from 1 to 5 years with some banks and NBFCs offering longer tenures of 6, 7 or 8 years. The choice of loan tenure directly affects the borrower’s EMIs and total interest cost. Opting for a longer tenure lowers loan EMIs, making repayment easier for borrowers having limited repayment capacity.',
      'However, this convenience comes at the cost of incurring higher interest costs. Borrowers who choose longer tenures can reduce their total interest cost by making prepayments, whenever they have surplus funds. Personal loan applicants should opt for shorter tenures only when they have adequate repayment capacity for the EMIs.'
    ],
    subSection: {
      title: 'Let’s Take an Example: Rs 5 Lakh Loan EMI Across Tenures',
      description: 'Below is the EMI, total interest cost and total amount payable for different tenures of a',
      highlightLink: 'personal loan of Rs 5 lakh at an interest rate of 11.50% p.a.'
    },
    table: {
      headers: ['Tenure', 'Interest Rate (p.a.)', 'EMI', 'Total Interest', 'Total Payable'],
      rows: [
        ['1 year', '11.50%', 'Rs 44,308', 'Rs 31,690', 'Rs 5,31,690'],
        ['2 years', '11.50%', 'Rs 23,420', 'Rs 62,084', 'Rs 5,62,084'],
        ['3 years', '11.50%', 'Rs 16,488', 'Rs 93,568', 'Rs 5,93,568'],
        ['4 years', '11.50%', 'Rs 13,045', 'Rs 1,26,136', 'Rs 6,26,136'],
        ['5 years', '11.50%', 'Rs 10,996', 'Rs 1,59,778', 'Rs 6,59,778'],
      ]
    },
    footerAnalysis: {
      title: 'Analysis:',
      content: [
        {
          text: 'Choosing a longer tenure lowers your EMI, making monthly repayments more manageable. For instance, EMI reduces from Rs 44,308 (1-year tenure) to Rs 10,996 (5-year tenure).'
        },
        {
          text: 'But, longer tenure comes at a cost as it significantly increases the total interest cost over the repayment period. For example, with a 5-year loan, you pay Rs 1.59 lakh in interest, which is over 5 times more than the Rs 31,690 paid on a 1-year loan'
        },
        {
          heading: 'Key Takeaway',
          text: 'If you have adequate repayment capacity, you can opt for shorter tenures to save on overall interest cost. But if you are not able to manage higher EMIs or have limited repayment capacity, you can opt for longer tenures and consider prepaying your loan when you have adequate funds, keeping aside emergency funds.'
        }
      ]
    }
  },
  {
    id: 'illustrative-example',
    title: 'Illustrative Example: Understanding Personal Loan Interest Rates',
    description: [],
    subSection: {
      title: 'Scenario:',
      description: 'Mr. Vinay Prasad was planning to take a Rs. 5 lakh loan to fund his son’s higher studies for 5 years. He had an existing salary account with IndusInd Bank and a savings account with Federal Bank. But before accepting an offer, he came to Paisabazaar and compared offers from various lenders. Here, he found out that he had an existing pre-approved offer from HDFC Bank at an interest rate of 9.99% p.a.'
    },
    table: {
      headers: ['Bank/NBFC', 'Interest Rate (p.a.)*', 'Monthly EMI', 'Total Interest Payable', 'Total Repayment'],
      rows: [
        ['HDFC Bank', '9.99%', 'Rs. 10,624', 'Rs. 1,37,440', 'Rs. 6,37,440'],
        ['IndusInd Bank', '10.50%', 'Rs. 10,798', 'Rs. 1,46,880', 'Rs. 6,46,880'],
        ['Federal Bank', '12.00%', 'Rs. 11,085', 'Rs. 1,65,120', 'Rs. 6,65,120'],
        ['Bajaj Finserv', '13.50%', 'Rs. 11,509', 'Rs. 1,90,540', 'Rs. 6,90,540'],
      ]
    },
    footerAnalysis: {
      title: 'Insights:',
      content: [
        {
          heading: '1. Compare multiple lenders:',
          text: 'Banks, NBFCs, and fintech lenders offer different interest rates for the same loan amount.'
        },
        {
          heading: '2. Small difference in interest rate matters:',
          text: 'Choosing HDFC Bank (9.99%) over Bajaj Finserv (13.5%) saved Vinay over Rs. 53,000 in interest.'
        }
      ]
    }
  }
];

// 3. Props Interface
interface LoanTableSectionProps {
  sectionId: string;
}

// 4. Main Component
const LoanTableSection: React.FC<LoanTableSectionProps> = ({ sectionId }) => {
  const content = LOAN_DATA.find((item) => item.id === sectionId);

  if (!content) return null;

  return (
    <div className="max-w-6xl mx-auto mb-8 bg-white text-gray-800 font-serif p-4 md:p-8 border-0 md:border md:border-gray-200 rounded-none md:rounded-3xl shadow-none md:shadow-sm">
      
      {/* Main Title */}
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
        {content.title}
      </h2>

      {/* Main Description Paragraphs */}
      {content.description.map((para, idx) => (
        <p key={idx} className="font-sans text-base md:text-[17px] mb-4 leading-relaxed text-gray-700">
          {para}
        </p>
      ))}

      {/* Sub Section (Example/Scenario) */}
      {content.subSection && (
        <div className="mt-8 mb-6">
          <h3 className="text-xl md:text-2xl font-bold mb-3 text-gray-900">
            {content.subSection.title}
          </h3>
          <p className="font-sans text-base md:text-[17px] text-gray-700 leading-relaxed">
            {content.subSection.description}{' '}
            {content.subSection.highlightLink && (
              <span className="text-teal-600 font-medium cursor-pointer hover:underline">
                {content.subSection.highlightLink}
              </span>
            )}
          </p>
        </div>
      )}

      {/* Responsive Table Wrapper */}
      <div className="overflow-x-auto rounded-lg border border-gray-100 mb-8">
        <table className="min-w-full font-sans text-sm md:text-base text-left">
          <thead className="bg-slate-50 text-gray-700 font-semibold border-b border-gray-200">
            <tr>
              {content.table.headers.map((header, idx) => (
                <th key={idx} className="px-6 py-4 whitespace-nowrap">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {content.table.rows.map((row, rowIdx) => (
              <tr key={rowIdx} className="hover:bg-gray-50 transition-colors">
                {row.map((cell, cellIdx) => (
                  <td key={cellIdx} className={`px-6 py-4 whitespace-nowrap text-gray-600 ${cellIdx === 0 ? 'font-medium text-gray-900' : ''}`}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Analysis / Insights */}
      {content.footerAnalysis && (
        <div className="font-sans mt-6 bg-gray-50 p-6 rounded-xl border border-gray-100">
          <h4 className="font-serif text-lg font-bold mb-4 text-gray-900">
            {content.footerAnalysis.title}
          </h4>
          <div className="space-y-4">
            {content.footerAnalysis.content.map((item, idx) => (
              <div key={idx} className="text-gray-700 text-base leading-relaxed">
                {item.heading && (
                  <span className="font-bold text-gray-900 block md:inline md:mr-2">
                    {item.heading}
                  </span>
                )}
                {/* Apply highlights within text if needed, otherwise plain text */}
                {item.text}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Disclaimer usually found below tables */}
      <p className="font-sans text-xs text-gray-400 italic mt-4">
        *Interest rates and charges are subject to change by lenders.
      </p>

    </div>
  );
};

export default LoanTableSection;