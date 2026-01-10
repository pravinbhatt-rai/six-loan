import React from "react";
import PropertyHero from "@/component/LoanAgainstProperty/PropertyHero";
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
import PropertyCustomerReview from "@/component/LoanAgainstProperty/PropertyCustomerReview";
import PropertyFAQSection from "@/component/LoanAgainstProperty/PropertyFAQSection";
import EmailApply from "@/component/PersonalLoan/EmailApply";
import PropertyCityLoanOffers from "@/component/LoanAgainstProperty/PropertyCityLoanOffers";
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
            <PropertyHero />
            <FeatureSection />
            <LoanSection />
            <UniversalLoanCard
                categorySlug="loan-against-property"
                headerTitle="Property <span class='text-teal-500'>Loan</span>"
                headerSubtitle="Unlock Your Property's Value"
                headerDescription="Get high-value loans by pledging your residential or commercial property."
                maxDisplay={4}
                showViewAllButton={true}
            />
            <LoanInfo loanId="loan-against-property" />
            <ExpertQuoteContainer id="loan-against-property" />
            <LoanBenefits id="loan-against-property" />
            <LoanInfoPage id="loan-against-property" />
            <LoanEligibilityCriteria id="loan-against-property" />
            <LoanTypesContainer id="loan-against-property" />
            <DocumentsRequiredContainer id="loan-against-property" />
            <ThingsToKnow id="loan-against-property" />
            <FeesAndCharges id="loan-against-property" />
            <PreApprovedOffers id="loan-against-property"/>
            <ComparisonContainer id="loan-against-property"/> 
            <LoanGuide id="loan-against-property" />    
            <LoanComparisonGuide id="loan-against-property" /> 
            <SuccessStories id="loan-against-property" /> 
            <LoanInformation id="loan-against-property" />   
            <OurServices />
            <ApplySection />
            <PropertyCustomerReview />
            <PropertyFAQSection />
            <EmailApply />
            <PropertyCityLoanOffers />
            <LoanFooter />
        </main>
    );
}