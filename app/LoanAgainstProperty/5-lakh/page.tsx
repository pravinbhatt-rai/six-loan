import React from "react";
import LAPHero from "@/component/LoanAgainstProperty/LAPHero";
import { LoanSection } from '@/component/PersonalLoan/LoanSection';
import UniversalLoanCard from "@/component/loan/UniversalLoanCard";
import PropertyLoanGuide from "@/component/LoanAgainstProperty/PropertyLoanGuide";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl =
    "https://sixfinance.app/LoanAgainstProperty/5-lakh";

  return {
    title:
      "₹5 Lakh Loan Against Property | EMI, Interest Rate & Eligibility – Six Finance",
    description:
      "Apply for a ₹5 lakh loan against property with Six Finance. Check interest rates, EMI, eligibility, documents required, and flexible repayment options for residential or commercial property.",

    keywords: [
      "5 lakh loan against property",
      "₹5 lakh lap",
      "loan against property 5 lakh",
      "lap loan 5 lakh",
      "loan against property minimum amount",
      "small loan against property",
      "loan against property interest rate",
      "loan against property emi calculator",
      "loan against property eligibility",
      "loan against property documents required",
      "property loan 5 lakh",
      "loan on residential property",
      "loan on commercial property",
      "six finance loan against property",
    ],

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title: "₹5 Lakh Loan Against Property | Six Finance",
      description:
        "Get a ₹5 lakh loan against property with easy eligibility, low interest rates, and flexible tenure from Six Finance.",
      url: canonicalUrl,
      siteName: "Six Finance",
      type: "website",
      locale: "en_IN",
    },

    twitter: {
      card: "summary_large_image",
      title: "₹5 Lakh Loan Against Property | Six Finance",
      description:
        "Need a small LAP? Apply for a ₹5 lakh loan against property with competitive interest rates.",
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
            <LAPHero id="5-lakh-lap" />
            <LoanSection />
            <UniversalLoanCard
                categorySlug="loan-against-property"
                headerTitle="Property <span class='text-teal-500'>Loan</span>"
                headerSubtitle="Unlock Your Property's Value"
                headerDescription="Get high-value loans by pledging your residential or commercial property."
                maxDisplay={4}
                showViewAllButton={true}
            />
            <PropertyLoanGuide pageId="5-lakh" />
        </div>
    );
}