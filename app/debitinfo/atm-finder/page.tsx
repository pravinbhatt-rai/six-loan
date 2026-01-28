"use client";
import React, { useState, useMemo, useRef } from 'react';
import Link from 'next/link';
import { 
  CreditCard, 
  ChevronRight, 
  Zap, 
  Plane, 
  ShoppingBag, 
  Coffee, 
  ShieldCheck,
  RotateCcw,
  Star,
  Search,
  ArrowLeft,
  ArrowRight,
  Building,
  Target,
  Award,
  Globe,
  Lock,
  Clock
} from 'lucide-react';
import UniversalCardItem, { UniversalCardInfo } from '@/component/creditcards/UniversalCardItem';
import DebitCardComparisonModal from '@/component/creditcards/DebitCardComparisonModal';
import BottomComparisonBar from '@/component/creditcards/BottomComparisonBar';

// Extended Mock Data for Multiple Cards
const CARDS_DATA = [
  {
    id: 1,
    name: "HDFC Millennia Debit",
    bank: "HDFC Bank",
    category: "shopping",
    purpose: "Online Shopping",
    features: ["cashback", "security"],
    bestFor: "Online Shoppers",
    perks: ["5% Cashback on PayZapp", "2.5% on Online Spends", "4 Domestic Lounge Visits/Year"],
    color: "from-blue-600 to-indigo-700",
    annualFee: "₹1,000 (Waived on spends > ₹1L)",
    rating: 4.7,
    processingTime: "Instant"
  },
  {
    id: 2,
    name: "SBI Platinum Int.",
    bank: "State Bank of India",
    category: "utility",
    purpose: "Daily Expenses",
    features: ["rewards", "security"],
    bestFor: "Everyday Reliability",
    perks: ["2 Reward Points per ₹200", "2 Lounge Visits/Quarter", "High Daily ATM Limits"],
    color: "from-blue-500 to-cyan-500",
    annualFee: "₹250 + GST",
    rating: 4.3,
    processingTime: "2-3 Days"
  },
  {
    id: 3,
    name: "Niyo Global Debit",
    bank: "SBM Bank",
    category: "travel",
    purpose: "International Travel",
    features: ["zero-forex", "global"],
    bestFor: "International Travel",
    perks: ["0% Forex Markup", "Worldwide Acceptance", "Tap-to-Pay Enabled"],
    color: "from-emerald-500 to-teal-600",
    annualFee: "Nil (Lifetime Free)",
    rating: 4.9,
    processingTime: "5-7 Days"
  },
  {
    id: 4,
    name: "Axis Burgundy Debit",
    bank: "Axis Bank",
    category: "premium",
    purpose: "Lifestyle & Luxury",
    features: ["premium", "concierge"],
    bestFor: "High Spenders",
    perks: ["Free Movie Tickets", "Unlimited Lounge Access", "Dedicated Concierge"],
    color: "from-purple-700 to-pink-600",
    annualFee: "Nil (For Burgundy Account)",
    rating: 4.5,
    processingTime: "Instant"
  },
  {
    id: 5,
    name: "ICICI Coral Debit",
    bank: "ICICI Bank",
    category: "shopping",
    purpose: "Cashback & Rewards",
    features: ["cashback", "rewards"],
    bestFor: "Smart Shoppers",
    perks: ["3% Cashback on Amazon", "1.5% on All Online", "Free Air Accident Cover"],
    color: "from-orange-500 to-red-500",
    annualFee: "₹499 + GST",
    rating: 4.2,
    processingTime: "3-5 Days"
  },
  {
    id: 6,
    name: "Kotak White Debit",
    bank: "Kotak Mahindra",
    category: "utility",
    purpose: "Everyday Banking",
    features: ["security", "utility"],
    bestFor: "Daily Banking",
    perks: ["Zero Fraud Liability", "Free Accident Cover", "Discounts on Dining"],
    color: "from-gray-700 to-slate-800",
    annualFee: "₹300 + GST",
    rating: 4.4,
    processingTime: "Instant"
  },
  {
    id: 7,
    name: "Yes Bank Prosperity",
    bank: "Yes Bank",
    category: "premium",
    purpose: "Wealth Management",
    features: ["premium", "investment"],
    bestFor: "Wealth Builders",
    perks: ["Priority Banking", "Investment Advisory", "Higher Withdrawal Limits"],
    color: "from-red-600 to-pink-600",
    annualFee: "₹999 + GST",
    rating: 4.6,
    processingTime: "7-10 Days"
  },
  {
    id: 8,
    name: "IDBI Signature Debit",
    bank: "IDBI Bank",
    category: "travel",
    purpose: "Domestic Travel",
    features: ["travel", "rewards"],
    bestFor: "Frequent Travelers",
    perks: ["Railway Lounge Access", "Travel Insurance", "Fuel Surcharge Waiver"],
    color: "from-green-600 to-blue-600",
    annualFee: "₹750 + GST",
    rating: 4.1,
    processingTime: "5-7 Days"
  }
];

