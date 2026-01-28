import React from 'react';
import { 
  ShieldCheck, 
  Scale, 
  Database, 
  UserCheck, 
  AlertCircle, 
  FileText, 
  Mail, 
  ArrowRight,
  Info
} from 'lucide-react';
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl = "https://sixfinance.app/terms-conditions";

  return {
    title: "Terms of Service | Six Finance",

    description:
      "Read the Terms of Service governing your use of Six Finance’s digital financial aggregator platform, including user rights, liabilities, and data protection compliance.",

    keywords: [
      "six finance terms of service",
      "six finance terms",
      "financial aggregator terms",
      "loan aggregator terms and conditions",
      "financial services website terms",
      "user agreement six finance",
      "digital lending platform terms",
      "india dpdp act compliance",
    ],

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title: "Terms of Service | Six Finance",
      description:
        "Understand the rules, responsibilities, and limitations governing the use of Six Finance’s platform.",
      url: canonicalUrl,
      siteName: "Six Finance",
      type: "website",
      locale: "en_IN",
    },

    twitter: {
      card: "summary",
      title: "Terms of Service | Six Finance",
      description:
        "Official Terms of Service for using the Six Finance platform.",
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

/**
 * Six Finance Terms of Service - Server Side Component
 * Theme: teal-500
 */
export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 leading-relaxed">
      {/* Hero Header */}
      <header className="bg-teal-500 py-16 px-6 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tight">Terms of Service</h1>
        <p className="max-w-2xl mx-auto text-teal-50 opacity-90 text-lg">
          Governing your use of Six Finance's digital aggregator and financial suggestion platform.
        </p>
        <div className="mt-6 inline-block bg-teal-600 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest">
          Last updated: 24th January 2026
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-16">
        
        {/* Core Acknowledgment */}
        <section className="bg-slate-50 border-l-8 border-teal-500 p-8 rounded-r-2xl mb-12">
          <p className="text-lg text-slate-700">
            By accessing our services, you acknowledge and accept these terms in their entirety. 
            These terms govern your use of our digital aggregator and financial suggestion platform.
          </p>
        </section>

        {/* Section 1: Understanding Our Role */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <ShieldCheck className="text-teal-500" size={32} />
            <h2 className="text-3xl font-bold">Understanding Our Role</h2>
          </div>
          <p className="mb-6 text-slate-600">
            Six Finance operates as a digital aggregator and financial suggestion platform, serving as an intermediary between consumers and banking institutions. 
            We provide comprehensive comparisons and personalized recommendations for various banking products.
          </p>
          <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-amber-800 mb-2 flex items-center gap-2">
              <AlertCircle size={20} /> Critical Distinction
            </h3>
            <p className="text-amber-900">
              Six Finance is <strong>not a bank</strong>, lending institution, or financial services provider. 
              We do not issue credit cards, open accounts directly, or process financial transactions. 
              The final contractual agreement is established exclusively between you and your chosen banking partner.
            </p>
          </div>
        </section>

        {/* Section 2: The Suggestion Engine */}
        <section className="mb-16 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-bold mb-8">How Our "Better Suggestion" Engine Works</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-2">
              <span className="text-teal-500 font-black text-2xl">01</span>
              <h4 className="font-bold">Data Collection</h4>
              <p className="text-xs text-slate-500">You provide income, age, and location indicators through our secure platform.</p>
            </div>
            <div className="space-y-2">
              <span className="text-teal-500 font-black text-2xl">02</span>
              <h4 className="font-bold">Algorithm Analysis</h4>
              <p className="text-xs text-slate-500">Our system evaluates thousands of products against your requirements.</p>
            </div>
            <div className="space-y-2">
              <span className="text-teal-500 font-black text-2xl">03</span>
              <h4 className="font-bold">Personalization</h4>
              <p className="text-xs text-slate-500">Tailored suggestions ranked by suitability with transparent comparisons.</p>
            </div>
            <div className="space-y-2">
              <span className="text-teal-500 font-black text-2xl">04</span>
              <h4 className="font-bold">Bank Selection</h4>
              <p className="text-xs text-slate-500">We facilitate the connection with your chosen partner for application completion.</p>
            </div>
          </div>
        </section>

        {/* Section 3: Consent & Lead Generation */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <UserCheck className="text-teal-500" size={32} />
            <h2 className="text-3xl font-bold">Consent & Lead Generation</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-10">
            <div className="space-y-4">
              <p className="text-slate-600">
                Six Finance operates in full compliance with **India's Digital Personal Data Protection (DPDP) Act 2023**.
              </p>
              <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
                <h4 className="font-bold text-teal-600 mb-2">Partner Sharing Authorization</h4>
                <p className="text-sm text-slate-500 leading-relaxed">
                  You authorize us to share your lead profile with verified partner banks (including but not limited to Kotak Mahindra Bank and HDFC Bank) to fulfill your request.
                </p>
              </div>
            </div>
            <div className="bg-slate-900 text-white p-8 rounded-3xl">
              <h4 className="font-bold text-teal-400 mb-4 uppercase tracking-widest text-xs">Communication Consent</h4>
              <p className="text-sm opacity-90 mb-4">
                You agree to receive calls, SMS, WhatsApp, and emails from Six Finance and our partners, even if you are on the **National Do Not Disturb (DND) registry**.
              </p>
              <div className="h-1 w-20 bg-teal-500 rounded" />
            </div>
          </div>
        </section>

        {/* Section 4: Critical Disclaimers */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <Scale className="text-teal-500" /> Limitation of Liability & Disclaimers
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 border border-slate-100 rounded-2xl bg-white">
              <h4 className="font-bold mb-2">No Guarantee of Approval</h4>
              <p className="text-sm text-slate-500">
                "High Chance of Approval" is a predictive assessment and not a guarantee. The final decision rests entirely with the banking institution following their internal KYC and credit checks.
              </p>
            </div>
            <div className="p-6 border border-slate-100 rounded-2xl bg-white">
              <h4 className="font-bold mb-2">Market Fluctuations</h4>
              <p className="text-sm text-slate-500">
                Interest rates, fees, and promotional offers can change without advance notice. We are not liable for discrepancies between our platform and official bank terms.
              </p>
            </div>
            <div className="p-6 border border-slate-100 rounded-2xl bg-white">
              <h4 className="font-bold mb-2">Financial Outcomes</h4>
              <p className="text-sm text-slate-500">
                Six Finance is not liable for financial loss or unfavorable terms. All financial decisions remain your sole responsibility.
              </p>
            </div>
            <div className="p-6 border border-slate-100 rounded-2xl bg-white">
              <h4 className="font-bold mb-2">User Data Accuracy</h4>
              <p className="text-sm text-slate-500">
                Providing false information may result in application rejection and potential legal consequences. You must be at least 18 and an Indian resident.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: DPDP Act Rights */}
        <section className="mb-16 bg-teal-600 text-white p-10 rounded-3xl">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <Database className="text-teal-300" /> Your Data Rights (DPDP Act 2023)
          </h2>
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <ul className="space-y-4 text-sm opacity-90">
              <li className="flex gap-2"><span>•</span> **Right to Access:** Request a complete copy of your data.</li>
              <li className="flex gap-2"><span>•</span> **Right to Correction:** Update inaccurate information.</li>
            </ul>
            <ul className="space-y-4 text-sm opacity-90">
              <li className="flex gap-2"><span>•</span> **Right to Erasure:** Request data deletion at any time.</li>
              <li className="flex gap-2"><span>•</span> **Right to Portability:** Receive data in structured formats.</li>
            </ul>
          </div>
          <div className="bg-teal-700/50 p-6 rounded-2xl border border-teal-400/30">
            <p className="text-sm">
              <strong>Data Withdrawal:</strong> Use the "Data Withdrawal" button in your profile settings. 
              We process requests within 30 days. This action is irreversible and terminates access to our services.
            </p>
          </div>
        </section>

        {/* Footer Contact */}
        <footer className="pt-12 border-t border-slate-200">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-bold mb-3 uppercase text-xs tracking-widest text-teal-600">Legal Team</h4>
              <p className="text-sm text-slate-500 flex items-center gap-2">
                <Mail size={14} /> legal@sixfinance.in
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-3 uppercase text-xs tracking-widest text-teal-600">Privacy Officer</h4>
              <p className="text-sm text-slate-500 flex items-center gap-2">
                <Mail size={14} /> privacy@sixfinance.in
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-3 uppercase text-xs tracking-widest text-teal-600">Jurisdiction</h4>
              <p className="text-sm text-slate-500">Mumbai, Maharashtra, India</p>
            </div>
          </div>
          <div className="mt-12 text-center text-slate-400 text-xs">
            <p>
              These Terms of Service constitute a legally binding agreement. 
              Six Finance reserves the right to modify these terms at any time.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}