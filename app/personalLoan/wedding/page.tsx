import { Metadata } from 'next';
import React from "react";
export const metadata: Metadata = {
    title: 'Wedding Personal Loan | Marriage Loan Offers 2026',
    description: 'Compare wedding personal loans in India 2026. Get instant approval, low interest rates, and flexible EMI for marriage expenses, destination weddings, and more. Apply online for top wedding loan offers.',
    alternates: {
        canonical: 'https://sixfinance.app/personalLoan/wedding',
    },
    keywords: [
        'wedding personal loan', 'personal loan for wedding', 'marriage loan', 'personal loan for marriage', 'personal loan for destination wedding', 'personal loan for wedding expenses', 'personal loan for marriage hall', 'personal loan for wedding jewellery', 'personal loan for wedding shopping', 'personal loan for wedding decoration', 'personal loan for wedding catering', 'personal loan for wedding photography', 'personal loan for honeymoon', 'personal loan for wedding gifts', 'personal loan for wedding invitation', 'personal loan for wedding planner', 'personal loan for wedding event', 'personal loan for wedding EMI', 'personal loan for wedding eligibility', 'personal loan for wedding apply online', 'personal loan for wedding instant approval', 'personal loan for wedding low interest', 'personal loan for wedding flexible tenure', 'personal loan for wedding minimum documents', 'personal loan for wedding best banks', 'personal loan for wedding 2026', 'personal loan for wedding review', 'personal loan for wedding tips', 'personal loan for wedding offers', 'personal loan for wedding online', 'personal loan for wedding collateral free', 'personal loan for wedding quick disbursal', 'personal loan for wedding best rates', 'personal loan for wedding budget', 'personal loan for wedding finance', 'personal loan for wedding cost', 'personal loan for wedding India', 'personal loan for wedding couple', 'personal loan for wedding family', 'personal loan for wedding ceremony', 'personal loan for wedding party'
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
        title: 'Wedding Personal Loan | Marriage Loan Offers 2026',
        description: 'Compare wedding personal loans in India 2026. Get instant approval, low interest rates, and flexible EMI for marriage expenses, destination weddings, and more. Apply online for top wedding loan offers.',
        url: 'https://sixfinance.app/personalLoan/wedding',
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
            <PreHero id="wedding-personal-loan" />
            <EMICalculator
                // 1. Left Side Content (Marketing)
                marketingContent={{
                    tagline: "Wedding Personal Loan",
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
                title="Your Wedding Personal Loan "
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
                loanPurpose="wedding"
                headerSubtitle="Instant Funds for Any Need"
                headerDescription="Quick approvals and flexible repayment tenures for all your personal needs."
                maxDisplay={4}
                showViewAllButton={true}
            />
            <LoanInfo loanId="wedding-personal-loan" />
            <LoanInfoPage id="wedding-personal-loan" />
            <LoanEligibilityContainer id="wedding-personal-loan" />
            <FeesAndCharges id="wedding-personal-loan" />
            <LoanBenefits id="wedding-personal-loan" />
            <ComparisonContainer id="wedding-personal-loan" />
        </>
    );
}