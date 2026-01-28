"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CardItem, { CardInfo } from "@/component/creditcards/CardItem";
import ComparisonModal from "@/component/creditcards/ComparisonModal";
import CreditCardApplicationModal from "@/component/creditcards/CreditCardApplicationModal";
import CreditCardDetailsDrawer, { CreditCardDetailsData } from "@/component/creditcards/CreditCardDetailsDrawer";
import BottomComparisonBar from "@/component/creditcards/BottomComparisonBar";
import { X, ArrowRight } from "lucide-react";
import { SectionLoader } from "@/component/commonComponent/SixFinanceLoader";
import { fastFetch } from "@/lib/utils/ultraFastFetch";

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || '';

interface CreditCardRecord {
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
  welcomeBonus?: number;
  foreignTransactionFee?: number;
  domesticTransactionFee?: number;
  internationalUsage?: boolean;
  loungeAccess?: boolean;
  loungeAccessDetails?: string;
  fuelSurcharge?: number;
  movieTickets?: number;
  rewardValue?: number;
  bestFor?: string;
  applyUrl?: string;
  keyFeatures?: any[];
  offers?: any[];
  safetyFeatures?: any[];
  // Additional fields for CardItem compatibility
  firstYearFee?: number | null;
  secondYearFee?: number | null;
  bankName?: string;
  // Enhanced API fields
  summaryCharges?: any[];
  requiredDocuments?: any[];
  processSteps?: any[];
  cardBenefits?: any[];
  benefitSections?: any[];
  bestSuitedForPoints?: any[];
  specialOffers?: any[];
  // Drawer fields
  videoUrl?: string | null;
  termsConditionsUrl?: string | null;
}

interface CreditCardListSectionProps {
  categorySlug?: string;
  maxCards?: number;
  title?: string;
  description?: string;
  showViewMore?: boolean;
  viewMoreHref?: string;
}

