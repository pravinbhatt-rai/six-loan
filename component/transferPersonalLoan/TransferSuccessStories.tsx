'use client';
import React from 'react';
import { Quote, Save, TrendingDown, BadgePlus } from 'lucide-react';

interface Testimonial {
  name: string;
  reason: string;
  content: string;
  savings: string;
  icon: React.ReactNode;
}

const testimonials: Testimonial[] = [
  {
    name: "Amit Verma",
    reason: "EMI Reduction",
    savings: "Saved ₹2,400/month",
    icon: <TrendingDown className="w-5 h-5 text-teal-600" />,
    content: "I was paying 15% interest on my existing loan. Through Six Loan, I transferred my balance to a new lender at 10.75%. My monthly EMI dropped significantly, and the process was handled digitally without me having to visit my old bank branch. The interest savings over the next 3 years are huge!"
  },
  {
    name: "Sneha Reddy",
    reason: "Interest Optimization",
    savings: "Reduced Interest by 4.5%",
    icon: <Save className="w-5 h-5 text-green-600" />,
    content: "I didn't realize how much extra I was paying until I used the Six Loan transfer calculator. I moved my ₹8 Lakh outstanding balance and the switch was seamless. Even after paying the processing fee, my 'Net Savings' were clear from month one. It’s the smartest financial move I’ve made this year."
  },
  {
    name: "Vikram Malhotra",
    reason: "Transfer + Top-up",
    savings: "Got ₹3 Lakh Extra Funds",
    icon: <BadgePlus className="w-5 h-5 text-purple-600" />,
    content: "I needed extra funds for my sister's wedding but didn't want another EMI. Six Loan helped me transfer my current loan and get a Top-up amount at the same low transfer rate. Now I have one consolidated EMI which is actually lower than what I was paying before for just the single loan!"
  }
];

const TransferSuccessStories: React.FC = () => {
  return (
    <section className="w-full max-w-6xl mx-auto px-6 py-12 font-sans">
      <div className="flex items-center gap-3 mb-10">
        <Quote className="w-10 h-10 text-teal-500 opacity-20" />
        <h2 className="text-3xl font-bold text-gray-900 border-b-4 border-teal-500 pb-2">
          Real Savings: Balance Transfer Success Stories
        </h2>
      </div>

      

      <div className="grid md:grid-cols-1 gap-8">
        {testimonials.map((item, index) => (
          <div 
            key={index} 
            className="group p-6 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md hover:border-teal-100 transition-all duration-300"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-teal-50 transition-colors">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                  <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{item.reason}</p>
                </div>
              </div>
              
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-green-50 text-green-700 text-sm font-bold border border-green-100">
                {item.savings}
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed text-base italic">
              "{item.content}"
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12 p-6 bg-teal-50 rounded-xl border border-teal-100 text-center">
        <p className="text-teal-800 font-medium">
          Want to be our next success story? 
          <span className="ml-2 text-teal-600 underline cursor-pointer hover:text-teal-700">
            Check your potential savings now →
          </span>
        </p>
      </div>
    </section>
  );
};

export default TransferSuccessStories;