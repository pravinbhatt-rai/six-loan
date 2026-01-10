"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react"; 
import LoanCalculator from "@/component/PersonalLoan/LoanCalculator";

export default function CreditCardSection() {
  const router = useRouter();
  return (
    <section className="bg-white w-full py-8 sm:py-10 md:py-12 lg:py-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 px-4 sm:px-6 lg:px-8 items-start">
        {/* Left content - REMOVED sticky on mobile */}
        <div className="space-y-4 sm:space-y-5 md:space-y-6 lg:sticky lg:top-20">
          <div className="inline-flex rounded-full bg-emerald-50 px-3 py-1 sm:px-4 sm:py-1.5">
            <span className="text-xs sm:text-sm font-medium text-emerald-700">
              Smart Credit Card Match
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 leading-tight">
            Find the Right Credit Card
            <span className="block text-[#3469CB]">for Every Spend</span>
          </h2>

          <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-xl">
            Compare top cards across banks, annual fees and reward structures.
            Pick the one that fits your lifestyle &mdash; from groceries and
            online shopping to fuel, travel and utilities.
          </p>

          <ul className="space-y-2 text-xs sm:text-sm md:text-base text-gray-700 list-disc list-inside pl-1">
            <li>See best and top recommended cards in one place</li>
            <li>Understand benefits clearly before you apply</li>
            <li>No hidden charges &mdash; compare fees and rewards upfront</li>
          </ul>

          <button 
            onClick={() => router.push("/creditcards")}
            className="group mt-4 inline-flex items-center justify-center gap-2 rounded-lg border border-gray-400 px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm md:text-base font-medium text-gray-700 hover:border-gray-700 hover:text-gray-900 transition-colors"
          >
            <span>Explore all credit cards</span>
            <ChevronRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
        </div>

        {/* Right visual: reuse shared LoanCalculator */}
        <div className="flex justify-center lg:justify-end">
          <LoanCalculator />
        </div>
      </div>
    </section>
  );
}