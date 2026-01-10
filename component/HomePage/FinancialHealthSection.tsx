"use client";
import React, { FC, useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';

// 1. Define interface for the content items
interface ContentItem {
    type: 'graphic' | 'image';
    title: string;
    description: string;
    actionText: string;
    actionHref: string;
    imageSrc?: string;
}

// 2. Data for the three content cards
const contentData: ContentItem[] = [
    {
        type: 'graphic',
        title: 'Made in India',
        description: 'Proudly made in India, for Indians around the world',
        actionText: 'Premium quality',
        actionHref: '#',
    },
    {
        type: 'image',
        title: 'Beware from Fraudsters',
        description: 'Check Fraud Detection',
        actionText: 'Check Fraud Detection',
        actionHref: '#fraud-detection',
        imageSrc: 'https://placehold.co/600x400/264653/FFFFFF?text=Fraudster+Mask',
    },
    {
        type: 'image',
        title: 'Making India Credit Fit Vol.3',
        description: 'A Consumer Insights Report',
        actionText: 'Download Now',
        actionHref: '#report-download',
        imageSrc: 'https://placehold.co/600x400/2A9D8F/FFFFFF?text=Running+Report',
    },
];

// 3. Graphic sub-component defined outside render to satisfy hooks rules
const IndiaGraphic: FC<{ actionText: string }> = ({ actionText }) => (
    <div className="flex flex-col items-center justify-center p-6 text-center">
        <div className="flex h-12 w-24 border border-gray-300 rounded overflow-hidden">
            <div className="w-1/3 bg-orange-500"></div>
            <div className="w-1/3 bg-white flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-blue-700 rounded-full flex items-center justify-center">
                    <div className="w-1 h-1 bg-blue-700 rounded-full"></div>
                </div>
            </div>
            <div className="w-1/3 bg-green-600"></div>
        </div>
        <div className="flex mt-3 space-x-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        </div>
        <p className="mt-2 text-sm text-gray-700 font-semibold">{actionText}</p>
    </div>
);

// 4. Reusable Card Component
const ContentCard: FC<ContentItem> = ({ type, title, description, actionText, actionHref, imageSrc }) => {
    return (
        <div className="flex flex-col bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden h-full mx-auto w-full max-w-sm md:max-w-none">
            {type === 'image' && imageSrc ? (
                <div className="relative h-48 sm:h-56 w-full">
                    <img
                        src={imageSrc}
                        alt={title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            (e.target as HTMLImageElement).onerror = null;
                            (e.target as HTMLImageElement).src = `https://placehold.co/600x400/6B7280/FFFFFF?text=${title.replace(/\s/g, '+')}`;
                        }}
                    />
                </div>
            ) : (
                <div className="h-56 w-full flex items-center justify-center bg-white border-b border-gray-100">
                    <IndiaGraphic actionText={actionText} />
                </div>
            )}

            <div className="p-6 flex flex-col grow">
                <h3 className={`text-lg font-bold text-gray-900 ${type === 'image' ? 'mb-1' : 'mb-3 text-center'}`}>
                    {type === 'image' ? title : null}
                </h3>

                <p className={`text-sm text-gray-700 ${type === 'image' ? 'grow' : 'text-center'}`}>
                    {type === 'image' ? description : null}
                </p>

                {type === 'graphic' && (
                    <p className="text-base font-semibold text-gray-800 text-center mt-4">
                        {description}
                    </p>
                )}

                {type === 'image' && title !== 'Beware from Fraudsters' && (
                    <a href={actionHref} className="inline-flex items-center text-sm font-semibold text-gray-800 hover:text-blue-600 transition-colors group mt-4 border-b border-gray-400 w-fit">
                        {actionText}
                    </a>
                )}
                
                {type === 'image' && title === 'Beware from Fraudsters' && (
                    <a href={actionHref} className="inline-flex items-center text-sm font-semibold text-gray-800 hover:text-blue-600 transition-colors group mt-1 border-b border-gray-400 w-fit">
                        {description}
                    </a>
                )}
            </div>
        </div>
    );
};

// 4. Main App Component
const FinancialHealthSection: FC = () => {
    const [startIndex, setStartIndex] = useState(0);
    const [visibleCount, setVisibleCount] = useState(3);
    const total = contentData.length;

    // Responsive visible count logic
    useEffect(() => {
        const updateVisibleCount = () => {
            if (window.innerWidth < 768) setVisibleCount(1);
            else if (window.innerWidth < 1024) setVisibleCount(2);
            else setVisibleCount(3);
        };

        updateVisibleCount();
        window.addEventListener('resize', updateVisibleCount);
        return () => window.removeEventListener('resize', updateVisibleCount);
    }, []);

    const getVisibleItems = () => {
        const items = [];
        for (let i = 0; i < visibleCount; i++) {
            items.push(contentData[(startIndex + i) % total]);
        }
        return items;
    };

    const handlePrev = () => setStartIndex((prev) => (prev - 1 + total) % total);
    const handleNext = () => setStartIndex((prev) => (prev + 1) % total);

    return (
        <div className="bg-white font-inter mt-10 md:mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <header className="text-center mb-10 md:mb-16">
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight sm:text-5xl">
                        Keeping You Financially Healthy
                    </h1>
                    <h2 className="text-3xl font-bold text-gray-900 tracking-tight sm:text-5xl mt-2">
                        And Safe Always
                    </h2>
                    <div className="mt-4 mx-auto h-1.5 w-24 md:w-40 bg-gray-800 rounded-full"></div>
                </header>

                <div className="relative px-2 md:px-0">
                    <button
                        className="hidden md:flex absolute top-1/2 -left-6 lg:-left-12 transform -translate-y-1/2 z-10 p-3 bg-white border border-gray-400 text-gray-800 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                        onClick={handlePrev}
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>

                    <div className={`grid gap-6 items-stretch transition-all duration-500 ease-in-out ${
                        visibleCount === 1 ? 'grid-cols-1' : visibleCount === 2 ? 'grid-cols-2' : 'grid-cols-3'
                    }`}>
                        {getVisibleItems().map((item, index) => (
                            <ContentCard
                                key={`${startIndex}-${index}`}
                                {...item}
                            />
                        ))}
                    </div>

                    <button
                        className="hidden md:flex absolute top-1/2 -right-6 lg:-right-12 transform -translate-y-1/2 z-10 p-3 bg-white border border-gray-400 text-gray-800 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                        onClick={handleNext}
                    >
                        <ArrowRight className="w-6 h-6" />
                    </button>

                    {/* Mobile Navigation */}
                    <div className="flex md:hidden justify-center space-x-6 mt-10">
                        <button className="p-4 bg-white border border-gray-400 text-gray-800 rounded-full shadow-md active:scale-95 transition-transform" onClick={handlePrev}>
                            <ArrowLeft className="w-6 h-6" />
                        </button>
                        <button className="p-4 bg-white border border-gray-400 text-gray-800 rounded-full shadow-md active:scale-95 transition-transform" onClick={handleNext}>
                            <ArrowRight className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FinancialHealthSection;