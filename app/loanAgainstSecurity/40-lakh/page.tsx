import React from "react";
import { LoanSection } from '@/component/PersonalLoan/LoanSection';
import UniversalLoanCard from "@/component/loan/UniversalLoanCard";
import SecuritiesLoanGuide from "@/component/LoanAgainstSecurity/SecuritiesLoanGuide";
import LASHero from "@/component/LoanAgainstSecurity/LASHero";import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl =
    "https://sixfinance.app/loanAgainstSecurity/40-lakh";

  return {
    title:
      "₹40 Lakh Loan Against Securities | Interest Rates & Eligibility – Six Finance",

    description:
      "Apply for a ₹40 lakh loan against securities with Six Finance. Get instant liquidity against shares, mutual funds, or bonds without selling your investments.",

    keywords: [
      "40 lakh loan against securities",
      "₹40 lakh las",
      "loan against securities 40 lakh",
      "loan against shares 40 lakh",
      "loan against mutual funds 40 lakh",
      "loan against bonds india",
      "high value loan against securities",
      "instant loan against securities",
      "loan against securities interest rate",
      "loan against securities eligibility",
      "loan against securities documents",
      "loan against securities emi calculator",
      "las loan india",
      "six finance loan against security",
    ],

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title: "₹40 Lakh Loan Against Securities | Six Finance",
      description:
        "Unlock ₹40 lakh instantly with a loan against securities. Continue investing while meeting your liquidity needs.",
      url: canonicalUrl,
      siteName: "Six Finance",
      type: "website",
      locale: "en_IN",
    },

    twitter: {
      card: "summary_large_image",
      title: "₹40 Lakh Loan Against Securities | Six Finance",
      description:
        "Get a ₹40 lakh loan against securities with competitive rates and flexible repayment options.",
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
            <LASHero id="40-lakh-las" />
            <LoanSection />
            <UniversalLoanCard
                categorySlug="loan-against-securities"
                headerTitle="Loan Against <span class='text-teal-500'>Security</span>"
                headerSubtitle="Leverage Your Investments"
                headerDescription="Get funds against shares, mutual funds, or bonds without selling them."
                maxDisplay={4}
                showViewAllButton={true}
            />
            <SecuritiesLoanGuide pageId="40-lakh" />
        </div>
    );
}