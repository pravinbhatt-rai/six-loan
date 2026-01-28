import { Metadata } from 'next';
import React from "react";
export const metadata: Metadata = {
    title: 'Travel Personal Loan | Holiday & Vacation Loan 2026',
    description: 'Apply for travel personal loans in India 2026. Get instant approval, low interest rates, and flexible EMI for holiday, vacation, honeymoon, or international travel. Compare top travel loan offers.',
    alternates: {
        canonical: 'https://sixfinance.app/personalLoan/travel',
    },
    keywords: [
        'travel personal loan', 'personal loan for travel', 'holiday loan', 'vacation loan', 'honeymoon loan', 'international travel loan', 'domestic travel loan', 'personal loan for trip', 'personal loan for tour', 'personal loan for family vacation', 'personal loan for destination wedding', 'personal loan for cruise', 'personal loan for flight tickets', 'personal loan for hotel booking', 'personal loan for travel expenses', 'personal loan for travel abroad', 'personal loan for Europe trip', 'personal loan for USA trip', 'personal loan for Asia trip', 'personal loan for adventure travel', 'personal loan for group travel', 'personal loan for solo travel', 'personal loan for urgent travel', 'personal loan for last minute travel', 'personal loan for travel EMI', 'personal loan for travel eligibility', 'personal loan for travel apply online', 'personal loan for travel instant approval', 'personal loan for travel low interest', 'personal loan for travel flexible tenure', 'personal loan for travel minimum documents', 'personal loan for travel best banks', 'personal loan for travel 2026', 'personal loan for travel review', 'personal loan for travel tips', 'personal loan for travel offers', 'personal loan for travel online', 'personal loan for travel collateral free', 'personal loan for travel quick disbursal', 'personal loan for travel best rates'
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
        title: 'Travel Personal Loan | Holiday & Vacation Loan 2026',
        description: 'Apply for travel personal loans in India 2026. Get instant approval, low interest rates, and flexible EMI for holiday, vacation, honeymoon, or international travel. Compare top travel loan offers.',
        url: 'https://sixfinance.app/personalLoan/travel',
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

export default function TravelPersonalLoanPage() {
    return (
        <>
            <PreHero id="travel-personal-loan" />
            <EMICalculator
                // 1. Left Side Content (Marketing)
                marketingContent={{
                    tagline: "Travel Personal Loan",
                    headline: (
                        <>
                            Plan Your <br />
                            <span className="text-teal-600">Repayment Strategy</span>
                        </>
                    ),
                    description: "Since you are already medical, simply select the amount you need and a tenure that fits your monthly budget to get started instantly.",

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
                title="Your Travel Personal Loan "
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
                loanPurpose="travel"
                headerSubtitle="Instant Funds for Any Need"
                headerDescription="Quick approvals and flexible repayment tenures for all your personal needs."
                maxDisplay={4}
                showViewAllButton={true}
            />
            <LoanInfo loanId="travel-personal-loan" />
            <LoanInfoPage id="travel-personal-loan" />
            <LoanEligibilityContainer id="travel-personal-loan" />
            <FeesAndCharges id="travel-personal-loan" />
            <LoanBenefits id="travel-personal-loan" />
            <ComparisonContainer id="travel-personal-loan" />
        </>
    );
}