// Bank options
const BANKS = [
  "Any Bank",
  "HDFC Bank",
  "State Bank of India",
  "Axis Bank",
  "ICICI Bank",
  "Kotak Mahindra",
  "Yes Bank",
  "IDBI Bank",
  "SBM Bank"
];

// Purpose options
const PURPOSES = [
  { id: "shopping", label: "Online Shopping", icon: <ShoppingBag size={16} /> },
  { id: "travel", label: "Travel", icon: <Plane size={16} /> },
  { id: "daily", label: "Daily Expenses", icon: <Coffee size={16} /> },
  { id: "premium", label: "Premium Lifestyle", icon: <Star size={16} /> },
  { id: "utility", label: "Utility Bills", icon: <Target size={16} /> },
  { id: "savings", label: "Savings & Rewards", icon: <Award size={16} /> }
];

// Feature options
const FEATURES = [
  { id: "cashback", label: "Cashback", icon: "💰" },
  { id: "rewards", label: "Reward Points", icon: "🏆" },
  { id: "zero-forex", label: "Zero Forex", icon: "🌍" },
  { id: "security", label: "Enhanced Security", icon: "🔒" },
  { id: "premium", label: "Premium Services", icon: "⭐" },
  { id: "travel", label: "Travel Benefits", icon: "✈️" },
  { id: "concierge", label: "Concierge", icon: "🎩" },
  { id: "global", label: "Global Acceptance", icon: "🌐" }
];

