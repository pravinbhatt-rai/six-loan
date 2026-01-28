"use client";
import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { 
  Brain, 
  Sparkles, 
  TrendingUp, 
  DollarSign, 
  Plane, 
  Coffee, 
  Calendar, 
  Gift, 
  ArrowRight,
  CreditCard,
  Zap,
  ChevronDown
} from 'lucide-react';

// --- Types ---
interface Offer {
  merchant: string;
  offerType: string;
  title: string;
  description: string;
  offerValue: string;
  validFrom: string;
  validTill: string | null;
}

interface CardWithOffers {
  id: string;
  name: string;
  bankName: string;
  offers: Offer[];
  bestFor: string;
  cardType?: string;
  annualFee?: number;
  internationalUsage?: boolean;
  loungeAccess?: boolean;
}

export default function SmartSpendGuidePage() {
  const [selectedCategory, setSelectedCategory] = useState('cashback');
  const [creditCards, setCreditCards] = useState<CardWithOffers[]>([]);
  const [debitCards, setDebitCards] = useState<CardWithOffers[]>([]);
  const [loans, setLoans] = useState<CardWithOffers[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filter states
  const [selectedBanks, setSelectedBanks] = useState<string[]>([]);
  const [selectedCardTypes, setSelectedCardTypes] = useState<string[]>([]);
  const [selectedOfferTypes, setSelectedOfferTypes] = useState<string[]>([]);
  const [maxAnnualFee, setMaxAnnualFee] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // --- Fetch Data ---
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();

        if (!data.success) {
          console.error('Failed to fetch products:', data.error);
          return;
        }

        const creditCardsData: CardWithOffers[] = [];
        const debitCardsData: CardWithOffers[] = [];
        const loansData: CardWithOffers[] = [];

        // Process products from the combined API
        data.products.forEach((product: any) => {
          if (product.offers && product.offers.length > 0) {
              // Coerce annualFee to string if needed, then extract number
              const getAnnualFeeNumber = (fee: any): number => {
                if (fee === undefined || fee === null) return 0;
                if (typeof fee === 'number') return fee;
                if (typeof fee === 'string') {
                  const num = parseFloat(fee.replace(/[^\d.]/g, ''));
                  return isNaN(num) ? 0 : num;
                }
                return 0;
              };
              if (product.type === 'credit-card') {
                creditCardsData.push({
                  id: product.id,
                  name: product.name,
                  bankName: product.bankName,
                  offers: product.offers,
                  bestFor: product.bestFor,
                  cardType: 'credit',
                  annualFee: getAnnualFeeNumber(product.annualFee),
                  internationalUsage: product.internationalUsage,
                  loungeAccess: product.loungeAccess
                });
              } else if (product.type === 'debit-card') {
                debitCardsData.push({
                  id: product.id,
                  name: product.name,
                  bankName: product.bankName,
                  offers: product.offers,
                  bestFor: product.bestFor,
                  cardType: 'debit',
                  annualFee: getAnnualFeeNumber(product.annualFee),
                  internationalUsage: product.internationalUsage,
                  loungeAccess: product.loungeAccess
                });
              } else if (product.type === 'loan') {
                loansData.push({
                  id: product.id,
                  name: product.name,
                  bankName: product.bankName,
                  offers: product.offers,
                  bestFor: product.loanType,
                  cardType: 'loan',
                  annualFee: 0, // Loans don't have annual fees
                  internationalUsage: false,
                  loungeAccess: false
                });
              }
          }
        });

        setCreditCards(creditCardsData);
        setDebitCards(debitCardsData);
        setLoans(loansData);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  // --- Logic ---
  const creditCardOffers = useMemo(() => {
    const categoryMappings = {
      cashback: ['cashback', 'reward', 'cash back', 'amazon', 'flipkart', 'swiggy', 'zomato'],
      'zero-fee': ['zero fee', 'free', 'no annual fee', 'lifetime free'],
      international: ['international', 'forex', 'travel'],
      'lounge-access': ['lounge', 'airport', 'priority pass']
    };

    const relevantKeywords = categoryMappings[selectedCategory as keyof typeof categoryMappings] || [];
    const matchingOffers: Array<{offer: Offer, card: CardWithOffers}> = [];

    creditCards.forEach(card => {
       // Apply filters
       if (selectedBanks.length > 0 && !selectedBanks.includes(card.bankName)) return;
       if (selectedCardTypes.length > 0 && card.cardType && !selectedCardTypes.includes(card.cardType)) return;
       if (maxAnnualFee !== null && (card.annualFee || 0) > maxAnnualFee) return;

       card.offers.forEach(offer => {
         // Apply offer type filter
         if (selectedOfferTypes.length > 0 && !selectedOfferTypes.includes(offer.offerType)) return;
         
         matchingOffers.push({ offer, card });
       });
    });

    return matchingOffers.sort(() => 0.5 - Math.random()).slice(0, 6); // Random shuffle
  }, [creditCards, selectedCategory, selectedBanks, selectedCardTypes, selectedOfferTypes, maxAnnualFee]);

  const debitCardOffers = useMemo(() => {
    const categoryMappings = {
      cashback: ['cashback', 'reward', 'cash back', 'amazon', 'flipkart', 'swiggy', 'zomato'],
      'zero-fee': ['zero fee', 'free', 'no annual fee', 'lifetime free'],
      international: ['international', 'forex', 'travel'],
      'lounge-access': ['lounge', 'airport', 'priority pass']
    };

    const relevantKeywords = categoryMappings[selectedCategory as keyof typeof categoryMappings] || [];
    const matchingOffers: Array<{offer: Offer, card: CardWithOffers}> = [];

    debitCards.forEach(card => {
       // Apply filters
       if (selectedBanks.length > 0 && !selectedBanks.includes(card.bankName)) return;
       if (selectedCardTypes.length > 0 && card.cardType && !selectedCardTypes.includes(card.cardType)) return;
       if (maxAnnualFee !== null && (card.annualFee || 0) > maxAnnualFee) return;

       card.offers.forEach(offer => {
         // Apply offer type filter
         if (selectedOfferTypes.length > 0 && !selectedOfferTypes.includes(offer.offerType)) return;
         
         matchingOffers.push({ offer, card });
       });
    });

    return matchingOffers.sort(() => 0.5 - Math.random()).slice(0, 6); // Random shuffle
  }, [debitCards, selectedCategory, selectedBanks, selectedCardTypes, selectedOfferTypes, maxAnnualFee]);

  const loanOffers = useMemo(() => {
    const categoryMappings = {
      cashback: ['cashback', 'reward', 'cash back', 'amazon', 'flipkart', 'swiggy', 'zomato'],
      'zero-fee': ['zero fee', 'free', 'no annual fee', 'lifetime free'],
      international: ['international', 'forex', 'travel'],
      'lounge-access': ['lounge', 'airport', 'priority pass']
    };

    const relevantKeywords = categoryMappings[selectedCategory as keyof typeof categoryMappings] || [];
    const matchingOffers: Array<{offer: Offer, card: CardWithOffers}> = [];

    loans.forEach(loan => {
       // Apply filters
       if (selectedBanks.length > 0 && !selectedBanks.includes(loan.bankName)) return;
       if (selectedCardTypes.length > 0 && loan.cardType && !selectedCardTypes.includes(loan.cardType)) return;
       // Skip annual fee filter for loans

       loan.offers.forEach(offer => {
         // Apply offer type filter
         if (selectedOfferTypes.length > 0 && !selectedOfferTypes.includes(offer.offerType)) return;
         
         matchingOffers.push({ offer, card: loan });
       });
    });

    return matchingOffers.sort(() => 0.5 - Math.random()).slice(0, 6); // Random shuffle
  }, [loans, selectedCategory, selectedBanks, selectedCardTypes, selectedOfferTypes]);

  const categories = [
    {
      id: 'cashback',
      title: 'Cashback & Rewards',
      icon: <DollarSign className="w-5 h-5" />,
      desc: 'Max savings on daily spends',
    },
    {
      id: 'zero-fee',
      title: 'Zero Annual Fee',
      icon: <Zap className="w-5 h-5" />,
      desc: 'Free for life cards',
    },
    {
      id: 'international',
      title: 'International',
      icon: <Plane className="w-5 h-5" />,
      desc: 'Low forex markup',
    },
    {
      id: 'lounge-access',
      title: 'Lounge Access',
      icon: <Coffee className="w-5 h-5" />,
      desc: 'VIP Airport comfort',
    }
  ];

  const currentCategoryInfo = categories.find(cat => cat.id === selectedCategory);

  // Filter options
  const bankOptions = useMemo(() => {
    const banks = new Set([...creditCards, ...debitCards, ...loans].map(card => card.bankName));
    return Array.from(banks).sort();
  }, [creditCards, debitCards, loans]);

  const cardTypeOptions = useMemo(() => {
    const types = new Set([...creditCards, ...debitCards, ...loans].map(card => card.cardType).filter((type): type is string => type !== undefined));
    return Array.from(types).sort();
  }, [creditCards, debitCards, loans]);

  const offerTypeOptions = useMemo(() => {
    const types = new Set();
    [...creditCards, ...debitCards, ...loans].forEach(card => {
      card.offers.forEach(offer => types.add(offer.offerType));
    });
    return Array.from(types).sort() as string[];
  }, [creditCards, debitCards, loans]);

  // Filter handlers
  const toggleBank = (bank: string) => {
    setSelectedBanks(prev => 
      prev.includes(bank) 
        ? prev.filter(b => b !== bank) 
        : [...prev, bank]
    );
  };

  const toggleCardType = (type: string) => {
    setSelectedCardTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type) 
        : [...prev, type]
    );
  };

  const toggleOfferType = (type: string) => {
    setSelectedOfferTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type) 
        : [...prev, type]
    );
  };

  const clearAllFilters = () => {
    setSelectedBanks([]);
    setSelectedCardTypes([]);
    setSelectedOfferTypes([]);
    setMaxAnnualFee(null);
  };

  // --- Render ---
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading smart spending recommendations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-teal-500 selection:text-white">
      
      {/* --- HERO SECTION --- */}
      <div className="relative bg-slate-900 pb-32 pt-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-600/10 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8 font-medium">
            <Link href="/" className="hover:text-teal-400 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/debitinfo" className="hover:text-teal-400 transition-colors">Cards</Link>
            <span>/</span>
            <span className="text-teal-500">Spend Guide</span>
          </nav>

          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700 text-teal-400 text-sm font-bold mb-6 backdrop-blur-md shadow-lg">
              <Sparkles className="w-4 h-4" />
              <span>AI-Powered Recommendations</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6 leading-tight">
              Smart <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">Spend Guide</span>
            </h1>
            
            <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">
              Stop guessing. We analyze hundreds of debit cards daily to find you the best rewards, cashback, and offers for your specific needs.
            </p>
          </div>
        </div>
      </div>

      {/* --- FLOATING CATEGORY SELECTOR --- */}
      <div className="relative z-20 -mt-20 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200/50 p-3 sm:p-4 border border-slate-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`relative group flex flex-col items-center justify-center p-4 rounded-2xl transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/30 translate-y-0'
                    : 'bg-slate-50 text-slate-600 hover:bg-teal-50 hover:text-teal-600'
                }`}
              >
                <div className={`mb-2 p-2 rounded-xl ${selectedCategory === category.id ? 'bg-white/20' : 'bg-white shadow-sm group-hover:scale-110 transition-transform'}`}>
                  {category.icon}
                </div>
                <span className="text-sm font-bold">{category.title}</span>
                <span className={`text-[10px] mt-1 opacity-80 ${selectedCategory === category.id ? 'text-teal-50' : 'text-slate-400'}`}>
                  {category.desc}
                </span>
                
                {/* Active Indicator Dot */}
                {selectedCategory === category.id && (
                  <span className="absolute -bottom-2 w-12 h-1 bg-teal-500 rounded-t-full hidden md:block"></span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between hover:border-teal-300 transition-colors"
          >
            <span className="font-semibold text-slate-900">Filters</span>
            <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
          
          {showFilters && (
            <div className="mt-4 bg-white border border-slate-200 rounded-xl p-4 space-y-6">
              {/* Mobile Filters Content */}
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Banks</h3>
                <div className="space-y-2">
                  {bankOptions.map(bank => (
                    <label key={bank} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedBanks.includes(bank)}
                        onChange={() => toggleBank(bank)}
                        className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                      />
                      <span className="ml-2 text-sm text-slate-700">{bank}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Card Types</h3>
                <div className="space-y-2">
                  {cardTypeOptions.map(type => (
                    <label key={type} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedCardTypes.includes(type)}
                        onChange={() => toggleCardType(type)}
                        className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                      />
                      <span className="ml-2 text-sm text-slate-700 capitalize">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Offer Types</h3>
                <div className="space-y-2">
                  {offerTypeOptions.map(type => (
                    <label key={type} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedOfferTypes.includes(type)}
                        onChange={() => toggleOfferType(type)}
                        className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                      />
                      <span className="ml-2 text-sm text-slate-700">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Max Annual Fee</h3>
                <select
                  value={maxAnnualFee || ''}
                  onChange={(e) => setMaxAnnualFee(e.target.value ? parseInt(e.target.value) : null)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                >
                  <option value="">Any</option>
                  <option value="0">Free</option>
                  <option value="500">₹500</option>
                  <option value="1000">₹1,000</option>
                  <option value="2000">₹2,000</option>
                </select>
              </div>

              <button
                onClick={clearAllFilters}
                className="w-full bg-slate-100 text-slate-700 py-2 rounded-lg hover:bg-slate-200 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar Filters */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white border border-slate-200 rounded-xl p-6 sticky top-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-bold text-slate-900">Filters</h2>
                {(selectedBanks.length > 0 || selectedCardTypes.length > 0 || selectedOfferTypes.length > 0 || maxAnnualFee !== null) && (
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-teal-600 hover:text-teal-700 font-medium"
                  >
                    Clear all
                  </button>
                )}
              </div>

              <div className="space-y-6">
                {/* Banks Filter */}
                <div>
                  <h3 className="font-semibold text-slate-900 mb-3">Banks</h3>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {bankOptions.map(bank => (
                      <label key={bank} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedBanks.includes(bank)}
                          onChange={() => toggleBank(bank)}
                          className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                        />
                        <span className="ml-2 text-sm text-slate-700">{bank}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Card Types Filter */}
                <div>
                  <h3 className="font-semibold text-slate-900 mb-3">Card Types</h3>
                  <div className="space-y-2">
                    {cardTypeOptions.map(type => (
                      <label key={type} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedCardTypes.includes(type)}
                          onChange={() => toggleCardType(type)}
                          className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                        />
                        <span className="ml-2 text-sm text-slate-700 capitalize">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Offer Types Filter */}
                <div>
                  <h3 className="font-semibold text-slate-900 mb-3">Offer Types</h3>
                  <div className="space-y-2">
                    {offerTypeOptions.map(type => (
                      <label key={type} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedOfferTypes.includes(type)}
                          onChange={() => toggleOfferType(type)}
                          className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                        />
                        <span className="ml-2 text-sm text-slate-700">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Annual Fee Filter */}
                <div>
                  <h3 className="font-semibold text-slate-900 mb-3">Max Annual Fee</h3>
                  <select
                    value={maxAnnualFee || ''}
                    onChange={(e) => setMaxAnnualFee(e.target.value ? parseInt(e.target.value) : null)}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  >
                    <option value="">Any</option>
                    <option value="0">Free</option>
                    <option value="500">₹500</option>
                    <option value="1000">₹1,000</option>
                    <option value="2000">₹2,000</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              Today's Top <span className="text-teal-600">{currentCategoryInfo?.title}</span> Picks
            </h2>
            <p className="text-slate-500 text-sm mt-1">Updated {new Date().toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
          </div>
          <Link href="/debitinfo/finder" className="group flex items-center gap-2 text-sm font-bold text-teal-600 hover:text-teal-700 transition-colors">
            View All Cards 
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* --- CREDIT CARD OFFERS --- */}
        {loading ? (
          // Skeleton Loading State
          <div className="mb-12">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Credit Card Offers</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 h-64 animate-pulse flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl"></div>
                    <div className="h-6 w-3/4 bg-slate-100 rounded"></div>
                    <div className="h-4 w-1/2 bg-slate-100 rounded"></div>
                  </div>
                  <div className="h-10 w-full bg-slate-100 rounded-xl"></div>
                </div>
              ))}
            </div>
          </div>
        ) : creditCardOffers.length > 0 ? (
          <div className="mb-12">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-teal-600" />
              Credit Card Offers
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {creditCardOffers.map(({ offer, card }, index) => (
                <div 
                  key={`credit-${card.id}-${index}`} 
                  className="group relative bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-teal-100/50 transition-all duration-300 overflow-hidden flex flex-col hover:-translate-y-1"
                >
                  {/* Decorative Gradient Header */}
                  <div className="h-24 bg-gradient-to-r from-teal-600 to-emerald-600 p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl translate-x-10 -translate-y-10 group-hover:bg-white/30 transition-colors"></div>
                    <div className="relative z-10 flex justify-between items-start">
                      <div>
                          <div className="text-white/80 text-xs font-bold uppercase tracking-wider mb-1">{card.bankName}</div>
                          <h3 className="text-white font-bold text-lg leading-tight truncate w-48">{card.name}</h3>
                      </div>
                      <CreditCard className="text-white/80 group-hover:text-white transition-colors" />
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="mb-6">
                      <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center shrink-0">
                              <Gift className="w-5 h-5 text-teal-600" />
                          </div>
                          <div>
                              <div className="text-sm text-slate-500">{offer.merchant}</div>
                              <div className="font-bold text-slate-900">{offer.offerType}</div>
                          </div>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                          <p className="text-sm text-slate-700 font-medium line-clamp-2">{offer.title} {offer.description}</p>
                      </div>
                    </div>

                    <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div>
                          <div className="text-xs text-slate-400 uppercase font-bold">Value</div>
                          <div className="text-2xl font-black text-teal-600">{offer.offerValue}</div>
                      </div>
                      
                      {offer.validTill && (
                        <div className="text-right">
                          <div className="flex items-center justify-end gap-1 text-xs text-slate-400 mb-0.5">
                              <Calendar className="w-3 h-3" /> Valid till
                          </div>
                          <div className="text-xs font-bold text-slate-700">
                               {new Date(offer.validTill).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Hover Apply Overlay */}
                  <div className="absolute inset-0 bg-teal-900/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <button className="bg-white text-teal-600 font-bold py-3 px-8 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-xl">
                          View Details
                      </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {/* --- DEBIT CARD OFFERS --- */}
        {loading ? (
          // Skeleton Loading State
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-6">Debit Card Offers</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 h-64 animate-pulse flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl"></div>
                    <div className="h-6 w-3/4 bg-slate-100 rounded"></div>
                    <div className="h-4 w-1/2 bg-slate-100 rounded"></div>
                  </div>
                  <div className="h-10 w-full bg-slate-100 rounded-xl"></div>
                </div>
              ))}
            </div>
          </div>
        ) : debitCardOffers.length > 0 ? (
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-blue-600" />
              Debit Card Offers
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {debitCardOffers.map(({ offer, card }, index) => (
                <div 
                  key={`debit-${card.id}-${index}`} 
                  className="group relative bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-blue-100/50 transition-all duration-300 overflow-hidden flex flex-col hover:-translate-y-1"
                >
                  {/* Decorative Gradient Header */}
                  <div className="h-24 bg-gradient-to-r from-blue-600 to-indigo-600 p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl translate-x-10 -translate-y-10 group-hover:bg-white/30 transition-colors"></div>
                    <div className="relative z-10 flex justify-between items-start">
                      <div>
                          <div className="text-white/80 text-xs font-bold uppercase tracking-wider mb-1">{card.bankName}</div>
                          <h3 className="text-white font-bold text-lg leading-tight truncate w-48">{card.name}</h3>
                      </div>
                      <CreditCard className="text-white/80 group-hover:text-white transition-colors" />
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="mb-6">
                      <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                              <Gift className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                              <div className="text-sm text-slate-500">{offer.merchant}</div>
                              <div className="font-bold text-slate-900">{offer.offerType}</div>
                          </div>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                          <p className="text-sm text-slate-700 font-medium line-clamp-2">{offer.title} {offer.description}</p>
                      </div>
                    </div>

                    <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div>
                          <div className="text-xs text-slate-400 uppercase font-bold">Value</div>
                          <div className="text-2xl font-black text-blue-600">{offer.offerValue}</div>
                      </div>
                      
                      {offer.validTill && (
                        <div className="text-right">
                          <div className="flex items-center justify-end gap-1 text-xs text-slate-400 mb-0.5">
                              <Calendar className="w-3 h-3" /> Valid till
                          </div>
                          <div className="text-xs font-bold text-slate-700">
                               {new Date(offer.validTill).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Hover Apply Overlay */}
                  <div className="absolute inset-0 bg-blue-900/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <button className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-xl">
                          View Details
                      </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-slate-100">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No specific offers found</h3>
            <p className="text-slate-500">We couldn't find matches for this category today. Try exploring other categories!</p>
          </div>
        )}

        {/* --- LOAN OFFERS --- */}
        {loading ? (
          // Skeleton Loading State
          <div className="mt-12">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Loan Offers</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 h-64 animate-pulse flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl"></div>
                    <div className="h-6 w-3/4 bg-slate-100 rounded"></div>
                    <div className="h-4 w-1/2 bg-slate-100 rounded"></div>
                  </div>
                  <div className="h-10 w-full bg-slate-100 rounded-xl"></div>
                </div>
              ))}
            </div>
          </div>
        ) : loanOffers.length > 0 ? (
          <div className="mt-12">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Loan Offers
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loanOffers.map(({ offer, card }, index) => (
                <div 
                  key={`loan-${card.id}-${index}`} 
                  className="group relative bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-green-100/50 transition-all duration-300 overflow-hidden flex flex-col hover:-translate-y-1"
                >
                  {/* Decorative Gradient Header */}
                  <div className="h-24 bg-gradient-to-r from-green-600 to-emerald-600 p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl translate-x-10 -translate-y-10 group-hover:bg-white/30 transition-colors"></div>
                    <div className="relative z-10 flex justify-between items-start">
                      <div>
                          <div className="text-white/80 text-xs font-bold uppercase tracking-wider mb-1">{card.bankName}</div>
                          <h3 className="text-white font-bold text-lg leading-tight truncate w-48">{card.name}</h3>
                      </div>
                      <TrendingUp className="text-white/80 group-hover:text-white transition-colors" />
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="mb-6">
                      <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                              <Gift className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                              <div className="text-sm text-slate-500">{offer.merchant}</div>
                              <div className="font-bold text-slate-900">{offer.offerType}</div>
                          </div>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                          <p className="text-sm text-slate-700 font-medium line-clamp-2">{offer.title} {offer.description}</p>
                      </div>
                    </div>

                    <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div>
                          <div className="text-xs text-slate-400 uppercase font-bold">Value</div>
                          <div className="text-2xl font-black text-green-600">{offer.offerValue}</div>
                      </div>
                      
                      {offer.validTill && (
                        <div className="text-right">
                          <div className="flex items-center justify-end gap-1 text-xs text-slate-400 mb-0.5">
                              <Calendar className="w-3 h-3" /> Valid till
                          </div>
                          <div className="text-xs font-bold text-slate-700">
                               {new Date(offer.validTill).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Hover Apply Overlay */}
                  <div className="absolute inset-0 bg-green-900/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <button className="bg-white text-green-600 font-bold py-3 px-8 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-xl">
                          View Details
                      </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {/* --- HOW IT WORKS SECTION --- */}
        <div className="mt-24 border-t border-slate-200 pt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why use Smart Spend?</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">We use advanced algorithms to categorize and rank cards so you don't have to read the fine print.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: <Brain className="w-6 h-6 text-white" />, 
                title: "AI Analysis", 
                desc: "Real-time scanning of bank websites for hidden gems." 
              },
              { 
                icon: <TrendingUp className="w-6 h-6 text-white" />, 
                title: "Maximum Yield", 
                desc: "We calculate the exact monetary value of reward points." 
              },
              { 
                icon: <DollarSign className="w-6 h-6 text-white" />, 
                title: "Zero Bias", 
                desc: "Recommendations based purely on math, not sponsorships." 
              }
            ].map((feature, i) => (
              <div key={i} className="group p-6 rounded-3xl bg-white border border-slate-100 hover:border-teal-100 hover:shadow-xl hover:shadow-teal-100/50 transition-all text-center">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-teal-500/30 mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
        
        </div> {/* Close main content div */}
        
      </div> {/* Close main container */}
      </div> {/* Close another container */}
    </div>
  );
}