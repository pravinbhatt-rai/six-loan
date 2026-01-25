import React from "react";
import { LoanSection } from '@/component/PersonalLoan/LoanSection';
import UniversalLoanCard from "@/component/loan/UniversalLoanCard";
import SecuritiesLoanGuide from "@/component/LoanAgainstSecurity/SecuritiesLoanGuide";
import LASHero from "@/component/LoanAgainstSecurity/LASHero";

export default function LakhLAPPage() {
    return (
        <div>
            <LASHero id="10-lakh-las" />
            <LoanSection />
            <UniversalLoanCard
                categorySlug="loan-against-securities"
                headerTitle="Loan Against <span class='text-teal-500'>Security</span>"
                headerSubtitle="Leverage Your Investments"
                headerDescription="Get funds against shares, mutual funds, or bonds without selling them."
                maxDisplay={4}
                showViewAllButton={true}
            />
            <SecuritiesLoanGuide pageId="10-lakh" />
        </div>
    );
}