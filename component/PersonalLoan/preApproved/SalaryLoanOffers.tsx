import React from 'react';
import { ArrowRight } from 'lucide-react';

const SalaryLoanOffers: React.FC = () => {
  // Hardcoded data based on the screenshot
  const salaryData = [
    { 
      amount: "₹25,000", 
      url: "#", 
      bgColor: "bg-orange-50" 
    },
    { 
      amount: "₹30,000", 
      url: "#", 
      bgColor: "bg-purple-50" 
    },
    { 
      amount: "₹50,000", 
      url: "#", 
      bgColor: "bg-pink-50" 
    },
    { 
      amount: "₹60,000", 
      url: "#", 
      bgColor: "bg-yellow-50" 
    },
    { 
      amount: "₹80,000", 
      url: "#", 
      bgColor: "bg-blue-50" 
    },
    { 
      amount: "₹1,00,000", 
      url: "#", 
      bgColor: "bg-indigo-50" 
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
      
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-xl md:text-3xl font-bold text-gray-900 text-center md:text-left">
          Check Personal Loan Offers Based on Your Salary
        </h2>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {salaryData.map((item, index) => (
          <a 
            key={index}
            href={item.url}
            className={`
              group relative flex flex-col items-center justify-between
              p-8 rounded-2xl transition-all duration-300
              border-2 border-transparent hover:border-teal-500 hover:shadow-lg hover:-translate-y-1
              ${item.bgColor}
            `}
          >
            {/* Text Content */}
            <div className="text-center mb-6">
              <p className="text-gray-600 text-sm md:text-base font-medium mb-1">
                Personal Loan for
              </p>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {item.amount}
              </h3>
              <p className="text-gray-600 text-sm md:text-base font-medium">
                salary
              </p>
            </div>

            {/* Button Representation */}
            <div className="w-full max-w-[200px]">
              <div className={`
                flex items-center justify-center gap-2 w-full py-3 px-6 rounded-lg
                bg-teal-500 text-white font-semibold text-sm md:text-base
                transition-colors duration-300 group-hover:bg-teal-600
              `}>
                Read More
                <ArrowRight size={18} strokeWidth={2.5} />
              </div>
            </div>
          </a>
        ))}
      </div>

    </div>
  );
};

export default SalaryLoanOffers;