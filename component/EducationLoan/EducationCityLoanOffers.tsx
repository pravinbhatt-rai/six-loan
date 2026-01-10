import React from 'react';
import { ChevronRight, Building2 } from 'lucide-react';

// Define the data interface
interface CityOffer {
  id: string;
  cityName: string;
  imageSrc?: string; // Optional: URL to your specific city illustration
}

// Data array mimicking the cities in your image
const cities: CityOffer[] = [
  { id: 'delhi', cityName: 'Delhi' },
  { id: 'hyd', cityName: 'Hyderabad' },
  { id: 'blr', cityName: 'Bangalore' },
  { id: 'chn', cityName: 'Chennai' },
  { id: 'kol', cityName: 'Kolkata' },
  { id: 'mum', cityName: 'Mumbai' },
];

const EducationCityLoanOffers: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-white">
      {/* Header */}
      <h2 className="text-2xl font-bold font-serif text-gray-900 mb-8">
        Check Education Loan Offers in Your City
      </h2>

      {/* Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
        {cities.map((city) => (
          <div 
            key={city.id} 
            className="group flex items-center justify-between py-6 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
          >
            <div className="flex items-center gap-4">
              {/* Image / Icon Container */}
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                {city.imageSrc ? (
                  <img 
                    src={city.imageSrc} 
                    alt={city.cityName} 
                    className="w-full h-full object-contain"
                  />
                ) : (
                  // Fallback icon if no image is provided
                  <Building2 className="w-6 h-6 text-blue-500" />
                )}
              </div>

              {/* Text Content */}
              <div className="flex flex-col">
                <span className="text-sm text-gray-500 font-normal">
                  Education Loan in
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
    </div>
  );
};

export default EducationCityLoanOffers;