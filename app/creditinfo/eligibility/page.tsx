// app/credit-cards/eligibility/page.tsx
"use client";
import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { 
  CheckCircle, 
  XCircle, 
  FileText, 
  CreditCard, 
  TrendingUp, 
  Shield, 
  UserCheck, 
  Building, 
  MapPin, 
  Calculator,
  ArrowRight,
  ChevronRight,
  Star,
  AlertCircle,
  FileCheck,
  Percent,
  Clock,
  Phone,
  Mail,
  Smartphone,
  Award,
  Zap,
  Users,
  Target,
  DollarSign
} from "lucide-react";
import EligibilityForm from "@/component/creditcards/eligibility/EligibilityForm";

export default function CreditCardEligibilityPage() {
  const [activeSection, setActiveSection] = useState("eligibility");
  const [showForm, setShowForm] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  // Fetch user data on page mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/auth/session");
        if (response.ok) {
          const data = await response.json();
          if (data && data.user) {
            setIsLoggedIn(true);
            setUserData(data.user);
          }
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };
    fetchUserData();
  }, []);

  const faqItems = [
    {
      question: "How to check credit card eligibility?",
      answer: "To check your credit card eligibility, you may directly contact the card issuer. Alternatively, you may check your eligibility and find pre-qualified offers at our platform. Start by filling out the application form at the top of the page.",
      icon: <Calculator className="w-5 h-5" />
    },
    {
      question: "How can I check business credit card eligibility?",
      answer: "The eligibility requirement for a business credit card may vary across issuers and cards. You may check your eligibility with the respective provider.",
      icon: <Building className="w-5 h-5" />
    },
    {
      question: "What is the credit card eligibility for the self-employed?",
      answer: "In general, self-employed individuals aged between 18 and 65 years can apply for a credit card. Lenders also require a minimum ITR filing per annum that varies across the card type. Usually, low annual fee cards have an easier eligibility condition.",
      icon: <UserCheck className="w-5 h-5" />
    },
    {
      question: "What should the CIBIL score be to be eligible for a credit card?",
      answer: "Credit card issuers offer credit cards to individuals with a good credit score of 750 and above. However, some entry-level cards may accept scores as low as 650.",
      icon: <TrendingUp className="w-5 h-5" />
    },
    {
      question: "What should be the age to be qualified for a credit card?",
      answer: "The minimum age requirement to apply for a credit card is 18 or 21 years and may vary depending upon your profile whether salaried or self-employed, card type, and issuer's internal policies.",
      icon: <Clock className="w-5 h-5" />
    },
    {
      question: "Can a student apply for a credit card?",
      answer: "Yes, students can apply for credit cards that do not require income proofs as a necessary document, for instance, secured credit cards or add-on cards from parents.",
      icon: <Users className="w-5 h-5" />
    },
    {
      question: "Is a bank account necessary to apply for a credit card?",
      answer: "No, it is not necessary to have a bank account to avail a credit card with an issuer. However, having an existing relationship with the bank can improve your chances.",
      icon: <DollarSign className="w-5 h-5" />
    },
    {
      question: "What is the minimum salary requirement to apply for a credit card?",
      answer: "The minimum salary requirement for a credit card varies from one credit card issuer to the other. Moreover, the minimum salary required depends on if the primary applicant is a salaried individual or self-employed.",
      icon: <Target className="w-5 h-5" />
    }
  ];

  const eligibilityFactors = [
    {
      title: "Credit Score",
      description: "A score above 750 is preferred by most issuers. Your credit history, payment patterns, and defaults determine your score.",
      icon: <TrendingUp className="w-6 h-6" />,
      importance: "High",
      impact: "Primary factor"
    },
    {
      title: "Income Requirements",
      description: "Stable monthly/annual income is essential. Minimum requirements vary by card type and issuer.",
      icon: <DollarSign className="w-6 h-6" />,
      importance: "High",
      impact: "Determines credit limit"
    },
    {
      title: "Credit Utilization Ratio",
      description: "Keep your CUR below 30%. High utilization indicates credit hunger and affects approval chances.",
      icon: <Percent className="w-6 h-6" />,
      importance: "Medium",
      impact: "Affects credit score"
    },
    {
      title: "Employment Status",
      description: "Stable employment (1+ years with current employer) improves credibility. Frequent job changes may raise concerns.",
      icon: <Building className="w-6 h-6" />,
      importance: "High",
      impact: "Income stability proof"
    },
    {
      title: "Age Requirements",
      description: "Minimum 18 years, maximum 60-65 years depending on the card issuer and type.",
      icon: <UserCheck className="w-6 h-6" />,
      importance: "Medium",
      impact: "Basic eligibility"
    },
    {
      title: "Location",
      description: "Some cards are city-specific. Check if the card is offered in your city before applying.",
      icon: <MapPin className="w-6 h-6" />,
      importance: "Low",
      impact: "Availability check"
    },
    {
      title: "Credit Enquiries",
      description: "Multiple hard enquiries in 6 months can lower your score. Maintain gaps between applications.",
      icon: <FileCheck className="w-6 h-6" />,
      importance: "Medium",
      impact: "Credit score impact"
    },
    {
      title: "Existing Relationship",
      description: "Existing customers with good standing may get preferential treatment and higher limits.",
      icon: <Users className="w-6 h-6" />,
      importance: "Medium",
      impact: "Additional benefit"
    }
  ];

  const bankEligibility = [
    { bank: "HDFC Bank", minScore: 750, minIncome: "₹25,000", minAge: 21, maxAge: 60 },
    { bank: "SBI Card", minScore: 700, minIncome: "₹20,000", minAge: 21, maxAge: 65 },
    { bank: "ICICI Bank", minScore: 720, minIncome: "₹18,000", minAge: 21, maxAge: 60 },
    { bank: "Axis Bank", minScore: 730, minIncome: "₹22,000", minAge: 21, maxAge: 60 },
    { bank: "American Express", minScore: 750, minIncome: "₹35,000", minAge: 21, maxAge: 60 },
    { bank: "RBL Bank", minScore: 650, minIncome: "₹15,000", minAge: 21, maxAge: 65 },
    { bank: "Standard Chartered", minScore: 740, minIncome: "₹30,000", minAge: 21, maxAge: 60 },
    { bank: "HSBC Bank", minScore: 750, minIncome: "₹40,000", minAge: 21, maxAge: 60 },
    { bank: "Kotak Mahindra", minScore: 680, minIncome: "₹15,000", minAge: 21, maxAge: 65 },
    { bank: "Yes Bank", minScore: 660, minIncome: "₹15,000", minAge: 21, maxAge: 65 },
  ];

  const cardCategories = [
    "Travel",
    "Shopping",
    "Online Shopping",
    "Fuel",
    "Dining",
    "Entertainment",
    "Cashback",
    "Reward Points",
    "Grocery",
    "Zero Annual Fee",
    "Lounge Access Credit Cards"
  ];

  const documentsRequired = [
    { document: "Duly-filled application form", mandatory: true, for: "All applicants" },
    { document: "Passport-size photographs", mandatory: true, for: "All applicants" },
    { document: "Identity proof (Aadhaar/PAN/Passport/Driving License)", mandatory: true, for: "All applicants" },
    { document: "Address proof (Aadhaar/Utility Bill/Passport)", mandatory: true, for: "All applicants" },
    { document: "Latest 3 months salary slips", mandatory: true, for: "Salaried" },
    { document: "3-6 months bank statements", mandatory: true, for: "All applicants" },
    { document: "Form 16", mandatory: false, for: "Salaried" },
    { document: "Annual ITR (last 2 years)", mandatory: true, for: "Self-employed" },
    { document: "Business proof (GST/Certificate)", mandatory: false, for: "Self-employed" },
    { document: "Employment certificate", mandatory: false, for: "Salaried" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["eligibility", "factors", "documents", "faq"];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      {/* Hero Section with Parallax */}
      <div className="relative overflow-hidden bg-linear-to-r from-teal-600 to-teal-800">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full animate-pulse" style={{ animationDelay: "1s" }}></div>
          <div className="absolute top-1/2 right-0 w-48 h-48 bg-white rounded-full animate-pulse" style={{ animationDelay: "2s" }}></div>
        </div>

        <motion.div 
          style={{ opacity, scale }}
          className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-24 md:pt-20 md:pb-32"
        >
          {/* Breadcrumb */}
          <div className="mb-6 text-sm md:text-base font-medium text-teal-200">
            <span className="hover:underline cursor-pointer">Home</span>
            <span className="mx-2">›</span>
            <span className="hover:underline cursor-pointer">Credit Card</span>
            <span className="mx-2">›</span>
            <span className="font-semibold text-white">Credit Card Eligibility</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full mb-6">
                <Shield className="w-5 h-5" />
                <span className="text-sm font-medium">Quick Eligibility Check</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Credit Card Eligibility:
                <span className="block text-teal-200 mt-2">
                  Check Criteria & Apply Online
                </span>
              </h1>
              
              <p className="text-xl text-teal-100 mb-8 max-w-2xl">
                Eligibility criteria vary from one card to another. Before applying, check if you meet the requirements to avoid application rejection which can affect your credit score.
              </p>

              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-300" />
                  <span className="text-teal-100">Instant Eligibility Check</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-300" />
                  <span className="text-teal-100">No Impact on Credit Score</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-300" />
                  <span className="text-teal-100">500+ Cards Available</span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-teal-700 font-bold rounded-xl hover:bg-gray-100 transition-colors shadow-2xl"
              >
                <span>Check Your Eligibility Now</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>

              <p className="text-sm text-teal-200/80 mt-4">
                *Apply for a Credit Card & Get ₹500 Cashback in Wallet
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              {/* Floating Card Elements */}
              <div className="relative w-full max-w-md mx-auto">
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-linear-to-r from-teal-500 to-green-400 rounded-full blur-xl opacity-20"></div>
                <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-linear-to-r from-cyan-500 to-teal-400 rounded-full blur-xl opacity-20"></div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-2xl">
                  <div className="text-center mb-6">
                    <CreditCard className="w-16 h-16 mx-auto text-white mb-4" />
                    <h3 className="text-2xl font-bold text-white mb-2">
                      936,613,359
                    </h3>
                    <p className="text-teal-200">
                      Eligibility Checks Processed
                    </p>
                  </div>

                  <div className="space-y-4">
                    {[
                      { icon: <Zap className="w-5 h-5" />, text: "90% Approval Rate" },
                      { icon: <Clock className="w-5 h-5" />, text: "Instant Results" },
                      { icon: <Shield className="w-5 h-5" />, text: "Secure & Private" },
                      { icon: <Award className="w-5 h-5" />, text: "Best Offers Guaranteed" },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.5 }}
                        className="flex items-center gap-3 p-3 bg-white/5 rounded-lg"
                      >
                        <div className="text-teal-300">
                          {item.icon}
                        </div>
                        <span className="text-white">{item.text}</span>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-white/20">
                    <p className="text-sm text-teal-200 text-center">
                      By submitting this form, you have read and agree to the 
                      <span className="underline cursor-pointer ml-1">Credit Report Terms of Use</span>.
                      <br />
                      <span className="underline cursor-pointer">Terms of Use & Privacy Policy</span>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Navigation Tabs */}
        <div className="sticky top-0 z-10 bg-white shadow-sm mb-12">
          <div className="flex overflow-x-auto">
            {[
              { id: "eligibility", label: "Basic Eligibility", icon: <CheckCircle className="w-5 h-5" /> },
              { id: "factors", label: "Key Factors", icon: <TrendingUp className="w-5 h-5" /> },
              { id: "banks", label: "Bank Requirements", icon: <Building className="w-5 h-5" /> },
              { id: "documents", label: "Documents", icon: <FileText className="w-5 h-5" /> },
              { id: "faq", label: "FAQs", icon: <AlertCircle className="w-5 h-5" /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  document.getElementById(tab.id)?.scrollIntoView({ behavior: "smooth" });
                  setActiveSection(tab.id);
                }}
                className={`flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap transition-colors ${activeSection === tab.id
                    ? "text-teal-600 border-b-2 border-teal-600"
                    : "text-gray-600 hover:text-teal-500"
                  }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Basic Eligibility Section */}
        <motion.section
          id="eligibility"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 scroll-mt-24"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-linear-to-r from-teal-500 to-teal-600 rounded-lg">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Basic Credit Card Eligibility Criteria
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="p-8">
              <p className="text-gray-700 mb-8 text-lg">
                While eligibility criteria vary from one card to another, there are basic requirements you must meet. Failing to meet these criteria may result in application rejection, which can negatively impact your credit score. Always check eligibility before applying.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    icon: <TrendingUp className="w-8 h-8" />,
                    title: "Credit Score",
                    value: "750+",
                    description: "Preferably above 750 for best offers",
                    color: "from-green-500 to-teal-500"
                  },
                  {
                    icon: <UserCheck className="w-8 h-8" />,
                    title: "Minimum Age",
                    value: "18 Years",
                    description: "Varies between 18-21 years",
                    color: "from-blue-500 to-cyan-500"
                  },
                  {
                    icon: <UserCheck className="w-8 h-8" />,
                    title: "Maximum Age",
                    value: "60-65 Years",
                    description: "Depends on card issuer",
                    color: "from-purple-500 to-pink-500"
                  },
                  {
                    icon: <DollarSign className="w-8 h-8" />,
                    title: "Income Requirement",
                    value: "Stable Income",
                    description: "Monthly/Annual income proof needed",
                    color: "from-orange-500 to-red-500"
                  }
                ].map((criteria, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-linear-to-br from-white to-gray-50 rounded-xl p-6 border border-gray-200 shadow-sm"
                  >
                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-full bg-linear-to-r ${criteria.color} text-white mb-4`}>
                      {criteria.icon}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{criteria.title}</h3>
                    <div className="text-2xl font-bold text-gray-900 mb-2">{criteria.value}</div>
                    <p className="text-gray-600 text-sm">{criteria.description}</p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-linear-to-r from-teal-50 to-teal-100 rounded-xl border border-teal-200">
                <div className="flex items-start gap-4">
                  <AlertCircle className="w-6 h-6 text-teal-600 mt-1 shrink-0" />
                  <div>
                    <h4 className="font-bold text-teal-800 mb-2">Important Note</h4>
                    <p className="text-teal-700">
                      This is the basic eligibility criteria. Actual criteria varies as per the credit card issuer and the credit card variant. Always check specific requirements for the card you&apos;re interested in.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Factors Affecting Eligibility */}
        <motion.section
          id="factors"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 scroll-mt-24"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-linear-to-r from-teal-500 to-teal-600 rounded-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Factors Affecting Credit Card Eligibility
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <p className="text-gray-700 mb-8 text-lg">
              Credit card eligibility varies between issuers, but several key factors consistently influence approval decisions. Understanding these can help you improve your chances of approval.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {eligibilityFactors.map((factor, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-linear-to-br from-white to-gray-50 rounded-xl p-6 border border-gray-200 hover:border-teal-300 transition-colors group hover:shadow-md"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-teal-100 rounded-lg text-teal-600 group-hover:bg-teal-200 transition-colors">
                      {factor.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{factor.title}</h3>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${factor.importance === "High" ? "bg-red-100 text-red-700" : factor.importance === "Medium" ? "bg-yellow-100 text-yellow-700" : "bg-blue-100 text-blue-700"}`}>
                          {factor.importance} Priority
                        </span>
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                          {factor.impact}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600">{factor.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Tips Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-linear-to-r from-green-50 to-teal-50 rounded-xl p-6 border border-green-200">
                <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Do&apos;s for Better Eligibility
                </h4>
                <ul className="space-y-3">
                  {[
                    "Maintain credit score above 750",
                    "Keep credit utilization below 30%",
                    "Have stable employment (1+ years)",
                    "Pay all bills on time",
                    "Maintain healthy bank balance",
                    "Limit credit applications (6+ months gap)"
                  ].map((tip, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
                      <span className="text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-linear-to-r from-red-50 to-orange-50 rounded-xl p-6 border border-red-200">
                <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-red-600" />
                  Don&apos;ts to Avoid
                </h4>
                <ul className="space-y-3">
                  {[
                    "Don't apply for multiple cards simultaneously",
                    "Avoid maxing out credit limits",
                    "Don't miss payments or default",
                    "Avoid frequent job changes",
                    "Don't ignore existing debts",
                    "Avoid high debt-to-income ratio"
                  ].map((tip, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500 mt-2"></div>
                      <span className="text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Bank Requirements Table */}
        <motion.section
          id="banks"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 scroll-mt-24"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-linear-to-r from-teal-500 to-teal-600 rounded-lg">
              <Building className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Bank-wise Credit Card Eligibility
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="bg-linear-to-r from-teal-600 to-teal-700">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                      Bank / Issuer
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                      Min. CIBIL Score
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                      Min. Monthly Income
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                      Age Range
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                      Employment Type
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {bankEligibility.map((bank, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{bank.bank}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${bank.minScore >= 750 ? 'bg-green-500' : bank.minScore >= 700 ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                          <span className="font-medium">{bank.minScore}+</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-medium text-gray-900">{bank.minIncome}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-medium text-gray-900">{bank.minAge} - {bank.maxAge} years</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                          Salaried/Self-employed
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Card Categories */}
            <div className="p-8 border-t border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Best Credit Cards For
              </h3>
              <div className="flex flex-wrap gap-3">
                {cardCategories.map((category, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="px-4 py-2 bg-gray-100 hover:bg-teal-100 text-gray-700 hover:text-teal-700 rounded-full text-sm font-medium transition-colors cursor-pointer"
                  >
                    {category}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Documents Required */}
        <motion.section
          id="documents"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 scroll-mt-24"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-linear-to-r from-teal-500 to-teal-600 rounded-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Documents Required to Apply for a Credit Card
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <p className="text-gray-700 mb-6">
                The documents required usually depend on your credit card issuer. Below is the comprehensive list of documents you may need to submit:
              </p>

              <div className="space-y-4">
                {documentsRequired.map((doc, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className={`p-2 rounded-lg ${doc.mandatory ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                      <FileCheck className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-gray-900">{doc.document}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${doc.mandatory ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                          {doc.mandatory ? 'Mandatory' : 'Optional'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">For: {doc.for}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-linear-to-r from-teal-50 to-teal-100 rounded-2xl p-8 border border-teal-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  How to Check Your Eligibility
                </h3>
                <div className="space-y-6">
                  {[
                    {
                      step: "Step 1",
                      title: "Enter Mobile Number",
                      description: "Click here and enter your mobile number to start the application process.",
                      icon: <Smartphone className="w-6 h-6" />
                    },
                    {
                      step: "Step 2",
                      title: "Verify OTP",
                      description: "Enter the OTP received on your mobile number to check pre-approved offers.",
                      icon: <Shield className="w-6 h-6" />
                    },
                    {
                      step: "Step 3",
                      title: "Compare & Select",
                      description: "Compare and select the credit cards that suit your requirements best.",
                      icon: <CreditCard className="w-6 h-6" />
                    },
                    {
                      step: "Step 4",
                      title: "Complete Application",
                      description: "Apply for the relevant credit card and provide documents to complete the process.",
                      icon: <FileCheck className="w-6 h-6" />
                    }
                  ].map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <div className="shrink-0">
                        <div className="w-12 h-12 rounded-full bg-linear-to-r from-teal-500 to-teal-600 flex items-center justify-center text-white font-bold">
                          {step.step.split(" ")[1]}
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="text-teal-600">
                            {step.icon}
                          </div>
                          <h4 className="font-bold text-gray-900">{step.title}</h4>
                        </div>
                        <p className="text-gray-700">{step.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="bg-linear-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Need Help?
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-white rounded-lg">
                    <Phone className="w-5 h-5 text-teal-600" />
                    <div>
                      <div className="font-medium text-gray-900">Call Us</div>
                      <div className="text-gray-600">1800-XXX-XXXX</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-white rounded-lg">
                    <Mail className="w-5 h-5 text-teal-600" />
                    <div>
                      <div className="font-medium text-gray-900">Email Us</div>
                      <div className="text-gray-600">support@creditcards.com</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* FAQ Section */}
        <motion.section
          id="faq"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="scroll-mt-24"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-linear-to-r from-teal-500 to-teal-600 rounded-lg">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {faqItems.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:border-teal-300 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-teal-100 rounded-lg text-teal-600">
                    {faq.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="bg-linear-to-r from-teal-600 to-teal-700 rounded-3xl p-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Find Your Perfect Credit Card?
            </h2>
            <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
              Check your eligibility instantly and discover cards tailored to your profile.
              No impact on your credit score.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-teal-700 font-bold rounded-xl hover:bg-gray-100 transition-colors shadow-2xl"
            >
              <span>Check Eligibility Now</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Eligibility Form Modal */}
      <AnimatePresence>
        {showForm && (
          <EligibilityForm 
            onClose={() => setShowForm(false)} 
            userData={userData}
            isLoggedIn={isLoggedIn}
          />
        )}
      </AnimatePresence>
    </div>
  );
}