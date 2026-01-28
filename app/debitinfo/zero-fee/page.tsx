"use client";
import React from 'react';
import Link from 'next/link';
import { Zap, Award, TrendingUp, CheckCircle } from 'lucide-react';
import DebitCardListSection from '@/component/debitinfo/DebitCardListSection';

export default function ZeroFeeDebitCardsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-linear-to-br from-green-500 to-emerald-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm mb-6 animate-fadeIn">
            <Link href="/" className="hover:underline">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/debitinfo" className="hover:underline">Debit Cards</Link>
            <span className="mx-2">/</span>
            <span>Zero Fee Cards</span>
          </nav>

          <div className="text-center animate-slideUp">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl">
                <Zap className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Zero Fee Debit Cards
            </h1>
            <p className="text-xl text-green-50 max-w-2xl mx-auto">
              Discover debit cards with no annual fees, no maintenance charges, and zero hidden costs
            </p>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white shadow-lg p-8 mb-12 animate-slideUp">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Zero Fee Debit Cards?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-green-100 shrink-0 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">No Annual Fee</h3>
                <p className="text-sm text-gray-600">Save ₹200-₹500 yearly with zero annual maintenance charges</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-green-100 shrink-0 flex items-center justify-center">
                <Award className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Free Issuance</h3>
                <p className="text-sm text-gray-600">Get your card without any issuance or joining fees</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-green-100 shrink-0 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Value Benefits</h3>
                <p className="text-sm text-gray-600">Still enjoy cashback, rewards, and transaction benefits</p>
              </div>
            </div>
          </div>
        </div>

        {/* Debit Cards List */}
        <DebitCardListSection
          categorySlug="zero-fee"
          title="Best Zero Fee Debit Cards"
          description="Compare free debit cards from top banks with no annual charges"
          showViewMore={true}
          viewMoreHref="/debitinfo"
        />
      </div>

      {/* Benefits Section */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Key Benefits of Zero Fee Debit Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-green-100 shrink-0 flex items-center justify-center">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Cost Savings</h3>
                <p className="text-gray-600">Save hundreds of rupees annually by avoiding maintenance and annual fees</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-green-100 shrink-0 flex items-center justify-center">
                <Award className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Hidden Charges</h3>
                <p className="text-gray-600">Transparent pricing with no surprise fees or hidden costs</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-green-100 shrink-0 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Same Features</h3>
                <p className="text-gray-600">Access to online banking, UPI, contactless payments, and more</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-green-100 shrink-0 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Easy Eligibility</h3>
                <p className="text-gray-600">Lower minimum balance requirements and simpler approval process</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
