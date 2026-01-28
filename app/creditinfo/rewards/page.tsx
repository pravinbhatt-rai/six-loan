"use client";
import React from "react";
import CategoryHero from "@/component/creditinfo/CategoryHero";
import QuickLinksSidebar from "@/component/creditinfo/QuickLinksSidebar";
import FAQSection from "@/component/creditinfo/FAQSection";
import CreditCardListSection from "@/component/creditinfo/CreditCardListSection";

const quickLinks = [
  { title: "All Credit Cards", href: "/creditinfo" },
  { title: "Cashback Credit Cards", href: "/creditinfo/cashback" },
  { title: "Lounge Access Cards", href: "/creditinfo/lounge" },
  { title: "Travel Credit Cards", href: "/creditinfo/travel" },
  { title: "Fuel Credit Cards", href: "/creditinfo/fuel" },
  { title: "Compare Credit Cards", href: "/creditcards/compare" },
];

const faqs = [
  {
    question: "What are rewards credit cards?",
    answer: "Rewards credit cards let you earn points on every purchase, which can be redeemed for a variety of benefits like flights, hotel stays, shopping vouchers, merchandise, or even cashback. The more you spend, the more reward points you accumulate."
  },
  {
    question: "How do I redeem reward points?",
    answer: "Reward points can typically be redeemed through the bank's rewards portal, mobile app, or by calling customer service. Options include booking travel, shopping online, converting to air miles, or redeeming for statement credits."
  },
  {
    question: "Do reward points expire?",
    answer: "Yes, most reward points have an expiry period, typically ranging from 2-5 years depending on the card. Some premium cards offer non-expiring points. Always check your card's terms to avoid losing accumulated points."
  },
  {
    question: "Which categories earn the most reward points?",
    answer: "Most rewards cards offer accelerated points on categories like dining (3-5X), travel (5-10X), and online shopping (2-4X). Regular spending typically earns 1-2 points per ₹100 spent."
  },
  {
    question: "Can I transfer reward points to airline miles?",
    answer: "Many premium rewards cards allow you to transfer points to airline frequent flyer programs at favorable ratios (typically 1:1 or 2:1). This is often the most valuable way to redeem points for international travel."
  },
];

export default function RewardsCreditCardsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <CategoryHero
        category="rewards"
        title="Best Rewards Credit Cards in India"
        description="Maximize your spending with reward points that can be redeemed for travel, shopping, dining, and more. Earn accelerated points on every purchase and enjoy exclusive lifestyle benefits."
        benefits={[
          "Earn 2-10X Reward Points",
          "Travel & Dining Benefits",
          "Shopping Vouchers",
          "Milestone Rewards"
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
                Why Choose Rewards Credit Cards?
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 leading-relaxed mb-4">
                  Rewards credit cards are ideal for those who want flexibility in how they use their earned benefits. Unlike straightforward cashback, rewards points can be redeemed across multiple categories – from flight bookings to luxury shopping experiences.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  The best rewards cards offer accelerated earning rates on specific categories like dining, travel, and online shopping, allowing you to accumulate points faster where you spend the most. Premium cards often come with welcome bonuses worth lakhs in points.
                </p>
                
                <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Key Benefits of Rewards Cards</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <span><strong>Accelerated Earning:</strong> Earn 2-10X points on dining, travel, and online shopping</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <span><strong>Flexible Redemption:</strong> Convert to air miles, hotel points, shopping vouchers, or cashback</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <span><strong>Welcome Bonuses:</strong> Premium cards offer sign-up bonuses worth ₹5,000-₹20,000 in points</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <span><strong>Milestone Rewards:</strong> Earn bonus points for achieving spending milestones</span>
                  </li>
                </ul>

                <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Best For</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Rewards cards work best for people who spend significantly on categories with accelerated earning rates and who value flexibility in redemption options. If you frequently travel or dine out, rewards cards can provide exceptional value.
                </p>
              </div>
            </div>

            {/* Card Listing */}
            <CreditCardListSection 
              categorySlug="rewards"
              maxCards={6}
              title="Top Rewards Credit Cards"
              description="Discover credit cards with the best reward point programs in India"
              showViewMore={true}
              viewMoreHref="/creditcards"
            />

            {/* FAQ Section */}
            <FAQSection faqs={faqs} title="Rewards Credit Cards FAQs" />
          </div>
        </div>
      </div>
    </main>
  );
}
