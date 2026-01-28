import HeroContainer from '@/component/BussinessLoan/BusinessLoanHero'
import FeatureSection from '@/component/PersonalLoan/FeatureSection';
import { LoanSection } from '@/component/PersonalLoan/LoanSection';
import LoanInfo from '@/component/commonComponent/LoanInfo';
import {ExpertQuoteContainer} from '@/component/PersonalLoan/Linkdin';
import LoanBenefits from '@/component/PersonalLoan/LoanBenefits';
import LoanInfoPage from '@/component/PersonalLoan/LoanInfoPage';
import LoanEligibilityCriteria from '@/component/PersonalLoan/LoanEligibilityCriteria';
import LoanTypesContainer from '@/component/PersonalLoan/LoanTypesContainer';
import DocumentsRequiredContainer from '@/component/PersonalLoan/DocumentsRequiredContainer';
import FeesAndCharges from '@/component/PersonalLoan/FeesAndCharges';
import OurServices from '@/component/PersonalLoan/OurServices';
import ApplySection from '@/component/PersonalLoan/ApplySection';
import FAQSection from '../../component/BussinessLoan/FAQSection';
import EmailApply from '@/component/PersonalLoan/EmailApply';
import BusinessCityLoanOffers from '@/component/BussinessLoan/BusinessCityLoanOffers';
import UniversalLoanCard from '@/component/loan/UniversalLoanCard';
import ThingsToKnow from '@/component/PersonalLoan/ThingsToKnow';
import PreApprovedOffers from '@/component/PersonalLoan/PreApprovedOffers';
import ComparisonContainer from '@/component/PersonalLoan/ComparisonContainer';
import LoanGuide from '@/component/PersonalLoan/LoanGuide';
import LoanComparisonGuide from '@/component/PersonalLoan/LoanComparisonGuide';
import SuccessStories from '@/component/PersonalLoan/SuccessStories';
import LoanInformation from '@/component/PersonalLoan/LoanInformation';
import type { Metadata } from "next";
import React from "react";

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl = "https://sixfinance.app/businessLoan";

  return {
    title:
      "Business Loan in India | Apply Online for MSME & SME Loans – Six Finance",
    description:
      "Apply online for business loans in India with Six Finance. Compare MSME, SME, startup, working capital, low CIBIL, and collateral-free business loan options with fast approvals.",

    keywords: [
      "business loan",
      "business loan india",
      "msme business loan",
      "sme business loan",
      "collateral free business loan",
      "working capital loan",
      "startup business loan",
      "low cibil business loan",
      "small business loan",
      "merchant business loan",
      "online business loan apply",
      "compare business loans",
      "six finance business loan",
    ],

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title: "Business Loan in India | MSME & SME Loans – Six Finance",
      description:
        "Compare and apply for business loans in India. Get MSME, startup, working capital, and low CIBIL business loans with Six Finance.",
      url: canonicalUrl,
      siteName: "Six Finance",
      type: "website",
      locale: "en_IN",
    },

    twitter: {
      card: "summary_large_image",
      title: "Business Loan in India | Six Finance",
      description:
        "Apply online for business loans with fast approval, flexible repayment, and expert support.",
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function Page() {
	return (
		<main>
			<HeroContainer id='business-loan' />
			<FeatureSection />
            <LoanSection />
			<UniversalLoanCard
				categorySlug="business-loan"
				headerTitle="Business <span class='text-teal-500'>Loan</span>"
				headerSubtitle="Fuel Your Business Growth"
				headerDescription="Collateral-free loans to help you expand, stock up, or manage cash flow."
				maxDisplay={4}
				showViewAllButton={true}
				loanType="business"
			/>
			<LoanInfo loanId="business-loan"/>
			<ExpertQuoteContainer id='business-loan'/>
			<LoanBenefits id='business-loan'/>
			<LoanInfoPage id="business-loan" />
			<LoanEligibilityCriteria id='business-loan'/>
			<LoanTypesContainer id='business-loan'/>
			<DocumentsRequiredContainer id='business-loan'/>
			<ThingsToKnow id='business-loan'/>
			<FeesAndCharges id='business-loan' />
			<PreApprovedOffers id="business-loan" />
			<ComparisonContainer id='business-loan'/>
			<LoanGuide id='business-loan' />
			<LoanComparisonGuide id='business-loan' />
			<SuccessStories id='business-loan'/>
			<LoanInformation id='business-loan'/>
			<OurServices />
			<ApplySection />
			<FAQSection />
			<EmailApply />
			<BusinessCityLoanOffers />
		</main>
	);
}

