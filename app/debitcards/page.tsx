"use client";
import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { CreditCard, Shield, Zap, Globe, Sparkles, ArrowRight, Filter, X } from "lucide-react";
import UniversalCardItem, { UniversalCardInfo } from '@/component/creditcards/UniversalCardItem';
import DebitCardComparisonModal from '@/component/creditcards/DebitCardComparisonModal';
import BottomComparisonBar from '@/component/creditcards/BottomComparisonBar';
import DebitCardFilterSidebar from '@/component/creditcards/DebitCardFilterSidebar';

interface DebitCardFilters {
  bank: string;
  annualFee: string;
  cardType: string;
  bestFor: string;
  internationalUsage: boolean;
  loungeAccess: boolean;
  contactless: boolean;
}

export default function DebitCardsPage() {
  const [debitCards, setDebitCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Filter states
  const [filters, setFilters] = useState<DebitCardFilters>({
    bank: '',
    annualFee: '',
    cardType: '',
    bestFor: '',
    internationalUsage: false,
    loungeAccess: false,
    contactless: false
  });

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch('/api/debit-cards');
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

  // Apply filters using useMemo
  const filteredCards = useMemo(() => {
    let filtered = [...debitCards];

    if (filters.bank) {
      filtered = filtered.filter(card => card.bankName === filters.bank);
    }

    if (filters.annualFee) {
      if (filters.annualFee === 'free') {
        filtered = filtered.filter(card => (card.annualFee || 0) <= 499);
      } else if (filters.annualFee === 'low') {
        filtered = filtered.filter(card => (card.annualFee || 0) > 499 && (card.annualFee || 0) <= 1000);
      } else if (filters.annualFee === 'premium') {
        filtered = filtered.filter(card => (card.annualFee || 0) > 1000);
      }
    }

    if (filters.cardType) {
      filtered = filtered.filter(card => card.cardType === filters.cardType);
    }

    if (filters.bestFor) {
      filtered = filtered.filter(card =>
        card.bestFor && card.bestFor.toLowerCase().includes(filters.bestFor.toLowerCase())
      );
    }

    if (filters.internationalUsage) {
      filtered = filtered.filter(card => card.internationalUsage);
    }

    if (filters.loungeAccess) {
      filtered = filtered.filter(card => card.loungeAccess);
    }

    if (filters.contactless) {
      filtered = filtered.filter(card => card.contactless);
    }

    return filtered;
  }, [debitCards, filters]);

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
      const card = filteredCards.find(c => c.id === id);
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

  const updateFilter = (newFilters: DebitCardFilters) => {
    setFilters(newFilters);
  };

  const clearFilters = () => {
    setFilters({
      bank: '',
      annualFee: '',
      cardType: '',
      bestFor: '',
      internationalUsage: false,
      loungeAccess: false,
      contactless: false
    });
  };

  const banks = [...new Set(debitCards.map(card => card.bankName))].filter(Boolean);
  const cardTypes = [...new Set(debitCards.map(card => card.cardType))].filter(Boolean);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            All Debit Cards
          </h1>
          <p className="text-xl text-teal-100 mb-8">
            Find and compare all available debit cards with advanced filters
          </p>

          {/* Mobile filter toggle */}
          <button
            onClick={() => setShowFilters(true)}
            className="sm:hidden bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-lg hover:bg-white/20 transition-all flex items-center gap-2"
          >
            <Filter size={20} />
            Show Filters
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-4 sm:gap-6">
          {/* Sidebar visible on >= sm */}
          <div className="hidden sm:block">
            <DebitCardFilterSidebar
              active={filters}
              onChange={updateFilter}
              onClearAll={clearFilters}
              banks={banks}
              cardTypes={cardTypes}
            />
          </div>

          {/* Main content */}
          <div className="flex-1">
            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {filteredCards.length} of {debitCards.length} debit cards
              </p>
            </div>

            {/* Card Grid */}
            {loading ? (
              <div className="grid grid-cols-1 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-white rounded-xl shadow-md p-6 animate-pulse">
                    <div className="h-40 bg-gray-200 rounded-lg mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                ))}
              </div>
            ) : filteredCards.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {filteredCards.map((card) => (
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
                No debit cards match your filters. Try adjusting your criteria.
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
        </div>
      </div>

      {/* Mobile filter overlay */}
      {showFilters && (
        <div className="fixed inset-0 z-50 sm:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowFilters(false)}
          />
          <div className="absolute left-0 top-0 h-full w-[85%] max-w-[340px]">
            <div className="h-full w-full bg-white shadow-2xl border-r rounded-r-2xl transform transition-transform duration-300 ease-out translate-x-0">
              <div className="p-3 sm:p-4 border-b flex items-center justify-between bg-gray-50">
                <h4 className="font-semibold text-base sm:text-lg text-gray-900">Filters</h4>
                <div className="flex gap-2 sm:gap-3 items-center">
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="text-xs sm:text-sm text-gray-600 hover:text-gray-900 font-medium px-2 py-1 hover:bg-gray-100 rounded transition-colors"
                  >
                    Clear All
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowFilters(false)}
                    className="px-3 py-1.5 rounded-md bg-teal-600 hover:bg-teal-700 text-white text-xs sm:text-sm font-medium transition-colors flex items-center gap-1"
                  >
                    <X size={16} />
                    <span>Close</span>
                  </button>
                </div>
              </div>
              <div className="p-3 sm:p-4 overflow-y-auto h-[calc(100%-56px)]">
                <DebitCardFilterSidebar
                  active={filters}
                  onChange={updateFilter}
                  onClearAll={clearFilters}
                  banks={banks}
                  cardTypes={cardTypes}
                  className="border-none p-0"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Debit Card Comparison Modal */}
      <DebitCardComparisonModal
        isOpen={showComparison}
        onClose={() => setShowComparison(false)}
        selectedCards={filteredCards.filter(card => selectedCards.includes(card.id)).map(mapToUniversalCardInfo)}
        allCards={filteredCards.map(mapToUniversalCardInfo)}
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