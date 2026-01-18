'use client'; 

import React from 'react';
import { FileText, Lock, AlertCircle, Calendar, Download } from 'lucide-react';

export default function TermsPage() {
  
  // Function to trigger the browser's print/save-as-pdf dialog
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 font-serif text-gray-800">
      
      {/* --- Hero Section --- */}
      {/* 'print:hidden' hides this section when actually printing */}
      <section className="relative w-full bg-teal-900 text-white py-20 overflow-hidden print:hidden">
        {/* Abstract Background */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute right-0 top-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-20"></div>
            <div className="absolute left-10 bottom-0 w-80 h-80 bg-teal-400 rounded-full mix-blend-overlay filter blur-3xl opacity-20"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 italic">Terms of Service</h1>
          <p className="text-teal-100 text-lg max-w-2xl font-light">
            Please read these terms carefully before using <strong>Six Finance</strong>. By accessing our platform, you agree to be bound by these conditions.
          </p>
          
          <div className="mt-8 flex items-center gap-6 text-sm text-teal-200">
             <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>Last Updated: January 16, 2026</span>
             </div>
             
             {/* Integrated Print/Download Button */}
             <button 
                onClick={handlePrint}
                className="flex items-center gap-2 hover:text-white transition-colors underline decoration-teal-500 underline-offset-4 font-serif cursor-pointer"
             >
                <Download size={16} />
                Download as PDF
             </button>
          </div>
        </div>
      </section>

      {/* --- Main Content with Sidebar --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-12 gap-12">
            
            {/* Sidebar Navigation (Sticky) - Hidden during print */}
            <aside className="hidden lg:block lg:col-span-3 print:hidden">
                <div className="sticky top-24 space-y-1">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 pl-4">Contents</p>
                    <nav className="space-y-1 border-l border-gray-200">
                        <NavLink href="#introduction" label="1. Introduction" active />
                        <NavLink href="#eligibility" label="2. Eligibility" />
                        <NavLink href="#services" label="3. Our Services" />
                        <NavLink href="#user-data" label="4. User Data & Privacy" />
                        <NavLink href="#liability" label="5. Limitation of Liability" />
                        <NavLink href="#termination" label="6. Termination" />
                    </nav>
                </div>
            </aside>

            {/* Legal Text Content */}
            <main className="lg:col-span-9 space-y-16">
                
                {/* Section 1 */}
                <section id="introduction" className="scroll-mt-28">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-teal-50 text-teal-600 rounded-lg print:hidden">
                            <FileText size={24} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">1. Introduction</h2>
                    </div>
                    <div className="prose prose-lg text-gray-600 font-serif leading-relaxed">
                        <p>
                            Welcome to <strong>Six Finance</strong> ("Company", "we", "our", "us"). These Terms of Service ("Terms", "Terms of Service") govern your use of our website and mobile application (collectively, the "Service").
                        </p>
                        <p>
                            By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service. This agreement constitutes a binding legal contract between you and Six Finance.
                        </p>
                    </div>
                </section>

                {/* Section 2 */}
                <section id="eligibility" className="scroll-mt-28">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Eligibility</h2>
                    <div className="prose prose-lg text-gray-600 font-serif leading-relaxed">
                        <p>
                            Our Service is intended solely for users who are:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 my-4 marker:text-teal-500">
                            <li>Eighteen (18) years of age or older.</li>
                            <li>Citizens or legal residents of India.</li>
                            <li>Capable of entering into a binding contract under the Indian Contract Act, 1872.</li>
                        </ul>
                    </div>
                </section>

                {/* Section 3 */}
                <section id="services" className="scroll-mt-28">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Our Services</h2>
                    <div className="bg-teal-50 border-l-4 border-teal-500 p-6 rounded-r-lg mb-6 print:border-gray-300 print:bg-white">
                        <p className="text-teal-900 font-medium italic print:text-black">
                            Important Note: Six Finance is a financial aggregator, not a bank or lender.
                        </p>
                    </div>
                    <div className="prose prose-lg text-gray-600 font-serif leading-relaxed">
                        <p>
                            We provide a platform that allows you to compare financial products offered by third-party banks and financial institutions ("Partners"). We do not directly provide loans, credit cards, or insurance.
                        </p>
                    </div>
                </section>

                {/* Section 4 */}
                <section id="user-data" className="scroll-mt-28">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-teal-50 text-teal-600 rounded-lg print:hidden">
                            <Lock size={24} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">4. User Data & Privacy</h2>
                    </div>
                    <div className="prose prose-lg text-gray-600 font-serif leading-relaxed">
                        <p>
                            By using Six Finance, you explicitly consent to allow us to:
                        </p>
                        <ol className="list-decimal pl-5 space-y-2 my-4 marker:text-teal-500 font-bold">
                            <li className="font-normal">Fetch your credit report from bureaus like CIBIL, Experian, or Equifax to assess your eligibility.</li>
                            <li className="font-normal">Share your basic contact details with our Partner Banks solely for the purpose of processing your application.</li>
                            <li className="font-normal">Send you transactional updates via SMS, Email, or WhatsApp.</li>
                        </ol>
                    </div>
                </section>

                {/* Section 5 */}
                <section id="liability" className="scroll-mt-28">
                    <div className="flex items-center gap-3 mb-4">
                         <div className="p-2 bg-red-50 text-red-500 rounded-lg print:hidden">
                            <AlertCircle size={24} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">5. Limitation of Liability</h2>
                    </div>
                    <div className="prose prose-lg text-gray-600 font-serif leading-relaxed">
                        <p>
                            To the fullest extent permitted by applicable law, in no event shall Six Finance, its affiliates, directors, or employees be liable for any indirect, incidental, special, consequential, or punitive damages.
                        </p>
                    </div>
                </section>

                {/* Footer of the content */}
                <div className="pt-12 border-t border-gray-200">
                    <p className="text-gray-500 italic">
                        If you have any questions about these Terms, please contact us at <a href="mailto:legal@sixfinance.com" className="text-teal-600 hover:underline">legal@sixfinance.com</a>.
                    </p>
                </div>

            </main>
        </div>
      </div>
    </div>
  );
}

// Helper Component for Sidebar Links
const NavLink = ({ href, label, active = false }: { href: string, label: string, active?: boolean }) => (
    <a 
        href={href} 
        className={`block pl-4 py-2 text-sm transition-colors border-l-2 ${
            active 
            ? 'border-teal-500 text-teal-600 font-bold bg-teal-50/50' 
            : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'
        }`}
    >
        {label}
    </a>
);