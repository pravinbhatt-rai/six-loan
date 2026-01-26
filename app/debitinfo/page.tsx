"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search, Wallet, Gift, Shield, MapPin, TrendingUp, CreditCard, Award, Zap, ChevronRight } from 'lucide-react';
import { API_BASE_URL } from '@/lib/api';
import UniversalCardItem, { UniversalCardInfo } from '@/component/creditcards/UniversalCardItem';
import DebitCardComparisonModal from '@/component/creditcards/DebitCardComparisonModal';
import BottomComparisonBar from '@/component/creditcards/BottomComparisonBar';

export default function DebitInfoPage() {
  const [debitCards, setDebitCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  useEffect(() => {
    const fetchDebitCards = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/debit-cards?limit=6`);
        if (response.ok) {
          const data = await response.json();
          setDebitCards(data.products || []);
        }
      } catch (error) {
        console.error('Failed to fetch debit cards:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDebitCards();
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
      title: 'Best Debit Cards',
      description: 'Find top-rated debit cards from leading banks',
      icon: Award,
      href: '/debitinfo/best-debit-cards',
      color: 'from-teal-500 to-cyan-600',
      iconBg: 'bg-teal-100',
      iconColor: 'text-teal-600'
    },
    {
      title: 'Zero Fee Cards',
      description: 'Debit cards with no annual or maintenance fees',
      icon: Zap,
      href: '/debitinfo/zero-fee',
      color: 'from-green-500 to-emerald-600',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      title: 'Cashback Cards',
      description: 'Earn cashback on every transaction',
      icon: Gift,
      href: '/debitinfo/cashback',
      color: 'from-purple-500 to-pink-600',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600'
    },
    {
      title: 'International Cards',
      description: 'Use your debit card anywhere in the world',
      icon: TrendingUp,
      href: '/debitinfo/international',
      color: 'from-blue-500 to-indigo-600',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Lounge Access',
      description: 'Airport lounge benefits with select debit cards',
      icon: CreditCard,
      href: '/debitinfo/lounge-access',
      color: 'from-orange-500 to-red-600',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600'
    },
    {
      title: 'Safety & Security',
      description: 'Cards with advanced fraud protection',
      icon: Shield,
      href: '/debitinfo/safety',
      color: 'from-red-500 to-pink-600',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600'
    },
  ];

  const tools = [
    {
      title: 'Debit Card Finder',
      description: 'Find the best debit card for your needs',
      icon: Search,
      href: '/debitinfo/finder',
      bgColor: 'bg-teal-500'
    },
    {
      title: 'Live Offers',
      description: 'Current cashback & discount offers',
      icon: Gift,
      href: '/debitinfo/offers',
      bgColor: 'bg-purple-500'
    },
    {
      title: 'ATM Finder',
      description: 'Locate nearest ATMs with zero fees',
      icon: MapPin,
      href: '/debitinfo/atm-finder',
      bgColor: 'bg-blue-500'
    },
    {
      title: 'Upgrade Card',
      description: 'Upgrade to premium debit cards',
      icon: TrendingUp,
      href: '/debitinfo/upgrade',
      bgColor: 'bg-green-500'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-linear-to-br from-teal-500 to-cyan-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fadeIn">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl">
                <Wallet className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Debit Cards Guide
            </h1>
            <p className="text-xl md:text-2xl text-teal-50 max-w-3xl mx-auto mb-8">
              Everything you need to know about debit cards - compare, find offers, locate ATMs, and more
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/debitcard">
                <button className="bg-white text-teal-600 px-8 py-3 shadow-xl hover:shadow-2xl transition-all font-semibold hover:scale-105">
                  Compare Debit Cards
                </button>
              </Link>
              <Link href="/debitinfo/finder">
                <button className="bg-teal-600 text-white px-8 py-3 shadow-xl hover:shadow-2xl transition-all font-semibold hover:scale-105 border-2 border-white">
                  Find Best Card
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Tools */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <Link href={tool.href} key={tool.title}>
                <div 
                  className="bg-white p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-t-4 border-teal-500 hover:-translate-y-2 animate-slideUp"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`${tool.bgColor} w-14 h-14 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{tool.title}</h3>
                  <p className="text-gray-600 text-sm">{tool.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Browse by Category
          </h2>
          <p className="text-lg text-gray-600">
            Explore debit cards based on your preferences and usage
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Link href={category.href} key={category.title}>
                <div 
                  className="bg-white p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group border-t-4 border-teal-500 hover:-translate-y-1 animate-scaleIn"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`${category.iconBg} w-16 h-16 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-8 h-8 ${category.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                    {category.title}
                    <ChevronRight className="w-5 h-5 text-teal-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </h3>
                  <p className="text-gray-600">{category.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Featured Debit Cards */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Debit Cards
            </h2>
            <p className="text-lg text-gray-600">
              Top-rated debit cards from India's leading banks
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-100 p-6 shadow-md animate-pulse">
                  <div className="h-40 bg-gray-200 mb-4"></div>
                  <div className="h-6 bg-gray-200 mb-2"></div>
                  <div className="h-4 bg-gray-200"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className=" gap-x-4">
              {debitCards.slice(0, 6).map((card) => (
                <UniversalCardItem
                  key={card.id}
                  card={mapToUniversalCardInfo(card)}
                  onApply={handleApply}
                  onCompare={handleCompare}
                  isSelected={selectedCards.includes(card.id)}
                />
              ))}
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

          <div className="text-center mt-12">
            <Link href="/debitcard">
              <button className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 shadow-lg hover:shadow-xl transition-all font-semibold">
                View All Debit Cards
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Why Choose Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Use Our Debit Card Guide?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-teal-100 mx-auto flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-teal-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Smart Search</h3>
            <p className="text-gray-600">Find the perfect debit card based on your spending habits and needs</p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-purple-100 mx-auto flex items-center justify-center mb-4">
              <Gift className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Live Offers</h3>
            <p className="text-gray-600">Get real-time cashback and discount offers from various merchants</p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-blue-100 mx-auto flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Safety First</h3>
            <p className="text-gray-600">Learn about fraud protection and security features for your peace of mind</p>
          </div>
        </div>
      </div>

      {/* Debit Card Comparison Modal */}
      <DebitCardComparisonModal
        isOpen={showComparison}
        onClose={() => setShowComparison(false)}
        selectedCards={debitCards.filter(card => selectedCards.includes(card.id)).map(mapToUniversalCardInfo)}
        allCards={debitCards.map(mapToUniversalCardInfo)}
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
