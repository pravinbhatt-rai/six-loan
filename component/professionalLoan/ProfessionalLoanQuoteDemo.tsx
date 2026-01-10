import React from 'react';
import { Quote, Linkedin } from 'lucide-react';

// --- Interface Definitions ---
interface ExpertQuoteProps {
  title?: string;
  description: string;
  authorName: string;
  authorDesignation: string;
  authorAvatarUrl: string;
  linkedInUrl: string;
  className?: string;
}

// --- Reusable Component ---
const ExpertQuote: React.FC<ExpertQuoteProps> = ({
  title = "Professional Loan Insights",
  description,
  authorName,
  authorDesignation,
  authorAvatarUrl,
  linkedInUrl,
  className = "",
}) => {
  return (
    <div
      className={`w-full max-w-6xl mx-auto relative rounded-2xl border border-teal-100 bg-teal-50 shadow-sm md:p-10 ${className} mt-4`}
    >
      {/* Decorative Quote Icon - Watermark Top Right */}
      <div className="absolute right-6 top-6 pointer-events-none select-none">
        <Quote
          size={80}
          className="text-teal-200/50 transform -scale-x-100 fill-teal-200/20"
        />
      </div>

      <div className="relative z-10">
        {/* Header Title */}
        <h2 className="mb-4 text-2xl font-serif font-bold text-gray-900 md:text-3xl">
          {title}
        </h2>

        {/* Body Text */}
        <p className="mb-8 text-base leading-relaxed text-gray-700 md:text-lg italic">
          "{description}"
        </p>

        {/* Author Section */}
        <div className="flex items-center gap-4 border-t border-teal-200/30 pt-6">
          {/* Avatar */}
          <div className="relative shrink-0">
            <img
              src={authorAvatarUrl}
              alt={authorName}
              className="h-16 w-16 rounded-full object-cover shadow-sm ring-2 ring-white"
            />
          </div>

          {/* Author Info */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-gray-900">
                {authorName}
              </span>

              {/* Dynamic LinkedIn Link */}
              <a
                href={linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center rounded-sm bg-[#0077b5] p-0.5 text-white transition-transform hover:scale-110"
                aria-label={`${authorName}'s LinkedIn Profile`}
              >
                <Linkedin size={14} fill="white" className="stroke-none" />
              </a>
            </div>

            <span className="text-sm font-medium text-teal-600">
              {authorDesignation}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Example Usage (Professional Loan Demo) ---
const ProfessionalLoanQuoteDemo = () => {
  const quoteData = {
    title: "Expert Guidance on Professional Loans",
    description: "Empowering Doctors, Chartered Accountants, and Architects requires more than just capital—it requires a partner who understands the nuances of professional practice. At Six Loan, we've designed our Professional Loans with preferential interest rates and zero collateral requirements, ensuring that Bharat's experts can scale their practices without financial friction.",
    authorName: "Arjun Mehta",
    authorDesignation: "Head of Professional Lending, Six Loan",
    authorAvatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200", 
    linkedInUrl: "https://www.linkedin.com/in/professional-loan-expert"
  };

  return (
    <div className="bg-white flex items-center justify-center">
      <ExpertQuote
        title={quoteData.title}
        description={quoteData.description}
        authorName={quoteData.authorName}
        authorDesignation={quoteData.authorDesignation}
        authorAvatarUrl={quoteData.authorAvatarUrl}
        linkedInUrl={quoteData.linkedInUrl}
      />
    </div>
  );
};

export default ProfessionalLoanQuoteDemo;