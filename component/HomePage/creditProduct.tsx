"use client";
import React, { FC } from 'react';
import { useRouter } from 'next/navigation';
import {
    CreditCard,
    User,
    Wallet,
    Briefcase,
    Repeat,
    Home,
    Building,
    ArrowRight,
    PiggyBank,
    Gem,
    DollarSign,
    Heart,
    Car,
    Book,
    Bike,
} from 'lucide-react';

// 1. Define interface for a single product item
interface Product {
    title: string;
    description: string;
    actionText: string;
    href: string;
    IconComponent: FC<React.SVGProps<SVGSVGElement>>;
}

// 2. Product Card Component (Reusable)
const ProductCard: FC<Product> = ({ title, description, actionText, href, IconComponent }) => {
    const router = useRouter();

    const handleNavigate = () => {
        if (!href) return;
        router.push(href);
    };

    return (
        <div
            onClick={handleNavigate}
            onKeyDown={(e) => { if (e.key === 'Enter') handleNavigate(); }}
            role="link"
            tabIndex={0}
            className="relative pt-10 pb-6 px-2 sm:px-4 bg-white border border-gray-200 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] h-full flex flex-col cursor-pointer"
        >

            {/* Icon Circle */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gray-800 rounded-full shadow-2xl">
                <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>

            {/* Content Area */}
            <div className="mt-6 flex flex-col items-center justify-start grow h-full">
                {/* Title */}
                <h3 className="text-sm sm:text-xl font-bold text-gray-900 mb-2 text-center uppercase tracking-wider">
                    {title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-base text-gray-600 mb-4 text-center grow">
                    {description}
                </p>

                {/* Action Link */}
                <a
                    href={href}
                    className="flex items-center text-xs sm:text-base font-semibold text-gray-800 hover:text-blue-600 transition-colors group mt-auto"
                >
                    {actionText}
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </a>
            </div>
        </div>
    );
};

// 3. Main Component Data
const productData: Product[] = [
    // REMOVED: CREDIT CARDS
    {
        title: 'PERSONAL LOAN',
        description: "Select the best offer curated just for you from a wide choice of Banks & NBFC's",
        actionText: 'Check Eligibility',
        href: '/personalLoan',
        IconComponent: User,
    },
    {
        title: 'Credit CARD',
        description: "Choose from a variety of credit cards that suit your lifestyle and spending habits",
        actionText: 'Explore Cards',
        href: '/creditinfo',
        IconComponent: CreditCard,
    },
    {
        title: 'BUSINESS LOAN',
        description: "Expand your business with loans at low interest rates",
        actionText: 'Check Eligibility',
        href: '/BusinessLoan',
        IconComponent: Briefcase,
    },
    {
        title: 'PROFESSIONAL LOAN',
        description: "Exclusive loans for doctors, CAs, and other professionals at competitive rates",
        actionText: 'Check Eligibility',
        href: '/ProfessionalLoan',
        IconComponent: Briefcase,
    },
    {
        title: 'TRANSFER PERSONAL LOAN',
        description: "Get better interest rates on your existing personal loan",
        actionText: 'Reduce Your EMI!',
        href: '/TransferPersonalLoan',
        IconComponent: Repeat,
    },
    {
        title: 'HOME LOAN',
        description: "Choose from lowest interest rates for your dream home",
        actionText: 'Check Eligibility',
        href: '/HomeLoan',
        IconComponent: Home,
    },
    {
        title: 'LOAN AGAINST PROPERTY',
        description: "Get liquidity against your property at best interest rates",
        actionText: 'Check Eligibility',
        href: '/LoanAgainstProperty',
        IconComponent: Building,
    },
    {
        title: 'TRANSFER HOME LOAN',
        description: "Get better interest rates on your existing home loan",
        actionText: 'Reduce Your EMI!',
        href: '/TransferHomeLoan',
        IconComponent: Repeat,
    },
    {
        title: 'EDUCATION LOAN',
        description: "Finance your studies with flexible education loan options",
        actionText: 'Apply Now',
        href: '/EducationLoan',
        IconComponent: Book,
    },
    {
        title: 'LOAN AGAINST SECURITY',
        description: "Get best loan offer against your security",
        actionText: 'Apply Now',
        href: '/LoanAgainstSecurity',
        IconComponent: DollarSign,
    },
    {
        title: 'USED CAR LOAN',
        description: "Finance your dream used car with flexible loan options",
        actionText: 'Check Offers',
        href: '/UsedCar',
        IconComponent: Car,
    },
    {
        title: 'USED BIKE LOAN',
        description: "Get the best loan deals for your used bike purchase",
        actionText: 'Check Offers',
        href: '/UsedBike',
        IconComponent: Bike,
    },
    {
        title: 'NEW CAR LOAN',
        description: "Drive home a new car with attractive loan rates",
        actionText: 'Check Offers',
        href: '/NewCar',
        IconComponent: Car,
    },
    {
        title: 'NEW BIKE LOAN',
        description: "Own a new bike with easy and quick loan approval",
        actionText: 'Check Offers',
        href: '/NewBike',
        IconComponent: Bike,
    },
    {
        title: 'HEALTH INSURANCE',
        description: "Coming soon...",
        actionText: 'Get notified',
        href: '/insurance/healthInsurance',
        IconComponent: Heart,
    },
    {
        title: 'CAR INSURANCE',
        description: "Coming soon...",
        actionText: 'Get notified',
        href: '/insurance/carInsurance',
        IconComponent: Car,
    },
    
];

// 4. Main App Component
const App: FC = () => {

    return (
        <div className="min-h-screen bg-white font-inter">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <header className="text-center mb-16"> {/* Added pt-12 for top spacing */}
                    <h1 className="text-4xl font-bold text-gray-900 tracking-tight sm:text-5xl">
                        Credit Products
                    </h1>
                    <div className="mt-4 mx-auto h-1.5 w-24 bg-gray-800 rounded-full"></div>
                </header>

                {/* Products Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-x-4 gap-y-12 sm:gap-8 lg:gap-12 items-stretch justify-center pb-12">
                    {productData.map((product, index) => (
                        <ProductCard
                            key={index}
                            title={product.title}
                            description={product.description}
                            actionText={product.actionText}
                            href={product.href}
                            IconComponent={product.IconComponent}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default App;