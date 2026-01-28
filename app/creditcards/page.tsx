"use client";
import React, { useState, useEffect, Suspense } from "react";
import FilterSidebar from "@/component/creditcards/FilterSidebar";
import CardList from "@/component/creditcards/CardList";
import { CardInfo } from "@/component/creditcards/CardItem";
import CreditCardDetailsDrawer, { CreditCardDetailsData } from "@/component/creditcards/CreditCardDetailsDrawer";
import { CardRecord } from "@/component/creditcards/cardsData";
import { FiFilter } from "react-icons/fi";
import { X, ArrowRight } from "lucide-react";
import ComparisonModal from "@/component/creditcards/ComparisonModal";
import CreditCardApplicationModal from "@/component/creditcards/CreditCardApplicationModal";
import BottomComparisonBar from "@/component/creditcards/BottomComparisonBar";
import { useRouter, useSearchParams } from "next/navigation";
import { PageLoader } from "@/component/commonComponent/SixFinanceLoader";
import { fastFetch } from "@/lib/utils/ultraFastFetch";

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || '';

function CreditCardsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const drawerRef = React.useRef<any>(null);
  const [cards, setCards] = useState<CardRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CreditCardDetailsData | null>(null);
  const [activeFilters, setActiveFilters] = useState<{ [key: string]: boolean }>({});
  const [showFilterMobile, setShowFilterMobile] = useState(false);

  // Comparison State
  const [selectedForComparison, setSelectedForComparison] = useState<CardRecord[]>([]);
  const [showComparisonModal, setShowComparisonModal] = useState(false);
  
  // Application Modal State
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [applicationCard, setApplicationCard] = useState<CardInfo | null>(null);
  
  // Set initial filter from URL param
  useEffect(() => {
    if (categoryParam) {
      setActiveFilters({ [categoryParam]: true });
    }
  }, [categoryParam]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        setLoading(true);
        
        let data;
        
        // If category is specified in URL, use category-specific API
        if (categoryParam) {
          const categoryData = await fastFetch<any>(`/api/credit-cards/by-category/${categoryParam}`, {
            timeout: 3000,
            cache: true,
            retries: 2
          });
          
          if (categoryData && categoryData.category && categoryData.category.creditCards) {
            data = categoryData.category.creditCards;
          } else {
            // Fallback to all cards if category API fails
            data = await fastFetch<any>('/api/credit-cards', {
              timeout: 3000,
              cache: true,
              retries: 2
            });
          }
        } else {
          // Fetch all cards
          data = await fastFetch<any>('/api/credit-cards', {
            timeout: 3000,
            cache: true,
            retries: 2
          });
        }
        
        if (!data) {
          console.error('Failed to fetch cards: No data returned');
          setLoading(false);
          return;
        }
          
          // Debug: Log the API response
          console.log('API Response:', data);
          
          // Handle different response formats
          let cardsArray: any[] = [];
          
          if (Array.isArray(data)) {
            // If response is directly an array (from main API)
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
            } else if (data.category && Array.isArray(data.category.creditCards)) {
              // Handle category API response: { category: { creditCards: [...] } }
              cardsArray = data.category.creditCards;
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
            category: c.category,
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
            secondYearFee: c.secondYearFee,
            rating: c.rating || (Math.random() * 0.7 + 4.0), // Random rating between 4.0-4.7 if not provided
            // New detailed fields from enhanced API
            summaryCharges: c.summaryCharges || [],
            requiredDocuments: c.requiredDocuments || [],
            processSteps: c.processSteps || [],
            cardBenefits: c.cardBenefits || [],
            benefitSections: c.benefitSections || [],
            keyFeatures: c.keyFeatures || [],
            bestSuitedForPoints: c.bestSuitedForPoints || [],
            specialOffers: c.specialOffers || [],
            offers: c.offers || [],
          }));
          
          console.log('Mapped cards:', mappedCards);
          setCards(mappedCards);
      } catch (error) {
        console.error("Failed to fetch credit cards", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCards();
  }, []);

  // Dynamic lists for sidebar filters derived from fetched cards
  const categoriesList = Array.from(new Set(cards.flatMap((c) => c.categories || []))).sort();
  const banksList = Array.from(new Set(cards.map((c) => c.bank).filter(Boolean))).sort();
  const feesList = Array.from(new Set(cards.map((c) => c.fee).filter(Boolean))).sort();
  const cardTypesList = Array.from(new Set(cards.map((c) => c.cardType).filter(Boolean))).sort();

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

    // Use the already fetched detailed data instead of making another API call
    console.log('✅ Using cached card details for drawer:', full.slug);

    const fullDetails: CreditCardDetailsData = {
      id: full.id,
      name: full.name,
      bank: full.bank,
      image: full.image,
      categories: full.categories,
      fee: full.fee,
      cardType: full.cardType,
      bullets: full.bullets,
      // Include all the detailed data from the enhanced API
      summaryCharges: full.summaryCharges || [],
      requiredDocuments: full.requiredDocuments || [],
      processSteps: full.processSteps || [],
      cardBenefits: full.cardBenefits?.map((benefit: any) => benefit.benefit || benefit) || [],
      benefitSections: full.benefitSections?.map((section: any) => ({
        heading: section.heading,
        subPoints: section.subPoints?.map((point: any) => ({
          text: point.text,
        })) || [],
      })) || [],
      keyFeatures: full.keyFeatures?.map((feature: any) => feature.feature || feature) || [],
      bestSuitedForPoints: full.bestSuitedForPoints?.map((point: any) => point.text || point) || [],
      specialOffers: full.specialOffers?.map((offer: any) => offer.text || offer) || [],
      // offers: full.offers || [], // Commented out since offers are not included in API
      firstYearFee: full.firstYearFee?.toString(),
      secondYearFee: full.secondYearFee?.toString(),
      bankName: full.bank,
      bankLogoUrl: full.image,
      imageUrl: full.image,
      annualFee: full.fee,
      cardNetwork: full.cardType,
    };

    console.log('Setting full details and opening drawer:', fullDetails);
    setSelectedCard(fullDetails);
    setOpenDrawer(true);
  };
  
  const handleToggle = (key: string, value: boolean) => {
    setActiveFilters((prev) => ({ ...prev, [key]: value }));
  };
  
  const handleClearAll = () => {
    setActiveFilters({});
  };

  const toggleCardSelection = (cardId: string) => {
    const card = cards.find(c => c.id === cardId);
    if (!card) return;
    
    setSelectedForComparison(prev => {
      const isSelected = prev.some(c => c.id === cardId);
      if (isSelected) {
        return prev.filter(c => c.id !== cardId);
      } else {
        if (prev.length >= 2) {
          return [prev[1], card]; // Replace first with new selection
        }
        return [...prev, card];
      }
    });
  };

  const handleCompare = () => {
    if (selectedForComparison.length >= 2) {
      setShowComparisonModal(true);
    }
  };

  const handleCloseComparison = () => {
    setShowComparisonModal(false);
    setSelectedForComparison([]);
  };

  return (
    <div className="min-h-screen w-full bg-[#F5F7FA]">
      {loading && <PageLoader />}
      
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
              categories={categoriesList}
              banks={banksList}
              fees={feesList}
              cardTypes={cardTypesList}
              trendingLabel="Effective Free Card"
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

      <BottomComparisonBar
        selectedCards={selectedForComparison.map(card => ({
          id: card.id,
          name: card.name,
          imageUrl: card.image,
          bankName: card.bank
        }))}
        onCompare={handleCompare}
        onRemoveCard={(cardId) => setSelectedForComparison(prev => prev.filter(c => c.id !== cardId))}
        maxCards={2}
      />

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
                  categories={categoriesList}
                  banks={banksList}
                  fees={feesList}
                  cardTypes={cardTypesList}
                  trendingLabel="Effective Free Card"
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

      <BottomComparisonBar
        selectedCards={selectedForComparison.map(card => ({
          id: card.id,
          name: card.name,
          imageUrl: card.image,
          bankName: card.bank
        }))}
        onCompare={() => setShowComparisonModal(true)}
        onRemoveCard={(cardId) => setSelectedForComparison(prev => prev.filter(c => c.id !== cardId))}
        maxCards={2}
      />

      <ComparisonModal
        isOpen={showComparisonModal}
        onClose={handleCloseComparison}
        cards={selectedForComparison.map(card => ({
          id: card.id,
          name: card.name,
          slug: card.slug,
          imageUrl: card.image,
          bankName: card.bank,
          category: card.category,
          annualFee: typeof card.fee === 'string' ? card.fee : (card.fee != null ? String(card.fee) : ''),
          cardNetwork: card.cardType,
          cardType: card.cardType,
          bestSuitedFor: Array.isArray(card.bullets) ? card.bullets.join(', ') : (card.bullets || ''),
          effectiveFree: card.effectiveFree,
          recommended: !!card.recommended,
          rating: card.rating,
          firstYearFee: card.firstYearFee?.toString(),
          secondYearFee: card.secondYearFee?.toString(),
          bestSuitedForPoints: card.bestSuitedForPoints || [],
          categories: card.categories?.map(cat => ({ name: cat, slug: cat.toLowerCase().replace(/\s+/g, '-') })) || [],
          bulletPoints: card.bullets || [],
          keyFeatures: card.keyFeatures || [],
          summaryCharges: card.summaryCharges || [],
          requiredDocuments: card.requiredDocuments || [],
          processSteps: card.processSteps || [],
          cardBenefits: card.cardBenefits || [],
          benefitSections: card.benefitSections || [],
          feeWaiverCondition: typeof card.fee === 'string' ? card.fee : (card.fee != null ? String(card.fee) : ''),
          specialOffers: card.specialOffers || [],
        }))}
        onApply={(cardId) => {
          const card = selectedForComparison.find(c => c.id === cardId);
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
export default function CreditCardsPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <CreditCardsContent />
    </Suspense>
  );
}
