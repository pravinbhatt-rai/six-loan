'use client';
import React from 'react';
import { ArrowRight, ArrowRightLeft, PiggyBank, TrendingDown, CheckCircle, Percent } from 'lucide-react';

// --- IMAGE OPTIONS (Uncomment the one you want to use) ---

// OPTION 1: Couple celebrating a financial win/successful switch (Current Selection)
const TRANSFER_IMAGE_URL = "https://images.unsplash.com/photo-1529335764857-3f1164d1cb24?q=80&w=1976&auto=format&fit=crop";

// OPTION 2: Relaxed person enjoying peace of mind at home
// const TRANSFER_IMAGE_URL = "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=2070&auto=format&fit=crop";

// OPTION 3: Family enjoying home life with less financial stress
// const TRANSFER_IMAGE_URL = "https://images.unsplash.com/photo-1581578017093-cd30794c9b1b?q=80&w=2070&auto=format&fit=crop";


const AVATAR_1 = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64";
const AVATAR_2 = "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=64&h=64";
const AVATAR_3 = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=64&h=64";
const AVATAR_4 = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=64&h=64";

export const TransferHero: React.FC = () => {
  return (
    <div className="relative min-h-[800px] w-full flex items-center justify-center overflow-hidden font-sans bg-slate-50">
      
      {/* --- BACKGROUND: Cyan/Green Gradient Mesh (Signifying Growth/Savings) --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Orbs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-200/40 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-100/60 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4"></div>
        
        {/* Geometric Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-0 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* --- LEFT COLUMN: Content --- */}
          <div className="flex flex-col items-start space-y-6 lg:space-y-8 lg:order-1 lg:pt-0">
            
            {/* 1. Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-50 border border-cyan-100 shadow-sm animate-fade-in-up">
              <span className="flex h-2 w-2 rounded-full bg-cyan-500 animate-pulse"></span>
              <span className="text-cyan-800 text-xs lg:text-sm font-semibold tracking-wide uppercase">
                Balance Transfer Special
              </span>
            </div>

            {/* 2. Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif text-slate-900 leading-[1.1] tracking-tight">
              Switch to <br />
              <span className="text-cyan-600 relative inline-block">
                Lower Rates
                {/* Underline SVG */}
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-cyan-300 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
                </svg>
              </span>
            </h1>

            {/* 3. Description */}
            <p className="text-slate-600 text-lg md:text-xl max-w-lg leading-relaxed">
              Stop overpaying on your home loan. Transfer your balance to us at <span className="font-semibold text-cyan-700">8.50% p.a.</span> and reduce your monthly EMI burden instantly.
            </p>

            {/* 4. Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button className="flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-lg shadow-cyan-200 hover:shadow-cyan-300 transform hover:-translate-y-1">
                Transfer Now
                <ArrowRightLeft className="w-5 h-5" />
              </button>
              
              <button className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 px-8 py-4 rounded-xl font-semibold border border-slate-200 shadow-sm transition-all hover:border-cyan-200">
                <PiggyBank className="w-5 h-5 text-cyan-500" />
                Calculate Savings
              </button>
            </div>

            {/* 5. Social Proof */}
            <div className="pt-6 border-t border-slate-200 w-full">
              <div className="flex items-center gap-6">
                <div className="flex -space-x-3">
                  {[AVATAR_1, AVATAR_2, AVATAR_3, AVATAR_4].map((src, i) => (
                    <img key={i} src={src} alt="Happy Saver" className="w-12 h-12 rounded-full border-2 border-white ring-1 ring-slate-100 object-cover" />
                  ))}
                  <div className="w-12 h-12 rounded-full bg-cyan-600 border-2 border-white flex items-center justify-center text-xs font-bold text-white ring-1 ring-slate-100">
                    2k+
                  </div>
                </div>
                <div className="text-sm">
                   <p className="font-bold text-slate-900 text-lg">₹ 10Cr+ Saved</p>
                   <p className="text-slate-500">In interest payments this year</p>
                </div>
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: Visuals --- */}
          <div className="hidden lg:flex relative h-[700px] w-full items-center justify-center lg:order-2">
            
            {/* Main Image Container (Rotated & Bordered) */}
            <div className="relative z-10 w-full h-[90%] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-cyan-900/10 rotate-1 border-[8px] border-white">
               <img 
                 src={TRANSFER_IMAGE_URL} 
                 alt="Couple celebrating successful loan transfer" 
                 className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
            </div>

            {/* --- Floating Elements (Contextual to Transfer) --- */}
            
            {/* Element 1: Rate Drop Alert (Top Left) */}
            <div className="absolute -left-8 top-24 z-20 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 animate-bounce-slow max-w-[240px]">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-50 rounded-full text-red-500">
                   <TrendingDown size={20} fill="currentColor" />
                </div>
                <div className="w-full">
                  <div className="flex justify-between items-center">
                    <p className="text-[10px] uppercase font-bold text-slate-400">Interest Rate</p>
                  </div>
                  <div className="flex items-end gap-2">
                    <p className="text-lg font-bold text-slate-900">8.50%</p>
                    <p className="text-xs text-slate-400 line-through mb-1">10.25%</p>
                  </div>
                  <p className="text-xs font-bold text-green-600">You Save 1.75%</p>
                </div>
              </div>
            </div>

            {/* Element 2: Monthly Savings (Bottom Right) */}
            <div className="absolute -right-6 bottom-32 z-20 bg-white/95 backdrop-blur-sm p-5 rounded-2xl shadow-xl border border-slate-100 animate-float max-w-[220px]">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-green-100 rounded-lg text-green-600">
                     <PiggyBank size={18} />
                   </div>
                   <div className="w-full">
                     <p className="text-xs text-slate-500 font-medium">Monthly Savings</p>
                     <div className="h-1.5 w-full bg-slate-100 rounded-full mt-1">
                        <div className="h-full bg-green-500 w-[100%] rounded-full"></div>
                     </div>
                   </div>
                   <CheckCircle size={16} className="text-green-500 shrink-0" />
                </div>
                
                <div className="flex justify-between items-center bg-slate-50 p-2 rounded-lg">
                    <span className="text-xs text-slate-500">Extra Cash:</span>
                    <span className="text-sm font-bold text-slate-900">+ ₹ 8,500/mo</span>
                </div>
              </div>
            </div>

            {/* Decorative Dashed Background Shape */}
            <div className="absolute top-12 -right-12 w-full h-[90%] border-2 border-dashed border-cyan-300 rounded-[2.5rem] -rotate-2 -z-10"></div>
            
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

export default TransferHero;