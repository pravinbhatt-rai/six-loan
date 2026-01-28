import InfoPageTemplate, { PageData } from '@/component/InfoPageTemplate/InfoPageTemplate';
import { Fingerprint, Download, RefreshCw, Link as LinkIcon, Search } from 'lucide-react';
import type { Metadata } from "next";


export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl = "https://sixfinance.app/aadhaar";

  return {
    title: "Aadhaar Services Guide – Download, Update & Link PAN | Six Finance",
    description:
      "Complete Aadhaar guide for Indian residents. Learn how to download e-Aadhaar, check status, update details, and link PAN with Aadhaar easily.",

    keywords: [
      "Aadhaar",
      "e-Aadhaar download",
      "Aadhaar status check",
      "Link PAN with Aadhaar",
      "Update Aadhaar",
      "Aadhaar eligibility",
      "UIDAI verification",
      "Digital identity India",
      "KYC Aadhaar",
      "Aadhaar enrollment",
      "Biometric identity",
      "Aadhaar number",
      "Aadhaar services",
      "Download e-Aadhaar",
      "Aadhaar update address",
      "Aadhaar biometric lock",
      "Aadhaar for NRI",
      "Child Aadhaar",
      "Baal Aadhaar",
      "Aadhaar card download",
      "Indian identity proof",
      "Aadhaar enrollment center",
      "Aadhaar authentication",
      "PAN Aadhaar linking",
      "Proof of identity",
      "Proof of address",
      "e-KYC Aadhaar",
      "Direct benefit transfer",
      "Aadhaar application status",
      "Unique identification number"
    ],

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title: "Aadhaar Services Guide – Download, Update & Link PAN",
      description:
        "Everything you need to know about Aadhaar services—e-Aadhaar download, status tracking, PAN linking, and updates.",
      url: canonicalUrl,
      siteName: "Six Finance",
      type: "article",
      locale: "en_IN",
    },

    twitter: {
      card: "summary_large_image",
      title: "Aadhaar Services Guide – Six Finance",
      description:
        "Download e-Aadhaar, update details, link PAN, and understand Aadhaar eligibility in one place.",
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

const aadhaarData: PageData = {
  hero: {
    badge: "UIDAI Verified Information",
    title: <>The Complete Guide to <span className="text-teal-600">Aadhaar Services</span></>,
    description: "Everything you need to know about India's digital identity backbone. From checking status to linking PAN—simplified for Six Finance users."
  },
  intro: {
    title: "More Than Just an ID Card",
    content: "Aadhaar is a unique 12-digit identification number issued by the UIDAI. It captures your biometric data (fingerprints and iris scan), making it the single most reliable proof of identity and address for Indian residents.",
    points: ["Universal Identity across India", "Paperless e-KYC for Banking", "Direct Benefit Transfer (DBT)", "Lifetime Validity"],
    mainIcon: <Fingerprint size={120} className="text-teal-500 opacity-80" />
  },
  services: [
    { icon: <Download size={24} />, title: "Download e-Aadhaar", desc: "Lost your physical card? Download a password-protected digital copy directly from the UIDAI portal.", action: "Get e-Aadhaar" },
    { icon: <Search size={24} />, title: "Check Status", desc: "Track the status of your new application or update request using your Enrollment ID (EID).", action: "Track Status" },
    { icon: <LinkIcon size={24} />, title: "Link PAN with Aadhaar", desc: "Mandatory for filing IT returns. Ensure your PAN and Aadhaar are linked to avoid penalties.", action: "Link Now" },
    { icon: <RefreshCw size={24} />, title: "Update Details", desc: "Moved to a new city? Update your address or biometric data online or at a permanent enrollment center.", action: "Update Data" },
  ],
  cta: {
    title: "Why link Aadhaar to Six Finance?",
    description: "Linking your Aadhaar enables One-Click KYC. This means we can process your loan applications, investment accounts, and credit limits in seconds rather than days.",
    benefits: ["Faster Loan Disbursals", "High-Value Transactions", "Fraud Prevention"]
  },
  table: {
    title: "Who is Eligible?",
    headers: ["Applicant Category", "Eligibility Criteria", "Key Requirement"],
    rows: [
      ["Indian Residents", "Residing in India for >182 days", "Proof of Identity & Address"],
      ["Minors (Children)", "Below 5 years get 'Baal Aadhaar'", "Birth Cert & Parent's ID"],
      ["NRIs", "Eligible immediately upon arrival", "Valid Indian Passport"]
    ]
  },
  faqs: [
    { question: "What documents are required to apply?", answer: "You typically need one Proof of Identity (POI) (e.g., Passport, PAN) and one Proof of Address (POA) (e.g., Utility Bill, Rent Agreement)." },
    { question: "Is it mandatory to link Aadhaar with a bank account?", answer: "While not mandatory for opening every account, linking Aadhaar is often required for KYC compliance and receiving government subsidies." },
    { question: "How do I lock my Aadhaar biometrics?", answer: "You can lock your biometrics via the UIDAI website or mAadhaar app to prevent unauthorized authentication." }
  ]
};

export default function AadhaarPage() { return <InfoPageTemplate data={aadhaarData} />; }