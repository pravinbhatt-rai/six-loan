import React from 'react';
import { 
  Milk, 
  Sprout, 
  FileText, 
  Landmark, 
  CheckCircle2, 
  ArrowRight,
  Tractor,
  Users
} from 'lucide-react';

const DairyLoanGuide: React.FC = () => {
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
            <Milk className="w-8 h-8 text-teal-700" />
          </div>
          <span className="text-teal-700 font-bold tracking-wide uppercase text-sm font-sans">Agriculture Finance</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
          Dairy Farming Business Loan
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
          Comprehensive guide to financing your dairy business, including eligibility for individuals and cooperatives, document checklists, and the NABARD subsidy process.
        </p>
      </header>

      {/* --- Section 1: Eligibility & Eligible Entities --- */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-teal-900 mb-6 flex items-center gap-2">
          <Users className="w-6 h-6" />
          Eligibility Criteria & Eligible Entities
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: Who can apply? */}
          <div className="bg-stone-50 p-6 rounded-xl border border-stone-200">
            <h3 className="font-sans font-bold text-lg text-gray-800 mb-4 uppercase tracking-wider">
              Eligible Entities
            </h3>
            <ul className="space-y-3">
              <ListItem text="Farmers & Individual Entrepreneurs" />
              <ListItem text="NGOs & Self-Help Groups (SHGs)" />
              <ListItem text="Joint Liability Groups (JLGs)" />
              <ListItem text="Dairy Cooperative Societies" />
              <ListItem text="Private Companies & Startups" />
            </ul>
          </div>

          {/* Right: General Criteria */}
          <div className="bg-stone-50 p-6 rounded-xl border border-stone-200">
            <h3 className="font-sans font-bold text-lg text-gray-800 mb-4 uppercase tracking-wider">
              General Criteria
            </h3>
            <ul className="space-y-3">
              <ListItem text="Age: 18 to 65 years" />
              <ListItem text="No history of loan default" />
              <ListItem text="Experience in dairy farming preferred" />
              <ListItem text="Land ownership or valid lease agreement" />
              <ListItem text="Ability to manage cattle & infrastructure" />
            </ul>
          </div>
        </div>
      </section>

      {/* --- Section 2: Documents Required --- */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-teal-900 mb-6 flex items-center gap-2">
          <FileText className="w-6 h-6" />
          Documents Required
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <DocCard title="Identity Proof" desc="Aadhar, PAN, Voter ID, or Passport of the applicant." />
          <DocCard title="Address Proof" desc="Utility bills, Ration card, or Aadhar card." />
          <DocCard title="Land Documents" desc="Ownership records, 7/12 extract, or Lease agreement." />
          <DocCard title="Project Report" desc="Detailed business plan including costs, cattle details, & revenue." />
        </div>
      </section>

      {/* --- Section 3: Leading Banks & NBFCs --- */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-teal-900 mb-6 flex items-center gap-2">
          <Landmark className="w-6 h-6" />
          Leading Lenders
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 font-sans">
          <BankBadge name="State Bank of India (SBI)" />
          <BankBadge name="Bank of Baroda" />
          <BankBadge name="HDFC Bank" />
          <BankBadge name="Canara Bank" />
          <BankBadge name="Axis Bank" />
          <BankBadge name="Punjab National Bank" />
          <BankBadge name="Central Bank of India" />
          <BankBadge name="Union Bank of India" />
          <BankBadge name="Mahindra Finance" />
        </div>
      </section>

      {/* --- Section 4: NABARD Subsidy Process --- */}
      <section className="bg-teal-50 -mx-4 md:-mx-8 px-4 md:px-8 py-10 md:rounded-b-3xl mt-8">
        <div className="max-w-4xl">
          <h2 className="text-2xl font-bold text-teal-900 mb-2 flex items-center gap-2">
            <Sprout className="w-6 h-6" />
            How to Avail NABARD Subsidy?
          </h2>
          <p className="text-gray-700 mb-8 italic">
            Under the Dairy Entrepreneurship Development Scheme (DEDS), subsidies (usually 25% to 33.33%) are available but are routed through banks.
          </p>

          <div className="space-y-6 relative before:absolute before:left-4 before:top-2 before:h-full before:w-0.5 before:bg-teal-200">
            
            <Step 
              number="1" 
              title="Prepare Project Report" 
              desc="Create a detailed project report for your dairy farm (cattle purchase, shed construction, milking machines) conforming to NABARD norms." 
            />
            
            <Step 
              number="2" 
              title="Apply for Bank Loan" 
              desc="Submit the report to a commercial or cooperative bank. The bank must sanction the loan first. NABARD does not lend directly to individuals." 
            />
            
            <Step 
              number="3" 
              title="Bank Submits Proposal" 
              desc="Once the loan is sanctioned, the bank uploads the subsidy claim to the NABARD portal on your behalf." 
            />

            <Step 
              number="4" 
              title="Subsidy Release" 
              desc="NABARD validates the proposal and releases the subsidy to the bank. It is held in a 'Subsidy Reserve Fund Account' and adjusted against the last few EMI installments." 
            />

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

export default DairyLoanGuide;