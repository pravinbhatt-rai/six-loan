"use client";
import React from "react";

export default function SpendingGrid() {
  return (
    <section className="w-full bg-white py-8 sm:py-10 md:py-12">
      {/* Heading */}
      <div className="text-center mb-6 sm:mb-8 md:mb-10 px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-gray-900">
          Smarter Spending
        </h2>
        <div className="mt-1 text-xl sm:text-2xl md:text-3xl font-serif font-semibold text-gray-900">
          Stars <span className="relative inline-block text-teal-600">Here
            <span className="absolute left-0 right-0 -bottom-1 h-[3px] bg-teal-400 rounded-full"></span>
          </span>
        </div>
      </div>

      {/* Grid - Mobile: 1 column, Tablet: 2 columns, Desktop: 3 columns */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {/* 1. Global Acceptance (spans full width on mobile, 2 cols on desktop) */}
          <div className="rounded-2xl md:col-span-2 lg:col-span-2">
            <img
              src="/creditcard/image 670.png"
              alt="Global Acceptance"
              className="w-full h-48 sm:h-56 md:h-64 lg:h-80 object-cover rounded-xl"
            />
          </div>

          {/* 2. Zero Transaction Fee */}
          <div className="rounded-2xl bg-[#FCF3EE] shadow-sm border border-gray-200 p-4 sm:p-5 md:p-6 flex flex-col justify-between min-h-[200px] sm:min-h-60">
            <div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-black leading-tight">
                Zero Transaction
                <br /> Fee
              </h3>
              <p className="mt-2 sm:mt-3 text-sm sm:text-base text-gray-700">
                Avail all the benefits without any extra payment
              </p>
            </div>
            <div className="mt-4 flex justify-end">
              <img
                src="/creditcard/6089338-01 2.png"
                alt="Credit card"
                className="h-20 sm:h-24 md:h-32 lg:h-40 w-auto object-contain"
              />
            </div>
          </div>

          {/* 3. We Help Boost Your Credit Score */}
          <div className="rounded-2xl bg-[#E4E9FF] shadow-sm border border-gray-200 p-4 sm:p-5 md:p-6 min-h-[200px] sm:min-h-60">
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-black text-center leading-tight">
              We Help Boost Your
              <br /> Credit Score
            </h3>
            <div className="mt-6 sm:mt-8 md:mt-12 flex justify-center">
              <img
                src="/creditcard/image-removebg-preview 1.png"
                alt="Credit score gauge"
                className="h-28 sm:h-36 md:h-44 w-auto object-contain"
              />
            </div>
          </div>

          {/* 4. Step Up Credit Card */}
          <div className="rounded-2xl bg-[#E5F1F1] shadow-sm border border-gray-200 p-4 sm:p-5 md:p-6 min-h-[200px] sm:min-h-60">
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-black">Step Up Credit Card</h3>
            <ul className="mt-3 sm:mt-4 space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-800">
              <li className="flex items-start gap-2">
                <span className="text-teal-600 mt-1 text-lg">•</span>
                <span>Credit Card on Fixed Deposit</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-600 mt-1 text-lg">•</span>
                <span>Card Limit is 90% of FD Amount</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-600 mt-1 text-lg">•</span>
                <span>Helps build Credit Score</span>
              </li>
            </ul>
            <div className="mt-4 sm:mt-5 flex justify-center">
              <img
                src="/creditcard/Credit card mockup-4.png"
                alt="Card mockup"
                className="h-24 sm:h-28 md:h-32 w-auto object-contain"
              />
            </div>
            <div className="mt-3 sm:mt-4">
              <button className="px-4 py-2 rounded-md bg-[#424242] text-white text-xs sm:text-sm hover:bg-gray-700 transition-colors">
                Know More
              </button>
            </div>
          </div>

          {/* 5. Your Transaction is Secure */}
          <div className="rounded-2xl bg-[#BECCCC96] shadow-sm border border-gray-200 p-4 sm:p-5 md:p-6 flex flex-col min-h-[200px] sm:min-h-60">
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-black leading-tight">
              Your Transaction
              <br /> is Secure
            </h3>
            <div className="mt-6 sm:mt-8 md:mt-10 flex-1 flex items-center justify-center">
              <img
                src="/creditcard/image 675.png"
                alt="Secure green tick"
                className="h-28 sm:h-36 md:h-44 w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
