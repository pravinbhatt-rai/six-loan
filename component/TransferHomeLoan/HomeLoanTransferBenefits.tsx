'use client';
import React, { useRef } from 'react';

interface FeatureType {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const FeatureCard: React.FC<FeatureType> = ({ title, description, icon }) => {
  return (
    <div className="snap-start shrink-0 w-80 p-6 bg-white border-2 border-transparent rounded-2xl shadow-md hover:border-teal-500 transition-all duration-300">
      <div className="mb-4">
        <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-2xl" aria-hidden="true">
          {icon}
        </div>
      </div>
      {/* h3 ensures semantic hierarchy under the main h2 */}
      <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed text-sm">{description}</p>
    </div>
  );
};

const HomeLoanTransferBenefits: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // SEO-Optimized Data: Focuses on "Why Transfer?" keywords
  const transferFeatures: FeatureType[] = [
    {
      title: "Lower Interest Rates",
      description: "Reduce your monthly burden by switching your outstanding home loan balance to a lender offering significantly lower interest rates.",
      icon: "📉", 
    },
    {
      title: "High-Value Top-Up Loan",
      description: "Unlock additional funds over and above your existing loan amount to meet personal needs, home renovation, or business requirements.",
      icon: "💰", 
    },
    {
      title: "Reduce Your EMI",
      description: "Optimize your monthly cash flow by extending your repayment tenure or negotiating better terms during the balance transfer process.",
      icon: "💸", 
    },
    {
      title: "No Hidden Charges",
      description: "Experience complete transparency with zero hidden costs and minimal processing fees when you transfer your home loan.",
      icon: "🛡️", 
    },
    {
      title: "Customized Repayment",
      description: "Choose a repayment plan that suits your financial capability, including options for step-up or step-down EMI facilities.",
      icon: "⚙️", 
    },
    {
      title: "Tax Benefits Continuation",
      description: "Continue to enjoy tax deductions on principal repayment (Sec 80C) and interest payment (Sec 24b) after the transfer.",
      icon: "📝", 
    },
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320 + 24;
      const currentScroll = scrollContainerRef.current.scrollLeft;
      scrollContainerRef.current.scrollTo({
        left: direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // Structured Data (JSON-LD) for SEO
  // This tells Google explicitly that this is a Financial Product Service
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    "name": "Home Loan Balance Transfer",
    "description": "Transfer your home loan to enjoy lower interest rates, top-up facilities, and reduced EMIs.",
    "provider": {
      "@type": "Organization",
      "name": "Your Company Name" // Replace dynamically if needed
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "INR",
      "name": "Balance Transfer Interest Rate"
    }
  };

  return (
    <section className="w-full max-w-6xl mx-auto p-10 bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 mb-8">
      {/* Injecting Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Main Heading with Primary Keyword */}
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        Home Loan Balance Transfer Benefits
      </h2>
      
      {/* Intro Text with LSI Keywords (Refinance, Switch, Save) */}
      <p className="text-gray-700 max-w-3xl mb-8 text-base">
        Switching your home loan can save you lakhs in interest. Our <strong>Home Loan Balance Transfer</strong> facility allows you to move your outstanding loan to us for better rates, a top-up loan facility, and flexible repayment terms tailored to your financial goals.
      </p>

      <div className="relative group">
        {/* Left Scroll Button */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 md:-ml-6 z-10 bg-teal-500 hover:bg-teal-600 text-white p-3 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2"
          aria-label="Scroll previous features"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        {/* Scrollable Card Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-scroll snap-x scroll-smooth no-scrollbar pb-4 px-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {transferFeatures.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>

        {/* Right Scroll Button */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 md:-mr-6 z-10 bg-teal-500 hover:bg-teal-600 text-white p-3 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2"
          aria-label="Scroll next features"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      
    </section>
  );
};

export default HomeLoanTransferBenefits;