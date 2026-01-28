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
import UniversalLoanCard from '@/component/loan/UniversalLoanCard';
import PreApprovedOffers from '@/component/PersonalLoan/PreApprovedOffers';
import ComparisonContainer from '@/component/PersonalLoan/ComparisonContainer';
import LoanGuide from '@/component/PersonalLoan/LoanGuide';
import LoanComparisonGuide from '@/component/PersonalLoan/LoanComparisonGuide';
import SuccessStories from '@/component/PersonalLoan/SuccessStories';
import LoanInformation from '@/component/PersonalLoan/LoanInformation';
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl = "https://sixfinance.app/LoanAgainstProperty";

  return {
    title:
      "Loan Against Property | Interest Rates, EMI & Eligibility – Six Finance",
    description:
      "Apply for a loan against property with Six Finance. Compare interest rates, calculate EMI, check eligibility, documents required, and get high-value loans by pledging residential or commercial property.",

    keywords: [
      "loan against property",
      "lap loan",
      "property loan",
      "loan on property",
      "loan against property interest rate",
      "loan against property emi calculator",
      "loan against property eligibility",
      "loan against property documents required",
      "loan against residential property",
      "loan against commercial property",
      "lap loan india",
      "property loan india",
      "loan against property for business",
      "loan against property for self employed",
      "high value property loan",
      "six finance loan against property",
    ],

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title: "Loan Against Property | EMI, Rates & Eligibility – Six Finance",
      description:
        "Unlock your property’s value with a loan against property. Compare EMI, interest rates, and eligibility from top lenders with Six Finance.",
      url: canonicalUrl,
      siteName: "Six Finance",
      type: "website",
      locale: "en_IN",
    },

    twitter: {
      card: "summary_large_image",
      title: "Loan Against Property | Six Finance",
      description:
        "Get high-value loans against your residential or commercial property with low interest rates and flexible tenure.",
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
        </main>
    );
}