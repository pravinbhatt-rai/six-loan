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
  { title: "Zero Forex Cards", href: "/creditinfo/forex" },
];

const faqs = [
  {
    question: "What are international credit cards?",
    answer: "International credit cards are designed for use abroad, accepted at millions of merchants worldwide. They come with features like global acceptance (Visa/Mastercard networks), EMV chip security, international lounge access, travel insurance, and often reduced forex markup on foreign currency transactions."
  },
  {
    question: "Can I use my credit card internationally?",
    answer: "Yes, most Indian credit cards work internationally if they're on Visa or Mastercard networks. However, regular cards charge 3.5% forex markup. International credit cards offer better rates (0-1.99% markup) plus additional benefits like travel insurance and concierge services."
  },
  {
    question: "Do I need to inform my bank before traveling?",
    answer: "Yes, it's recommended to inform your bank about your travel dates and destinations before international trips. This prevents your card from being blocked for suspected fraud. Most banks allow you to update travel plans through their mobile app or customer service."
  },
  {
    question: "What's the difference between international and regular cards?",
    answer: "International cards offer: lower forex markup (0-1.99% vs 3.5%), complimentary travel insurance, international lounge access, global concierge services, higher spending limits, and better fraud protection. They're optimized for frequent international travelers."
  },
  {
    question: "Are international cards accepted everywhere?",
    answer: "Visa and Mastercard international cards are accepted at 70+ million merchants worldwide and 3+ million ATMs. American Express and Diners Club have slightly lower acceptance. Always carry a backup Visa/Mastercard for universal acceptance."
  },
];

export default function InternationalCreditCardsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <CategoryHero
        category="international"
        title="Best International Credit Cards in India"
        description="Travel the world with confidence using international credit cards accepted globally. Enjoy reduced forex markup, comprehensive travel insurance, worldwide lounge access, and premium concierge services."
        benefits={[
          "Global Acceptance",
          "Reduced Forex Markup",
          "Travel Insurance",
          "Concierge Services"
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
                Why Choose International Credit Cards?
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 leading-relaxed mb-4">
                  International credit cards are essential for frequent overseas travelers. They're accepted at millions of locations worldwide and come with features specifically designed to make international travel smoother, safer, and more rewarding.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Beyond basic payment functionality, these cards offer reduced currency conversion fees, comprehensive travel protection, airport lounge access across continents, and 24/7 global assistance – making them invaluable travel companions.
                </p>
                
                <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Key International Benefits</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-cyan-500 mr-2">•</span>
                    <span><strong>Universal Acceptance:</strong> Accepted at 70M+ merchants worldwide on Visa/Mastercard</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-500 mr-2">•</span>
                    <span><strong>Lower Forex Charges:</strong> 0-1.99% markup vs 3.5% on regular cards</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-500 mr-2">•</span>
                    <span><strong>Travel Protection:</strong> Medical emergencies, lost baggage, trip delays up to ₹1 crore</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-500 mr-2">•</span>
                    <span><strong>Global Lounges:</strong> Access to 1,300+ lounges via Priority Pass</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-500 mr-2">•</span>
                    <span><strong>24/7 Assistance:</strong> Global concierge for reservations, emergencies, and travel help</span>
                  </li>
                </ul>

                <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Forex Markup Comparison</h3>
                <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4 mb-4">
                  <p className="text-gray-700 mb-2"><strong>On $1,000 (₹82,000) Overseas Spend:</strong></p>
                  <p className="text-gray-600 text-sm">
                    Regular Card (3.5% markup): ₹2,870 fee<br/>
                    Premium International Card (0% markup): ₹0 fee<br/>
                    <strong className="text-cyan-700">You Save: ₹2,870</strong>
                    <br/><br/>
                    On annual overseas spending of ₹5 lakhs, you save ₹17,500 with a zero-markup card!
                  </p>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Security Features</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  International cards come with enhanced security: EMV chip technology, 3D Secure authentication, SMS alerts for every transaction, instant card freeze via app, and zero liability for fraudulent transactions. Premium cards also offer emergency card replacement worldwide within 48 hours.
                </p>

                <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Best For</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Perfect for frequent international travelers, business executives with overseas assignments, students studying abroad, and anyone who shops regularly from international e-commerce sites. If you travel abroad even once or twice a year, the savings on forex markup alone justify getting an international card.
                </p>
              </div>
            </div>

            {/* Card Listing */}
            <CreditCardListSection 
              categoryFilter="International"
              maxCards={6}
              title="Top International Credit Cards"
              description="Best credit cards for international travel and overseas spending"
              showViewMore={true}
              viewMoreHref="/creditcards"
            />

            {/* FAQ Section */}
            <FAQSection faqs={faqs} title="International Credit Cards FAQs" />
          </div>
        </div>
      </div>
    </main>
  );
}
