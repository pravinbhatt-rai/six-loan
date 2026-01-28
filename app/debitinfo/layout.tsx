import { Metadata } from 'next';
import React, { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Debit Card Information India 2026 | Compare, Review & Apply',
  description: 'Explore detailed information about debit cards in India. Compare features, cashback, eligibility, and apply online. Updated for 2026.',
  alternates: {
    canonical: 'https://sixfinance.app/debitinfo',
  },
  keywords: [
    'debit card information', 'debit card india', 'debit card comparison', 'debit card review', 'debit card apply online', 'debit card eligibility', 'debit card cashback', 'debit card lounge access', 'debit card offers', 'debit card features', 'debit card benefits', 'debit card 2026', 'top debit cards', 'secure debit card', 'debit card insurance', 'debit card for students', 'debit card for travel', 'debit card for shopping', 'debit card for savings account', 'debit card for salary account', 'debit card for current account', 'debit card with rewards', 'debit card with cashback', 'debit card with airport lounge', 'debit card with zero annual fee', 'debit card with global access', 'debit card with high withdrawal limit', 'debit card for online payments', 'debit card for international use', 'compare debit cards india', 'lifetime free debit card', 'debit card instant', 'debit card best offers', 'debit card eligibility check', 'debit card apply 2026', 'debit card review', 'debit card guide'
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
    title: 'Debit Card Information India 2026 | Compare, Review & Apply',
    description: 'Explore detailed information about debit cards in India. Compare features, cashback, eligibility, and apply online. Updated for 2026.',
    url: 'https://sixfinance.app/debitinfo',
    siteName: 'SixFinance',
    type: 'website',
  },
};

export default function DebitInfoLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
