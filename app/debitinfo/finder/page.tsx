"use client";
import React, { useState, useMemo, useEffect } from 'react';
import { 
  CreditCard, 
  ChevronRight, 
  Plane, 
  ShoppingBag, 
  Utensils, 
  ShieldCheck, 
  Landmark, 
  Wallet, 
  Sparkles,
  ExternalLink,
  CheckCircle2,
  Trophy,
  ArrowRight,
  Info,
  Star
} from 'lucide-react';
import UniversalCardItem, { UniversalCardInfo } from '@/component/creditcards/UniversalCardItem';
import DebitCardComparisonModal from '@/component/creditcards/DebitCardComparisonModal';
import BottomComparisonBar from '@/component/creditcards/BottomComparisonBar';

export default function CardDiscoveryCarousel() {
  const [stage, setStage] = useState('onboarding');
  const [debitCards, setDebitCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    bank: '',
    usage: [] as string[],
    spending: '',
    feePreference: '',
    features: [] as string[],
    accountType: '',
    internationalUsage: false,
    loungeAccess: false,
    contactless: false
  });
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  // Fetch debit cards from API
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch('/api/debit-cards');
        const data = await response.json();
        if (data.success) {
          setDebitCards(data.products);
        }
      } catch (error) {
        console.error('Error fetching debit cards:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  // --- COMPATIBILITY LOGIC ---
  const scoredCards = useMemo(() => {
    const scored = debitCards.map(card => {
      let score = 0;
      
      // Bank preference (20 points)
      if (card.bankName === formData.bank) score += 20;
      
      // Usage matches based on bestFor field (20 points each)
      const bestForMatches = formData.usage.filter(use => 
        card.bestFor && card.bestFor.toLowerCase().includes(use.toLowerCase())
      ).length;
      score += (bestForMatches * 20);
      
      // Fee preference (15 points)
      const annualFee = card.annualFee || 0;
      if (formData.feePreference === 'free' && annualFee <= 499) score += 15;
      if (formData.feePreference === 'free' && annualFee <= 500) score += 10;
      if (formData.feePreference === 'premium' && annualFee >= 500) score += 15;
      
      // Account type preference (10 points)
      if (formData.accountType && card.accountType === formData.accountType) score += 10;
      
      // International usage preference (15 points)
      if (formData.internationalUsage && card.internationalUsage) score += 15;
      
      // Lounge access preference (15 points)
      if (formData.loungeAccess && card.loungeAccess) score += 15;
      
      // Contactless preference (10 points)
      if (formData.contactless && card.contactless) score += 10;
      
      // Features matches based on card properties (10 points each)
      let featureScore = 0;
      if (formData.features.includes('lounge') && card.loungeAccess) featureScore += 10;
      if (formData.features.includes('insurance') && card.accidentInsurance) featureScore += 10;
      if (formData.features.includes('cashback') && card.cashbackRate) featureScore += 10;
      if (formData.features.includes('atm') && card.atmWithdrawalLimit) featureScore += 10;
      score += featureScore;
      
      const matchPercent = Math.min(99, 65 + score);
      return { ...card, matchPercent };
    });
    return scored.sort((a, b) => b.matchPercent - a.matchPercent);
  }, [formData, debitCards, stage]);

  const toggleUsage = (id: string) => {
    setFormData(prev => ({
      ...prev,
      usage: prev.usage.includes(id) ? prev.usage.filter((t: string) => t !== id) : [...prev.usage, id]
    }));
  };

  const toggleFeatures = (id: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(id) ? prev.features.filter((f: string) => f !== id) : [...prev.features, id]
    }));
  };

  const handleApply = (card: UniversalCardInfo) => {
    // Redirect to the apply URL if available, otherwise to the card's detail page
    if (card.applyUrl) {
      window.open(card.applyUrl, '_blank');
    } else {
      window.location.href = `/debitcard/${card.slug}`;
    }
  };

  const handleCompare = (cardId: string) => {
    setSelectedCards(prev => {
      if (prev.includes(cardId)) {
        return prev.filter(id => id !== cardId);
      } else if (prev.length < 2) {
        return [...prev, cardId];
      }
      return prev;
    });
  };

  const handleCompareNow = () => {
    if (selectedCards.length >= 2) {
      setShowComparison(true);
    }
  };

  // Get selected card objects for display
  const getSelectedCardObjects = (): UniversalCardInfo[] => {
    return selectedCards.map(id => {
      const card = scoredCards.find(c => c.id === id);
      return card ? mapToUniversalCardInfo(card) : null;
    }).filter((card): card is UniversalCardInfo => card !== null);
  };

  const mapToUniversalCardInfo = (card: any): UniversalCardInfo => ({
    id: card.id,
    name: card.name,
    imageUrl: card.imageUrl || '',
    bankName: card.bankName,
    annualFee: card.annualFee || 0,
    slug: card.slug,
    rating: card.rating || 4.5,
    applyUrl: card.applyUrl,
    keyFeatures: card.keyFeatures || [],
    safetyFeatures: card.safetyFeatures || [],
    offers: card.offers || [],
    bulletPoints: card.bulletPoints || [],
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-12">
      {/* Dynamic Navbar */}
      {/* <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200 py-4 px-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 font-black text-xl text-teal-600">
            <CreditCard className="fill-teal-600 text-white" /> 
            <span className="tracking-tight">CardScout</span>
          </div>
          {stage === 'results' && (
            <button 
              onClick={() => setStage('onboarding')}
              className="text-sm font-bold text-teal-600 hover:bg-teal-50 px-4 py-2 rounded-full transition">
              Reset Filters
            </button>
          )}
        </div>
      </nav> */}

      <main className="max-w-6xl mx-auto px-4 mt-8">
           {stage === 'results' && (
            <div className="flex justify-end mb-4">
              <button 
                onClick={() => setStage('onboarding')}
                className="text-sm font-bold text-teal-600 hover:bg-teal-50 px-4 py-2 rounded-full transition">
                Reset Filters
              </button>
            </div>
          )}
        {stage === 'onboarding' ? (
          <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="text-center mb-10">
              <h1 className="text-4xl font-black text-slate-900 mb-4 mt-4">What's your spending style?</h1>
              <p className="text-slate-500 text-lg">We'll rank cards based on your unique profile.</p>
            </div>

            <div className="space-y-6">
              {/* Monthly Spending */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <label className="flex items-center gap-2 text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">
                  <Wallet size={18} className="text-teal-500" /> Monthly Spending
                </label>
                <select 
                  value={formData.spending}
                  onChange={(e) => setFormData({...formData, spending: e.target.value})}
                  className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-teal-500 font-bold text-lg"
                >
                  <option value="">Select your monthly spend</option>
                  <option value="₹5K-15K">₹5,000 - ₹15,000</option>
                  <option value="₹15K-50K">₹15,000 - ₹50,000</option>
                  <option value="₹50K-1L">₹50,000 - ₹1,00,000</option>
                  <option value="₹1L+">₹1,00,000+</option>
                </select>
              </div>

              {/* Bank Selection */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <label className="flex items-center gap-2 text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">
                  <Landmark size={18} className="text-teal-500" /> Preferred Bank
                </label>
                <select 
                  value={formData.bank}
                  onChange={(e) => setFormData({...formData, bank: e.target.value})}
                  className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-teal-500 font-bold text-lg"
                >
                  <option value="">Any Bank</option>
                  <option>HDFC Bank</option>
                  <option>State Bank of India</option>
                  <option>ICICI Bank</option>
                  <option>Axis Bank</option>
                  <option>Kotak Mahindra Bank</option>
                  <option>Punjab National Bank</option>
                  <option>Bank of Baroda</option>
                </select>
              </div>

              {/* Annual Fee Preference */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <label className="flex items-center gap-2 text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">
                  <CreditCard size={18} className="text-teal-500" /> Annual Fee Preference
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    {id: 'free', label: 'Free/Low Fee', desc: '₹0 - ₹499/yr'},
                    {id: 'premium', label: 'Premium', desc: '₹500+/yr'}
                  ].map(item => (
                    <button
                      key={item.id}
                      onClick={() => setFormData({...formData, feePreference: item.id})}
                      className={`p-4 rounded-2xl border-2 transition-all text-left ${
                        formData.feePreference === item.id
                        ? 'border-teal-500 bg-teal-50 text-teal-700'
                        : 'border-slate-50 bg-slate-50 text-slate-500'
                      }`}
                    >
                      <div className="font-bold text-sm">{item.label}</div>
                      <div className="text-xs opacity-75">{item.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Usage Multi-select */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <label className="flex items-center gap-2 text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">
                  <Sparkles size={18} className="text-teal-500" /> Primary Uses
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    {id: 'shopping', label: 'Shopping', icon: <ShoppingBag size={18}/>},
                    {id: 'travel', label: 'Travel', icon: <Plane size={18}/>},
                    {id: 'dining', label: 'Dining', icon: <Utensils size={18}/>},
                    {id: 'international', label: 'Forex', icon: <Landmark size={18}/>},
                    {id: 'movies', label: 'Movies', icon: <Trophy size={18}/>},
                    {id: 'premium', label: 'Premium', icon: <Star size={18}/>}
                  ].map(item => (
                    <button
                      key={item.id}
                      onClick={() => toggleUsage(item.id)}
                      className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
                        formData.usage.includes(item.id)
                        ? 'border-teal-500 bg-teal-50 text-teal-700'
                        : 'border-slate-50 bg-slate-50 text-slate-500'
                      }`}
                    >
                      {item.icon}
                      <span className="text-xs font-bold">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Additional Features */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <label className="flex items-center gap-2 text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">
                  <ShieldCheck size={18} className="text-teal-500" /> Additional Features
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    {id: 'lounge', label: 'Lounge Access', icon: <Sparkles size={16}/>},
                    {id: 'insurance', label: 'Insurance', icon: <ShieldCheck size={16}/>},
                    {id: 'cashback', label: 'Cashback', icon: <Wallet size={16}/>},
                    {id: 'contactless', label: 'Contactless', icon: <CreditCard size={16}/>},
                    {id: 'rewards', label: 'Rewards', icon: <Trophy size={16}/>},
                    {id: 'atm', label: 'High ATM Limit', icon: <Landmark size={16}/>}
                  ].map(item => (
                    <button
                      key={item.id}
                      onClick={() => toggleFeatures(item.id)}
                      className={`p-3 rounded-2xl border-2 transition-all flex flex-col items-center gap-1 ${
                        formData.features.includes(item.id)
                        ? 'border-teal-500 bg-teal-50 text-teal-700'
                        : 'border-slate-50 bg-slate-50 text-slate-500'
                      }`}
                    >
                      {item.icon}
                      <span className="text-xs font-bold">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Account Type */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <label className="flex items-center gap-2 text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">
                  <CreditCard size={18} className="text-teal-500" /> Account Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    {id: 'savings', label: 'Savings Account', desc: 'Regular savings account'},
                    {id: 'current', label: 'Current Account', desc: 'Business/current account'}
                  ].map(item => (
                    <button
                      key={item.id}
                      onClick={() => setFormData({...formData, accountType: item.id})}
                      className={`p-4 rounded-2xl border-2 transition-all text-left ${
                        formData.accountType === item.id
                        ? 'border-teal-500 bg-teal-50 text-teal-700'
                        : 'border-slate-50 bg-slate-50 text-slate-500'
                      }`}
                    >
                      <div className="font-bold text-sm">{item.label}</div>
                      <div className="text-xs opacity-75">{item.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* International Usage */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <label className="flex items-center gap-2 text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">
                  <Plane size={18} className="text-teal-500" /> International Usage
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setFormData({...formData, internationalUsage: true})}
                    className={`flex-1 p-4 rounded-2xl border-2 transition-all ${
                      formData.internationalUsage
                      ? 'border-teal-500 bg-teal-50 text-teal-700'
                      : 'border-slate-50 bg-slate-50 text-slate-500'
                    }`}
                  >
                    <div className="font-bold text-sm">Yes, I travel abroad</div>
                    <div className="text-xs opacity-75">Need forex transactions</div>
                  </button>
                  <button
                    onClick={() => setFormData({...formData, internationalUsage: false})}
                    className={`flex-1 p-4 rounded-2xl border-2 transition-all ${
                      !formData.internationalUsage
                      ? 'border-teal-500 bg-teal-50 text-teal-700'
                      : 'border-slate-50 bg-slate-50 text-slate-500'
                    }`}
                  >
                    <div className="font-bold text-sm">No, domestic only</div>
                    <div className="text-xs opacity-75">India-based spending</div>
                  </button>
                </div>
              </div>

              {/* Lounge Access */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <label className="flex items-center gap-2 text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">
                  <Sparkles size={18} className="text-teal-500" /> Airport Lounge Access
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setFormData({...formData, loungeAccess: true})}
                    className={`flex-1 p-4 rounded-2xl border-2 transition-all ${
                      formData.loungeAccess
                      ? 'border-teal-500 bg-teal-50 text-teal-700'
                      : 'border-slate-50 bg-slate-50 text-slate-500'
                    }`}
                  >
                    <div className="font-bold text-sm">Yes, I want lounge access</div>
                    <div className="text-xs opacity-75">Premium airport benefits</div>
                  </button>
                  <button
                    onClick={() => setFormData({...formData, loungeAccess: false})}
                    className={`flex-1 p-4 rounded-2xl border-2 transition-all ${
                      !formData.loungeAccess
                      ? 'border-teal-500 bg-teal-50 text-teal-700'
                      : 'border-slate-50 bg-slate-50 text-slate-500'
                    }`}
                  >
                    <div className="font-bold text-sm">Not necessary</div>
                    <div className="text-xs opacity-75">Save on annual fees</div>
                  </button>
                </div>
              </div>

              <button 
                onClick={() => {
                  // Basic validation - ensure at least bank and one usage preference
                  if (!formData.bank || formData.usage.length === 0) {
                    alert('Please select your bank and at least one primary use to get better recommendations.');
                    return;
                  }
                  setStage('results');
                }}
                className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-5 rounded-3xl shadow-xl shadow-teal-200 transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                View Matches <ArrowRight className="group-hover:translate-x-1 transition-transform"/>
              </button>
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in duration-700">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800">Ranked Recommendations</h2>
              <p className="text-slate-500">Sorted by compatibility with your profile.</p>
            </div>

            {loading ? (
              <div className="grid grid-cols-1   gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-white rounded-xl shadow-md p-6 animate-pulse">
                    <div className="h-40 bg-gray-200 rounded-lg mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                ))}
              </div>
            ) : scoredCards.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {scoredCards.map((card) => (
                  <div key={card.id} className="relative">
                    {/* Match Percentage Badge */}
                    <div className="absolute -top-2 -right-2 z-10 bg-teal-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      {card.matchPercent}% Match
                    </div>
                    <UniversalCardItem
                      card={mapToUniversalCardInfo(card)}
                      onApply={handleApply}
                      onCompare={handleCompare}
                      isSelected={selectedCards.includes(card.id)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                No debit cards match your criteria. Try adjusting your preferences.
              </div>
            )}

            {selectedCards.length >= 2 && (
              <div className="text-center mt-8">
                <button
                  onClick={handleCompareNow}
                  className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 shadow-lg hover:shadow-xl transition-all font-semibold"
                >
                  Compare Selected Cards ({selectedCards.length})
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Debit Card Comparison Modal */}
      <DebitCardComparisonModal
        isOpen={showComparison}
        onClose={() => setShowComparison(false)}
        selectedCards={scoredCards.filter(card => selectedCards.includes(card.id)).map(mapToUniversalCardInfo)}
        allCards={scoredCards.map(mapToUniversalCardInfo)}
        showAllCards={true}
      />

      {/* Bottom Comparison Bar */}
      <BottomComparisonBar
        selectedCards={getSelectedCardObjects()}
        onCompare={handleCompareNow}
        onRemoveCard={handleCompare}
      />
    </div>
  );
}