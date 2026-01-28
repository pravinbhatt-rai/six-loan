import type { Metadata } from "next";
import React from "react";
import HeroContainer from "@/component/BussinessLoan/BusinessLoanHero";
import { LoanSection } from "@/component/PersonalLoan/LoanSection";
import UniversalLoanCard from "@/component/loan/UniversalLoanCard";
import PreApprovedOffers from "@/component/PersonalLoan/PreApprovedOffers";
import FeesAndCharges from "@/component/PersonalLoan/FeesAndCharges";
import BusinessLoanGuide from "@/component/commonComponent/BusinessLoanGuide";

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl =
    "https://sixfinance.app/businessLoan/rates";

  return {
    title:
      "Business Loan Interest Rates in India | Latest Rates & Charges – Six Finance",
    description:
      "Check the latest business loan interest rates in India. Compare MSME loan rates, fees, and charges, and get pre-approved business loan offers with Six Finance.",

    keywords: [
      "business loan interest rates",
      "business loan rates india",
      "msme loan interest rate",
      "small business loan interest rates",
      "collateral free business loan rate",
      "working capital loan interest rate",
      "startup business loan interest",
      "business loan fees and charges",
      "business loan emi",
      "pre approved business loan",
      "six finance business loan",
      "compare business loan rates",
    ],

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title: "Business Loan Interest Rates in India | Six Finance",
      description:
        "Compare business loan interest rates, processing fees, and charges. Find the best MSME loan offers with Six Finance.",
      url: canonicalUrl,
      siteName: "Six Finance",
      type: "website",
      locale: "en_IN",
    },

    twitter: {
      card: "summary_large_image",
      title: "Business Loan Interest Rates | Six Finance",
      description:
        "Explore the latest business loan interest rates and pre-approved offers in India.",
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
            <HeroContainer id='business-loan-interest-rates' />
            <LoanSection />
            <UniversalLoanCard
				categorySlug="business-loan"
				headerTitle="Business <span class='text-teal-500'>Loan</span>"
				loanType="business"
				loanSubType="interestRates"
				headerSubtitle="Fuel Your Business Growth"
				headerDescription="Collateral-free loans to help you expand, stock up, or manage cash flow."
				maxDisplay={4}
				showViewAllButton={true}
			/>
            <PreApprovedOffers id="business-loan"/>
            <FeesAndCharges id='business-loan' />
            <BusinessLoanGuide />
        </main>
    );
}