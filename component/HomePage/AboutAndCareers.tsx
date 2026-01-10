"use client";
import React, { FC } from 'react';

// Define interface for a single card item
interface CardItem {
    id: string;
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
    imageSrc: string;
    imageAlt: string;
}

// Data for the two cards
const cardsData: CardItem[] = [
    {
        id: 'about',
        title: 'About Us',
        description: 'How We Are Building A Strong Six Loan Brand',
        buttonText: 'Know More',
        buttonLink: '#about-us',
        // Placeholder for the meeting illustration (REPLACE WITH ACTUAL URL)
        imageSrc: '/about.png',
        imageAlt: 'Illustration of a business team collaborating at a table',
    },
    {
        id: 'careers',
        title: 'Work With Us',
        description: 'Want To Join Team Six Loan?',
        buttonText: 'Know More',
        buttonLink: '#careers',
        // Placeholder for the team illustration (REPLACE WITH ACTUAL URL)
        imageSrc: '/workwithus.png',
        imageAlt: 'Illustration of a diverse group of colleagues standing together',
    },
];

// Reusable Card Component
const InfoCard: FC<CardItem> = ({ title, description, buttonText, buttonLink, imageSrc, imageAlt }) => (
    <div className="flex flex-col bg-white border border-gray-100 rounded-3xl shadow-xl overflow-hidden h-full transition-all duration-300 hover:shadow-2xl">

        {/* Image Area */}
        {/* Note: In the design, the image/illustration occupies the top half with a light background */}
        <div className="bg-gray-50 p-8 flex items-center justify-center h-64 overflow-hidden">
            <img
                src={imageSrc}
                alt={imageAlt}
                className="max-w-full h-auto object-contain p-3"
                // Fallback handling
                onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = `https://placehold.co/400x250/F3F4F6/6B7280?text=Illustration`;
                }}
            />
        </div>

        {/* Content Area */}
        <div className="p-8 flex flex-col items-center text-center grow">
            {/* Title */}
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {title}
            </h3>

            {/* Description */}
            <p className="text-base text-gray-600 mb-6 grow">
                {description}
            </p>

            {/* Button */}
            <a
                href={buttonLink}
                className="inline-block px-8 py-3 bg-gray-800 text-white font-semibold rounded-md shadow-lg hover:bg-gray-700 transition-colors duration-200 mt-auto"
            >
                {buttonText}
            </a>
        </div>
    </div>
);

// Main AboutAndCareers Component
const AboutAndCareers: FC = () => {
    return (
        <div className="bg-white font-inter py-4 sm:py-10 md:py-14">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Cards Grid (2 columns) */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 items-stretch ">
                    {cardsData.map((card) => (
                        <InfoCard
                            key={card.id}
                            id={card.id}
                            title={card.title}
                            description={card.description}
                            buttonText={card.buttonText}
                            buttonLink={card.buttonLink}
                            imageSrc={card.imageSrc}
                            imageAlt={card.imageAlt}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AboutAndCareers;