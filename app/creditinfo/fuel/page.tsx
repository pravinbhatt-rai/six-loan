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
    question: "What is fuel surcharge waiver on credit cards?",
    answer: "Fuel surcharge waiver means you don't pay the 1% fee that petrol pumps typically charge on credit card transactions. With a fuel credit card, you can save this surcharge and often earn additional cashback or reward points on fuel purchases."
  },
  {
    question: "How much can I save with a fuel credit card?",
    answer: "Savings vary by card. Most fuel cards waive the 1% surcharge (up to ₹500-₹5,000/month) and offer 1-5% cashback on fuel. If you spend ₹10,000/month on fuel, you could save ₹1,200-₹6,000 annually."
  },
  {
    question: "Are there any minimum transaction limits?",
    answer: "Yes, most fuel surcharge waivers require a minimum transaction of ₹400-₹500 per transaction. Some cards also have monthly caps on the total surcharge waiver amount (typically ₹150-₹500/month)."
  },
  {
    question: "Which fuel stations accept credit card payments?",
    answer: "All major fuel station chains in India accept credit cards – Indian Oil, Bharat Petroleum, Hindustan Petroleum, Shell, and Reliance Petrol Pumps. However, surcharge waiver benefits may be limited to specific fuel brands depending on your card."
  },
  {
    question: "Can I use fuel credit cards for other expenses?",
    answer: "Absolutely! Fuel credit cards work like regular credit cards for all purchases. While they offer special benefits on fuel, you can use them for groceries, dining, shopping, and other expenses to earn rewards on all spending."
  },
];

export default function FuelCreditCardsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <CategoryHero
        category="fuel"
        title="Best Fuel Credit Cards in India"
        description="Save big on fuel expenses with credit cards offering fuel surcharge waiver, cashback, and reward points. Get up to 5% savings on every fuel transaction at petrol pumps across India."
        benefits={[
          "1% Surcharge Waiver",
          "Up to 5% Fuel Cashback",
          "Reward Points on Fuel",
          "All Major Fuel Stations"
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
                Why Choose Fuel Credit Cards?
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 leading-relaxed mb-4">
                  If you drive regularly, a fuel credit card is essential for reducing your monthly fuel expenses. Petrol pumps typically charge a 1% surcharge on credit card payments – a fuel card eliminates this fee and often provides additional cashback or rewards.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Beyond fuel savings, these cards often come with other benefits like reward points on all spending, lounge access, and insurance coverage, making them valuable for everyday use.
                </p>
                
                <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">How Much Can You Save?</h3>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                  <p className="text-gray-700 mb-2"><strong>Example Calculation:</strong></p>
                  <p className="text-gray-600 text-sm">
                    Monthly Fuel Spend: ₹10,000<br/>
                    Surcharge Waiver Savings: ₹100 (1%)<br/>
                    Cashback @ 2.5%: ₹250<br/>
                    <strong className="text-amber-700">Total Monthly Savings: ₹350</strong><br/>
                    <strong className="text-amber-700">Annual Savings: ₹4,200</strong>
                  </p>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Top Features to Look For</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-2">•</span>
                    <span><strong>Fuel Surcharge Waiver:</strong> 1% waiver on minimum transaction of ₹400-₹500</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-2">•</span>
                    <span><strong>Cashback/Rewards:</strong> Additional 1-5% cashback or accelerated reward points</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-2">•</span>
                    <span><strong>Wide Acceptance:</strong> Benefits at all major fuel stations (IOCL, BPCL, HPCL, Shell)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-2">•</span>
                    <span><strong>No Annual Fee:</strong> Lifetime free or fee waiver on spending milestone</span>
                  </li>
                </ul>

                <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Best For</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Fuel credit cards are perfect for daily commuters, frequent road travelers, and families with vehicles. If you spend ₹5,000 or more monthly on fuel, a dedicated fuel card pays for itself many times over.
                </p>
              </div>
            </div>

            {/* Card Listing */}
            <CreditCardListSection 
              categorySlug="fuel"
              maxCards={6}
              title="Top Fuel Credit Cards"
              description="Compare credit cards with maximum fuel benefits and savings"
              showViewMore={true}
              viewMoreHref="/creditcards"
            />

            {/* FAQ Section */}
            <FAQSection faqs={faqs} title="Fuel Credit Cards FAQs" />
          </div>
        </div>
      </div>
    </main>
  );
}
