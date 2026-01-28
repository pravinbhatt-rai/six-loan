import type { Metadata } from "next";
import React from "react";
import HeroContainer from "@/component/BussinessLoan/BusinessLoanHero";
import { LoanSection } from "@/component/PersonalLoan/LoanSection";
import UniversalLoanCard from "@/component/loan/UniversalLoanCard";
import PoultryFarmingLoanInfo from "@/component/commonComponent/PoultryLoanInfo";

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl =
    "https://sixfinance.app/businessLoan/poultry";

  return {
    title:
      "Poultry Farming Loan in India | Low Interest Business Loans – Six Finance",
    description:
      "Apply for poultry farming loans in India with low interest rates. Get collateral-free business loans for broiler & layer farming, poultry sheds, feed, and working capital with Six Finance.",

    keywords: [
      "poultry farming loan",
      "poultry loan india",
      "business loan for poultry farming",
      "poultry farm loan",
      "broiler farming loan",
      "layer farming loan",
      "animal husbandry loan",
      "livestock farming loan",
      "poultry farming loan without collateral",
      "mudra loan for poultry farming",
      "poultry loan interest rate",
      "poultry loan eligibility",
      "msme loan for poultry farming",
      "six finance business loan",
    ],

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title: "Poultry Farming Loan in India | Six Finance",
      description:
        "Get poultry farming loans for broiler & layer farms, shed construction, feed, and expansion with fast approval and flexible repayment.",
      url: canonicalUrl,
      siteName: "Six Finance",
      type: "website",
      locale: "en_IN",
    },

    twitter: {
      card: "summary_large_image",
      title: "Poultry Farming Loan in India | Six Finance",
      description:
        "Apply online for poultry farming loans with low interest rates and quick disbursal.",
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
            <HeroContainer id='poultry-farming-loan' />
            <LoanSection />
             <UniversalLoanCard
				categorySlug="business-loan"
				headerTitle="Business <span class='text-teal-500'>Loan</span>"
				loanType="business"
				scheme="poultry"
				headerSubtitle="Fuel Your Business Growth"
				headerDescription="Collateral-free loans to help you expand, stock up, or manage cash flow."
				maxDisplay={4}
				showViewAllButton={true}
			/>
            <PoultryFarmingLoanInfo />
        </main>
    );
}