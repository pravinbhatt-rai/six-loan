import LAPHero from "@/component/LoanAgainstProperty/LAPHero";
import { LoanSection } from '@/component/PersonalLoan/LoanSection';
import UniversalLoanCard from "@/component/loan/UniversalLoanCard";
import PropertyLoanGuide from "@/component/LoanAgainstProperty/PropertyLoanGuide";
import type { Metadata } from "next";
import React from "react";

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl =
    "https://sixfinance.app/LoanAgainstProperty/1-crore";

  return {
    title:
      "₹1 Crore Loan Against Property | EMI, Interest Rate & Eligibility – Six Finance",
    description:
      "Apply for a ₹1 crore loan against property with Six Finance. Check EMI, interest rates, eligibility, documents required, and flexible repayment options for residential or commercial property.",

    keywords: [
      "1 crore loan against property",
      "₹1 crore lap",
      "loan against property 1 crore",
      "lap loan 1 crore",
      "loan against property interest rate",
      "loan against property emi calculator",
      "loan against property eligibility",
      "loan against property documents required",
      "property loan 1 crore",
      "loan on residential property",
      "loan on commercial property",
      "high value lap loan india",
      "six finance loan against property",
    ],

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title: "₹1 Crore Loan Against Property | Six Finance",
      description:
        "Unlock your property’s value with a ₹1 crore loan against property. Compare EMI, interest rates, and eligibility with Six Finance.",
      url: canonicalUrl,
      siteName: "Six Finance",
      type: "website",
      locale: "en_IN",
    },

    twitter: {
      card: "summary_large_image",
      title: "₹1 Crore Loan Against Property | Six Finance",
      description:
        "Get a ₹1 crore loan against property with flexible tenure and competitive interest rates. Apply online with Six Finance.",
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
            <LAPHero id="1-cr-lap" />
            <LoanSection />
            <UniversalLoanCard
                categorySlug="loan-against-property"
                headerTitle="Property <span class='text-teal-500'>Loan</span>"
                headerSubtitle="Unlock Your Property's Value"
                headerDescription="Get high-value loans by pledging your residential or commercial property."
                maxDisplay={4}
                showViewAllButton={true}
            />
            <PropertyLoanGuide pageId="1-cr" />
        </div>
    );
}