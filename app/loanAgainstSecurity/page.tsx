import React from "react";
import SecuritiesHero from "@/component/LoanAgainstSecurity/SecuritiesLoanHero";
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
import { SecuritiesCustomerReview } from "@/component/LoanAgainstSecurity/SecuritiesCustomerReview";
import { SecuritiesFAQSection } from "@/component/LoanAgainstSecurity/SecuritiesFAQSection";
import EmailApply from "@/component/PersonalLoan/EmailApply";
import SecuritiesCityLoanOffers from "@/component/LoanAgainstSecurity/SecuritiesCityLoanOffers";
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
            <SecuritiesHero />
            <FeatureSection />
            <LoanSection />
            <UniversalLoanCard
                categorySlug="loan-against-securities"
                headerTitle="Loan Against <span class='text-teal-500'>Security</span>"
                headerSubtitle="Leverage Your Investments"
                headerDescription="Get funds against shares, mutual funds, or bonds without selling them."
                maxDisplay={4}
                showViewAllButton={true}
            />
            <LoanInfo loanId="loan-against-security" />
            <ExpertQuoteContainer id="loan-against-security" />
            <LoanBenefits id="loan-against-security" />
            <LoanInfoPage id="loan-against-security" />
            <LoanEligibilityCriteria id="loan-against-security" />
            <LoanTypesContainer id="loan-against-security" />
            <DocumentsRequiredContainer id="loan-against-security" />
            <ThingsToKnow id="loan-against-security" />
            <FeesAndCharges id="loan-against-security" />
            <PreApprovedOffers id="loan-against-security" />
            <ComparisonContainer id="loan-against-security"/>
            <LoanGuide id="loan-against-security" />
            <LoanComparisonGuide id="loan-against-security" />
            <SuccessStories id="loan-against-security" />
            <LoanInformation id="loan-against-security" />
            <OurServices />
            <ApplySection />
            <SecuritiesCustomerReview />
            <SecuritiesFAQSection />
            <EmailApply />
            <SecuritiesCityLoanOffers />
            <LoanFooter />
        </main>
    );
}