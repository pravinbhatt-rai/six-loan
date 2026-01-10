"use client";
import React, { useState, useEffect } from 'react';
import { X, Check, CreditCard as CardIcon, ChevronRight, ShieldCheck, Zap, Fuel, Plane, ShoppingBag, DollarSign } from 'lucide-react';

interface BenefitSection {
  heading: string;
  subPoints: { text: string }[];
}

interface CreditCard {
  id: string;
  name: string;
  imageUrl: string;
  bankName: string;
  annualFee: string;
  joiningFee?: string;
  firstYearFee?: string;
  secondYearFee?: string;
  feeWaiverCondition?: string;
  bestSuitedFor?: string[];
  specialOffers?: string[];
  benefitSections?: BenefitSection[];
}

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  cardIds: string[];
  onApply?: (cardId: string) => void;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || '';

// Icon mapping for different benefit types
const getIconForHeading = (heading: string) => {
  const headingLower = heading.toLowerCase();
  
  if (headingLower.includes('fuel')) return <Fuel className="w-4 h-4" />;
  if (headingLower.includes('lounge') || headingLower.includes('airport')) return <Plane className="w-4 h-4" />;
  if (headingLower.includes('shopping') || headingLower.includes('retail')) return <ShoppingBag className="w-4 h-4" />;
  if (headingLower.includes('cashback') || headingLower.includes('reward')) return <DollarSign className="w-4 h-4" />;
  if (headingLower.includes('movie') || headingLower.includes('entertainment')) return '🎬';
  if (headingLower.includes('travel') || headingLower.includes('hotel')) return '✈️';
  if (headingLower.includes('dining') || headingLower.includes('food')) return '🍽️';
  if (headingLower.includes('insurance') || headingLower.includes('protection')) return '🛡️';
  
  return <Zap className="w-4 h-4" />;
};

