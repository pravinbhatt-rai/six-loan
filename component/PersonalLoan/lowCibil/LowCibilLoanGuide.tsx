import React from 'react';
import { 
  TrendingUp, 
  ShieldCheck, 
  Briefcase, 
  Building2, 
  FileText, 
  Percent, 
  CheckCircle2, 
  Landmark,
  AlertTriangle,
  Users,
  CreditCard,
  ArrowUpCircle,
  FileWarning,
  Building,
  Coins
} from 'lucide-react';

const BusinessLoanKnowledgeBase: React.FC = () => {
  return (
    <div 
      className="
        w-full max-w-6xl mx-auto bg-white mb-8
        /* Mobile Styles */
        p-5 border-0 shadow-none
        /* Desktop Styles */
        md:p-12 md:border md:border-gray-200 md:rounded-3xl md:shadow-sm
      "
    >
      {/* ==================================================================================
          PART 1: INTEREST RATES & SCHEMES
      ================================================================================== */}
      
      <section className="mb-16">
        <div className="mb-10 text-center md:text-left border-b border-gray-100 pb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-teal-900 mb-4">
            Factors Affecting Business Loan Interest Rates
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Lenders set rates based on credit risk policies and applicant profiles. Understanding these factors can help you secure better terms.
          </p>
        </div>

        {/* --- Factors Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card 
            icon={<FileText className="w-6 h-6 text-teal-600" />}
            title="Type of Loan Scheme"
            description="Rates vary by facility. MSME loans differ significantly from Bill Discounting or Overdraft rates."
          />
          <Card 
            icon={<ShieldCheck className="w-6 h-6 text-teal-600" />}
            title="Collateral Value"
            description="Pledging high-value assets reduces lender risk, attracting lower interest rates compared to unsecured loans."
          />
          <Card 
            icon={<Briefcase className="w-6 h-6 text-teal-600" />}
            title="Occupation Profile"
            description="Self-employed professionals often get lower rates than non-professionals. MSME loans generally carry higher rates."
          />
          <Card 
            icon={<Building2 className="w-6 h-6 text-teal-600" />}
            title="Business Profile"
            description="Manufacturing firms with tangible assets are often considered safer than service-based businesses."
          />
          <Card 
            icon={<TrendingUp className="w-6 h-6 text-teal-600" />}
            title="Business Financials"
            description="Consistent revenue growth signals stability. Strong financials help secure better loan terms."
          />
          <Card 
            icon={<Percent className="w-6 h-6 text-teal-600" />}
            title="Repayment History"
            description="While not the only factor, a clean repayment record strengthens credibility and lowers risk premiums."
          />
        </div>

        {/* --- How to Get Lower Rates & Schemes --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-teal-50 rounded-2xl p-8 border border-teal-100">
            <h3 className="text-xl font-bold text-teal-900 mb-6 flex items-center gap-2">
              <Coins className="w-6 h-6 text-teal-600" />
              How to Get Lower Interest Rates?
            </h3>
            <ul className="space-y-4">
              <ListItem text="Maintain a credit score above 750." />
              <ListItem text="Leverage existing relationships with banks/NBFCs." />
              <ListItem text="Compare offers from top lenders online." />
              <ListItem text="Offer collateral to reduce credit risk." />
              <ListItem text="Opt for government-backed subsidy schemes." />
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-teal-900 mb-6 flex items-center gap-2">
              <Landmark className="w-6 h-6 text-teal-600" />
              Top Government Schemes
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <SchemeBadge label="MUDRA Loans (PMMY)" />
              <SchemeBadge label="PMEGP Scheme" />
              <SchemeBadge label="SIDBI Make in India (SMILE)" />
              <SchemeBadge label="CLCSS Subsidy" />
              <SchemeBadge label="PSB Loans in 59 Seconds" />
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <hr className="border-t-2 border-gray-100 my-12" />

      {/* ==================================================================================
          PART 2: CREDIT SCORE & LOW CIBIL SOLUTIONS
      ================================================================================== */}

      <section>
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-teal-900 mb-6">
            Credit Score & Eligibility
          </h2>
          <div className="flex flex-col md:flex-row gap-6 items-start bg-gray-50 p-6 rounded-xl border border-gray-100">
            <div className="flex-1">
              <p className="text-gray-700 leading-relaxed">
                A score of <span className="font-bold text-teal-700">750+</span> is considered "Good". Scores below this make low-interest loans difficult to obtain. Most lenders in India rely on the CIBIL score (TransUnion CIBIL) over other bureaus.
              </p>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span className="font-semibold text-gray-800">Target: 750 - 900</span>
            </div>
          </div>
        </div>

        {/* --- 5 Ways to get Loan with Low CIBIL --- */}
        <h3 className="text-2xl font-bold text-teal-900 mb-8 flex items-center gap-2">
          <ShieldCheck className="w-7 h-7 text-teal-600" />
          5 Ways to Get a Loan with Low CIBIL
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card 
            icon={<Building className="w-6 h-6 text-teal-600" />}
            title="Small Finance Banks (SFBs)"
            description="Focus on current financial stability rather than just history. Rates may be higher."
          />
          <Card 
            icon={<Briefcase className="w-6 h-6 text-teal-600" />}
            title="NBFCs"
            description="Relaxed eligibility criteria compared to banks. Good for urgent needs despite higher rates."
          />
          <Card 
            icon={<CreditCard className="w-6 h-6 text-teal-600" />}
            title="Overdraft Facility"
            description="Credit limit sanctioned against your account. Interest charged only on amount used."
          />
          <Card 
            icon={<Landmark className="w-6 h-6 text-teal-600" />}
            title="Secured Loans"
            description="Submit collateral (property, gold, stock) to reduce risk and bypass score requirements."
          />
          <Card 
            icon={<Users className="w-6 h-6 text-teal-600" />}
            title="Peer-to-Peer (P2P)"
            description="Borrow small amounts from individual lenders. No collateral, but high interest rates."
          />
        </div>

        {/* --- Improvement vs Factors --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* How to Improve */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
            <h3 className="text-xl font-bold text-teal-900 mb-6 flex items-center gap-2">
              <ArrowUpCircle className="w-6 h-6 text-teal-600" />
              How to Improve CIBIL Score
            </h3>
            <ul className="space-y-3">
              <ListItem text="Pay off all debts and EMIs on time." />
              <ListItem text="Resolve inaccuracies in credit reports." />
              <ListItem text="Request increased credit card limits." />
              <ListItem text="Avoid being a guarantor or co-borrower." />
              <ListItem text="Keep old credit cards/accounts open." />
              <ListItem text="Maintain a mix of secured/unsecured loans." />
            </ul>
          </div>

          {/* Factors Affecting Score */}
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-teal-900 mb-6 flex items-center gap-2">
              <FileWarning className="w-6 h-6 text-teal-600" />
              Factors Affecting Your Score
            </h3>
            <div className="space-y-3">
              <Tag label="Monthly/Annual Income" />
              <Tag label="Existing Debts & Dues" />
              <Tag label="Repayment History" />
              <Tag label="Financial Stability" />
              <Tag label="Defaults or Delays" />
              <Tag label="Multiple Loan Inquiries" />
              <Tag label="Credit Mix" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

/* --- Reusable Sub-Components --- */

const Card: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-teal-200 transition-all duration-300">
    <div className="bg-teal-50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
      {icon}
    </div>
    <h4 className="text-lg font-bold text-gray-800 mb-2">{title}</h4>
    <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
  </div>
);

const ListItem: React.FC<{ text: string }> = ({ text }) => (
  <li className="flex items-start gap-3">
    <CheckCircle2 className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
    <span className="text-gray-700 font-medium text-sm">{text}</span>
  </li>
);

const SchemeBadge: React.FC<{ label: string }> = ({ label }) => (
  <div className="flex items-center gap-2 p-3 bg-white border border-teal-100 rounded-lg shadow-sm">
    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
    <span className="text-gray-700 font-semibold text-sm">{label}</span>
  </div>
);

const Tag: React.FC<{ label: string }> = ({ label }) => (
  <div className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg">
    <AlertTriangle className="w-4 h-4 text-gray-400" />
    <span className="text-gray-700 font-medium text-sm">{label}</span>
  </div>
);

export default BusinessLoanKnowledgeBase;