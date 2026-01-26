"use client";
import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { X, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || '';

interface DebitCard {
  id: string | number;
  name: string;
  bankName: string;
  imageUrl: string;
  bankLogoUrl?: string;
  annualFee: string;
  accountType?: string;
  cardNetwork?: string;
  cardType?: string;

  // Key Features
  keyFeatures?: string[];

  // Safety Features
  safetyFeatures?: string[];

  // Offers
  offers?: string[];

  // Bullet Points
  bulletPoints?: string[];

  // Additional Info
  atmWithdrawalLimit?: number;
  posLimit?: number;
  internationalUsage?: boolean;
  contactless?: boolean;
  loungeAccess?: boolean;
  cashbackRate?: number;
}

function ComparePageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [cards, setCards] = useState<[DebitCard | null, DebitCard | null]>([null, null]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const card1Id = searchParams.get('card1');
    const card2Id = searchParams.get('card2');

    if (!card1Id || !card2Id) {
      router.push('/debitcard');
      return;
    }

    fetchCards(card1Id, card2Id);
  }, [searchParams]);

  const fetchCards = async (id1: string, id2: string) => {
    try {
      setLoading(true);
      const [res1, res2] = await Promise.all([
        fetch(`${API_BASE_URL}/api/debit-cards/${id1}`),
        fetch(`${API_BASE_URL}/api/debit-cards/${id2}`)
      ]);

      if (res1.ok && res2.ok) {
        const data1 = await res1.json();
        const data2 = await res2.json();
        setCards([data1.card || data1, data2.card || data2]);
      }
    } catch (error) {
      console.error('Failed to fetch cards:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeCard = (index: 0 | 1) => {
    const otherCard = cards[index === 0 ? 1 : 0];
    if (otherCard) {
      router.push(`/debitcard`);
    }
  };

  const formatFee = (card: DebitCard | null) => {
    if (!card) return '';
    return card.annualFee || 'Free';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading comparison...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/debitcard"
            className="inline-flex items-center text-teal-600 hover:text-teal-800 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Debit Cards
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Compare Debit Cards</h1>
        </div>

        {/* Comparison Cards Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {cards.map((card, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 relative">
              <button
                onClick={() => removeCard(index as 0 | 1)}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>

              {card ? (
                <div>
                  <div className="flex items-start space-x-4 mb-4">
                    <img
                      src={card.imageUrl || card.bankLogoUrl || '/placeholder-card.png'}
                      alt={card.name}
                      className="w-24 h-16 object-contain rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{card.name}</h3>
                      <p className="text-sm text-gray-600">Annual Fee: {formatFee(card)}</p>
                    </div>
                  </div>
                  <button className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition">
                    Apply Now
                  </button>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-400">
                  <p>No card selected</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Compare Button */}
        {cards[0] && cards[1] && (
          <div className="mb-8 text-center">
            <button className="bg-teal-600 text-white px-12 py-4 rounded-lg text-lg font-bold hover:bg-teal-700 transition shadow-lg">
              Compare
            </button>
          </div>
        )}

        {/* Comparison Content */}
        {cards[0] && cards[1] && (
          <div className="space-y-6">
            {/* You are comparing */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold mb-6">You are comparing</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {cards.map((card, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6 relative">
                    <button
                      onClick={() => removeCard(index as 0 | 1)}
                      className="absolute top-4 right-4 p-1 hover:bg-gray-200 rounded-full transition"
                    >
                      <X className="w-4 h-4 text-gray-500" />
                    </button>

                    {card && (
                      <div>
                        <div className="flex items-center space-x-4 mb-4">
                          <img
                            src={card.imageUrl || '/placeholder-card.png'}
                            alt={card.name}
                            className="w-20 h-14 object-contain rounded"
                          />
                          <div>
                            <h3 className="font-semibold text-gray-900">{card.name}</h3>
                            <p className="text-sm text-gray-600">Annual Fee: {formatFee(card)}</p>
                          </div>
                        </div>
                        <button className="w-full bg-teal-600 text-white py-2.5 rounded-lg font-semibold hover:bg-teal-700 transition">
                          Apply Now
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Key Features */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold mb-6 text-center bg-gray-50 py-3 rounded-lg">Key Features</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {cards.map((card, index) => (
                  <div key={index}>
                    {card?.keyFeatures && card.keyFeatures.length > 0 ? (
                      <ul className="space-y-2">
                        {card.keyFeatures.map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-teal-600 mr-2">•</span>
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-400">No key features available</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Safety Features */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold mb-6 text-center bg-gray-50 py-3 rounded-lg">Security Features</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {cards.map((card, index) => (
                  <div key={index}>
                    {card?.safetyFeatures && card.safetyFeatures.length > 0 ? (
                      <ul className="space-y-2">
                        {card.safetyFeatures.map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-teal-600 mr-2">•</span>
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-400">No security features available</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Offers */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold mb-6 text-center bg-gray-50 py-3 rounded-lg">Offers & Rewards</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {cards.map((card, index) => (
                  <div key={index}>
                    {card?.offers && card.offers.length > 0 ? (
                      <ul className="space-y-2">
                        {card.offers.map((offer, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-teal-600 mr-2">•</span>
                            <span className="text-gray-700">{offer}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-400">No offers available</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Fee Details */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold mb-6 text-center bg-gray-50 py-3 rounded-lg">Fee Details</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {cards.map((card, index) => (
                  <div key={index} className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Annual Fee</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {card?.annualFee || 'Free'}
                      </p>
                    </div>
                    {card?.accountType && (
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Account Type</p>
                        <p className="text-lg font-semibold text-gray-900">{card.accountType}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Benefits */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold mb-6 text-center bg-gray-50 py-3 rounded-lg">Additional Benefits</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {cards.map((card, index) => (
                  <div key={index} className="space-y-3">
                    {card?.atmWithdrawalLimit && (
                      <div>
                        <p className="text-sm text-gray-600">ATM Withdrawal Limit</p>
                        <p className="font-semibold text-gray-900">₹{card.atmWithdrawalLimit.toLocaleString()}</p>
                      </div>
                    )}
                    {card?.posLimit && (
                      <div>
                        <p className="text-sm text-gray-600">POS Limit</p>
                        <p className="font-semibold text-gray-900">₹{card.posLimit.toLocaleString()}</p>
                      </div>
                    )}
                    <div className="grid grid-cols-2 gap-4">
                      {card?.internationalUsage && (
                        <div className="text-center">
                          <span className="inline-block w-3 h-3 bg-green-500 rounded-full"></span>
                          <p className="text-xs text-gray-600 mt-1">International</p>
                        </div>
                      )}
                      {card?.contactless && (
                        <div className="text-center">
                          <span className="inline-block w-3 h-3 bg-green-500 rounded-full"></span>
                          <p className="text-xs text-gray-600 mt-1">Contactless</p>
                        </div>
                      )}
                      {card?.loungeAccess && (
                        <div className="text-center">
                          <span className="inline-block w-3 h-3 bg-green-500 rounded-full"></span>
                          <p className="text-xs text-gray-600 mt-1">Lounge Access</p>
                        </div>
                      )}
                      {card?.cashbackRate && (
                        <div className="text-center">
                          <span className="inline-block w-3 h-3 bg-green-500 rounded-full"></span>
                          <p className="text-xs text-gray-600 mt-1">{card.cashbackRate}% Cashback</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Wrap with Suspense
export default function DebitCardComparePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
    </div>}>
      <ComparePageContent />
    </Suspense>
  );
}