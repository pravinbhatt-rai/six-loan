import InfoPageTemplate, { PageData } from '@/component/InfoPageTemplate/InfoPageTemplate';
import { CreditCard, FileText, UserPlus, FileEdit } from 'lucide-react';
import type { Metadata } from "next";
import React from "react";

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl = "https://sixfinance.app/pan";

  return {
    title:
      "PAN Card India | Apply, Update, Link Aadhaar & e-PAN – Six Finance",

    description:
      "Learn everything about PAN Card in India. Apply for new PAN, update details, link Aadhaar, download e-PAN, and understand PAN usage for tax & banking.",

    keywords: [
      "pan card",
      "pan card india",
      "apply pan card online",
      "new pan card apply",
      "pan card correction",
      "pan card update",
      "pan card link aadhaar",
      "pan aadhaar linking",
      "instant e pan",
      "download e pan",
      "pan card reprint",
      "pan card for income tax",
      "pan card for bank account",
      "pan card for stock market",
      "six finance pan services",
    ],

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title: "PAN Card Services | Apply, Update & Link Aadhaar – Six Finance",
      description:
        "Apply for PAN card, update details, link Aadhaar, or generate instant e-PAN. Trusted PAN services explained simply by Six Finance.",
      url: canonicalUrl,
      siteName: "Six Finance",
      type: "website",
      locale: "en_IN",
    },

    twitter: {
      card: "summary_large_image",
      title: "PAN Card India | Six Finance",
      description:
        "Complete guide to PAN Card in India – application, correction, Aadhaar linking & instant e-PAN.",
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}


const panData: PageData = {
  hero: {
    badge: "Income Tax Dept Verified",
    title: <>Permanent Account <span className="text-teal-600">Number (PAN)</span></>,
    description: "Your definitive proof of identity for financial transactions. Mandatory for tax filing, high-value purchases, and opening bank accounts."
  },
  intro: {
    title: "Why is PAN Essential?",
    content: "A PAN card acts as a universal identification key that tracks your financial transactions. It is mandatory for filing Income Tax Returns (ITR), buying jewelry above specified limits, and investing in the stock market.",
    points: ["Mandatory for Tax Filing", "Valid Lifetime Identity", "Prevents Tax Evasion", "Required for Business"],
    mainIcon: <CreditCard size={120} className="text-teal-500 opacity-80" />
  },
  services: [
    { icon: <UserPlus size={24} />, title: "Apply New PAN", desc: "Form 49A for Indian citizens. Get your physical card in 15 days.", action: "Apply Now" },
    { icon: <FileEdit size={24} />, title: "Correction / Update", desc: "Change your name, DOB, or address in the existing PAN database.", action: "Update Data" },
    { icon: <FileText size={24} />, title: "Link Aadhaar", desc: "Mandatory linking to avoid your PAN becoming inoperative.", action: "Link Now" },
    { icon: <CreditCard size={24} />, title: "Reprint Card", desc: "Lost your card? Request a reprint without changing your PAN number.", action: "Order Reprint" },
  ],
  cta: {
    title: "Instant e-PAN Service",
    description: "Don't want to wait for the physical card? Generate an Instant e-PAN using your Aadhaar number in just 10 minutes.",
    benefits: ["Paperless Process", "Zero Cost", "Legally Valid as Physical Card"]
  },
  table: {
    title: "Applicant Categories",
    headers: ["Category", "Form Required", "Key Document"],
    rows: [
      ["Indian Citizen", "Form 49A", "Aadhaar / Voter ID"],
      ["Foreign Citizen", "Form 49AA", "Passport / OCI Card"],
      ["Changes/Correction", "CSF Form", "Proof of Change"]
    ]
  },
  faqs: [
    { question: "Can I hold more than one PAN card?", answer: "No, holding more than one PAN is illegal and can attract a penalty of ₹10,000 under Section 272B of the Income Tax Act." },
    { question: "Is it mandatory to link PAN with Aadhaar?", answer: "Yes, it is mandatory. Failure to do so will make your PAN inoperative, and you won't be able to file ITR or conduct banking transactions." }
  ]
};

export default function PanPage() { return <InfoPageTemplate data={panData} />; }