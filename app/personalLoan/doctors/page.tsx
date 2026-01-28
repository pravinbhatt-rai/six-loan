import { Metadata } from 'next';
import React from "react";
export const metadata: Metadata = {
    title: 'Doctor Personal Loan | Best Offers 2026',
    description: 'Find the best personal loans for doctors in India 2026. Compare interest rates, EMI, eligibility, and apply online for instant approval. Special offers for medical professionals and healthcare workers.',
    alternates: {
        canonical: 'https://sixfinance.app/personalLoan/doctors',
    },
    keywords: [
        'doctor personal loan', 'personal loan for doctors', 'medical professional loan', 'personal loan for healthcare workers', 'personal loan for medical expenses', 'personal loan for clinic setup', 'personal loan for medical equipment', 'personal loan for doctors India', 'personal loan for medical practice', 'personal loan for hospital staff', 'personal loan for nurses', 'personal loan for healthcare professionals', 'personal loan for low interest doctors', 'personal loan for flexible EMI doctors', 'personal loan for minimum documents doctors', 'personal loan for eligibility check doctors', 'personal loan for apply online doctors', 'personal loan for review doctors', 'personal loan for tips doctors', 'personal loan for best offers doctors', 'personal loan for 2026 doctors', 'personal loan for best banks doctors', 'personal loan for online doctors', 'personal loan for collateral free doctors', 'personal loan for top up doctors', 'personal loan for overdraft doctors', 'personal loan for pre approved doctors', 'personal loan for doctors India', 'personal loan for doctors 2026', 'personal loan for financial planning doctors', 'personal loan for credit improvement doctors', 'personal loan for loan settlement doctors', 'personal loan for quick disbursal doctors', 'personal loan for instant approval doctors', 'personal loan for high loan value doctors', 'personal loan for attractive interest doctors', 'personal loan for extended tenure doctors'
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
        title: 'Doctor Personal Loan | Best Offers 2026',
        description: 'Find the best personal loans for doctors in India 2026. Compare interest rates, EMI, eligibility, and apply online for instant approval. Special offers for medical professionals and healthcare workers.',
        url: 'https://sixfinance.app/personalLoan/doctors',
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
            <PreHero id="personal-loan-doctors" />
            <EMICalculator
                marketingContent={{
                    tagline: "Doctor Personal Loan Calculator",
                    headline: (
                        <>
                            Plan Your <br />
                            <span className="text-teal-600">Doctor Personal Loan EMI</span>
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
                loanType="personal"
                eligibleFor="doctors"
                headerSubtitle="Instant Funds for Any Need"
                headerDescription="Quick approvals and flexible repayment tenures for all your personal needs."
                maxDisplay={4}
                showViewAllButton={true}
            />
            <DynamicContentCard pageId="personal-loan-doctor" />
        </>
    );
}