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
    name: "Aarav Malhotra",
    location: "Studying in USA",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    text: "I needed a loan for my MS in the US, but most banks asked for collateral I didn't have. Six Loan connected me with lenders offering non-collateral education loans. The sanction letter came in just 4 days, which was a lifesaver for my F1 Visa interview."
  },
  {
    id: 2,
    name: "Sanya Kapoor",
    location: "MBA in India",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    text: "Financing my MBA at ISB seemed daunting until I found this platform. They helped me compare interest rates from top NBFCs and Public Banks. I secured a deal with a 100% financing option that covered my tuition and hostel fees completely."
  },
  {
    id: 3,
    name: "Rohan Das",
    location: "Studying in UK",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    text: "The 'Pre-Admission Sanction' feature is a game changer. I got my loan approved based on my GRE score even before my university admission letter arrived. This proof of funds helped me secure my seat at the University of Manchester."
  },
  {
    id: 4,
    name: "Meera Iyer",
    location: "Bangalore",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    text: "As a parent, I was worried about the repayment burden. The expert advisor explained the Section 80E tax benefits and helped us choose a loan with a long moratorium period. It made funding my daughter's medical degree much more manageable."
  },
  {
    id: 5,
    name: "Vikram Singh",
    location: "Studying in Canada",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    text: "Excellent support for refinancing! I transferred my existing high-interest education loan to a new lender with a lower rate after getting a job. The balance transfer process was smooth, digital, and saved me a lot on EMI."
  },
  {
    id: 6,
    name: "Anjali Gupta",
    location: "Delhi",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    text: "The transparency regarding processing fees and foreign exchange (Forex) charges was refreshing. No hidden costs. They guided me through the entire documentation process for my son's study abroad loan."
  }
];

export function EducationCustomerReview() {
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

  // JSON-LD Structured Data for SEO (Education Loan Specific)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Six Loan Education Loans",
    "description": "Compare and apply for Study Abroad and Domestic Education Loans with low interest rates.",
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
    <section className="bg-white flex flex-col items-center justify-center p-4 md:p-12 font-sans text-gray-900">
      {/* Schema.org Script for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Header Section */}
      <header className="text-center mb-8 md:mb-12 max-w-3xl px-2">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 font-serif leading-tight text-[#0a1930]">
          Trusted by Students for <br /> Global Education Funding
        </h2>
        <p className="text-gray-500 text-sm md:text-lg mt-4 font-light leading-relaxed">
          See why thousands of students choose us for <strong>Non-Collateral Loans</strong> and seamless <strong>Study Abroad Financing</strong>.
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
              <div className="flex items-center mb-6">
                <img 
                  src={testimonial.image} 
                  alt={`${testimonial.name} - Education Loan Review`} 
                  className="w-12 h-12 md:w-14 md:h-14 rounded-lg object-cover mr-4 shadow-sm"
                  loading="lazy"
                />
                <div>
                  <h3 className="text-base md:text-lg font-bold text-[#1e2746]">
                    {testimonial.name}
                  </h3>
                  <p className="text-teal-600 text-xs md:text-sm font-medium">
                    {testimonial.location}
                  </p>
                </div>
              </div>

              <div className="grow">
                <blockquote className="text-gray-600 leading-relaxed text-sm md:text-[15px] italic text-justify">
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

export default EducationCustomerReview;