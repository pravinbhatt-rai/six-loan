import HeroContainer from '@/component/HomeLoan/HeroContainer';
import { LoanSection } from '@/component/PersonalLoan/LoanSection';
import UniversalLoanCard from '@/component/loan/UniversalLoanCard';
import HomeLoanGuide from "@/component/HomeLoan/HomeLoanGuide";
import type { Metadata } from "next";
import React from "react";

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl =
    "https://sixfinance.app/homeLoan/40-lakh";

  return {
    title:
      "₹40 Lakh Home Loan EMI, Interest Rate & Eligibility – Six Finance",
    description:
      "Apply for a ₹40 lakh home loan with Six Finance. Calculate EMI, compare interest rates, check eligibility, documents required, and flexible repayment options for buying or constructing a home.",

    keywords: [
      "40 lakh home loan",
      "₹40 lakh home loan",
      "40 lakh home loan emi",
      "40 lakh home loan interest rate",
      "home loan for 40 lakhs",
      "40 lakh housing loan",
      "40 lakh home loan eligibility",
      "40 lakh home loan documents required",
      "emi calculator home loan 40 lakh",
      "low interest home loan 40 lakh",
      "home loan for house purchase",
      "home loan for house construction",
      "best bank home loan 40 lakh",
      "six finance home loan",
    ],

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title: "₹40 Lakh Home Loan | EMI & Eligibility – Six Finance",
      description:
        "Check EMI, interest rates, and eligibility for a ₹40 lakh home loan. Apply online with Six Finance for fast approval.",
      url: canonicalUrl,
      siteName: "Six Finance",
      type: "website",
      locale: "en_IN",
    },

    twitter: {
      card: "summary_large_image",
      title: "₹40 Lakh Home Loan | Six Finance",
      description:
        "Calculate EMI and apply for a ₹40 lakh home loan with flexible tenure and low interest rates.",
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
            <HeroContainer id='40-lakh-home-loan' />
            <LoanSection />
            <UniversalLoanCard
				 categorySlug="home-loan"
                headerTitle="Home <span class='text-teal-500'>Loan</span>"
                headerSubtitle="Your Dream Home Awaits"
                headerDescription="Low interest rates and higher eligibility for buying or constructing your home."
                maxDisplay={4}
                showViewAllButton={true}
                loanType="home"
                amountRange="40-lakh"
			/>
            <HomeLoanGuide pageId="40-lakh"/>
        </main>
    );
}