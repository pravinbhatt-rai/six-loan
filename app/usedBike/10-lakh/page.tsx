import React from "react";
import HeroContainer from '@/component/HomeLoan/HeroContainer';
import { LoanSection } from '@/component/PersonalLoan/LoanSection';
import UniversalLoanCard from '@/component/loan/UniversalLoanCard';
import BikeLoanGuide from "@/component/UsedBike/BikeLoanGuide";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl = "https://sixfinance.app/usedBike/10-lakh";

  return {
    title:
      "₹10 Lakh Used Bike Loan | Second Hand Two Wheeler Loan – Six Finance",

    description:
      "Apply for a ₹10 lakh used bike loan with Six Finance. Get high-value financing for second-hand bikes with low EMIs, flexible tenure, and fast approval across India.",

    keywords: [
      "10 lakh used bike loan",
      "₹10 lakh second hand bike loan",
      "used bike loan 10 lakh",
      "second hand two wheeler loan 10 lakh",
      "used motorcycle loan india",
      "used superbike loan",
      "pre owned bike loan 10 lakh",
      "high value used bike loan",
      "used bike loan EMI calculator",
      "used bike loan eligibility",
      "used bike loan documents",
      "old bike loan interest rate",
      "two wheeler loan for used bike",
      "six finance used bike loan",
      "used bike finance up to 10 lakh",
      "loan for premium used bike",
      "used bike loan without collateral",
    ],

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title: "₹10 Lakh Used Bike Loan | Six Finance",
      description:
        "Finance premium second-hand bikes with a ₹10 lakh used bike loan at competitive interest rates.",
      url: canonicalUrl,
      siteName: "Six Finance",
      type: "website",
      locale: "en_IN",
    },

    twitter: {
      card: "summary_large_image",
      title: "₹10 Lakh Used Bike Loan | Six Finance",
      description:
        "Get up to ₹10 lakh loan for used bikes with easy EMIs and quick approval.",
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}


export default function Page() {
    return (
        <main>
            <HeroContainer id='used-bike-loan-10-lakh' />
            <LoanSection />
            <UniversalLoanCard
                categorySlug="used-two-wheeler-loan"
                headerTitle="Used Bike <span class='text-teal-500'>Loan</span>"
                headerSubtitle="Budget Friendly Rides"
                headerDescription="Affordable financing for purchasing second-hand motorcycles and scooters."
                maxDisplay={4}
                showViewAllButton={true}
            />
            <BikeLoanGuide pageId="used-bike-10lakh" />
        </main>
    );
}