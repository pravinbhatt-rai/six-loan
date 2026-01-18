'use client';

import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Clock, MessageSquare, ArrowRight } from 'lucide-react';
import ContactForm from '@/component/contact-us/ContactForm'; 

export default function ContactPage() {
  const [userData, setUserData] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Fetch user data on page mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/auth/session");
        if (response.ok) {
          const data = await response.json();
          if (data && data.user) {
            setIsLoggedIn(true);
            setUserData(data.user);
          }
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };
    fetchUserData();
  }, []);
  return (
    <div className="min-h-screen bg-gray-50 font-serif text-gray-800 overflow-x-hidden">
      
      {/* --- Hero Section --- */}
      <section className="relative w-full bg-teal-900 text-white overflow-hidden py-16 md:py-24">
        {/* Background Blobs - Toned down for mobile */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
            <div className="absolute right-0 top-0 w-64 h-64 md:w-96 md:h-96 bg-teal-400 rounded-full mix-blend-overlay filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute left-0 bottom-0 w-64 h-64 md:w-80 md:h-80 bg-teal-200 rounded-full mix-blend-overlay filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-teal-300 font-semibold tracking-wider uppercase text-[10px] md:text-xs mb-3 md:mb-4">
            24/7 Support
          </h2>
          {/* Responsive Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 md:mb-6 italic leading-tight">
            We're here to help
          </h1>
          <p className="max-w-xl mx-auto text-teal-100 text-base md:text-lg leading-relaxed px-2">
            Have a question about your loan eligibility or credit score? Our financial experts are ready to assist you.
          </p>
        </div>
      </section>

      {/* --- Main Content Split --- */}
      {/* Adjusted negative margin for mobile to prevent overlap issues */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 md:-mt-16 relative z-20 pb-16 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left: Contact Info Cards */}
            {/* Order changed: On mobile, Form comes first? Usually Contact Info first is fine. */}
            <div className="lg:col-span-1 space-y-6">
                
                {/* Info Card */}
                <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border-t-4 border-teal-500">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 italic">Get in Touch</h3>
                    
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-teal-50 text-teal-600 rounded-lg shrink-0">
                                <Phone size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase font-bold tracking-wide">Call Us</p>
                                <p className="text-gray-900 font-medium text-lg">+91 1800-200-300</p>
                                <p className="text-gray-500 text-sm">Mon-Sat, 9am - 7pm</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-teal-50 text-teal-600 rounded-lg shrink-0">
                                <Mail size={20} />
                            </div>
                            <div className="break-all"> {/* Prevents email overflow */}
                                <p className="text-xs text-gray-500 uppercase font-bold tracking-wide">Email Us</p>
                                <p className="text-gray-900 font-medium">support@finance.com</p>
                                <p className="text-gray-900 font-medium">loans@finance.com</p>
                            </div>
                        </div>

                         <div className="flex items-start gap-4">
                            <div className="p-3 bg-teal-50 text-teal-600 rounded-lg shrink-0">
                                <MapPin size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase font-bold tracking-wide">Head Office</p>
                                <p className="text-gray-900 font-medium leading-relaxed text-sm md:text-base">
                                    Tower C, Cyber City,<br />
                                    Gurugram, Haryana, India
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FAQ Teaser - Hidden on very small screens if needed, or kept */}
                <div className="bg-teal-900 text-white p-6 md:p-8 rounded-xl shadow-lg relative overflow-hidden group cursor-pointer">
                    <div className="absolute right-0 top-0 p-8 opacity-10 transform group-hover:scale-110 transition-transform">
                        <MessageSquare size={100} />
                    </div>
                    <h3 className="text-xl font-bold mb-2 italic">Check FAQ</h3>
                    <p className="text-teal-200 text-sm mb-6 leading-relaxed">Find answers to common questions about EMI, Interest Rates, and Eligibility.</p>
                    <div className="flex items-center gap-2 font-bold text-sm text-teal-400 group-hover:text-white transition-colors">
                        View Help Center <ArrowRight size={16} />
                    </div>
                </div>
            </div>

            {/* Right: Interactive Form */}
            <div className="lg:col-span-2">
               <ContactForm />
            </div>
        </div>
      </section>

      {/* --- Map Section --- */}
      <section className="h-64 md:h-96 w-full bg-gray-200 relative grayscale hover:grayscale-0 transition-all duration-700">
        <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.83923192776!2d77.0688975472578!3d28.52728034389636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204dce!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1709834823154!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Office Location"
        ></iframe>
        
        {/* Map Overlay Card - Hidden on mobile to avoid covering the map */}
        <div className="absolute bottom-4 left-4 md:bottom-10 md:left-10 bg-white p-4 rounded-lg shadow-xl max-w-xs z-10 hidden md:block">
            <div className="flex items-center gap-3">
                <div className="bg-teal-100 p-2 rounded-full text-teal-600">
                    <Clock size={16} />
                </div>
                <div>
                    <p className="text-xs text-gray-500 font-bold uppercase">Visiting Hours</p>
                    <p className="text-sm font-bold text-gray-900">Mon - Fri, 10am - 6pm</p>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
}