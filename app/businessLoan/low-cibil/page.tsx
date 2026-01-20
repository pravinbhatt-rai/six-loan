import React from "react";
import HeroContainer from '@/component/BussinessLoan/BusinessLoanHero';
import { LoanSection } from '@/component/PersonalLoan/LoanSection';
import UniversalLoanCard from '@/component/loan/UniversalLoanCard';
import LowCibilLoanGuide from "@/component/PersonalLoan/lowCibil/LowCibilLoanGuide";

export default function Page() {
    return (
        <main>
            <HeroContainer id='low-cibil-business-loans' />
            <LoanSection />
            <UniversalLoanCard
                categorySlug="business-loan"
                headerTitle="Business <span class='text-teal-500'>Loan</span>"
                headerSubtitle="Fuel Your Business Growth"
                headerDescription="Collateral-free loans to help you expand, stock up, or manage cash flow."
                maxDisplay={4}
                showViewAllButton={true}
                loanType="business"
                loanSubType="lowCibil"
            />
            <LowCibilLoanGuide />
        </main>
    );
}