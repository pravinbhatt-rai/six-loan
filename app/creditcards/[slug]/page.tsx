import React from "react";
import { notFound } from "next/navigation";
import CategoryClientWrapper from "./CategoryClientWrapper";

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || '';

export default async function CreditCardCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Return 404 for static file requests (images, fonts, etc.)
  if (slug.includes('.')) {
    notFound();
  }
  
  let cards = [];
  let categoryName = slug;

  try {
    const res = await fetch(`${API_BASE_URL}/api/credit-cards/by-category/${slug}`, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      categoryName = data.category.name;
      cards = data.category.creditCards.map((c: any) => ({
        id: c.id.toString(),
        name: c.name,
        image: c.imageUrl || "/creditcard/image 666.png",
        bullets: c.bulletPoints ? c.bulletPoints.map((b: any) => b.text) : [],
        bank: c.bankName,
        categories: c.categories.map((cat: any) => cat.name) || [],
        fee: c.annualFee,
        cardType: c.cardNetwork,
        effectiveFree: c.effectiveFree,
        recommended: c.recommended
      }));
    }
  } catch (error) {
    console.error("Failed to fetch credit cards", error);
  }

  return <CategoryClientWrapper cards={cards} categoryName={categoryName} categorySlug={slug} />;
}
