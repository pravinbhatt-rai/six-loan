"use client";
import React, { FC, useState } from 'react';

// 1. Updated Interface: Added 'domain' and 'hex' for better logo handling
interface Partner {
    id: string;
    name: string;
    categories: string[];
    domain: string; // Used to fetch the real logo
    hex: string;    // Brand color for the fallback placeholder
    bgColorClass: string; // Tailwind class for the card background
}

// 2. Data for Banking Partners (Mapped to real domains for logos)
const partnersData: Partner[] = [
    // --- Public Sector Banks (12) ---
    { id: 'psb-1', name: 'State Bank of India', categories: ['Public Sector'], domain: 'sbi.co.in', hex: '280071', bgColorClass: 'bg-blue-50' },
    { id: 'psb-2', name: 'Punjab National Bank', categories: ['Public Sector'], domain: 'pnbindia.in', hex: 'A20E19', bgColorClass: 'bg-red-50' },
    { id: 'psb-3', name: 'Bank of Baroda', categories: ['Public Sector'], domain: 'bankofbaroda.in', hex: 'F05A22', bgColorClass: 'bg-orange-50' },
    { id: 'psb-4', name: 'Canara Bank', categories: ['Public Sector'], domain: 'canarabank.com', hex: '0060AC', bgColorClass: 'bg-blue-50' },
    { id: 'psb-5', name: 'Union Bank of India', categories: ['Public Sector'], domain: 'unionbankofindia.co.in', hex: 'E60028', bgColorClass: 'bg-red-50' },
    { id: 'psb-6', name: 'Bank of India', categories: ['Public Sector'], domain: 'bankofindia.co.in', hex: 'F18222', bgColorClass: 'bg-orange-50' },
    { id: 'psb-7', name: 'Indian Bank', categories: ['Public Sector'], domain: 'indianbank.in', hex: '0A3266', bgColorClass: 'bg-blue-50' },
    { id: 'psb-8', name: 'Central Bank of India', categories: ['Public Sector'], domain: 'centralbankofindia.co.in', hex: '004C8F', bgColorClass: 'bg-blue-50' },
    { id: 'psb-9', name: 'Indian Overseas Bank', categories: ['Public Sector'], domain: 'iob.in', hex: '003C87', bgColorClass: 'bg-blue-50' },
    { id: 'psb-10', name: 'UCO Bank', categories: ['Public Sector'], domain: 'ucobank.com', hex: '164C8D', bgColorClass: 'bg-blue-50' },
    { id: 'psb-11', name: 'Bank of Maharashtra', categories: ['Public Sector'], domain: 'bankofmaharashtra.in', hex: 'F18C21', bgColorClass: 'bg-yellow-50' },
    { id: 'psb-12', name: 'Punjab & Sind Bank', categories: ['Public Sector'], domain: 'psbindia.com', hex: 'ED1C24', bgColorClass: 'bg-yellow-50' },

    // --- Private Sector Banks (21) ---
    { id: 'pvt-1', name: 'HDFC Bank', categories: ['Private Sector'], domain: 'hdfcbank.com', hex: '004C8F', bgColorClass: 'bg-blue-50' },
    { id: 'pvt-2', name: 'ICICI Bank', categories: ['Private Sector'], domain: 'icicibank.com', hex: 'F58220', bgColorClass: 'bg-orange-50' },
    { id: 'pvt-3', name: 'Axis Bank', categories: ['Private Sector'], domain: 'axisbank.com', hex: '97144D', bgColorClass: 'bg-pink-50' },
    { id: 'pvt-4', name: 'Kotak Mahindra Bank', categories: ['Private Sector'], domain: 'kotak.com', hex: 'ED1C24', bgColorClass: 'bg-red-50' },
    { id: 'pvt-5', name: 'IndusInd Bank', categories: ['Private Sector'], domain: 'indusind.com', hex: '841E1E', bgColorClass: 'bg-red-50' },
    { id: 'pvt-6', name: 'Yes Bank', categories: ['Private Sector'], domain: 'yesbank.in', hex: '005A9C', bgColorClass: 'bg-blue-50' },
    { id: 'pvt-7', name: 'IDFC FIRST Bank', categories: ['Private Sector'], domain: 'idfcfirstbank.com', hex: '9D1D24', bgColorClass: 'bg-red-50' },
    { id: 'pvt-8', name: 'Federal Bank', categories: ['Private Sector'], domain: 'federalbank.co.in', hex: 'E3A32A', bgColorClass: 'bg-yellow-50' },
    { id: 'pvt-9', name: 'IDBI Bank', categories: ['Private Sector'], domain: 'idbibank.in', hex: '2F847C', bgColorClass: 'bg-teal-50' },
    { id: 'pvt-10', name: 'Bandhan Bank', categories: ['Private Sector'], domain: 'bandhanbank.com', hex: '004B85', bgColorClass: 'bg-blue-50' },
    { id: 'pvt-11', name: 'South Indian Bank', categories: ['Private Sector'], domain: 'southindianbank.com', hex: 'D51D24', bgColorClass: 'bg-red-50' },
    { id: 'pvt-12', name: 'RBL Bank', categories: ['Private Sector'], domain: 'rblbank.com', hex: '004A98', bgColorClass: 'bg-blue-50' },
    { id: 'pvt-13', name: 'J&K Bank', categories: ['Private Sector'], domain: 'jkbank.com', hex: '00964A', bgColorClass: 'bg-green-50' },
    { id: 'pvt-14', name: 'Karnataka Bank', categories: ['Private Sector'], domain: 'karnatakabank.com', hex: '9C1B20', bgColorClass: 'bg-red-50' },
    { id: 'pvt-15', name: 'Karur Vysya Bank', categories: ['Private Sector'], domain: 'kvb.co.in', hex: '941517', bgColorClass: 'bg-red-50' },
    { id: 'pvt-16', name: 'City Union Bank', categories: ['Private Sector'], domain: 'cityunionbank.com', hex: 'E51A2C', bgColorClass: 'bg-red-50' },
    { id: 'pvt-17', name: 'Tamilnad Mercantile', categories: ['Private Sector'], domain: 'tmb.in', hex: 'D21528', bgColorClass: 'bg-red-50' },
    { id: 'pvt-18', name: 'CSB Bank', categories: ['Private Sector'], domain: 'csb.co.in', hex: 'F26522', bgColorClass: 'bg-orange-50' },
    { id: 'pvt-19', name: 'DCB Bank', categories: ['Private Sector'], domain: 'dcbbank.com', hex: '004F9F', bgColorClass: 'bg-blue-50' },
    { id: 'pvt-20', name: 'Dhanlaxmi Bank', categories: ['Private Sector'], domain: 'dhanbank.com', hex: '8B0E15', bgColorClass: 'bg-red-50' },
    { id: 'pvt-21', name: 'Nainital Bank', categories: ['Private Sector'], domain: 'nainitalbank.co.in', hex: '006837', bgColorClass: 'bg-green-50' },

    // --- Small Finance Banks (11) ---
    { id: 'sfb-1', name: 'AU Small Finance', categories: ['Small Finance'], domain: 'aubank.in', hex: '582C83', bgColorClass: 'bg-purple-50' },
    { id: 'sfb-2', name: 'Equitas SFB', categories: ['Small Finance'], domain: 'equitasbank.com', hex: '005596', bgColorClass: 'bg-blue-50' },
    { id: 'sfb-3', name: 'Ujjivan SFB', categories: ['Small Finance'], domain: 'ujjivansfb.in', hex: 'F58220', bgColorClass: 'bg-orange-50' },
    { id: 'sfb-4', name: 'Jana SFB', categories: ['Small Finance'], domain: 'janabank.com', hex: 'E31E24', bgColorClass: 'bg-red-50' },
    { id: 'sfb-5', name: 'Suryoday SFB', categories: ['Small Finance'], domain: 'suryodaybank.com', hex: 'FDB913', bgColorClass: 'bg-yellow-50' },
    { id: 'sfb-6', name: 'Utkarsh SFB', categories: ['Small Finance'], domain: 'utkarsh.bank', hex: '6E2C91', bgColorClass: 'bg-purple-50' },
    { id: 'sfb-7', name: 'ESAF SFB', categories: ['Small Finance'], domain: 'esafbank.com', hex: '005A9C', bgColorClass: 'bg-blue-50' },
    { id: 'sfb-8', name: 'Capital SFB', categories: ['Small Finance'], domain: 'capitalbank.co.in', hex: 'ED1C24', bgColorClass: 'bg-red-50' },
    { id: 'sfb-9', name: 'North East SFB', categories: ['Small Finance'], domain: 'nesfb.com', hex: '00964A', bgColorClass: 'bg-green-50' },
    { id: 'sfb-10', name: 'Shivalik SFB', categories: ['Small Finance'], domain: 'shivalikbank.com', hex: 'E31E24', bgColorClass: 'bg-red-50' },
    { id: 'sfb-11', name: 'Unity SFB', categories: ['Small Finance'], domain: 'theunitybank.com', hex: '222222', bgColorClass: 'bg-gray-50' },

    // --- Payments Banks (6) ---
    { id: 'pb-1', name: 'Airtel Payments', categories: ['Payments Bank'], domain: 'airtel.in', hex: 'ED1C24', bgColorClass: 'bg-red-50' },
    { id: 'pb-2', name: 'India Post Payments', categories: ['Payments Bank'], domain: 'ippbonline.com', hex: 'DA251C', bgColorClass: 'bg-red-50' },
    { id: 'pb-3', name: 'Fino Payments', categories: ['Payments Bank'], domain: 'finobank.com', hex: 'F58220', bgColorClass: 'bg-orange-50' },
    { id: 'pb-4', name: 'Jio Payments', categories: ['Payments Bank'], domain: 'jiopaymentsbank.com', hex: '0072BC', bgColorClass: 'bg-blue-50' },
    { id: 'pb-5', name: 'NSDL Payments', categories: ['Payments Bank'], domain: 'nsdlbank.com', hex: '2E3192', bgColorClass: 'bg-indigo-50' },
    { id: 'pb-6', name: 'Paytm Payments', categories: ['Payments Bank'], domain: 'paytmbank.com', hex: '002E6E', bgColorClass: 'bg-blue-50' },

    // --- Local Area Banks (2) ---
    { id: 'lab-1', name: 'Coastal Local Area', categories: ['Local Area'], domain: 'coastalareabank.com', hex: '00964A', bgColorClass: 'bg-green-50' },
    { id: 'lab-2', name: 'KBS Local Area', categories: ['Local Area'], domain: 'kbsbankindia.com', hex: 'F58220', bgColorClass: 'bg-orange-50' },

    // --- Regional Rural Banks (3 Examples) ---
    { id: 'rrb-1', name: 'Aryavart Bank', categories: ['Regional Rural'], domain: 'aryavart-rrb.com', hex: '4F46E5', bgColorClass: 'bg-indigo-50' },
    { id: 'rrb-2', name: 'Kerala Gramin', categories: ['Regional Rural'], domain: 'keralagbank.com', hex: '00964A', bgColorClass: 'bg-green-50' },
    { id: 'rrb-3', name: 'Prathama UP', categories: ['Regional Rural'], domain: 'prathamaupbank.com', hex: 'D97706', bgColorClass: 'bg-amber-50' },

    // --- Foreign Banks (5 Examples) ---
    { id: 'fb-1', name: 'Standard Chartered', categories: ['Foreign Bank'], domain: 'sc.com', hex: '00964A', bgColorClass: 'bg-green-50' },
    { id: 'fb-2', name: 'HSBC', categories: ['Foreign Bank'], domain: 'hsbc.co.in', hex: 'DB0011', bgColorClass: 'bg-red-50' },
    { id: 'fb-3', name: 'Deutsche Bank', categories: ['Foreign Bank'], domain: 'db.com', hex: '0018A8', bgColorClass: 'bg-blue-50' },
    { id: 'fb-4', name: 'DBS Bank', categories: ['Foreign Bank'], domain: 'dbs.com', hex: 'FF3333', bgColorClass: 'bg-red-50' },
    { id: 'fb-5', name: 'Bank of America', categories: ['Foreign Bank'], domain: 'bankofamerica.com', hex: '012169', bgColorClass: 'bg-blue-50' },
];

