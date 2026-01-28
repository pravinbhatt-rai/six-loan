"use client";
import React from 'react';
import Link from 'next/link';
import { CreditCard, Coffee, Wifi, CheckCircle } from 'lucide-react';
import DebitCardListSection from '@/component/debitinfo/DebitCardListSection';

export default function LoungeAccessPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-linear-to-br from-orange-500 to-red-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm mb-6 animate-fadeIn">
            <Link href="/" className="hover:underline">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/debitinfo" className="hover:underline">Debit Cards</Link>
            <span className="mx-2">/</span>
            <span>Lounge Access</span>
          </nav>

          <div className="text-center animate-slideUp">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl">
                <CreditCard className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Airport Lounge Access Debit Cards
            </h1>
            <p className="text-xl text-orange-50 max-w-2xl mx-auto">
              Travel in comfort with complimentary airport lounge access across India and worldwide
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Lounge Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex gap-4">
              <Coffee className="w-12 h-12 text-orange-600 shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Complimentary F&B</h3>
                <p className="text-sm text-gray-600">Enjoy free food and beverages</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Wifi className="w-12 h-12 text-orange-600 shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">High-Speed WiFi</h3>
                <p className="text-sm text-gray-600">Stay connected with free internet</p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle className="w-12 h-12 text-orange-600 shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Comfortable Seating</h3>
                <p className="text-sm text-gray-600">Relax before your flight</p>
              </div>
            </div>
          </div>
        </div>

        <DebitCardListSection
          categorySlug="lounge-access"
          title="Best Lounge Access Debit Cards"
          description="Compare debit cards with complimentary airport lounge access benefits"
          showViewMore={true}
          viewMoreHref="/debitinfo"
        />
      </div>
    </div>
  );
}
