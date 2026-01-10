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

// --- SEO Optimized Content for Used Bike Loans ---
const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Vikram Malhotra",
    location: "Bangalore",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    text: "Buying a used superbike was my dream, but financing was tough. Six Loan offered 85% funding on the bike's valuation. The process was completely digital, and I got my loan approved in just 4 hours."
  },
  {
    id: 2,
    name: "Sneha Kapoor",
    location: "Pune",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    text: "I needed a scooter for my daily commute and found a great deal from a private seller. Unlike other banks, Six Loan helped with the RC transfer paperwork and disbursed the amount directly to the seller."
  },
  {
    id: 3,
    name: "Arjun Das",
    location: "Delhi",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    text: "The interest rates for pre-owned two-wheeler loans here are unbeatable. I compared offers from 4 different lenders instantly. The transparency regarding the processing fees and valuation charges was appreciated."
  },
  {
    id: 4,
    name: "Rahul Mehta",
    location: "Mumbai",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    text: "As a student, I thought getting a loan for a second-hand bike would be impossible. Their team guided me through the eligibility criteria, and with a co-applicant, I secured a loan for my college commute vehicle."
  },
  {
    id: 5,
    name: "Priya Reddy",
    location: "Hyderabad",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    text: "I wanted to upgrade my 150cc bike to a 350cc cruiser. The valuation process was fair, and the loan amount covered almost the entire cost of the bike. The monthly EMIs are very affordable."
  },
  {
    id: 6,
    name: "Amit Patel",
    location: "Ahmedabad",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    text: "Fastest disbursal experience! I found a bike at a local dealership and didn't want to lose the deal. Six Loan's instant approval system helped me drive the bike home the very next day."
  }
];

export function UsedBikeCustomerReview() {
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

  // JSON-LD Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Six Loan Used Bike Finance",
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
    <section className="bg-white flex flex-col items-center justify-center p-4 md:p-12 font-sans text-gray-900 border-t border-gray-100">
      {/* Schema.org Script for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Header Section */}
      <header className="text-center mb-8 md:mb-12 max-w-3xl">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 font-serif leading-tight text-[#0a1930]">
          Trusted by Riders Across India
        </h2>
        <p className="text-gray-500 text-base md:text-lg mt-4 font-light px-2">
          See why thousands choose us for <strong>pre-owned bike loans</strong>, high LTV funding, and seamless RC transfers.
        </p>
      </header>

      {/* Cards Container */}
      <div className="w-full max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {visibleTestimonials.map((testimonial) => (
            <article 
              key={testimonial.id}
              className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300 flex flex-col h-full"
            >
              <div className="flex items-center mb-4 md:mb-6">
                <img 
                  src={testimonial.image} 
                  alt={`${testimonial.name} - Used Bike Loan Review`} 
                  className="w-12 h-12 md:w-14 md:h-14 rounded-lg object-cover mr-4 shadow-sm"
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
                <blockquote className="text-gray-600 leading-relaxed text-sm md:text-[15px] italic text-justify md:text-left">
                  &quot;{testimonial.text}&quot;
                </blockquote>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="mt-8 md:mt-12 flex items-center justify-center space-x-6 md:space-x-8">
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

export default UsedBikeCustomerReview;