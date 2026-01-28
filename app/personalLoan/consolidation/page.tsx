import { Metadata } from 'next';
import React from "react";
export const metadata: Metadata = {
    title: 'Debt Consolidation Personal Loan | Best Offers 2026',
    description: 'Compare debt consolidation personal loans in India 2026. Get instant approval, low interest rates, and flexible EMI to combine multiple debts into one easy repayment. Apply online for top consolidation loan offers.',
    alternates: {
        canonical: 'https://sixfinance.app/personalLoan/consolidation',
    },
    keywords: [
        'debt consolidation personal loan', 'personal loan for debt consolidation', 'consolidation loan', 'loan to combine debts', 'personal loan for credit card debt', 'personal loan for multiple loans', 'personal loan for loan closure', 'personal loan for balance transfer', 'personal loan for EMI consolidation', 'personal loan for financial planning', 'personal loan for debt management', 'personal loan for reducing EMI', 'personal loan for single EMI', 'personal loan for easy repayment', 'personal loan for low interest consolidation', 'personal loan for quick disbursal consolidation', 'personal loan for instant approval consolidation', 'personal loan for flexible tenure consolidation', 'personal loan for minimum documents consolidation', 'personal loan for eligibility check consolidation', 'personal loan for apply online consolidation', 'personal loan for review consolidation', 'personal loan for tips consolidation', 'personal loan for best offers consolidation', 'personal loan for 2026 consolidation', 'personal loan for best banks consolidation', 'personal loan for online consolidation', 'personal loan for collateral free consolidation', 'personal loan for top up consolidation', 'personal loan for overdraft consolidation', 'personal loan for pre approved consolidation', 'personal loan for consolidation India', 'personal loan for consolidation 2026', 'personal loan for debt relief', 'personal loan for financial freedom', 'personal loan for credit improvement', 'personal loan for loan settlement'
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
        title: 'Debt Consolidation Personal Loan | Best Offers 2026',
        description: 'Compare debt consolidation personal loans in India 2026. Get instant approval, low interest rates, and flexible EMI to combine multiple debts into one easy repayment. Apply online for top consolidation loan offers.',
        url: 'https://sixfinance.app/personalLoan/consolidation',
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
            <PreHero id="debt-consolidation-loan" />
            <EMICalculator
                // 1. Left Side Content (Marketing)
                marketingContent={{
                    tagline: "Consolidation Personal Loan",
                    headline: (
                        <>
                            Plan Your <br />
                            <span className="text-teal-600">Repayment Strategy</span>
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
                title="Your Consolidation Personal Loan "
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
                headerSubtitle="Instant Funds for Any Need"
                headerDescription="Quick approvals and flexible repayment tenures for all your personal needs."
                maxDisplay={4}
                showViewAllButton={true}
            />
            <LoanInfo loanId="debt-consolidation-loan" />
            <LoanInfoPage id="debt-consolidation-loan" />
            <LoanEligibilityContainer id="debt-consolidation-loan" />
            <FeesAndCharges id="debt-consolidation-loan" />
            <LoanBenefits id="debt-consolidation-loan" />
            <ComparisonContainer id="debt-consolidation-loan" />
        </>
    );
}