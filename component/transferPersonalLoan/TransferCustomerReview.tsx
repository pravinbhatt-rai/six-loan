'use client';
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, TrendingDown, Percent } from 'lucide-react';

// Interface for our Testimonial Data
interface Testimonial {
  id: number;
  name: string;
  location: string;
  image: string;
  text: string;
  savings?: string; // Specific field for BT success stories
}

// Updated Mock Data for Personal Loan Balance Transfer
const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Rahul Mehta",
    location: "Mumbai",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    savings: "Saved ₹2.4 Lakh in Interest",
    text: "I was struggling with a 15% interest rate on my existing loan. Six Loan helped me transfer the balance to a top-tier bank at 10.75%. The reduction in my monthly EMI has given me so much breathing room in my monthly budget!"
  },
  {
    id: 2,
    name: "Priya Sharma",
    location: "Delhi",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    savings: "EMI Reduced by ₹3,200",
    text: "The transfer process was entirely digital. I was worried about the paperwork for closing my old loan, but the Six Loan team handled the coordination perfectly. Switching my high-cost debt was the best financial decision I made this year."
  },
  {
    id: 3,
    name: "Amit Patel",
    location: "Ahmedabad",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    savings: "Transfer + Top-up Success",
    text: "I transferred my existing personal loan and managed to get an additional top-up amount at the same low interest rate. It was much cheaper than taking a fresh loan separately. Truly transparent and professional service."
  },
  {
    id: 4,
    name: "Sneha Reddy",
    location: "Hyderabad",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    savings: "Interest Rate Cut by 4%",
    text: "Used the balance transfer calculator on the site and realized I was overpaying significantly. The switching process took just 3 days from application to disbursement. I'm now paying much less total interest over my remaining tenure."
  }
  // ... add more as needed
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

  return (
    <div className="bg-white flex flex-col items-center justify-center p-6 md:p-12 font-sans text-gray-900">
      
      {/* Header Section */}
      <div className="text-center mb-12 max-w-3xl">
        <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
          <TrendingDown size={16} />
          <span>Smart Debt Optimization</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif leading-tight text-[#0a1930]">
          Real People. <br /> Real Interest Savings.
        </h1>
        <p className="text-gray-500 text-lg mt-4 font-light">
          See how our customers slashed their EMIs by switching to lower interest rates.
        </p>
      </div>

      

      {/* Cards Container */}
      <div className="w-full max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visibleTestimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-white border border-gray-100 rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col h-full border-b-4 border-b-teal-500"
            >
              {/* User Profile Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-14 h-14 rounded-lg object-cover mr-4 shadow-sm"
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
                {testimonial.savings && (
                  <div className="hidden sm:flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1 rounded-md text-xs font-bold border border-green-100">
                    <Percent size={12} />
                    {testimonial.savings}
                  </div>
                )}
              </div>

              {/* Review Text */}
              <div className="grow">
                <p className="text-gray-600 leading-relaxed text-[15px] italic">
                  &quot;{testimonial.text}&quot;
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="mt-12 flex items-center justify-center space-x-8">
        <button 
          onClick={handlePrev}
          className="w-14 h-14 flex items-center justify-center rounded-2xl border border-gray-300 text-gray-600 hover:bg-teal-50 hover:border-teal-500 hover:text-teal-600 transition-all duration-200 group"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </button>

        <div className="text-2xl font-medium tracking-wide">
          <span className="text-[#0a1930] font-bold">
            {formatNumber(currentIndex + 1)}
          </span>
          <span className="text-gray-400">
            /{testimonials.length}
          </span>
        </div>

        <button 
          onClick={handleNext}
          className="w-14 h-14 flex items-center justify-center rounded-2xl border border-gray-300 text-gray-600 hover:bg-teal-50 hover:border-teal-500 hover:text-teal-600 transition-all duration-200 group"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </button>
      </div>

    </div>
  );
}

export default TransferCustomerReview;