import React from 'react';
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

