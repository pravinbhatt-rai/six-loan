import React from "react";
import HeroContainer from '@/component/HomeLoan/HeroContainer';
import { LoanSection } from '@/component/PersonalLoan/LoanSection';
import UniversalLoanCard from '@/component/loan/UniversalLoanCard';
import BikeLoanGuide from "@/component/UsedBike/BikeLoanGuide";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl =
    "https://sixfinance.app/usedBike/1-lakh";

  return {
    title:
      "₹1 Lakh Used Bike Loan | Second Hand Two Wheeler Loan – Six Finance",

    description:
      "Apply for a ₹1 lakh used bike loan with Six Finance. Get affordable financing for second-hand motorcycles and scooters with low EMI and quick approval.",

    keywords: [
      "1 lakh used bike loan",
      "₹1 lakh second hand bike loan",
      "used bike loan 1 lakh",
      "second hand two wheeler loan",
      "used motorcycle loan india",
      "used scooter loan",
      "pre owned bike loan",
      "old bike loan interest rate",
      "used bike loan eligibility",
      "used bike loan documents",
      "two wheeler loan for used bike",
      "six finance used bike loan",
    ],

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title: "₹1 Lakh Used Bike Loan | Six Finance",
      description:
        "Finance your second-hand bike with a ₹1 lakh used two-wheeler loan. Easy approval, affordable EMIs, and trusted lenders.",
      url: canonicalUrl,
      siteName: "Six Finance",
      type: "website",
      locale: "en_IN",
    },

    twitter: {
      card: "summary_large_image",
      title: "₹1 Lakh Used Bike Loan | Six Finance",
      description:
        "Affordable financing for used bikes and scooters with Six Finance.",
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
            <HeroContainer id='used-bike-loan-1-lakh' />
            <LoanSection />
            <UniversalLoanCard
                categorySlug="used-two-wheeler-loan"
                headerTitle="Used Bike <span class='text-teal-500'>Loan</span>"
                headerSubtitle="Budget Friendly Rides"
                headerDescription="Affordable financing for purchasing second-hand motorcycles and scooters."
                maxDisplay={4}
                showViewAllButton={true}
            />
            <BikeLoanGuide pageId="used-bike-1lakh" />
        </main>
    );
}