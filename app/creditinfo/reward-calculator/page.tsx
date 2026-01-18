// app/credit-cards/reward-calculator/page.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import RewardCalculator from "@/component/creditcards/reward-calculator/RewardCalculator";
import { Calculator, TrendingUp, Award, Zap } from "lucide-react";

export default function RewardCalculatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-teal-600 to-teal-700 text-white">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-48 translate-x-48"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full translate-y-48 -translate-x-48"></div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full mb-6">
              <Calculator className="w-5 h-5" />
              <span className="text-sm font-medium">Smart Calculator</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Credit Card Reward<br />
              <span className="text-teal-200">Calculator</span>
            </h1>
            
            <p className="text-xl text-teal-100 max-w-3xl mx-auto mb-8">
              Calculate exactly how many reward points you&apos;ll earn on every purchase. 
              Maximize your credit card benefits with our intelligent reward calculator.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg">
                <TrendingUp className="w-5 h-5" />
                <span>Real-time Calculations</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg">
                <Award className="w-5 h-5" />
                <span>500+ Credit Cards</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg">
                <Zap className="w-5 h-5" />
                <span>Instant Results</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Calculator Section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <RewardCalculator />
      </div>

      {/* How It Works Section */}
      <div className="bg-gradient-to-b from-teal-50 to-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our reward calculator helps you make smarter spending decisions in just a few clicks.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🏦",
                title: "Select Your Bank",
                description: "Choose from 50+ banks and issuers including American Express, HDFC, Axis, SBI, and more.",
                color: "from-blue-500 to-teal-400"
              },
              {
                icon: "💳",
                title: "Pick Your Card",
                description: "Select from 500+ credit card variants with different reward structures and benefits.",
                color: "from-teal-500 to-green-400"
              },
              {
                icon: "💰",
                title: "Calculate Rewards",
                description: "Get instant calculations of reward points and their cash equivalent value.",
                color: "from-green-500 to-emerald-400"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 text-center"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${step.color} text-white text-2xl mb-6`}>
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Frequently Asked Questions
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              question: "How accurate are the reward calculations?",
              answer: "Our calculations are based on current reward rates provided by banks. However, actual rewards may vary based on specific terms and conditions."
            },
            {
              question: "Which banks are currently supported?",
              answer: "We support all major banks including HDFC, SBI, Axis, ICICI, American Express, YES Bank, and many more. New banks are added regularly."
            },
            {
              question: "Can I calculate rewards for multiple cards?",
              answer: "Currently, you can calculate rewards for one card at a time. We're working on a comparison feature for multiple cards."
            },
            {
              question: "Are there any hidden fees?",
              answer: "No, our reward calculator is completely free to use. We don't charge any fees for calculations or recommendations."
            }
          ].map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}