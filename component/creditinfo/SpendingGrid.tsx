"use client";
import React from "react";

export default function SpendingGrid() {
  return (
    <section className="w-full bg-white py-8 sm:py-10">
      {/* Heading */}
      <div className="text-center mb-8 sm:mb-10">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900">
          Smarter Spending
        </h2>
        <div className="mt-1 text-2xl sm:text-3xl font-serif font-semibold text-gray-900">
          Stars <span className="relative inline-block text-teal-600">Here
            <span className="absolute left-0 right-0 -bottom-1 h-[3px] bg-teal-400 rounded-full"></span>
          </span>
        </div>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* 1. Global Acceptance (spans 2 columns on large) */}
          <div className="rounded-2xl sm:col-span-3 lg:col-span-2">
            <img
              src="/creditcard/image 670.png"
              alt="Global Acceptance"
              className="w-full h-56 sm:h-72 md:h-80 object-cover rounded-xl"
            />
          </div>

          {/* 2. Zero Transaction Fee */}
          <div className="rounded-2xl bg-[#FCF3EE] shadow-sm border border-gray-200 p-4 flex flex-col justify-between">
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold text-black">Zero Transaction
                <br /> Fee
              </h3>
              <p className="mt-3 text-gray-700">
                Avail all the benefits without any extra payment
              </p>
            </div>
            <div className="mt-4 flex justify-end">
              <img
                src="/creditcard/6089338-01 2.png"
                alt="Credit card"
                className="h-25 w-auto sm:h-30 md:h-38 lg:h-43 object-contain"
              />
            </div>

          </div>

          {/* 3. We Help Boost Your Credit Score */}
          <div className="rounded-2xl bg-[#E4E9FF] shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl sm:text-2xl font-semibold text-black text-center">
              We Help Boost Your
              <br /> Credit Score
            </h3>
            <div className="mt-6 sm:mt-10 md:mt-20 flex justify-center">
              <img
                src="/creditcard/image-removebg-preview 1.png"
                alt="Credit score gauge"
                className="h-36 sm:h-44 md:h-48 w-auto object-contain"
              />
            </div>
          </div>

          {/* 4. Step Up Credit Card */}
          <div className="rounded-2xl bg-[#E5F1F1] shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg sm:text-xl font-semibold text-black">Step Up Credit Card</h3>
            <ul className="mt-4 space-y-3 text-gray-800">
              <li className="flex items-start gap-2"><span className="text-teal-600 mt-1">•</span> Credit Card on Fixed Deposit</li>
              <li className="flex items-start gap-2"><span className="text-teal-600 mt-1">•</span> Card Limit is 90% of FD Amount</li>
              <li className="flex items-start gap-2"><span className="text-teal-600 mt-1">•</span> Helps build Credit Score</li>
            </ul>
            <div className="mt-6 flex justify-center">
              <img
                src="/creditcard/Credit card mockup-4.png"
                alt="Card mockup"
                className="h-28 sm:h-32 w-auto object-contain"
              />
            </div>
            <div className="mt-4">
              <button className="px-4 py-2 rounded-md bg-[#424242] text-white text-sm">Know More</button>
            </div>
          </div>

          {/* 5. Your Transaction is Secure */}
          <div className="rounded-2xl bg-[#BECCCC96] shadow-sm border border-gray-200 p-6 flex flex-col">
            <h3 className="text-xl sm:text-2xl font-semibold text-black">
              Your Transaction
              <br /> is Secure
            </h3>
            <div className="mt-6 sm:mt-8 md:mt-10 flex-1 flex items-center justify-center">
              <img
                src="/creditcard/image 675.png"
                alt="Secure green tick"
                className="h-36 sm:h-44 md:h-48 w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
