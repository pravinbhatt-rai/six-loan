"use client";
import React from "react";
import CategoryHero from "@/component/creditinfo/CategoryHero";
import QuickLinksSidebar from "@/component/creditinfo/QuickLinksSidebar";
import FAQSection from "@/component/creditinfo/FAQSection";
import CreditCardListSection from "@/component/creditinfo/CreditCardListSection";

const quickLinks = [
  { title: "All Credit Cards", href: "/creditinfo" },
  { title: "Cashback Credit Cards", href: "/creditinfo/cashback" },
  { title: "Rewards Credit Cards", href: "/creditinfo/rewards" },
  { title: "Lounge Access Cards", href: "/creditinfo/lounge" },
  { title: "Travel Credit Cards", href: "/creditinfo/travel" },
  { title: "Compare Credit Cards", href: "/creditcards/compare" },
];

const faqs = [
  {
    question: "What are secured credit cards?",
    answer: "Secured credit cards require you to deposit a fixed amount (₹5,000 - ₹2 lakhs) as security with the bank. Your credit limit equals 80-100% of this deposit. They're designed for people with no credit history or low CIBIL scores to build creditworthiness."
  },
  {
    question: "Who should get a secured credit card?",
    answer: "Secured cards are ideal for: 1) First-time credit card users with no credit history, 2) People with CIBIL scores below 650, 3) Students and young professionals starting their credit journey, 4) Those who've had credit defaults and want to rebuild their score."
  },
  {
    question: "How do I convert to an unsecured card?",
    answer: "After 12-18 months of regular usage and timely payments, most banks automatically upgrade your secured card to an unsecured card and refund your security deposit. Some banks may require you to apply for conversion after demonstrating good credit behavior."
  },
  {
    question: "Will I earn my fixed deposit interest?",
    answer: "Yes! The security deposit is kept as a fixed deposit in your name, and you earn FD interest (typically 4-7% p.a.) throughout the period. When upgraded to unsecured, you get back the principal plus accumulated interest."
  },
  {
    question: "How quickly can I build my credit score?",
    answer: "With responsible usage (timely payments, keeping utilization under 30%), you can improve your CIBIL score by 50-100 points within 6-12 months. Consistent good behavior for 12-18 months can bring a 'no credit' user to a score of 750+."
  },
];

export default function SecuredCreditCardsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <CategoryHero
        category="secured"
        title="Secured Credit Cards - Build Your Credit Score"
        description="Start your credit journey with secured credit cards requiring minimal documentation. Perfect for first-time users, students, and those rebuilding credit. Build your CIBIL score with guaranteed approval and earn interest on your security deposit."
        benefits={[
          "Guaranteed Approval",
          "Build Credit Score",
          "Minimal Documentation",
          "Earn FD Interest"
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <QuickLinksSidebar title="Explore More" links={quickLinks} />
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-10">
            {/* Content Section */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Why Choose Secured Credit Cards?
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 leading-relaxed mb-4">
                  Secured credit cards are the perfect entry point into the world of credit for those with no credit history or low CIBIL scores. Unlike regular credit cards that require good credit scores, secured cards offer guaranteed approval with just a fixed deposit as security.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  These cards work exactly like regular credit cards – you can shop online, swipe at stores, pay bills, and earn rewards. The key difference is the security deposit that backs your credit limit, making banks comfortable lending to first-time users.
                </p>
                
                <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">How Secured Cards Work</h3>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mb-6">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-emerald-700 font-bold">1</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Deposit Security</p>
                        <p className="text-sm text-gray-600">Place ₹5,000 - ₹2 lakhs as FD with the bank</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-emerald-700 font-bold">2</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Get Credit Card</p>
                        <p className="text-sm text-gray-600">Receive card with credit limit of 80-100% of deposit</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-emerald-700 font-bold">3</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Build Credit History</p>
                        <p className="text-sm text-gray-600">Use card responsibly, pay bills on time for 12-18 months</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-emerald-700 font-bold">4</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Upgrade to Unsecured</p>
                        <p className="text-sm text-gray-600">Get regular credit card + FD refund with interest</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Key Benefits</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-emerald-500 mr-2">•</span>
                    <span><strong>Guaranteed Approval:</strong> Get approved even with zero credit history or low CIBIL</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-500 mr-2">•</span>
                    <span><strong>Build Credit Score:</strong> Improve score by 50-100 points in 6-12 months with good usage</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-500 mr-2">•</span>
                    <span><strong>Earn FD Interest:</strong> Your security deposit earns 4-7% interest annually</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-500 mr-2">•</span>
                    <span><strong>Minimal Documentation:</strong> Just PAN, Aadhaar, and bank statement required</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-500 mr-2">•</span>
                    <span><strong>All Card Benefits:</strong> Rewards, cashback, insurance same as regular cards</span>
                  </li>
                </ul>

                <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Best Practices for Success</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  <strong>1. Pay Full Amount On Time:</strong> Always pay your full statement amount before the due date. Even one late payment can hurt your score.
                  <br/><br/>
                  <strong>2. Keep Utilization Below 30%:</strong> If your limit is ₹50,000, don't spend more than ₹15,000 per month. Low utilization shows responsible credit behavior.
                  <br/><br/>
                  <strong>3. Use Regularly:</strong> Make small purchases every month and pay them off. Regular, responsible usage builds credit history faster.
                  <br/><br/>
                  <strong>4. Monitor Your Score:</strong> Check your CIBIL score every 3 months to track improvement.
                </p>

                <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Who Benefits Most?</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Secured credit cards are perfect for students, young professionals, freelancers, housewives applying for their first credit card, and anyone who's been rejected for regular cards due to lack of credit history. They're also excellent for people rebuilding credit after loan defaults or high CIBIL utilization.
                </p>
              </div>
            </div>

            {/* Card Listing */}
            <CreditCardListSection 
              categorySlug="secured"
              maxCards={6}
              title="Best Secured Credit Cards"
              description="Start building your credit score with these secured credit cards"
              showViewMore={true}
              viewMoreHref="/creditcards"
            />

            {/* FAQ Section */}
            <FAQSection faqs={faqs} title="Secured Credit Cards FAQs" />
          </div>
        </div>
      </div>
    </main>
  );
}
