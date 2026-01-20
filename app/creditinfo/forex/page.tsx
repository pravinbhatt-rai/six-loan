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
  { title: "Travel Credit Cards", href: "/creditinfo/travel" },
  { title: "International Cards", href: "/creditinfo/international" },
  { title: "Compare Credit Cards", href: "/creditcards/compare" },
];

const faqs = [
  {
    question: "What is zero forex markup on credit cards?",
    answer: "Zero forex markup means you pay the exact exchange rate without any additional markup fees when using your card internationally. Regular cards charge 3.5% markup on foreign transactions, but zero forex cards eliminate this extra cost completely."
  },
  {
    question: "How much can I save with a zero forex card?",
    answer: "On a ₹1 lakh international transaction, you save ₹3,500 compared to regular cards. If you spend ₹5 lakhs overseas annually, you save ₹17,500! Even a single international trip can offset the card's annual fee through forex savings alone."
  },
  {
    question: "Are there any hidden charges?",
    answer: "No! Zero forex markup cards charge 0% markup on foreign currency transactions. However, the international payment network (Visa/Mastercard) applies a base exchange rate. Always check if your specific card charges any additional foreign transaction fees."
  },
  {
    question: "Can I use zero forex cards for online shopping?",
    answer: "Absolutely! Zero forex cards are perfect for shopping on international e-commerce sites like Amazon Global, AliExpress, ASOS, etc. You'll pay the same exchange rate as the bank without the typical 3.5% markup, making international online shopping much cheaper."
  },
  {
    question: "Which is better - zero forex or cashback on forex?",
    answer: "Zero forex (0% markup) is better than cashback cards that charge 3.5% and give back 1-2%. With zero forex, you save the full 3.5%, whereas cashback cards only return a portion. For frequent international spenders, zero markup cards provide maximum savings."
  },
];

export default function ForexCreditCardsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <CategoryHero
        category="forex"
        title="Zero Forex Markup Credit Cards"
        description="Save up to 3.5% on all international transactions with zero forex markup credit cards. Perfect for overseas travel, foreign currency shopping, and global e-commerce – no hidden charges, just transparent exchange rates."
        benefits={[
          "0% Forex Markup",
          "Save 3.5% on Every Transaction",
          "International Shopping",
          "No Hidden Fees"
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
                Why Choose Zero Forex Markup Cards?
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 leading-relaxed mb-4">
                  When you use a regular credit card for international transactions, banks typically charge a 3.5% forex markup fee on top of the exchange rate. This adds up quickly – a ₹1 lakh purchase costs you an extra ₹3,500!
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Zero forex markup credit cards eliminate this fee entirely, giving you access to near-perfect exchange rates. This makes international travel, overseas shopping, and foreign currency subscriptions significantly more affordable.
                </p>
                
                <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Massive Savings Potential</h3>
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">Real Savings Comparison</h4>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b border-green-100">
                      <span className="text-gray-600"><strong>International Trip (₹2 Lakhs)</strong></span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Regular Card (3.5% markup):</span>
                      <span className="text-red-600 font-semibold">₹7,000 fee</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Zero Forex Card:</span>
                      <span className="text-green-600 font-semibold">₹0 fee</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-green-200">
                      <span className="text-gray-900 font-bold">You Save:</span>
                      <span className="text-green-700 font-bold text-lg">₹7,000</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-green-200">
                    <p className="text-sm text-gray-600">
                      <strong>Annual Savings Example:</strong> If you spend ₹5 lakhs on international transactions yearly, you save <strong className="text-green-700">₹17,500</strong> with a zero forex card!
                    </p>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Perfect Use Cases</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span><strong>International Travel:</strong> Hotels, restaurants, shopping, and activities abroad</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span><strong>Online Shopping:</strong> Amazon Global, ASOS, AliExpress, and other international sites</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span><strong>Digital Subscriptions:</strong> Netflix, Spotify, Adobe, Microsoft Office in foreign currency</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span><strong>Business Travel:</strong> Client meetings, conferences, and overseas assignments</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span><strong>Education:</strong> Tuition fees, course materials for international programs</span>
                  </li>
                </ul>

                <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Important Things to Know</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  While zero forex markup eliminates the bank's markup, you still pay the base exchange rate set by Visa/Mastercard (typically 0.5-1% above interbank rates). This is unavoidable with any card. The key benefit is eliminating the additional 3.5% markup that regular cards charge.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Some zero forex cards may have annual fees, but even a ₹5,000 annual fee is easily recovered if you make just one ₹1.5 lakh international transaction. Many premium cards also include lounge access and travel insurance, adding even more value.
                </p>
              </div>
            </div>

            {/* Card Listing */}
            <CreditCardListSection 
              categoryFilter="Forex"
              maxCards={6}
              title="Best Zero Forex Markup Credit Cards"
              description="Save money on international transactions with 0% forex markup"
              showViewMore={true}
              viewMoreHref="/creditcards"
            />

            {/* FAQ Section */}
            <FAQSection faqs={faqs} title="Zero Forex Markup FAQs" />
          </div>
        </div>
      </div>
    </main>
  );
}
