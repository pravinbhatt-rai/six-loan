"use client";
import React, { FC, useState, useMemo } from 'react';

// --- Types ---
interface Partner {
    id: string;
    name: string;
    categories: string[];
    domain: string; 
    hex: string;    
}

// --- YOUR ORIGINAL DATA (100% RESTORED) ---
const partnersData: Partner[] = [
    // --- Public Sector Banks (12) ---
    { id: 'psb-1', name: 'State Bank of India', categories: ['Public Sector'], domain: 'sbi.co.in', hex: '280071' },
    { id: 'psb-2', name: 'Punjab National Bank', categories: ['Public Sector'], domain: 'pnbindia.in', hex: 'A20E19' },
    { id: 'psb-3', name: 'Bank of Baroda', categories: ['Public Sector'], domain: 'bankofbaroda.in', hex: 'F05A22' },
    { id: 'psb-4', name: 'Canara Bank', categories: ['Public Sector'], domain: 'canarabank.com', hex: '0060AC' },
    { id: 'psb-5', name: 'Union Bank of India', categories: ['Public Sector'], domain: 'unionbankofindia.co.in', hex: 'E60028' },
    { id: 'psb-6', name: 'Bank of India', categories: ['Public Sector'], domain: 'bankofindia.co.in', hex: 'F18222' },
    { id: 'psb-7', name: 'Indian Bank', categories: ['Public Sector'], domain: 'indianbank.in', hex: '0A3266' },
    { id: 'psb-8', name: 'Central Bank of India', categories: ['Public Sector'], domain: 'centralbankofindia.co.in', hex: '004C8F' },
    { id: 'psb-9', name: 'Indian Overseas Bank', categories: ['Public Sector'], domain: 'iob.in', hex: '003C87' },
    { id: 'psb-10', name: 'UCO Bank', categories: ['Public Sector'], domain: 'ucobank.com', hex: '164C8D' },
    { id: 'psb-11', name: 'Bank of Maharashtra', categories: ['Public Sector'], domain: 'bankofmaharashtra.in', hex: 'F18C21' },
    { id: 'psb-12', name: 'Punjab & Sind Bank', categories: ['Public Sector'], domain: 'psbindia.com', hex: 'ED1C24' },

    // --- Private Sector Banks (21) ---
    { id: 'pvt-1', name: 'HDFC Bank', categories: ['Private Sector'], domain: 'hdfcbank.com', hex: '004C8F' },
    { id: 'pvt-2', name: 'ICICI Bank', categories: ['Private Sector'], domain: 'icicibank.com', hex: 'F58220' },
    { id: 'pvt-3', name: 'Axis Bank', categories: ['Private Sector'], domain: 'axisbank.com', hex: '97144D' },
    { id: 'pvt-4', name: 'Kotak Mahindra Bank', categories: ['Private Sector'], domain: 'kotak.com', hex: 'ED1C24' },
    { id: 'pvt-5', name: 'IndusInd Bank', categories: ['Private Sector'], domain: 'indusind.com', hex: '841E1E' },
    { id: 'pvt-6', name: 'Yes Bank', categories: ['Private Sector'], domain: 'yesbank.in', hex: '005A9C' },
    { id: 'pvt-7', name: 'IDFC FIRST Bank', categories: ['Private Sector'], domain: 'idfcfirstbank.com', hex: '9D1D24' },
    { id: 'pvt-8', name: 'Federal Bank', categories: ['Private Sector'], domain: 'federalbank.co.in', hex: 'E3A32A' },
    { id: 'pvt-9', name: 'IDBI Bank', categories: ['Private Sector'], domain: 'idbibank.in', hex: '2F847C' },
    { id: 'pvt-10', name: 'Bandhan Bank', categories: ['Private Sector'], domain: 'bandhanbank.com', hex: '004B85' },
    { id: 'pvt-11', name: 'South Indian Bank', categories: ['Private Sector'], domain: 'southindianbank.com', hex: 'D51D24' },
    { id: 'pvt-12', name: 'RBL Bank', categories: ['Private Sector'], domain: 'rblbank.com', hex: '004A98' },
    { id: 'pvt-13', name: 'Jammu & Kashmir Bank', categories: ['Private Sector'], domain: 'jkbank.com', hex: '00964A' },
    { id: 'pvt-14', name: 'Karnataka Bank', categories: ['Private Sector'], domain: 'karnatakabank.com', hex: '9C1B20' },
    { id: 'pvt-15', name: 'Karur Vysya Bank', categories: ['Private Sector'], domain: 'kvb.co.in', hex: '941517' },
    { id: 'pvt-16', name: 'City Union Bank', categories: ['Private Sector'], domain: 'cityunionbank.com', hex: 'E51A2C' },
    { id: 'pvt-17', name: 'Tamilnad Mercantile Bank', categories: ['Private Sector'], domain: 'tmb.in', hex: 'D21528' },
    { id: 'pvt-18', name: 'CSB Bank', categories: ['Private Sector'], domain: 'csb.co.in', hex: 'F26522' },
    { id: 'pvt-19', name: 'DCB Bank', categories: ['Private Sector'], domain: 'dcbbank.com', hex: '004F9F' },
    { id: 'pvt-20', name: 'Dhanlaxmi Bank', categories: ['Private Sector'], domain: 'dhanbank.com', hex: '8B0E15' },
    { id: 'pvt-21', name: 'Nainital Bank', categories: ['Private Sector'], domain: 'nainitalbank.co.in', hex: '006837' },

    // --- Small Finance Banks (11) ---
    { id: 'sfb-1', name: 'AU Small Finance Bank', categories: ['Small Finance'], domain: 'aubank.in', hex: '582C83' },
    { id: 'sfb-2', name: 'Equitas Small Finance Bank', categories: ['Small Finance'], domain: 'equitasbank.com', hex: '005596' },
    { id: 'sfb-3', name: 'Ujjivan Small Finance Bank', categories: ['Small Finance'], domain: 'ujjivansfb.in', hex: 'F58220' },
    { id: 'sfb-4', name: 'Jana Small Finance Bank', categories: ['Small Finance'], domain: 'janabank.com', hex: 'E31E24' },
    { id: 'sfb-5', name: 'Suryoday Small Finance Bank', categories: ['Small Finance'], domain: 'suryodaybank.com', hex: 'FDB913' },
    { id: 'sfb-6', name: 'Utkarsh Small Finance Bank', categories: ['Small Finance'], domain: 'utkarsh.bank', hex: '6E2C91' },
    { id: 'sfb-7', name: 'ESAF Small Finance Bank', categories: ['Small Finance'], domain: 'esafbank.com', hex: '005A9C' },
    { id: 'sfb-8', name: 'Capital Small Finance Bank', categories: ['Small Finance'], domain: 'capitalbank.co.in', hex: 'ED1C24' },
    { id: 'sfb-9', name: 'North East Small Finance Bank', categories: ['Small Finance'], domain: 'nesfb.com', hex: '00964A' },
    { id: 'sfb-10', name: 'Shivalik Small Finance Bank', categories: ['Small Finance'], domain: 'shivalikbank.com', hex: 'E31E24' },
    { id: 'sfb-11', name: 'Unity Small Finance Bank', categories: ['Small Finance'], domain: 'theunitybank.com', hex: '222222' },

    // --- Payments Banks (6) ---
    { id: 'pb-1', name: 'Airtel Payments Bank', categories: ['Payments Bank'], domain: 'airtel.in', hex: 'ED1C24' },
    { id: 'pb-2', name: 'India Post Payments Bank', categories: ['Payments Bank'], domain: 'ippbonline.com', hex: 'DA251C' },
    { id: 'pb-3', name: 'Fino Payments Bank', categories: ['Payments Bank'], domain: 'finobank.com', hex: 'F58220' },
    { id: 'pb-4', name: 'Jio Payments Bank', categories: ['Payments Bank'], domain: 'jiopaymentsbank.com', hex: '0072BC' },
    { id: 'pb-5', name: 'NSDL Payments Bank', categories: ['Payments Bank'], domain: 'nsdlbank.com', hex: '2E3192' },
    { id: 'pb-6', name: 'Paytm Payments Bank', categories: ['Payments Bank'], domain: 'paytmbank.com', hex: '002E6E' },

    // --- Local & Foreign Banks ---
    { id: 'lab-1', name: 'Coastal Local Area Bank', categories: ['Local Area'], domain: 'coastalareabank.com', hex: '00964A' },
    { id: 'fb-1', name: 'Standard Chartered Bank', categories: ['Foreign Bank'], domain: 'sc.com', hex: '00964A' },
    { id: 'fb-2', name: 'HSBC Bank', categories: ['Foreign Bank'], domain: 'hsbc.co.in', hex: 'DB0011' },
    { id: 'fb-3', name: 'Deutsche Bank', categories: ['Foreign Bank'], domain: 'db.com', hex: '0018A8' },
    { id: 'fb-4', name: 'DBS Bank', categories: ['Foreign Bank'], domain: 'dbs.com', hex: 'FF3333' },
    { id: 'fb-5', name: 'Bank of America', categories: ['Foreign Bank'], domain: 'bankofamerica.com', hex: '012169' },
];

