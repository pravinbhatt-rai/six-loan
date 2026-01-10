"use client";
import React, { FC } from 'react';
import { Scale, ShieldCheck, Lock, Headset } from 'lucide-react';

// 1. Define interface for a single feature/benefit item
interface Benefit {
    IconComponent: FC<React.SVGProps<SVGSVGElement>>;
    title: string;
    description: string;
}

// 2. Data for the four benefits
const benefitsData: Benefit[] = [
    {
        IconComponent: Scale,
        title: 'Wide Choice',
        description: "We have partnerships with large banks, NBFCs and fintech lenders who offer a wide choice of products on our platform",
    },
    {
        IconComponent: ShieldCheck,
        title: 'Easy Access to Credit',
        description: "Our algorithm-based technology provides access to multiple credit offers, ease of comparison and unbiased advice",
    },
    {
        IconComponent: Lock,
        title: 'Safe & Secure',
        description: "Your data is completely safe with us. We are ISO(27001: 2013) certified & have built industry-best controls to keep your information secure.",
    },
    {
        IconComponent: Headset,
        title: 'Customer First',
        description: "We have a dedicated and highly trained team of experts who work hard every day to help you take the best financial decisions",
    },
];

// 3. Reusable Benefit Card Component
const BenefitCard: FC<Benefit> = ({ IconComponent, title, description }) => (
    <div className="flex flex-col items-start p-6 bg-white border border-gray-100 rounded-xl shadow-lg h-full transition-all duration-300 hover:shadow-xl hover:border-gray-200">

        {/* Icon (styled to match the light gray box background in the image) */}
        <div className="p-4 bg-gray-50 rounded-lg mb-4">
            <IconComponent className="w-8 h-8 text-gray-800" />
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3">
            {title}
        </h3>

        {/* Description */}
        <p className="text-base text-gray-600">
            {description}
        </p>
    </div>
);

// 4. Main Component
const CreditProductBenefits: FC = () => {
    return (
        <div className="bg-white font-inter py-10 sm:py-16 md:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <header className="text-center mb-10 sm:mb-16">
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight sm:text-5xl">
                        Compare, Choose And Apply For Personal
                    </h1>
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight sm:text-5xl mt-2">
                        Credit Products On Six Loan
                    </h2>
                    {/* The dark horizontal line under the title */}
                    <div className="mt-4 mx-auto h-1.5 w-40 sm:w-72 bg-gray-800 rounded-full"></div>
                </header>

                {/* Benefits Grid (4 columns) */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 items-stretch">
                    {benefitsData.map((benefit, index) => (
                        <BenefitCard
                            key={index}
                            IconComponent={benefit.IconComponent}
                            title={benefit.title}
                            description={benefit.description}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CreditProductBenefits;