"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { TrendingUp, CreditCard, FileText, CheckCircle, Upload, User } from 'lucide-react';

export default function UpgradeDebitCardPage() {
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-linear-to-br from-indigo-500 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm mb-6 animate-fadeIn">
            <Link href="/" className="hover:underline">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/debitinfo" className="hover:underline">Debit Cards</Link>
            <span className="mx-2">/</span>
            <span>Upgrade Card</span>
          </nav>
          
          <div className="text-center animate-slideUp">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl">
                <TrendingUp className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Upgrade Your Debit Card
            </h1>
            <p className="text-xl text-indigo-50 max-w-2xl mx-auto">
              Get premium benefits, higher limits, and exclusive rewards with an upgraded debit card
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Upgrade?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-indigo-50 border-2 border-indigo-200">
              <CheckCircle className="w-10 h-10 text-indigo-600 mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Higher Limits</h3>
              <p className="text-sm text-gray-600">Increased daily withdrawal and transaction limits</p>
            </div>
            <div className="p-6 bg-purple-50 border-2 border-purple-200">
              <CheckCircle className="w-10 h-10 text-purple-600 mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Premium Benefits</h3>
              <p className="text-sm text-gray-600">Airport lounge access, insurance coverage, and more</p>
            </div>
            <div className="p-6 bg-pink-50 border-2 border-pink-200">
              <CheckCircle className="w-10 h-10 text-pink-600 mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Better Rewards</h3>
              <p className="text-sm text-gray-600">Earn higher cashback and reward points</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Upgrade Process</h2>
          
          <div className="space-y-6">
            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 flex items-center justify-center ${step >= 1 ? 'bg-indigo-600' : 'bg-gray-300'} text-white font-bold`}>
                  1
                </div>
                {step > 1 && <div className="w-1 h-full bg-indigo-600 mt-2"></div>}
              </div>
              <div className="flex-1 pb-8">
                <h3 className="font-semibold text-gray-900 mb-2">Check Eligibility</h3>
                <p className="text-sm text-gray-600 mb-4">Verify if you're eligible for an upgrade based on account type and balance</p>
                <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md">
                  Check Now
                </button>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 flex items-center justify-center ${step >= 2 ? 'bg-indigo-600' : 'bg-gray-300'} text-white font-bold`}>
                  2
                </div>
                {step > 2 && <div className="w-1 h-full bg-indigo-600 mt-2"></div>}
              </div>
              <div className="flex-1 pb-8">
                <h3 className="font-semibold text-gray-900 mb-2">Submit Documents</h3>
                <p className="text-sm text-gray-600 mb-4">Upload KYC documents and recent photograph</p>
                <div className="flex gap-4">
                  <button className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Upload PAN
                  </button>
                  <button className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Upload Aadhaar
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 flex items-center justify-center ${step >= 3 ? 'bg-indigo-600' : 'bg-gray-300'} text-white font-bold`}>
                  3
                </div>
                {step > 3 && <div className="w-1 h-full bg-indigo-600 mt-2"></div>}
              </div>
              <div className="flex-1 pb-8">
                <h3 className="font-semibold text-gray-900 mb-2">Choose Your Card</h3>
                <p className="text-sm text-gray-600 mb-4">Select from premium debit card variants</p>
                <Link href="/debitinfo" className="text-indigo-600 hover:underline font-semibold">
                  Browse Premium Cards →
                </Link>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 flex items-center justify-center ${step >= 4 ? 'bg-indigo-600' : 'bg-gray-300'} text-white font-bold`}>
                  4
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">Receive Your Card</h3>
                <p className="text-sm text-gray-600">Your upgraded debit card will be delivered within 7-10 business days</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Required Documents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 bg-gray-50 border border-gray-200">
              <FileText className="w-6 h-6 text-indigo-600" />
              <span className="text-gray-900">PAN Card</span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gray-50 border border-gray-200">
              <FileText className="w-6 h-6 text-indigo-600" />
              <span className="text-gray-900">Aadhaar Card</span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gray-50 border border-gray-200">
              <User className="w-6 h-6 text-indigo-600" />
              <span className="text-gray-900">Recent Photograph</span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gray-50 border border-gray-200">
              <CreditCard className="w-6 h-6 text-indigo-600" />
              <span className="text-gray-900">Existing Debit Card</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
