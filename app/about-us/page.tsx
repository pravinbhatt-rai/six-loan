import React from "react";
import {
  Users,
  TrendingUp,
  ShieldCheck,
  Zap,
  MapPin,
  Building2,
  Target,
  Briefcase,
  Globe,
  Award,
  ChevronRight,
  Linkedin,
  Twitter,
  ExternalLink,
} from "lucide-react";

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 leading-relaxed">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-400 via-teal-500 to-teal-600 text-white py-28 px-6 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-white rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[300px] h-[300px] bg-teal-200 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center lg:text-left">
          <h1 className="text-4xl md:text-6xl font-black mb-6 uppercase tracking-tight leading-tight">
            Six Finance: Your Trusted <br className="hidden lg:block" />
            Financial Partner
          </h1>
          <p className="max-w-2xl text-lg md:text-xl text-teal-50 font-medium mb-10 mx-auto lg:mx-0 opacity-90">
            Experience-driven financial services built on transparency,
            innovation, and over 20 years of banking expertise.
          </p>
          <div className="flex flex-wrap justify-center lg:justify-start gap-4">
            <button className="bg-white text-teal-600 hover:bg-teal-50 font-bold py-4 px-10 rounded-full transition-all transform hover:scale-105 shadow-xl">
              Start Your Journey
            </button>
            <button className="bg-teal-700/30 border-2 border-white/40 hover:border-white text-white font-bold py-4 px-10 rounded-full transition-all">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Impact Across India (Statistics) */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Our Impact Across India
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto font-medium">
              Our numbers tell the story of trust, reach, and commitment to
              financial empowerment.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-8">
            {[
              {
                label: "Happy Customers",
                val: "250+",
                desc: "Individuals empowered",
              },
              {
                label: "Capital Deployed",
                val: "50Cr+",
                desc: "Fueling dreams",
              },
              {
                label: "Banking Partners",
                val: "50+",
                desc: "Leading banks & NBFCs",
              },
              {
                label: "Cities Covered",
                val: "250+",
                desc: "Pan-India presence",
              },
              {
                label: "DSA Partners",
                val: "1K+",
                desc: "Nationwide agent network",
              },
            ].map((stat, i) => (
              <div
                key={i}
                className="text-center group p-4 hover:bg-white hover:shadow-md rounded-2xl transition-all"
              >
                <p className="text-4xl font-black text-teal-500 mb-2">
                  {stat.val}
                </p>
                <p className="text-sm font-bold text-slate-800 mb-1">
                  {stat.label}
                </p>
                <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                  {stat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div className="order-2 lg:order-1">
          <div className="inline-block px-4 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            Democratizing Finance
          </div>
          <h2 className="text-4xl font-black text-slate-800 mb-6 leading-tight uppercase tracking-tight">
            Building India's Most Transparent Marketplace
          </h2>
          <div className="space-y-6 text-slate-600 font-medium">
            <p>
              Six Finance is transforming India's financial landscape for every
              dreamer. We understand that navigating finance can be
              overwhelming, so we've made it our mission to simplify every step.
            </p>
            <p>
              Founded by experienced banking professionals with deep roots in
              the sector, we combine two decades of industry expertise with a
              customer-centric approach.
            </p>
          </div>
        </div>
        <div className="order-1 lg:order-2 bg-slate-100 rounded-[3rem] h-[450px] shadow-inner flex items-center justify-center text-slate-300">
          <Users size={80} className="opacity-20" />
        </div>
      </section>

      {/* Leadership Section - UPDATED DESIGN */}
      <section className="py-28 px-6 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-50 rounded-full blur-3xl opacity-50 -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-100 rounded-full blur-3xl opacity-50 -z-10" />

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-teal-600 font-bold tracking-[0.3em] uppercase text-xs">
              The Visionaries
            </span>
            <h2 className="text-4xl md:text-5xl font-black mt-3 text-slate-900 uppercase tracking-tighter">
              The Minds Behind{" "}
              <span className="text-teal-500">Six Finance</span>
            </h2>
            <div className="w-20 h-1.5 bg-teal-500 mx-auto mt-6 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                name: "Aditya Singh Rajput",
                role: "Founder & CEO",
                detail: "20+ years of banking expertise",
                img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400",
                linkedin: "#",
                twitter: "#",
              },
              {
                name: "Narender Rapeta",
                role: "Co-Founder & Channel Head",
                detail: "Building India's largest DSA network",
                img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
                linkedin: "#",
                twitter: "#",
              },
              {
                name: "Brij Bhushan Upadhyay",
                role: "CFO",
                detail: "Managing fiscal operations & growth",
                img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400",
                linkedin: "#",
                twitter: "#",
              },
              {
                name: "Rajan Singh",
                role: "Tech Lead",
                detail: "Architecting scalable systems",
                img: "/rajan2.jpeg",
                linkedin: "#",
                twitter: "#",
              },
              {
                name: "Pravin Bhattarai",
                role: "Tech Lead",
                detail: "Ensuring seamless user experiences",
                img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
                linkedin: "#",
                twitter: "#",
              },
              {
                name: "Ashish Jha",
                role: "IT Head",
                detail: "Building secure, reliable technology",
                img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400",
                linkedin: "#",
                twitter: "#",
              },
            ].map((leader, i) => (
              <div key={i} className="group relative">
                <div className="relative h-[480px] w-full overflow-hidden rounded-[2.5rem] shadow-2xl bg-slate-200">
                  {/* Image zoom is also slowed down to match */}
                  <img
                    src={leader.img}
                    alt={leader.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 ease-in-out"
                  />

                  {/* Glassmorphism Info Overlay */}
                  <div className="absolute inset-x-4 bottom-4 bg-slate-900/90 backdrop-blur-xl p-7 rounded-4xl border border-white/10 transform translate-y-[calc(100%+20px)] group-hover:translate-y-0 transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]">
                    <div className="relative z-10">
                      <p className="text-teal-400 text-[10px] font-black uppercase tracking-[0.4em] mb-1">
                        {leader.role}
                      </p>
                      <h4 className="text-white text-xl font-bold mb-3 tracking-tight">
                        {leader.name}
                      </h4>

                      <p className="text-slate-400 text-xs font-medium leading-relaxed mb-6">
                        {leader.detail}
                      </p>

                      <div className="flex gap-3 pt-5 border-t border-white/10">
                        <a
                          href={leader.linkedin}
                          className="flex-1 bg-white/5 hover:bg-teal-500 text-white py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors duration-300"
                        >
                          <Linkedin size={12} /> LinkedIn
                        </a>
                        <a
                          href={leader.twitter}
                          className="w-12 bg-white/5 hover:bg-white hover:text-slate-900 text-white rounded-xl flex items-center justify-center transition-colors duration-300"
                        >
                          <Twitter size={12} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -z-10 inset-0 bg-teal-500/5 blur-3xl rounded-full scale-0 group-hover:scale-100 transition-transform duration-1000" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Offerings */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-black mb-16 uppercase text-center tracking-tighter">
          Comprehensive Services
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            {
              title: "Personal Loans",
              desc: "Flexible products tailored to your professional and personal goals.",
            },
            {
              title: "Product Comparison",
              desc: "Evaluate multiple financial products side-by-side easily.",
            },
            {
              title: "Credit Building",
              desc: "Guidance to improve and maintain a healthy credit score.",
            },
            {
              title: "Quick Approvals",
              desc: "Streamlined tech for rapid disbursal when you need funds urgently.",
            },
            {
              title: "EMI Calculators",
              desc: "Easy tools to plan finances effectively before committing.",
            },
            {
              title: "Expert Support",
              desc: "Experienced professionals available at every step of your journey.",
            },
          ].map((service, idx) => (
            <div key={idx} className="flex gap-6 items-start">
              <div className="bg-teal-500 text-white p-3 rounded-2xl flex-shrink-0">
                <Briefcase size={20} />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 mb-2 uppercase text-sm tracking-wide">
                  {service.title}
                </h4>
                <p className="text-slate-500 text-xs leading-relaxed font-medium">
                  {service.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 px-6 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 text-center md:text-left">
          {[
            {
              icon: <Globe />,
              title: "Accessible",
              desc: "Breaking down barriers so every Indian can access financial products regardless of location.",
            },
            {
              icon: <TrendingUp />,
              title: "Affordable",
              desc: "Using smart partner networks to identify the best interest rates and cost-effective terms.",
            },
            {
              icon: <ShieldCheck />,
              title: "Transparent",
              desc: "No hidden terms, no confusing jargon. Complete clarity at every stage.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white/5 p-10 rounded-[2.5rem] border border-white/10 hover:border-white/20 transition-all"
            >
              <div className="text-teal-400 mb-6 flex justify-center md:justify-start">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 uppercase">
                {item.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Final Call to Action Section */}
      <section className="py-24 px-6 bg-gradient-to-r from-teal-500 to-teal-600 text-white text-center shadow-2xl">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-black mb-8 uppercase tracking-tight leading-tight">
            Ready to Experience the <br /> Six Finance Difference?
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-slate-900 text-white font-bold py-5 px-14 rounded-full transition-all hover:bg-slate-800 uppercase tracking-widest text-sm shadow-xl">
              Apply Now
            </button>
            <button className="bg-white text-teal-600 font-bold py-5 px-14 rounded-full transition-all hover:bg-teal-50 uppercase tracking-widest text-sm shadow-xl">
              Contact Team
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
