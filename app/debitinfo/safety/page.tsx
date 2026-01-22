"use client";
import React from 'react';
import Link from 'next/link';
import { Shield, Lock, AlertTriangle, Bell, CreditCard, CheckCircle } from 'lucide-react';

export default function SafetyPage() {
  const safetyFeatures = [
    {
      title: 'Card Block/Unblock',
      description: 'Instantly block or unblock your card through net banking or mobile app',
      icon: Lock,
      steps: ['Login to net banking', 'Go to Card Services', 'Select Block/Unblock', 'Confirm action'],
      color: 'red'
    },
    {
      title: 'International Usage Toggle',
      description: 'Turn international transactions on/off as needed',
      icon: CreditCard,
      steps: ['Open mobile banking app', 'Navigate to Debit Cards', 'Toggle International Usage', 'Set validity period'],
      color: 'blue'
    },
    {
      title: 'Daily Spending Limits',
      description: 'Set custom limits for ATM, POS, and online transactions',
      icon: AlertTriangle,
      steps: ['Access Card Settings', 'Select Daily Limits', 'Set ATM/POS/Online limits', 'Save changes'],
      color: 'orange'
    },
    {
      title: 'Fraud Alerts',
      description: 'Get instant SMS/email alerts for every transaction',
      icon: Bell,
      steps: ['Enable transaction alerts', 'Choose notification preferences', 'Set alert thresholds', 'Receive real-time updates'],
      color: 'green'
    },
    {
      title: 'Zero Liability Protection',
      description: 'Not liable for unauthorized transactions if reported within 3 days',
      icon: Shield,
      steps: ['Report unauthorized transaction', 'Call customer care immediately', 'Block your card', 'File complaint within 3 days'],
      color: 'purple'
    },
  ];

  const securityTips = [
    'Never share your PIN, CVV, or OTP with anyone',
    'Cover keypad while entering PIN at ATMs',
    'Use only secure and verified payment gateways',
    'Enable transaction alerts on mobile',
    'Change PIN regularly every 3-6 months',
    'Check ATM for skimming devices before use',
    'Report lost/stolen cards immediately',
    'Review monthly statements for unauthorized charges'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-linear-to-br from-red-500 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-slideUp">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl">
                <Shield className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Debit Card Safety Center
            </h1>
            <p className="text-xl text-red-50 max-w-2xl mx-auto">
              Protect your card with advanced security features and fraud prevention tools
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white shadow-lg p-6 text-center border-t-4 border-red-500">
            <Lock className="w-12 h-12 text-red-600 mx-auto mb-3" />
            <h3 className="font-bold text-gray-900 mb-2">Block Card</h3>
            <p className="text-sm text-gray-600 mb-4">Lost your card? Block it immediately</p>
            <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 transition-all font-semibold">
              Block Now
            </button>
          </div>
          <div className="bg-white shadow-lg p-6 text-center border-t-4 border-blue-500">
            <Bell className="w-12 h-12 text-blue-600 mx-auto mb-3" />
            <h3 className="font-bold text-gray-900 mb-2">Set Alerts</h3>
            <p className="text-sm text-gray-600 mb-4">Get notified for every transaction</p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 transition-all font-semibold">
              Enable Alerts
            </button>
          </div>
          <div className="bg-white shadow-lg p-6 text-center border-t-4 border-green-500">
            <Shield className="w-12 h-12 text-green-600 mx-auto mb-3" />
            <h3 className="font-bold text-gray-900 mb-2">Report Fraud</h3>
            <p className="text-sm text-gray-600 mb-4">Suspicious activity? Report now</p>
            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 transition-all font-semibold">
              Report Issue
            </button>
          </div>
        </div>
      </div>

      {/* Safety Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Card Safety Features</h2>
        <div className="space-y-6">
          {safetyFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="bg-white shadow-lg p-8 border-l-4 border-red-500 animate-slideIn"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-6">
                  <div className={`w-16 h-16 bg-${feature.color}-100 shrink-0 flex items-center justify-center`}>
                    <Icon className={`w-8 h-8 text-${feature.color}-600`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 mb-4">{feature.description}</p>
                    
                    <div className="bg-gray-50 p-4">
                      <p className="font-semibold text-gray-900 mb-3">How to use:</p>
                      <ol className="space-y-2">
                        {feature.steps.map((step, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span className="w-6 h-6 bg-teal-500 text-white flex items-center justify-center shrink-0 text-sm font-bold">
                              {idx + 1}
                            </span>
                            <span className="text-gray-700">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Security Tips */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Security Best Practices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {securityTips.map((tip, index) => (
              <div 
                key={index}
                className="flex items-start gap-3 bg-gray-50 p-4 animate-fadeIn"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CheckCircle className="w-6 h-6 text-green-600 shrink-0" />
                <p className="text-gray-700">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-50 border-2 border-red-500 p-8 text-center">
          <AlertTriangle className="w-16 h-16 text-red-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Emergency? Act Fast!</h3>
          <p className="text-gray-700 mb-6">
            If your card is lost, stolen, or you suspect fraud, contact your bank immediately
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 shadow-lg transition-all font-bold">
              Call Customer Care
            </button>
            <Link href="/debitinfo/safety">
              <button className="bg-white border-2 border-red-600 text-red-600 hover:bg-red-50 px-8 py-3 transition-all font-bold">
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
