import React from "react";
import { LoanSection } from '@/component/PersonalLoan/LoanSection';
import UniversalLoanCard from "@/component/loan/UniversalLoanCard";
import SecuritiesLoanGuide from "@/component/LoanAgainstSecurity/SecuritiesLoanGuide";
import LASHero from "@/component/LoanAgainstSecurity/LASHero";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl =
    "https://sixfinance.app/loanAgainstSecurity/75-lakh";

  return {
    title:
      "₹75 Lakh Loan Against Securities | Interest Rates & Eligibility – Six Finance",

    description:
      "Apply for a ₹75 lakh loan against securities with Six Finance. Get large-ticket funding against shares, mutual funds, or bonds without selling your investments.",

    keywords: [
      "75 lakh loan against securities",
      "₹75 lakh las",
      "loan against securities 75 lakh",
      "loan against shares 75 lakh",
      "loan against mutual funds 75 lakh",
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
      title: "₹75 Lakh Loan Against Securities | Six Finance",
      description:
        "Unlock ₹75 lakh instantly with a loan against securities. Retain ownership of your investments while meeting major financial goals.",
      url: canonicalUrl,
      siteName: "Six Finance",
      type: "website",
      locale: "en_IN",
    },

    twitter: {
      card: "summary_large_image",
      title: "₹75 Lakh Loan Against Securities | Six Finance",
      description:
        "Get a ₹75 lakh loan against securities with competitive interest rates and flexible repayment options.",
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
            <LASHero id="75-lakh-las" />
            <LoanSection />
            <UniversalLoanCard
                categorySlug="loan-against-securities"
                headerTitle="Loan Against <span class='text-teal-500'>Security</span>"
                headerSubtitle="Leverage Your Investments"
                headerDescription="Get funds against shares, mutual funds, or bonds without selling them."
                maxDisplay={4}
                showViewAllButton={true}
            />
            <SecuritiesLoanGuide pageId="75-lakh" />
        </div>
    );
}