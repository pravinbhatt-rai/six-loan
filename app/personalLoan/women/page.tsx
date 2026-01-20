import React from "react";
import PreHero from "@/component/PersonalLoan/preApproved/PreHero";
import EMICalculator from "@/component/PersonalLoan/preApproved/EMICalculator";
import { Percent, Wallet, Zap, CalendarDays } from "lucide-react";
import UniversalLoanCard from "@/component/loan/UniversalLoanCard";
import DynamicContentCard from "@/component/PersonalLoan/salaried/DynamicContentCard";

export default function SalariedPersonalLoanPage() {
    return (
        <>
            <PreHero id="personal-loan-women" />
            <EMICalculator
                marketingContent={{
                    tagline: "Women Personal Loan Calculator",
                    headline: (
                        <>
                            Plan Your <br />
                            <span className="text-teal-600">Women Personal Loan EMI</span>
                        </>
                    ),
                    description: "Calculate accurate monthly payments for your personal loan as a salaried individual. Adjust the tenure to find an EMI that fits your monthly budget perfectly without overextending.",
                    features: [
                        {
                            icon: <Percent size={20} />,
                            title: "Attractive Interest Rates",
                            desc: "Rates starting as low as 10.49% p.a. for customers with high credit scores."
                        },
                        {
                            icon: <Wallet size={20} />,
                            title: "High Loan Value",
                            desc: "Get access to funds up to ₹50 Lakhs to cover major expenses."
                        },
                        {
                            icon: <Zap size={20} />,
                            title: "Quick Disbursal",
                            desc: "End-to-end digital processing ensures money in your bank within 24-48 hours."
                        },
                        {
                            icon: <CalendarDays size={20} />,
                            title: "Extended Tenure",
                            desc: "Repayment flexibility with tenures ranging up to 60 months."
                        },
                    ]
                }}

                // 2. Right Side Content (Calculator Configuration)
                title="Estimate Your Monthly EMI"
                currencySymbol="₹"

                // Standard Personal Loan Limits (50k to 50L)
                defaultAmount={500000} // Default 5 Lakhs
                minAmount={50000}
                maxAmount={5000000}

                // Tenure (1 to 5 Years)
                defaultMonths={36}
                minMonths={12}
                maxMonths={60}

                // Interest Rates (Market Standard)
                defaultApr={10.99} // Competitive starting rate
                minApr={10.49}    // Best market rate
                maxApr={24}
            />
            <UniversalLoanCard
                categorySlug="personal-loan"
                headerTitle="Personal <span class='text-teal-500'>Loan</span>"
                loanType="personal"
                eligibleFor="women"
                headerSubtitle="Instant Funds for Any Need"
                headerDescription="Quick approvals and flexible repayment tenures for all your personal needs."
                maxDisplay={4}
                showViewAllButton={true}
            />
            <DynamicContentCard pageId="personal-loan-women" />
        </>
    );
}