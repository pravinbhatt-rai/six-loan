"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CreditCard, Shield, Zap, Globe, Sparkles, ArrowRight } from "lucide-react";

export default function DebitCardsPage() {
  const [debitCards, setDebitCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch('/api/debit-cards?limit=12');
        const data = await response.json();
        if (data.success) {
          setDebitCards(data.products);
        }
      } catch (error) {
        console.error('Error fetching debit cards:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  const categories = [
    {
      title: "Best Debit Cards",
      slug: "best-debit-cards",
      icon: <Sparkles className="w-6 h-6" />,
      description: "Top-rated debit cards in India",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Zero Fee Cards",
      slug: "zero-fee",
      icon: <Zap className="w-6 h-6" />,
      description: "Lifetime free debit cards",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Cashback Cards",
      slug: "cashback",
      icon: <CreditCard className="w-6 h-6" />,
      description: "High cashback on every spend",
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "International Usage",
      slug: "international",
      icon: <Globe className="w-6 h-6" />,
      description: "Best for overseas transactions",
      color: "from-orange-500 to-red-500"
    },
    {
      title: "Lounge Access",
      slug: "lounge-access",
      icon: <Sparkles className="w-6 h-6" />,
      description: "Airport lounge benefits",
      color: "from-indigo-500 to-purple-500"
    },
    {
      title: "Safety Features",
      slug: "safety",
      icon: <Shield className="w-6 h-6" />,
      description: "Enhanced security & insurance",
      color: "from-teal-500 to-green-500"
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Find Your Perfect Debit Card
          </h1>
          <p className="text-xl text-teal-100 mb-8">
            Compare features, cashback, and benefits to choose the best debit card for your needs
          </p>
          
          {/* Quick Finder */}
          <div className="bg-white rounded-lg shadow-xl p-6 text-gray-800">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-teal-600" />
              Best Debit Card Finder
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500">
                <option value="">Select Your Bank</option>
                <option value="hdfc">HDFC Bank</option>
                <option value="sbi">State Bank of India</option>
                <option value="icici">ICICI Bank</option>
                <option value="axis">Axis Bank</option>
                <option value="kotak">Kotak Mahindra Bank</option>
              </select>
              
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500">
                <option value="">Account Type</option>
                <option value="savings">Savings Account</option>
                <option value="salary">Salary Account</option>
                <option value="current">Current Account</option>
              </select>
              
              <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                Find Best Card
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Browse by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/debitinfo/${category.slug}`}
              className="group"
            >
              <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 h-full border border-gray-200 hover:border-teal-300">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center text-white mb-4`}>
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">
                  {category.title}
                </h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <div className="flex items-center text-teal-600 font-semibold group-hover:gap-2 transition-all">
                  Explore <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Featured Debit Cards */}
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Debit Cards</h2>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-md p-6 animate-pulse">
                <div className="h-40 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : debitCards.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {debitCards.map((card) => (
              <Link
                key={card.id}
                href={`/debitcard/${card.slug}`}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden border border-gray-200"
              >
                <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  {card.imageUrl ? (
                    <img
                      src={card.imageUrl}
                      alt={card.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <CreditCard className="w-20 h-20 text-gray-400" />
                  )}
                  {card.recommended && (
                    <span className="absolute top-4 right-4 bg-teal-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Recommended
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{card.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{card.bankName}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Annual Fee:</span>
                      <span className="font-semibold text-gray-900">{card.annualFee}</span>
                    </div>
                    {card.cashbackRate && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Cashback:</span>
                        <span className="font-semibold text-teal-600">{card.cashbackRate}</span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            No debit cards available yet. Check back soon!
          </div>
        )}
      </div>
    </div>
  );
}
