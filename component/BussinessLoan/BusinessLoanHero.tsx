'use client';
import React from 'react';
import {
  ArrowRight,
  Wallet,
  Zap,
  CheckCircle,
  ShieldCheck,
  Check
} from 'lucide-react';

// ==========================================
// 1. Data Definitions
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
  imageUrl: string;
  amountDisplay: string;
}

// ==========================================
// 2. Centralized Data
// ==========================================

export const HERO_CONTENT_DATA: HeroData[] = [
  {
    id: 'business-loan',
    badgeText: 'MSME & Startup Friendly',
    title: 'Capital to Scale Your Vision Without Limits',
    highlightText: 'Scale Your Vision',
    description: 'From working capital to machinery expansion. Get unsecured business loans up to ₹50 Lakhs with paperless approval in 24 hours.',
    primaryCtaText: 'Check Eligibility',
    secondaryCtaText: 'View Plans',
    amountDisplay: '50,00,000',
    imageUrl: "https://images.unsplash.com/photo-1664575602276-acd073f104c1?q=80&w=2070&auto=format&fit=crop",
    benefits: [
      "Collateral-free loans",
      "Minimal documentation",
      "Flexible repayment options"
    ]
  },
  {
    id: 'business-loan-interest-rates',
    badgeText: 'Best Rate Guarantee',
    title: 'Compare Business Loan Interest Rates',
    highlightText: 'Interest Rates',
    description: 'Maximize your profits by minimizing interest costs. Compare offers from 25+ top banks & NBFCs starting at just 11.99% p.a. tailored to your turnover.',
    primaryCtaText: 'Compare Now',
    secondaryCtaText: 'View Rate Chart',
    amountDisplay: '75,00,000',
    imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=2070",
    benefits: [
      "Rates starting @ 11.99%",
      "Fixed & Floating Options",
      "Compare 20+ Lenders"
    ]
  },
  {
    id: 'low-cibil-business-loans',
    badgeText: 'High Approval Rate',
    title: 'Loans for Low CIBIL Score',
    highlightText: 'Relaxed Eligibility',
    description: 'Don’t let a past setback define your future. Access special funding options designed for businesses with low credit scores, often secured against collateral or daily cash flow.',
    primaryCtaText: 'Check Eligibility',
    secondaryCtaText: 'Read Guidelines',
    amountDisplay: '10,00,000',
    imageUrl: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=2070",
    benefits: [
      "Approval with Score < 650",
      "Collateral-based Options",
      "Rebuild Your Credit History"
    ]
  },
  {
    id: 'dairy-farming-loan',
    badgeText: 'Govt. Subsidy Available',
    title: 'Dairy Farming Business Loan',
    highlightText: 'NABARD Support',
    description: 'Start or expand your dairy farm with specialized funding. Cover costs for cattle purchase, shed construction, and milking machinery with subsidized interest rates under government schemes.',
    primaryCtaText: 'Check Eligibility',
    secondaryCtaText: 'View Subsidy Details',
    amountDisplay: '50,00,000',
    imageUrl: "https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&q=80&w=2070",
    benefits: [
      "Cattle & Equipment Finance",
      "NABARD Subsidy Support",
      "Long Repayment Tenure"
    ]
  },
  {
    id: 'small-business-loan',
    badgeText: 'Quick Disbursal',
    title: 'Small Business Loan',
    highlightText: 'Collateral Free Options',
    description: 'Fuel your business growth with quick and easy financing. Ideal for working capital needs, inventory purchase, or small equipment upgrades with minimal documentation.',
    primaryCtaText: 'Apply Now',
    secondaryCtaText: 'Check Rates',
    amountDisplay: '20,00,000',
    imageUrl: "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&q=80&w=2070",
    benefits: [
      "No Collateral Required",
      "Disbursal in 48 Hours",
      "Minimal Documentation"
    ]
  },
  {
    id: 'goat-farming-loan',
    badgeText: 'Govt Subsidy Available',
    title: 'Goat Farming Loan',
    highlightText: 'Up to 33% Subsidy',
    description: 'Start or expand your commercial goat farm with ease. Get financing for shed construction, purchasing high-yield breeds (Black Bengal, Sirohi), and fodder development.',
    primaryCtaText: 'Check Subsidy',
    secondaryCtaText: 'View Schemes',
    amountDisplay: '10,00,000', // Typical commercial unit start
    imageUrl: "https://images.unsplash.com/photo-1599572765660-31628d02d242?auto=format&fit=crop&q=80&w=2070",
    benefits: [
      "NABARD Subsidy Support",
      "Low Interest KCC Rates",
      "Flexible Repayment"
    ]
  },
  {
    id: 'startup-business-loan',
    badgeText: 'Collateral Free Options',
    title: 'Startup Business Loan',
    highlightText: 'Funding up to ₹1 Cr',
    description: 'Fuel your new venture with capital for expansion, inventory, or equipment. Access government schemes like Mudra & Stand Up India with minimal documentation.',
    primaryCtaText: 'Check Eligibility',
    secondaryCtaText: 'View Schemes',
    amountDisplay: '50,00,000',
    imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=2070",
    benefits: [
      "CGTMSE Cover Available",
      "Minimal Documentation",
      "Quick Disbursal"
    ]
  },
  {
    id: 'poultry-farming-loan',
    badgeText: 'NLM Subsidy Eligible',
    title: 'Poultry Farming Loan',
    highlightText: 'Layer & Broiler Support',
    description: 'Comprehensive funding for shed construction, equipment (cages, feeders), and purchasing chicks. Covers both layer farming (eggs) and broiler farming (meat) with feed cost support.',
    primaryCtaText: 'Check Eligibility',
    secondaryCtaText: 'View Subsidy',
    amountDisplay: '15,00,000',
    imageUrl: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&q=80&w=2070",
    benefits: [
      "Setup & Feed Loans",
      "Equipment Financing",
      "Long Repayment Terms"
    ]
  },

  // ... Add all other data objects here (Medical, Travel, etc.) from your list
];

