import { Metadata } from 'next';
import React from "react";
export const metadata: Metadata = {
    title: 'Used Car Loan ₹50 Lakh | Pre-Owned Car Finance 2026',
    description: 'Get a used car loan of ₹50 lakh in India 2026. Instant approval, low interest rates, and flexible EMI for pre-owned cars. Apply online for top used car loan offers and certified car finance.',
    alternates: {
        canonical: 'https://sixfinance.app/usedCar/50-lakh',
    },
    keywords: [
        'used car loan 50 lakh', 'pre-owned car loan 50 lakh', 'second hand car loan 50 lakh', 'loan for used car 50 lakh', 'loan for pre-owned car 50 lakh', 'car finance 50 lakh', 'used car loan interest rate 50 lakh', 'used car loan EMI 50 lakh', 'used car loan eligibility 50 lakh', 'used car loan apply online 50 lakh', 'used car loan instant approval 50 lakh', 'used car loan documents 50 lakh', 'used car loan offers 50 lakh', 'used car loan 2026 50 lakh', 'compare used car loans 50 lakh', 'used car loan process 50 lakh', 'used car loan approval 50 lakh', 'used car loan guide 50 lakh', 'used car loan calculator 50 lakh', 'used car loan quick disbursal 50 lakh', 'used car loan low interest 50 lakh', 'used car loan flexible tenure 50 lakh', 'used car loan minimum documents 50 lakh', 'used car loan eligibility check 50 lakh', 'used car loan review 50 lakh', 'used car loan tips 50 lakh', 'used car loan best banks 50 lakh', 'used car loan online 50 lakh', 'used car loan without collateral 50 lakh', 'used car loan quick approval 50 lakh', 'used car loan best rates 50 lakh', 'used car loan India 50 lakh', 'used car loan 2026 50 lakh', 'second hand car finance 50 lakh', 'pre-owned car finance 50 lakh', 'certified used car loan 50 lakh', 'certified pre-owned car finance 50 lakh'
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
        title: 'Used Car Loan ₹50 Lakh | Pre-Owned Car Finance 2026',
        description: 'Get a used car loan of ₹50 lakh in India 2026. Instant approval, low interest rates, and flexible EMI for pre-owned cars. Apply online for top used car loan offers and certified car finance.',
        url: 'https://sixfinance.app/usedCar/50-lakh',
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
            <HeroContainer id='used-car-loan-50lakh' />
            <LoanSection/>
            <UniversalLoanCard
                categorySlug="used-car-loan"
                headerTitle="Used Car <span class='text-teal-500'>Loan</span>"
                headerSubtitle="Drive Your Dream Car"
                headerDescription="Get up to 100% on-road funding and attractive interest rates on new cars."
                maxDisplay={4}
                showViewAllButton={true}
            />
            <CarLoanGuide pageId="used-car-loan-50lakh"/>
        </main>
    );
}