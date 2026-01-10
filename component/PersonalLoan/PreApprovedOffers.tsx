import React from 'react';

// ==========================================
// 1. Data Definitions
// ==========================================

interface LoanOffer {
  lenderName: string;
  rateText: string;
  link?: string;
}

interface OfferCategoryData {
  id: string; // The lookup key
  title: string;
  description: string;
  linkText?: string;
  col1Header: string;
  col2Header: string;
  offers: LoanOffer[];
}

// ==========================================
// 2. Centralized Data (The "Database")
// ==========================================

const OFFERS_DATA: OfferCategoryData[] = [
  // 1. Personal Loan
  {
    id: 'personal-loan',
    title: "Pre-approved Personal Loan Offers",
    description: "Compare interest rates of pre-approved personal loans available on Six Loan. These loans often require zero documentation for existing customers.",
    linkText: "pre-approved personal loan",
    col1Header: "Bank/NBFC",
    col2Header: "Interest Rates (p.a.)",
    offers: [
      { lenderName: "HDFC Bank", rateText: "10.50% onwards" },
      { lenderName: "ICICI Bank", rateText: "10.75% onwards" },
      { lenderName: "Aditya Birla Capital", rateText: "12.99% onwards" },
      { lenderName: "IndusInd Bank", rateText: "11.00% onwards" },
      { lenderName: "Tata Capital", rateText: "11.99% onwards" },
    ]
  },
  // 2. Home Loan
  {
    id: 'home-loan',
    title: "Top Home Loan Interest Rates",
    description: "We partner with India's leading banks and HFCs to bring you the lowest mortgage rates linked to the Repo Rate.",
    linkText: "home loan rates",
    col1Header: "Lender",
    col2Header: "Interest Rate (Floating)",
    offers: [
      { lenderName: "SBI Home Loans", rateText: "8.40% onwards" },
      { lenderName: "HDFC Bank", rateText: "8.35% onwards" },
      { lenderName: "LIC Housing Finance", rateText: "8.50% onwards" },
      { lenderName: "Kotak Mahindra Bank", rateText: "8.40% onwards" },
      { lenderName: "PNB Housing", rateText: "8.75% onwards" },
    ]
  },
  // 3. Business Loan
  {
    id: 'business-loan',
    title: "Business Loan Offers",
    description: "Access unsecured capital for your enterprise. Compare offers from top NBFCs specializing in MSME finance.",
    linkText: "business loan offers",
    col1Header: "Lender",
    col2Header: "Interest Rate (p.a.)",
    offers: [
      { lenderName: "Bajaj Finserv", rateText: "17.00% onwards" },
      { lenderName: "LendingKart", rateText: "1.5% per month" },
      { lenderName: "Tata Capital", rateText: "16.50% onwards" },
      { lenderName: "IDFC First Bank", rateText: "14.00% onwards" },
      { lenderName: "NeoGrowth", rateText: "18.00% onwards" },
    ]
  },
  // 4. Transfer Personal Loan
  {
    id: 'transfer-personal-loan',
    title: "Balance Transfer Offers",
    description: "Switch your high-cost personal loan to these lenders to reduce your EMI burden immediately.",
    linkText: "balance transfer rates",
    col1Header: "Bank",
    col2Header: "Transfer Rate (p.a.)",
    offers: [
      { lenderName: "HDFC Bank", rateText: "10.40% onwards" },
      { lenderName: "Axis Bank", rateText: "10.49% onwards" },
      { lenderName: "Standard Chartered", rateText: "10.99% onwards" },
      { lenderName: "IDFC First Bank", rateText: "10.75% onwards" },
    ]
  },
  // 5. Professional Loan
  {
    id: 'professional-loan',
    title: "Exclusive Rates for Professionals",
    description: "Doctors and CAs get preferential rates. Here are the top offers for professionals.",
    linkText: "professional loan rates",
    col1Header: "Lender",
    col2Header: "Special Rate (p.a.)",
    offers: [
      { lenderName: "Poonawalla Fincorp", rateText: "9.99% onwards" },
      { lenderName: "Bajaj Finserv (Doctor Loan)", rateText: "11.00% onwards" },
      { lenderName: "HDFC Bank", rateText: "10.50% onwards" },
      { lenderName: "ICICI Bank", rateText: "10.75% onwards" },
    ]
  },
  // 6. Loan Against Property (LAP)
  {
    id: 'loan-against-property',
    title: "Loan Against Property Rates",
    description: "Unlock high-value funds at rates cheaper than personal loans by pledging your property.",
    col1Header: "Lender",
    col2Header: "LAP Interest Rates",
    offers: [
      { lenderName: "Godrej Capital", rateText: "9.00% onwards" },
      { lenderName: "PNB Housing", rateText: "9.25% onwards" },
      { lenderName: "HDFC Bank", rateText: "9.50% onwards" },
      { lenderName: "Cholamandalam", rateText: "10.00% onwards" },
    ]
  },
  // 7. Transfer Home Loan
  {
    id: 'transfer-home-loan',
    title: "Home Loan Balance Transfer",
    description: "Reduce your mortgage EMI by switching to these top lenders offering balance transfer facilities.",
    col1Header: "Lender",
    col2Header: "Transfer Rate",
    offers: [
      { lenderName: "SBI", rateText: "8.40% onwards" },
      { lenderName: "Union Bank of India", rateText: "8.35% onwards" },
      { lenderName: "Bank of Baroda", rateText: "8.40% onwards" },
    ]
  },
  // 8. Education Loan
  {
    id: 'education-loan',
    title: "Education Loan Partners",
    description: "Fund your studies in India or abroad with our partners specializing in student loans.",
    col1Header: "Lender",
    col2Header: "ROI (approx)",
    offers: [
      { lenderName: "HDFC Credila", rateText: "10.50% onwards" },
      { lenderName: "Avanse", rateText: "11.00% onwards" },
      { lenderName: "SBI Scholar", rateText: "8.65% onwards" },
      { lenderName: "IDFC First Bank", rateText: "10.00% onwards" },
    ]
  },
  // 9. Loan Against Security
  {
    id: 'loan-against-security',
    title: "LAS Interest Rates",
    description: "Get an overdraft limit against your shares/mutual funds from these providers.",
    col1Header: "Lender",
    col2Header: "Interest Rate",
    offers: [
      { lenderName: "HDFC Bank", rateText: "9.50% onwards" },
      { lenderName: "Tata Capital", rateText: "10.50% onwards" },
      { lenderName: "Bajaj Finance", rateText: "9.00% onwards" },
    ]
  },
  // 10. Used Car Loan
  {
    id: 'used-car-loan',
    title: "Used Car Finance Offers",
    description: "Buy your dream pre-owned car with finance options from these top auto lenders.",
    col1Header: "Bank/NBFC",
    col2Header: "Interest Rate",
    offers: [
      { lenderName: "HDFC Bank", rateText: "12.50% onwards" },
      { lenderName: "Mahindra Finance", rateText: "13.00% onwards" },
      { lenderName: "IDFC First Bank", rateText: "13.50% onwards" },
    ]
  },
  // 11. Used Bike Loan
  {
    id: 'used-bike-loan',
    title: "Used Two-Wheeler Loans",
    description: "Get on the road quickly with these finance options for used bikes.",
    col1Header: "Lender",
    col2Header: "Interest Rate",
    offers: [
      { lenderName: "BikeBazaar", rateText: "18.00% onwards" },
      { lenderName: "IDFC First Bank", rateText: "16.00% onwards" },
      { lenderName: "Shriram Finance", rateText: "19.00% onwards" },
    ]
  },
  // 12. New Car Loan
  {
    id: 'new-car-loan',
    title: "New Car Loan Rates",
    description: "Drive home your new vehicle with the most competitive auto loan rates.",
    col1Header: "Bank",
    col2Header: "Fixed/Floating Rate",
    offers: [
      { lenderName: "SBI Car Loan", rateText: "8.65% (Fixed)" },
      { lenderName: "Canara Bank", rateText: "8.70% (Floating)" },
      { lenderName: "Axis Bank", rateText: "9.00% onwards" },
    ]
  },
  // 13. New Bike Loan
  {
    id: 'new-bike-loan',
    title: "Two-Wheeler Loan Offers",
    description: "Finance your daily commute or superbike with these lenders.",
    col1Header: "Lender",
    col2Header: "Rate (p.a.)",
    offers: [
      { lenderName: "HDFC Bank", rateText: "14.50% onwards" },
      { lenderName: "L&T Finance", rateText: "15.00% onwards" },
      { lenderName: "TVS Credit", rateText: "16.00% onwards" },
    ]
  }
];

