'use client';

import React from 'react';
import { Phone, Mail, Clock, AlertCircle, Shield, UserCheck, ArrowRight, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function CustomerSupportPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-serif text-gray-800 overflow-x-hidden">
      
      {/* --- Hero Section --- */}
      <section className="relative w-full bg-teal-900 text-white pt-16 pb-24 md:pt-24 md:pb-40 overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
             <div className="absolute left-0 top-0 w-64 h-64 md:w-96 md:h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-pulse"></div>
             <div className="absolute right-0 bottom-0 w-64 h-64 md:w-96 md:h-96 bg-teal-400 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-blob"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-teal-800/50 backdrop-blur-md px-4 py-1.5 rounded-full border border-teal-700/50 mb-6 shadow-sm">
            <Shield size={14} className="text-teal-300" />
            <span className="text-[10px] md:text-xs uppercase tracking-widest font-semibold text-teal-100">Customer Care Policy</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 italic leading-tight">
            Grievance Redressal
          </h1>
          <p className="text-teal-100 text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed px-4 opacity-90">
            At Six Finance, transparency is our currency. If you aren't satisfied with our service, follow our structured escalation matrix below for a quick resolution.
          </p>
        </div>
      </section>

      {/* --- Main Content (Escalation Matrix) --- */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 md:-mt-24 relative z-20 pb-20">
         
         {/* Level 1 Card: Customer Support */}
         <div className="group bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 mb-6 md:mb-10 overflow-hidden transition-all hover:shadow-2xl hover:shadow-teal-500/10">
            <div className="flex flex-col md:flex-row">
                {/* Left Strip */}
                <div className="bg-teal-500 w-full md:w-2 h-2 md:h-auto"></div>
                
                <div className="p-6 md:p-10 w-full">
                    <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 font-bold text-xl shadow-sm shrink-0">1</div>
                            <div>
                                <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">Level 1: Support</h2>
                                <p className="text-teal-600 text-xs font-bold uppercase tracking-wide mt-1">First Point of Contact</p>
                            </div>
                        </div>
                        <span className="hidden md:inline-block px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full border border-green-100">
                            24-48 Hrs Resolution
                        </span>
                    </div>
                    
                    <p className="text-gray-600 mb-8 leading-relaxed text-sm md:text-base border-b border-gray-100 pb-6">
                        Facing an issue? Our dedicated support team is available to assist you. Most queries are resolved at this stage.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                        {/* Phone */}
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-teal-200 transition-colors">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-teal-600 shadow-sm shrink-0">
                                <Phone size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Call Us</p>
                                <a href="tel:18002585555" className="text-gray-900 font-bold text-lg hover:text-teal-600 transition-colors">1800-258-5555</a>
                            </div>
                        </div>
                        {/* Email */}
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-teal-200 transition-colors">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-teal-600 shadow-sm shrink-0">
                                <Mail size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Email Us</p>
                                <a href="mailto:care@sixfinance.com" className="text-gray-900 font-bold text-lg hover:text-teal-600 transition-colors">care@sixfinance.com</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         </div>

         {/* Connector Line (Desktop Only) */}
         <div className="hidden md:flex justify-center -my-6 relative z-0">
             <div className="h-12 w-0.5 bg-gray-200"></div>
         </div>

         {/* Level 2 Card: Grievance Officer */}
         <div className="group bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 mb-6 md:mb-10 overflow-hidden transition-all hover:shadow-2xl hover:shadow-orange-500/10">
            <div className="flex flex-col md:flex-row">
                <div className="bg-orange-400 w-full md:w-2 h-2 md:h-auto"></div>
                
                <div className="p-6 md:p-10 w-full">
                    <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 font-bold text-xl shadow-sm shrink-0">2</div>
                            <div>
                                <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">Level 2: Grievance Officer</h2>
                                <p className="text-orange-500 text-xs font-bold uppercase tracking-wide mt-1">Escalation</p>
                            </div>
                        </div>
                        <span className="hidden md:inline-block px-3 py-1 bg-orange-50 text-orange-700 text-xs font-bold rounded-full border border-orange-100">
                            7 Days Resolution
                        </span>
                    </div>
                    
                    <p className="text-gray-600 mb-8 leading-relaxed text-sm md:text-base">
                        If your query remains unresolved after 7 days, escalate it to our Nodal Officer.
                    </p>

                    <div className="bg-orange-50/40 p-5 md:p-6 rounded-xl border border-orange-100/50 flex flex-col md:flex-row gap-6 items-start md:items-center">
                        <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-sm text-orange-500 shrink-0">
                            <UserCheck size={28} />
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-lg font-bold text-gray-900">Mr. Rajesh Verma</h3>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Mail size={14} />
                                <span className="font-medium">grievance@sixfinance.com</span>
                            </div>
                            <div className="flex items-start gap-2 text-sm text-gray-600">
                                <MapPin size={14} className="mt-1 shrink-0" />
                                <span>Tower C, Cyber City, Gurugram</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         </div>

         {/* Connector Line (Desktop Only) */}
         <div className="hidden md:flex justify-center -my-6 relative z-0">
             <div className="h-12 w-0.5 bg-gray-200"></div>
         </div>

         {/* Level 3 Card: PNO */}
         <div className="group bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 mb-12 overflow-hidden transition-all hover:shadow-2xl hover:shadow-red-500/10">
            <div className="flex flex-col md:flex-row">
                <div className="bg-red-500 w-full md:w-2 h-2 md:h-auto"></div>
                
                <div className="p-6 md:p-10 w-full">
                    <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-red-50 border border-red-100 flex items-center justify-center text-red-500 font-bold text-xl shadow-sm shrink-0">3</div>
                            <div>
                                <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">Level 3: Principal Nodal Officer</h2>
                                <p className="text-red-500 text-xs font-bold uppercase tracking-wide mt-1">Final Authority</p>
                            </div>
                        </div>
                        <span className="hidden md:inline-block px-3 py-1 bg-red-50 text-red-700 text-xs font-bold rounded-full border border-red-100">
                            Highest Priority
                        </span>
                    </div>
                    
                    <p className="text-gray-600 mb-8 leading-relaxed text-sm md:text-base">
                        The highest level of escalation. Please quote your previous Ticket ID when contacting the PNO.
                    </p>

                    <div className="bg-red-50/40 p-5 md:p-6 rounded-xl border border-red-100/50">
                         <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                             <div>
                                <h3 className="text-lg font-bold text-gray-900">Ms. Anjali Gupta</h3>
                                <p className="text-sm text-gray-500">Principal Nodal Officer</p>
                             </div>
                             <a href="mailto:pno@sixfinance.com" className="px-6 py-3 bg-white border border-gray-200 text-red-600 font-bold rounded-lg text-sm hover:bg-red-50 transition-colors shadow-sm text-center">
                                Contact PNO
                             </a>
                         </div>
                    </div>
                </div>
            </div>
         </div>

         {/* Bottom Grid: Timelines & Ombudsman */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Timeline Card */}
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-lg">
                <div className="flex items-center gap-3 mb-6 text-teal-700">
                    <Clock size={24} />
                    <h4 className="font-bold text-lg">Response Timelines</h4>
                </div>
                <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-gray-50 pb-3">
                        <span className="text-gray-600 text-sm">Acknowledgment</span>
                        <span className="font-bold text-gray-900 text-sm">Within 24 Hours</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-50 pb-3">
                        <span className="text-gray-600 text-sm">Level 1 Resolution</span>
                        <span className="font-bold text-gray-900 text-sm">2-5 Days</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 text-sm">Level 2/3 Resolution</span>
                        <span className="font-bold text-gray-900 text-sm">7-10 Days</span>
                    </div>
                </div>
            </div>

            {/* RBI Card */}
            <div className="bg-gray-900 p-6 md:p-8 rounded-2xl border border-gray-800 shadow-lg text-white relative overflow-hidden">
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4 text-teal-400">
                        <AlertCircle size={24} />
                        <h4 className="font-bold text-lg">RBI Ombudsman</h4>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed mb-6">
                        If your complaint remains unresolved after 30 days, you may approach the Banking Ombudsman appointed by the RBI.
                    </p>
                    <Link href="https://cms.rbi.org.in/cms/indexpage.html#eng"  target="_blank" className="inline-flex items-center gap-2 text-white font-bold text-sm border-b border-teal-500 pb-1 hover:text-teal-400 transition-colors">
                        Visit RBI CMS Portal <ArrowRight size={16} />
                    </Link>
                </div>
                {/* Decorative Pattern */}
                <div className="absolute right-0 bottom-0 opacity-10">
                    <Shield size={120} />
                </div>
            </div>
         </div>

      </section>
    </div>
  );
}