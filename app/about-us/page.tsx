import React from 'react';
import { ShieldCheck, TrendingUp, Users, Target, ArrowRight, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';

// Interface for Team Member data
interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
}

// Mock Data
const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Aditya Singh Rajput",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Rajan Singh",
    role: "Tech Lead",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Pravin Bhattarai",
    role: "Tech Lead",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Sarang Sang",
    role: "Marketing Head",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
];

const AboutUs: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-serif text-gray-800 overflow-x-hidden">
      
      {/* --- Hero Section --- */}
      <section className="relative w-full bg-white overflow-hidden">
        {/* Background Blobs - Adjusted for mobile opacity/size */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute right-0 top-0 w-64 h-64 md:w-96 md:h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute left-0 bottom-0 w-64 h-64 md:w-96 md:h-96 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-16 md:pt-20 md:pb-24 text-center relative z-10">
          <h2 className="text-teal-600 font-semibold tracking-wider uppercase text-xs mb-4 font-sans">
            Our Story
          </h2>
          {/* Responsive Heading Sizes */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Democratizing Finance for <br className="hidden md:block" />
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-teal-700">
              Every Indian Dreamer
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600 mb-8 md:mb-10 leading-relaxed px-2">
            We are building India's most transparent financial marketplace. From personal loans to credit building, we simplify the complex world of finance.
          </p>
          
          {/* Stack buttons on mobile, side-by-side on tablet+ */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 font-sans px-4 sm:px-0">
            <Link href={'/'}><button className="w-full sm:w-auto px-8 py-3 bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-full transition-all shadow-lg hover:shadow-teal-500/30 flex items-center justify-center gap-2">
               Explore Products <ArrowRight size={18} />
             </button></Link>
            <Link href={'/contact-us'}><button className="w-full sm:w-auto px-8 py-3 bg-white border border-gray-200 hover:border-teal-500 text-gray-700 hover:text-teal-500 font-medium rounded-full transition-all">
               Contact Support
             </button></Link>
          </div>
        </div>
      </section>

      {/* --- Stats / Trust Section --- */}
      <section className="py-8 md:py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4 md:gap-8 text-center divide-x divide-gray-100">
                {[
                    { label: "Happy Customers", value: "2M+" },
                    { label: "Loan Disbursed", value: "₹500Cr+" },
                    { label: "Banking Partners", value: "50+" },
                    { label: "Cities Covered", value: "100+" },
                ].map((stat, idx) => (
                    <div key={idx} className="p-2 md:p-4">
                        <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1 md:mb-2 italic">{stat.value}</div>
                        <div className="text-[10px] md:text-xs font-sans text-gray-400 uppercase tracking-widest">{stat.label}</div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* --- Mission & Vision Grid --- */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            
            {/* Text Content */}
            <div className="space-y-8 md:space-y-10 order-2 md:order-1">
                <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                        <Target className="text-teal-500 shrink-0" size={28} />
                        Our Mission
                    </h3>
                    <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                        To make financial products accessible, affordable, and transparent for everyone. We believe that getting a loan or checking your credit score shouldn't be a hassle.
                    </p>
                </div>
                <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                        <TrendingUp className="text-teal-500 shrink-0" size={28} />
                        Our Vision
                    </h3>
                    <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                        We envision a future where financial literacy is universal and every individual has the power to choose the right financial product without hidden terms.
                    </p>
                </div>
            </div>

            {/* Feature Card */}
            <div className="relative font-sans order-1 md:order-2"> 
                <div className="absolute inset-0 bg-teal-500 transform rotate-2 rounded-2xl opacity-10"></div>
                <div className="relative bg-white p-6 md:p-10 rounded-2xl shadow-xl border border-gray-100">
                    <div className="grid grid-cols-1 gap-6 md:gap-8">
                        <FeatureRow icon={<ShieldCheck className="text-teal-500" />} title="100% Secure" desc="Bank-grade security protocols to keep your data safe." />
                        <FeatureRow icon={<Users className="text-teal-500" />} title="Customer First" desc="Dedicated support to guide you through every EMI calculation." />
                        <FeatureRow icon={<TrendingUp className="text-teal-500" />} title="Data Driven" desc="Smart algorithms to find the best interest rates for you." />
                    </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Team Section --- */}
      <section className="py-16 md:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 md:mb-16">
                <h2 className="text-teal-600 font-sans font-semibold tracking-wider uppercase text-xs mb-3">The Minds Behind</h2>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 italic">Meet Our Leadership</h3>
                <div className="w-24 h-1 bg-teal-500 mx-auto mt-6"></div>
            </div>

            {/* Grid responds: 1 col (mobile) -> 2 col (tablet) -> 4 col (desktop) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-8">
                {teamMembers.map((member) => (
                    <div key={member.id} className="group relative">
                        {/* Image Container */}
                        <div className="relative h-80 md:h-96 w-full overflow-hidden rounded-xl shadow-lg bg-gray-100">
                            <img 
                                src={member.image} 
                                alt={member.name} 
                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            {/* Overlay Gradient (Hover) */}
                            <div className="absolute inset-0 bg-gradient-to-t from-teal-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            
                            {/* Social Icons */}
                            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                                <button className="bg-white/20 hover:bg-white text-white hover:text-teal-600 p-2 rounded-full backdrop-blur-sm transition-colors">
                                    <Linkedin size={20} />
                                </button>
                                <button className="bg-white/20 hover:bg-white text-white hover:text-teal-600 p-2 rounded-full backdrop-blur-sm transition-colors">
                                    <Twitter size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Text Content */}
                        <div className="text-center mt-6">
                            <h4 className="text-xl font-bold text-gray-900">{member.name}</h4>
                            <p className="text-teal-600 font-sans text-sm font-medium uppercase tracking-wide mt-1">{member.role}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* --- CTA Section --- */}
      <section className="py-16 md:py-24 bg-teal-900 text-white">
          <div className="max-w-4xl mx-auto text-center px-4">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 italic leading-tight">Ready to start your financial journey?</h2>
              <p className="text-teal-100 mb-8 md:mb-10 text-lg md:text-xl font-light font-sans">
                  Join thousands of users who have simplified their finances with us today.
              </p>
              <button className="w-full sm:w-auto font-sans bg-teal-500 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-teal-400 transition-colors shadow-lg shadow-teal-900/50">
                  Get Started Now
              </button>
          </div>
      </section>
    </div>
  );
};

// Helper component for the feature list
const FeatureRow = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
    <div className="flex items-start gap-4 md:gap-5">
        <div className="p-3 bg-teal-50 rounded-lg shrink-0">
            {icon}
        </div>
        <div>
            <h4 className="font-bold text-base md:text-lg text-gray-900">{title}</h4>
            <p className="text-sm text-gray-500 mt-1 leading-relaxed font-sans">{desc}</p>
        </div>
    </div>
);

export default AboutUs;