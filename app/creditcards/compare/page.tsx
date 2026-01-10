"use client";
import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { X, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || '';

interface CreditCard {
  id: string | number;
  name: string;
  bankName: string;
  imageUrl: string;
  bankLogoUrl?: string;
  annualFee: string;
  joiningFee?: string;
  firstYearFee?: string;
  secondYearFee?: string;
  feeWaiverCondition?: string;
  cardNetwork: string;
  effectiveFree: boolean;
  
  // Best Suited For
  bestSuitedFor?: string[];
  
  // Special Offers
  specialOffers?: string[];
  
  // Features
  cashbackBenefits?: string[];
  loungeAccess?: string[];
  fuelBenefits?: string[];
  diningBenefits?: string[];
  rewardsBenefits?: string[];
  travelBenefits?: string[];
  insuranceCovers?: string[];
  movieBenefits?: string[];
  fuelSurchargeBenefits?: string[];
  annualFeeWaiver?: string[];
  
  // Benefit Sections (new structured format)
  benefitSections?: Array<{
    heading: string;
    subPoints: Array<{ text: string }>;
  }>;
}

function ComparePageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [cards, setCards] = useState<[CreditCard | null, CreditCard | null]>([null, null]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const card1Id = searchParams.get('card1');
    const card2Id = searchParams.get('card2');

    if (!card1Id || !card2Id) {
      router.push('/creditcards');
      return;
    }

    fetchCards(card1Id, card2Id);
  }, [searchParams]);

  const fetchCards = async (id1: string, id2: string) => {
    try {
      setLoading(true);
      const [res1, res2] = await Promise.all([
        fetch(`${API_BASE_URL}/api/credit-cards/${id1}`),
        fetch(`${API_BASE_URL}/api/credit-cards/${id2}`)
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
      router.push(`/creditcards`);
    }
  };

  const formatFee = (card: CreditCard | null) => {
    if (!card) return '';
    if (card.firstYearFee) return `₹${card.firstYearFee}`;
    return card.annualFee || 'Not specified';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
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
            href="/creditcards"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Credit Cards
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Compare Credit Cards</h1>
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
                      <p className="text-sm text-gray-600">1st Year Fee: {formatFee(card)}</p>
                    </div>
                  </div>
                  <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
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
            <button className="bg-blue-600 text-white px-12 py-4 rounded-lg text-lg font-bold hover:bg-blue-700 transition shadow-lg">
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
                            <p className="text-sm text-gray-600">1st Year Fee: {formatFee(card)}</p>
                          </div>
                        </div>
                        <button className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition">
                          Apply Now
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Best suited for */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold mb-6 text-center bg-gray-50 py-3 rounded-lg">Best suited for</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {cards.map((card, index) => (
                  <div key={index}>
                    {card?.bestSuitedFor && card.bestSuitedFor.length > 0 ? (
                      <ul className="space-y-2">
                        {card.bestSuitedFor.map((item, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-green-600 mr-2">•</span>
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-400">No information available</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Special Offer */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold mb-6 text-center bg-gray-50 py-3 rounded-lg">Special Offer</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {cards.map((card, index) => (
                  <div key={index}>
                    {card?.specialOffers && card.specialOffers.length > 0 ? (
                      <ul className="space-y-2">
                        {card.specialOffers.map((offer, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-blue-600 mr-2">•</span>
                            <span className="text-gray-700">{offer}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-400">No special offers</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold mb-6 text-center bg-gray-50 py-3 rounded-lg">Features</h2>
              
              {/* Use benefitSections if available */}
              {cards[0]?.benefitSections && cards[0].benefitSections.length > 0 ? (
                <div className="space-y-8">
                  {cards[0].benefitSections.map((section, sectionIndex) => {
                    const section2 = cards[1]?.benefitSections?.[sectionIndex];
                    
                    return (
                      <div key={sectionIndex}>
                        <h3 className="text-sm font-semibold text-teal-600 uppercase mb-4">{section.heading}</h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <div>
                            <ul className="space-y-2">
                              {section.subPoints.map((point, i) => (
                                <li key={i} className="flex items-start">
                                  <span className="text-teal-600 mr-2">•</span>
                                  <span className="text-gray-700 text-sm">{point.text}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            {section2 ? (
                              <ul className="space-y-2">
                                {section2.subPoints.map((point, i) => (
                                  <li key={i} className="flex items-start">
                                    <span className="text-teal-600 mr-2">•</span>
                                    <span className="text-gray-700 text-sm">{point.text}</span>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-gray-400 text-sm">No information available</p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                // Fallback to old format
                <div className="space-y-8">
                  {renderFeatureSection('CASHBACK BENEFITS', 'cashbackBenefits')}
                  {renderFeatureSection('LOUNGE ACCESS', 'loungeAccess')}
                  {renderFeatureSection('FUEL BENEFITS', 'fuelBenefits')}
                  {renderFeatureSection('DINING BENEFITS', 'diningBenefits')}
                  {renderFeatureSection('REWARD BENEFIT', 'rewardsBenefits')}
                  {renderFeatureSection('TRAVEL BENEFIT', 'travelBenefits')}
                  {renderFeatureSection('INSURANCE COVERS', 'insuranceCovers')}
                  {renderFeatureSection('MOVIE BENEFIT', 'movieBenefits')}
                  {renderFeatureSection('FUEL SURCHARGE WAIVER', 'fuelSurchargeBenefits')}
                  {renderFeatureSection('ANNUAL FEE WAIVER', 'annualFeeWaiver')}
                </div>
              )}
            </div>

            {/* Fee Details */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold mb-6 text-center bg-gray-50 py-3 rounded-lg">Fee Details</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {cards.map((card, index) => (
                  <div key={index} className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">1st Year Fees</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {card?.firstYearFee ? `₹${card.firstYearFee}` : card?.annualFee || 'Not specified'}
                        {card?.firstYearFee && <span className="text-sm text-gray-500"> plus applicable taxes</span>}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">2nd Year Fees</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {card?.secondYearFee ? `₹${card.secondYearFee}` : card?.annualFee || 'Not specified'}
                        {card?.secondYearFee && <span className="text-sm text-gray-500"> plus applicable taxes</span>}
                      </p>
                      {card?.feeWaiverCondition && (
                        <p className="text-sm text-gray-600 mt-1">{card.feeWaiverCondition}</p>
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

  function renderFeatureSection(title: string, key: keyof CreditCard) {
    const hasData = cards.some(card => card && (card[key] as any)?.length > 0);
    if (!hasData) return null;

    return (
      <div>
        <h3 className="text-sm font-semibold text-teal-600 uppercase mb-4">{title}</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {cards.map((card, index) => (
            <div key={index}>
              {card && (card[key] as any)?.length > 0 ? (
                <ul className="space-y-2">
                  {((card[key] as any) || []).map((item: string, i: number) => (
                    <li key={i} className="flex items-start">
                      <span className="text-teal-600 mr-2">•</span>
                      <span className="text-gray-700 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400 text-sm">No information available</p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

// Wrap with Suspense
export default function CreditCardComparePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>}>
      <ComparePageContent />
    </Suspense>
  );
}
