import { Metadata } from 'next';
import React from "react";
export const metadata: Metadata = {
    title: 'New Car Loan India 2026 | Best Car Loan Offers',
    description: 'Compare new car loan offers in India 2026. Find the best car loan interest rates, eligibility, EMI, and apply online for your dream car.',
    alternates: {
        canonical: 'https://sixfinance.app/newCar',
    },
    keywords: [
        'new car loan', 'car loan india', 'best car loan', 'car loan interest rate', 'car loan eligibility', 'car loan EMI', 'car loan apply online', 'car loan offers', 'car loan documents', 'car loan for salaried', 'car loan for self employed', 'car loan for students', 'car loan 2026', 'compare car loans', 'car loan process', 'car loan approval', 'car loan guide', 'car loan tips', 'car loan calculator', 'car loan instant approval', 'car loan low interest', 'car loan zero down payment', 'car loan best banks', 'car loan online', 'car loan India 2026'
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
        title: 'New Car Loan India 2026 | Best Car Loan Offers',
        description: 'Compare new car loan offers in India 2026. Find the best car loan interest rates, eligibility, EMI, and apply online for your dream car.',
        url: 'https://sixfinance.app/newCar',
        siteName: 'SixFinance',
        type: 'website',
    },
};
import NewCarHero from "@/component/NewCar/NewCarHero";
import FeatureSection from "@/component/PersonalLoan/FeatureSection";
import { LoanSection } from "@/component/PersonalLoan/LoanSection";
import LoanInfo from "@/component/commonComponent/LoanInfo";
import { ExpertQuoteContainer } from "@/component/PersonalLoan/Linkdin";
import LoanBenefits from "@/component/PersonalLoan/LoanBenefits";
import DocumentsRequiredContainer from "@/component/PersonalLoan/DocumentsRequiredContainer";
import FeesAndCharges from '@/component/PersonalLoan/FeesAndCharges';
import OurServices from "@/component/PersonalLoan/OurServices";
import ApplySection from "@/component/PersonalLoan/ApplySection";
import { CarLoanCustomerReview } from "@/component/NewCar/CarLoanCustomerReview";
import { CarLoanFAQSection } from "@/component/NewCar/CarLoanFAQSection";
import EmailApply from "@/component/PersonalLoan/EmailApply";
import NewCarCityLoanOffers from "@/component/NewCar/NewCarCityLoanOffers";
import UniversalLoanCard from '@/component/loan/UniversalLoanCard';
import LoanInfoPage from '@/component/PersonalLoan/LoanInfoPage';
import LoanEligibilityCriteria from '@/component/PersonalLoan/LoanEligibilityCriteria';
import LoanTypesContainer from "@/component/PersonalLoan/LoanTypesContainer";
import ThingsToKnow from '@/component/PersonalLoan/ThingsToKnow';
import PreApprovedOffers from '@/component/PersonalLoan/PreApprovedOffers';
import ComparisonContainer from '@/component/PersonalLoan/ComparisonContainer';
import LoanGuide from '@/component/PersonalLoan/LoanGuide';
import LoanComparisonGuide from '@/component/PersonalLoan/LoanComparisonGuide';
import SuccessStories from '@/component/PersonalLoan/SuccessStories';

import LoanInformation from '@/component/PersonalLoan/LoanInformation';

export default function Page() {
    return (
        <div>
            <NewCarHero />
            <FeatureSection />
            <LoanSection />
            <UniversalLoanCard
                categorySlug="new-car-loan"
                headerTitle="Car <span class='text-teal-500'>Loan</span>"
                headerSubtitle="Drive Your Dream Car"
                headerDescription="Get up to 100% on-road funding and attractive interest rates on new cars."
                maxDisplay={4}
                showViewAllButton={true}
            />
            <LoanInfo loanId="new-car-loan"/>
            <ExpertQuoteContainer id="new-car-loan" />
            <LoanBenefits id="new-car-loan" />
            <LoanInfoPage id="new-car-loan" />
            <LoanEligibilityCriteria id="new-car-loan" />
            <LoanTypesContainer id="new-car-loan" />
            <DocumentsRequiredContainer id="new-car-loan" />
            <ThingsToKnow id="new-car-loan" />
            <FeesAndCharges id="new-car-loan" />
            <PreApprovedOffers id="new-car-loan"/>
            <ComparisonContainer id="new-car-loan"/>
            <LoanGuide id="new-car-loan" />
            <LoanComparisonGuide id="new-car-loan" />
            <SuccessStories id="new-car-loan" />
            <LoanInformation id="new-car-loan" />
            <OurServices />
            <ApplySection />
            <CarLoanCustomerReview />
            <CarLoanFAQSection />
            <EmailApply />
            <NewCarCityLoanOffers />
            
        </div>
    );
}