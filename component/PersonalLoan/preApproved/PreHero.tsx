'use client';
import React from 'react';
import { 
  ArrowRight, 
  Check, 
  ShieldCheck, 
  IndianRupee, 
  Zap, 
  CheckCircle,
  TrendingUp
} from 'lucide-react';

// ==========================================
// 1. Data Definitions & Interfaces
// ==========================================

export interface HeroData {
  id: string;
  badgeText: string;
  title: string;
  highlightText?: string;
  description: string;
  primaryCtaText: string;
  secondaryCtaText: string;
  benefits: string[];
  imageUrl: string; // Made mandatory for the visual mockup
  amountDisplay: string;
}

// ==========================================
// 2. Centralized Data
// ==========================================

const HERO_CONTENT_DATA: HeroData[] = [
  {
    id: 'personal-loan',
    badgeText: 'Pre-Approved Offer',
    title: 'Your Pre-Approved Personal Loan is Ready',
    highlightText: 'Pre-Approved',
    description: 'Unlock up to ₹10,00,000 instantly with zero paperwork. Experience financial freedom with our lowest interest rates starting at 10.49% p.a.',
    primaryCtaText: 'Get Funds Now',
    secondaryCtaText: 'Check Eligibility',
    amountDisplay: '5,00,000',
    imageUrl: "https://assets-news.housing.com/news/wp-content/uploads/2020/06/05201759/All-you-need-to-know-about-pre-approved-home-loans-FB-1200x700-compressed.jpg", // Travel/Lifestyle
    benefits: [
      "Instant disbursal in 5 mins",
      "100% Paperless KYC",
      "Zero foreclosure charges"
    ]
  },
  {
    id: 'personal-loan-interest-rates',
    badgeText: 'Rate Alert 2024',
    title: 'Compare Personal Loan Interest Rates',
    highlightText: 'Interest Rates',
    description: 'Don’t overpay on your EMIs. Compare the latest interest rates from 30+ Banks & NBFCs starting at just 10.49% p.a. tailored to your credit profile.',
    primaryCtaText: 'Compare Rates',
    secondaryCtaText: 'Calculate EMI',
    amountDisplay: '10,00,000',
    imageUrl: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=2071", // Finance/Growth theme
    benefits: [
      "Rates starting @ 10.49%",
      "No impact on CIBIL Score",
      "Real-time lender comparison"
    ]
  },
  {
    id: 'personal-loan-low-cibil',
    badgeText: 'Credit Builder Program',
    title: 'Financial Freedom with Any Credit Score',
    highlightText: 'Any Credit Score',
    description: 'Don’t let a past score hold you back. We partner with lenders who look beyond your CIBIL. Get approved for up to ₹3 Lakhs and rebuild your credit history.',
    primaryCtaText: 'Check Eligibility',
    secondaryCtaText: 'How to Improve',
    amountDisplay: '3,00,000',
    imageUrl: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&q=80&w=2070", // Trust/Support theme
    benefits: [
      "Approval with score < 650",
      "Boost your CIBIL Score",
      "Flexible repayment terms"
    ]
  }
];

// ==========================================
// 3. The Modern Presentational Component
// ==========================================

