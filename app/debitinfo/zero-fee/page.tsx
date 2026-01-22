"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Zap, Award, TrendingUp, CheckCircle, Wallet } from 'lucide-react';
import { API_BASE_URL } from '@/lib/api';

export default function ZeroFeeDebitCardsPage() {
  const [debitCards, setDebitCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDebitCards = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/debit-cards`);
        if (response.ok) {
          const data = await response.json();
          // Filter for zero fee cards
          const zeroFeeCards = (data.products || []).filter((card: any) => 
            card.annualFee === 0 && card.issuanceFee === 0
          );
          setDebitCards(zeroFeeCards.sort((a: any, b: any) => b.rating - a.rating));
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
      {/* Hero */}
      <div className="bg-linear-to-br from-green-500 to-emerald-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm mb-6 animate-fadeIn">
            <Link href="/" className="hover:underline">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/debitinfo" className="hover:underline">Debit Cards</Link>
            <span className="mx-2">/</span>
            <span>Zero Fee Cards</span>
          </nav>
          
          <div className="text-center animate-slideUp">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl">
                <Zap className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Zero Fee Debit Cards
            </h1>
            <p className="text-xl text-green-50 max-w-2xl mx-auto">
              Discover debit cards with no annual fees, no maintenance charges, and zero hidden costs
            </p>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white shadow-lg p-8 mb-12 animate-slideUp">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Zero Fee Debit Cards?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-green-100 shrink-0 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">No Annual Fee</h3>
                <p className="text-sm text-gray-600">Save ₹200-₹500 yearly with zero annual maintenance charges</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-green-100 shrink-0 flex items-center justify-center">
                <Award className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Free Issuance</h3>
                <p className="text-sm text-gray-600">Get your card without any issuance or joining fees</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-green-100 shrink-0 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Value Benefits</h3>
                <p className="text-sm text-gray-600">Still enjoy cashback, rewards, and transaction benefits</p>
              </div>
            </div>
          </div>
        </div>

        {/* Debit Cards List */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Best Zero Fee Debit Cards</h2>
              <p className="text-gray-600">Compare {debitCards.length} free debit cards from top banks</p>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white shadow-md p-6 animate-pulse">
                  <div className="h-40 bg-gray-200 mb-4"></div>
                  <div className="h-6 bg-gray-200 mb-2"></div>
                  <div className="h-4 bg-gray-200"></div>
                </div>
              ))}
            </div>
          ) : debitCards.length === 0 ? (
            <div className="bg-white shadow-lg p-12 text-center">
              <Wallet className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No zero fee cards found</h3>
              <p className="text-gray-600 mb-6">Check back later for updated card listings</p>
              <Link href="/debitcard">
                <button className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 shadow-lg transition-all">
                  View All Debit Cards
                </button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {debitCards.map((card, index) => (
                <div 
                  key={card.id}
                  className="bg-white border-2 border-gray-200 hover:border-green-500 p-6 shadow-md hover:shadow-xl transition-all animate-scaleIn"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {card.imageUrl ? (
                    <img 
                      src={card.imageUrl} 
                      alt={card.name}
                      className="w-full h-40 object-cover mb-4"
                    />
                  ) : (
                    <div className="w-full h-40 bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mb-4">
                      <Wallet className="w-16 h-16 text-white" />
                    </div>
                  )}

                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{card.name}</h3>
                    <p className="text-gray-600 text-sm">{card.bankName}</p>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-yellow-500">⭐</span>
                    <span className="font-semibold text-gray-900">{card.rating?.toFixed(1)}</span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold ml-auto">
                      FREE
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                    <div className="bg-gray-50 p-2">
                      <p className="text-gray-600 text-xs">Annual Fee</p>
                      <p className="font-semibold text-gray-900">₹0</p>
                    </div>
                    <div className="bg-gray-50 p-2">
                      <p className="text-gray-600 text-xs">Cashback</p>
                      <p className="font-semibold text-gray-900">{card.cashbackRate || 0}%</p>
                    </div>
                    <div className="bg-gray-50 p-2">
                      <p className="text-gray-600 text-xs">ATM Limit</p>
                      <p className="font-semibold text-gray-900">₹{(card.atmWithdrawalLimit || 0).toLocaleString('en-IN')}</p>
                    </div>
                    <div className="bg-gray-50 p-2">
                      <p className="text-gray-600 text-xs">Lounge</p>
                      <p className="font-semibold text-gray-900">{card.loungeAccess ? 'Yes' : 'No'}</p>
                    </div>
                  </div>

                  {card.bulletPoints && card.bulletPoints.length > 0 && (
                    <ul className="space-y-1 mb-4">
                      {card.bulletPoints.slice(0, 3).map((point: any, idx: number) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                          <span>{point.text}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <Link href={`/debitcard/${card.slug}`}>
                    <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 shadow-md hover:shadow-lg transition-all font-semibold">
                      View Details
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Key Benefits of Zero Fee Debit Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-green-100 shrink-0 flex items-center justify-center">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Cost Savings</h3>
                <p className="text-gray-600">Save hundreds of rupees annually by avoiding maintenance and annual fees</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-green-100 shrink-0 flex items-center justify-center">
                <Award className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Hidden Charges</h3>
                <p className="text-gray-600">Transparent pricing with no surprise fees or hidden costs</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-green-100 shrink-0 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Same Features</h3>
                <p className="text-gray-600">Access to online banking, UPI, contactless payments, and more</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-green-100 shrink-0 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Easy Eligibility</h3>
                <p className="text-gray-600">Lower minimum balance requirements and simpler approval process</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
