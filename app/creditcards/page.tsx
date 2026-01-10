"use client";
import React, { useState, useEffect } from "react";
import FilterSidebar from "@/component/creditcards/FilterSidebar";
import CardList from "@/component/creditcards/CardList";
import { CardInfo } from "@/component/creditcards/CardItem";
import CreditCardDetailsDrawer, { CreditCardDetailsData } from "@/component/creditcards/CreditCardDetailsDrawer";
import { CardRecord } from "@/component/creditcards/cardsData";
import { FiFilter } from "react-icons/fi";
import { X, ArrowRight } from "lucide-react";
import ComparisonModal from "@/component/creditcards/ComparisonModal";
import CreditCardApplicationModal from "@/component/creditcards/CreditCardApplicationModal";
import { useRouter } from "next/navigation";

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || '';

export default function CreditCardsPage() {
  const router = useRouter();
  const drawerRef = React.useRef<any>(null);
  const [cards, setCards] = useState<CardRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CreditCardDetailsData | null>(null);
  const [activeFilters, setActiveFilters] = useState<{ [key: string]: boolean }>({});
  const [showFilterMobile, setShowFilterMobile] = useState(false);

  // Comparison State
  const [selectedForComparison, setSelectedForComparison] = useState<string[]>([]);
  const [showComparisonModal, setShowComparisonModal] = useState(false);
  
  // Application Modal State
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [applicationCard, setApplicationCard] = useState<CardInfo | null>(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/credit-cards`);
        if (res.ok) {
          const data = await res.json();
          
          // Debug: Log the API response
          console.log('API Response:', data);
          
          // Handle different response formats
          let cardsArray: any[] = [];
          
          if (Array.isArray(data)) {
            // If response is directly an array
            cardsArray = data;
          } else if (data && typeof data === 'object') {
            // If response is an object, check for common property names
            if (Array.isArray(data.cards)) {
              cardsArray = data.cards;
            } else if (Array.isArray(data.data)) {
              cardsArray = data.data;
            } else if (Array.isArray(data.creditCards)) {
              cardsArray = data.creditCards;
            } else if (Array.isArray(data.products)) {
              cardsArray = data.products;
            } else {
              // If no array found, log error and set empty
              console.error('No array found in API response:', data);
              cardsArray = [];
            }
          }
          
          // Map API response to CardRecord
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
            fee: (c.annualFee === "Lifetime free" || c.annualFee === "1st year free only") 
              ? c.annualFee 
              : "1st year free only",
            cardType: (c.cardNetwork === "UPI Rupay" || c.cardNetwork === "Visa/Mastercard") 
              ? c.cardNetwork 
              : "Visa/Mastercard",
            effectiveFree: Boolean(c.effectiveFree),
            recommended: c.recommended === true ? "best" : null,
            slug: c.slug,
            firstYearFee: c.firstYearFee,
            secondYearFee: c.secondYearFee
          }));
          
          console.log('Mapped cards:', mappedCards);
          setCards(mappedCards);
        } else {
          console.error('Failed to fetch cards:', res.status, res.statusText);
        }
      } catch (error) {
        console.error("Failed to fetch credit cards", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCards();
  }, []);

  const mapToDetails = (card: CardInfo): CreditCardDetailsData | null => {
    const full = cards.find((c) => c.id === card.id);
    if (!full) return null;
    return {
      id: full.id,
      name: full.name,
      bank: full.bank,
      image: full.image,
      categories: full.categories,
      fee: full.fee,
      cardType: full.cardType,
      bullets: full.bullets,
    };
  };

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
  
  const handleToggle = (key: string, value: boolean) => {
    setActiveFilters((prev) => ({ ...prev, [key]: value }));
  };
  
  const handleClearAll = () => {
    setActiveFilters({});
  };

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

  return (
    <div className="min-h-screen w-full bg-[#F5F7FA]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        {/* Header with Filter Button on Mobile */}
        <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Credit Cards</h1>
          
          {/* Mobile filter toggle - moved to header */}
          <button
            type="button"
            onClick={() => setShowFilterMobile(true)}
            className="sm:hidden flex items-center justify-center gap-2 px-4 py-2.5 rounded-md border border-gray-300 bg-white shadow-sm text-gray-800 font-medium hover:bg-gray-50 transition-colors"
          >
            <FiFilter size={18} />
            <span>Filters</span>
          </button>
        </div>

        <div className="flex gap-4 sm:gap-6">
          {/* Sidebar visible on >= sm */}
          <div className="hidden sm:block">
            <FilterSidebar
              active={activeFilters}
              onToggle={handleToggle}
              onClearAll={handleClearAll}
            />
          </div>
          
          {loading ? (
            <div className="flex-1 flex justify-center items-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading credit cards...</p>
              </div>
            </div>
          ) : cards.length === 0 ? (
            <div className="flex-1 flex flex-col justify-center items-center text-center py-12">
              <p className="text-gray-600 text-base sm:text-lg mb-2">No credit cards found</p>
              <p className="text-xs sm:text-sm text-gray-400">Check your API endpoint or add some credit cards from the dashboard</p>
            </div>
          ) : (
            <CardList 
              cards={cards} 
              onApply={handleApply} 
              onDetails={handleShowDetails} 
              activeFilters={activeFilters}
              onCompare={toggleCardSelection}
              selectedForComparison={selectedForComparison}
            />
          )}
        </div>
      </div>

      {/* Comparison Bar - Mobile Optimized */}
      {selectedForComparison.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t-4 border-teal-600 shadow-2xl z-50 py-2 sm:py-4 animate-slide-up">
          <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-0">
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
                      <div key={cardId} className="flex items-center space-x-1.5 sm:space-x-2 bg-teal-50 border border-teal-200 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 shrink-0">
                        <img
                          src={card.image}
                          alt={card.name}
                          className="w-12 h-8 sm:w-16 sm:h-10 object-contain rounded"
                        />
                        <span className="text-xs sm:text-sm font-medium text-gray-900 max-w-[100px] sm:max-w-[150px] truncate">
                          {card.name}
                        </span>
                        <button
                          onClick={() => removeFromComparison(cardId)}
                          className="text-red-500 hover:text-red-700 shrink-0"
                        >
                          <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </button>
                      </div>
                    );
                  })}
                  
                  {/* Placeholder for second card */}
                  {selectedForComparison.length === 1 && (
                    <div className="flex items-center space-x-1.5 sm:space-x-2 bg-gray-50 border border-gray-200 border-dashed rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 shrink-0">
                      <div className="w-12 h-8 sm:w-16 sm:h-10 bg-gray-200 rounded flex items-center justify-center">
                        <span className="text-xs sm:text-sm text-gray-500">+</span>
                      </div>
                      <span className="text-xs sm:text-sm text-gray-500 whitespace-nowrap">Select one more</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Compare Button - Full width on mobile */}
              <button
                onClick={handleCompare}
                disabled={selectedForComparison.length !== 2}
                className={`flex items-center justify-center space-x-2 rounded-lg font-semibold transition w-full sm:w-auto ${
                  selectedForComparison.length === 2
                    ? 'bg-teal-600 text-white hover:bg-teal-700 px-4 sm:px-8 py-2 sm:py-3 text-sm sm:text-lg'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base'
                }`}
              >
                <span>Compare</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile filter overlay (left slide-in) */}
      {showFilterMobile && (
        <div className="fixed inset-0 z-50 sm:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowFilterMobile(false)}
          />
          <div className="absolute left-0 top-0 h-full w-[85%] max-w-[340px] sm:max-w-[380px]">
            <div className="h-full w-full bg-white shadow-2xl border-r rounded-r-2xl transform transition-transform duration-300 ease-out translate-x-0">
              <div className="p-3 sm:p-4 border-b flex items-center justify-between bg-gray-50">
                <h4 className="font-semibold text-base sm:text-lg text-gray-900">Filters</h4>
                <div className="flex gap-2 sm:gap-3 items-center">
                  <button
                    type="button"
                    onClick={handleClearAll}
                    className="text-xs sm:text-sm text-gray-600 hover:text-gray-900 font-medium px-2 py-1 hover:bg-gray-100 rounded transition-colors"
                  >
                    Clear All
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowFilterMobile(false)}
                    className="px-3 py-1.5 rounded-md bg-teal-600 hover:bg-teal-700 text-white text-xs sm:text-sm font-medium transition-colors flex items-center gap-1"
                  >
                    <X size={16} />
                    <span>Close</span>
                  </button>
                </div>
              </div>
              <div className="p-3 sm:p-4 overflow-y-auto h-[calc(100%-56px)] sm:h-[calc(100%-64px)]">
                <FilterSidebar
                  active={activeFilters}
                  onToggle={(k, v) => handleToggle(k, v)}
                  onClearAll={handleClearAll}
                  className="border-none p-0"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <CreditCardDetailsDrawer
        ref={drawerRef}
        isOpen={openDrawer}
        onClose={() => setOpenDrawer(false)}
        card={selectedCard}
        onApply={() => setOpenDrawer(false)}
        categorySlug={selectedCard?.categories?.[0] || undefined}
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
    </div>
  );
}