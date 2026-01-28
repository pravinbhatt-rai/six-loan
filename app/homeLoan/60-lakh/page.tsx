import HeroContainer from '@/component/HomeLoan/HeroContainer';
import { LoanSection } from '@/component/PersonalLoan/LoanSection';
import UniversalLoanCard from '@/component/loan/UniversalLoanCard';
import HomeLoanGuide from "@/component/HomeLoan/HomeLoanGuide";
import type { Metadata } from "next";
import React from "react";

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl =
    "https://sixfinance.app/homeLoan/60-lakh";

  return {
    title:
      "₹60 Lakh Home Loan EMI, Interest Rate & Eligibility – Six Finance",
    description:
      "Apply for a ₹60 lakh home loan with Six Finance. Calculate EMI, compare interest rates, check eligibility, documents required, and flexible repayment options for buying or constructing your home.",

    keywords: [
      "60 lakh home loan",
      "₹60 lakh home loan",
      "60 lakh home loan emi",
      "60 lakh home loan interest rate",
      "home loan for 60 lakhs",
      "60 lakh housing loan",
      "60 lakh home loan eligibility",
      "60 lakh home loan documents required",
      "emi calculator home loan 60 lakh",
      "low interest home loan 60 lakh",
      "high value home loan india",
      "home loan for luxury home",
      "best bank home loan 60 lakh",
      "six finance home loan",
    ],

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title: "₹60 Lakh Home Loan | EMI & Eligibility – Six Finance",
      description:
        "Check EMI, interest rates, and eligibility for a ₹60 lakh home loan. Apply online with Six Finance for fast approval.",
      url: canonicalUrl,
      siteName: "Six Finance",
      type: "website",
      locale: "en_IN",
    },

    twitter: {
      card: "summary_large_image",
      title: "₹60 Lakh Home Loan | Six Finance",
      description:
        "Calculate EMI and apply for a ₹60 lakh home loan with flexible tenure and low interest rates.",
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
            <HeroContainer id='60-lakh-home-loan' />
            <LoanSection />
            <UniversalLoanCard
				 categorySlug="home-loan"
                headerTitle="Home <span class='text-teal-500'>Loan</span>"
                headerSubtitle="Your Dream Home Awaits"
                headerDescription="Low interest rates and higher eligibility for buying or constructing your home."
                maxDisplay={4}
                showViewAllButton={true}
                loanType="home"
                amountRange="60-lakh"
			/>
            <HomeLoanGuide pageId="60-lakh"/>
        </main>
    );
}