import {
  Phone,
  Mail,
  MessageSquare,
  Handshake,
  Clock,
  CheckCircle,
  HelpCircle,
  Users,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

import type { Metadata } from "next";
import React from "react";

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl = "https://sixfinance.app/customer-support";

  return {
    title:
      "Six Finance Customer Support | Contact, Complaints & Help Desk",
    description:
      "Contact Six Finance customer support for assistance with loans, accounts, complaints, partnerships, and general inquiries. Reach us via phone or email for fast, reliable help.",

    keywords: [
      "six finance support",
      "six finance customer support",
      "six finance contact details",
      "six finance helpline number",
      "six finance customer care",
      "loan customer support india",
      "financial services support",
      "six finance complaints",
      "six finance email support",
      "dsa partner support",
      "contact six finance",
      "six finance help desk",
    ],

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title: "Six Finance Customer Support & Contact",
      description:
        "Reach Six Finance customer care for support, complaints, and partner inquiries. Dedicated help for all financial service needs.",
      url: canonicalUrl,
      siteName: "Six Finance",
      type: "website",
      locale: "en_IN",
    },

    twitter: {
      card: "summary_large_image",
      title: "Six Finance Customer Support",
      description:
        "Need help? Contact Six Finance customer care via phone or email for quick assistance.",
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}


/**
 * Six Finance Customer Support - Server Side Component
 * Theme: teal-500
 * Click-to-dial: Enabled on primary phone number
 */
export default function CustomerSupportPage() {
  const primaryPhone = "8877772277";

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 leading-relaxed">
      {/* Hero Header */}
      <header className="bg-teal-500 py-20 px-6 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tight">
          Support & Contact Details
        </h1>
        <p className="max-w-3xl mx-auto text-teal-50 text-lg opacity-90 font-medium">
          Your comprehensive guide to reaching our dedicated support team for all your financial service needs.
        </p>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-16">

        {/* Why Contact Us Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-800 underline decoration-teal-500 underline-offset-8">
            Why Contact Six Finance Support?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-teal-50 rounded-3xl border border-teal-100 flex flex-col items-center text-center">
              <Users className="text-teal-600 mb-4" size={40} />
              <h3 className="text-xl font-bold mb-3 text-teal-800 uppercase tracking-tighter">Expert Team</h3>
              <p className="text-sm text-slate-600">
                Specialized professionals with deep knowledge of financial services, ready to assist with complex inquiries and provide expert guidance.
              </p>
            </div>
            <div className="p-8 bg-teal-50 rounded-3xl border border-teal-100 flex flex-col items-center text-center">
              <CheckCircle className="text-teal-600 mb-4" size={40} />
              <h3 className="text-xl font-bold mb-3 text-teal-800 uppercase tracking-tighter">Multi-Channel Support</h3>
              <p className="text-sm text-slate-600">
                Reach us your way—phone, email, or partner channels. Flexible communication options designed around your preferences.
              </p>
            </div>
            <div className="p-8 bg-teal-50 rounded-3xl border border-teal-100 flex flex-col items-center text-center">
              <Clock className="text-teal-600 mb-4" size={40} />
              <h3 className="text-xl font-bold mb-3 text-teal-800 uppercase tracking-tighter">Quick Resolution</h3>
              <p className="text-sm text-slate-600">
                Commitment to rapid response times and customer satisfaction. We prioritize efficient problem-solving without compromising quality.
              </p>
            </div>
          </div>
        </section>

        {/* Primary Contact & Response Time */}
        <section className="grid lg:grid-cols-2 gap-8 mb-20">
          {/* Phone Support (Click-to-Dial) */}
          <div className="bg-white border-2 border-teal-500 rounded-[2.5rem] p-10 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 bg-teal-500 text-white px-6 py-2 rounded-bl-2xl text-xs font-bold uppercase tracking-widest">
              Direct line
            </div>
            <h3 className="text-2xl font-black text-teal-600 mb-2 uppercase">Customer Care</h3>
            <p className="text-slate-500 text-sm mb-8 italic">Your first point of contact for all financial needs.</p>

            <a
              href={`tel:${primaryPhone}`}
              className="flex items-center gap-6 mb-8 group/phone cursor-pointer hover:opacity-80 transition-all"
              aria-label="Call Six Finance Customer Care"
            >
              <div className="bg-teal-500 p-4 rounded-2xl text-white shadow-lg group-hover/phone:scale-110 transition-transform">
                <Phone size={32} />
              </div>
              <div>
                <p className="text-xs text-teal-600 font-black uppercase tracking-widest mb-1">Call Us Anytime</p>
                <p className="text-4xl font-black text-slate-800 tracking-tighter">88 77 77 22 77</p>
              </div>
            </a>
            <p className="text-sm text-slate-600 leading-relaxed border-l-4 border-teal-200 pl-4">
              Providing friendly, knowledgeable assistance for all support inquiries including account questions and technical assistance.
            </p>
          </div>

          {/* Response Time Box */}
          <div className="bg-slate-900 text-white rounded-[2.5rem] p-10 flex flex-col justify-center border-b-[12px] border-teal-500 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="text-teal-400" size={32} />
              <h3 className="text-2xl font-bold uppercase tracking-widest">Response Time</h3>
            </div>
            <p className="text-3xl font-light text-teal-100 mb-4">
              Typically within <span className="font-bold text-teal-400">24-72 hours</span>
            </p>
            <p className="text-slate-400 text-sm leading-relaxed">
              Our dedicated support team is standing by to assist you every step of the way, ensuring thorough and helpful solutions to your questions.
            </p>
          </div>
        </section>

        {/* Specialized Support Channels */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-10 text-slate-800 flex items-center gap-3">
            <Mail className="text-teal-500" /> Specialized Email Channels
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-50 p-8 rounded-3xl hover:bg-teal-50 transition-colors border border-slate-100 group">
              <h4 className="font-black text-teal-700 mb-2 uppercase text-xs tracking-widest">General Support</h4>
              <p className="text-slate-800 font-bold mb-4">support@sixfinance.app</p>
              <ul className="text-xs text-slate-500 space-y-2 mb-4">
                <li className="flex items-center gap-2"><ChevronRight size={12} className="text-teal-500" /> Technical troubleshooting</li>
                <li className="flex items-center gap-2"><ChevronRight size={12} className="text-teal-500" /> Account management assistance</li>
                <li className="flex items-center gap-2"><ChevronRight size={12} className="text-teal-500" /> Product questions & feedback</li>
              </ul>
            </div>
            <div className="bg-slate-50 p-8 rounded-3xl hover:bg-teal-50 transition-colors border border-slate-100">
              <h4 className="font-black text-teal-700 mb-2 uppercase text-xs tracking-widest">Complaints Handling</h4>
              <p className="text-slate-800 font-bold mb-4">complain@sixfinance.app</p>
              <p className="text-xs text-slate-500 leading-relaxed">
                Dedicated feedback channel where a specialized team reviews your concerns with care, ensuring fair and transparent handling.
              </p>
            </div>
            <div className="bg-slate-50 p-8 rounded-3xl hover:bg-teal-50 transition-colors border border-slate-100">
              <h4 className="font-black text-teal-700 mb-2 uppercase text-xs tracking-widest">Partner Inquiries</h4>
              <p className="text-slate-800 font-bold mb-4">dsa@sixfinance.app</p>
              <p className="text-xs text-slate-500 leading-relaxed">
                Connect with our partnership team for business development, collaboration opportunities, and strategic alliances.
              </p>
            </div>
          </div>
        </section>

        {/* Tips for Effective Support */}
        <section className="bg-teal-600 text-white rounded-[3rem] p-12 shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-black mb-10 uppercase tracking-tighter flex items-center gap-3">
              <HelpCircle className="text-teal-300" size={36} /> Tips for Effective Requests
            </h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="flex gap-5">
                <span className="text-5xl font-black text-teal-400/50">01</span>
                <div>
                  <h4 className="text-xl font-bold mb-2 uppercase tracking-tight">Provide Clear Details</h4>
                  <p className="text-sm opacity-90 leading-relaxed">
                    Describe your issue or question thoroughly, including any error messages or specific circumstances surrounding your inquiry.
                  </p>
                </div>
              </div>
              <div className="flex gap-5">
                <span className="text-5xl font-black text-teal-400/50">02</span>
                <div>
                  <h4 className="text-xl font-bold mb-2 uppercase tracking-tight">Include Relevant Info</h4>
                  <p className="text-sm opacity-90 leading-relaxed">
                    Share account numbers, transaction IDs, or reference numbers to help us locate your information quickly and accurately.
                  </p>
                </div>
              </div>
              <div className="flex gap-5">
                <span className="text-5xl font-black text-teal-400/50">03</span>
                <div>
                  <h4 className="text-xl font-bold mb-2 uppercase tracking-tight">Use the Right Channel</h4>
                  <p className="text-sm opacity-90 leading-relaxed">
                    Direct your inquiry to the appropriate email address to ensure it reaches the specialized team best equipped to help.
                  </p>
                </div>
              </div>
              <div className="flex gap-5">
                <span className="text-5xl font-black text-teal-400/50">04</span>
                <div>
                  <h4 className="text-xl font-bold mb-2 uppercase tracking-tight">Expect Professional Service</h4>
                  <p className="text-sm opacity-90 leading-relaxed">
                    Count on timely, courteous responses from our team, committed to resolving your concerns with expertise and care.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer: Thank You Section */}
      <footer className="bg-slate-50 border-t border-slate-200 py-24 px-6 text-center">
        <h2 className="text-4xl font-black text-teal-600 mb-6 uppercase tracking-tight">
          Thank You for Choosing Six Finance
        </h2>
        <div className="max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-slate-800 mb-4 italic underline decoration-teal-300 decoration-4">We Value Your Trust</h3>
          <p className="text-slate-600 mb-10 leading-relaxed text-lg font-medium">
            Your confidence in Six Finance drives us to deliver exceptional service every day.
            Your feedback and partnership are invaluable to our continued growth.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <button className="bg-teal-500 text-white font-bold py-5 px-14 rounded-full hover:bg-teal-600 transition-all shadow-lg uppercase tracking-widest text-sm flex items-center gap-2">
              Visit Website <ExternalLink size={16} />
            </button>
            <button className="bg-slate-800 text-white font-bold py-5 px-14 rounded-full hover:bg-slate-900 transition-all shadow-lg uppercase tracking-widest text-sm">
              Contact Support
            </button>
          </div>
          <p className="mt-16 text-teal-600 font-black uppercase tracking-[0.3em] text-xs">
            Always Here to Support Your Financial Journey
          </p>
        </div>
      </footer>
    </div>
  );
}