const filterCategories = ['All', 'Public Sector', 'Private Sector', 'Small Finance', 'Payments Bank', 'Local Area', 'Foreign Bank'];

// --- Logo URL Generator with Multiple Fallback Strategies ---
const getLogoUrls = (partner: Partner): string[] => {
    const cleanName = partner.name.toLowerCase().replace(/bank|payments|small finance|co\.|ltd\.|limited/gi, '').trim().replace(/\s+/g, '-');
    const domain = partner.domain.replace('https://', '').replace('http://', '');
    
    // MULTIPLE STRATEGIES in order of preference:
    return [
        // 1. Clearbit API (high quality logos)
        `https://logo.clearbit.com/${domain}`,
        
        // 2. TSE API for Indian banks
        `https://tse1.mm.bing.net/th?q=${encodeURIComponent(partner.name + ' logo png')}&w=128&h=128&c=7&rs=1&p=0&dpr=3&pid=1.7`,
        
        // 3. Google Favicon with high DPI
        `https://www.google.com/s2/favicons?domain=${domain}&sz=256`,
        
        // 4. DuckDuckGo favicon
        `https://icons.duckduckgo.com/ip3/${domain}.ico`,
        
        // 5. Alternative favicon service
        `https://favicon.twenty.com/${domain}`,
        
        // 6. Wikimedia commons for known banks
        `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(partner.name.replace(/ /g, '_') + '_logo.svg')}?width=256`,
    ];
};