interface PreHeroProps {
  data: HeroData;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

const ModernHero: React.FC<PreHeroProps> = ({ data, onPrimaryClick, onSecondaryClick }) => {
  
  // Title Rendering with Gradient Highlight
  const renderTitle = () => {
    if (!data.highlightText) return data.title;
    const parts = data.title.split(data.highlightText);
    if (parts.length < 2) return data.title;

    return (
      <>
        {parts[0]}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-400 relative inline-block">
          {data.highlightText}
          {/* Subtle underline decoration */}
          <svg className="absolute w-full h-2 -bottom-1 left-0 text-teal-200/50 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
             <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
          </svg>
        </span>
        {parts[1]}
      </>
    );
  };

  return (
    <section className="relative w-full overflow-hidden bg-slate-50/50 mt-8 mb-8   font-serif">
      
      {/* --- Ambient Background Effects --- */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-teal-100/60 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-100/60 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-2000" />
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* --- Left Column: Content --- */}
          <div className="flex flex-col items-start space-y-8 max-w-2xl z-10">
            
            {/* Modern Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white px-4 py-1.5 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
                {data.badgeText}
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.15]">
              {renderTitle()}
            </h1>
            
            <p className="text-lg text-slate-600 leading-relaxed max-w-lg font-sans">
              {data.description}
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3 font-sans">
              {data.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 rounded-lg bg-white border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 shadow-sm">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-teal-50 text-teal-600">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  {benefit}
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex w-full flex-col sm:flex-row gap-4 pt-4 font-sans">
              <button
                onClick={onPrimaryClick}
                className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-xl bg-teal-600 px-8 font-medium text-white shadow-lg shadow-teal-500/20 transition-all duration-300 hover:-translate-y-1 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 cursor-pointer"
              >
                <span className="mr-2">{data.primaryCtaText}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              
              <button
                onClick={onSecondaryClick}
                className="group inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-8 font-medium text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-300 hover:text-teal-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 cursor-pointer"
              >
                {data.secondaryCtaText}
              </button>
            </div>

            {/* Trust Footer */}
            <div className="flex items-center gap-4 pt-2 font-sans">
                <div className="flex -space-x-3">
                    {[1,2,3].map((i) => (
                        <div key={i} className="w-9 h-9 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center overflow-hidden shadow-sm">
                             <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + data.id}`} alt="user" className="w-full h-full" />
                        </div>
                    ))}
                    <div className="w-9 h-9 rounded-full border-2 border-white bg-teal-600 flex items-center justify-center text-[10px] text-white font-bold shadow-sm">
                        +12k
                    </div>
                </div>
                <div className="text-sm text-slate-500">
                    Trusted by <span className="font-bold text-slate-900">12,000+</span> customers
                </div>
            </div>
          </div>

          {/* --- Right Column: Visual Mockup with Background Image --- */}
          <div className="hidden lg:flex relative h-[600px] w-full items-center justify-center z-10">
            
            {/* Main Image Container (Rotated & Bordered) */}
            <div className="relative z-10 w-[90%] h-[85%] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-teal-900/10 rotate-2 border-[8px] border-white group hover:rotate-0 transition-transform duration-700 ease-out">
               <img 
                 src={data.imageUrl} 
                 alt={data.title} 
                 className="w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-1000"
               />
               {/* Gradient Overlay for text legibility if needed */}
               <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
            </div>

            {/* --- Floating Elements (Widgets) --- */}
            
            {/* Widget 1: Bank Alert (Top Left) */}
            <div className="absolute left-0 top-16 z-20 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 animate-bounce-slow max-w-[240px]">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-green-50 rounded-full text-green-600 border border-green-100">
                   <Zap size={20} fill="currentColor" />
                </div>
                <div className="w-full font-sans">
                  <div className="flex justify-between items-center mb-0.5">
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Bank Alert</p>
                    <span className="text-[10px] text-slate-400">Just Now</span>
                  </div>
                  <p className="text-sm font-bold text-slate-800 leading-tight">Limit Approved</p>
                  <p className="text-xs font-bold text-green-600 flex items-center gap-1">
                     + ₹{data.amountDisplay}
                  </p>
                </div>
              </div>
            </div>

            {/* Widget 2: Status Badge (Bottom Right) */}
            <div className="absolute right-4 bottom-24 z-20 bg-white/95 backdrop-blur-sm p-5 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-100 animate-float max-w-[240px]">
              <div className="space-y-3 font-sans">
                <div className="flex items-start gap-3">
                   <div className="p-2 bg-teal-50 rounded-lg text-teal-600">
                     <ShieldCheck size={20} />
                   </div>
                   <div>
                     <p className="text-xs text-slate-500 font-semibold uppercase">Application Status</p>
                     <p className="text-sm font-bold text-slate-900">Docs Verified</p>
                   </div>
                   <CheckCircle size={18} className="text-teal-500 ml-auto mt-1" fill="currentColor" color="white" />
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                   <div className="bg-teal-500 h-2 rounded-full w-[90%]"></div>
                </div>
                <div className="flex justify-between text-[10px] font-medium text-slate-400">
                   <span>Processing</span>
                   <span className="text-teal-600">90% Done</span>
                </div>
              </div>
            </div>

            {/* Decorative Dashed Background Shape behind image */}
            <div className="absolute top-8 right-4 w-[90%] h-[85%] border-2 border-dashed border-teal-300 rounded-[2.5rem] -rotate-1 -z-10 opacity-60"></div>
            
          </div>
          
        </div>
      </div>

      {/* CSS Animations (Injected styles for this component) */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(8px); }
        }
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 5s ease-in-out infinite;
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
};

// ==========================================
// 4. The Container Component
// ==========================================

interface HeroContainerProps {
  id: string; 
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

const HeroContainer: React.FC<HeroContainerProps> = ({ id, onPrimaryClick, onSecondaryClick }) => {
  const heroData = HERO_CONTENT_DATA.find((item) => item.id === id);

  if (!heroData) {
    console.warn(`HeroContainer: No data found for id "${id}"`);
    return null; 
  }

  return (
    <ModernHero 
      data={heroData} 
      onPrimaryClick={onPrimaryClick} 
      onSecondaryClick={onSecondaryClick} 
    />
  );
};

export default HeroContainer;