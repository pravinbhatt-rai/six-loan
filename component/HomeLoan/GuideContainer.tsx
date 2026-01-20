import React from 'react';
import { 
  Home, 
  Percent, 
  FileText, 
  Landmark, 
  CheckCircle2, 
  Briefcase,
  Key,
  Users,
  AlertCircle,
  Globe,
  Hammer
} from 'lucide-react';

// ==========================================
// 1. Data Definitions
// ==========================================

export interface GuideData {
  id: string;
  category: string;
  title: string;
  description: string;
  eligibility: {
    leftTitle: string;
    leftItems: string[];
    rightTitle: string;
    rightItems: string[];
  };
  documents: Array<{ title: string; desc: string }>;
  banks: string[];
  processTitle: string;
  processintro: string;
  processSteps: Array<{ title: string; desc: string }>;
}

// ==========================================
// 2. Centralized Data (All Variants)
// ==========================================

export const GUIDE_CONTENT_DATA: GuideData[] = [
  {
    id: 'home-loan-interest-rates',
    category: 'Market Rates',
    title: 'Home Loan Interest Rates Guide',
    description: 'Understand how interest rates affect your EMI. Compare current repo-linked lending rates (RLLR) vs marginal cost of funds-based rates (MCLR).',
    eligibility: {
      leftTitle: 'Rate Types',
      leftItems: ['Floating Rate (Repo Linked)', 'Fixed Rate', 'Hybrid Rate', 'Semi-Fixed Rate'],
      rightTitle: 'Factors Affecting Rate',
      rightItems: ['CIBIL Score > 750', 'Loan Amount > 30 Lakhs', 'Salaried vs Self-Employed', 'Women Applicants (Lower Rate)']
    },
    documents: [
      { title: 'Income Proof', desc: 'Salary slips or ITR to determine risk profile.' },
      { title: 'Bank Statements', desc: '6 months record to check financial habits.' },
      { title: 'Credit Report', desc: 'Detailed CIBIL report fetched by the bank.' },
      { title: 'Property Papers', desc: 'To assess Loan-to-Value (LTV) ratio.' }
    ],
    banks: ['SBI (Repo Linked)', 'HDFC Bank', 'ICICI Bank', 'Kotak Mahindra', 'Bank of Baroda', 'Axis Bank'],
    processTitle: 'How to Get the Best Rate',
    processintro: 'Securing the lowest rate requires a mix of good credit health and negotiation.',
    processSteps: [
      { title: 'Check CIBIL Score', desc: 'Ensure your score is above 750. Clear outstanding credit card dues before applying.' },
      { title: 'Compare Spread', desc: 'Banks offer Repo Rate + Spread. Look for the lowest spread margin.' },
      { title: 'Negotiate', desc: 'If you have a high income or are an existing customer, ask for a waiver on processing fees.' },
      { title: 'Opt for Balance Transfer', desc: 'If your current rate is high, switch to a new lender offering lower rates.' }
    ]
  },

  {
    id: 'home-loan-low-cibil-score',
    category: 'Credit Builder',
    title: 'Home Loan for Low CIBIL Score',
    description: 'Getting a loan with a score under 650 is difficult but not impossible. Explore NBFCS and HFCs that focus on income capacity rather than just credit history.',
    eligibility: {
      leftTitle: 'Possible Applicants',
      leftItems: ['Score between 550-650', 'New to Credit (NTC)', 'Settled Past Defaults', 'Cash Salary Earners'],
      rightTitle: 'Approval Factors',
      rightItems: ['High Disposable Income', 'Added Co-applicant with 750+', 'Additional Collateral', 'Stable Job/Business']
    },
    documents: [
      { title: 'Explanation Letter', desc: 'Reason for past defaults (medical emergency, job loss).' },
      { title: 'Closure Certificate', desc: 'Proof that old defaulted loans are now closed.' },
      { title: 'Income Banking', desc: 'Active bank account showing regular cash flow.' },
      { title: 'Guarantor Docs', desc: 'KYC and income proof of a guarantor if required.' }
    ],
    banks: ['Aadhar Housing Finance', 'Aavas Financiers', 'Tata Capital', 'Shriram Housing', 'India Shelter', 'Vastu Housing'],
    processTitle: 'Approval Steps',
    processintro: 'The scrutiny is higher, and interest rates may be slightly elevated.',
    processSteps: [
      { title: 'Add a Co-Applicant', desc: 'Adding a spouse or parent with a good score significantly improves chances.' },
      { title: 'Prove Current Stability', desc: 'Showcase that your current financial situation is much better than when you defaulted.' },
      { title: 'Manual Verification', desc: 'Lender may visit your workplace or home to physically verify income generation.' },
      { title: 'Accept Terms', desc: 'Be prepared for a slightly higher ROI or processing fee initially; you can refinance later.' }
    ]
  },
  
  {
    id: 'home-renovation-loan',
    category: 'Home Improvement',
    title: 'Home Renovation Loan',
    description: 'Funding for repairs, flooring, painting, or adding a balcony. Keeps your savings intact while upgrading your lifestyle.',
    eligibility: {
      leftTitle: 'Usage',
      leftItems: ['Tiling & Flooring', 'Painting & Waterproofing', 'Plumbing & Electrical', 'Roofing Repairs'],
      rightTitle: 'Criteria',
      rightItems: ['Existing Home Owner', 'Property Age < 30 Years', 'Cost Estimate Required', 'Ownership Proof']
    },
    documents: [
      { title: 'Quotation', desc: 'Estimate from contractor/architect for the work.' },
      { title: 'Title Deed', desc: 'Proof you own the property being renovated.' },
      { title: 'Income Proof', desc: 'Salary slips or business returns.' },
      { title: 'KYC', desc: 'Standard ID and address proofs.' }
    ],
    banks: ['HDFC Home Improvement', 'SBI Home Repair', 'Bajaj Finserv', 'ICICI Bank', 'PNB Housing'],
    processTitle: 'Renovation Financing',
    processintro: 'Similar to a home loan but requires technical verification of the repair estimate.',
    processSteps: [
      { title: 'Get Estimates', desc: 'Collect quotes from contractors for the total cost of renovation.' },
      { title: 'Technical Check', desc: 'Bank engineer verifies if the estimate aligns with market rates.' },
      { title: 'Approval', desc: 'Loan is sanctioned, usually up to 80-90% of the estimate.' },
      { title: 'Disbursal', desc: 'Funds may be released to you or directly to the contractor.' }
    ]
  },
  {
    id: 'plot-loan',
    category: 'Land Purchase',
    title: 'Plot Loan Guide',
    description: 'Loans specifically for purchasing residential land. Unlike home loans, tax benefits are only available if you construct a house on it.',
    eligibility: {
      leftTitle: 'Land Types',
      leftItems: ['Development Authority Plots', 'Resale Plots', 'Gated Community Plots', 'Within Municipal Limits'],
      rightTitle: 'Conditions',
      rightItems: ['Max LTV 70-75%', 'Construction intent preferred', 'Non-Agricultural Land only', 'Clear Title Mandatory']
    },
    documents: [
      { title: 'Layout Plan', desc: 'Approved layout copy from local authority.' },
      { title: 'Encumbrance Cert', desc: 'EC for last 15-30 years.' },
      { title: 'Sale Agreement', desc: 'Agreement between buyer and seller.' },
      { title: 'Legal Opinion', desc: 'Lawyer report on property title.' }
    ],
    banks: ['SBI Realty', 'HDFC Plot Loans', 'ICICI Land Loan', 'LIC Housing Finance', 'Federal Bank'],
    processTitle: 'Buying Land',
    processintro: 'Due diligence is critical for plot loans to avoid legal disputes.',
    processSteps: [
      { title: 'Legal Verification', desc: 'Bank lawyer rigorously checks the title chain of the land.' },
      { title: 'Valuation', desc: 'Valuer determines the fair market price of the plot.' },
      { title: 'Down Payment', desc: 'You typically need to fund 25-30% of the cost yourself.' },
      { title: 'Registration', desc: 'Loan cheque is handed over at the time of plot registration.' }
    ]
  },
  {
    id: 'nri-home-loan',
    category: 'Global Indians',
    title: 'NRI Home Loan Guide',
    description: 'Specialized loans for Non-Resident Indians (NRIs) and PIOs to invest in Indian real estate. Process involves specific documentation regarding foreign income.',
    eligibility: {
      leftTitle: 'Who is Eligible',
      leftItems: ['NRIs with Indian Passport', 'PIOs/OCIs', 'Min Grad/Diploma Holder', 'Working Abroad > 1 Year'],
      rightTitle: 'Key Criteria',
      rightItems: ['POA (Power of Attorney) in India', 'NRE/NRO Account', 'Salary credited in bank', 'Valid Work Visa']
    },
    documents: [
      { title: 'Passport/Visa', desc: 'Copy of valid passport and work permit/visa.' },
      { title: 'Foreign Address', desc: 'Utility bill or driving license of foreign residence.' },
      { title: 'Contract Copy', desc: 'Employment contract in English.' },
      { title: 'POA', desc: 'Power of Attorney format provided by bank.' }
    ],
    banks: ['SBI NRI Home Loan', 'HDFC Ltd', 'ICICI Bank NRI', 'Axis Bank', 'Citibank'],
    processTitle: 'Remote Application',
    processintro: 'You do not need to visit India; a GPA (General Power of Attorney) holder can sign on your behalf.',
    processSteps: [
      { title: 'Appoint POA', desc: 'Identify a relative in India to act as your Power of Attorney.' },
      { title: 'Embassy Attestation', desc: 'POA and KYC docs often need attestation by the Indian Embassy/Consulate.' },
      { title: 'Sanction', desc: 'Loan eligibility is calculated based on foreign income converted to INR.' },
      { title: 'Repayment', desc: 'EMIs must be paid via NRE or NRO account in India.' }
    ]
  },
  {
    id: 'home-construction-loan',
    category: 'Self Construction',
    title: 'Home Construction Loan Guide',
    description: 'For those who own a plot and want to build a house. The loan amount is disbursed in tranches (parts) as the construction progresses.',
    eligibility: {
      leftTitle: 'Prerequisites',
      leftItems: ['Own a Freehold Plot', 'Approved Building Plan', 'Cost Estimation by Architect', 'Non-encumbered land'],
      rightTitle: 'Loan Terms',
      rightItems: ['Disbursal based on progress', 'Interest only on disbursed amt', 'Construction to end in 3 years', 'Max 80-90% of estimate']
    },
    documents: [
      { title: 'Building Plan', desc: 'Municipal approved plan is mandatory.' },
      { title: 'Cost Estimate', desc: 'Detailed breakdown signed by Civil Engineer/Architect.' },
      { title: 'Plot Title', desc: 'Proof that you own the land.' },
      { title: 'Income Docs', desc: 'Standard salary or business proofs.' }
    ],
    banks: ['SBI', 'Bank of Baroda', 'Canara Bank', 'Union Bank', 'HDFC'],
    processTitle: 'Tranche Disbursal',
    processintro: 'Unlike a flat purchase, you do not get the full money at once.',
    processSteps: [
      { title: 'Submit Estimate', desc: 'Provide the bank with the construction cost estimate and plan.' },
      { title: 'Initial Disbursal', desc: 'Bank releases the first tranche to start the foundation work.' },
      { title: 'Progress Checks', desc: 'Bank official visits site to verify progress before releasing next tranche.' },
      { title: 'Completion', desc: 'Final tranche is released for finishing works; loan converts to regular EMI.' }
    ]
  },
  {
    id: 'home-loan-for-self-employed',
    category: 'Business Owners',
    title: 'Home Loan for Self Employed',
    description: 'Tailored for entrepreneurs, traders, and professionals. Assessment is based on business turnover, profit margins, and cash flow rather than a salary slip.',
    eligibility: {
      leftTitle: 'Entity Types',
      leftItems: ['Sole Proprietorship', 'Partnership Firms', 'Private Limited Companies', 'Freelancers/Consultants'],
      rightTitle: 'Financials',
      rightItems: ['Cash Profit Analysis', 'Turnover Trends', 'Banking Churn', 'Industry Margins']
    },
    documents: [
      { title: 'ITR', desc: 'Last 3 years ITR with computation of income.' },
      { title: 'P&L / Balance Sheet', desc: 'Audited financials certified by CA.' },
      { title: 'GST Returns', desc: 'Last 12 months GST filing to prove turnover.' },
      { title: 'Business Proof', desc: 'Shop Act, Udyam Aadhar, or MOA/AOA.' }
    ],
    banks: ['Kotak Mahindra', 'IDFC First Bank', 'HDFC', 'Bajaj Housing Finance', 'Tata Capital'],
    processTitle: 'Business Assessment',
    processintro: 'Lenders look for business stability and consistency.',
    processSteps: [
      { title: 'Eligibility Check', desc: 'Bank calculates eligibility based on net profit + depreciation.' },
      { title: 'Personal Discussion', desc: 'Credit manager may discuss business model and margins with you.' },
      { title: 'Field Investigation', desc: 'Physical verification of office/factory/shop is mandatory.' },
      { title: 'Sanction', desc: 'Loan is approved; interest rate might be 0.5-1% higher than salaried.' }
    ]
  },
  {
    id: 'home-loan-for-women',
    category: 'Women Power',
    title: 'Home Loan for Women',
    description: 'Women applicants enjoy concessional interest rates (usually 0.05% lower) and lower stamp duty charges in many states.',
    eligibility: {
      leftTitle: 'Who Applies',
      leftItems: ['Working Women', 'Single Mothers', 'Women Co-applicants', 'Homemakers (as co-borrower)'],
      rightTitle: 'Benefits',
      rightItems: ['Lower Interest Rate', 'Tax Benefits (80C & 24b)', 'PMAY Subsidy (Mandatory woman owner)', 'Higher Eligibility']
    },
    documents: [
      { title: 'Identity Proof', desc: 'PAN, Aadhar (Maiden or Married name proofs).' },
      { title: 'Income Proof', desc: 'Salary slips or business returns if main applicant.' },
      { title: 'Property Docs', desc: 'Property must have woman as owner/co-owner.' },
      { title: 'Bank Statements', desc: '6 months record.' }
    ],
    banks: ['SBI Her Ghar', 'HDFC Women Power', 'ICICI Bank', 'LIC Housing Finance', 'Union Bank'],
    processTitle: 'Availing Concessions',
    processintro: 'Ensure the property papers reflect the woman\'s name to get benefits.',
    processSteps: [
      { title: 'Property Registration', desc: 'Register property in the woman\'s name or as joint owner.' },
      { title: 'Apply as Primary', desc: 'Apply with the woman as the primary or co-applicant.' },
      { title: 'Rate Negotiation', desc: 'Specifically ask for the women-special interest rate.' },
      { title: 'Stamp Duty', desc: 'Claim reduced stamp duty charges at the registrar office.' }
    ]
  }
  // Note: Add entries for 15/20/30/40/60 Lakh loans following the pattern of '10-lakh-home-loan' but with adjusted income criteria and EMI examples.
];

