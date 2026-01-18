'use client'; 

import React, { useState, useEffect } from 'react';
import { Send } from 'lucide-react';
import { fastFetch } from '@/lib/utils/ultraFastFetch';
import { SectionLoader } from '@/component/commonComponent/SixFinanceLoader';

interface ContactFormProps {
  userData?: any;
  isLoggedIn?: boolean;
}

export default function ContactForm({ userData: propUserData, isLoggedIn: propIsLoggedIn }: ContactFormProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(propIsLoggedIn || false);
  const [formData, setFormData] = useState({
    name: propUserData?.name || '',
    email: propUserData?.email || '',
    mobile: propUserData?.phone || '',
    subject: 'Personal Loan',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Update form data when props change
  useEffect(() => {
    if (propUserData) {
      setIsLoggedIn(propIsLoggedIn || false);
      setFormData(prev => ({
        ...prev,
        name: propUserData.name || "",
        email: propUserData.email || "",
        mobile: propUserData.phone || "",
      }));
    }
  }, [propUserData, propIsLoggedIn]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      // Send the data with POST method
      const response = await fetch('/api/contact-messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.mobile,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSuccess(true);
        setFormData({
          name: '',
          email: '',
          mobile: '',
          subject: 'Personal Loan',
          message: ''
        });
        setTimeout(() => setSuccess(false), 5000);
      } else {
        setError(result.message || 'Failed to send message');
      }
    } catch (err: any) {
      setError('Network error. Please try again.');
      console.error('Contact form error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    // Changed padding: p-6 on mobile, p-12 on desktop for better spacing
    <div className="bg-white rounded-xl shadow-xl p-6 md:p-12 h-full border border-gray-100">
      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 italic">Send us a Message</h3>
      <p className="text-sm md:text-base text-gray-500 mb-8 leading-relaxed">
        Fill out the form below and our team will get back to you within 24 hours.
      </p>

      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm">
          ✅ Message sent successfully! We'll get back to you within 24 hours.
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
          ❌ {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
        {/* Grid stacks vertically on mobile (grid-cols-1) and horizontally on desktop (md:grid-cols-2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Full Name</label>
            <input 
              type="text" 
              name="name"
              required
              placeholder="e.g. Aditya Sharma"
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all font-sans text-base" 
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Mobile Number</label>
            <input 
              type="tel" 
              name="mobile"
              required
              placeholder="+91 98765 43210"
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all font-sans text-base"
              value={formData.mobile}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Email Address</label>
            <input 
              type="email" 
              name="email"
              required
              placeholder="aditya@example.com"
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all font-sans text-base"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Product Interest</label>
            <select 
              name="subject"
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all appearance-none cursor-pointer font-sans text-base"
              value={formData.subject}
              onChange={handleChange}
            >
              <option>Personal Loan</option>
              <option>Home Loan</option>
              <option>Credit Card</option>
              <option>Business Loan</option>
              <option>Other Query</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Your Message</label>
          <textarea 
            name="message"
            rows={4} // Slightly reduced height for mobile screens
            required
            placeholder="How can we help you today?"
            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all resize-none font-sans text-base"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          // Added active:scale-[0.98] for touch feedback
          className="w-full py-4 bg-teal-500 hover:bg-teal-600 active:scale-[0.98] text-white font-bold rounded-lg shadow-lg hover:shadow-teal-500/40 transition-all flex items-center justify-center gap-2 font-sans text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Sending...
            </>
          ) : (
            <>
              <Send size={18} /> Send Message
            </>
          )}
        </button>
      </form>
    </div>
  );
}