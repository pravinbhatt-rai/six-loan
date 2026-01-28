import { Metadata } from 'next';
import React from "react";
export const metadata: Metadata = {
    title: 'Pre-Approved Personal Loan | Instant Offers 2026',
    description: 'Get pre-approved personal loans in India 2026. Enjoy instant approval, low interest rates, and flexible EMI. Apply online for top pre-approved loan offers and quick disbursal.',
    alternates: {
        canonical: 'https://sixfinance.app/personalLoan/preApproved',
    },
    keywords: [
        'pre-approved personal loan', 'personal loan pre approved', 'instant personal loan', 'personal loan instant approval', 'personal loan quick disbursal', 'personal loan low interest', 'personal loan flexible EMI', 'personal loan minimum documents', 'personal loan eligibility check', 'personal loan apply online', 'personal loan review', 'personal loan tips', 'personal loan best offers', 'personal loan 2026', 'personal loan best banks', 'personal loan online', 'personal loan collateral free', 'personal loan top up', 'personal loan overdraft', 'personal loan balance transfer', 'personal loan pre approved India', 'personal loan pre approved 2026', 'personal loan for salaried', 'personal loan for self employed', 'personal loan for women', 'personal loan for doctors', 'personal loan for seniors', 'personal loan for low cibil', 'personal loan for wedding', 'personal loan for travel', 'personal loan for medical', 'personal loan for education', 'personal loan for business', 'personal loan for professionals', 'personal loan for short term', 'personal loan for flexi', 'personal loan for consolidation', 'personal loan for term', 'personal loan for pre approved customers', 'personal loan for pre approved offers'
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
        title: 'Pre-Approved Personal Loan | Instant Offers 2026',
        description: 'Get pre-approved personal loans in India 2026. Enjoy instant approval, low interest rates, and flexible EMI. Apply online for top pre-approved loan offers and quick disbursal.',
        url: 'https://sixfinance.app/personalLoan/preApproved',
        siteName: 'SixFinance',
        type: 'website',
    },
};
import PreHero from "@/component/PersonalLoan/preApproved/PreHero";
import EMICalculator from "@/component/PersonalLoan/preApproved/EMICalculator";
import { CheckCircle2, Clock, ShieldCheck, Zap } from "lucide-react";
import UniversalLoanCard from "@/component/loan/UniversalLoanCard";
import LoanInfo from "@/component/commonComponent/LoanInfo";
import QuickLinksContainer from "@/component/commonComponent/QuickLinksContainer";
import LoanInfoPage from "@/component/PersonalLoan/LoanInfoPage";
import LoanAmountSelector from "@/component/PersonalLoan/preApproved/LoanAmountSelector";
import LoanEligibilityContainer from "@/component/PersonalLoan/LoanEligibilityCriteria";
import FeesAndCharges from "@/component/PersonalLoan/FeesAndCharges";
import SalaryLoanOffers from "@/component/PersonalLoan/preApproved/SalaryLoanOffers";
import LoanBenefits from "@/component/PersonalLoan/LoanBenefits";
import ComparisonContainer from "@/component/PersonalLoan/ComparisonContainer";
import LoanFooter from "@/component/PersonalLoan/LoanFooter";

export default function PreApprovedPersonalLoanPage() {
    return (
        <main>
            <PreHero id="personal-loan" />

            <EMICalculator
                // 1. Left Side Content (Marketing)
                marketingContent={{
                    tagline: "Pre-Approved Personal Loan",
                    headline: (
                        <>
                            Plan Your <br />
                            <span className="text-teal-600">Repayment Strategy</span>
                        </>
                    ),
                    description: "Since you are already pre-approved, simply select the amount you need and a tenure that fits your monthly budget to get started instantly.",

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
                title="Your Pre-Approved Limit"
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
                loanType="personal"
                loanSubType="preApproved"
            />
            <QuickLinksContainer id="personal-loan" />
            <LoanInfo loanId="pre-approved-loan" />
            <LoanInfoPage id="personal-loan" />
            <LoanAmountSelector />
            <LoanEligibilityContainer id="pre-approved-loan" />
            <FeesAndCharges id="pre-approved-loan" />
            <SalaryLoanOffers />
            <LoanBenefits id="pre-approved-loan" />
            <ComparisonContainer id="pre-approved-loan" />
            <LoanFooter />
        </main>
    );
}