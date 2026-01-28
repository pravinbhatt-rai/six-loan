"use client";
import React, { FC } from 'react';
import { useLoanType } from '../PersonalLoan/LoanTypeContext';
import { Check } from 'lucide-react';

interface ProductItem {
    id: string;
    headline: string;
    displayLoanType?: string;
    features: { text: string }[];
    buttonText: string;
    buttonLink: string;
    imageSrc: string;
    imageAlt: string;
    layout: 'left' | 'right';
    dotPositionBottom: string;
    dotPositionLeft: string;
}

const products: ProductItem[] = [
    {
        id: 'yes-bank',
        headline: 'Yes Bank Six Loan Credit Card',
        displayLoanType: 'Credit Card',
        features: [
            { text: '3% Cashback on Online Spends' },
            { text: '1.5% Cashback on all Other Spends' },
            { text: 'First Year Free' }
        ],
        buttonText: 'Know More',
        buttonLink: '/creditcards',
        imageSrc: '/card1.png',
        imageAlt: 'Multiple credit cards',
        layout: 'left',
        dotPositionBottom: 'bottom-10',
        dotPositionLeft: '-left-20',
    },
    {
        id: 'step-up',
        headline: 'Step Up Credit Card',
        displayLoanType: 'Step Up Card',
        features: [
            { text: 'Credit Card on Fixed Deposit' },
            { text: 'Card Limit is 90% of FD Amount' },
            { text: 'Helps build Credit Score' }
        ],
        buttonText: 'Know More',
        buttonLink: '/creditcards',
        imageSrc: '/card2.png',
        imageAlt: 'Step Up Credit Cards',
        layout: 'right',
        dotPositionBottom: 'bottom-5',
        dotPositionLeft: '-left-10',
    },
    {
        id: 'rbl-bank',
        headline: 'RBL Bank Six Loan DUET Credit Card',
        displayLoanType: 'DUET Card',
        features: [
            { text: '1% cash back on all spends*' },
            { text: 'Credit Card + Credit Line' },
            { text: '100% Digital Process' }
        ],
        buttonText: 'Know More',
        buttonLink: '/creditcards',
        imageSrc: '/card3.png',
        imageAlt: 'RBL Bank Six Loan DUET Credit Card',
        layout: 'left',
        dotPositionBottom: 'bottom-20',
        dotPositionLeft: '-left-10',
    },
];

const ProductSection: FC<{ product: ProductItem }> = ({ product }) => {
    const { setLoanType } = useLoanType();
    return (
        <div onClick={() => setLoanType(product.headline)} className={`cursor-pointer flex flex-col ${product.layout === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'} items-center justify-between gap-10 md:gap-16 py-12 border-b border-gray-100 last:border-0`}>

            {/* Image Column */}
            <div className="w-full md:w-1/3 flex justify-center relative">
                {/* Added 'hidden md:block' to ensure dots only appear on larger screens */}
                <img
                    src={"./dots-grid.png"}
                    alt="Dot Grid Pattern"
                    className={`hidden md:block object-contain absolute ${product.dotPositionBottom} ${product.dotPositionLeft} z-0`}
                />

                <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="w-64 md:w-full max-w-sm object-contain rounded-lg relative z-10"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = `https://placehold.co/400x250/9CA3AF/FFFFFF?text=${product.imageAlt.replace(/\s/g, '+')}`;
                    }}
                />
            </div>

            {/* Content Column */}
            <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{product.headline}</h3>
                <ul className="space-y-3 mb-8 text-left self-start md:self-auto mx-auto md:mx-0">
                    {product.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start text-base md:text-lg text-gray-700">
                            <Check className="w-5 h-5 md:w-6 md:h-6 text-green-500 mr-3 shrink-0 mt-1" />
                            <span>{feature.text}</span>
                        </li>
                    ))}
                </ul>
                <a href={product.buttonLink} className="inline-flex items-center justify-center px-10 py-3 bg-gray-900 text-white font-semibold rounded-xl shadow-lg hover:bg-gray-800 transition-all duration-200 w-full sm:w-auto">
                    {product.buttonText}
                </a>
            </div>
        </div>
    );
};

const TailorMadeProducts: FC = () => {
    return (
        <div className="bg-white font-inter relative ">
            <div className="max-w-7xl mx-auto px-6 sm:px-8">
                <header className="text-center ">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">Tailor Made Products Exclusively</h1>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight mt-2">For Six Loan Customers</h2>
                    <div className="mt-6 mx-auto h-1.5 w-24 md:w-40 bg-gray-900 rounded-full"></div>
                </header>

                <div className="flex flex-col mt-10">
                    {products.map((product) => (
                        <ProductSection key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TailorMadeProducts;