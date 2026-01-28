"use client";
import React, { useState } from "react";
import CardList from "@/component/creditcards/CardList";
import { CardInfo } from "@/component/creditcards/CardItem";
import CreditCardDetailsDrawer, { CreditCardDetailsData } from "@/component/creditcards/CreditCardDetailsDrawer";
import { CardRecord } from "@/component/creditcards/cardsData";

export default function CategoryClientWrapper({ cards, categoryName, categorySlug }: { cards: CardRecord[], categoryName: string, categorySlug?: string }) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CreditCardDetailsData | null>(null);

  const mapToDetails = (card: CardInfo): CreditCardDetailsData | null => {
    const full = cards.find((c) => c.id === card.id);
    if (!full) return null;
    return {
      id: full.id,
      name: full.name,
      bank: full.bank,
      image: full.image,
      categories: full.categories,
      fee: full.fee as any,
      cardType: full.cardType as any,
      bullets: full.bullets,
    };
  };

  const handleApply = (card: CardInfo) => {
    const details = mapToDetails(card);
    if (!details) return;
    setSelectedCard(details);
    setOpenDrawer(true);
  };

  const handleShowDetails = (card: CardInfo) => {
    const details = mapToDetails(card);
    if (!details) return;
    setSelectedCard(details);
    setOpenDrawer(true);
  };

  return (
    <div className="min-h-screen w-full bg-[#F5F7FA]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">{categoryName}</h1>
        <CardList cards={cards} onApply={handleApply} onDetails={handleShowDetails} activeFilters={{}} />
      </div>

      <CreditCardDetailsDrawer
        isOpen={openDrawer}
        onClose={() => setOpenDrawer(false)}
        card={selectedCard}
        onApply={() => setOpenDrawer(false)}
        categorySlug={categorySlug}
        categoryName={categoryName}
      />
    </div>
  );
}
