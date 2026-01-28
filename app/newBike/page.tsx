import { Metadata } from 'next';
import React from "react";
export const metadata: Metadata = {
    title: 'New Bike Loan India 2026 | Best Two Wheeler Loan Offers',
    description: 'Compare new bike loan offers in India 2026. Find the best two wheeler loan interest rates, eligibility, EMI, and apply online for your dream bike.',
    alternates: {
        canonical: 'https://sixfinance.app/newBike',
    },
    keywords: [
        'new bike loan', 'two wheeler loan', 'bike loan india', 'best bike loan', 'bike loan interest rate', 'bike loan eligibility', 'bike loan EMI', 'bike loan apply online', 'bike loan offers', 'bike loan documents', 'bike loan for salaried', 'bike loan for self employed', 'bike loan for students', 'bike loan 2026', 'compare bike loans', 'bike loan process', 'bike loan approval', 'bike loan guide', 'bike loan tips', 'bike loan calculator', 'bike loan instant approval', 'bike loan low interest', 'bike loan zero down payment', 'bike loan best banks', 'bike loan online', 'bike loan India 2026'
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
        title: 'New Bike Loan India 2026 | Best Two Wheeler Loan Offers',
        description: 'Compare new bike loan offers in India 2026. Find the best two wheeler loan interest rates, eligibility, EMI, and apply online for your dream bike.',
        url: 'https://sixfinance.app/newBike',
        siteName: 'SixFinance',
        type: 'website',
    },
};
import BikeHero from "@/component/NewBike/BikeHero";
import FeatureSection from "@/component/PersonalLoan/FeatureSection";
import { LoanSection } from "@/component/PersonalLoan/LoanSection";
import LoanInfo from "@/component/commonComponent/LoanInfo";
import { ExpertQuoteContainer } from "@/component/PersonalLoan/Linkdin";
import LoanBenefits from "@/component/PersonalLoan/LoanBenefits"; 
import DocumentsRequiredContainer from "@/component/PersonalLoan/DocumentsRequiredContainer";
import OurServices from "@/component/PersonalLoan/OurServices";
import ApplySection from "@/component/PersonalLoan/ApplySection";
import { BikeLoanCustomerReview } from "@/component/NewBike/BikeLoanCustomerReview";
import { BikeLoanFAQSection } from "@/component/NewBike/BikeLoanFAQSection";
import EmailApply from "@/component/PersonalLoan/EmailApply";
import NewBikeCityLoanOffers from "@/component/NewBike/NewBikeCityLoanOffers";
import UniversalLoanCard from '@/component/loan/UniversalLoanCard';
import LoanInfoPage from '@/component/PersonalLoan/LoanInfoPage';
import LoanEligibilityCriteria from '@/component/PersonalLoan/LoanEligibilityCriteria';
import LoanTypesContainer from "@/component/PersonalLoan/LoanTypesContainer";
import ThingsToKnow from '@/component/PersonalLoan/ThingsToKnow';
import FeesAndCharges from '@/component/PersonalLoan/FeesAndCharges';
import PreApprovedOffers from "@/component/PersonalLoan/PreApprovedOffers";
import ComparisonContainer from '@/component/PersonalLoan/ComparisonContainer';
import LoanGuide from '@/component/PersonalLoan/LoanGuide';
import LoanComparisonGuide from '@/component/PersonalLoan/LoanComparisonGuide';
import SuccessStories from '@/component/PersonalLoan/SuccessStories';
import LoanInformation from '@/component/PersonalLoan/LoanInformation';

export default function Page() {
    return (
        <div>
            <BikeHero />
            <FeatureSection />
            <LoanSection />
            <UniversalLoanCard
                categorySlug="two-wheeler-loan"
                headerTitle="Bike <span class='text-teal-500'>Loan</span>"
                headerSubtitle="Ride Your Dream Bike"
                headerDescription="Easy financing options with low down payments for new two-wheelers."
                maxDisplay={4}
                showViewAllButton={true}
            />
            <LoanInfo loanId="new-bike-loan" />
            <ExpertQuoteContainer id="new-bike-loan" />
            <LoanBenefits id="new-bike-loan" />
            <LoanInfoPage id="new-bike-loan" />
            <LoanEligibilityCriteria id="new-bike-loan" />
            <LoanTypesContainer id="new-bike-loan" />
            <DocumentsRequiredContainer id="new-bike-loan" />
            <ThingsToKnow id="new-bike-loan" />
            <FeesAndCharges id="new-bike-loan" />
            <PreApprovedOffers id="new-bike-loan" />
            <ComparisonContainer id="new-bike-loan"/>
            <LoanGuide id="new-bike-loan" />
            <LoanComparisonGuide id="new-bike-loan" />
            <SuccessStories id="new-bike-loan" />
            <LoanInformation id="new-bike-loan" />
            <OurServices />
            <ApplySection />
            <BikeLoanCustomerReview />
            <BikeLoanFAQSection />
            <EmailApply />
            <NewBikeCityLoanOffers />
        </div>
    );
}