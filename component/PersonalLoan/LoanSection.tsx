'use client';
import React, { memo } from 'react';
import { ChevronRight } from 'lucide-react';
import LoanCalculator from '@/component/PersonalLoan/LoanCalculator';

const LoanSection = memo(() => {
    return (
        <section className="bg-white min-h-screen w-full flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 lg:py-0">
            <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

                {/* Left Side: Content - Removed 'order-2 lg:order-1' so it stays first naturally */}
                <div className="flex flex-col items-start space-y-6">
                    {/* Badge */}
                    <div className="bg-green-50 px-6 py-2 rounded-full inline-block">
                        <span className="text-teal-500 font-medium">Calculate loan</span>
                    </div>

                    {/* Heading */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gray-900 leading-tight">
                        Customize Your Loan Instantly
                    </h1>

                    {/* Description */}
                    <p className="text-gray-500 text-base sm:text-lg leading-relaxed max-w-lg">
                        Adjust the loan amount and repayment period to see exactly what you&apos;ll owe—no surprises.
                        Get transparent fees, flexible terms, and a quick approval process that puts you in control.
                        Whether you&apos;re borrowing for an emergency, consolidating debt, or planning ahead, our calculator
                        helps you make informed decisions, ensuring the loan works for your unique financial situation
                    </p>

                    {/* Learn More Button */}
                    <button className="group mt-4 px-6 py-3 border border-gray-400 rounded-lg text-gray-600 font-medium hover:border-gray-600 hover:text-gray-900 transition-all flex items-center space-x-2 w-full sm:w-auto justify-center sm:justify-start">
                        <span>Learn More</span>
                        <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                {/* Right Side: Calculator - Removed 'order-1 lg:order-2' so it stays second naturally */}
                <div className="flex justify-center lg:justify-end w-full">
                    <LoanCalculator />
                </div>

            </div>
        </section>
    );
});

LoanSection.displayName = 'LoanSection';

export { LoanSection };