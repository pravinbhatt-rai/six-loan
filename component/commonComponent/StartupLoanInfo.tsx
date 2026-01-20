'use client';
import React, { useState } from 'react';
import { 
  Rocket, 
  Briefcase, 
  FileText, 
  Landmark, 
  CheckCircle, 
  TrendingUp, 
  ChevronDown, 
  ChevronUp,
  ArrowRight
} from 'lucide-react';

const StartupLoanInfo = () => {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  return (
    <div className="max-w-6xl mx-auto mb-8 bg-white text-gray-800 font-serif p-4 md:p-8 border-0 md:border md:border-gray-200 rounded-none md:rounded-3xl shadow-none md:shadow-sm">
      
      {/* --- HERO HEADER --- */}
      <header className="relative mb-12 rounded-2xl overflow-hidden bg-teal-900 text-white">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=2070" 
            alt="Startup Team" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative p-8 md:p-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-teal-500/30 border border-teal-400/40 px-3 py-1 rounded-full text-xs font-sans font-bold uppercase tracking-wider text-teal-100 backdrop-blur-sm">
              New Ventures
            </span>
            <span className="bg-orange-500/30 border border-orange-400/40 px-3 py-1 rounded-full text-xs font-sans font-bold uppercase tracking-wider text-orange-100 backdrop-blur-sm">
              Govt Supported
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight font-serif">
            Startup Business Loans
          </h1>
          <p className="text-teal-100 text-lg md:text-xl max-w-2xl font-light leading-relaxed">
            Fuel your innovation with the right financial backing. Comprehensive guide to funding options, government schemes, and eligibility for Indian startups.
          </p>
        </div>
      </header>

      {/* --- 1. KNOW ABOUT STARTUP LOANS --- */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-teal-50 rounded-lg">
            <Rocket className="w-6 h-6 text-teal-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Know About Startup Business Loan</h2>
        </div>
        <div className="prose prose-lg text-gray-700 max-w-none">
          <p>
            A startup business loan is a credit facility specifically designed to meet the funding requirements of new businesses. unlike traditional business loans that require a 3-year vintage, startup loans often focus on <strong>future potential, business models, and innovation</strong>.
          </p>
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="bg-teal-50/50 p-4 border-l-4 border-teal-500 rounded-r-lg">
              <h3 className="font-bold text-teal-900 text-sm mb-1">Seed Funding</h3>
              <p className="text-sm text-gray-600">Early-stage capital for product development and market research.</p>
            </div>
            <div className="bg-teal-50/50 p-4 border-l-4 border-teal-500 rounded-r-lg">
              <h3 className="font-bold text-teal-900 text-sm mb-1">Working Capital</h3>
              <p className="text-sm text-gray-600">Funds to manage daily operations, inventory, and payroll.</p>
            </div>
            <div className="bg-teal-50/50 p-4 border-l-4 border-teal-500 rounded-r-lg">
              <h3 className="font-bold text-teal-900 text-sm mb-1">Expansion Credit</h3>
              <p className="text-sm text-gray-600">Scaling operations, hiring teams, and entering new markets.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- 2. ELIGIBILITY CRITERIA --- */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Eligibility Criteria for Startups</h2>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm">
          <div className="grid md:grid-cols-2 gap-8">
            <ul className="space-y-4">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-teal-500 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700"><strong>Business Vintage:</strong> While some banks ask for 1-2 years, government schemes often support <span className="text-teal-700 font-semibold">0-year vintage</span> (Greenfield projects).</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-teal-500 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700"><strong>Credit Score:</strong> A CIBIL score of <strong>700+</strong> is preferred for the founders/promoters.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-teal-500 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700"><strong>Age:</strong> Applicant should be between <strong>21 and 65 years</strong>.</span>
              </li>
            </ul>
            <ul className="space-y-4">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-teal-500 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700"><strong>Registration:</strong> Must be a Private Limited Co, LLP, or Partnership. DPIIT recognition is mandatory for tax exemptions and specific schemes.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-teal-500 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700"><strong>Turnover:</strong> Should not exceed ₹100 Crores for "Startup" status eligibility.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-teal-500 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700"><strong>Business Plan:</strong> A solid, written business plan showing viability and revenue models.</span>
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
            { title: "KYC Documents", items: ["PAN Card", "Aadhaar Card", "Directors' ID Proof"] },
            { title: "Business Proof", items: ["Incorporation Cert.", "GST Registration", "MOA / AOA"] },
            { title: "Financials", items: ["Bank Statements (6-12 mo)", "ITR (if available)", "Projected Balance Sheet"] },
            { title: "Project Report", items: ["Business Model", "Cost Estimates", "Revenue Projections"] }
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

      {/* --- 4. TOP 6 GOVT SCHEMES (Accordion Style) --- */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-orange-50 rounded-lg">
            <Landmark className="w-6 h-6 text-orange-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Top 6 Govt. Loan Schemes</h2>
        </div>
        
        <div className="space-y-3">
          {[
            { 
              name: "Startup India Seed Fund Scheme (SISFS)", 
              limit: "Up to ₹50 Lakhs", 
              desc: "Financial assistance for proof of concept, prototype development, and product trials. Disbursed via approved incubators." 
            },
            { 
              name: "Stand-Up India Scheme", 
              limit: "₹10 Lakhs - ₹1 Crore", 
              desc: "Exclusively for SC/ST or Women entrepreneurs setting up a greenfield enterprise. Offers composite loans (Term Loan + Working Capital)." 
            },
            { 
              name: "Pradhan Mantri MUDRA Yojana (PMMY)", 
              limit: "Up to ₹10 Lakhs", 
              desc: "Collateral-free loans for non-corporate, non-farm small/micro enterprises. Categories: Shishu (50k), Kishore (5L), Tarun (10L)." 
            },
            { 
              name: "Credit Guarantee Scheme (CGSS)", 
              limit: "Up to ₹10 Crores", 
              desc: "Provides credit guarantees to financial institutions to provide collateral-free loans to DPIIT-recognized startups." 
            },
            { 
              name: "SIDBI Fund of Funds", 
              limit: "Venture Capital Equity", 
              desc: "Not a direct loan, but capital infusion via SEBI-registered Alternative Investment Funds (AIFs) for scalable startups." 
            },
            { 
              name: "PMEGP Scheme", 
              limit: "Up to ₹50 Lakhs", 
              desc: "Subsidy-linked scheme (15-35% subsidy) for generating employment in manufacturing and service sectors." 
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
                <td className="p-4 font-bold">SBI (State Bank of India)</td>
                <td className="p-4">~8.65% - 11.00%</td>
                <td className="p-4">Special schemes for Stand-Up India & CGTMSE coverage.</td>
              </tr>
              <tr>
                <td className="p-4 font-bold">HDFC Bank</td>
                <td className="p-4">~10.50% - 16.00%</td>
                <td className="p-4">Collateral-free loans up to ₹40 Lakhs for eligible startups.</td>
              </tr>
              <tr>
                <td className="p-4 font-bold">Axis Bank</td>
                <td className="p-4">~10.75% onwards</td>
                <td className="p-4">Flexible tenure up to 60 months; minimal documentation.</td>
              </tr>
              <tr>
                <td className="p-4 font-bold">Bajaj Finserv (NBFC)</td>
                <td className="p-4">~17.00% - 25.00%</td>
                <td className="p-4">Faster disbursal (often 24-48 hours) for urgent funds.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-2 text-right">*Rates subject to applicant profile and market conditions.</p>
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
              <h4 className="font-semibold text-gray-900">Prepare Business Plan</h4>
              <p className="text-sm text-gray-600 mt-1">Create a detailed project report (DPR) with financial projections.</p>
            </li>
            <li className="ml-6">
              <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-teal-100 rounded-full ring-4 ring-white">
                <span className="text-teal-800 text-xs font-bold">2</span>
              </span>
              <h4 className="font-semibold text-gray-900">Register Startup</h4>
              <p className="text-sm text-gray-600 mt-1">Get DPIIT recognition or Udyam Registration for govt benefits.</p>
            </li>
            <li className="ml-6">
              <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-teal-100 rounded-full ring-4 ring-white">
                <span className="text-teal-800 text-xs font-bold">3</span>
              </span>
              <h4 className="font-semibold text-gray-900">Apply via Portal/Bank</h4>
              <p className="text-sm text-gray-600 mt-1">Use 'JanSamarth' portal for govt schemes or apply directly at bank branches.</p>
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
                Collateral-free options (CGTMSE/CGSS) are available up to ₹2-5 Crores.
              </li>
              <li className="flex items-start">
                <ArrowRight className="w-4 h-4 mr-2 mt-0.5 text-teal-400" />
                DPIIT recognition is crucial for tax holidays and easier compliance.
              </li>
              <li className="flex items-start">
                <ArrowRight className="w-4 h-4 mr-2 mt-0.5 text-teal-400" />
                Women founders often get interest rate concessions (0.25% - 0.50%).
              </li>
            </ul>
          </div>
          <button className="mt-8 w-full bg-teal-400 hover:bg-teal-300 text-teal-950 font-sans font-bold py-3 rounded-xl transition-colors">
            Check Your Eligibility Now
          </button>
        </div>

      </div>
    </div>
  );
};

export default StartupLoanInfo;