// ==========================================
// 3. The Presentational Component
// ==========================================

interface OffersProps {
  data: OfferCategoryData;
  className?: string;
}

const PreApprovedOffers: React.FC<OffersProps> = ({ data, className }) => {
  return (
    <div className={`
      max-w-6xl mx-auto mb-8 bg-white text-gray-800 font-serif
      p-4 md:p-8
      border-0 md:border md:border-gray-200
      rounded-none md:rounded-3xl
      shadow-none md:shadow-sm
      ${className || ''}
    `}>
      
      {/* Content Header */}
      <div className="mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          {data.title}
        </h2>
        
        <div className="space-y-4 text-gray-700 leading-relaxed text-sm md:text-base">
          <p>
            {data.description}
            {data.linkText && (
              <>
                {' '}Check your eligibility for a{' '}
                <a href="#" className="text-teal-500 font-medium hover:underline">
                  {data.linkText}
                </a>
                {' '}today.
              </>
            )}
          </p>
        </div>
      </div>

      {/* Table Section */}
      <div className="w-full overflow-x-auto rounded-lg border border-gray-100 md:border-0">
        <table className="w-full text-left border-collapse min-w-[500px]">
          <thead>
            <tr className="bg-teal-50 border-b border-teal-100">
              <th className="p-3 md:p-5 font-bold text-gray-900 w-1/2 text-sm md:text-base">
                {data.col1Header}
              </th>
              <th className="p-3 md:p-5 font-bold text-gray-900 w-1/2 text-sm md:text-base">
                {data.col2Header}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.offers.map((offer, index) => (
              <tr 
                key={index} 
                className="hover:bg-teal-50/20 transition-colors duration-150"
              >
                <td className="p-3 md:p-5 font-medium text-sm md:text-base">
                  <a 
                    href={offer.link || "#"} 
                    className="text-teal-600 hover:text-teal-700 hover:underline font-semibold"
                  >
                    {offer.lenderName}
                  </a>
                </td>
                <td className="p-3 md:p-5 text-gray-700 text-sm md:text-base">
                  {offer.rateText}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    </div>
  );
};

// ==========================================
// 4. The Container Component (Use this)
// ==========================================

interface OffersContainerProps {
  id: string; // The ID to look up in the array
  className?: string;
}

export const OffersContainer: React.FC<OffersContainerProps> = ({ id, className }) => {
  // 1. Find Data
  const data = OFFERS_DATA.find((item) => item.id === id);

  // 2. Safety Check
  if (!data) {
    console.warn(`OffersContainer: No data found for id "${id}"`);
    return null;
  }

  // 3. Render
  return <PreApprovedOffers data={data} className={className} />;
};

export default OffersContainer;