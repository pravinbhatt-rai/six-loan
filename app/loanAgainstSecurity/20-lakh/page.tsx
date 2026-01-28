import React from "react";
import { LoanSection } from '@/component/PersonalLoan/LoanSection';
import UniversalLoanCard from "@/component/loan/UniversalLoanCard";
import SecuritiesLoanGuide from "@/component/LoanAgainstSecurity/SecuritiesLoanGuide";
import LASHero from "@/component/LoanAgainstSecurity/LASHero";
import type { Metadata } from "next";


export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl =
    "https://sixfinance.app/loanAgainstSecurity/20-lakh";

  return {
    title:
      "₹20 Lakh Loan Against Securities | Interest Rate & Eligibility – Six Finance",
    description:
      "Apply for a ₹20 lakh loan against securities with Six Finance. Get instant liquidity against shares, mutual funds, or bonds without selling your investments.",

    keywords: [
      "20 lakh loan against securities",
      "₹20 lakh las",
      "loan against securities 20 lakh",
      "loan against shares 20 lakh",
      "loan against mutual funds 20 lakh",
      "loan against bonds",
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
      title: "₹20 Lakh Loan Against Securities | Six Finance",
      description:
        "Unlock instant funds with a ₹20 lakh loan against securities. Leverage shares or mutual funds without selling them.",
      url: canonicalUrl,
      siteName: "Six Finance",
      type: "website",
      locale: "en_IN",
    },

    twitter: {
      card: "summary_large_image",
      title: "₹20 Lakh Loan Against Securities | Six Finance",
      description:
        "Get a ₹20 lakh loan against securities with competitive interest rates and flexible repayment options.",
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
            <LASHero id="20-lakh-las" />
            <LoanSection />
            <UniversalLoanCard
                categorySlug="loan-against-securities"
                headerTitle="Loan Against <span class='text-teal-500'>Security</span>"
                headerSubtitle="Leverage Your Investments"
                headerDescription="Get funds against shares, mutual funds, or bonds without selling them."
                maxDisplay={4}
                showViewAllButton={true}
            />
            <SecuritiesLoanGuide pageId="20-lakh" />
        </div>
    );
}