import { Metadata } from 'next';
import React, { ReactNode } from 'react';

export const metadata: Metadata = {
  title: '25 Best Credit Cards in India 2026 | Top Picks',
  description: 'Discover the 25 best credit cards in India for 2026. Compare features, rewards, and benefits to find your perfect card.',
  alternates: {
    canonical: 'https://sixfinance.app/creditinfo/25-best-credit-cards-india',
  },
  keywords: [
    'best credit cards india', 'top credit cards india', '25 best credit cards', 'credit card comparison', 'credit card rewards', 'credit card cashback', 'credit card lounge access', 'credit card offers', 'credit card features', 'credit card benefits', 'credit card eligibility', 'credit card 2026', 'secure credit card', 'credit card insurance', 'credit card for students', 'credit card for travel', 'credit card for shopping', 'credit card for savings account', 'credit card for salary account', 'credit card for current account', 'credit card with rewards', 'credit card with cashback', 'credit card with airport lounge', 'credit card with zero annual fee', 'credit card with global access', 'credit card with high limit', 'credit card for online payments', 'credit card for international use', 'compare credit cards india', 'lifetime free credit card', 'credit card EMI', 'credit card bill payment', 'credit card customer care', 'credit card application', 'credit card approval', 'credit card instant', 'credit card best offers', 'credit card eligibility check', 'credit card apply 2026', 'credit card review', 'credit card guide'
  ],
  openGraph: {
    title: '25 Best Credit Cards in India 2026 | Top Picks',
    description: 'Discover the 25 best credit cards in India for 2026. Compare features, rewards, and benefits to find your perfect card.',
    url: 'https://sixfinance.app/creditinfo/25-best-credit-cards-india',
    siteName: 'SixFinance',
    type: 'website',
  },
};

export default function BestCreditCardsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
