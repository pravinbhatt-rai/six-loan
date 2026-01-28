import React from "react";
import { LoanSection } from '@/component/PersonalLoan/LoanSection';
import UniversalLoanCard from "@/component/loan/UniversalLoanCard";
import SecuritiesLoanGuide from "@/component/LoanAgainstSecurity/SecuritiesLoanGuide";
import LASHero from "@/component/LoanAgainstSecurity/LASHero";
import type { Metadata } from "next";


export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl =
    "https://sixfinance.app/loanAgainstSecurity/1-crore";

  return {
    title:
      "₹1 Crore Loan Against Securities | EMI, Interest Rate & Eligibility – Six Finance",
    description:
      "Apply for a ₹1 crore loan against securities with Six Finance. Get instant liquidity against shares, mutual funds, bonds, or other investments without selling them.",

    keywords: [
      "1 crore loan against securities",
      "₹1 crore las",
      "loan against securities 1 crore",
      "loan against shares 1 crore",
      "loan against mutual funds 1 crore",
      "loan against bonds",
      "loan against investments",
      "loan against securities interest rate",
      "loan against securities eligibility",
      "loan against securities documents required",
      "las loan india",
      "loan against securities emi calculator",
      "six finance loan against securities",
    ],

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title: "₹1 Crore Loan Against Securities | Six Finance",
      description:
        "Unlock instant funds against shares, mutual funds, or bonds with a ₹1 crore loan against securities from Six Finance.",
      url: canonicalUrl,
      siteName: "Six Finance",
      type: "website",
      locale: "en_IN",
    },

    twitter: {
      card: "summary_large_image",
      title: "₹1 Crore Loan Against Securities | Six Finance",
      description:
        "Get a ₹1 crore loan against securities without selling your investments. Apply online with Six Finance.",
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}


export default function LakhLASPage() {
    return (
        <div>
            <LASHero id="1-cr-las" />
            <LoanSection />
            <UniversalLoanCard
                categorySlug="loan-against-securities"
                headerTitle="Loan Against <span class='text-teal-500'>Security</span>"
                headerSubtitle="Leverage Your Investments"
                headerDescription="Get funds against shares, mutual funds, or bonds without selling them."
                maxDisplay={4}
                showViewAllButton={true}
            />
            <SecuritiesLoanGuide pageId="1-cr" />
        </div>
    );
}