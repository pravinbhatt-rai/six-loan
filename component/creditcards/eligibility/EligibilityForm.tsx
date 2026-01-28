// components/credit-cards/eligibility/EligibilityForm.tsx
"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, CreditCard, Smartphone, Mail, User, Building, DollarSign, Calendar, FileText, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react";
import { fastFetch } from "@/lib/utils/ultraFastFetch";
import { useRouter } from "next/navigation";
import InlineLoader from "@/component/commonComponent/SixFinanceLoader";

interface EligibilityFormProps {
  onClose: () => void;
  userData?: any;
  isLoggedIn?: boolean;
}

interface EligibilityResult {
  id: number;
  eligibilityScore: number;
  eligible: boolean;
  recommendation: string;
}

export default function EligibilityForm({ onClose, userData: propUserData, isLoggedIn: propIsLoggedIn }: EligibilityFormProps) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<EligibilityResult | null>(null);
  // If userData exists, user is logged in. Otherwise use the prop or check localStorage
  const hasToken = typeof window !== 'undefined' && localStorage.getItem('token');
  const [isLoggedIn, setIsLoggedIn] = useState(propIsLoggedIn || !!propUserData || !!hasToken);
  const [formData, setFormData] = useState({
    mobile: propUserData?.phone || "",
    name: propUserData?.name || "",
    email: propUserData?.email || "",
    panCard: propUserData?.panCard || "",
    employment: "salaried",
    monthlyIncome: propUserData?.monthlyIncome?.toString() || "",
    city: propUserData?.city || "",
    dob: propUserData?.dob ? new Date(propUserData.dob).toISOString().split('T')[0] : "",
    creditScore: propUserData?.cibilScore?.toString() || ""
  });

  // Update form data when props change
  useEffect(() => {
    if (propUserData) {
      setIsLoggedIn(true); // If userData exists, user is definitely logged in
      setFormData(prev => ({
        ...prev,
        name: propUserData.name || "",
        email: propUserData.email || "",
        mobile: propUserData.phone || "",
        panCard: propUserData.panCard || "",
        city: propUserData.city || "",
        dob: propUserData.dob ? new Date(propUserData.dob).toISOString().split('T')[0] : "",
        monthlyIncome: propUserData.monthlyIncome?.toString() || "",
        creditScore: propUserData.cibilScore?.toString() || ""
      }));
    } else if (propIsLoggedIn !== undefined) {
      // If no userData but isLoggedIn prop is explicitly set, use it
      setIsLoggedIn(propIsLoggedIn);
    }
  }, [propUserData, propIsLoggedIn]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (step < 3) {
      setStep(step + 1);
      return;
    }

    // Check if user is logged in before final submission
    // First check localStorage token, then check session
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    
    if (!token && !isLoggedIn && step === 3) {
      // Double-check with session API before redirecting
      try {
        const sessionCheck = await fetch("/api/auth/session");
        if (!sessionCheck.ok) {
          const currentPath = window.location.pathname;
          router.push(`/login?redirect=${encodeURIComponent(currentPath)}`);
          return;
        }
        // User is logged in, update state and continue
        setIsLoggedIn(true);
      } catch (err) {
        const currentPath = window.location.pathname;
        router.push(`/login?redirect=${encodeURIComponent(currentPath)}`);
        return;
      }
    }

    // Final submission
    setLoading(true);
    try {
      const response = await fetch("/api/eligibility", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.mobile,
          panCard: formData.panCard.toUpperCase(),
          dateOfBirth: formData.dob,
          employment: formData.employment,
          monthlyIncome: parseFloat(formData.monthlyIncome),
          city: formData.city,
          creditScore: formData.creditScore ? parseInt(formData.creditScore) : undefined
        })
      });

      const data: {success: boolean; data?: EligibilityResult; error?: string} = await response.json();

      if (data.success && data.data) {
        setResult(data.data);
        setStep(4); // Move to result step
      } else {
        setError(data.error || "Failed to check eligibility. Please try again.");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // PAN card validation: convert to uppercase
    if (name === "panCard") {
      setFormData({ ...formData, [name]: value.toUpperCase() });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validatePan = (pan: string): boolean => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panRegex.test(pan);
  };

  const steps = [
    { number: 1, title: "Contact Details" },
    { number: 2, title: "Personal Information" },
    { number: 3, title: "Income Details" },
    { number: 4, title: "Result" }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-linear-to-r from-teal-600 to-teal-700 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <CreditCard className="w-8 h-8" />
              <div>
                <h2 className="text-2xl font-bold">Check Your Eligibility</h2>
                <p className="text-teal-100 text-sm">Instant check, no impact on credit score</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Steps */}
          <div className="flex justify-between relative">
            {steps.slice(0, 3).map((s, index) => (
              <div key={s.number} className="flex flex-col items-center z-10">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= s.number ? 'bg-white text-teal-600' : 'bg-white/20 text-white'} font-bold`}>
                  {step > s.number ? <Check className="w-5 h-5" /> : s.number}
                </div>
                <span className="text-sm mt-2">{s.title}</span>
              </div>
            ))}
            <div className="absolute top-5 left-0 right-0 h-1 bg-white/20 -translate-y-1/2">
              <motion.div
                className="h-full bg-white"
                initial={{ width: "0%" }}
                animate={{ width: `${((Math.min(step, 3) - 1) / 2) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-8 mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-red-800">{error}</p>
            </div>
          </motion.div>
        )}

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-8">
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Number *
                </label>
                <div className="relative">
                  <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none"
                    placeholder="Enter 10-digit mobile number"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none"
                    placeholder="Enter email address"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  PAN Card Number *
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="panCard"
                    value={formData.panCard}
                    onChange={handleChange}
                    required
                    maxLength={10}
                    className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none uppercase"
                    placeholder="ABCDE1234F"
                  />
                </div>
                {formData.panCard && !validatePan(formData.panCard) && (
                  <p className="text-xs text-red-500 mt-1">Invalid PAN format (e.g., ABCDE1234F)</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none"
                    placeholder="Enter your city"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Employment Type *
                </label>
                <select
                  name="employment"
                  value={formData.employment}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none"
                >
                  <option value="salaried">Salaried</option>
                  <option value="self-employed">Self-employed</option>
                  <option value="business">Business Owner</option>
                  <option value="student">Student</option>
                  <option value="retired">Retired</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Income (₹) *
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    name="monthlyIncome"
                    value={formData.monthlyIncome}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none"
                    placeholder="Enter monthly income"
                  />
                </div>
                <div className="flex gap-2 mt-2">
                  {["25000", "50000", "75000", "100000"].map((amount) => (
                    <button
                      type="button"
                      key={amount}
                      onClick={() => setFormData({...formData, monthlyIncome: amount})}
                      className={`px-3 py-1.5 text-sm rounded-full ${formData.monthlyIncome === amount ? 'bg-teal-100 text-teal-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                      ₹{amount}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Credit Score (Optional)
                </label>
                <div className="relative">
                  <TrendingUp className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    name="creditScore"
                    value={formData.creditScore}
                    onChange={handleChange}
                    min="300"
                    max="900"
                    className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none"
                    placeholder="Enter credit score (300-900)"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">If you don&apos;t know, leave it blank</p>
              </div>

              {!isLoggedIn && (
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-sm text-yellow-800">
                    📝 You&apos;ll be asked to log in before submitting to save your eligibility check.
                  </p>
                </div>
              )}

              <div className="p-4 bg-teal-50 rounded-lg border border-teal-200">
                <p className="text-sm text-teal-700">
                  By submitting this form, you agree to our 
                  <span className="underline cursor-pointer ml-1">Terms of Use</span> 
                  and 
                  <span className="underline cursor-pointer ml-1">Privacy Policy</span>.
                </p>
              </div>
            </motion.div>
          )}

          {step === 4 && result && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              <div className={`p-8 rounded-2xl text-center ${result.eligible ? 'bg-linear-to-br from-green-50 to-teal-50' : 'bg-linear-to-br from-orange-50 to-yellow-50'}`}>
                {result.eligible ? (
                  <CheckCircle2 className="w-20 h-20 text-green-600 mx-auto mb-4" />
                ) : (
                  <AlertCircle className="w-20 h-20 text-orange-600 mx-auto mb-4" />
                )}
                
                <h3 className={`text-3xl font-bold mb-2 ${result.eligible ? 'text-green-700' : 'text-orange-700'}`}>
                  {result.eligible ? 'Congratulations!' : 'Not Eligible Yet'}
                </h3>
                
                <div className="my-6">
                  <div className="text-6xl font-bold text-gray-800 mb-2">
                    {result.eligibilityScore}
                    <span className="text-3xl text-gray-500">/100</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${result.eligibilityScore}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={`h-full rounded-full ${
                        result.eligibilityScore >= 80 ? 'bg-green-500' :
                        result.eligibilityScore >= 60 ? 'bg-teal-500' :
                        result.eligibilityScore >= 40 ? 'bg-orange-500' :
                        'bg-red-500'
                      }`}
                    />
                  </div>
                </div>

                <p className="text-gray-700 text-lg leading-relaxed">
                  {result.recommendation}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={onClose}
                  className="px-6 py-3 border-2 border-teal-600 text-teal-600 rounded-lg font-medium hover:bg-teal-50 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => router.push('/dashboard')}
                  className="px-6 py-3 bg-linear-to-r from-teal-600 to-teal-700 text-white rounded-lg font-medium hover:from-teal-700 hover:to-teal-800 transition-colors"
                >
                  View Dashboard
                </button>
              </div>
            </motion.div>
          )}

          {/* Navigation Buttons */}
          {step < 4 && (
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium"
                  disabled={loading}
                >
                  Back
                </button>
              )}
              
              <button
                type="submit"
                disabled={loading || (step === 2 && formData.panCard !== "" && !validatePan(formData.panCard))}
                className={`ml-auto px-8 py-3 rounded-lg font-medium flex items-center gap-2 ${
                  loading || (step === 2 && formData.panCard !== "" && !validatePan(formData.panCard))
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : step === 3 
                    ? 'bg-linear-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800' 
                    : 'bg-linear-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700'
                } text-white`}
              >
                {loading && <InlineLoader className="w-5 h-5" />}
                {loading ? 'Checking...' : step === 3 ? 'Check Eligibility Now' : 'Continue'}
              </button>
            </div>
          )}
        </form>
      </motion.div>
    </div>
  );
}