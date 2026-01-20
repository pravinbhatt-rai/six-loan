import React from "react";
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