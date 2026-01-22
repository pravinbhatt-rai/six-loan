"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { CreditCard, Coffee, Wifi, CheckCircle, Wallet } from 'lucide-react';
import { API_BASE_URL } from '@/lib/api';

export default function LoungeAccessPage() {
  const [debitCards, setDebitCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDebitCards = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/debit-cards?loungeAccess=true`);
        if (response.ok) {
          const data = await response.json();
          setDebitCards((data.products || []).sort((a: any, b: any) => b.rating - a.rating));
        }
      } catch (error) {
        console.error('Failed to fetch debit cards:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDebitCards();
  }, []);

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

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white shadow-md p-6 animate-pulse">
                <div className="h-40 bg-gray-200 mb-4"></div>
                <div className="h-6 bg-gray-200 mb-2"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {debitCards.map((card) => (
              <Link href={`/debitcard/${card.slug}`} key={card.id}>
                <div className="bg-white border-2 border-gray-200 hover:border-orange-500 p-6 shadow-md hover:shadow-xl transition-all">
                  {card.imageUrl ? (
                    <img src={card.imageUrl} alt={card.name} className="w-full h-40 object-cover mb-4" />
                  ) : (
                    <div className="w-full h-40 bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center mb-4">
                      <Wallet className="w-16 h-16 text-white" />
                    </div>
                  )}
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{card.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{card.bankName}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-500">⭐</span>
                      <span className="font-semibold">{card.rating?.toFixed(1)}</span>
                    </div>
                    <span className="px-3 py-1 bg-orange-100 text-orange-800 text-xs font-semibold">Lounge Access</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
