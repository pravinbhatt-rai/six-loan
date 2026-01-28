import type { Metadata } from "next";
import React from "react";
import HeroContainer from "@/component/BussinessLoan/BusinessLoanHero";
import { LoanSection } from "@/component/PersonalLoan/LoanSection";
import UniversalLoanCard from "@/component/loan/UniversalLoanCard";
import LowCibilLoanGuide from "@/component/PersonalLoan/lowCibil/LowCibilLoanGuide";

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl =
    "https://sixfinance.app/businessLoan/low-cibil";

  return {
    title:
      "Low CIBIL Business Loan in India | Business Loan for Bad Credit – Six Finance",
    description:
      "Get business loans even with low CIBIL score. Apply for collateral-free low CIBIL business loans in India with fast approval, flexible tenure, and expert support from Six Finance.",

    keywords: [
      "low cibil business loan",
      "business loan for low cibil score",
      "bad credit business loan india",
      "business loan without cibil",
      "low credit score business loan",
      "msme loan low cibil",
      "startup loan low cibil",
      "business loan without collateral",
      "low cibil loan six finance",
      "business loan rejection solution",
      "financial help for low cibil",
    ],

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title: "Low CIBIL Business Loan in India | Six Finance",
      description:
        "Struggling with a low CIBIL score? Get business loans with flexible terms and quick disbursal through Six Finance.",
      url: canonicalUrl,
      siteName: "Six Finance",
      type: "website",
      locale: "en_IN",
    },

    twitter: {
      card: "summary_large_image",
      title: "Low CIBIL Business Loan | Six Finance",
      description:
        "Apply for low CIBIL business loans with expert guidance and fast approval.",
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
            <HeroContainer id='low-cibil-business-loans' />
            <LoanSection />
            <UniversalLoanCard
                categorySlug="business-loan"
                headerTitle="Business <span class='text-teal-500'>Loan</span>"
                headerSubtitle="Fuel Your Business Growth"
                headerDescription="Collateral-free loans to help you expand, stock up, or manage cash flow."
                maxDisplay={4}
                showViewAllButton={true}
                loanType="business"
                loanSubType="lowCibil"
            />
            <LowCibilLoanGuide />
        </main>
    );
}