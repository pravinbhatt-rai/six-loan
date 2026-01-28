import React from "react";
import HeroContainer from '@/component/HomeLoan/HeroContainer';
import { LoanSection } from '@/component/PersonalLoan/LoanSection';
import UniversalLoanCard from '@/component/loan/UniversalLoanCard';
import BikeLoanGuide from "@/component/UsedBike/BikeLoanGuide";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl = "https://sixfinance.app/usedBike/50k";

  return {
    title:
      "₹50,000 Used Bike Loan | Second Hand Bike Loan Starting ₹50K – Six Finance",

    description:
      "Get a ₹50,000 used bike loan with Six Finance. Ideal for budget motorcycles and scooters. Easy eligibility, quick approval & affordable EMIs.",

    keywords: [
      "50000 used bike loan",
      "₹50,000 second hand bike loan",
      "used bike loan 50k",
      "budget used bike loan",
      "low amount used bike loan",
      "used two wheeler loan 50000",
      "used scooter loan 50000",
      "second hand bike loan low income",
      "used bike loan EMI 50000",
      "used bike loan eligibility",
      "documents for used bike loan",
      "used bike loan without collateral",
      "cheap used bike finance",
      "six finance used bike loan",
    ],

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title: "₹50,000 Used Bike Loan | Six Finance",
      description:
        "Affordable ₹50,000 used bike loan for second-hand bikes and scooters with fast approval.",
      url: canonicalUrl,
      siteName: "Six Finance",
      type: "website",
      locale: "en_IN",
    },

    twitter: {
      card: "summary_large_image",
      title: "₹50,000 Used Bike Loan | Six Finance",
      description:
        "Finance your used bike with just ₹50,000 loan amount. Simple process & low EMIs.",
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
            <HeroContainer id='used-bike-loan-50k' />
            <LoanSection />
            <UniversalLoanCard
                categorySlug="used-two-wheeler-loan"
                headerTitle="Used Bike <span class='text-teal-500'>Loan</span>"
                headerSubtitle="Budget Friendly Rides"
                headerDescription="Affordable financing for purchasing second-hand motorcycles and scooters."
                maxDisplay={4}
                showViewAllButton={true}
            />
            <BikeLoanGuide pageId="used-bike-50k" />
        </main>
    );
}