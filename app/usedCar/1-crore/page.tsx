import { Metadata } from 'next';
import React from "react";
export const metadata: Metadata = {
    title: 'Used Car Loan ₹1 Crore | Pre-Owned Car Finance 2026',
    description: 'Get a used car loan of ₹1 crore in India 2026. Instant approval, low interest rates, and flexible EMI for pre-owned cars. Apply online for top used car loan offers and certified car finance.',
    alternates: {
        canonical: 'https://sixfinance.app/usedCar/1-crore',
    },
    keywords: [
        'used car loan 1 crore', 'pre-owned car loan 1 crore', 'second hand car loan 1 crore', 'loan for used car 1 crore', 'loan for pre-owned car 1 crore', 'car finance 1 crore', 'used car loan interest rate 1 crore', 'used car loan EMI 1 crore', 'used car loan eligibility 1 crore', 'used car loan apply online 1 crore', 'used car loan instant approval 1 crore', 'used car loan documents 1 crore', 'used car loan offers 1 crore', 'used car loan 2026 1 crore', 'compare used car loans 1 crore', 'used car loan process 1 crore', 'used car loan approval 1 crore', 'used car loan guide 1 crore', 'used car loan calculator 1 crore', 'used car loan quick disbursal 1 crore', 'used car loan low interest 1 crore', 'used car loan flexible tenure 1 crore', 'used car loan minimum documents 1 crore', 'used car loan eligibility check 1 crore', 'used car loan review 1 crore', 'used car loan tips 1 crore', 'used car loan best banks 1 crore', 'used car loan online 1 crore', 'used car loan without collateral 1 crore', 'used car loan quick approval 1 crore', 'used car loan best rates 1 crore', 'used car loan India 1 crore', 'used car loan 2026 1 crore', 'second hand car finance 1 crore', 'pre-owned car finance 1 crore', 'certified used car loan 1 crore', 'certified pre-owned car finance 1 crore'
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
        title: 'Used Car Loan ₹1 Crore | Pre-Owned Car Finance 2026',
        description: 'Get a used car loan of ₹1 crore in India 2026. Instant approval, low interest rates, and flexible EMI for pre-owned cars. Apply online for top used car loan offers and certified car finance.',
        url: 'https://sixfinance.app/usedCar/1-crore',
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
            <HeroContainer id='used-car-loan-100cr' />
            <LoanSection/>
            <UniversalLoanCard
                categorySlug="used-car-loan"
                headerTitle="Used Car <span class='text-teal-500'>Loan</span>"
                headerSubtitle="Drive Your Dream Car"
                headerDescription="Get up to 100% on-road funding and attractive interest rates on new cars."
                maxDisplay={4}
                showViewAllButton={true}
            />
            <CarLoanGuide pageId="used-car-loan-100cr"/>
        </main>
    );
}