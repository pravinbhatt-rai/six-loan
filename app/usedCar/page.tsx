import { Metadata } from 'next';
import React from "react";
export const metadata: Metadata = {
    title: 'Used Car Loan | Pre-Owned Car Finance 2026',
    description: 'Compare used car loans in India 2026. Get instant approval, low interest rates, and flexible EMI for pre-owned cars. Apply online for top used car loan offers and certified car finance.',
    alternates: {
        canonical: 'https://sixfinance.app/usedCar',
    },
    keywords: [
        'used car loan', 'pre-owned car loan', 'second hand car loan', 'loan for used car', 'loan for pre-owned car', 'car finance', 'used car loan interest rate', 'used car loan EMI', 'used car loan eligibility', 'used car loan apply online', 'used car loan instant approval', 'used car loan documents', 'used car loan offers', 'used car loan 2026', 'compare used car loans', 'used car loan process', 'used car loan approval', 'used car loan guide', 'used car loan calculator', 'used car loan quick disbursal', 'used car loan low interest', 'used car loan flexible tenure', 'used car loan minimum documents', 'used car loan eligibility check', 'used car loan review', 'used car loan tips', 'used car loan best banks', 'used car loan online', 'used car loan without collateral', 'used car loan quick approval', 'used car loan best rates', 'used car loan India', 'used car loan 2026', 'second hand car finance', 'pre-owned car finance', 'certified used car loan', 'certified pre-owned car finance'
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
        title: 'Used Car Loan | Pre-Owned Car Finance 2026',
        description: 'Compare used car loans in India 2026. Get instant approval, low interest rates, and flexible EMI for pre-owned cars. Apply online for top used car loan offers and certified car finance.',
        url: 'https://sixfinance.app/usedCar',
        siteName: 'SixFinance',
        type: 'website',
    },
};
import UsedCarLoanHero from "@/component/UsedCar/UsedCarLoanHero";
import FeatureSection from "@/component/PersonalLoan/FeatureSection";
import { LoanSection } from "@/component/PersonalLoan/LoanSection";
import LoanInfo from "@/component/commonComponent/LoanInfo";
import { ExpertQuoteContainer } from "@/component/PersonalLoan/Linkdin";
import LoanBenefits from "@/component/PersonalLoan/LoanBenefits";
import DocumentsRequiredContainer from "@/component/PersonalLoan/DocumentsRequiredContainer";
import PreApprovedOffers from '@/component/PersonalLoan/PreApprovedOffers';
import OurServices from "@/component/PersonalLoan/OurServices";
import ApplySection from "@/component/PersonalLoan/ApplySection";
import { UsedCarCustomerReview } from "@/component/UsedCar/UsedCarCustomerReview";
import { UsedCarFAQSection } from "@/component/UsedCar/UsedCarFAQSection";
import EmailApply from "@/component/PersonalLoan/EmailApply";
import UsedCarCityLoanOffers from "@/component/UsedCar/UsedCarCityLoanOffers";
import UniversalLoanCard from '@/component/loan/UniversalLoanCard';
import LoanInfoPage from '@/component/PersonalLoan/LoanInfoPage';
import LoanEligibilityCriteria from '@/component/PersonalLoan/LoanEligibilityCriteria';
import LoanTypesContainer from "@/component/PersonalLoan/LoanTypesContainer";
import ThingsToKnow from '@/component/PersonalLoan/ThingsToKnow';
import FeesAndCharges from '@/component/PersonalLoan/FeesAndCharges';
import ComparisonContainer from '@/component/PersonalLoan/ComparisonContainer';
import LoanGuide from '@/component/PersonalLoan/LoanGuide';
import LoanComparisonGuide from '@/component/PersonalLoan/LoanComparisonGuide';
import SuccessStories from '@/component/PersonalLoan/SuccessStories';
import LoanInformation from '@/component/PersonalLoan/LoanInformation';


export default function Page() {
    return (
        <div>
            <UsedCarLoanHero />
            <FeatureSection />
            <LoanSection />
            <UniversalLoanCard
                categorySlug="used-car-loan"
                headerTitle="Used Car <span class='text-teal-500'>Loan</span>"
                headerSubtitle="Pre-owned Cars Made Easy"
                headerDescription="Hassle-free loans for buying certified pre-owned cars with quick disbursal."
                maxDisplay={4}
                showViewAllButton={true}
            />
            <LoanInfo loanId="used-car-loan"/>
            <ExpertQuoteContainer id="used-car-loan" />
            <LoanBenefits id="used-car-loan" />
            <LoanInfoPage id="used-car-loan" />
            <LoanEligibilityCriteria id="used-car-loan" />
            <LoanTypesContainer id="used-car-loan" />
            <DocumentsRequiredContainer id="used-car-loan" />
            <ThingsToKnow id="used-car-loan" />
            <FeesAndCharges id="used-car-loan" />
            <PreApprovedOffers id="used-car-loan"/>
            <ComparisonContainer id="used-car-loan"/>
            <LoanGuide id="used-car-loan" />
            <LoanComparisonGuide id="used-car-loan" />
            <SuccessStories id="used-car-loan" />
            <LoanInformation id="used-car-loan" />
            <OurServices />
            <ApplySection />
            <UsedCarCustomerReview />
            <UsedCarFAQSection />
            <EmailApply />
            <UsedCarCityLoanOffers />
        </div>
    );
}