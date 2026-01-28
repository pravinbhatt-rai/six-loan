"use client";
import React, { useState, useEffect } from 'react';
import { X, Check, CreditCard as CardIcon, ChevronRight, ShieldCheck, Zap, Fuel, Plane, ShoppingBag, DollarSign, Landmark, Wifi } from 'lucide-react';
import UniversalCardItem, { UniversalCardInfo } from './UniversalCardItem';

interface DebitCard {
  id: string;
  name: string;
  imageUrl: string;
  bankName: string;
  annualFee: string;
  accountType?: string;
  cardNetwork?: string;
  cardType?: string;
  keyFeatures?: string[];
  safetyFeatures?: string[];
  offers?: string[];
  bulletPoints?: string[];
  atmWithdrawalLimit?: number;
  posLimit?: number;
  internationalUsage?: boolean;
  contactless?: boolean;
  loungeAccess?: boolean;
  cashbackRate?: number;
}

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCards?: UniversalCardInfo[];
  allCards?: UniversalCardInfo[];
  cardIds?: string[]; // Keep for backward compatibility
  selectedCardIds?: string[]; // alias some callers use
  onApply?: (cardId: string) => void;
  onClearSelection?: () => void;
  showAllCards?: boolean;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || '';

export default function DebitCardComparisonModal({ isOpen, onClose, selectedCards = [], allCards = [], cardIds = [], selectedCardIds: propSelectedCardIds = [], onApply, showAllCards = false }: ComparisonModalProps) {
  const [cards, setCards] = useState<UniversalCardInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCardIds, setSelectedCardIds] = useState<string[]>(propSelectedCardIds.length > 0 ? propSelectedCardIds.map(String) : selectedCards.map(card => String(card.id)));
  const [showCardSelector, setShowCardSelector] = useState(false);
  const lastRequestedRef = React.useRef<string | null>(null);

  const sameIdSet = (a: UniversalCardInfo[] = [], b: UniversalCardInfo[] = []) => {
    if (a.length !== b.length) return false;
    const sa = new Set(a.map(x => String(x.id)));
    for (const item of b) {
      if (!sa.has(String(item.id))) return false;
    }
    return true;
  };

  const idsEqual = (a: string[] = [], b: string[] = []) => {
    if (a.length !== b.length) return false;
    const sa = new Set(a.map(String));
    for (const id of b) if (!sa.has(String(id))) return false;
    return true;
  };

  useEffect(() => {
    if (!isOpen) {
      // When modal is closed, avoid calling setState (prevents update loops).
      // Reset the lastRequestedRef so reopening will fetch fresh data.
      lastRequestedRef.current = null;
      return;
    }

    // If parent provided full card objects, use them directly
    if (allCards && allCards.length > 0) {
      // Only update local state if the provided cards differ from current state
      if (!sameIdSet(cards, allCards)) {
        setCards(allCards);
      }
      const ids = propSelectedCardIds.length > 0 ? propSelectedCardIds.map(String) : (selectedCards.length > 0 ? selectedCards.map(c => String(c.id)) : []);
      if (!idsEqual(selectedCardIds, ids)) {
        setSelectedCardIds(ids);
      }
      if (loading) setLoading(false);
      return;
    }

    // Determine effective ids from props (support both `cardIds` and `selectedCardIds` prop names)
    const effectiveIds = (propSelectedCardIds && propSelectedCardIds.length > 0)
      ? propSelectedCardIds.map(String)
      : (cardIds && cardIds.length > 0)
        ? cardIds.map(String)
        : (selectedCards && selectedCards.length > 0)
          ? selectedCards.map(c => String(c.id))
          : [];

    const key = effectiveIds.length > 0 ? JSON.stringify([...effectiveIds].sort()) : 'ALL';
    if (lastRequestedRef.current === key && cards.length > 0) {
      // already fetched for these ids — nothing to update
      return;
    }

    lastRequestedRef.current = key;
    if (effectiveIds.length > 0) {
      fetchCards(effectiveIds);
    } else {
      fetchCards();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, allCards, cardIds, propSelectedCardIds, selectedCards]);

  const fetchCards = async (filterIds?: string[]) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/debit-cards`);
      const data = await response.json();

      let cardsArray: any[] = [];
      if (Array.isArray(data)) cardsArray = data;
      else if (data.products && Array.isArray(data.products)) cardsArray = data.products;
      else if (data.data && Array.isArray(data.data)) cardsArray = data.data;

      const processedCards: UniversalCardInfo[] = cardsArray.map((card: any) => ({
        id: card.id,
        name: card.name,
        imageUrl: card.imageUrl,
        bankName: card.bankName,
        annualFee: card.annualFee,
        slug: card.slug,
        rating: card.rating || 4.0,
        keyFeatures: card.keyFeatures?.map((f: any) => f.title || f.description || f) || [],
        safetyFeatures: card.safetyFeatures?.map((s: any) => s.featureName || s.description || s) || [],
        offers: card.offers?.map((o: any) => o.title || o.description || o) || [],
      }));

      if (filterIds && filterIds.length > 0) {
        const filtered = processedCards.filter(pc => filterIds.includes(String(pc.id)));
        setCards(filtered);
        setSelectedCardIds(filterIds.map(String));
      } else if (showAllCards) {
        setCards(processedCards);
        setSelectedCardIds([]);
      } else if (selectedCards && selectedCards.length > 0) {
        const ids = selectedCards.map(c => String(c.id));
        const filtered = processedCards.filter(pc => ids.includes(String(pc.id)));
        setCards(filtered);
        setSelectedCardIds(ids);
      } else {
        // fallback to a small subset to avoid huge lists
        setCards(processedCards.slice(0, 6));
        setSelectedCardIds([]);
      }
    } catch (error) {
      console.error('Failed to fetch debit cards:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCardSelect = (cardId: string) => {
    setSelectedCardIds(prev => {
      if (prev.includes(cardId)) {
        return prev.filter(id => id !== cardId);
      } else if (prev.length < 4) { // Allow up to 4 cards for comparison
        return [...prev, cardId];
      }
      return prev;
    });
  };

  const handleCompareSelected = () => {
    if (selectedCards.length >= 2) {
      setShowCardSelector(false);
    }
  };

  const getSelectedCardData = () => {
    // Build selected card list from local cache using selectedCardIds state
    if (selectedCardIds && selectedCardIds.length > 0) {
      const found = selectedCardIds.map(id => cards.find(c => String(c.id) === String(id))).filter(Boolean) as UniversalCardInfo[];
      return found;
    }
    // fallback to provided selectedCards prop
    if (selectedCards && selectedCards.length > 0) return selectedCards;
    return [] as UniversalCardInfo[];
  };

  const formatFee = (fee: string | number) => {
    if (typeof fee === 'number') {
      return fee === 0 ? 'Free' : `₹${fee}`;
    }
    return fee || 'Free';
  };

  // Helper functions to extract detailed information
  const getKeyFeaturesDetailed = (card: UniversalCardInfo) => {
    if (card.keyFeaturesDetailed && card.keyFeaturesDetailed.length > 0) {
      return card.keyFeaturesDetailed;
    }
    if (Array.isArray(card.keyFeatures) && typeof card.keyFeatures[0] === 'object') {
      return card.keyFeatures as Array<{icon?: string; title: string; description?: string; displayOrder?: number}>;
    }
    return [];
  };

  const getSafetyFeaturesDetailed = (card: UniversalCardInfo) => {
    if (card.safetyFeaturesDetailed && card.safetyFeaturesDetailed.length > 0) {
      return card.safetyFeaturesDetailed;
    }
    if (Array.isArray(card.safetyFeatures) && typeof card.safetyFeatures[0] === 'object') {
      return card.safetyFeatures as Array<{featureName: string; description?: string; displayOrder?: number}>;
    }
    return [];
  };

  const getOffersDetailed = (card: UniversalCardInfo) => {
    if (card.offersDetailed && card.offersDetailed.length > 0) {
      return card.offersDetailed;
    }
    if (Array.isArray(card.offers) && typeof card.offers[0] === 'object') {
      return card.offers as Array<{merchant?: string; offerType?: string; title: string; description?: string; offerValue?: string; validFrom?: string | null; validTill?: string | null}>;
    }
    return [];
  };

  const getBulletPoints = (card: UniversalCardInfo) => {
    if (Array.isArray(card.bulletPoints) && card.bulletPoints.length > 0) return card.bulletPoints;
    if (Array.isArray((card as any).bullets) && (card as any).bullets.length > 0) return (card as any).bullets;
    return [] as any[];
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 overflow-hidden flex justify-center items-end sm:items-center">
      {/* Backdrop with Blur */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="relative w-full max-w-6xl h-[95vh] sm:h-[90vh] bg-white sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* 1. Modal Header (Title & Close) */}
        <div className="flex items-center justify-between px-3 sm:px-6 py-3 sm:py-4 border-b border-gray-100 bg-white z-20 shrink-0">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="bg-emerald-50 p-1.5 sm:p-2 rounded-lg">
              <CardIcon className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
            </div>
            <h2 className="text-base sm:text-xl font-bold text-slate-800">
              {showCardSelector ? 'Select Debit Cards' : 'Compare Debit Cards'}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {!showCardSelector && (
              <button
                onClick={() => setShowCardSelector(true)}
                className="px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-medium hover:bg-emerald-100 transition-colors"
              >
                Add Cards
              </button>
            )}
            {showCardSelector && selectedCards.length >= 2 && (
              <button
                onClick={handleCompareSelected}
                className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors"
              >
                Compare ({selectedCards.length})
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500 hover:text-slate-800"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex-1 flex flex-col justify-center items-center gap-4">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-600"></div>
            <p className="text-slate-500 text-sm animate-pulse">
              {showCardSelector ? 'Loading cards...' : 'Loading comparison...'}
            </p>
          </div>
        ) : showCardSelector ? (
          /* Card Selector View */
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 sm:p-6">
              <div className="mb-4">
                <p className="text-sm text-slate-600">
                  Select up to 4 debit cards to compare. Currently selected: {selectedCards.length}
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {cards.map((card) => (
                  <div
                    key={card.id}
                    onClick={() => handleCardSelect(card.id)}
                    className={`relative p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      selectedCardIds.includes(card.id)
                        ? 'border-emerald-500 bg-emerald-50 shadow-md'
                        : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'
                    }`}
                  >
                    {/* Selection Indicator */}
                    {selectedCards.some(selectedCard => selectedCard.id === card.id) && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                    
                    {/* Card Image */}
                    <div className="flex justify-center mb-3">
                      <img
                        src={card.imageUrl || '/card.png'}
                        alt={card.name}
                        className="w-20 h-auto object-contain"
                      />
                    </div>
                    
                    {/* Card Details */}
                    <div className="text-center">
                      <h3 className="font-semibold text-slate-800 text-sm mb-1 line-clamp-2">
                        {card.name}
                      </h3>
                      <p className="text-xs text-slate-600 mb-2">{card.bankName}</p>
                      <p className="text-xs font-medium text-emerald-600">
                        {formatFee(card.annualFee)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Comparison View */
          <>
            {/* 2. Sticky Comparison Header (The Cards) */}
            <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
              <div className={`grid divide-x divide-gray-100 ${getSelectedCardData().length === 2 ? 'grid-cols-2' : getSelectedCardData().length === 3 ? 'grid-cols-3' : 'grid-cols-4'}`}>
                {getSelectedCardData().map((card) => (
                  <div key={card.id} className="p-2 sm:p-4 md:p-5 flex flex-col items-center gap-1.5 sm:gap-3 md:gap-4 text-center">
                    {/* Card Image Container */}
                    <div className="relative group shrink-0 w-full max-w-[120px] sm:max-w-40">
                      <img
                        src={card.imageUrl || '/card.png'}
                        alt={card.name}
                        className="w-full h-auto object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    
                    {/* Card Details */}
                    <div className="w-full space-y-1 sm:space-y-2">
                      <h3 className="font-bold text-slate-800 text-sm sm:text-base leading-tight line-clamp-2">
                        {card.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 font-medium">
                        {card.bankName}
                      </p>
                      
                      {/* Annual Fee */}
                      <div className="bg-slate-50 px-2 py-1 rounded-md">
                        <p className="text-xs text-slate-500 font-medium">Annual Fee</p>
                        <p className="font-bold text-slate-800 text-sm">
                          {formatFee(card.annualFee)}
                        </p>
                      </div>
                      
                      {/* Apply Button */}
                      {onApply && (
                        <button
                          onClick={() => onApply(card.id)}
                          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm px-3 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center gap-1.5"
                        >
                          <span>Apply Now</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Scrollable Comparison Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
                
                {/* Key Features Section */}
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                  <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-emerald-600" />
                      Key Features
                    </h3>
                  </div>
                  <div className={`grid divide-x divide-slate-100 ${getSelectedCardData().length === 2 ? 'grid-cols-2' : getSelectedCardData().length === 3 ? 'grid-cols-3' : 'grid-cols-4'}`}>
                    {getSelectedCardData().map((card, index) => {
                      const features = getKeyFeaturesDetailed(card);
                      return (
                        <div key={`${card.id}-features`} className="p-4">
                          {features.length > 0 ? (
                            <ul className="space-y-2">
                              {features.slice(0, 6).map((feature, i) => (
                                <li key={`${card.id}-feature-${i}`} className="text-sm text-slate-700">
                                  <div className="flex items-start gap-2">
                                    <Check className="w-3 h-3 text-emerald-500 mt-0.5 flex-shrink-0" />
                                    <div>
                                      <span className="font-medium">{feature.title}</span>
                                      {feature.description && (
                                        <span className="block text-xs text-slate-500 mt-0.5">{feature.description}</span>
                                      )}
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-slate-400 text-sm">No key features available</p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Security Features Section */}
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                  <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      Security Features
                    </h3>
                  </div>
                  <div className={`grid divide-x divide-slate-100 ${getSelectedCardData().length === 2 ? 'grid-cols-2' : getSelectedCardData().length === 3 ? 'grid-cols-3' : 'grid-cols-4'}`}>
                    {getSelectedCardData().map((card, index) => {
                      const safetyFeatures = getSafetyFeaturesDetailed(card);
                      return (
                        <div key={`${card.id}-security`} className="p-4">
                          {safetyFeatures.length > 0 ? (
                            <ul className="space-y-2">
                              {safetyFeatures.slice(0, 4).map((feature, i) => (
                                <li key={`${card.id}-safety-${i}`} className="text-sm text-slate-700">
                                  <div className="flex items-start gap-2">
                                    <Check className="w-3 h-3 text-emerald-500 mt-0.5 flex-shrink-0" />
                                    <div>
                                      <span className="font-medium">{feature.featureName}</span>
                                      {feature.description && (
                                        <span className="block text-xs text-slate-500 mt-0.5">{feature.description}</span>
                                      )}
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-slate-400 text-sm">No security features available</p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Offers Section */}
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                  <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-emerald-600" />
                      Offers & Benefits
                    </h3>
                  </div>
                  <div className={`grid divide-x divide-slate-100 ${getSelectedCardData().length === 2 ? 'grid-cols-2' : getSelectedCardData().length === 3 ? 'grid-cols-3' : 'grid-cols-4'}`}>
                    {getSelectedCardData().map((card, index) => {
                      const offers = getOffersDetailed(card);
                      return (
                        <div key={`${card.id}-offers`} className="p-4">
                          {offers.length > 0 ? (
                            <ul className="space-y-2">
                              {offers.slice(0, 4).map((offer, i) => (
                                <li key={`${card.id}-offer-${i}`} className="text-sm text-slate-700">
                                  <div className="flex items-start gap-2">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full mt-1 flex-shrink-0"></div>
                                    <div>
                                      <span className="font-medium">{offer.title}</span>
                                      {offer.description && (
                                        <span className="block text-xs text-slate-500 mt-0.5">{offer.description}</span>
                                      )}
                                      {offer.merchant && (
                                        <span className="block text-xs text-emerald-600 mt-0.5">by {offer.merchant}</span>
                                      )}
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-slate-400 text-sm">No offers available</p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Bullet Points Section */}
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                  <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600" />
                      Key Points
                    </h3>
                  </div>
                  <div className={`grid divide-x divide-slate-100 ${getSelectedCardData().length === 2 ? 'grid-cols-2' : getSelectedCardData().length === 3 ? 'grid-cols-3' : 'grid-cols-4'}`}>
                    {getSelectedCardData().map((card, index) => {
                      const bulletPoints = getBulletPoints(card);
                      return (
                        <div key={`${card.id}-bullets`} className="p-4">
                          {bulletPoints.length > 0 ? (
                            <ul className="space-y-2">
                              {bulletPoints.map((bullet: any, i: number) => {
                                const text = typeof bullet === 'string' ? bullet : (bullet.text || bullet || '');
                                return (
                                  <li key={`${card.id}-bullet-${i}`} className="flex items-start gap-2 text-sm text-slate-700">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0"></div>
                                    <span>{text}</span>
                                  </li>
                                );
                              })}
                            </ul>
                          ) : (
                            <p className="text-slate-400 text-sm">No key points available</p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Additional Details Section */}
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                  <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2">
                      <Landmark className="w-4 h-4 text-emerald-600" />
                      Additional Details
                    </h3>
                  </div>
                  <div className={`grid divide-x divide-slate-100 ${getSelectedCardData().length === 2 ? 'grid-cols-2' : getSelectedCardData().length === 3 ? 'grid-cols-3' : 'grid-cols-4'}`}>
                    {getSelectedCardData().map((card, index) => (
                      <div key={`${card.id}-details`} className="p-4 space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-600">ATM Withdrawal Limit</span>
                          <span className="font-medium text-slate-800">
                            {card.atmWithdrawalLimit ? `₹${card.atmWithdrawalLimit.toLocaleString()}` : 'N/A'}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-600">POS Limit</span>
                          <span className="font-medium text-slate-800">
                            {card.posLimit ? `₹${card.posLimit.toLocaleString()}` : 'N/A'}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-600">Contactless</span>
                          <span className={`font-medium ${card.contactless ? 'text-emerald-600' : 'text-slate-400'}`}>
                            {card.contactless ? '✓' : '✗'}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-600">International Usage</span>
                          <span className={`font-medium ${card.internationalUsage ? 'text-emerald-600' : 'text-slate-400'}`}>
                            {card.internationalUsage ? '✓' : '✗'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}