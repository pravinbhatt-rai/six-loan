import { Metadata } from 'next';
import React, { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Fuel Credit Cards India 2026 | Best Cards for Fuel Savings',
  description: 'Compare and apply for the best fuel credit cards in India. Save on every fuel purchase with top offers and cashback. Updated for 2026.',
  alternates: {
    canonical: 'https://sixfinance.app/creditinfo/fuel',
  },
  keywords: [
    'fuel credit cards', 'best fuel credit card india', 'credit card for fuel', 'credit card fuel offers', 'credit card fuel cashback', 'credit card fuel rewards', 'credit card fuel 2026', 'credit card fuel india', 'credit card fuel deals', 'credit card fuel shopping', 'credit card fuel online', 'credit card fuel groceries', 'credit card fuel travel', 'credit card fuel dining', 'credit card fuel bill payment', 'credit card fuel recharge', 'credit card fuel emi', 'credit card fuel wallet', 'credit card fuel instant', 'credit card fuel statement', 'credit card fuel eligibility', 'credit card fuel application', 'credit card fuel approval', 'credit card fuel best', 'credit card fuel review', 'credit card fuel guide', 'credit card fuel comparison', 'credit card fuel premium', 'credit card fuel platinum', 'credit card fuel gold', 'credit card fuel silver', 'credit card fuel lifetime free', 'credit card fuel zero fee', 'credit card fuel high limit', 'credit card fuel secure', 'credit card fuel insurance', 'credit card fuel for students', 'credit card fuel for business', 'credit card fuel for travel', 'credit card fuel for shopping', 'credit card fuel for online payments', 'credit card fuel for international use'
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
    title: 'Fuel Credit Cards India 2026 | Best Cards for Fuel Savings',
    description: 'Compare and apply for the best fuel credit cards in India. Save on every fuel purchase with top offers and cashback. Updated for 2026.',
    url: 'https://sixfinance.app/creditinfo/fuel',
    siteName: 'SixFinance',
    type: 'website',
  },
};

export default function FuelCreditCardLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
