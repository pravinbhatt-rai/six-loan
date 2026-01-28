"use client";
import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { CreditCard, Shield, Zap, Globe, Sparkles, ArrowRight } from "lucide-react";
import UniversalCardItem, { UniversalCardInfo } from '@/component/creditcards/UniversalCardItem';
import DebitCardComparisonModal from '@/component/creditcards/DebitCardComparisonModal';
import BottomComparisonBar from '@/component/creditcards/BottomComparisonBar';

export default function DebitCardsPage() {
  const [debitCards, setDebitCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch('/api/debit-cards?limit=12');
        const data = await response.json();
        if (data.success) {
          setDebitCards(data.products);
        }
      } catch (error) {
        console.error('Error fetching debit cards:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  const handleApply = (card: UniversalCardInfo) => {
    // Redirect to the apply URL if available, otherwise to the card's detail page
    if (card.applyUrl) {
      window.open(card.applyUrl, '_blank');
    } else {
      window.location.href = `/debitcard/${card.slug}`;
    }
  };

  const handleCompare = (cardId: string) => {
    setSelectedCards(prev => {
      if (prev.includes(cardId)) {
        return prev.filter(id => id !== cardId);
      } else if (prev.length < 2) {
        return [...prev, cardId];
      }
      return prev;
    });
  };

  const handleCompareNow = () => {
    if (selectedCards.length >= 2) {
      setShowComparison(true);
    }
  };

  // Get selected card objects for display
  const getSelectedCardObjects = (): UniversalCardInfo[] => {
    return selectedCards.map(id => {
      const card = debitCards.find(c => c.id === id);
      return card ? mapToUniversalCardInfo(card) : null;
    }).filter((card): card is UniversalCardInfo => card !== null);
  };

  const mapToUniversalCardInfo = (card: any): UniversalCardInfo => ({
    id: card.id,
    name: card.name,
    imageUrl: card.imageUrl,
    bankName: card.bankName,
    annualFee: card.annualFee,
    slug: card.slug,
    rating: card.rating,
    applyUrl: card.applyUrl,
    keyFeatures: card.keyFeatures || [],
    safetyFeatures: card.safetyFeatures || [],
    offers: card.offers || [],
    bulletPoints: card.bulletPoints || [],
  });

  const categories = [
    {
      title: "Best Debit Cards",
      slug: "best-debit-cards",
      icon: <Sparkles className="w-6 h-6" />,
      description: "Top-rated debit cards in India",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Zero Fee Cards",
      slug: "zero-fee",
      icon: <Zap className="w-6 h-6" />,
      description: "Lifetime free debit cards",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Cashback Cards",
      slug: "cashback",
      icon: <CreditCard className="w-6 h-6" />,
      description: "High cashback on every spend",
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "International Usage",
      slug: "international",
      icon: <Globe className="w-6 h-6" />,
      description: "Best for overseas transactions",
      color: "from-orange-500 to-red-500"
    },
    {
      title: "Lounge Access",
      slug: "lounge-access",
      icon: <Sparkles className="w-6 h-6" />,
      description: "Airport lounge benefits",
      color: "from-indigo-500 to-purple-500"
    },
    {
      title: "Safety Features",
      slug: "safety",
      icon: <Shield className="w-6 h-6" />,
      description: "Enhanced security & insurance",
      color: "from-teal-500 to-green-500"
    },
  ];

  const allCardsMemo = useMemo(() => debitCards.map(mapToUniversalCardInfo), [debitCards]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Find Your Perfect Debit Card
          </h1>
          <p className="text-xl text-teal-100 mb-8">
            Compare features, cashback, and benefits to choose the best debit card for your needs
          </p>
          
          {/* Quick Finder */}
          <div className="bg-white rounded-lg shadow-xl p-6 text-gray-800">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-teal-600" />
              Best Debit Card Finder
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500">
                <option value="">Select Your Bank</option>
                <option value="hdfc">HDFC Bank</option>
                <option value="sbi">State Bank of India</option>
                <option value="icici">ICICI Bank</option>
                <option value="axis">Axis Bank</option>
                <option value="kotak">Kotak Mahindra Bank</option>
              </select>
              
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500">
                <option value="">Account Type</option>
                <option value="savings">Savings Account</option>
                <option value="salary">Salary Account</option>
                <option value="current">Current Account</option>
              </select>
              
              <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                Find Best Card
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Browse by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/debitinfo/${category.slug}`}
              className="group"
            >
              <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 h-full border border-gray-200 hover:border-teal-300">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center text-white mb-4`}>
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">
                  {category.title}
                </h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <div className="flex items-center text-teal-600 font-semibold group-hover:gap-2 transition-all">
                  Explore <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Featured Debit Cards */}
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Debit Cards</h2>
        {loading ? (
          <div className="grid  gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-md p-6 animate-pulse">
                <div className="h-40 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : debitCards.length > 0 ? (
          <div className="grid gap-6">
            {debitCards.map((card) => (
              <UniversalCardItem
                key={card.id}
                card={mapToUniversalCardInfo(card)}
                onApply={handleApply}
                onCompare={handleCompare}
                isSelected={selectedCards.includes(card.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            No debit cards available yet. Check back soon!
          </div>
        )}

        {selectedCards.length >= 2 && (
          <div className="text-center mt-8">
            <button
              onClick={handleCompareNow}
              className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 shadow-lg hover:shadow-xl transition-all font-semibold"
            >
              Compare Selected Cards ({selectedCards.length})
            </button>
          </div>
        )}
      </div>

      {/* Debit Card Comparison Modal */}
      <DebitCardComparisonModal
        isOpen={showComparison}
        onClose={() => setShowComparison(false)}
        selectedCards={debitCards.filter(card => selectedCards.includes(card.id)).map(mapToUniversalCardInfo)}
        allCards={allCardsMemo}
        showAllCards={true}
      />

      {/* Bottom Comparison Bar */}
      <BottomComparisonBar
        selectedCards={getSelectedCardObjects()}
        onCompare={handleCompareNow}
        onRemoveCard={handleCompare}
      />
    </div>
  );
}
