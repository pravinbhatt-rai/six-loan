import HeroContainer from '@/component/HomeLoan/HeroContainer';
import { LoanSection } from '@/component/PersonalLoan/LoanSection';
import UniversalLoanCard from '@/component/loan/UniversalLoanCard';
import HomeLoanGuide from "@/component/HomeLoan/HomeLoanGuide";
import type { Metadata } from "next";
import React from "react";

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl =
    "https://sixfinance.app/homeLoan/plot";

  return {
    title:
      "Plot Purchase Loan | Buy Residential Plot in India – Six Finance",
    description:
      "Apply for a plot purchase loan with Six Finance. Check eligibility, interest rates, EMI options, and documents required to buy a residential plot or land in India.",

    keywords: [
      "plot loan",
      "plot purchase loan",
      "land purchase loan",
      "loan to buy plot",
      "residential plot loan",
      "plot loan interest rate",
      "plot loan eligibility",
      "plot loan documents required",
      "plot loan emi calculator",
      "loan for buying land in india",
      "plot loan vs home loan",
      "six finance plot loan",
    ],

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title: "Plot Purchase Loan | Buy Land in India – Six Finance",
      description:
        "Buy a residential plot with a plot loan. Compare EMI, interest rates, and eligibility with Six Finance.",
      url: canonicalUrl,
      siteName: "Six Finance",
      type: "website",
      locale: "en_IN",
    },

    twitter: {
      card: "summary_large_image",
      title: "Plot Purchase Loan | Six Finance",
      description:
        "Apply online for a plot purchase loan with easy eligibility and competitive interest rates.",
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
            <HeroContainer id='plot-loan' />
            <LoanSection />
            <UniversalLoanCard
				 categorySlug="home-loan"
                headerTitle="Home <span class='text-teal-500'>Loan</span>"
                loanType="home"
                scheme="plot"
                headerSubtitle="Your Dream Home Awaits"
                headerDescription="Low interest rates and higher eligibility for buying or constructing your home."
                maxDisplay={4}
                showViewAllButton={true}
			/>
            <HomeLoanGuide pageId="plot-loan"/>
        </main>
    );
}