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
  { title: "Fuel Credit Cards", href: "/creditinfo/fuel" },
  { title: "Compare Credit Cards", href: "/creditcards/compare" },
];

const faqs = [
  {
    question: "What is OneCard?",
    answer: "OneCard is India's first numberless metal credit card built with a mobile-first approach. It's a digital-first credit card that offers real-time spending notifications, instant activation, paperless application, and powerful rewards on all transactions."
  },
  {
    question: "How is OneCard different from traditional credit cards?",
    answer: "OneCard stands out with its mobile-first experience, instant approval process, no hidden fees, lifetime free membership, and 5X reward points on top spending categories. The card has no number printed on it for enhanced security."
  },
  {
    question: "What are the reward benefits of OneCard?",
    answer: "OneCard offers 5X rewards on your top 2 spending categories every month (auto-detected), 1X rewards on all other spends, and instant redemption of reward points. Points never expire and can be used for statement credit or shopping."
  },
  {
    question: "Is OneCard secure?",
    answer: "Yes, OneCard is highly secure. Since it's a numberless card, your card details can't be stolen by physical theft. All card details are stored securely in the app, and you can freeze/unfreeze your card instantly through the mobile app."
  },
  {
    question: "How do I apply for OneCard?",
    answer: "Download the OneCard app, complete the 3-minute paperless application with your PAN and Aadhaar, and get instant approval. The physical metal card will be delivered to your doorstep within 5-7 days, but you can start using the virtual card immediately."
  },
];

export default function OneCardCreditCardsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <CategoryHero
        category="onecard"
        title="OneCard Credit Cards - India's Smart Metal Card"
        description="Experience the future of credit cards with OneCard's mobile-first metal cards. Get instant approval, 5X rewards on top categories, lifetime free membership, and complete control through a powerful mobile app."
        benefits={[
          "5X Rewards Top Categories",
          "Instant Digital Approval",
          "Lifetime Free",
          "Metal Card Design"
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
                Why Choose OneCard?
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 leading-relaxed mb-4">
                  OneCard revolutionizes credit cards in India with its mobile-first, metal card design and intelligent rewards system. Unlike traditional credit cards, OneCard automatically identifies your top spending categories and rewards them with 5X points.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  The card features no physical card number for enhanced security, instant digital approval within minutes, and a powerful mobile app that gives you complete control over your spending and rewards.
                </p>
                
                <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Key Features</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">•</span>
                    <span><strong>5X Smart Rewards:</strong> Automatically earn 5X rewards on your top 2 spending categories</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">•</span>
                    <span><strong>Instant Approval:</strong> Complete paperless application in 3 minutes with instant credit line</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">•</span>
                    <span><strong>Metal Card:</strong> Premium numberless metal card delivered to your doorstep</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">•</span>
                    <span><strong>No Hidden Fees:</strong> Lifetime free with no joining fee, annual fee, or forex markup</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">•</span>
                    <span><strong>App Control:</strong> Freeze/unfreeze card, check spending, redeem rewards instantly via app</span>
                  </li>
                </ul>

                <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Perfect For</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  OneCard is ideal for millennials and Gen Z users who prefer digital-first experiences, want a no-hassle credit card without hidden fees, and appreciate intelligent rewards that adapt to their spending patterns. If you value security, transparency, and modern design, OneCard is the perfect choice.
                </p>
              </div>
            </div>

            {/* Card Listing */}
            <CreditCardListSection 
              categoryFilter="OneCard"
              maxCards={6}
              title="OneCard Credit Cards"
              description="Discover India's smart metal credit cards with 5X rewards"
              showViewMore={true}
              viewMoreHref="/creditcards"
            />

            {/* FAQ Section */}
            <FAQSection faqs={faqs} title="OneCard FAQs" />
          </div>
        </div>
      </div>
    </main>
  );
}
