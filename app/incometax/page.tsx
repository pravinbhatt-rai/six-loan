import InfoPageTemplate, { PageData } from '@/component/InfoPageTemplate/InfoPageTemplate';
import { Calculator, FileCheck, Coins, Landmark } from 'lucide-react';

const taxData: PageData = {
  hero: {
    badge: "Direct Tax",
    title: <>Income <span className="text-teal-600">Tax India</span></>,
    description: "Understand your tax obligations, file returns, and contribute to nation-building. Seamless e-Filing services for individuals and businesses."
  },
  intro: {
    title: "Filing Taxes Made Simple",
    content: "Income Tax is an annual tax levied on your income. The e-Filing 2.0 portal has made it easier than ever to file returns, verify them, and claim refunds without paperwork.",
    points: ["Instant Processing", "Pre-filled Forms", "Faceless Assessment", "Quick Refunds"],
    mainIcon: <Calculator size={120} className="text-teal-600 opacity-80" />
  },
  services: [
    { icon: <FileCheck size={24} />, title: "File ITR", desc: "File your Income Tax Return (ITR-1 to ITR-4) online.", action: "File Now" },
    { icon: <Coins size={24} />, title: "View Form 26AS", desc: "Check tax deducted at source (TDS) against your PAN.", action: "View Credit" },
    { icon: <Landmark size={24} />, title: "e-Verify Return", desc: "Verify your submission instantly using Aadhaar OTP.", action: "e-Verify" },
    { icon: <Calculator size={24} />, title: "Link PAN-Aadhaar", desc: "Essential step to process your ITR and refunds.", action: "Link" },
  ],
  cta: {
    title: "New vs Old Regime",
    description: "Choose between lower tax rates (New Regime) without exemptions OR higher rates (Old Regime) with deductions like 80C, HRA.",
    benefits: ["Auto-calculation", "Compare Regimes", "Maximize Savings"]
  },
  table: {
    title: "New Tax Regime Slabs (FY 2023-24)",
    headers: ["Income Slab", "Tax Rate"],
    rows: [
      ["Up to ₹3 Lakh", "Nil"],
      ["₹3 Lakh - ₹6 Lakh", "5%"],
      ["₹6 Lakh - ₹9 Lakh", "10%"],
      ["₹9 Lakh - ₹12 Lakh", "15%"],
      ["₹12 Lakh - ₹15 Lakh", "20%"],
      ["Above ₹15 Lakh", "30%"]
    ]
  },
  faqs: [
    { question: "What is the due date for filing ITR?", answer: "For individuals, the due date is usually July 31st of the assessment year." },
    { question: "Do I need to file ITR if my income is below ₹3 Lakh?", answer: "It is not mandatory, but recommended to file a 'Nil Return' to claim refunds or for loan processing/visa applications." }
  ]
};

export default function TaxPage() { return <InfoPageTemplate data={taxData} />; }