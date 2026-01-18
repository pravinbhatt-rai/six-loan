'use client'; 

import React, { useState } from 'react';
import { Send } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    subject: 'Personal Loan',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Submitted', formData);
    alert("Message sent! We will contact you shortly.");
  };

  return (
    // Changed padding: p-6 on mobile, p-12 on desktop for better spacing
    <div className="bg-white rounded-xl shadow-xl p-6 md:p-12 h-full border border-gray-100">
      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 italic">Send us a Message</h3>
      <p className="text-sm md:text-base text-gray-500 mb-8 leading-relaxed">
        Fill out the form below and our team will get back to you within 24 hours.
      </p>

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
          // Added active:scale-[0.98] for touch feedback
          className="w-full py-4 bg-teal-500 hover:bg-teal-600 active:scale-[0.98] text-white font-bold rounded-lg shadow-lg hover:shadow-teal-500/40 transition-all flex items-center justify-center gap-2 font-sans text-lg"
        >
          <Send size={18} /> Send Message
        </button>
      </form>
    </div>
  );
}