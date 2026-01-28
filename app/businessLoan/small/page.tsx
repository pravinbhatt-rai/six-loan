import type { Metadata } from "next";
import React from "react";
import HeroContainer from "@/component/BussinessLoan/BusinessLoanHero";
import { LoanSection } from "@/component/PersonalLoan/LoanSection";
import UniversalLoanCard from "@/component/loan/UniversalLoanCard";
import SmallBusinessLoanInfo from "@/component/commonComponent/SmallBusinessLoanInfo";

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl =
    "https://sixfinance.app/businessLoan/small";

  return {
    title:
      "Small Business Loan in India | MSME & SME Loans – Six Finance",
    description:
      "Apply for small business loans in India. Get collateral-free MSME & SME loans with fast approval, flexible repayment, and expert support from Six Finance.",

    keywords: [
      "small business loan",
      "small business loan india",
      "msme loan india",
      "sme loan india",
      "loan for small business",
      "collateral free small business loan",
      "working capital loan for small business",
      "startup small business loan",
      "mudra loan small business",
      "small business loan eligibility",
      "small business loan interest rate",
      "six finance business loan",
    ],

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title: "Small Business Loan in India | Six Finance",
      description:
        "Get MSME & SME small business loans with flexible tenure, fast approval, and competitive interest rates through Six Finance.",
      url: canonicalUrl,
      siteName: "Six Finance",
      type: "website",
      locale: "en_IN",
    },

    twitter: {
      card: "summary_large_image",
      title: "Small Business Loan | Six Finance",
      description:
        "Apply online for small business loans with quick disbursal and expert guidance.",
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
            <HeroContainer id='small-business-loan' />
            <LoanSection />
            <UniversalLoanCard
				categorySlug="business-loan"
				headerTitle="Business <span class='text-teal-500'>Loan</span>"
				loanType="business"
				scheme="small"
				headerSubtitle="Fuel Your Business Growth"
				headerDescription="Collateral-free loans to help you expand, stock up, or manage cash flow."
				maxDisplay={4}
				showViewAllButton={true}
			/>
            <SmallBusinessLoanInfo />
        </main>
    );
}