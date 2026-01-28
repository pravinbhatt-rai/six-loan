import type { Metadata } from "next";
import InfoPageTemplate, { PageData } from "@/component/InfoPageTemplate/InfoPageTemplate";
import { Briefcase, Umbrella, Building, Users } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl = "https://sixfinance.app/epf";

  return {
    title:
      "EPF (Employee Provident Fund) Guide | UAN, Balance, Withdrawal – Six Finance",
    description:
      "Complete guide to Employee Provident Fund (EPF). Learn about UAN activation, PF balance check, withdrawal rules, contribution structure, tax benefits, and EPFO services.",

    keywords: [
      "epf",
      "employee provident fund",
      "epf full form",
      "uan number",
      "uan activation",
      "pf balance check",
      "epf withdrawal rules",
      "epf interest rate",
      "epf contribution",
      "epf tax benefits",
      "epfo services",
      "provident fund india",
      "six finance epf guide",
    ],

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title: "Employee Provident Fund (EPF) Guide | Six Finance",
      description:
        "Understand EPF, UAN, PF contributions, withdrawals, and tax benefits in one simple guide by Six Finance.",
      url: canonicalUrl,
      siteName: "Six Finance",
      type: "article",
      locale: "en_IN",
    },

    twitter: {
      card: "summary_large_image",
      title: "EPF (Employee Provident Fund) Guide",
      description:
        "Everything you need to know about EPF—UAN, balance check, withdrawals, and tax benefits.",
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

const epfData: PageData = {
  hero: {
    badge: "Retirement Security",
    title: <>Employee Provident <span className="text-teal-600">Fund (EPF)</span></>,
    description: "A mandatory savings scheme for salaried employees, managed by the EPFO. Secure your post-retirement life with employer co-contribution."
  },
  intro: {
    title: "Your Retirement Safety Net",
    content: "EPF acts as a corpus for your retirement. Both you and your employer contribute 12% of your basic salary into this fund, which earns interest and can be withdrawn at retirement.",
    points: ["Universal Account Number (UAN)", "Pension Scheme (EPS) Included", "Insurance Benefit (EDLI)", "Tax Benefits u/s 80C"],
    mainIcon: <Briefcase size={120} className="text-teal-600 opacity-80" />
  },
  services: [
    { icon: <Building size={24} />, title: "Check Balance", desc: "View your passbook and monthly contributions instantly.", action: "View Passbook" },
    { icon: <Users size={24} />, title: "UAN Activation", desc: "Activate your Universal Account Number to manage PF online.", action: "Activate" },
    { icon: <Umbrella size={24} />, title: "Withdrawal / Claims", desc: "File online claims for COVID advance, illness, or marriage.", action: "File Claim" },
    { icon: <Briefcase size={24} />, title: "Transfer PF", desc: "Changed jobs? Merge your old PF accounts into the current one.", action: "Transfer" },
  ],
  cta: {
    title: "Understanding UAN",
    description: "Your UAN remains the same throughout your career, even if you change jobs. It links all your PF accounts under one umbrella.",
    benefits: ["One Employee, One UAN", "SMS Updates", "Online KYC Update"]
  },
  table: {
    title: "Contribution Breakdown",
    headers: ["Contributor", "EPF Share", "EPS (Pension)", "Total"],
    rows: [
      ["Employee", "12%", "0%", "12%"],
      ["Employer", "3.67%", "8.33%", "12%"],
      ["Govt", "-", "-", "Variable"]
    ]
  },
  faqs: [
    { question: "When can I withdraw my full EPF amount?", answer: "Full withdrawal is allowed only at retirement (58 years) or if you remain unemployed for 2 months." },
    { question: "Is EPF interest taxable?", answer: "Interest on employee contributions above ₹2.5 Lakh/year is taxable. Otherwise, maturity proceeds are tax-free." }
  ]
};

export default function EpfPage() { return <InfoPageTemplate data={epfData} />; }