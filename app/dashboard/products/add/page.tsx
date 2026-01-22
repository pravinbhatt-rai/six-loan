"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { CreditCard, Wallet, FileText, Shield, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function AddProductPage() {
  const router = useRouter();

  const productTypes = [
    {
      title: 'Credit Card',
      description: 'Add a new credit card product with features, fees, and benefits',
      icon: CreditCard,
      href: '/dashboard/credit-cards/add',
      color: 'from-teal-500 to-cyan-600',
      iconBg: 'bg-teal-100',
      iconColor: 'text-teal-600',
      borderColor: 'border-teal-500',
    },
    {
      title: 'Debit Card',
      description: 'Create a new debit card product with transaction limits and rewards',
      icon: Wallet,
      href: '/dashboard/debit-cards/add',
      color: 'from-purple-500 to-pink-600',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      borderColor: 'border-purple-500',
    },
    {
      title: 'Loan Product',
      description: 'Add a new loan product with interest rates and eligibility criteria',
      icon: FileText,
      href: '/dashboard/loans/add',
      color: 'from-blue-500 to-indigo-600',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      borderColor: 'border-blue-500',
    },
    {
      title: 'Insurance',
      description: 'Create a new insurance product with coverage details and premiums',
      icon: Shield,
      href: '/dashboard/insurance/add',
      color: 'from-green-500 to-emerald-600',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      borderColor: 'border-green-500',
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Add New Product</h1>
        <p className="text-lg text-gray-600">
          Choose the type of product you want to add to your platform
        </p>
      </div>

      {/* Product Type Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {productTypes.map((product, index) => {
          const Icon = product.icon;
          return (
            <Link href={product.href} key={product.title}>
              <div
                className={`group bg-white p-8 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border-t-4 ${product.borderColor} hover:-translate-y-2 animate-scaleIn`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col h-full">
                  {/* Icon */}
                  <div className={`${product.iconBg} w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-8 h-8 ${product.iconColor}`} />
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                    {product.title}
                    <ArrowRight className={`w-5 h-5 ${product.iconColor} opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all`} />
                  </h2>

                  {/* Description */}
                  <p className="text-gray-600 mb-6 grow">
                    {product.description}
                  </p>

                  {/* Action Button */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <span className={`text-sm font-medium ${product.iconColor} group-hover:underline`}>
                      Get Started
                    </span>
                    <ArrowRight className={`w-5 h-5 ${product.iconColor} group-hover:translate-x-2 transition-transform`} />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Back to Dashboard */}
      <div className="text-center">
        <Link href="/dashboard">
          <button className="text-teal-600 hover:text-teal-700 font-medium hover:underline transition-all">
            ← Back to Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
}