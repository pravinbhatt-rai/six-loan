'use client';
import React, { useRef } from 'react';

// ==========================================
// 1. Type Definitions
// ==========================================

interface LoanTypeItem {
  title: string;
  description: string;
  // Using string for emojis to keep data file clean, but can be ReactNode
  icon: string | React.ReactNode;
}

interface LoanCategoryData {
  id: string; // The lookup key
  mainTitle: string;
  mainDescription: string;
  types: LoanTypeItem[];
}

// ==========================================
// 2. Centralized Data (The "Database")
// ==========================================

const LOAN_TYPES_DATA: LoanCategoryData[] = [
  // 1. Personal Loan
  {
    id: 'personal-loan',
    mainTitle: "Types of Personal Loans",
    mainDescription: "A personal loan can be used for a variety of needs such as medical expenses, education, travel, or debt consolidation. Since it's unsecured, you're free to utilize it for almost any requirement.",
    types: [
      {
        title: "Debt Consolidation",
        description: "Combine multiple high-interest debts into a single loan with a lower interest rate to reduce your monthly burden.",
        icon: "🧾",
      },
      {
        title: "Medical Emergency",
        description: "Instant funds to cover hospitalization, surgeries, or expensive treatments without dipping into savings.",
        icon: "🏥",
      },
      {
        title: "Travel Loan",
        description: "Fund your dream vacation, including flights, accommodation, and experiences, with easy EMIs.",
        icon: "✈️",
      },
      {
        title: "Wedding Loan",
        description: "Manage the high costs of venue, catering, and jewelry for your special day without stress.",
        icon: "💍",
      },
      {
        title: "Home Renovation",
        description: "Small ticket personal loans to paint, repair, or furnish your home without taking a large home loan.",
        icon: "🏠",
      }
    ]
  },
  // 2. Home Loan
  {
    id: 'home-loan',
    mainTitle: "Types of Home Loans",
    mainDescription: "Home loans aren't just for buying a new apartment. Lenders offer various specialized products depending on your property needs.",
    types: [
      {
        title: "Home Purchase Loan",
        description: "The standard loan for buying a ready-to-move-in or under-construction residential property.",
        icon: "🏡",
      },
      {
        title: "Plot Loan",
        description: "Loans specifically for purchasing a piece of land or plot for residential construction.",
        icon: "📍",
      },
      {
        title: "Home Construction Loan",
        description: "For individuals who own a plot and need funds to construct their house on it.",
        icon: "🏗️",
      },
      {
        title: "Home Improvement Loan",
        description: "Funds for major repairs, painting, waterproofing, or structural changes to an existing home.",
        icon: "🛠️",
      },
      {
        title: "Home Extension Loan",
        description: "Specifically for adding extra space, like a new room or a floor, to your existing house.",
        icon: "🧱",
      }
    ]
  },
  // 3. Business Loan
  {
    id: 'business-loan',
    mainTitle: "Types of Business Loans",
    mainDescription: "From daily operations to long-term expansion, choose the right credit facility to fuel your business growth.",
    types: [
      {
        title: "Working Capital Loan",
        description: "Short-term funding to manage day-to-day operations, payroll, and inventory needs.",
        icon: "💼",
      },
      {
        title: "Term Loan",
        description: "A lump sum provided for a fixed tenure, usually for expansion or capital expenditure.",
        icon: "📅",
      },
      {
        title: "Equipment Finance",
        description: "Loans specifically to purchase machinery, medical equipment, or technology for business.",
        icon: "⚙️",
      },
      {
        title: "Invoice Discounting",
        description: "Get immediate cash against your unpaid customer invoices to maintain cash flow.",
        icon: "📄",
      },
      {
        title: "Letter of Credit",
        description: "A guarantee from the bank to pay your suppliers, crucial for import/export businesses.",
        icon: "🤝",
      }
    ]
  },
  // 4. Transfer Personal Loan
  {
    id: 'transfer-personal-loan',
    mainTitle: "Types of Balance Transfers",
    mainDescription: "Switching your loan isn't just about rate reduction; it's about optimizing your debt structure.",
    types: [
      {
        title: "Rate Reduction Transfer",
        description: "Moving from a high-interest lender to a low-interest one purely to save on interest costs.",
        icon: "📉",
      },
      {
        title: "Transfer with Top-Up",
        description: "Transferring your balance and simultaneously taking an additional loan amount for new needs.",
        icon: "💰+",
      },
      {
        title: "Consolidation Transfer",
        description: "Moving multiple personal loans from different banks to a single lender for one easy EMI.",
        icon: "🔄",
      }
    ]
  },
  // 5. Professional Loan
  {
    id: 'professional-loan',
    mainTitle: "Loans for Professionals",
    mainDescription: "Tailor-made financial products that respect your degree and practice.",
    types: [
      {
        title: "Doctor's Loan",
        description: "High-value loans for setting up clinics, buying medical equipment, or personal needs.",
        icon: "🩺",
      },
      {
        title: "CA Loan",
        description: "Exclusive loans for Chartered Accountants based on practice vintage and gross receipts.",
        icon: "📊",
      },
      {
        title: "Engineer's Loan",
        description: "Funding for self-employed engineers and architects to set up offices or buy software.",
        icon: "📐",
      },
      {
        title: "Practice Development",
        description: "Loans specifically to renovate your office or clinic to attract more clients.",
        icon: "🏢",
      }
    ]
  },
  // 6. Loan Against Property
  {
    id: 'loan-against-property',
    mainTitle: "Variants of Loan Against Property",
    mainDescription: "Leverage your real estate asset for high-ticket funding needs.",
    types: [
      {
        title: "Residential LAP",
        description: "Mortgaging your self-occupied or rented residential house for funds.",
        icon: "🏠",
      },
      {
        title: "Commercial LAP",
        description: "Loans against office spaces, shops, or warehouses. LTV is usually lower than residential.",
        icon: "🏢",
      },
      {
        title: "LAP Overdraft",
        description: "A credit line against property where you pay interest only on the amount utilized.",
        icon: "💳",
      },
      {
        title: "Lease Rental Discounting",
        description: "Loan against the future rental receipts of your commercial property.",
        icon: "📝",
      }
    ]
  },
  // 7. Transfer Home Loan
  {
    id: 'transfer-home-loan',
    mainTitle: "Home Loan Transfer Options",
    mainDescription: "Optimize your mortgage by moving to a better lender.",
    types: [
      {
        title: "Plain Balance Transfer",
        description: "Simply moving the outstanding principal to a new bank for a lower interest rate.",
        icon: "📉",
      },
      {
        title: "Top-Up on Transfer",
        description: "Availing extra funds over and above the transfer amount for home renovation or personal use.",
        icon: "➕",
      },
      {
        title: "Internal Repricing",
        description: "Paying a conversion fee to your *existing* lender to switch to their current lower rates.",
        icon: "🔄",
      }
    ]
  },
  // 8. Education Loan
  {
    id: 'education-loan',
    mainTitle: "Education Loan Categories",
    mainDescription: "Investing in knowledge pays the best interest. Choose the right support for your studies.",
    types: [
      {
        title: "Study in India",
        description: "Loans for premier institutes like IITs, IIMs, and medical colleges within India.",
        icon: "🇮🇳",
      },
      {
        title: "Study Abroad",
        description: "Comprehensive funding covering tuition, travel, and living expenses for foreign universities.",
        icon: "🌍",
      },
      {
        title: "Executive MBA",
        description: "Loans for working professionals looking to upskill with part-time or executive courses.",
        icon: "🎓",
      },
      {
        title: "Vocational Training",
        description: "Funding for specialized skill development or aviation/pilot training courses.",
        icon: "✈️",
      }
    ]
  },
  // 9. Loan Against Security
  {
    id: 'loan-against-security',
    mainTitle: "Types of Securities Loans",
    mainDescription: "Get liquidity without selling your long-term investments.",
    types: [
      {
        title: "Loan Against Shares",
        description: "Pledge your demat shares to get an overdraft limit up to 50% of the value.",
        icon: "📈",
      },
      {
        title: "Loan Against Mutual Funds",
        description: "Digital lien marking on your equity or debt mutual funds for instant cash.",
        icon: "📊",
      },
      {
        title: "Loan Against Bonds",
        description: "Funding against RBI bonds, Sovereign Gold Bonds, or corporate bonds.",
        icon: "📜",
      },
      {
        title: "Loan Against Insurance",
        description: "Loans against the surrender value of traditional life insurance policies.",
        icon: "🛡️",
      }
    ]
  },
  // 10. Used Car Loan
  {
    id: 'used-car-loan',
    mainTitle: "Used Car Finance Options",
    mainDescription: "Drive your dream car for less with flexible pre-owned car loans.",
    types: [
      {
        title: "Purchase from Dealer",
        description: "Loans for cars bought from organized dealerships like Maruti TrueValue or Spinny.",
        icon: "🏪",
      },
      {
        title: "Purchase from Individual",
        description: "Funding for buying a car directly from a friend, relative, or private seller.",
        icon: "🤝",
      },
      {
        title: "Refinance / Top-Up",
        description: "Taking a loan on a car you already own to free up cash for other needs.",
        icon: "💵",
      }
    ]
  },
  // 11. Used Bike Loan
  {
    id: 'used-bike-loan',
    mainTitle: "Used Bike Loan Options",
    mainDescription: "Affordable mobility solutions for pre-owned two-wheelers.",
    types: [
      {
        title: "Certified Bike Loan",
        description: "Loans for bikes purchased from certified refurbished dealers.",
        icon: "✅",
      },
      {
        title: "Peer-to-Peer Loan",
        description: "Finance to buy a bike from a direct owner/seller.",
        icon: "🛵",
      },
      {
        title: "Superbike Finance",
        description: "Specialized loans for high-end pre-owned sports bikes.",
        icon: "🏍️",
      }
    ]
  },
  // 12. New Car Loan
  {
    id: 'new-car-loan',
    mainTitle: "New Car Finance Types",
    mainDescription: "Various ways to fund your brand new vehicle purchase.",
    types: [
      {
        title: "New Car Loan",
        description: "Standard funding for purchasing a new vehicle from the showroom.",
        icon: "🚗",
      },
      {
        title: "Pre-Approved Loan",
        description: "Instant sanction based on your banking history before you visit the dealer.",
        icon: "⚡",
      },
      {
        title: "Fixed vs Floating",
        description: "Choose between a fixed interest rate or one that changes with the market.",
        icon: "⚖️",
      },
      {
        title: "EV Loan",
        description: "Special 'Green' loans with lower interest rates for Electric Vehicles.",
        icon: "🔋",
      }
    ]
  },
  // 13. New Bike Loan
  {
    id: 'new-bike-loan',
    mainTitle: "New Bike Loan Categories",
    mainDescription: "Funding options for your daily commute or passion riding.",
    types: [
      {
        title: "Two-Wheeler Loan",
        description: "Standard loan for scooters and motorcycles with easy EMI options.",
        icon: "🛵",
      },
      {
        title: "Superbike Loan",
        description: "High-value loans for premium bikes (Harley, Triumph, etc.) with longer tenures.",
        icon: "🏍️",
      },
      {
        title: "No Hypothecation",
        description: "Loans where the RC is not marked with the bank's name (based on high credit score).",
        icon: "📄",
      }
    ]
  }
];

