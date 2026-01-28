import type { Metadata } from "next";
import React from "react";
import GoatFarmingLoanInfo from "@/component/commonComponent/GoatFarmingLoanInfo";
import HeroContainer from "@/component/BussinessLoan/BusinessLoanHero";
import { LoanSection } from "@/component/PersonalLoan/LoanSection";
import UniversalLoanCard from "@/component/loan/UniversalLoanCard";

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl =
    "https://sixfinance.app/businessLoan/goat";

  return {
    title:
      "Goat Farming Loan in India | Low Interest Business Loans – Six Finance",
    description:
      "Apply for goat farming loans in India with low interest rates. Get collateral-free business loans for goat rearing, shed construction, feed, and working capital with Six Finance.",

    keywords: [
      "goat farming loan",
      "goat farming loan india",
      "business loan for goat farming",
      "goat rearing loan",
      "loan for goat farm",
      "animal husbandry loan",
      "livestock farming loan",
      "goat farming loan without collateral",
      "mudra loan for goat farming",
      "goat loan interest rate",
      "goat farming loan eligibility",
      "msme loan for goat farming",
      "business loan six finance",
    ],

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title: "Goat Farming Loan in India | Six Finance",
      description:
        "Get goat farming loans for livestock purchase, farm setup, and working capital. Fast approvals and flexible repayment with Six Finance.",
      url: canonicalUrl,
      siteName: "Six Finance",
      type: "website",
      locale: "en_IN",
    },

    twitter: {
      card: "summary_large_image",
      title: "Goat Farming Loan in India | Six Finance",
      description:
        "Apply online for goat farming loans with flexible tenure, low interest rates, and quick disbursal.",
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
            <HeroContainer id='goat-farming-loan' />
            <LoanSection />
             <UniversalLoanCard
				categorySlug="business-loan"
				headerTitle="Business <span class='text-teal-500'>Loan</span>"
				loanType="business"
				scheme="goat"
				headerSubtitle="Fuel Your Business Growth"
				headerDescription="Collateral-free loans to help you expand, stock up, or manage cash flow."
				maxDisplay={4}
				showViewAllButton={true}
			/>
            <GoatFarmingLoanInfo />
        </main>
    );
}