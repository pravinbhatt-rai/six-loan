import React from "react";
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

export default function FlexiPersonalLoanPage() {
    return (
        <>
            <PreHero id="flexi-personal-loan" />
            <EMICalculator
                marketingContent={{
                    tagline: "Flexi Personal Loan",
                    headline: (
                        <>
                            Flexible <br />
                            <span className="text-teal-600">Repayment Options</span>
                        </>
                    ),
                    description: "Get the flexibility to withdraw and repay funds as per your need with our Flexi Loan facility.",

                    features: [
                        {
                            icon: <Zap size={20} />,
                            title: "Instant Disbursal",
                            desc: "Funds transferred to your account immediately after acceptance."
                        },
                        {
                            icon: <CheckCircle2 size={20} />,
                            title: "Pay Interest Only",
                            desc: "Pay interest only on the utilized amount, not on the sanctioned limit."
                        },
                        {
                            icon: <ShieldCheck size={20} />,
                            title: "No Hidden Charges",
                            desc: "Transparent processing fees and zero foreclosure charges."
                        },
                        {
                            icon: <Clock size={20} />,
                            title: "Flexible Tenure",
                            desc: "Choose a timeline that works for you, from 12 to 60 months."
                        },
                    ]
                }}

                title="Your Flexi Personal Loan"
                currencySymbol="₹"

                defaultAmount={500000}
                minAmount={50000}
                maxAmount={5000000}

                defaultMonths={36}
                minMonths={12}
                maxMonths={60}

                defaultApr={12.5}
                minApr={10}
                maxApr={24}
            />
            <UniversalLoanCard
                categorySlug="personal-loan"
                headerTitle="Personal <span class='text-teal-500'>Loan</span>"
                loanType="personal"
                loanPurpose="flexi"
                headerSubtitle="Instant Funds for Any Need"
                headerDescription="Quick approvals and flexible repayment tenures for all your personal needs."
                maxDisplay={4}
                showViewAllButton={true}
            />
            <LoanInfo loanId="flexi-personal-loan" />
            <LoanInfoPage id="flexi-personal-loan" />
            <LoanEligibilityContainer id="flexi-personal-loan" />
            <FeesAndCharges id="flexi-personal-loan" />
            <LoanBenefits id="flexi-personal-loan" />
            <ComparisonContainer id="flexi-personal-loan" />
        </>
    );
}