// ==========================================
// 3. Reusable Loan Card Component
// ==========================================

const LoanCard: React.FC<LoanTypeItem> = ({ title, description, icon }) => {
  return (
    <div className="snap-start shrink-0 w-80 p-6 bg-white border-2 border-transparent rounded-2xl shadow-md hover:border-teal-500 transition-all duration-300">
      <div className="mb-4">
        <div className="w-12 h-12 bg-teal-100 text-teal-500 rounded-full flex items-center justify-center text-2xl">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed text-sm">{description}</p>
    </div>
  );
};

// ==========================================
// 4. Main Component (Logic Wrapper)
// ==========================================

interface LoanTypesContainerProps {
  id: string; // The ID passed from the parent page
  className?: string;
}

const LoanTypesContainer: React.FC<LoanTypesContainerProps> = ({ id, className }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 1. Find Data
  const data = LOAN_TYPES_DATA.find((item) => item.id === id);

  // 2. Safety Check
  if (!data) {
    console.warn(`LoanTypesContainer: No data found for id "${id}"`);
    return null;
  }

  // 3. Scroll Logic
  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320 + 24; // Card width + gap
      const currentScroll = scrollContainerRef.current.scrollLeft;
      scrollContainerRef.current.scrollTo({
        left: direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className={`
       max-w-6xl mx-auto mb-8 bg-white text-gray-800
      font-serif
      p-4 md:p-8
      border-0 md:border md:border-gray-200
      rounded-none md:rounded-3xl
      shadow-none md:shadow-sm
      ${className || ''}
    `}>

      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
        {data.mainTitle}
      </h2>
      <p className="text-gray-700 max-w-3xl mb-8 text-base md:text-lg">
        {data.mainDescription}
      </p>

      <div className="relative group">
        {/* Left Scroll Button - Hidden on Mobile */}
        <button
          onClick={() => scroll('left')}
          className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 -ml-6 z-10 bg-teal-500 hover:bg-teal-600 text-white p-3 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2"
          aria-label="Scroll left"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        {/* Scrollable Card Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-scroll snap-x scroll-smooth no-scrollbar pb-4 px-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {data.types.map((loan, index) => (
            <LoanCard key={index} {...loan} />
          ))}
        </div>

        {/* Right Scroll Button - Hidden on Mobile */}
        <button
          onClick={() => scroll('right')}
          className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 -mr-6 z-10 bg-teal-500 hover:bg-teal-600 text-white p-3 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2"
          aria-label="Scroll right"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>

      {/* Style to hide the default scrollbar for a cleaner look */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

    </div>
  );
};

export default LoanTypesContainer;