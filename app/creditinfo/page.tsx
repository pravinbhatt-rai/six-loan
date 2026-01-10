import AnimatedCards from "@/component/creditcards/Animatedcard";
import CreditInfoHero from "@/component/creditinfo/CreditInfoHero";
import SpendingGrid from "@/component/creditinfo/SpendingGrid";
import CreditCardListSection from "@/component/creditinfo/CreditCardListSection";
import CreditCardSection from "@/component/creditinfo/CreditCardSection";
import AboutAndCareers from "@/component/HomePage/AboutAndCareers";
import LoanPartners from "@/component/HomePage/LoanPartners";

export default function CreditInfoPage() {
  return (
    <>
      <CreditInfoHero />
      <LoanPartners />
      <SpendingGrid />
      <CreditCardSection />
      <CreditCardListSection />
      <AboutAndCareers />
      <div className="bg-[#DAF3FFA8]  h-[350px] md:h-[460px] w-full mt-4 md:mt-12 pb-1 mb-3  items-center  hidden md:block">
        <div >
        <h2  className="text-center font-semibold font-serif text-3xl    mb-6 md:text-4xl py-4 md:py-8 text-gray-900">
            Card <span className="text-[#3469CB]">Benefits</span>
        </h2>
        </div>

      <AnimatedCards />
      </div>
    </>
  );
}
