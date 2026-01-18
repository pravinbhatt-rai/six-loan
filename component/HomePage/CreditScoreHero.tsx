'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import Router
import { ArrowRight, CheckCircle2, TrendingUp, Star, ChevronDown, Zap } from 'lucide-react';

// --- Placeholders ---
const PARTNER_LOGOS = ["HDFC Bank", "SBI", "Axis Bank", "ICICI", "Kotak"];

// --- 1. Route Mapping Configuration ---
// Map the "Dropdown Text" to your actual "Folder/Route Name"
const LOAN_ROUTES: Record<string, string> = {
  'Personal Loan': '/personalLoan', // As requested
  'Home Loan': '/homeLoan',
  'Business Loan': '/businessLoan',
  'Transfer Personal Loan': '/transferPersonalLoan',
  'Professional Loan': '/professionalLoan',
  'Loan Against Property': '/loanAgainstProperty',
  'Transfer Home Loan': '/transferHomeLoan',
  'Education Loan': '/educationLoan',
  'Loan Against Security': '/loanAgainstSecurity',
  'Used Car Loan': '/usedCarLoan',
  'Used Bike Loan': '/usedBikeLoan',
  'New Car Loan': '/newCarLoan',
  'New Bike Loan': '/newBikeLoan'
};

export const CreditScoreHero = () => {
  const router = useRouter(); // Initialize Router
  const [loanType, setLoanType] = useState('Personal Loan');
  
  // Animation for the credit score number
  const [score, setScore] = useState(700);
  useEffect(() => {
    const interval = setInterval(() => {
        setScore(prev => prev < 790 ? prev + 1 : 790);
    }, 20);
    return () => clearInterval(interval);
  }, []);

  // --- 2. Navigation Handler ---
  const handleCheckOffers = () => {
    // Get the route from the map, default to home if not found
    const route = LOAN_ROUTES[loanType] || '/';
    console.log(`Navigating to: ${route}`); // Helpful for debugging
    router.push(route);
  };

  return (
    <div className="relative w-full flex items-center justify-center overflow-hidden font-sans bg-slate-50 lg:pt-0">
      
      {/* --- Background: Dynamic Teal Mesh --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[400px] lg:w-[800px] h-[400px] lg:h-[800px] bg-teal-200/30 rounded-full blur-[80px] lg:blur-[120px] -translate-y-1/2 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-[300px] lg:w-[600px] h-[300px] lg:h-[600px] bg-blue-100/50 rounded-full blur-[80px] lg:blur-[100px] translate-y-1/3 -translate-x-1/4"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[40px_40px] lg:bg-size-[60px_60px]"></div>
      </div>

      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-12 lg:pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">

          {/* --- LEFT COLUMN: Brand Proposition --- */}
          <div className="lg:col-span-6 flex flex-col items-start space-y-6 lg:space-y-8 order-2 lg:order-1 pt-8 lg:pt-0">
            
            {/* 1. Trust Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 lg:px-4 lg:py-2 rounded-full bg-white border border-teal-100 shadow-sm mx-auto lg:mx-0">
              <div className="flex -space-x-2">
                 {[1,2,3,].map(i => (
                    <div key={i} className="w-5 h-5 lg:w-6 lg:h-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-[8px] font-bold text-gray-500">?</div>
                 ))}
              </div>
              <span className="text-slate-600 text-xs lg:text-sm font-semibold tracking-wide">
                Trusted by 2 Million+ Indians
              </span>
            </div>

            {/* 2. Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif text-slate-900 leading-[1.1] tracking-tight text-center lg:text-left w-full">
              Every Loan. <br />
              <span className="text-teal-600 relative inline-block">
                One Platform.
                <svg className="absolute w-full h-3 lg:h-4 -bottom-1 lg:-bottom-2 left-0 text-teal-300 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
                </svg>
              </span>
            </h1>

            {/* 3. Subtext */}
            <p className="text-base lg:text-lg text-slate-600 max-w-lg leading-relaxed text-center lg:text-left mx-auto lg:mx-0">
              Check your <strong>Free Credit Score</strong> and compare offers from 50+ Banks & NBFCs. Paperless approval in minutes.
            </p>

            {/* 4. THE "QUICK START" WIDGET */}
            <div className="w-full bg-white/60 backdrop-blur-md border border-white/60 rounded-3xl shadow-xl p-5 lg:p-6 mt-4 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-teal-500"></div>
              <h3 className="text-xs lg:text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">I am looking for</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
                <div className="relative">
                    <select 
                        value={loanType}
                        onChange={(e) => setLoanType(e.target.value)}
                        className="w-full h-12 lg:h-14 pl-4 pr-10 bg-white border border-slate-200 rounded-xl font-bold text-slate-800 text-base lg:text-lg appearance-none focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all cursor-pointer"
                    >
                        {/* Ensure these options match the keys in LOAN_ROUTES exactly */}
                        {Object.keys(LOAN_ROUTES).map((option) => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
                </div>
                
                {/* 3. Button with Navigation Logic */}
                <button 
                    onClick={handleCheckOffers}
                    className="w-full h-12 lg:h-14 bg-teal-600 hover:bg-teal-700 text-white font-bold text-base lg:text-lg rounded-xl shadow-lg shadow-teal-200 flex items-center justify-center gap-2 transition-all transform active:scale-[0.98]"
                >
                    Check Offers
                    <ArrowRight size={20} />
                </button>
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs font-medium text-slate-500">
                <CheckCircle2 className="text-green-500 w-3.5 h-3.5" />
                <span>No impact on Credit Score</span>
              </div>
            </div>

            {/* 5. Partners */}
            <div className="pt-2 w-full text-center lg:text-left">
                <p className="text-[10px] lg:text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Our Banking Partners</p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-2 lg:gap-4 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                    {PARTNER_LOGOS.map((logo, i) => (
                        <span key={i} className="text-xs lg:text-sm font-bold text-slate-600 border border-slate-200 px-2 py-1 lg:px-3 lg:py-1 rounded-md bg-white">{logo}</span>
                    ))}
                    <span className="text-xs lg:text-sm text-slate-400 self-center">+45 more</span>
                </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: PHONE MOCKUP (HIDDEN ON MOBILE) --- */}
          <div className="hidden lg:flex lg:col-span-6 relative h-[800px] w-full items-center justify-center lg:order-2 z-20">
            
            {/* 1. The Phone Frame */}
            <div className="relative z-20 w-[360px] h-[700px] bg-[#0a1930] rounded-[3rem] border-10 border-[#0a1930] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.6)] overflow-hidden transform -rotate-2 hover:rotate-0 transition-all duration-700 ease-out">
               {/* Screen Notch area */}
               <div className="absolute top-0 left-0 w-full h-8 bg-[#0a1930] z-20 flex justify-center pt-2">
                  <div className="h-1.5 w-16 bg-slate-800 rounded-full"></div>
               </div>

               {/* Screen Content */}
               <div className="w-full h-full bg-[#F8FAFC] pt-12 px-5 pb-6 flex flex-col gap-5 overflow-hidden relative">
                    
                    {/* Credit Score Card */}
                    <div className="w-full bg-white rounded-3xl p-6 shadow-sm border border-slate-100 text-center relative overflow-hidden mt-4">
                        <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-3">Your Credit Score</p>
                        <h2 className="text-6xl font-extrabold text-slate-900 mb-2 tracking-tight">{score}</h2>
                        <div className="inline-block px-4 py-1.5 bg-green-50 text-green-700 text-sm font-bold rounded-full mb-4">Excellent</div>
                        <p className="text-[10px] text-slate-400">Last updated: Just now</p>
                    </div>

                    {/* Internal App Offers */}
                    <div className="space-y-3">
                        <div className="flex items-start gap-4 p-4 bg-teal-50/80 rounded-2xl border border-teal-100">
                            <div className="p-2 bg-white rounded-full shadow-sm text-teal-600 mt-1">
                                <Star fill="currentColor" className="w-[18px] h-[18px]" />
                            </div>
                            <div>
                                <p className="text-base font-bold text-slate-900 leading-tight">Pre-Approved Personal Loan</p>
                                <p className="text-sm text-slate-600 mt-1">Up to ₹ 5,00,000 ready to disburse</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
                            <div className="p-2 bg-slate-100 rounded-full text-slate-600 mt-1">
                                <TrendingUp className="w-[18px] h-[18px]" />
                            </div>
                            <div>
                                <p className="text-base font-bold text-slate-900 leading-tight">Transfer Home Loan</p>
                                <p className="text-sm text-slate-600 mt-1">Reduce ROI to 8.35%</p>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Nav Simulation */}
                    <div className="mt-auto flex justify-around items-center px-4 py-4 border-t border-slate-100 bg-white absolute bottom-0 left-0 w-full">
                        <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-600">
                            <Zap fill="currentColor" className="w-5 h-5" />
                        </div>
                        <div className="w-8 h-8 rounded-full bg-slate-100"></div>
                        <div className="w-8 h-8 rounded-full bg-slate-100"></div>
                        <div className="w-8 h-8 rounded-full bg-slate-100"></div>
                    </div>
               </div>
            </div>

            {/* 2. Floating Elements */}
            
            {/* Top Right: Application Approved Badge */}
            <div className="absolute top-16 -right-12 z-30 bg-white py-3 px-5 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.12)] border border-slate-50 animate-bounce-slow flex items-center gap-3">
                <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center shadow-inner shrink-0">
                    <CheckCircle2 className="text-green-600 w-[22px] h-[22px]" strokeWidth={3} />
                </div>
                <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-none mb-1">Application</p>
                    <p className="text-lg font-extrabold text-slate-900 leading-none">Approved</p>
                </div>
            </div>

            {/* Bottom Left: Interest Rate Badge */}
            <div className="absolute bottom-36 -left-12 z-30 bg-[#009688] p-5 rounded-2xl shadow-[0_20px_40px_rgba(0,150,136,0.3)] animate-float">
                <div className="text-left text-white">
                    <p className="text-sm font-medium opacity-90 mb-1">Interest Rates starting</p>
                    <p className="text-3xl font-extrabold tracking-tight">@ 10.49%</p>
                </div>
            </div>

            {/* Background Blob behind Phone */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-linear-to-tr from-teal-100 to-blue-100 rounded-full blur-[100px] -z-10"></div>
          </div>

        </div>
      </div>
      
      {/* Animation Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(8px); }
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default CreditScoreHero;