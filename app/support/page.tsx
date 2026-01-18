import React from 'react';
import SupportFAQ from '@/component/support/SupportFAQ'; 
import { LifeBuoy, BookOpen, MessageCircle } from 'lucide-react';

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-serif text-gray-800 overflow-x-hidden">
      
      {/* --- Hero Section --- */}
      {/* Reduced padding on mobile (pt-16 pb-20) vs desktop (pt-24 pb-32) */}
      <section className="relative w-full bg-teal-900 text-white pt-16 pb-20 md:pt-24 md:pb-32 overflow-hidden">
        {/* Abstract Background - Toned down sizes for mobile */}
        <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
             <div className="absolute right-0 top-0 w-64 h-64 md:w-[500px] md:h-[500px] bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-20"></div>
             <div className="absolute left-0 bottom-0 w-64 h-64 md:w-[400px] md:h-[400px] bg-teal-400 rounded-full mix-blend-overlay filter blur-3xl opacity-20"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-teal-800/50 backdrop-blur-sm px-3 py-1 md:px-4 md:py-1 rounded-full border border-teal-700 mb-6">
            <LifeBuoy size={14} className="text-teal-300 md:w-4 md:h-4" />
            <span className="text-[10px] md:text-xs uppercase tracking-widest font-semibold text-teal-100 font-serif">Help Center</span>
          </div>
          
          {/* Responsive Heading: Scaled down to prevent wrapping issues */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 md:mb-6 italic leading-tight">
            How can we help you today?
          </h1>
          <p className="text-teal-100 text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed px-2">
            Browse our knowledge base or search for specific questions regarding your loans, credit cards, or account settings.
          </p>
        </div>
      </section>

      {/* --- Interactive Section (Client Component) --- */}
      {/* Wrapper ensures z-index works with negative margins */}
      <div className="relative z-20">
         <SupportFAQ />
      </div>

      {/* --- Additional Help Cards (Static) --- */}
      {/* Reduced vertical padding: py-12 on mobile */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
         <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 italic">Still need assistance?</h2>
            <div className="w-16 h-1 bg-teal-500 mx-auto mt-4"></div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-1 gap-6 md:gap-8 max-w-4xl mx-auto">
            {/* Card 1 */}
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-md border border-gray-100 hover:border-teal-500 transition-colors group cursor-pointer text-center">
                {/* Scaled down icon container for mobile */}
                <div className="w-12 h-12 md:w-16 md:h-16 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:bg-teal-500 transition-colors">
                    <BookOpen className="text-teal-600 group-hover:text-white transition-colors w-6 h-6 md:w-8 md:h-8" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">User Guides</h3>
                <p className="text-sm md:text-base text-gray-500 mb-4 md:mb-6 leading-relaxed">Step-by-step documentation on how to use our EMI calculators and apply for loans.</p>
                <span className="text-teal-600 font-bold border-b-2 border-transparent group-hover:border-teal-600 transition-all text-sm md:text-base">
                    Browse Guides
                </span>
            </div>

            {/* Card 2 */}
            {/* <div className="bg-white  p-6 md:p-8 rounded-xl shadow-md border border-gray-100 hover:border-teal-500 transition-colors group cursor-pointer text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:bg-teal-500 transition-colors">
                    <MessageCircle className="text-teal-600 group-hover:text-white transition-colors w-6 h-6 md:w-8 md:h-8" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Live Chat</h3>
                <p className="text-sm md:text-base text-gray-500 mb-4 md:mb-6 leading-relaxed">Chat with our financial advisors in real-time for personalized assistance.</p>
                <span className="text-teal-600 font-bold border-b-2 border-transparent group-hover:border-teal-600 transition-all text-sm md:text-base">
                    Start Chat
                </span>
            </div> */}
         </div>
      </section>
      
    </div>
  );
}