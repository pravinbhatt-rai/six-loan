import InfoPageTemplate, { PageData } from '@/component/InfoPageTemplate/InfoPageTemplate';
import { PiggyBank, TrendingUp, Calculator, Clock } from 'lucide-react';

const ppfData: PageData = {
  hero: {
    badge: "Govt Backed Scheme",
    title: <>Public Provident <span className="text-teal-600">Fund (PPF)</span></>,
    description: "The safest long-term wealth creator in India. Enjoy EEE (Exempt-Exempt-Exempt) tax benefits with guaranteed returns."
  },
  intro: {
    title: "Risk-Free Wealth Creation",
    content: "PPF is a 15-year scheme backed by the Government of India. It offers attractive interest rates that are fully tax-free on maturity, making it ideal for retirement planning.",
    points: ["Tax Free Returns", "Risk-Free Investment", "Loan Facility Available", "Extendable in blocks of 5 years"],
    mainIcon: <PiggyBank size={120} className="text-pink-500 opacity-80" />
  },
  services: [
    { icon: <PiggyBank size={24} />, title: "Open Account", desc: "Start investing with as little as ₹500 per year.", action: "Invest Now" },
    { icon: <Calculator size={24} />, title: "PPF Calculator", desc: "Calculate your maturity amount based on current interest rates.", action: "Calculate" },
    { icon: <Clock size={24} />, title: "Partial Withdrawal", desc: "Withdraw funds after the 7th financial year for emergencies.", action: "Check Rules" },
    { icon: <TrendingUp size={24} />, title: "Loan against PPF", desc: "Avail low-interest loans against your PPF balance between the 3rd and 6th year.", action: "Apply Loan" },
  ],
  cta: {
    title: "The Power of Compounding",
    description: "Invest ₹1.5 Lakh annually to build a corpus of over ₹40 Lakhs tax-free in 15 years (at approx 7.1% interest).",
    benefits: ["Section 80C Deduction", "Compounded Annually", "Sovereign Guarantee"]
  },
  table: {
    title: "Key Features at a Glance",
    headers: ["Feature", "Limit / Rule", "Remarks"],
    rows: [
      ["Min Investment", "₹500 / year", "Penalty if missed"],
      ["Max Investment", "₹1.5 Lakh / year", "Excess earns no interest"],
      ["Maturity Period", "15 Years", "Extendable by 5 years"]
    ]
  },
  faqs: [
    { question: "Can I close my PPF account before 15 years?", answer: "Premature closure is allowed only after 5 years under specific conditions like higher education or medical emergencies." },
    { question: "Is the interest rate fixed?", answer: "No, the interest rate is notified by the Government every quarter. Currently, it hovers around 7.1%." }
  ]
};

export default function PpfPage() { return <InfoPageTemplate data={ppfData} />; }