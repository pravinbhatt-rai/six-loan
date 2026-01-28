import React from "react";
import HeroContainer from '@/component/HomeLoan/HeroContainer';
import { LoanSection } from '@/component/PersonalLoan/LoanSection';
import UniversalLoanCard from '@/component/loan/UniversalLoanCard';
import HomeLoanGuide from "@/component/HomeLoan/HomeLoanGuide";
import type { Metadata } from "next";


export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl =
    "https://sixfinance.app/homeLoan/renovation";

  return {
    title:
      "Home Renovation Loan | Repair & Improve Your Home – Six Finance",
    description:
      "Apply for a home renovation loan with Six Finance. Get low interest rates, easy eligibility, and flexible repayment options to repair, remodel, or upgrade your home.",

    keywords: [
      "home renovation loan",
      "home improvement loan",
      "home loan for renovation",
      "house renovation loan",
      "loan for home repair",
      "home renovation loan interest rate",
      "home renovation loan eligibility",
      "home renovation loan documents required",
      "loan for house remodeling",
      "home renovation emi calculator",
      "bank home renovation loan",
      "six finance home loan",
    ],

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title: "Home Renovation Loan | Upgrade Your Home – Six Finance",
      description:
        "Upgrade, repair, or remodel your home with a home renovation loan. Compare EMI, eligibility, and interest rates with Six Finance.",
      url: canonicalUrl,
      siteName: "Six Finance",
      type: "website",
      locale: "en_IN",
    },

    twitter: {
      card: "summary_large_image",
      title: "Home Renovation Loan | Six Finance",
      description:
        "Get a home renovation loan with easy eligibility and flexible tenure. Apply online with Six Finance.",
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
            <HeroContainer id='home-renovation-loan' />
            <LoanSection />
            <UniversalLoanCard
				 categorySlug="home-loan"
                headerTitle="Home <span class='text-teal-500'>Loan</span>"
                loanType="home"
                scheme="renovation"
                headerSubtitle="Your Dream Home Awaits"
                headerDescription="Low interest rates and higher eligibility for buying or constructing your home."
                maxDisplay={4}
                showViewAllButton={true}
			/>
            <HomeLoanGuide pageId="home-renovation-loan"/>
        </main>
    );
}