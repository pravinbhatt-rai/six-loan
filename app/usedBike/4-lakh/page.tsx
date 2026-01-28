import React from "react";
import HeroContainer from '@/component/HomeLoan/HeroContainer';
import { LoanSection } from '@/component/PersonalLoan/LoanSection';
import UniversalLoanCard from '@/component/loan/UniversalLoanCard';
import BikeLoanGuide from "@/component/UsedBike/BikeLoanGuide";
import type { Metadata } from "next";


export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl = "https://sixfinance.app/usedBike/3-lakh";

  return {
    title:
      "₹3 Lakh Used Bike Loan | Second Hand Two Wheeler Loan – Six Finance",

    description:
      "Apply for a ₹3 lakh used bike loan with Six Finance. Get affordable financing for second-hand motorcycles and scooters with low EMIs and fast approval.",

    keywords: [
      "3 lakh used bike loan",
      "₹3 lakh second hand bike loan",
      "used bike loan 3 lakh",
      "second hand two wheeler loan 3 lakh",
      "used motorcycle loan india",
      "used scooter loan",
      "pre owned bike loan",
      "old bike loan interest rate",
      "used bike loan eligibility",
      "used bike loan documents",
      "two wheeler loan for used bike",
      "six finance used bike loan",
      "used bike loan EMI calculator",
    ],

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title: "₹3 Lakh Used Bike Loan | Six Finance",
      description:
        "Finance your second-hand bike or scooter with a ₹3 lakh used two-wheeler loan. Easy approval and affordable EMIs.",
      url: canonicalUrl,
      siteName: "Six Finance",
      type: "website",
      locale: "en_IN",
    },

    twitter: {
      card: "summary_large_image",
      title: "₹3 Lakh Used Bike Loan | Six Finance",
      description:
        "Affordable ₹3 lakh loan for used bikes and scooters with quick processing.",
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
            <HeroContainer id='used-bike-loan-4-lakh' />
            <LoanSection />
            <UniversalLoanCard
                categorySlug="used-two-wheeler-loan"
                headerTitle="Used Bike <span class='text-teal-500'>Loan</span>"
                headerSubtitle="Budget Friendly Rides"
                headerDescription="Affordable financing for purchasing second-hand motorcycles and scooters."
                maxDisplay={4}
                showViewAllButton={true}
            />
            <BikeLoanGuide pageId="used-bike-4lakh" />
        </main>
    );
}