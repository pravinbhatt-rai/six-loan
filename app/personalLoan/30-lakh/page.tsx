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
                headerTitle="Personal <span class='text-teal-3000'>Loan</span>"
                headerSubtitle="Instant Funds for Any Need"
                headerDescription="Quick approvals and flexible repayment tenures for all your personal needs."
                maxDisplay={4}
                showViewAllButton={true}
            />
            <LoanInfoSection pageId="30-lakh" />
            <SalaryLoanOffers />
            <EmiCalculationTable pageId="30-lakh" />
        </>
    );
}