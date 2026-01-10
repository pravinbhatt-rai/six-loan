'use client';
import React from 'react';
import { ArrowRight, LineChart, Lock, TrendingUp, CheckCircle } from 'lucide-react';

// --- IMAGE SELECTION ---
// Theme: Investor/Professional monitoring portfolio
const SECURITIES_IMAGE_URL = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop";

const AVATAR_1 = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64";
const AVATAR_2 = "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=64&h=64";
const AVATAR_3 = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=64&h=64";
const AVATAR_4 = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=64&h=64";

export const SecuritiesLoanHero: React.FC = () => {
  return (
    <div className="relative min-h-[800px] w-full flex items-center justify-center overflow-hidden font-sans bg-slate-50">
      
      {/* --- BACKGROUND: Teal Gradient Mesh --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Orbs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-200/40 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-100/60 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4"></div>
        
        {/* Geometric Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size:40px_40px"></div>
      </div>

      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-0 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* --- LEFT COLUMN: Content --- */}
          <div className="flex flex-col items-start space-y-6 lg:space-y-8 lg:order-1 lg:pt-0">
            
            {/* 1. Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 border border-teal-100 shadow-sm animate-fade-in-up">
              <span className="flex h-2 w-2 rounded-full bg-teal-500 animate-pulse"></span>
              <span className="text-teal-800 text-xs lg:text-sm font-semibold tracking-wide uppercase">
                Loan Against Securities
              </span>
            </div>

            {/* 2. Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif text-slate-900 leading-[1.1] tracking-tight">
              Get Cash, <br />
              <span className="text-teal-600 relative inline-block">
                Keep Growing
                {/* Underline SVG */}
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-teal-300 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
                </svg>
              </span>
            </h1>

            {/* 3. Description */}
            <p className="text-slate-600 text-lg md:text-xl max-w-lg leading-relaxed">
              Don't sell your investments. Pledge your <span className="font-semibold text-teal-700">Shares & Mutual Funds</span> to get an instant overdraft limit. Pay interest only on what you use.
            </p>

            {/* 4. Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button className="flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-lg shadow-teal-200 hover:shadow-teal-300 transform hover:-translate-y-1">
                Check My Limit
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <button className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 px-8 py-4 rounded-xl font-semibold border border-slate-200 shadow-sm transition-all hover:border-teal-200">
                <LineChart className="w-5 h-5 text-teal-500" />
                View Eligible Stocks
              </button>
            </div>

            {/* 5. Social Proof */}
            <div className="pt-6 border-t border-slate-200 w-full">
              <div className="flex items-center gap-6">
                <div className="flex -space-x-3">
                  {[AVATAR_1, AVATAR_2, AVATAR_3, AVATAR_4].map((src, i) => (
                    <img key={i} src={src} alt="Happy Investor" className="w-12 h-12 rounded-full border-2 border-white ring-1 ring-slate-100 object-cover" />
                  ))}
                  <div className="w-12 h-12 rounded-full bg-teal-600 border-2 border-white flex items-center justify-center text-xs font-bold text-white ring-1 ring-slate-100">
                    8k+
                  </div>
                </div>
                <div className="text-sm">
                   <p className="font-bold text-slate-900 text-lg">Zero Pre-payment</p>
                   <p className="text-slate-500">Charges on foreclosure</p>
                </div>
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: Visuals --- */}
          <div className="hidden lg:flex relative h-[700px] w-full items-center justify-center lg:order-2">
            
            {/* Main Image Container (Rotated & Bordered) */}
            <div className="relative z-10 w-full h-[90%] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-teal-900/10 rotate-1 border-8px border-white">
               <img 
                 src={SECURITIES_IMAGE_URL} 
                 alt="Investor analyzing portfolio" 
                 className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
               />
               <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent"></div>
            </div>

            {/* --- Floating Elements --- */}
            
            {/* Element 1: Limit Approved Alert */}
            <div className="absolute -left-8 top-24 z-20 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 animate-bounce-slow max-w-60">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-full text-green-600">
                   <Lock size={20} fill="currentColor" />
                </div>
                <div className="w-full">
                  <div className="flex justify-between items-center">
                    <p className="text-[10px] uppercase font-bold text-slate-400">Overdraft Limit</p>
                    <span className="text-[10px] text-green-600 font-bold">Active</span>
                  </div>
                  <p className="text-sm font-bold text-slate-800">Limit Unlocked</p>
                  <p className="text-xs font-bold text-teal-600">₹ 25,00,000</p>
                </div>
              </div>
            </div>

            {/* Element 2: Portfolio Health */}
            <div className="absolute -right-6 bottom-32 z-20 bg-white/95 backdrop-blur-sm p-5 rounded-2xl shadow-xl border border-slate-100 animate-float max-w-[220px]">
              <div className="space-y-4">
                {/* Visual 1: Portfolio Trend */}
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-teal-100 rounded-lg text-teal-600">
                     <TrendingUp size={18} />
                   </div>
                   <div className="w-full">
                     <p className="text-xs text-slate-500 font-medium">Portfolio Returns</p>
                     <div className="h-1.5 w-full bg-slate-100 rounded-full mt-1">
                        <div className="h-full bg-teal-500 w-full rounded-full"></div>
                     </div>
                   </div>
                   <CheckCircle size={16} className="text-green-500 shrink-0" />
                </div>
                
                {/* Visual 2: Ownership Status */}
                <div className="flex justify-between items-center bg-slate-50 p-2 rounded-lg">
                    <span className="text-xs text-slate-500">Ownership:</span>
                    <span className="text-sm font-bold text-slate-900 flex items-center gap-1">
                      100% Retained
                    </span>
                </div>
              </div>
            </div>

            {/* Decorative Dashed Background Shape */}
            <div className="absolute top-12 -right-12 w-full h-[90%] border-2 border-dashed border-teal-300 rounded-[2.5rem] -rotate-2 -z-10"></div>
            
          </div>

        </div>
      </div>
      
      {/* CSS Animations */}
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
};

export default SecuritiesLoanHero;