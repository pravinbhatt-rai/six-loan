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
import UniversalLoanCard from '@/component/loan/UniversalLoanCard';
import PreApprovedOffers from '@/component/PersonalLoan/PreApprovedOffers';
import ComparisonContainer from '@/component/PersonalLoan/ComparisonContainer';
import LoanGuide from '@/component/PersonalLoan/LoanGuide';
import LoanComparisonGuide from '@/component/PersonalLoan/LoanComparisonGuide';
import SuccessStories from '@/component/PersonalLoan/SuccessStories';
import LoanInformation from '@/component/PersonalLoan/LoanInformation';
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl = "https://sixfinance.app/homeLoan";

  return {
    title:
      "Home Loan in India | Interest Rates, EMI & Eligibility – Six Finance",
    description:
      "Apply for a home loan with Six Finance. Compare interest rates, calculate EMI, check eligibility, documents required, and get fast approval for buying or constructing your dream home.",

    keywords: [
      "home loan",
      "home loan india",
      "housing loan",
      "home loan interest rates",
      "home loan emi calculator",
      "home loan eligibility",
      "home loan documents required",
      "low interest home loan",
      "bank home loan",
      "home loan for house purchase",
      "home loan for construction",
      "nri home loan",
      "home loan for women",
      "home loan for self employed",
      "home loan top up",
      "home renovation loan",
      "six finance home loan",
    ],

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title: "Home Loan in India | EMI, Rates & Eligibility – Six Finance",
      description:
        "Compare home loans from top banks & NBFCs. Check EMI, eligibility, and apply online for the best home loan with Six Finance.",
      url: canonicalUrl,
      siteName: "Six Finance",
      type: "website",
      locale: "en_IN",
    },

    twitter: {
      card: "summary_large_image",
      title: "Home Loan in India | Six Finance",
      description:
        "Apply for a home loan with low interest rates, easy eligibility, and fast approval with Six Finance.",
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
                loanType="home"
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
        </main>
    );
}