import type { Metadata } from "next";
import React from "react";
import HeroContainer from "@/component/BussinessLoan/BusinessLoanHero";
import { LoanSection } from "@/component/PersonalLoan/LoanSection";
import UniversalLoanCard from "@/component/loan/UniversalLoanCard";
import DairyLoanGuide from "@/component/commonComponent/DairyLoanGuide";

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl =
    "https://sixfinance.app/businessLoan/dairy";

  return {
    title:
      "Dairy Farming Loan in India | Low Interest Business Loans – Six Finance",
    description:
      "Apply for dairy farming loans in India with low interest rates. Get collateral-free dairy business loans for cattle purchase, shed construction, and working capital with Six Finance.",

    keywords: [
      "dairy farming loan",
      "dairy loan india",
      "business loan for dairy farming",
      "dairy business loan",
      "loan for dairy farm setup",
      "cow farming loan",
      "buffalo farming loan",
      "animal husbandry loan",
      "dairy farm loan without collateral",
      "mudra loan for dairy farming",
      "dairy loan interest rate",
      "dairy loan eligibility",
      "business loan six finance",
      "agriculture allied business loan",
    ],

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title: "Dairy Farming Loan in India | Six Finance",
      description:
        "Get dairy farming loans for cow & buffalo farming, dairy expansion, and working capital. Fast approvals and flexible repayment with Six Finance.",
      url: canonicalUrl,
      siteName: "Six Finance",
      type: "website",
      locale: "en_IN",
    },

    twitter: {
      card: "summary_large_image",
      title: "Dairy Farming Loan in India | Six Finance",
      description:
        "Apply online for dairy farming loans with flexible tenure, low interest rates, and quick disbursal.",
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
            <HeroContainer id='dairy-farming-loan' />
            <LoanSection />
            <UniversalLoanCard
				categorySlug="business-loan"
				headerTitle="Business <span class='text-teal-500'>Loan</span>"
				loanType="business"
				scheme="dairy"
				headerSubtitle="Fuel Your Business Growth"
				headerDescription="Collateral-free loans to help you expand, stock up, or manage cash flow."
				maxDisplay={4}
				showViewAllButton={true}
			/>
            <DairyLoanGuide />
        </main>
    );
}