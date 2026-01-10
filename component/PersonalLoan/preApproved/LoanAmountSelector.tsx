import React from 'react';
import { ArrowRight } from 'lucide-react';

const LoanAmountSelector: React.FC = () => {
  // Hardcoded data specific to this page
  const loanAmounts = [
    { 
      amount: "₹5 Lakh", 
      url: "#", 
      className: "bg-purple-50 text-purple-900" 
    },
    { 
      amount: "₹10 Lakh", 
      url: "#", 
      className: "bg-gray-50 text-gray-800" 
    },
    { 
      amount: "₹20 Lakh", 
      url: "#", 
      className: "bg-green-50 text-green-900" 
    },
    { 
      amount: "₹30 Lakh", 
      url: "#", 
      className: "bg-orange-50 text-orange-900" 
    },
    { 
      amount: "₹40 Lakh", 
      url: "#", 
      className: "bg-blue-50 text-blue-900" 
    },
    { 
      amount: "₹50 Lakh", 
      url: "#", 
      className: "bg-pink-50 text-pink-900" 
    },
  ];

  return (
    <div className={`
      w-full max-w-6xl mx-auto mb-8 bg-white 
      p-4 md:p-10 
      border-0 md:border md:border-gray-200 
      rounded-none md:rounded-3xl 
      shadow-none md:shadow-sm
      font-serif
    `}>
      
      {/* Section Header */}
      <div className="text-center mb-8 bg-blue-50/60 py-4 rounded-lg">
        <h2 className="text-xl md:text-3xl font-bold text-gray-900">
          Choose the Right Personal Loan Amount
        </h2>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {loanAmounts.map((item, index) => (
          <a 
            key={index}
            href={item.url}
            className={`
              group relative flex flex-col items-center justify-center 
              p-6 h-36 md:h-44 rounded-xl transition-all duration-300
              border-2 border-transparent hover:border-teal-500 hover:shadow-lg hover:-translate-y-1
              ${item.className}
            `}
          >
            <span className="text-gray-600 text-sm md:text-base font-medium mb-1">
              Personal Loan of
            </span>
            
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {item.amount}
            </h3>
            
            {/* Arrow Icon - Becomes Teal on Hover */}
            <div className="mt-2 text-gray-800 group-hover:text-teal-600 transition-colors duration-300">
              <ArrowRight size={24} strokeWidth={2} />
            </div>
          </a>
        ))}
      </div>

    </div>
  );
};

export default LoanAmountSelector;