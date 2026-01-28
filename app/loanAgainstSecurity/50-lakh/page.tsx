import React from "react";
import { LoanSection } from '@/component/PersonalLoan/LoanSection';
import UniversalLoanCard from "@/component/loan/UniversalLoanCard";
import SecuritiesLoanGuide from "@/component/LoanAgainstSecurity/SecuritiesLoanGuide";
import LASHero from "@/component/LoanAgainstSecurity/LASHero";
import type { Metadata } from "next";


export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl =
    "https://sixfinance.app/loanAgainstSecurity/50-lakh";

  return {
    title:
      "₹50 Lakh Loan Against Securities | Interest Rate & Eligibility – Six Finance",

    description:
      "Apply for a ₹50 lakh loan against securities with Six Finance. Get high-value funding against shares, mutual funds, or bonds without selling your investments.",

    keywords: [
      "50 lakh loan against securities",
      "₹50 lakh las",
      "loan against securities 50 lakh",
      "loan against shares 50 lakh",
      "loan against mutual funds 50 lakh",
      "loan against bonds india",
      "high value loan against securities",
      "secured loan against investments",
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
      title: "₹50 Lakh Loan Against Securities | Six Finance",
      description:
        "Unlock ₹50 lakh instantly with a loan against securities. Retain ownership of your investments while meeting large financial needs.",
      url: canonicalUrl,
      siteName: "Six Finance",
      type: "website",
      locale: "en_IN",
    },

    twitter: {
      card: "summary_large_image",
      title: "₹50 Lakh Loan Against Securities | Six Finance",
      description:
        "Get a ₹50 lakh loan against securities at competitive interest rates with flexible repayment options.",
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
            <LASHero id="50-lakh-las" />
            <LoanSection />
            <UniversalLoanCard
                categorySlug="loan-against-securities"
                headerTitle="Loan Against <span class='text-teal-500'>Security</span>"
                headerSubtitle="Leverage Your Investments"
                headerDescription="Get funds against shares, mutual funds, or bonds without selling them."
                maxDisplay={4}
                showViewAllButton={true}
            />
            <SecuritiesLoanGuide pageId="50-lakh" />
        </div>
    );
}