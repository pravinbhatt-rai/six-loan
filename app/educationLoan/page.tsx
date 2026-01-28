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
import UniversalLoanCard from '@/component/loan/UniversalLoanCard';
import PreApprovedOffers from '@/component/PersonalLoan/PreApprovedOffers';
import ComparisonContainer from '@/component/PersonalLoan/ComparisonContainer';
import LoanGuide from '@/component/PersonalLoan/LoanGuide';
import LoanComparisonGuide from '@/component/PersonalLoan/LoanComparisonGuide';
import SuccessStories from '@/component/PersonalLoan/SuccessStories';
import LoanInformation from '@/component/PersonalLoan/LoanInformation';
import type { Metadata } from "next";
import React from "react";

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl = "https://sixfinance.app/educationLoan";

  return {
    title:
      "Education Loan in India | Study in India & Abroad – Six Finance",
    description:
      "Apply for education loans in India with Six Finance. Compare study loans for India and abroad, get low interest rates, flexible repayment, and fast approvals.",

    keywords: [
      "education loan",
      "education loan india",
      "study loan india",
      "student loan india",
      "education loan for abroad studies",
      "study abroad loan",
      "education loan without collateral",
      "education loan interest rate",
      "education loan eligibility",
      "education loan documents required",
      "education loan six finance",
      "student loan apply online",
    ],

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title: "Education Loan in India | Study Loans – Six Finance",
      description:
        "Compare and apply for education loans for India and abroad. Get student loans with low interest rates and flexible repayment options with Six Finance.",
      url: canonicalUrl,
      siteName: "Six Finance",
      type: "website",
      locale: "en_IN",
    },

    twitter: {
      card: "summary_large_image",
      title: "Education Loan in India | Six Finance",
      description:
        "Apply online for education loans with easy eligibility, low interest rates, and expert guidance.",
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
        </main>
    );
}