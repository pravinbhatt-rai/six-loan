'use client';
import React from 'react';
import { ChevronRight, Check } from 'lucide-react';

const ApplySection = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 md:p-12 font-sans">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        
        {/* Left Column: Image with Dot Pattern */}
        <div className="relative w-full max-w-md mx-auto lg:max-w-full">
          {/* Decorative Dot Pattern */}
          <div className="absolute -top-10 -left-10 z-0 grid grid-cols-8 gap-2 opacity-100">
            {[...Array(64)].map((_, i) => (
              <div 
                key={i} 
                className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-teal-400"
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="relative z-10 rounded-4xl overflow-hidden shadow-xl aspect-4/5 lg:aspect-square">
            <img 
              src="/image1.png" 
              alt="Woman working at laptop" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Column: Content */}
        <div className="space-y-8">
          
          {/* Heading */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 leading-tight">
            You can apply as long as your:
          </h2>

          {/* Description */}
          <p className="text-gray-500 text-lg leading-relaxed max-w-lg">
            No matter your situation, you can apply if you meet these simple criteria as follow: We make the process straightforward and accessible.
          </p>

          {/* Checklist */}
          <div className="space-y-6 mt-8">
            <CheckItem text="Are at least 18 years old" />
            <CheckItem text="Income is steady" />
            <CheckItem text="ID is valid" />
            <CheckItem text="Bank account is active" />
          </div>

          {/* CTA Button */}
          <div className="pt-4">
            <button className="group flex items-center justify-between px-8 py-4 border border-gray-400 rounded-lg text-gray-700 font-medium text-lg hover:border-teal-500 hover:text-teal-600 transition-colors duration-300 min-w-[200px]">
              <span>Learn More</span>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-teal-500 transition-colors" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

 // Reusable Checklist Item Component
 const CheckItem = ({ text }: { text: string }) => (
   <div className="flex items-center gap-4 group cursor-default">
     <div className="shrink-0 w-8 h-8 rounded border-2 border-teal-400 flex items-center justify-center transition-colors group-hover:bg-teal-50">
       <Check className="w-5 h-5 text-teal-400 stroke-3" />
     </div>
     <span className="text-gray-600 text-lg group-hover:text-gray-900 transition-colors">
       {text}
     </span>
   </div>
 );

export default ApplySection;