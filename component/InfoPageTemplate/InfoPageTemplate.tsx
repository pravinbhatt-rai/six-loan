import React from 'react';
import { 
  ShieldCheck, 
  ChevronDown, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

// --- Types ---
export interface PageData {
  hero: {
    badge: string;
    title: React.ReactNode;
    description: string;
  };
  intro: {
    title: string;
    content: string;
    points: string[];
    mainIcon: React.ReactNode; 
  };
  services: {
    icon: React.ReactNode;
    title: string;
    desc: string;
    action: string;
  }[];
  cta: {
    title: string;
    description: string;
    benefits: string[];
  };
  table: {
    title: string;
    headers: string[];
    rows: string[][];
  };
  faqs: {
    question: string;
    answer: string;
  }[];
}

const InfoPageTemplate: React.FC<{ data: PageData }> = ({ data }) => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-600">
      
      {/* --- Hero --- */}
      <div className="bg-white border-b border-slate-200 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3" />
        <div className="max-w-6xl mx-auto px-4 py-20 relative z-10">
          <div className="md:w-3/4">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-bold uppercase tracking-wide mb-6 border border-teal-100">
              <ShieldCheck size={14} className="mr-2" />
              {data.hero.badge}
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
              {data.hero.title}
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl leading-relaxed mb-8">
              {data.hero.description}
            </p>
            <div className="flex gap-4">
              <button className="px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg shadow-lg hover:bg-teal-700 transition-all">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16 space-y-20">
        
        {/* --- Intro Section --- */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">{data.intro.title}</h2>
            <p className="text-slate-600 leading-relaxed mb-6">{data.intro.content}</p>
            <ul className="space-y-3">
              {data.intro.points.map((pt, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                  <CheckCircle2 size={18} className="text-teal-500" /> {pt}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-center items-center p-8 bg-slate-100 rounded-2xl border border-slate-200">
             {data.intro.mainIcon}
          </div>
        </section>

        {/* --- Services Grid --- */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Key Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.services.map((s, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-slate-100 hover:border-teal-200 hover:shadow-md transition-all group">
                <div className="w-12 h-12 bg-teal-50 rounded-lg flex items-center justify-center text-teal-600 mb-4 group-hover:scale-110 transition-transform">
                  {s.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{s.title}</h3>
                <p className="text-slate-500 text-sm mb-4 min-h-[60px]">{s.desc}</p>
                <button className="text-teal-600 text-sm font-semibold flex items-center hover:underline">
                  {s.action} <ArrowRight size={14} className="ml-1" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* --- CTA / Why Matters --- */}
        <section className="bg-slate-900 rounded-3xl p-8 md:p-16 text-white grid md:grid-cols-2 gap-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500 blur-[80px] opacity-20" />
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-6">{data.cta.title}</h2>
            <p className="text-slate-300 text-lg mb-8">{data.cta.description}</p>
            <button className="bg-teal-500 hover:bg-teal-400 text-white px-8 py-3 rounded-lg font-semibold">Apply Now</button>
          </div>
          <div className="relative z-10 space-y-4">
            {data.cta.benefits.map((b, i) => (
              <div key={i} className="bg-white/10 backdrop-blur p-4 rounded-lg border border-white/10">
                <p className="font-medium">{b}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- Table --- */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-8 border-b border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900">{data.table.title}</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-slate-900 font-semibold uppercase text-xs">
                <tr>
                  {data.table.headers.map((h, i) => <th key={i} className="p-6">{h}</th>)}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.table.rows.map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => <td key={j} className="p-6">{cell}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* --- FAQs (Server Side) --- */}
        <section className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            {data.faqs.map((faq, i) => (
              <details key={i} className="group border-b border-slate-200 last:border-0">
                <summary className="flex justify-between items-center py-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                  <span className="font-medium text-slate-800 group-open:text-teal-600">{faq.question}</span>
                  <ChevronDown size={18} className="text-slate-400 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="pb-4 text-slate-500 text-sm leading-relaxed animate-in slide-in-from-top-1">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default InfoPageTemplate;