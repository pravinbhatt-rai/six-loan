"use client";
import React, { FC } from 'react';
import { Check, Heart } from 'lucide-react';

// Component for the heart shield icon used in the bottom right corner
const HeartShieldIcon: FC = () => (
    <div className="absolute bottom-4 right-4 flex flex-col items-center">
        {/* Main Icon - A simple heart inside a shield shape (using a blend of components) */}
        <div className="relative w-12 h-12 bg-gray-800 rounded-t-full rounded-b-xl shadow-lg flex items-center justify-center">
            <Heart className="w-6 h-6 text-white z-10" fill="white" />
            {/* Simulated bottom edge of the shield */}
            <div className="absolute -bottom-1 h-3 w-8 bg-gray-800 transform rotate-45 -translate-x-3 rounded-b-lg"></div>
            <div className="absolute -bottom-1 h-3 w-8 bg-gray-800 transform -rotate-45 translate-x-3 rounded-b-lg"></div>
        </div>
        <p className="text-xs text-gray-600 mt-2 text-center whitespace-nowrap">Standard T &amp; C Apply</p>
    </div>
);

// Define the component for the main section and card
const InsuranceQuoteCard: FC = () => {
    return (
        <div className="bg-white font-inter ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <header className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 tracking-tight sm:text-5xl">
                        Let&apos;s Get You Insured
                    </h1>
                    {/* The dark horizontal line under the title */}
                    <div className="mt-4 mx-auto h-1.5 w-64 bg-gray-800 rounded-full"></div>
                </header>

                {/* Main Quote Card */}
                <div className="relative bg-white border border-gray-200 rounded-3xl shadow-2xl p-6 sm:p-10 md:p-12 max-w-5xl mx-auto">
                    
                    {/* Top Content Area */}
                    <div className="flex flex-col md:flex-row justify-between items-start mb-8">
                        
                        {/* Headline */}
                        <div className="mb-6 md:mb-0 md:w-2/3">
                            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
                                Get Instant Quote For Optima Secure 4X Coverage
                            </h2>
                        </div>

                        {/* Buttons */}
                        <div className="flex space-x-3 md:space-x-4">
                            <button className="px-5 py-2 text-sm font-semibold text-white bg-gray-800 rounded-md hover:bg-gray-700 transition-colors shadow-md whitespace-nowrap">
                                Health Insurance
                            </button>
                            <button className="px-5 py-2 text-sm font-semibold text-white bg-gray-800 rounded-md hover:bg-gray-700 transition-colors shadow-md whitespace-nowrap">
                                Know More
                            </button>
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-4 gap-x-8 text-lg font-medium text-gray-800">
                        
                        {/* Feature 1 */}
                        <div className="flex items-start">
                            <Check className="w-5 h-5 text-gray-800 mr-3 mt-1 shrink-0" strokeWidth={3} />
                            <span>Zero Deduction On Non-Medical Expenses</span>
                        </div>

                        {/* Feature 2 */}
                        <div className="flex items-start">
                            <Check className="w-5 h-5 text-gray-800 mr-3 mt-1 shrink-0" strokeWidth={3} />
                            <span>100% Increase In Coverage After 2 Years</span>
                        </div>

                        {/* Feature 3 */}
                        <div className="flex items-start">
                            <Check className="w-5 h-5 text-gray-800 mr-3 mt-1 shrink-0" strokeWidth={3} />
                            <span>2X Coverage From Day 1</span>
                        </div>

                        {/* Feature 4 */}
                        <div className="flex items-start">
                            <Check className="w-5 h-5 text-gray-800 mr-3 mt-1 shrink-0" strokeWidth={3} />
                            <span>100% Restore Benefit</span>
                        </div>
                    </div>

                    {/* Footer Icon and Text */}
                    <HeartShieldIcon />

                </div>
            </div>
        </div>
    );
};

export default InsuranceQuoteCard;