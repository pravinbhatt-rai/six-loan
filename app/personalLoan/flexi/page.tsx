import { Metadata } from 'next';
import React from "react";
export const metadata: Metadata = {
    title: 'Flexi Personal Loan | Flexible Repayment 2026',
    description: 'Get flexi personal loans in India 2026. Enjoy flexible withdrawal and repayment options, low interest rates, and instant approval. Apply online for top flexi loan offers.',
    alternates: {
        canonical: 'https://sixfinance.app/personalLoan/flexi',
    },
    keywords: [
        'flexi personal loan', 'personal loan with flexible repayment', 'flexi loan', 'personal loan for flexible EMI', 'personal loan for flexible tenure', 'personal loan for flexible withdrawal', 'personal loan for flexible disbursal', 'personal loan for flexible interest', 'personal loan for flexible top up', 'personal loan for flexible overdraft', 'personal loan for flexible balance transfer', 'personal loan for flexible prepayment', 'personal loan for flexible part payment', 'personal loan for flexible closure', 'personal loan for flexible eligibility', 'personal loan for flexible apply online', 'personal loan for flexible review', 'personal loan for flexible tips', 'personal loan for flexible best offers', 'personal loan for flexible 2026', 'personal loan for flexible best banks', 'personal loan for flexible online', 'personal loan for flexible collateral free', 'personal loan for flexible quick disbursal', 'personal loan for flexible best rates', 'personal loan for flexible India', 'personal loan for flexible improvement', 'personal loan for flexible score boost', 'personal loan for flexible eligibility check', 'personal loan for flexible apply 2026', 'personal loan for flexible repayment plan', 'personal loan for flexible EMI plan', 'personal loan for flexible interest rate', 'personal loan for flexible tenure options', 'personal loan for flexible loan amount', 'personal loan for flexible customer', 'personal loan for flexible borrower', 'personal loan for flexible lender', 'personal loan for flexible bank'
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
        title: 'Flexi Personal Loan | Flexible Repayment 2026',
        description: 'Get flexi personal loans in India 2026. Enjoy flexible withdrawal and repayment options, low interest rates, and instant approval. Apply online for top flexi loan offers.',
        url: 'https://sixfinance.app/personalLoan/flexi',
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

export default function FlexiPersonalLoanPage() {
    return (
        <>
            <PreHero id="flexi-personal-loan" />
            <EMICalculator
                marketingContent={{
                    tagline: "Flexi Personal Loan",
                    headline: (
                        <>
                            Flexible <br />
                            <span className="text-teal-600">Repayment Options</span>
                        </>
                    ),
                    description: "Get the flexibility to withdraw and repay funds as per your need with our Flexi Loan facility.",

                    features: [
                        {
                            icon: <Zap size={20} />,
                            title: "Instant Disbursal",
                            desc: "Funds transferred to your account immediately after acceptance."
                        },
                        {
                            icon: <CheckCircle2 size={20} />,
                            title: "Pay Interest Only",
                            desc: "Pay interest only on the utilized amount, not on the sanctioned limit."
                        },
                        {
                            icon: <ShieldCheck size={20} />,
                            title: "No Hidden Charges",
                            desc: "Transparent processing fees and zero foreclosure charges."
                        },
                        {
                            icon: <Clock size={20} />,
                            title: "Flexible Tenure",
                            desc: "Choose a timeline that works for you, from 12 to 60 months."
                        },
                    ]
                }}

                title="Your Flexi Personal Loan"
                currencySymbol="₹"

                defaultAmount={500000}
                minAmount={50000}
                maxAmount={5000000}

                defaultMonths={36}
                minMonths={12}
                maxMonths={60}

                defaultApr={12.5}
                minApr={10}
                maxApr={24}
            />
            <UniversalLoanCard
                categorySlug="personal-loan"
                headerTitle="Personal <span class='text-teal-500'>Loan</span>"
                loanType="personal"
                loanPurpose="flexi"
                headerSubtitle="Instant Funds for Any Need"
                headerDescription="Quick approvals and flexible repayment tenures for all your personal needs."
                maxDisplay={4}
                showViewAllButton={true}
            />
            <LoanInfo loanId="flexi-personal-loan" />
            <LoanInfoPage id="flexi-personal-loan" />
            <LoanEligibilityContainer id="flexi-personal-loan" />
            <FeesAndCharges id="flexi-personal-loan" />
            <LoanBenefits id="flexi-personal-loan" />
            <ComparisonContainer id="flexi-personal-loan" />
        </>
    );
}
