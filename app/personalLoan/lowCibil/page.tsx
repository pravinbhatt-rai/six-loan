import { Metadata } from 'next';
import React from "react";
export const metadata: Metadata = {
    title: 'Low CIBIL Personal Loan | Bad Credit Loan Offers 2026',
    description: 'Get personal loans for low CIBIL or bad credit in India 2026. Compare lenders, interest rates, and eligibility. Apply online for instant approval and flexible EMI, even with a low credit score.',
    alternates: {
        canonical: 'https://sixfinance.app/personalLoan/lowCibil',
    },
    keywords: [
        'low cibil personal loan', 'personal loan for low cibil', 'bad credit personal loan', 'personal loan for bad credit', 'personal loan for low credit score', 'personal loan for cibil score 600', 'personal loan for cibil score 500', 'personal loan for cibil score 650', 'personal loan for poor credit', 'personal loan for no cibil', 'personal loan for cibil improvement', 'personal loan for cibil repair', 'personal loan for cibil defaulter', 'personal loan for cibil settlement', 'personal loan for cibil correction', 'personal loan for cibil update', 'personal loan for cibil dispute', 'personal loan for cibil check', 'personal loan for cibil eligibility', 'personal loan for cibil apply online', 'personal loan for cibil instant approval', 'personal loan for cibil low interest', 'personal loan for cibil flexible tenure', 'personal loan for cibil minimum documents', 'personal loan for cibil best banks', 'personal loan for cibil 2026', 'personal loan for cibil review', 'personal loan for cibil tips', 'personal loan for cibil offers', 'personal loan for cibil online', 'personal loan for cibil collateral free', 'personal loan for cibil quick disbursal', 'personal loan for cibil best rates', 'personal loan for cibil India', 'personal loan for cibil improvement tips', 'personal loan for cibil score boost', 'personal loan for cibil 2026', 'personal loan for cibil eligibility check', 'personal loan for cibil apply 2026'
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
        title: 'Low CIBIL Personal Loan | Bad Credit Loan Offers 2026',
        description: 'Get personal loans for low CIBIL or bad credit in India 2026. Compare lenders, interest rates, and eligibility. Apply online for instant approval and flexible EMI, even with a low credit score.',
        url: 'https://sixfinance.app/personalLoan/lowCibil',
        siteName: 'SixFinance',
        type: 'website',
    },
};
import PreHero from "@/component/PersonalLoan/preApproved/PreHero";
import EMICalculator from "@/component/PersonalLoan/preApproved/EMICalculator";
import UniversalLoanCard from "@/component/loan/UniversalLoanCard";
import { Percent, Wallet, Zap, CalendarDays } from "lucide-react";
import LowCibilLoanGuide from "@/component/PersonalLoan/lowCibil/LowCibilLoanGuide";


export default function LowCibilPersonalLoanPage() {
    return (
        <>
            <PreHero id="personal-loan-low-cibil" />
            <EMICalculator
                marketingContent={{
                    tagline: "Personal Loan EMI Calculator",
                    headline: (
                        <>
                            Calculate Your <br />
                            <span className="text-teal-600">Perfect EMI Plan</span>
                        </>
                    ),
                    description: "Don't guess your monthly payments. Adjust the loan amount and tenure to find a repayment schedule that fits your lifestyle without stretching your budget.",

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
                maxApr={24}       // Upper cap for NBFCs
            />
            <UniversalLoanCard
                categorySlug="personal-loan"
                headerTitle="Personal <span class='text-teal-500'>Loan</span>"
                loanType="personal"
                loanSubType="lowCibil"
                headerSubtitle="Instant Funds for Any Need"
                headerDescription="Quick approvals and flexible repayment tenures for all your personal needs."
                maxDisplay={4}
                showViewAllButton={true}
            />
            <LowCibilLoanGuide />
            
        </>
    );
}   