export default function CreditCardListSection({
  categorySlug,
  maxCards,
  title = "Popular Credit Cards",
  description = "Explore our curated selection of the best credit cards in India",
  showViewMore = true,
  viewMoreHref = "/creditcards"
}: CreditCardListSectionProps) {
  const router = useRouter();
  const [allCards, setAllCards] = useState<CreditCardRecord[]>([]);
  const [cards, setCards] = useState<CreditCardRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [dataFetched, setDataFetched] = useState(false);

  // Comparison State
  const [selectedForComparison, setSelectedForComparison] = useState<string[]>([]);
  const [showComparisonModal, setShowComparisonModal] = useState(false);

  // Application Modal State
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [applicationCard, setApplicationCard] = useState<CardInfo | null>(null);

  // Drawer State
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CreditCardDetailsData | null>(null);

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
        const data = await fastFetch<any>('/api/credit-cards', {
          timeout: 3000,
          cache: true,
          retries: 2
        });

        if (!data) {
          console.error('Failed to fetch credit cards');
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
          } else if (Array.isArray(data.creditCards)) {
            cardsArray = data.creditCards;
          }
        }

        const mappedCards: CreditCardRecord[] = cardsArray.map((c: any) => ({
          id: c.id?.toString() || Math.random().toString(),
          name: c.name || c.title || 'Unknown Card',
          image: c.imageUrl || "/creditcard/default.png",
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
          welcomeBonus: c.welcomeBonus,
          foreignTransactionFee: c.foreignTransactionFee,
          domesticTransactionFee: c.domesticTransactionFee,
          internationalUsage: c.internationalUsage,
          loungeAccess: c.loungeAccess,
          loungeAccessDetails: c.loungeAccessDetails,
          fuelSurcharge: c.fuelSurcharge,
          movieTickets: c.movieTickets,
          rewardValue: c.rewardValue,
          bestFor: c.bestFor,
          applyUrl: c.applyUrl,
          keyFeatures: c.keyFeatures || [],
          offers: c.offers || [],
          safetyFeatures: c.safetyFeatures || [],
          // CardItem specific fields
          firstYearFee: c.firstYearFee,
          secondYearFee: c.secondYearFee,
          bankName: c.bankName || c.bank,
          // Enhanced API fields
          summaryCharges: c.summaryCharges || [],
          requiredDocuments: c.requiredDocuments || [],
          processSteps: c.processSteps || [],
          cardBenefits: c.cardBenefits || [],
          benefitSections: c.benefitSections || [],
          bestSuitedForPoints: c.bestSuitedForPoints || [],
          specialOffers: c.specialOffers || [],
          // Drawer fields
          videoUrl: c.videoUrl || null,
          termsConditionsUrl: c.termsConditionsUrl || null,
        }));

        setAllCards(mappedCards);
        setDataFetched(true);
        filterCardsFromCache(mappedCards);
      } catch (error) {
        console.error("Failed to fetch credit cards", error);
      } finally {
        setLoading(false);
      }
    };

    const filterCardsFromCache = (cardData: CreditCardRecord[] = allCards) => {
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

  const handleCardSelect = (cardId: string) => {
    setSelectedForComparison(prev => {
      if (prev.includes(cardId)) {
        return prev.filter(id => id !== cardId);
      } else if (prev.length < 3) {
        return [...prev, cardId];
      }
      return prev;
    });
  };

  const handleCompare = () => {
    if (selectedForComparison.length >= 2) {
      setShowComparisonModal(true);
    }
  };

  const handleApply = (card: CardInfo) => {
    setApplicationCard(card);
    setShowApplicationModal(true);
  };

  const handleViewDetails = (card: CardInfo) => {
    // Find the full card data
    const fullCard = cards.find((c) => c.id === card.id);
    if (!fullCard) return;

    // Map to CreditCardDetailsData format
    const fullDetails: CreditCardDetailsData = {
      id: fullCard.id,
      name: fullCard.name,
      bank: fullCard.bank,
      bankName: fullCard.bankName || fullCard.bank,
      image: fullCard.image,
      imageUrl: fullCard.image,
      bankLogoUrl: fullCard.image,
      fee: fullCard.fee,
      annualFee: fullCard.fee,
      cardNetwork: fullCard.cardType,
      cardType: fullCard.cardType,
      bestSuitedFor: fullCard.bestFor,
      bestSuitedForPoints: fullCard.bestSuitedForPoints || [],
      bullets: fullCard.bullets,
      bulletPoints: fullCard.bullets,
      keyFeatures: fullCard.keyFeatures || [],
      cardBenefits: fullCard.cardBenefits || [],
      categories: fullCard.categories,
      firstYearFee: fullCard.firstYearFee?.toString(),
      secondYearFee: fullCard.secondYearFee?.toString(),
      // Include all enhanced data
      summaryCharges: fullCard.summaryCharges || [],
      requiredDocuments: fullCard.requiredDocuments || [],
      processSteps: fullCard.processSteps || [],
      benefitSections: fullCard.benefitSections?.map((section: any) => ({
        heading: section.heading,
        subPoints: section.subPoints?.map((point: any) => ({
          text: point.text,
        })) || [],
      })) || [],
      specialOffers: fullCard.specialOffers || [],
      // Add video and terms URLs
      videoUrl: fullCard.videoUrl,
      termsConditionsUrl: fullCard.termsConditionsUrl,
    };

    setSelectedCard(fullDetails);
    setOpenDrawer(true);
  };

  if (loading) {
    return <SectionLoader />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>
      </div>

      {/* Cards List */}
      {cards.length > 0 ? (
        <div className="space-y-6">
          {cards.map((card) => (
            <CardItem
              key={card.id}
              card={{
                id: card.id,
                name: card.name,
                image: card.image,
                bullets: Array.isArray(card.bullets) ? card.bullets : [],
                bankName: card.bankName || card.bank,
                bank: card.bank,
                annualFee: typeof card.fee === 'string' ? card.fee : (card.fee != null ? String(card.fee) : ''),
                slug: card.slug,
                firstYearFee: card.firstYearFee,
                secondYearFee: card.secondYearFee,
                cardType: card.cardType,
                rating: card.rating,
                categories: card.categories.map(cat => cat.name),
              }}
              onApply={handleApply}
              onDetails={handleViewDetails}
              onCompare={handleCardSelect}
              recommended={!!card.recommended && card.recommended === "best"}
              recommendedType={card.recommended === "best" ? "best" : undefined}
              isSelected={selectedForComparison.includes(card.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No credit cards found for this category.</p>
        </div>
      )}

      {/* Comparison Bar */}
      <BottomComparisonBar
        selectedCards={selectedForComparison.map(cardId => {
          const card = cards.find(c => c.id === cardId);
          return card ? {
            id: card.id,
            name: card.name,
            imageUrl: card.image,
            bankName: card.bankName || card.bank
          } : null;
        }).filter(Boolean) as any[]}
        onCompare={handleCompare}
        onRemoveCard={(cardId) => setSelectedForComparison(prev => prev.filter(id => id !== cardId))}
        maxCards={2}
      />

      {/* View More Button */}
      {showViewMore && cards.length > 0 && (
        <div className="text-center pt-6">
          <button
            onClick={() => router.push(viewMoreHref)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium"
          >
            View All Credit Cards
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Modals and Drawer */}
      <ComparisonModal
        isOpen={showComparisonModal}
        cards={cards.filter(card => selectedForComparison.includes(card.id)).map(card => ({
          id: card.id,
          name: card.name,
          slug: card.slug,
          imageUrl: card.image,
          bankName: card.bankName || card.bank,
          bankLogoUrl: card.image,
          category: card.categories?.[0]?.name,
          annualFee: card.fee,
          cardNetwork: card.cardType,
          cardType: card.cardType,
          bestSuitedFor: card.bestSuitedForPoints?.map((p: any) => typeof p === 'string' ? p : p.text) || [],
          effectiveFree: card.fee === "Lifetime free",
          recommended: card.recommended,
          rating: card.rating,
          firstYearFee: card.firstYearFee?.toString(),
          secondYearFee: card.secondYearFee?.toString(),
          bestSuitedForPoints: card.bestSuitedForPoints || [],
          categories: card.categories || [],
          bulletPoints: card.bullets || [],
          keyFeatures: card.keyFeatures || [],
          offers: card.offers || [],
          summaryCharges: card.summaryCharges || [],
          requiredDocuments: card.requiredDocuments || [],
          processSteps: card.processSteps || [],
          cardBenefits: card.cardBenefits || [],
          benefitSections: card.benefitSections || [],
          feeWaiverCondition: card.fee,
          specialOffers: card.specialOffers || [],
        }))}
        onClose={() => {
          setShowComparisonModal(false);
          setSelectedForComparison([]);
        }}
      />

      {showApplicationModal && applicationCard && (
        <CreditCardApplicationModal
          card={applicationCard}
          onClose={() => {
            setShowApplicationModal(false);
            setApplicationCard(null);
          }}
        />
      )}

      {openDrawer && selectedCard && (
        <CreditCardDetailsDrawer
          card={selectedCard}
          isOpen={openDrawer}
          onClose={() => {
            setOpenDrawer(false);
            setSelectedCard(null);
          }}
          onApply={() => {}}
        />
      )}
    </div>
  );
}
