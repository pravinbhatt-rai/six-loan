"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import DebitCardForm from '@/component/Dashboard/DebitCardForm';
import { ArrowLeft, Wallet } from 'lucide-react';
import Link from 'next/link';

export default function AddDebitCardPage() {
  const router = useRouter();

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/debit-cards">
          <button className="p-2 hover:bg-gray-100 transition-colors group">
            <ArrowLeft className="w-6 h-6 text-gray-600 group-hover:text-teal-600 transition-colors" />
          </button>
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-purple-500 flex items-center justify-center shadow-md">
            <Wallet className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Add New Debit Card</h1>
            <p className="text-gray-600 mt-1">Create a new debit card product</p>
          </div>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white shadow-lg p-8 animate-slideUp">
        <DebitCardForm />
      </div>
    </div>
  );
}
