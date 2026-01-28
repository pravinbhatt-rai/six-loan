"use client";
import React from 'react';
import Link from 'next/link';
import { Globe, CreditCard, Shield, TrendingUp } from 'lucide-react';
import DebitCardListSection from '@/component/debitinfo/DebitCardListSection';

export default function InternationalDebitCardsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-linear-to-br from-blue-500 to-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm mb-6 animate-fadeIn">
            <Link href="/" className="hover:underline">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/debitinfo" className="hover:underline">Debit Cards</Link>
            <span className="mx-2">/</span>
            <span>International Cards</span>
          </nav>

          <div className="text-center animate-slideUp">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl">
                <Globe className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              International Debit Cards
            </h1>
            <p className="text-xl text-blue-50 max-w-2xl mx-auto">
              Use your debit card globally with zero forex markup and international acceptance
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Benefits of International Debit Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex gap-4">
              <Globe className="w-12 h-12 text-blue-600 shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Global Acceptance</h3>
                <p className="text-sm text-gray-600">Accepted at millions of merchants worldwide</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Shield className="w-12 h-12 text-blue-600 shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Secure Transactions</h3>
                <p className="text-sm text-gray-600">Chip & PIN technology for enhanced security</p>
              </div>
            </div>
            <div className="flex gap-4">
              <TrendingUp className="w-12 h-12 text-blue-600 shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Zero Forex Markup</h3>
                <p className="text-sm text-gray-600">Some cards offer 0% foreign exchange markup</p>
              </div>
            </div>
          </div>
        </div>

        <DebitCardListSection
          categorySlug="debit-international"
          title="Best International Debit Cards"
          description="Compare debit cards accepted worldwide with international usage benefits"
          showViewMore={true}
          viewMoreHref="/debitinfo"
        />
      </div>
    </div>
  );
}
