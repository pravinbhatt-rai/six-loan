import HeroContainer from '@/component/HomeLoan/HeroContainer';
import { LoanSection } from '@/component/PersonalLoan/LoanSection';
import UniversalLoanCard from '@/component/loan/UniversalLoanCard';
import HomeLoanGuide from "@/component/HomeLoan/HomeLoanGuide";
import type { Metadata } from "next";
import React from "react";

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl =
    "https://sixfinance.app/homeLoan/nri";

  return {
    title:
      "NRI Home Loan in India | Buy Property from Abroad – Six Finance",
    description:
      "Apply for an NRI home loan in India with Six Finance. Check eligibility, interest rates, EMI, documentation, and easy approval to buy or construct property from abroad.",

    keywords: [
      "nri home loan",
      "home loan for nri",
      "nri housing loan india",
      "nri home loan eligibility",
      "nri home loan interest rate",
      "nri home loan documents required",
      "home loan for nri from abroad",
      "nri home loan emi calculator",
      "buy property in india for nri",
      "nri property loan india",
      "six finance nri home loan",
    ],

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title: "NRI Home Loan in India | Six Finance",
      description:
        "Buy or construct property in India with an NRI home loan. Enjoy competitive rates and expert assistance with Six Finance.",
      url: canonicalUrl,
      siteName: "Six Finance",
      type: "website",
      locale: "en_IN",
    },

    twitter: {
      card: "summary_large_image",
      title: "NRI Home Loan | Six Finance",
      description:
        "Apply for an NRI home loan in India with easy documentation and flexible repayment options.",
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
            <HeroContainer id='nri-home-loan' />
            <LoanSection />
            <UniversalLoanCard
                 categorySlug="home-loan"
                headerTitle="Home <span class='text-teal-500'>Loan</span>"
                headerSubtitle="Your Dream Home Awaits"
                headerDescription="Low interest rates and higher eligibility for buying or constructing your home."
                maxDisplay={4}
                showViewAllButton={true}
                loanType="home"
                scheme="nri"
            />
            <HomeLoanGuide pageId="nri-home-loan"/>
        </main>
    );
}