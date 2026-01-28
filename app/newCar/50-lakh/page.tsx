import { Metadata } from 'next';
import React from "react";
export const metadata: Metadata = {
    title: 'New Car Loan up to 50 Lakh | Best Offers 2026',
    description: 'Compare new car loans up to 50 lakh in India 2026. Get the best car loan interest rates, EMI, eligibility, and apply online for your dream car.',
    alternates: {
        canonical: 'https://sixfinance.app/newCar/50-lakh',
    },
    keywords: [
        'new car loan 50 lakh', 'car loan up to 50 lakh', 'car loan EMI 50 lakh', 'car loan interest rate', 'car loan eligibility', 'car loan apply online', 'car loan offers', 'car loan 2026', 'compare car loans', 'car loan approval', 'car loan guide', 'car loan calculator', 'car loan instant approval', 'car loan low interest', 'car loan zero down payment', 'car loan best banks', 'car loan online', 'car loan India 2026'
    ],
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    openGraph: {
        title: 'New Car Loan up to 50 Lakh | Best Offers 2026',
        description: 'Compare new car loans up to 50 lakh in India 2026. Get the best car loan interest rates, EMI, eligibility, and apply online for your dream car.',
        url: 'https://sixfinance.app/newCar/50-lakh',
        siteName: 'SixFinance',
        type: 'website',
    },
};
import HeroContainer from '@/component/HomeLoan/HeroContainer';
import { LoanSection } from '@/component/PersonalLoan/LoanSection';
import UniversalLoanCard from '@/component/loan/UniversalLoanCard';
import CarLoanGuide from '@/component/NewCar/CarLoanGuide';

export default function Page() {
    return (
        <main>
            <HeroContainer id='new-car-loan-50lakh' />
            <LoanSection/>
            <UniversalLoanCard
                categorySlug="new-car-loan"
                headerTitle="Car <span class='text-teal-500'>Loan</span>"
                headerSubtitle="Drive Your Dream Car"
                headerDescription="Get up to 100% on-road funding and attractive interest rates on new cars."
                maxDisplay={4}
                showViewAllButton={true}
            />
            <CarLoanGuide pageId="new-car-loan-50lakh"/>
        </main>
    );
}