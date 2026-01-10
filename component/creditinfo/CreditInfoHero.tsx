"use client";
import React from "react";

export default function CreditInfoHero() {
  return (
    <section className="bg-white w-full">
      {/* Responsive padding */}
      <div className="px-4 sm:px-6 md:pl-8 lg:pl-12 md:pr-0 py-8 sm:py-10 md:py-12">
        <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8 md:gap-10">
          {/* Left content */}
          <div className="w-full md:w-1/2 lg:w-7/12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-black leading-tight text-center md:text-left">
              Get Your Credit Card
              <br />
              Your Way
            </h1>
            <p className="mt-4 sm:mt-5 text-sm sm:text-base text-gray-700 max-w-xl mx-auto md:mx-0 text-center md:text-left">
              Compare and apply for a credit card designed around your
              lifestyle, spending habits, and financial goals, offering fast
              approvals, clear benefits, secure processing, and a smooth,
              hassle-free experience from start to finish.
            </p>

            <div className="mt-5 sm:mt-6 flex justify-center md:justify-start">
              <a href="/creditcards" className="bg-teal-500 hover:bg-teal-600 text-white rounded-md px-5 py-2.5 shadow-sm hover:opacity-95 inline-block text-sm sm:text-base font-medium transition-colors">
                Apply Now
              </a>
            </div>

            {/* Card networks */}
            <div className="mt-6 sm:mt-8 flex items-center justify-center md:justify-start gap-4 sm:gap-6 flex-wrap">
              <img
                src="/creditcard/image 663.png"
                alt="Visa"
                className="h-6 sm:h-7 md:h-8 w-auto object-contain"
              />
              <img
                src="/creditcard/image 664.png"
                alt="Mastercard"
                className="h-6 sm:h-7 md:h-8 w-auto object-contain"
              />
              <img
                src="/creditcard/image 665.png"
                alt="RuPay"
                className="h-6 sm:h-7 md:h-8 w-auto object-contain"
              />
            </div>
          </div>

          {/* Right image - Hidden on small screens, visible from md */}
          <div className="w-full md:w-1/2 lg:w-5/12 justify-center md:justify-end md:ml-auto hidden md:flex">
            <img
              src="/creditcard/IMG-20251220-WA0013 1.png"
              alt="Hand holding credit card"
              className="h-48 sm:h-64 md:h-80 lg:h-96 xl:max-h-[460px] w-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
