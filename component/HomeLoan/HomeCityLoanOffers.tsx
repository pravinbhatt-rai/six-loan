import React from 'react';
import { ChevronRight, Building2 } from 'lucide-react';

// Define the data interface
interface CityOffer {
  id: string;
  cityName: string;
  imageSrc?: string; 
}

// Data remains the same, but the context in the component changes to Home Loans
const cities: CityOffer[] = [
  { id: 'delhi', cityName: 'Delhi NCR' },
  { id: 'hyd', cityName: 'Hyderabad' },
  { id: 'blr', cityName: 'Bangalore' },
  { id: 'chn', cityName: 'Chennai' },
  { id: 'kol', cityName: 'Kolkata' },
  { id: 'mum', cityName: 'Mumbai' },
];

const HomeCityLoanOffers: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-white">
      {/* Header - Updated with high-intent SEO keywords */}
      <h2 className="text-2xl font-bold font-serif text-gray-900 mb-8">
        Lowest Home Loan Interest Rates in Your City
      </h2>

      {/* Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
        {cities.map((city) => (
          <div 
            key={city.id} 
            className="group flex items-center justify-between py-6 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
            aria-label={`Check home loan offers in ${city.cityName}`}
          >
            <div className="flex items-center gap-4">
              {/* Image / Icon Container */}
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                {city.imageSrc ? (
                  <img 
                    src={city.imageSrc} 
                    alt={`Home Loan in ${city.cityName}`} 
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <Building2 className="w-6 h-6 text-blue-500" />
                )}
              </div>

              {/* Text Content - Updated from Personal Loan to Home Loan */}
              <div className="flex flex-col">
                <span className="text-sm text-gray-500 font-normal">
                  Home Loan in
                </span>
                <span className="text-lg font-semibold text-gray-900">
                  {city.cityName}
                </span>
              </div>
            </div>

            {/* Right Chevron */}
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
          </div>
        ))}
      </div>
      
      {/* Optional SEO Footer Note */}
      <p className="mt-6 text-xs text-gray-400 text-center">
        *Interest rates and home loan eligibility vary by city and bank partner.
      </p>
    </div>
  );
};

export default HomeCityLoanOffers;