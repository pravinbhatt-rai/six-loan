"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import LoanForm from '@/component/Dashboard/LoanForm';
import { ArrowLeft, FileText } from 'lucide-react';
import Link from 'next/link';

export default function AddLoanPage() {
  const router = useRouter();

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/loans">
          <button className="p-2 hover:bg-gray-100 transition-colors group">
            <ArrowLeft className="w-6 h-6 text-gray-600 group-hover:text-teal-600 transition-colors" />
          </button>
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-500 flex items-center justify-center shadow-md">
            <FileText className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Add New Loan</h1>
            <p className="text-gray-600 mt-1">Create a new loan product</p>
          </div>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white shadow-lg p-8 animate-slideUp">
        <LoanForm />
      </div>
    </div>
  );
}
