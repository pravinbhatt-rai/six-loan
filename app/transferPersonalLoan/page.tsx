import React from "react";
import PersonalLoanHero from "@/component/transferPersonalLoan/PersonalLoanHero";
import FeatureSection from "@/component/PersonalLoan/FeatureSection";
import { LoanSection } from "@/component/PersonalLoan/LoanSection";
import LoanInfo from '@/component/commonComponent/LoanInfo';
import { ExpertQuoteContainer } from "@/component/PersonalLoan/Linkdin";
import LoanBenefits from "@/component/PersonalLoan/LoanBenefits";
import LoanInfoPage from '@/component/PersonalLoan/LoanInfoPage';
import LoanEligibilityCriteria from '@/component/PersonalLoan/LoanEligibilityCriteria';
import LoanTypesContainer from "@/component/PersonalLoan/LoanTypesContainer";
import DocumentsRequiredContainer from "@/component/PersonalLoan/DocumentsRequiredContainer";
import FeesAndCharges from '@/component/PersonalLoan/FeesAndCharges';
import OurServices from "@/component/PersonalLoan/OurServices";
import ApplySection from "@/component/PersonalLoan/ApplySection";
import TransferCustomerReview from "@/component/transferPersonalLoan/TransferCustomerReview";
import TransferFAQ from "@/component/transferPersonalLoan/TransferFAQ";
import EmailApply from "@/component/PersonalLoan/EmailApply";
import CityTransferOffers from "@/component/transferPersonalLoan/CityTransferOffers";
import UniversalLoanCard from '@/component/loan/UniversalLoanCard';
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
            <PersonalLoanHero />
            <FeatureSection />
            <LoanSection />
            <UniversalLoanCard
                categorySlug="personal-transfer-loan"
                headerTitle="PL <span class='text-teal-500'>Transfer</span>"
                headerSubtitle="Lower Your Interest Burden"
                headerDescription="Transfer your high-interest Personal Loan to pay lower EMIs instantly."
                maxDisplay={4}
                showViewAllButton={true}
            />
            <LoanInfo loanId="transfer-personal-loan" />
            <ExpertQuoteContainer id="transfer-personal-loan" />
            <LoanBenefits id="transfer-personal-loan" />
            <LoanInfoPage id="transfer-personal-loan" />
            <LoanEligibilityCriteria id="transfer-personal-loan" />
            <LoanTypesContainer id="transfer-personal-loan" />
            <DocumentsRequiredContainer id="transfer-personal-loan" />
            <ThingsToKnow id="transfer-personal-loan" />
            <FeesAndCharges id="transfer-personal-loan" />
            <PreApprovedOffers id="transfer-personal-loan"/>
            <ComparisonContainer id="transfer-personal-loan"/>
            <LoanGuide id="transfer-personal-loan" />
            <LoanComparisonGuide id="transfer-personal-loan" />
            <SuccessStories id="transfer-personal-loan" />
            <LoanInformation id="transfer-personal-loan" />
            <OurServices />
            <ApplySection />
            <TransferCustomerReview />
            <TransferFAQ />
            <EmailApply />
            <CityTransferOffers />
            
        </main>
    );
}