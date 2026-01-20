'use client';
import React, { useState } from 'react';
import { 
  Bird, 
  Egg, 
  Sprout, 
  Landmark, 
  FileText, 
  CheckCircle, 
  TrendingUp, 
  ChevronDown, 
  ChevronUp,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

const PoultryLoanInfo = () => {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  return (
    <div className="max-w-6xl mx-auto mb-8 bg-white text-gray-800 font-serif p-4 md:p-8 border-0 md:border md:border-gray-200 rounded-none md:rounded-3xl shadow-none md:shadow-sm">
      
      {/* --- HERO HEADER --- */}
      <header className="relative mb-12 rounded-2xl overflow-hidden bg-teal-900 text-white">
        <div className="absolute inset-0 opacity-30">
          <img 
            src="https://images.unsplash.com/photo-1543884393-cb5b326cb323?auto=format&fit=crop&q=80&w=2070" 
            alt="Poultry Farm" 
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-teal-950 via-teal-900/60 to-transparent"></div>
        </div>
        
        <div className="relative p-8 md:p-12 lg:p-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-teal-500/30 border border-teal-400/40 px-3 py-1 rounded-full text-xs font-sans font-bold uppercase tracking-wider text-teal-100 backdrop-blur-sm">
              Agri-Business
            </span>
            <span className="bg-orange-500/30 border border-orange-400/40 px-3 py-1 rounded-full text-xs font-sans font-bold uppercase tracking-wider text-orange-100 backdrop-blur-sm">
              50% Subsidy Available
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight font-serif">
            Poultry Business Loans
          </h1>
          <p className="text-teal-100 text-lg md:text-xl max-w-2xl font-light leading-relaxed">
            Start or expand your Layer/Broiler farm with government-backed schemes. Get funding for sheds, equipment, and feed with interest subvention benefits.
          </p>
        </div>
      </header>

      {/* --- 1. KNOW ABOUT POULTRY LOANS --- */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-teal-50 rounded-lg">
            <Bird className="w-6 h-6 text-teal-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Know About Poultry Loans</h2>
        </div>
        <div className="prose prose-lg text-gray-700 max-w-none">
          <p>
            Poultry farming loans are specialized credit facilities aimed at supporting the rearing of domesticated birds (Chicken, Duck, Turkey, Quail) for meat (Broiler) or eggs (Layer). These loans cover both capital expenditure and operational costs.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            <div className="bg-teal-50/50 p-5 border-t-4 border-teal-500 rounded-lg shadow-sm">
              <h3 className="font-bold text-teal-900 text-sm mb-2 flex items-center"><Sprout size={16} className="mr-2"/> Infrastructure Loan</h3>
              <p className="text-sm text-gray-600">For constructing sheds, purchasing cages, automatic feeders, and installing climate control systems.</p>
            </div>
            <div className="bg-teal-50/50 p-5 border-t-4 border-teal-500 rounded-lg shadow-sm">
              <h3 className="font-bold text-teal-900 text-sm mb-2 flex items-center"><Egg size={16} className="mr-2"/> Working Capital (KCC)</h3>
              <p className="text-sm text-gray-600">Revolving credit for day-old chicks, feed, medicines, vaccines, and electricity bills.</p>
            </div>
            <div className="bg-teal-50/50 p-5 border-t-4 border-teal-500 rounded-lg shadow-sm">
              <h3 className="font-bold text-teal-900 text-sm mb-2 flex items-center"><ShieldCheck size={16} className="mr-2"/> Hatchery Units</h3>
              <p className="text-sm text-gray-600">High-value loans for setting up hatcheries and mother units (brooding centers).</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- 2. ELIGIBILITY CRITERIA --- */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Eligibility Criteria</h2>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm">
          <div className="grid md:grid-cols-2 gap-8">
            <ul className="space-y-4">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-teal-500 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700"><strong>Land Requirement:</strong> Must have own or leased land. Approx. 500-1000 sq.ft required for every 500 birds.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-teal-500 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700"><strong>Training:</strong> A certificate from a government-recognized Poultry Training Center is often mandatory for subsidies.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-teal-500 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700"><strong>Experience:</strong> First-time entrepreneurs are eligible, but prior experience helps in loan approval.</span>
              </li>
            </ul>
            <ul className="space-y-4">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-teal-500 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700"><strong>Distance:</strong> The farm should be located at least 500m away from residential areas (Pollution norms).</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-teal-500 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700"><strong>CIBIL Score:</strong> A score of 650-700+ is preferred. Defaulters of previous agricultural loans are not eligible.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-teal-500 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700"><strong>Unit Size:</strong> Commercial loans typically start from 500-1000 birds unit size.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* --- 3. DOCUMENTS REQUIRED --- */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Documents Checklist</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: "Standard KYC", items: ["Aadhaar Card", "PAN Card", "Voter ID", "Passport Size Photos"] },
            { title: "Land Documents", items: ["Land Ownership Record", "Lease Agreement (if rented)", "Land Map/Sketch"] },
            { title: "Project Specifics", items: ["Project Report (DPR)", "Training Certificate", "Quotation for Shed/Equipment"] },
            { title: "Approvals", items: ["NOC from Panchayat", "Pollution Control NOC", "Water/Electricity Availability"] }
          ].map((box, i) => (
            <div key={i} className="bg-teal-50 p-5 rounded-xl border border-teal-100">
              <h3 className="font-bold text-teal-800 mb-3 text-sm uppercase tracking-wide border-b border-teal-200 pb-2">{box.title}</h3>
              <ul className="space-y-2">
                {box.items.map((item, j) => (
                  <li key={j} className="text-sm text-gray-700 flex items-center">
                    <span className="w-1.5 h-1.5 bg-teal-400 rounded-full mr-2"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* --- 4. TOP GOVT SCHEMES (Accordion) --- */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-orange-50 rounded-lg">
            <Landmark className="w-6 h-6 text-orange-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Top 4 Govt. Poultry Schemes</h2>
        </div>
        
        <div className="space-y-3">
          {[
            { 
              name: "National Livestock Mission (NLM)", 
              limit: "50% Capital Subsidy", 
              desc: "Provides up to ₹25 Lakhs subsidy for setting up rural poultry hatcheries and mother units (breeding farms). Ideal for producing Low Input Technology birds." 
            },
            { 
              name: "AHIDF (Infrastructure Fund)", 
              limit: "Up to 90% Loan + 3% Interest Subvention", 
              desc: "Offers interest subvention of 3% for 8 years. Includes a 2-year moratorium. Best for large processing units, feed plants, and technologically advanced farms." 
            },
            { 
              name: "KCC for Animal Husbandry", 
              limit: "Working Capital up to ₹2 Lakhs", 
              desc: "Get a Kisan Credit Card specifically for poultry working capital (feed/labor) at a subsidized interest rate (effectively ~4% on prompt repayment)." 
            },
            { 
              name: "MUDRA Yojana (PMMY)", 
              limit: "Up to ₹10 Lakhs", 
              desc: "Collateral-free loans for small poultry units under Shishu (₹50k), Kishore (₹5L), and Tarun (₹10L) categories." 
            }
          ].map((scheme, index) => (
            <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
              <button 
                onClick={() => toggleAccordion(index)}
                className="w-full flex items-center justify-between p-5 bg-white hover:bg-gray-50 transition-colors text-left"
              >
                <div>
                  <h3 className="font-bold text-gray-900">{scheme.name}</h3>
                  <p className="text-xs text-teal-600 font-semibold mt-1">{scheme.limit}</p>
                </div>
                {activeAccordion === index ? <ChevronUp className="text-gray-400"/> : <ChevronDown className="text-gray-400"/>}
              </button>
              {activeAccordion === index && (
                <div className="p-5 bg-gray-50 border-t border-gray-100 text-sm text-gray-700 leading-relaxed">
                  {scheme.desc}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* --- 5. TOP BANKS RATES --- */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Banks: Interest Rates (2024-25)</h2>
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
          <table className="w-full text-left border-collapse bg-white">
            <thead className="bg-teal-50">
              <tr>
                <th className="p-4 font-bold text-teal-900 text-sm uppercase">Bank</th>
                <th className="p-4 font-bold text-teal-900 text-sm uppercase">Interest Rate (p.a.)*</th>
                <th className="p-4 font-bold text-teal-900 text-sm uppercase">Key Feature</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
              <tr>
                <td className="p-4 font-bold">SBI (Broiler Plus)</td>
                <td className="p-4">~10.50% - 12.00%</td>
                <td className="p-4">Financing for contract farming tie-ups.</td>
              </tr>
              <tr>
                <td className="p-4 font-bold">Canara Bank</td>
                <td className="p-4">Linked to RLLR</td>
                <td className="p-4">Zero margin for loans up to ₹1.60 Lakhs.</td>
              </tr>
              <tr>
                <td className="p-4 font-bold">Union Bank</td>
                <td className="p-4">Competitive (Base Rate)</td>
                <td className="p-4">Long repayment period (up to 7-9 years).</td>
              </tr>
              <tr>
                <td className="p-4 font-bold">NABARD (Refinance)</td>
                <td className="p-4">Subsidy Provider</td>
                <td className="p-4">Does not lend directly; apply via commercial banks for subsidies.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-2 text-right">*Rates subject to change based on applicant profile.</p>
      </section>

      {/* --- 6. HOW TO APPLY & KEY TAKEAWAYS --- */}
      <div className="grid md:grid-cols-2 gap-8">
        
        {/* How to Apply */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 text-teal-600 mr-2" />
            How to Apply
          </h3>
          <ol className="relative border-l border-teal-200 ml-3 space-y-6">
            <li className="ml-6">
              <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-teal-100 rounded-full ring-4 ring-white">
                <span className="text-teal-800 text-xs font-bold">1</span>
              </span>
              <h4 className="font-semibold text-gray-900">Prepare Project Report</h4>
              <p className="text-sm text-gray-600 mt-1">Detail the cost of birds, feed, and projected profit (Unit Economics).</p>
            </li>
            <li className="ml-6">
              <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-teal-100 rounded-full ring-4 ring-white">
                <span className="text-teal-800 text-xs font-bold">2</span>
              </span>
              <h4 className="font-semibold text-gray-900">Apply for Subsidy</h4>
              <p className="text-sm text-gray-600 mt-1">Submit application on the <strong>NLM Portal</strong> or <strong>JanSamarth</strong> before loan disbursal.</p>
            </li>
            <li className="ml-6">
              <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-teal-100 rounded-full ring-4 ring-white">
                <span className="text-teal-800 text-xs font-bold">3</span>
              </span>
              <h4 className="font-semibold text-gray-900">Bank Visit</h4>
              <p className="text-sm text-gray-600 mt-1">Submit the documents to the branch. The bank will inspect your land.</p>
            </li>
          </ol>
        </div>

        {/* Key Takeaways */}
        <div className="bg-teal-900 text-white rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <FileText className="w-5 h-5 text-teal-300 mr-2" />
              Key Takeaways
            </h3>
            <ul className="space-y-3 text-teal-100 text-sm">
              <li className="flex items-start">
                <ArrowRight className="w-4 h-4 mr-2 mt-0.5 text-teal-400" />
                NLM Subsidy is "Back-ended" (adjusted in the loan account).
              </li>
              <li className="flex items-start">
                <ArrowRight className="w-4 h-4 mr-2 mt-0.5 text-teal-400" />
                Contract Farming (Integration) is easier to finance than independent units.
              </li>
              <li className="flex items-start">
                <ArrowRight className="w-4 h-4 mr-2 mt-0.5 text-teal-400" />
                Insurance for birds is often mandatory for bank loans.
              </li>
            </ul>
          </div>
          <button className="mt-8 w-full bg-teal-400 hover:bg-teal-300 text-teal-950 font-sans font-bold py-3 rounded-xl transition-colors">
            Check Subsidy Eligibility
          </button>
        </div>

      </div>
    </div>
  );
};

export default PoultryLoanInfo;