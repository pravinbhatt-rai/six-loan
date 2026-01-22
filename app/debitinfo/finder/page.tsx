"use client";
import React, { useState, useMemo } from 'react';
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

// --- 1. DATA ASSETS ---
const CARD_DATABASE = [
  {
    id: 'hdfc-mill',
    name: "Millennia Debit",
    bank: "HDFC Bank",
    tags: ["shopping", "cashback", "online"],
    perks: ["5% CashBack on PayZapp", "Domestic Lounge Access", "₹1000 Welcome Voucher"],
    img: "from-teal-600 to-teal-800",
    fee: "₹500/yr"
  },
  {
    id: 'sbi-plat',
    name: "Platinum Global",
    bank: "State Bank of India",
    tags: ["travel", "atm", "international"],
    perks: ["High ATM Withdrawal Limit", "Complimentary Insurance", "Global Acceptance"],
    img: "from-cyan-600 to-teal-700",
    fee: "₹300/yr"
  },
  {
    id: 'icici-coral',
    name: "Coral Plus",
    bank: "ICICI Bank",
    tags: ["dining", "movies", "lifestyle"],
    perks: ["BOGO Movie Tickets", "15% off Dining", "24/7 Concierge"],
    img: "from-emerald-500 to-teal-600",
    fee: "₹599/yr"
  },
  {
    id: 'axis-burg',
    name: "Burgundy World",
    bank: "Axis Bank",
    tags: ["premium", "travel", "golf"],
    perks: ["Zero Forex Markup", "Airport Concierge", "Golf Course Access"],
    img: "from-slate-800 to-teal-900",
    fee: "Nil (Priority Acct)"
  },
  {
    id: 'niyo-glob',
    name: "Niyo Global",
    bank: "SBM Bank",
    tags: ["travel", "international", "zero-forex"],
    perks: ["0% Forex Markup", "Worldwide Free Lounge", "Real-time Currency Converter"],
    img: "from-teal-400 to-blue-500",
    fee: "Lifetime Free"
  }
];

export default function CardDiscoveryCarousel() {
  const [stage, setStage] = useState('onboarding');
  const [formData, setFormData] = useState({
    bank: 'HDFC Bank',
    usage: [] as string[]
  });

  // --- COMPATIBILITY LOGIC ---
  const scoredCards = useMemo(() => {
    const scored = CARD_DATABASE.map(card => {
      let score = 0;
      if (card.bank === formData.bank) score += 20;
      const usageMatches = card.tags.filter(tag => formData.usage.includes(tag)).length;
      score += (usageMatches * 20);
      
      const matchPercent = Math.min(99, 65 + score);
      return { ...card, matchPercent };
    });
    return scored.sort((a, b) => b.matchPercent - a.matchPercent);
  }, [formData, stage]);

  const toggleUsage = (id: string) => {
    setFormData(prev => ({
      ...prev,
      usage: prev.usage.includes(id) ? prev.usage.filter((t: string) => t !== id) : [...prev.usage, id]
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-12">
      {/* Dynamic Navbar */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200 py-4 px-6">
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
      </nav>

      <main className="max-w-6xl mx-auto px-4 mt-8">
        {stage === 'onboarding' ? (
          <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="text-center mb-10">
              <h1 className="text-4xl font-black text-slate-900 mb-4">What's your spending style?</h1>
              <p className="text-slate-500 text-lg">We'll rank cards based on your unique profile.</p>
            </div>

            <div className="space-y-6">
              {/* Bank Selection */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <label className="flex items-center gap-2 text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">
                  <Landmark size={18} className="text-teal-500" /> Prefered Bank
                </label>
                <select 
                  value={formData.bank}
                  onChange={(e) => setFormData({...formData, bank: e.target.value})}
                  className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-teal-500 font-bold text-lg"
                >
                  <option>HDFC Bank</option>
                  <option>State Bank of India</option>
                  <option>ICICI Bank</option>
                  <option>Axis Bank</option>
                </select>
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

              <button 
                onClick={() => setStage('results')}
                className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-5 rounded-3xl shadow-xl shadow-teal-200 transition-all flex items-center justify-center gap-2 group"
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

            {/* SLEEK HORIZONTAL CAROUSEL */}
            <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide no-scrollbar">
              {scoredCards.map((card, idx) => (
                <div 
                  key={card.id} 
                  className="min-w-[85vw] md:min-w-[400px] snap-center bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden flex flex-col"
                >
                  {/* Card Header Visual */}
                  <div className={`h-56 bg-linear-to-br ${card.img} p-8 text-white relative flex flex-col justify-between`}>
                    <div className="flex justify-between items-start">
                      <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase border border-white/20">
                        {card.matchPercent}% Match
                      </div>
                      <CreditCard className="opacity-40" />
                    </div>
                    
                    <div>
                      <p className="text-xs font-bold opacity-70 uppercase tracking-[0.2em] mb-1">{card.bank}</p>
                      <h3 className="text-2xl font-black tracking-tight leading-tight">{card.name}</h3>
                    </div>

                    {/* Gloss effect */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                  </div>

                  {/* Card Details */}
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="flex-1 space-y-4 mb-8">
                      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Exclusive Benefits</h4>
                      {card.perks.map((perk, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <CheckCircle2 className="text-teal-500 shrink-0 mt-0.5" size={18} />
                          <span className="text-sm font-semibold text-slate-700">{perk}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between py-4 border-t border-slate-50 mb-6">
                      <div className="text-xs text-slate-400 font-bold uppercase tracking-widest">Annual Fee</div>
                      <div className="font-black text-slate-900">{card.fee}</div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-3 mt-auto">
                      <button className="flex items-center justify-center gap-2 py-4 px-4 rounded-2xl border-2 border-slate-100 text-slate-500 font-bold text-sm hover:bg-slate-50 transition">
                        <Info size={16} /> Details
                      </button>
                      <button className="flex items-center justify-center gap-2 py-4 px-4 rounded-2xl bg-teal-500 text-white font-bold text-sm hover:bg-teal-600 shadow-lg shadow-teal-100 transition">
                        Apply <ExternalLink size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Spacer for horizontal scroll padding */}
              <div className="min-w-px h-full invisible"></div>
            </div>
          </div>
        )}
      </main>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}