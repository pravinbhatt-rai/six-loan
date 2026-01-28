import { Metadata } from 'next';
import React, { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Debit Card Finder India 2026 | Find the Best Card',
  description: 'Use the debit card finder for India 2026 to discover the best card for your needs. Compare features, eligibility, and apply online for top debit cards.',
  alternates: {
    canonical: 'https://sixfinance.app/debitinfo/finder',
  },
  keywords: [
    'debit card finder', 'find best debit card india', 'debit card comparison', 'debit card review', 'debit card eligibility', 'debit card apply online', 'debit card features', 'debit card benefits', 'debit card cashback', 'debit card rewards', 'debit card lounge access', 'debit card offers', 'debit card for students', 'debit card for travel', 'debit card for shopping', 'debit card for savings account', 'debit card for salary account', 'debit card for current account', 'debit card with rewards', 'debit card with cashback', 'debit card with airport lounge', 'debit card with zero annual fee', 'debit card with global access', 'debit card with high withdrawal limit', 'debit card for online payments', 'debit card for international use', 'compare debit cards india', 'lifetime free debit card', 'debit card instant', 'debit card best offers', 'debit card eligibility check', 'debit card apply 2026', 'debit card review', 'debit card guide'
  ],
  openGraph: {
    title: 'Debit Card Finder India 2026 | Find the Best Card',
    description: 'Use the debit card finder for India 2026 to discover the best card for your needs. Compare features, eligibility, and apply online for top debit cards.',
    url: 'https://sixfinance.app/debitinfo/finder',
    siteName: 'SixFinance',
    type: 'website',
  },
};

export default function DebitCardFinderLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
