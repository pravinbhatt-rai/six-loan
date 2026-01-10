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
    text: "I needed urgent capital for my textile business expansion. Six Loan helped me unlock the value of my commercial shop with a Loan Against Property. The interest rate was far lower than a business loan, and the overdraft facility helps me manage cash flow efficiently."
  },
  {
    id: 2,
    name: "Kavita Joshi",
    location: "Pune",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    text: "I was struggling with multiple high-interest personal loans. The team advised me to consolidate my debts using a property-backed loan. It reduced my monthly EMI burden by 40% and gave me a single, manageable payment date."
  },
  {
    id: 3,
    name: "Arjun Nair",
    location: "Kochi",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    text: "To fund my son's MS in the US, I needed a large amount that education loans didn't cover. Leveraging my residential property was the best decision. The LTV (Loan-to-Value) ratio was excellent, covering tuition and living expenses completely."
  },
  {
    id: 4,
    name: "Rahul Mehta",
    location: "Mumbai",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    text: "The legal verification process for property loans can be tedious, but Six Loan handled everything. From the technical valuation to the final disbursement, the transparency was impressive. Highly recommended for mortgage loans."
  },
  {
    id: 5,
    name: "Sneha Reddy",
    location: "Hyderabad",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    text: "I opted for a Lease Rental Discounting (LRD) loan against my rented commercial space. It gave me immediate liquidity without selling the asset. The EMI calculator on their site was spot-on for planning my repayment."
  },
  {
    id: 6,
    name: "Amit Patel",
    location: "Ahmedabad",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    text: "Transferred my existing Loan Against Property to a new lender through Six Loan. They negotiated a significantly lower interest rate and waived the processing fees. The balance transfer process was smooth and quick."
  },
  {
    id: 7,
    name: "Priya Sharma",
    location: "Delhi",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    text: "As a doctor, I wanted to expand my clinic. Using my residential property as collateral allowed me to get a high-value loan with a 15-year tenure. The extended repayment period made the EMIs very comfortable."
  },
  {
    id: 8,
    name: "Meera Iyer",
    location: "Chennai",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    text: "I utilized the Top-Up facility on my existing home loan for home renovation. The funds were disbursed within 48 hours as the property was already verified. A seamless experience for quick funds."
  },
  {
    id: 9,
    name: "Rohan Das",
    location: "Kolkata",
    image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    text: "Great support for self-employed professionals. Most banks asked for too many documents, but Six Loan matched me with a lender who understood my business cash flow and sanctioned the loan based on banking surrogates."
  },
  {
    id: 10,
    name: "Anjali Gupta",
    location: "Bangalore",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    text: "The best platform for comparing mortgage rates. I checked eligibility across 10+ banks instantly without affecting my credit score. Secured the lowest rate for my industrial property loan."
  }
];

export function PropertyCustomerReview() {
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

  // JSON-LD Structured Data for SEO (Optimized for Mortgage/LAP)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Six Loan Property Financing",
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
          Trusted by Property Owners for <br /> High-Value Financing
        </h2>
        <p className="text-gray-500 text-lg mt-4 font-light">
          See why businesses and individuals choose us for <strong>Loan Against Property</strong> and <strong>Mortgage Overdrafts</strong>.
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
                  alt={`${testimonial.name} - Property Loan Customer Review`} 
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
          className="w-14 h-14 flex items-center justify-center rounded-2xl border border-gray-400 text-gray-600 hover:bg-gray-50 hover:border-gray-600 transition-all duration-200 group"
          aria-label="Next review"
        >
          <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </button>
      </div>
    </section>
  );
}

export default PropertyCustomerReview;