"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, Star, Percent, Shield, CreditCard } from "lucide-react";
import { getCreditCardImage } from "@/lib/utils/imageUtils";

export interface CategoryCard {
  id: string;
  name: string;
  bank: string;
  joiningFee: string;
  annualFee: string;
  image?: string; // Make optional since we'll generate it
  keyFeatures: string[];
  whyWeLikeIt: string;
  rating?: number;
}

interface CategorySectionProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  borderColor: string;
  description?: string;
  cards: CategoryCard[];
  onApply: (card: CategoryCard) => void;
  onShowDetails: (card: CategoryCard) => void;
  initiallyExpanded?: boolean;
}

const CategorySection: React.FC<CategorySectionProps> = ({
  id,
  title,
  icon,
  color,
  bgColor,
  borderColor,
  description,
  cards,
  onApply,
  onShowDetails,
  initiallyExpanded = true,
}) => {
  const [isExpanded, setIsExpanded] = useState(initiallyExpanded);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (cardId: string) => {
    setImageErrors(prev => ({ ...prev, [cardId]: true }));
  };

  return (
    <div id={id} className="scroll-mt-24 mb-12">
      {/* Section Header */}
      <div className="mb-6">
        <div 
          className={`bg-linear-to-r ${color} rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg`}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                <div className="text-white">
                  {icon}
                </div>
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>
                {description && isExpanded === false && (
                  <p className="text-white/90 mt-2 line-clamp-2 max-w-3xl">{description}</p>
                )}
              </div>
            </div>
            <div className="text-white">
              {isExpanded ? (
                <ChevronUp className="w-6 h-6" />
              ) : (
                <ChevronDown className="w-6 h-6" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Section Content */}
      {isExpanded && (
        <>
          {/* Description */}
          {description && (
            <div className="mb-8 bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <p className="text-gray-700 leading-relaxed">{description}</p>
            </div>
          )}

          {/* Cards Grid */}
          <div className="grid grid-cols-1 gap-6">
            {cards.map((card) => {
              // Get the image URL (use provided or generate from bank name)
              const imageUrl = card.image || getCreditCardImage(card.bank, card.name);
              const hasError = imageErrors[card.id];
              
              return (
                <div key={card.id} className={`${bgColor} rounded-2xl border ${borderColor} overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300`}>
                  {/* Card Header */}
                  <div className="p-6 border-b border-gray-200/50">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="flex items-start gap-4">
                        <div className="w-20 h-20 rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-linear-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                          {!hasError ? (
                            <img
                              src={imageUrl}
                              alt={`${card.bank} ${card.name}`}
                              className="w-full h-full object-contain p-2"
                              onError={() => handleImageError(card.id)}
                              loading="lazy"
                            />
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center p-2">
                              <CreditCard className="w-8 h-8 text-gray-400 mb-2" />
                              <span className="text-xs font-medium text-gray-600 text-center">{card.bank}</span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{card.name}</h3>
                          <div className="flex flex-wrap items-center gap-3">
                            <span className="px-4 py-1.5 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                              {card.bank}
                            </span>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              <span className="font-bold text-gray-900">{card.rating?.toFixed(1) || "4.5"}</span>
                              <span className="text-gray-500 text-sm">/5</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-3 min-w-[180px]">
                        <div className="text-sm">
                          <span className="text-gray-600">Joining Fee: </span>
                          <span className="font-semibold text-gray-900 ml-1">{card.joiningFee}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-600">Annual Fee: </span>
                          <span className="font-semibold text-gray-900 ml-1">{card.annualFee}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Card Content */}
                  <div className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Left Column - Key Benefits */}
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center">
                            <Percent className="w-4 h-4 text-teal-600" />
                          </div>
                          <h4 className="font-semibold text-gray-800 text-lg">Key Benefits</h4>
                        </div>
                        <ul className="space-y-4">
                          {card.keyFeatures.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <div className="w-2 h-2 rounded-full bg-teal-500 mt-2.5 shrink-0"></div>
                              <span className="text-gray-700 flex-1">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Right Column - Why We Like It */}
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                            <Shield className="w-4 h-4 text-green-600" />
                          </div>
                          <h4 className="font-semibold text-gray-800 text-lg">Why We Like It</h4>
                        </div>
                        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                          <div className="bg-gray-50/80 px-4 py-3 border-b border-gray-200">
                            <span className="font-medium text-gray-700">Key Benefits</span>
                            <span className="mx-4 text-gray-400">|</span>
                            <span className="font-medium text-gray-700">Why We Like It</span>
                          </div>
                          <div className="divide-y divide-gray-100">
                            {card.keyFeatures.map((feature, idx) => (
                              <div key={idx} className="px-4 py-3.5 hover:bg-gray-50/50 transition-colors">
                                <div className="text-sm text-gray-700 mb-1">{feature}</div>
                                {idx === 0 && (
                                  <div className="text-sm text-teal-600 font-medium">
                                    {card.whyWeLikeIt}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="mt-8 pt-6 border-t border-gray-200/50 flex flex-col sm:flex-row justify-between items-center gap-4">
                      <div className="text-sm text-gray-600">
                        Click "More Details" to see complete features and eligibility
                      </div>
                      <div className="flex gap-3">
                        <button
                          onClick={() => onShowDetails(card)}
                          className="px-6 py-2.5 text-sm font-medium text-teal-600 hover:text-teal-700 hover:bg-teal-50 rounded-lg transition-all border border-teal-200 hover:border-teal-300"
                        >
                          + More Details
                        </button>
                        <button
                          onClick={() => onApply(card)}
                          className="px-6 py-2.5 text-sm font-medium bg-gradient-to-r from-teal-600 to-teal-700 text-white hover:from-teal-700 hover:to-teal-800 rounded-lg transition-all shadow-sm hover:shadow"
                        >
                          Check Eligibility
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default CategorySection;