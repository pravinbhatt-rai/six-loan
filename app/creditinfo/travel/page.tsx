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
  { title: "Fuel Credit Cards", href: "/creditinfo/fuel" },
  { title: "Compare Credit Cards", href: "/creditcards/compare" },
];

const faqs = [
  {
    question: "What are travel credit cards?",
    answer: "Travel credit cards are designed specifically for frequent travelers, offering benefits like air miles, hotel points, complimentary lounge access, travel insurance, zero forex markup, and accelerated rewards on travel bookings. They make international and domestic travel more affordable and convenient."
  },
  {
    question: "How do I earn air miles with travel cards?",
    answer: "You earn air miles automatically on every spend. Most travel cards offer 1-4 miles per ₹100 spent, with accelerated earning (5-10 miles) on travel bookings. Miles can be transferred to airline partners like Vistara, Air India, Emirates, and Singapore Airlines."
  },
  {
    question: "Do travel cards have foreign transaction fees?",
    answer: "Premium travel cards typically offer zero or reduced forex markup (0-1.99%) on international transactions, compared to 3.5% charged by regular cards. This can save you thousands on overseas spending."
  },
  {
    question: "What travel insurance benefits are included?",
    answer: "Most travel cards include complimentary insurance covering flight delays, lost baggage, trip cancellation, medical emergencies abroad, and personal accident coverage. Premium cards offer higher coverage limits (₹50 lakhs - ₹1 crore)."
  },
  {
    question: "Are travel credit cards worth the annual fee?",
    answer: "If you travel frequently (3+ times/year), premium travel cards easily justify their fee through lounge access (worth ₹10,000+), air miles (worth ₹15,000-₹50,000), and travel insurance (worth ₹5,000-₹10,000). The net value often exceeds ₹50,000 annually."
  },
];

export default function TravelCreditCardsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <CategoryHero
        category="travel"
        title="Best Travel Credit Cards in India"
        description="Unlock exclusive travel benefits including air miles, hotel points, complimentary lounge access, travel insurance, and zero forex markup. Make every trip more rewarding with India's best travel credit cards."
        benefits={[
          "Earn Air Miles",
          "Free Lounge Access",
          "Travel Insurance",
          "Zero Forex Markup"
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
                Why Choose Travel Credit Cards?
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 leading-relaxed mb-4">
                  Travel credit cards are designed to make your journeys more comfortable and affordable. Whether you're a frequent business traveler or love exploring new destinations, these cards offer unparalleled benefits that can save you thousands on each trip.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  From earning air miles on every purchase to enjoying complimentary airport lounge access and comprehensive travel insurance, travel cards transform ordinary spending into extraordinary travel experiences.
                </p>
                
                <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Premium Travel Benefits</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-indigo-500 mr-2">•</span>
                    <span><strong>Air Miles Program:</strong> Earn 2-10 miles per ₹100 spent, redeemable for flight tickets</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-500 mr-2">•</span>
                    <span><strong>Lounge Access:</strong> Unlimited domestic + international lounge visits via Priority Pass</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-500 mr-2">•</span>
                    <span><strong>Travel Insurance:</strong> Coverage up to ₹1 crore for medical, baggage loss, and trip delays</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-500 mr-2">•</span>
                    <span><strong>Zero Forex Markup:</strong> Save 3.5% on all international transactions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-500 mr-2">•</span>
                    <span><strong>Hotel Benefits:</strong> Complimentary room upgrades, late checkout, and breakfast at partner hotels</span>
                  </li>
                </ul>

                <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Value Calculation Example</h3>
                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-4">
                  <p className="text-gray-700 mb-2"><strong>Annual Benefits Worth:</strong></p>
                  <p className="text-gray-600 text-sm">
                    Lounge Access (8 visits): ₹10,000<br/>
                    Air Miles Earned: ₹25,000 (on ₹5L annual spend)<br/>
                    Travel Insurance: ₹8,000<br/>
                    Forex Savings: ₹7,000 (on ₹2L overseas spend)<br/>
                    <strong className="text-indigo-700">Total Value: ₹50,000</strong><br/>
                    <strong className="text-indigo-700">Typical Annual Fee: ₹5,000-₹10,000</strong>
                  </p>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Perfect For</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Travel credit cards are ideal for frequent flyers, business travelers, and anyone who travels internationally 2-3 times per year. If you value comfort, convenience, and savings on travel expenses, a premium travel card is an essential companion.
                </p>
              </div>
            </div>

            {/* Card Listing */}
            <CreditCardListSection 
              categoryFilter="Travel"
              maxCards={6}
              title="Top Travel Credit Cards"
              description="Explore premium travel cards with air miles and exclusive benefits"
              showViewMore={true}
              viewMoreHref="/creditcards"
            />

            {/* FAQ Section */}
            <FAQSection faqs={faqs} title="Travel Credit Cards FAQs" />
          </div>
        </div>
      </div>
    </main>
  );
}