// ==========================================
// 3. The Component
// ==========================================

interface HomeLoanGuideProps {
  data: GuideData;
}

const HomeLoanGuide: React.FC<HomeLoanGuideProps> = ({ data }) => {
  return (
    <article 
      className="
        max-w-6xl mx-auto mb-8 bg-white text-gray-800 font-serif
        /* Mobile Styles */
        p-4 border-0 shadow-none
        /* Desktop Styles */
        md:p-8 md:border md:border-gray-200 md:rounded-3xl md:shadow-sm
      "
    >
      {/* --- Header --- */}
      <header className="mb-10 text-center md:text-left border-b border-gray-100 pb-6">
        <div className="flex items-center gap-3 mb-3 justify-center md:justify-start">
          <div className="bg-teal-50 p-2 rounded-lg">
            {data.id.includes('plot') ? <Globe className="w-8 h-8 text-teal-700" /> :
             data.id.includes('construction') || data.id.includes('renovation') ? <Hammer className="w-8 h-8 text-teal-700" /> :
             <Home className="w-8 h-8 text-teal-700" />}
          </div>
          <span className="text-teal-700 font-bold tracking-wide uppercase text-sm font-sans">{data.category}</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
          {data.title}
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
          {data.description}
        </p>
      </header>

      {/* --- Section 1: Eligibility --- */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-teal-900 mb-6 flex items-center gap-2">
          <Users className="w-6 h-6" />
          Eligibility Criteria
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="bg-stone-50 p-6 rounded-xl border border-stone-200">
            <h3 className="font-sans font-bold text-lg text-gray-800 mb-4 uppercase tracking-wider flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-teal-600" /> {data.eligibility.leftTitle}
            </h3>
            <ul className="space-y-3">
              {data.eligibility.leftItems.map((item, idx) => (
                <ListItem key={idx} text={item} />
              ))}
            </ul>
          </div>

          {/* Right Column */}
          <div className="bg-stone-50 p-6 rounded-xl border border-stone-200">
            <h3 className="font-sans font-bold text-lg text-gray-800 mb-4 uppercase tracking-wider flex items-center gap-2">
              <Percent className="w-5 h-5 text-teal-600" /> {data.eligibility.rightTitle}
            </h3>
            <ul className="space-y-3">
              {data.eligibility.rightItems.map((item, idx) => (
                <ListItem key={idx} text={item} />
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* --- Section 2: Documents --- */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-teal-900 mb-6 flex items-center gap-2">
          <FileText className="w-6 h-6" />
          Documents Required
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.documents.map((doc, idx) => (
            <DocCard key={idx} title={doc.title} desc={doc.desc} />
          ))}
        </div>
      </section>

      {/* --- Section 3: Banks --- */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-teal-900 mb-6 flex items-center gap-2">
          <Landmark className="w-6 h-6" />
          Top Lenders
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 font-sans">
          {data.banks.map((bank, idx) => (
            <BankBadge key={idx} name={bank} />
          ))}
        </div>
      </section>

      {/* --- Section 4: Process --- */}
      <section className="bg-teal-50 -mx-4 md:-mx-8 px-4 md:px-8 py-10 md:rounded-b-3xl mt-8">
        <div className="max-w-4xl">
          <h2 className="text-2xl font-bold text-teal-900 mb-2 flex items-center gap-2">
            <Key className="w-6 h-6" />
            {data.processTitle}
          </h2>
          <p className="text-gray-700 mb-8 italic">
            {data.processintro}
          </p>

          <div className="space-y-6 relative before:absolute before:left-4 before:top-2 before:h-full before:w-0.5 before:bg-teal-200">
            {data.processSteps.map((step, idx) => (
              <Step 
                key={idx}
                number={(idx + 1).toString()} 
                title={step.title} 
                desc={step.desc} 
              />
            ))}
          </div>
        </div>
      </section>

    </article>
  );
};

/* --- Sub-Components --- */

const ListItem: React.FC<{ text: string }> = ({ text }) => (
  <li className="flex items-start gap-3">
    <CheckCircle2 className="w-5 h-5 text-teal-600 mt-1 flex-shrink-0" />
    <span className="text-gray-700">{text}</span>
  </li>
);

const DocCard: React.FC<{ title: string; desc: string }> = ({ title, desc }) => (
  <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-sm hover:border-teal-400 transition-colors">
    <h4 className="font-sans font-bold text-teal-800 mb-2 text-sm uppercase">{title}</h4>
    <p className="text-gray-600 text-sm">{desc}</p>
  </div>
);

const BankBadge: React.FC<{ name: string }> = ({ name }) => (
  <div className="flex items-center justify-center p-4 bg-gray-50 border border-gray-100 rounded-lg text-center hover:bg-white hover:shadow-md transition-all">
    <span className="font-semibold text-gray-700 text-sm">{name}</span>
  </div>
);

const Step: React.FC<{ number: string; title: string; desc: string }> = ({ number, title, desc }) => (
  <div className="relative pl-12">
    <div className="absolute left-0 top-0 w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center font-sans font-bold shadow-md z-10">
      {number}
    </div>
    <h4 className="font-bold text-gray-900 text-lg mb-1">{title}</h4>
    <p className="text-gray-700 leading-relaxed">{desc}</p>
  </div>
);

// ==========================================
// 4. Container Component
// ==========================================

interface GuideContainerProps {
  id: string;
}

const GuideContainer: React.FC<GuideContainerProps> = ({ id }) => {
  const guideData = GUIDE_CONTENT_DATA.find((item) => item.id === id);

  if (!guideData) {
    // If exact ID not found, fallback to 'home-loan-interest-rates' or handle error
    const defaultData = GUIDE_CONTENT_DATA[0];
    return <HomeLoanGuide data={defaultData} />;
  }

  return <HomeLoanGuide data={guideData} />;
};

export default GuideContainer;