const filterCategories: string[] = [
    'Public Sector',
    'Private Sector',
    'Small Finance',
    'Payments Bank',
    'Local Area',
    'Regional Rural',
    'Foreign Bank',
];

// 3. Helper to construct Logo URLs
const getLogoUrl = (domain: string) => `https://logo.clearbit.com/${domain}`;
const getFallbackUrl = (name: string, hex: string) => 
    `https://placehold.co/100x40/${hex}/FFFFFF?text=${encodeURIComponent(name.split(' ')[0])}`;

// 4. Partner Logo Card Component with Fallback Logic
const PartnerLogoCard: FC<Partner> = ({ name, domain, hex, bgColorClass }) => {
    // We try to load the Clearbit logo first. If it fails, we swap the src to the placeholder.
    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        const target = e.target as HTMLImageElement;
        target.onerror = null; // Prevent infinite loop
        target.src = getFallbackUrl(name, hex);
    };

    return (
        <div className={`flex items-center justify-center p-3 sm:p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200 h-20 w-full ${bgColorClass}`}>
            <img
                src={getLogoUrl(domain)}
                alt={`${name} Logo`}
                className="max-w-full max-h-12 object-contain mix-blend-multiply" 
                onError={handleImageError}
                loading="lazy"
            />
        </div>
    );
};

