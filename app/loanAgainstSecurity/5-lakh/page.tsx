import { LoanSection } from '@/component/PersonalLoan/LoanSection';
import UniversalLoanCard from "@/component/loan/UniversalLoanCard";
import SecuritiesLoanGuide from "@/component/LoanAgainstSecurity/SecuritiesLoanGuide";
import LASHero from "@/component/LoanAgainstSecurity/LASHero";
import type { Metadata } from "next";
import React from "react";

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl =
    "https://sixfinance.app/loanAgainstSecurity/5-lakh";

  return {
    title:
      "₹5 Lakh Loan Against Securities | Instant Funds Against Investments – Six Finance",
    description:
      "Apply for a ₹5 lakh loan against securities with Six Finance. Get instant liquidity against shares, mutual funds, or bonds without selling your investments.",

    keywords: [
      "5 lakh loan against securities",
      "₹5 lakh las",
      "loan against securities 5 lakh",
      "loan against shares 5 lakh",
      "loan against mutual funds 5 lakh",
      "small loan against securities",
      "minimum loan against securities",
      "loan against securities interest rate",
      "loan against securities eligibility",
      "loan against securities documents required",
      "loan against securities emi calculator",
      "instant loan against shares",
      "six finance loan against security",
    ],

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title: "₹5 Lakh Loan Against Securities | Six Finance",
      description:
        "Need quick funds? Get a ₹5 lakh loan against securities without selling shares or mutual funds with Six Finance.",
      url: canonicalUrl,
      siteName: "Six Finance",
      type: "website",
      locale: "en_IN",
    },

    twitter: {
      card: "summary_large_image",
      title: "₹5 Lakh Loan Against Securities | Six Finance",
      description:
        "Get instant liquidity with a ₹5 lakh loan against securities. Apply online with Six Finance.",
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
            <LASHero id="5-lakh-las" />
            <LoanSection />
            <UniversalLoanCard
                categorySlug="loan-against-securities"
                headerTitle="Loan Against <span class='text-teal-500'>Security</span>"
                headerSubtitle="Leverage Your Investments"
                headerDescription="Get funds against shares, mutual funds, or bonds without selling them."
                maxDisplay={4}
                showViewAllButton={true}
            />
            <SecuritiesLoanGuide pageId="5-lakh" />
        </div>
    );
}