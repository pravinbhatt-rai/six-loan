import React from "react";
import HeroContainer from '@/component/HomeLoan/HeroContainer';
import { LoanSection } from '@/component/PersonalLoan/LoanSection';
import UniversalLoanCard from '@/component/loan/UniversalLoanCard';
import HomeLoanGuide from "@/component/HomeLoan/HomeLoanGuide";
import type { Metadata } from "next";


export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl = "https://sixfinance.app/homeLoan/10-lakh";

  return {
    title:
      "₹10 Lakh Home Loan EMI, Interest Rate & Eligibility – Six Finance",
    description:
      "Apply for a ₹10 lakh home loan with Six Finance. Check EMI, interest rates, eligibility, documents required, and repayment options for buying or constructing your dream home.",

    keywords: [
      "10 lakh home loan",
      "10 lakh home loan emi",
      "home loan 10 lakh interest rate",
      "₹10 lakh home loan",
      "10 lakh home loan eligibility",
      "10 lakh home loan documents",
      "home loan emi calculator 10 lakh",
      "home loan for house purchase",
      "low interest home loan india",
      "six finance home loan",
      "housing loan 10 lakh",
    ],

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title: "₹10 Lakh Home Loan | EMI, Interest & Eligibility – Six Finance",
      description:
        "Explore EMI, interest rates, and eligibility for a ₹10 lakh home loan. Get low rates and quick approval with Six Finance.",
      url: canonicalUrl,
      siteName: "Six Finance",
      type: "website",
      locale: "en_IN",
    },

    twitter: {
      card: "summary_large_image",
      title: "₹10 Lakh Home Loan | Six Finance",
      description:
        "Check EMI, eligibility, and apply online for a ₹10 lakh home loan with flexible repayment options.",
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
            <HeroContainer id='10-lakh-home-loan' />
            <LoanSection />
            <UniversalLoanCard
				 categorySlug="home-loan"
                headerTitle="Home <span class='text-teal-500'>Loan</span>"
                headerSubtitle="Your Dream Home Awaits"
                headerDescription="Low interest rates and higher eligibility for buying or constructing your home."
                maxDisplay={4}
                showViewAllButton={true}
                loanType="home"
                amountRange="10-lakh"
			/>
            <HomeLoanGuide pageId="10-lakh"/>
        </main>
    );
}