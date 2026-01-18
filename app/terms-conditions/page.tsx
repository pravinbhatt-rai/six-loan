'use client';

import React from 'react';
import { FileText, Shield, Scale, AlertTriangle, Calendar, Download, CheckCircle } from 'lucide-react';

export default function TermsConditionsPage() {
  
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 font-serif text-gray-800">
      
      {/* --- Hero Section --- */}
      <section className="relative w-full bg-teal-900 text-white py-16 md:py-24 overflow-hidden print:hidden">
        {/* Abstract Background */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute right-0 top-0 w-64 h-64 md:w-96 md:h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-20"></div>
            <div className="absolute left-10 bottom-0 w-64 h-64 md:w-80 md:h-80 bg-teal-400 rounded-full mix-blend-overlay filter blur-3xl opacity-20"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 italic leading-tight">
            Terms & Conditions
          </h1>
          <p className="text-teal-100 text-base md:text-lg max-w-2xl font-light leading-relaxed">
            These conditions outline the rules and regulations for the use of Six Finance's Website and Mobile Application.
          </p>
          
          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 text-sm text-teal-200">
             <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>Last Updated: January 16, 2026</span>
             </div>
             
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid lg:grid-cols-12 gap-8 md:gap-12">
            
            {/* Sidebar Navigation (Sticky) - Hidden on Mobile/Print */}
            <aside className="hidden lg:block lg:col-span-3 print:hidden">
                <div className="sticky top-24 space-y-1">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 pl-4">Table of Contents</p>
                    <nav className="space-y-1 border-l border-gray-200">
                        <NavLink href="#acceptance" label="1. Acceptance" active />
                        <NavLink href="#accounts" label="2. Accounts & Security" />
                        <NavLink href="#intellectual" label="3. Intellectual Property" />
                        <NavLink href="#restrictions" label="4. Restrictions" />
                        <NavLink href="#disclaimer" label="5. Disclaimers" />
                        <NavLink href="#governing" label="6. Governing Law" />
                    </nav>
                </div>
            </aside>

            {/* Legal Text Content */}
            <main className="lg:col-span-9 space-y-12 md:space-y-16">
                
                {/* Section 1 */}
                <section id="acceptance" className="scroll-mt-28">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-teal-50 text-teal-600 rounded-lg print:hidden">
                            <CheckCircle size={24} />
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900">1. Acceptance of Terms</h2>
                    </div>
                    <div className="prose prose-lg text-gray-600 font-serif leading-relaxed text-sm md:text-base">
                        <p>
                            By accessing this website, we assume you accept these terms and conditions. Do not continue to use <strong>Six Finance</strong> if you do not agree to take all of the terms and conditions stated on this page.
                        </p>
                        <p className="mt-4">
                            The following terminology applies to these Terms and Conditions: "Client", "You" and "Your" refers to you, the person logged on this website. "The Company", "Ourselves", "We", "Our" and "Us", refers to Six Finance.
                        </p>
                    </div>
                </section>

                {/* Section 2 */}
                <section id="accounts" className="scroll-mt-28">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">2. Accounts & Security</h2>
                    <div className="prose prose-lg text-gray-600 font-serif leading-relaxed text-sm md:text-base">
                        <p>
                            When you create an account with us, you must provide us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
                        </p>
                        <ul className="list-disc pl-5 space-y-2 my-4 marker:text-teal-500">
                            <li>You are responsible for safeguarding the password that you use to access the Service.</li>
                            <li>You agree not to disclose your password to any third party.</li>
                            <li>You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.</li>
                        </ul>
                    </div>
                </section>

                {/* Section 3 */}
                <section id="intellectual" className="scroll-mt-28">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-teal-50 text-teal-600 rounded-lg print:hidden">
                            <Shield size={24} />
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900">3. Intellectual Property</h2>
                    </div>
                    <div className="prose prose-lg text-gray-600 font-serif leading-relaxed text-sm md:text-base">
                        <p>
                            Unless otherwise stated, Six Finance and/or its licensors own the intellectual property rights for all material on this website. All intellectual property rights are reserved. You may access this from Six Finance for your own personal use subjected to restrictions set in these terms and conditions.
                        </p>
                    </div>
                </section>

                {/* Section 4 */}
                <section id="restrictions" className="scroll-mt-28">
                     <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">4. Restrictions</h2>
                     <div className="bg-red-50 border-l-4 border-red-500 p-4 md:p-6 rounded-r-lg mb-6 print:border-gray-300 print:bg-white">
                        <p className="text-red-900 font-medium italic print:text-black text-sm md:text-base">
                            You are specifically restricted from all of the following:
                        </p>
                    </div>
                    <div className="prose prose-lg text-gray-600 font-serif leading-relaxed text-sm md:text-base">
                        <ul className="list-disc pl-5 space-y-2 marker:text-red-500">
                            <li>Publishing any website material in any other media without prior consent.</li>
                            <li>Selling, sublicensing, and/or otherwise commercializing any website material.</li>
                            <li>Using this website in any way that is or may be damaging to this website.</li>
                            <li>Using this website in any way that impacts user access to this website.</li>
                            <li>Engaging in any data mining, data harvesting, data extracting, or any other similar activity.</li>
                        </ul>
                    </div>
                </section>

                {/* Section 5 */}
                <section id="disclaimer" className="scroll-mt-28">
                    <div className="flex items-center gap-3 mb-4">
                         <div className="p-2 bg-teal-50 text-teal-600 rounded-lg print:hidden">
                            <AlertTriangle size={24} />
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900">5. Disclaimers</h2>
                    </div>
                    <div className="prose prose-lg text-gray-600 font-serif leading-relaxed text-sm md:text-base">
                        <p>
                            This Website is provided "as is," with all faults, and Six Finance expresses no representations or warranties, of any kind related to this Website or the materials contained on this Website. Also, nothing contained on this Website shall be interpreted as advising you.
                        </p>
                    </div>
                </section>

                {/* Section 6 */}
                <section id="governing" className="scroll-mt-28">
                     <div className="flex items-center gap-3 mb-4">
                         <div className="p-2 bg-teal-50 text-teal-600 rounded-lg print:hidden">
                            <Scale size={24} />
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900">6. Governing Law & Jurisdiction</h2>
                    </div>
                    <div className="prose prose-lg text-gray-600 font-serif leading-relaxed text-sm md:text-base">
                        <p>
                            These Terms will be governed by and interpreted in accordance with the laws of the State of India, and you submit to the non-exclusive jurisdiction of the state and federal courts located in India for the resolution of any disputes.
                        </p>
                    </div>
                </section>

                {/* Footer of the content */}
                <div className="pt-8 md:pt-12 border-t border-gray-200">
                    <p className="text-gray-500 italic text-sm md:text-base">
                        For any legal inquiries, please reach out to <a href="mailto:legal@sixfinance.com" className="text-teal-600 hover:underline">legal@sixfinance.com</a>.
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