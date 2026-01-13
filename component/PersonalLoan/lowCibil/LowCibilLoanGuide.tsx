import React from 'react';
import { 
  Building2, 
  Wallet, 
  Briefcase, 
  Users, 
  TrendingDown, 
  Lock, 
  AlertTriangle, 
  CheckCircle2 
} from 'lucide-react';

const LowCibilLoanGuide: React.FC = () => {
  return (
    <article 
      className="max-w-6xl mx-auto mb-8 bg-white text-gray-800 font-serif 
                 p-4 md:p-8 
                 border-0 md:border md:border-gray-200 
                 rounded-none md:rounded-3xl 
                 shadow-none md:shadow-sm"
    >
      {/* Header Section */}
      <header className="mb-8 border-b border-gray-100 pb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
          How to Secure a Personal Loan with a <span className="text-teal-600">Low CIBIL Score</span>
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
          Applying for a personal loan from the wrong lender can worsen your credit health. 
          While options are limited, strategic planning can help you secure funding even with a lower score.
        </p>
      </header>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
        
        {/* Left Column: Strategies (Span 2) */}
        <div className="lg:col-span-2 space-y-10">
          
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              6 Proven Strategies for Approval
            </h2>

            {/* Strategy 1 */}
            <div className="mb-8">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-teal-50 rounded-lg shrink-0 mt-1">
                  <Building2 className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">1. Choose Fintech & NBFC Lenders</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Avoid large public or private sector banks if your score is low. New-age fintechs and NBFCs often have relaxed criteria. 
                    <span className="block mt-2 italic text-sm text-gray-500 bg-gray-50 p-2 border-l-4 border-teal-500">
                      <strong>Note:</strong> Loans from these lenders often come with significantly higher interest rates.
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Strategy 2 */}
            <div className="mb-8">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-teal-50 rounded-lg shrink-0 mt-1">
                  <Wallet className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">2. Prove Adequate Disposable Income</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Lenders may overlook a low score if you demonstrate high repayment capacity. Be ready to provide additional documents like mutual fund portfolios or demat account statements to prove financial stability.
                  </p>
                </div>
              </div>
            </div>

            {/* Strategy 3 */}
            <div className="mb-8">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-teal-50 rounded-lg shrink-0 mt-1">
                  <Briefcase className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">3. Leverage Employer Reputation</h3>
                  <p className="text-gray-600 leading-relaxed">
                    If you work for a reputed MNC or public sector organization, lenders perceive higher income certainty. Your job stability can act as a counterbalance to a lower credit score.
                  </p>
                </div>
              </div>
            </div>

            {/* Strategy 4 */}
            <div className="mb-8">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-teal-50 rounded-lg shrink-0 mt-1">
                  <Users className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">4. Add a Co-applicant</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Adding an earning family member with a <strong>good CIBIL score</strong> as a co-applicant significantly reduces the lender's risk, as they become equally responsible for repayment.
                  </p>
                </div>
              </div>
            </div>

             {/* Strategy 5 & 6 (Grid within Grid) */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                   <div className="flex items-center gap-2 mb-3">
                      <TrendingDown className="w-5 h-5 text-teal-600" />
                      <h3 className="font-bold text-gray-900">5. Request Smaller Amounts</h3>
                   </div>
                   <p className="text-sm text-gray-600">
                     Lower loan amounts decrease the risk of default. Ask your lender if a smaller sanction is possible.
                   </p>
                </div>

                <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                   <div className="flex items-center gap-2 mb-3">
                      <Lock className="w-5 h-5 text-teal-600" />
                      <h3 className="font-bold text-gray-900">6. Offer Collateral</h3>
                   </div>
                   <p className="text-sm text-gray-600">
                     Pledge Fixed Deposits, Gold, or Savings as security. Secured loans are much easier to get with low scores.
                   </p>
                </div>
             </div>

          </section>

          {/* Critical Warning Block */}
          <div className="bg-red-50 border border-red-100 p-6 rounded-xl flex gap-4 items-start">
            <AlertTriangle className="w-6 h-6 text-red-500 shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-red-800 mb-1">Critical Note on Defaults</h4>
              <p className="text-red-700 text-sm leading-relaxed">
                If you have major defaults in your history or outstanding dues, your chances are minimal. In this case, prioritize clearing dues over applying for new credit.
              </p>
            </div>
          </div>

        </div>

        {/* Right Column: Improvement Tips (Sidebar) */}
        <aside className="lg:col-span-1">
          <div className="bg-teal-600 text-white p-6 md:p-8 rounded-xl lg:sticky lg:top-8">
            <h2 className="text-2xl font-bold mb-6 text-white border-b border-teal-700 pb-4">
              Improve Your CIBIL
            </h2>
            <p className="mb-6 text-teal-100 text-sm">
              Your score impacts every future application (Home Loans, Cards). Start fixing it today.
            </p>
            
            <ul className="space-y-4">
              {[
                "Check your report for errors or frauds",
                "Pay outstanding amounts immediately",
                "Repay existing EMIs in full and on time",
                "Avoid applying for multiple loans simultaneously"
              ].map((tip, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-300 shrink-0 mt-0.5" />
                  <span className="text-teal-50 text-sm font-medium leading-snug">{tip}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-6 border-t border-teal-700">
               <p className="text-xs text-teal-300 uppercase tracking-widest font-sans mb-2">Recommended</p>
               <a href="#" className="text-white font-bold underline decoration-teal-400 decoration-2 underline-offset-4 hover:text-teal-200 transition-colors">
                 Read: Detailed Guide to Improving CIBIL Score &rarr;
               </a>
            </div>
          </div>
        </aside>

      </div>
    </article>
  );
};

export default LowCibilLoanGuide;