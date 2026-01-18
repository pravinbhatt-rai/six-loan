import React from 'react';
import { 
  ShieldCheck, 
  Info, 
  CheckCircle2, 
  Lock, 
  ArrowRight,
  LucideIcon 
} from 'lucide-react';

// --- Interfaces for Type Safety ---
interface Section {
  title: string;
  content: string;
}

interface PageProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  whatIs: {
    title: string;
    description: string;
    points: string[];
  };
  whyUseIt: Section[]; // "How Six Finance uses it"
  education: Section[]; // "Safety & Knowledge"
}

export const FinancePageLayout: React.FC<PageProps> = ({ 
  title, 
  subtitle, 
  icon: Icon, 
  whatIs, 
  whyUseIt, 
  education 
}) => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-700">
      
      {/* --- Hero Section --- */}
      <header className="bg-white border-b border-slate-200 pt-16 pb-12 px-4 md:px-8 relative overflow-hidden">
        <div className="max-w-5xl mx-auto md:flex items-center gap-8 relative z-10">
          <div className="md:w-2/3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-sm font-medium border border-teal-100 mb-6">
              <Icon size={16} />
              <span>Financial Education Series</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Understanding <span className="text-teal-600">{title}</span>
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed max-w-2xl">
              {subtitle}
            </p>
          </div>
          
          {/* Decorative Icon Background */}
          <div className="hidden md:flex md:w-1/3 justify-center text-teal-100">
             <Icon size={180} strokeWidth={0.5} className="drop-shadow-xl text-teal-500/10" />
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-12 space-y-16">

        {/* --- Section 1: The "What is it" (Educational Deep Dive) --- */}
        <section className="bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-slate-100">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3 bg-teal-500 rounded-xl p-8 text-white flex flex-col justify-center shadow-lg shadow-teal-500/20">
              <h3 className="text-xl font-bold opacity-90 mb-2">The Basics</h3>
              <h2 className="text-3xl font-bold mb-4">{whatIs.title}</h2>
              <div className="w-12 h-1 bg-teal-300 mb-4 rounded-full"></div>
              <p className="text-teal-50 text-sm opacity-90 leading-relaxed">
                Essential knowledge for your financial journey with Six Finance.
              </p>
            </div>
            <div className="md:w-2/3 space-y-6">
              <p className="text-lg leading-relaxed text-slate-600">
                {whatIs.description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {whatIs.points.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-700 font-medium list-none bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <CheckCircle2 className="text-teal-500 shrink-0 mt-0.5" size={18} />
                    <span>{point}</span>
                  </li>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --- Section 2: Six Finance Utility (Why we need it) --- */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 bg-teal-100 rounded-lg text-teal-700">
              <Info size={24} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Why Six Finance Needs This</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whyUseIt.map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 hover:border-teal-400 hover:shadow-md transition-all group">
                <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 group-hover:bg-teal-50 group-hover:text-teal-600 transition-colors mb-4">
                  <ArrowRight size={18} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-teal-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {item.content}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* --- Section 3: Educational Context (Safety/Details) --- */}
        <section className="bg-slate-900 rounded-3xl overflow-hidden relative">
          {/* Abstract background blobs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-600 rounded-full blur-3xl opacity-20 -mr-16 -mt-16 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-teal-400 rounded-full blur-3xl opacity-10 -ml-10 -mb-10 pointer-events-none"></div>
          
          <div className="p-8 md:p-12 relative z-10">
            <div className="flex items-center gap-2 text-teal-400 mb-8 border-b border-slate-800 pb-4">
              <Lock size={20} />
              <span className="uppercase tracking-widest text-xs font-bold">Safety & Awareness</span>
            </div>
            
            <div className="grid md:grid-cols-2 gap-10">
              {education.map((item, idx) => (
                <div key={idx}>
                  <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed text-sm">
                    {item.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* --- Footer Note --- */}
        <div className="text-center pt-8 pb-4 opacity-60">
            <p className="text-xs flex items-center justify-center gap-1">
               <ShieldCheck size={12} />
               Secure Education Initiative by Six Finance
            </p>
        </div>

      </main>
    </div>
  );
};