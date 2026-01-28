import { Metadata } from 'next';
import React from "react";
export const metadata: Metadata = {
    title: 'Self-Employed Personal Loan | Best Offers 2026',
    description: 'Find the best personal loans for self-employed in India 2026. Compare interest rates, EMI, eligibility, and apply online for instant approval. Special offers for business owners, freelancers, and professionals.',
    alternates: {
        canonical: 'https://sixfinance.app/personalLoan/self-employed',
    },
    keywords: [
        'self-employed personal loan', 'personal loan for self employed', 'business owner personal loan', 'freelancer personal loan', 'professional personal loan', 'personal loan for entrepreneurs', 'personal loan for consultants', 'personal loan for contractors', 'personal loan for traders', 'personal loan for shop owners', 'personal loan for manufacturers', 'personal loan for service sector', 'personal loan for business expenses', 'personal loan for quick disbursal self employed', 'personal loan for instant approval self employed', 'personal loan for low interest self employed', 'personal loan for flexible EMI self employed', 'personal loan for minimum documents self employed', 'personal loan for eligibility check self employed', 'personal loan for apply online self employed', 'personal loan for review self employed', 'personal loan for tips self employed', 'personal loan for best offers self employed', 'personal loan for 2026 self employed', 'personal loan for best banks self employed', 'personal loan for online self employed', 'personal loan for collateral free self employed', 'personal loan for top up self employed', 'personal loan for overdraft self employed', 'personal loan for balance transfer self employed', 'personal loan for pre approved self employed', 'personal loan for self employed India', 'personal loan for self employed 2026', 'personal loan for business growth', 'personal loan for business finance', 'personal loan for business working capital', 'personal loan for self employed professionals', 'personal loan for self employed eligibility', 'personal loan for self employed apply online'
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
        title: 'Self-Employed Personal Loan | Best Offers 2026',
        description: 'Find the best personal loans for self-employed in India 2026. Compare interest rates, EMI, eligibility, and apply online for instant approval. Special offers for business owners, freelancers, and professionals.',
        url: 'https://sixfinance.app/personalLoan/self-employed',
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
            <PreHero id="personal-loan-self-employed" />
            <EMICalculator
                marketingContent={{
                    tagline: "Self-Employed Personal Loan Calculator",
                    headline: (
                        <>
                            Plan Your <br />
                            <span className="text-teal-600">Self-Employed Personal Loan EMI</span>
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
                eligibleFor="self-employed"
                headerSubtitle="Instant Funds for Any Need"
                headerDescription="Quick approvals and flexible repayment tenures for all your personal needs."
                maxDisplay={4}
                showViewAllButton={true}
            />
            <DynamicContentCard pageId="personal-loan-self-employed" />
        </>
    );
}