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

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Vikram Malhotra",
    location: "Gurgaon",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    text: "Buying a luxury used car seemed difficult until I found Six Loan. They offered 100% funding on the car's valuation, which no other bank was providing. The RC transfer assistance was a huge bonus."
  },
  {
    id: 2,
    name: "Sneha Kapoor",
    location: "Bangalore",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    text: "I wanted to buy a car from a private seller (my neighbor), but banks made the process complicated. Six Loan handled the seller verification and valuation seamlessly. Got the loan disbursed in 48 hours."
  },
  {
    id: 3,
    name: "Arjun Das",
    location: "Kolkata",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    text: "Great experience with my pre-owned car loan transfer. I switched my existing high-interest loan to a new lender through their platform and saved significantly on monthly EMIs."
  },
  {
    id: 4,
    name: "Rahul Mehta",
    location: "Mumbai",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    text: "The interest rates for used car loans here are very competitive. I compared offers from 5 different banks instantly. The transparency regarding processing fees and foreclosure charges was appreciated."
  },
  {
    id: 5,
    name: "Priya Reddy",
    location: "Hyderabad",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    text: "As a first-time car buyer, I was worried about the paperwork. The team guided me through the insurance transfer and vehicle fitness checks. Highly recommended for anyone buying a second-hand car."
  },
  {
    id: 6,
    name: "Amit Patel",
    location: "Ahmedabad",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    text: "My loan application was approved purely based on my income documents without any physical visit to the bank. The digital verification process for the vehicle valuation was fast and efficient."
  }
];

export function UsedCarCustomerReview() {
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
    "name": "Six Loan Used Car Financing",
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
          Driving Dreams for Thousands of <br className="hidden md:block"/> Happy Car Owners
        </h2>
        <p className="text-gray-500 text-base md:text-lg mt-4 font-light px-2">
          Discover why we are the top choice for <strong>pre-owned car loans</strong>, offering high LTV and seamless RC transfers.
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
                  alt={`${testimonial.name} - Used Car Loan Review`} 
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
                <blockquote className="text-gray-600 leading-relaxed text-sm md:text-[15px] italic">
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

export default UsedCarCustomerReview;