"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CardItem, { CardInfo } from "@/component/creditcards/CardItem";
import CreditCardDetailsDrawer, { CreditCardDetailsData } from "@/component/creditcards/CreditCardDetailsDrawer";
import ComparisonModal from "@/component/creditcards/ComparisonModal";
import CreditCardApplicationModal from "@/component/creditcards/CreditCardApplicationModal";
import { X, ArrowRight } from "lucide-react";
import { SectionLoader } from "@/component/commonComponent/SixFinanceLoader";
import { fastFetch } from "@/lib/utils/ultraFastFetch";

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || '';

interface CardRecord {
  id: string;
  name: string;
  image: string;
  bullets: string[];
  bank: string;
  categories: string[];
  fee: string;
  cardType: string;
  effectiveFree: boolean;
  recommended: string | null;
  slug?: string;
  firstYearFee?: number | null;
  secondYearFee?: number | null;
}

export default function CreditCardListSection() {
  const router = useRouter();
  const [cards, setCards] = useState<CardRecord[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Details Drawer State
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CreditCardDetailsData | null>(null);

  // Comparison State
  const [selectedForComparison, setSelectedForComparison] = useState<string[]>([]);
  const [showComparisonModal, setShowComparisonModal] = useState(false);
  
  // Application Modal State
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [applicationCard, setApplicationCard] = useState<CardInfo | null>(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        setLoading(true);
        
        // Fast optimized fetch
        const data = await fastFetch<any>('/api/credit-cards', {
          timeout: 3000,
          cache: true,
          retries: 2
        });
        
        if (!data) {
          console.error('Failed to fetch cards');
          setLoading(false);
          return;
        }
          
          let cardsArray: any[] = [];
          
          if (Array.isArray(data)) {
            cardsArray = data;
          } else if (data && typeof data === 'object') {
            if (Array.isArray(data.cards)) {
              cardsArray = data.cards;
            } else if (Array.isArray(data.data)) {
              cardsArray = data.data;
            } else if (Array.isArray(data.creditCards)) {
              cardsArray = data.creditCards;
            }
          }
          
          const mappedCards: CardRecord[] = cardsArray.map((c: any) => ({
            id: c.id?.toString() || Math.random().toString(),
            name: c.name || c.title || 'Unknown Card',
            image: c.imageUrl || c.bankLogoUrl || "/creditcard/image 666.png",
            bullets: c.bulletPoints ? 
              c.bulletPoints.map((b: any) => typeof b === 'string' ? b : (b.text || '')) : 
              c.bullets || [],
            bank: c.bankName || c.bank || 'Unknown Bank',
            categories: c.categories ? 
              c.categories.map((cat: any) => typeof cat === 'string' ? cat : cat.name) : 
              [],
            fee: c.annualFee || "1st year free only",
            cardType: c.cardNetwork || "Visa/Mastercard",
            effectiveFree: Boolean(c.effectiveFree),
            recommended: c.recommended === true ? "best" : null,
            slug: c.slug,
            firstYearFee: c.firstYearFee,
            secondYearFee: c.secondYearFee,
            rating: c.rating || (Math.random() * 0.7 + 4.0) // Random rating between 4.0-4.7 if not provided
          }));
          
          setCards(mappedCards);
      } catch (error) {
        console.error("Failed to fetch credit cards", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCards();
  }, []);

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
    if (selectedForComparison.length === 2) {
      setShowComparisonModal(true);
    }
  };

  const handleCloseComparison = () => {
    setShowComparisonModal(false);
    setSelectedForComparison([]);
  };

  const removeFromComparison = (cardId: string) => {
    setSelectedForComparison(prev => prev.filter(id => id !== cardId));
  };

  const [drawerRef] = useState<any>({ current: null });
  
  const handleApply = (card: CardInfo) => {
    console.log('Apply clicked for:', card.name);
    setApplicationCard(card);
    setShowApplicationModal(true);
  };

  const handleShowDetails = async (card: CardInfo) => {
    console.log('handleShowDetails called with card:', card);
    const full = cards.find((c) => c.id === card.id);
    console.log('Found full card:', full);
    if (!full) return;

    // Fetch full details FIRST before opening drawer
    if (full.slug) {
      try {
        const res = await fetch(`${API_BASE_URL}/api/credit-cards/${full.slug}`);
        if (res.ok) {
          const data = await res.json();
          if (data.card) {
            const fullDetails: CreditCardDetailsData = {
              id: full.id,
              name: full.name,
              bank: full.bank,
              image: full.image,
              categories: full.categories,
              fee: full.fee,
              cardType: full.cardType,
              bullets: full.bullets,
              ...data.card,
              videoUrl: data.card.videoUrl,
              keyFeatures: data.card.keyFeatures?.map((kf: any) => kf.feature || kf) || [],
              cardBenefits: data.card.cardBenefits?.map((cb: any) => cb.benefit || cb) || [],
              benefitSections: data.card.benefitSections || [],
              bestSuitedForPoints: data.card.bestSuitedForPoints || [],
              firstYearFee: data.card.firstYearFee,
              secondYearFee: data.card.secondYearFee,
              feeWaiverCondition: data.card.feeWaiverCondition,
              summaryCharges: data.card.summaryCharges,
              requiredDocuments: data.card.requiredDocuments,
              processSteps: data.card.processSteps,
              bulletPoints: data.card.bulletPoints,
              termsConditionsUrl: data.card.termsConditionsUrl,
              cardNetwork: data.card.cardNetwork,
              annualFee: data.card.annualFee,
              bankName: data.card.bankName,
              bankLogoUrl: data.card.bankLogoUrl,
              imageUrl: data.card.imageUrl,
            };
            console.log('Setting full details and opening drawer:', fullDetails);
            setSelectedCard(fullDetails);
            setOpenDrawer(true);
            return;
          }
        }
      } catch (err) {
        console.error("Failed to fetch card details", err);
      }
    }
    
    // Fallback: open with basic details if API call fails
    const initialDetails: CreditCardDetailsData = {
      id: full.id,
      name: full.name,
      bank: full.bank,
      image: full.image,
      categories: full.categories,
      fee: full.fee,
      cardType: full.cardType,
      bullets: full.bullets,
    };
    console.log('Setting initial details and opening drawer:', initialDetails);
    setSelectedCard(initialDetails);
    setOpenDrawer(true);
  };

  if (loading) {
    return (
      <section className="w-full bg-[#F5F7FB] py-10 md:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionLoader message="Loading credit cards..." />
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-[#F5F7FB] py-10 md:py-14 relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 md:mb-10 text-center">
          
          <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-gray-900">
            Handpicked <span className="text-[#3469CB]">Credit Cards</span> for You
          </h2>
          <p className="mt-3 text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
            Explore top and best recommended cards with rewards on shopping,
            travel, fuel and more.
          </p>
        </div>

        {cards.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No credit cards available at the moment.</p>
          </div>
        ) : (
          <>
          <div className="space-y-4 md:space-y-6">
            {cards.slice(0, 4).map((card) => (
              <CardItem
                key={card.id}
                card={{
                  id: card.id,
                  name: card.name,
                  image: card.image,
                  bullets: card.bullets,
                  bankName: card.bank,
                  annualFee: card.fee,
                  slug: card.slug,
                  firstYearFee: card.firstYearFee,
                  secondYearFee: card.secondYearFee,
                  cardType: card.cardType
                }}
                onApply={handleApply}
                onDetails={handleShowDetails}
                onCompare={toggleCardSelection}
                isSelected={selectedForComparison.includes(card.id)}
              />
            ))}
          </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => router.push("/creditcards")}
            className="rounded-lg border border-gray-400 px-6 py-2.5 text-sm md:text-base font-medium text-gray-700 hover:border-gray-700 hover:text-gray-900 transition-colors"
          >
            View more cards
          </button>
        </div>
        </>
      )}

      </div> {/* Close mx-auto max-w-6xl container */}

      {/* Comparison Bar - Mobile Optimized */}
      {selectedForComparison.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t-4 border-blue-600 shadow-2xl z-50 py-2 sm:py-4">
          <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-0">
              {/* Selection Count - Mobile friendly */}
              <div className="flex flex-col sm:flex-row items-center sm:space-x-4 flex-1 gap-2">
                <p className="text-xs sm:text-sm font-semibold text-gray-700 text-center sm:text-left">
                  Comparing {selectedForComparison.length}/2 cards
                </p>
                
                {/* Selected Cards - Horizontal scroll on mobile */}
                <div className="flex overflow-x-auto space-x-2 sm:space-x-3 w-full sm:w-auto pb-1 scrollbar-thin scrollbar-thumb-gray-300">
                  {selectedForComparison.map(cardId => {
                    const card = cards.find(c => c.id === cardId);
                    if (!card) return null;
                    
                    return (
                      <div key={cardId} className="flex items-center space-x-1.5 sm:space-x-2 bg-blue-50 border border-blue-200 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 shrink-0">
                        <img
                          src={card.image}
                          alt={card.name}
                          className="w-10 h-6 sm:w-12 sm:h-8 object-contain rounded"
                        />
                        <span className="text-xs sm:text-sm font-medium text-gray-900 max-w-[100px] sm:max-w-[150px] truncate">
                          {card.name}
                        </span>
                        <button
                          onClick={() => removeFromComparison(cardId)}
                          className="text-gray-500 hover:text-red-600 transition shrink-0"
                        >
                          <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Compare Button - Full width on mobile */}
              <button
                onClick={handleCompare}
                disabled={selectedForComparison.length !== 2}
                className={`flex items-center justify-center space-x-2 px-4 sm:px-8 py-2 sm:py-3 rounded-lg font-bold text-sm sm:text-lg transition-all w-full sm:w-auto ${
                  selectedForComparison.length === 2
                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <span>Compare</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      <CreditCardDetailsDrawer
        ref={drawerRef.current}
        isOpen={openDrawer}
        onClose={() => setOpenDrawer(false)}
        card={selectedCard}
        onApply={() => setOpenDrawer(false)}
        categorySlug={selectedCard?.categories?.[0]}
        categoryName={selectedCard?.name}
      />

      <ComparisonModal
        isOpen={showComparisonModal}
        onClose={handleCloseComparison}
        cardIds={selectedForComparison}
        onApply={(cardId) => {
          const card = cards.find(c => c.id === cardId);
          if (card) {
            setShowComparisonModal(false);
            handleApply({ id: card.id, name: card.name, image: card.image, bullets: card.bullets });
          }
        }}
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
    </section>
  );
}
