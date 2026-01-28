import InfoPageTemplate, { PageData } from '@/component/InfoPageTemplate/InfoPageTemplate';
import { PiggyBank, TrendingUp, Calculator, Clock } from 'lucide-react';
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl = "https://sixfinance.app/ppf"; 
  // Use one common OG image for all govt scheme pages

  return {
    title: "PPF Account – Interest Rate, Benefits & Calculator | Six Finance",

    description:
      "Understand Public Provident Fund (PPF) interest rates, tax benefits, maturity rules, withdrawal options, and returns. A government-backed, risk-free investment option.",

    keywords: [
      "PPF account",
      "public provident fund",
      "PPF interest rate",
      "PPF calculator",
      "PPF tax benefits",
      "PPF maturity rules",
      "PPF withdrawal rules",
      "PPF investment India",
      "government saving scheme",
      "tax free investment India"
    ],

    alternates: {
      canonical: canonicalUrl,
    },

    robots: {
      index: true,
      follow: true,
    },

    openGraph: {
      type: "article",
      url: canonicalUrl,
      title: "Public Provident Fund (PPF) – Interest, Benefits & Rules",
      description:
        "Explore PPF features, interest rates, tax-free returns, withdrawal rules, and long-term wealth creation benefits with Six Finance.",
      siteName: "Six Finance",
      
    },

    twitter: {
      card: "summary_large_image",
      title: "Public Provident Fund (PPF) – Interest & Tax Benefits",
      description:
        "Learn how PPF helps you build tax-free wealth with government-backed safety and long-term compounding.",
      site: "@sixfinance", // optional
    },
  };
}


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