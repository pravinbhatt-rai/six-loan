import React from "react";
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