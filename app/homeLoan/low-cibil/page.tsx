import HeroContainer from '@/component/HomeLoan/HeroContainer';
import { LoanSection } from '@/component/PersonalLoan/LoanSection';
import UniversalLoanCard from '@/component/loan/UniversalLoanCard';
import GuideContainer from "@/component/HomeLoan/GuideContainer";
import type { Metadata } from "next";
import React from "react";

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl =
    "https://sixfinance.app/homeLoan/low-cibil";

  return {
    title:
      "Home Loan for Low CIBIL Score | Bad Credit Home Loan – Six Finance",
    description:
      "Get a home loan even with a low CIBIL score. Check eligibility, interest rates, EMI options, and expert assistance for bad credit home loans with Six Finance.",

    keywords: [
      "home loan for low cibil score",
      "low cibil home loan",
      "home loan with bad credit",
      "home loan for poor credit score",
      "low credit score home loan india",
      "home loan without cibil",
      "home loan after cibil rejection",
      "low cibil housing loan",
      "home loan eligibility low cibil",
      "home loan interest rate low cibil",
      "six finance home loan",
    ],

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title: "Home Loan for Low CIBIL Score | Six Finance",
      description:
        "Struggling with a low CIBIL score? Get expert help and flexible options for home loans with bad credit at Six Finance.",
      url: canonicalUrl,
      siteName: "Six Finance",
      type: "website",
      locale: "en_IN",
    },

    twitter: {
      card: "summary_large_image",
      title: "Home Loan for Low CIBIL Score | Six Finance",
      description:
        "Apply for a home loan even with a low CIBIL score. Flexible eligibility and expert support available.",
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
            <HeroContainer id='home-loan-low-cibil-score' />
            <LoanSection />
            <UniversalLoanCard
				 categorySlug="home-loan"
                headerTitle="Home <span class='text-teal-500'>Loan</span>"
                loanType="home"
                loanSubType="lowCibil"
                headerSubtitle="Your Dream Home Awaits"
                headerDescription="Low interest rates and higher eligibility for buying or constructing your home."
                maxDisplay={4}
                showViewAllButton={true}
			/>
            <GuideContainer id='home-loan-low-cibil-score' />
        </main>
    );
}