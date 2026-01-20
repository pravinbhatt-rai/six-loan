import React from 'react';

const GoatFarmingLoanInfo = () => {
  return (
    <div className="max-w-6xl mx-auto mb-8 bg-white text-gray-800 font-serif p-4 md:p-8 border-0 md:border md:border-gray-200 rounded-none md:rounded-3xl shadow-none md:shadow-sm">
      
      {/* Header Section */}
      <header className="mb-10 text-center border-b border-gray-100 pb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-teal-900 mb-4">
          Goat Farming Business Loans
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Comprehensive financial support for commercial goat rearing (Chevon & Milk), covering shed construction, livestock purchase, and fodder development.
        </p>
      </header>

      {/* About Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
          <span className="bg-teal-100 text-teal-800 text-sm font-sans font-medium mr-3 px-3 py-1 rounded-full">Overview</span>
          About Goat Farming Business
        </h2>
        <div className="prose prose-lg text-gray-700 max-w-none">
          <p className="mb-4">
            Often called the <strong>"Poor Man's Cow"</strong>, goat farming is a low-investment, high-return venture ideal for Indian climatic conditions. Loans in this sector are generally classified under "Agriculture Allied Activities."
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li><strong>Commercial Units:</strong> Loans are typically available for units starting from <strong>10 Does + 1 Buck</strong> up to large commercial farms (500+ animals).</li>
            <li><strong>Subsidy Support:</strong> A major attraction is the <strong>NABARD</strong> subsidy scheme (EDEG), which often provides 25% to 33% back-ended subsidy on the project cost.</li>
            <li><strong>Purpose:</strong> Funds can be used for purchasing breeding stock, constructing elevated sheds, buying chaff cutters, and insuring animals.</li>
          </ul>
        </div>
      </section>

      {/* Eligibility Criteria */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Eligibility Criteria</h2>
        <div className="bg-teal-50/50 p-6 md:p-8 rounded-2xl border border-teal-100">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="font-bold text-teal-800 border-b border-teal-200 pb-2">Applicant Profile</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-teal-600 mr-2">✓</span>
                  <span><strong>Who can apply:</strong> Farmers, Individuals, SHGs (Self Help Groups), JLGs, and Private Companies.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-600 mr-2">✓</span>
                  <span><strong>Age:</strong> Typically 18 to 65 years.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-600 mr-2">✓</span>
                  <span><strong>Experience:</strong> A training certificate from a recognized Animal Husbandry center is often mandatory for subsidies.</span>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-bold text-teal-800 border-b border-teal-200 pb-2">Technical Requirements</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-teal-600 mr-2">✓</span>
                  <span><strong>Land:</strong> Must own or lease land for shed construction and fodder cultivation (approx. 1 acre per 50-60 goats).</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-600 mr-2">✓</span>
                  <span><strong>Veterinary Access:</strong> Proximity to a veterinary clinic is a standard bank requirement.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-600 mr-2">✓</span>
                  <span><strong>Collateral:</strong> Loans up to ₹1.60 Lakh are often collateral-free. Higher amounts require land security.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Types of Loans */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Types of Goat Farming Loans</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-teal-300 transition-all">
            <h3 className="text-lg font-bold text-teal-800 mb-2">Term Loans</h3>
            <p className="text-gray-600 text-sm mb-3">
              For capital assets: buying the herd (Does & Bucks), shed construction, and equipment purchase.
            </p>
            <span className="text-xs font-bold text-teal-500 uppercase tracking-wide">5-7 Years Tenure</span>
          </div>
          {/* Card 2 */}
          <div className="border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-teal-300 transition-all">
            <h3 className="text-lg font-bold text-teal-800 mb-2">KCC (Animal Husbandry)</h3>
            <p className="text-gray-600 text-sm mb-3">
              Working capital limit for feed, labor, and vaccines. Highly subsidized interest rates.
            </p>
            <span className="text-xs font-bold text-teal-500 uppercase tracking-wide">Revolving Credit</span>
          </div>
          {/* Card 3 */}
          <div className="border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-teal-300 transition-all">
            <h3 className="text-lg font-bold text-teal-800 mb-2">IDBI/Commercial</h3>
            <p className="text-gray-600 text-sm mb-3">
              Specialized schemes for large-scale farms (₹50K to ₹50 Lakhs) focusing on meat processing units.
            </p>
            <span className="text-xs font-bold text-teal-500 uppercase tracking-wide">Large Scale</span>
          </div>
        </div>
      </section>

      {/* Popular Banks Table */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Popular Banks: Interest & Eligibility</h2>
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-teal-50 text-gray-700 text-sm uppercase tracking-wider">
                <th className="p-4 font-semibold border-b border-teal-200">Bank / Institution</th>
                <th className="p-4 font-semibold border-b border-teal-200">Interest Rate (Approx)*</th>
                <th className="p-4 font-semibold border-b border-teal-200 w-1/2">Key Highlights</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm divide-y divide-gray-100">
              <tr>
                <td className="p-4 font-bold text-gray-900">SBI (Allied Activity)</td>
                <td className="p-4">
                  ~10.00% - 12.50%<br/>
                  <span className="text-xs text-teal-600">(7% for KCC upto 3L)</span>
                </td>
                <td className="p-4">
                  Loans available for unit sizes of 10+1, 20+1, or 40+2. Repayment period typically 5-6 years with a 1-year grace period.
                </td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-gray-900">Canara Bank</td>
                <td className="p-4">ROI linked to RLLR</td>
                <td className="p-4">
                  <strong>Sheep & Goat Rearing Loan:</strong> Margin is NIL for loans up to ₹1.60 Lakhs. Above that, 15-25% margin is required.
                </td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-gray-900">IDBI Bank</td>
                <td className="p-4">Competitive (Base Rate+)</td>
                <td className="p-4">
                  Offers "Sheep & Goat Rearing" term loans from ₹50,000 up to ₹50 Lakhs for individuals and shepherd co-ops.
                </td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-gray-900">NABARD (Subsidy)</td>
                <td className="p-4">Subsidy Provider</td>
                <td className="p-4">
                  <strong>General Category:</strong> 25% subsidy.<br/>
                  <strong>SC/ST/BPL:</strong> 33% subsidy.<br/>
                  <span className="italic text-xs">Note: Apply via commercial banks.</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-3 text-right">
          *Interest rates are subject to change. Subsidies depend on government fund availability.
        </p>
      </section>

      {/* Next Step CTA */}
      <div className="mt-8 pt-6 border-t border-gray-100 text-center">
        <p className="text-gray-600 mb-4">Ready to start your farm?</p>
        <button className="bg-teal-700 text-white px-6 py-3 rounded-full hover:bg-teal-800 transition-colors font-sans font-medium">
          Check Subsidy Eligibility
        </button>
      </div>

    </div>
  );
};

export default GoatFarmingLoanInfo;