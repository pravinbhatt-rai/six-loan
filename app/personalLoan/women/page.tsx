import { Metadata } from 'next';
import React from "react";
export const metadata: Metadata = {
    title: 'Personal Loan for Women | Best Offers 2026',
    description: 'Compare personal loans for women in India 2026. Get instant approval, low interest rates, flexible EMI, and apply online for top personal loans for women professionals, homemakers, and entrepreneurs.',
    alternates: {
        canonical: 'https://sixfinance.app/personalLoan/women',
    },
    keywords: [
        'personal loan for women', 'women personal loan', 'personal loan for homemakers', 'personal loan for working women', 'personal loan for female entrepreneurs', 'personal loan for self employed women', 'personal loan for salaried women', 'personal loan for single mothers', 'personal loan for housewives', 'personal loan for women India', 'best personal loan for women', 'personal loan interest rate women', 'personal loan EMI women', 'personal loan eligibility women', 'personal loan apply online women', 'personal loan offers women', 'personal loan documents women', 'personal loan for women 2026', 'compare personal loans for women', 'personal loan process women', 'personal loan approval women', 'personal loan guide women', 'personal loan calculator women', 'personal loan instant approval women', 'personal loan low interest women', 'personal loan zero processing fee women', 'personal loan pre approved women', 'personal loan top up women', 'personal loan overdraft women', 'personal loan balance transfer women', 'personal loan best banks women', 'personal loan online women', 'personal loan without collateral women', 'personal loan quick disbursal women', 'personal loan flexible tenure women', 'personal loan low EMI women', 'personal loan minimum documents women', 'personal loan eligibility check women', 'personal loan apply 2026 women', 'personal loan review women', 'personal loan tips women', 'personal loan offers 2026 women'
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
        title: 'Personal Loan for Women | Best Offers 2026',
        description: 'Compare personal loans for women in India 2026. Get instant approval, low interest rates, flexible EMI, and apply online for top personal loans for women professionals, homemakers, and entrepreneurs.',
        url: 'https://sixfinance.app/personalLoan/women',
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
            <PreHero id="personal-loan-women" />
            <EMICalculator
                marketingContent={{
                    tagline: "Women Personal Loan Calculator",
                    headline: (
                        <>
                            Plan Your <br />
                            <span className="text-teal-600">Women Personal Loan EMI</span>
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
                eligibleFor="women"
                headerSubtitle="Instant Funds for Any Need"
                headerDescription="Quick approvals and flexible repayment tenures for all your personal needs."
                maxDisplay={4}
                showViewAllButton={true}
            />
            <DynamicContentCard pageId="personal-loan-women" />
        </>
    );
}