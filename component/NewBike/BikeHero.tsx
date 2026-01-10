"use client";
import React from 'react';
import { ArrowRight, Bike, Zap, Gauge, Key, CheckCircle2 } from 'lucide-react';

// Placeholders - specialized for Bike Loan theme
// A high-quality image of a rider or a sleek motorcycle
const BIKE_IMAGE_URL = "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=2070&q=80"; 

const AVATAR_1 = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64";
const AVATAR_2 = "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=64&h=64";
const AVATAR_3 = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=64&h=64";

export const BikeHero: React.FC = () => {
  return (
    <div className="relative min-h-[800px] w-full flex items-center justify-center overflow-hidden font-sans bg-slate-50">
      
      {/* Background: Teal Gradient Mesh + Asphalt/Road Texture */}
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
              <span className="flex h-2 w-2 rounded-full bg-teal-500 animate-pulse"></span>
              <span className="text-teal-700 text-sm font-semibold tracking-wide uppercase">
                100% On-Road Funding
              </span>
            </div>

            {/* 2. Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-slate-900 leading-[1.1]">
              Ride Your <br />
              <span className="text-teal-600 relative inline-block">
                Dream Machine
                {/* Underline SVG */}
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-teal-300 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
                </svg>
              </span>
              <br /> Without Waiting.
            </h1>

            {/* 3. Subtext */}
            <p className="text-lg text-slate-600 max-w-lg leading-relaxed">
              From daily commuters to premium superbikes — get up to 100% financing. Enjoy flexible tenures and interest rates starting @ 9.99%.
            </p>

            {/* 4. Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button className="flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-lg shadow-teal-200 hover:shadow-teal-300 transform hover:-translate-y-1">
                Check Eligibility
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <button className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 px-8 py-4 rounded-xl font-semibold border border-slate-200 shadow-sm transition-all hover:border-teal-200">
                <Bike className="w-5 h-5 text-teal-500" />
                View Loan Offers
              </button>
            </div>

            {/* 5. Trust Indicators */}
            <div className="pt-6 border-t border-slate-200 w-full">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[AVATAR_1, AVATAR_2, AVATAR_3].map((src, i) => (
                    <img key={i} src={src} alt="Rider" className="w-10 h-10 rounded-full border-2 border-white ring-1 ring-slate-100" />
                  ))}
                </div>
                <div className="text-sm">
                  <p className="font-bold text-slate-900">10k+ Happy Riders</p>
                  <p className="text-slate-500">Funded across 50+ Cities</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Visuals */}
          <div className="relative h-[500px] lg:h-[650px] w-full flex items-center justify-center order-1 lg:order-2">
            
            {/* Main Image Container with Blob Shape */}
            <div className="relative z-10 w-full h-full rounded-[2.5rem] overflow-hidden shadow-2xl shadow-teal-900/10 -rotate-1 border-[6px] border-white">
               <img 
                 src={BIKE_IMAGE_URL} 
                 alt="Person riding a motorcycle" 
                 className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
               />
               
               {/* Overlay Gradient for text readability if needed */}
               <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent"></div>
            </div>

            {/* Floating Elements - "Decorations" */}
            
            {/* Element 1: Approval Status */}
            <div className="absolute -left-6 top-24 z-20 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 animate-bounce-slow max-w-[200px]">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-100 rounded-lg text-green-600">
                  <CheckCircle2 size={20} />
                </div>
                <span className="text-xs font-bold text-slate-800">Pre-Approved</span>
              </div>
              <div className="flex items-center gap-2">
                 <div className="text-2xl font-bold text-slate-900">₹2.5L</div>
                 <span className="text-[10px] px-2 py-0.5 bg-green-50 text-green-700 rounded-full font-medium">Ready</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1">Instant Disbursal</p>
            </div>

            {/* Element 2: Zero Down Payment Badge */}
            <div className="absolute -right-4 bottom-28 z-20 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 animate-float max-w-[210px]">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-teal-100 rounded-full text-teal-600">
                  <Key size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Zero Down Payment</p>
                  <p className="text-xs text-slate-500">Drive home today</p>
                </div>
              </div>
            </div>

             {/* Element 3: Speed/Efficiency Badge (Optional tiny floater) */}
             <div className="hidden sm:flex absolute right-10 top-10 z-20 bg-slate-900 text-white px-3 py-1.5 rounded-full shadow-lg animate-pulse items-center gap-2">
                <Zap size={14} className="text-yellow-400 fill-current" />
                <span className="text-xs font-bold">Paperless Process</span>
             </div>

            {/* Decorative Background Shape behind image */}
            <div className="absolute top-10 -right-10 w-full h-full border-2 border-dashed border-teal-300 rounded-[2.5rem] rotate-2 -z-10"></div>
            
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

export default BikeHero;