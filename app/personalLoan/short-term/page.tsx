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

export default function ShortTermPersonalLoanPage() {
    return (
        <>
            <PreHero id="short-term-personal-loan" />
            <EMICalculator
                marketingContent={{
                    tagline: "Short-Term Personal Loan",
                    headline: (
                        <>
                            Quick Funds for <br />
                            <span className="text-teal-600">Immediate Needs</span>
                        </>
                    ),
                    description: "Get instant access to funds for short-term financial requirements with quick repayment options.",

                    features: [
                        {
                            icon: <Zap size={20} />,
                            title: "Instant Disbursal",
                            desc: "Funds transferred to your account immediately after acceptance."
                        },
                        {
                            icon: <CheckCircle2 size={20} />,
                            title: "Quick Repayment",
                            desc: "Short tenure options from 6 to 24 months for faster loan closure."
                        },
                        {
                            icon: <ShieldCheck size={20} />,
                            title: "No Hidden Charges",
                            desc: "Transparent processing fees and zero foreclosure charges."
                        },
                        {
                            icon: <Clock size={20} />,
                            title: "Fast Approval",
                            desc: "Get approved within 24 hours with minimal documentation."
                        },
                    ]
                }}

                title="Your Short-Term Personal Loan"
                currencySymbol="₹"

                defaultAmount={100000}
                minAmount={25000}
                maxAmount={500000}

                defaultMonths={12}
                minMonths={6}
                maxMonths={24}

                defaultApr={12.5}
                minApr={10}
                maxApr={24}
            />
            <UniversalLoanCard
                categorySlug="personal-loan"
                headerTitle="Personal <span class='text-teal-500'>Loan</span>"
                loanType="personal"
                loanPurpose="short-term"
                headerSubtitle="Instant Funds for Any Need"
                headerDescription="Quick approvals and flexible repayment tenures for all your personal needs."
                maxDisplay={4}
                showViewAllButton={true}
            />
            <LoanInfo loanId="short-term-personal-loan" />
            <LoanInfoPage id="short-term-personal-loan" />
            <LoanEligibilityContainer id="short-term-personal-loan" />
            <FeesAndCharges id="short-term-personal-loan" />
            <LoanBenefits id="short-term-personal-loan" />
            <ComparisonContainer id="short-term-personal-loan" />
        </>
    );
}
