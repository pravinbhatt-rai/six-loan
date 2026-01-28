import type { Metadata } from "next";
import React from "react";
import HeroContainer from "@/component/BussinessLoan/BusinessLoanHero";
import { LoanSection } from "@/component/PersonalLoan/LoanSection";
import UniversalLoanCard from "@/component/loan/UniversalLoanCard";
import StartupBusinessLoanInfo from "@/component/commonComponent/StartupLoanInfo";

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl =
    "https://sixfinance.app/businessLoan/startup";

  return {
    title:
      "Startup Business Loan in India | Funding for New Businesses – Six Finance",
    description:
      "Apply for startup business loans in India. Get collateral-free funding for new businesses, flexible repayment, and fast approvals with Six Finance.",

    keywords: [
      "startup business loan",
      "startup loan india",
      "new business loan",
      "loan for startups india",
      "collateral free startup loan",
      "msme startup loan",
      "funding for new business",
      "working capital loan for startup",
      "mudra loan for startup",
      "startup loan eligibility",
      "startup business loan interest rate",
      "six finance startup loan",
    ],

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title: "Startup Business Loan in India | Six Finance",
      description:
        "Get startup business loans with flexible tenure, fast approval, and expert guidance through Six Finance.",
      url: canonicalUrl,
      siteName: "Six Finance",
      type: "website",
      locale: "en_IN",
    },

    twitter: {
      card: "summary_large_image",
      title: "Startup Business Loan | Six Finance",
      description:
        "Apply online for startup business loans with quick disbursal and expert support.",
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
            <HeroContainer id='startup-business-loan' />
            <LoanSection />
             <UniversalLoanCard
				categorySlug="business-loan"
				headerTitle="Business <span class='text-teal-500'>Loan</span>"
				loanType="business"
				scheme="startup"
				headerSubtitle="Fuel Your Business Growth"
				headerDescription="Collateral-free loans to help you expand, stock up, or manage cash flow."
				maxDisplay={4}
				showViewAllButton={true}
			/>
          <StartupBusinessLoanInfo />
        </main>
    );
}