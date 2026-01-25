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
// 2. Centralized LAP Data
// ==========================================

export const LAP_CONTENT_DATA: HeroData[] = [
  {
    id: '5-lakh-lap',
    badgeText: 'Small Business Boost',
    title: '5 Lakh Loan Against Property',
    highlightText: '5 Lakh',
    description: 'Unlock quick liquidity for your small business or personal needs. Use your residential property as collateral for low-interest funding.',
    primaryCtaText: 'Apply for 5L',
    secondaryCtaText: 'Check Eligibility',
    amountDisplay: '5,00,000',
    imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=2070",
    benefits: ["Rates from 9.25% p.a.", "Minimal Paperwork", "10 Year Tenure"]
  },
  {
    id: '10-lakh-lap',
    badgeText: 'Quick Disbursal',
    title: '10 Lakh Loan Against Property',
    highlightText: '10 Lakh',
    description: 'Perfect for home renovation or debt consolidation. Get a 10 Lakh loan with flexible repayment and zero hidden charges.',
    primaryCtaText: 'Get Started',
    secondaryCtaText: 'EMI Calculator',
    amountDisplay: '10,00,000',
    imageUrl: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80&w=2070",
    benefits: ["Up to 70% LTV", "Fast Processing", "Tax Savings"]
  },
  {
    id: '20-lakh-lap',
    badgeText: 'Education & Travel',
    title: '20 Lakh Loan Against Property',
    highlightText: '20 Lakh',
    description: 'Fund your child’s global education or a milestone event. A 20 Lakh LAP offers significantly lower EMIs than personal loans.',
    primaryCtaText: 'Check Offers',
    secondaryCtaText: 'View Rates',
    amountDisplay: '20,00,000',
    imageUrl: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=2070",
    benefits: ["Lower EMI than PL", "Property Ownership Stays", "Easy Approval"]
  },
  {
    id: '30-lakh-lap',
    badgeText: 'Mid-Tier Business',
    title: '30 Lakh Loan Against Property',
    highlightText: '30 Lakh',
    description: 'Scale your business operations or invest in workspace expansion. Secure 30 Lakhs with high LTV ratios against your property.',
    primaryCtaText: 'Apply Now',
    secondaryCtaText: 'Compare Banks',
    amountDisplay: '30,00,000',
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2070",
    benefits: ["Flexible End-Use", "Long Repayment", "Doorstep Service"]
  },
  {
    id: '40-lakh-lap',
    badgeText: 'Asset Refinance',
    title: '40 Lakh Loan Against Property',
    highlightText: '40 Lakh',
    description: 'Consolidate multiple high-interest loans into one manageable 40 Lakh LAP. Enjoy tenures extending up to 15 years.',
    primaryCtaText: 'Check Eligibility',
    secondaryCtaText: 'Transfer Loan',
    amountDisplay: '40,00,000',
    imageUrl: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&q=80&w=2070",
    benefits: ["Balance Transfer Bonus", "Low Processing Fee", "Instant Quote"]
  },
  {
    id: '50-lakh-lap',
    badgeText: 'Premium Funding',
    title: '50 Lakh Loan Against Property',
    highlightText: '50 Lakh',
    description: 'High-value funding for large-scale requirements. Get up to 50 Lakhs with specialized rates for self-employed professionals.',
    primaryCtaText: 'Get Priority Call',
    secondaryCtaText: 'View Criteria',
    amountDisplay: '50,00,000',
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2070",
    benefits: ["Priority Processing", "Customized EMI", "No Foreclosure Fee"]
  },
  {
    id: '75-lakh-lap',
    badgeText: 'Expansion Capital',
    title: '75 Lakh Loan Against Property',
    highlightText: '75 Lakh',
    description: 'Secure capital for your business growth. A 75 Lakh loan provides the leverage you need with commercial or residential collateral.',
    primaryCtaText: 'Check LTV',
    secondaryCtaText: 'Contact Manager',
    amountDisplay: '75,00,000',
    imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=2070",
    benefits: ["High Ticket Size", "Commercial Props OK", "Simple KYC"]
  },
  {
    id: '1-cr-lap',
    badgeText: 'Elite Financing',
    title: '1 Crore Loan Against Property',
    highlightText: '1 Crore',
    description: 'Elite lending solutions for high-net-worth requirements. Secure 1 Crore with dedicated relationship management and premium rates.',
    primaryCtaText: 'Inquire Now',
    secondaryCtaText: 'Elite Benefits',
    amountDisplay: '1,00,00,000',
    imageUrl: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=2070",
    benefits: ["Exclusive Rates", "Concierge Service", "Flexible Tenure"]
  },
  {
    id: '2-cr-lap',
    badgeText: 'Scale Without Limits',
    title: '2 Crore Loan Against Property',
    highlightText: '2 Crore',
    description: 'The ultimate credit line for established enterprises. Unlock 2 Crores with seamless digital processing and expert advisory.',
    primaryCtaText: 'Start Application',
    secondaryCtaText: 'Speak to Expert',
    amountDisplay: '2,00,00,000',
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2070",
    benefits: ["Maximum Loan Value", "Digital Sanction", "Overdraft Facility"]
  }
];

