import React from 'react';
import Link from 'next/link';
import { Home, ArrowLeft, Search, HelpCircle, FileText } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 font-serif text-gray-800 flex items-center justify-center relative overflow-hidden">
      
      {/* --- Background Abstract Blobs --- */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-3xl w-full px-6 relative z-10 text-center">
        
        {/* Large 404 Text */}
        <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-linear-to-r from-teal-400 to-teal-700 mb-4 select-none">
          404
        </h1>
        
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 italic">
          Lost in the numbers?
        </h2>
        
        <p className="text-lg text-gray-600 mb-10 max-w-lg mx-auto leading-relaxed">
          The page you are looking for doesn't exist or has been moved. Don't worry, your credit score is safe!
        </p>

        {/* Primary Action Button */}
        <Link 
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white rounded-full font-bold shadow-lg shadow-teal-500/30 transition-all transform hover:-translate-y-1"
        >
            <ArrowLeft size={20} />
            Back to Homepage
        </Link>

        {/* Helpful Links Grid */}
        <div className="mt-16 border-t border-gray-200 pt-10">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Or try these popular pages</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link href="/" className="group p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-teal-500 hover:shadow-md transition-all">
                    <div className="w-10 h-10 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-3 text-teal-600 group-hover:bg-teal-500 group-hover:text-white transition-colors">
                        <Search size={20} />
                    </div>
                    <span className="block font-bold text-gray-900">Explore Loans</span>
                </Link>

                <Link href="/support" className="group p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-teal-500 hover:shadow-md transition-all">
                     <div className="w-10 h-10 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-3 text-teal-600 group-hover:bg-teal-500 group-hover:text-white transition-colors">
                        <HelpCircle size={20} />
                    </div>
                    <span className="block font-bold text-gray-900">Help Center</span>
                </Link>

                <Link href="/terms" className="group p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-teal-500 hover:shadow-md transition-all">
                     <div className="w-10 h-10 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-3 text-teal-600 group-hover:bg-teal-500 group-hover:text-white transition-colors">
                        <FileText size={20} />
                    </div>
                    <span className="block font-bold text-gray-900">Terms & Legal</span>
                </Link>
            </div>
        </div>

      </div>
    </div>
  );
}