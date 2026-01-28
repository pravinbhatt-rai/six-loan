import React from "react";
import ProfessionalLoanHero from "@/component/professionalLoan/ProfessionalLoanHero";
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
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl = "https://sixfinance.app/professionalLoan";

  return {
    title:
      "Professional Loan for Doctors, CAs & Engineers | Interest Rates – Six Finance",

    description:
      "Apply for a Professional Loan with Six Finance. Exclusive offers for doctors, chartered accountants, engineers & architects with low interest rates and minimal documentation.",

    keywords: [
      "professional loan",
      "professional loan india",
      "professional loan for doctors",
      "professional loan for ca",
      "professional loan for engineers",
      "professional loan for architects",
      "doctor loan",
      "ca loan",
      "engineer loan",
      "professional loan interest rates",
      "professional loan eligibility",
      "professional loan documents required",
      "professional loan emi calculator",
      "collateral free professional loan",
      "six finance professional loan",
    ],

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title: "Professional Loan | Doctors, CAs & Engineers – Six Finance",
      description:
        "Get customized professional loans designed for doctors, CAs & engineers. Faster approvals, higher limits, and flexible repayment.",
      url: canonicalUrl,
      siteName: "Six Finance",
      type: "website",
      locale: "en_IN",
    },

    twitter: {
      card: "summary_large_image",
      title: "Professional Loan | Six Finance",
      description:
        "Exclusive professional loans for doctors, CAs, engineers & architects with minimal paperwork.",
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}


export default function Page() {
    return (
        <main>
            <ProfessionalLoanHero />
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
            
        </main>
    );
}