import React from "react";
import HeroContainer from '@/component/HomeLoan/HeroContainer';
import { LoanSection } from '@/component/PersonalLoan/LoanSection';
import UniversalLoanCard from '@/component/loan/UniversalLoanCard';
import GuideContainer from "@/component/HomeLoan/GuideContainer";

export default function Page() {
    return (
        <main>
            <HeroContainer id='home-loan-interest-rates' />
            <LoanSection />
            <UniversalLoanCard
				 categorySlug="home-loan"
                headerTitle="Home <span class='text-teal-500'>Loan</span>"
                loanType="home"
                loanSubType="interestRates"
                headerSubtitle="Your Dream Home Awaits"
                headerDescription="Low interest rates and higher eligibility for buying or constructing your home."
                maxDisplay={4}
                showViewAllButton={true}
			/>
            <GuideContainer id='home-loan-interest-rates' />
        </main>
    );
}