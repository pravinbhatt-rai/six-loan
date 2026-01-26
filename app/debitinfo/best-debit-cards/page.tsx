"use client";
import React from "react";
import Link from "next/link";
import { Sparkles, CreditCard, Shield, Zap, ChevronRight } from "lucide-react";
import DebitCardListSection from "@/component/debitinfo/DebitCardListSection";

export default function BestDebitCardsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-8 h-8" />
            <h1 className="text-4xl md:text-5xl font-bold">
              Best Debit Cards in India 2026
            </h1>
          </div>
          <p className="text-xl text-purple-100 mb-6">
            Top-rated debit cards with maximum benefits, cashback, and rewards
          </p>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-purple-200">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/debitcard" className="hover:text-white">Debit Cards</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white font-semibold">Best Debit Cards</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Why Choose the Best Debit Card?
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            A good debit card offers more than just ATM withdrawals. The best debit cards in India provide cashback,
            reward points, fuel surcharge waivers, airport lounge access, and comprehensive insurance coverage.
            Whether you're a frequent shopper, traveler, or looking for basic banking needs, choosing the right
            debit card can save you thousands of rupees annually.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center shrink-0">
                <CreditCard className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">High Cashback</h3>
                <p className="text-sm text-gray-600">Earn up to 5% cashback on shopping, fuel, and online transactions</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-pink-100 flex items-center justify-center shrink-0">
                <Shield className="w-6 h-6 text-pink-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Insurance Coverage</h3>
                <p className="text-sm text-gray-600">Accident insurance up to ₹10 lakhs and purchase protection</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center shrink-0">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Premium Benefits</h3>
                <p className="text-sm text-gray-600">Airport lounge access, golf privileges, and exclusive offers</p>
              </div>
            </div>
          </div>
        </div>

        {/* Debit Cards List */}
        <DebitCardListSection
          title="Top Debit Cards in India"
          description="Compare the highest-rated debit cards from leading banks"
          showViewMore={true}
          viewMoreHref="/debitinfo"
        />
      </div>
    </div>
  );
}
