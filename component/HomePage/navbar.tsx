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
    Bike
} from 'lucide-react';

// --- DATA STRUCTURES ---

interface SubLink {
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
                id: 'loan against property',
                label: 'Loan Against Property',
                icon: <Home className="w-4 h-4" />,
                columns: [
                    {
                        title: 'Overview',
                        icon: <FileText className="w-4 h-4 text-teal-500" />,
                        items: [
                            { name: 'Loan Against Property', href: '/LoanAgainstProperty' },
                            { name: 'Pre Approved Loan Against Property', href: '/loanAgainstProperty/preApproved' },
                            { name: 'Loan Against Property Interest Rates', href: '/loanAgainstProperty/InterestRates' },
                            { name: 'Loan Against Property Low CIBIL Score', href: '/loanAgainstProperty/lowCibil' },
                            { name: 'Loan Against Property Balance Transfer', href: '/transferLoanAgainstProperty' },
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
                ]
            },
            {
                id: 'loan against security',
                label: 'Loan Against Security',
                icon: <Coins className="w-4 h-4" />,
                columns: [
                    {
                        title: 'Overview',
                        icon: <FileText className="w-4 h-4 text-teal-500" />,
                        items: [
                            { name: 'Loan Against Security', href: '/loanAgainstSecurity' },
                            { name: 'Pre Approved Loan Against Security', href: '/loanAgainstSecurity/preApproved' },
                            { name: 'Loan Against Security Interest Rates', href: '/loanAgainstSecurity/InterestRates' },
                            { name: 'Loan Against Security Low CIBIL Score', href: '/loanAgainstSecurity/lowCibil' },
                            { name: 'Loan Against Security Balance Transfer', href: '/transferLoanAgainstSecurity' },
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
                            { name: 'Used Two Wheeler Loan', href: '/usedBike' },
                            { name: 'New Two Wheeler Loan', href: '/newBike' },

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
                ]
            },
            {
                id: 'car loan',
                label: 'Car Loan',
                icon: <Car className="w-4 h-4" />,
                columns: [
                    {
                        title: 'Overview',
                        icon: <FileText className="w-4 h-4 text-teal-500" />,
                        items: [
                            { name: 'Used Car Loan', href: '/usedCar' },
                            { name: 'New Car Loan', href: '/newCar' },

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
                            { name: 'Business Loan Interest Rates', href: '/loans/business/rates' },
                            { name: 'Business Loan low CIBIL Score', href: '/loans/business/low-cibil' },
                        ]
                    },
                    {
                        title: 'By Schemes',
                        icon: <Building2 className="w-4 h-4 text-teal-500" />,
                        items: [
                            { name: 'Dairy Farming Loan', href: '/loans/business/dairy' },
                            { name: 'Small Business Loan', href: '/loans/business/small' },
                            { name: 'Goat Farming Loan', href: '/loans/business/goat' },
                            { name: 'Startups Loan', href: '/loans/business/startup' },
                            { name: 'Poultry Farm Loan', href: '/loans/business/poultry' },
                            { name: 'Professional Loan', href: '/loans/business/professional' },
                        ]
                    },
                    {
                        title: 'By Need',
                        icon: <Coins className="w-4 h-4 text-teal-500" />,
                        items: [
                            { name: 'Mudra Loan', href: '/loans/business/mudra' },
                            { name: 'PMEGP Loan', href: '/loans/business/pmegp' },
                            { name: 'Letter of Credit', href: '/loans/business/loc' },
                            { name: 'CGTMSE Loan', href: '/loans/business/cgtmse' },
                            { name: 'Overdraft Loan', href: '/loans/business/overdraft' },
                            { name: 'Working Capital Loan', href: '/loans/business/working-capital' },
                        ]
                    },
                    {
                        title: 'By Profession',
                        icon: <UserIcon className="w-4 h-4 text-teal-500" />,
                        items: [
                            { name: 'Loan for CA', href: '/loans/business/ca' },
                            { name: 'Loan for Doctors', href: '/loans/business/doctors' },
                        ]
                    }
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
                            { name: 'Home Loan Interest Rates', href: '/loans/home/rates' },
                            { name: 'Home Loan Balance Transfer', href: '/loans/home/transfer' },
                            { name: 'Home Loan Low CIBIL Score', href: '/loans/home/low-cibil' },
                        ]
                    },
                    {
                        title: 'By Amount',
                        icon: <Banknote className="w-4 h-4 text-teal-500" />,
                        items: [
                            { name: '10 Lakh Home Loan', href: '/loans/home/10-lakh' },
                            { name: '15 Lakh Home Loan', href: '/loans/home/15-lakh' },
                            { name: '20 Lakh Home Loan', href: '/loans/home/20-lakh' },
                            { name: '30 Lakh Home Loan', href: '/loans/home/30-lakh' },
                            { name: '40 Lakh Home Loan', href: '/loans/home/40-lakh' },
                            { name: '60 Lakh Home Loan', href: '/loans/home/60-lakh' },
                        ]
                    },
                    {
                        title: 'By Schemes',
                        icon: <Building2 className="w-4 h-4 text-teal-500" />,
                        items: [
                            { name: 'Home Renovation Loan', href: '/loans/home/renovation' },
                            { name: 'Plot Loan', href: '/loans/home/plot' },
                            { name: 'Top up Home Loan', href: '/loans/home/top-up' },
                            { name: 'Home Construction Loan', href: '/loans/home/construction' },
                            { name: 'NRI Home Loan', href: '/loans/home/nri' },
                            { name: 'Home Extension Loan', href: '/loans/home/extension' },
                        ]
                    },
                    {
                        title: 'By Profession',
                        icon: <Briefcase className="w-4 h-4 text-teal-500" />,
                        items: [
                            { name: 'Home Loan for Self Employed', href: '/loans/home/self-employed' },
                            { name: 'Home Loan for Women', href: '/loans/home/women' },
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
                    { name: 'Credit Card', href: '/cards/overview' },
                    { name: 'Best Credit Cards', href: '/cards/best' },
                    { name: 'Credit Card Interest Rate', href: '/cards/rates' },
                    { name: 'CIBIL Score for Credit Card', href: '/cards/cibil' },
                    { name: 'Credit Card Rewards Calculator', href: '/cards/calculator' },
                    { name: 'Credit Card Eligibility', href: '/cards/eligibility' },
                    { name: 'Compare Credit Cards', href: '/cards/compare' },
                ]
            },
            {
                title: 'By Category',
                icon: <CreditCard className="w-4 h-4 text-teal-500" />,
                items: [
                    { name: 'Cashback Credit Cards', href: '/cards/cashback' },
                    { name: 'Rewards Credit Cards', href: '/cards/rewards' },
                    { name: 'Credit Card Lounge Access', href: '/cards/lounge' },
                    { name: 'OneCard Credit Cards', href: '/cards/onecard' },
                    { name: 'Fuel Credit Cards', href: '/cards/fuel' },
                    { name: 'Travel Credit Cards', href: '/cards/travel' },
                    { name: 'International Credit Cards', href: '/cards/international' },
                    { name: 'Zero Forex Markup Credit Cards', href: '/cards/forex' },
                    { name: 'Secured Credit Cards', href: '/cards/secured' },
                ]
            }
        ]
    },


    {
        name: 'Calculators',
        columns: [
            {
                title: 'Investment Calculators',
                icon: <TrendingUp className="w-4 h-4 text-teal-500" />,
                items: [
                    { name: 'Fixed Deposit Calculator', href: '/calc/fd' },
                    { name: 'GST Calculator', href: '/calc/gst' },
                    { name: 'Mutual Fund Calculator', href: '/calc/mf' },
                    { name: 'NPS Calculator', href: '/calc/nps' },
                    { name: 'Post Office FD Calculator', href: '/calc/post-office' },
                    { name: 'SIP Calculator', href: '/calc/sip' },
                ]
            },
            {
                title: 'Loan EMI Calculators',
                icon: <Percent className="w-4 h-4 text-teal-500" />,
                items: [
                    { name: 'Personal Loan EMI Calculator', href: '/calc/emi/personal' },
                    { name: 'Home Loan EMI Calculator', href: '/calc/emi/home' },
                    { name: 'Business Loan EMI Calculator', href: '/calc/emi/business' },
                    { name: 'Loan Against Property EMI Calculator', href: '/calc/emi/property' },
                    { name: 'Gold Loan EMI Calculator', href: '/calc/emi/gold' },
                    { name: 'Term Loan EMI Calculator', href: '/calc/emi/term' },
                    { name: 'Tractor Loan EMI Calculator', href: '/calc/emi/tractor' },
                    { name: 'Mudra Loan EMI Calculator', href: '/calc/emi/mudra' },
                ]
            },
            {
                title: 'Loan Eligibility Calculators',
                icon: <Calculator className="w-4 h-4 text-teal-500" />,
                items: [
                    { name: 'Personal Loan Eligibility Calculator', href: '/calc/eligibility/personal' },
                    { name: 'Home Loan Eligibility Calculator', href: '/calc/eligibility/home' },
                    { name: 'Home Loan Prepayment Calculator', href: '/calc/prepayment/home' },
                    { name: 'Personal Loan Prepayment Calculator', href: '/calc/prepayment/personal' },
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
            },
            // {
            //     title: 'Insurance and Investments',
            //     icon: <Shield className="w-4 h-4 text-teal-500" />,
            //     items: [
            //         { name: 'Health Insurance', href: '/learn/insurance/health' },
            //         { name: 'Investment Plan', href: '/learn/investment-plan' },
            //         { name: 'NPS (National Pension Scheme)', href: '/learn/nps' },
            //         { name: 'Term Life Insurance', href: '/learn/insurance/term' },
            //         { name: 'Car Insurance', href: '/learn/insurance/car' },
            //         { name: 'Retirement Plans', href: '/learn/retirement' },
            //     ]
            // }
        ]
    }
];

// --- COMPONENTS ---

// New Talk To Expert Dropdown Component
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

            {/* Dropdown Content */}
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

// Mega Menu Dropdown Component (Desktop Only)
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

    // Width calculation
    let widthClass = "w-64";
    if (item.tabs) widthClass = "w-[1000px] -left-52"; // Wide container for tabs
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

            {/* Dropdown Content */}
            {isOpen && (
                <div className={`absolute top-full z-20  ${item.tabs ? '-left-20' : 'left-0'}`}>
                    <div
                        className={`bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-teal-100 overflow-hidden ${widthClass} ${item.tabs ? 'flex' : 'p-6 grid gap-8'}`}
                        style={!item.tabs && item.columns ? { gridTemplateColumns: `repeat(${item.columns.length}, minmax(0, 1fr))` } : {}}
                    >
                        {/* === MODE 1: TABBED MENU (Like Screenshots) === */}
                        {item.tabs && (
                            <>
                                {/* Sidebar */}
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

                                {/* Content Area */}
                                <div className="flex-1 p-8 bg-white min-h-[400px]">
                                    {item.tabs.map((tab) => {
                                        if (tab.id !== activeTab) return null;
                                        return (
                                            <div key={tab.id} className="grid grid-cols-3 gap-8 animate-in fade-in duration-200">
                                                {tab.columns.map((col, idx) => (
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
                                        );
                                    })}
                                </div>
                            </>
                        )}

                        {/* === MODE 2: STANDARD COLUMNS === */}
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

// Mobile Nav Item Helper
// This component extracts specific data from the main NAV_DATA to render mobile accordions
// based on the specific flat structure requested in the screenshots.
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
                className="w-full flex items-center justify-between py-4 pr-2 active:bg-gray-50 transition-colors"
            >
                <div className="flex items-center gap-4">
                    <span className="text-gray-600">{icon}</span>
                    <span className="text-[15px] font-medium text-gray-800">{label}</span>
                </div>
                {/* Chevron rotates if open, otherwise points right like the screenshot */}
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

    // NEW STATE FOR EXPERT MODAL
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

    // --- Helpers to extract data for the flat mobile menu structure ---
    const getLoansTab = (id: string) => NAV_DATA.find(n => n.name === 'Loans')?.tabs?.find(t => t.id === id)?.columns;
    const getSection = (name: string) => NAV_DATA.find(n => n.name === name)?.columns;
    const getInvestmentSection = (title: string) => {
        const inv = NAV_DATA.find(n => n.name === 'Investment');
        return inv?.columns?.filter(c => c.title === title).map(c => ({ ...c, title: 'Options' })); // Simplify title for mobile view
    };

    // Mobile Menu Items Configuration (Matches Screenshot Order)
    const MOBILE_MENU_ITEMS = [
        { label: 'Personal Loan', icon: <Banknote className="w-5 h-5" />, data: getLoansTab('personal') },
        { label: 'Credit Score', icon: <Gauge className="w-5 h-5" />, data: getSection('Credit Score') },
        { label: 'Credit Cards', icon: <CreditCard className="w-5 h-5" />, data: getSection('Credit Cards') },
        { label: 'Business Loan', icon: <Briefcase className="w-5 h-5" />, data: getLoansTab('business') },
        { label: 'Home Loan', icon: <Home className="w-5 h-5" />, data: getLoansTab('home') },
        { label: 'Bonds', icon: <FileText className="w-5 h-5" />, data: getInvestmentSection('Bonds') },
        { label: 'Fixed Deposit', icon: <Landmark className="w-5 h-5" />, data: getInvestmentSection('Fixed Deposit') },
        { label: 'Mutual Funds', icon: <TrendingUp className="w-5 h-5" />, data: getInvestmentSection('Mutual Funds') },
        { label: 'Calculators', icon: <Calculator className="w-5 h-5" />, data: getSection('Calculators') },
        { label: 'Other Loans', icon: <Coins className="w-5 h-5" />, data: getLoansTab('other') },
        { label: 'Learn & Resources', icon: <BookOpen className="w-5 h-5" />, data: getSection('Learn & Resources') },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 border-b border-gray-200 bg-white z-50 font-sans shadow-[0_6px_20px_rgba(0,0,0,0.06)]">
            <div className="bg-white w-full">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-[72px] lg:h-20">

                        {/* --- Mobile Header Structure (Matches Screenshot 2) --- */}
                        <div className="flex lg:hidden items-center justify-between w-full">
                            <div className="flex items-center gap-3">
                                {/* Hamburger */}
                                <button
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="text-gray-800 p-1 -ml-1 focus:outline-none"
                                >
                                    {isMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
                                </button>
                                {/* Logo */}
                                <Link href="/" className="flex items-center">
                                    <img src="/six-finance.png" alt="Logo" className="h-14 w-auto" />
                                </Link>
                            </div>

                            <div className="flex items-center gap-2">
                                {/* Talk to Expert Button (Mobile) - UPDATED TO OPEN MODAL */}
                                <button
                                    onClick={() => setIsExpertModalOpen(true)}
                                    className="flex items-center gap-1.5 px-3 py-2 border border-teal-600 rounded-md text-teal-600 text-xs font-semibold hover:bg-teal-50 transition-colors"
                                >
                                    <Phone className="w-3.5 h-3.5 fill-teal-600" />
                                    Talk to Expert
                                </button>

                                {/* User Profile Button (Mobile) */}
                                {isLoggedIn ? (
                                    <button onClick={() => router.push('/user/dashboard')} className="flex items-center justify-center w-8 h-8 rounded-full bg-teal-100 text-teal-700 font-bold text-xs border border-teal-200">
                                        {userName.charAt(0).toUpperCase()}
                                    </button>
                                ) : (
                                    <button onClick={() => router.push('/login')} className="flex items-center gap-1 px-2 py-1.5 border border-teal-600 rounded-md text-teal-600 hover:bg-teal-50 transition-colors">
                                        <UserIcon className="w-5 h-5" />
                                        <ChevronDown className="w-3 h-3" />
                                    </button>
                                )}
                            </div>
                        </div>


                        {/* --- Desktop Logo (Left) --- */}
                        <div className="hidden lg:flex shrink-0 items-center">
                            <Link href="/" aria-label="Go to homepage" className="inline-flex items-center">
                                <img
                                    src="/six-finance.png"
                                    alt="Company Logo"
                                    className="h-20 w-auto"
                                />
                            </Link>
                        </div>

                        {/* --- Desktop Navigation Links (Center) --- */}
                        <div className="hidden lg:flex items-center justify-center gap-1 xl:gap-4 h-full">
                            {NAV_DATA.map((item, index) => (
                                <MegaMenuDropdown key={index} item={item} />
                            ))}
                        </div>

                        {/* --- Desktop Right Section (User & Expert) --- */}
                        <div className="hidden lg:flex items-center">
                            {isLoggedIn ? (
                                <div className="relative h-full flex items-center group">
                                    <button className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-teal-50 transition-colors">
                                        <div className="text-left">
                                            <p className="text-sm font-semibold text-gray-900">
                                                Hi, <span className="text-teal-600">{userName}</span>
                                            </p>
                                            <div className="flex items-center gap-1.5 mt-0.5">
                                                {userRole === 'ADMIN' ? (
                                                    <span className="flex items-center text-[10px] font-bold text-purple-600 bg-purple-100 px-1.5 py-0.5 rounded-full">
                                                        <Crown className="w-3 h-3 mr-1" /> ADMIN
                                                    </span>
                                                ) : userRole === 'MODERATOR' ? (
                                                    <span className="flex items-center text-[10px] font-bold text-teal-600 bg-teal-100 px-1.5 py-0.5 rounded-full">
                                                        <Shield className="w-3 h-3 mr-1" /> MOD
                                                    </span>
                                                ) : (
                                                    <span className="flex items-center text-[10px] font-bold text-gray-600 bg-gray-100 px-1.5 py-0.5 rounded-full">
                                                        <UserIcon className="w-3 h-3 mr-1" /> USER
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <ChevronDown className="w-4 h-4 text-gray-400 group-hover:rotate-180 transition-transform" />
                                    </button>

                                    {/* User Menu Dropdown */}
                                    <div className="absolute top-full right-0 pt-2 w-60 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 z-50">
                                        <div className="rounded-xl shadow-xl bg-white ring-1 ring-gray-100 p-2 overflow-hidden border border-gray-100">
                                            {(userRole === 'ADMIN' || userRole === 'MODERATOR') && (
                                                <button onClick={() => router.push('/dashboard')} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-lg">
                                                    <LayoutDashboard className="w-4 h-4" /> Admin Dashboard
                                                </button>
                                            )}
                                            <button onClick={() => router.push('/user/dashboard')} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-teal-50 hover:text-teal-700 rounded-lg">
                                                <LayoutDashboard className="w-4 h-4" /> User Dashboard
                                            </button>
                                            <button onClick={() => router.push('/user/profile')} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-teal-50 hover:text-teal-700 rounded-lg">
                                                <UserIcon className="w-4 h-4" /> Profile
                                            </button>
                                            <div className="border-t border-gray-100 my-2"></div>
                                            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg">
                                                <LogOut className="w-4 h-4" /> Logout
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <button
                                    onClick={() => router.push('/login')}
                                    className="bg-teal-500 text-white font-medium py-2.5 px-6 rounded-lg shadow-md hover:bg-teal-600 hover:shadow-lg transition-all duration-200"
                                >
                                    Sign In
                                </button>
                            )}

                            {/* Talk To Expert Button (Desktop) */}
                            <TalkToExpertDropdown />
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Mobile Menu Drawer (Matches Screenshot 1) --- */}
            <div className={`lg:hidden fixed inset-0 z-45 bg-gray-900/20 backdrop-blur-sm transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsMenuOpen(false)} />

            <div className={`lg:hidden fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-white z-50 overflow-y-auto transition-transform duration-300 ease-out shadow-2xl ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex flex-col h-full">
                    {/* Header inside Drawer */}
                    <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                        <img src="/six-finance.png" alt="Logo" className="h-14 w-auto" />
                        <button onClick={() => setIsMenuOpen(false)} className="text-gray-400 hover:text-gray-600">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Scrollable List Items */}
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

                    {/* Footer Actions in Drawer */}
                    <div className="p-4 bg-gray-50 border-t border-gray-100 space-y-3">
                        {!isLoggedIn && (
                            <button
                                onClick={() => router.push('/login')}
                                className="w-full flex items-center justify-center gap-2 bg-teal-500 text-white font-bold py-3 rounded-xl shadow-lg active:scale-95 transition-transform"
                            >
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
                <div className="fixed inset-0 z-60 flex items-center justify-center p-4 px-4 animate-in fade-in duration-200">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
                        onClick={() => setIsExpertModalOpen(false)}
                    />

                    {/* Modal Content */}
                    <div className="relative bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                        {/* Header */}
                        <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-gray-50/50">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center shrink-0">
                                    <Headset className="w-5 h-5 text-teal-600" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900">Talk to Expert</h3>
                            </div>
                            <button
                                onClick={() => setIsExpertModalOpen(false)}
                                className="p-2 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-6 space-y-6">
                            {/* Sales Section */}
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Sales Enquiry</p>
                                <div className="flex items-center justify-between bg-teal-50/50 p-3 rounded-xl border border-teal-100">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-white p-2 rounded-lg shadow-sm">
                                            <Phone className="w-4 h-4 text-teal-600" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-xs text-gray-500">Call Us</span>
                                            <span className="font-bold text-gray-900">1800 570 3888</span>
                                        </div>
                                    </div>
                                    <a href="tel:18005703888" className="bg-teal-600 text-white text-xs font-bold px-3 py-2 rounded-lg hover:bg-teal-700">
                                        Call
                                    </a>
                                </div>
                            </div>

                            {/* Service Section */}
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Service Helpline</p>
                                <div className="flex items-center justify-between bg-blue-50/50 p-3 rounded-xl border border-blue-100">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-white p-2 rounded-lg shadow-sm">
                                            <Headset className="w-4 h-4 text-blue-600" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-xs text-gray-500">Call Us</span>
                                            <span className="font-bold text-gray-900">1800 258 5616</span>
                                        </div>
                                    </div>
                                    <a href="tel:18002585616" className="bg-blue-600 text-white text-xs font-bold px-3 py-2 rounded-lg hover:bg-blue-700">
                                        Call
                                    </a>
                                </div>
                            </div>

                            {/* Info Text */}
                            <div className="p-3 bg-gray-50 rounded-xl">
                                <p className="text-xs text-center text-gray-500 leading-relaxed">
                                    Advisors available 7 days a week<br />
                                    <span className="font-bold text-gray-800">9:30 am - 6:30 pm</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;