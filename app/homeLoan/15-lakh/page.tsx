import React from "react";
import HeroContainer from '@/component/HomeLoan/HeroContainer';
import { LoanSection } from '@/component/PersonalLoan/LoanSection';
import UniversalLoanCard from '@/component/loan/UniversalLoanCard';
import HomeLoanGuide from "@/component/HomeLoan/HomeLoanGuide";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl =
    "https://sixfinance.app/homeLoan/15-lakh";

  return {
    title:
      "₹15 Lakh Home Loan EMI, Interest Rate & Eligibility – Six Finance",
    description:
      "Apply for a ₹15 lakh home loan with Six Finance. Check EMI, interest rates, eligibility, documents required, and repayment options for buying or constructing your home.",

    keywords: [
      "15 lakh home loan",
      "₹15 lakh home loan",
      "15 lakh home loan emi",
      "15 lakh home loan interest rate",
      "home loan for 15 lakhs",
      "15 lakh housing loan",
      "15 lakh home loan eligibility",
      "15 lakh home loan documents required",
      "home loan emi calculator 15 lakh",
      "low interest home loan 15 lakh",
      "home loan for house purchase",
      "home loan for house construction",
      "best bank home loan 15 lakh",
      "six finance home loan",
    ],

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title: "₹15 Lakh Home Loan | EMI & Eligibility – Six Finance",
      description:
        "Check EMI, interest rates, and eligibility for a ₹15 lakh home loan. Apply online with Six Finance for fast approval.",
      url: canonicalUrl,
      siteName: "Six Finance",
      type: "website",
      locale: "en_IN",
    },

    twitter: {
      card: "summary_large_image",
      title: "₹15 Lakh Home Loan | Six Finance",
      description:
        "Calculate EMI and apply for a ₹15 lakh home loan with flexible tenure and low interest rates.",
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
            <HeroContainer id='15-lakh-home-loan' />
            <LoanSection />
            <UniversalLoanCard
				 categorySlug="home-loan"
                headerTitle="Home <span class='text-teal-500'>Loan</span>"
                headerSubtitle="Your Dream Home Awaits"
                headerDescription="Low interest rates and higher eligibility for buying or constructing your home."
                maxDisplay={4}
                showViewAllButton={true}
                loanType="home"
                amountRange="15-lakh"
			/>
            <HomeLoanGuide pageId="15-lakh"/>
        </main>
    );
}