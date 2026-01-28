"use client";
import React from "react";
import { GitCompare, X, ChevronUp, ChevronDown } from "lucide-react";

interface ComparisonCard {
  id: string;
  name: string;
  imageUrl: string;
  bankName: string;
}

interface BottomComparisonBarProps {
  selectedCards: ComparisonCard[];
  onCompare: () => void;
  onRemoveCard: (cardId: string) => void;
  maxCards?: number;
}

export default function BottomComparisonBar({
  selectedCards,
  onCompare,
  onRemoveCard,
  maxCards = 2
}: BottomComparisonBarProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  if (selectedCards.length === 0) return null;

  return (
    <>
      {/* Desktop Version (hidden on mobile) */}
      <div className="hidden md:block fixed bottom-0 left-0 right-0 bg-white border-t-2 border-teal-500 shadow-2xl z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Selected Cards Display */}
            <div className="flex items-center gap-4 flex-1">
              <span className="text-sm font-semibold text-gray-800 whitespace-nowrap">
                Selected Cards:
              </span>
              <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
                {selectedCards.map((card) => (
                  <div key={card.id} className="flex items-center gap-2 bg-teal-50 border border-teal-200 rounded-lg px-3 py-2 flex-shrink-0">
                    <img
                      src={card.imageUrl}
                      alt={card.name}
                      className="w-8 h-8 object-contain rounded"
                    />
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-medium text-gray-900 truncate max-w-32">
                        {card.name}
                      </span>
                      <span className="text-xs text-gray-600 truncate">
                        {card.bankName}
                      </span>
                    </div>
                    <button
                      onClick={() => onRemoveCard(card.id)}
                      className="ml-2 text-gray-400 hover:text-red-500 transition-colors p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                {/* Empty slots */}
                {Array.from({ length: maxCards - selectedCards.length }).map((_, index) => (
                  <div key={`empty-${index}`} className="flex items-center gap-2 border-2 border-dashed border-gray-300 rounded-lg px-3 py-2 bg-gray-50 flex-shrink-0">
                    <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                      <span className="text-xs text-gray-400">+</span>
                    </div>
                    <span className="text-sm text-gray-400 whitespace-nowrap">Select card</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Compare Button */}
            <div className="flex items-center gap-4 pl-4">
              <span className="text-sm text-gray-700 font-medium whitespace-nowrap">
                {selectedCards.length}/{maxCards}
              </span>
              <button
                onClick={onCompare}
                disabled={selectedCards.length < maxCards}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-sm transition-all ${
                  selectedCards.length === maxCards
                    ? 'bg-teal-600 hover:bg-teal-700 text-white shadow-lg hover:shadow-xl active:scale-95'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                <GitCompare className="w-4 h-4" />
                Compare Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Version (hidden on desktop) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
        {/* Collapsed State */}
        {!isExpanded && (
          <div 
            className="bg-white border-t-2 border-teal-500 shadow-lg px-4 py-3"
            onClick={() => setIsExpanded(true)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative flex">
                  {selectedCards.slice(0, 2).map((card, index) => (
                    <div
                      key={card.id}
                      className={`w-10 h-10 rounded-lg border-2 border-white shadow-sm overflow-hidden ${
                        index > 0 ? '-ml-3' : ''
                      }`}
                    >
                      <img
                        src={card.imageUrl}
                        alt={card.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-900">
                    {selectedCards.length} card{selectedCards.length > 1 ? 's' : ''} selected
                  </span>
                  <span className="text-xs text-gray-600 flex items-center">
                    Tap to view <ChevronUp className="w-3 h-3 ml-1" />
                  </span>
                </div>
              </div>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (selectedCards.length === maxCards) {
                    onCompare();
                  }
                }}
                disabled={selectedCards.length < maxCards}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                  selectedCards.length === maxCards
                    ? 'bg-teal-600 text-white shadow-md active:scale-95'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                <GitCompare className="w-4 h-4" />
                Compare
              </button>
            </div>
          </div>
        )}

        {/* Expanded State */}
        {isExpanded && (
          <div className="bg-white border-t-2 border-teal-500 shadow-lg max-h-64 overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                <span className="font-semibold text-gray-900">
                  Selected Cards ({selectedCards.length}/{maxCards})
                </span>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-gray-500 hover:text-gray-700 p-1"
              >
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>

            {/* Cards List */}
            <div className="px-4 py-3 space-y-3">
              {selectedCards.map((card) => (
                <div key={card.id} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={card.imageUrl}
                      alt={card.name}
                      className="w-12 h-12 object-contain rounded-lg border border-gray-200"
                    />
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900">{card.name}</span>
                      <span className="text-sm text-gray-600">{card.bankName}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => onRemoveCard(card.id)}
                    className="text-gray-400 hover:text-red-500 p-2"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}

              {/* Empty slots */}
              {Array.from({ length: maxCards - selectedCards.length }).map((_, index) => (
                <div key={`empty-${index}`} className="flex items-center justify-between border-2 border-dashed border-gray-300 rounded-lg p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
                      <span className="text-2xl text-gray-400">+</span>
                    </div>
                    <span className="font-medium text-gray-400">Select card</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Compare Button */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-4 py-3">
              <button
                onClick={() => {
                  if (selectedCards.length === maxCards) {
                    onCompare();
                    setIsExpanded(false);
                  }
                }}
                disabled={selectedCards.length < maxCards}
                className={`w-full flex items-center justify-center gap-3 py-3 rounded-xl font-semibold text-base transition-all ${
                  selectedCards.length === maxCards
                    ? 'bg-teal-600 hover:bg-teal-700 text-white shadow-md'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                <GitCompare className="w-5 h-5" />
                Compare Now ({selectedCards.length}/{maxCards})
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add padding to page content to avoid overlap */}
      <style jsx global>{`
        body {
          padding-bottom: ${selectedCards.length > 0 ? '80px' : '0'};
        }
        @media (max-width: 768px) {
          body {
            padding-bottom: ${selectedCards.length > 0 ? (isExpanded ? '256px' : '72px') : '0'};
          }
        }
      `}</style>
    </>
  );
}