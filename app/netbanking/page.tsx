import InfoPageTemplate, { PageData } from '@/component/InfoPageTemplate/InfoPageTemplate';
import { Laptop, Smartphone, Wifi, Zap, Lock } from 'lucide-react';

const netData: PageData = {
  hero: {
    badge: "24/7 Banking",
    title: <>Internet <span className="text-teal-600">Banking</span></>,
    description: "Skip the queue. Manage your accounts, transfer funds, and pay bills from the comfort of your home or office."
  },
  intro: {
    title: "Bank Without Boundaries",
    content: "NetBanking brings the entire bank to your screen. From opening Fixed Deposits to paying utility bills, you have complete control over your finances without visiting a branch.",
    points: ["Real-time Fund Transfer", "Download Account Statements", "Stop Cheque Requests", "Open/Close FDs Instantly"],
    mainIcon: <Laptop size={120} className="text-teal-500 opacity-80" />
  },
  services: [
    { icon: <Zap size={24} />, title: "Fund Transfer", desc: "Send money via IMPS (Instant), NEFT (24x7), or RTGS (High Value).", action: "Transfer" },
    { icon: <Smartphone size={24} />, title: "Bill Payments", desc: "Automate your electricity, water, and credit card bill payments.", action: "Pay Bills" },
    { icon: <Wifi size={24} />, title: "Service Requests", desc: "Order cheque books, update PAN, or request demand drafts.", action: "Request" },
    { icon: <Lock size={24} />, title: "Security Settings", desc: "Change passwords and manage beneficiary cooling periods.", action: "Settings" },
  ],
  cta: {
    title: "Secure & Encrypted",
    description: "We use 256-bit SSL encryption and Two-Factor Authentication (2FA) to ensure your money stays safe.",
    benefits: ["OTP Verification", "Virtual Keypad", "Phishing Protection"]
  },
  table: {
    title: "Transfer Modes Comparison",
    headers: ["Mode", "Speed", "Limit", "Timing"],
    rows: [
      ["IMPS", "Instant", "Up to ₹5 Lakh", "24x7"],
      ["NEFT", "Batches (30 mins)", "No Limit", "24x7"],
      ["RTGS", "Real-time", "Min ₹2 Lakh", "Banking Hours"]
    ]
  },
  faqs: [
    { question: "What if I forget my NetBanking password?", answer: "You can reset it online using your Debit Card details and OTP sent to your registered mobile number." },
    { question: "Is it safe to use NetBanking on public Wi-Fi?", answer: "It is highly recommended NOT to use public Wi-Fi for banking. Always use a secure private network or mobile data." }
  ]
};

export default function NetBankingPage() { return <InfoPageTemplate data={netData} />; }