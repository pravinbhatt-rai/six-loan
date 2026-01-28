import { Metadata } from 'next';
import React from "react";
export const metadata: Metadata = {
    title: 'Senior Citizen Personal Loan | Best Offers 2026',
    description: 'Find the best personal loans for senior citizens in India 2026. Compare interest rates, EMI, eligibility, and apply online for instant approval. Special offers for pensioners and retirees.',
    alternates: {
        canonical: 'https://sixfinance.app/personalLoan/seniors',
    },
    keywords: [
        'senior citizen personal loan', 'personal loan for seniors', 'personal loan for pensioners', 'personal loan for retirees', 'personal loan for retired employees', 'personal loan for senior citizens India', 'personal loan for old age', 'personal loan for pension income', 'personal loan for retirement', 'personal loan for medical expenses seniors', 'personal loan for travel seniors', 'personal loan for home renovation seniors', 'personal loan for emergency seniors', 'personal loan for low interest seniors', 'personal loan for flexible EMI seniors', 'personal loan for minimum documents seniors', 'personal loan for eligibility check seniors', 'personal loan for apply online seniors', 'personal loan for review seniors', 'personal loan for tips seniors', 'personal loan for best offers seniors', 'personal loan for 2026 seniors', 'personal loan for best banks seniors', 'personal loan for online seniors', 'personal loan for collateral free seniors', 'personal loan for top up seniors', 'personal loan for overdraft seniors', 'personal loan for pre approved seniors', 'personal loan for seniors India', 'personal loan for seniors 2026', 'personal loan for financial planning seniors', 'personal loan for credit improvement seniors', 'personal loan for loan settlement seniors', 'personal loan for quick disbursal seniors', 'personal loan for instant approval seniors', 'personal loan for high loan value seniors', 'personal loan for attractive interest seniors', 'personal loan for extended tenure seniors'
    ],
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    openGraph: {
        title: 'Senior Citizen Personal Loan | Best Offers 2026',
        description: 'Find the best personal loans for senior citizens in India 2026. Compare interest rates, EMI, eligibility, and apply online for instant approval. Special offers for pensioners and retirees.',
        url: 'https://sixfinance.app/personalLoan/seniors',
        siteName: 'SixFinance',
        type: 'website',
    },
};
import PreHero from "@/component/PersonalLoan/preApproved/PreHero";
import EMICalculator from "@/component/PersonalLoan/preApproved/EMICalculator";
import { Percent, Wallet, Zap, CalendarDays } from "lucide-react";
import UniversalLoanCard from "@/component/loan/UniversalLoanCard";
import DynamicContentCard from "@/component/PersonalLoan/salaried/DynamicContentCard";

export default function SalariedPersonalLoanPage() {
    return (
        <>
            <PreHero id="personal-loan-pensioner" />
            <EMICalculator
                marketingContent={{
                    tagline: "Senior Citizen Personal Loan Calculator",
                    headline: (
                        <>
                            Plan Your <br />
                            <span className="text-teal-600">Senior Citizen Personal Loan EMI</span>
                        </>
                    ),
                    description: "Calculate accurate monthly payments for your personal loan as a salaried individual. Adjust the tenure to find an EMI that fits your monthly budget perfectly without overextending.",
                    features: [
                        {
                            icon: <Percent size={20} />,
                            title: "Attractive Interest Rates",
                            desc: "Rates starting as low as 10.49% p.a. for customers with high credit scores."
                        },
                        {
                            icon: <Wallet size={20} />,
                            title: "High Loan Value",
                            desc: "Get access to funds up to ₹50 Lakhs to cover major expenses."
                        },
                        {
                            icon: <Zap size={20} />,
                            title: "Quick Disbursal",
                            desc: "End-to-end digital processing ensures money in your bank within 24-48 hours."
                        },
                        {
                            icon: <CalendarDays size={20} />,
                            title: "Extended Tenure",
                            desc: "Repayment flexibility with tenures ranging up to 60 months."
                        },
                    ]
                }}

                // 2. Right Side Content (Calculator Configuration)
                title="Estimate Your Monthly EMI"
                currencySymbol="₹"

                // Standard Personal Loan Limits (50k to 50L)
                defaultAmount={500000} // Default 5 Lakhs
                minAmount={50000}
                maxAmount={5000000}

                // Tenure (1 to 5 Years)
                defaultMonths={36}
                minMonths={12}
                maxMonths={60}

                // Interest Rates (Market Standard)
                defaultApr={10.99} // Competitive starting rate
                minApr={10.49}    // Best market rate
                maxApr={24}
            />
            <UniversalLoanCard
                categorySlug="personal-loan"
                headerTitle="Personal <span class='text-teal-500'>Loan</span>"
                headerSubtitle="Instant Funds for Any Need"
                headerDescription="Quick approvals and flexible repayment tenures for all your personal needs."
                maxDisplay={4}
                showViewAllButton={true}
            />
            <DynamicContentCard pageId="personal-loan-senior-citizen" />
        </>
    );
}