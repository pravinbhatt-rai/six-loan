import { Metadata } from 'next';
import React from "react";
export const metadata: Metadata = {
    title: 'Medical Emergency Personal Loan | Fast Approval 2026',
    description: 'Get instant personal loans for medical emergencies in India 2026. Compare interest rates, EMI, eligibility, and apply online for quick disbursal. Cover hospital bills, surgery, and healthcare expenses.',
    alternates: {
        canonical: 'https://sixfinance.app/personalLoan/medical',
    },
    keywords: [
        'medical emergency personal loan', 'personal loan for medical emergency', 'medical loan', 'emergency loan for hospital', 'personal loan for surgery', 'personal loan for healthcare', 'personal loan for hospital bills', 'personal loan for treatment', 'personal loan for medical expenses', 'personal loan for health', 'personal loan for urgent medical need', 'personal loan for critical illness', 'personal loan for accident', 'personal loan for operation', 'personal loan for medical bills', 'personal loan for doctor fees', 'personal loan for medicine', 'personal loan for hospitalisation', 'personal loan for ICU', 'personal loan for ambulance', 'personal loan for medical tests', 'personal loan for diagnostics', 'personal loan for therapy', 'personal loan for recovery', 'personal loan for surgery cost', 'personal loan for medical insurance gap', 'personal loan for health emergency', 'personal loan for quick disbursal medical', 'personal loan for instant approval medical', 'personal loan for low interest medical', 'personal loan for flexible EMI medical', 'personal loan for minimum documents medical', 'personal loan for eligibility check medical', 'personal loan for apply online medical', 'personal loan for review medical', 'personal loan for tips medical', 'personal loan for best offers medical', 'personal loan for 2026 medical', 'personal loan for best banks medical', 'personal loan for online medical', 'personal loan for collateral free medical'
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
        title: 'Medical Emergency Personal Loan | Fast Approval 2026',
        description: 'Get instant personal loans for medical emergencies in India 2026. Compare interest rates, EMI, eligibility, and apply online for quick disbursal. Cover hospital bills, surgery, and healthcare expenses.',
        url: 'https://sixfinance.app/personalLoan/medical',
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

export default function MedicalPersonalLoanPage() {
    return (
        <>
            <PreHero id="personal-loan-medical" />
            <EMICalculator
                // 1. Left Side Content (Marketing)
                marketingContent={{
                    tagline: "Medical Personal Loan",
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
                title="Your Medical Personal Loan "
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
                loanPurpose="medical"
                headerSubtitle="Instant Funds for Any Need"
                headerDescription="Quick approvals and flexible repayment tenures for all your personal needs."
                maxDisplay={4}
                showViewAllButton={true}
            />
            <LoanInfo loanId="medical-personal-loan" />
            <LoanInfoPage id="medical-personal-loan" />
            <LoanEligibilityContainer id="medical-personal-loan" />
            <FeesAndCharges id="medical-personal-loan" />
            <LoanBenefits id="medical-personal-loan" />
            <ComparisonContainer id="medical-personal-loan" />
        </>
    );
}