import { Metadata } from 'next';
import PersonalLoanHero from '@/component/PersonalLoan/PersonalLoanHero';
export const metadata: Metadata = {
    title: 'Personal Loan India 2026 | Best Instant Personal Loan Offers',
    description: 'Compare personal loan offers in India 2026. Get instant approval, low interest rates, flexible EMI, and apply online for top personal loans for all needs.',
    alternates: {
        canonical: 'https://sixfinance.app/personalLoan',
    },
    keywords: [
        'personal loan', 'instant personal loan', 'personal loan India', 'best personal loan', 'personal loan interest rate', 'personal loan EMI', 'personal loan eligibility', 'personal loan apply online', 'personal loan offers', 'personal loan documents', 'personal loan for salaried', 'personal loan for self employed', 'personal loan for women', 'personal loan for travel', 'personal loan for wedding', 'personal loan for medical', 'personal loan for home renovation', 'personal loan for education', 'personal loan for debt consolidation', 'personal loan for low cibil', 'personal loan for pensioners', 'personal loan for students', 'personal loan 2026', 'compare personal loans', 'personal loan process', 'personal loan approval', 'personal loan guide', 'personal loan calculator', 'personal loan instant approval', 'personal loan low interest', 'personal loan zero processing fee', 'personal loan pre approved', 'personal loan top up', 'personal loan overdraft', 'personal loan balance transfer', 'personal loan best banks', 'personal loan online', 'personal loan without collateral', 'personal loan quick disbursal', 'personal loan flexible tenure', 'personal loan low EMI', 'personal loan minimum documents', 'personal loan eligibility check', 'personal loan apply 2026', 'personal loan review', 'personal loan tips', 'personal loan offers 2026'
    ],
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    openGraph: {
        title: 'Personal Loan India 2026 | Best Instant Personal Loan Offers',
        description: 'Compare personal loan offers in India 2026. Get instant approval, low interest rates, flexible EMI, and apply online for top personal loans for all needs.',
        url: 'https://sixfinance.app/personalLoan',
        siteName: 'SixFinance',
        type: 'website',
    },
};
import FeatureSection from '@/component/PersonalLoan/FeatureSection';
import { LoanSection } from '@/component/PersonalLoan/LoanSection';
import OurServices from '@/component/PersonalLoan/OurServices';
import ApplySection from '@/component/PersonalLoan/ApplySection';
import CustomerReview from '@/component/PersonalLoan/CustomerReview';
import FAQSection from '@/component/PersonalLoan/FaqSection';
import EmailApply from '@/component/PersonalLoan/EmailApply';
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
                loanType="personal"
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
            
        </>
    );
}
