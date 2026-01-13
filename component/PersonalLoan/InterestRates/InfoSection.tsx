import React from 'react';

// 1. Define Types
type SectionType = 'list' | 'text';

interface ListItem {
  title: string;
  content: React.ReactNode;
}

interface SectionData {
  id: string;
  title: string;
  type: SectionType;
  intro?: string;
  items?: ListItem[];
  paragraphs?: React.ReactNode[];
}

// 2. The Data Store (Simulating your dynamic array)
const infoSections: SectionData[] = [
  {
    id: 'why-comparing-matters',
    title: 'Why Comparing Interest Rates Matters before Applying?',
    type: 'list',
    intro: 'Comparing interest rates before applying for a personal loan is important, as even a slight difference can lead to significant savings over the repayment tenure.',
    items: [
      {
        title: 'Avoid High-Cost Loan',
        content: 'You may end up choosing a personal loan offer with a higher interest rate without comparing multiple personal loan offers.'
      },
      {
        title: 'Knowing APR',
        content: 'You can easily identify a personal loan scheme offered at lower interest rates but with higher charges. The fees and charges also add up to the overall cost of the loan which can make an offer expensive.'
      },
      {
        title: 'Financial Planning',
        content: 'Understanding the interest rates, foreclosure & pre-payments and other loan terms can better help you plan your monthly budget and manage your finances.'
      }
    ]
  },
  {
    id: 'how-platform-helps',
    title: 'How SIX Loan Helps You Make Informed Borrowing Decisions?',
    type: 'list',
    items: [
      {
        title: 'Trusted Lenders',
        content: <>You can explore verified personal loan offers from top banks and NBFCs on websites & its <a href="#" className="text-teal-600 hover:underline">personal loan app</a>.</>
      },
      {
        title: 'Personalised Offers',
        content: 'You get offers customised based on your credit score, salary, and loan requirements.'
      },
      {
        title: 'Transparent Platform',
        content: <>Before signing the documents, you can check EMI and the total amount using the <a href="#" className="text-teal-600 hover:underline">Personal Loan EMI Calculator</a>.</>
      }
    ]
  },
  {
    id: 'why-compare-platform',
    title: 'Why Compare Personal Loan Rates on SIX Loan?',
    type: 'list',
    items: [
      {
        title: 'Multiple Lenders',
        content: '30+ lending partners provide multiple offers for every applicant.'
      },
      {
        title: 'Pre-approved Offers',
        content: 'Pre-approved loan offers at lower rates based on existing credit profile.'
      },
      {
        title: 'Save Money',
        content: 'A small difference in interest rates can reduce the overall cost of credit.'
      },
      {
        title: 'Informed Decisions',
        content: 'Transparent data helps you pick the most suitable lender.'
      }
    ]
  },
  {
    id: 'balance-transfer',
    title: 'Personal Loan Balance Transfer to Reduce Interest Rates',
    type: 'text',
    paragraphs: [
      <>
        <a href="#" className="text-teal-600 hover:underline font-semibold">Personal Loan Balance Transfer</a> (PLBT) allows existing borrowers to transfer their outstanding loan balance from one lender to another at a lower interest rate, for a longer tenure and/or for better terms and conditions. The interest rate offered by the new lender would depend on the borrower’s credit score, income, existing outstanding loan amount, tenure and other aspects of their credit profile.
      </>,
      <>
        Borrowers should note that there are certain nominal charges, such as foreclosure charges and loan transfer fees payable to their existing lender. Additionally, the new lender may charge a processing fee, stamp duty and other fees that are associated with a fresh loan application. Therefore, it’s important to carefully evaluate whether the savings on interest from the balance transfer will outweigh these associated costs.
      </>
    ]
  }
];

// 3. SVG Icon Component (Checkmark)
const CheckIcon = () => (
  <svg 
    className="w-6 h-6 text-teal-500 fill-current flex-shrink-0 mt-1" 
    viewBox="0 0 20 20" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
);

// 4. Main Component
interface InfoSectionProps {
  sectionId: string;
}

const InfoSection: React.FC<InfoSectionProps> = ({ sectionId }) => {
  // Find the data based on ID
  const data = infoSections.find((section) => section.id === sectionId);

  if (!data) {
    return <div className="p-4 text-center text-red-500">Content not found for ID: {sectionId}</div>;
  }

  return (
    <div className={`
      max-w-6xl mx-auto mb-8 bg-white text-gray-800 font-serif 
      p-4 md:p-8 
      border-0 md:border md:border-gray-200 
      rounded-none md:rounded-3xl 
      shadow-none md:shadow-sm
    `}>
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
        {data.title}
      </h2>

      {/* Render Intro Text if exists */}
      {data.intro && (
        <p className="text-lg leading-relaxed mb-6 text-gray-700">
          {data.intro}
        </p>
      )}

      {/* Render List Style Content */}
      {data.type === 'list' && data.items && (
        <ul className="space-y-4">
          {data.items.map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckIcon />
              <div className="text-lg leading-relaxed">
                <span className="font-bold text-gray-900">{item.title}: </span>
                <span className="text-gray-700">{item.content}</span>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Render Paragraph Style Content */}
      {data.type === 'text' && data.paragraphs && (
        <div className="space-y-6 text-lg leading-relaxed text-gray-700">
          {data.paragraphs.map((para, index) => (
            <p key={index}>{para}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default InfoSection;

/* USAGE EXAMPLE:
  
  <InfoSection sectionId="why-comparing-matters" />
  <InfoSection sectionId="how-platform-helps" />
  <InfoSection sectionId="why-compare-platform" />
  <InfoSection sectionId="balance-transfer" />
*/