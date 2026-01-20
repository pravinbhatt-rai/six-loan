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
    question: "What is airport lounge access with credit cards?",
    answer: "Airport lounge access allows credit cardholders to relax in premium airport lounges before their flight. These lounges offer comfortable seating, complimentary food and beverages, Wi-Fi, and a quiet environment away from the crowded terminal."
  },
  {
    question: "How many complimentary lounge visits do I get?",
    answer: "Lounge access varies by card. Entry-level cards typically offer 2-4 visits per year, mid-tier cards offer 4-8 visits, and premium cards often provide unlimited domestic lounge access plus 2-4 international visits per year."
  },
  {
    question: "Can I bring a guest to the lounge?",
    answer: "Guest access depends on your card. Some premium cards allow 1-2 guests per visit, while others charge a nominal fee per guest. Check your card's lounge access program for specific guest policies."
  },
  {
    question: "Which lounge networks are available?",
    answer: "Major lounge networks in India include Priority Pass, Dreamfolks, Lounge Key, and bank-specific lounges. Premium cards often provide access to multiple networks, giving you access to hundreds of lounges worldwide."
  },
  {
    question: "Do I need to book lounge access in advance?",
    answer: "Most domestic lounges don't require advance booking – just show your credit card and boarding pass at the lounge entrance. However, some international lounges may require pre-booking through the lounge program's app or website."
  },
];

export default function LoungeCreditCardsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <CategoryHero
        category="lounge"
        title="Credit Cards with Airport Lounge Access"
        description="Travel in style with complimentary airport lounge access. Enjoy premium amenities, complimentary food and beverages, and a peaceful environment before your flight across domestic and international airports."
        benefits={[
          "Free Lounge Access",
          "Domestic & International",
          "Priority Pass Membership",
          "Guest Access Available"
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
                Why Choose Lounge Access Credit Cards?
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 leading-relaxed mb-4">
                  Airport lounge access is one of the most valued benefits for frequent travelers. Instead of waiting in crowded airport terminals, you can relax in premium lounges with complimentary food, drinks, Wi-Fi, and comfortable seating.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Many credit cards now offer complimentary lounge access through programs like Priority Pass, Dreamfolks, or bank-specific lounges. These memberships typically cost thousands of rupees annually but come free with your credit card.
                </p>
                
                <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">What You Get in Lounges</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span><strong>Complimentary F&B:</strong> Enjoy free snacks, meals, and beverages (alcoholic and non-alcoholic)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span><strong>Comfortable Seating:</strong> Relax in plush chairs and sofas away from crowded gates</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span><strong>Business Facilities:</strong> Access to Wi-Fi, charging stations, and workstations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span><strong>Shower Facilities:</strong> Premium lounges offer shower rooms for long layovers</span>
                  </li>
                </ul>

                <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Types of Lounge Programs</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  <strong>Priority Pass:</strong> Access to 1,300+ lounges worldwide. Premium cards offer unlimited visits globally.
                  <br/><br/>
                  <strong>Dreamfolks/Lounge Key:</strong> Popular in India with access to major domestic and select international airports.
                  <br/><br/>
                  <strong>Bank Lounges:</strong> Exclusive lounges by banks like Axis, HDFC, and ICICI at major Indian airports.
                </p>
              </div>
            </div>

            {/* Card Listing */}
            <CreditCardListSection 
              categoryFilter="Lounge"
              maxCards={6}
              title="Best Lounge Access Credit Cards"
              description="Get complimentary airport lounge access with these premium credit cards"
              showViewMore={true}
              viewMoreHref="/creditcards"
            />

            {/* FAQ Section */}
            <FAQSection faqs={faqs} title="Lounge Access FAQs" />
          </div>
        </div>
      </div>
    </main>
  );
}
