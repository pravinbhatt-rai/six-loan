import React from "react";
import { LoanSection } from '@/component/PersonalLoan/LoanSection';
import UniversalLoanCard from "@/component/loan/UniversalLoanCard";
import SecuritiesLoanGuide from "@/component/LoanAgainstSecurity/SecuritiesLoanGuide";
import LASHero from "@/component/LoanAgainstSecurity/LASHero";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl =
    "https://sixfinance.app/loanAgainstSecurity/30-lakh";

  return {
    title:
      "₹30 Lakh Loan Against Securities | Interest Rate & Eligibility – Six Finance",
    description:
      "Apply for a ₹30 lakh loan against securities with Six Finance. Get instant funds against shares, mutual funds, or bonds without selling your investments.",

    keywords: [
      "30 lakh loan against securities",
      "₹30 lakh las",
      "loan against securities 30 lakh",
      "loan against shares 30 lakh",
      "loan against mutual funds 30 lakh",
      "loan against bonds",
      "high value loan against securities",
      "instant loan against securities",
      "loan against securities interest rate",
      "loan against securities eligibility",
      "loan against securities documents required",
      "loan against securities emi calculator",
      "las loan india",
      "six finance loan against security",
    ],

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title: "₹30 Lakh Loan Against Securities | Six Finance",
      description:
        "Unlock instant liquidity with a ₹30 lakh loan against securities. Leverage shares or mutual funds without selling them.",
      url: canonicalUrl,
      siteName: "Six Finance",
      type: "website",
      locale: "en_IN",
    },

    twitter: {
      card: "summary_large_image",
      title: "₹30 Lakh Loan Against Securities | Six Finance",
      description:
        "Get a ₹30 lakh loan against securities with competitive interest rates and flexible repayment options.",
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
            <LASHero id="30-lakh-las" />
            <LoanSection />
            <UniversalLoanCard
                categorySlug="loan-against-securities"
                headerTitle="Loan Against <span class='text-teal-500'>Security</span>"
                headerSubtitle="Leverage Your Investments"
                headerDescription="Get funds against shares, mutual funds, or bonds without selling them."
                maxDisplay={4}
                showViewAllButton={true}
            />
            <SecuritiesLoanGuide pageId="30-lakh" />
        </div>
    );
}