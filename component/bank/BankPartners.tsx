'use client';
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Bank {
  id: number;
  name: string;
  logo: string;
  type: 'Government' | 'Private';
}

const banks: Bank[] = [
  { 
    id: 1, 
    name: 'HDFC Bank', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/HDFC_Bank_Logo.svg/1024px-HDFC_Bank_Logo.svg.png', 
    type: 'Private' 
  },
  { 
    id: 2, 
    name: 'ICICI Bank', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/ICICI_Bank_Logo.svg/1024px-ICICI_Bank_Logo.svg.png', 
    type: 'Private' 
  },
  { 
    id: 3, 
    name: 'IndusInd Bank', 
    logo: 'https://www.indusind.bank.in/content/dam/indusind-platform-images/mediabrand/IndusIndBankAIlogo.png', 
    type: 'Private' 
  },
  { 
    id: 4, 
    name: 'YES Bank', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/YESBANKLOGO.png/800px-YESBANKLOGO.png', 
    type: 'Private' 
  },
  { 
    id: 5, 
    name: 'Federal Bank', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Federal_bank_India.svg/1024px-Federal_bank_India.svg.png', 
    type: 'Private' 
  },
  { 
    id: 6, 
    name: 'IDFC FIRST Bank', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Logo_of_IDFC_First_Bank.svg/1024px-Logo_of_IDFC_First_Bank.svg.png', 
    type: 'Private' 
  }
];

const BankPartners: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'Government' | 'Private'>('All');

  const filteredBanks = banks.filter(bank => 
    filter === 'All' ? true : bank.type === filter
  );

  return (
    <div className="w-full max-w-6xl mx-auto py-12 px-4 font-sans select-none">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-extrabold text-slate-800">
          Top Banks in <span className="text-teal-500">India</span>
        </h2>
        {/* Decorative squiggle svg */}
        <div className="flex justify-center mt-2">
          <svg width="120" height="12" viewBox="0 0 100 10" fill="none">
             <path d="M5 8C20 2 35 12 50 5C65 -2 80 8 95 3" stroke="#14b8a6" strokeWidth="3" strokeLinecap="round"/>
          </svg>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center gap-6 mb-12">
        {['All', 'Government', 'Private'].map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category as any)}
            className={`px-8 py-2 rounded-full transition-all text-sm font-semibold tracking-wide ${
              filter === category 
                ? 'bg-teal-500/15 text-teal-600 border border-teal-500/40' 
                : 'text-gray-400 hover:text-teal-500'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Slider Container */}
      <div className="relative group px-10">
        {/* Navigation Arrows */}
        <button className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 border border-gray-100 hover:scale-110 transition-transform">
          <ChevronLeft className="w-6 h-6 text-gray-400" />
        </button>

        <div className="bg-teal-50/60 border-2 border-teal-100/50 rounded-[2.5rem] p-8 overflow-hidden">
          <div className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth">
            {filteredBanks.map((bank) => (
              <div 
                key={bank.id} 
                className="bg-white min-w-[140px] h-[140px] rounded-3xl shadow-sm flex items-center justify-center p-6 border border-teal-50/50 hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                <img 
                  src={bank.logo} 
                  alt={bank.name} 
                  title={bank.name}
                  className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>

        <button className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 border border-gray-100 hover:scale-110 transition-transform">
          <ChevronRight className="w-6 h-6 text-gray-400" />
        </button>
      </div>

      {/* Footer link */}
      <div className="text-center mt-10">
        <button className="text-teal-500 font-bold hover:text-teal-600 transition-colors text-base border-b-2 border-transparent hover:border-teal-500 pb-1">
          View More
        </button>
      </div>
    </div>
  );
};

export default BankPartners;