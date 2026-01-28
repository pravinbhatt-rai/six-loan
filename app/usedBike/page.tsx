import React from "react";
import UsedBikeHero from "@/component/UsedBike/UsedBikeHero";
import FeatureSection from "@/component/PersonalLoan/FeatureSection";
import { LoanSection } from "@/component/PersonalLoan/LoanSection";
import LoanInfo from "@/component/commonComponent/LoanInfo";
import { ExpertQuoteContainer } from "@/component/PersonalLoan/Linkdin";
import LoanBenefits from "@/component/PersonalLoan/LoanBenefits";
import LoanInfoPage from '@/component/PersonalLoan/LoanInfoPage';
import DocumentsRequiredContainer from "@/component/PersonalLoan/DocumentsRequiredContainer";
import OurServices from "@/component/PersonalLoan/OurServices";
import ApplySection from "@/component/PersonalLoan/ApplySection";
import { UsedBikeCustomerReview } from "@/component/UsedBike/UsedBikeCustomerReview";
import { UsedBikeFAQSection } from "@/component/UsedBike/UsedBikeFAQSection";
import EmailApply from "@/component/PersonalLoan/EmailApply";
import UsedBikeCityLoanOffers from "@/component/UsedBike/UsedBikeCityLoanOffers";
import UniversalLoanCard from '@/component/loan/UniversalLoanCard';
import LoanEligibilityCriteria from '@/component/PersonalLoan/LoanEligibilityCriteria';
import LoanTypesContainer from "@/component/PersonalLoan/LoanTypesContainer";
import ThingsToKnow from '@/component/PersonalLoan/ThingsToKnow';
import FeesAndCharges from '@/component/PersonalLoan/FeesAndCharges';
import PreApprovedOffers from '@/component/PersonalLoan/PreApprovedOffers';
import ComparisonContainer from '@/component/PersonalLoan/ComparisonContainer';
import LoanGuide from '@/component/PersonalLoan/LoanGuide';
import LoanComparisonGuide from '@/component/PersonalLoan/LoanComparisonGuide';
import SuccessStories from '@/component/PersonalLoan/SuccessStories';
import LoanInformation from '@/component/PersonalLoan/LoanInformation';
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl = "https://sixfinance.app/usedBike";

  return {
    title:
      "Used Bike Loan in India | Second Hand Two Wheeler Loan – Six Finance",

    description:
      "Apply for a used bike loan in India with Six Finance. Get easy financing for second-hand bikes and scooters with low EMIs, minimal documents, and quick approval.",

    keywords: [
      "used bike loan",
      "second hand bike loan",
      "used two wheeler loan",
      "used scooter loan",
      "second hand bike finance",
      "used bike loan EMI",
      "used bike loan eligibility",
      "documents for used bike loan",
      "used bike loan interest rate",
      "low EMI used bike loan",
      "used bike loan online",
      "used bike loan near me",
      "six finance used bike loan",
      "used motorcycle loan",
      "used bike loan without collateral"
    ],

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title: "Used Bike Loan in India | Second Hand Bike Finance – Six Finance",
      description:
        "Finance your second-hand bike or scooter with affordable EMIs. Trusted used bike loan platform across India.",
      url: canonicalUrl,
      siteName: "Six Finance",
      type: "website",
      locale: "en_IN",
    },

    twitter: {
      card: "summary_large_image",
      title: "Used Bike Loan in India | Six Finance",
      description:
        "Affordable used bike loans with quick approval and minimal paperwork.",
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}


export default function Page() {
    return (
        <div>
            <UsedBikeHero />
            <FeatureSection />
            <LoanSection />
            <UniversalLoanCard
                categorySlug="used-two-wheeler-loan"
                headerTitle="Used Bike <span class='text-teal-500'>Loan</span>"
                headerSubtitle="Budget Friendly Rides"
                headerDescription="Affordable financing for purchasing second-hand motorcycles and scooters."
                maxDisplay={4}
                showViewAllButton={true}
            />
            <LoanInfo loanId="used-bike-loan" />
            <ExpertQuoteContainer id="used-bike-loan" />
            <LoanBenefits id="used-bike-loan" />
            <LoanInfoPage id="used-bike-loan" />
            <LoanEligibilityCriteria id="used-bike-loan" />
            <LoanTypesContainer id="used-bike-loan" />
            <DocumentsRequiredContainer id="used-bike-loan" />
            <ThingsToKnow id="used-bike-loan" />
            <FeesAndCharges id="used-bike-loan" />
            <PreApprovedOffers id="used-bike-loan"/>
            <ComparisonContainer id="used-bike-loan"/>
            <LoanGuide id="used-bike-loan" />
            <LoanComparisonGuide id="used-bike-loan" />
            <SuccessStories id="used-bike-loan" />
            <LoanInformation id="used-bike-loan" />
            <OurServices />
            <ApplySection />
            <UsedBikeCustomerReview />
            <UsedBikeFAQSection />
            <EmailApply />
            <UsedBikeCityLoanOffers />
        </div>
    );
}