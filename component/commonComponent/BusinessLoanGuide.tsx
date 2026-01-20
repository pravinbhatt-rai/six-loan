import React from 'react';
import { 
  TrendingUp, 
  ShieldCheck, 
  Briefcase, 
  Building2, 
  FileText, 
  Percent, 
  CheckCircle2, 
  Landmark 
} from 'lucide-react';

const BusinessLoanGuide: React.FC = () => {
  return (
    <section 
      className="
        w-full max-w-6xl mx-auto bg-white mb-8
        /* Mobile Styles */
        p-5 border-0 shadow-none
        /* Desktop Styles */
        md:p-12 md:border md:border-gray-200 md:rounded-3xl md:shadow-sm
      "
    >
      {/* --- Main Header --- */}
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-3xl md:text-4xl font-bold text-teal-900 mb-4">
          Factors Affecting Business Loan Interest Rates
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          Lenders set business loan interest rates primarily based on internal credit risk policies and applicant credit profiles. However, several other critical factors influence the final rate offered.
        </p>
      </div>

      {/* --- Section 1: Factors Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {/* Factor 1 */}
        <FactorCard 
          icon={<FileText className="w-6 h-6 text-teal-600" />}
          title="Type of Loan Scheme"
          description="Interest rates vary across facilities. For instance, rates for an MSME loan differ significantly from rates for Bill/Invoice Discounting."
        />
        
        {/* Factor 2 */}
        <FactorCard 
          icon={<ShieldCheck className="w-6 h-6 text-teal-600" />}
          title="Collateral & Security"
          description="Pledging high-value assets reduces the lender's credit risk, consequently attracting lower interest rates compared to unsecured loans."
        />

        {/* Factor 3 */}
        <FactorCard 
          icon={<Briefcase className="w-6 h-6 text-teal-600" />}
          title="Occupation Profile"
          description="Self-employed professionals often enjoy lower rates than non-professionals. MSME loans generally carry higher rates than individual professional loans."
        />

        {/* Factor 4 */}
        <FactorCard 
          icon={<Building2 className="w-6 h-6 text-teal-600" />}
          title="Business Profile"
          description="Manufacturing firms (with tangible assets) are considered safer than service-based businesses, which often face higher rates due to lack of collateral."
        />

        {/* Factor 5 */}
        <FactorCard 
          icon={<TrendingUp className="w-6 h-6 text-teal-600" />}
          title="Business Financials"
          description="Strong, steady, and rising revenues signal financial stability. Lenders reward consistent growth with better loan terms."
        />

        {/* Factor 6 */}
        <FactorCard 
          icon={<Percent className="w-6 h-6 text-teal-600" />}
          title="Credit Score & History"
          description="A high score and clean repayment record strengthen credibility. Disciplined credit behavior significantly improves chances of favorable rates."
        />
      </div>

      {/* --- Section 2: How to get Lower Rates --- */}
      <div className="bg-teal-50 rounded-2xl p-6 md:p-10 mb-12 border border-teal-100">
        <h3 className="text-2xl font-bold text-teal-900 mb-6 flex items-center gap-2">
          <TrendingUp className="w-7 h-7" />
          How to Get Business Loans at Lower Interest Rates?
        </h3>
        <ul className="space-y-4">
          <TipItem text="Maintain a good repayment history and a credit score above 750." />
          <TipItem text="Leverage existing relationships with banks and NBFCs for preferential rates." />
          <TipItem text="Compare offers from top lenders on aggregators to find the lowest rate." />
          <TipItem text="Offer collateral or security to reduce credit risk for the bank." />
          <TipItem text="Opt for government-backed schemes that offer interest concessions." />
        </ul>
      </div>

      {/* --- Section 3: Government Schemes --- */}
      <div>
        <h3 className="text-2xl font-bold text-teal-900 mb-6 flex items-center gap-2">
          <Landmark className="w-7 h-7" />
          Top Government Business Loan Schemes
        </h3>
        <p className="text-gray-600 mb-6">
          These schemes are offered in collaboration with leading private/public sector banks and NBFCs in India.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <SchemeBadge label="MUDRA Loans (PMMY)" />
          <SchemeBadge label="PMEGP Scheme" />
          <SchemeBadge label="SIDBI Make in India (SMILE)" />
          <SchemeBadge label="CLCSS Subsidy Scheme" />
          <SchemeBadge label="PSB Loans in 59 seconds" />
        </div>
      </div>
    </section>
  );
};

/* --- Sub-Components for cleaner code --- */

const FactorCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-teal-200 transition-all duration-300">
    <div className="bg-teal-50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
      {icon}
    </div>
    <h4 className="text-lg font-bold text-gray-800 mb-2">{title}</h4>
    <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
  </div>
);

const TipItem: React.FC<{ text: string }> = ({ text }) => (
  <li className="flex items-start gap-3">
    <CheckCircle2 className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
    <span className="text-gray-700 font-medium">{text}</span>
  </li>
);

const SchemeBadge: React.FC<{ label: string }> = ({ label }) => (
  <div className="flex items-center gap-3 p-4 bg-white border-l-4 border-teal-500 rounded-r-lg shadow-sm">
    <span className="text-gray-800 font-semibold text-sm">{label}</span>
  </div>
);

export default BusinessLoanGuide;