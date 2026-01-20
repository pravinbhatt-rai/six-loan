import React from "react";
import HeroContainer from '@/component/BussinessLoan/BusinessLoanHero';
import { LoanSection } from '@/component/PersonalLoan/LoanSection';
import UniversalLoanCard from '@/component/loan/UniversalLoanCard';
import PreApprovedOffers from '@/component/PersonalLoan/PreApprovedOffers';
import FeesAndCharges from '@/component/PersonalLoan/FeesAndCharges';
import BusinessLoanGuide from "@/component/commonComponent/BusinessLoanGuide";

export default function Page() {
    return (
        <main>
            <HeroContainer id='business-loan-interest-rates' />
            <LoanSection />
            <UniversalLoanCard
				categorySlug="business-loan"
				headerTitle="Business <span class='text-teal-500'>Loan</span>"
				headerSubtitle="Fuel Your Business Growth"
				headerDescription="Collateral-free loans to help you expand, stock up, or manage cash flow."
				maxDisplay={4}
				showViewAllButton={true}
			/>
            <PreApprovedOffers id="business-loan"/>
            <FeesAndCharges id='business-loan' />
            <BusinessLoanGuide />
        </main>
    );
}