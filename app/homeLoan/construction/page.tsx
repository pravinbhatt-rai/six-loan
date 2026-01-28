import HeroContainer from '@/component/HomeLoan/HeroContainer';
import { LoanSection } from '@/component/PersonalLoan/LoanSection';
import UniversalLoanCard from '@/component/loan/UniversalLoanCard';
import HomeLoanGuide from "@/component/HomeLoan/HomeLoanGuide";
import type { Metadata } from "next";
import React from "react";

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl =
    "https://sixfinance.app/homeLoan/construction";

  return {
    title:
      "Home Construction Loan in India | Interest Rates & Eligibility – Six Finance",
    description:
      "Apply for a home construction loan with Six Finance. Check interest rates, stage-wise disbursement, EMI, eligibility, and documents required to build your dream home.",

    keywords: [
      "home construction loan",
      "construction home loan",
      "home loan for construction",
      "house construction loan",
      "construction loan interest rate",
      "home construction loan eligibility",
      "home construction loan documents",
      "stage wise disbursement home loan",
      "plot and construction loan",
      "construction loan emi calculator",
      "low interest home construction loan",
      "bank home construction loan",
      "six finance home loan",
    ],

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title: "Home Construction Loan in India | Six Finance",
      description:
        "Build your home with a construction loan featuring stage-wise disbursement, flexible tenure, and competitive interest rates from Six Finance.",
      url: canonicalUrl,
      siteName: "Six Finance",
      type: "website",
      locale: "en_IN",
    },

    twitter: {
      card: "summary_large_image",
      title: "Home Construction Loan | Six Finance",
      description:
        "Apply for a home construction loan with easy eligibility and stage-wise fund release.",
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
            <HeroContainer id='home-construction-loan' />
            <LoanSection />
            <UniversalLoanCard
                 categorySlug="home-loan"
                headerTitle="Home <span class='text-teal-500'>Loan</span>"
                headerSubtitle="Your Dream Home Awaits"
                headerDescription="Low interest rates and higher eligibility for buying or constructing your home."
                maxDisplay={4}
                showViewAllButton={true}
                loanType="home"
                scheme="construction"
            />
            <HomeLoanGuide pageId="home-construction-loan"/>
        </main>
    );
}