// --- Helper function to generate initials ---
const getInitials = (name: string): string => {
    const words = name.split(' ');
    const importantWords = words.filter(word => 
        !['bank', 'of', 'and', '&', 'the', 'small', 'finance', 'payments'].includes(word.toLowerCase())
    );
    
    if (importantWords.length === 0) {
        return words.slice(0, 2).map(w => w[0]).join('').toUpperCase();
    }
    
    if (importantWords.length >= 2) {
        return importantWords.slice(0, 2).map(word => word.charAt(0)).join('').toUpperCase();
    }
    
    return importantWords[0].charAt(0).toUpperCase() + 
           (importantWords[0].length > 1 ? importantWords[0].charAt(1).toUpperCase() : '');
};

// --- Components ---

const PartnerLogoCard: FC<Partner> = ({ name, domain, hex }) => {
    const [currentLogoIndex, setCurrentLogoIndex] = useState(0);
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    
    const logoUrls = getLogoUrls({ name, domain, hex } as Partner);
    const initials = getInitials(name);
    
    const handleImageError = () => {
        if (currentLogoIndex < logoUrls.length - 1) {
            // Try next logo source
            setCurrentLogoIndex(prev => prev + 1);
            setIsLoading(true);
        } else {
            // All sources failed, use initials
            setHasError(true);
            setIsLoading(false);
        }
    };

    const handleImageLoad = () => {
        setIsLoading(false);
    };

    // Calculate text color for fallback
    const getTextColor = (hexColor: string) => {
        const r = parseInt(hexColor.substr(0, 2), 16);
        const g = parseInt(hexColor.substr(2, 2), 16);
        const b = parseInt(hexColor.substr(4, 2), 16);
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        return brightness > 128 ? '#000000' : '#FFFFFF';
    };

    return (
        <div className="group flex flex-col items-center justify-center p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-teal-100/50 hover:-translate-y-1 transition-all duration-300 h-36 w-full bg-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: `#${hex}` }}></div>
            
            {/* Logo Container */}
            <div className="h-16 w-16 flex items-center justify-center mb-3 relative">
                {!hasError ? (
                    <>
                        {/* Loading Skeleton */}
                        {isLoading && (
                            <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-xl"></div>
                        )}
                        
                        {/* Actual Logo */}
                        <img
                            src={logoUrls[currentLogoIndex]}
                            alt={`${name} logo`}
                            className={`max-w-full max-h-full object-contain rounded-xl transition-all duration-300 group-hover:scale-110 ${
                                isLoading ? 'opacity-0' : 'opacity-100'
                            }`}
                            onError={handleImageError}
                            onLoad={handleImageLoad}
                            loading="lazy"
                            crossOrigin="anonymous"
                        />
                    </>
                ) : (
                    // Fallback Initials
                    <div 
                        className="h-16 w-16 flex items-center justify-center rounded-xl shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-500"
                        style={{ backgroundColor: `#${hex}` }}
                    >
                        <span 
                            className="text-2xl font-black tracking-tight"
                            style={{ color: getTextColor(hex) }}
                        >
                            {initials}
                        </span>
                    </div>
                )}
            </div>
            
            <p className="text-[11px] font-bold text-gray-500 text-center uppercase tracking-tight leading-tight line-clamp-2 group-hover:text-teal-600 transition-colors">
                {name}
            </p>
            
            {/* Debug info (remove in production) */}
            {process.env.NODE_ENV === 'development' && (
                <div className="absolute bottom-1 right-1 text-[8px] text-gray-400">
                    {hasError ? 'fallback' : `src:${currentLogoIndex + 1}`}
                </div>
            )}
        </div>
    );
};

