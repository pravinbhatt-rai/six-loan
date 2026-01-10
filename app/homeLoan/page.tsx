import React from "react";
import HomeLoan from "@/component/HomeLoan/HomeLoanHero";
import FeatureSection from "@/component/PersonalLoan/FeatureSection";
import { LoanSection } from "@/component/PersonalLoan/LoanSection";
import LoanInfo from "@/component/commonComponent/LoanInfo";
import { ExpertQuoteContainer } from "@/component/PersonalLoan/Linkdin";
import LoanBenefits from "@/component/PersonalLoan/LoanBenefits";
import LoanInfoPage from '@/component/PersonalLoan/LoanInfoPage';
import LoanEligibilityCriteria from '@/component/PersonalLoan/LoanEligibilityCriteria';
import LoanTypesContainer from "@/component/PersonalLoan/LoanTypesContainer";
import DocumentsRequiredContainer from "@/component/PersonalLoan/DocumentsRequiredContainer";
import ThingsToKnow from '@/component/PersonalLoan/ThingsToKnow';
import FeesAndCharges from '@/component/PersonalLoan/FeesAndCharges';
import OurServices from "@/component/PersonalLoan/OurServices";
import ApplySection from "@/component/PersonalLoan/ApplySection";
import HomeCustomerReview from "@/component/HomeLoan/HomeCustomerReview";
import HomeFAQSection from "@/component/HomeLoan/HomeFAQSection";
import HomeCityLoanOffers from "@/component/HomeLoan/HomeCityLoanOffers";
import LoanFooter from "@/component/PersonalLoan/LoanFooter";
import UniversalLoanCard from '@/component/loan/UniversalLoanCard';
import PreApprovedOffers from '@/component/PersonalLoan/PreApprovedOffers';
import ComparisonContainer from '@/component/PersonalLoan/ComparisonContainer';
import LoanGuide from '@/component/PersonalLoan/LoanGuide';
import LoanComparisonGuide from '@/component/PersonalLoan/LoanComparisonGuide';
import SuccessStories from '@/component/PersonalLoan/SuccessStories';
import LoanInformation from '@/component/PersonalLoan/LoanInformation';

export default function Page() {
    return (
        <main>
            <HomeLoan />
            <FeatureSection />
            <LoanSection />
            <UniversalLoanCard
                categorySlug="home-loan"
                headerTitle="Home <span class='text-teal-500'>Loan</span>"
                headerSubtitle="Your Dream Home Awaits"
                headerDescription="Low interest rates and higher eligibility for buying or constructing your home."
                maxDisplay={4}
                showViewAllButton={true}
            />
            <LoanInfo loanId="home-loan" />
            <ExpertQuoteContainer id="home-loan" />
            <LoanBenefits id="home-loan" />
            <LoanInfoPage id="home-loan" />
            <LoanEligibilityCriteria id="home-loan" />
            <LoanTypesContainer id="home-loan" />
            <DocumentsRequiredContainer id="home-loan" />
            <ThingsToKnow id="home-loan" />
            <FeesAndCharges id="home-loan" />
            <PreApprovedOffers id="home-loan"/>
            <ComparisonContainer id="home-loan"/>
            <LoanGuide id="home-loan" />
            <LoanComparisonGuide id="home-loan" />
            <SuccessStories id="home-loan" />
            <LoanInformation id="home-loan" />
            <OurServices />
            <ApplySection />
            <HomeCustomerReview />
            <HomeFAQSection />
            <HomeCityLoanOffers />
            <LoanFooter />
        </main>
    );
}