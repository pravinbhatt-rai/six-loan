import HeroContainer from '@/component/HomeLoan/HeroContainer';
import { LoanSection } from '@/component/PersonalLoan/LoanSection';
import UniversalLoanCard from '@/component/loan/UniversalLoanCard';
import HomeLoanGuide from "@/component/HomeLoan/HomeLoanGuide";
import type { Metadata } from "next";
import React from "react";

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl =
    "https://sixfinance.app/homeLoan/extension";

  return {
    title:
      "Home Extension Loan in India | Expand Your House – Six Finance",
    description:
      "Apply for a home extension loan with Six Finance. Get low interest rates, easy eligibility, and flexible repayment to add rooms, floors, or expand your existing home.",

    keywords: [
      "home extension loan",
      "home loan for extension",
      "house extension loan",
      "home loan for adding room",
      "loan for house expansion",
      "home extension loan interest rate",
      "home extension loan eligibility",
      "home extension loan documents required",
      "loan for adding floor to house",
      "home improvement extension loan",
      "bank home extension loan",
      "six finance home loan",
    ],

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title: "Home Extension Loan | Expand Your Home – Six Finance",
      description:
        "Expand your existing home with a home extension loan. Enjoy flexible tenure and competitive interest rates with Six Finance.",
      url: canonicalUrl,
      siteName: "Six Finance",
      type: "website",
      locale: "en_IN",
    },

    twitter: {
      card: "summary_large_image",
      title: "Home Extension Loan | Six Finance",
      description:
        "Get a home extension loan to add rooms or floors with easy eligibility and quick approval.",
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
            <HeroContainer id='home-extension-loan' />
            <LoanSection />
            <UniversalLoanCard
                 categorySlug="home-loan"
                headerTitle="Home <span class='text-teal-500'>Loan</span>"
                headerSubtitle="Your Dream Home Awaits"
                headerDescription="Low interest rates and higher eligibility for buying or constructing your home."
                maxDisplay={4}
                showViewAllButton={true}
                loanType="home"
                scheme="extension"
            />
            <HomeLoanGuide pageId="home-extension-loan"/>
        </main>
    );
}