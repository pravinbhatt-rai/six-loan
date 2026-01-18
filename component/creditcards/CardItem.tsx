"use client";
import React from "react";
import { Star } from "lucide-react";
import { prefetch } from "@/lib/utils/ultraFastFetch";

export type CardInfo = {
  id: string;
  name: string;
  image: string;
  bullets: string[];
  bankName?: string;
  bank?: string;
  annualFee?: string;
  slug?: string;
  firstYearFee?: number | null;
  secondYearFee?: number | null;
  cardType?: string;
  rating?: number;
  categories?: string[];
};

export default function CardItem({
  card,
  onApply,
  onDetails,
  onCompare,
  recommended,
  recommendedType,
  isSelected,
}: {
  card: CardInfo;
  onApply: (card: CardInfo) => void;
  onDetails?: (card: CardInfo) => void;
  onCompare?: (cardId: string) => void;
  recommended?: boolean;
  recommendedType?: "top" | "best" | null;
  isSelected?: boolean;
}) {
  // Determine fee display logic
  const getFeeDisplay = () => {
    const firstYear = card.firstYearFee;
    const secondYear = card.secondYearFee;
    
    // Convert to numbers for proper comparison
    const firstYearNum = typeof firstYear === 'number' ? firstYear : (firstYear != null ? parseFloat(String(firstYear)) : null);
    const secondYearNum = typeof secondYear === 'number' ? secondYear : (secondYear != null ? parseFloat(String(secondYear)) : null);
    
    // Both zero or null = Lifetime Free
    if ((firstYearNum === null || firstYearNum === 0) && (secondYearNum === null || secondYearNum === 0)) {
      return { label: 'Annual Fee', text: 'Lifetime Free', isLifetimeFree: true };
    }
    
    // First year zero/null, second year has value = First Year Free
    if ((firstYearNum === null || firstYearNum === 0) && secondYearNum !== null && secondYearNum > 0) {
      return { 
        label: '1st Year Fee', 
        text: 'Free',
        subtext: `2nd Year: ₹${secondYearNum}`,
        isFirstYearFree: true 
      };
    }
    
    // First year has value, second year zero/null = Only First Year Fee
    if (firstYearNum !== null && firstYearNum > 0 && (secondYearNum === null || secondYearNum === 0)) {
      return { 
        label: '1st Year Fee', 
        text: `₹${firstYearNum}`,
        subtext: '2nd Year: Free',
        hasFirstYearFee: true 
      };
    }
    
    // Both have values
    if (firstYearNum !== null && firstYearNum > 0 && secondYearNum !== null && secondYearNum > 0) {
      return { 
        label: 'Annual Fee', 
        text: `₹${firstYearNum}`,
        subtext: `2nd Year: ₹${secondYearNum}`,
        hasBothFees: true 
      };
    }
    
    // Default fallback
    return { label: '1st Year Fee', text: card.annualFee || 'Free', isDefault: true };
  };
  
  const feeDisplay = getFeeDisplay();
  return (
    <div 
      className="relative w-full border border-gray-100 bg-gray-50/30 rounded-md shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
      onMouseEnter={() => {
        // Prefetch detail data on hover for instant loading
        if (card.slug) {
          prefetch(`/api/credit-cards/${card.slug}`, { timeout: 1000, cache: true });
        }
      }}
    >
      <div className="flex flex-col p-3 sm:p-4 md:p-6 gap-3 sm:gap-4 md:gap-6">
        
        {/* TOP SECTION: Image & Compare on Mobile, Side-by-side on Desktop */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 md:gap-6">
          
          {/* LEFT: Image & Compare */}
          <div className="flex flex-col items-center gap-2 sm:gap-3 md:gap-4 shrink-0 w-full sm:w-auto">
            {/* Card Image */}
            <div className="relative">
               {recommended && (
                <span className="absolute -top-2 -left-2 bg-green-600 text-white text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded shadow-sm z-10">
                  {recommendedType === "top" ? "TOP CHOICE" : "BEST VALUE"}
                </span>
              )}
              <img
                src={card.image}
                alt={card.name}
                className="w-32 h-20 sm:w-40 sm:h-24 md:w-44 md:h-28 object-contain drop-shadow-md"
              />
            </div>

            {/* Compare Checkbox */}
            {onCompare && (
              <button
                onClick={() => onCompare(card.id)}
                className="flex items-center gap-1.5 sm:gap-2 group cursor-pointer"
              >
                <div
                  className={`w-4 h-4 sm:w-5 sm:h-5 rounded flex items-center justify-center border transition-colors ${
                    isSelected
                      ? "bg-blue-600 border-blue-600"
                      : "bg-white border-gray-400 group-hover:border-blue-500"
                  }`}
                >
                  {isSelected && (
                    <svg
                      className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white"
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
                <span className="text-xs sm:text-sm font-medium text-gray-900">
                  {isSelected ? "Added" : "Add to Compare"}
                </span>
              </button>
            )}
          </div>

          {/* RIGHT: Content */}
          <div className="flex flex-col flex-1 w-full">
            
            {/* Header Section */}
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 leading-tight text-center sm:text-left flex-1">
                  {card.name}
                </h3>
                
                {/* Rating Display */}
                {card.rating && (
                  <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg border border-yellow-200 shrink-0">
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-xs sm:text-sm font-bold text-gray-900">
                      {card.rating.toFixed(1)}
                    </span>
                  </div>
                )}
              </div>

              {/* Fee Badge */}
              <div className="mt-2 flex flex-col gap-1 items-center sm:items-start">
                <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-[#FFF6E7] border border-[#F5E0C6] rounded text-xs sm:text-sm">
                  <span className="text-gray-700 font-medium">{feeDisplay.label}:</span>
                  <span className={`font-bold ${feeDisplay.isLifetimeFree || feeDisplay.isFirstYearFree ? 'text-green-600' : 'text-gray-900'}`}>
                    {feeDisplay.text}
                  </span>
                </div>
                {/* {feeDisplay.subtext && (
                  // <span className="text-[10px] sm:text-xs text-gray-600 px-2 sm:px-3">{feeDisplay.subtext}</span>
                )} */}
              </div>
            </div>

            {/* Bullet Points */}
            <ul className="mt-3 sm:mt-4 space-y-1.5 sm:space-y-2 mb-4 sm:mb-6">
              {card.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-2 sm:gap-2.5 text-xs sm:text-sm md:text-[15px] text-gray-700 leading-snug">
                  <span className="text-gray-500 mt-0.5 text-[10px] sm:text-xs">◆</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            {/* Footer Buttons */}
            <div className="mt-auto flex flex-col sm:flex-row items-center justify-end gap-3 sm:gap-4 md:gap-6 border-t border-gray-100 pt-3 sm:border-t-0 sm:pt-0">
              {onDetails && (
                <button
                  onClick={() => onDetails(card)}
                  className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors border-b border-gray-900 hover:border-blue-600 pb-0.5"
                >
                  <span className="text-base sm:text-lg leading-none">+</span>
                  <span>More Details</span>
                </button>
              )}

              <button
                onClick={() => onApply(card)}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm px-4 sm:px-6 py-2 sm:py-2.5 rounded-md transition-colors flex items-center justify-center gap-1 shadow-sm"
              >
                Apply Now
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}