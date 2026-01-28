import React from "react";
import TransferHero from "@/component/TransferHomeLoan/TransferHero";
import FeatureSection from "@/component/PersonalLoan/FeatureSection";
import { LoanSection } from "@/component/PersonalLoan/LoanSection";
import LoanInfo from "@/component/commonComponent/LoanInfo"
import { ExpertQuoteContainer } from "@/component/PersonalLoan/Linkdin";
import LoanBenefits from "@/component/PersonalLoan/LoanBenefits";
import LoanInfoPage from '@/component/PersonalLoan/LoanInfoPage';
import LoanEligibilityCriteria from '@/component/PersonalLoan/LoanEligibilityCriteria';
import HomeLoanTransferBenefits from "@/component/TransferHomeLoan/HomeLoanTransferBenefits";
import TransferLoanDocuments from "@/component/TransferHomeLoan/TransferLoanDocuments";
import HomeLoanTransferTips from "@/component/TransferHomeLoan/HomeLoanTransferTips";
import TransferFeesAndCharges from "@/component/TransferHomeLoan/TransferFeesAndCharges";
import TransferLoanRates from "@/component/TransferHomeLoan/TransferLoanRates";
import TransferProcessGuide from "@/component/TransferHomeLoan/TransferProcessGuide";
import TransferSuccessStories from "@/component/TransferHomeLoan/TransferSuccessStories";
import TransferTipsAndFacts from "@/component/TransferHomeLoan/TransferTipsAndFacts";
import OurServices from "@/component/PersonalLoan/OurServices";
import ApplySection from "@/component/PersonalLoan/ApplySection";
import { TransferCustomerReview } from "@/component/TransferHomeLoan/TransferCustomerReview";
import TransferFAQ from "@/component/TransferHomeLoan/TransferFAQ";
import EmailApply from "@/component/PersonalLoan/EmailApply";
import TransferCityLoanOffers from "@/component/TransferHomeLoan/TransferCityLoanOffers";
import UniversalLoanCard from '@/component/loan/UniversalLoanCard';
import LoanTypesContainer from "@/component/PersonalLoan/LoanTypesContainer";
import DocumentsRequiredContainer from "@/component/PersonalLoan/DocumentsRequiredContainer";
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
  const canonicalUrl =
    "https://sixfinance.app/transferHomeLoan";

  return {
    title:
      "Home Loan Balance Transfer | Lower Interest Rate & EMI – Six Finance",

    description:
      "Transfer your existing home loan to Six Finance partner banks and reduce your EMI. Get lower interest rates, better terms, and hassle-free home loan balance transfer.",

    keywords: [
      "home loan balance transfer",
      "home loan transfer",
      "home loan balance transfer india",
      "transfer home loan to lower interest rate",
      "home loan transfer interest rates",
      "home loan balance transfer eligibility",
      "home loan balance transfer documents",
      "home loan transfer process",
      "reduce home loan emi",
      "switch home loan bank",
      "home loan refinancing india",
      "six finance home loan transfer",
    ],

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title: "Home Loan Balance Transfer | Six Finance",
      description:
        "Reduce your home loan EMI by transferring your loan to lower interest rates. Simple, fast, and transparent home loan balance transfer.",
      url: canonicalUrl,
      siteName: "Six Finance",
      type: "website",
      locale: "en_IN",
    },

    twitter: {
      card: "summary_large_image",
      title: "Home Loan Balance Transfer | Six Finance",
      description:
        "Switch your existing home loan to lower interest rates and save lakhs with Six Finance.",
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
            <TransferHero />
            <FeatureSection />
            <LoanSection />
            <UniversalLoanCard
                categorySlug="home-loan-balance-transfer"
                headerTitle="HL <span class='text-teal-500'>Transfer</span>"
                headerSubtitle="Reduce Your Home Loan EMI"
                headerDescription="Switch your existing Home Loan to lower interest rates with a balance transfer."
                maxDisplay={4}
                showViewAllButton={true}
            />
            <LoanInfo loanId="transfer-home-loan" />
            <ExpertQuoteContainer id="transfer-home-loan" />
            <LoanBenefits id="transfer-home-loan" />
            <LoanInfoPage id="transfer-home-loan" />
            <LoanEligibilityCriteria id="transfer-home-loan" />
            <LoanTypesContainer id="transfer-home-loan" />
            <DocumentsRequiredContainer id="transfer-home-loan" />
            <ThingsToKnow id="transfer-home-loan" />
            <FeesAndCharges id="transfer-home-loan" />
            <PreApprovedOffers id="transfer-home-loan"/>
            <ComparisonContainer id="transfer-home-loan"/>
            <LoanGuide id="transfer-home-loan" />
            <LoanComparisonGuide id="transfer-home-loan" />
            <SuccessStories id="transfer-home-loan" />
            <LoanInformation id="transfer-home-loan" />
            <OurServices />
            <ApplySection />
            <TransferCustomerReview />
            <TransferFAQ />
            <EmailApply />
            <TransferCityLoanOffers />
        </main>
    );
}