import InfoPageTemplate, { PageData } from '@/component/InfoPageTemplate/InfoPageTemplate';
import { CreditCard, Shield, Globe, Lock } from 'lucide-react';

const debitData: PageData = {
  hero: {
    badge: "Secure Banking",
    title: <>Your Money, <span className="text-teal-600">Accessible Instantly</span></>,
    description: "Experience the freedom of cashless transactions. Withdraw cash, shop online, and pay bills directly from your savings account."
  },
  intro: {
    title: "Power in Your Pocket",
    content: "A Debit Card links directly to your bank account, allowing you to spend only what you have. It eliminates the risk of debt accumulation while offering the convenience of digital payments.",
    points: ["Zero Debt Risk", "Global Acceptance", "Contactless Payments (NFC)", "Instant EMI Options"],
    mainIcon: <CreditCard size={120} className="text-purple-500 opacity-80" />
  },
  services: [
    { icon: <Lock size={24} />, title: "Block/Unblock", desc: "Instantly block your card via the app if lost or stolen.", action: "Manage Card" },
    { icon: <CreditCard size={24} />, title: "Set PIN", desc: "Generate or reset your Green PIN instantly without visiting an ATM.", action: "Reset PIN" },
    { icon: <Globe size={24} />, title: "International Usage", desc: "Enable or disable global transactions for security.", action: "Update Settings" },
    { icon: <Shield size={24} />, title: "Card Limits", desc: "Set daily spending and withdrawal limits to control budget.", action: "Set Limits" },
  ],
  cta: {
    title: "Go Contactless Today",
    description: "Upgrade to our WiFi-enabled cards. Just Tap & Pay for transactions up to ₹5,000 without entering a PIN.",
    benefits: ["Faster Checkouts", "Secure Encryption", "No Handover Required"]
  },
  table: {
    title: "Card Variants & Limits",
    headers: ["Card Type", "Daily Withdrawal", "Purchase Limit"],
    rows: [
      ["Classic Debit", "₹25,000", "₹50,000"],
      ["Platinum Debit", "₹1,00,000", "₹2,00,000"],
      ["Signature Exclusive", "₹2,00,000", "₹5,00,000"]
    ]
  },
  faqs: [
    { question: "What is the difference between Debit and Credit cards?", answer: "Debit cards use your own money from your bank account, while Credit cards use money borrowed from the bank that you pay back later." },
    { question: "Is online usage enabled by default?", answer: "As per RBI guidelines, new cards may have online/international usage disabled. You can enable it via NetBanking or the App." }
  ]
};

export default function DebitPage() { return <InfoPageTemplate data={debitData} />; }