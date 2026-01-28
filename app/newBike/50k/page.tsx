import { Metadata } from 'next';
import React from "react";
export const metadata: Metadata = {
    title: 'New Bike Loan up to 50,000 | Best Offers 2026',
    description: 'Find new bike loans up to 50,000 in India 2026. Compare two wheeler loan interest rates, EMI, eligibility, and apply online for your new bike.',
    alternates: {
        canonical: 'https://sixfinance.app/newBike/50k',
    },
    keywords: [
        'new bike loan 50000', 'bike loan up to 50000', 'two wheeler loan 50000', 'bike loan EMI 50000', 'bike loan interest rate', 'bike loan eligibility', 'bike loan apply online', 'bike loan offers', 'bike loan 2026', 'compare bike loans', 'bike loan approval', 'bike loan guide', 'bike loan calculator', 'bike loan instant approval', 'bike loan low interest', 'bike loan zero down payment', 'bike loan best banks', 'bike loan online', 'bike loan India 2026'
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
        title: 'New Bike Loan up to 50,000 | Best Offers 2026',
        description: 'Find new bike loans up to 50,000 in India 2026. Compare two wheeler loan interest rates, EMI, eligibility, and apply online for your new bike.',
        url: 'https://sixfinance.app/newBike/50k',
        siteName: 'SixFinance',
        type: 'website',
    },
};
import HeroContainer from '@/component/HomeLoan/HeroContainer';
import { LoanSection } from '@/component/PersonalLoan/LoanSection';
import UniversalLoanCard from '@/component/loan/UniversalLoanCard';
import BikeLoanGuide from "@/component/UsedBike/BikeLoanGuide";

export default function Page() {
    return (
        <main>
            <HeroContainer id='new-bike-loan-50k' />
            <LoanSection />
            <UniversalLoanCard
                categorySlug="new-two-wheeler-loan"
                headerTitle="new Bike <span class='text-teal-500'>Loan</span>"
                headerSubtitle="Budget Friendly Rides"
                headerDescription="Affordable financing for purchasing second-hand motorcycles and scooters."
                maxDisplay={4}
                showViewAllButton={true}
            />
            <BikeLoanGuide pageId="new-bike-50k" />
        </main>
    );
}