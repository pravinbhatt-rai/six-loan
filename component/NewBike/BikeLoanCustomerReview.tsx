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

// SEO Optimized Testimonials for New Bike Loans
const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Arjun Mehta",
    location: "Bangalore",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    text: "I wanted to buy a 350cc cruiser bike, but the down payment was an issue. Six Loan offered me a 'Zero Down Payment' scheme with a flexible 4-year tenure. The approval came in just 2 hours, and I rode my bike home the same evening!"
  },
  {
    id: 2,
    name: "Priya Sharma",
    location: "Delhi NCR",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    text: "Switching to an Electric Scooter was my priority for daily commuting. I got an excellent interest rate of 9% p.a. on the Green Bike Loan initiative. The digital documentation process was super fast and completely paperless."
  },
  {
    id: 3,
    name: "Rahul Nair",
    location: "Kochi",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    text: "As a college student with a part-time job, I didn't have a credit history. They helped me get a two-wheeler loan with a co-borrower option. Now I have my own bike for college and I'm building my CIBIL score simultaneously."
  },
  {
    id: 4,
    name: "Sanya Gupta",
    location: "Mumbai",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    text: "I applied for a Superbike loan. Most banks asked for too many documents, but here the pre-approved offer based on my bank statement made it easy. They covered 85% of the on-road price, including insurance and accessories."
  },
  {
    id: 5,
    name: "Vikram Singh",
    location: "Jaipur",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    text: "The best part about this bike loan was the transparency. No hidden processing fees or surprise foreclosure charges. The EMI calculator was accurate, and the customer support helped me choose the right lender for my budget."
  },
  {
    id: 6,
    name: "Anjali Desai",
    location: "Ahmedabad",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    text: "I needed a reliable scooter for my business deliveries. The LTV ratio was great, and the loan disbursement happened directly to the dealer. Highly recommended for anyone looking for quick and hassle-free two-wheeler finance."
  }
];

export function BikeLoanCustomerReview() {
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

  // JSON-LD Structured Data for SEO (Updated for Bike Loan)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Six Two-Wheeler Loan",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "1240"
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
          Riders Love Our <br className="hidden md:block" /> Quick Financing
        </h2>
        <p className="text-gray-500 text-base md:text-lg mt-4 font-light">
          Discover how thousands of customers bought their dream <br className="hidden md:block"/> <strong>Superbikes, Scooters, and EVs</strong> with our instant approvals.
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
                  alt={`${testimonial.name} - Bike Loan Review`} 
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

export default BikeLoanCustomerReview;