const IndustryPartners: FC = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [showAll, setShowAll] = useState(false);

    const filteredPartners = useMemo(() => {
        return partnersData.filter(partner => {
            const matchesCategory = activeFilter === 'All' || partner.categories.includes(activeFilter);
            const matchesSearch = partner.name.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [activeFilter, searchQuery]);

    const isSearching = searchQuery !== '' || activeFilter !== 'All';
    const displayedPartners = (showAll || isSearching) ? filteredPartners : filteredPartners.slice(0, 12);

    // Stats for logos loaded
    const [stats, setStats] = useState({ loaded: 0, total: displayedPartners.length });

    return (
        <div className="bg-[#f8fafc] min-h-screen py-16 sm:py-24 font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl sm:text-6xl font-black text-gray-900 leading-tight">
                        Our Banking <span className="text-teal-500">Partners</span>
                    </h1>
                    <div className="mt-8 h-2 w-24 bg-teal-500 mx-auto rounded-full shadow-lg shadow-teal-200"></div>
                </div>

                {/* Filter & Search Bar */}
                <div className="bg-white p-6 rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100 mb-12 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            placeholder="Find your bank..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-14 pr-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-teal-500 focus:bg-white outline-none transition-all text-gray-700"
                        />
                        <svg className="w-6 h-6 text-gray-400 absolute left-5 top-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </div>

                    <div className="flex overflow-x-auto space-x-3 pb-3 lg:pb-0 no-scrollbar">
                        {filterCategories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => {setActiveFilter(cat); setShowAll(true);}}
                                className={`px-6 py-3.5 rounded-2xl text-sm font-extrabold whitespace-nowrap transition-all duration-300 ${
                                    activeFilter === cat ? 'bg-teal-500 text-white shadow-xl shadow-teal-200' : 'bg-teal-50 text-teal-700 hover:bg-teal-100 border border-teal-100'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Logo Loading Stats
                <div className="mb-6 text-center">
                    <div className="inline-flex items-center gap-4 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm">
                        <div className="text-left">
                            <div className="text-sm font-bold text-gray-600">Logo Success Rate</div>
                            <div className="text-xs text-gray-500">Multiple sources ensure best results</div>
                        </div>
                        <div className="h-10 w-10 rounded-full border-4 border-teal-200 flex items-center justify-center">
                            <span className="text-sm font-black text-teal-600">95%</span>
                        </div>
                    </div>
                </div> */}

                {/* Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 sm:gap-8">
                    {displayedPartners.map(partner => (
                        <PartnerLogoCard key={partner.id} {...partner} />
                    ))}
                </div>

                {/* Toggle Button */}
                {!showAll && !isSearching && filteredPartners.length > 12 && (
                    <div className="mt-20 text-center">
                        <button
                            onClick={() => setShowAll(true)}
                            className="inline-flex items-center px-12 py-5 bg-white border-2 border-teal-500 text-teal-600 font-black rounded-2xl hover:bg-teal-500 hover:text-white transition-all duration-500 shadow-2xl shadow-teal-100"
                        >
                            View All {partnersData.length} Banks
                        </button>
                    </div>
                )}
            </div>

            <style jsx>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                
                /* Better image rendering */
                img {
                    image-rendering: -webkit-optimize-contrast;
                    image-rendering: crisp-edges;
                }
            `}</style>
            
            {/* Add retry logic for failed images */}
            <script dangerouslySetInnerHTML={{
                __html: `
                    // Retry failed images after 2 seconds
                    setTimeout(() => {
                        document.querySelectorAll('img[src*="clearbit.com"]').forEach(img => {
                            if (img.naturalWidth === 0) {
                                const originalSrc = img.src;
                                img.src = '';
                                setTimeout(() => {
                                    img.src = originalSrc + '?retry=' + Date.now();
                                }, 100);
                            }
                        });
                    }, 2000);
                `
            }} />
        </div>
    );
};

export default IndustryPartners;