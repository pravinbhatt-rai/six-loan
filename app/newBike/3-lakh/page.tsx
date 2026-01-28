import { Metadata } from 'next';
import React from "react";
export const metadata: Metadata = {
    title: 'New Bike Loan up to 3 Lakh | Best Offers 2026',
    description: 'Explore new bike loans up to 3 lakh in India 2026. Compare two wheeler loan interest rates, EMI, eligibility, and apply online for your new bike.',
    alternates: {
        canonical: 'https://sixfinance.app/newBike/3-lakh',
    },
    keywords: [
        'new bike loan 3 lakh', 'bike loan up to 3 lakh', 'two wheeler loan 3 lakh', 'bike loan EMI 3 lakh', 'bike loan interest rate', 'bike loan eligibility', 'bike loan apply online', 'bike loan offers', 'bike loan 2026', 'compare bike loans', 'bike loan approval', 'bike loan guide', 'bike loan calculator', 'bike loan instant approval', 'bike loan low interest', 'bike loan zero down payment', 'bike loan best banks', 'bike loan online', 'bike loan India 2026'
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
        title: 'New Bike Loan up to 3 Lakh | Best Offers 2026',
        description: 'Explore new bike loans up to 3 lakh in India 2026. Compare two wheeler loan interest rates, EMI, eligibility, and apply online for your new bike.',
        url: 'https://sixfinance.app/newBike/3-lakh',
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
            <HeroContainer id='new-bike-loan-3-lakh' />
            <LoanSection />
            <UniversalLoanCard
                categorySlug="new-two-wheeler-loan"
                headerTitle="New Bike <span class='text-teal-500'>Loan</span>"
                headerSubtitle="Budget Friendly Rides"
                headerDescription="Affordable financing for purchasing second-hand motorcycles and scooters."
                maxDisplay={4}
                showViewAllButton={true}
            />
            <BikeLoanGuide pageId="new-bike-3lakh" />
        </main>
    );
}