"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import UniversalCardItem, { UniversalCardInfo } from "@/component/creditcards/UniversalCardItem";
import DebitCardComparisonModal from "@/component/creditcards/DebitCardComparisonModal";
import CreditCardApplicationModal from "@/component/creditcards/CreditCardApplicationModal";
import BottomComparisonBar from '@/component/creditcards/BottomComparisonBar';
import { X, ArrowRight } from "lucide-react";
import { SectionLoader } from "@/component/commonComponent/SixFinanceLoader";
import { fastFetch } from "@/lib/utils/ultraFastFetch";

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || '';

interface DebitCardRecord {
  id: string;
  name: string;
  image: string;
  bullets: string[];
  bank: string;
  categories: Array<{name: string, slug: string}>;
  fee: string;
  cardType: string;
  recommended: string | null;
  slug?: string;
  rating?: number;
  cashbackRate?: number;
  rewardPoints?: number;
  annualFee?: number;
  atmWithdrawalLimit?: number;
  posLimit?: number;
  onlineLimit?: number;
  internationalUsage?: boolean;
  contactless?: boolean;
  loungeAccess?: boolean;
  loungeAccessDetails?: string;
  fuelSurcharge?: number;
  accidentInsurance?: boolean;
  fraudProtection?: boolean;
  bestFor?: string;
  applyUrl?: string;
  keyFeatures?: any[];
  offers?: any[];
  safetyFeatures?: any[];
}

interface DebitCardListSectionProps {
  categorySlug?: string;
  maxCards?: number;
  title?: string;
  description?: string;
  showViewMore?: boolean;
  viewMoreHref?: string;
}

