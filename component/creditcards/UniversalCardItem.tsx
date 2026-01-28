"use client";
import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { 
  Star, 
  ShieldCheck, 
  Zap, 
  Gift, 
  CheckCircle2, 
  ArrowRight, 
  CreditCard,
  ChevronDown
} from "lucide-react";

export type UniversalCardInfo = {
  id: string;
  name: string;
  imageUrl: string;
  keyFeatures: string[] | Array<{icon?: string; title: string; description?: string; displayOrder?: number}>;
  safetyFeatures: string[] | Array<{featureName: string; description?: string; displayOrder?: number}>;
  offers: string[] | Array<{merchant?: string; offerType?: string; title: string; description?: string; offerValue?: string; validFrom?: string | null; validTill?: string | null}>;
  bankName: string;
  annualFee: number;
  slug: string;
  rating: number;
  applyUrl?: string;
  // Additional properties used in components
  bank?: string;
  cardType?: string;
  safety?: string[];
  features?: string[];
  atmWithdrawalLimit?: number;
  posLimit?: number;
  contactless?: boolean;
  internationalUsage?: boolean;
  // Detailed data structures
  bulletPoints?: Array<{text: string; displayOrder?: number}>;
  keyFeaturesDetailed?: Array<{icon?: string; title: string; description?: string; displayOrder?: number}>;
  offersDetailed?: Array<{merchant?: string; offerType?: string; title: string; description?: string; offerValue?: string; validFrom?: string | null; validTill?: string | null}>;
  safetyFeaturesDetailed?: Array<{featureName: string; description?: string; displayOrder?: number}>;
};

