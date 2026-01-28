import { Metadata } from 'next';
import React, { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'All Debit Cards India 2026 | Compare, Filter & Apply Online',
  description: 'Browse and compare all debit cards in India for 2026. Use advanced filters, view features, and apply online for the best debit card for your needs.',
  alternates: {
    canonical: 'https://sixfinance.app/debitcards',
  },
  keywords: [
    'all debit cards india', 'compare debit cards', 'debit card filters', 'best debit card 2026', 'debit card features', 'debit card benefits', 'debit card apply online', 'debit card comparison', 'debit card review', 'debit card eligibility', 'debit card offers', 'debit card cashback', 'debit card rewards', 'debit card lounge access', 'debit card for students', 'debit card for travel', 'debit card for shopping', 'debit card for savings account', 'debit card for salary account', 'debit card for current account', 'debit card with rewards', 'debit card with cashback', 'debit card with airport lounge', 'debit card with zero annual fee', 'debit card with global access', 'debit card with high withdrawal limit', 'debit card for online payments', 'debit card for international use', 'compare debit cards india', 'lifetime free debit card', 'debit card instant', 'debit card best offers', 'debit card eligibility check', 'debit card apply 2026', 'debit card review', 'debit card guide'
  ],
  openGraph: {
    title: 'All Debit Cards India 2026 | Compare, Filter & Apply Online',
    description: 'Browse and compare all debit cards in India for 2026. Use advanced filters, view features, and apply online for the best debit card for your needs.',
    url: 'https://sixfinance.app/debitcards',
    siteName: 'SixFinance',
    type: 'website',
  },
};

export default function DebitCardsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
