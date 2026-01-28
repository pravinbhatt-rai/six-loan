import React from "react";
import HeroContainer from '@/component/HomeLoan/HeroContainer';
import { LoanSection } from '@/component/PersonalLoan/LoanSection';
import UniversalLoanCard from '@/component/loan/UniversalLoanCard';
import HomeLoanGuide from "@/component/HomeLoan/HomeLoanGuide";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl =
    "https://sixfinance.app/homeLoan/women";

  return {
    title:
      "Home Loan for Women | Lower Interest Rates & Benefits – Six Finance",
    description:
      "Apply for a home loan for women with Six Finance. Enjoy lower interest rates, special benefits, easy eligibility, and flexible repayment options for buying or constructing a home.",

    keywords: [
      "home loan for women",
      "women home loan",
      "home loan interest rate for women",
      "women housing loan",
      "home loan benefits for women",
      "home loan subsidy for women",
      "women home loan eligibility",
      "documents required for women home loan",
      "low interest home loan for women",
      "ladies home loan india",
      "six finance home loan",
    ],

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title: "Home Loan for Women | Special Benefits – Six Finance",
      description:
        "Get special benefits and lower interest rates on home loans for women. Apply online with Six Finance for quick approval.",
      url: canonicalUrl,
      siteName: "Six Finance",
      type: "website",
      locale: "en_IN",
    },

    twitter: {
      card: "summary_large_image",
      title: "Home Loan for Women | Six Finance",
      description:
        "Apply for a home loan designed for women with lower interest rates and flexible eligibility.",
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
            <HeroContainer id='home-loan-for-women' />
            <LoanSection />
            <UniversalLoanCard
                 categorySlug="home-loan"
                headerTitle="Home <span class='text-teal-500'>Loan</span>"
                headerSubtitle="Your Dream Home Awaits"
                headerDescription="Low interest rates and higher eligibility for buying or constructing your home."
                maxDisplay={4}
                showViewAllButton={true}
                loanType="home"
                eligibleFor="women"
            />
            <HomeLoanGuide pageId="home-loan-for-women"/>
        </main>
    );
}