"use client";
import React, { FC } from 'react';
import { Check, Star, Crown, Percent } from 'lucide-react';

// Data for the main features/benefits list
const features: string[] = [
    'Track your credit score all the time and stay financially healthy',
    'Get exclusive Loans and Credit Card offers',
    'Enjoy a seamless experience',
];

// Placeholder URLs
const googlePlayUrl = "/googleplay.png";
const appStoreUrl = "/appstore.png";
const qrCodeUrl = "/qr.png";

// Main MobileAppDownload Component
const MobileAppDownload: FC = () => {
    
    return (
        <div className="bg-white font-inter py-12 sm:py-16 lg:py-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <header className="text-center mb-12 lg:mb-16">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
                        Download the Six Loan App
                    </h1>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mt-2">
                        Mobile App
                    </h2>
                    {/* The dark horizontal line under the title */}
                    <div className="mt-4 mx-auto h-1.5 w-48 sm:w-64 bg-gray-800 rounded-full"></div>
                </header>

                {/* Content Layout: Left (Features/Downloads) and Right (Mobile Mockup) */}
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
                    
                    {/* Left Column: Features and Download Links */}
                    <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
                        
                        {/* Features List */}
                        <ul className="space-y-4 sm:space-y-6 mb-8 w-full max-w-md mx-auto lg:mx-0">
                            {features.map((feature, index) => (
                                <li key={index} className="flex items-start text-base sm:text-lg text-gray-800 justify-center lg:justify-start text-left">
                                    <Check className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800 mr-3 mt-1 shrink-0" strokeWidth={3} />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>

                        {/* Download Instructions */}
                        <p className="text-base sm:text-lg font-semibold text-gray-800 mb-6 mt-4">
                            Scan or click to Download App on your mobile
                        </p>

                        {/* Download Links (QR and App Stores) */}
                        <div className="flex flex-col sm:flex-row items-center space-y-6 sm:space-y-0 sm:space-x-6 w-full max-w-md justify-center lg:justify-start">
                            {/* QR Code */}
                            <img src={qrCodeUrl} alt="QR Code" className="w-24 h-24 rounded-lg border border-gray-200" />
                            
                            <div className="text-lg font-bold text-gray-700 hidden sm:block">OR</div>

                            {/* App Store Buttons */}
                            <div className="flex flex-col space-y-3">
                                <a href="#google-play" aria-label="Get it on Google Play">
                                    <img src={googlePlayUrl} alt="Google Play Store" className="h-10 sm:h-11 w-auto object-contain" />
                                </a>
                                <a href="#app-store" aria-label="Download on the App Store">
                                    <img src={appStoreUrl} alt="App Store" className="h-10 sm:h-11 w-auto object-contain" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Mobile Mockup and Highlights */}
                    <div className="w-full lg:w-1/2 flex justify-center relative p-4 sm:p-8 mt-8 lg:mt-0">
                        
                        {/* Mobile Phone Mockup */}
                        <div className="relative w-64 h-[32rem] bg-gray-900 rounded-[2.5rem] shadow-2xl border-[10px] border-gray-900 overflow-hidden z-10">
                            {/* Inner Screen */}
                            <img 
                                src="https://www.paisabazaar.com/wp-content/uploads/2025/08/CIBIL-Score-Range-%E2%80%93-What-It-Means-for-You.jpg" 
                                alt="Paisabazaar Mobile App Interface" 
                                className="w-full h-full object-cover" 
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.onerror = null;
                                    target.src = "https://placehold.co/300x600/F5F5F5/4B5563?text=App+Screen";
                                }}
                            />
                            {/* Camera/Speaker notch */}
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-gray-900 rounded-b-xl z-10"></div>
                        </div>

                        {/* Floating Highlights - Hidden on mobile/small tablets (md and below) to prevent overlap/overflow */}
                        
                        {/* 1. Credit Score (Left side, slightly above middle) */}
                        <div className="hidden md:flex absolute left-0 top-[28%] -translate-x-1/4 transform -translate-y-1/2 z-20">
                            <div className="bg-white p-3 sm:p-4 rounded-xl shadow-lg flex items-center gap-3 pr-6 sm:pr-8">
                                <div className="relative w-12 h-12 sm:w-16 sm:h-16">
                                    <img src="https://img.freepik.com/free-vector/modern-credit-score-scale-meter-concept-design_1017-53354.jpg?semt=ais_hybrid&w=740&q=80" alt="Credit Score Gauge" className="w-full h-full object-contain" onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.onerror = null;
                                        target.src = "https://placehold.co/64x64/F3F4F6/6B7280?text=Gauge";
                                    }}/>
                                </div>
                                <div>
                                    <p className="text-xs sm:text-sm font-semibold text-gray-500">App Highlights</p>
                                    <p className="text-lg sm:text-xl font-bold text-gray-900 whitespace-nowrap">Credit Score</p>
                                </div>
                            </div>
                        </div>

                        {/* 2. Play Store Rating (Bottom Left) */}
                        <div className="hidden md:flex absolute left-0 bottom-[18%] -translate-x-1/4 z-20">
                            <div className="bg-white p-3 sm:p-4 rounded-xl shadow-lg flex items-center gap-3">
                                <span className="text-2xl sm:text-3xl font-bold text-gray-900">4.4</span>
                                <Star className="w-5 h-5 sm:w-6 sm:h-6 fill-yellow-400 text-yellow-400" />
                                <span className="text-xs sm:text-sm text-gray-700">Play Store Rating</span>
                            </div>
                        </div>

                        {/* 3. App Exclusive Benefits (Right side, slightly above middle) */}
                        <div className="hidden md:flex absolute right-0 top-[30%] translate-x-1/4 transform -translate-y-1/2 z-20">
                            <div className="bg-white p-3 sm:p-4 rounded-xl shadow-lg flex items-center gap-3 pr-6 sm:pr-8">
                                <Crown className="w-6 h-6 sm:w-8 sm:h-8 text-orange-400 fill-orange-400" />
                                <span className="text-sm sm:text-base font-bold text-gray-900 whitespace-nowrap">App Exclusive Benefits</span>
                            </div>
                        </div>

                        {/* 4. Personalized Offers (Bottom Right) */}
                        <div className="hidden md:flex absolute right-0 bottom-[18%] translate-x-1/4 z-20">
                            <div className="bg-white p-3 sm:p-4 rounded-xl shadow-lg flex items-center gap-3 pr-6 sm:pr-8">
                                <Percent className="w-6 h-6 sm:w-8 sm:h-8 text-pink-600 fill-pink-600" />
                                <div className='flex flex-col'>
                                    <span className="text-xs sm:text-sm font-semibold text-gray-500">App Highlights</span>
                                    <span className="text-sm sm:text-base font-bold text-gray-900 whitespace-nowrap">Personalized Offers</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileAppDownload;