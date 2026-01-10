'use client';
import React from 'react';
import { ChevronRight, Landmark, ArrowRightLeft } from 'lucide-react';

// Define the data interface
interface CityOffer {
  id: string;
  cityName: string;
  imageSrc?: string;
}

// Data array mimicking major city hubs for loan refinancing
const cities: CityOffer[] = [
  { id: 'delhi', cityName: 'Delhi NCR' },
  { id: 'hyd', cityName: 'Hyderabad' },
  { id: 'blr', cityName: 'Bangalore' },
  { id: 'chn', cityName: 'Chennai' },
  { id: 'kol', cityName: 'Kolkata' },
  { id: 'mum', cityName: 'Mumbai' },
];

const CityTransferOffers: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-2xl border border-gray-50 shadow-sm">
      {/* Header with Transfer Context */}
      <div className="flex items-center gap-3 mb-2">
        <ArrowRightLeft className="w-6 h-6 text-teal-600" />
        <h2 className="text-2xl font-bold font-serif text-gray-900">
          Switch & Save: Balance Transfer in Your City
        </h2>
      </div>
      <p className="text-gray-500 mb-8 text-sm md:text-base">
        Connect with local bank branches offering special interest rate cuts for loan refinancing in your region.
      </p>

      

      {/* Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-1">
        {cities.map((city) => (
          <div 
            key={city.id} 
            className="group flex items-center justify-between py-5 border-b border-gray-100 cursor-pointer hover:bg-teal-50/40 px-3 rounded-lg transition-all duration-200"
          >
            <div className="flex items-center gap-4">
              {/* Icon Container with Refinancing Theme */}
              <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center shrink-0 border border-teal-100">
                {city.imageSrc ? (
                  <img 
                    src={city.imageSrc} 
                    alt={city.cityName} 
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <Landmark className="w-6 h-6 text-teal-600" />
                )}
              </div>

              {/* Text Content */}
              <div className="flex flex-col">
                <span className="text-[11px] uppercase tracking-wider text-teal-600 font-bold">
                  Refinance Loan in
                </span>
                <span className="text-lg font-semibold text-gray-900 group-hover:text-teal-700 transition-colors">
                  {city.cityName}
                </span>
              </div>
            </div>

            {/* Action Indicator */}
            <div className="flex items-center gap-2">
                <span className="hidden group-hover:block text-xs font-medium text-teal-600 animate-in fade-in slide-in-from-right-2">
                    View Rates
                </span>
                <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-teal-600 transform group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        ))}
      </div>

      {/* Localized Footer */}
      <div className="mt-8 p-4 bg-gray-50 rounded-xl flex items-center justify-between">
        <p className="text-xs text-gray-500">
            *Availability of door-step document pickup may vary by locality within the city.
        </p>
        <button className="text-xs font-bold text-teal-600 hover:underline">
            View All Cities
        </button>
      </div>
    </div>
  );
};

export default CityTransferOffers;