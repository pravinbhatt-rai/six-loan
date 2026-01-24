"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Search, Wallet, Gift, Shield, MapPin, TrendingUp, CreditCard,
  Award, Zap, ChevronRight, Star, ArrowRight, CheckCircle2,
  ShieldCheck, Check, CheckCircle
} from 'lucide-react';
import { API_BASE_URL } from '@/lib/api';

export default function DebitInfoPage() {
  const [debitCards, setDebitCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDebitCards = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/debit-cards?limit=6`);
        if (response.ok) {
          const data = await response.json();
          setDebitCards(data.products || []);
        }
      } catch (error) {
        console.error('Failed to fetch debit cards:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDebitCards();
  }, []);

  const categories = [
    { title: 'Best Debit Cards', description: 'Top-rated cards for 2026', icon: Award, href: '/debitinfo/best-debit-cards', color: 'text-teal-600', bg: 'bg-teal-50' },
    { title: 'Zero Fee Cards', description: 'No maintenance or hidden costs', icon: Zap, href: '/debitinfo/zero-fee', color: 'text-amber-600', bg: 'bg-amber-50' },
    { title: 'Cashback Cards', description: 'Earn while you spend', icon: Gift, href: '/debitinfo/cashback', color: 'text-purple-600', bg: 'bg-purple-50' },
    { title: 'Travel & Forex', description: 'Global acceptance, low markup', icon: TrendingUp, href: '/debitinfo/international', color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Lounge Access', description: 'Premium airport perks', icon: CreditCard, href: '/debitinfo/lounge-access', color: 'text-rose-600', bg: 'bg-rose-50' },
    { title: 'Safety & Security', description: 'Advanced fraud protection', icon: Shield, href: '/debitinfo/safety', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased">

      {/* --- MODERN HERO SECTION --- */}
      <section className="relative min-h-[650px] lg:min-h-[700px] w-full flex items-center justify-center overflow-hidden bg-slate-50">

        {/* Background Mesh & Grid (STRICT TEAL) */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[400px] lg:w-[600px] h-[400px] lg:h-[600px] bg-teal-200/40 rounded-full blur-[100px] lg:blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-[300px] lg:w-[500px] h-[300px] lg:h-[500px] bg-teal-100/60 rounded-full blur-[80px] lg:blur-[100px] translate-y-1/3 -translate-x-1/4"></div>
          {/* Geometric Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[40px_40px]"></div>
        </div>

        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-0 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

            {/* LEFT COLUMN: Text Content */}
            <div className="flex flex-col items-start space-y-6 lg:space-y-8 lg:order-1">

              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 border border-teal-100 shadow-sm">
                <span className="flex h-2 w-2 rounded-full bg-teal-500 animate-pulse"></span>
                <span className="text-teal-800 text-xs lg:text-sm font-semibold tracking-wide uppercase">
                  Live: Best Debit Card Deals Jan 2026
                </span>
              </div>

              {/* SVG Underlined Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-slate-900 leading-[1.1]">
                Elevate Your <br />
                <span className="text-teal-600 relative inline-block">
                  Banking Experience
                  <svg className="absolute w-full h-3 -bottom-1 left-0 text-teal-300 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
                  </svg>
                </span>
              </h1>

              <p className="text-base lg:text-lg text-slate-600 max-w-lg leading-relaxed">
                Don't settle for basic. Compare 50+ premium debit cards featuring zero forex markup, unlimited lounge access, and up to 5% cashback.
              </p>

              {/* Feature Pills */}
              <div className="flex flex-wrap gap-2">
                {['No Hidden Fees', 'RBI Verified', '100% Unbiased'].map((benefit, i) => (
                  <span key={i} className="inline-flex items-center px-3 py-1 rounded-lg bg-white border border-slate-200 text-slate-600 text-sm font-medium shadow-sm">
                    <Check className="w-3 h-3 text-teal-500 mr-2" strokeWidth={3} />
                    {benefit}
                  </span>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Link href="/debitcard" className="flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-lg shadow-teal-200 hover:shadow-teal-300 transform hover:-translate-y-1">
                  Find My Card <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/debitinfo/finder" className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 px-8 py-4 rounded-xl font-semibold border border-slate-200 shadow-sm transition-all hover:border-teal-200">
                  <Wallet className="w-5 h-5 text-teal-500" />
                  How it Works
                </Link>
              </div>

              {/* Social Proof */}
              <div className="pt-6 border-t border-slate-200 w-full">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map((i) => (
                      <img key={i} src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 456}`} alt="User" className="w-10 h-10 rounded-full border-2 border-white ring-1 ring-slate-100 bg-slate-100" />
                    ))}
                  </div>
                  <div className="text-sm">
                    <p className="font-bold text-slate-900">25,000+ Smart Savers</p>
                    <p className="text-slate-500">Rated 4.9/5 for Comparison Accuracy</p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Visuals */}
            <div className="hidden lg:flex relative h-[650px] w-full items-center justify-center lg:order-2">

              {/* Main Image Container */}
              <div className="relative z-10 w-full h-[480px] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-teal-900/10 rotate-1 border-[6px] border-white group">
                <img
                  src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070&auto=format&fit=crop"
                  alt="Premium Debit Card"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Floating Alert 1: Top Left */}
              <div className="absolute -left-6 top-16 z-20 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 animate-bounce-slow max-w-60">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-full text-green-600">
                    <Zap size={20} fill="currentColor" />
                  </div>
                  <div className="w-full">
                    <div className="flex justify-between items-center">
                      <p className="text-[10px] uppercase font-bold text-slate-400">Reward Alert</p>
                      <span className="text-[10px] text-slate-400">Now</span>
                    </div>
                    <p className="text-sm font-bold text-slate-800">Points Credited</p>
                    <p className="text-xs font-bold text-teal-600">+ 5,000 Milestone Bonus</p>
                  </div>
                </div>
              </div>

              {/* Floating Alert 2: Bottom Right */}
              <div className="absolute -right-4 bottom-20 z-20 bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-xl border border-slate-100 animate-float w-[240px]">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-teal-100 rounded-lg text-teal-600">
                      <ShieldCheck size={16} />
                    </div>
                    <div className="w-full">
                      <p className="text-xs text-slate-500 font-semibold uppercase">Security Status</p>
                      <p className="text-sm font-bold text-slate-900">Encrypted & Secure</p>
                    </div>
                    <CheckCircle size={14} className="text-green-500 shrink-0" />
                  </div>

                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-teal-500 h-full w-[100%] rounded-full"></div>
                  </div>
                  <div className="flex justify-between text-[10px] font-medium text-slate-400">
                    <span>Live Protection</span>
                    <span className="text-teal-600">Shield On</span>
                  </div>
                </div>
              </div>

              {/* Decorative Background Shape */}
              <div className="absolute top-10 -right-10 w-full h-[480px] border-2 border-dashed border-teal-300 rounded-[2.5rem] -rotate-2 -z-10"></div>
            </div>

          </div>
        </div>
      </section>

      {/* --- QUICK TOOLS GRID --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'Card Finder', icon: Search, href: '/debitinfo/finder' },
            { title: 'Live Offers', icon: Gift, href: '/debitinfo/offers' },
            { title: 'ATM Finder', icon: MapPin, href: '/debitinfo/atm-finder' },
            { title: 'Upgrade', icon: TrendingUp, href: '/debitinfo/upgrade' },
          ].map((tool) => (
            <Link href={tool.href} key={tool.title} className="group">
              <div className="bg-white p-6 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 group-hover:border-teal-500/30 transition-all text-center">
                <div className="inline-flex p-3 rounded-xl bg-teal-50 text-teal-600 mb-3 group-hover:scale-110 transition-transform">
                  <tool.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 block">{tool.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Categories Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Browse by Category</h2>
            <p className="text-slate-500 mt-2">Tailored selections for every lifestyle.</p>
          </div>
          <Link href="/categories" className="text-teal-600 font-semibold flex items-center gap-1 hover:gap-2 transition-all">
            View all categories <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link href={cat.href} key={cat.title} className="group relative bg-white p-8 rounded-2xl border border-slate-200 hover:shadow-2xl hover:shadow-teal-500/5 transition-all overflow-hidden">
              <div className={`inline-flex p-4 rounded-2xl ${cat.bg} ${cat.color} mb-6`}>
                <cat.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{cat.title}</h3>
              <p className="text-slate-500 leading-relaxed">{cat.description}</p>
              <div className="absolute bottom-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                <ChevronRight className="w-8 h-8 text-teal-500" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Cards Section */}
      <div className="bg-slate-100 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Featured Debit Cards</h2>
            <p className="text-slate-500 mt-4">Handpicked for exceptional value and security.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              [1, 2, 3].map((i) => <div key={i} className="h-80 bg-white rounded-3xl animate-pulse" />)
            ) : (
              debitCards.map((card) => (
                <Link href={`/debitcard/${card.slug}`} key={card.id} className="group">
                  <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-teal-500/20">
                    <div className="relative h-48 overflow-hidden bg-slate-200">
                      {card.imageUrl ? (
                        <img src={card.imageUrl} alt={card.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                          <Wallet className="w-12 h-12 text-slate-700" />
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-xs font-bold text-teal-600 uppercase tracking-wider mb-1">{card.bankName}</p>
                          <h3 className="text-lg font-bold text-slate-900 line-clamp-1">{card.name}</h3>
                        </div>
                        <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span className="text-xs font-bold text-amber-700">{card.rating?.toFixed(1)}</span>
                        </div>
                      </div>
                      <hr className="my-4 border-slate-100" />
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-500">Annual Fee</span>
                        <span className={`text-sm font-bold ${card.annualFee === 0 ? 'text-green-600' : 'text-slate-900'}`}>
                          {card.annualFee === 0 ? 'FREE' : `₹${card.annualFee}`}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Global CSS for Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(8px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}