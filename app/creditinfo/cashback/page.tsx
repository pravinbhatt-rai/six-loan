"use client";
import React from "react";
import CategoryHero from "@/component/creditinfo/CategoryHero";
import QuickLinksSidebar from "@/component/creditinfo/QuickLinksSidebar";
import FAQSection from "@/component/creditinfo/FAQSection";
import CreditCardListSection from "@/component/creditinfo/CreditCardListSection";

const quickLinks = [
  { title: "All Credit Cards", href: "/creditinfo" },
  { title: "Rewards Credit Cards", href: "/creditinfo/rewards" },
  { title: "Lounge Access Cards", href: "/creditinfo/lounge" },
  { title: "Travel Credit Cards", href: "/creditinfo/travel" },
  { title: "Fuel Credit Cards", href: "/creditinfo/fuel" },
  { title: "Compare Credit Cards", href: "/creditcards/compare" },
];

const faqs = [
  {
    question: "What are cashback credit cards?",
    answer: "Cashback credit cards are cards that reward you with a percentage of your spending back as cash. Typically, you earn 1-5% cashback on every purchase, which can be credited to your account or redeemed as statement credits."
  },
  {
    question: "How do I maximize cashback rewards?",
    answer: "To maximize cashback, use your card for everyday purchases, pay your balance in full each month to avoid interest charges, and look for bonus categories that offer higher cashback rates on specific spending like groceries, dining, or fuel."
  },
  {
    question: "Are there any limits on cashback earnings?",
    answer: "Yes, most cashback cards have monthly or quarterly caps on the amount of cashback you can earn. Some cards also have minimum redemption thresholds. Check your card's terms and conditions for specific limits."
  },
  {
    question: "Can I use cashback cards for online shopping?",
    answer: "Absolutely! Most cashback credit cards offer cashback on all purchases, including online shopping. Some cards even offer higher cashback rates for online transactions or specific e-commerce platforms."
  },
  {
    question: "What is the best cashback credit card in India?",
    answer: "The best cashback card depends on your spending patterns. Cards like HDFC Bank Millennia, SBI Cashback Card, and American Express Platinum Cashback offer competitive cashback rates on various categories. Compare features and benefits to find the best fit for you."
  },
];

export default function CashbackCreditCardsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <CategoryHero
        category="cashback"
        title="Best Cashback Credit Cards in India"
        description="Earn real money back on every purchase with India's top cashback credit cards. Get up to 5% cashback on daily spending including groceries, dining, fuel, and online shopping."
        benefits={[
          "Up to 5% Cashback",
          "No Categories to Track",
          "Instant Rewards",
          "No Redemption Hassle"
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
                Why Choose Cashback Credit Cards?
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 leading-relaxed mb-4">
                  Cashback credit cards are perfect for those who want straightforward rewards without the complexity of points, miles, or redemption catalogs. Every time you swipe your card, you earn a percentage of your spending back as cash – it's that simple.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Unlike rewards cards where you need to figure out the best redemption options, cashback cards give you direct value. Whether you're shopping for groceries, paying utility bills, or dining out, you earn money back automatically.
                </p>
                
                <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Top Features to Look For</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-teal-500 mr-2">•</span>
                    <span><strong>High Cashback Rates:</strong> Look for cards offering 2-5% cashback on popular categories</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-500 mr-2">•</span>
                    <span><strong>No Annual Fee:</strong> Many great cashback cards are available with lifetime free or first-year-free options</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-500 mr-2">•</span>
                    <span><strong>Welcome Bonus:</strong> Some cards offer sign-up bonuses worth ₹500-₹2,000</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-500 mr-2">•</span>
                    <span><strong>Easy Redemption:</strong> Best cards credit cashback directly to your statement or bank account</span>
                  </li>
                </ul>

                <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Who Should Get a Cashback Card?</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Cashback cards are ideal if you want simple, transparent rewards without worrying about point valuations or redemption strategies. They're perfect for everyday spending and provide immediate value on all your purchases.
                </p>
              </div>
            </div>

            {/* Card Listing */}
            <CreditCardListSection 
              categorySlug="cashback"
              maxCards={6}
              title="Top Cashback Credit Cards"
              description="Compare and apply for the best cashback credit cards in India"
              showViewMore={true}
              viewMoreHref="/creditcards"
            />

            {/* FAQ Section */}
            <FAQSection faqs={faqs} title="Cashback Credit Cards FAQs" />
          </div>
        </div>
      </div>
    </main>
  );
}
