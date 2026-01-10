import React from 'react';
import { Quote, Linkedin } from 'lucide-react';

// --- 1. Data Definitions ---

interface QuoteData {
  id: string;
  title?: string;
  description: string;
  authorName: string;
  authorDesignation: string;
  authorAvatarUrl: string;
  linkedInUrl: string;
}

const EXPERT_QUOTES_DATA: QuoteData[] = [
  // 1. Personal Loan
  {
    id: 'personal-loan',
    title: "Instant Financial Freedom",
    description: "In today's fast-paced world, needs don't wait. Whether it's a medical emergency or a dream wedding, our Personal Loans are designed for speed. We focus on your repayment capability rather than just paperwork, ensuring disbursement happens in hours, not days.",
    authorName: "Amit Verma",
    authorDesignation: "Head of Unsecured Lending",
    authorAvatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200",
    linkedInUrl: "https://www.linkedin.com/"
  },
  // 2. Home Loan
  {
    id: 'home-loan',
    title: "Building Your Sanctuary",
    description: "Buying a home is the biggest financial decision for most Indian families. We don't just provide funds; we provide stability. With tenures up to 30 years and competitive interest rates, we ensure that your dream home doesn't become a financial burden.",
    authorName: "Sarah Johnson",
    authorDesignation: "VP, Mortgage Solutions",
    authorAvatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200",
    linkedInUrl: "https://www.linkedin.com/"
  },
  // 3. Business Loan
  {
    id: 'business-loan',
    title: "Fueling Business Growth",
    description: "Capital is the lifeline of any enterprise. From small MSMEs to growing startups, our Business Loans are structured to bridge cash flow gaps and fund expansion. We look at the potential of your business model, offering collateral-free options to keep you moving forward.",
    authorName: "Rajan Malhotra",
    authorDesignation: "Head of SME Finance",
    authorAvatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200&h=200",
    linkedInUrl: "https://www.linkedin.com/"
  },
  // 4. Transfer Personal Loan
  {
    id: 'transfer-personal-loan',
    title: "Reduce Your Burden",
    description: "Why pay high interest rates when you have a good track record? Our Balance Transfer facility for personal loans is a strategic tool. We help you switch your existing high-cost debt to a lower rate, instantly reducing your EMI burden and freeing up monthly cash flow.",
    authorName: "Anjali Gupta",
    authorDesignation: "Portfolio Manager",
    authorAvatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200&h=200",
    linkedInUrl: "https://www.linkedin.com/"
  },
  // 5. Professional Loan
  {
    id: 'professional-loan',
    title: "Respecting Your Credentials",
    description: "Doctors and CAs represent the backbone of trust in our economy. We respect your time and credibility. That's why our Professional Loans offer distinctively higher limits with a 'Green Channel' approval process—minimal documentation and zero collateral.",
    authorName: "Vikram Singh",
    authorDesignation: "Head of Professional Lending",
    authorAvatarUrl: "https://images.unsplash.com/photo-1556157382-97eda2d622ca?auto=format&fit=crop&q=80&w=200&h=200",
    linkedInUrl: "https://www.linkedin.com/"
  },
  // 6. Loan Against Property (LAP)
  {
    id: 'loan-against-property',
    title: "Unlock Your Asset's Value",
    description: "Your property shouldn't just sit there; it can fund your next big leap. LAP offers a unique advantage: high loan amounts at interest rates significantly lower than personal loans. It's the smartest way to raise large capital for business or personal needs without selling your asset.",
    authorName: "Suresh Reddy",
    authorDesignation: "Senior VP, Secured Lending",
    authorAvatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200",
    linkedInUrl: "https://www.linkedin.com/"
  },
  // 7. Transfer Home Loan
  {
    id: 'transfer-home-loan',
    title: "Optimize Your Biggest Debt",
    description: "Interest rates fluctuate, and staying with a lender charging higher rates costs you lakhs over the long term. Our Home Loan Balance Transfer isn't just about switching; it's about optimization. We offer top-up facilities and reduced rates to help you close your loan faster.",
    authorName: "Priya Desai",
    authorDesignation: "Home Loan Strategist",
    authorAvatarUrl: "https://images.unsplash.com/photo-1598550874175-4d7112ee7f43?auto=format&fit=crop&q=80&w=200&h=200",
    linkedInUrl: "https://www.linkedin.com/"
  },
  // 8. Education Loan
  {
    id: 'education-loan',
    title: "Investing in the Future",
    description: "Education is the only investment with infinite returns. Whether it's a premier institute in India or a university abroad, we ensure finances never stand between a student and their ambition. We offer flexible moratorium periods so repayment starts only when you start earning.",
    authorName: "Dr. Arjun Mehta",
    authorDesignation: "Head of Education Finance",
    authorAvatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200",
    linkedInUrl: "https://www.linkedin.com/"
  },
  // 9. Loan Against Security
  {
    id: 'loan-against-security',
    title: "Liquidity Without Selling",
    description: "Don't interrupt the compounding of your investments. With Loan Against Securities, you can pledge your shares or mutual funds to get instant cash. You keep the ownership and the future profits of your stocks, while we provide the liquidity you need today.",
    authorName: "Kartik Aryan",
    authorDesignation: "Wealth Product Lead",
    authorAvatarUrl: "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?auto=format&fit=crop&q=80&w=200&h=200",
    linkedInUrl: "https://www.linkedin.com/"
  },
  // 10. Used Car Loan
  {
    id: 'used-car-loan',
    title: "Affordable Mobility",
    description: "The pre-owned car market offers incredible value. We make buying a second-hand car as easy as buying a new one. With our comprehensive valuation checks, we ensure the vehicle is priced right, and we fund up to 90% of the valuation to get you on the road.",
    authorName: "Deepak Chopra",
    authorDesignation: "Auto Finance Specialist",
    authorAvatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200&h=200",
    linkedInUrl: "https://www.linkedin.com/"
  },
  // 11. Used Bike Loan
  {
    id: 'used-bike-loan',
    title: "Two Wheels, Zero Hassle",
    description: "For many, a bike is essential for livelihood and daily commute. Our Used Bike Loans cater to this vital need with minimal documentation. We support the circular economy by making it easy for anyone to own a reliable two-wheeler without a heavy down payment.",
    authorName: "Manoj Kumar",
    authorDesignation: "Two-Wheeler Vertical Head",
    authorAvatarUrl: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&q=80&w=200&h=200",
    linkedInUrl: "https://www.linkedin.com/"
  },
  // 12. New Car Loan
  {
    id: 'new-car-loan',
    title: "Drive Your Dream",
    description: "The joy of a new car shouldn't be dampened by financing worries. We offer on-road funding options with exclusive dealer tie-ups. Our aim is to make the transition from the showroom to your garage seamless, with transparent rates and no hidden foreclosure charges.",
    authorName: "Natasha Roy",
    authorDesignation: "Head of Auto Lending",
    authorAvatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200",
    linkedInUrl: "https://www.linkedin.com/"
  },
  // 13. New Bike Loan
  {
    id: 'new-bike-loan',
    title: "Ride Out in Style",
    description: "Whether it's a superbike or a daily commuter, we fuel your passion for riding. Our New Bike Loans are approved almost instantly at the dealership level. We focus on low down payments so you can upgrade to a better model without stretching your budget.",
    authorName: "Rohan Das",
    authorDesignation: "Product Manager, 2-Wheelers",
    authorAvatarUrl: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&q=80&w=200&h=200",
    linkedInUrl: "https://www.linkedin.com/"
  }
];

