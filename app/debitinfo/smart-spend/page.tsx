"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Brain, Sparkles, TrendingUp, DollarSign, ShoppingBag, Coffee } from 'lucide-react';

export default function SmartSpendGuidePage() {
  const [selectedCategory, setSelectedCategory] = useState('dining');

  const recommendations = {
    dining: {
      title: 'Best Card for Dining Today',
      card: 'HDFC Millennia Debit Card',
      cashback: '5%',
      reason: 'Get 5% cashback on dining and food delivery apps',
      merchants: ['Swiggy', 'Zomato', 'Dineout'],
    },
    shopping: {
      title: 'Best Card for Shopping Today',
      card: 'SBI Platinum Debit Card',
      cashback: '3%',
      reason: 'Extra 3% cashback on Amazon and Flipkart',
      merchants: ['Amazon', 'Flipkart', 'Myntra'],
    },
    fuel: {
      title: 'Best Card for Fuel Today',
      card: 'ICICI Coral Debit Card',
      cashback: '1%',
      reason: '1% fuel surcharge waiver at all petrol pumps',
      merchants: ['Indian Oil', 'HP', 'Bharat Petroleum'],
    },
  };

  const currentRec = recommendations[selectedCategory as keyof typeof recommendations];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-linear-to-br from-pink-500 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm mb-6 animate-fadeIn">
            <Link href="/" className="hover:underline">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/debitinfo" className="hover:underline">Debit Cards</Link>
            <span className="mx-2">/</span>
            <span>Smart Spend Guide</span>
          </nav>
          
          <div className="text-center animate-slideUp">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl">
                <Brain className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Smart Spend Guide
            </h1>
            <p className="text-xl text-pink-50 max-w-2xl mx-auto">
              AI-powered recommendations to maximize rewards and savings on every purchase
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What would you like to spend on today?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <button
              onClick={() => setSelectedCategory('dining')}
              className={`p-6 border-2 ${
                selectedCategory === 'dining'
                  ? 'border-pink-500 bg-pink-50'
                  : 'border-gray-200 hover:border-pink-300'
              } transition-all`}
            >
              <Coffee className="w-10 h-10 text-pink-600 mb-3 mx-auto" />
              <h3 className="font-semibold text-gray-900">Dining</h3>
              <p className="text-sm text-gray-600 mt-1">Restaurants & Food Delivery</p>
            </button>

            <button
              onClick={() => setSelectedCategory('shopping')}
              className={`p-6 border-2 ${
                selectedCategory === 'shopping'
                  ? 'border-pink-500 bg-pink-50'
                  : 'border-gray-200 hover:border-pink-300'
              } transition-all`}
            >
              <ShoppingBag className="w-10 h-10 text-pink-600 mb-3 mx-auto" />
              <h3 className="font-semibold text-gray-900">Shopping</h3>
              <p className="text-sm text-gray-600 mt-1">Online & Retail Stores</p>
            </button>

            <button
              onClick={() => setSelectedCategory('fuel')}
              className={`p-6 border-2 ${
                selectedCategory === 'fuel'
                  ? 'border-pink-500 bg-pink-50'
                  : 'border-gray-200 hover:border-pink-300'
              } transition-all`}
            >
              <DollarSign className="w-10 h-10 text-pink-600 mb-3 mx-auto" />
              <h3 className="font-semibold text-gray-900">Fuel</h3>
              <p className="text-sm text-gray-600 mt-1">Petrol & Diesel</p>
            </button>
          </div>

          <div className="bg-gradient-to-br from-pink-500 to-purple-600 text-white p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-6 h-6" />
              <h3 className="text-xl font-bold">{currentRec.title}</h3>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-2xl font-bold">{currentRec.card}</h4>
                  <p className="text-pink-100 mt-1">{currentRec.reason}</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold">{currentRec.cashback}</div>
                  <div className="text-sm text-pink-100">Cashback</div>
                </div>
              </div>
              
              <div className="border-t border-white/20 pt-4">
                <p className="text-sm text-pink-100 mb-2">Works at:</p>
                <div className="flex gap-2">
                  {currentRec.merchants.map((merchant) => (
                    <span key={merchant} className="px-3 py-1 bg-white/20 text-sm">
                      {merchant}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <Link href="/debitinfo/finder" className="block w-full text-center bg-white text-pink-600 font-semibold py-3 hover:bg-pink-50 transition-all">
              Find More Recommendations
            </Link>
          </div>
        </div>

        <div className="bg-white shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How Smart Spend Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 mx-auto flex items-center justify-center mb-4">
                <Brain className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">AI Analysis</h3>
              <p className="text-sm text-gray-600">Analyzes current offers and cashback rates across all your cards</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 mx-auto flex items-center justify-center mb-4">
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Smart Recommendation</h3>
              <p className="text-sm text-gray-600">Recommends the best card for maximum savings on your purchase</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 mx-auto flex items-center justify-center mb-4">
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Save More</h3>
              <p className="text-sm text-gray-600">Get higher cashback and rewards on every transaction</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
