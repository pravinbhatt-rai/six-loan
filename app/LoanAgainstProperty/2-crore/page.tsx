import React from "react";
import LAPHero from "@/component/LoanAgainstProperty/LAPHero";
import { LoanSection } from '@/component/PersonalLoan/LoanSection';
import UniversalLoanCard from "@/component/loan/UniversalLoanCard";
import PropertyLoanGuide from "@/component/LoanAgainstProperty/PropertyLoanGuide";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl =
    "https://sixfinance.app/LoanAgainstProperty/2-crore";

  return {
    title:
      "₹2 Crore Loan Against Property | EMI, Interest Rate & Eligibility – Six Finance",
    description:
      "Apply for a ₹2 crore loan against property with Six Finance. Check interest rates, EMI, eligibility, documents required, and flexible tenure for residential or commercial property loans.",

    keywords: [
      "2 crore loan against property",
      "₹2 crore lap",
      "loan against property 2 crore",
      "lap loan 2 crore",
      "loan against property interest rate",
      "loan against property emi calculator",
      "loan against property eligibility",
      "loan against property documents required",
      "property loan 2 crore",
      "loan on residential property",
      "loan on commercial property",
      "high value lap loan india",
      "six finance loan against property",
    ],

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title: "₹2 Crore Loan Against Property | Six Finance",
      description:
        "Unlock high-value funding with a ₹2 crore loan against property. Compare EMI, interest rates, and eligibility with Six Finance.",
      url: canonicalUrl,
      siteName: "Six Finance",
      type: "website",
      locale: "en_IN",
    },

    twitter: {
      card: "summary_large_image",
      title: "₹2 Crore Loan Against Property | Six Finance",
      description:
        "Get a ₹2 crore loan against property with competitive interest rates and flexible repayment options.",
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
            <LAPHero id="2-cr-lap" />
            <LoanSection />
            <UniversalLoanCard
                categorySlug="loan-against-property"
                headerTitle="Property <span class='text-teal-500'>Loan</span>"
                headerSubtitle="Unlock Your Property's Value"
                headerDescription="Get high-value loans by pledging your residential or commercial property."
                maxDisplay={4}
                showViewAllButton={true}
            />
            <PropertyLoanGuide pageId="2-cr" />
        </div>
    );
}