export default function ComparisonModal({ isOpen, onClose, cardIds, onApply }: ComparisonModalProps) {
  const [cards, setCards] = useState<CreditCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && cardIds.length === 2) {
      fetchCards();
    } else if (!isOpen) {
      setCards([]);
    }
  }, [isOpen, cardIds]);

  const fetchCards = async () => {
    setLoading(true);
    try {
      const promises = cardIds.map(async (id) => {
        const listResponse = await fetch(`${API_BASE_URL}/api/credit-cards`);
        const listData = await listResponse.json();
        
        let cardsArray = [];
        if (Array.isArray(listData)) cardsArray = listData;
        else if (listData.cards && Array.isArray(listData.cards)) cardsArray = listData.cards;
        else if (listData.data && Array.isArray(listData.data)) cardsArray = listData.data;
        
        const cardInfo = cardsArray.find((c: any) => c.id?.toString() === id.toString());
        
        if (cardInfo?.slug) {
          const detailResponse = await fetch(`${API_BASE_URL}/api/credit-cards/${cardInfo.slug}`);
          const detailData = await detailResponse.json();
          const card = detailData.card;
          
          return {
            id: card.id,
            name: card.name,
            imageUrl: card.imageUrl,
            bankName: card.bankName,
            annualFee: card.annualFee,
            firstYearFee: card.firstYearFee,
            secondYearFee: card.secondYearFee,
            feeWaiverCondition: card.feeWaiverCondition,
            bestSuitedFor: card.bestSuitedForPoints?.map((p: any) => p.text || p) || [],
            specialOffers: card.specialOffers?.map((s: any) => s.text || s) || [],
            benefitSections: card.benefitSections || [],
          };
        }
        return null;
      });
      
      const results = await Promise.all(promises);
      const selectedCards = results.filter((card) => card !== null) as CreditCard[];
      setCards(selectedCards);
    } catch (error) {
      console.error('Failed to fetch cards for comparison:', error);
    } finally {
      setLoading(false);
    }
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
            <div className="bg-blue-50 p-1.5 sm:p-2 rounded-lg">
              <CardIcon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
            </div>
            <h2 className="text-base sm:text-xl font-bold text-slate-800">Compare Cards</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500 hover:text-slate-800"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {loading ? (
          <div className="flex-1 flex flex-col justify-center items-center gap-4">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
            <p className="text-slate-500 text-sm animate-pulse">Loading comparison...</p>
          </div>
        ) : (
          <>
            {/* 2. Sticky Comparison Header (The Cards) - MOBILE OPTIMIZED */}
            <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
              <div className="grid grid-cols-2 divide-x divide-gray-100">
                {cards.map((card) => (
                  <div key={card.id} className="p-2 sm:p-4 md:p-5 flex flex-col items-center gap-1.5 sm:gap-3 md:gap-4 text-center">
                    {/* Card Image Container - Responsive sizes */}
                    <div className="relative group shrink-0 w-full max-w-[120px] sm:max-w-[160px]">
                      <div className="absolute inset-0 bg-blue-600/5 rounded-lg transform rotate-3 transition-transform group-hover:rotate-6" />
                      <div className="relative aspect-[16/10] w-full">
                        <img
                          src={card.imageUrl}
                          alt={card.name}
                          className="relative w-full h-full object-contain rounded-lg shadow-sm bg-white p-1"
                        />
                      </div>
                    </div>
                    
                    {/* Card Details - Responsive typography */}
                    <div className="flex-1 min-w-0 w-full space-y-1 sm:space-y-2">
                      <h3 className="font-bold text-slate-800 text-xs sm:text-sm md:text-base leading-tight line-clamp-2 px-1">
                        {card.name}
                      </h3>
                      <div className="flex flex-col items-center gap-1 sm:gap-1.5">
                        <span className="text-[9px] sm:text-xs md:text-sm font-medium text-slate-600 bg-slate-50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded truncate w-full max-w-full">
                          Fee: {card.firstYearFee || card.annualFee || 'Free'}
                        </span>
                        <button
                          onClick={() => onApply?.(card.id)}
                          className="text-[9px] sm:text-xs md:text-sm bg-blue-600 hover:bg-blue-700 text-white font-medium px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 rounded-full transition-colors shadow-sm shadow-blue-200 w-full max-w-full"
                        >
                          Apply Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
              <div className="divide-y divide-gray-100">
                
                {/* Section: Best Suited For */}
                <ComparisonRow 
                  title="Best Suited For" 
                  icon={<Zap className="w-3 h-3 sm:w-4 sm:h-4" />}
                  cards={cards}
                  render={(card) => (
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {card.bestSuitedFor?.length ? (
                        card.bestSuitedFor.map((tag, i) => (
                          <span key={i} className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-violet-50 text-violet-700 text-[10px] sm:text-xs font-medium rounded border border-violet-100">
                            {tag}
                          </span>
                        ))
                      ) : <span className="text-gray-300 text-xs sm:text-sm">-</span>}
                    </div>
                  )}
                />

                {/* Section: Special Offers */}
                <ComparisonRow 
                  title="Welcome Benefits & Offers" 
                  icon={<ShieldCheck className="w-3 h-3 sm:w-4 sm:h-4" />}
                  cards={cards}
                  render={(card) => (
                     card.specialOffers?.length ? (
                      <ul className="space-y-1.5 sm:space-y-2">
                        {card.specialOffers.map((offer, i) => (
                          <li key={i} className="flex items-start gap-1.5 sm:gap-2 text-xs sm:text-sm text-slate-600">
                            <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{offer}</span>
                          </li>
                        ))}
                      </ul>
                    ) : <span className="text-gray-300 italic text-xs sm:text-sm">No specific offers listed</span>
                  )}
                />

                {/* Section: Feature Comparison - Show each card's own features */}
                {(() => {
                  // Check if any card has benefit sections
                  const hasBenefitSections = cards.some(c => c.benefitSections && c.benefitSections.length > 0);
                  
                  if (!hasBenefitSections) return null;

                  // Find the card with maximum number of benefit sections
                  const maxSections = Math.max(
                    cards[0]?.benefitSections?.length || 0,
                    cards[1]?.benefitSections?.length || 0
                  );

                  return (
                    <>
                      <div className="bg-slate-50/50 py-3 sm:py-4 px-3 sm:px-6 border-y border-gray-100">
                        <h3 className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 sm:gap-2">
                          <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
                          Key Features & Benefits
                        </h3>
                      </div>
                      
                      {/* Render feature rows */}
                      {Array.from({ length: maxSections }).map((_, index) => {
                        const card1Section = cards[0]?.benefitSections?.[index];
                        const card2Section = cards[1]?.benefitSections?.[index];
                        
                        // Only show row if at least one card has a section at this index
                        if (!card1Section && !card2Section) return null;

                        return (
                          <div key={`feature-row-${index}`} className="group hover:bg-gray-50/30 transition-colors border-b border-gray-100 last:border-0">
                            <div className="grid grid-cols-2 divide-x divide-gray-100">
                              {/* Card 1 Column - Show its feature at this position */}
                              <div className="p-2.5 sm:p-5 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 border-r border-blue-100">
                                {card1Section ? (
                                  <>
                                    <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                                      <div className="p-1 sm:p-1.5 rounded-lg bg-blue-100 text-blue-600">
                                        {getIconForHeading(card1Section.heading)}
                                      </div>
                                      <h4 className="text-[10px] sm:text-sm font-bold text-blue-700 line-clamp-2">
                                        {card1Section.heading}
                                      </h4>
                                    </div>
                                    
                                    {card1Section.subPoints?.length ? (
                                      <ul className="space-y-1 sm:space-y-2">
                                        {card1Section.subPoints.map((point, idx) => (
                                          <li key={idx} className="flex items-start gap-1 sm:gap-2 text-[10px] sm:text-sm">
                                            <Check className="w-3 h-3 sm:w-4 sm:h-4 shrink-0 mt-0.5 text-green-500" />
                                            <span className="text-slate-700">{point.text}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    ) : (
                                      <p className="text-slate-500 text-[10px] sm:text-sm italic">No details provided</p>
                                    )}
                                  </>
                                ) : (
                                  <div className="text-center py-2 sm:py-4">
                                    <div className="inline-flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gray-100 mb-1 sm:mb-2">
                                      <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                                    </div>
                                    <p className="text-[10px] sm:text-sm text-gray-400">No additional feature</p>
                                  </div>
                                )}
                              </div>

                              {/* Card 2 Column - Show its feature at this position */}
                              <div className="p-2.5 sm:p-5 bg-gradient-to-br from-emerald-50/50 to-teal-50/50 border-emerald-100">
                                {card2Section ? (
                                  <>
                                    <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                                      <div className="p-1 sm:p-1.5 rounded-lg bg-emerald-100 text-emerald-600">
                                        {getIconForHeading(card2Section.heading)}
                                      </div>
                                      <h4 className="text-[10px] sm:text-sm font-bold text-emerald-700 line-clamp-2">
                                        {card2Section.heading}
                                      </h4>
                                    </div>
                                    
                                    {card2Section.subPoints?.length ? (
                                      <ul className="space-y-1 sm:space-y-2">
                                        {card2Section.subPoints.map((point, idx) => (
                                          <li key={idx} className="flex items-start gap-1 sm:gap-2 text-[10px] sm:text-sm">
                                            <Check className="w-3 h-3 sm:w-4 sm:h-4 shrink-0 mt-0.5 text-green-500" />
                                            <span className="text-slate-700">{point.text}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    ) : (
                                      <p className="text-slate-500 text-[10px] sm:text-sm italic">No details provided</p>
                                    )}
                                  </>
                                ) : (
                                  <div className="text-center py-2 sm:py-4">
                                    <div className="inline-flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gray-100 mb-1 sm:mb-2">
                                      <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                                    </div>
                                    <p className="text-[10px] sm:text-sm text-gray-400">No additional feature</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </>
                  );
                })()}

                {/* Section: Fee Structure */}
                <div className="bg-slate-50/50 py-3 sm:py-4 px-3 sm:px-6 border-y border-gray-100">
                  <h3 className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 sm:gap-2">
                    <DollarSign className="w-3 h-3 sm:w-4 sm:h-4" />
                    Fee Structure
                  </h3>
                </div>
                
                <div className="grid grid-cols-2 divide-x divide-gray-100 pb-6 sm:pb-10">
                  {cards.map((card) => (
                    <div key={card.id} className="p-3 sm:p-6 space-y-2 sm:space-y-4">
                      <div className="flex justify-between items-center pb-1.5 sm:pb-2 border-b border-gray-100">
                        <span className="text-[10px] sm:text-sm text-slate-500">First Year</span>
                        <span className="text-[10px] sm:text-sm font-bold text-slate-900">{card.firstYearFee || card.annualFee || '₹0'}</span>
                      </div>
                      <div className="flex justify-between items-center pb-1.5 sm:pb-2 border-b border-gray-100">
                        <span className="text-[10px] sm:text-sm text-slate-500">Renewal Fee</span>
                        <span className="text-[10px] sm:text-sm font-bold text-slate-900">{card.secondYearFee || card.annualFee || 'N/A'}</span>
                      </div>
                      {card.feeWaiverCondition && (
                        <div className="bg-green-50 p-2 sm:p-3 rounded text-[9px] sm:text-xs text-green-800 leading-relaxed border border-green-100">
                          <strong>Fee Waiver:</strong> {card.feeWaiverCondition}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
// Sub-component for consistent row layout
// ------------------------------------------------------------------
const ComparisonRow = ({ 
  title, 
  icon,
  cards, 
  render 
}: { 
  title: string;
  icon?: React.ReactNode;
  cards: CreditCard[];
  render: (card: CreditCard) => React.ReactNode; 
}) => (
  <div className="group hover:bg-gray-50/50 transition-colors border-b border-gray-100 last:border-0">
    <div className="px-3 sm:px-6 py-2 sm:py-3">
      <h4 className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 sm:gap-2">
        {icon} {title}
      </h4>
    </div>
    <div className="grid grid-cols-2 divide-x divide-gray-100">
      {cards.map(card => (
        <div key={card.id} className="p-3 sm:p-6 pt-1.5 sm:pt-2">
          {render(card)}
        </div>
      ))}
    </div>
  </div>
);