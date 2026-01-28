import { Metadata } from 'next';
import React from "react";
export const metadata: Metadata = {
    title: 'Used Car Loan ₹25 Lakh | Pre-Owned Car Finance 2026',
    description: 'Get a used car loan of ₹25 lakh in India 2026. Instant approval, low interest rates, and flexible EMI for pre-owned cars. Apply online for top used car loan offers and certified car finance.',
    alternates: {
        canonical: 'https://sixfinance.app/usedCar/25-lakh',
    },
    keywords: [
        'used car loan 25 lakh', 'pre-owned car loan 25 lakh', 'second hand car loan 25 lakh', 'loan for used car 25 lakh', 'loan for pre-owned car 25 lakh', 'car finance 25 lakh', 'used car loan interest rate 25 lakh', 'used car loan EMI 25 lakh', 'used car loan eligibility 25 lakh', 'used car loan apply online 25 lakh', 'used car loan instant approval 25 lakh', 'used car loan documents 25 lakh', 'used car loan offers 25 lakh', 'used car loan 2026 25 lakh', 'compare used car loans 25 lakh', 'used car loan process 25 lakh', 'used car loan approval 25 lakh', 'used car loan guide 25 lakh', 'used car loan calculator 25 lakh', 'used car loan quick disbursal 25 lakh', 'used car loan low interest 25 lakh', 'used car loan flexible tenure 25 lakh', 'used car loan minimum documents 25 lakh', 'used car loan eligibility check 25 lakh', 'used car loan review 25 lakh', 'used car loan tips 25 lakh', 'used car loan best banks 25 lakh', 'used car loan online 25 lakh', 'used car loan without collateral 25 lakh', 'used car loan quick approval 25 lakh', 'used car loan best rates 25 lakh', 'used car loan India 25 lakh', 'used car loan 2026 25 lakh', 'second hand car finance 25 lakh', 'pre-owned car finance 25 lakh', 'certified used car loan 25 lakh', 'certified pre-owned car finance 25 lakh'
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
        title: 'Used Car Loan ₹25 Lakh | Pre-Owned Car Finance 2026',
        description: 'Get a used car loan of ₹25 lakh in India 2026. Instant approval, low interest rates, and flexible EMI for pre-owned cars. Apply online for top used car loan offers and certified car finance.',
        url: 'https://sixfinance.app/usedCar/25-lakh',
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
            <HeroContainer id='used-car-loan-25lakh' />
            <LoanSection/>
            <UniversalLoanCard
                categorySlug="used-car-loan"
                headerTitle="Used Car <span class='text-teal-500'>Loan</span>"
                headerSubtitle="Drive Your Dream Car"
                headerDescription="Get up to 100% on-road funding and attractive interest rates on new cars."
                maxDisplay={4}
                showViewAllButton={true}
            />
            <CarLoanGuide pageId="used-car-loan-25lakh"/>
        </main>
    );
}