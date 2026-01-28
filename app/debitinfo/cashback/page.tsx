"use client";
import React from 'react';
import Link from 'next/link';
import { Gift, Sparkles, ShoppingBag, TrendingUp, CheckCircle, Wallet } from 'lucide-react';
import DebitCardListSection from '@/component/debitinfo/DebitCardListSection';

export default function CashbackDebitCardsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-linear-to-br from-purple-500 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm mb-6 animate-fadeIn">
            <Link href="/" className="hover:underline">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/debitinfo" className="hover:underline">Debit Cards</Link>
            <span className="mx-2">/</span>
            <span>Cashback Cards</span>
          </nav>

          <div className="text-center animate-slideUp">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl">
                <Gift className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Cashback Debit Cards
            </h1>
            <p className="text-xl text-purple-50 max-w-2xl mx-auto">
              Earn cashback on every purchase - shopping, dining, fuel, online payments, and more
            </p>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white shadow-lg p-8 mb-12 animate-slideUp">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Cashback Debit Cards?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-purple-100 shrink-0 flex items-center justify-center">
                <Gift className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Instant Cashback</h3>
                <p className="text-sm text-gray-600">Get money back credited directly to your account on every transaction</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-purple-100 shrink-0 flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Shopping Rewards</h3>
                <p className="text-sm text-gray-600">Earn up to 5% cashback on online and offline shopping</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-purple-100 shrink-0 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Daily Benefits</h3>
                <p className="text-sm text-gray-600">Cashback on groceries, fuel, utilities, and everyday expenses</p>
              </div>
            </div>
          </div>
        </div>

        {/* Debit Cards List */}
        <DebitCardListSection
          categorySlug="debit-cashback"
          title="Best Cashback Debit Cards"
          description="Compare top cashback debit cards from leading banks"
          showViewMore={true}
          viewMoreHref="/debitinfo"
        />
      </div>

      {/* Cashback Calculator */}
      <div className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Calculate Your Cashback Savings</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-gray-600 mb-2">Monthly Shopping</p>
                <p className="text-3xl font-bold text-purple-600">₹10,000</p>
                <p className="text-sm text-gray-600 mt-2">Average spending</p>
              </div>
              <div>
                <p className="text-gray-600 mb-2">Cashback Rate</p>
                <p className="text-3xl font-bold text-purple-600">2%</p>
                <p className="text-sm text-gray-600 mt-2">Typical rate</p>
              </div>
              <div>
                <p className="text-gray-600 mb-2">Yearly Savings</p>
                <p className="text-3xl font-bold text-green-600">₹2,400</p>
                <p className="text-sm text-gray-600 mt-2">Total cashback</p>
              </div>
            </div>
            <p className="text-center text-gray-600 mt-6">
              💡 With a 2% cashback debit card, you could save ₹2,400 annually on ₹10,000 monthly spending!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
