import { Metadata } from 'next';
import React from "react";
export const metadata: Metadata = {
    title: 'Personal Loan for Salaried Employees | Best Rates 2026',
    description: 'Find the best personal loans for salaried employees in India 2026. Compare interest rates, EMI, eligibility, and apply online for instant approval. Special offers for government and private sector employees.',
    alternates: {
        canonical: 'https://sixfinance.app/personalLoan/salaried',
    },
    keywords: [
        'personal loan for salaried', 'personal loan for salaried employees', 'personal loan for government employees', 'personal loan for private employees', 'personal loan for PSU employees', 'personal loan for IT employees', 'personal loan for bank employees', 'personal loan for teachers', 'personal loan for doctors', 'personal loan for engineers', 'personal loan for professionals', 'personal loan for salaried individuals', 'personal loan for fixed salary', 'personal loan for monthly salary', 'personal loan for high salary', 'personal loan for low salary', 'personal loan eligibility salaried', 'personal loan EMI salaried', 'personal loan interest rate salaried', 'personal loan apply online salaried', 'personal loan instant approval salaried', 'personal loan documents salaried', 'personal loan offers salaried', 'personal loan best banks salaried', 'personal loan quick disbursal salaried', 'personal loan flexible tenure salaried', 'personal loan low EMI salaried', 'personal loan minimum documents salaried', 'personal loan eligibility check salaried', 'personal loan apply 2026 salaried', 'personal loan review salaried', 'personal loan tips salaried', 'personal loan top up salaried', 'personal loan overdraft salaried', 'personal loan balance transfer salaried', 'personal loan pre approved salaried', 'personal loan online salaried', 'personal loan without collateral salaried', 'personal loan best offers 2026 salaried'
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
        title: 'Personal Loan for Salaried Employees | Best Rates 2026',
        description: 'Find the best personal loans for salaried employees in India 2026. Compare interest rates, EMI, eligibility, and apply online for instant approval. Special offers for government and private sector employees.',
        url: 'https://sixfinance.app/personalLoan/salaried',
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
            <PreHero id="personal-loan-salaried" />
            <EMICalculator
                marketingContent={{
                    tagline: "Salaried Personal Loan Calculator",
                    headline: (
                        <>
                            Plan Your <br />
                            <span className="text-teal-600">Salaried Personal Loan EMI</span>
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
                eligibleFor="salaried"
                headerSubtitle="Instant Funds for Any Need"
                headerDescription="Quick approvals and flexible repayment tenures for all your personal needs."
                maxDisplay={4}
                showViewAllButton={true}
            />
            <DynamicContentCard pageId="personal-loan-salaried" />
        </>
    );
}