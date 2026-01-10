'use client';
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Interface for our Testimonial Data
interface Testimonial {
  id: number;
  name: string;
  location: string;
  image: string;
  text: string;
  highlight: string; // New field to emphasize the specific benefit (e.g., "Saved ₹5 Lakhs")
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Vikram Singh",
    location: "Jaipur",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    text: "I was stuck with a high interest rate of 9.25% with my old bank. The team at Six Loan helped me transfer my home loan to a new lender at 8.40%. The process was seamless, and they even handled the foreclosure paperwork.",
    highlight: "Reduced Rate to 8.40%"
  },
  {
    id: 2,
    name: "Kavita Joshi",
    location: "Pune",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    text: "I needed funds for home renovation but didn't want a personal loan. Six Loan suggested a Balance Transfer with a Top-Up. I got the extra money at the same low home loan rate. Highly recommended for smart refinancing!",
    highlight: "Availed ₹10L Top-Up"
  },
  {
    id: 3,
    name: "Arjun Nair",
    location: "Kochi",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    text: "Switching my loan seemed daunting due to the paperwork. However, their digital process for home loan balance transfer was incredible. They calculated my exact savings and completed the switch in just 10 days.",
    highlight: "Fast Digital Process"
  },
  {
    id: 4,
    name: "Rahul Mehta",
    location: "Mumbai",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    text: "My EMI burden was becoming difficult to manage. By transferring my loan and extending the tenure slightly, I reduced my monthly outflow by ₹12,000. It gave me the financial breathing room I desperately needed.",
    highlight: "Reduced EMI by ₹12k"
  },
  {
    id: 5,
    name: "Sneha Reddy",
    location: "Hyderabad",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    text: "I wasn't aware that my credit score had improved enough to qualify for a better rate. Six Loan's expert analyzed my profile and moved my loan to a PSU bank, saving me lakhs in interest over the long term.",
    highlight: "Switched to PSU Bank"
  }
];

export function TransferCustomerReview() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 2;

  const handleNext = () => {
    setCurrentIndex((prev) => {
      const nextIndex = prev + 1;
      return nextIndex > testimonials.length - itemsPerPage ? 0 : nextIndex;
    });
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => {
      const nextIndex = prev - 1;
      return nextIndex < 0 ? testimonials.length - itemsPerPage : nextIndex;
    });
  };

  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + itemsPerPage);
  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  // JSON-LD Structured Data for SEO - Specific to "FinancialProduct"
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Home Loan Balance Transfer Service",
    "description": "Refinance your existing home loan to lower interest rates and reduce EMIs.",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "1050"
    },
    "review": testimonials.map(t => ({
      "@type": "Review",
      "author": { "@type": "Person", "name": t.name },
      "reviewBody": t.text,
      "reviewRating": { "@type": "Rating", "ratingValue": "5" }
    }))
  };

  return (
    <section className="bg-white flex flex-col items-center justify-center font-sans text-gray-900">
      {/* Schema.org Script for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Header Section with Keywords */}
      <header className="text-center mb-12 max-w-3xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 font-serif leading-tight text-[#0a1930]">
          Real Savings Stories from <br /> Smart Home Owners
        </h2>
        <p className="text-gray-500 text-lg mt-4 font-light">
          See how our customers <strong>slashed their interest rates</strong> and unlocked capital by transferring their home loans.
        </p>
      </header>

      {/* Cards Container */}
      <div className="w-full max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visibleTestimonials.map((testimonial) => (
            <article 
              key={testimonial.id}
              className="bg-white border border-gray-100 rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300 flex flex-col h-full relative overflow-hidden group"
            >
              {/* Highlight Badge */}
              <div className="absolute top-0 right-0 bg-teal-50 text-teal-700 text-xs font-bold px-3 py-1 rounded-bl-xl z-10">
                {testimonial.highlight}
              </div>

              <div className="flex items-center mb-6">
                <img 
                  src={testimonial.image} 
                  alt={`Home Loan Transfer Review by ${testimonial.name}`} 
                  className="w-14 h-14 rounded-lg object-cover mr-4 shadow-sm"
                  loading="lazy"
                />
                <div>
                  <h3 className="text-lg font-bold text-[#1e2746]">
                    {testimonial.name}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {testimonial.location}
                  </p>
                </div>
              </div>

              <div className="grow">
                <blockquote className="text-gray-600 leading-relaxed text-[15px] italic">
                  &quot;{testimonial.text}&quot;
                </blockquote>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="mt-12 flex items-center justify-center space-x-8">
        <button 
          onClick={handlePrev}
          className="w-14 h-14 flex items-center justify-center rounded-2xl border border-gray-400 text-gray-600 hover:bg-teal-50 hover:border-teal-500 hover:text-teal-600 transition-all duration-200 group"
          aria-label="Previous review"
        >
          <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </button>

        <div className="text-2xl font-medium tracking-wide" aria-live="polite">
          <span className="text-[#0a1930] font-bold">
            {formatNumber(currentIndex + 1)}
          </span>
          <span className="text-gray-400">
            /{testimonials.length}
          </span>
        </div>

        <button 
          onClick={handleNext}
          className="w-14 h-14 flex items-center justify-center rounded-2xl border border-gray-400 text-gray-600 hover:bg-teal-50 hover:border-teal-500 hover:text-teal-600 transition-all duration-200 group"
          aria-label="Next review"
        >
          <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </button>
      </div>
    </section>
  );
}

export default TransferCustomerReview;