// --- 2. The Presentational Component (UI Only) ---

interface ExpertQuoteProps extends Omit<QuoteData, 'id'> {
  className?: string;
}

const ExpertQuote: React.FC<ExpertQuoteProps> = ({
  title = "Directly from Expert",
  description,
  authorName,
  authorDesignation,
  authorAvatarUrl,
  linkedInUrl,
  className = "",
}) => {
  return (
    <div
      className={`
        w-full max-w-6xl mx-auto mb-8 relative
        bg-teal-50 text-gray-800 font-serif
        p-4 md:p-8
        border-0 md:border md:border-gray-200
        rounded-none md:rounded-3xl
        shadow-none md:shadow-sm
        ${className}
      `}
    >
      {/* Decorative Quote Icon */}
      <div className="absolute right-4 top-4 pointer-events-none select-none md:right-8 md:top-8">
        <Quote
          className="w-12 h-12 text-teal-200/50 transform -scale-x-100 fill-teal-200/20 md:w-24 md:h-24"
        />
      </div>

      <div className="relative z-10">
        <h2 className="mb-3 text-xl font-serif font-bold text-gray-900 md:mb-6 md:text-3xl">
          {title}
        </h2>

        <p className="mb-6 text-sm leading-relaxed text-gray-700 md:mb-8 md:text-lg">
          {description}
        </p>

        <div className="flex items-center gap-3 border-t border-teal-200/30 pt-4 md:gap-5 md:pt-6">
          {/* Avatar */}
          <div className="relative shrink-0">
            <img
              src={authorAvatarUrl}
              alt={authorName}
              className="h-12 w-12 rounded-full object-cover shadow-sm ring-2 ring-white md:h-16 md:w-16"
            />
          </div>

          {/* Author Info */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-gray-900 md:text-xl">
                {authorName}
              </span>
              <a
                href={linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center rounded-sm bg-[#0077b5] p-0.5 text-white transition-transform hover:scale-110"
              >
                <Linkedin size={14} fill="white" className="stroke-none" />
              </a>
            </div>
            <span className="text-xs font-medium text-teal-600 italic md:text-sm">
              {authorDesignation}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- 3. The Logic Wrapper (Use this in your pages) ---

interface ExpertQuoteContainerProps {
  id: string;
  className?: string;
}

export const ExpertQuoteContainer: React.FC<ExpertQuoteContainerProps> = ({ id, className }) => {
  const quoteData = EXPERT_QUOTES_DATA.find((item) => item.id === id);

  if (!quoteData) {
    console.warn(`ExpertQuote: No data found for id "${id}"`);
    return null;
  }

  return (
    <ExpertQuote
      {...quoteData}
      className={className}
    />
  );
};