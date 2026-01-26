"use client";
import React from "react";
import { GitCompare, X } from "lucide-react";

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
  if (selectedCards.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-teal-500 shadow-2xl z-50">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          {/* Selected Cards Display */}
          <div className="flex items-center gap-6 flex-1">
            <span className="text-base font-semibold text-gray-800 mr-3">
              Selected Cards:
            </span>
            <div className="flex items-center gap-4">
              {selectedCards.map((card, index) => (
                <div key={card.id} className="flex items-center gap-3 bg-teal-50 border border-teal-200 rounded-xl px-4 py-3 shadow-sm">
                  <img
                    src={card.imageUrl}
                    alt={card.name}
                    className="w-10 h-10 object-contain rounded"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-900 truncate max-w-40">
                      {card.name}
                    </span>
                    <span className="text-xs text-gray-600">
                      {card.bankName}
                    </span>
                  </div>
                  <button
                    onClick={() => onRemoveCard(card.id)}
                    className="ml-3 text-gray-400 hover:text-red-500 transition-colors p-1 hover:bg-red-50 rounded"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}

              {/* Empty slots for remaining cards */}
              {Array.from({ length: maxCards - selectedCards.length }).map((_, index) => (
                <div key={`empty-${index}`} className="flex items-center gap-3 border-2 border-dashed border-gray-300 rounded-xl px-4 py-3 bg-gray-50">
                  <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
                    <span className="text-sm text-gray-400">+</span>
                  </div>
                  <span className="text-sm text-gray-400">Select card</span>
                </div>
              ))}
            </div>
          </div>

          {/* Compare Button */}
          <div className="flex items-center gap-4">
            <span className="text-base text-gray-700 font-medium">
              {selectedCards.length}/{maxCards} selected
            </span>
            <button
              onClick={onCompare}
              disabled={selectedCards.length < maxCards}
              className={`flex items-center gap-3 px-8 py-3 rounded-xl font-semibold text-base transition-all transform hover:scale-105 ${
                selectedCards.length === maxCards
                  ? 'bg-teal-600 hover:bg-teal-700 text-white shadow-lg hover:shadow-xl'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              <GitCompare className="w-5 h-5" />
              Compare Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}