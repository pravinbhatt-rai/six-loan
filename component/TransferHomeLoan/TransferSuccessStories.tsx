import React from 'react';

interface Testimonial {
  name: string;
  location: string;
  title: string;
  content: string;
  savingsHighlight: string; // New field to visually highlight the benefit
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: "Vikram Malhotra",
    location: "Mumbai",
    title: "Reduced ROI from 9.55% to 8.40%",
    content: "I was paying a heavy interest rate on my home loan for 3 years. I decided to transfer my balance through Six Loan. The team helped me switch to a public sector bank at just 8.40%. The process was seamless, and they even handled the foreclosure paperwork with my previous lender.",
    savingsHighlight: "Saved approx. ₹12 Lakhs in Interest",
    rating: 5
  },
  {
    name: "Sneha Reddy",
    location: "Bangalore",
    title: "Transfer + Top-Up for Renovation",
    content: "I needed ₹15 Lakhs for home interiors but personal loan rates were too high (14%). The expert at Six Loan suggested a Balance Transfer with a Top-Up. I got the extra funds at the same cheap home loan rate. It was a financial lifesaver.",
    savingsHighlight: "Got ₹15L Top-Up at 8.5% Rate",
    rating: 5
  },
  {
    name: "Amit & Pooja Verma",
    location: "Delhi NCR",
    title: "Reduced Monthly EMI Burden",
    content: "Our monthly expenses were rising, and our EMI was a big chunk of it. We opted for a balance transfer to extend our tenure slightly and reduce the rate. Our monthly EMI came down by ₹8,000, giving us much-needed breathing room.",
    savingsHighlight: "Reduced Monthly EMI by ₹8,000",
    rating: 4
  }
];

const TransferSuccessStories: React.FC = () => {
  
  // SEO: Generate Review Schema for Google Rich Snippets
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Home Loan Balance Transfer Service",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "1250"
    },
    "review": testimonials.map(t => ({
      "@type": "Review",
      "author": { "@type": "Person", "name": t.name },
      "reviewRating": { "@type": "Rating", "ratingValue": t.rating },
      "reviewBody": t.content
    }))
  };

  return (
    <section className="w-full max-w-6xl mx-auto  font-sans rounded-xl my-8">
      {/* Inject Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />

      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Real Savings Stories
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          See how our customers slashed their interest rates and unlocked capital by switching their home loans.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((item, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-md transition-shadow duration-300">
            {/* Rating Stars */}
            <div className="flex text-yellow-400 mb-3">
              {[...Array(5)].map((_, i) => (
                <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={i < item.rating ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>
              ))}
            </div>

            {/* Testimonial Title */}
            <h3 className="text-lg font-bold text-gray-900 mb-2 min-h-14">
              {item.title}
            </h3>

            {/* Content */}
            <p className="text-gray-600 text-sm leading-relaxed mb-6 grow">
              "{item.content}"
            </p>

            {/* Highlight Box */}
            <div className="mt-auto pt-4 border-t border-gray-100">
                <div className="bg-teal-50 text-teal-700 text-xs font-bold uppercase tracking-wide py-2 px-3 rounded-lg inline-block mb-3">
                    {item.savingsHighlight}
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold text-lg">
                        {item.name.charAt(0)}
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-900">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.location}</p>
                    </div>
                </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TransferSuccessStories;