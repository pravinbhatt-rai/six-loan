import { Metadata } from 'next';
import React from "react";
export const metadata: Metadata = {
    title: 'Term Personal Loan | Long-Term Financing 2026',
    description: 'Get term personal loans in India 2026. Access substantial funds with extended repayment tenure for major life goals and expenses. Compare offers, interest rates, and apply online.',
    alternates: {
        canonical: 'https://sixfinance.app/personalLoan/term',
    },
    keywords: [
        'term personal loan', 'long-term personal loan', 'personal loan for long tenure', 'personal loan for 5 years', 'personal loan for 60 months', 'personal loan for major expenses', 'personal loan for home renovation', 'personal loan for education', 'personal loan for business', 'personal loan for wedding', 'personal loan for travel', 'personal loan for medical', 'personal loan for high loan amount', 'personal loan for flexible EMI term', 'personal loan for minimum documents term', 'personal loan for eligibility check term', 'personal loan for apply online term', 'personal loan for review term', 'personal loan for tips term', 'personal loan for best offers term', 'personal loan for 2026 term', 'personal loan for best banks term', 'personal loan for online term', 'personal loan for collateral free term', 'personal loan for top up term', 'personal loan for overdraft term', 'personal loan for pre approved term', 'personal loan for term India', 'personal loan for term 2026', 'personal loan for quick disbursal term', 'personal loan for instant approval term', 'personal loan for attractive interest term', 'personal loan for extended tenure term', 'personal loan for term eligibility', 'personal loan for term apply online', 'personal loan for term repayment', 'personal loan for term EMI', 'personal loan for term interest', 'personal loan for term offers'
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
        title: 'Term Personal Loan | Long-Term Financing 2026',
        description: 'Get term personal loans in India 2026. Access substantial funds with extended repayment tenure for major life goals and expenses. Compare offers, interest rates, and apply online.',
        url: 'https://sixfinance.app/personalLoan/term',
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

export default function TermPersonalLoanPage() {
    return (
        <>
            <PreHero id="term-personal-loan" />
            <EMICalculator
                marketingContent={{
                    tagline: "Term Personal Loan",
                    headline: (
                        <>
                            Long-Term Financing for <br />
                            <span className="text-teal-600">Major Expenses</span>
                        </>
                    ),
                    description: "Get substantial funds with extended repayment tenure for your major life goals and expenses.",

                    features: [
                        {
                            icon: <Zap size={20} />,
                            title: "High Loan Amount",
                            desc: "Get access to funds up to ₹50 Lakhs for your major expenses."
                        },
                        {
                            icon: <CheckCircle2 size={20} />,
                            title: "Extended Tenure",
                            desc: "Repayment flexibility with tenures ranging up to 60 months."
                        },
                        {
                            icon: <ShieldCheck size={20} />,
                            title: "Competitive Rates",
                            desc: "Attractive interest rates starting from 10.49% p.a."
                        },
                        {
                            icon: <Clock size={20} />,
                            title: "Quick Disbursal",
                            desc: "End-to-end digital processing ensures money in your bank within 24-48 hours."
                        },
                    ]
                }}

                title="Your Term Personal Loan"
                currencySymbol="₹"

                defaultAmount={1000000}
                minAmount={100000}
                maxAmount={5000000}

                defaultMonths={48}
                minMonths={24}
                maxMonths={60}

                defaultApr={11.5}
                minApr={10.49}
                maxApr={24}
            />
            <UniversalLoanCard
                categorySlug="personal-loan"
                headerTitle="Personal <span class='text-teal-500'>Loan</span>"
                loanType="personal"
                loanPurpose="term"
                headerSubtitle="Instant Funds for Any Need"
                headerDescription="Quick approvals and flexible repayment tenures for all your personal needs."
                maxDisplay={4}
                showViewAllButton={true}
            />
            <LoanInfo loanId="term-personal-loan" />
            <LoanInfoPage id="term-personal-loan" />
            <LoanEligibilityContainer id="term-personal-loan" />
            <FeesAndCharges id="term-personal-loan" />
            <LoanBenefits id="term-personal-loan" />
            <ComparisonContainer id="term-personal-loan" />
        </>
    );
}
