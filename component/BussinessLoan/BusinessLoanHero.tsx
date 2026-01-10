"use client";
import React from 'react';
import { ArrowRight, TrendingUp, Building2, Briefcase, CheckCircle2 } from 'lucide-react';

// Placeholders - specialized for Business theme
const BUSINESS_IMAGE_URL = "https://images.unsplash.com/photo-1664575602276-acd073f104c1?q=80&w=2070&auto=format&fit=crop"; 
// Note: Replace with a transparent PNG of a business owner/entrepreneur for best results

const AVATAR_1 = "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=64&h=64";
const AVATAR_2 = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=64&h=64";
const AVATAR_3 = "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=64&h=64";

export const BusinessLoanHero: React.FC = () => {
  return (
    <div className="relative min-h-[800px] w-full flex items-center justify-center overflow-hidden font-sans bg-slate-50">
      
      {/* Background: Teal Gradient Mesh + Grid Pattern (Same as Education Loan) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-teal-200/40 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/3"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-teal-100/60 rounded-full blur-[100px] translate-y-1/3 translate-x-1/4"></div>
        
        {/* Geometric Grid Pattern for "Structure/Finance" feel */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-0 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* LEFT COLUMN: Text Content */}
          <div className="flex flex-col items-start space-y-8 order-2 lg:order-1">
            
            {/* 1. Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 border border-teal-100 shadow-sm animate-fade-in-up">
              <span className="flex h-2 w-2 rounded-full bg-teal-500 animate-pulse"></span>
              <span className="text-teal-800 text-sm font-semibold tracking-wide uppercase">
                MSME & Startup Friendly
              </span>
            </div>

            {/* 2. Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-slate-900 leading-[1.1]">
              Capital to <br />
              <span className="text-teal-600 relative inline-block">
                Scale Your Vision
                {/* Underline SVG */}
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-teal-300 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
                </svg>
              </span>
              <br /> Without Limits.
            </h1>

            {/* 3. Subtext */}
            <p className="text-lg text-slate-600 max-w-lg leading-relaxed">
              From working capital to machinery expansion. Get unsecured business loans up to ₹50 Lakhs with paperless approval in 24 hours.
            </p>

            {/* 4. Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button className="flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-lg shadow-teal-200 hover:shadow-teal-300 transform hover:-translate-y-1">
                Check Eligibility
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <button className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 px-8 py-4 rounded-xl font-semibold border border-slate-200 shadow-sm transition-all hover:border-teal-200">
                <Briefcase className="w-5 h-5 text-teal-500" />
                View Plans
              </button>
            </div>

            {/* 5. Trust Indicators */}
            <div className="pt-6 border-t border-slate-200 w-full">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[AVATAR_1, AVATAR_2, AVATAR_3].map((src, i) => (
                    <img key={i} src={src} alt="Business Owner" className="w-10 h-10 rounded-full border-2 border-white ring-1 ring-slate-100 object-cover" />
                  ))}
                </div>
                <div className="text-sm">
                  <p className="font-bold text-slate-900">10,000+ Founders</p>
                  <p className="text-slate-500">Trusted for their growth story</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Visuals */}
          <div className="relative h-[500px] lg:h-[650px] w-full flex items-center justify-center order-1 lg:order-2">
            
            {/* Main Image Container */}
            <div className="relative z-10 w-full h-full rounded-[2.5rem] overflow-hidden shadow-2xl shadow-teal-900/10 -rotate-1 border-[6px] border-white">
               <img 
                 src={BUSINESS_IMAGE_URL} 
                 alt="Business owner analyzing growth" 
                 className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            </div>

            {/* Floating Elements - "Decorations" */}
            
            {/* Element 1: Growth Chart (Replaces Visa Card) */}
            <div className="absolute -left-6 top-24 z-20 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 animate-bounce-slow max-w-[200px]">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-green-100 rounded-md text-green-600">
                        <TrendingUp size={16} />
                    </div>
                    <span className="text-xs font-bold text-slate-700">Revenue</span>
                </div>
                <span className="text-[10px] text-green-600 font-bold">+42%</span>
              </div>
              {/* Fake Chart Lines */}
              <div className="flex items-end gap-1 h-12 w-full">
                <div className="w-1/5 bg-slate-100 h-[40%] rounded-t-sm"></div>
                <div className="w-1/5 bg-slate-100 h-[60%] rounded-t-sm"></div>
                <div className="w-1/5 bg-slate-100 h-[50%] rounded-t-sm"></div>
                <div className="w-1/5 bg-slate-100 h-[80%] rounded-t-sm"></div>
                <div className="w-1/5 bg-teal-500 h-[100%] rounded-t-sm"></div>
              </div>
            </div>

            {/* Element 2: Approval Badge (Replaces Scholarship Badge) */}
            <div className="absolute -right-4 bottom-28 z-20 bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-xl border border-slate-100 animate-float max-w-[220px]">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-teal-100 rounded-full text-teal-600">
                  <Building2 size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">₹50 Lakhs</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <CheckCircle2 size={12} className="text-green-500" />
                    <p className="text-[11px] text-slate-500">Sanctioned Instantly</p>
                  </div>
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

export default BusinessLoanHero;