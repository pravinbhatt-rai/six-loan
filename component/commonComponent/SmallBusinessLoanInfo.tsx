import React from 'react';

const SmallBusinessLoanInfo = () => {
  return (
    <div className="max-w-6xl mx-auto mb-8 bg-white text-gray-800 font-serif p-4 md:p-8 border-0 md:border md:border-gray-200 rounded-none md:rounded-3xl shadow-none md:shadow-sm">
      
      {/* Header Section */}
      <header className="mb-10 text-center border-b border-gray-100 pb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-teal-900 mb-4">
          Small Business Loans (MSME)
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Fueling growth for Micro, Small, and Medium Enterprises through tailored financial solutions, working capital, and government-backed schemes.
        </p>
      </header>

      {/* About Small Business Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
          <span className="bg-teal-100 text-teal-800 text-sm font-sans font-medium mr-3 px-3 py-1 rounded-full">Definition</span>
          About Small Business (MSME)
        </h2>
        <div className="prose prose-lg text-gray-700 max-w-none">
          <p className="mb-6">
            Small business loans are typically categorized under the <strong>MSME (Micro, Small, and Medium Enterprises)</strong> sector. In many regions (including India), the classification is based on Investment and Annual Turnover.
          </p>
          
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full text-sm font-sans text-left border border-teal-100 rounded-lg">
              <thead className="bg-teal-50 text-teal-900 font-bold uppercase">
                <tr>
                  <th className="px-6 py-3 border-b border-teal-200">Category</th>
                  <th className="px-6 py-3 border-b border-teal-200">Investment (Plant & Machinery)</th>
                  <th className="px-6 py-3 border-b border-teal-200">Annual Turnover</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-teal-50">
                <tr>
                  <td className="px-6 py-4 font-bold text-teal-800">Micro</td>
                  <td className="px-6 py-4">Up to ₹1 Crore</td>
                  <td className="px-6 py-4">Up to ₹5 Crore</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-bold text-teal-800">Small</td>
                  <td className="px-6 py-4">Up to ₹10 Crore</td>
                  <td className="px-6 py-4">Up to ₹50 Crore</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-bold text-teal-800">Medium</td>
                  <td className="px-6 py-4">Up to ₹50 Crore</td>
                  <td className="px-6 py-4">Up to ₹250 Crore</td>
                </tr>
              </tbody>
            </table>
          </div>
          
        </div>
      </section>

      {/* Eligibility Criteria */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Eligibility Criteria</h2>
        <div className="bg-teal-50/50 p-6 md:p-8 rounded-2xl border border-teal-100">
          <div className="grid md:grid-cols-2 gap-8">
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="flex-shrink-0 h-6 w-6 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center mr-3 mt-0.5">✓</span>
                <span><strong>Business Vintage:</strong> The business should have been operational for at least <strong>2-3 years</strong> with a positive trend in turnover.</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 h-6 w-6 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center mr-3 mt-0.5">✓</span>
                <span><strong>Credit Score:</strong> A CIBIL/Credit score of <strong>700+</strong> is typically required for unsecured loans. (650+ for secured/collateral loans).</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 h-6 w-6 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center mr-3 mt-0.5">✓</span>
                <span><strong>Turnover:</strong> Minimum annual turnover varies by bank, often starting from ₹10 Lakhs to ₹40 Lakhs.</span>
              </li>
            </ul>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="flex-shrink-0 h-6 w-6 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center mr-3 mt-0.5">✓</span>
                <span><strong>Age Limit:</strong> Applicant age should be between <strong>21 and 65 years</strong> at the time of loan maturity.</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 h-6 w-6 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center mr-3 mt-0.5">✓</span>
                <span><strong>Profitability:</strong> The business should be profit-making for the last 2 years (audited financials required).</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 h-6 w-6 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center mr-3 mt-0.5">✓</span>
                <span><strong>ITR:</strong> Income Tax Returns for the last 2-3 years should be filed.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Types of Loans */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Types of Small Business Loans</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1 */}
          <div className="bg-white border border-gray-200 p-5 rounded-xl hover:shadow-md hover:border-teal-300 transition-all">
            <h3 className="font-bold text-lg text-teal-700 mb-2">Term Loans</h3>
            <p className="text-sm text-gray-600">
              Lump-sum amount for specific purposes like expansion or capital expenditure. Repaid over a fixed tenure (1-10 years).
            </p>
          </div>
          {/* Card 2 */}
          <div className="bg-white border border-gray-200 p-5 rounded-xl hover:shadow-md hover:border-teal-300 transition-all">
            <h3 className="font-bold text-lg text-teal-700 mb-2">Working Capital</h3>
            <p className="text-sm text-gray-600">
              Short-term funding (Overdraft/Cash Credit) to manage daily operations, inventory, and payroll needs.
            </p>
          </div>
          {/* Card 3 */}
          <div className="bg-white border border-gray-200 p-5 rounded-xl hover:shadow-md hover:border-teal-300 transition-all">
            <h3 className="font-bold text-lg text-teal-700 mb-2">MUDRA Loans</h3>
            <p className="text-sm text-gray-600">
              Govt. scheme (PMMY) for non-corporate micro units.
              <br/><span className="text-xs font-bold text-teal-500 mt-1 block">Up to ₹10 Lakhs (Collateral Free)</span>
            </p>
          </div>
          {/* Card 4 */}
          <div className="bg-white border border-gray-200 p-5 rounded-xl hover:shadow-md hover:border-teal-300 transition-all">
            <h3 className="font-bold text-lg text-teal-700 mb-2">Equipment Finance</h3>
            <p className="text-sm text-gray-600">
              Specific loans to purchase machinery or vehicles. The equipment itself often serves as the collateral/security.
            </p>
          </div>
        </div>
      </section>

      {/* Popular Banks Table */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Popular Banks: Interest & Eligibility</h2>
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-700 text-sm uppercase tracking-wider">
                <th className="p-4 font-semibold border-b border-gray-200">Bank</th>
                <th className="p-4 font-semibold border-b border-gray-200">Interest Rate (p.a.)*</th>
                <th className="p-4 font-semibold border-b border-gray-200 w-2/5">Key Features</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm divide-y divide-gray-100">
              <tr>
                <td className="p-4 font-bold text-gray-900">SBI (State Bank of India)</td>
                <td className="p-4">
                  ~8.15% - 14.00%<br/>
                  <span className="text-xs text-gray-500">(Linked to EBLR)</span>
                </td>
                <td className="p-4">
                  Offers "SME Collateral Free Loan" under CGTMSE cover. Very competitive rates but stricter documentation.
                </td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-gray-900">HDFC Bank</td>
                <td className="p-4">~10.75% - 22.00%</td>
                <td className="p-4">
                  "Business Growth Loan" up to ₹40 Lakhs without collateral/guarantor. Quick disbursal for existing customers.
                </td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-gray-900">Axis Bank</td>
                <td className="p-4">~14.00% onwards</td>
                <td className="p-4">
                  Flexible tenure up to 60 months. Zero collateral for loans up to a certain limit (Business Loan).
                </td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-gray-900">Bajaj Finserv (NBFC)</td>
                <td className="p-4">~17.00% - 28.00%</td>
                <td className="p-4">
                  Higher interest rates but faster approval (often 24-48 hours). Lenient on credit score compared to big banks.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-3 italic">
          *Interest rates are indicative for 2024-25 and depend on credit profile, business vintage, and loan tenure.
        </p>
      </section>

    </div>
  );
};

export default SmallBusinessLoanInfo;