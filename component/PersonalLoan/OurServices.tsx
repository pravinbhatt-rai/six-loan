import React from 'react';
import { CreditCard, ChevronRight } from 'lucide-react';

// Data for the cards based on the screenshot content
const services = [
  {
    title: "Personal Loan",
    description: "A flexible loan for any personal expenses, whether it's home improvement, medical bills, or a major purchase.",
    icon: CreditCard,
  },
  {
    title: "Business Loan",
    description: "Fuel your business growth with funding for expansion, equipment, or working capital needs.",
    icon: CreditCard,
  },
  {
    title: "Student Loan",
    description: "Cover tuition, books, and other educational expenses with a loan designed to support your academic journey.",
    icon: CreditCard,
  },
  {
    title: "Wedding Loan",
    description: "Plan the perfect wedding without financial stress, with a loan tailored for covering all wedding-related costs.",
    icon: CreditCard,
  },
  {
    title: "Home Improvement Loan",
    description: "Upgrade your home with financing for renovations, repairs, or new installations at competitive rates.",
    icon: CreditCard,
  },
  {
    title: "Emergency Loan",
    description: "Unexpected expenses? Get access to funds fast to cover urgent financial needs.",
    icon: CreditCard,
  },
];

const ServiceCard = ({ title, description, icon: Icon }: { title: string; description: string; icon: React.ComponentType<{ className: string; strokeWidth: number }> }) => (
  <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-slate-100 flex flex-col items-start h-full">
    {/* Icon Container */}
    <div className="mb-6 p-3 rounded-xl border border-blue-100/50 bg-slate-50 inline-flex items-center justify-center">
      <Icon className="w-6 h-6 text-blue-900" strokeWidth={1.5} />
    </div>

    {/* Content */}
    <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">
      {title}
    </h3>
    <p className="text-slate-500 leading-relaxed mb-8 grow">
      {description}
    </p>

    {/* Action Link */}
    <a 
      href="#" 
      className="inline-flex items-center text-blue-900 font-semibold hover:text-blue-700 transition-colors group"
    >
      Learn more 
      <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
    </a>
  </div>
);

const ServicesSection = () => {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 font-sans">
      {/* Import Serif Font for Headline */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&display=swap');
          .font-serif-display {
            font-family: 'Playfair Display', serif;
          }
        `}
      </style>

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-16">
          {/* Badge */}
          <div className="inline-block px-6 py-2 bg-[#E6F4EA] rounded-full mb-6">
            <span className="text-[#00BFA5] font-medium text-lg tracking-wide">
              Our Services
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 lg:gap-16">
            {/* Main Headline */}
            <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.1] font-serif-display font-bold text-slate-900 max-w-2xl">
              Our Credit Products Flexible Solutions for Your Financial Growth
            </h2>

            {/* Description Text */}
            <p className="text-slate-500 text-lg leading-relaxed max-w-xl lg:mb-2">
              Explore our tailored credit solutions designed to help you achieve your financial goals. 
              Whether you&apos;re looking for personal loans, business credit, or flexible financing options, 
              we offer competitive rates, transparent terms, and expert support every step of the way.
            </p>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;