// ==========================================
// 3. Presentational Component
// ==========================================

interface ModernHeroProps {
  data: HeroData;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

const ModernHero: React.FC<ModernHeroProps> = ({ data, onPrimaryClick, onSecondaryClick }) => {
  const renderTitle = () => {
    if (!data.highlightText) return data.title;
    const parts = data.title.split(data.highlightText);
    if (parts.length < 2) return data.title;

    return (
      <>
        {parts[0]}
        <span className="text-teal-600 relative inline-block">
          {data.highlightText}
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
      
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[400px] lg:w-[600px] h-[400px] lg:h-[600px] bg-teal-200/40 rounded-full blur-[100px] lg:blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[300px] lg:w-[500px] h-[300px] lg:h-[500px] bg-teal-100/60 rounded-full blur-[80px] lg:blur-[100px] translate-y-1/3 -translate-x-1/4"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-0 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* LEFT: Text Content */}
          <div className="flex flex-col items-start space-y-6 lg:space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 border border-teal-100 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-teal-500 animate-pulse"></span>
              <span className="text-teal-800 text-xs lg:text-sm font-semibold tracking-wide uppercase">
                {data.badgeText}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-slate-900 leading-[1.1]">
              {renderTitle()}
            </h1>

            <p className="text-base lg:text-lg text-slate-600 max-w-lg leading-relaxed">
              {data.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {data.benefits.map((benefit, i) => (
                <span key={i} className="inline-flex items-center px-3 py-1 rounded-lg bg-white border border-slate-200 text-slate-600 text-sm font-medium shadow-sm">
                  <Check className="w-3 h-3 text-teal-500 mr-2" strokeWidth={3} />
                  {benefit}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button onClick={onPrimaryClick} className="flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-lg shadow-teal-200 transform hover:-translate-y-1">
                {data.primaryCtaText}
                <ArrowRight className="w-5 h-5" />
              </button>
              <button onClick={onSecondaryClick} className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 px-8 py-4 rounded-xl font-semibold border border-slate-200 shadow-sm transition-all hover:border-teal-200">
                <Wallet className="w-5 h-5 text-teal-500" />
                {data.secondaryCtaText}
              </button>
            </div>

            <div className="pt-6 border-t border-slate-200 w-full">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <img key={i} src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + data.id}`} alt="User" className="w-10 h-10 rounded-full border-2 border-white bg-slate-100" />
                  ))}
                </div>
                <div className="text-sm">
                  <p className="font-bold text-slate-900">8,500+ Property Owners</p>
                  <p className="text-slate-500">Trusted LAP Partner</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Visuals */}
          <div className="hidden lg:flex relative h-[650px] w-full items-center justify-center">
            <div className="relative z-10 w-full h-full rounded-[2.5rem] overflow-hidden shadow-2xl rotate-1 border-[6px] border-white group">
              <img src={data.imageUrl} alt={data.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
            </div>

            {/* Bank Notification Mockup */}
            <div className="absolute -left-6 top-24 z-20 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 animate-bounce-slow max-w-60">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-full text-green-600"><Zap size={20} fill="currentColor" /></div>
                <div>
                  <div className="flex justify-between items-center"><p className="text-[10px] uppercase font-bold text-slate-400">Transaction</p></div>
                  <p className="text-sm font-bold text-slate-800">LAP Disbursed</p>
                  <p className="text-xs font-bold text-green-600">+ ₹{data.amountDisplay}</p>
                </div>
              </div>
            </div>

            {/* Status Mockup */}
            <div className="absolute -right-4 bottom-28 z-20 bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-xl border border-slate-100 animate-float w-[220px]">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-teal-100 rounded-lg text-teal-600"><ShieldCheck size={16} /></div>
                  <div className="w-full">
                    <p className="text-xs text-slate-500 font-semibold">Collateral Status</p>
                    <p className="text-sm font-bold text-slate-900">Valuation Done</p>
                  </div>
                  <CheckCircle size={14} className="text-green-500 shrink-0" />
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-teal-500 h-full w-[95%] rounded-full"></div>
                </div>
              </div>
            </div>

            <div className="absolute top-10 -right-10 w-full h-full border-2 border-dashed border-teal-300 rounded-[2.5rem] -rotate-2 -z-10"></div>
          </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
        @keyframes bounce-slow { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(8px); } }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce-slow 5s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

// ==========================================
// 4. Container Component (LAPHero)
// ==========================================

interface LAPHeroProps {
  id: string; // e.g., '10-lakh-lap', '1-cr-lap'
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

const LAPHero: React.FC<LAPHeroProps> = ({ id, onPrimaryClick, onSecondaryClick }) => {
  const heroData = LAP_CONTENT_DATA.find((item) => item.id === id);

  if (!heroData) {
    console.warn(`LAPHero: Data for ID "${id}" not found.`);
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

export default LAPHero;