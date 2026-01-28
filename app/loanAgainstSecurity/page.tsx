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
import UniversalLoanCard from '@/component/loan/UniversalLoanCard';
import PreApprovedOffers from '@/component/PersonalLoan/PreApprovedOffers';
import ComparisonContainer from '@/component/PersonalLoan/ComparisonContainer';
import LoanGuide from '@/component/PersonalLoan/LoanGuide';
import LoanComparisonGuide from '@/component/PersonalLoan/LoanComparisonGuide';
import SuccessStories from '@/component/PersonalLoan/SuccessStories';
import LoanInformation from '@/component/PersonalLoan/LoanInformation';
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl = "https://sixfinance.app/loanAgainstSecurity";

  return {
    title:
      "Loan Against Securities (LAS) | Interest Rates, Eligibility – Six Finance",

    description:
      "Apply for a Loan Against Securities with Six Finance. Get instant funds against shares, mutual funds, bonds, or ETFs without selling your investments.",

    keywords: [
      "loan against securities",
      "loan against shares",
      "loan against mutual funds",
      "loan against bonds",
      "loan against securities india",
      "las loan",
      "loan against security",
      "secured loan against investments",
      "loan against securities interest rate",
      "loan against securities eligibility",
      "loan against securities documents required",
      "loan against securities emi calculator",
      "high value loan against securities",
      "instant loan against securities",
      "six finance loan against securities",
    ],

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title: "Loan Against Securities | Six Finance",
      description:
        "Leverage your investments with a Loan Against Securities. Get funding against shares, mutual funds, or bonds while staying invested.",
      url: canonicalUrl,
      siteName: "Six Finance",
      type: "website",
      locale: "en_IN",
    },

    twitter: {
      card: "summary_large_image",
      title: "Loan Against Securities | Six Finance",
      description:
        "Get instant liquidity against your investments with Six Finance’s Loan Against Securities.",
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
            
        </main>
    );
}