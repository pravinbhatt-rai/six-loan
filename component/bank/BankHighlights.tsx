"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

interface LoanData {
  id: string;
  title: string;
  subtitle: string;
  videoId: string;
  path: string; // Added this to store unique routes
}

const loans: LoanData[] = [
  {
    id: 'Bank1',
    title: 'Bank transfer cashback',
    subtitle: "Get Easy Money Against your Share Fund",
    videoId: 'HsRZUdF-mME',
    path: '/businessLoan', // Target path for business
  },
  {
    id: 'bank2',
    title: 'Net banking shopping discounts',
    subtitle: 'Unlock The Door To Your Car With Unbeatable - Auto Loan',
    videoId: 'gPrecPgIX1w',
    path: '/carLoan', // Target path for car
  },
  {
    id: 'bank3',
    title: 'Utility bill offers',
    subtitle: 'A Right Choice For Your Big Dream',
    videoId: 'e44x_rYM1gw',
    path: '/homeLoan',
  },
  {
    id: 'bank4',
    title: 'Insurance premium offers',
    subtitle: 'Get Easy Money Against your Share/Fund',
    videoId: 'BiDNkRwC_4A',
    path: '/securityLoan',
  },
];

const BankHighlights: React.FC = () => {
  const router = useRouter();

  return (
    <section className="w-full py-8 px-2 md:px-0 font-sans">
      {/* Header Section */}
      <div className="flex items-center justify-center gap-4 md:gap-6 mb-8 md:mb-12">
        <div className="w-2 h-2 md:w-3 md:h-3 bg-teal-500 rotate-45 transform" />
        <h2 className="text-2xl md:text-4xl font-cartis font-bold text-gray-900 text-center">
          Six Banking{' '}
          <span className="text-teal-500 relative inline-block">
            Highlight
            <svg className="absolute left-0 -bottom-2 md:-bottom-3 w-full h-auto" viewBox="0 0 100 15" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
              <path d="M2 8 C 20 15, 40 15, 50 10 C 55 7, 55 3, 50 5 C 45 8, 55 12, 70 12 C 85 12, 98 5, 98 5" stroke="#01baa7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </h2>
        <div className="w-2 h-2 md:w-3 md:h-3 bg-teal-500 rotate-45 transform" />
      </div>

      <div className="max-w-6xl mx-auto flex flex-col gap-4 md:gap-4">
        {loans.map((loan, index) => {
          const isEven = index % 2 === 0;
          const embedUrl = `https://www.youtube.com/embed/${loan.videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${loan.videoId}&showinfo=0&modestbranding=1&rel=0`;

          const alignmentClasses = isEven ? 'items-end text-right' : 'items-start text-left';
          const buttonDirection = isEven ? 'flex-row-reverse' : 'flex-row';

          return (
            <div
              key={loan.id}
              className={`flex ${isEven ? 'flex-row' : 'flex-row-reverse'} items-center justify-between gap-3 md:gap-20`}
            >
              {/* Video Section */}
              <div className="w-1/2 md:w-1/2">
                <div className="relative w-full aspect-video shadow-xl overflow-hidden rounded-md bg-black">
                  <iframe
                    src={embedUrl}
                    title={loan.title}
                    className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
                    allow="autoplay; encrypted-media"
                    frameBorder="0"
                  />
                  <div className="absolute inset-0 bg-transparent"></div>
                </div>
              </div>

              {/* Text Section */}
              <div className={`w-1/2 md:w-1/2 flex flex-col ${alignmentClasses}`}>
                <div className="w-full font-cartis text-lg md:text-6xl text-gray-900 leading-tight">
                  {loan.title.split(' ').map((word, i) => (
                    <span key={i} className={`inline ${isEven ? 'ml-1' : 'mr-1'} md:block md:mx-0`}>
                      {word}
                    </span>
                  ))}
                </div>

                <p className="text-gray-700 text-xs md:text-xl font-light tracking-wide max-w-sm mt-1 md:mt-0">
                  {loan.subtitle}
                </p>

                <div className={`mt-2 md:mt-4 flex ${buttonDirection} items-center gap-2 md:gap-4`}>
                  {/* Updated Button logic */}
                  <button
                    onClick={() => router.push(loan.path)}
                    className="flex items-center focus:outline-none border border-red-500 rounded-full px-2 py-1 md:px-5 md:py-2 hover:bg-gray-100 transition-colors"
                    aria-label={`View details for ${loan.title}`}
                  >
                    <span className="text-[8px] md:text-xs uppercase tracking-widest text-red-500 font-extrabold whitespace-nowrap">
                      Apply Now
                    </span>
                  </button>

                  <div className="h-px w-20 md:w-100 bg-gray-800"></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default BankHighlights;