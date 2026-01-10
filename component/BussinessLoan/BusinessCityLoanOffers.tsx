'use client';
import React from 'react';
import { ChevronRight, Landmark } from 'lucide-react';

// Define the data interface
interface CityOffer {
  id: string;
  cityName: string;
  iconSrc?: string; 
}

// Data array remains the same, but we can expand it for business hubs
const cities: CityOffer[] = [
  { id: 'delhi', cityName: 'Delhi NCR' },
  { id: 'mum', cityName: 'Mumbai' },
  { id: 'blr', cityName: 'Bangalore' },
  { id: 'hyd', cityName: 'Hyderabad' },
  { id: 'chn', cityName: 'Chennai' },
  { id: 'kol', cityName: 'Kolkata' },
  { id: 'pune', cityName: 'Pune' },
  { id: 'ahd', cityName: 'Ahmedabad' },
];

const BusinessCityLoanOffers: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto p-6 md:p-10 bg-white">
      {/* Header */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold font-serif text-gray-900 mb-2">
          Business Loan Offers by City
        </h2>
        <p className="text-gray-500">
          Tailored commercial credit solutions for enterprises across India's major business hubs.
        </p>
      </div>

      {/* Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-2">
        {cities.map((city) => (
          <div 
            key={city.id} 
            className="group flex items-center justify-between py-6 border-b border-gray-100 cursor-pointer hover:bg-teal-50/30 transition-all duration-200 px-2 rounded-lg"
          >
            <div className="flex items-center gap-5">
              {/* Icon Container - Using the Teal Theme */}
              <div className="w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center shrink-0 group-hover:bg-teal-100 transition-colors">
                <Landmark className="w-7 h-7 text-teal-600" />
              </div>

              {/* Text Content */}
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-wider text-teal-600 font-bold">
                  Business Loan in
                </span>
                <span className="text-xl font-bold text-gray-900">
                  {city.cityName}
                </span>
              </div>
            </div>

            {/* Right Chevron */}
            <div className="p-2 rounded-full group-hover:bg-white shadow-sm transition-all">
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-teal-600" />
            </div>
          </div>
        ))}
      </div>

      {/* Footer link for other cities */}
      <div className="mt-12 text-center">
        <button className="text-teal-600 font-semibold hover:text-teal-700 underline underline-offset-4">
          Don't see your city? View all 100+ locations
        </button>
      </div>
    </div>
  );
};

export default BusinessCityLoanOffers;