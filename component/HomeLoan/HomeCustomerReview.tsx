'use client';
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
    text: "I successfully completed my home loan balance transfer through Six Loan. They helped me switch to a lower interest rate, saving me lakhs on my total interest outgo. Their expert guidance on home loan eligibility was a game-changer."
  },
  {
    id: 2,
    name: "Kavita Joshi",
    location: "Pune",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    text: "As a first-time buyer, I was looking for the best home loan interest rates in India. This platform provided a side-by-side comparison of top banks. The quick home loan approval and minimal documentation made my property purchase seamless."
  },
  {
    id: 3,
    name: "Arjun Nair",
    location: "Kochi",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    text: "I used their home loan EMI calculator to plan my finances. It gave me a clear picture of the principal and interest breakdown. Their team secured a high-value home loan for my luxury apartment with very low processing fees."
  },
  {
    id: 4,
    name: "Rahul Mehta",
    location: "Mumbai",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    text: "Excellent service for home loan top-ups. I needed extra funds for home renovation and Six Loan facilitated the disbursement at existing home loan rates, which is much cheaper than a personal loan."
  },
  {
    id: 5,
    name: "Sneha Reddy",
    location: "Hyderabad",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    text: "The financial experts here helped me maximize my home loan tax benefits under Section 24 and 80C. Understanding the legal technicalities of mortgage loans was so much easier with their dedicated support team."
  },
  {
    id: 6,
    name: "Amit Patel",
    location: "Ahmedabad",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    text: "Searching for a home loan for an under-construction property was stressful until I found Six Loan. They have tie-ups with major banks, ensuring fast-track approval and the lowest interest rates available in the market."
  },
  {
    id: 7,
    name: "Priya Sharma",
    location: "Delhi",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    text: "I highly recommend their home loan advisory service. They helped me improve my CIBIL score to qualify for a 'prime' home loan rate. The transparency in hidden charges and processing fees was truly impressive."
  },
  {
    id: 8,
    name: "Meera Iyer",
    location: "Chennai",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    text: "The digital home loan application process is very efficient. I uploaded my documents online and got a pre-approved home loan offer within hours. It made negotiating with the property builder much easier."
  },
  {
    id: 9,
    name: "Rohan Das",
    location: "Kolkata",
    image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    text: "Best platform for NRI home loans. They managed the entire power of attorney and documentation process while I was abroad. Secured a home loan in India with competitive interest rates and flexible tenure."
  },
  {
    id: 10,
    name: "Anjali Gupta",
    location: "Bangalore",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    text: "Transitioning my mortgage from a private bank to a public sector bank was effortless. Their balance transfer experts handled everything from the NOC to the new sanction letter. Saved me over 1.5% in interest!"
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

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Six Loan - Home Loan Services",
    "description": "Get the best home loan interest rates, balance transfers, and top-up loans with Six Loan.",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <header className="text-center mb-12 max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 font-serif leading-tight text-[#0a1930]">
          Best Home Loan Interest Rates: <br /> Customer Success Stories
        </h2>
        <p className="text-gray-500 text-lg mt-4 font-light">
          Discover why thousands of homeowners trust us for <strong>instant home loan approvals</strong>, 
          <strong> balance transfers</strong>, and <strong>low-interest property financing</strong> in India.
        </p>
      </header>

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
                  alt={`${testimonial.name} - ${testimonial.location} Home Loan Review`} 
                  className="w-14 h-14 rounded-lg object-cover mr-4 shadow-sm"
                  loading="lazy"
                />
                <div>
                  <h3 className="text-lg font-bold text-[#1e2746]">
                    {testimonial.name}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Verified Customer | {testimonial.location}
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

      <div className="mt-12 flex items-center justify-center space-x-8">
        <button 
          onClick={handlePrev}
          className="w-14 h-14 flex items-center justify-center rounded-2xl border border-gray-400 text-gray-600 hover:bg-gray-50 hover:border-gray-600 transition-all duration-200 group"
          aria-label="Previous home loan customer testimonial"
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
          aria-label="Next home loan customer testimonial"
        >
          <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </button>
      </div>
    </section>
  );
}

export default HomeCustomerReview;