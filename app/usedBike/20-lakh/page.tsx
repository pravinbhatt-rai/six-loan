import React from "react";
import HeroContainer from '@/component/HomeLoan/HeroContainer';
import { LoanSection } from '@/component/PersonalLoan/LoanSection';
import UniversalLoanCard from '@/component/loan/UniversalLoanCard';
import BikeLoanGuide from "@/component/UsedBike/BikeLoanGuide";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl = "https://sixfinance.app/usedBike/20-lakh";

  return {
    title:
      "₹20 Lakh Used Bike Loan | Premium Second Hand Bike Finance – Six Finance",

    description:
      "Apply for a ₹20 lakh used bike loan with Six Finance. Best for premium, luxury and superbikes. Get low EMIs, flexible tenure and fast approval.",

    keywords: [
      "20 lakh used bike loan",
      "₹20 lakh second hand bike loan",
      "used bike loan 20 lakh",
      "premium used bike loan india",
      "luxury bike loan used",
      "superbike loan second hand",
      "high value two wheeler loan",
      "used superbike finance",
      "pre owned bike loan 20 lakh",
      "used motorcycle loan high amount",
      "used bike loan EMI",
      "used bike loan interest rate",
      "used bike loan eligibility",
      "documents for used bike loan",
      "two wheeler loan for premium bikes",
      "six finance used bike loan",
      "used bike loan without collateral",
    ],

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title: "₹20 Lakh Used Bike Loan | Six Finance",
      description:
        "Finance premium and luxury second-hand bikes with a ₹20 lakh used bike loan at low interest rates.",
      url: canonicalUrl,
      siteName: "Six Finance",
      type: "website",
      locale: "en_IN",
    },

    twitter: {
      card: "summary_large_image",
      title: "₹20 Lakh Used Bike Loan | Six Finance",
      description:
        "Get high-value used bike loans up to ₹20 lakh with easy EMIs and fast approval.",
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
            <HeroContainer id='used-bike-loan-20-lakh' />
            <LoanSection />
            <UniversalLoanCard
                categorySlug="used-two-wheeler-loan"
                headerTitle="Used Bike <span class='text-teal-500'>Loan</span>"
                headerSubtitle="Budget Friendly Rides"
                headerDescription="Affordable financing for purchasing second-hand motorcycles and scooters."
                maxDisplay={4}
                showViewAllButton={true}
            />
            <BikeLoanGuide pageId="used-bike-20lakh" />
        </main>
    );
}