import PersonalLoanHero from '@/component/PersonalLoan/PersonalLoanHero';
import FeatureSection from '@/component/PersonalLoan/FeatureSection';
import { LoanSection } from '@/component/PersonalLoan/LoanSection';
import OurServices from '@/component/PersonalLoan/OurServices';
import ApplySection from '@/component/PersonalLoan/ApplySection';
import CustomerReview from '@/component/PersonalLoan/CustomerReview';
import FAQSection from '@/component/PersonalLoan/FaqSection';
import EmailApply from '@/component/PersonalLoan/EmailApply';
import LoanFooter from '@/component/PersonalLoan/LoanFooter';
import LoanInfo from '@/component/commonComponent/LoanInfo';
import {ExpertQuoteContainer} from '@/component/PersonalLoan/Linkdin';
import LoanBenefits from '@/component/PersonalLoan/LoanBenefits';
import LoanInfoPage from '@/component/PersonalLoan/LoanInfoPage';
import LoanEligibilityCriteria from '@/component/PersonalLoan/LoanEligibilityCriteria';
import LoanTypesContainer from '@/component/PersonalLoan/LoanTypesContainer';
import DocumentsRequiredContainer from '@/component/PersonalLoan/DocumentsRequiredContainer';
import ThingsToKnow from '@/component/PersonalLoan/ThingsToKnow';
import FeesAndCharges from '@/component/PersonalLoan/FeesAndCharges';
import PreApprovedOffers from '@/component/PersonalLoan/PreApprovedOffers';
import ComparisonContainer from '@/component/PersonalLoan/ComparisonContainer';
import LoanGuide from '@/component/PersonalLoan/LoanGuide';
import LoanComparisonGuide from '@/component/PersonalLoan/LoanComparisonGuide';
import SuccessStories from '@/component/PersonalLoan/SuccessStories';
import LoanInformation from '@/component/PersonalLoan/LoanInformation';
import CityLoanOffers from '@/component/PersonalLoan/CityLoanOffers';
import UniversalLoanCard from '@/component/loan/UniversalLoanCard';

export default function PersonalLoanPage() {
    return (
        <>
            <PersonalLoanHero />
            <FeatureSection />
            <LoanSection />
            {/* Pass the fetched loans to the BankCard component */}
            {/* <UniversalBankCard 
                categorySlug="personal-loan" 
                title="Find Best Personal Loan Offers"
                maxDisplay={4}
            /> */}
            <UniversalLoanCard
                categorySlug="personal-loan"
                headerTitle="Personal <span class='text-teal-500'>Loan</span>"
                headerSubtitle="Instant Funds for Any Need"
                headerDescription="Quick approvals and flexible repayment tenures for all your personal needs."
                maxDisplay={4}
                showViewAllButton={true}
            />
            <LoanInfo loanId="personal-loan" />
            <ExpertQuoteContainer id="personal-loan" />
            <LoanBenefits id='personal-loan'/>
            <LoanInfoPage id="personal-loan" />
            <LoanEligibilityCriteria id='personal-loan'/>
            <LoanTypesContainer id='personal-loan'/>
            <DocumentsRequiredContainer id='personal-loan'/>
            <ThingsToKnow id='personal-loan'/>
            <FeesAndCharges id='personal-loan'/>
            <PreApprovedOffers id='personal-loan'/>
            <ComparisonContainer id='personal-loan'/>
            <LoanGuide id='personal-loan' />
            <LoanComparisonGuide id='personal-loan' />
            <SuccessStories id='personal-loan'/>
            <LoanInformation id='personal-loan'/>
            <OurServices />
            <ApplySection />
            <CustomerReview />
            <FAQSection />
            <EmailApply />
            <CityLoanOffers />
            <CityLoanOffers />
            <LoanFooter />
        </>
    );
}
