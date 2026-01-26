"use client";
import React, { useState, useEffect } from "react";
import InfoPageTemplate, { PageData } from '@/component/InfoPageTemplate/InfoPageTemplate';
import { CreditCard, Shield, Globe, Lock, Sparkles, ArrowRight } from 'lucide-react';
import UniversalCardItem, { UniversalCardInfo } from '@/component/creditcards/UniversalCardItem';
import DebitCardComparisonModal from '@/component/creditcards/DebitCardComparisonModal';
import BottomComparisonBar from '@/component/creditcards/BottomComparisonBar';

const debitData: PageData = {
  hero: {
    badge: "Secure Banking",
    title: <>Your Money, <span className="text-teal-600">Accessible Instantly</span></>,
    description: "Experience the freedom of cashless transactions. Withdraw cash, shop online, and pay bills directly from your savings account."
  },
  intro: {
    title: "Power in Your Pocket",
    content: "A Debit Card links directly to your bank account, allowing you to spend only what you have. It eliminates the risk of debt accumulation while offering the convenience of digital payments.",
    points: ["Zero Debt Risk", "Global Acceptance", "Contactless Payments (NFC)", "Instant EMI Options"],
    mainIcon: <CreditCard size={120} className="text-purple-500 opacity-80" />
  },
  services: [
    { icon: <Lock size={24} />, title: "Block/Unblock", desc: "Instantly block your card via the app if lost or stolen.", action: "Manage Card" },
    { icon: <CreditCard size={24} />, title: "Set PIN", desc: "Generate or reset your Green PIN instantly without visiting an ATM.", action: "Reset PIN" },
    { icon: <Globe size={24} />, title: "International Usage", desc: "Enable or disable global transactions for security.", action: "Update Settings" },
    { icon: <Shield size={24} />, title: "Card Limits", desc: "Set daily spending and withdrawal limits to control budget.", action: "Set Limits" },
  ],
  cta: {
    title: "Go Contactless Today",
    description: "Upgrade to our WiFi-enabled cards. Just Tap & Pay for transactions up to ₹5,000 without entering a PIN.",
    benefits: ["Faster Checkouts", "Secure Encryption", "No Handover Required"]
  },
  table: {
    title: "Card Variants & Limits",
    headers: ["Card Type", "Daily Withdrawal", "Purchase Limit"],
    rows: [
      ["Classic Debit", "₹25,000", "₹50,000"],
      ["Platinum Debit", "₹1,00,000", "₹2,00,000"],
      ["Signature Exclusive", "₹2,00,000", "₹5,00,000"]
    ]
  },
  faqs: [
    { question: "What is the difference between Debit and Credit cards?", answer: "Debit cards use your own money from your bank account, while Credit cards use money borrowed from the bank that you pay back later." },
    { question: "Is online usage enabled by default?", answer: "As per RBI guidelines, new cards may have online/international usage disabled. You can enable it via NetBanking or the App." }
  ]
};

export default function DebitPage() {
  const [debitCards, setDebitCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [sortBy, setSortBy] = useState('recommended');

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

  const getSelectedCardObjects = (): UniversalCardInfo[] => {
    return selectedCards.map(id => {
      const card = debitCards.find(c => c.id === id);
      return card ? mapToUniversalCardInfo(card) : null;
    }).filter((card): card is UniversalCardInfo => card !== null);
  };

  const mapToUniversalCardInfo = (card: any): UniversalCardInfo => ({
    id: card.id,
    name: card.name,
    imageUrl: card.imageUrl || '',
    bankName: card.bankName,
    annualFee: card.annualFee || 0,
    slug: card.slug,
    rating: card.rating || 4.5,
    applyUrl: card.applyUrl,
    keyFeatures: card.keyFeatures || [],
    safetyFeatures: card.safetyFeatures || [],
    offers: card.offers || [],
    bulletPoints: card.bulletPoints || [],
  });

  const sortedCards = [...debitCards].sort((a, b) => {
    switch (sortBy) {
      case 'fee-low':
        return (a.annualFee || 0) - (b.annualFee || 0);
      case 'fee-high':
        return (b.annualFee || 0) - (a.annualFee || 0);
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      case 'recommended':
      default:
        return (b.recommended ? 1 : 0) - (a.recommended ? 1 : 0) || (b.rating || 0) - (a.rating || 0);
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Info Page Template */}
      <InfoPageTemplate data={debitData} />

      {/* Cards Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Perfect <span className="text-teal-600">Debit Card</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Compare features, fees, and benefits to find the best debit card for your banking needs
            </p>
          </div>

          {/* Sort Controls */}
          <div className="flex justify-between items-center mb-8">
            <div className="text-gray-600">
              Showing {debitCards.length} debit cards
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="recommended">Recommended</option>
                <option value="rating">Highest Rated</option>
                <option value="fee-low">Lowest Fee</option>
                <option value="fee-high">Highest Fee</option>
              </select>
            </div>
          </div>

          {/* Card Grid */}
          {loading ? (
            <div className="grid grid-cols-1 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-gray-100 rounded-xl p-6 animate-pulse">
                  <div className="h-40 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : debitCards.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {sortedCards.map((card) => (
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

          {/* View All Cards Link */}
          <div className="text-center mt-12">
            <a
              href="/debitcards"
              className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold transition-all"
            >
              View All Debit Cards <ArrowRight size={20} />
            </a>
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