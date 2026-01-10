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
}

// SEO Optimized Testimonials for Loan Against Securities
const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Aditya Verma",
    location: "Mumbai",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    text: "I needed urgent funds for my business but didn't want to sell my long-term shareholdings. Six Loan helped me get a Loan Against Securities within 24 hours. The digital pledging process via NSDL was seamless, and I retained my portfolio ownership!"
  },
  {
    id: 2,
    name: "Sneha Kapoor",
    location: "Bangalore",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    text: "Pledging my mutual funds was a game-changer. Instead of breaking my SIPs during a market dip, I took an overdraft facility. I only pay interest on the amount I use, which is much cheaper than a personal loan. Highly recommended for smart investors."
  },
  {
    id: 3,
    name: "Rajesh Iyer",
    location: "Chennai",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    text: "The Loan Against Securities facility allowed me to fund my daughter's education without liquidating my retirement corpus. The LTV ratio offered on my debt funds was excellent (85%), and there were zero foreclosure charges."
  },
  {
    id: 4,
    name: "Meera Das",
    location: "Kolkata",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    text: "I used the LAS facility to subscribe to an IPO. The process was completely paperless. Six Loan's platform helped me compare offers from top banks and choose the one with the lowest processing fees. A must-use platform for HNI investors."
  },
  {
    id: 5,
    name: "Vikram Malhotra",
    location: "Delhi",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    text: "Amazing service! I pledged my Sovereign Gold Bonds (SGBs) to get a quick loan. The interest rate was significantly lower than unsecured loans. It's the best way to monetize idle assets without selling them."
  },
  {
    id: 6,
    name: "Ananya Roy",
    location: "Pune",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    text: "I was worried about margin calls, but the team explained the LTV buffers clearly. The overdraft facility gives me peace of mind knowing I have emergency funds available against my shares whenever I need them."
  }
];

export function SecuritiesCustomerReview() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 2;

  const handleNext = () => {
    setCurrentIndex((prev) => {
      const nextIndex = prev + 1;
      // Show fewer items on mobile if needed, but logic remains for grid
      return nextIndex > testimonials.length - itemsPerPage ? 0 : nextIndex;
    });
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => {
      const nextIndex = prev - 1;
      return nextIndex < 0 ? testimonials.length - itemsPerPage : nextIndex;
    });
  };

  // Adjust logic for mobile view if you want single item slide (currently keeps 2 for grid)
  // For true responsiveness, CSS grid handles the layout (1 col mobile, 2 col desktop)
  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + itemsPerPage);
  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  // JSON-LD Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Six Loan Against Securities",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "850"
    },
    "review": testimonials.map(t => ({
      "@type": "Review",
      "author": { "@type": "Person", "name": t.name },
      "reviewBody": t.text,
      "reviewRating": { "@type": "Rating", "ratingValue": "5" }
    }))
  };

  return (
    <section className="bg-white flex flex-col items-center justify-center p-5 md:p-12 font-sans text-gray-900">
      {/* Schema.org Script for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Header Section */}
      <header className="text-center mb-10 md:mb-12 max-w-3xl px-4">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 font-serif leading-tight text-[#0a1930]">
          Smart Investors Trust Us <br className="hidden md:block" /> with Their Portfolios
        </h2>
        <p className="text-gray-500 text-base md:text-lg mt-4 font-light">
          Discover how our customers are unlocking value from their <br className="hidden md:block"/> <strong>Shares, Mutual Funds, and Bonds</strong> without selling them.
        </p>
      </header>

      {/* Cards Container */}
      <div className="w-full max-w-6xl px-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visibleTestimonials.map((testimonial) => (
            <article 
              key={testimonial.id}
              className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300 flex flex-col h-full"
            >
              <div className="flex items-center mb-6">
                <img 
                  src={testimonial.image} 
                  alt={`${testimonial.name} - LAS Customer Review`} 
                  className="w-12 h-12 md:w-14 md:h-14 rounded-lg object-cover mr-4 shadow-sm"
                  loading="lazy"
                />
                <div>
                  <h3 className="text-lg font-bold text-[#1e2746]">
                    {testimonial.name}
                  </h3>
                  <p className="text-gray-500 text-xs md:text-sm">
                    {testimonial.location}
                  </p>
                </div>
              </div>

              <div className="grow">
                <blockquote className="text-gray-600 leading-relaxed text-sm md:text-[15px] italic text-justify md:text-left">
                  &quot;{testimonial.text}&quot;
                </blockquote>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="mt-10 md:mt-12 flex items-center justify-center space-x-6 md:space-x-8">
        <button 
          onClick={handlePrev}
          className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-2xl border border-gray-400 text-gray-600 hover:bg-gray-50 hover:border-gray-600 transition-all duration-200 group"
          aria-label="Previous review"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
        </button>

        <div className="text-xl md:text-2xl font-medium tracking-wide" aria-live="polite">
          <span className="text-[#0a1930] font-bold">
            {formatNumber(currentIndex + 1)}
          </span>
          <span className="text-gray-400">
            /{testimonials.length}
          </span>
        </div>

        <button 
          onClick={handleNext}
          className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-2xl border border-gray-400 text-gray-600 hover:bg-gray-50 hover:border-gray-600 transition-all duration-200 group"
          aria-label="Next review"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
        </button>
      </div>
    </section>
  );
}

export default SecuritiesCustomerReview;