interface FilterButtonProps {
    name: string;
    isActive: boolean;
    onClick: () => void;
}

const FilterButton: FC<FilterButtonProps> = ({ name, isActive, onClick }) => {
    const baseClasses = "px-6 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 cursor-pointer shadow-md whitespace-nowrap";

    return (
        <button
            onClick={onClick}
            className={isActive
                ? `${baseClasses} bg-gray-900 text-white hover:bg-gray-700`
                : `${baseClasses} bg-white text-gray-800 border border-gray-300 hover:bg-gray-50`
            }
            aria-pressed={isActive}
        >
            {name}
        </button>
    );
};

// 5. Main Component
const IndustryPartners: FC = () => {
    const [activeFilter, setActiveFilter] = useState<string>('All');

    const filteredPartners = partnersData.filter(partner =>
        activeFilter === 'All' || partner.categories.includes(activeFilter)
    );

    return (
        <div className="bg-white font-inter py-16 sm:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <header className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 tracking-tight sm:text-5xl">
                        Comprehensive list of banks
                    </h1>
                    <h2 className="text-4xl font-bold text-gray-900 tracking-tight sm:text-5xl mt-2">
                        operating in India (2025)
                    </h2>
                    <div className="mt-4 mx-auto h-1.5 w-64 bg-gray-800 rounded-full"></div>
                </header>

                {/* Filter Tabs */}
                <div className="mb-12 overflow-x-auto pb-4 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    <div className="flex space-x-4 justify-center md:justify-start w-fit mx-auto md:mx-0">
                        <FilterButton
                            name="All"
                            isActive={activeFilter === 'All'}
                            onClick={() => setActiveFilter('All')}
                        />
                        {filterCategories.map(category => (
                            <FilterButton
                                key={category}
                                name={category}
                                isActive={activeFilter === category}
                                onClick={() => setActiveFilter(category)}
                            />
                        ))}
                    </div>
                </div>
                <style>{`
                    .scrollbar-hide::-webkit-scrollbar { display: none; }
                    .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
                `}</style>

                {/* Partners Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
                    {filteredPartners.map(partner => (
                        <PartnerLogoCard
                            key={partner.id}
                            {...partner}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default IndustryPartners;