"use client";
import React from 'react';
import { ArrowUpRight, CheckCircle2, ShieldCheck, Zap, Star } from 'lucide-react';

const MAN_IMAGE_URL = "/business1.png"; 

export const ProfessionalHero: React.FC = () => {
  return (
    <div
      className=" flex items-center justify-center relative overflow-hidden font-sans p-6 md:p-10"
      style={{
        background: 'linear-gradient(135deg, #FDFDFD 0%, #F0F7F4 100%)' 
      }}
    >
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-0 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* LEFT CONTENT: Focus on the Highlighted Loan Term */}
          {/* Removed 'order-1' so it naturally appears first */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6 md:space-y-8 z-10">

            <div className="inline-flex items-center space-x-2 bg-white border border-slate-200 rounded-full px-4 py-1.5 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-[#1CBEA2]" />
              <span className="text-slate-600 font-bold text-xs uppercase tracking-widest">
                Tier-1 Financial Excellence
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-[#002B20] leading-[1.05] tracking-tight">
              Get Your <br />
              <span className="relative inline-block text-[#1CBEA2]">
                Professional Loan
                {/* Visual Highlight Underline */}
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#5DA732]/30" viewBox="0 0 300 12" fill="none">
                  <path d="M4 8C50 2 150 2 296 8" stroke="currentColor" strokeWidth="8" strokeLinecap="round"/>
                </svg>
              </span>
              <br /> Approved Today.
            </h1>

            <p className="text-slate-600 text-lg md:text-xl max-w-xl leading-relaxed">
              We provide bespoke capital solutions for established professionals and growing firms. Low-interest rates, high-limit credit lines, and dedicated account management.
            </p>

            <div className="grid grid-cols-2 gap-4 w-full max-w-md">
              <div className="flex items-center gap-2">
                <div className="bg-[#1CBEA2]/10 p-1 rounded-full">
                   <CheckCircle2 className="w-4 h-4 text-[#1CBEA2]" />
                </div>
                <span className="text-sm font-semibold text-slate-700">Fixed Rates</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-[#1CBEA2]/10 p-1 rounded-full">
                   <CheckCircle2 className="w-4 h-4 text-[#1CBEA2]" />
                </div>
                <span className="text-sm font-semibold text-slate-700">No Hidden Costs</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto">
              <button className="group bg-[#1CBEA2] hover:bg-[#17a58d] text-white px-10 py-4 rounded-xl font-bold transition-all shadow-xl shadow-[#1CBEA2]/20 flex items-center justify-center gap-2">
                Start Application
                <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
              <button className="bg-white hover:bg-slate-50 text-[#002B20] px-10 py-4 rounded-xl font-bold border-2 border-[#002B20] transition-all flex items-center justify-center">
                Contact Expert
              </button>
            </div>

            {/* Credibility Section */}
            <div className="flex items-center gap-6 pt-4">
               <div className="flex flex-col">
                  <div className="flex text-yellow-500 mb-1">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-sm font-bold text-slate-900 italic">"Simplifying corporate debt"</p>
               </div>
               <div className="h-10 w-px bg-slate-200"></div>
               <p className="text-sm text-slate-500 max-w-[150px]">Trusted by over <strong>10,000+</strong> practitioners.</p>
            </div>
          </div>

          {/* RIGHT VISUALS: Professional Overlays */}
          {/* CHANGED: 'hidden' on mobile, 'lg:flex' on desktop */}
          <div className="hidden lg:flex lg:col-span-5 relative h-[500px] lg:h-[700px] items-end justify-center">
            
            <div className="absolute inset-0  bg-gradient-to-tr from-[#002B20]/10 to-transparent rounded-[60px] translate-x-4 translate-y-4"></div>
            
            <img
              src={MAN_IMAGE_URL}
              alt="Professional Finance Advisor"
              className="relative z-10 w-full h-full object-contain drop-shadow-2xl grayscale-20 hover:grayscale-0 transition-all duration-500"
            />

            {/* Score Indicator Overlay */}
            <div className="absolute top-1/4 -left-12 z-20 bg-white p-5 rounded-2xl shadow-2xl border border-slate-100 hidden md:block">
               <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Recommended Credit Score</p>
               <div className="flex items-end gap-2">
                  <span className="text-3xl font-black text-[#1CBEA2]">740+</span>
                  <span className="text-xs font-bold text-slate-500 mb-1">Excellent</span>
               </div>
               <div className="w-full h-1.5 bg-slate-100 rounded-full mt-2">
                  <div className="w-3/4 h-full bg-[#1CBEA2] rounded-full"></div>
               </div>
            </div>

            {/* Instant Quote Badge */}
            <div className="absolute bottom-20 -right-6 z-20 bg-[#002B20] text-white p-6 rounded-3xl shadow-2xl hidden lg:block border-4 border-white">
              <Zap className="w-8 h-8 text-[#1CBEA2] mb-2" />
              <p className="text-xs font-medium opacity-80 uppercase tracking-tighter">Fast Tracked</p>
              <p className="text-xl font-bold italic underline">6-Hour Funding</p>
            </div>
          </div>

        </div>
      </div>

      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1CBEA2]/5 rounded-full blur-[120px] -z-10"></div>
    </div>
  );
};

export default ProfessionalHero;