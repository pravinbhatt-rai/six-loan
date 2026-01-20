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
  imageUrl: string; 
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
    imageUrl: "https://images.unsplash.com/photo-1513118172236-00b7cc57e1fa?q=80&w=2070&auto=format&fit=crop", 
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
    imageUrl: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=2071", 
    benefits: [
      "Rates starting @ 10.49%",
      "No impact on CIBIL Score",
      "Real-time lender comparison"
    ]
  },
  {
    id: 'personal-loan-medical',
    badgeText: 'Emergency Priority',
    title: 'Instant Support for Medical Emergencies',
    highlightText: 'Medical Emergencies',
    description: 'Focus on recovery, not the bills. Cover surgeries, hospitalization, and treatments immediately with our priority health financing line.',
    primaryCtaText: 'Get Urgent Funds',
    secondaryCtaText: 'Check Eligibility',
    amountDisplay: '15,00,000',
    imageUrl: "https://images.unsplash.com/photo-1538108149393-fbbd8189718c?auto=format&fit=crop&q=80&w=2000",
    benefits: [
      "Disbursal in 30 Minutes",
      "Covers All Treatments",
      "No Collateral Needed"
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
    imageUrl: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&q=80&w=2070", 
    benefits: [
      "Approval with score < 650",
      "Boost your CIBIL Score",
      "Flexible repayment terms"
    ]
  },
  {
    id: 'personal-loan-5-lakh',
    badgeText: 'Express Disbursal',
    title: 'Get ₹5 Lakhs in Your Account Today',
    highlightText: '₹5 Lakhs',
    description: 'Turn your plans into reality with our express personal loan. Perfect for home renovation, weddings, or medical emergencies with zero collateral.',
    primaryCtaText: 'Claim Offer',
    secondaryCtaText: 'View Repayment Plans',
    amountDisplay: '5,00,000',
    imageUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=2664", 
    benefits: [
      "Disbursal in 24 Hours",
      "Low Processing Fee",
      "Tenure up to 60 Months"
    ]
  },
  {
    id: 'personal-loan-10-lakh',
    badgeText: 'Premium Selection',
    title: 'Unlock ₹10 Lakhs for Your Big Goals',
    highlightText: '₹10 Lakhs',
    description: 'Whether it is a luxury home upgrade, a dream wedding, or debt consolidation, get high-value financing with priority processing and flexible repayment options.',
    primaryCtaText: 'Unlock Offer',
    secondaryCtaText: 'Check EMI',
    amountDisplay: '10,00,000',
    imageUrl: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=2070", 
    benefits: [
      "Priority 2-Hour Disbursal",
      "Tenure up to 72 Months",
      "Dedicated Relationship Manager"
    ]
  },
  {
    id: 'personal-loan-20-lakh',
    badgeText: 'Elite Banking',
    title: 'Upgrade Your Lifestyle with ₹20 Lakhs',
    highlightText: '₹20 Lakhs',
    description: 'From dream weddings to luxury travel, fund your major life events without liquidating your investments. Enjoy flexible repayment structures designed for you.',
    primaryCtaText: 'View Offer',
    secondaryCtaText: 'Calculate EMI',
    amountDisplay: '20,00,000',
    imageUrl: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=2070",
    benefits: [
      "No Collateral Required",
      "Tenure up to 72 Months",
      "Part-payment facility available"
    ]
  },
  {
    id: 'personal-loan-30-lakh',
    badgeText: 'Business & Growth',
    title: 'Instant Access to ₹30 Lakh Capital',
    highlightText: '₹30 Lakh',
    description: 'Whether you are expanding your business or consolidating high-interest debt, get approval for ₹30 Lakhs based on your financial profile, not just your salary slip.',
    primaryCtaText: 'Check Eligibility',
    secondaryCtaText: 'View Rates',
    amountDisplay: '30,00,000',
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070",
    benefits: [
      "Competitive Rates for HNI",
      "Digital Document Verification",
      "Disbursal within 24 hours"
    ]
  },
  {
    id: 'personal-loan-40-lakh',
    badgeText: 'Signature Selection',
    title: 'Exclusive Financing up to ₹40 Lakhs',
    highlightText: '₹40 Lakhs',
    description: 'Join our signature program. Experience white-glove service with door-step assistance and customized interest rates tailored for high-credit individuals.',
    primaryCtaText: 'Get Quote',
    secondaryCtaText: 'Contact Expert',
    amountDisplay: '40,00,000',
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2069",
    benefits: [
      "Dedicated Relationship Manager",
      "Negotiable Processing Fees",
      "Extended Tenure Options"
    ]
  },
  {
    id: 'personal-loan-50-lakh',
    badgeText: 'Chairman’s Circle',
    title: 'Maximize Your Potential with ₹50 Lakhs',
    highlightText: '₹50 Lakhs',
    description: 'The ultimate financial power. Access our highest unsecured limit with the lowest possible interest rates. Perfect for home renovations or major asset acquisitions.',
    primaryCtaText: 'Apply Now',
    secondaryCtaText: 'Premium Benefits',
    amountDisplay: '50,00,000',
    imageUrl: "https://images.unsplash.com/photo-1504384308090-c54be3855833?auto=format&fit=crop&q=80&w=2662",
    benefits: [
      "Lowest Interest Rate Guarantee",
      "Max Tenure up to 84 Months",
      "Zero Pre-closure Charges"
    ]
  },
  {
    id: 'personal-loan-salaried',
    badgeText: 'Corporate Advantage',
    title: 'Instant Loans for Salaried Professionals',
    highlightText: 'Salaried Professionals',
    description: 'Get funds credited directly to your salary account. Enjoy special reduced rates for employees of MNCs, PSUs, and Government organizations.',
    primaryCtaText: 'Check My Limit',
    secondaryCtaText: 'Salary Transfer',
    amountDisplay: '15,00,000',
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=2069",
    benefits: [
      "Special Rates for MNC Employees",
      "Minimal Documentation",
      "Overdraft Facility Available"
    ]
  },
  {
    id: 'personal-loan-self-employed',
    badgeText: 'Business Owner',
    title: 'Fuel Your Business Vision Today',
    highlightText: 'Business Vision',
    description: 'Turnover-based eligibility designed for entrepreneurs. Expand your operations, buy inventory, or manage cash flow without pledging assets.',
    primaryCtaText: 'Unlock Capital',
    secondaryCtaText: 'Check Eligibility',
    amountDisplay: '25,00,000',
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2070",
    benefits: [
      "Based on ITR or Turnover",
      "No Collateral Required",
      "Flexible Flexi-Loan Options"
    ]
  },
  {
    id: 'personal-loan-pensioner',
    badgeText: 'Golden Years',
    title: 'Financial Security for Senior Citizens',
    highlightText: 'Senior Citizens',
    description: 'Enjoy your retirement without financial worry. Whether it is for medical needs or a dream vacation, avail loans with extended tenure up to age 75.',
    primaryCtaText: 'View Options',
    secondaryCtaText: 'Calculate EMI',
    amountDisplay: '7,00,000',
    imageUrl: "https://images.unsplash.com/photo-1563804809-58db2226eb66?auto=format&fit=crop&q=80&w=2070",
    benefits: [
      "Doorstep Service Available",
      "Preferential Interest Rates",
      "Pension-based Approval"
    ]
  },
  {
    id: 'personal-loan-doctors',
    badgeText: 'Medical Professional',
    title: 'Exclusive Financing for Doctors',
    highlightText: 'Doctors',
    description: 'Honoring your contribution with our premium financing suite. Get high-value unsecured loans up to ₹50 Lakhs for clinic expansion or equipment.',
    primaryCtaText: 'Claim Professional Offer',
    secondaryCtaText: 'View Details',
    amountDisplay: '50,00,000',
    imageUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=2128",
    benefits: [
      "Highest Loan Limit",
      "Lowest Market Rates",
      "Simple KYC Only Process"
    ]
  },
  {
    id: 'personal-loan-women',
    badgeText: 'Women Advantage',
    title: 'Empowering Your Financial Independence',
    highlightText: 'Financial Independence',
    description: 'Exclusive interest rate discounts for women applicants. Whether it is for higher education, wedding expenses, or starting a new venture.',
    primaryCtaText: 'Apply Now',
    secondaryCtaText: 'Check Special Rates',
    amountDisplay: '12,00,000',
    imageUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=2070",
    benefits: [
      "0.5% Interest Rate Discount",
      "50% Waiver on Processing Fee",
      "Flexible Repayment Terms"
    ]
  },
  {
    id: 'travel-personal-loan',
    badgeText: 'Wanderlust Ready',
    title: 'Make Your Dream Vacation a Reality',
    highlightText: 'Dream Vacation',
    description: 'Don’t let finances delay your travel plans. Cover flight tickets, luxury stays, and international sightseeing expenses instantly.',
    primaryCtaText: 'Plan Your Trip',
    secondaryCtaText: 'Calculate EMI',
    amountDisplay: '5,00,000',
    imageUrl: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=2070",
    benefits: [
      "Instant Disbursal for Last-minute Plans",
      "No Restriction on End Usage",
      "Repay Comfortably over 60 Months"
    ]
  },
  {
    id: 'debt-consolidation-loan',
    badgeText: 'Financial Wellness',
    title: 'Simplify Your Finances with One EMI',
    highlightText: 'One Single EMI',
    description: 'Combine multiple high-interest debts like credit cards and personal loans into a single, manageable loan with a lower interest rate.',
    primaryCtaText: 'Check Your Savings',
    secondaryCtaText: 'View Options',
    amountDisplay: '10,00,000',
    imageUrl: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=2070",
    benefits: [
      "Pay Off High-Interest Credit Cards",
      "Reduce Your Total Monthly Outgo",
      "Boost Credit Score by Clearing Debts"
    ]
  },
  {
    id: 'wedding-personal-loan',
    badgeText: 'Celebrate Grandly',
    title: 'Plan Your Dream Wedding Without Limits',
    highlightText: 'Dream Wedding',
    description: 'Ensure your special day is perfect. From booking the venue and catering to designer outfits and the honeymoon, finance it all with a wedding loan.',
    primaryCtaText: 'Plan Your Wedding',
    secondaryCtaText: 'Check Eligibility',
    amountDisplay: '25,00,000',
    imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=2070",
    benefits: [
      "No End-Use Restrictions (Venue, Jewelry, etc.)",
      "Quick Access to Funds for Vendor Advances",
      "Flexible Tenures up to 60 Months"
    ]
  },
  {
  id: 'overdraft-personal-loan',
  badgeText: 'Smart Banking',
  title: 'Pay Interest Only When You Use It',
  highlightText: 'Zero Usage = Zero Interest',
  description: 'Get a credit line up to ₹10 Lakhs. Withdraw as per your need and pay interest only on the used amount. Repay and reuse the limit anytime.',
  primaryCtaText: 'Unlock Limit',
  secondaryCtaText: 'Learn More',
  amountDisplay: '10,00,000',
  imageUrl: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&q=80&w=2070",
  benefits: [
    "Pay Interest Only on Usage",
    "Unlimited Withdrawals & Repayments",
    "No Foreclosure Charges"
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
  
  // Title Rendering with SVG Underline Highlight
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

            {/* Feature Pills (Mapped from data) */}
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