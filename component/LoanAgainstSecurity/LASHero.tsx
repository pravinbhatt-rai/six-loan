'use client';
import React from 'react';
import {
  ArrowRight,
  Wallet,
  Zap,
  CheckCircle,
  ShieldCheck,
  Check,
  TrendingUp,
  BarChart3
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
// 2. Centralized LAS Data (Loan Against Securities)
// ==========================================

export const LAS_CONTENT_DATA: HeroData[] = [
  {
    id: '5-lakh-las',
    badgeText: 'Instant Liquidity',
    title: '5 Lakh Loan Against Securities',
    highlightText: '5 Lakh',
    description: 'Get an instant credit line against your shares and mutual funds. Keep your investments intact while meeting short-term cash needs.',
    primaryCtaText: 'Pledge Now',
    secondaryCtaText: 'View Approved List',
    amountDisplay: '5,00,000',
    imageUrl: "https://images.unsplash.com/photo-1611974717482-4828c9fd6273?auto=format&fit=crop&q=80&w=2070",
    benefits: ["Interest on usage only", "Zero Prepayment Fees", "Digital Processing"]
  },
  {
    id: '10-lakh-las',
    badgeText: 'Market Leverage',
    title: '10 Lakh Loan Against Securities',
    highlightText: '10 Lakh',
    description: 'Maximize your portfolio value. Access 10 Lakhs without selling your assets, ensuring you don’t miss out on market rallies.',
    primaryCtaText: 'Check Limit',
    secondaryCtaText: 'LTV Calculator',
    amountDisplay: '10,00,000',
    imageUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=2070",
    benefits: ["Retain Dividends/Bonus", "Rates from 9.00%", "End-to-End Paperless"]
  },
  {
    id: '20-lakh-las',
    badgeText: 'Strategic Capital',
    title: '20 Lakh Loan Against Securities',
    highlightText: '20 Lakh',
    description: 'Perfect for seizing new investment opportunities or business capital. A 20 Lakh LAS offers a flexible overdraft facility.',
    primaryCtaText: 'Apply for 20L',
    secondaryCtaText: 'Speak to Advisor',
    amountDisplay: '20,00,000',
    imageUrl: "https://images.unsplash.com/photo-1642388691919-440f35304677?auto=format&fit=crop&q=80&w=2070",
    benefits: ["Overdraft Facility", "Wide range of MF/Stocks", "Monthly Interest Only"]
  },
  {
    id: '30-lakh-las',
    badgeText: 'Growth Funding',
    title: '30 Lakh Loan Against Securities',
    highlightText: '30 Lakh',
    description: 'Scale your operations or manage seasonal business cycles with a 30 Lakh credit line backed by your equity portfolio.',
    primaryCtaText: 'Get Started',
    secondaryCtaText: 'Eligibility Check',
    amountDisplay: '30,00,000',
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2070",
    benefits: ["High LTV (Up to 50%)", "No EMI - Only Interest", "Quick Disbursal"]
  },
  {
    id: '40-lakh-las',
    badgeText: 'Wealth Preservation',
    title: '40 Lakh Loan Against Securities',
    highlightText: '40 Lakh',
    description: 'Don’t liquidate your long-term wealth. Use 40 Lakhs for personal or business needs while your capital continues to grow.',
    primaryCtaText: 'Check Offers',
    secondaryCtaText: 'View Rates',
    amountDisplay: '40,00,000',
    imageUrl: "https://images.unsplash.com/photo-1535320485706-44d43b91d530?auto=format&fit=crop&q=80&w=2070",
    benefits: ["Minimal Documentation", "Seamless Pledging", "Flexible Repayment"]
  },
  {
    id: '50-lakh-las',
    badgeText: 'Premium Credit',
    title: '50 Lakh Loan Against Securities',
    highlightText: '50 Lakh',
    description: 'High-value credit line for HNIs and professionals. Get 50 Lakhs against a diversified basket of stocks, bonds, and mutual funds.',
    primaryCtaText: 'Apply for 50L',
    secondaryCtaText: 'Consult Expert',
    amountDisplay: '50,00,000',
    imageUrl: "https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=2070",
    benefits: ["Dedicated RM Support", "Dynamic Margin Trading", "Lowest Interest Rates"]
  },
  {
    id: '75-lakh-las',
    badgeText: 'Corporate Liquidity',
    title: '75 Lakh Loan Against Securities',
    highlightText: '75 Lakh',
    description: 'Empower your business with 75 Lakhs. Use your corporate or personal holdings to fuel expansion without dilution.',
    primaryCtaText: 'Inquire Now',
    secondaryCtaText: 'Scrip List',
    amountDisplay: '75,00,000',
    imageUrl: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&q=80&w=2070",
    benefits: ["Institutional Pricing", "Bulk Scrip Approval", "Digital Lien Marking"]
  },
  {
    id: '1-cr-las',
    badgeText: 'Elite Portfolio Lending',
    title: '1 Crore Loan Against Securities',
    highlightText: '1 Crore',
    description: 'Elite financing for major capital requirements. Secure 1 Crore with bespoke terms and premium relationship management.',
    primaryCtaText: 'Request Callback',
    secondaryCtaText: 'Elite Benefits',
    amountDisplay: '1,00,00,000',
    imageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=2070",
    benefits: ["Customized LTV", "Zero Processing Fee*", "Priority Disbursal"]
  },
  {
    id: '2-cr-las',
    badgeText: 'Ultra High Value',
    title: '2 Crore Loan Against Securities',
    highlightText: '2 Crore',
    description: 'The ultimate liquidity solution for significant portfolios. Unlock 2 Crores with seamless digital lien marking and global-standard advisory.',
    primaryCtaText: 'Start Application',
    secondaryCtaText: 'Contact Desk',
    amountDisplay: '2,00,00,000',
    imageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=2070",
    benefits: ["Maximum Credit Line", "Flexible Asset Mix", "Digital Dashboard"]
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
                <BarChart3 className="w-5 h-5 text-teal-500" />
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
                  <p className="font-bold text-slate-900">12,000+ Investors</p>
                  <p className="text-slate-500">Trusted Wealth Partner</p>
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

            {/* Portfolio Limit Notification */}
            <div className="absolute -left-6 top-24 z-20 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 animate-bounce-slow max-w-64">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-teal-100 rounded-full text-teal-600"><TrendingUp size={20} /></div>
                <div>
                  <div className="flex justify-between items-center"><p className="text-[10px] uppercase font-bold text-slate-400">Credit Limit</p></div>
                  <p className="text-sm font-bold text-slate-800">LAS Limit Approved</p>
                  <p className="text-xs font-bold text-teal-600">₹{data.amountDisplay} Available</p>
                </div>
              </div>
            </div>

            {/* Pledge Status Mockup */}
            <div className="absolute -right-4 bottom-28 z-20 bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-xl border border-slate-100 animate-float w-[240px]">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-green-100 rounded-lg text-green-600"><ShieldCheck size={16} /></div>
                  <div className="w-full">
                    <p className="text-xs text-slate-500 font-semibold">Pledge Marking</p>
                    <p className="text-sm font-bold text-slate-900">NSDL/CDSL Verified</p>
                  </div>
                  <CheckCircle size={14} className="text-green-500 shrink-0" />
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-teal-500 h-full w-[100%] rounded-full"></div>
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
// 4. Container Component (LASHero)
// ==========================================

interface LASHeroProps {
  id: string; // e.g., '10-lakh-las', '1-cr-las'
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

const LASHero: React.FC<LASHeroProps> = ({ id, onPrimaryClick, onSecondaryClick }) => {
  const heroData = LAS_CONTENT_DATA.find((item) => item.id === id);

  if (!heroData) {
    console.warn(`LASHero: Data for ID "${id}" not found.`);
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

export default LASHero;