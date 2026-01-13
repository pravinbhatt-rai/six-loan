import CreditScoreHero from "@/component/HomePage/CreditScoreHero";
import CreditProduct from "@/component/HomePage/creditProduct";
import FinancialHealthSection from "@/component/HomePage/FinancialHealthSection";
import CardsList from "@/component/HomePage/cardsList";
import InsuranceQuoteCard from "@/component/HomePage/InsuranceQuoteCard";
import CreditProductBenefits from "@/component/HomePage/CreditProductBenefits";
import AboutAndCareers from "@/component/HomePage/AboutAndCareers";
import MobileAppDownload from "@/component/HomePage/MobileAppDownload";
import Partners from "@/component/HomePage/partners";
import SixLoansHighlight from "@/component/HomePage/SixLoansHighlight";
import LoanPartners from "@/component/HomePage/LoanPartners";

export default function Home() {
  return (
    <>
      <CreditScoreHero />
      <SixLoansHighlight />
      <LoanPartners />
      <CreditProduct />
      <FinancialHealthSection />
      <CardsList />
      <InsuranceQuoteCard />
      <CreditProductBenefits />
      <AboutAndCareers />
      <MobileAppDownload />
      <Partners />
    </>
  );
}
