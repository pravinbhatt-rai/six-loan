"use client";
import React, { useMemo } from "react";
import CardItem, { CardInfo } from "./CardItem";
import { CARDS, CardRecord } from "./cardsData";
import AnimatedCards from "./Animatedcard";

export default function CardList({ 
  cards, 
  onApply, 
  onDetails, 
  activeFilters,
  onCompare,
  selectedForComparison
}: { 
  cards?: CardRecord[]; 
  onApply: (card: CardInfo) => void; 
  onDetails?: (card: CardInfo) => void; 
  activeFilters: { [key: string]: boolean };
  onCompare?: (cardId: string) => void;
  selectedForComparison?: string[];
}) {
  const filteredSorted: CardRecord[] = useMemo(() => {
    const selectedCategories = ["Cashback", "Online Shopping", "Travel", "Utilities"].filter((c) => activeFilters[c]);
    const selectedBanks = ["HDFC Bank", "Axis Bank", "ICICI Bank", "SBI", "Kotak", "PNB"].filter((b) => activeFilters[b]);
    const selectedFees = ["Lifetime free", "1st year free only"].filter((f) => activeFilters[f]);
    const selectedTypes = ["UPI Rupay", "Visa/Mastercard"].filter((t) => activeFilters[t]);
    const wantTrending = !!activeFilters.trending;

    const passes = (card: CardRecord) => {
      if (wantTrending && !card.effectiveFree) return false;
      if (selectedCategories.length && !selectedCategories.some((c) => card.categories.includes(c))) return false;
      if (selectedBanks.length && !selectedBanks.includes(card.bank)) return false;
      if (selectedFees.length && !selectedFees.includes(card.fee)) return false;
      if (selectedTypes.length && !selectedTypes.includes(card.cardType)) return false;
      return true;
    };

    const sourceCards = cards || CARDS;
    const res = sourceCards.filter(passes).sort((a, b) => {
      const rank = (r: CardRecord) => (r.recommended === "top" ? 2 : r.recommended === "best" ? 1 : 0);
      return rank(b) - rank(a);
    });
    return res;
  }, [activeFilters, cards]);

  return (
    <div>

    
    <div className="flex-1 space-y-4 md:space-y-6">
      {/* Feature banner */}
     

      {/* First two: Best Recommended */}
      {filteredSorted.slice(0, 2).map((card) => (
        <CardItem
          key={card.id}
          card={{ 
            id: card.id, 
            name: card.name, 
            image: card.image, 
            bullets: card.bullets,
            bankName: card.bank,
            annualFee: card.fee,
            slug: card.slug,
            firstYearFee: card.firstYearFee,
            secondYearFee: card.secondYearFee,
            cardType: card.cardType
          }}
          onApply={onApply}
          onDetails={onDetails}
          onCompare={onCompare}
          isSelected={selectedForComparison?.includes(card.id)}
          recommended={!!card.recommended}
          recommendedType={card.recommended}
        />
      ))}

      {/* Banner image between recommended and others */}
      <div className="rounded overflow-hidden w border border-gray-200">
        <img
          src="/creditcard/image 667.png"
          alt="Promotional banner"
          className="w-full h-auto   object-cover md:object-contain"
        />
      </div>

      {/* Remaining cards */}
      {filteredSorted.slice(2).map((card) => (
        <CardItem
          key={card.id}
          card={{ 
            id: card.id, 
            name: card.name, 
            image: card.image, 
            bullets: card.bullets,
            bankName: card.bank,
            annualFee: card.fee,
            slug: card.slug,
            firstYearFee: card.firstYearFee,
            secondYearFee: card.secondYearFee,
            cardType: card.cardType
          }}
          onApply={onApply}
          onDetails={onDetails}
          onCompare={onCompare}
          isSelected={selectedForComparison?.includes(card.id)}
        />
      ))}

      
    </div>
    
    </div>
  );
}