export default function DebitCardCalculator() {
  const [bankName, setBankName] = useState("Any Bank");
  const [purpose, setPurpose] = useState("");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  // Filter cards based on selections
  const recommendedCards = useMemo(() => {
    if (!showResult) return [];
    
    let filtered = [...CARDS_DATA];
    
    // Filter by bank
    if (bankName !== "Any Bank") {
      filtered = filtered.filter(card => card.bank === bankName);
    }
    
    // Filter by purpose
    if (purpose) {
      filtered = filtered.filter(card => card.category === purpose || card.purpose.toLowerCase().includes(purpose.toLowerCase()));
    }
    
    // Filter by features
    if (selectedFeatures.length > 0) {
      filtered = filtered.filter(card => 
        selectedFeatures.every(feature => card.features.includes(feature))
      );
    }
    
    return filtered.length > 0 ? filtered : CARDS_DATA.slice(0, 4);
  }, [bankName, purpose, selectedFeatures, showResult]);

  const cardsPerPage = 3;
  const totalPages = Math.ceil(recommendedCards.length / cardsPerPage);
  const visibleCards = recommendedCards.slice(
    currentPage * cardsPerPage,
    (currentPage + 1) * cardsPerPage
  );

  const handleFeatureToggle = (featureId: string) => {
    setSelectedFeatures(prev => 
      prev.includes(featureId)
        ? prev.filter(f => f !== featureId)
        : [...prev, featureId]
    );
  };

  const handleCalculate = () => {
    setShowResult(false);
    setCurrentPage(0);
    setTimeout(() => setShowResult(true), 300);
  };

  const scrollLeft = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const scrollRight = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1);
    }
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
      const card = recommendedCards.find(c => c.id.toString() === id);
      return card ? mapToUniversalCardInfo(card) : null;
    }).filter((card): card is UniversalCardInfo => card !== null);
  };

  const mapToUniversalCardInfo = (card: any): UniversalCardInfo => ({
    id: card.id.toString(),
    name: card.name,
    imageUrl: '', // No image in this database
    bankName: card.bank,
    annualFee: card.annualFee === '₹1,000 (Waived on spends > ₹1L)' ? 1000 : 
               card.annualFee === '₹300 + GST' ? 300 : 
               card.annualFee === '₹999 + GST' ? 999 : 
               card.annualFee === '₹750 + GST' ? 750 : 0,
    slug: card.id.toString(),
    rating: card.rating,
    applyUrl: card.applyUrl,
    keyFeatures: card.perks || [],
    safetyFeatures: card.features?.includes('security') ? ['Zero Fraud Liability'] : [],
    offers: [],
    bulletPoints: card.bulletPoints || [],
  });

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Hero Header */}
      <header className="bg-gradient-to-r from-slate-900 to-blue-900 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <nav className="text-xs uppercase tracking-widest text-slate-300 mb-4">
            <Link href="/" className="hover:text-teal-400 transition">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-teal-400">Debit Card Matchmaker</span>
          </nav>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
            Find Your Perfect Debit Card Match
          </h1>
          <p className="text-slate-300 text-lg">
            Answer a few questions and discover cards that match your lifestyle
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 -mt-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Input Section */}
          <section className="lg:col-span-1 bg-white p-6 shadow-xl border-t-4 border-teal-500">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Zap className="text-teal-500 w-5 h-5" /> Tell Us Your Preferences
            </h2>
            
            <div className="space-y-8">
              {/* Bank Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-3 flex items-center gap-2">
                  <Building size={16} /> Preferred Bank
                </label>
                <select 
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition"
                >
                  {BANKS.map(bank => (
                    <option key={bank} value={bank}>{bank}</option>
                  ))}
                </select>
              </div>

              {/* Purpose Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-3 flex items-center gap-2">
                  <Target size={16} /> Primary Purpose
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {PURPOSES.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setPurpose(purpose === p.id ? "" : p.id)}
                      className={`flex items-center gap-2 p-3 border-2 transition-all rounded-lg ${
                        purpose === p.id 
                        ? 'border-teal-500 bg-teal-50 text-teal-700' 
                        : 'border-gray-100 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      {p.icon}
                      <span className="text-xs font-bold">{p.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Features Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-3 flex items-center gap-2">
                  <Award size={16} /> Desired Features
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {FEATURES.map((feature) => (
                    <button
                      key={feature.id}
                      onClick={() => handleFeatureToggle(feature.id)}
                      className={`flex items-center gap-2 p-3 border-2 transition-all rounded-lg ${
                        selectedFeatures.includes(feature.id)
                        ? 'border-blue-500 bg-blue-50 text-blue-700' 
                        : 'border-gray-100 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      <span className="text-base">{feature.icon}</span>
                      <span className="text-xs font-bold">{feature.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button 
                onClick={handleCalculate}
                className="w-full bg-gradient-to-r from-teal-600 to-blue-600 text-white py-4 font-bold rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition shadow-lg"
              >
                Match My Card <ChevronRight size={18} />
              </button>
            </div>
          </section>

          {/* Result Section */}
          <section className="lg:col-span-2">
            {showResult ? (
              <div className="animate-fadeIn">
                <div className="bg-white p-6 shadow-xl border border-gray-100 rounded-lg">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {recommendedCards.length} Cards Match Your Preferences
                      </h2>
                      <p className="text-gray-600 text-sm mt-1">
                        Showing {currentPage * cardsPerPage + 1}-{Math.min((currentPage + 1) * cardsPerPage, recommendedCards.length)} of {recommendedCards.length} cards
                      </p>
                    </div>
                    
                    {/* Pagination Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={scrollLeft}
                        disabled={currentPage === 0}
                        className={`p-2 rounded-lg border ${
                          currentPage === 0
                            ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                            : 'border-gray-300 text-gray-700 hover:border-teal-500 hover:text-teal-600'
                        }`}
                      >
                        <ArrowLeft size={20} />
                      </button>
                      <div className="text-sm font-medium text-gray-700">
                        {currentPage + 1} / {totalPages}
                      </div>
                      <button
                        onClick={scrollRight}
                        disabled={currentPage === totalPages - 1}
                        className={`p-2 rounded-lg border ${
                          currentPage === totalPages - 1
                            ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                            : 'border-gray-300 text-gray-700 hover:border-teal-500 hover:text-teal-600'
                        }`}
                      >
                        <ArrowRight size={20} />
                      </button>
                    </div>
                  </div>

                  {/* Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {visibleCards.map((card) => (
                      <UniversalCardItem
                        key={card.id}
                        card={mapToUniversalCardInfo(card)}
                        onApply={handleApply}
                        onCompare={handleCompare}
                        isSelected={selectedCards.includes(card.id.toString())}
                      />
                    ))}
                  </div>

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

                  {/* Features Summary */}
                  <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-teal-50 border border-blue-100 rounded-lg">
                    <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                      <Target size={18} /> Why These Cards Match You
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="flex items-start gap-2">
                        <Building className="text-blue-600 shrink-0 mt-0.5" size={16} />
                        <div>
                          <div className="font-medium text-blue-800 text-sm">Bank Preference</div>
                          <div className="text-blue-700 text-xs">{bankName}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Globe className="text-teal-600 shrink-0 mt-0.5" size={16} />
                        <div>
                          <div className="font-medium text-teal-800 text-sm">Primary Purpose</div>
                          <div className="text-teal-700 text-xs">
                            {purpose ? PURPOSES.find(p => p.id === purpose)?.label : "All purposes"}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Award className="text-purple-600 shrink-0 mt-0.5" size={16} />
                        <div>
                          <div className="font-medium text-purple-800 text-sm">Selected Features</div>
                          <div className="text-purple-700 text-xs">
                            {selectedFeatures.length > 0 
                              ? selectedFeatures.map(f => FEATURES.find(fe => fe.id === f)?.label).join(', ')
                              : "All features considered"
                            }
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Lock className="text-green-600 shrink-0 mt-0.5" size={16} />
                        <div>
                          <div className="font-medium text-green-800 text-sm">Best Match</div>
                          <div className="text-green-700 text-xs font-bold">
                            {recommendedCards[0]?.name}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-white border-2 border-dashed border-gray-200 rounded-lg">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Search className="text-gray-400 w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-gray-600 mb-2">Tell Us What You Need</h3>
                <p className="text-gray-500 max-w-md mx-auto mb-4">
                  Select your preferred bank, primary purpose, and desired features to find debit cards that match your lifestyle.
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                  We'll show you multiple matching cards
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Compare features and apply instantly
                </div>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Debit Card Comparison Modal */}
      <DebitCardComparisonModal
        isOpen={showComparison}
        onClose={() => setShowComparison(false)}
        selectedCards={recommendedCards.filter(card => selectedCards.includes(card.id.toString())).map(mapToUniversalCardInfo)}
        allCards={recommendedCards.map(mapToUniversalCardInfo)}
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