export default function UniversalCardItem({
  card,
  onApply,
  recommended,
  recommendedType,
  cardType = 'credit-card',
  onCompare,
  isSelected,
}: {
  card: UniversalCardInfo;
  onApply: (card: UniversalCardInfo) => void;
  recommended?: boolean;
  recommendedType?: "top" | "best" | null;
  cardType?: 'credit-card' | 'debit-card' | 'loan' | 'insurance';
  onCompare?: (cardId: string) => void;
  isSelected?: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle click anywhere on card to trigger apply
  const handleCardClick = (e: React.MouseEvent) => {
    // Don't trigger if clicking on button or interactive element
    if ((e.target as HTMLElement).closest('button')) return;
    onApply(card);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  // GSAP animations
  useEffect(() => {
    if (!imageRef.current) return;

    if (showDetails) {
      // Rotate image smoothly
      gsap.to(imageRef.current, {
        rotation: 90,
        duration: 0.5,
        ease: "power2.out"
      });
    } else {
      // Reset rotation
      gsap.to(imageRef.current, {
        rotation: 0,
        duration: 0.5,
        ease: "power2.out"
      });
    }
  }, [showDetails]);

  // Compare button animation - move down when image rotates
  useEffect(() => {
    const compareButton = document.querySelector(`[data-compare-id="${card.id}"]`);
    if (!compareButton) return;

    if (showDetails) {
      gsap.to(compareButton, {
        y: 20,
        duration: 0.5,
        ease: "power2.out"
      });
    } else {
      gsap.to(compareButton, {
        y: 0,
        duration: 0.5,
        ease: "power2.out"
      });
    }
  }, [showDetails, card.id]);

  // Dropdown animation based on showDetails
  useEffect(() => {
    if (!dropdownRef.current) return;

    if (showDetails) {
      gsap.fromTo(dropdownRef.current,
        {
          height: 0,
          opacity: 0,
          y: -10
        },
        {
          height: "auto",
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out"
        }
      );
    } else {
      gsap.to(dropdownRef.current, {
        height: 0,
        opacity: 0,
        y: -10,
        duration: 0.3,
        ease: "power2.in"
      });
    }
  }, [showDetails]);

  const getFeeDisplay = () => {
    if (card.annualFee === 0) {
      return { text: 'Lifetime Free', color: 'text-emerald-600' };
    }
    return { text: `₹${card.annualFee}/yr`, color: 'text-slate-700' };
  };

  const feeDisplay = getFeeDisplay();

  // Helper functions to extract display text from different data structures
  const getKeyFeaturesText = (): string[] => {
    if (Array.isArray(card.keyFeatures)) {
      if (typeof card.keyFeatures[0] === 'string') {
        return card.keyFeatures as string[];
      } else {
        return (card.keyFeatures as Array<{title: string; description?: string}>).map(feature =>
          feature.title || feature.description || ''
        ).filter(text => text.length > 0);
      }
    }
    return [];
  };

  const getSafetyFeaturesText = (): string[] => {
    if (Array.isArray(card.safetyFeatures)) {
      if (typeof card.safetyFeatures[0] === 'string') {
        return card.safetyFeatures as string[];
      } else {
        return (card.safetyFeatures as Array<{featureName: string; description?: string}>).map(feature =>
          feature.featureName || feature.description || ''
        ).filter(text => text.length > 0);
      }
    }
    return [];
  };

  const getOffersText = (): string[] => {
    if (Array.isArray(card.offers)) {
      if (typeof card.offers[0] === 'string') {
        return card.offers as string[];
      } else {
        return (card.offers as Array<{title: string; description?: string}>).map(offer =>
          offer.title || offer.description || ''
        ).filter(text => text.length > 0);
      }
    }
    return [];
  };

  const getBulletPointsText = (): string[] => {
    if (Array.isArray(card.bulletPoints)) {
      return card.bulletPoints.map(point =>
        typeof point === 'string' ? point : point.text || ''
      ).filter(text => text.length > 0);
    }
    return [];
  };

  return (
    <div
      ref={cardRef}
      className="relative w-full  mx-auto bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer group"
   
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Green TOP PICK badge - Half outside */}
      {recommended && (
        <div className="absolute -top-2 -left-1 z-20 overflow-visible">
          <div className="relative">
            {/* Badge with gradient */}
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-3 py-1 rounded-r-lg shadow-lg flex items-center gap-1.5">
              <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
              <span className="text-xs font-black tracking-tight">
                {recommendedType === "top" ? "TOP PICK" : "BEST VALUE"}
              </span>
              <div className="w-1.5 h-1.5 bg-white/30 rounded-full"></div>
            </div>
            {/* Connecting triangle */}
            <div className="absolute -bottom-1 left-2 w-3 h-2 overflow-hidden">
              <div className="w-3 h-3 bg-emerald-600 rotate-45 transform origin-top-left"></div>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row p-4 gap-4">
        {/* LEFT: Card Image (Always centered) */}
        <div className="w-full md:w-2/5 flex flex-col items-center justify-center">
          <div className="relative w-48 h-32 md:w-56 md:h-36 flex items-center justify-center mb-3">
            {/* Rotating card container */}
            <div ref={imageRef} className="relative z-10">
              <img
                src={card.imageUrl}
                alt={card.name}
                className="w-full h-auto max-h-32 md:max-h-36 object-contain drop-shadow-lg"
              />
            </div>
            
            {/* Subtle glow on hover */}
            <div className={`absolute inset-0 bg-gradient-to-r from-emerald-400/10 to-teal-400/10 rounded-lg blur-lg transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}></div>
          </div>

          {/* Compare Button - Below Image */}
          {onCompare && (
            <button
              data-compare-id={card.id}
              onClick={(e) => {
                e.stopPropagation();
                onCompare(card.id);
              }}
              className="flex items-center gap-1.5 group cursor-pointer bg-white border border-slate-200 hover:border-teal-300 rounded-lg px-3 py-1.5 shadow-sm transition-colors"
            >
              <div
                className={`w-4 h-4 rounded border transition-colors ${
                  isSelected
                    ? "bg-teal-600 border-teal-600"
                    : "bg-white border-gray-400 group-hover:border-teal-500"
                }`}
              >
                {isSelected && (
                  <svg
                    className="w-3 h-3 text-white m-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
              <span className={`text-xs font-medium transition-colors ${
                isSelected ? 'text-teal-700' : 'text-gray-700 group-hover:text-teal-600'
              }`}>
                {isSelected ? "Added" : "Compare"}
              </span>
            </button>
          )}
        </div>

        {/* RIGHT: Content */}
        <div className="flex-1 flex flex-col">
          {/* Header with bank name and rating */}
          <div className="flex justify-between items-start mb-3">
            <div>
              {/* Bank name and card type */}
              <div className="flex items-center gap-2 mb-1">
                <CreditCard className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-semibold text-slate-800">
                  {card.bankName || card.bank}
                </span>
                {card.cardType && (
                  <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {card.cardType}
                  </span>
                )}
              </div>
              
              {/* Card name */}
              <h3 className="md:text-2xl text-xl font-bold text-slate-900 leading-tight">
                {card.name}
              </h3>
            </div>
            
            {/* Rating in top right */}
            {card.rating && (
              <div className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-lg">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span className="text-sm font-bold text-slate-900">{card.rating.toFixed(1)}</span>
              </div>
            )}
          </div>

          {/* Key Highlights */}
          <div className="mb-3">
            {/* <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-emerald-600" />
              <h4 className="text-sm font-bold text-slate-800">Key Benefits</h4>
            </div> */}
            <ul className="grid grid-cols-1  gap-1.5">
              {getBulletPointsText().slice(0, 4).map((bullet, i) => (
                <li key={i} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0"></div>
                  <span className="text-sm text-slate-700 leading-tight">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Expandable Details - Security & Offers */}
          <div ref={dropdownRef} className="overflow-hidden">
            <div className="pt-3 border-t border-slate-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Security Features */}
                {getSafetyFeaturesText().length > 0 && (
                  <div className="bg-slate-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wide">Security</h5>
                    </div>
                    <ul className="space-y-1.5">
                      {getSafetyFeaturesText().map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                          <CheckCircle2 className="w-3 h-3 text-emerald-500 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Offers & Rewards */}
                {getOffersText().length > 0 && (
                  <div className="bg-emerald-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Gift className="w-4 h-4 text-emerald-600" />
                      <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wide">Offers</h5>
                    </div>
                    <ul className="space-y-1.5">
                      {getOffersText().map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full mt-1 flex-shrink-0"></div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Features Tags */}
              {card.features && card.features.length > 0 && (
                <div className="mt-3">
                  <div className="flex flex-wrap gap-1.5">
                    {card.features.map((feature, i) => (
                      <span 
                        key={i}
                        className="px-2 py-1 bg-white border border-slate-200 rounded text-[10px] font-medium text-slate-600"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer - Annual Fee, View More, and Apply Now */}
          <div className="mt-auto pt-3 border-t border-slate-200">
            <div className="flex items-center justify-between">
              {/* Annual Fee */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-700">Annual Fee:</span>
                <span className={`text-sm font-bold ${feeDisplay.color}`}>
                  {feeDisplay.text}
                </span>
              </div>

              {/* View More and Apply Now Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDetails(!showDetails);
                  }}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-sm px-3 py-2 rounded-lg transition-colors duration-200 flex items-center gap-1.5 group/view"
                >
                  <span>View More</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                    showDetails ? 'rotate-180' : ''
                  }`} />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click
                    onApply(card);
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2 group/btn"
                >
                  <span>APPLY NOW</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}