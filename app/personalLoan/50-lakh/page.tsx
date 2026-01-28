import { Metadata } from 'next';
import React from "react";
export const metadata: Metadata = {
    title: 'Personal Loan ₹50 Lakh | Best Personal Loan Offers 2026',
    description: 'Apply for a personal loan of ₹50 lakh in India 2026. Get instant approval, low interest rates, and flexible EMI options. Compare top banks and NBFCs for the best personal loan offers online.',
    alternates: {
        canonical: 'https://sixfinance.app/personalLoan/50-lakh',
    },
    keywords: [
        'personal loan 50 lakh', 'personal loan offers 50 lakh', 'best personal loan 50 lakh', 'personal loan interest rate 50 lakh', 'personal loan EMI 50 lakh', 'personal loan eligibility 50 lakh', 'personal loan apply online 50 lakh', 'personal loan instant approval 50 lakh', 'personal loan documents 50 lakh', 'personal loan 2026 50 lakh', 'compare personal loans 50 lakh', 'personal loan process 50 lakh', 'personal loan approval 50 lakh', 'personal loan guide 50 lakh', 'personal loan calculator 50 lakh', 'personal loan quick disbursal 50 lakh', 'personal loan low interest 50 lakh', 'personal loan flexible tenure 50 lakh', 'personal loan minimum documents 50 lakh', 'personal loan eligibility check 50 lakh', 'personal loan review 50 lakh', 'personal loan tips 50 lakh', 'personal loan best banks 50 lakh', 'personal loan online 50 lakh', 'personal loan without collateral 50 lakh', 'personal loan quick approval 50 lakh', 'personal loan best rates 50 lakh', 'personal loan India 50 lakh', 'personal loan 2026 50 lakh', 'large personal loan 50 lakh', 'high value personal loan 50 lakh', 'unsecured personal loan 50 lakh', 'top up personal loan 50 lakh', 'personal loan NBFC 50 lakh', 'personal loan bank 50 lakh', 'personal loan for salaried 50 lakh', 'personal loan for self employed 50 lakh'
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
        title: 'Personal Loan ₹50 Lakh | Best Personal Loan Offers 2026',
        description: 'Apply for a personal loan of ₹50 lakh in India 2026. Get instant approval, low interest rates, and flexible EMI options. Compare top banks and NBFCs for the best personal loan offers online.',
        url: 'https://sixfinance.app/personalLoan/50-lakh',
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
            <PreHero id="personal-loan-50-lakh" />
            <EMICalculator
                marketingContent={{
                    tagline: "₹50 Lakh Personal Loan Calculator",
                    headline: (
                        <>
                            Plan Your <br />
                            <span className="text-teal-600">₹50 Lakh Loan EMI</span>
                        </>
                    ),
                    description: "Calculate accurate monthly payments for your ₹50,00,000 personal loan. Adjust the tenure to find an EMI that fits your monthly budget perfectly without overextending.",

                    features: [
                        {
                            icon: <Percent size={20} />,
                            title: "Optimized Rates",
                            desc: "Interest rates for ₹50 Lakh loans starting at just 50.49% p.a."
                        },
                        {
                            icon: <Wallet size={20} />,
                            title: "Collateral Free",
                            desc: "Get ₹50,00,000 instantly without pledging any assets or security."
                        },
                        {
                            icon: <Zap size={20} />,
                            title: "24-Hour Disbursal",
                            desc: "Pre-approved ₹50L limits are often credited within hours of application."
                        },
                        {
                            icon: <CalendarDays size={20} />,
                            title: "Flexible Repayment",
                            desc: "Choose a tenure from 12 to 60 months to keep your EMIs manageable."
                        },
                    ]
                }}

                // 2. Right Side Content (Calculator Configuration)
                title="Calculate Your ₹50L Repayment"
                currencySymbol="₹"

                // Default set strictly to 50 Lakhs for this landing page
                defaultAmount={5000000}
                minAmount={500000}
                maxAmount={5000000} // Capped at 50L to keep focus on mid-sized loans (optional)

                // Tenure (1 to 50 Years)
                defaultMonths={36}
                minMonths={12}
                maxMonths={60}

                // Interest Rates
                defaultApr={5.99}
                minApr={50.49}
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
                amountRange="50-lakh"
            />
            <LoanInfoSection pageId="50-lakh" />
            <SalaryLoanOffers />
            <EmiCalculationTable pageId="50-lakh" />
        </>
    );
}