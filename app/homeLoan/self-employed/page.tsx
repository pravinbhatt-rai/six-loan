import React from "react";
import HeroContainer from '@/component/HomeLoan/HeroContainer';
import { LoanSection } from '@/component/PersonalLoan/LoanSection';
import UniversalLoanCard from '@/component/loan/UniversalLoanCard';
import HomeLoanGuide from "@/component/HomeLoan/HomeLoanGuide";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl =
    "https://sixfinance.app/homeLoan/self-employed";

  return {
    title:
      "Home Loan for Self-Employed | Eligibility & Rates – Six Finance",
    description:
      "Apply for a home loan for self-employed professionals and business owners. Check eligibility, income proof, interest rates, EMI options, and documents required with Six Finance.",

    keywords: [
      "home loan for self employed",
      "self employed home loan",
      "home loan for business owners",
      "home loan for professionals",
      "self employed housing loan",
      "home loan eligibility self employed",
      "documents required for self employed home loan",
      "home loan interest rate for self employed",
      "emi calculator self employed home loan",
      "home loan without salary slip",
      "six finance home loan",
    ],

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title: "Home Loan for Self-Employed | Six Finance",
      description:
        "Get a home loan tailored for self-employed professionals with flexible eligibility and competitive interest rates from Six Finance.",
      url: canonicalUrl,
      siteName: "Six Finance",
      type: "website",
      locale: "en_IN",
    },

    twitter: {
      card: "summary_large_image",
      title: "Home Loan for Self-Employed | Six Finance",
      description:
        "Apply for a home loan as a self-employed professional with easy documentation and flexible repayment options.",
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
            <HeroContainer id='home-loan-for-self-employed' />
            <LoanSection />
            <UniversalLoanCard
                 categorySlug="home-loan"
                headerTitle="Home <span class='text-teal-500'>Loan</span>"
                headerSubtitle="Your Dream Home Awaits"
                headerDescription="Low interest rates and higher eligibility for buying or constructing your home."
                maxDisplay={4}
                showViewAllButton={true}
                loanType="home"
                eligibleFor="self-employed"
            />
            <HomeLoanGuide pageId="home-loan-for-self-employed"/>
        </main>
    );
}