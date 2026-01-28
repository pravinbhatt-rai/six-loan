import React from "react";
import HeroContainer from '@/component/HomeLoan/HeroContainer';
import { LoanSection } from '@/component/PersonalLoan/LoanSection';
import UniversalLoanCard from '@/component/loan/UniversalLoanCard';
import HomeLoanGuide from "@/component/HomeLoan/HomeLoanGuide";
import type { Metadata } from "next";


export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl =
    "https://sixfinance.app/homeLoan/top-up";

  return {
    title:
      "Home Loan Top-Up | Extra Funds at Low Interest – Six Finance",
    description:
      "Get a home loan top-up with Six Finance. Avail additional funds on your existing home loan at low interest rates with easy eligibility and flexible repayment.",

    keywords: [
      "home loan top up",
      "home loan top-up",
      "top up loan on home loan",
      "home loan top up interest rate",
      "home loan top up eligibility",
      "home loan top up documents required",
      "home loan top up emi calculator",
      "additional loan on home loan",
      "loan against home loan",
      "home loan balance transfer top up",
      "six finance home loan",
    ],

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title: "Home Loan Top-Up | Extra Funds at Low Interest – Six Finance",
      description:
        "Need extra funds? Get a home loan top-up with lower interest rates and flexible tenure from Six Finance.",
      url: canonicalUrl,
      siteName: "Six Finance",
      type: "website",
      locale: "en_IN",
    },

    twitter: {
      card: "summary_large_image",
      title: "Home Loan Top-Up | Six Finance",
      description:
        "Apply online for a home loan top-up and get additional funds at attractive interest rates.",
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
            <HeroContainer id='top-up-home-loan' />
            <LoanSection />
            <UniversalLoanCard
                 categorySlug="home-loan"
                headerTitle="Home <span class='text-teal-500'>Loan</span>"
                headerSubtitle="Your Dream Home Awaits"
                headerDescription="Low interest rates and higher eligibility for buying or constructing your home."
                maxDisplay={4}
                showViewAllButton={true}
                loanType="home"
                scheme="top-up"
            />
            <HomeLoanGuide pageId="top-up-home-loan"/>
        </main>
    );
}