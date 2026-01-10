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
    // Check if user is logged in
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      router.push("/login");
      return;
    }
    // First load card details, then open application modal
    const full = cards.find((c) => c.id === card.id);
    if (!full) return;
    
    const cardDetails: CreditCardDetailsData = {
      id: full.id,
      name: full.name,
      bank: full.bank,
      image: full.image,
      categories: full.categories,
      fee: full.fee,
      cardType: full.cardType,
      bullets: full.bullets,
    };
    
    setSelectedCard(cardDetails);
    setOpenDrawer(true);
    
    // Trigger application modal to open after drawer is set
    setTimeout(() => {
      if (drawerRef.current) {
        drawerRef.current.openApplicationModal();
      }
    }, 100);
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
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Credit Cards</h1>
        </div>

        {/* Mobile filter toggle */}
        <div className="sm:hidden mb-4 flex justify-end">
          <button
            type="button"
            onClick={() => setShowFilterMobile(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-md border bg-white shadow-sm text-gray-800"
          >
            <FiFilter />
            Filter
          </button>
        </div>

        <div className="flex gap-6">
          {/* Sidebar visible on >= sm */}
          <div className="hidden sm:block">
            <FilterSidebar
              active={activeFilters}
              onToggle={handleToggle}
              onClearAll={handleClearAll}
            />
          </div>
          
          {loading ? (
            <div className="flex-1 flex justify-center items-center">
              <p>Loading credit cards...</p>
            </div>
          ) : cards.length === 0 ? (
            <div className="flex-1 flex flex-col justify-center items-center text-center">
              <p className="text-gray-500 mb-4">No credit cards found</p>
              <p className="text-sm text-gray-400">Check your API endpoint or add some credit cards from the dashboard</p>
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

      {/* Comparison Bar */}
      {selectedForComparison.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t-4 border-teal-600 shadow-2xl z-50 py-4 animate-slide-up">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 flex-1">
                <p className="text-sm font-semibold text-gray-700">
                  You are comparing {selectedForComparison.length}/2 cards
                </p>
                
                <div className="flex space-x-3">
                  {selectedForComparison.map(cardId => {
                    const card = cards.find(c => c.id === cardId);
                    if (!card) return null;
                    
                    return (
                      <div key={cardId} className="flex items-center space-x-2 bg-teal-50 border border-teal-200 rounded-lg px-4 py-2">
                        <img
                          src={card.image}
                          alt={card.name}
                          className="w-16 h-10 object-contain rounded"
                        />
                        <span className="text-sm font-medium text-gray-900 max-w-[150px] truncate">
                          {card.name}
                        </span>
                        <button
                          onClick={() => removeFromComparison(cardId)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                  
                  {/* Placeholder for second card */}
                  {selectedForComparison.length === 1 && (
                    <div className="flex items-center space-x-2 bg-gray-50 border border-gray-200 border-dashed rounded-lg px-4 py-2">
                      <div className="w-16 h-10 bg-gray-200 rounded flex items-center justify-center">
                        <span className="text-xs text-gray-500">+</span>
                      </div>
                      <span className="text-sm text-gray-500">Select one more card</span>
                    </div>
                  )}
                </div>
              </div>
              
              <button
                onClick={handleCompare}
                disabled={selectedForComparison.length !== 2}
                className={`flex items-center space-x-2 rounded-lg font-semibold transition ${
                  selectedForComparison.length === 2
                    ? 'bg-teal-600 text-white hover:bg-teal-700 px-8 py-3 text-lg'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed px-6 py-3'
                }`}
              >
                <span>Compare</span>
                <ArrowRight className="w-5 h-5" />
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
          <div className="absolute left-0 top-0 h-full w-[85%] max-w-[340px]">
            <div className="h-full w-full bg-white shadow-2xl border-r rounded-r-2xl transform transition-transform duration-300 ease-out translate-x-0">
              <div className="p-4 border-b flex items-center justify-between">
                <h4 className="font-semibold">Filters</h4>
                <div className="flex gap-3 items-center">
                  <button
                    type="button"
                    onClick={handleClearAll}
                    className="text-sm text-gray-600 hover:underline"
                  >
                    Clear All
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowFilterMobile(false)}
                    className="px-3 py-1.5 rounded-md bg-teal-600 text-white"
                  >
                    Close
                  </button>
                </div>
              </div>
              <div className="p-4 overflow-y-auto h-[calc(100%-56px)]">
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
    </div>
  );
}