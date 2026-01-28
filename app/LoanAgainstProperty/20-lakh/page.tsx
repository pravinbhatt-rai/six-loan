import LAPHero from "@/component/LoanAgainstProperty/LAPHero";
import { LoanSection } from '@/component/PersonalLoan/LoanSection';
import UniversalLoanCard from "@/component/loan/UniversalLoanCard";
import PropertyLoanGuide from "@/component/LoanAgainstProperty/PropertyLoanGuide";
import type { Metadata } from "next";
import React from "react";

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl =
    "https://sixfinance.app/LoanAgainstProperty/20-lakh";

  return {
    title:
      "₹20 Lakh Loan Against Property | EMI, Interest Rate & Eligibility – Six Finance",
    description:
      "Apply for a ₹20 lakh loan against property with Six Finance. Check interest rates, EMI, eligibility, documents required, and flexible repayment options for residential or commercial property loans.",

    keywords: [
      "20 lakh loan against property",
      "₹20 lakh lap",
      "loan against property 20 lakh",
      "lap loan 20 lakh",
      "loan against property interest rate",
      "loan against property emi calculator",
      "loan against property eligibility",
      "loan against property documents required",
      "property loan 20 lakh",
      "loan on residential property",
      "loan on commercial property",
      "six finance loan against property",
    ],

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title: "₹20 Lakh Loan Against Property | Six Finance",
      description:
        "Get a ₹20 lakh loan against property with competitive interest rates, flexible tenure, and easy eligibility.",
      url: canonicalUrl,
      siteName: "Six Finance",
      type: "website",
      locale: "en_IN",
    },

    twitter: {
      card: "summary_large_image",
      title: "₹20 Lakh Loan Against Property | Six Finance",
      description:
        "Apply online for a ₹20 lakh loan against property with low EMI and fast approval.",
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
            <LAPHero id="20-lakh-lap" />
            <LoanSection />
            <UniversalLoanCard
                categorySlug="loan-against-property"
                headerTitle="Property <span class='text-teal-500'>Loan</span>"
                headerSubtitle="Unlock Your Property's Value"
                headerDescription="Get high-value loans by pledging your residential or commercial property."
                maxDisplay={4}
                showViewAllButton={true}
            />
            <PropertyLoanGuide pageId="20-lakh" />
        </div>
    );
}