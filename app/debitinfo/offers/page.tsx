"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Gift, Tag, Percent, ShoppingBag, Clock, CheckCircle } from 'lucide-react';

export default function LiveOffersPage() {
  const [activeTab, setActiveTab] = useState('all');

  const offers = [
    {
      id: 1,
      merchant: 'Amazon',
      cardBank: 'HDFC Bank',
      offerType: 'Cashback',
      title: '10% Cashback on Amazon',
      description: 'Get 10% cashback up to ₹1,500 on purchases above ₹5,000',
      value: '10%',
      validTill: '2026-02-28',
      category: 'shopping',
      icon: ShoppingBag,
      color: 'orange'
    },
    {
      id: 2,
      merchant: 'Flipkart',
      cardBank: 'SBI',
      offerType: 'Discount',
      title: 'Flat ₹500 Off on Flipkart',
      description: 'Use SBI Debit Card and get flat ₹500 off on orders above ₹3,000',
      value: '₹500',
      validTill: '2026-02-15',
      category: 'shopping',
      icon: Tag,
      color: 'blue'
    },
    {
      id: 3,
      merchant: 'Swiggy',
      cardBank: 'ICICI Bank',
      offerType: 'Cashback',
      title: 'Save ₹150 on Swiggy',
      description: '10% cashback up to ₹150 on food orders using ICICI Debit Card',
      value: '₹150',
      validTill: '2026-01-31',
      category: 'food',
      icon: ShoppingBag,
      color: 'red'
    },
    {
      id: 4,
      merchant: 'BookMyShow',
      cardBank: 'Axis Bank',
      offerType: 'Discount',
      title: 'Buy 1 Get 1 Movie Tickets',
      description: 'Book movie tickets with Axis Debit Card and get BOGO offer',
      value: 'BOGO',
      validTill: '2026-03-31',
      category: 'entertainment',
      icon: Tag,
      color: 'purple'
    },
    {
      id: 5,
      merchant: 'IndianOil',
      cardBank: 'HDFC Bank',
      offerType: 'Cashback',
      title: 'Fuel Surcharge Waiver',
      description: '1% fuel surcharge waiver on all IndianOil petrol pumps',
      value: '1%',
      validTill: '2026-12-31',
      category: 'fuel',
      icon: Percent,
      color: 'green'
    },
    {
      id: 6,
      merchant: 'BigBasket',
      cardBank: 'SBI',
      offerType: 'Cashback',
      title: '₹200 Cashback on Groceries',
      description: 'Get ₹200 cashback on grocery shopping above ₹2,000',
      value: '₹200',
      validTill: '2026-02-20',
      category: 'shopping',
      icon: ShoppingBag,
      color: 'teal'
    },
  ];

  const categories = [
    { id: 'all', name: 'All Offers', count: offers.length },
    { id: 'shopping', name: 'Shopping', count: offers.filter(o => o.category === 'shopping').length },
    { id: 'food', name: 'Food & Dining', count: offers.filter(o => o.category === 'food').length },
    { id: 'fuel', name: 'Fuel', count: offers.filter(o => o.category === 'fuel').length },
    { id: 'entertainment', name: 'Entertainment', count: offers.filter(o => o.category === 'entertainment').length },
  ];

  const filteredOffers = activeTab === 'all' ? offers : offers.filter(o => o.category === activeTab);

  const getDaysLeft = (validTill: string) => {
    const today = new Date('2026-01-22');
    const endDate = new Date(validTill);
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-linear-to-br from-purple-500 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-slideUp">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl">
                <Gift className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Live Debit Card Offers
            </h1>
            <p className="text-xl text-purple-50 max-w-2xl mx-auto">
              Real-time cashback and discount offers from top merchants across India
            </p>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-white shadow-md py-6 -mt-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-3xl font-bold text-teal-600">{offers.length}</p>
              <p className="text-gray-600 font-medium">Active Offers</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-purple-600">15+</p>
              <p className="text-gray-600 font-medium">Partner Merchants</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-600">Up to 10%</p>
              <p className="text-gray-600 font-medium">Cashback</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-green-600">Daily</p>
              <p className="text-gray-600 font-medium">New Offers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow-md p-2 mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-6 py-3 font-semibold transition-all ${
                  activeTab === cat.id
                    ? 'bg-teal-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat.name} ({cat.count})
              </button>
            ))}
          </div>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOffers.map((offer, index) => {
            const Icon = offer.icon;
            const daysLeft = getDaysLeft(offer.validTill);
            
            return (
              <div 
                key={offer.id}
                className="bg-white border-2 border-gray-200 hover:border-teal-500 p-6 shadow-md hover:shadow-xl transition-all animate-scaleIn"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Merchant Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-${offer.color}-100 flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 text-${offer.color}-600`} />
                  </div>
                  <span className={`px-3 py-1 bg-${offer.color}-100 text-${offer.color}-800 text-xs font-bold`}>
                    {offer.value}
                  </span>
                </div>

                {/* Merchant Name */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">{offer.merchant}</h3>
                <p className="text-sm text-gray-600 mb-3">{offer.cardBank} Debit Card</p>

                {/* Offer Title */}
                <p className="font-semibold text-gray-900 mb-2">{offer.title}</p>
                <p className="text-sm text-gray-600 mb-4">{offer.description}</p>

                {/* Validity */}
                <div className="flex items-center gap-2 mb-4 text-sm">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className={`font-medium ${daysLeft <= 7 ? 'text-red-600' : 'text-gray-600'}`}>
                    {daysLeft > 0 ? `${daysLeft} days left` : 'Expired'}
                  </span>
                </div>

                {/* Action Button */}
                <button className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 shadow-md hover:shadow-lg transition-all font-semibold">
                  Activate Offer
                </button>
              </div>
            );
          })}
        </div>

        {filteredOffers.length === 0 && (
          <div className="bg-white shadow-lg p-12 text-center">
            <Gift className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No offers in this category</h3>
            <p className="text-gray-600">Check other categories or come back later for new offers</p>
          </div>
        )}
      </div>

      {/* How It Works */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">How to Use Offers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 mx-auto mb-4 flex items-center justify-center font-bold text-2xl text-teal-600">
                1
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Browse Offers</h3>
              <p className="text-gray-600">Check live offers available for your debit card</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 mx-auto mb-4 flex items-center justify-center font-bold text-2xl text-purple-600">
                2
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Activate Offer</h3>
              <p className="text-gray-600">Click to activate and note the offer code if required</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 mx-auto mb-4 flex items-center justify-center font-bold text-2xl text-blue-600">
                3
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Make Payment</h3>
              <p className="text-gray-600">Pay with your debit card and enjoy instant savings</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
