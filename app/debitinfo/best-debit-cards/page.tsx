"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, CreditCard, Shield, Zap, ChevronRight } from "lucide-react";

export default function BestDebitCardsPage() {
  const [debitCards, setDebitCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch('/api/debit-cards?limit=20');
        const data = await response.json();
        if (data.success) {
          // Sort by rating
          const sorted = data.products.sort((a: any, b: any) => b.rating - a.rating);
          setDebitCards(sorted);
        }
      } catch (error) {
        console.error('Error fetching debit cards:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-8 h-8" />
            <h1 className="text-4xl md:text-5xl font-bold">
              Best Debit Cards in India 2026
            </h1>
          </div>
          <p className="text-xl text-purple-100 mb-6">
            Top-rated debit cards with maximum benefits, cashback, and rewards
          </p>
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-purple-200">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/debitcard" className="hover:text-white">Debit Cards</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white font-semibold">Best Debit Cards</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Why Choose the Best Debit Card?
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            A good debit card offers more than just ATM withdrawals. The best debit cards in India provide cashback, 
            reward points, fuel surcharge waivers, airport lounge access, and comprehensive insurance coverage. 
            Whether you're a frequent shopper, traveler, or looking for basic banking needs, choosing the right 
            debit card can save you thousands of rupees annually.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center shrink-0">
                <CreditCard className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">High Cashback</h3>
                <p className="text-sm text-gray-600">Earn up to 5% cashback on shopping, fuel, and online transactions</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-pink-100 flex items-center justify-center shrink-0">
                <Shield className="w-6 h-6 text-pink-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Insurance Coverage</h3>
                <p className="text-sm text-gray-600">Accident insurance up to ₹10 lakhs and purchase protection</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center shrink-0">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Premium Benefits</h3>
                <p className="text-sm text-gray-600">Airport lounge access, golf privileges, and exclusive offers</p>
              </div>
            </div>
          </div>
        </div>

        {/* Debit Cards Grid */}
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Top Debit Cards in India</h2>
        
        {loading ? (
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm p-6 animate-pulse">
                <div className="flex gap-6">
                  <div className="w-48 h-32 bg-gray-200 rounded-lg shrink-0"></div>
                  <div className="flex-1">
                    <div className="h-6 bg-gray-200 rounded mb-4 w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : debitCards.length > 0 ? (
          <div className="space-y-6">
            {debitCards.map((card, index) => (
              <Link
                key={card.id}
                href={`/debitcard/${card.slug}`}
                className="block bg-white rounded-xl shadow-sm hover:shadow-lg transition-all p-6 border border-gray-200 hover:border-purple-300"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Card Image */}
                  <div className="relative w-full md:w-48 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center shrink-0">
                    {card.imageUrl ? (
                      <img
                        src={card.imageUrl}
                        alt={card.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <CreditCard className="w-16 h-16 text-gray-400" />
                    )}
                    {card.recommended && (
                      <span className="absolute top-2 right-2 bg-purple-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        #{index + 1}
                      </span>
                    )}
                  </div>

                  {/* Card Details */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{card.name}</h3>
                        <p className="text-gray-600">{card.bankName}</p>
                      </div>
                      {card.rating > 0 && (
                        <div className="flex items-center gap-1 bg-yellow-100 px-3 py-1 rounded-full">
                          <span className="text-yellow-600 font-bold">{card.rating.toFixed(1)}</span>
                          <span className="text-yellow-600">★</span>
                        </div>
                      )}
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-4">
                      <div>
                        <span className="text-xs text-gray-500">Annual Fee</span>
                        <p className="font-semibold text-gray-900">{card.annualFee || 'N/A'}</p>
                      </div>
                      {card.cashbackRate && (
                        <div>
                          <span className="text-xs text-gray-500">Cashback</span>
                          <p className="font-semibold text-purple-600">{card.cashbackRate}</p>
                        </div>
                      )}
                      {card.atmWithdrawalLimit && (
                        <div>
                          <span className="text-xs text-gray-500">ATM Limit</span>
                          <p className="font-semibold text-gray-900">{card.atmWithdrawalLimit}</p>
                        </div>
                      )}
                      {card.loungeAccess && (
                        <div>
                          <span className="text-xs text-gray-500">Lounge Access</span>
                          <p className="font-semibold text-green-600">Available</p>
                        </div>
                      )}
                    </div>

                    {/* Bullet Points */}
                    {card.bulletPoints && card.bulletPoints.length > 0 && (
                      <ul className="space-y-1">
                        {card.bulletPoints.slice(0, 3).map((bullet: any, idx: number) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                            <span className="text-purple-600 mt-1">✓</span>
                            <span>{bullet.text}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <CreditCard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No debit cards available yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
