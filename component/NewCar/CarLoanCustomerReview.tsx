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
    name: "Rohan Verma",
    location: "Delhi NCR",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    text: "I got 100% on-road funding for my new SUV! The car loan interest rates offered were far better than what the dealership quoted. The process was completely digital, and I drove my car home within 48 hours."
  },
  {
    id: 2,
    name: "Priya Malhotra",
    location: "Mumbai",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    text: "Six Loan made my dream car a reality. Their car loan eligibility calculator was spot on. I didn't have to worry about hidden charges or heavy down payments. The transparency in the EMI structure is commendable."
  },
  {
    id: 3,
    name: "Aman Singh",
    location: "Chandigarh",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    text: "Fastest car financing experience ever. I needed a loan for a luxury sedan, and their team handled the documentation seamlessly. The instant sanction letter helped me negotiate a better deal with the car dealer."
  },
  {
    id: 4,
    name: "Sneha Kapoor",
    location: "Bangalore",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    text: "I was looking for a pre-owned car loan initially but realized their new car loan rates were unbeatable. The flexible repayment tenure allowed me to buy a higher-end model without straining my monthly budget."
  },
  {
    id: 5,
    name: "Vikram Das",
    location: "Kolkata",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    text: "Excellent service for self-employed professionals. Getting a car loan usually involves a lot of paperwork for business owners, but their minimal documentation process was a lifesaver. Highly recommended!"
  },
  {
    id: 6,
    name: "Anjali Desai",
    location: "Ahmedabad",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    text: "The foreclosure terms were very clear, which is rare in auto finance. I paid off my loan early without any hassle. If you want transparent car financing with great customer support, this is the place."
  }
];

export function CarLoanCustomerReview() {
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

  // JSON-LD Structured Data for SEO (Auto Finance)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    "name": "Six Loan New Car Financing",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
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
    <section className="bg-white flex flex-col items-center justify-center p-6 md:p-12 font-sans text-gray-900">
      {/* Schema.org Script for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Header Section */}
      <header className="text-center mb-10 md:mb-12 max-w-3xl">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 font-serif leading-tight text-[#0a1930]">
          Driving Dreams for Thousands of <br className="hidden md:block" /> Happy Car Owners
        </h2>
        <p className="text-gray-500 text-base md:text-lg mt-4 font-light px-4">
          See why we are the top choice for <strong>new car loans</strong> and instant vehicle financing across India.
        </p>
      </header>

      {/* Cards Container */}
      <div className="w-full max-w-6xl">
        {/* Changed grid gap for mobile to be smaller */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {visibleTestimonials.map((testimonial) => (
            <article 
              key={testimonial.id}
              className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300 flex flex-col h-full"
            >
              <div className="flex items-center mb-6">
                <img 
                  src={testimonial.image} 
                  alt={`${testimonial.name} - Car Loan Customer Review`} 
                  className="w-12 h-12 md:w-14 md:h-14 rounded-lg object-cover mr-4 shadow-sm"
                  loading="lazy"
                />
                <div>
                  <h3 className="text-base md:text-lg font-bold text-[#1e2746]">
                    {testimonial.name}
                  </h3>
                  <p className="text-gray-500 text-xs md:text-sm">
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
          aria-label="Previous car loan review"
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
          aria-label="Next car loan review"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
        </button>
      </div>
    </section>
  );
}

export default CarLoanCustomerReview;