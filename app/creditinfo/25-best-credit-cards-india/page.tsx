"use client";
import React, { useState, useEffect } from "react";
import CategorySection from "@/component/creditcards/CategorySection";
import CreditCardDetailsDrawer, { CreditCardDetailsData } from "@/component/creditcards/CreditCardDetailsDrawer";
import { FiInfo } from "react-icons/fi";
import { ChevronRight } from "lucide-react";
import CreditCardApplicationModal from "@/component/creditcards/CreditCardApplicationModal";
import Link from "next/link";
import { allCategories } from "@/lib/creditCardCategories";
import CardItem, { CardInfo } from "@/component/creditcards/CardItem";

export default function BestCreditCardsPage() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CreditCardDetailsData | null>(null);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [applicationCard, setApplicationCard] = useState<any>(null);
  const [creditCards, setCreditCards] = useState<CardInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch('/api/credit-cards');
        const data = await response.json();
        
        const formattedCards: CardInfo[] = (data.cards || []).map((c: any) => ({
          id: c.id?.toString() || '',
          name: c.name || '',
          image: c.imageUrl || c.bankLogoUrl || "/creditcard/image 666.png",
          bullets: c.bulletPoints?.map((b: any) => 
            typeof b === 'string' ? b : b?.text || ''
          ).filter(Boolean) || [],
          bankName: c.bankName || '',
          bank: c.bankName || '',
          annualFee: c.annualFee || '',
          slug: c.slug || '',
          firstYearFee: c.firstYearFee,
          secondYearFee: c.secondYearFee,
          cardType: c.cardType || '',
          rating: c.rating || 0,
          categories: c.categories?.map((cat: any) => cat.name) || [],
        }));
        
        setCreditCards(formattedCards);
      } catch (error) {
        console.error('Error fetching cards:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  const handleApply = (card: any) => {
    console.log('Apply clicked for:', card.name);
    setApplicationCard({
      id: card.id,
      name: card.name,
      image: card.image,
      bullets: card.keyFeatures,
      bankName: card.bank,
      bank: card.bank,
      annualFee: card.annualFee,
    });
    setShowApplicationModal(true);
  };

  const handleShowDetails = (card: any) => {
    console.log('Show details for:', card.name);
    const details: CreditCardDetailsData = {
      id: card.id,
      name: card.name,
      bank: card.bank,
      image: card.image,
      categories: [card.bank],
      fee: card.annualFee,
      cardType: "Visa/Mastercard",
      bullets: card.keyFeatures,
    };
    setSelectedCard(details);
    setOpenDrawer(true);
  };

  // Category navigation links
  const categoryLinks = allCategories.map(category => {
    const IconComp = category.iconComponent;
    return {
      id: category.id,
      label: category.title.replace("Best ", "").replace(" in India", ""),
      icon: <IconComp className="w-5 h-5" />
    };
  });

  return (
    <div className="min-h-screen w-full bg-gray-50">
      {/* Hero Section */}
      <div className="bg-teal-500 text-white shadow-lg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="flex flex-col">
            {/* Breadcrumb */}
            <div className="mb-6 flex items-center gap-2 text-sm md:text-base font-medium opacity-90">
              <Link href="/" className="hover:underline transition-opacity">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/creditcards" className="hover:underline transition-opacity">Credit Cards</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="font-semibold">Best Credit Cards 2026</span>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight shadow-sm">
              Best Credit Cards in India 2026
            </h1>
            
            {/* Hero Description */}
            <div className="space-y-4 max-w-4xl">
              <p className="text-lg md:text-xl text-white/95 leading-relaxed">
                To maximize the benefits of a credit card, it is essential to choose a card that aligns with your lifestyle and spending patterns. With hundreds of options in the market, finding the right fit can be overwhelming.
              </p>
              <p className="text-lg md:text-xl text-white/95 leading-relaxed">
                To make your decision easier, we have curated a list of 25 best credit cards in India for 2026 across popular categories like shopping, travel, fuel, rewards, cashback, and premium credit cards.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Sidebar - Quick Navigation */}
          <div className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-24 space-y-6">
              {/* Categories Navigation */}
              <div className="bg-white shadow-lg p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FiInfo className="w-5 h-5 text-teal-500" />
                  Quick Navigation
                </h3>
                <nav className="space-y-2">
                  {categoryLinks.map((category) => (
                    <a
                      key={category.id}
                      href={`#${category.id}`}
                      className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-all group shadow-sm"
                    >
                      <div className="p-2 bg-gray-100 group-hover:bg-teal-100 transition-colors shadow">
                        <div className="text-gray-600 group-hover:text-teal-500">
                          {category.icon}
                        </div>
                      </div>
                      <span className="font-medium text-gray-700 group-hover:text-teal-500 transition-colors">
                        {category.label}
                      </span>
                    </a>
                  ))}
                </nav>
              </div>

              {/* Need Help Section */}
              <div className="bg-teal-50 shadow-lg p-6 border border-teal-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Need Help?</h3>
                <p className="text-sm text-gray-700 mb-6">
                  Our financial experts are here to help you choose the perfect credit card based on your spending habits and financial goals.
                </p>
                <Link
                  href="/contact-us"
                  className="block text-center px-4 py-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold transition-all shadow-md hover:shadow-lg"
                >
                  Get Expert Advice
                </Link>
              </div>
            </div>
          </div>
          
          {/* Main Cards Section */}
          <div className="flex-1">
            {/* Mobile Categories Filter */}
            <div className="lg:hidden mb-8">
              <div className="flex overflow-x-auto pb-2 gap-2 scrollbar-hide">
                {categoryLinks.map((category) => (
                  <a
                    key={category.id}
                    href={`#${category.id}`}
                    className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 shadow-md hover:shadow-lg transition-all whitespace-nowrap"
                  >
                    <div className="text-teal-500">
                      {category.icon}
                    </div>
                    <span className="font-medium text-gray-700">{category.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Featured Credit Cards from API */}
            {!loading && creditCards.length > 0 && (
              <div className="mb-12">
                <div className="bg-white shadow-lg p-6 border border-gray-200">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 bg-teal-500 flex items-center justify-center shadow-md">
                      <FiInfo className="w-5 h-5 text-white" />
                    </div>
                    Featured Credit Cards
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {creditCards.slice(0, 4).map((card) => (
                      <CardItem
                        key={card.id}
                        card={card}
                        onApply={handleApply}
                        onDetails={handleShowDetails}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
            {/* How to Choose Section */}
            <div className="mt-16 bg-white shadow-lg p-8 border border-gray-200">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-teal-500 flex items-center justify-center shadow-md">
                  <FiInfo className="w-5 h-5 text-white" />
                </div>
                How to Choose the Right Credit Card?
              </h2>
              
              <div className="space-y-6">
                {[
                  {
                    number: "1",
                    title: "Identify your needs",
                    description: "Identify your needs and decide which credit card suits your requirements to make the most out of it. Based on the type of value-back offered, credit cards are majorly divided into categories like cashback, travel, shopping, and more."
                  },
                  {
                    number: "2",
                    title: "Compare credit cards",
                    description: "Compare credit cards based on interest rates, rewards programs, bonus categories, annual fees, and other benefits. There might be a possibility that other credit cards offer similar or better benefits at a lower annual fee."
                  },
                  {
                    number: "3",
                    title: "Consider fees & charges",
                    description: "Check all applicable fees and charges before applying. Besides annual charges, keep a check on finance charges, cash advance charges, forex markup fees, over-limit charges, and interest rates."
                  }
                ].map((item, index) => (
                  <div key={index} className="bg-teal-50 p-6 border border-teal-200 shadow-md">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 bg-teal-500 flex items-center justify-center shadow-md">
                        <span className="text-white font-bold">{item.number}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Note Section */}
            <div className="mt-8 bg-yellow-50 border border-yellow-300 p-6 shadow-md">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-yellow-200 flex items-center justify-center shrink-0 shadow">
                  <FiInfo className="w-5 h-5 text-yellow-700" />
                </div>
                <div>
                  <h4 className="font-bold text-yellow-800 text-lg mb-2">Important Note:</h4>
                  <p className="text-yellow-700">
                    HDFC Infinia is not included in the above list as it is an invite-only card. This list contains credit cards that are generally available for application through official channels.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <CreditCardDetailsDrawer
        isOpen={openDrawer}
        onClose={() => setOpenDrawer(false)}
        card={selectedCard}
        onApply={() => setOpenDrawer(false)}
      />

      <CreditCardApplicationModal
        isOpen={showApplicationModal}
        onClose={() => {
          setShowApplicationModal(false);
          setApplicationCard(null);
        }}
        bankName={applicationCard?.bank}
        bankLogo={applicationCard?.image}
        productId={applicationCard?.id ? parseInt(applicationCard.id) : undefined}
        categorySlug={applicationCard?.categories?.[0]}
        categoryName={applicationCard?.name}
      />
    </div>
  );
}