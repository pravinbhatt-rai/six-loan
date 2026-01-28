import React from "react";
import HeroContainer from '@/component/HomeLoan/HeroContainer';
import { LoanSection } from '@/component/PersonalLoan/LoanSection';
import UniversalLoanCard from '@/component/loan/UniversalLoanCard';
import BikeLoanGuide from "@/component/UsedBike/BikeLoanGuide";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl = "https://sixfinance.app/usedBike/15-lakh";

  return {
    title:
      "₹15 Lakh Used Bike Loan | Second Hand Two Wheeler Loan – Six Finance",

    description:
      "Get a ₹15 lakh used bike loan with Six Finance. Ideal for premium and superbikes. Enjoy low EMIs, flexible tenure, and fast approval for second-hand two wheelers.",

    keywords: [
      "15 lakh used bike loan",
      "₹15 lakh second hand bike loan",
      "used bike loan 15 lakh",
      "second hand two wheeler loan 15 lakh",
      "used superbike loan india",
      "premium used bike loan",
      "high value used bike finance",
      "pre owned bike loan 15 lakh",
      "used motorcycle loan india",
      "used bike loan EMI calculator",
      "used bike loan eligibility",
      "used bike loan documents",
      "old bike loan interest rate",
      "two wheeler loan for used bike",
      "six finance used bike loan",
      "loan for premium used motorcycle",
      "used bike loan without collateral",
    ],

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title: "₹15 Lakh Used Bike Loan | Six Finance",
      description:
        "Finance premium second-hand bikes with a ₹15 lakh used bike loan at competitive interest rates.",
      url: canonicalUrl,
      siteName: "Six Finance",
      type: "website",
      locale: "en_IN",
    },

    twitter: {
      card: "summary_large_image",
      title: "₹15 Lakh Used Bike Loan | Six Finance",
      description:
        "Apply for a ₹15 lakh used bike loan with easy EMIs and quick approval.",
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
            <HeroContainer id='used-bike-loan-15-lakh' />
            <LoanSection />
            <UniversalLoanCard
                categorySlug="used-two-wheeler-loan"
                headerTitle="Used Bike <span class='text-teal-500'>Loan</span>"
                headerSubtitle="Budget Friendly Rides"
                headerDescription="Affordable financing for purchasing second-hand motorcycles and scooters."
                maxDisplay={4}
                showViewAllButton={true}
            />
            <BikeLoanGuide pageId="used-bike-15lakh" />
        </main>
    );
}