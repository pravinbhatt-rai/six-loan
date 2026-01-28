import { Metadata } from 'next';
import React from "react";
export const metadata: Metadata = {
    title: 'Personal Loan Interest Rates | Compare 2026 Offers',
    description: 'Compare personal loan interest rates in India 2026. Find the lowest rates, best banks, and special offers. Calculate EMI and apply online for instant approval.',
    alternates: {
        canonical: 'https://sixfinance.app/personalLoan/InterestRates',
    },
    keywords: [
        'personal loan interest rates', 'lowest personal loan rates', 'compare personal loan rates', 'personal loan EMI calculator', 'personal loan best banks', 'personal loan offers 2026', 'personal loan rate comparison', 'personal loan interest 2026', 'personal loan apply online', 'personal loan instant approval', 'personal loan low EMI', 'personal loan flexible tenure', 'personal loan minimum documents', 'personal loan eligibility check', 'personal loan review', 'personal loan tips', 'personal loan top up', 'personal loan overdraft', 'personal loan balance transfer', 'personal loan pre approved', 'personal loan online', 'personal loan collateral free', 'personal loan quick disbursal', 'personal loan best rates', 'personal loan India', 'personal loan 2026', 'personal loan for salaried', 'personal loan for self employed', 'personal loan for women', 'personal loan for doctors', 'personal loan for seniors', 'personal loan for low cibil', 'personal loan for wedding', 'personal loan for travel', 'personal loan for medical', 'personal loan for education', 'personal loan for business', 'personal loan for professionals', 'personal loan for short term', 'personal loan for flexi', 'personal loan for consolidation'
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
        title: 'Personal Loan Interest Rates | Compare 2026 Offers',
        description: 'Compare personal loan interest rates in India 2026. Find the lowest rates, best banks, and special offers. Calculate EMI and apply online for instant approval.',
        url: 'https://sixfinance.app/personalLoan/InterestRates',
        siteName: 'SixFinance',
        type: 'website',
    },
};
import PreHero from "@/component/PersonalLoan/preApproved/PreHero";
import EMICalculator from "@/component/PersonalLoan/preApproved/EMICalculator";
import RateComparisonContainer from "@/component/PersonalLoan/InterestRates/RateComparsion";
import { Percent, Wallet, Zap, CalendarDays } from "lucide-react";
import UniversalLoanCard from "@/component/loan/UniversalLoanCard";
import QuickLinksContainer from "@/component/commonComponent/QuickLinksContainer";
import LoanAmountSelector from "@/component/PersonalLoan/preApproved/LoanAmountSelector";
import LoanTypesContainer from "@/component/PersonalLoan/LoanTypesContainer";
import LoanAdviceSection from "@/component/PersonalLoan/InterestRates/LoanAdviceSection";
import LoanTableSection from "@/component/PersonalLoan/InterestRates/LoanTableSection";
import SalaryLoanOffers from "@/component/PersonalLoan/preApproved/SalaryLoanOffers";
import InfoSection from "@/component/PersonalLoan/InterestRates/InfoSection";

export default function InterestRatesPersonalLoanPage() {
    return (
        <>
            <PreHero id="personal-loan-interest-rates" />
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
            <RateComparisonContainer id="personal-loan-rates"  />
            <UniversalLoanCard
                categorySlug="personal-loan"
                headerTitle="Personal <span class='text-teal-500'>Loan</span>"
                headerSubtitle="Instant Funds for Any Need"
                headerDescription="Quick approvals and flexible repayment tenures for all your personal needs."
                maxDisplay={4}
                showViewAllButton={true}
                loanType="personal"
                loanSubType="interestRates"
            />
            <QuickLinksContainer id="personal-loan-interest-rates" />
            <LoanAmountSelector />
            <LoanTypesContainer id="personal-loan" />
            <LoanAdviceSection sectionId="loan-interest-tips" />
            <LoanTableSection sectionId="tenure-impact"  />
            <InfoSection sectionId="why-compare-platform" />
            <InfoSection sectionId="why-comparing-matters" />
            <InfoSection sectionId="how-platform-helps" />
            <SalaryLoanOffers />
            
        </>
    );
}