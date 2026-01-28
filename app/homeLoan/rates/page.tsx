import React from "react";
import HeroContainer from '@/component/HomeLoan/HeroContainer';
import { LoanSection } from '@/component/PersonalLoan/LoanSection';
import UniversalLoanCard from '@/component/loan/UniversalLoanCard';
import GuideContainer from "@/component/HomeLoan/GuideContainer";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl =
    "https://sixfinance.app/homeLoan/rates";

  return {
    title:
      "Home Loan Interest Rates in India Today – Six Finance",
    description:
      "Check the latest home loan interest rates in India. Compare bank-wise housing loan rates, EMI impact, and eligibility to choose the best home loan with Six Finance.",

    keywords: [
      "home loan interest rates",
      "home loan interest rate today",
      "housing loan interest rates india",
      "current home loan interest rate",
      "bank home loan interest rates",
      "lowest home loan interest rate india",
      "home loan rate comparison",
      "home loan interest calculator",
      "home loan emi interest rate",
      "repo linked home loan rates",
      "floating vs fixed home loan interest",
      "six finance home loan rates",
    ],

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title: "Home Loan Interest Rates in India | Six Finance",
      description:
        "Compare the latest home loan interest rates across banks and NBFCs. Find the best housing loan offers with Six Finance.",
      url: canonicalUrl,
      siteName: "Six Finance",
      type: "website",
      locale: "en_IN",
    },

    twitter: {
      card: "summary_large_image",
      title: "Home Loan Interest Rates | Six Finance",
      description:
        "View current home loan interest rates and EMI impact. Compare and apply online with Six Finance.",
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
            <HeroContainer id='home-loan-interest-rates' />
            <LoanSection />
            <UniversalLoanCard
				 categorySlug="home-loan"
                headerTitle="Home <span class='text-teal-500'>Loan</span>"
                loanType="home"
                loanSubType="interestRates"
                headerSubtitle="Your Dream Home Awaits"
                headerDescription="Low interest rates and higher eligibility for buying or constructing your home."
                maxDisplay={4}
                showViewAllButton={true}
			/>
            <GuideContainer id='home-loan-interest-rates' />
        </main>
    );
}