// ==========================================
// 3. Presentational Component (Design Preserved)
// ==========================================

interface ModernHeroProps {
  data: HeroData;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

const ModernHero: React.FC<ModernHeroProps> = ({ data, onPrimaryClick, onSecondaryClick }) => {

  // Title Rendering logic
  const renderTitle = () => {
    if (!data.highlightText) return data.title;
    const parts = data.title.split(data.highlightText);
    if (parts.length < 2) return data.title;

    return (
      <>
        {parts[0]}
        <span className="text-teal-600 relative inline-block">
          {data.highlightText}
          {/* Underline SVG */}
          <svg className="absolute w-full h-3 -bottom-1 left-0 text-teal-300 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
            <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
          </svg>
        </span>
        {parts[1]}
      </>
    );
  };

  return (
    <div className="relative min-h-[600px] lg:min-h-[800px] w-full flex items-center justify-center overflow-hidden font-sans bg-slate-50">

      {/* Background: Teal Gradient Mesh + Grid Pattern */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[400px] lg:w-[600px] h-[400px] lg:h-[600px] bg-teal-200/40 rounded-full blur-[100px] lg:blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[300px] lg:w-[500px] h-[300px] lg:h-[500px] bg-teal-100/60 rounded-full blur-[80px] lg:blur-[100px] translate-y-1/3 -translate-x-1/4"></div>

        {/* Geometric Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-0 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* LEFT COLUMN: Text Content */}
          <div className="flex flex-col items-start space-y-6 lg:space-y-8 lg:order-1 lg:pt-0">

            {/* 1. Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 border border-teal-100 shadow-sm animate-fade-in-up">
              <span className="flex h-2 w-2 rounded-full bg-teal-500 animate-pulse"></span>
              <span className="text-teal-800 text-xs lg:text-sm font-semibold tracking-wide uppercase">
                {data.badgeText}
              </span>
            </div>

            {/* 2. Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-slate-900 leading-[1.1]">
              {renderTitle()}
            </h1>

            {/* 3. Subtext */}
            <p className="text-base lg:text-lg text-slate-600 max-w-lg leading-relaxed">
              {data.description}
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-2">
              {data.benefits.map((benefit, i) => (
                <span key={i} className="inline-flex items-center px-3 py-1 rounded-lg bg-white border border-slate-200 text-slate-600 text-sm font-medium shadow-sm">
                  <Check className="w-3 h-3 text-teal-500 mr-2" strokeWidth={3} />
                  {benefit}
                </span>
              ))}
            </div>

            {/* 4. Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button
                onClick={onPrimaryClick}
                className="flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-lg shadow-teal-200 hover:shadow-teal-300 transform hover:-translate-y-1"
              >
                {data.primaryCtaText}
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={onSecondaryClick}
                className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 px-8 py-4 rounded-xl font-semibold border border-slate-200 shadow-sm transition-all hover:border-teal-200"
              >
                <Wallet className="w-5 h-5 text-teal-500" />
                {data.secondaryCtaText}
              </button>
            </div>

            {/* 5. Trust Indicators */}
            <div className="pt-6 border-t border-slate-200 w-full">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <img key={i} src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + data.id}`} alt="Happy Customer" className="w-10 h-10 rounded-full border-2 border-white ring-1 ring-slate-100 bg-slate-100 object-cover" />
                  ))}
                </div>
                <div className="text-sm">
                  <p className="font-bold text-slate-900">12,000+ Happy Users</p>
                  <p className="text-slate-500">Rated 4.9/5 for Speed</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Visuals */}
          <div className="hidden lg:flex relative h-[650px] w-full items-center justify-center lg:order-2">

            {/* Main Image Container */}
            <div className="relative z-10 w-full h-full rounded-[2.5rem] overflow-hidden shadow-2xl shadow-teal-900/10 rotate-1 border-[6px] border-white group">
              <img
                src={data.imageUrl}
                alt={data.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent"></div>
            </div>

            {/* Floating Elements */}

            {/* Element 1: Bank Alert (Top Left) */}
            <div className="absolute -left-6 top-24 z-20 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 animate-bounce-slow max-w-60">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-full text-green-600">
                  <Zap size={20} fill="currentColor" />
                </div>
                <div className="w-full">
                  <div className="flex justify-between items-center">
                    <p className="text-[10px] uppercase font-bold text-slate-400">Bank Alert</p>
                    <span className="text-[10px] text-slate-400">Now</span>
                  </div>
                  <p className="text-sm font-bold text-slate-800">Limit Approved</p>
                  <p className="text-xs font-bold text-green-600">+ ₹{data.amountDisplay}</p>
                </div>
              </div>
            </div>

            {/* Element 2: Status/Lifestyle (Bottom Right) */}
            <div className="absolute -right-4 bottom-28 z-20 bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-xl border border-slate-100 animate-float w-[220px]">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-teal-100 rounded-lg text-teal-600">
                    <ShieldCheck size={16} />
                  </div>
                  <div className="w-full">
                    <p className="text-xs text-slate-500 font-semibold uppercase">Application Status</p>
                    <p className="text-sm font-bold text-slate-900">Docs Verified</p>
                  </div>
                  <CheckCircle size={14} className="text-green-500 shrink-0" />
                </div>

                {/* Visual Progress Bar */}
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-teal-500 h-full w-[90%] rounded-full"></div>
                </div>
                <div className="flex justify-between text-[10px] font-medium text-slate-400">
                  <span>Processing</span>
                  <span className="text-teal-600">90% Done</span>
                </div>
              </div>
            </div>

            {/* Decorative Background Shape */}
            <div className="absolute top-10 -right-10 w-full h-full border-2 border-dashed border-teal-300 rounded-[2.5rem] -rotate-2 -z-10"></div>

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

// ==========================================
// 4. The Container Component (Logic Only)
// ==========================================

interface HeroContainerProps {
  id: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

const HeroContainer: React.FC<HeroContainerProps> = ({ id, onPrimaryClick, onSecondaryClick }) => {
  const heroData = HERO_CONTENT_DATA.find((item) => item.id === id);

  if (!heroData) {
    // Optional: Return a default fallback or null
    console.warn(`HeroContainer: Data for ID "${id}" not found.`);
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