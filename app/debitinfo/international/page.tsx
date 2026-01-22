"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Globe, Shield, TrendingUp, CheckCircle, Wallet } from 'lucide-react';
import { API_BASE_URL } from '@/lib/api';

export default function InternationalDebitCardsPage() {
  const [debitCards, setDebitCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDebitCards = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/debit-cards?internationalUsage=true`);
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

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white shadow-md p-6 animate-pulse">
                <div className="h-40 bg-gray-200 mb-4"></div>
                <div className="h-6 bg-gray-200 mb-2"></div>
                <div className="h-4 bg-gray-200"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {debitCards.map((card) => (
              <Link href={`/debitcard/${card.slug}`} key={card.id}>
                <div className="bg-white border-2 border-gray-200 hover:border-blue-500 p-6 shadow-md hover:shadow-xl transition-all">
                  {card.imageUrl ? (
                    <img src={card.imageUrl} alt={card.name} className="w-full h-40 object-cover mb-4" />
                  ) : (
                    <div className="w-full h-40 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-4">
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
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold">International</span>
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
