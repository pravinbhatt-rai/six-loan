import { Metadata } from 'next';
import React from "react";
export const metadata: Metadata = {
    title: 'Personal Loan up to 30 Lakh | Best Offers 2026',
    description: 'Compare personal loans up to 30 lakh in India 2026. Get instant approval, low interest rates, flexible EMI, and apply online for your ₹30,00,000 personal loan.',
    alternates: {
        canonical: 'https://sixfinance.app/personalLoan/30-lakh',
    },
    keywords: [
        'personal loan 30 lakh', '30 lakh personal loan', 'personal loan EMI 30 lakh', 'personal loan interest rate', 'personal loan eligibility', 'personal loan apply online', 'personal loan offers', 'personal loan documents', 'personal loan for salaried', 'personal loan for self employed', 'personal loan for women', 'personal loan for travel', 'personal loan for wedding', 'personal loan for medical', 'personal loan for home renovation', 'personal loan for education', 'personal loan for debt consolidation', 'personal loan for low cibil', 'personal loan for pensioners', 'personal loan for students', 'personal loan 2026', 'compare personal loans', 'personal loan process', 'personal loan approval', 'personal loan guide', 'personal loan calculator', 'personal loan instant approval', 'personal loan low interest', 'personal loan zero processing fee', 'personal loan pre approved', 'personal loan top up', 'personal loan overdraft', 'personal loan balance transfer', 'personal loan best banks', 'personal loan online', 'personal loan without collateral', 'personal loan quick disbursal', 'personal loan flexible tenure', 'personal loan low EMI', 'personal loan minimum documents', 'personal loan eligibility check', 'personal loan apply 2026', 'personal loan review', 'personal loan tips', 'personal loan offers 2026'
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
        title: 'Personal Loan up to 30 Lakh | Best Offers 2026',
        description: 'Compare personal loans up to 30 lakh in India 2026. Get instant approval, low interest rates, flexible EMI, and apply online for your ₹30,00,000 personal loan.',
        url: 'https://sixfinance.app/personalLoan/30-lakh',
        siteName: 'SixFinance',
        type: 'website',
    },
};
import PreHero from "@/component/PersonalLoan/preApproved/PreHero";
import EMICalculator from "@/component/PersonalLoan/preApproved/EMICalculator";
import { Percent, Wallet, Zap, CalendarDays } from "lucide-react";
import UniversalLoanCard from "@/component/loan/UniversalLoanCard";
import LoanInfoSection from "@/component/PersonalLoan/lakh/LoanInfoSection";
import SalaryLoanOffers from "@/component/PersonalLoan/preApproved/SalaryLoanOffers";
import EmiCalculationTable from "@/component/PersonalLoan/lakh/EmiCalculationTable";

export default function FiveLakhPersonalLoanPage() {
    return (
        <>
            <PreHero id="personal-loan-30-lakh" />
            <EMICalculator
                marketingContent={{
                    tagline: "₹30 Lakh Personal Loan Calculator",
                    headline: (
                        <>
                            Plan Your <br />
                            <span className="text-teal-600">₹30 Lakh Loan EMI</span>
                        </>
                    ),
                    description: "Calculate accurate monthly payments for your ₹30,00,000 personal loan. Adjust the tenure to find an EMI that fits your monthly budget perfectly without overextending.",

                    features: [
                        {
                            icon: <Percent size={20} />,
                            title: "Optimized Rates",
                            desc: "Interest rates for ₹30 Lakh loans starting at just 30.49% p.a."
                        },
                        {
                            icon: <Wallet size={20} />,
                            title: "Collateral Free",
                            desc: "Get ₹30,00,000 instantly without pledging any assets or security."
                        },
                        {
                            icon: <Zap size={20} />,
                            title: "24-Hour Disbursal",
                            desc: "Pre-approved ₹30L limits are often credited within hours of application."
                        },
                        {
                            icon: <CalendarDays size={20} />,
                            title: "Flexible Repayment",
                            desc: "Choose a tenure from 12 to 60 months to keep your EMIs manageable."
                        },
                    ]
                }}

                // 2. Right Side Content (Calculator Configuration)
                title="Calculate Your ₹30L Repayment"
                currencySymbol="₹"

                // Default set strictly to 30 Lakhs for this landing page
                defaultAmount={3000000}
                minAmount={300000}
                maxAmount={3000000} // Capped at 30L to keep focus on mid-sized loans (optional)

                // Tenure (1 to 30 Years)
                defaultMonths={36}
                minMonths={12}
                maxMonths={60}

                // Interest Rates
                defaultApr={20.99}
                minApr={20.49}
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
                amountRange="30-lakh"
            />
            <LoanInfoSection pageId="30-lakh" />
            <SalaryLoanOffers />
            <EmiCalculationTable pageId="30-lakh" />
        </>
    );
}