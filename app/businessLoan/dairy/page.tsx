import React from "react";
import HeroContainer from '@/component/BussinessLoan/BusinessLoanHero';
import { LoanSection } from '@/component/PersonalLoan/LoanSection';
import UniversalLoanCard from '@/component/loan/UniversalLoanCard';
import DairyLoanGuide from "@/component/commonComponent/DairyLoanGuide";

export default function Page() {
    return (
        <main>
            <HeroContainer id='dairy-farming-loan' />
            <LoanSection />
            <UniversalLoanCard
				categorySlug="business-loan"
				headerTitle="Business <span class='text-teal-500'>Loan</span>"
				headerSubtitle="Fuel Your Business Growth"
				headerDescription="Collateral-free loans to help you expand, stock up, or manage cash flow."
				maxDisplay={4}
				showViewAllButton={true}
			/>
            <DairyLoanGuide />
        </main>
    );
}