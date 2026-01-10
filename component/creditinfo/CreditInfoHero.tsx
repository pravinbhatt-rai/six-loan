"use client";
import React from "react";

export default function CreditInfoHero() {
  return (
    <section className="bg-white w-full">
      {/* Responsive padding; keep right flush on desktop */}
      <div className="px-4 md:pl-6 lg:pl-8 md:pr-0 py-10">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Left content */}
          <div className="col-span-12 md:col-span-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-black leading-tight text-center md:text-left">
              Get Your Credit Card
              <br />
              Your Way
            </h1>
            <p className="mt-5 text-gray-700 max-w-xl text-center md:text-left">
              Compare and apply for a credit card designed around your
              lifestyle, spending habits, and financial goals, offering fast
              approvals, clear benefits, secure processing, and a smooth,
              hassle-free experience from start to finish.
            </p>

            <div className="mt-6 flex justify-center md:justify-start">
              <a href="/creditcards" className="bg-teal-500 hover:bg-teal-600 text-white rounded-md px-5 py-2.5 shadow-sm hover:opacity-95 inline-block">
                Apply Now
              </a>
            </div>

            {/* Card networks */}
            <div className="mt-8 flex items-center justify-center md:justify-start gap-6 flex-wrap">
              <img
                src="/creditcard/image 663.png"
                alt="Visa"
                className="h-7 sm:h-8 w-auto object-contain"
              />
              <img
                src="/creditcard/image 664.png"
                alt="Mastercard"
                className="h-7 sm:h-8 w-auto object-contain"
              />
              <img
                src="/creditcard/image 665.png"
                alt="RuPay"
                className="h-7 sm:h-8 w-auto object-contain"
              />
            </div>
          </div>

          {/* Right image at extreme right */}
          <div className="w-full md:w-auto justify-center md:justify-end md:ml-auto hidden md:flex">
            <img
              src="/creditcard/IMG-20251220-WA0013 1.png"
              alt="Hand holding credit card"
              className="h-48 sm:h-106 md:max-h-[460px] w-auto object-contain bottom-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
