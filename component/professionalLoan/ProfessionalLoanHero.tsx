"use client";
import React from 'react';
import { ArrowRight, Briefcase, Building2, GraduationCap, TrendingUp, CheckCircle2, FileCheck } from 'lucide-react';

// Placeholders - specialized for Professional Loan theme
// Image: A modern, confident professional setting or workspace
const PROFESSIONAL_IMAGE_URL = "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2032&auto=format&fit=crop"; 

const AVATAR_1 = "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=64&h=64";
const AVATAR_2 = "https://images.unsplash.com/photo-1573496359-0cf84adb0052?auto=format&fit=crop&w=64&h=64";
const AVATAR_3 = "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=64&h=64";

export const ProfessionalLoanHero: React.FC = () => {
  return (
    <div className="relative min-h-[800px] w-full flex items-center justify-center overflow-hidden font-sans bg-slate-50">
      
      {/* Background: teal/teal Gradient Mesh + Grid Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-200/40 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-100/60 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4"></div>
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[40px_40px]"></div>
      </div>

      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-0 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* LEFT COLUMN: Text Content */}
          <div className="flex flex-col items-start space-y-8 order-2 lg:order-1">
            
            {/* 1. Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 border border-teal-100 shadow-sm animate-fade-in-up">
              <span className="flex h-2 w-2 rounded-full bg-teal-600 animate-pulse"></span>
              <span className="text-teal-800 text-sm font-semibold tracking-wide uppercase">
                Exclusive for Doctors, CAs & Architects
              </span>
            </div>

            {/* 2. Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-slate-900 leading-[1.1]">
              Scale Your Practice <br />
              <span className="text-teal-700 relative inline-block">
                Without Limits
                {/* Underline SVG */}
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-teal-300 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
                </svg>
              </span>
            </h1>

            {/* 3. Subtext */}
            <p className="text-lg text-slate-600 max-w-lg leading-relaxed">
              Unsecured loans designed for professionals. Get high loan amounts up to ₹50 Lakhs with minimal documentation and zero collateral.
            </p>

            {/* 4. Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button className="flex items-center justify-center gap-2 bg-teal-700 hover:bg-teal-800 text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-lg shadow-teal-200 hover:shadow-teal-300 transform hover:-translate-y-1">
                Check Eligibility
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <button className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 px-8 py-4 rounded-xl font-semibold border border-slate-200 shadow-sm transition-all hover:border-teal-200">
                <Briefcase className="w-5 h-5 text-teal-500" />
                View Benefits
              </button>
            </div>

            {/* 5. Trust Indicators */}
            <div className="pt-6 border-t border-slate-200 w-full">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[AVATAR_1, AVATAR_2, AVATAR_3].map((src, i) => (
                    <img key={i} src={src} alt="Happy Customer" className="w-10 h-10 rounded-full border-2 border-white ring-1 ring-slate-100 object-cover" />
                  ))}
                </div>
                <div className="text-sm">
                  <p className="font-bold text-slate-900">Trusted by 10,000+ Professionals</p>
                  <p className="text-slate-500">Fast Disbursal • No Collateral</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Visuals */}
          <div className="relative h-[500px] lg:h-[650px] w-full flex items-center justify-center order-1 lg:order-2">
            
            {/* Main Image Container */}
            <div className="relative z-10 w-full h-full rounded-[2.5rem] overflow-hidden shadow-2xl shadow-teal-900/10 rotate-1 border-[6px] border-white">
               <img 
                 src={PROFESSIONAL_IMAGE_URL} 
                 alt="Professional meeting" 
                 className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
               />
               
               {/* Overlay Gradient */}
               <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent"></div>
            </div>

            {/* Floating Elements - "Decorations" */}
            
            {/* Element 1: High Limit Badge */}
            <div className="absolute -left-6 top-24 z-20 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 animate-bounce-slow max-w-[200px]">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-teal-100 rounded-lg text-teal-600">
                  <TrendingUp size={20} />
                </div>
                <span className="text-xs font-bold text-slate-800">High Approval</span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-teal-600 w-[95%]"></div>
              </div>
              <p className="text-[10px] text-slate-500 mt-1 text-right">Up to ₹50 Lakhs</p>
            </div>

            {/* Element 2: Features Badge */}
            <div className="absolute -right-4 bottom-32 z-20 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 animate-float max-w-[220px]">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-green-100 rounded-full text-green-600">
                  <FileCheck size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Minimal Docs</p>
                  <p className="text-xs text-slate-500">Quick Verification</p>
                </div>
              </div>
            </div>

            {/* Element 3: Profession Icons (Tiny floating icons) */}
            <div className="absolute top-10 right-10 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg animate-pulse">
                <GraduationCap className="w-5 h-5 text-teal-600" />
            </div>
            <div className="absolute bottom-20 left-10 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg animate-pulse delay-700">
                <Building2 className="w-5 h-5 text-teal-600" />
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

export default ProfessionalLoanHero;