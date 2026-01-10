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
    name: "Vikram Singh",
    location: "Jaipur",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    text: "Outstanding service! The home loan transfer process was handled with such professionalism. I saved a considerable amount on interest rates thanks to their negotiation team. The transparency throughout the process was refreshing."
  },
  {
    id: 2,
    name: "Kavita Joshi",
    location: "Pune",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    text: "A comprehensive financial hub for home buyers. From home loan eligibility to property documentation, everything is in one place. The low interest rates and quick processing made my dream home a reality."
  },
  {
    id: 3,
    name: "Arjun Nair",
    location: "Kochi",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    text: "Getting a home loan was stress-free. I used the platform to compare home loan interest rates from top banks. The detailed breakdown of EMIs and processing fees made my decision very easy. Highly recommend for new buyers."
  },
  // ... adding home loan keywords to others or keeping them diverse
  {
    id: 4,
    name: "Rahul Mehta",
    location: "Mumbai",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    text: "I was looking for a quick and easy home loan solution, and Six Loan made the process completely hassle-free. The home loan application was simple, and I received the sanction letter within a few days."
  },
  {
    id: 5,
    name: "Sneha Reddy",
    location: "Hyderabad",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    text: "The financial insights provided for my mortgage were eye-opening. I managed to understand home loan tax benefits and improve my credit score significantly before applying. Now I have my own home!"
  },
  {
    id: 6,
    name: "Amit Patel",
    location: "Ahmedabad",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    text: "Best platform for home loan balance transfers. I reduced my EMI significantly by switching my existing loan. The customer support guided me through the entire legal and technical verification process."
  },
  {
    id: 7,
    name: "Priya Sharma",
    location: "Delhi",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    text: "As a first-time home buyer, I was confused. Their home loan experts helped me find the best tenure and interest rate. I've already recommended Six Loan to my colleagues for their property investments."
  },
  {
    id: 8,
    name: "Meera Iyer",
    location: "Chennai",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    text: "The home loan EMI calculator on the site is so accurate. It helped me plan my budget perfectly. The transition from application to disbursement was smoother than any traditional bank I've dealt with."
  },
  {
    id: 9,
    name: "Rohan Das",
    location: "Kolkata",
    image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    text: "Incredible support for NRI home loans. They understood the specific documentation required for overseas citizens and helped me secure a great deal on my apartment in Kolkata. Five-star service!"
  },
  {
    id: 10,
    name: "Anjali Gupta",
    location: "Bangalore",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    text: "The best experience with home loan top-ups. I needed funds for renovation, and the process was incredibly fast. The interest rates were much lower than a personal loan. Truly a customer-centric company."
  }
];

export function HomeCustomerReview() {
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
    "name": "Six Loan Home Loans",
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
    <section className="bg-white flex flex-col items-center justify-center p-6 md:p-12 font-sans text-gray-900">
      {/* Schema.org Script for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Header Section */}
      <header className="text-center mb-12 max-w-3xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 font-serif leading-tight text-[#0a1930]">
          Trusted by Thousands of Happy <br /> Home Loan Customers
        </h2>
        <p className="text-gray-500 text-lg mt-4 font-light">
          See why we are the preferred choice for <strong>home loan balance transfers</strong> and new property financing.
        </p>
      </header>

      {/* Cards Container */}
      <div className="w-full max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visibleTestimonials.map((testimonial) => (
            <article 
              key={testimonial.id}
              className="bg-white border border-gray-100 rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300 flex flex-col h-full"
            >
              <div className="flex items-center mb-6">
                <img 
                  src={testimonial.image} 
                  alt={`${testimonial.name} - Home Loan Customer Review`} 
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
          className="w-14 h-14 flex items-center justify-center rounded-2xl border border-gray-400 text-gray-600 hover:bg-gray-50 hover:border-gray-600 transition-all duration-200 group"
          aria-label="Previous home loan review"
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
          className="w-14 h-14 flex items-center justify-center rounded-2xl border border-gray-400 text-gray-600 hover:bg-gray-50 hover:border-gray-600 transition-all duration-200 group"
          aria-label="Next home loan review"
        >
          <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </button>
      </div>
    </section>
  );
}

export default HomeCustomerReview;