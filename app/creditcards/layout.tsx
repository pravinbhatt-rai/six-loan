import { Metadata } from 'next';
import React, { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Best Credit Cards in India 2026 | Compare & Apply Online',
  description: 'Find, compare, and apply for the best credit cards in India. Explore features, rewards, cashback, lounge access, and more. Updated for 2026.',
  alternates: {
    canonical: 'https://sixfinance.app/creditcards',
  },
  keywords: [
    'best credit cards india', 'credit card comparison', 'apply credit card online', 'zero fee credit card', 'cashback credit card', 'lounge access credit card', 'international credit card', 'credit card offers', 'credit card features', 'credit card benefits', 'credit card eligibility', 'credit card 2026', 'top credit cards', 'secure credit card', 'credit card insurance', 'credit card for students', 'credit card for travel', 'credit card for shopping', 'credit card for savings account', 'credit card for salary account', 'credit card for current account', 'credit card with rewards', 'credit card with cashback', 'credit card with airport lounge', 'credit card with zero annual fee', 'credit card with global access', 'credit card with high limit', 'credit card for online payments', 'credit card for international use', 'compare credit cards india', 'lifetime free credit card', 'credit card EMI', 'credit card bill payment', 'credit card customer care', 'credit card application', 'credit card approval', 'credit card instant', 'credit card best offers', 'credit card eligibility check', 'credit card apply 2026', 'credit card review', 'credit card guide'
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Best Credit Cards in India 2026 | Compare & Apply Online',
    description: 'Find, compare, and apply for the best credit cards in India. Explore features, rewards, cashback, lounge access, and more. Updated for 2026.',
    url: 'https://sixfinance.app/creditcards',
    siteName: 'SixFinance',
    type: 'website',
  },
};

export default function CreditCardsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
