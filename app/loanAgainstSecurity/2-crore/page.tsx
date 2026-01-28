import React from "react";
import { LoanSection } from '@/component/PersonalLoan/LoanSection';
import UniversalLoanCard from "@/component/loan/UniversalLoanCard";
import SecuritiesLoanGuide from "@/component/LoanAgainstSecurity/SecuritiesLoanGuide";
import LASHero from "@/component/LoanAgainstSecurity/LASHero";
import type { Metadata } from "next";


export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl =
    "https://sixfinance.app/loanAgainstSecurity/2-crore";

  return {
    title:
      "₹2 Crore Loan Against Securities | Interest Rate, EMI & Eligibility – Six Finance",
    description:
      "Apply for a ₹2 crore loan against securities with Six Finance. Get instant liquidity against shares, mutual funds, bonds, or other investments without selling them.",

    keywords: [
      "2 crore loan against securities",
      "₹2 crore las",
      "loan against securities 2 crore",
      "loan against shares 2 crore",
      "loan against mutual funds 2 crore",
      "loan against bonds",
      "loan against investments",
      "loan against securities interest rate",
      "loan against securities eligibility",
      "loan against securities documents required",
      "loan against securities emi calculator",
      "las loan india",
      "high value loan against securities",
      "six finance loan against security",
    ],

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title: "₹2 Crore Loan Against Securities | Six Finance",
      description:
        "Unlock high-value funding with a ₹2 crore loan against securities. Leverage shares, mutual funds, or bonds without selling them.",
      url: canonicalUrl,
      siteName: "Six Finance",
      type: "website",
      locale: "en_IN",
    },

    twitter: {
      card: "summary_large_image",
      title: "₹2 Crore Loan Against Securities | Six Finance",
      description:
        "Get a ₹2 crore loan against securities at competitive interest rates with flexible repayment options.",
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function LakhLAPPage() {
    return (
        <div>
            <LASHero id="2-cr-las" />
            <LoanSection />
            <UniversalLoanCard
                categorySlug="loan-against-securities"
                headerTitle="Loan Against <span class='text-teal-500'>Security</span>"
                headerSubtitle="Leverage Your Investments"
                headerDescription="Get funds against shares, mutual funds, or bonds without selling them."
                maxDisplay={4}
                showViewAllButton={true}
            />
            <SecuritiesLoanGuide pageId="2-cr" />
        </div>
    );
}