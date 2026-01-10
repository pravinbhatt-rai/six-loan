import React from "react";
import { ProfessionalHero } from "../../component/professionalLoan/ProfessinalHero";
import FeatureSection from "@/component/PersonalLoan/FeatureSection";
import { LoanSection } from "@/component/PersonalLoan/LoanSection";
import { ExpertQuoteContainer } from "@/component/PersonalLoan/Linkdin";
import LoanBenefits from "@/component/PersonalLoan/LoanBenefits";
import LoanInfoPage from '@/component/PersonalLoan/LoanInfoPage';
import LoanTypesContainer from "@/component/PersonalLoan/LoanTypesContainer";
import DocumentsRequiredContainer from "@/component/PersonalLoan/DocumentsRequiredContainer";
import FeesAndCharges from '@/component/PersonalLoan/FeesAndCharges';
import OurServices from "@/component/PersonalLoan/OurServices";
import ApplySection from '@/component/PersonalLoan/ApplySection';
import FAQSection from "@/component/professionalLoan/FAQSection";
import EmailApply from '@/component/PersonalLoan/EmailApply';
import LoanFooter from '@/component/PersonalLoan/LoanFooter';
import UniversalLoanCard from '@/component/loan/UniversalLoanCard';
import LoanInfo from '@/component/commonComponent/LoanInfo';
import LoanEligibilityCriteria from '@/component/PersonalLoan/LoanEligibilityCriteria';
import ThingsToKnow from '@/component/PersonalLoan/ThingsToKnow';
import PreApprovedOffers from '@/component/PersonalLoan/PreApprovedOffers';
import ComparisonContainer from '@/component/PersonalLoan/ComparisonContainer';
import LoanGuide from '@/component/PersonalLoan/LoanGuide';
import LoanComparisonGuide from '@/component/PersonalLoan/LoanComparisonGuide';
import SuccessStories from '@/component/PersonalLoan/SuccessStories';
import LoanInformation from '@/component/PersonalLoan/LoanInformation';

export default function Page() {
    return (
        <main>
            <ProfessionalHero />
            <FeatureSection />
            <LoanSection />
            <UniversalLoanCard
                categorySlug="professional-loan"
                headerTitle="Professional <span class='text-teal-500'>Loan</span>"
                headerSubtitle="For Doctors, CAs & Engineers"
                headerDescription="Exclusive customized offers for certified professionals with minimal documentation."
                maxDisplay={4}
                showViewAllButton={true}
            />
            <LoanInfo loanId="professional-loan" />
            <ExpertQuoteContainer id="professional-loan" />
            <LoanBenefits id="professional-loan" />
            <LoanInfoPage id="professional-loan" />
            <LoanEligibilityCriteria id="professional-loan" />
            <LoanTypesContainer id="professional-loan" />
            <DocumentsRequiredContainer id="professional-loan" />
            <ThingsToKnow id="professional-loan" />
            <FeesAndCharges id="professional-loan" />
            <PreApprovedOffers id="professional-loan"/>
            <ComparisonContainer id="professional-loan"/>
            <LoanGuide id="professional-loan" />
            <LoanComparisonGuide id="professional-loan" />
            <SuccessStories id="professional-loan" />
            <LoanInformation id="professional-loan" />
            <OurServices />
            <ApplySection />
            <FAQSection />
            <EmailApply />
            <LoanFooter />
        </main>
    );
}