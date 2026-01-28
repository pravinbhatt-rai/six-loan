import { Metadata } from 'next';
import React from "react";
export const metadata: Metadata = {
    title: 'Overdraft Personal Loan | Flexible Credit 2026',
    description: 'Get overdraft personal loans in India 2026. Enjoy flexible credit limits, pay interest only on what you use, and get instant approval. Apply online for top overdraft loan offers.',
    alternates: {
        canonical: 'https://sixfinance.app/personalLoan/overdraft',
    },
    keywords: [
        'overdraft personal loan', 'personal loan with overdraft', 'overdraft facility', 'personal loan for flexible credit', 'personal loan for credit line', 'personal loan for cash withdrawal', 'personal loan for emergency', 'personal loan for urgent need', 'personal loan for business', 'personal loan for travel', 'personal loan for medical', 'personal loan for wedding', 'personal loan for home renovation', 'personal loan for education', 'personal loan for low interest overdraft', 'personal loan for flexible EMI overdraft', 'personal loan for minimum documents overdraft', 'personal loan for eligibility check overdraft', 'personal loan for apply online overdraft', 'personal loan for review overdraft', 'personal loan for tips overdraft', 'personal loan for best offers overdraft', 'personal loan for 2026 overdraft', 'personal loan for best banks overdraft', 'personal loan for online overdraft', 'personal loan for collateral free overdraft', 'personal loan for top up overdraft', 'personal loan for overdraft India', 'personal loan for overdraft 2026', 'personal loan for quick disbursal overdraft', 'personal loan for instant approval overdraft', 'personal loan for high loan value overdraft', 'personal loan for attractive interest overdraft', 'personal loan for extended tenure overdraft', 'personal loan for overdraft limit', 'personal loan for overdraft interest', 'personal loan for overdraft repayment', 'personal loan for overdraft eligibility', 'personal loan for overdraft apply online'
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
        title: 'Overdraft Personal Loan | Flexible Credit 2026',
        description: 'Get overdraft personal loans in India 2026. Enjoy flexible credit limits, pay interest only on what you use, and get instant approval. Apply online for top overdraft loan offers.',
        url: 'https://sixfinance.app/personalLoan/overdraft',
        siteName: 'SixFinance',
        type: 'website',
    },
};
import PreHero from "@/component/PersonalLoan/preApproved/PreHero";
import EMICalculator from "@/component/PersonalLoan/preApproved/EMICalculator";
import { CheckCircle2, Clock, ShieldCheck, Zap } from "lucide-react";
import UniversalLoanCard from "@/component/loan/UniversalLoanCard";
import LoanInfo from "@/component/commonComponent/LoanInfo";
import LoanInfoPage from "@/component/PersonalLoan/LoanInfoPage";
import LoanEligibilityContainer from "@/component/PersonalLoan/LoanEligibilityCriteria";
import FeesAndCharges from "@/component/PersonalLoan/FeesAndCharges";
import LoanBenefits from "@/component/PersonalLoan/LoanBenefits";
import ComparisonContainer from "@/component/PersonalLoan/ComparisonContainer";

export default function ConsolidationPersonalLoanPage() {
    return (
        <>
            <PreHero id="overdraft-personal-loan" />
            <EMICalculator
                // 1. Left Side Content (Marketing)
                marketingContent={{
                    tagline: "Overdraft Personal Loan",
                    headline: (
                        <>
                            Plan Your <br />
                            <span className="text-teal-600">Wedding Expenses</span>
                        </>
                    ),
                    description: "Since you are already debit consolidation, simply select the amount you need and a tenure that fits your monthly budget to get started instantly.",

                    features: [
                        {
                            icon: <Zap size={20} />,
                            title: "Instant Disbursal",
                            desc: "Funds transferred to your account immediately after acceptance."
                        },
                        {
                            icon: <CheckCircle2 size={20} />,
                            title: "Zero Documentation",
                            desc: "No new documents required. Just verify and click."
                        },
                        {
                            icon: <ShieldCheck size={20} />,
                            title: "No Hidden Charges",
                            desc: "Transparent processing fees and zero foreclosure charges."
                        },
                        {
                            icon: <Clock size={20} />,
                            title: "Flexible Tenure",
                            desc: "Choose a timeline that works for you, from 6 to 36 months."
                        },
                    ]
                }}

                // 2. Right Side Content (Calculator Configuration)
                title="Your Overdraft Personal Loan "
                currencySymbol="₹"

                // Adjusted to match your "up to 50,000" hero text
                defaultAmount={50000}
                minAmount={5000}
                maxAmount={50000}

                defaultMonths={12}
                minMonths={6}
                maxMonths={36}

                defaultApr={12.5} // Slightly lower rate for pre-approved customers
                minApr={10}
                maxApr={24}
            />
            <UniversalLoanCard
                categorySlug="personal-loan"
                headerTitle="Personal <span class='text-teal-500'>Loan</span>"
                loanType="personal"
                loanPurpose="overdraft"
                headerSubtitle="Instant Funds for Any Need"
                headerDescription="Quick approvals and flexible repayment tenures for all your personal needs."
                maxDisplay={4}
                showViewAllButton={true}
            />
            <LoanInfo loanId="overdraft-personal-loan" />
            <LoanInfoPage id="overdraft-personal-loan" />
            <LoanEligibilityContainer id="overdraft-personal-loan" />
            <FeesAndCharges id="overdraft-personal-loan" />
            <LoanBenefits id="overdraft-personal-loan" />
            <ComparisonContainer id="overdraft-personal-loan" />
        </>
    );
}