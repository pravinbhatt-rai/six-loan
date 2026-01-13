'use client';
import React, { useState } from 'react';
import { Link as LinkIcon, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';

// ==========================================
// 1. Data Definitions
// ==========================================

interface LinkItem {
  text: string;
  url: string; // In a real app, this would be the href
}

interface QuickLinksData {
  id: string; // The lookup key
  links: LinkItem[];
}

// ==========================================
// 2. Centralized Data (The "Database")
// ==========================================

const QUICK_LINKS_DATA: QuickLinksData[] = [
  // 1. Personal Loan
  {
    id: 'personal-loan',
    links: [
      { text: "Pre-Approved Loan Interest Rates", url: "#" },
      { text: "Pre-Approved Loan Eligibility", url: "#" },
      { text: "How Pre-Approved Offer Works", url: "#" },
      { text: "Processing Fees & Charges", url: "#" },
      { text: "Personal Loan EMI Calculator", url: "#" },
      { text: "Documents Required", url: "#" },
      { text: "Personal Loan Verification Process", url: "#" },
      { text: "Foreclosure Charges", url: "#" }
    ]
  },
  // Personal Loan Interest Rates Page
  {
    id: 'personal-loan-interest-rates',
    links: [
      { text: "Current Interest Rate Trends", url: "#" },
      { text: "Bank vs NBFC Rate Comparison", url: "#" },
      { text: "Flat vs Reducing Balance Rate", url: "#" },
      { text: "Impact of CIBIL Score on Rates", url: "#" },
      { text: "Lowest Interest Rate Lenders", url: "#" },
      { text: "Salary Transfer Overdraft Rates", url: "#" },
      { text: "Govt Employee Personal Loan Rates", url: "#" },
      { text: "Relationship Discounts & Offers", url: "#" }
    ]
  },
  {
    id: 'personal-loan-low-cibil',
    links: [
      { text: "Loans for CIBIL Score < 600", url: "#" },
      { text: "How to Improve Credit Score Fast", url: "#" },
      { text: "Apply with a Co-Applicant", url: "#" },
      { text: "Secured vs Unsecured Loans", url: "#" },
      { text: "Documents for Low CIBIL Loans", url: "#" },
      { text: "Avoid Loan Application Rejection", url: "#" },
      { text: "Small Ticket Instant Loans", url: "#" },
      { text: "Check Your CIBIL Report for Errors", url: "#" }
    ]
  }
  
];

// ==========================================
// 3. The Presentational Component
// ==========================================

interface QuickLinksProps {
  data: QuickLinksData;
}

const QuickLinks: React.FC<QuickLinksProps> = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Show first 4 links by default, or all if expanded
  const initialCount = 4;
  const linksToShow = isExpanded ? data.links : data.links.slice(0, initialCount);
  const hasMore = data.links.length > initialCount;

  return (
    <div className="w-full max-w-6xl mx-auto mb-8 bg-white text-gray-800 font-serif p-4 md:p-8 border-0 md:border md:border-gray-200 rounded-none md:rounded-3xl shadow-none md:shadow-sm">
      
      {/* Header */}
      <div className="mb-6 md:mb-8 flex items-center gap-2">
        <LinkIcon className="w-5 h-5 md:w-6 md:h-6 text-teal-600" />
        <h2 className="text-2xl md:text-3xl font-bold font-serif text-gray-900">
          Quick Links
        </h2>
      </div>

      {/* Grid of Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-6">
        {linksToShow.map((link, index) => (
          <a 
            key={index}
            href={link.url}
            className="group flex items-center justify-between py-3 border-b border-dashed border-gray-200 hover:border-teal-500 transition-all duration-200"
          >
            <span className="text-gray-700 font-medium text-sm md:text-base group-hover:text-teal-600 transition-colors">
              {link.text}
            </span>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-teal-500 transform group-hover:translate-x-1 transition-all" />
          </a>
        ))}
      </div>

      {/* Read More / Less Toggle */}
      {hasMore && (
        <div className="text-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-1 text-teal-600 font-bold hover:text-teal-800 hover:underline transition-colors text-sm md:text-base"
          >
            {isExpanded ? 'Read Less' : 'View All Links'}
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      )}
    </div>
  );
};

// ==========================================
// 4. The Container Component (Use this)
// ==========================================

interface QuickLinksContainerProps {
  id: string; // The ID to look up in the array
}

export const QuickLinksContainer: React.FC<QuickLinksContainerProps> = ({ id }) => {
  // 1. Find Data
  const data = QUICK_LINKS_DATA.find((item) => item.id === id);

  // 2. Safety Check
  if (!data) {
    console.warn(`QuickLinksContainer: No data found for id "${id}"`);
    return null;
  }

  // 3. Render
  return <QuickLinks data={data} />;
};

export default QuickLinksContainer;