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
    id: 'home-loan-interest-rates',
    badgeText: 'Lowest Rates Starting @ 8.35%',
    title: 'Compare Home Loan Interest Rates',
    highlightText: 'Interest Rates',
    description: 'Stop overpaying on your dream home. Compare live interest rates from 30+ top banks and NBFCs to secure the lowest monthly EMI.',
    primaryCtaText: 'Compare Rates',
    secondaryCtaText: 'View Rate Chart',
    amountDisplay: '50,00,000',
    imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=2070",
    benefits: [
      "Rates from 8.35% p.a.",
      "Fixed & Floating Options",
      "Zero Hidden Charges"
    ]
  },
  {
    id: 'home-loan-low-cibil-score',
    badgeText: 'Easy Approval',
    title: 'Home Loan for Low CIBIL Score',
    highlightText: 'Low CIBIL Score',
    description: 'A low credit score shouldn’t cost you your dream home. We connect you with lenders who specialize in approvals based on income and stability.',
    primaryCtaText: 'Check Eligibility',
    secondaryCtaText: 'Read Guidelines',
    amountDisplay: '25,00,000',
    imageUrl: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=2070",
    benefits: [
      "Score < 650 Accepted",
      "Co-applicant Support",
      "Manual Income Check"
    ]
  },
  {
    id: '10-lakh-home-loan',
    badgeText: 'Affordable Housing',
    title: '10 Lakh Home Loan',
    highlightText: '10 Lakh',
    description: 'Perfect for PMAY beneficiaries and affordable housing projects. Get quick approval for smaller ticket sizes with minimal documentation.',
    primaryCtaText: 'Apply Now',
    secondaryCtaText: 'View EMI',
    amountDisplay: '10,00,000',
    imageUrl: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&q=80&w=2070",
    benefits: [
      "PMAY Subsidy Eligible",
      "90% Funding Value",
      "Low Processing Fee"
    ]
  },
  {
    id: '15-lakh-home-loan',
    badgeText: 'Quick Disbursal',
    title: '15 Lakh Home Loan',
    highlightText: '15 Lakh',
    description: 'Finance your apartment or floor construction with ease. Tailored for budget-friendly homes in Tier 2 and Tier 3 cities.',
    primaryCtaText: 'Check Eligibility',
    secondaryCtaText: 'Calculate EMI',
    amountDisplay: '15,00,000',
    imageUrl: "https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&q=80&w=2070",
    benefits: [
      "Long Tenure Options",
      "Doorstep Service",
      "Minimal Documentation"
    ]
  },
  {
    id: '20-lakh-home-loan',
    badgeText: 'Popular Choice',
    title: '20 Lakh Home Loan',
    highlightText: '20 Lakh',
    description: 'The ideal loan amount for first-time homebuyers. Enjoy competitive interest rates and tax benefits under Section 80C and 24(b).',
    primaryCtaText: 'Apply Now',
    secondaryCtaText: 'Check Rates',
    amountDisplay: '20,00,000',
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2070",
    benefits: [
      "Tax Benefits Available",
      "Flexible Repayment",
      "Online Approval"
    ]
  },
  {
    id: '30-lakh-home-loan',
    badgeText: 'Mid-Segment Homes',
    title: '30 Lakh Home Loan',
    highlightText: '30 Lakh',
    description: 'Upgrade your living standards. Get funds for purchasing a 2BHK or 3BHK flat with extended repayment tenures up to 30 years.',
    primaryCtaText: 'Check Offers',
    secondaryCtaText: 'View EMI',
    amountDisplay: '30,00,000',
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2070",
    benefits: [
      "Up to 30 Year Tenure",
      "Balance Transfer Option",
      "Part-Payment Facility"
    ]
  },
  {
    id: '40-lakh-home-loan',
    badgeText: 'Premium Finance',
    title: '40 Lakh Home Loan',
    highlightText: '40 Lakh',
    description: 'Secure funding for premium apartments or independent houses. Benefit from special rates for women applicants and salaried professionals.',
    primaryCtaText: 'Check Eligibility',
    secondaryCtaText: 'View Plans',
    amountDisplay: '40,00,000',
    imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=2070",
    benefits: [
      "High LTV Ratio",
      "Quick Processing",
      "Insurance Cover"
    ]
  },
  {
    id: '60-lakh-home-loan',
    badgeText: 'Luxury Living',
    title: '60 Lakh Home Loan',
    highlightText: '60 Lakh',
    description: 'Realize your dream of a luxury villa or a large apartment. Specialized relationship managers to handle your application priority.',
    primaryCtaText: 'Get Quote',
    secondaryCtaText: 'Contact Us',
    amountDisplay: '60,00,000',
    imageUrl: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=2070",
    benefits: [
      "Priority Processing",
      "Negotiable Rates",
      "Exclusive Offers"
    ]
  },
  {
    id: 'home-renovation-loan',
    badgeText: 'Makeover Finance',
    title: 'Home Renovation Loan',
    highlightText: 'Home Renovation',
    description: 'Give your home a fresh look. Fund repairs, painting, tiling, or remodeling with a hassle-free renovation loan.',
    primaryCtaText: 'Apply Now',
    secondaryCtaText: 'View Ideas',
    amountDisplay: '12,00,000',
    imageUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=2070",
    benefits: [
      "Quick Disbursement",
      "No Collateral Options",
      "Tax Deductions"
    ]
  },
  {
    id: 'plot-loan',
    badgeText: 'Land Purchase',
    title: 'Plot Loan',
    highlightText: 'Plot Loan',
    description: 'Buy the perfect piece of land now and build your home later. Loans available for purchasing residential plots from statutory authorities or developers.',
    primaryCtaText: 'Check Eligibility',
    secondaryCtaText: 'View Rates',
    amountDisplay: '35,00,000',
    imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=2070",
    benefits: [
      "Purchase & Construct",
      "Loans up to 75% LTV",
      "15 Year Tenure"
    ]
  },
  {
    id: 'top-up-home-loan',
    badgeText: 'Extra Liquidity',
    title: 'Top Up Home Loan',
    highlightText: 'Top Up',
    description: 'Need extra cash? Get a top-up on your existing home loan at interest rates much lower than personal loans. Use it for any personal need.',
    primaryCtaText: 'Get Top Up',
    secondaryCtaText: 'Check Amount',
    amountDisplay: '10,00,000',
    imageUrl: "https://images.unsplash.com/photo-1574607383476-f517f260d30b?auto=format&fit=crop&q=80&w=2070",
    benefits: [
      "Low Interest Rates",
      "Minimal Paperwork",
      "Quick Credit"
    ]
  },
  {
    id: 'home-construction-loan',
    badgeText: 'Self Construction',
    title: 'Home Construction Loan',
    highlightText: 'Construction Loan',
    description: 'Build your home your way. Get funds disbursed in tranches based on the stage of construction of your house on a freehold plot.',
    primaryCtaText: 'Start Building',
    secondaryCtaText: 'View Stages',
    amountDisplay: '55,00,000',
    imageUrl: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=2070",
    benefits: [
      "Tranche-based Disbursal",
      "Interest Only Period",
      "Custom Tenure"
    ]
  },
  {
    id: 'nri-home-loan',
    badgeText: 'For Global Indians',
    title: 'NRI Home Loan',
    highlightText: 'NRI',
    description: 'Invest in your homeland while living abroad. Specialized home loans for NRIs/PIOs with digital documentation and advisory services.',
    primaryCtaText: 'Apply Online',
    secondaryCtaText: 'Documentation',
    amountDisplay: '80,00,000',
    imageUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=2070",
    benefits: [
      "Doorstep Service Abroad",
      "Attractive ROI",
      "Digital Process"
    ]
  },
  {
    id: 'home-extension-loan',
    badgeText: 'More Space',
    title: 'Home Extension Loan',
    highlightText: 'Extension Loan',
    description: 'Adding a new room or a floor? Get a loan specifically designed for extending your current residential property.',
    primaryCtaText: 'Extend Now',
    secondaryCtaText: 'Check Eligibility',
    amountDisplay: '15,00,000',
    imageUrl: "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&q=80&w=2070",
    benefits: [
      "Cover Construction Cost",
      "Longer Repayment",
      "Tax Benefits"
    ]
  },
  {
    id: 'home-loan-for-self-employed',
    badgeText: 'Business Owners',
    title: 'Home Loan for Self Employed',
    highlightText: 'Self Employed',
    description: 'Customized eligibility programs for business owners and professionals. Approval based on turnover or bank statements if ITR is insufficient.',
    primaryCtaText: 'Check Eligibility',
    secondaryCtaText: 'View Criteria',
    amountDisplay: '65,00,000',
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2070",
    benefits: [
      "Gross Receipt Program",
      "Bank Statement Program",
      "Higher Eligibility"
    ]
  },
  {
    id: 'home-loan-for-women',
    badgeText: 'Special Rates',
    title: 'Home Loan for Women',
    highlightText: 'For Women',
    description: 'Empowering women homeowners with concessional interest rates and reduced processing fees. Make the property yours, in your name.',
    primaryCtaText: 'Apply Now',
    secondaryCtaText: 'View Benefits',
    amountDisplay: '40,00,000',
    imageUrl: "https://images.unsplash.com/photo-1584665424560-6b3a04b12571?auto=format&fit=crop&q=80&w=2070",
    benefits: [
      "Lower Interest Rates",
      "Stamp Duty Concession",
      "Simplified Process"
    ]
  }
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
                  <p className="text-sm font-bold text-slate-800">Loan Approved</p>
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
                    <p className="text-sm font-bold text-slate-900">Property Verified</p>
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