import React from 'react';
import { Phone, Mail, MessageSquare, Handshake, Clock, ShieldCheck, HelpCircle, Users, Globe, ExternalLink } from 'lucide-react';
import type { Metadata } from "next";


export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl = "https://sixfinance.app/contact-us";

  return {
    title:
      "Support & Contact Six Finance | Customer Care, Complaints & DSA Help",
    description:
      "Get in touch with Six Finance support. Contact customer care, raise complaints, connect with DSA partners, or get expert help for all financial services.",

    keywords: [
      "six finance support",
      "six finance contact",
      "six finance customer care",
      "financial services support india",
      "loan customer support",
      "six finance complaints",
      "six finance email support",
      "dsa partner support",
      "financial help desk",
      "contact six finance",
      "six finance helpline number",
      "business loan support",
    ],

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title: "Support & Contact Six Finance",
      description:
        "Reach Six Finance customer support for assistance, complaints, partnerships, and financial service queries.",
      url: canonicalUrl,
      siteName: "Six Finance",
      type: "website",
      locale: "en_IN",
    },

    twitter: {
      card: "summary_large_image",
      title: "Six Finance Support & Contact",
      description:
        "Need help? Contact Six Finance customer care, complaints team, or DSA support.",
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

/**
 * Six Finance - Comprehensive Support & Contact Page
 * Theme: teal-500
 */
const SixFinanceFullSupport: React.FC = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* Header - Page 1 */}
      <header className="bg-teal-500 py-16 px-6 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 uppercase tracking-tight">Support & Contact Details</h1>
        <p className="max-w-3xl mx-auto text-teal-50 text-lg opacity-90">
          Your comprehensive guide to reaching our dedicated support team for all your financial service needs.
        </p>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-16">
        
        {/* Section: Why Contact Six Finance Support? - Page 6 */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-800 underline decoration-teal-500 underline-offset-8">
            Why Contact Six Finance Support?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-teal-50 rounded-2xl border border-teal-100 transition-transform hover:scale-105">
              <ShieldCheck className="text-teal-600 mb-4" size={32} />
              <h3 className="font-bold text-xl mb-3 text-teal-800">Expert Team</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Specialized professionals with deep knowledge of financial services, ready to assist with complex inquiries and provide expert guidance.
              </p>
            </div>
            <div className="p-8 bg-teal-50 rounded-2xl border border-teal-100 transition-transform hover:scale-105">
              <Globe className="text-teal-600 mb-4" size={32} />
              <h3 className="font-bold text-xl mb-3 text-teal-800">Multi-Channel Support</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Reach us your way—phone, email, or partner channels. Flexible communication options designed around your preferences.
              </p>
            </div>
            <div className="p-8 bg-teal-50 rounded-2xl border border-teal-100 transition-transform hover:scale-105">
              <Clock className="text-teal-600 mb-4" size={32} />
              <h3 className="font-bold text-xl mb-3 text-teal-800">Quick Resolution</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Commitment to rapid response times and customer satisfaction. We prioritize efficient problem-solving without compromising quality.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Primary Contact Channels - Page 2 & 7 */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          <div className="bg-white border-2 border-teal-500 rounded-3xl p-8 shadow-lg">
            <h3 className="text-2xl font-black text-teal-600 mb-6 uppercase tracking-wider">Customer Care</h3>
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-teal-500 p-3 rounded-full text-white shadow-md"><Phone size={24} /></div>
              <div>
                <p className="text-3xl font-black text-slate-800">88 77 77 22 77</p>
                <p className="text-teal-600 font-bold uppercase text-xs">Primary support line for all inquiries</p>
              </div>
            </div>
            <p className="text-slate-500 text-sm italic border-l-4 border-teal-200 pl-4">
              Your first point of contact. Friendly, knowledgeable assistance for your financial needs.
            </p>
          </div>

          <div className="bg-slate-900 text-white rounded-3xl p-8 flex flex-col justify-center border-b-8 border-teal-500">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="text-teal-400" />
              <h3 className="text-xl font-bold uppercase tracking-widest">Typical Response Time</h3>
            </div>
            <p className="text-3xl font-light text-teal-100">
              Within <span className="font-bold text-teal-400">24-72 hours</span>
            </p>
            <p className="text-slate-400 text-sm mt-2">Ensuring thorough and helpful solutions to your questions.</p>
          </div>
        </div>

        {/* Section: Email Channels - Page 3, 4, 5 & 7 */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          <div className="border border-slate-200 p-6 rounded-2xl hover:bg-slate-50 transition-colors shadow-sm">
            <Mail className="text-teal-500 mb-4" size={28} />
            <h4 className="font-bold mb-2">General Support</h4>
            <p className="text-teal-600 font-bold text-sm mb-4 break-all">support@sixfinance.app</p>
            <ul className="text-xs text-slate-500 space-y-1">
              <li>• Technical issues & troubleshooting</li>
              <li>• Account management assistance</li>
              <li>• General product questions</li>
            </ul>
          </div>
          <div className="border border-slate-200 p-6 rounded-2xl hover:bg-slate-50 transition-colors shadow-sm">
            <MessageSquare className="text-teal-500 mb-4" size={28} />
            <h4 className="font-bold mb-2">Complaints Handling</h4>
            <p className="text-teal-600 font-bold text-sm mb-4 break-all">complain@sixfinance.app</p>
            <p className="text-xs text-slate-500">Dedicated feedback channel. Our specialized team reviews your concerns with care and attention.</p>
          </div>
          <div className="border border-slate-200 p-6 rounded-2xl hover:bg-slate-50 transition-colors shadow-sm">
            <Handshake className="text-teal-500 mb-4" size={28} />
            <h4 className="font-bold mb-2">DSA Partner Contact</h4>
            <p className="text-teal-600 font-bold text-sm mb-4 break-all">dsa@sixfinance.app</p>
            <p className="text-xs text-slate-500">Collaboration & Partnerships. Explore strategic alliances and mutual growth opportunities.</p>
          </div>
        </div>

        {/* Section: Tips for Effective Support - Page 9 */}
        <section className="bg-teal-600 text-white rounded-3xl p-10 shadow-2xl relative">
          <h2 className="text-2xl font-black mb-8 uppercase tracking-tighter">Tips for Effective Support Requests</h2>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="flex gap-4">
              <span className="text-4xl font-black text-teal-400">01</span>
              <p className="text-sm"><strong className="block text-lg mb-1">Provide Clear Details</strong> Describe your issue or question thoroughly, including any error messages or specific circumstances.</p>
            </div>
            <div className="flex gap-4">
              <span className="text-4xl font-black text-teal-400">02</span>
              <p className="text-sm"><strong className="block text-lg mb-1">Include Relevant Information</strong> Share account numbers, transaction IDs, or reference numbers for quick location.</p>
            </div>
            <div className="flex gap-4">
              <span className="text-4xl font-black text-teal-400">03</span>
              <p className="text-sm"><strong className="block text-lg mb-1">Use the Right Channel</strong> Direct your inquiry to the appropriate email address to reach the specialized team.</p>
            </div>
            <div className="flex gap-4">
              <span className="text-4xl font-black text-teal-400">04</span>
              <p className="text-sm"><strong className="block text-lg mb-1">Expect Professional Service</strong> Count on timely, courteous responses from our team committed to expert care.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer / Thank You - Page 8 & 10 */}
      <footer className="bg-slate-50 border-t border-slate-200 py-20 px-6 text-center">
        <h2 className="text-4xl font-black text-teal-600 mb-4 uppercase tracking-tight">
          Thank You for Choosing Six Finance
        </h2>
        <div className="max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-slate-800 mb-4 italic">We Value Your Trust</h3>
          <p className="text-slate-600 mb-10 leading-relaxed text-lg">
            Your confidence in Six Finance drives us to deliver exceptional service every day. 
            Your feedback and partnership are invaluable to our continued growth.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-teal-500 text-white font-bold py-4 px-12 rounded-full hover:bg-teal-600 transition-all shadow-lg flex items-center gap-2">
             <a href="https://sixfinance.app">Visit Website</a> <ExternalLink size={18} />
            </button>
            <button className="bg-slate-800 text-white font-bold py-4 px-12 rounded-full hover:bg-slate-900 transition-all shadow-lg">
              Contact Support
            </button>
          </div>
          <p className="mt-12 text-teal-600 font-bold uppercase tracking-widest text-xs">
            Always Here to Support Your Financial Journey
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SixFinanceFullSupport;