export default function DebitCardListSection({
  categorySlug,
  maxCards,
  title = "Popular Debit Cards",
  description = "Explore our curated selection of the best debit cards in India",
  showViewMore = true,
  viewMoreHref = "/debitcards"
}: DebitCardListSectionProps) {
  const router = useRouter();
  const [allCards, setAllCards] = useState<DebitCardRecord[]>([]);
  const [cards, setCards] = useState<DebitCardRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [dataFetched, setDataFetched] = useState(false);

  // Comparison State
  const [selectedForComparison, setSelectedForComparison] = useState<string[]>([]);
  const [showComparisonModal, setShowComparisonModal] = useState(false);

  // Application Modal State
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [applicationCard, setApplicationCard] = useState<UniversalCardInfo | null>(null);

  useEffect(() => {
    const fetchCards = async () => {
      // Only fetch if we haven't fetched data yet
      if (dataFetched) {
        // Just filter existing data
        filterCardsFromCache();
        return;
      }

      try {
        setLoading(true);

        // Fast optimized fetch
        const data = await fastFetch<any>('/api/debit-cards', {
          timeout: 3000,
          cache: true,
          retries: 2
        });

        if (!data) {
          console.error('Failed to fetch debit cards');
          setLoading(false);
          return;
        }

        let cardsArray: any[] = [];

        if (Array.isArray(data)) {
          cardsArray = data;
        } else if (data && typeof data === 'object') {
          if (Array.isArray(data.products)) {
            cardsArray = data.products;
          } else if (Array.isArray(data.data)) {
            cardsArray = data.data;
          } else if (Array.isArray(data.debitCards)) {
            cardsArray = data.debitCards;
          }
        }

        const mappedCards: DebitCardRecord[] = cardsArray.map((c: any) => ({
          id: c.id?.toString() || Math.random().toString(),
          name: c.name || c.title || 'Unknown Card',
          image: c.imageUrl || "/debitcard/default.png",
          bullets: c.bulletPoints ?
            c.bulletPoints.map((b: any) => typeof b === 'string' ? b : (b.text || '')) :
            [],
          bank: c.bankName || c.bank || 'Unknown Bank',
          categories: c.categories ?
            c.categories.map((cat: any) => ({name: cat.name, slug: cat.slug})) :
            [],
          fee: c.annualFee ? `₹${c.annualFee}` : "Free",
          cardType: c.cardNetwork || "Visa/Mastercard",
          recommended: c.recommended === true ? "best" : null,
          slug: c.slug,
          rating: c.rating || (Math.random() * 0.7 + 4.0),
          cashbackRate: c.cashbackRate,
          rewardPoints: c.rewardPoints,
          annualFee: c.annualFee,
          atmWithdrawalLimit: c.atmWithdrawalLimit,
          posLimit: c.posLimit,
          onlineLimit: c.onlineLimit,
          internationalUsage: c.internationalUsage,
          contactless: c.contactless,
          loungeAccess: c.loungeAccess,
          loungeAccessDetails: c.loungeAccessDetails,
          fuelSurcharge: c.fuelSurcharge,
          accidentInsurance: c.accidentInsurance,
          fraudProtection: c.fraudProtection,
          bestFor: c.bestFor,
          applyUrl: c.applyUrl,
          keyFeatures: c.keyFeatures || [],
          offers: c.offers || [],
          safetyFeatures: c.safetyFeatures || []
        }));

        setAllCards(mappedCards);
        setDataFetched(true);
        filterCardsFromCache(mappedCards);
      } catch (error) {
        console.error("Failed to fetch debit cards", error);
      } finally {
        setLoading(false);
      }
    };

    const filterCardsFromCache = (cardData: DebitCardRecord[] = allCards) => {
      let filteredCards = cardData;
      if (categorySlug) {
        filteredCards = cardData.filter(card => {
          // Check if any of the card's categories have the matching slug
          return card.categories.some(cat => cat.slug === categorySlug);
        });
      }

      // Limit number of cards if maxCards is specified
      if (maxCards && maxCards > 0) {
        filteredCards = filteredCards.slice(0, maxCards);
      }

      setCards(filteredCards);
    };

    fetchCards();
  }, [dataFetched]); // Only depend on dataFetched, not categorySlug or maxCards

  // Separate effect for filtering when category or maxCards change
  useEffect(() => {
    if (dataFetched) {
      let filteredCards = allCards;
      if (categorySlug) {
        filteredCards = allCards.filter(card => {
          // Check if any of the card's categories have the matching slug
          return card.categories.some(cat => cat.slug === categorySlug);
        });
      }

      // Limit number of cards if maxCards is specified
      if (maxCards && maxCards > 0) {
        filteredCards = filteredCards.slice(0, maxCards);
      }

      setCards(filteredCards);
    }
  }, [categorySlug, maxCards, dataFetched, allCards]);

  const toggleCardSelection = (cardId: string) => {
    setSelectedForComparison(prev => {
      if (prev.includes(cardId)) {
        return prev.filter(id => id !== cardId);
      } else {
        if (prev.length >= 2) {
          return [prev[1], cardId]; // Replace first with new selection
        }
        return [...prev, cardId];
      }
    });
  };

  const handleCompare = () => {
    if (selectedForComparison.length >= 2) {
      setShowComparisonModal(true);
    }
  };

  const handleApply = (card: UniversalCardInfo) => {
    setApplicationCard(card);
    setShowApplicationModal(true);
  };

  const clearSelection = () => {
    setSelectedForComparison([]);
  };

  if (loading) {
    return <SectionLoader />;
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <p className="text-gray-600 mt-1">{description}</p>
        </div>
        {showViewMore && (
          <button
            onClick={() => router.push(viewMoreHref)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            View More
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 gap-6 mb-8">
        {cards.map((card) => (
          <UniversalCardItem
            key={card.id}
            card={{
              id: card.id,
              name: card.name,
              bankName: card.bank,
              imageUrl: card.image,
              bulletPoints: Array.isArray(card.bullets) ? card.bullets.map(b => typeof b === 'string' ? { text: b } : b) : [],
              annualFee: typeof card.annualFee === 'number' ? card.annualFee : (typeof card.annualFee === 'string' ? parseFloat(card.annualFee.replace(/[^\d.]/g, '')) || 0 : 0),
              slug: card.slug || '',
              rating: card.rating || 4.0,
              applyUrl: card.applyUrl,
              atmWithdrawalLimit: card.atmWithdrawalLimit,
              posLimit: card.posLimit,
              contactless: card.contactless,
              internationalUsage: card.internationalUsage,
              keyFeatures: card.keyFeatures || [],
              offers: card.offers || [],
              safetyFeatures: card.safetyFeatures || []
            }}
            onCompare={toggleCardSelection}
            onApply={handleApply}
            isSelected={selectedForComparison.includes(card.id)}
            cardType="debit-card"
          />
        ))}
      </div>

      {/* Comparison Bar */}
      <BottomComparisonBar
        selectedCards={selectedForComparison.map(id => {
          const found = allCards.find(c => c.id === id);
          return found ? { id: found.id, name: found.name, imageUrl: found.image, bankName: found.bank } : { id, name: 'Card', imageUrl: '/debitcard/default.png', bankName: '' };
        })}
        onCompare={handleCompare}
        onRemoveCard={(cardId) => toggleCardSelection(cardId)}
        maxCards={2}
      />

      {/* Comparison Modal */}
      {showComparisonModal && (
        <DebitCardComparisonModal
          isOpen={showComparisonModal}
          onClose={() => setShowComparisonModal(false)}
          selectedCardIds={selectedForComparison}
          onClearSelection={clearSelection}
          allCards={allCards.map(card => ({
            id: card.id,
            name: card.name,
            imageUrl: card.image,
            bankName: card.bank,
            annualFee: typeof card.annualFee === 'number' ? card.annualFee : (typeof card.annualFee === 'string' ? parseFloat(card.annualFee.replace(/[^\d.]/g, '')) || 0 : 0),
            slug: card.slug || '',
            rating: card.rating || 4.0,
            keyFeatures: card.keyFeatures || [],
            safetyFeatures: card.safetyFeatures || [],
            bulletPoints: Array.isArray(card.bullets) ? card.bullets.map(b => typeof b === 'string' ? { text: b } : b) : [],
            offers: card.offers || [],
          }))}
        />
      )}

      {/* Application Modal */}
      {showApplicationModal && applicationCard && (
        <CreditCardApplicationModal
          isOpen={showApplicationModal}
          onClose={() => setShowApplicationModal(false)}
          card={applicationCard}
        />
      )}
    </div>
  );
}