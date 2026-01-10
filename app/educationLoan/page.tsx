import React from "react";
import EduHero from "../../component/EducationLoan/EduHero";
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
import { EducationCustomerReview } from "@/component/EducationLoan/EducationCustomerReview";
import { EducationFAQSection } from "@/component/EducationLoan/EducationFAQSection";
import EducationCityLoanOffers from "@/component/EducationLoan/EducationCityLoanOffers";
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
            <EduHero />
            <FeatureSection />
            <LoanSection />
            <UniversalLoanCard 
                categorySlug="education-loan"
                headerTitle="Education Loans"
                headerSubtitle="Fund Your Dreams"
                headerDescription="Compare and apply for the best education loans"
                maxDisplay={4}
                showViewAllButton={true}
            />
            <LoanInfo loanId="education-loan"/>
            <ExpertQuoteContainer id="education-loan" />
            <LoanBenefits id="education-loan" />
            <LoanInfoPage id="education-loan" />
            <LoanEligibilityCriteria id="education-loan" />
            <LoanTypesContainer id="education-loan" />
            <DocumentsRequiredContainer id="education-loan" />
            <ThingsToKnow id="education-loan" />
            <FeesAndCharges id="education-loan" />
            <PreApprovedOffers id="education-loan"/>
            <ComparisonContainer id="education-loan"/>
            <LoanGuide id="education-loan" />
            <LoanComparisonGuide id="education-loan" />
            <SuccessStories id="education-loan" />
            <LoanInformation id="education-loan" />
            <OurServices />
            <EducationCustomerReview />
            <EducationFAQSection />
            <EducationCityLoanOffers />
            <LoanFooter />
        </main>
    );
}