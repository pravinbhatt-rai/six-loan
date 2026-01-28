"use client";
import React, { useState, FC, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import {
    ChevronDown, Menu, X, LayoutDashboard, User as UserIcon, FileText, LogOut,
    Shield, Crown, Calculator, TrendingUp, CreditCard, Banknote, BookOpen,
    Gauge, Landmark, Briefcase, HeartHandshake, Percent, Headset,
    Home, Building2, Coins, MoreHorizontal, ChevronRight, Phone,
    Car,
    Bike,
    User,
    PackageXIcon
} from 'lucide-react';
import { Label } from 'recharts';

// --- DATA STRUCTURES ---

interface SubLink {
    subItems?: any;
    name: string;
    href: string;
}

interface MenuColumn {
    title: string;
    icon?: React.ReactNode;
    items: SubLink[];
}

interface NavItem {
    name: string;
    href?: string;
    columns?: MenuColumn[]; // Standard Mega Menu
    tabs?: {                // Tabbed Mega Menu (For Loans)
        id: string;
        label: string;
        icon: React.ReactNode;
        columns: MenuColumn[];
    }[];
}

// --- DATA CONFIGURATION (DESKTOP) ---

const NAV_DATA: NavItem[] = [
    {

        name: 'Loans',
        tabs: [
            {
                id: 'personal',
                label: 'Personal Loan',
                icon: <UserIcon className="w-4 h-4" />,
                columns: [
                    {
                        title: 'Overview',
                        icon: <FileText className="w-4 h-4 text-teal-500" />,
                        items: [
                            { name: 'Personal Loan', href: '/personalLoan' },
                            { name: 'Pre Approved Personal Loan', href: '/personalLoan/preApproved' },
                            { name: 'Personal Loan Interest Rates', href: '/personalLoan/InterestRates' },
                            { name: 'Personal Loan Low CIBIL Score', href: '/personalLoan/lowCibil' },
                            { name: 'Personal Loan Balance Transfer', href: '/transferPersonalLoan' },
                        ]
                    },
                    {
                        title: 'By Amount',
                        icon: <Banknote className="w-4 h-4 text-teal-500" />,
                        items: [
                            { name: '5 Lakh Loan', href: '/personalLoan/5-lakh' },
                            { name: '10 Lakh Loan', href: '/personalLoan/10-lakh' },
                            { name: '20 Lakh Loan', href: '/personalLoan/20-lakh' },
                            { name: '30 Lakh Loan', href: '/personalLoan/30-lakh' },
                            { name: '40 Lakh Loan', href: '/personalLoan/40-lakh' },
                            { name: '50 Lakh Loan', href: '/personalLoan/50-lakh' },
                        ]
                    },
                    {
                        title: 'By Type',
                        icon: <UserIcon className="w-4 h-4 text-teal-500" />,
                        items: [
                            { name: 'Loan for Salaried Employees', href: '/personalLoan/salaried' },
                            { name: 'Loan for Self Employed', href: '/personalLoan/self-employed' },
                            { name: 'Loan For Senior Citizens', href: '/personalLoan/seniors' },
                            { name: 'Loan for Students', href: '/educationLoan' },
                            { name: 'Loan for Doctors', href: '/personalLoan/doctors' },
                            { name: 'Loan for Women', href: '/personalLoan/women' },
                        ]
                    },
                    {
                        title: 'By Need',
                        icon: <HeartHandshake className="w-4 h-4 text-teal-500" />,
                        items: [
                            { name: 'Medical Loan', href: '/personalLoan/medical' },
                            { name: 'Travel Loan', href: '/personalLoan/travel' },
                            { name: 'Debit Consolidation Loan', href: '/personalLoan/consolidation' },
                            { name: 'Wedding Loan', href: '/personalLoan/wedding' },
                            { name: 'Overdraft Loan', href: '/personalLoan/overdraft' },
                            { name: 'Flexi Loan', href: '/personalLoan/flexi' },
                            { name: 'Short Term Loan', href: '/personalLoan/short-term' },
                            { name: 'Term Loan', href: '/personalLoan/term' },
                        ]
                    }
                ]
            },
            {
                id: 'business',
                label: 'Business Loan',
                icon: <Briefcase className="w-4 h-4" />,
                columns: [
                    {
                        title: 'Overview',
                        icon: <FileText className="w-4 h-4 text-teal-500" />,
                        items: [
                            { name: 'Business Loan', href: '/businessLoan' },
                            { name: 'Business Loan Interest Rates', href: '/businessLoan/rates' },
                            { name: 'Business Loan low CIBIL Score', href: '/businessLoan/low-cibil' },
                        ]
                    },
                    {
                        title: 'By Schemes',
                        icon: <Building2 className="w-4 h-4 text-teal-500" />,
                        items: [
                            { name: 'Dairy Farming Loan', href: '/businessLoan/dairy' },
                            { name: 'Small Business Loan', href: '/businessLoan/small' },
                            { name: 'Goat Farming Loan', href: '/businessLoan/goat' },
                            { name: 'Startups Loan', href: '/businessLoan/startup' },
                            { name: 'Poultry Farm Loan', href: '/businessLoan/poultry' },
                            { name: 'Professional Loan', href: '/professionalLoan' },
                        ]
                    },
                ]
            },
            {
                id: 'home',
                label: 'Home Loan',
                icon: <Home className="w-4 h-4" />,
                columns: [
                    {
                        title: 'Overview',
                        icon: <FileText className="w-4 h-4 text-teal-500" />,
                        items: [
                            { name: 'Home Loan', href: '/homeLoan' },
                            { name: 'Home Loan Interest Rates', href: '/homeLoan/rates' },
                            { name: 'Home Loan Balance Transfer', href: '/transferHomeLoan' },
                            { name: 'Home Loan Low CIBIL Score', href: '/homeLoan/low-cibil' },
                        ]
                    },
                    {
                        title: 'By Amount',
                        icon: <Banknote className="w-4 h-4 text-teal-500" />,
                        items: [
                            { name: '10 Lakh Home Loan', href: '/homeLoan/10-lakh' },
                            { name: '15 Lakh Home Loan', href: '/homeLoan/15-lakh' },
                            { name: '20 Lakh Home Loan', href: '/homeLoan/20-lakh' },
                            { name: '30 Lakh Home Loan', href: '/homeLoan/30-lakh' },
                            { name: '40 Lakh Home Loan', href: '/homeLoan/40-lakh' },
                            { name: '60 Lakh Home Loan', href: '/homeLoan/60-lakh' },
                        ]
                    },
                    {
                        title: 'By Schemes',
                        icon: <Building2 className="w-4 h-4 text-teal-500" />,
                        items: [
                            { name: 'Home Renovation Loan', href: '/homeLoan/renovation' },
                            { name: 'Plot Loan', href: '/homeLoan/plot' },
                            { name: 'Top up Home Loan', href: '/homeLoan/top-up' },
                            { name: 'Home Construction Loan', href: '/homeLoan/construction' },
                            { name: 'NRI Home Loan', href: '/homeLoan/nri' },
                            { name: 'Home Extension Loan', href: '/homeLoan/extension' },
                        ]
                    },
                    {
                        title: 'By Profession',
                        icon: <Briefcase className="w-4 h-4 text-teal-500" />,
                        items: [
                            { name: 'Home Loan for Self Employed', href: '/homeLoan/self-employed' },
                            { name: 'Home Loan for Women', href: '/homeLoan/women' },
                        ]
                    }
                ]
            },
            {
                id: 'loan against property',
                label: 'Loan Against Property',
                icon: <Home className="w-4 h-4" />,
                columns: [
                    {
                        title: 'By Amount',
                        icon: <Banknote className="w-4 h-4 text-teal-500" />,
                        items: [
                            { name: '5 Lakh Loan', href: '/LoanAgainstProperty/5-lakh' },
                            { name: '10 Lakh Loan', href: '/LoanAgainstProperty/10-lakh' },
                            { name: '20 Lakh Loan', href: '/LoanAgainstProperty/20-lakh' },
                            { name: '30 Lakh Loan', href: '/LoanAgainstProperty/30-lakh' },
                            { name: '40 Lakh Loan', href: '/LoanAgainstProperty/40-lakh' },
                            { name: '50 Lakh Loan', href: '/LoanAgainstProperty/50-lakh' },
                            { name: '75 Lakh Loan', href: '/LoanAgainstProperty/75-lakh' },
                            { name: '1 Crore Loan', href: '/LoanAgainstProperty/1-crore' },
                            { name: '2 Crore Loan', href: '/LoanAgainstProperty/2-crore' },
                        ]
                    },
                ]
            },
            {
                id: 'loan against security',
                label: 'Loan Against Security',
                icon: <Coins className="w-4 h-4" />,
                columns: [
                    {
                        title: 'By Amount',
                        icon: <Banknote className="w-4 h-4 text-teal-500" />,
                        items: [
                            { name: '5 Lakh Loan', href: '/loanAgainstSecurity/5-lakh' },
                            { name: '10 Lakh Loan', href: '/loanAgainstSecurity/10-lakh' },
                            { name: '20 Lakh Loan', href: '/loanAgainstSecurity/20-lakh' },
                            { name: '30 Lakh Loan', href: '/loanAgainstSecurity/30-lakh' },
                            { name: '40 Lakh Loan', href: '/loanAgainstSecurity/40-lakh' },
                            { name: '50 Lakh Loan', href: '/loanAgainstSecurity/50-lakh' },
                            { name: '75 Lakh Loan', href: '/loanAgainstSecurity/75-lakh' },
                            { name: '1 Crore Loan', href: '/loanAgainstSecurity/1-crore' },
                            { name: '2 Crore Loan', href: '/loanAgainstSecurity/2-crore' },

                        ]
                    },
                ]
            },
            {
                id: 'two wheeler',
                label: 'Two Wheeler Loan',
                icon: <Bike className="w-4 h-4" />,
                columns: [
                    {
                        title: 'Overview',
                        icon: <FileText className="w-4 h-4 text-teal-500" />,
                        items: [
                            {
                                name: 'Used Two Wheeler Loan',
                                href: '/usedBike',
                                subItems: [
                                    { name: '50 Thousand', href: '/usedBike/50k' },
                                    { name: '1 Lakh', href: '/usedBike/1-lakh' },
                                    { name: '2 Lakh', href: '/usedBike/2-lakh' },
                                    { name: '3 Lakh', href: '/usedBike/3-lakh' },
                                    { name: '4 Lakh', href: '/usedBike/4-lakh' },
                                    { name: '5 Lakh', href: '/usedBike/5-lakh' },
                                    { name: '10 Lakh', href: '/usedBike/10-lakh' },
                                    { name: '15 Lakh', href: '/usedBike/15-lakh' },
                                    { name: '20 Lakh', href: '/usedBike/20-lakh' },
                                ]
                            },
                            {
                                name: 'New Two Wheeler Loan', href: '/newBike',
                                subItems: [
                                    { name: '50 Thousand', href: '/newBike/50k' },
                                    { name: '1 Lakh', href: '/newBike/1-lakh' },
                                    { name: '2 Lakh', href: '/newBike/2-lakh' },
                                    { name: '3 Lakh', href: '/newBike/3-lakh' },
                                    { name: '4 Lakh', href: '/newBike/4-lakh' },
                                    { name: '5 Lakh', href: '/newBike/5-lakh' },
                                    { name: '10 Lakh', href: '/newBike/10-lakh' },
                                    { name: '15 Lakh', href: '/newBike/15-lakh' },
                                    { name: '20 Lakh', href: '/newBike/20-lakh' },

                                ]
                            },
                        ]
                    }
                ]
            },
            {
                id: 'Car Loan',
                label: 'Car Loan',
                icon: <Car className="w-4 h-4" />,
                columns: [
                    {
                        title: 'Overview',
                        icon: <FileText className="w-4 h-4 text-teal-500" />,
                        items: [
                            {
                                name: 'Used Car Loan',
                                href: '/usedCar',
                                subItems: [
                                    { name: '3 Lakh', href: '/usedCar/3-lakh' },
                                    { name: '4 Lakh', href: '/usedCar/4-lakh' },
                                    { name: '5 Lakh', href: '/usedCar/5-lakh' },
                                    { name: '6 Lakh', href: '/usedCar/6-lakh' },
                                    { name: '7 Lakh', href: '/usedCar/7-lakh' },
                                    { name: '8 Lakh', href: '/usedCar/8-lakh' },
                                    { name: '9 Lakh', href: '/usedCar/9-lakh' },
                                    { name: '10 Lakh', href: '/usedCar/10-lakh' },
                                    { name: '15 Lakh', href: '/usedCar/15-lakh' },
                                    { name: '20 Lakh', href: '/usedCar/20-lakh' },
                                    { name: '25 Lakh', href: '/usedCar/25-lakh' },
                                    { name: '30 Lakh', href: '/usedCar/30-lakh' },
                                    { name: '35 Lakh', href: '/usedCar/35-lakh' },
                                    { name: '40 Lakh', href: '/usedCar/40-lakh' },
                                    { name: '45 Lakh', href: '/usedCar/45-lakh' },
                                    { name: '50 Lakh', href: '/usedCar/50-lakh' },
                                    { name: '75 Lakh', href: '/usedCar/75-lakh' },
                                    { name: '1 Crore', href: '/usedCar/1-crore' },
                                ]
                            },
                            {
                                name: 'New Car Loan', href: '/newCar',
                                subItems: [
                                    { name: '3 Lakh', href: '/newCar/3-lakh' },
                                    { name: '4 Lakh', href: '/newCar/4-lakh' },
                                    { name: '5 Lakh', href: '/newCar/5-lakh' },
                                    { name: '6 Lakh', href: '/newCar/6-lakh' },
                                    { name: '7 Lakh', href: '/newCar/7-lakh' },
                                    { name: '8 Lakh', href: '/newCar/8-lakh' },
                                    { name: '9 Lakh', href: '/newCar/9-lakh' },
                                    { name: '10 Lakh', href: '/newCar/10-lakh' },
                                    { name: '15 Lakh', href: '/newCar/15-lakh' },
                                    { name: '20 Lakh', href: '/newCar/20-lakh' },
                                    { name: '25 Lakh', href: '/newCar/25-lakh' },
                                    { name: '30 Lakh', href: '/newCar/30-lakh' },
                                    { name: '35 Lakh', href: '/newCar/35-lakh' },
                                    { name: '40 Lakh', href: '/newCar/40-lakh' },
                                    { name: '45 Lakh', href: '/newCar/45-lakh' },
                                    { name: '50 Lakh', href: '/newCar/50-lakh' },
                                    { name: '75 Lakh', href: '/newCar/75-lakh' },
                                    { name: '1 Crore', href: '/newCar/1-crore' },
                                ]
                            },
                        ]
                    }
                ]
            },


            {
                id: 'other',
                label: 'Other Loans',
                icon: <MoreHorizontal className="w-4 h-4" />,
                columns: [
                    {
                        title: 'Loan Types',
                        icon: <Coins className="w-4 h-4 text-teal-500" />,
                        items: [
                            { name: 'Education Loan', href: '/educationLoan' },
                        ]
                    }
                ]
            }

        ]
    },
    {
        name: 'Credit Cards',
        columns: [
            {
                title: 'Overview',
                icon: <FileText className="w-4 h-4 text-teal-500" />,
                items: [
                    { name: 'Credit Card', href: '/creditinfo' },
                    { name: 'Best Credit Cards', href: '/creditinfo/25-best-credit-cards-india' },
                    // { name: 'Credit Card Interest Rate', href: '/cards/rates' },
                    // { name: 'CIBIL Score for Credit Card', href: '/cards/cibil' },
                    { name: 'Credit Card Rewards Calculator', href: '/creditinfo/reward-calculator' },
                    { name: 'Credit Card Eligibility', href: '/creditinfo/eligibility' },
                    { name: 'Compare Credit Cards', href: '/creditcards' },
                ]
            },
            {
                title: 'By Category',
                icon: <CreditCard className="w-4 h-4 text-teal-500" />,
                items: [
                    { name: 'Cashback Credit Cards', href: '/creditinfo/cashback' },
                    { name: 'Rewards Credit Cards', href: '/creditinfo/rewards' },
                    { name: 'Credit Card Lounge Access', href: '/creditinfo/lounge' },
                    { name: 'OneCard Credit Cards', href: '/creditinfo/onecard' },
                    { name: 'Fuel Credit Cards', href: '/creditinfo/fuel' },
                    { name: 'Travel Credit Cards', href: '/creditinfo/travel' },
                    { name: 'International Credit Cards', href: '/creditinfo/international' },
                    { name: 'Zero Forex Markup Credit Cards', href: '/creditinfo/forex' },
                    { name: 'Secured Credit Cards', href: '/creditinfo/secured' },
                ]
            }
        ]
    },
    {
        name: 'Debit Cards',
        columns: [
            {
                title: 'Overview',
                icon: <FileText className="w-4 h-4 text-teal-500" />,
                items: [
                    { name: 'Debit Cards', href: '/debitinfo' },
                    { name: 'Best Debit Cards', href: '/debitinfo/best-debit-cards' },
                    { name: 'Debit Card Finder', href: '/debitinfo/finder' },
                    { name: 'Live Offers', href: '/debitinfo/offers' },
                    { name: 'ATM Finder', href: '/debitinfo/atm-finder' },
                    { name: 'Compare Debit Cards', href: '/debitcard' },
                    { name: 'Upgrade Card', href: '/debitinfo/upgrade' },
                ]
            },
            {
                title: 'By Category',
                icon: <CreditCard className="w-4 h-4 text-teal-500" />,
                items: [
                    { name: 'Cashback Debit Cards', href: '/debitinfo/cashback' },
                    { name: 'Zero Fee Cards', href: '/debitinfo/zero-fee' },
                    { name: 'International Cards', href: '/debitinfo/international' },
                    { name: 'Lounge Access Cards', href: '/debitinfo/lounge-access' },
                    { name: 'Safety & Security', href: '/debitinfo/safety' },
                    { name: 'Smart Spend Guide', href: '/debitinfo/smart-spend' },
                ]
            }
        ]
    },
    {
        name: 'Learn & Resources',
        columns: [
            {
                title: 'Learn',
                icon: <BookOpen className="w-4 h-4 text-teal-500" />,
                items: [
                    { name: 'Aadhaar Card', href: '/aadhaar' },
                    { name: 'PAN Card', href: '/pan' },
                    { name: 'Debit Card', href: '/debit-card' },
                    { name: 'PPF (Public Provident Fund)', href: '/ppf' },
                    { name: 'NetBanking', href: '/netbanking' },
                    { name: 'EPF (Employee Provident Fund)', href: '/epf' },
                    { name: 'Income Tax', href: '/incometax' },
                ]
            }
        ]
    }
];

// --- COMPONENTS ---

const TalkToExpertDropdown: FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsOpen(false);
        }, 150);
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    return (
        <div
            className="relative z-40 flex items-center h-full ml-4"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <button className="flex items-center gap-2 bg-teal-50 text-teal-700 hover:bg-teal-100 hover:text-teal-800 border border-teal-200 font-semibold px-4 py-2 rounded-lg transition-all duration-200">
                <Headset className="w-5 h-5" />
                <span>Talk to Expert</span>
            </button>

            {isOpen && (
                <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 p-5 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                            <Headset className="w-6 h-6 text-teal-500" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">Talk to Expert</h3>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <p className="text-sm text-gray-500 mb-0.5">Sales Enquiry</p>
                            <div className="flex items-center gap-1">
                                <span className="font-semibold text-gray-900 text-sm">Call Us:</span>
                                <a href="tel:18005703888" className="font-bold text-teal-600 hover:underline">1800 570 3888</a>
                            </div>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500 mb-0.5">Service Helpline</p>
                            <div className="flex items-center gap-1">
                                <span className="font-semibold text-gray-900 text-sm">Call Us:</span>
                                <a href="tel:18002585616" className="font-bold text-teal-600 hover:underline">1800 258 5616</a>
                            </div>
                        </div>

                        <div className="pt-3 border-t border-gray-100">
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Our Advisors are available 7 days a week, <span className="font-bold text-gray-900">9:30 am - 6:30 pm</span> to assist you with the best offers or help resolve any queries.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const MegaMenuDropdown: FC<{ item: NavItem }> = ({ item }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<string>(item.tabs ? item.tabs[0].id : '');
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsOpen(false);
        }, 150);
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    let widthClass = "w-64";
    if (item.tabs) widthClass = "w-[1000px] -left-52"; 
    else if (item.columns) {
        const gridCols = item.columns.length;
        if (gridCols === 2) widthClass = "w-[500px]";
        if (gridCols === 3) widthClass = "w-[800px]";
        if (gridCols >= 4) widthClass = "w-[1000px] left-[-200px]";
    }

    return (
        <div
            className="relative h-full flex items-center px-1"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <button
                className={`flex items-center text-[15px] font-medium transition-all duration-200 py-2 ${isOpen ? 'text-teal-600' : 'text-gray-700 hover:text-teal-600'
                    }`}
            >
                {item.name}
                <ChevronDown className={`w-4 h-4 ml-1.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
            </button>

            {isOpen && (
                <div className={`absolute top-full z-20  ${item.tabs ? '-left-20' : 'left-0'}`}>
                    <div
                        className={`bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-teal-100 overflow-hidden ${widthClass} ${item.tabs ? 'flex' : 'p-6 grid gap-8'}`}
                        style={!item.tabs && item.columns ? { gridTemplateColumns: `repeat(${item.columns.length}, minmax(0, 1fr))` } : {}}
                    >
                        {item.tabs && (
                            <>
                                <div className="w-64 bg-gray-50 flex flex-col border-r border-gray-100 py-4">
                                    {item.tabs.map((tab) => (
                                        <button
                                            key={tab.id}
                                            onMouseEnter={() => setActiveTab(tab.id)}
                                            className={`w-full text-left px-6 py-3.5 text-sm font-semibold flex items-center gap-3 transition-colors relative ${activeTab === tab.id
                                                ? 'text-teal-600 bg-white'
                                                : 'text-gray-600 hover:text-teal-600 hover:bg-gray-100'
                                                }`}
                                        >
                                            {activeTab === tab.id && (
                                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-teal-500" />
                                            )}
                                            <span className={`${activeTab === tab.id ? 'text-teal-500' : 'text-gray-400'}`}>{tab.icon}</span>
                                            {tab.label}
                                        </button>
                                    ))}
                                </div>

                                <div className="flex-1 p-8 bg-white min-h-[400px]">
                                    {item.tabs.map((tab) => {
                                        if (tab.id !== activeTab) return null;
                                        return (
                                            <div key={tab.id} className="grid grid-cols-3 gap-8">
                                                {tab.columns.map((col, idx) => (
                                                    <div key={idx} className="flex flex-col gap-3">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            {col.icon}
                                                            <h3 className="font-semibold text-gray-900 text-sm">{col.title}</h3>
                                                        </div>
                                                        <div className="flex flex-col gap-2">
                                                            {col.items.map((subItem, subIdx) => (
                                                                <div key={subIdx} className="relative group/nested">
                                                                    <Link
                                                                        href={subItem.href}
                                                                        className="flex items-center justify-between text-sm text-gray-600 hover:text-teal-600 hover:underline transition-colors py-1"
                                                                    >
                                                                        {subItem.name}
                                                                        {subItem.subItems && <ChevronRight className="w-3 h-3 ml-2" />}
                                                                    </Link>

                                                                    {subItem.subItems && (
                                                                        <div className="absolute left-full top-0 ml-2 w-96 bg-white border border-gray-100 shadow-2xl rounded-xl p-4 invisible group-hover/nested:visible opacity-0 group-hover/nested:opacity-100 transition-all duration-200 z-50">
                                                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 border-b border-gray-50 pb-2">
                                                                                Select Amount
                                                                            </p>
                                                                            <div className="grid grid-cols-2 ">
                                                                                {subItem.subItems.map((nested: SubLink, nIdx: number) => (
                                                                                    <Link
                                                                                        key={nIdx}
                                                                                        href={nested.href}
                                                                                        className="text-[13px] text-gray-600 hover:text-teal-600 hover:bg-teal-50  rounded-lg transition-all flex items-center gap-2 whitespace-nowrap"
                                                                                    >
                                                                                        <div className="w-1 h-1 rounded-full bg-teal-400" />
                                                                                        {nested.name}
                                                                                    </Link>
                                                                                ))}
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        );
                                    })}
                                </div>
                            </>
                        )}

                        {!item.tabs && item.columns && item.columns.map((col, idx) => (
                            <div key={idx} className="flex flex-col gap-3">
                                <div className="flex items-center gap-2 mb-1">
                                    {col.icon}
                                    <h3 className="font-semibold text-gray-900 text-sm">{col.title}</h3>
                                </div>
                                <div className="flex flex-col gap-2">
                                    {col.items.map((subItem, subIdx) => (
                                        <Link
                                            key={subIdx}
                                            href={subItem.href}
                                            className="text-sm text-gray-600 hover:text-teal-600 hover:underline transition-colors leading-tight"
                                        >
                                            {subItem.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

const MobileNavAccordion: FC<{
    label: string;
    icon: React.ReactNode;
    data: MenuColumn[] | undefined;
    isOpen: boolean;
    onToggle: () => void;
    onCloseMenu: () => void;
}> = ({ label, icon, data, isOpen, onToggle, onCloseMenu }) => {
    return (
        <div className="border-b border-gray-100 last:border-0">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between py-4 active:bg-gray-50 transition-colors"
            >
                <div className="flex items-center gap-4">
                    <span className="text-gray-600">{icon}</span>
                    <span className="text-[15px] font-medium text-gray-800">{label}</span>
                </div>
                <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} />
            </button>

            <div className={`overflow-hidden transition-all duration-300 ${isOpen && data ? 'max-h-[1000px] opacity-100 pb-4' : 'max-h-0 opacity-0'}`}>
                {data && (
                    <div className="pl-10 space-y-4 pt-2">
                        {data.map((col, colIdx) => (
                            <div key={colIdx}>
                                <h4 className="text-xs font-bold text-teal-600 uppercase tracking-wider mb-2">
                                    {col.title}
                                </h4>
                                <div className="flex flex-col gap-2 border-l-2 border-gray-100 pl-3">
                                    {col.items.map((subItem, subIdx) => (
                                        <Link
                                            key={subIdx}
                                            href={subItem.href}
                                            className="text-sm text-gray-600 hover:text-teal-600 py-1"
                                            onClick={onCloseMenu}
                                        >
                                            {subItem.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};


const Navbar: FC = () => {
    const router = useRouter();
    const pathname = usePathname();

    if (pathname && pathname.startsWith('/login')) return null;

    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [userName, setUserName] = useState<string>('');
    const [userRole, setUserRole] = useState<string>('');
    const [showMobileUserMenu, setShowMobileUserMenu] = useState<boolean>(false);
    const [isExpertModalOpen, setIsExpertModalOpen] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const name = localStorage.getItem('userName');
        const user = localStorage.getItem('user');

        setIsLoggedIn(!!token);
        setUserName(name || '');

        if (user) {
            try {
                const userData = JSON.parse(user);
                setUserRole(userData.role || '');
            } catch (e) {
                setUserRole('');
            }
        }
    }, []);

    const handleMobileSubmenuToggle = (name: string) => {
        setMobileSubmenu(mobileSubmenu === name ? null : name);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('userName');
        setIsLoggedIn(false);
        setUserName('');
        router.push('/');
    };

    const getLoansTab = (id: string) => NAV_DATA.find(n => n.name === 'Loans')?.tabs?.find(t => t.id === id)?.columns;
    const getSection = (name: string) => NAV_DATA.find(n => n.name === name)?.columns;

    const MOBILE_MENU_ITEMS = [
        { label: 'Personal Loan', icon: <Banknote className="w-5 h-5" />, data: getLoansTab('personal') },
        { label: 'Credit Cards', icon: <CreditCard className="w-5 h-5" />, data: getSection('Credit Cards') },
        { label: 'Debit Cards', icon: <CreditCard className="w-5 h-5" />, data: getSection('Debit Cards') },
        { label: 'Business Loan', icon: <Briefcase className="w-5 h-5" />, data: getLoansTab('business') },
        { label: 'Home Loan', icon: <Home className="w-5 h-5" />, data: getLoansTab('home') },
        { label: 'Other Loans', icon: <Coins className="w-5 h-5" />, data: getLoansTab('other') },
        { label: 'Learn & Resources', icon: <BookOpen className="w-5 h-5" />, data: getSection('Learn & Resources') },
        
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 border-b border-gray-200 bg-white z-50 font-sans shadow-[0_6px_20px_rgba(0,0,0,0.06)]">
            <div className="bg-white w-full">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-[72px] lg:h-20">

                        {/* --- Mobile View Header --- */}
                        <div className="flex lg:hidden items-center justify-between w-full">
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="text-gray-800 p-1 focus:outline-none"
                                >
                                    {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                                </button>
                                <Link href="/" className="flex items-center">
                                    <img src="/six-finance.png" alt="Logo" className="h-10 w-auto" />
                                </Link>
                            </div>

                            <div className="flex items-center gap-1.5">
                                <button
                                    onClick={() => setIsExpertModalOpen(true)}
                                    className="flex items-center gap-1 px-2.5 py-1.5 border border-teal-600 rounded-md text-teal-600 text-[11px] font-semibold hover:bg-teal-50 transition-colors shrink-0"
                                >
                                    <Phone className="w-3 h-3 fill-teal-600" />
                                    Expert
                                </button>

                                {isLoggedIn ? (
                                    <div className="relative">
                                        <button
                                            onClick={() => setShowMobileUserMenu(!showMobileUserMenu)}
                                            className="flex items-center justify-center w-8 h-8 rounded-full bg-teal-100 text-teal-700 font-bold text-xs border border-teal-200"
                                        >
                                            {userName.charAt(0).toUpperCase()}
                                        </button>

                                        {showMobileUserMenu && (
                                            <>
                                                <div className="fixed inset-0 z-40" onClick={() => setShowMobileUserMenu(false)} />
                                                <div className="absolute right-0 mt-2 w-52 bg-white rounded-lg shadow-xl z-50 border border-gray-200 overflow-hidden">
                                                    {(userRole === 'ADMIN' || userRole === 'MODERATOR') && (
                                                        <button onClick={() => { router.push('/dashboard'); setShowMobileUserMenu(false); }} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-purple-50">
                                                            <Shield className="w-4 h-4" /> Admin
                                                        </button>
                                                    )}
                                                    <button onClick={() => { router.push('/user/dashboard'); setShowMobileUserMenu(false); }} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-teal-50">
                                                        <LayoutDashboard className="w-4 h-4" /> Dashboard
                                                    </button>
                                                     <button onClick={() => { router.push('/user/profile'); setShowMobileUserMenu(false); }} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-teal-50">
                                                        <User className="w-4 h-4" /> Profile
                                                    </button>
                                                       <button onClick={() => { router.push('/user/application'); setShowMobileUserMenu(false); }} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-teal-50">
                                                        <PackageXIcon className="w-4 h-4" /> Application
                                                    </button>
                                                    <div className="border-t border-gray-100" />
                                                    <button onClick={() => { handleLogout(); setShowMobileUserMenu(false); }} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50">
                                                        <LogOut className="w-4 h-4" /> Logout
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                ) : (
                                    <button onClick={() => router.push('/login')} className="flex items-center gap-1 px-2 py-1.5 border border-teal-600 rounded-md text-teal-600 hover:bg-teal-50 transition-colors">
                                        <UserIcon className="w-4 h-4" />
                                        <ChevronDown className="w-3 h-3" />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* --- Desktop Logo (Left) --- */}
                        <div className="hidden lg:flex shrink-0 items-center">
                            <Link href="/" className="inline-flex items-center">
                                <img src="/six-finance.png" alt="Company Logo" className="h-16 w-auto" />
                            </Link>
                        </div>

                        {/* --- Desktop Navigation --- */}
                        <div className="hidden lg:flex items-center justify-center gap-4 h-full">
                            {NAV_DATA.map((item, index) => (
                                <MegaMenuDropdown key={index} item={item} />
                            ))}
                        </div>

                        {/* --- Desktop Right Section --- */}
                        <div className="hidden lg:flex items-center">
                            {isLoggedIn ? (
                                <div className="relative h-full flex items-center group">
                                    <button className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-teal-50 transition-colors">
                                        <p className="text-sm font-semibold text-gray-900">Hi, <span className="text-teal-600">{userName}</span></p>
                                        <ChevronDown className="w-4 h-4 text-gray-400 group-hover:rotate-180 transition-transform" />
                                    </button>
                                    <div className="absolute top-full right-0 pt-2 w-56 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 z-50">
                                        <div className="rounded-xl shadow-xl bg-white border border-gray-100 p-2">
                                             {(userRole === 'ADMIN' || userRole === 'MODERATOR') && (
                                                        <button onClick={() => { router.push('/dashboard'); setShowMobileUserMenu(false); }} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-purple-50">
                                                            <Shield className="w-4 h-4" /> Admin
                                                        </button>
                                                    )}
                                                    
                                            <button onClick={() => router.push('/user/dashboard')} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-teal-50 rounded-lg">
                                                <LayoutDashboard className="w-4 h-4" /> Dashboard
                                            </button>

                                                <button onClick={() => router.push('/user/profile')} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-teal-50 rounded-lg">
                                                <User className="w-4 h-4" /> Profile
                                            </button>
                                                <button onClick={() => router.push('/user/application')} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-teal-50 rounded-lg">
                                                <PackageXIcon  className="w-4 h-4" /> Application
                                            </button>
                                            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg">
                                                <LogOut className="w-4 h-4" /> Logout
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <button onClick={() => router.push('/login')} className="bg-teal-500 text-white font-medium py-2 px-6 rounded-lg hover:bg-teal-600 transition-all">
                                    Sign In
                                </button>
                            )}
                            <TalkToExpertDropdown />
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Mobile Menu Drawer --- */}
            <div className={`lg:hidden fixed inset-0 z-40 bg-gray-900/20 backdrop-blur-sm transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsMenuOpen(false)} />
            <div className={`lg:hidden fixed top-0 left-0 bottom-0 w-[80%] max-w-sm bg-white z-50 overflow-y-auto transition-transform duration-300 shadow-2xl ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex flex-col h-full">
                    <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                        <img src="/six-finance.png" alt="Logo" className="h-10 w-auto" />
                        <button onClick={() => setIsMenuOpen(false)} className="text-gray-400 p-1">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto px-4 py-2">
                        {MOBILE_MENU_ITEMS.map((item, index) => (
                            <MobileNavAccordion
                                key={index}
                                label={item.label}
                                icon={item.icon}
                                data={item.data}
                                isOpen={mobileSubmenu === item.label}
                                onToggle={() => handleMobileSubmenuToggle(item.label)}
                                onCloseMenu={() => setIsMenuOpen(false)}
                            />
                        ))}
                    </div>

                    <div className="p-4 bg-gray-50 border-t border-gray-100 space-y-3">
                        {!isLoggedIn && (
                            <button onClick={() => router.push('/login')} className="w-full flex items-center justify-center gap-2 bg-teal-500 text-white font-bold py-3 rounded-xl shadow-lg">
                                <UserIcon className="w-5 h-5" /> Sign In
                            </button>
                        )}
                        {isLoggedIn && (
                            <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 text-red-600 font-semibold py-2">
                                <LogOut className="w-4 h-4" /> Logout
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* --- Mobile Talk to Expert Modal --- */}
            {isExpertModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setIsExpertModalOpen(false)} />
                    <div className="relative bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95">
                        <div className="flex items-center justify-between p-5 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center">
                                    <Headset className="w-5 h-5 text-teal-600" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900">Talk to Expert</h3>
                            </div>
                            <button onClick={() => setIsExpertModalOpen(false)} className="p-2 bg-gray-100 rounded-full">
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Sales Enquiry</p>
                                <div className="flex items-center justify-between bg-teal-50/50 p-3 rounded-xl border border-teal-100">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-500">Call Us</span>
                                        <span className="font-bold text-gray-900">1800 570 3888</span>
                                    </div>
                                    <a href="tel:18005703888" className="bg-teal-600 text-white text-xs font-bold px-4 py-2 rounded-lg">Call</a>
                                </div>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Service Helpline</p>
                                <div className="flex items-center justify-between bg-blue-50/50 p-3 rounded-xl border border-blue-100">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-500">Call Us</span>
                                        <span className="font-bold text-gray-900">1800 258 5616</span>
                                    </div>
                                    <a href="tel:18002585616" className="bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-lg">Call</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;